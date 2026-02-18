// src/services/agent.ts
import axiosInstance from "@/lib/axios";

export interface AgentProfile {
  name: string;
  email: string;
  phone: string;
  registeredOn: string;
  totalBookings: number;
  totalRevenue: number;
  pendingInquiries: number;
  walletBalance: number;
}

export interface Tour {
  _id: string;
  name: string;
  destination: string;
  image: string;
  duration: string;
  price: number;
  b2bPrice: number;
  originalPrice: number;
  discount: number;
  hasGoodies: boolean;
  rating: number;
  reviews: number;
  availability: number;
  dates: Array<{
    date: string;
    price: number;
  }>;
}

export interface Inquiry {
  id: string;
  tourName: string;
  customerName: string;
  travelers: number;
  date: string;
  estimatedValue: number;
  status: "pending" | "confirmed" | "cancelled";
  submittedOn: string;
}

export interface CreateInquiryPayload {
  tripId: string;
  tripName: string;
  customerName: string;
  email: string;
  phone: string;
  message: string;
  travelers: number;
  selectedDate: string;
  selectedPrice: number;
  totalAmount: number;
}

export const agentService = {
  /**
   * Get agent profile and stats
   */
  async getProfile(): Promise<AgentProfile> {
    try {
      const response = await axiosInstance.get("/agent/profile");
      if (response.data.status === "success") {
        return response.data.data;
      }
      throw new Error("Failed to fetch profile");
    } catch (error: any) {
      console.error("Error fetching agent profile:", error);
      throw error;
    }
  },

  /**
   * Get all tours with B2B pricing
   */
  async getTours(filters?: {
    search?: string;
    destination?: string;
    priceRange?: string;
  }): Promise<Tour[]> {
    try {
      let endpoint = "/tours/b2b?";

      if (filters?.search) {
        endpoint += `search=${encodeURIComponent(filters.search)}&`;
      }
      if (filters?.destination) {
        endpoint += `destination=${filters.destination}&`;
      }
      if (filters?.priceRange) {
        endpoint += `priceRange=${filters.priceRange}&`;
      }

      const response = await axiosInstance.get(endpoint);

      if (response.data.status === "success") {
        return response.data.data.tours;
      }
      throw new Error("Failed to fetch tours");
    } catch (error: any) {
      console.error("Error fetching tours:", error);
      throw error;
    }
  },

  /**
   * Get a single tour with B2B pricing
   */
  async getTour(tourId: string): Promise<Tour> {
    try {
      const response = await axiosInstance.get(`/tours/${tourId}/b2b`);

      if (response.data.status === "success") {
        return response.data.data.tour;
      }
      throw new Error("Failed to fetch tour");
    } catch (error: any) {
      console.error("Error fetching tour:", error);
      throw error;
    }
  },

  /**
   * Create a new booking inquiry
   */
  async createInquiry(payload: CreateInquiryPayload): Promise<Inquiry> {
    try {
      const response = await axiosInstance.post("/agent/inquiries", payload);

      if (response.data.status === "success") {
        return response.data.data.inquiry;
      }
      throw new Error("Failed to create inquiry");
    } catch (error: any) {
      console.error("Error creating inquiry:", error);
      throw error;
    }
  },

  /**
   * Get all inquiries for agent
   */
  async getInquiries(filters?: {
    status?: string;
    search?: string;
  }): Promise<Inquiry[]> {
    try {
      let endpoint = "/agent/inquiries?";

      if (filters?.status && filters.status !== "all") {
        endpoint += `status=${filters.status}&`;
      }
      if (filters?.search) {
        endpoint += `search=${encodeURIComponent(filters.search)}&`;
      }

      const response = await axiosInstance.get(endpoint);

      if (response.data.status === "success") {
        return response.data.data.inquiries;
      }
      throw new Error("Failed to fetch inquiries");
    } catch (error: any) {
      console.error("Error fetching inquiries:", error);
      throw error;
    }
  },

  /**
   * Get a single inquiry
   */
  async getInquiry(inquiryId: string): Promise<Inquiry> {
    try {
      const response = await axiosInstance.get(
        `/agent/inquiries/${inquiryId}`
      );

      if (response.data.status === "success") {
        return response.data.data.inquiry;
      }
      throw new Error("Failed to fetch inquiry");
    } catch (error: any) {
      console.error("Error fetching inquiry:", error);
      throw error;
    }
  },

  /**
   * Update inquiry status
   */
  async updateInquiryStatus(
    inquiryId: string,
    status: "pending" | "confirmed" | "cancelled"
  ): Promise<Inquiry> {
    try {
      const response = await axiosInstance.patch(
        `/agent/inquiries/${inquiryId}`,
        { status }
      );

      if (response.data.status === "success") {
        return response.data.data.inquiry;
      }
      throw new Error("Failed to update inquiry");
    } catch (error: any) {
      console.error("Error updating inquiry:", error);
      throw error;
    }
  },

  /**
   * Cancel an inquiry
   */
  async cancelInquiry(inquiryId: string, reason?: string): Promise<void> {
    try {
      const response = await axiosInstance.post(
        `/agent/inquiries/${inquiryId}/cancel`,
        { reason }
      );

      if (response.data.status !== "success") {
        throw new Error("Failed to cancel inquiry");
      }
    } catch (error: any) {
      console.error("Error cancelling inquiry:", error);
      throw error;
    }
  },

  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<{
    totalBookings: number;
    totalRevenue: number;
    pendingInquiries: number;
    walletBalance: number;
  }> {
    try {
      const response = await axiosInstance.get("/agent/stats");

      if (response.data.status === "success") {
        return response.data.data.stats;
      }
      throw new Error("Failed to fetch stats");
    } catch (error: any) {
      console.error("Error fetching stats:", error);
      throw error;
    }
  },

  /**
   * Download booking report
   */
  async downloadReport(format: "pdf" | "csv" = "pdf"): Promise<Blob> {
    try {
      const response = await axiosInstance.get(`/agent/reports/download`, {
        params: { format },
        responseType: "blob",
      });

      return response.data;
    } catch (error: any) {
      console.error("Error downloading report:", error);
      throw error;
    }
  },

  /**
   * Get commissions data
   */
  async getCommissions(): Promise<any[]> {
    try {
      const response = await axiosInstance.get("/agent/commissions");

      if (response.data.status === "success") {
        return response.data.data.commissions;
      }
      throw new Error("Failed to fetch commissions");
    } catch (error: any) {
      console.error("Error fetching commissions:", error);
      throw error;
    }
  },

  /**
   * Get wallet/payment info
   */
  async getWallet(): Promise<{
    balance: number;
    totalEarnings: number;
    withdrawn: number;
    pendingCommission: number;
  }> {
    try {
      const response = await axiosInstance.get("/agent/wallet");

      if (response.data.status === "success") {
        return response.data.data.wallet;
      }
      throw new Error("Failed to fetch wallet");
    } catch (error: any) {
      console.error("Error fetching wallet:", error);
      throw error;
    }
  },

  /**
   * Request withdrawal
   */
  async requestWithdrawal(amount: number): Promise<void> {
    try {
      const response = await axiosInstance.post("/agent/wallet/withdraw", {
        amount,
      });

      if (response.data.status !== "success") {
        throw new Error("Failed to request withdrawal");
      }
    } catch (error: any) {
      console.error("Error requesting withdrawal:", error);
      throw error;
    }
  },

  /**
   * Update agent profile
   */
  async updateProfile(data: Partial<AgentProfile>): Promise<AgentProfile> {
    try {
      const response = await axiosInstance.put("/agent/profile", data);

      if (response.data.status === "success") {
        return response.data.data;
      }
      throw new Error("Failed to update profile");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  /**
   * Get agent notifications
   */
  async getNotifications(): Promise<any[]> {
    try {
      const response = await axiosInstance.get("/agent/notifications");

      if (response.data.status === "success") {
        return response.data.data.notifications;
      }
      throw new Error("Failed to fetch notifications");
    } catch (error: any) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  },

  /**
   * Mark notification as read
   */
  async markNotificationRead(notificationId: string): Promise<void> {
    try {
      const response = await axiosInstance.patch(
        `/agent/notifications/${notificationId}`,
        { read: true }
      );

      if (response.data.status !== "success") {
        throw new Error("Failed to mark notification");
      }
    } catch (error: any) {
      console.error("Error marking notification:", error);
      throw error;
    }
  },
};

export default agentService;