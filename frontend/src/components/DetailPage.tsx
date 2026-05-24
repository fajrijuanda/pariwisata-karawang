/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { API_BASE_URL } from '../utils/api';

type DetailValue = string | string[] | number | null | undefined;
type DetailItem = Record<string, DetailValue>;

type DetailPageProps = {
  id: string;
  endpoint: string;
  backHref: string;
  imageField: string;
  titleField: string;
  textField: string;
  meta?: (item: DetailItem) => DetailValue;
  facts?: Array<[string, (item: DetailItem) => DetailValue]>;
};

async function getDetail(endpoint: string, id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/${endpoint}/${id}`, { next: { revalidate: 0 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function getImage(item: DetailItem, field: string) {
  const value = item[field];
  if (Array.isArray(value)) return value[0] || null;
  return typeof value === 'string' ? value : null;
}

export default async function DetailPage({
  id,
  endpoint,
  backHref,
  imageField,
  titleField,
  textField,
  meta,
  facts = [],
}: DetailPageProps) {
  const data = await getDetail(endpoint, id);

  if (!data) {
    return (
      <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <div className="hero-arc opacity-60" />
        <div className="glass-panel relative z-10 rounded-2xl p-10">
          <h1 className="mb-4 text-3xl font-black text-white">Data Tidak Ditemukan</h1>
          <Link href={backHref} className="font-bold text-[#c8adff] hover:text-white">Kembali ke daftar</Link>
        </div>
      </main>
    );
  }

  const imgUrl = getImage(data, imageField);
  const title = String(data[titleField] || data.name || data.title || 'Tanpa judul');
  const label = String(meta ? meta(data) : data.category || 'Karawang');

  return (
    <main className="relative flex-1">
      <section className="relative flex min-h-[560px] items-end justify-center overflow-hidden px-6 pb-20 pt-16 text-center md:px-12">
        <div className="hero-arc" />
        {imgUrl && <img src={imgUrl} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-40" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050014] via-[#050014]/56 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#d7c8ff] backdrop-blur">
            {label}
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-7xl">{title}</h1>
        </div>
      </section>

      <section className="relative z-20 mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-24 md:-mt-14 md:grid-cols-[1fr_340px] md:px-12">
        <article className="glass-panel rounded-2xl p-7 md:p-10">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#b995ff]">Detail</span>
          <div
            className="mt-5 text-base leading-8 text-[#d8d0ea] [&_p]:mb-5 [&_strong]:text-white"
            dangerouslySetInnerHTML={{ __html: String(data[textField] || '<p>Deskripsi belum tersedia.</p>') }}
          />
        </article>

        <aside className="glass-panel h-fit rounded-2xl p-6">
          <h2 className="text-xl font-black text-white">Informasi Singkat</h2>
          <div className="mt-5 grid gap-4">
            {facts.map(([label, getter]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#9f92bd]">{label}</div>
                <div className="mt-2 break-words text-sm font-bold text-white">{String(getter(data) || '-')}</div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
