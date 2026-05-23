<?php

namespace App\Filament\Resources\Artikels\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;

class ArtikelsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('thumbnail')
                    ->label('Sampul'),
                TextColumn::make('title')
                    ->label('Judul Artikel')
                    ->searchable(),
                TextColumn::make('category')
                    ->label('Kategori')
                    ->searchable(),
                TextColumn::make('author')
                    ->label('Penulis')
                    ->searchable(),
                TextColumn::make('published_at')
                    ->label('Tanggal Rilis')
                    ->date('d M Y')
                    ->sortable(),
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
