<?php

namespace App\Filament\Resources\Agendas\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Schema;

class AgendaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('event_name')
                    ->label('Nama Acara / Event')
                    ->required(),
                DatePicker::make('start_date')
                    ->label('Tanggal Mulai'),
                DatePicker::make('end_date')
                    ->label('Tanggal Selesai'),
                TextInput::make('location')
                    ->label('Lokasi / Tempat'),
                RichEditor::make('description')
                    ->label('Deskripsi Acara')
                    ->columnSpanFull(),
                FileUpload::make('poster')
                    ->label('Poster Acara')
                    ->image()
                    ->directory('agendas'),
            ]);
    }
}
