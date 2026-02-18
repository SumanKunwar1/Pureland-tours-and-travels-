// src/pages/agent/AgentCommissions.tsx
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AgentCommissions() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Individual commission data - specific to this agent
  const commissions = [
    {
      id: "COM-001",
      tourName: "Taj Mahal Heritage Tour",
      bookingAmount: 24000,
      commissionRate: 5,
      commissionAmount: 1200,
      status: "confirmed",
      earnedDate: "2024-03-10",
    },
  ];

  const totalCommission = commissions.reduce(
    (sum, c) => sum + c.commissionAmount,
    0
  );

  const pendingCommission = 5600; // Example

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
            Your Commission Tracking
          </h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Total Earned</p>
                  <p className="text-3xl font-bold text-emerald-400">
                    ₹{totalCommission.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-emerald-600" />
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Pending</p>
                  <p className="text-3xl font-bold text-orange-400">
                    ₹{pendingCommission.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Commission Rate</p>
                  <p className="text-3xl font-bold text-cyan-400">5%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-cyan-600" />
              </div>
            </div>
          </div>

          {/* Commissions Table */}
          <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-700/50 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-slate-300">
                      Tour Name
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-300">
                      Booking Amount
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-300">
                      Commission Rate
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-300">
                      Commission
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-300">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {commissions.map((commission) => (
                    <tr key={commission.id} className="hover:bg-slate-700/30">
                      <td className="px-6 py-4 font-medium text-white">
                        {commission.tourName}
                      </td>
                      <td className="px-6 py-4 text-white">
                        ₹{commission.bookingAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-white">
                        {commission.commissionRate}%
                      </td>
                      <td className="px-6 py-4 font-bold text-emerald-400">
                        ₹{commission.commissionAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300">
                          {commission.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Withdrawal Section */}
          <div className="p-6 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4">
              Request Withdrawal
            </h3>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Amount to Withdraw
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500"
                />
              </div>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                Request Withdrawal
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}