import os
import glob
import re

base_dir = r"d:\Freelance\Aizu\backend"

# 1. Patch Filament Form Schemas
form_files = glob.glob(os.path.join(base_dir, "app", "Filament", "Resources", "**", "Schemas", "*Form.php"), recursive=True)

for file in form_files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Imports
    if "use Filament\\Forms\\Components\\FileUpload;" not in content:
        content = content.replace("use Filament\\Forms\\Components\\TextInput;", "use Filament\\Forms\\Components\\TextInput;\nuse Filament\\Forms\\Components\\FileUpload;\nuse Filament\\Forms\\Components\\RichEditor;")
    
    # Replacements
    replacements = {
        r"TextInput::make\('photo'\)(.*?);": r"FileUpload::make('photo')->image()\1;",
        r"TextInput::make\('poster'\)(.*?);": r"FileUpload::make('poster')->image()\1;",
        r"TextInput::make\('thumbnail'\)(.*?);": r"FileUpload::make('thumbnail')->image()\1;",
        r"Textarea::make\('photo_gallery'\)(.*?);": r"FileUpload::make('photo_gallery')->image()->multiple()\1;",
        r"Textarea::make\('description'\)(.*?);": r"RichEditor::make('description')\1;",
        r"Textarea::make\('product_description'\)(.*?);": r"RichEditor::make('product_description')\1;",
        r"Textarea::make\('history'\)(.*?);": r"RichEditor::make('history')\1;",
        r"Textarea::make\('facilities'\)(.*?);": r"RichEditor::make('facilities')\1;",
        r"Textarea::make\('content'\)(.*?);": r"RichEditor::make('content')\1;"
    }
    
    for pattern, repl in replacements.items():
        content = re.sub(pattern, repl, content)
        
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)

# 2. Patch API Controllers
api_dir = os.path.join(base_dir, "app", "Http", "Controllers", "Api")
controllers = glob.glob(os.path.join(api_dir, "*Controller.php"))

def add_full_url(model, item_var):
    # Depending on model, append url
    fields = []
    if model == "Destinasi" or model == "Budaya":
        fields.append("photo_gallery")
    if model == "Umkm":
        fields.append("photo")
    if model == "Agenda":
        fields.append("poster")
    if model == "Artikel":
        fields.append("thumbnail")
        
    code = ""
    for f in fields:
        if f == "photo_gallery":
            code += f"""
        if (is_array({item_var}->{f})) {{
            {item_var}->{f} = array_map(function($path) {{
                return url('storage/' . $path);
            }}, {item_var}->{f});
        }} else if (is_string({item_var}->{f})) {{
            $decoded = json_decode({item_var}->{f});
            if(is_array($decoded)) {{
                {item_var}->{f} = array_map(function($path) {{ return url('storage/' . $path); }}, $decoded);
            }} else {{
                {item_var}->{f} = [url('storage/' . {item_var}->{f})];
            }}
        }}"""
        else:
            code += f"""
        if ({item_var}->{f}) {{
            {item_var}->{f} = url('storage/' . {item_var}->{f});
        }}"""
    return code

for file in controllers:
    model = os.path.basename(file).replace("Controller.php", "")
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We will modify index and show
    # Find `return response()->json(Model::latest()->get());`
    # Replace with mapping
    map_code = f"""
        $items = {model}::latest()->get();
        $items->map(function($item) {{{add_full_url(model, '$item')}
            return $item;
        }});
        return response()->json($items);"""
    
    content = re.sub(r"return response\(\)->json\(.*?::latest\(\)->get\(\)\);", map_code, content)
    
    show_code = f"""
        $item = {model}::find($id);
        if (!$item) return response()->json(['message' => 'Not found'], 404);{add_full_url(model, '$item')}
        return response()->json($item);"""
        
    content = re.sub(r"\$item = .*?::find\(\$id\);\s*if \(!\$item\) return response\(\)->json\(\['message' => 'Not found'\], 404\);\s*return response\(\)->json\(\$item\);", show_code, content)

    with open(file, "w", encoding="utf-8") as f:
        f.write(content)

print("Backend patched successfully.")
