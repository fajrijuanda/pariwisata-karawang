<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Umkm extends Model
{
    protected $fillable = [
        'business_name',
        'owner_name',
        'category',
        'contact_wa',
        'ecommerce_link',
        'product_description',
        'photo',
    ];
}
