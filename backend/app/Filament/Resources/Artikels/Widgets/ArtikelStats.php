<?php

namespace App\Filament\Resources\Artikels\Widgets;

use App\Models\Artikel;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ArtikelStats extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Artikel', Artikel::count())
                ->description('Artikel & berita dipublikasikan')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('success'),
            Stat::make('Artikel Rilis Bulan Ini', Artikel::whereMonth('published_at', now()->month)->whereYear('published_at', now()->year)->count())
                ->description('Berita terkini daerah')
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('info'),
            Stat::make('Penulis Terdaftar', Artikel::distinct('author')->count('author'))
                ->description('Kontributor aktif berita')
                ->descriptionIcon('heroicon-m-pencil-square')
                ->color('primary'),
        ];
    }
}
