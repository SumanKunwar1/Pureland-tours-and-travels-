// routes/documentation.routes.ts
import express from 'express';
import {
  uploadDocument,
  getMyDocuments,
  getAllDocuments,
  getDocument,
  deleteDocument,
  getDocumentProgress,
} from '../controllers/documentation.controller';
import { uploadSingle } from '../middleware/upload';
import { protect } from '../controllers/auth.controller';

const router = express.Router();

// Protected routes - require authentication
router.use(protect);

router.post('/upload', uploadSingle('file'), uploadDocument);
router.get('/my-documents', getMyDocuments);
router.get('/progress', getDocumentProgress);
router.get('/:id', getDocument);
router.delete('/:id', deleteDocument);

// Admin routes
router.get('/', getAllDocuments);

export default router;