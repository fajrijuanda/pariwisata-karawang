<?php

namespace App\Filament\Resources\Umkms\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class UmkmForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('business_name')
                    ->required(),
                TextInput::make('owner_name'),
                TextInput::make('category'),
                TextInput::make('contact_wa'),
                TextInput::make('ecommerce_link'),
                Textarea::make('product_description')
                    ->columnSpanFull(),
                TextInput::make('photo'),
            ]);
    }
}
