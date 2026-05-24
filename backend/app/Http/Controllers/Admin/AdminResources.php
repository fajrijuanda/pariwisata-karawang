<?php

namespace App\Http\Controllers\Admin;

use App\Models\Agenda;
use App\Models\Artikel;
use App\Models\Budaya;
use App\Models\Destinasi;
use App\Models\Umkm;

final class AdminResources
{
    public static function all(): array
    {
        return [
            'destinasi' => [
                'label' => 'Destinasi',
                'plural' => 'Destinasi',
                'model' => Destinasi::class,
                'title' => 'name',
                'description' => 'description',
                'image' => 'photo_gallery',
                'fields' => [
                    ['name' => 'name', 'label' => 'Nama destinasi', 'type' => 'text', 'required' => true],
                    ['name' => 'category', 'label' => 'Kategori', 'type' => 'text'],
                    ['name' => 'description', 'label' => 'Deskripsi', 'type' => 'textarea'],
                    ['name' => 'htm', 'label' => 'Harga tiket masuk', 'type' => 'text'],
                    ['name' => 'open_hours', 'label' => 'Jam operasional', 'type' => 'text'],
                    ['name' => 'map_coordinates', 'label' => 'Koordinat / embed maps', 'type' => 'text'],
                    ['name' => 'facilities', 'label' => 'Fasilitas', 'type' => 'textarea'],
                    ['name' => 'photo_gallery', 'label' => 'Galeri foto', 'type' => 'gallery'],
                ],
            ],
            'budaya' => [
                'label' => 'Budaya',
                'plural' => 'Budaya',
                'model' => Budaya::class,
                'title' => 'name',
                'description' => 'description',
                'image' => 'photo_gallery',
                'fields' => [
                    ['name' => 'name', 'label' => 'Nama budaya', 'type' => 'text', 'required' => true],
                    ['name' => 'category', 'label' => 'Kategori', 'type' => 'text'],
                    ['name' => 'description', 'label' => 'Deskripsi', 'type' => 'textarea'],
                    ['name' => 'history', 'label' => 'Sejarah', 'type' => 'textarea'],
                    ['name' => 'photo_gallery', 'label' => 'Galeri foto', 'type' => 'gallery'],
                ],
            ],
            'umkm' => [
                'label' => 'UMKM',
                'plural' => 'UMKM',
                'model' => Umkm::class,
                'title' => 'business_name',
                'description' => 'product_description',
                'image' => 'photo',
                'fields' => [
                    ['name' => 'business_name', 'label' => 'Nama usaha', 'type' => 'text', 'required' => true],
                    ['name' => 'owner_name', 'label' => 'Pemilik', 'type' => 'text'],
                    ['name' => 'category', 'label' => 'Kategori', 'type' => 'text'],
                    ['name' => 'contact_wa', 'label' => 'WhatsApp', 'type' => 'text'],
                    ['name' => 'ecommerce_link', 'label' => 'Link ecommerce', 'type' => 'text'],
                    ['name' => 'product_description', 'label' => 'Deskripsi produk', 'type' => 'textarea'],
                    ['name' => 'photo', 'label' => 'Foto produk', 'type' => 'image'],
                ],
            ],
            'agenda' => [
                'label' => 'Agenda',
                'plural' => 'Agenda',
                'model' => Agenda::class,
                'title' => 'event_name',
                'description' => 'description',
                'image' => 'poster',
                'fields' => [
                    ['name' => 'event_name', 'label' => 'Nama acara', 'type' => 'text', 'required' => true],
                    ['name' => 'start_date', 'label' => 'Tanggal mulai', 'type' => 'date'],
                    ['name' => 'end_date', 'label' => 'Tanggal selesai', 'type' => 'date'],
                    ['name' => 'location', 'label' => 'Lokasi', 'type' => 'text'],
                    ['name' => 'description', 'label' => 'Deskripsi', 'type' => 'textarea'],
                    ['name' => 'poster', 'label' => 'Poster', 'type' => 'image'],
                ],
            ],
            'artikel' => [
                'label' => 'Artikel',
                'plural' => 'Artikel',
                'model' => Artikel::class,
                'title' => 'title',
                'description' => 'content',
                'image' => 'thumbnail',
                'fields' => [
                    ['name' => 'title', 'label' => 'Judul', 'type' => 'text', 'required' => true],
                    ['name' => 'slug', 'label' => 'Slug', 'type' => 'text', 'required' => true],
                    ['name' => 'category', 'label' => 'Kategori', 'type' => 'text'],
                    ['name' => 'author', 'label' => 'Penulis', 'type' => 'text'],
                    ['name' => 'published_at', 'label' => 'Tanggal publikasi', 'type' => 'date'],
                    ['name' => 'content', 'label' => 'Isi artikel', 'type' => 'textarea'],
                    ['name' => 'thumbnail', 'label' => 'Thumbnail', 'type' => 'image'],
                ],
            ],
        ];
    }

    public static function get(string $resource): array
    {
        abort_unless(array_key_exists($resource, self::all()), 404);

        return self::all()[$resource];
    }
}
