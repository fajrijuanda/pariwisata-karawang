<?php

namespace App\Filament\Widgets;

use App\Models\Destinasi;
use App\Models\Budaya;
use App\Models\Umkm;
use App\Models\Agenda;
use App\Models\Artikel;
use Filament\Widgets\ChartWidget;

class WisataChart extends ChartWidget
{
    protected static ?string $heading = 'Sebaran Data Portal Pariwisata';

    protected string|array|null $color = 'primary';

    protected function getData(): array
    {
        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Data Terdaftar',
                    'data' => [
                        Destinasi::count(),
                        Budaya::count(),
                        Umkm::count(),
                        Agenda::count(),
                        Artikel::count(),
                    ],
                    'backgroundColor' => [
                        'rgba(16, 185, 129, 0.8)', // green
                        'rgba(245, 158, 11, 0.8)', // amber
                        'rgba(59, 130, 246, 0.8)', // blue
                        'rgba(239, 68, 68, 0.8)',  // red
                        'rgba(6, 182, 212, 0.8)',  // cyan
                    ],
                    'borderColor' => [
                        '#10b981',
                        '#f59e0b',
                        '#3b82f6',
                        '#ef4444',
                        '#06b6d4',
                    ],
                    'borderWidth' => 1
                ],
            ],
            'labels' => ['Destinasi Wisata', 'Budaya & Seni', 'Katalog UMKM', 'Agenda & Event', 'Artikel & Berita'],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
