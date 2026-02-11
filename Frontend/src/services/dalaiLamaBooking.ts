// src/services/dalaiLamaBooking.ts
import axios from 'axios';
import { API_BASE_URL } from '@/lib/api-config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface DalaiLamaBookingData {
  customerName: string;
  email: string;
  phone: string;
  message?: string;
  travelers: number;
  selectedDate: string;
  totalAmount: number;
}

export const dalaiLamaBookingService = {
  createBooking: async (data: DalaiLamaBookingData) => {
    const response = await api.post('/dalai-lama-bookings', data);
    return response.data;
  },

  // Admin endpoints (if needed later)
  getAllBookings: async (params?: { 
    status?: string; 
    search?: string; 
    page?: number; 
    limit?: number;
  }) => {
    const response = await api.get('/dalai-lama-bookings', { params });
    return response.data;
  },

  getBooking: async (id: string) => {
    const response = await api.get(`/dalai-lama-bookings/${id}`);
    return response.data;
  },

  updateBooking: async (id: string, data: { status: string }) => {
    const response = await api.patch(`/dalai-lama-bookings/${id}`, data);
    return response.data;
  },

  deleteBooking: async (id: string) => {
    const response = await api.delete(`/dalai-lama-bookings/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/dalai-lama-bookings/admin/stats');
    return response.data;
  },
};