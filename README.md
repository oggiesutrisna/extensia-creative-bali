# Extensia Creative Bali

> Studio Pengembangan Aplikasi & Software Kustom Berbasis di Bali (Canggu & Denpasar).

Landing page resmi **Extensia Creative Bali** dengan gaya desain **Neubrutalism Bali Tech** dan halaman produk khusus untuk **vexaPOS** (Sistem Point of Sale & Inventaris Cloud Multi-Outlet).

---

## 🌴 Fitur Utama

- **Neubrutalism Bali Tech Design**: Menggabungkan estetika arsitektur software modern dengan kearifan budaya Bali.
- **Tipografi Kelas Dunia**: Menggunakan **Clash Display** (Fontshare) untuk headline tegas dan **Plus Jakarta Sans** untuk readability tinggi.
- **Jam WITA Real-Time**: Ticker jam Bali (UTC+8) otomatis berjalan secara live.
- **Showcase Proyek Interaktif**: Dilengkapi filter kategori dinamis (*F&B & POS, Villa & Hospitality, GPS & Armada Tracker*).
- **Halaman Khusus vexaPOS (`vexapos.html`)**: Ulasan lengkap fitur 100% offline-ready, KDS dapur, live owner dashboard, social proof dari 25+ klien di Bali, serta rincian paket berlangganan.
- **Tech Stack**: Laravel 11, TanStack Suite, dan Python Data/AI Engine.
- **Mobile Responsive**: Tampilan adaptif untuk desktop, tablet, dan smartphone.

---

## 📁 Struktur File

```
extensia-creative-bali/
│
├── assets/
│   ├── css/
│   │   ├── style.css                            # Reset layer base, scrollbar, & styling global
│   │   ├── input.css                            # Tailwind directives (source)
│   │   └── compiled.css                         # Tailwind production build (25KB, commit ke Vercel)
│   ├── js/
│   │   └── script.js                            # Interaktivitas (jam WITA, filter, nav, lang ID/EN)
│   └── images/
│       ├── extensia-logo-512.png                # Logo header/footer optimized (116KB)
│       ├── favicon-32.png                       # Favicon 32px (~2KB)
│       ├── apple-touch-icon.png                 # Apple touch 180px (~24KB)
│       ├── og-cover.jpg                         # OG social 1200x630 (~28KB)
│       ├── hero-bg-clean.webp                   # Ilustrasi seni Balinese tech (unreferenced, opsional)
│       ├── mandala-corner.webp                  # Ornamen mandala (unreferenced, opsional)
│       ├── frangipani.webp                      # Ornamen bunga jepun (unreferenced, opsional)
│       └── logo.svg / hero-mockup.svg / og-preview.svg
│
├── index.html                                   # Landing page utama Extensia Creative Bali
├── vexapos.html                                 # Halaman produk & showcase klien vexaPOS
├── vercel.json                                  # Clean URLs, cache & security headers
├── robots.txt / sitemap.xml / site.webmanifest
├── tailwind.config.js / postcss.config.js / package.json  # Build: npm run build:css
└── README.md
```

---

## 🚀 Deploy ke Vercel

Proyek ini adalah static site modern yang siap di-deploy langsung ke Vercel:

1. Push repository ini ke GitHub.
2. Buka [Vercel Dashboard](https://vercel.com/new).
3. Import repository `extensia-creative-bali`.
4. Framework **Other**, Root `./` — sudah di-pin via `vercel.json`
   (`framework: null`, `buildCommand: npm run build`, `outputDirectory: .`),
   jadi override dashboard tidak diperlukan. Setiap deploy otomatis
   me-regenerate `assets/css/compiled.css` dari HTML/JS terbaru.
5. Klik **Deploy**.

---

&copy; 2026 **Extensia Creative Bali**. All rights reserved.
