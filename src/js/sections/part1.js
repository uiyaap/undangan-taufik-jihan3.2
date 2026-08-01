// Open Invitation Button Event Click
const btnOpen = document.getElementById('btn-open-invitation');
const bgMusic = document.getElementById('bg-music');
const musicToggleBtn = document.getElementById('music-toggle');

if (btnOpen) {
  btnOpen.addEventListener('click', () => {
    // 1. Scroll ke section berikutnya
    const openingSection = document.getElementById('opening');
    if (openingSection) {
      openingSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 2. MAINKAN MUSIK OTOMATIS SAAT DIKLIK (Lolos Autoplay Policy)
    if (bgMusic) {
      bgMusic.play().then(() => {
        if (musicToggleBtn) {
          musicToggleBtn.classList.add('playing'); // Efek animasi tombol musik
        }
      }).catch((err) => {
        console.log("Autoplay terhalang browser:", err);
      });
    }

    // 3. Animasi GSAP (jika ada)
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