<?php

namespace App\Filament\Resources\Budayas;

use App\Filament\Resources\Budayas\Pages\CreateBudaya;
use App\Filament\Resources\Budayas\Pages\EditBudaya;
use App\Filament\Resources\Budayas\Pages\ListBudayas;
use App\Filament\Resources\Budayas\Schemas\BudayaForm;
use App\Filament\Resources\Budayas\Tables\BudayasTable;
use App\Models\Budaya;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class BudayaResource extends Resource
{
    protected static ?string $model = Budaya::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return BudayaForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BudayasTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBudayas::route('/'),
            'create' => CreateBudaya::route('/create'),
            'edit' => EditBudaya::route('/{record}/edit'),
        ];
    }
}
