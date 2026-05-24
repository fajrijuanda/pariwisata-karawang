<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Budaya extends Model
{
    protected $fillable = [
        'name',
        'category',
        'description',
        'history',
        'photo_gallery',
    ];

    protected $casts = [
        'photo_gallery' => 'array',
    ];
}
