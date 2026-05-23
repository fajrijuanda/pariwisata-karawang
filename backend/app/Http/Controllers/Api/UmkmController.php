<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Umkm;
use Illuminate\Http\Request;

class UmkmController extends Controller
{
    public function index()
    {
        
        $items = Umkm::latest()->get();
        $items->map(function($item) {
        if ($item->photo) {
            $item->photo = url('storage/' . $item->photo);
        }
            return $item;
        });
        return response()->json($items);
    }

    public function show($id)
    {
        
        $item = Umkm::find($id);
        if (!$item) return response()->json(['message' => 'Not found'], 404);
        if ($item->photo) {
            $item->photo = url('storage/' . $item->photo);
        }
        return response()->json($item);
    }
}
