import express from 'express';
import { adminLogin, getDashboardSummary } from '../controllers/adminController.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/login', adminLogin);
router.get('/dashboard', authenticateAdmin, getDashboardSummary);

export default router;