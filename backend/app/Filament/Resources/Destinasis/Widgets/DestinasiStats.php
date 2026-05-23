<?php

namespace App\Filament\Resources\Destinasis\Widgets;

use App\Models\Destinasi;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class DestinasiStats extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Destinasi', Destinasi::count())
                ->description('Semua objek wisata terdaftar')
                ->descriptionIcon('heroicon-m-map')
                ->color('success'),
            Stat::make('Wisata Alam & Rekreasi', Destinasi::where('category', 'like', '%Alam%')->orWhere('category', 'like', '%Air%')->orWhere('category', 'like', '%Rekreasi%')->count())
                ->description('Keindahan alam & taman bermain')
                ->descriptionIcon('heroicon-m-globe-asia-australia')
                ->color('info'),
            Stat::make('Sejarah & Religi', Destinasi::where('category', 'like', '%Sejarah%')->orWhere('category', 'like', '%Religi%')->orWhere('category', 'like', '%Cagar%')->count())
                ->description('Cagar budaya & tempat ibadah')
                ->descriptionIcon('heroicon-m-academic-cap')
                ->color('warning'),
        ];
    }
}
