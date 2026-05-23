<?php

namespace App\Filament\Resources\Artikels\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ArtikelForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('category'),
                Textarea::make('content')
                    ->columnSpanFull(),
                TextInput::make('author'),
                TextInput::make('thumbnail'),
                DatePicker::make('published_at'),
            ]);
    }
}
