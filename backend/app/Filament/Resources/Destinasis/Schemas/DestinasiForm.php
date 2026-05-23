<?php

namespace App\Filament\Resources\Destinasis\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Schema;

class DestinasiForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Destinasi Wisata')
                    ->required(),
                TextInput::make('category')
                    ->label('Kategori Wisata'),
                RichEditor::make('description')
                    ->label('Deskripsi Utama')
                    ->columnSpanFull(),
                TextInput::make('htm')
                    ->label('Harga Tiket Masuk (HTM)'),
                TextInput::make('open_hours')
                    ->label('Jam Operasional'),
                TextInput::make('map_coordinates')
                    ->label('Koordinat Peta (Link Google Maps)'),
                FileUpload::make('photo_gallery')
                    ->label('Galeri Foto Wisata')
                    ->image()
                    ->multiple()
                    ->directory('destinasis')
                    ->columnSpanFull(),
                RichEditor::make('facilities')
                    ->label('Fasilitas Wisata')
                    ->columnSpanFull(),
            ]);
    }
}
