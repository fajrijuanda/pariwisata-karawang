import os

base_dir = r"d:\Freelance\Aizu\frontend\src\app"

pages = {
    "budaya": {
        "title": "Budaya",
        "category_field": "category",
        "desc_field": "description",
        "photo_field": "photo_gallery",
        "info": [
            {"label": "Kategori", "val": "data.category"},
            {"label": "Sejarah", "val": "data.history", "html": True}
        ]
    },
    "umkm": {
        "title": "Umkm",
        "category_field": "category",
        "desc_field": "product_description",
        "photo_field": "photo",
        "info": [
            {"label": "Kategori", "val": "data.category"},
            {"label": "Nama Pemilik", "val": "data.owner_name"},
            {"label": "Kontak WA", "val": "data.contact_wa"},
            {"label": "E-Commerce", "val": "data.ecommerce_link", "link": True}
        ]
    },
    "agenda": {
        "title": "Agenda",
        "category_field": "location",
        "desc_field": "description",
        "photo_field": "poster",
        "info": [
            {"label": "Lokasi", "val": "data.location"},
            {"label": "Tanggal Mulai", "val": "data.start_date"},
            {"label": "Tanggal Selesai", "val": "data.end_date"}
        ]
    },
    "artikel": {
        "title": "Artikel",
        "category_field": "category",
        "desc_field": "content",
        "photo_field": "thumbnail",
        "info": [
            {"label": "Penulis", "val": "data.author"},
            {"label": "Kategori", "val": "data.category"},
            {"label": "Tanggal Rilis", "val": "data.published_at"}
        ]
    }
}

# Add Artikel folder since it wasn't scaffolded before
os.makedirs(os.path.join(base_dir, "artikel"), exist_ok=True)
os.makedirs(os.path.join(base_dir, "artikel", "[id]"), exist_ok=True)

# 1. Update Grid Pages (page.tsx)
for page, conf in pages.items():
    grid_path = os.path.join(base_dir, page, "page.tsx")
    comp_name = conf["title"]
    
    content = f"""import React from 'react';
import Link from 'next/link';

async function getData() {{
  try {{
    const res = await fetch('http://127.0.0.1:8000/api/{page}s', {{ next: {{ revalidate: 0 }} }});
    if (!res.ok) return [];
    return res.json();
  }} catch (error) {{
    return [];
  }}
}}

export default async function {comp_name}Page() {{
  const data = await getData();

  // Helper to strip HTML tags for preview
  const stripHtml = (html: string) => {{
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
  }};

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
            {{data.map((item: any, idx: number) => {{
              let imgUrl = null;
              if (item.{conf['photo_field']}) {{
                  if (Array.isArray(item.{conf['photo_field']}) && item.{conf['photo_field']}.length > 0) {{
                      imgUrl = item.{conf['photo_field']}[0];
                  }} else if (typeof item.{conf['photo_field']} === 'string') {{
                      imgUrl = item.{conf['photo_field']};
                  }}
              }}
              
              return (
              <Link href={{`/{page}/${{item.id}}`}} key={{item.id}} className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up" style={{{{ animationDelay: `${{idx * 0.1}}s` }}}}>
                <div className="h-56 bg-zinc-200 dark:bg-zinc-800 w-full flex items-center justify-center text-zinc-400 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/30 transition-colors duration-500 z-10"></div>
                  {{imgUrl ? (
                      <img src={{imgUrl}} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                      <span className="z-0">No Image</span>
                  )}}
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">{{item.{conf['category_field']} || 'Umum'}}</span>
                  <h3 className="text-xl font-semibold mt-2 mb-3 text-zinc-900 dark:text-white group-hover:text-primary transition-colors">{{item.name || item.business_name || item.event_name || item.title}}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3">
                    {{stripHtml(item.{conf['desc_field']}) || 'Deskripsi tidak tersedia.'}}
                  </p>
                </div>
              </Link>
            )}})}}
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
    with open(grid_path, "w", encoding='utf-8') as f:
        f.write(content)

# 2. Detail Pages ([id]/page.tsx)
for page, conf in pages.items():
    detail_dir = os.path.join(base_dir, page, "[id]")
    os.makedirs(detail_dir, exist_ok=True)
    comp_name = conf["title"] + "Detail"
    
    info_list = ""
    for info in conf["info"]:
        if info.get("html"):
            info_list += f"""
                  <li className="flex flex-col mb-4">
                    <span className="text-zinc-500 dark:text-zinc-400 mb-1">{info['label']}</span>
                    <div className="font-medium text-zinc-900 dark:text-white prose dark:prose-invert max-w-none text-sm" dangerouslySetInnerHTML={{{{__html: {info['val']} || '-'}}}}></div>
                  </li>"""
        elif info.get("link"):
            info_list += f"""
                  <li className="flex flex-col mb-4">
                    <span className="text-zinc-500 dark:text-zinc-400 mb-1">{info['label']}</span>
                    {{{info['val']} ? <a href={{{info['val']}}} target="_blank" rel="noreferrer" className="font-medium text-primary hover:underline">Kunjungi Link</a> : '-'}}
                  </li>"""
        else:
            info_list += f"""
                  <li className="flex flex-col mb-4">
                    <span className="text-zinc-500 dark:text-zinc-400 mb-1">{info['label']}</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{{{info['val']} || '-'}}</span>
                  </li>"""

    content = f"""import React from 'react';
