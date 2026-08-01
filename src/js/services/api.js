// Memanfaatkan LocalStorage agar RSVP & Ucapan berfungsi di GitHub Pages tanpa backend lokal
export const ApiService = {
  async getWishes() {
    try {
      const localWishes = JSON.parse(localStorage.getItem('wedding_wishes')) || [
        {
          name: 'Ahmad & Keluarga',
          message: 'Selamat untuk Taufik & Jihan! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin.',
          createdAt: new Date().toISOString()
        }
      ];
      return { success: true, data: localWishes };
    } catch (error) {
      return { success: false, data: [] };
    }
  },

  async submitRsvp(data) {
    try {
      const localWishes = JSON.parse(localStorage.getItem('wedding_wishes')) || [];
      const newWish = {
        name: data.name,
        message: data.message || 'Hadir di acara bahagia Taufik & Jihan.',
        createdAt: new Date().toISOString()
      };
      
      localWishes.unshift(newWish);
      localStorage.setItem('wedding_wishes', JSON.stringify(localWishes));

      return { success: true, message: 'Konfirmasi kehadiran & ucapan berhasil disimpan!' };
    } catch (error) {
      return { success: false, message: 'Gagal menyimpan data.' };
    }
  }
};
