// controllers/customTrip.controller.ts
import { Request, Response, NextFunction } from 'express';
import { CustomTrip } from '../models/customTrip.model';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

// @desc    Submit custom trip request
// @route   POST /api/v1/custom-trips
// @access  Public
export const submitCustomTrip = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, phone, destination, travelers, dates, budget, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !destination) {
      return next(new AppError('Please provide all required fields', 400));
    }

    // Create custom trip request
    const customTrip = await CustomTrip.create({
      userId: (req as any).user?._id,
      name,
      email,
      phone,
      destination,
      travelers,
      dates,
      budget,
      message,
      status: 'New',
      submittedDate: new Date(),
    });

    res.status(201).json({
      status: 'success',
      message: 'Custom trip request submitted successfully. Our travel expert will contact you within 24 hours.',
      data: {
        customTrip,
      },
    });
  }
);

// @desc    Get all custom trip requests (Admin)
// @route   GET /api/v1/custom-trips
// @access  Private/Admin
export const getAllCustomTrips = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, search, page = 1, limit = 10 } = req.query;

    const query: any = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const customTrips = await CustomTrip.find(query)
      .populate('userId', 'fullName email')
      .sort({ submittedDate: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await CustomTrip.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: customTrips.length,
      data: {
        customTrips,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  }
);

// @desc    Get single custom trip request
// @route   GET /api/v1/custom-trips/:id
// @access  Private
export const getCustomTrip = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customTrip = await CustomTrip.findById(req.params.id).populate('userId', 'fullName email');

    if (!customTrip) {
      return next(new AppError('Custom trip request not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        customTrip,
      },
    });
  }
);

// @desc    Get my custom trip requests
// @route   GET /api/v1/custom-trips/my-requests
// @access  Private
export const getMyCustomTrips = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customTrips = await CustomTrip.find({ userId: (req as any).user?._id }).sort({ submittedDate: -1 });

    res.status(200).json({
      status: 'success',
      results: customTrips.length,
      data: {
        customTrips,
      },
    });
  }
);

// @desc    Update custom trip request (Admin)
// @route   PATCH /api/v1/custom-trips/:id
// @access  Private/Admin
export const updateCustomTrip = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, adminNotes, quotedPrice } = req.body;

    const customTrip = await CustomTrip.findByIdAndUpdate(
      req.params.id,
      {
        status,
        adminNotes,
        quotedPrice,
        updatedDate: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!customTrip) {
      return next(new AppError('Custom trip request not found', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Custom trip request updated successfully',
      data: {
        customTrip,
      },
    });
  }
);

// @desc    Delete custom trip request (Admin)
// @route   DELETE /api/v1/custom-trips/:id
// @access  Private/Admin
export const deleteCustomTrip = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customTrip = await CustomTrip.findById(req.params.id);

    if (!customTrip) {
      return next(new AppError('Custom trip request not found', 404));
    }

    await customTrip.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Custom trip request deleted successfully',
    });
  }
);

// @desc    Get custom trip statistics (Admin)
// @route   GET /api/v1/custom-trips/stats
// @access  Private/Admin
export const getCustomTripStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const stats = await CustomTrip.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const total = await CustomTrip.countDocuments();

    res.status(200).json({
      status: 'success',
      data: {
        total,
        stats,
      },
    });
  }
);