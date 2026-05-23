import os

base_dir = r"d:\Freelance\Aizu\backend"
api_routes_path = os.path.join(base_dir, "routes", "api.php")
controllers_dir = os.path.join(base_dir, "app", "Http", "Controllers", "Api")

os.makedirs(controllers_dir, exist_ok=True)

models = ["Destinasi", "Budaya", "Umkm", "Agenda", "Artikel"]

# 1. Update routes/api.php
route_content = "<?php\n\nuse Illuminate\\Http\\Request;\nuse Illuminate\\Support\\Facades\\Route;\n"
for model in models:
    route_content += f"use App\\Http\\Controllers\\Api\\{model}Controller;\n"

route_content += "\nRoute::get('/user', function (Request $request) {\n    return $request->user();\n})->middleware('auth:sanctum');\n\n"

for model in models:
    name = model.lower() + "s"
    route_content += f"Route::get('/{name}', [{model}Controller::class, 'index']);\n"
    route_content += f"Route::get('/{name}/{{id}}', [{model}Controller::class, 'show']);\n"

with open(api_routes_path, "w") as f:
    f.write(route_content)

# 2. Create Controllers
for model in models:
    controller_path = os.path.join(controllers_dir, f"{model}Controller.php")
    content = f"""<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\{model};
use Illuminate\Http\Request;

class {model}Controller extends Controller
{{
    public function index()
    {{
        return response()->json({model}::latest()->get());
    }}

    public function show($id)
    {{
        $item = {model}::find($id);
        if (!$item) return response()->json(['message' => 'Not found'], 404);
        return response()->json($item);
    }}
}}
"""
    with open(controller_path, "w") as f:
        f.write(content)

print("API routes and controllers created.")
