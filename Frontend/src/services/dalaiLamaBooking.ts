// src/services/dalaiLamaBooking.ts
import axios from 'axios';
import { API_BASE_URL } from '@/lib/api-config';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ADDED: This is important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
    try {
      console.log('Submitting Dalai Lama booking:', data);
      const response = await api.post('/dalai-lama-bookings', data);
      console.log('Dalai Lama booking response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Dalai Lama booking error:', error.response?.data || error);
      throw error;
    }
  },

  // Admin endpoints
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