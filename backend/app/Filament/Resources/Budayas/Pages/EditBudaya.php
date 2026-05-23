<?php

namespace App\Filament\Resources\Budayas\Pages;

use App\Filament\Resources\Budayas\BudayaResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditBudaya extends EditRecord
{
    protected static string $resource = BudayaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
