<?php

namespace App\Filament\Resources\Umkms\Widgets;

use App\Models\Umkm;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class UmkmStats extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total UMKM', Umkm::count())
                ->description('Mitra UMKM terdaftar')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color('success'),
            Stat::make('Kuliner & Oleh-oleh', Umkm::where('category', 'like', '%Kuliner%')->orWhere('category', 'like', '%Makanan%')->orWhere('category', 'like', '%Minuman%')->orWhere('category', 'like', '%Oleh%')->count())
                ->description('Produk makanan & minuman khas')
                ->descriptionIcon('heroicon-m-cake')
                ->color('info'),
            Stat::make('Toko E-Commerce', Umkm::whereNotNull('ecommerce_link')->where('ecommerce_link', '!=', '')->count())
                ->description('UMKM dengan tautan toko online')
                ->descriptionIcon('heroicon-m-shopping-cart')
                ->color('primary'),
        ];
    }
}
