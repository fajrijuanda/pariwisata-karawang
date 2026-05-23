import os

base_dir = r"d:\Freelance\Aizu\frontend\src"
components_dir = os.path.join(base_dir, "components")
app_dir = os.path.join(base_dir, "app")

os.makedirs(components_dir, exist_ok=True)

# 1. Navbar.tsx
navbar_content = """import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full py-4 px-6 md:px-12 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:bg-secondary transition-colors duration-300">
            K
          </div>
          <span className="text-xl font-semibold text-primary dark:text-white group-hover:text-secondary transition-colors duration-300">Pariwisata Karawang</span>
        </Link>
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
        <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
        <Link href="/destinasi" className="hover:text-primary transition-colors">Destinasi</Link>
        <Link href="/budaya" className="hover:text-primary transition-colors">Budaya & Seni</Link>
        <Link href="/umkm" className="hover:text-primary transition-colors">UMKM</Link>
        <Link href="/agenda" className="hover:text-primary transition-colors">Agenda</Link>
      </nav>
      <div className="flex items-center gap-4">
        <a href="http://127.0.0.1:8000/admin" target="_blank" rel="noreferrer" className="hidden md:block text-sm font-medium hover:text-primary">Admin Panel</a>
        <Link href="/destinasi" className="px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-full shadow hover:bg-opacity-90 hover:scale-105 transition-all duration-300">
          Eksplor Sekarang
        </Link>
      </div>
    </header>
  );
}
"""
with open(os.path.join(components_dir, "Navbar.tsx"), "w", encoding='utf-8') as f:
    f.write(navbar_content)

# 2. Footer.tsx
footer_content = """import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 px-6 md:px-12 border-t border-zinc-800 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">K</div>
            <span className="text-lg font-semibold text-white">Pariwisata Karawang</span>
          </div>
          <p className="text-sm max-w-sm">
            Portal resmi informasi destinasi wisata, budaya, kuliner, dan UMKM Kabupaten Karawang.
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Jelajahi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/destinasi" className="hover:text-primary transition-colors">Destinasi</Link></li>
            <li><Link href="/budaya" className="hover:text-primary transition-colors">Budaya & Seni</Link></li>
            <li><Link href="/umkm" className="hover:text-primary transition-colors">UMKM & Oleh-oleh</Link></li>
            <li><Link href="/agenda" className="hover:text-primary transition-colors">Agenda Event</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Kontak</h4>
          <ul className="space-y-2 text-sm">
            <li>Dinas Pariwisata Karawang</li>
            <li>info@karawang.go.id</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-8 border-t border-zinc-800 text-sm text-center">
        &copy; {new Date().getFullYear()} Pariwisata Karawang. All rights reserved.
      </div>
    </footer>
  );
}
"""
with open(os.path.join(components_dir, "Footer.tsx"), "w", encoding='utf-8') as f:
    f.write(footer_content)

# 3. Create pages
pages = ["destinasi", "budaya", "umkm", "agenda"]

for page in pages:
    p_dir = os.path.join(app_dir, page)
    os.makedirs(p_dir, exist_ok=True)
    
    # Capitalize for component name
    comp_name = page.capitalize()
    
    content = f"""import React from 'react';
import Link from 'next/link';

async function getData() {{
  try {{
    const res = await fetch('http://127.0.0.1:8000/api/{page}s', {{ next: {{ revalidate: 60 }} }});
    if (!res.ok) return [];
    return res.json();
  }} catch (error) {{
    console.error("Failed to fetch:", error);
    return [];
  }}
}}

export default async function {comp_name}Page() {{
  const data = await getData();

  return (
    <main className="flex-1 flex flex-col py-16 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 capitalize">{comp_name} Karawang</h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Jelajahi berbagai {page} menarik yang ada di wilayah Kabupaten Karawang.
          </p>
        </div>
        
        {{data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {{data.map((item: any) => (
              <Link href={{`/{page}/${{item.id}}`}} key={{item.id}} className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="h-56 bg-zinc-200 dark:bg-zinc-800 w-full flex items-center justify-center text-zinc-400 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/30 transition-colors duration-500 z-10"></div>
                  {{/* Image placeholder */}}
                  <span className="z-0">No Image</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">{{item.category || 'Kategori'}}</span>
                  <h3 className="text-xl font-semibold mt-2 mb-3 text-zinc-900 dark:text-white group-hover:text-primary transition-colors">{{item.name || item.business_name || item.event_name || item.title}}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3">
                    {{item.description || item.product_description || 'Deskripsi tidak tersedia.'}}
                  </p>
                </div>
              </Link>
            ))}}
          </div>
        ) : (
          <div className="text-center p-16 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700 shadow-sm">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-zinc-400">📄</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">Belum ada data {page} yang ditambahkan.</p>
          </div>
        )}}
      </div>
    </main>
  );
}}
"""
    with open(os.path.join(p_dir, "page.tsx"), "w", encoding='utf-8') as f:
        f.write(content)

# Create detail page for destinasi
destinasi_detail_dir = os.path.join(app_dir, "destinasi", "[id]")
os.makedirs(destinasi_detail_dir, exist_ok=True)

destinasi_detail_content = """import React from 'react';
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
"""
with open(os.path.join(destinasi_detail_dir, "page.tsx"), "w", encoding='utf-8') as f:
    f.write(destinasi_detail_content)

print("Scaffolding complete.")
