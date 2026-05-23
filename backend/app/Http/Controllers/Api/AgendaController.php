<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agenda;
use Illuminate\Http\Request;

class AgendaController extends Controller
{
    public function index()
    {
        
        $items = Agenda::latest()->get();
        $items->map(function($item) {
        if ($item->poster) {
            $item->poster = url('storage/' . $item->poster);
        }
            return $item;
        });
        return response()->json($items);
    }

    public function show($id)
    {
        
        $item = Agenda::find($id);
        if (!$item) return response()->json(['message' => 'Not found'], 404);
        if ($item->poster) {
            $item->poster = url('storage/' . $item->poster);
        }
        return response()->json($item);
    }
}
