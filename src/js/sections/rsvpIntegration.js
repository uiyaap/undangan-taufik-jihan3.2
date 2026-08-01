import { ApiService } from '../services/api.js';

export function initRsvpIntegration() {
  const rsvpForm = document.getElementById('form-rsvp');
  const wishesList = document.getElementById('wishes-list');

  // Helper untuk memformat durasi waktu relatif (Contoh: "Baru saja", "10 menit yang lalu")
  function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Baru saja';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} menit yang lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam yang lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari yang lalu`;
  }

  // 1. Fungsi Fetch & Render Daftar Ucapan dari API
  async function loadWishesFeed() {
    if (!wishesList) return;

    try {
      const response = await ApiService.getWishes(1, 20);
      const wishes = response.data;

      if (wishes && wishes.length > 0) {
        wishesList.innerHTML = wishes.map((wish) => `
          <div class="wish-item">
            <p class="wish-author">${escapeHtml(wish.name)}</p>
            <p class="wish-text">${escapeHtml(wish.message)}</p>
            <span class="wish-time">${formatTimeAgo(wish.createdAt)}</span>
          </div>
        `).join('');
      } else {
        wishesList.innerHTML = `
          <div class="wish-item" style="text-align: center; color: var(--color-text-caption);">
            <p class="wish-text">Belum ada ucapan. Jadilah yang pertama memberikan doa!</p>
          </div>
        `;
      }
    } catch (error) {
      wishesList.innerHTML = `
        <div class="wish-item" style="text-align: center; color: var(--color-text-caption);">
          <p class="wish-text">Gagal memuat ucapan dari server. Pastikan koneksi internet terhubung.</p>
        </div>
      `;
    }
  }

  // Helper Sanitasi HTML (Sanitization) untuk mencegah serangan XSS
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 2. Form Submit Event Handler
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnSubmit = document.getElementById('btn-submit-rsvp');
      const originalBtnText = btnSubmit ? btnSubmit.textContent : '';

      // Set Loading State pada Button
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'MENGIRIM...';
      }

      // Ambil parameter slug tamu dari URL jika ada
      const urlParams = new URLSearchParams(window.location.search);
      const guestSlug = urlParams.get('u') || urlParams.get('to');

      const formData = {
        name: document.getElementById('rsvp-name').value.trim(),
        pax: parseInt(document.getElementById('rsvp-pax').value) || 1,
        attendance: document.getElementById('rsvp-attendance').value,
        message: document.getElementById('rsvp-message').value.trim(),
        guestSlug: guestSlug || null
      };

      try {
        await ApiService.submitRsvp(formData);

        alert('Terima kasih! Konfirmasi kehadiran dan ucapan Anda telah berhasil disimpan.');
        
        // Reset Form
        rsvpForm.reset();

        // Reload Feed Ucapan Real-Time
        await loadWishesFeed();

      } catch (error) {
        alert(error.message || 'Terjadi kesalahan saat mengirim RSVP. Silakan coba lagi.');
      } finally {
        if (btnSubmit) {
          btnSubmit.disabled = false;
          btnSubmit.textContent = originalBtnText;
        }
      }
    });
  }

  // Muat feed ucapan pertama kali saat halaman diakses
  loadWishesFeed();
}