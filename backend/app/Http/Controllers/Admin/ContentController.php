<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ContentController extends Controller
{
    public function index(string $resource)
    {
        $config = AdminResources::get($resource);
        $items = $config['model']::latest()->paginate(12);

        return view('admin.content.index', compact('resource', 'config', 'items'));
    }

    public function create(string $resource)
    {
        $config = AdminResources::get($resource);
        $item = new $config['model']();

        return view('admin.content.form', compact('resource', 'config', 'item'));
    }

    public function store(Request $request, string $resource)
    {
        $config = AdminResources::get($resource);
        $data = $this->validatedData($request, $config);

        $config['model']::create($data);

        return redirect()->route('admin.content.index', $resource)->with('status', $config['label'] . ' berhasil ditambahkan.');
    }

    public function edit(string $resource, int $id)
    {
        $config = AdminResources::get($resource);
        $item = $config['model']::findOrFail($id);

        return view('admin.content.form', compact('resource', 'config', 'item'));
    }

    public function update(Request $request, string $resource, int $id)
    {
        $config = AdminResources::get($resource);
        $item = $config['model']::findOrFail($id);
        $data = $this->validatedData($request, $config, $item);

        $item->update($data);

        return redirect()->route('admin.content.index', $resource)->with('status', $config['label'] . ' berhasil diperbarui.');
    }

    public function destroy(string $resource, int $id)
    {
        $config = AdminResources::get($resource);
        $config['model']::findOrFail($id)->delete();

        return back()->with('status', $config['label'] . ' berhasil dihapus.');
    }

    private function validatedData(Request $request, array $config, mixed $item = null): array
    {
        $rules = [];

        foreach ($config['fields'] as $field) {
            $rule = $field['required'] ?? false ? ['required'] : ['nullable'];

            if (($field['type'] ?? 'text') === 'image') {
                $rule[] = 'image';
                $rule[] = 'max:4096';
            } elseif (($field['type'] ?? 'text') === 'gallery') {
                $rule[] = 'array';
                $rules[$field['name'] . '.*'] = ['image', 'max:4096'];
            } elseif (($field['type'] ?? 'text') === 'date') {
                $rule[] = 'date';
            } else {
                $rule[] = 'string';
            }

            if ($field['name'] === 'slug') {
                $rule[] = Rule::unique('artikels', 'slug')->ignore($item?->id);
            }

            $rules[$field['name']] = $rule;
        }

        $validated = $request->validate($rules);

        foreach ($config['fields'] as $field) {
            $name = $field['name'];
            $type = $field['type'] ?? 'text';

            if ($type === 'image') {
                unset($validated[$name]);
                if ($request->hasFile($name)) {
                    $validated[$name] = $request->file($name)->store('uploads/' . Str::plural($config['label']), 'public');
                }
            }

            if ($type === 'gallery') {
                unset($validated[$name]);
                if ($request->hasFile($name)) {
                    $validated[$name] = collect($request->file($name))
                        ->map(fn ($file) => $file->store('uploads/' . Str::plural($config['label']), 'public'))
                        ->values()
                        ->all();
                }
            }
        }

        return $validated;
    }
}
