export default function Home() {
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
          <a href="#" className="hover:text-primary transition-colors">Destinasi</a>
          <a href="#" className="hover:text-primary transition-colors">Budaya & Seni</a>
          <a href="#" className="hover:text-primary transition-colors">UMKM</a>
          <a href="#" className="hover:text-primary transition-colors">Agenda</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:block text-sm font-medium hover:text-primary">Masuk</a>
          <a href="#" className="px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-full shadow hover:bg-opacity-90 transition-all">
            Eksplor Sekarang
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="relative w-full h-[600px] flex items-center justify-center bg-zinc-800 overflow-hidden">
          {/* Placeholder Background Image */}
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
              <a href="#" className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition-all transform hover:-translate-y-1">
                Mulai Petualangan
              </a>
              <a href="#" className="px-8 py-4 bg-white/10 text-white backdrop-blur-md border border-white/20 text-lg font-semibold rounded-full shadow hover:bg-white/20 transition-all">
                Lihat Agenda Event
              </a>
            </div>
          </div>
        </section>

        {/* Feature Highlights (Brief) */}
        <section className="py-20 px-6 md:px-12 bg-white dark:bg-zinc-950">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Mengapa Karawang?</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
              Dari situs sejarah peninggalan kemerdekaan hingga keindahan alam pesisir dan pegunungan, Karawang menyimpan sejuta cerita yang menanti untuk Anda jelajahi.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Destinasi Wisata', desc: 'Jelajahi pantai, curug, hingga situs sejarah Candi Jiwa.' },
                { title: 'Kesenian Lokal', desc: 'Nikmati ragam seni budaya tari goyang Karawang dan lainnya.' },
                { title: 'Produk UMKM', desc: 'Dukung produk lokal unggulan dan kuliner khas Karawang.' }
              ].map((item, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <div className="w-8 h-8 bg-primary rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">{item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
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
              <li><a href="#" className="hover:text-primary transition-colors">Agenda Event</a></li>
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
