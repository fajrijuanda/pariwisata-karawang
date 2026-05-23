import React from 'react';
import Link from 'next/link';

async function getData() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/umkms', { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch:", error);
    return [];
  }
}

export default async function UmkmPage() {
  const data = await getData();

  return (
    <main className="flex-1 flex flex-col py-16 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 capitalize">Umkm Karawang</h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Jelajahi berbagai umkm menarik yang ada di wilayah Kabupaten Karawang.
          </p>
        </div>
        
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.map((item: any) => (
              <Link href={`/umkm/${item.id}`} key={item.id} className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="h-56 bg-zinc-200 dark:bg-zinc-800 w-full flex items-center justify-center text-zinc-400 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/30 transition-colors duration-500 z-10"></div>
                  {/* Image placeholder */}
                  <span className="z-0">No Image</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">{item.category || 'Kategori'}</span>
                  <h3 className="text-xl font-semibold mt-2 mb-3 text-zinc-900 dark:text-white group-hover:text-primary transition-colors">{item.name || item.business_name || item.event_name || item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3">
                    {item.description || item.product_description || 'Deskripsi tidak tersedia.'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center p-16 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700 shadow-sm">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-zinc-400">📄</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">Belum ada data umkm yang ditambahkan.</p>
          </div>
        )}
      </div>
    </main>
  );
}
