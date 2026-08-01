export function initPart1Animations() {
  // 1. PARSING QUERY PARAMETER URL UNTUK NAMA TAMU UNDANGAN (?to=Nama atau ?n=Nama)
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to') || urlParams.get('n');
  
  if (guestParam) {
    const guestElement = document.getElementById('guest-name');
    if (guestElement) {
      guestElement.textContent = decodeURIComponent(guestParam);
    }
  }

  // 2. HERO SECTION ENTRANCE ANIMATIONS (MENJALANKAN GSAP GLOBAL DARI CDN)
  if (typeof gsap !== 'undefined') {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from('.hero__crest', { opacity: 0, y: -30, duration: 1 })
      .from('.hero__subtitle', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
      .from('.hero__title-name', { opacity: 0, scale: 0.9, stagger: 0.2, duration: 1 }, '-=0.5')
      .from('.hero__title-ampersand', { opacity: 0, rotation: -45, duration: 0.6 }, '-=0.6')
      .from('.hero__date-badge', { opacity: 0, y: 15, duration: 0.6 }, '-=0.4')
      .from('.hero__guest-box', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
      .from('.btn-primary-gold', { opacity: 0, scale: 0.8, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.2');

    // Animasi Melayang untuk Bulan
    gsap.to('.hero__moon', {
      y: -12,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // 3. EVENT CLICK TOMBOL "BUKA UNDANGAN" & PEMUTARAN MUSIK OTOMATIS
  const btnOpen = document.getElementById('btn-open-invitation');
  const bgMusic = document.getElementById('bg-music');
  const musicToggleBtn = document.getElementById('music-toggle');

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      // Scroll halus ke Opening Section
      const openingSection = document.getElementById('opening');
      if (openingSection) {
        openingSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Putar Musik Latar Otomatis (Lolos Autoplay Policy Browser)
      if (bgMusic) {
        bgMusic.play().then(() => {
          if (musicToggleBtn) {
            musicToggleBtn.classList.add('playing'); // Mengaktifkan efek tombol musik melayang
          }
        }).catch((err) => {
          console.log('[Audio Info]: Autoplay terhalang oleh browser, silakan klik tombol musik.', err);
        });
      }

      // Animasi kemunculan kartu pembuka
      if (typeof gsap !== 'undefined') {
        gsap.from('.opening__card', {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power2.out'
        });
      }
    });
  }
}