export function initPart3Functions() {
  const bgMusic = document.getElementById('bg-music');
  const musicToggleBtn = document.getElementById('music-toggle');

  if (musicToggleBtn && bgMusic) {
    musicToggleBtn.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play();
        musicToggleBtn.classList.add('playing');
      } else {
        bgMusic.pause();
        musicToggleBtn.classList.remove('playing');
      }
    });
  }
}