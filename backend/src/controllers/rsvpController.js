import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Submit RSVP & Wish
export const submitRsvp = async (req, res) => {
  try {
    const { name, attendance, pax, message, guestSlug } = req.body;

    if (!name || !attendance) {
      return res.status(400).json({ error: 'Nama dan status konfirmasi wajib diisi.' });
    }

    // Cari guest ID jika slug tersedia
    let guestId = null;
    if (guestSlug) {
      const guest = await prisma.guest.findUnique({ where: { slug: guestSlug } });
      if (guest) guestId = guest.id;
    }

    // Upsert / Create Record RSVP
    const newRsvp = await prisma.rsvp.create({
      data: {
        name,
        attendance,
        pax: parseInt(pax) || 1,
        message,
        guestId
      }
    });

    // simpan otomatis sebagai public Wish jika ada pesan ucapan
    if (message && message.trim() !== '') {
      await prisma.wish.create({
        data: {
          name,
          message,
          isPublic: true
        }
      });
    }

    return res.status(201).json({
      message: 'Konfirmasi RSVP berhasil disimpan.',
      data: newRsvp
    });
  } catch (error) {
    console.error('Error Submit RSVP:', error);
    return res.status(500).json({ error: 'Gagal menyimpan konfirmasi RSVP.' });
  }
};

// Get List Ucapan (Public Wish Feed with Pagination)
export const getWishes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [wishes, total] = await Promise.all([
      prisma.wish.findMany({
        where: { isPublic: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.wish.count({ where: { isPublic: true } })
    ]);

    return res.status(200).json({
      data: wishes,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error Get Wishes:', error);
    return res.status(500).json({ error: 'Gagal mengambil data ucapan.' });
  }
};