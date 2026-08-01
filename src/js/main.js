import { initPart1Animations } from './sections/part1.js';
import { initPart2Functions } from './sections/part2.js';
import { initPart3Functions } from './sections/part3.js';
import { initRsvpIntegration } from './sections/rsvpIntegration.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi Lenis Smooth Scroll dari CDN
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

  // Inisialisasi Seluruh Fungsi UI & Animasi
  initPart1Animations();
  initPart2Functions();
  initPart3Functions();
  initRsvpIntegration();
});
