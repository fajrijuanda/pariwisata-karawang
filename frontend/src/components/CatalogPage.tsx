/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { API_BASE_URL } from '../utils/api';

type CatalogValue = string | string[] | number | null | undefined;
type CatalogItem = Record<string, CatalogValue>;

type CatalogPageProps = {
  endpoint: string;
  route: string;
  eyebrow: string;
  title: string;
  description: string;
  imageField: string;
  titleField: string;
  textField: string;
  metaField?: string;
};

async function getData(endpoint: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/${endpoint}`, { next: { revalidate: 0 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const stripHtml = (html?: string) => (html || '').replace(/<[^>]*>?/gm, '');

function getImage(item: CatalogItem, field: string) {
  const value = item[field];
  if (Array.isArray(value)) return value[0] || null;
  return typeof value === 'string' ? value : null;
}

export default async function CatalogPage({
  endpoint,
  route,
  eyebrow,
  title,
  description,
  imageField,
  titleField,
  textField,
  metaField = 'category',
}: CatalogPageProps) {
  const data: CatalogItem[] = await getData(endpoint);

  return (
    <main className="relative flex-1 px-6 pb-24 pt-16 md:px-12">
      <div className="hero-arc opacity-70" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-[#d7c8ff]">{eyebrow}</span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#aaa0c4] md:text-base">{description}</p>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {data.map((item, idx) => {
              const imgUrl = getImage(item, imageField);
              const itemTitle = String(item[titleField] || item.name || item.title || 'Tanpa judul');

              return (
                <Link
                  href={`/${route}/${String(item.id)}`}
                  key={String(item.id)}
                  className={`glass-panel group overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 ${idx % 3 === 1 ? 'md:translate-y-8' : ''}`}
                >
                  <div className="relative h-60 overflow-hidden bg-white/5">
                    {imgUrl ? (
                      <img src={imgUrl} alt={itemTitle} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="grid h-full place-items-center text-sm font-semibold text-[#aaa0c4]">Belum Ada Foto</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050014] via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-[#b995ff]">{String(item[metaField] || 'Karawang')}</span>
                    <h2 className="mt-3 text-xl font-black text-white">{itemTitle}</h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#aaa0c4]">{stripHtml(String(item[textField] || '')) || 'Deskripsi belum tersedia.'}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-12 text-center text-[#aaa0c4]">Belum ada data yang ditambahkan.</div>
        )}
      </div>
    </main>
  );
}
