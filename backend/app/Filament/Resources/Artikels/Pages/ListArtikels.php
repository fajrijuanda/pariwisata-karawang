<?php

namespace App\Filament\Resources\Artikels\Pages;

use App\Filament\Resources\Artikels\ArtikelResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

use App\Filament\Resources\Artikels\Widgets\ArtikelStats;

class ListArtikels extends ListRecords
{
    protected static string $resource = ArtikelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            ArtikelStats::class,
        ];
    }
}
