// models/ExploreDestination.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IExploreDestination extends Document {
  name: string;
  image: string;
  type: 'international' | 'domestic' | 'weekend';
  url: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const exploreDestinationSchema = new Schema<IExploreDestination>(
  {
    name: {
      type: String,
      required: [true, 'Destination name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Destination type is required'],
      enum: {
        values: ['international', 'domestic', 'weekend'],
        message: 'Type must be either international, domestic, or weekend',
      },
    },
    url: {
      type: String,
      required: [true, 'Destination URL is required'],
      trim: true,
    },
    order: {
      type: Number,
      required: [true, 'Display order is required'],
      default: 1,
      min: [1, 'Order must be at least 1'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for sorting and filtering
exploreDestinationSchema.index({ order: 1, isActive: 1 });
exploreDestinationSchema.index({ type: 1, isActive: 1 });

// Ensure unique order for active destinations of same type
exploreDestinationSchema.pre('save', async function (next) {
  if (this.isModified('order') && this.isActive) {
    const existingDestination = await mongoose.models.ExploreDestination.findOne({
      order: this.order,
      type: this.type,
      isActive: true,
      _id: { $ne: this._id },
    });

    if (existingDestination) {
      // Shift other destinations with same or higher order
      await mongoose.models.ExploreDestination.updateMany(
        {
          order: { $gte: this.order },
          type: this.type,
          _id: { $ne: this._id },
          isActive: true,
        },
        { $inc: { order: 1 } }
      );
    }
  }
  next();
});

const ExploreDestination = mongoose.model<IExploreDestination>(
  'ExploreDestination',
  exploreDestinationSchema
);

export default ExploreDestination;