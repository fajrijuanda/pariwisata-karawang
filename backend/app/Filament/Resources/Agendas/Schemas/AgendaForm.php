<?php

namespace App\Filament\Resources\Agendas\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AgendaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('event_name')
                    ->required(),
                DatePicker::make('start_date'),
                DatePicker::make('end_date'),
                TextInput::make('location'),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('poster'),
            ]);
    }
}
