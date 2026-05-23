<?php

namespace App\Filament\Resources\Destinasis\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class DestinasiForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('category'),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('htm'),
                TextInput::make('open_hours'),
                TextInput::make('map_coordinates'),
                Textarea::make('photo_gallery')
                    ->columnSpanFull(),
                Textarea::make('facilities')
                    ->columnSpanFull(),
            ]);
    }
}
