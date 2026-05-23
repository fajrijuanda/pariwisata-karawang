import React from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '../../utils/api';

async function getDetail(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/agendas/${id}`, { next: { revalidate: 0 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function AgendaDetail({ params }: { params: { id: string } }) {
  const data = await getDetail(params.id);

  if (!data) {
    return (
      <main className="flex-1 flex flex-col py-32 items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">Data Tidak Ditemukan</h1>
        <Link href="/agenda" className="text-primary hover:underline">Kembali ke daftar agenda</Link>
      </main>
    );
  }

  let imgUrl = null;
  if (data.poster) {
      if (Array.isArray(data.poster) && data.poster.length > 0) {
          imgUrl = data.poster[0];
      } else if (typeof data.poster === 'string') {
          imgUrl = data.poster;
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
            {data.location || 'Agenda'}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{data.name || data.business_name || data.event_name || data.title}</h1>
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
                    <span className="text-zinc-500 dark:text-zinc-400 mb-1">Lokasi</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{data.location || '-'}</span>
                  </li>
                  <li className="flex flex-col mb-4">
                    <span className="text-zinc-500 dark:text-zinc-400 mb-1">Tanggal Mulai</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{data.start_date || '-'}</span>
                  </li>
                  <li className="flex flex-col mb-4">
                    <span className="text-zinc-500 dark:text-zinc-400 mb-1">Tanggal Selesai</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{data.end_date || '-'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
