@extends('admin.layout')

@section('content')
    <div class="section-head">
        <div>
            <span class="eyebrow">{{ $config['label'] }}</span>
            <h2>Kelola {{ $config['plural'] }}</h2>
            <p class="muted">Tambah, edit, dan hapus konten yang akan tampil di frontend.</p>
        </div>
        <a class="button primary" href="{{ route('admin.content.create', $resource) }}">Tambah {{ $config['label'] }}</a>
    </div>

    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Media</th>
                    <th>Judul</th>
                    <th>Ringkasan</th>
                    <th>Diperbarui</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($items as $item)
                    @php
                        $image = $item->{$config['image']} ?? null;
                        $image = is_array($image) ? ($image[0] ?? null) : $image;
                    @endphp
                    <tr>
                        <td>
                            @if ($image)
                                <img class="thumb" src="{{ asset('storage/' . $image) }}" alt="">
                            @else
                                <div class="thumb"></div>
                            @endif
                        </td>
                        <td><strong>{{ $item->{$config['title']} }}</strong></td>
                        <td class="muted">{{ str(strip_tags($item->{$config['description']} ?? 'Belum ada deskripsi'))->limit(110) }}</td>
                        <td class="muted">{{ $item->updated_at?->format('d M Y') }}</td>
                        <td>
                            <div class="actions">
                                <a class="button" href="{{ route('admin.content.edit', [$resource, $item->id]) }}">Edit</a>
                                <form method="POST" action="{{ route('admin.content.destroy', [$resource, $item->id]) }}" onsubmit="return confirm('Hapus data ini?')">
                                    @csrf
                                    @method('DELETE')
                                    <button class="button danger" type="submit">Hapus</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="muted">Belum ada data. Mulai dengan tombol tambah di kanan atas.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="pagination">{{ $items->links() }}</div>
@endsection
