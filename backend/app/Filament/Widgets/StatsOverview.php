<?php

namespace App\Filament\Widgets;

use App\Models\Destinasi;
use App\Models\Budaya;
use App\Models\Umkm;
use App\Models\Agenda;
use App\Models\Artikel;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Destinasi Wisata', Destinasi::count())
                ->description('Total destinasi wisata terdaftar')
                ->descriptionIcon('heroicon-m-map')
                ->color('success'),
            Stat::make('Budaya & Seni', Budaya::count())
                ->description('Total kekayaan budaya lokal')
                ->descriptionIcon('heroicon-m-sparkles')
                ->color('warning'),
            Stat::make('Katalog UMKM', Umkm::count())
                ->description('Total UMKM terdaftar')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color('primary'),
            Stat::make('Agenda & Event', Agenda::count())
                ->description('Total acara / festival terdaftar')
                ->descriptionIcon('heroicon-m-calendar')
                ->color('danger'),
            Stat::make('Artikel & Berita', Artikel::count())
                ->description('Total artikel rilis')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('info'),
        ];
    }
}
