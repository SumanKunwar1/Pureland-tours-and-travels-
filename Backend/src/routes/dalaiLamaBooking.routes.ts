// routes/dalaiLamaBooking.routes.ts
import express from 'express';
import {
  createDalaiLamaBooking,
  getAllDalaiLamaBookings,
  getDalaiLamaBooking,
  updateDalaiLamaBooking,
  deleteDalaiLamaBooking,
  getDalaiLamaBookingStats,
} from '../controllers/dalaiLamaBooking.controller';
import { protect } from '../controllers/auth.controller';

const router = express.Router();

// Public routes
router.post('/', createDalaiLamaBooking);

// Protected routes - require authentication
router.use(protect);

router.get('/admin/stats', getDalaiLamaBookingStats);
router.get('/', getAllDalaiLamaBookings);
router.get('/:id', getDalaiLamaBooking);
router.patch('/:id', updateDalaiLamaBooking);
router.delete('/:id', deleteDalaiLamaBooking);

export default router;