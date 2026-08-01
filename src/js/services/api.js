// Konfigurasi URL Base Backend (Disesuaikan dengan domain/port backend)
const API_BASE_URL = 'http://localhost:5000/api';

export const ApiService = {
  /**
   * Mengirim data konfirmasi RSVP dan Ucapan ke Backend API
   * @param {Object} data - { name, attendance, pax, message, guestSlug }
   */
  async submitRsvp(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Gagal mengirim konfirmasi RSVP.');
      }

      return result;
    } catch (error) {
      console.error('[API Error - submitRsvp]:', error);
      throw error;
    }
  },

  /**
   * Mengambil daftar ucapan/doa (Wishes) publik dari Backend API
   * @param {number} page - Halaman pagination (default: 1)
   * @param {number} limit - Jumlah item per halaman (default: 20)
   */
  async getWishes(page = 1, limit = 20) {
    try {
      const response = await fetch(`${API_BASE_URL}/wishes?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Gagal mengambil data ucapan.');
      }

      return result;
    } catch (error) {
      console.error('[API Error - getWishes]:', error);
      throw error;
    }
  },

  /**
   * Mengambil ringkasan statistik RSVP (Khusus Dashboard Admin)
   * @param {string} token - JWT Auth Token Admin
   */
  async getAdminSummary(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Akses ke dashboard ditolak.');
      }

      return result;
    } catch (error) {
      console.error('[API Error - getAdminSummary]:', error);
      throw error;
    }
  }
};