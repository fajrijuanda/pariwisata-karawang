<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Artikel;
use Illuminate\Http\Request;

class ArtikelController extends Controller
{
    public function index()
    {
        
        $items = Artikel::latest()->get();
        $items->map(function($item) {
        if ($item->thumbnail) {
            $item->thumbnail = url('storage/' . $item->thumbnail);
        }
            return $item;
        });
        return response()->json($items);
    }

    public function show($id)
    {
        
        $item = Artikel::find($id);
        if (!$item) return response()->json(['message' => 'Not found'], 404);
        if ($item->thumbnail) {
            $item->thumbnail = url('storage/' . $item->thumbnail);
        }
        return response()->json($item);
    }
}
