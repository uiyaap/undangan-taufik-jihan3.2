import { initPart1Animations } from './sections/part1.js';
import { initPart2Functions } from './sections/part2.js';
import { initPart3Functions } from './sections/part3.js';
import { initRsvpIntegration } from './sections/rsvpIntegration.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. INISIALISASI SMOOTH SCROLL (LENIS DARI CDN)
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 2. JALANKAN SEMUA FUNGSI MODUL UTAMA
  try {
    initPart1Animations();
    initPart2Functions();
    initPart3Functions();
    initRsvpIntegration();
  } catch (error) {
    console.warn('[System Warning]: Terjadi kesalahan saat memuat fungsi UI:', error);
  }
});