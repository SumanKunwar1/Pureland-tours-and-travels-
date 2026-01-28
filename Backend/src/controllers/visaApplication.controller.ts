// controllers/visaApplication.controller.ts
import { Request, Response, NextFunction } from 'express';
import { VisaApplication } from '../models/visaApplication.model';
import { AppError } from '../utils/appError';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary';
import { catchAsync } from '../utils/catchAsync';

// @desc    Submit a new visa application
// @route   POST /api/v1/visa-applications
// @access  Public
export const submitVisaApplication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Upload files to Cloudinary
    let passportBioUrl, passportPhotoUrl, supportingDocsUrl;

    if (files?.passportBioFile?.[0]) {
      passportBioUrl = await uploadToCloudinary(files.passportBioFile[0].buffer, 'visa-applications/passports');
    }

    if (files?.passportPhotoFile?.[0]) {
      passportPhotoUrl = await uploadToCloudinary(files.passportPhotoFile[0].buffer, 'visa-applications/photos');
    }

    if (files?.supportingDocumentsFile?.[0]) {
      supportingDocsUrl = await uploadToCloudinary(files.supportingDocumentsFile[0].buffer, 'visa-applications/documents');
    }

    // Create visa application
    const visaApplication = await VisaApplication.create({
      ...req.body,
      passportBioFile: passportBioUrl,
      passportPhotoFile: passportPhotoUrl,
      supportingDocumentsFile: supportingDocsUrl,
      userId: (req as any).user?._id,
      agreeToTerms: req.body.agreeToTerms === 'true',
      submittedDate: new Date(),
    });

    res.status(201).json({
      status: 'success',
      message: 'Visa application submitted successfully',
      data: {
        application: visaApplication,
      },
    });
  }
);

// @desc    Get all visa applications (Admin)
// @route   GET /api/v1/visa-applications
// @access  Private/Admin
export const getAllVisaApplications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, search, page = 1, limit = 10 } = req.query;

    const query: any = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { passportNumber: { $regex: search, $options: 'i' } },
        { destinationCountry: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const applications = await VisaApplication.find(query)
      .populate('userId', 'fullName email')
      .sort({ submittedDate: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await VisaApplication.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: applications.length,
      data: {
        applications,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  }
);

// @desc    Get single visa application
// @route   GET /api/v1/visa-applications/:id
// @access  Private
export const getVisaApplication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const application = await VisaApplication.findById(req.params.id).populate('userId', 'fullName email');

    if (!application) {
      return next(new AppError('Visa application not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        application,
      },
    });
  }
);

// @desc    Get my visa applications
// @route   GET /api/v1/visa-applications/my-applications
// @access  Private
export const getMyVisaApplications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const applications = await VisaApplication.find({ userId: (req as any).user?._id }).sort({ submittedDate: -1 });

    res.status(200).json({
      status: 'success',
      results: applications.length,
      data: {
        applications,
      },
    });
  }
);

// @desc    Update visa application status (Admin)
// @route   PATCH /api/v1/visa-applications/:id
// @access  Private/Admin
export const updateVisaApplicationStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, adminNotes } = req.body;

    const application = await VisaApplication.findByIdAndUpdate(
      req.params.id,
      {
        status,
        adminNotes,
        updatedDate: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!application) {
      return next(new AppError('Visa application not found', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Visa application updated successfully',
      data: {
        application,
      },
    });
  }
);

// @desc    Delete visa application (Admin)
// @route   DELETE /api/v1/visa-applications/:id
// @access  Private/Admin
export const deleteVisaApplication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const application = await VisaApplication.findById(req.params.id);

    if (!application) {
      return next(new AppError('Visa application not found', 404));
    }

    // Delete files from Cloudinary
    if (application.passportBioFile) {
      await deleteFromCloudinary(application.passportBioFile);
    }
    if (application.passportPhotoFile) {
      await deleteFromCloudinary(application.passportPhotoFile);
    }
    if (application.supportingDocumentsFile) {
      await deleteFromCloudinary(application.supportingDocumentsFile);
    }

    await application.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Visa application deleted successfully',
    });
  }
);

// @desc    Get visa application statistics (Admin)
// @route   GET /api/v1/visa-applications/stats
// @access  Private/Admin
export const getVisaApplicationStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const stats = await VisaApplication.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const total = await VisaApplication.countDocuments();

    res.status(200).json({
      status: 'success',
      data: {
        total,
        stats,
      },
    });
  }
);