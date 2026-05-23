<?php

namespace App\Filament\Resources\Budayas\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Schema;

class BudayaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Seni / Budaya')
                    ->required(),
                TextInput::make('category')
                    ->label('Kategori Budaya'),
                RichEditor::make('description')
                    ->label('Deskripsi / Penjelasan Singkat')
                    ->columnSpanFull(),
                RichEditor::make('history')
                    ->label('Sejarah & Asal Usul')
                    ->columnSpanFull(),
                FileUpload::make('photo_gallery')
                    ->label('Galeri Foto / Dokumentasi')
                    ->image()
                    ->multiple()
                    ->directory('budayas')
                    ->columnSpanFull(),
            ]);
    }
}
