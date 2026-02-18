// src/pages/agent/AgentBookings.tsx
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Users, DollarSign } from "lucide-react";

export default function AgentBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Individual bookings - specific to this agent
  const bookings = [
    {
      id: "BOOK-001",
      tourName: "Taj Mahal Heritage Tour",
      customerName: "Priya Singh",
      travelers: 2,
      date: "2024-03-10",
      totalAmount: 24000,
      status: "confirmed",
      paymentStatus: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="px-6 py-4">
          <button
            onClick={() => navigate("/agent/dashboard")}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Your Confirmed Bookings
          </h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6"
        >
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-6 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-slate-600 transition-all"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {booking.tourName}
                    </h3>
                    <div className="space-y-2 text-slate-300">
                      <p className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {booking.customerName} ({booking.travelers} travelers)
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Total Amount</p>
                      <p className="text-3xl font-bold text-cyan-400">
                        ₹{booking.totalAmount.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300">
                        {booking.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300">
                        {booking.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                No Confirmed Bookings Yet
              </h3>
              <p className="text-slate-400">
                Your confirmed bookings will appear here
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}