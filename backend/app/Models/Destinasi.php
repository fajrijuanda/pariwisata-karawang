<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destinasi extends Model
{
    protected $fillable = [
        'name',
        'category',
        'description',
        'htm',
        'open_hours',
        'map_coordinates',
        'photo_gallery',
        'facilities',
    ];

    protected $casts = [
        'photo_gallery' => 'array',
    ];
}
