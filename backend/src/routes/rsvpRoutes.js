import express from 'express';
import { submitRsvp } from '../controllers/rsvpController.js';

const router = express.Router();
router.post('/', submitRsvp);

export default router;