<?php

namespace App\Filament\Resources\Artikels\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Schema;

class ArtikelForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul Artikel')
                    ->required(),
                TextInput::make('slug')
                    ->label('Slug / Tautan Unik')
                    ->required(),
                TextInput::make('category')
                    ->label('Kategori'),
                RichEditor::make('content')
                    ->label('Konten Utama / Isi Berita')
                    ->columnSpanFull(),
                TextInput::make('author')
                    ->label('Penulis / Sumber'),
                FileUpload::make('thumbnail')
                    ->label('Gambar Utama / Sampul')
                    ->image()
                    ->directory('artikels'),
                DatePicker::make('published_at')
                    ->label('Tanggal Publikasi'),
            ]);
    }
}
