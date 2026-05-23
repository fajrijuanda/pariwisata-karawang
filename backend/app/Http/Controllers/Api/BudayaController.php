<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Budaya;
use Illuminate\Http\Request;

class BudayaController extends Controller
{
    public function index()
    {
        
        $items = Budaya::latest()->get();
        $items->map(function($item) {
        if (is_array($item->photo_gallery)) {
            $item->photo_gallery = array_map(function($path) {
                return url('storage/' . $path);
            }, $item->photo_gallery);
        } else if (is_string($item->photo_gallery)) {
            $decoded = json_decode($item->photo_gallery);
            if(is_array($decoded)) {
                $item->photo_gallery = array_map(function($path) { return url('storage/' . $path); }, $decoded);
            } else {
                $item->photo_gallery = [url('storage/' . $item->photo_gallery)];
            }
        }
            return $item;
        });
        return response()->json($items);
    }

    public function show($id)
    {
        
        $item = Budaya::find($id);
        if (!$item) return response()->json(['message' => 'Not found'], 404);
        if (is_array($item->photo_gallery)) {
            $item->photo_gallery = array_map(function($path) {
                return url('storage/' . $path);
            }, $item->photo_gallery);
        } else if (is_string($item->photo_gallery)) {
            $decoded = json_decode($item->photo_gallery);
            if(is_array($decoded)) {
                $item->photo_gallery = array_map(function($path) { return url('storage/' . $path); }, $decoded);
            } else {
                $item->photo_gallery = [url('storage/' . $item->photo_gallery)];
            }
        }
        return response()->json($item);
    }
}
