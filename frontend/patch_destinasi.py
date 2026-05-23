import os

base_dir = r"d:\Freelance\Aizu\frontend\src\app\destinasi"

# 1. Update destinasi/page.tsx
grid_path = os.path.join(base_dir, "page.tsx")
content = """import React from 'react';
import Link from 'next/link';

async function getData() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/destinasis', { next: { revalidate: 0 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function DestinasiPage() {
  const data = await getData();

  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
  };

  return (
    <main className="flex-1 flex flex-col py-16 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Destinasi Karawang</h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Jelajahi berbagai destinasi wisata alam, sejarah, dan rekreasi di Kabupaten Karawang.
          </p>
        </div>
        
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.map((item: any, idx: number) => {
              let imgUrl = null;
              if (item.photo_gallery) {
                  if (Array.isArray(item.photo_gallery) && item.photo_gallery.length > 0) {
                      imgUrl = item.photo_gallery[0];
                  } else if (typeof item.photo_gallery === 'string') {
                      imgUrl = item.photo_gallery;
                  }
              }
              
              return (
              <Link href={`/destinasi/${item.id}`} key={item.id} className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="h-56 bg-zinc-200 dark:bg-zinc-800 w-full flex items-center justify-center text-zinc-400 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/30 transition-colors duration-500 z-10"></div>
                  {imgUrl ? (
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                      <span className="z-0">No Image</span>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">{item.category || 'Wisata'}</span>
                  <h3 className="text-xl font-semibold mt-2 mb-3 text-zinc-900 dark:text-white group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3">
                    {stripHtml(item.description) || 'Deskripsi tidak tersedia.'}
                  </p>
                </div>
              </Link>
            )})}
          </div>
        ) : (
          <div className="text-center p-16 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700 shadow-sm">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-zinc-400">📄</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">Belum ada destinasi wisata yang ditambahkan.</p>
          </div>
        )}
      </div>
    </main>
  );
}
"""
with open(grid_path, "w", encoding='utf-8') as f:
    f.write(content)

# 2. Update destinasi/[id]/page.tsx
detail_path = os.path.join(base_dir, "[id]", "page.tsx")
content = """import React from 'react';
import Link from 'next/link';

async function getDetail(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/destinasis/${id}`, { next: { revalidate: 0 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function DestinasiDetail({ params }: { params: { id: string } }) {
  const data = await getDetail(params.id);

  if (!data) {
    return (
      <main className="flex-1 flex flex-col py-32 items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">Data Tidak Ditemukan</h1>
        <Link href="/destinasi" className="text-primary hover:underline">Kembali ke daftar destinasi</Link>
      </main>
    );
  }

  let imgUrl = null;
  if (data.photo_gallery) {
      if (Array.isArray(data.photo_gallery) && data.photo_gallery.length > 0) {
          imgUrl = data.photo_gallery[0];
      } else if (typeof data.photo_gallery === 'string') {
          imgUrl = data.photo_gallery;
      }
  }

  return (
    <main className="flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Detail Hero */}
      <section className="w-full h-[500px] bg-zinc-800 relative flex items-end justify-center pb-16 overflow-hidden">
        {imgUrl && <img src={imgUrl} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-4xl animate-fade-in-up">
          <span className="px-3 py-1 rounded-full bg-secondary/80 text-white text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            {data.category || 'Wisata Alam'}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{data.name}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto w-full -mt-20 relative z-30">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 md:p-12 border border-zinc-100 dark:border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6 border-b pb-4 dark:border-zinc-800">Deskripsi Utama</h2>
              <div 
                className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{__html: data.description || '<p>Deskripsi belum tersedia.</p>'}}
              />
            </div>
            <div className="space-y-6">
              <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 border-b pb-2 dark:border-zinc-800">Informasi Singkat</h3>
                <ul className="text-sm">
                  <li className="flex flex-col mb-4">
                    <span className="text-zinc-500 dark:text-zinc-400 mb-1">Harga Tiket Masuk</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{data.htm || 'Menyesuaikan'}</span>
                  </li>
                  <li className="flex flex-col mb-4">
                    <span className="text-zinc-500 dark:text-zinc-400 mb-1">Jam Operasional</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{data.open_hours || 'Buka'}</span>
                  </li>
                  <li className="flex flex-col mb-4">
                    <span className="text-zinc-500 dark:text-zinc-400 mb-1">Fasilitas</span>
                    <div className="font-medium text-zinc-900 dark:text-white prose dark:prose-invert max-w-none text-sm" dangerouslySetInnerHTML={{__html: data.facilities || '-'}}></div>
                  </li>
                  {data.map_coordinates && (
                  <li className="flex flex-col mb-4 mt-6">
                    <a href={data.map_coordinates} target="_blank" rel="noreferrer" className="w-full text-center px-4 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow">
                      Lihat Rute di Peta
                    </a>
                  </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
"""
with open(detail_path, "w", encoding='utf-8') as f:
    f.write(content)

print("Destinasi patched successfully.")
