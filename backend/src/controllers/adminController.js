import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await prisma.adminUser.findUnique({ where: { username } });
    if (!admin) {
      return res.status(401).json({ error: 'Username atau password salah.' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Username atau password salah.' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login berhasil.',
      token
    });
  } catch (error) {
    console.error('Error Admin Login:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan sistem saat login.' });
  }
};

// Get Dashboard RSVP Summary
export const getDashboardSummary = async (req, res) => {
  try {
    const [totalHadir, totalTidakHadir, totalPax] = await Promise.all([
      prisma.rsvp.count({ where: { attendance: 'HADIR' } }),
      prisma.rsvp.count({ where: { attendance: 'TIDAK_HADIR' } }),
      prisma.rsvp.aggregate({
        _sum: { pax: true },
        where: { attendance: 'HADIR' }
      })
    ]);

    return res.status(200).json({
      summary: {
        totalHadir,
        totalTidakHadir,
        estimatedTotalPax: totalPax._sum.pax || 0
      }
    });
  } catch (error) {
    console.error('Error Dashboard Summary:', error);
    return res.status(500).json({ error: 'Gagal mengambil data ringkasan.' });
  }
};