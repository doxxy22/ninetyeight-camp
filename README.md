# Ninety Eight Training Camp

Situs web statis promosi untuk Ninety Eight Training Camp, sebuah landing page boxing gym dan training camp premium.

## Struktur Proyek

- `camp/index.html` — Halaman utama HTML
- `camp/style.css` — Gaya dan layout situs
- `camp/script.js` — Interaksi JavaScript untuk animasi, menu, lightbox, countdown, slider, FAQ, dan integrasi WhatsApp
- `camp/asset/` — Aset gambar dan ikon yang digunakan oleh halaman

## Fitur Utama

- Halaman landing page informatif dengan section `Home`, `About Us`, `Why Choose Us`, `Programs`, `Gallery`, `Schedule`, `FAQ`, dan `Contact`
- Loading screen animasi
- Sticky navbar dan highlight menu saat scroll
- Mobile hamburger menu
- Efek scroll reveal untuk elemen halaman
- Lightbox gallery untuk tampilan gambar lebih besar
- Countdown timer promosi real-time
- Slider testimonial dengan autoplay
- FAQ accordion interaktif
- Form pendaftaran yang membuka chat WhatsApp ke admin
- Tombol scroll-to-top

## Cara Menjalankan

1. Buka `camp/index.html` di browser.
2. Atau jalankan server lokal sederhana jika ingin menguji lewat HTTP, misalnya:
   - `python -m http.server 8000` (jika Python tersedia)
   - lalu buka `http://localhost:8000/camp/`

## Catatan

- Situs ini dibuat dengan HTML, CSS, dan JavaScript murni (vanilla JS).
- Tidak diperlukan build tools atau dependency tambahan.
- Jika ingin mengubah nomor WhatsApp admin, sesuaikan nilai `adminWA` di `camp/script.js`.
