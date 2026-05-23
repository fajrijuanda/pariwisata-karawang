import React from 'react';
import Link from 'next/link';

async function getDestinasi(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/destinasis/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function DestinasiDetail({ params }: { params: { id: string } }) {
  const data = await getDestinasi(params.id);

  if (!data) {
    return (
      <main className="flex-1 flex flex-col py-32 items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">Destinasi Tidak Ditemukan</h1>
        <Link href="/destinasi" className="text-primary hover:underline">Kembali ke daftar destinasi</Link>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Detail Hero */}
      <section className="w-full h-[500px] bg-zinc-800 relative flex items-end justify-center pb-16">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in-up">
          <span className="px-3 py-1 rounded-full bg-secondary/80 text-white text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            {data.category || 'Wisata'}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{data.name}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto w-full -mt-20 relative z-20">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 md:p-12 border border-zinc-100 dark:border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6 border-b pb-4 dark:border-zinc-800">Deskripsi</h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
                {data.description || 'Deskripsi belum tersedia untuk destinasi ini.'}
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Informasi Praktis</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex flex-col">
                    <span className="text-zinc-500 dark:text-zinc-400 mb-1">Harga Tiket Masuk</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{data.htm || 'Gratis / Menyesuaikan'}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-zinc-500 dark:text-zinc-400 mb-1">Jam Operasional</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{data.open_hours || 'Buka 24 Jam'}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-zinc-500 dark:text-zinc-400 mb-1">Fasilitas</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{data.facilities || '-'}</span>
                  </li>
                </ul>
              </div>
              <a href={data.map_coordinates || '#'} target="_blank" rel="noreferrer" className="w-full block text-center px-4 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow">
                Lihat di Peta
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
