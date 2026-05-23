import os
import glob

base_dir = r"d:\Freelance\Aizu\backend"

# 1. Update Models
models = ["Destinasi", "Budaya", "Umkm", "Agenda", "Artikel"]
for model in models:
    file_path = os.path.join(base_dir, "app", "Models", f"{model}.php")
    with open(file_path, "r") as f:
        content = f.read()
    
    if "protected $guarded = [];" not in content:
        content = content.replace("use HasFactory;", "use HasFactory;\n    protected $guarded = [];")
        with open(file_path, "w") as f:
            f.write(content)

# 2. Update Migrations
schemas = {
    "destinasis": """            $table->string('name');
            $table->string('category')->nullable();
            $table->text('description')->nullable();
            $table->string('htm')->nullable();
            $table->string('open_hours')->nullable();
            $table->string('map_coordinates')->nullable();
            $table->json('photo_gallery')->nullable();
            $table->text('facilities')->nullable();""",
    "budayas": """            $table->string('name');
            $table->string('category')->nullable();
            $table->text('description')->nullable();
            $table->text('history')->nullable();
            $table->json('photo_gallery')->nullable();""",
    "umkms": """            $table->string('business_name');
            $table->string('owner_name')->nullable();
            $table->string('category')->nullable();
            $table->string('contact_wa')->nullable();
            $table->string('ecommerce_link')->nullable();
            $table->text('product_description')->nullable();
            $table->string('photo')->nullable();""",
    "agendas": """            $table->string('event_name');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('location')->nullable();
            $table->text('description')->nullable();
            $table->string('poster')->nullable();""",
    "artikels": """            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->nullable();
            $table->longText('content')->nullable();
            $table->string('author')->nullable();
            $table->string('thumbnail')->nullable();
            $table->date('published_at')->nullable();"""
}

migration_dir = os.path.join(base_dir, "database", "migrations")
files = glob.glob(os.path.join(migration_dir, "*_create_*_table.php"))

for f_path in files:
    filename = os.path.basename(f_path)
    for key, schema in schemas.items():
        if f"create_{key}_table" in filename:
            with open(f_path, "r") as f:
                content = f.read()
            
            if "string" not in content: # simple check if not already updated
                # replace `$table->id();\n            $table->timestamps();`
                target = "$table->id();\n            $table->timestamps();"
                replacement = f"$table->id();\n{schema}\n            $table->timestamps();"
                content = content.replace(target, replacement)
                with open(f_path, "w") as f:
                    f.write(content)
            break

print("Models and migrations updated successfully.")
