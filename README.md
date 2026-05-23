# 🏛️ Portal Pariwisata Kabupaten Karawang

Selamat datang di repositori resmi **Sistem Informasi Pariwisata Kabupaten Karawang**. Repositori ini merupakan solusi *full-stack* modern yang mengintegrasikan panel pengelolaan konten (CMS) berbasis **Laravel** dengan antarmuka portal pengunjung berkinerja tinggi menggunakan **Next.js**.

Proyek ini dibangun untuk mendigitalkan potensi daerah Karawang yang mencakup Destinasi Wisata, Budaya & Seni, Katalog UMKM & Kuliner, hingga Kalender Agenda (Event) Pariwisata.

---

## 🚀 Arsitektur & Teknologi Utama

Sistem ini mengadopsi arsitektur *Decoupled/Headless* di mana Backend (API/CMS) dan Frontend (UI) dikembangkan secara terpisah namun dapat saling terhubung melalui REST API.

**Frontend (Client Portal):**
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Bahasa:** TypeScript
- **Fitur Utama:** Dynamic Routing, API Fetching, Animasi Modern (Fade-in-up, hover interactions), UI/UX Responsif (Dark/Light mode).

**Backend (API & Admin Panel):**
- **Framework Utama:** [Laravel 11](https://laravel.com/)
- **Admin Panel:** [FilamentPHP](https://filamentphp.com/) v3 (TALL Stack)
- **Database:** SQLite (Default for Development) / MySQL (Production Ready)
- **Autentikasi API:** Laravel Sanctum

---

## 📁 Struktur Direktori Repositori

```text
pariwisata-karawang/
├── backend/            # Root folder aplikasi Laravel (API & Filament Admin)
│   ├── app/Models/     # Model Eloquent (Destinasi, Budaya, Umkm, Agenda, Artikel)
│   ├── app/Filament/   # Konfigurasi antarmuka CMS Filament (Resources)
│   ├── routes/api.php  # Endpoint API untuk disuplai ke Frontend
│   └── database/       # Migrasi tabel dan database SQLite bawaan
│
├── frontend/           # Root folder aplikasi Next.js (Portal Publik)
│   ├── src/app/        # Halaman-halaman Next.js (Destinasi, Budaya, UMKM, dll)
│   └── src/components/ # Komponen UI Reusable (Navbar, Footer)
│
└── README.md           # Dokumentasi Proyek
```

---

## 🛠️ Panduan Instalasi & Menjalankan Aplikasi (Local Development)

Ikuti langkah-langkah di bawah ini untuk menjalankan kedua aplikasi di mesin lokal Anda. Pastikan Anda telah menginstal:
- **PHP** (Min. v8.2) & **Composer**
- **Node.js** (Min. v18) & **NPM**
- **Git**

### 1. Menjalankan Backend (Laravel & Admin Panel)

Buka terminal pertama Anda, kemudian arahkan ke direktori backend:

```bash
cd backend
```

Lakukan instalasi dependensi PHP:
```bash
composer install
```

Salin file konfigurasi bawaan Laravel:
```bash
cp .env.example .env
```

*Generate* kunci enkripsi Laravel:
```bash
php artisan key:generate
```

Lakukan migrasi database (jika Anda ingin mengulang/memastikan skema):
```bash
php artisan migrate
```

Jalankan *local server* Backend:
```bash
php artisan serve
```

> **Backend** kini dapat diakses melalui `http://127.0.0.1:8000`.
> **Panel Admin** dapat diakses melalui `http://127.0.0.1:8000/admin`.
> *Gunakan fitur "Create User" di Filament atau seeder untuk masuk ke dashboard.*

### 2. Menjalankan Frontend (Next.js)

Buka terminal kedua (biarkan terminal backend tetap berjalan), lalu arahkan ke direktori frontend:

```bash
cd frontend
```

Instal dependensi *Node Modules*:
```bash
npm install
```

Jalankan *local development server*:
```bash
npm run dev
```

> **Frontend** kini dapat diakses melalui `http://localhost:3000`.

---

## 🌐 Endpoints API (Public)

Berikut adalah daftar rute REST API yang disuplai oleh Backend untuk digunakan oleh Next.js atau aplikasi pihak ketiga (Mobile App, dll):

| Modul | Method | Endpoint | Deskripsi |
| --- | --- | --- | --- |
| **Destinasi** | GET | `/api/destinasis` | Menarik daftar semua destinasi wisata |
| | GET | `/api/destinasis/{id}` | Menarik detail destinasi spesifik |
| **Budaya** | GET | `/api/budayas` | Menarik daftar budaya & seni lokal |
| | GET | `/api/budayas/{id}` | Menarik detail budaya spesifik |
| **UMKM** | GET | `/api/umkms` | Menarik katalog produk UMKM/Oleh-oleh |
| | GET | `/api/umkms/{id}` | Menarik detail spesifik produk UMKM |
| **Agenda** | GET | `/api/agendas` | Menarik daftar jadwal event pariwisata |
| | GET | `/api/agendas/{id}` | Menarik detail agenda event spesifik |
| **Artikel** | GET | `/api/artikels` | Menarik berita / artikel terkait Karawang |
| | GET | `/api/artikels/{id}` | Menarik detail konten artikel spesifik |

---

## 🎨 Konvensi Desain (Aesthetics)

Frontend mengusung desain yang modern dan mengagumkan dengan pedoman tema:
- **Warna Utama (Primary):** Hijau Khas Karawang (`#15803d` / Green 700)
- **Warna Sekunder (Secondary):** Kuning Emas Karawang (`#ca8a04` / Yellow 600)
- **Typografi:** Font *Sans-serif* bersih (Geist Sans) untuk keterbacaan yang maksimal.
- **Interaksi:** Menerapkan *Glassmorphism*, transisi elevasi kartu (shadow & hover translate), dan elemen kemunculan dengan *fade-in-up* untuk memberikan rasa navigasi aplikasi premium.

---

## 🛡️ Rencana Peningkatan (Roadmap)

Beberapa fitur yang direkomendasikan untuk pengembangan selanjutnya:
1. **Integrasi Storage (S3 / Cloudinary):** Untuk manajemen aset galeri foto yang masif dan ringan di production.
2. **Autentikasi Publik (User Registration):** Fitur agar pengguna luar dapat menyimpan rute wisata/membuat "*wishlist*" destinasi favorit.
3. **Pencarian Global (Global Search):** Menerapkan modul *search* untuk mencari UMKM atau Wisata dari kotak pencarian *header*.
4. **Sistem Rating/Ulasan:** Penambahan tabel ulasan (*Review*) dari pengunjung terhadap destinasi tertentu.

---
**Dibuat dan dikembangkan untuk memajukan pariwisata daerah Karawang.** 🌿
