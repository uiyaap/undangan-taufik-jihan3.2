import express from 'express';
import { getWishes } from '../controllers/rsvpController.js';

const router = express.Router();
router.get('/', getWishes);

export default router;