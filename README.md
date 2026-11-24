# Timehouse Creative Bali

> Situs web resmi **Timehouse Creative Bali**, studio rekayasa perangkat lunak berbasis di Canggu dan Denpasar, Bali.

Repositori ini berisi halaman utama minimalis **TIMEHOUSE** (`index.html`) serta halaman produk **VexaPOS** (`vexapos.html`) untuk sistem Point of Sale (POS) offline-first F&B di Bali.

---

## Halaman Utama & Produk

### 1. Halaman Utama Minimalis (`index.html`)
- **Tampilan Layar Tunggal**: Menampilkan judul **TIMEHOUSE** dan subjudul **COMING SOON** tepat di tengah layar (`min-height: 100dvh`) dengan latar putih solid (`#FFFFFF`) dan teks hitam (`#000000`, rasio kontras `21:1`).
- **Tipografi Swiss Helvetica**: Menggunakan `"Helvetica Neue", Helvetica, Arial, sans-serif` (`font-weight: 900` untuk judul dan `font-weight: 700` untuk subjudul) dengan skala fluid `clamp()` agar tetap satu baris dan terbaca dari `320px` hingga layar desktop.
- **Mandiri & Tanpa Dependensi Eksternal**: Seluruh gaya ditulis inline (`0 KB` JavaScript dan nol request CSS/font eksternal).
- **Metadata SEO**: Dilengkapi `<title>`, `meta description`, `canonical`, tag `geo.*`, Open Graph (`1200x630`), Twitter Card, dan JSON-LD (`ProfessionalService` / `LocalBusiness`, `SoftwareApplication`, `WebSite`, serta `WebPage`).

### 2. Halaman Produk VexaPOS (`vexapos.html`)
- **UI & Build Tailwind**: Memakai stylesheet hasil kompilasi `assets/css/compiled.v2.css` bersama `assets/css/style.css` dan aset logo optimal `assets/images/timehouse-logo.webp` (`7.2 KB`).
- **Interaktivitas (`assets/js/script.js`)**: Toggle bahasa Indonesia/Inggris (`ID` / `EN`), ticker jam WITA real-time, simulator mode offline vs sinkronisasi cloud, verifikasi otomatis kalkulasi struk Service Charge 10% + Pajak PB1 10%, akordeon FAQ, banner persetujuan cookie, dan modal Privasi & Ketentuan Layanan.
- **SEO & Structured Data**: Metadata SERP, Open Graph/Twitter Card, serta JSON-LD `SoftwareApplication` (`AggregateOffer`), `WebPage`, `BreadcrumbList`, dan `FAQPage`.

---

## Struktur File

```text
extensia-creative-bali/
├── .github/
│   └── workflows/
│       └── deploy.yml                   # Auto-deploy ke VPS melalui SSH saat push ke main
├── assets/
│   ├── css/
│   │   ├── style.css                    # Styling global, tokens, dan aturan bahasa ID/EN
│   │   ├── input.css                    # Source Tailwind CSS untuk halaman VexaPOS
│   │   └── compiled.v2.css              # Hasil build minified Tailwind CSS (~43.3 KB)
│   ├── js/
│   │   └── script.js                    # Jam WITA, switcher ID/EN, simulator, FAQ, cookie, modal
│   └── images/
│       ├── timehouse-logo.webp          # Logo utama WebP 128x128 (~7.2 KB) untuk HTML <img>
│       ├── extensia-logo-512.png        # Ikon 512x512 (~123.9 KB) untuk manifest & JSON-LD
│       ├── og-cover.jpg                 # Preview Open Graph 1200x630 (~24.2 KB)
│       ├── favicon-32.png               # Favicon 32x32 (~1.9 KB)
│       ├── apple-touch-icon.png         # Ikon Apple Touch 180x180 (~24.7 KB)
│       └── (aset gambar & ikon VexaPOS lainnya)
├── index.html                           # Halaman utama minimalis TIMEHOUSE (Coming Soon)
├── vexapos.html                         # Halaman produk VexaPOS
├── vercel.json                          # Konfigurasi build Vercel, cleanUrls, & header cache/keamanan
├── robots.txt                           # Pengaturan crawler & lokasi sitemap
├── sitemap.xml                          # Indeks URL halaman (/ dan /vexapos)
├── sitemap.xsl                          # Stylesheet tampilan XML sitemap di browser
├── site.webmanifest                     # Web app manifest (#FFFFFF)
├── tailwind.config.js                   # Konfigurasi tema Tailwind CSS
├── postcss.config.js                    # Konfigurasi PostCSS
├── package.json                         # Script build CSS (npm run build)
├── deploy.sh                            # Script helper build, commit, dan push ke main
└── README.md
```

---

## Build & Preview Lokal

1. Install dependensi build CSS:
   ```bash
   npm install
   ```
2. Kompilasi ulang `assets/css/compiled.v2.css` setelah mengubah `vexapos.html`, `assets/js/script.js`, atau `assets/css/input.css`:
   ```bash
   npm run build
   ```
3. Jalankan static server lokal untuk meninjau di browser:
   ```bash
   python -m http.server 8765
   ```
   Buka `http://localhost:8765/index.html` atau `http://localhost:8765/vexapos.html`.

---

## Deployment

### Deploy ke Vercel
Proyek ini dikonfigurasi sebagai static site melalui `vercel.json` (`framework: null`, `buildCommand: npm run build`, `outputDirectory: .`, `cleanUrls: true`):

1. Push repository ini ke GitHub.
2. Buka [Vercel Dashboard](https://vercel.com/new) dan import repository `extensia-creative-bali`.
3. Pengaturan build otomatis mengikuti `vercel.json` tanpa perlu override manual.
4. Klik **Deploy**.

### Deploy ke VPS via GitHub Actions
Setiap push ke branch `main` memicu workflow `.github/workflows/deploy.yml` yang masuk ke VPS melalui SSH, menjalankan `git pull origin main`, `npm install`, dan `npm run build`.

---

&copy; 2026 **Timehouse Creative Bali**. All rights reserved.
