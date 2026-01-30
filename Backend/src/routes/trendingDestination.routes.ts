// routes/trendingDestination.routes.ts
import express from 'express';
import {
  createTrendingDestination,
  getAllTrendingDestinations,
  getActiveTrendingDestinations,
  getTrendingDestination,
  updateTrendingDestination,
  toggleTrendingDestinationActive,
  deleteTrendingDestination,
  reorderTrendingDestinations,
  getTrendingDestinationStats,
} from '../controllers/trendingDestination.controller';
import { protect } from '../controllers/auth.controller';

const router = express.Router();

// Public routes - for frontend display
router.get('/active', getActiveTrendingDestinations);

// Admin stats route (protected) - must come before /:id to avoid route conflicts
router.get('/admin/stats', protect, getTrendingDestinationStats);

// Reorder route (protected)
router.patch('/reorder', protect, reorderTrendingDestinations);

// Toggle active status (protected)
router.patch('/:id/toggle-active', protect, toggleTrendingDestinationActive);

// CRUD operations
router
  .route('/')
  .get(protect, getAllTrendingDestinations) // Protected - admin only
  .post(protect, createTrendingDestination); // Protected - admin only

router
  .route('/:id')
  .get(protect, getTrendingDestination) // Protected - admin only
  .patch(protect, updateTrendingDestination) // Protected - admin only
  .delete(protect, deleteTrendingDestination); // Protected - admin only

export default router;