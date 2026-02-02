// src/services/api/customTrips.ts
import axios from 'axios';
import { API_BASE_URL } from '@/lib/api-config';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface CustomTripData {
  name?: string;
  email?: string;
  phone?: string;
  destination?: string;
  travelers?: string;
  dates?: string;
  budget?: string;
  message?: string;
  customerName?: string;
  travelDates?: string;
}

export interface CustomTripUpdateData {
  status?: 'pending' | 'quoted' | 'accepted' | 'rejected';
  adminNotes?: string;
  quotedPrice?: number;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
}

export interface CustomTrip {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  destination: string;
  budget?: string;
  status: 'pending' | 'quoted' | 'accepted' | 'rejected';
  submittedDate: string;
  quotedPrice?: number;
  adminNotes?: string;
}

export interface CustomTripResponse {
  status: string;
  data: {
    customTrip?: CustomTrip;
    customTrips?: CustomTrip[];
    pagination?: Pagination;
    totalRequests?: number;
    pendingRequests?: number;
    quotedRequests?: number;
    acceptedRequests?: number;
    rejectedRequests?: number;
  };
}

export const customTripService = {
  /**
   * Submit a custom trip request (for the form)
   */
  submitRequest: async (data: CustomTripData): Promise<CustomTripResponse> => {
    try {
      const mappedData = {
        customerName: data.name || data.customerName,
        email: data.email,
        phone: data.phone,
        destination: data.destination,
        travelers: data.travelers,
        travelDates: data.dates || data.travelDates,
        budget: data.budget,
        message: data.message,
      };

      const response = await api.post('/custom-trips', mappedData);
      return response.data;
    } catch (error: any) {
      console.error('Error submitting custom trip:', error);
      throw error;
    }
  },

  /**
   * Get all custom trip requests (admin)
   */
  getAllTrips: async (params?: { status?: string; search?: string; page?: number; limit?: number }): Promise<CustomTripResponse> => {
    try {
      const response = await api.get('/custom-trips', { params });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching custom trips:', error);
      throw error;
    }
  },

  /**
   * Get my custom trip requests (user)
   */
  getMyTrips: async (): Promise<CustomTripResponse> => {
    try {
      const response = await api.get('/custom-trips/my-requests');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching my custom trips:', error);
      throw error;
    }
  },

  /**
   * Get single custom trip request
   */
  getTrip: async (id: string): Promise<CustomTripResponse> => {
    try {
      const response = await api.get(`/custom-trips/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching custom trip:', error);
      throw error;
    }
  },

  /**
   * Update custom trip request (admin)
   */
  updateTrip: async (id: string, data: CustomTripUpdateData): Promise<CustomTripResponse> => {
    try {
      const response = await api.patch(`/custom-trips/${id}`, data);
      return response.data;
    } catch (error: any) {
      console.error('Error updating custom trip:', error);
      throw error;
    }
  },

  /**
   * Delete custom trip request (admin)
   */
  deleteTrip: async (id: string): Promise<CustomTripResponse> => {
    try {
      const response = await api.delete(`/custom-trips/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error deleting custom trip:', error);
      throw error;
    }
  },

  /**
   * Get statistics (admin)
   */
  getStats: async (): Promise<CustomTripResponse> => {
    try {
      const response = await api.get('/custom-trips/admin/stats');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },
};