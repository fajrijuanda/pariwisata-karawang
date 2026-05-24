@extends('admin.layout')

@section('content')
    <div class="section-head">
        <div>
            <span class="eyebrow">{{ $config['label'] }}</span>
            <h2>{{ $item->exists ? 'Edit' : 'Tambah' }} {{ $config['label'] }}</h2>
            <p class="muted">Form custom sederhana, siap dikembangkan sesuai workflow admin.</p>
        </div>
        <a class="button" href="{{ route('admin.content.index', $resource) }}">Kembali</a>
    </div>

    @if ($errors->any())
        <div class="errors">
            @foreach ($errors->all() as $error)
                <div>{{ $error }}</div>
            @endforeach
        </div>
    @endif

    <form class="form-card" method="POST" enctype="multipart/form-data" action="{{ $item->exists ? route('admin.content.update', [$resource, $item->id]) : route('admin.content.store', $resource) }}">
        @csrf
        @if ($item->exists)
            @method('PUT')
        @endif

        <div class="form-grid">
            @foreach ($config['fields'] as $field)
                @php($type = $field['type'] ?? 'text')
                <label class="{{ in_array($type, ['textarea', 'gallery'], true) ? 'span-2' : '' }}">
                    <span>{{ $field['label'] }}</span>
                    @if ($type === 'textarea')
                        <textarea name="{{ $field['name'] }}">{{ old($field['name'], $item->{$field['name']}) }}</textarea>
                    @elseif ($type === 'image')
                        <input name="{{ $field['name'] }}" type="file" accept="image/*">
                    @elseif ($type === 'gallery')
                        <input name="{{ $field['name'] }}[]" type="file" accept="image/*" multiple>
                    @else
                        <input name="{{ $field['name'] }}" type="{{ $type }}" value="{{ old($field['name'], $item->{$field['name']}) }}" @required($field['required'] ?? false)>
                    @endif
                </label>
            @endforeach
        </div>

        <div class="actions" style="margin-top: 20px;">
            <button class="button primary" type="submit">Simpan Konten</button>
        </div>
    </form>
@endsection
