<?php

namespace App\Filament\Resources\Umkms\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;

class UmkmsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('photo')
                    ->label('Foto Produk'),
                TextColumn::make('business_name')
                    ->label('Nama Usaha / UMKM')
                    ->searchable(),
                TextColumn::make('owner_name')
                    ->label('Pemilik')
                    ->searchable(),
                TextColumn::make('category')
                    ->label('Kategori')
                    ->searchable(),
                TextColumn::make('contact_wa')
                    ->label('WhatsApp')
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
