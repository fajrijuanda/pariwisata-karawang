<?php

namespace App\Filament\Resources\Destinasis\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;

class DestinasisTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('photo_gallery')
                    ->label('Foto Wisata')
                    ->circular(),
                TextColumn::make('name')
                    ->label('Nama Destinasi')
                    ->searchable(),
                TextColumn::make('category')
                    ->label('Kategori')
                    ->searchable(),
                TextColumn::make('htm')
                    ->label('HTM')
                    ->searchable(),
                TextColumn::make('open_hours')
                    ->label('Jam Operasional')
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
