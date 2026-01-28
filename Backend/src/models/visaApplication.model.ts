// models/visaApplication.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IVisaApplication extends Document {
  userId?: mongoose.Types.ObjectId;
  
  // Personal Information
  fullName: string;
  gender: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  nationality: string;
  maritalStatus: string;
  occupation: string;
  religion: string;

  // Passport Information
  passportType: string;
  passportNumber: string;
  placeOfIssue: string;
  dateOfIssue: Date;
  dateOfExpiry: Date;
  issuingCountry: string;

  // Contact Details
  residentialAddress: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;

  // Travel Information
  destinationCountry: string;
  purposeOfVisit: string;
  arrivalDate: Date;
  departureDate: Date;
  durationOfStay: string;
  numberOfEntries: string;

  // Accommodation
  accommodationType: string;
  accommodationAddress: string;
  travelPackageName?: string;
  placesToVisit?: string;

  // Financial
  expensesBearer: string;
  estimatedBudget: string;
  sufficientFunds: string;

  // Sponsor
  sponsorName?: string;
  sponsorRelationship?: string;
  sponsorAddress?: string;
  sponsorPhone?: string;

  // Travel History
  travelledBefore: string;
  countriesVisited?: string;
  overstayedVisa: string;
  refusedVisa: string;
  refusalDetails?: string;

  // Health
  hasInsurance: string;
  medicalCondition?: string;

  // Documents (URLs stored after upload)
  passportBioFile?: string;
  passportPhotoFile?: string;
  supportingDocumentsFile?: string;

  // Declaration
  agreeToTerms: boolean;

  // Status
  status: 'New' | 'Under Review' | 'Approved' | 'Rejected' | 'More Info Required';
  adminNotes?: string;

  // Timestamps
  submittedDate: Date;
  updatedDate?: Date;
}

const visaApplicationSchema = new Schema<IVisaApplication>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    // Personal Information
    fullName: { type: String, required: true, trim: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    nationality: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    occupation: { type: String, required: true },
    religion: { type: String },

    // Passport Information
    passportType: { type: String, required: true },
    passportNumber: { type: String, required: true, unique: true },
    placeOfIssue: { type: String, required: true },
    dateOfIssue: { type: Date, required: true },
    dateOfExpiry: { type: Date, required: true },
    issuingCountry: { type: String, required: true },

    // Contact Details
    residentialAddress: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },

    // Travel Information
    destinationCountry: { type: String, required: true },
    purposeOfVisit: { type: String, required: true },
    arrivalDate: { type: Date, required: true },
    departureDate: { type: Date, required: true },
    durationOfStay: { type: String, required: true },
    numberOfEntries: { type: String, required: true },

    // Accommodation
    accommodationType: { type: String, required: true },
    accommodationAddress: { type: String, required: true },
    travelPackageName: { type: String },
    placesToVisit: { type: String },

    // Financial
    expensesBearer: { type: String, required: true },
    estimatedBudget: { type: String, required: true },
    sufficientFunds: { type: String, required: true },

    // Sponsor
    sponsorName: { type: String },
    sponsorRelationship: { type: String },
    sponsorAddress: { type: String },
    sponsorPhone: { type: String },

    // Travel History
    travelledBefore: { type: String, required: true },
    countriesVisited: { type: String },
    overstayedVisa: { type: String, required: true },
    refusedVisa: { type: String, required: true },
    refusalDetails: { type: String },

    // Health
    hasInsurance: { type: String, required: true },
    medicalCondition: { type: String },

    // Documents
    passportBioFile: { type: String },
    passportPhotoFile: { type: String },
    supportingDocumentsFile: { type: String },

    // Declaration
    agreeToTerms: { type: Boolean, required: true, default: false },

    // Status
    status: {
      type: String,
      enum: ['New', 'Under Review', 'Approved', 'Rejected', 'More Info Required'],
      default: 'New',
    },
    adminNotes: { type: String },

    // Timestamps
    submittedDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
visaApplicationSchema.index({ email: 1, passportNumber: 1 });
visaApplicationSchema.index({ status: 1 });
visaApplicationSchema.index({ userId: 1 });

export const VisaApplication = mongoose.model<IVisaApplication>('VisaApplication', visaApplicationSchema);