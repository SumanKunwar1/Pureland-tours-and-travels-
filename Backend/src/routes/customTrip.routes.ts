// routes/customTrip.routes.ts
import express from 'express';
import {
  submitCustomTrip,
  getAllCustomTrips,
  getCustomTrip,
  getMyCustomTrips,
  updateCustomTrip,
  deleteCustomTrip,
  getCustomTripStats,
} from '../controllers/customTrip.controller';
import { protect } from '../controllers/auth.controller';

const router = express.Router();

// Public routes
router.post('/', submitCustomTrip);

// Protected routes - require authentication
router.use(protect);

router.get('/my-requests', getMyCustomTrips);
router.get('/admin/stats', getCustomTripStats);
router.get('/:id', getCustomTrip);

// Admin routes
router.get('/', getAllCustomTrips);
router.patch('/:id', updateCustomTrip);
router.delete('/:id', deleteCustomTrip);

export default router;