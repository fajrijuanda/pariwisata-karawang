import React from 'react';
import Link from 'next/link';
import { ADMIN_URL } from '../utils/api';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[#100825]/70 px-4 py-3 shadow-2xl shadow-black/25 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,#ad7cff_32%,#4c12b9_76%)] text-sm font-black text-white shadow-[0_0_28px_rgba(155,92,255,.65)]">
            A
          </div>
          <span className="text-sm font-bold text-white md:text-base">Aizu Karawang</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold text-[#d7c8ff] md:flex">
          <Link href="/" className="rounded-full px-3 py-2 transition-colors hover:bg-white/10 hover:text-white">Home</Link>
          <Link href="/destinasi" className="rounded-full px-3 py-2 transition-colors hover:bg-white/10 hover:text-white">Destinasi</Link>
          <Link href="/budaya" className="rounded-full px-3 py-2 transition-colors hover:bg-white/10 hover:text-white">Budaya</Link>
          <Link href="/umkm" className="rounded-full px-3 py-2 transition-colors hover:bg-white/10 hover:text-white">UMKM</Link>
          <Link href="/agenda" className="rounded-full px-3 py-2 transition-colors hover:bg-white/10 hover:text-white">Agenda</Link>
          <Link href="/artikel" className="rounded-full px-3 py-2 transition-colors hover:bg-white/10 hover:text-white">Artikel</Link>
        </nav>

        <a href={ADMIN_URL} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-white/10">
          Admin
        </a>
      </div>
    </header>
  );
}
