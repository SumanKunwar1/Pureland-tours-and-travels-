// models/customTrip.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomTrip extends Document {
  userId?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelers?: string;
  dates?: string;
  budget?: string;
  message?: string;
  status: 'New' | 'In Progress' | 'Quoted' | 'Confirmed' | 'Completed' | 'Cancelled';
  adminNotes?: string;
  quotedPrice?: number;
  submittedDate: Date;
  updatedDate?: Date;
}

const customTripSchema = new Schema<ICustomTrip>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    travelers: {
      type: String,
      trim: true,
    },
    dates: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Quoted', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'New',
    },
    adminNotes: {
      type: String,
    },
    quotedPrice: {
      type: Number,
    },
    submittedDate: {
      type: Date,
      default: Date.now,
    },
    updatedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
customTripSchema.index({ email: 1 });
customTripSchema.index({ status: 1 });
customTripSchema.index({ userId: 1 });
customTripSchema.index({ submittedDate: -1 });

export const CustomTrip = mongoose.model<ICustomTrip>('CustomTrip', customTripSchema);