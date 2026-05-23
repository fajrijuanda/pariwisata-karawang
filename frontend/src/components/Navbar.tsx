import React from 'react';
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
