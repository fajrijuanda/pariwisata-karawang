<?php

namespace App\Filament\Resources\Budayas\Widgets;

use App\Models\Budaya;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class BudayaStats extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Kebudayaan', Budaya::count())
                ->description('Warisan seni budaya terdaftar')
                ->descriptionIcon('heroicon-m-sparkles')
                ->color('success'),
            Stat::make('Seni Tari & Pertunjukan', Budaya::where('category', 'like', '%Tari%')->orWhere('category', 'like', '%Seni%')->orWhere('category', 'like', '%Pertunjukan%')->count())
                ->description('Pementasan tradisional Karawang')
                ->descriptionIcon('heroicon-m-musical-note')
                ->color('warning'),
            Stat::make('Adat & Tradisi', Budaya::where('category', 'like', '%Adat%')->orWhere('category', 'like', '%Tradisi%')->orWhere('category', 'like', '%Upacara%')->count())
                ->description('Ritual & upacara adat turun-temurun')
                ->descriptionIcon('heroicon-m-home')
                ->color('info'),
        ];
    }
}
