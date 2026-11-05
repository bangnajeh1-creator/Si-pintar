// Service worker sederhana: simpan file inti ke cache lalu layani dari cache.
// Naikkan nomor VERSI setiap kali ada file yang berubah.
const VERSI = 'si-pintar-v2';
const FILE_INTI = [
  './', './index.html', './manifest.webmanifest', './style.css', './app.js', './sound.js', './logo.svg',
  './mulai-belajar.html', './mewarnai.html', './menggambar.html', './berhitung.html',
  './huruf.html', './tentang.html', './pengaturan.html', './orang-tua.html'
];

// Saat dipasang: simpan semua file inti
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSI).then((c) => c.addAll(FILE_INTI)));
  self.skipWaiting();
});

// Saat aktif: hapus cache versi lama
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSI).map((k) => caches.delete(k)))));
});

// Saat ada permintaan: pakai cache dulu, kalau tidak ada ambil dari jaringan
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
