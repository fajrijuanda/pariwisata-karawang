<?php

namespace App\Filament\Resources\Budayas\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class BudayaForm
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
                Textarea::make('history')
                    ->columnSpanFull(),
                Textarea::make('photo_gallery')
                    ->columnSpanFull(),
            ]);
    }
}
