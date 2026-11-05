/* ==========================================================
   sound.js - efek suara
   Suara dibuat langsung oleh browser (Web Audio API), jadi
   belum perlu file di assets/sounds. Nanti, file .mp3 bisa
   dipakai lewat fungsi mainkanFile().
   ========================================================== */
const Suara = (() => {
  let ctx = null; // AudioContext dibuat saat sentuhan pertama (aturan browser)

  // Apakah suara aktif? Disimpan di localStorage (diatur di halaman Pengaturan)
  const aktif = () => localStorage.getItem('suara') !== 'off';

  // Nada pendek: frekuensi (Hz), lama (detik), jeda mulai (detik)
  function nada(frek, lama = 0.12, mulai = 0) {
    if (!aktif()) return;
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const vol = ctx.createGain();
    const t = ctx.currentTime + mulai;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frek, t);
    vol.gain.setValueAtTime(0.25, t);
    vol.gain.exponentialRampToValueAtTime(0.001, t + lama); // suara memudar halus
    osc.connect(vol).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + lama);
  }

  return {
    aktif,
    tekan() { nada(660, 0.08); nada(880, 0.12, 0.07); },          // "ting-ting" naik
    kembali() { nada(660, 0.08); nada(440, 0.12, 0.07); },        // "ting-tong" turun
    sukses() { [523, 659, 784, 1047].forEach((f, i) => nada(f, 0.15, i * 0.09)); },
    // Untuk tahap berikutnya: memutar file di assets/sounds
    mainkanFile(nama) { if (aktif()) new Audio(`assets/sounds/${nama}`).play(); }
  };
})();
