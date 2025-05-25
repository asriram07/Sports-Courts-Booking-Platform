import express from 'express';
import {
  createBooking,
  getUserBookings,
  cancelBooking
} from '../controllers/bookingController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, getUserBookings);
router.delete('/:bookingId', protect, cancelBooking);

export default router;
