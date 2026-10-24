// controllers/invoice.controller.ts
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import Invoice from '../models/Invoice.model';
import Booking from '../models/Booking.model';

// Only these fields may be set from the admin form; totals and numbers are computed.
const pickInvoiceFields = (body: any) => {
  const fields: Record<string, unknown> = {};
  for (const key of [
    'issueDate',
    'dueDate',
    'currency',
    'client',
    'packageName',
    'travelDate',
    'travellers',
    'items',
    'discount',
    'taxPercent',
    'notes',
    'status',
  ]) {
    if (body[key] !== undefined) fields[key] = body[key] === '' ? undefined : body[key];
  }
  return fields;
};

// @desc    List invoices
// @route   GET /api/v1/invoices
// @access  Private (Admin)
export const getAllInvoices = catchAsync(async (req: Request, res: Response) => {
  const { search, booking, page = 1, limit = 10 } = req.query;
  const query: any = {};

  if (booking && mongoose.isValidObjectId(booking)) {
    query.booking = booking;
  }

  if (search) {
    const pattern = { $regex: String(search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
    query.$or = [
      { invoiceNumber: pattern },
      { 'payments.receiptNumber': pattern },
      { 'client.name': pattern },
      { 'client.email': pattern },
      { 'client.phone': pattern },
      { packageName: pattern },
      { bookingRef: pattern },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [invoices, total] = await Promise.all([
    Invoice.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Invoice.countDocuments(query),
  ]);

  res.status(200).json({
    status: 'success',
    results: invoices.length,
    data: {
      invoices,
      pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
    },
  });
});

// @desc    Get one invoice
// @route   GET /api/v1/invoices/:id
// @access  Private (Admin)
export const getInvoice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return next(new AppError('No invoice found with that ID', 404));

  res.status(200).json({ status: 'success', data: { invoice } });
});

// @desc    Create invoice (optionally linked to a website booking)
// @route   POST /api/v1/invoices
// @access  Private (Admin)
export const createInvoice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const fields = pickInvoiceFields(req.body);

  if (req.body.booking) {
    const booking = await Booking.findById(req.body.booking);
    if (!booking) return next(new AppError('Booking not found', 404));
    fields.booking = booking._id;
    fields.bookingRef = booking.bookingId;
  } else if (req.body.bookingRef) {
    fields.bookingRef = req.body.bookingRef;
  }

  const invoice = await Invoice.create(fields);

  res.status(201).json({ status: 'success', data: { invoice } });
});

// @desc    Update invoice details (not payments)
// @route   PATCH /api/v1/invoices/:id
// @access  Private (Admin)
export const updateInvoice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return next(new AppError('No invoice found with that ID', 404));

  invoice.set(pickInvoiceFields(req.body));
  if (req.body.bookingRef !== undefined && !invoice.booking) invoice.bookingRef = req.body.bookingRef;
  await invoice.save();

  res.status(200).json({ status: 'success', data: { invoice } });
});

// @desc    Delete invoice and all its receipts
// @route   DELETE /api/v1/invoices/:id
// @access  Private (Admin)
export const deleteInvoice = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);
  if (!invoice) return next(new AppError('No invoice found with that ID', 404));

  res.status(204).json({ status: 'success', data: null });
});

// @desc    Record a payment against an invoice (creates a receipt)
// @route   POST /api/v1/invoices/:id/payments
// @access  Private (Admin)
export const addPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return next(new AppError('No invoice found with that ID', 404));
  if (invoice.status === 'Cancelled') return next(new AppError('This invoice is cancelled', 400));

  const amount = Number(req.body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return next(new AppError('Please enter a payment amount more than 0', 400));
  }
  if (amount - invoice.balance > 0.005) {
    return next(
      new AppError(`Payment is more than the remaining balance (${invoice.currency} ${invoice.balance.toFixed(2)})`, 400)
    );
  }

  invoice.payments.push({
    date: req.body.date || new Date(),
    amount,
    paidBy: req.body.paidBy || invoice.client.name,
    method: req.body.method,
    transactionId: req.body.transactionId,
    paymentType: req.body.paymentType,
    note: req.body.note,
  });
  await invoice.save();

  const payment = invoice.payments[invoice.payments.length - 1];
  res.status(201).json({ status: 'success', data: { invoice, payment } });
});

// @desc    Remove a payment (and its receipt) recorded by mistake
// @route   DELETE /api/v1/invoices/:id/payments/:paymentId
// @access  Private (Admin)
export const deletePayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return next(new AppError('No invoice found with that ID', 404));

  const payment = invoice.payments.id(req.params.paymentId);
  if (!payment) return next(new AppError('No payment found with that ID', 404));

  payment.deleteOne();
  await invoice.save();

  res.status(200).json({ status: 'success', data: { invoice } });
});
