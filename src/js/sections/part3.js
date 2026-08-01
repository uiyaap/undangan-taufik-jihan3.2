export function initPart3Functions() {
  // 1. Floating Audio Music Controller
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-toggle');
  let isPlaying = false;

  function toggleAudio() {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      if (musicBtn) musicBtn.classList.remove('playing');
    } else {
      audio.play().then(() => {
        isPlaying = true;
        if (musicBtn) musicBtn.classList.add('playing');
      }).catch((err) => {
        console.warn('Autoplay diproteksi oleh browser:', err);
      });
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', toggleAudio);
  }

  // Auto-play audio saat pengguna menekan tombol "BUKA UNDANGAN"
  const btnOpen = document.getElementById('btn-open-invitation');
  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      if (!isPlaying && audio) {
        audio.play().then(() => {
          isPlaying = true;
          if (musicBtn) musicBtn.classList.add('playing');
        }).catch(() => {});
      }
    });
  }

  // 2. Local RSVP Form Submission Event Handler
  const rsvpForm = document.getElementById('form-rsvp');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btnSubmit = document.getElementById('btn-submit-rsvp');
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'MENGIRIM...';
      }

      const name = document.getElementById('rsvp-name').value;
      const message = document.getElementById('rsvp-message').value;

      // Simulasi penambahan ucapan ke tampilan secara instan (Optimistic UI)
      setTimeout(() => {
        if (message.trim() !== '') {
          const list = document.getElementById('wishes-list');
          if (list) {
            const newItem = document.createElement('div');
            newItem.className = 'wish-item';
            newItem.innerHTML = `
              <p class="wish-author">${name}</p>
              <p class="wish-text">${message}</p>
              <span class="wish-time">Baru saja</span>
            `;
            list.prepend(newItem);
          }
        }

        alert('Terima kasih! Konfirmasi kehadiran & ucapan Anda telah terkirim.');
        rsvpForm.reset();

        if (btnSubmit) {
          btnSubmit.disabled = false;
          btnSubmit.textContent = 'KONFIRMASI KEHADIRAN';
        }
      }, 1000);
    });
  }
}