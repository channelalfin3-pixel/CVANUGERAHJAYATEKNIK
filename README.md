# CV Anugerah Jaya Teknik — Company Profile Website

Website company profile enterprise untuk kontraktor Mechanical, Electrical & HVAC.
Dibangun dengan HTML5, CSS3, JavaScript, Bootstrap 5, AOS, Swiper, Font Awesome.
**Tanpa backend, tanpa database** — konten dinamis (Produk, Project, Artikel, Testimoni, FAQ)
disimpan sebagai file JSON di `assets/data/` dan dirender langsung di sisi klien.

## Struktur Folder

```
├── index.html              Beranda
├── tentang.html             Tentang Kami
├── layanan.html              Layanan
├── produk.html                Katalog Produk (filter + search)
├── project.html                 Portfolio Project (filter)
├── galeri.html                    Galeri Foto (filter)
├── artikel.html                     Blog / Artikel
├── testimoni.html                     Testimoni Klien
├── faq.html                             FAQ (accordion)
├── kontak.html                            Form Kontak + Peta + WhatsApp
├── admin.html                              Panel admin (CRUD client-side, export JSON)
├── 404.html / privacy-policy.html / terms.html
├── robots.txt / sitemap.xml
└── assets/
    ├── css/style.css        Design system (token warna, tipografi, komponen)
    ├── js/
    │   ├── components.js    Navbar, footer, floating buttons (shared)
    │   ├── data-loader.js   Fetch & render JSON ke kartu produk/project/artikel/testimoni/FAQ
    │   └── main.js          Navbar scroll, dark mode, counter, form, back-to-top
    └── data/
        ├── products.json
        ├── projects.json
        ├── articles.json
        ├── testimonials.json
        └── faq.json
```

## Cara Mengedit Konten (tanpa database)

1. Buka `admin.html` di browser (bisa lokal atau setelah deploy).
2. Tambah / edit / hapus data pada tab Produk, Project, atau Artikel.
3. Klik **"Unduh ....json"** untuk mengunduh file JSON hasil edit.
4. Timpa (replace) file terkait di folder `assets/data/`.
5. Commit & push perubahan ke GitHub — halaman akan otomatis menampilkan data terbaru.

> Catatan: `admin.html` tidak menyimpan data ke server. Ini adalah editor JSON
> client-side yang mengekspor file untuk Anda timpa secara manual — sesuai
> dengan arsitektur "tanpa backend, tanpa database" yang diminta.

## Mengganti Gambar

Semua gambar produk/project/artikel saat ini memakai placeholder berkualitas
tinggi dari Unsplash. Ganti URL gambar pada file JSON terkait (atau via
`admin.html`) dengan URL foto asli perusahaan, atau upload gambar melalui
form admin untuk mendapatkan data-URI (cocok untuk gambar berukuran kecil).

## Deploy ke GitHub Pages

1. Push seluruh folder ini ke repository GitHub.
2. Masuk ke **Settings → Pages**.
3. Pilih branch `main` dan folder root (`/`).
4. Website akan tersedia di `https://<username>.github.io/<repo>/`.
5. Perbarui `robots.txt`, `sitemap.xml`, dan tag `og:url` / `canonical` di
   setiap halaman agar sesuai dengan domain/URL final Anda.

## Teknologi

HTML5 · CSS3 · Vanilla JavaScript · Bootstrap 5 · AOS Animation · Swiper Slider ·
Font Awesome 6 · Google Fonts (Poppins, Inter, IBM Plex Mono)
