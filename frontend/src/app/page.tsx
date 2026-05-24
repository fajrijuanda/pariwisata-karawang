/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '../utils/api';

type Destinasi = {
  id: number;
  name: string;
  category?: string;
  description?: string;
  photo_gallery?: string[];
};

async function getDestinasis() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/destinasis`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const stripHtml = (html?: string) => (html || '').replace(/<[^>]*>?/gm, '');

const highlights = [
  ['Destinasi', 'Wisata alam, sejarah, dan ruang rekreasi Karawang.'],
  ['Budaya', 'Cerita lokal, tradisi, dan identitas daerah.'],
  ['UMKM', 'Produk unggulan warga untuk ditemukan lebih mudah.'],
];

export default async function Home() {
  const destinasis: Destinasi[] = await getDestinasis();
  const featured = destinasis.slice(0, 3);

  return (
    <main className="relative flex-1">
      <section className="relative min-h-[760px] overflow-hidden px-6 pb-24 pt-16 md:px-12">
        <div className="hero-arc" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-[#d7c8ff] backdrop-blur">
            Aizu Karawang
          </span>
          <h1 className="mt-10 max-w-4xl text-5xl font-black leading-[1.02] text-white md:text-7xl">
            Empower Modern <span className="text-[#9f92bd]">Karawang</span> Experience
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#b8acd2] md:text-lg">
            Satu portal custom untuk menampilkan wisata, budaya, UMKM, agenda, dan artikel dengan rasa visual yang lebih premium.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/destinasi" className="rounded-full bg-gradient-to-b from-[#b58aff] to-[#6f35e8] px-7 py-3 text-sm font-black text-white shadow-[0_16px_42px_rgba(126,61,255,.42)]">
              Jelajahi Sekarang
            </Link>
            <Link href="/artikel" className="rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10">
              Baca Artikel
            </Link>
          </div>

          <div className="mt-16 grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-[#1b0f42]/70 backdrop-blur-xl md:grid-cols-3">
            {highlights.map(([title, text]) => (
              <div key={title} className="border-white/10 p-7 text-left md:border-r last:md:border-r-0">
                <div className="text-3xl font-black text-white">100%</div>
                <h2 className="mt-2 text-lg font-bold text-white">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#aaa0c4]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-[#d7c8ff]">Portal Karawang</span>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black leading-tight text-white md:text-5xl">
            Innovative problem-solving for local discovery
          </h2>
          <div className="relative mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="soft-ring left-1/2 top-8 hidden h-[320px] w-[320px] -translate-x-1/2 md:block" />
            {[
              ['Kurasi Konten', 'Admin dapat mengelola destinasi, budaya, UMKM, agenda, dan artikel dari panel custom.'],
              ['Visual Premium', 'Frontend memakai komposisi gelap, kaca, orbit, dan aksen ungu seperti referensi.'],
              ['API Tetap Ringan', 'Data tetap disajikan melalui endpoint Laravel agar mudah dikembangkan.'],
            ].map(([title, text], index) => (
              <article key={title} className={`glass-panel relative rounded-2xl p-6 text-left ${index === 1 ? 'md:mt-16' : ''}`}>
                <div className="mb-7 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-b from-[#c9adff] to-[#7437ec] font-black text-white shadow-[0_0_28px_rgba(155,92,255,.5)]">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#aaa0c4]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="destinasi" className="relative px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-[#d7c8ff]">Featured</span>
            <h2 className="mt-5 text-3xl font-black text-white md:text-5xl">Destinasi Pilihan</h2>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {featured.map((item, idx) => {
                const imgUrl = Array.isArray(item.photo_gallery) ? item.photo_gallery[0] : null;

                return (
                  <Link href={`/destinasi/${item.id}`} key={item.id} className={`glass-panel group overflow-hidden rounded-2xl ${idx === 1 ? 'md:-mt-8' : ''}`}>
                    <div className="relative h-64 overflow-hidden bg-white/5">
                      {imgUrl ? (
                        <img src={imgUrl} alt={item.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="grid h-full place-items-center text-sm font-semibold text-[#aaa0c4]">Belum Ada Foto</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050014] via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-black uppercase tracking-[0.18em] text-[#b995ff]">{item.category || 'Wisata'}</span>
                      <h3 className="mt-3 text-xl font-black text-white">{item.name}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#aaa0c4]">{stripHtml(item.description) || 'Deskripsi belum tersedia.'}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center text-[#aaa0c4]">Belum ada destinasi yang ditambahkan.</div>
          )}
        </div>
      </section>
    </main>
  );
}
