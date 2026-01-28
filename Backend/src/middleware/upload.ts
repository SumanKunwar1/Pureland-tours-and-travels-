// middleware/upload.ts
import multer from 'multer';
import { AppError } from '../utils/appError';
import { Request } from 'express';

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// File filter to accept only certain file types
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept images and PDFs
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(new AppError('Not a valid file type! Please upload only JPG, JPEG, PNG or PDF files.', 400));
  }
};

// Create multer upload instance
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Middleware for single file upload
export const uploadSingle = (fieldName: string) => upload.single(fieldName);

// Middleware for multiple file uploads
export const uploadMultiple = (fields: { name: string; maxCount: number }[]) => upload.fields(fields);

// Middleware for visa application file uploads
export const uploadVisaFiles = upload.fields([
  { name: 'passportBioFile', maxCount: 1 },
  { name: 'passportPhotoFile', maxCount: 1 },
  { name: 'supportingDocumentsFile', maxCount: 1 },
]);