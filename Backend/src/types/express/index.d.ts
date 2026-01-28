// src/types/express/index.d.ts

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: any;
        role?: string;
        email?: string;
        fullName?: string;
        isActive?: boolean;
        [key: string]: any;
      };
    }
  }
}

export {};