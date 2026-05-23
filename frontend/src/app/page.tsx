import React from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '../utils/api';

// Type definitions for API response
type Destinasi = {
  id: number;
  name: string;
  category: string;
  description: string;
  photo_gallery: any;
};

// Fetch data function
async function getDestinasis() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/destinasis`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch destinasi:", error);
    return [];
  }
}

export default async function Home() {
  const destinasis: Destinasi[] = await getDestinasis();

  return (
    <main className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center bg-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-20 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mt-16 animate-fade-in-up">
          <span className="px-4 py-1.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-medium mb-6 backdrop-blur-sm shadow-lg">
            Jelajahi Pesona Jawa Barat
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
            Pesona Budaya & Wisata <br />
            <span className="text-secondary drop-shadow-[0_0_15px_rgba(202,138,4,0.5)]">Karawang</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 mb-10 max-w-2xl drop-shadow">
            Temukan keindahan destinasi wisata, kekayaan budaya, hingga beragam produk UMKM unggulan dari Kabupaten Karawang di satu tempat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#destinasi" className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-full shadow-lg shadow-primary/30 hover:bg-green-700 transition-all transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/40 duration-300">
              Mulai Petualangan
            </a>
          </div>
        </div>
      </section>

      {/* Dynamic Destinasi Section */}
      <section id="destinasi" className="py-24 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Destinasi Pilihan</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Eksplorasi tempat-tempat menarik di Karawang yang siap menyambut liburan Anda.
            </p>
          </div>
          
          {destinasis.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {destinasis.map((item, idx) => (
                <Link href={`/destinasi/${item.id}`} key={item.id} className="rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group animate-fade-in-up" style={{animationDelay: `${0.3 + (idx * 0.1)}s`}}>
                  <div className="h-64 bg-zinc-200 dark:bg-zinc-800 w-full flex items-center justify-center text-zinc-400 overflow-hidden relative">
                    {/* Placeholder Image until actual API uploads are handled */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500"></div>
                    <span className="z-0">Belum Ada Foto</span>
                  </div>
                  <div className="p-8">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">{item.category || 'Wisata Alam'}</span>
                    <h3 className="text-2xl font-semibold mt-3 mb-4 text-zinc-900 dark:text-white group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-base line-clamp-3 leading-relaxed">
                      {item.description || 'Deskripsi belum tersedia.'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center p-16 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700 shadow-sm">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-zinc-400">🌴</span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg">Belum ada destinasi yang ditambahkan.</p>
            </div>
          )}
          
          {destinasis.length > 0 && (
            <div className="mt-16 text-center">
              <Link href="/destinasi" className="inline-block px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded-full hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-lg hover:-translate-y-1 duration-300">
                Lihat Semua Destinasi
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
