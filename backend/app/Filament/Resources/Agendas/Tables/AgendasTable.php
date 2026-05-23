<?php

namespace App\Filament\Resources\Agendas\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;

class AgendasTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('poster')
                    ->label('Poster'),
                TextColumn::make('event_name')
                    ->label('Nama Acara')
                    ->searchable(),
                TextColumn::make('start_date')
                    ->label('Tanggal Mulai')
                    ->date('d M Y')
                    ->sortable(),
                TextColumn::make('end_date')
                    ->label('Tanggal Selesai')
                    ->date('d M Y')
                    ->sortable(),
                TextColumn::make('location')
                    ->label('Lokasi')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
