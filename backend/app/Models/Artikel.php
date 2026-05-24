<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'content',
        'author',
        'thumbnail',
        'published_at',
    ];
}
