import Lenis from '@studio-freight/lenis';
import { initPart1Animations } from './sections/part1.js';
import { initPart2Functions } from './sections/part2.js';
import { initPart3Functions } from './sections/part3.js';
import { initRsvpIntegration } from './sections/rsvpIntegration.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('[APP] Initializing The Royal Minangkabau Wedding App...');

  // 1. Inisialisasi Smooth Scroll (Lenis Engine)
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

  // 2. Inisialisasi Animasi GSAP Hero & Interaksi Part 1
  initPart1Animations();

  // 3. Inisialisasi Fitur Countdown Timer & Copy Rekening Bank Part 2
  initPart2Functions();

  // 4. Inisialisasi Audio Player & Form Controls Part 3
  initPart3Functions();

  // 5. Inisialisasi Integrasi API RSVP & Wishes Feed Part 7
  initRsvpIntegration();

  console.log('[APP] Application successfully initialized.');
});