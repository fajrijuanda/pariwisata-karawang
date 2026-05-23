<?php

namespace App\Filament\Resources\Umkms\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Schema;

class UmkmForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('business_name')
                    ->label('Nama Usaha / UMKM')
                    ->required(),
                TextInput::make('owner_name')
                    ->label('Nama Pemilik'),
                TextInput::make('category')
                    ->label('Kategori Produk / Kuliner'),
                TextInput::make('contact_wa')
                    ->label('Nomor WhatsApp (Aktif)')
                    ->helperText('Contoh: 628123456789 (gunakan kode negara 62)'),
                TextInput::make('ecommerce_link')
                    ->label('Tautan E-Commerce (Shopee/Tokopedia/dll)'),
                RichEditor::make('product_description')
                    ->label('Deskripsi Produk / Usaha')
                    ->columnSpanFull(),
                FileUpload::make('photo')
                    ->label('Foto Produk / Toko')
                    ->image()
                    ->directory('umkms'),
            ]);
    }
}
