import React from 'react';
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