import Link from 'next/link';

async function getDetail(id: string) {{
  try {{
    const res = await fetch(`http://127.0.0.1:8000/api/{page}s/${{id}}`, {{ next: {{ revalidate: 0 }} }});
    if (!res.ok) return null;
    return res.json();
  }} catch (error) {{
    return null;
  }}
}}

export default async function {comp_name}({{ params }}: {{ params: {{ id: string }} }}) {{
  const data = await getDetail(params.id);

  if (!data) {{
    return (
      <main className="flex-1 flex flex-col py-32 items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">Data Tidak Ditemukan</h1>
        <Link href="/{page}" className="text-primary hover:underline">Kembali ke daftar {page}</Link>
      </main>
    );
  }}

  let imgUrl = null;
  if (data.{conf['photo_field']}) {{
      if (Array.isArray(data.{conf['photo_field']}) && data.{conf['photo_field']}.length > 0) {{
          imgUrl = data.{conf['photo_field']}[0];
      }} else if (typeof data.{conf['photo_field']} === 'string') {{
          imgUrl = data.{conf['photo_field']};
      }}
  }}

  return (
    <main className="flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950">
      {{/* Detail Hero */}}
      <section className="w-full h-[500px] bg-zinc-800 relative flex items-end justify-center pb-16 overflow-hidden">
        {{imgUrl && <img src={{imgUrl}} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />}}
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-4xl animate-fade-in-up">
          <span className="px-3 py-1 rounded-full bg-secondary/80 text-white text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            {{data.{conf['category_field']} || '{conf['title']}'}}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{{data.name || data.business_name || data.event_name || data.title}}</h1>
        </div>
      </section>

      {{/* Content */}}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto w-full -mt-20 relative z-30">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 md:p-12 border border-zinc-100 dark:border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6 border-b pb-4 dark:border-zinc-800">Deskripsi Utama</h2>
              <div 
                className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{{{__html: data.{conf['desc_field']} || '<p>Deskripsi belum tersedia.</p>'}}}}
              />
            </div>
            <div className="space-y-6">
              <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 border-b pb-2 dark:border-zinc-800">Informasi Singkat</h3>
                <ul className="text-sm">
                  {info_list}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}}
"""
    with open(os.path.join(detail_dir, "page.tsx"), "w", encoding='utf-8') as f:
        f.write(content)

print("Frontend patched successfully.")
