@extends('admin.layout')

@section('content')
    <section class="hero">
        <span class="eyebrow">Custom CMS</span>
        <h1>Kelola Konten Karawang Tanpa Filament</h1>
        <p class="muted">Panel ini dibuat khusus agar visual, alur input, dan komponen bisa dicustom penuh sesuai kebutuhan project.</p>
    </section>

    <section class="grid stats">
        @foreach ($resources as $resource)
            <a class="card" href="{{ route('admin.content.index', $resource['key']) }}">
                <div class="stat-number">{{ $resource['count'] }}</div>
                <div class="card-title">{{ $resource['plural'] }}</div>
                <p class="muted">Total data aktif di modul {{ strtolower($resource['label']) }}.</p>
            </a>
        @endforeach
    </section>

    <div class="section-head">
        <div>
            <span class="eyebrow">Konten terbaru</span>
            <h2>Update terakhir</h2>
        </div>
    </div>

    <section class="grid cards">
        @foreach ($resources as $resource)
            <article class="card">
                <div class="card-title">{{ $resource['label'] }}</div>
                @forelse ($resource['latest'] as $item)
                    <p class="muted">{{ $item->{$resource['title']} }}</p>
                @empty
                    <p class="muted">Belum ada data.</p>
                @endforelse
            </article>
        @endforeach
    </section>
@endsection
