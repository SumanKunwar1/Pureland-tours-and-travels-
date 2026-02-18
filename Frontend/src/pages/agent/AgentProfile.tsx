// src/pages/agent/AgentProfile.tsx
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Mail,
  Phone,
  MapPin,
  Globe,
  Building2,
  User,
  Lock,
  Bell,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AgentProfile() {
  const auth = useAuth() as any;
  const user = auth?.user;
  const navigate = useNavigate();

  // Individual profile state - unique to each agent
  const [formData, setFormData] = useState({
    agencyName: (user as any)?.agencyName || "My Travel Agency",
    contactPerson: user?.name || "",
    email: user?.email || "",
    phone: (user as any)?.phone || "+91 98765 43210",
    city: (user as any)?.city || "New Delhi",
    state: (user as any)?.state || "Delhi",
    country: (user as any)?.country || "India",
    website: (user as any)?.website || "",
    gstNumber: (user as any)?.gstNumber || "",
    registrationNumber: (user as any)?.registrationNumber || "",
    bankAccount: (user as any)?.bankAccount || "",
    ifscCode: (user as any)?.ifscCode || "",
    bankHolder: (user as any)?.bankHolder || "",
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Call API to update profile
    // await agentService.updateProfile(formData);
    setTimeout(() => {
      setIsSaving(false);
      // Show success toast
    }, 1000);
  };

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
            Your Profile Settings
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-slate-700 bg-slate-700/30">
            {[
              { id: "profile", label: "Profile Information", icon: User },
              { id: "banking", label: "Banking Details", icon: CreditCard },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "security", label: "Security", icon: Lock },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 font-medium transition-all border-b-2 ${
                    activeTab === tab.id
                      ? "border-cyan-500 text-cyan-300"
                      : "border-transparent text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white mb-6">
                  Agency Information
                </h3>

                {/* Agency Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <Building2 className="w-4 h-4 inline mr-2" />
                      Agency Name
                    </label>
                    <Input
                      name="agencyName"
                      value={formData.agencyName}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Your agency name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Contact Person Name
                    </label>
                    <Input
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="your@email.com"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      City
                    </label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      State
                    </label>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Country
                    </label>
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Country"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <Globe className="w-4 h-4 inline mr-2" />
                      Website
                    </label>
                    <Input
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                {/* Business Details */}
                <div className="pt-6 border-t border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-6">
                    Business Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Registration Number
                      </label>
                      <Input
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Registration number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        GST Number
                      </label>
                      <Input
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="GST number"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "banking" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white mb-6">
                  Banking Information
                </h3>
                <p className="text-slate-400 mb-6">
                  Update your banking details for commission payouts
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Bank Account Holder Name
                    </label>
                    <Input
                      name="bankHolder"
                      value={formData.bankHolder}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Account holder name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Bank Account Number
                    </label>
                    <Input
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Account number"
                      type="password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      IFSC Code
                    </label>
                    <Input
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleInputChange}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="IFSC code"
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm text-amber-300">
                      ⚠️ Your banking information is encrypted and secure. It will only be used for commission payouts.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white mb-6">
                  Notification Preferences
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      id: "inquiry_notifications",
                      label: "New Inquiry Notifications",
                      description: "Get notified when you receive new booking inquiries",
                    },
                    {
                      id: "booking_confirmations",
                      label: "Booking Confirmations",
                      description: "Get notified when an inquiry is confirmed",
                    },
                    {
                      id: "commission_alerts",
                      label: "Commission Alerts",
                      description: "Get notified when you earn commissions",
                    },
                    {
                      id: "marketing_emails",
                      label: "Marketing Emails",
                      description: "Receive promotional offers and new tour announcements",
                    },
                  ].map((notification) => (
                    <label
                      key={notification.id}
                      className="flex items-start gap-3 p-4 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 mt-1"
                      />
                      <div>
                        <p className="font-medium text-white">
                          {notification.label}
                        </p>
                        <p className="text-sm text-slate-400">
                          {notification.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white mb-6">
                  Security Settings
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">
                      Change Password
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Current Password
                        </label>
                        <Input
                          type="password"
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          New Password
                        </label>
                        <Input
                          type="password"
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Confirm Password
                        </label>
                        <Input
                          type="password"
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-700">
                    <h4 className="font-semibold text-white mb-3">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-slate-400 mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline" className="border-slate-600">
                      Enable 2FA
                    </Button>
                  </div>

                  <div className="pt-6 border-t border-slate-700">
                    <h4 className="font-semibold text-white mb-3">
                      Active Sessions
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30">
                        <div>
                          <p className="text-white font-medium">
                            This Device
                          </p>
                          <p className="text-xs text-slate-400">
                            Chrome on Windows
                          </p>
                        </div>
                        <span className="text-xs text-emerald-400 font-semibold">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-700 bg-slate-700/30 px-8 py-6 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Last updated: 2 hours ago
            </p>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}