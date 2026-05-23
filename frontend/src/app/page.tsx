import React from 'react';

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
    // In production, use environment variable for API URL
    const res = await fetch('http://127.0.0.1:8000/api/destinasis', { next: { revalidate: 60 } });
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
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-900 font-sans">
      {/* Navbar */}
      <header className="w-full py-4 px-6 md:px-12 bg-white dark:bg-black shadow-sm flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          {/* Logo / Brand */}
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
            K
          </div>
          <span className="text-xl font-semibold text-primary dark:text-white">Pariwisata Karawang</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <a href="#" className="hover:text-primary transition-colors">Beranda</a>
          <a href="#destinasi" className="hover:text-primary transition-colors">Destinasi</a>
          <a href="#" className="hover:text-primary transition-colors">Budaya & Seni</a>
          <a href="#" className="hover:text-primary transition-colors">UMKM</a>
          <a href="#" className="hover:text-primary transition-colors">Agenda</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="http://127.0.0.1:8000/admin" target="_blank" rel="noreferrer" className="hidden md:block text-sm font-medium hover:text-primary">Admin Panel</a>
          <a href="#destinasi" className="px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-full shadow hover:bg-opacity-90 transition-all">
            Eksplor Sekarang
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="relative w-full h-[600px] flex items-center justify-center bg-zinc-800 overflow-hidden">
          <div className="absolute inset-0 bg-primary opacity-20 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mt-16">
            <span className="px-4 py-1.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-medium mb-6 backdrop-blur-sm">
              Jelajahi Pesona Jawa Barat
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
              Pesona Budaya & Wisata <br />
              <span className="text-secondary">Karawang</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 mb-10 max-w-2xl drop-shadow">
              Temukan keindahan destinasi wisata, kekayaan budaya, hingga beragam produk UMKM unggulan dari Kabupaten Karawang di satu tempat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#destinasi" className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition-all transform hover:-translate-y-1">
                Mulai Petualangan
              </a>
            </div>
          </div>
        </section>

        {/* Dynamic Destinasi Section */}
        <section id="destinasi" className="py-20 px-6 md:px-12 bg-white dark:bg-zinc-950">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Destinasi Pilihan</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Eksplorasi tempat-tempat menarik di Karawang yang siap menyambut liburan Anda.
              </p>
            </div>
            
            {destinasis.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {destinasis.map((item) => (
                  <div key={item.id} className="rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all group">
                    <div className="h-48 bg-zinc-200 dark:bg-zinc-800 w-full flex items-center justify-center text-zinc-400 overflow-hidden relative">
                      {/* Placeholder Image until actual API uploads are handled */}
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors"></div>
                      <span>No Image</span>
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">{item.category || 'Wisata Alam'}</span>
                      <h3 className="text-xl font-semibold mt-2 mb-3 text-zinc-900 dark:text-white">{item.name}</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3">
                        {item.description || 'Deskripsi belum tersedia.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
                <p className="text-zinc-500 dark:text-zinc-400">Belum ada destinasi yang ditambahkan. Silakan tambahkan melalui Panel Admin.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-12 px-6 md:px-12 border-t border-zinc-800">
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
              <li><a href="#" className="hover:text-primary transition-colors">Destinasi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Budaya & Seni</a></li>
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
    </div>
  );
}
