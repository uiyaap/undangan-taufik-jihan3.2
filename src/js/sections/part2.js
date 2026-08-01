export function initPart2Functions() {
  // ==========================================================================
  // 1. LOGIKA COUNTDOWN TIMER (29 AGUSTUS 2026 - 08:00 WIB)
  // ==========================================================================
  const targetDate = new Date('2026-08-29T08:00:00+07:00').getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    } else {
      // Jika waktu acara sudah lewat
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
    }
  }

  // Jalankan langsung sekali saat dimuat & set interval tiap 1 detik
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================================================
  // 2. LOGIKA SALIN NO. REKENING (WEDDING GIFT COPY TO CLIPBOARD)
  // ==========================================================================
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          
          // Memberi umpan balik visual saat berhasil disalin
          btn.innerHTML = '✓ TERKOPY!';
          btn.style.backgroundColor = '#d4af37';
          btn.style.color = '#0a1118';

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
          }, 2000);
        }).catch((err) => {
          console.error('Gagal menyalin rekening: ', err);
        });
      }
    });
  });
}