import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden px-6 pb-14 pt-20 text-[#aaa0c4] md:px-12">
      <div className="pointer-events-none absolute -bottom-72 left-1/2 h-[360px] w-[120vw] -translate-x-1/2 rounded-t-[50%] border-t border-white/50 bg-[radial-gradient(ellipse_at_top,rgba(155,92,255,.65),transparent_58%)] shadow-[0_-34px_70px_rgba(130,61,255,.5)]" />
      <div className="relative mx-auto mb-10 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-4">
        <div className="col-span-1 md:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,#ad7cff_32%,#4c12b9_76%)] text-sm font-black text-white">A</div>
            <span className="text-lg font-bold text-white">Aizu Karawang</span>
          </div>
          <p className="max-w-sm text-sm leading-6">
            Portal informasi destinasi wisata, budaya, UMKM, agenda, dan artikel Karawang dengan tampilan custom modern.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-white">Jelajahi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/destinasi" className="transition-colors hover:text-white">Destinasi</Link></li>
            <li><Link href="/budaya" className="transition-colors hover:text-white">Budaya</Link></li>
            <li><Link href="/umkm" className="transition-colors hover:text-white">UMKM</Link></li>
            <li><Link href="/agenda" className="transition-colors hover:text-white">Agenda</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-white">Kontak</h4>
          <ul className="space-y-2 text-sm">
            <li>Dinas Pariwisata Karawang</li>
            <li>info@karawang.go.id</li>
          </ul>
        </div>
      </div>
      <div className="relative mx-auto max-w-6xl border-t border-white/10 pt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} Aizu Karawang. All rights reserved.
      </div>
    </footer>
  );
}
