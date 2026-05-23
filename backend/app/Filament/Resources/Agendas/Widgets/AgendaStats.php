<?php

namespace App\Filament\Resources\Agendas\Widgets;

use App\Models\Agenda;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class AgendaStats extends BaseWidget
{
    protected function getStats(): array
    {
        $today = now()->toDateString();
        
        return [
            Stat::make('Total Event', Agenda::count())
                ->description('Jadwal agenda festival terdaftar')
                ->descriptionIcon('heroicon-m-calendar')
                ->color('success'),
            Stat::make('Event Aktif / Mendatang', Agenda::where('end_date', '>=', $today)->orWhereNull('end_date')->count())
                ->description('Agenda yang belum/sedang berlangsung')
                ->descriptionIcon('heroicon-m-clock')
                ->color('primary'),
            Stat::make('Event Selesai', Agenda::where('end_date', '<', $today)->count())
                ->description('Event pariwisata yang telah lampau')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('danger'),
        ];
    }
}
