<?php

namespace App\Filament\Resources\Budayas\Pages;

use App\Filament\Resources\Budayas\BudayaResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListBudayas extends ListRecords
{
    protected static string $resource = BudayaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
