// src/pages/agent/AgentDashboard.tsx
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  TrendingUp,
  Users,
  AlertCircle,
  LogOut,
  Menu,
  X,
  Search,
  Filter,
  Download,
  Plus,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  Zap,
  Star,
  Calendar,
  DollarSign,
  Settings,
  HelpCircle,
  Bell,
  BookOpen,
  Eye,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Home,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookingFormModal } from "@/components/shared/BookingFormModal";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// ============================================
// SHARED B2B TOURS - SAME FOR ALL AGENTS
// ============================================
// These tours are identical for all agents
// Only their bookings/inquiries will be individual
const SHARED_B2B_TOURS = [
  {
    _id: "tour-1",
    name: "Bali Paradise Package",
    destination: "Bali",
    image: "https://images.unsplash.com/photo-1494681887825-30af8f74a3d6?w=500&h=300&fit=crop",
    duration: "5 Days / 4 Nights",
    price: 35000,
    b2bPrice: 22000,
    originalPrice: 45000,
    discount: 10000,
    hasGoodies: true,
    rating: 4.8,
    reviews: 124,
    availability: 12,
    dates: [
      { date: "2024-03-15", price: 22000 },
      { date: "2024-03-22", price: 22000 },
      { date: "2024-03-29", price: 23000 },
    ],
  },
  {
    _id: "tour-2",
    name: "Taj Mahal Heritage Tour",
    destination: "Agra",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop",
    duration: "3 Days / 2 Nights",
    price: 18000,
    b2bPrice: 12000,
    originalPrice: 24000,
    discount: 6000,
    hasGoodies: false,
    rating: 4.9,
    reviews: 256,
    availability: 8,
    dates: [
      { date: "2024-03-10", price: 12000 },
      { date: "2024-03-17", price: 12000 },
    ],
  },
  {
    _id: "tour-3",
    name: "Kerala Backwater Cruise",
    destination: "Kerala",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    duration: "4 Days / 3 Nights",
    price: 32000,
    b2bPrice: 20000,
    originalPrice: 42000,
    discount: 10000,
    hasGoodies: true,
    rating: 4.7,
    reviews: 89,
    availability: 5,
    dates: [
      { date: "2024-03-12", price: 20000 },
      { date: "2024-03-20", price: 20000 },
      { date: "2024-03-28", price: 21000 },
    ],
  },
  {
    _id: "tour-4",
    name: "Rajasthan Royal Circuit",
    destination: "Rajasthan",
    image: "https://images.unsplash.com/photo-1504681869696-d977e3a973da?w=500&h=300&fit=crop",
    duration: "6 Days / 5 Nights",
    price: 48000,
    b2bPrice: 28000,
    originalPrice: 62000,
    discount: 14000,
    hasGoodies: true,
    rating: 4.6,
    reviews: 178,
    availability: 15,
    dates: [
      { date: "2024-03-14", price: 28000 },
      { date: "2024-03-21", price: 28000 },
      { date: "2024-03-25", price: 29000 },
    ],
  },
  {
    _id: "tour-5",
    name: "Himalaya Adventure Trek",
    destination: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    duration: "7 Days / 6 Nights",
    price: 55000,
    b2bPrice: 32000,
    originalPrice: 70000,
    discount: 15000,
    hasGoodies: true,
    rating: 4.9,
    reviews: 142,
    availability: 10,
    dates: [
      { date: "2024-03-16", price: 32000 },
      { date: "2024-03-24", price: 32000 },
    ],
  },
  {
    _id: "tour-6",
    name: "Goa Beach Bliss",
    destination: "Goa",
    image: "https://images.unsplash.com/photo-1503571921356-4c5e1b3a3f0f?w=500&h=300&fit=crop",
    duration: "4 Days / 3 Nights",
    price: 22000,
    b2bPrice: 14000,
    originalPrice: 30000,
    discount: 8000,
    hasGoodies: false,
    rating: 4.5,
    reviews: 95,
    availability: 20,
    dates: [
      { date: "2024-03-13", price: 14000 },
      { date: "2024-03-19", price: 14000 },
      { date: "2024-03-26", price: 15000 },
    ],
  },
];

// ============================================
// INDIVIDUAL AGENT INQUIRIES - DIFFERENT FOR EACH AGENT
// ============================================
// These are stored per agent in the database
// For demo, we create sample data based on logged-in agent
const getMockInquiriesForAgent = (agentId: string) => [
  {
    id: "INQ-001",
    tourName: "Bali Paradise Package",
    tourId: "tour-1",
    customerName: "Rajesh Kumar",
    travelers: 3,
    date: "2024-03-15",
    estimatedValue: 66000,
    status: "pending",
    submittedOn: "2024-03-08",
    agentId: agentId,
  },
  {
    id: "INQ-002",
    tourName: "Taj Mahal Heritage Tour",
    tourId: "tour-2",
    customerName: "Priya Singh",
    travelers: 2,
    date: "2024-03-10",
    estimatedValue: 24000,
    status: "confirmed",
    submittedOn: "2024-03-06",
    agentId: agentId,
  },
  {
    id: "INQ-003",
    tourName: "Kerala Backwater Cruise",
    tourId: "tour-3",
    customerName: "Ahmed Hassan",
    travelers: 4,
    date: "2024-03-20",
    estimatedValue: 80000,
    status: "pending",
    submittedOn: "2024-03-07",
    agentId: agentId,
  },
];

// ============================================
// INDIVIDUAL AGENT PROFILE - DIFFERENT FOR EACH AGENT
// ============================================
const getAgentProfile = (user: any) => ({
  id: user?.id,
  name: user?.name || "Agent Name",
  email: user?.email,
  phone: user?.phone || "+91 98765 43210",
  registeredOn: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Jan 15, 2024",
  totalBookings: 24,
  totalRevenue: 245000,
  pendingInquiries: 5,
  walletBalance: 50000,
  agencyName: user?.agencyName || "My Travel Agency",
});

export default function AgentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tours");

  // Get agent profile based on logged-in user
  const agentProfile = useMemo(() => getAgentProfile(user), [user]);

  // Get inquiries specific to this agent
  const agentInquiries = useMemo(
    () => getMockInquiriesForAgent(user?.id || ""),
    [user?.id]
  );

  // Filter inquiries based on search and status
  const filteredInquiries = useMemo(() => {
    return agentInquiries.filter((inquiry) => {
      const matchesSearch =
        inquiry.tourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inquiry.customerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "all" || inquiry.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, agentInquiries]);

  // Filter shared B2B tours (same for all agents)
  const filteredTours = useMemo(() => {
    return SHARED_B2B_TOURS.filter((tour) =>
      tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleBookTour = (tour: any) => {
    setSelectedTour(tour);
    setIsBookingModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Stats cards - individual for each agent
  const stats = [
    {
      label: "Total Bookings",
      value: agentProfile.totalBookings,
      icon: BookOpen,
      color: "from-blue-500/20 to-blue-600/20",
      textColor: "text-blue-600",
      change: "+12%",
      trend: "up",
    },
    {
      label: "Total Revenue",
      value: `₹${(agentProfile.totalRevenue / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: "from-emerald-500/20 to-emerald-600/20",
      textColor: "text-emerald-600",
      change: "+18%",
      trend: "up",
    },
    {
      label: "Pending Inquiries",
      value: agentProfile.pendingInquiries,
      icon: AlertCircle,
      color: "from-orange-500/20 to-orange-600/20",
      textColor: "text-orange-600",
      change: "-3%",
      trend: "down",
    },
    {
      label: "Wallet Balance",
      value: `₹${(agentProfile.walletBalance / 1000).toFixed(0)}K`,
      icon: Zap,
      color: "from-purple-500/20 to-purple-600/20",
      textColor: "text-purple-600",
      change: "+5%",
      trend: "up",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Agent Dashboard
              </h1>
              <p className="text-xs text-slate-400 mt-1">{agentProfile.agencyName}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => navigate("/agent/profile")}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-red-400 hover:text-red-300"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-72 border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-sm lg:relative fixed inset-y-0 left-0 top-16 z-30 overflow-y-auto"
            >
              <div className="p-6">
                {/* Agent Info Card - PERSONALIZED FOR EACH AGENT */}
                <div className="mb-8 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <h3 className="font-semibold text-white mb-1">
                    {agentProfile.agencyName}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3">
                    {agentProfile.email}
                  </p>
                  <div className="text-xs text-slate-300 space-y-1">
                    <p>📱 {agentProfile.phone}</p>
                    <p>📅 Since {agentProfile.registeredOn}</p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {[
                    { name: "Dashboard", icon: BarChart3, id: "dashboard" },
                    { name: "Browse Tours", icon: MapPin, id: "tours" },
                    { name: "My Inquiries", icon: MessageSquare, id: "inquiries" },
                    { name: "My Bookings", icon: BookOpen, id: "bookings" },
                    { name: "Commissions", icon: TrendingUp, id: "commissions" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium",
                          activeTab === item.id
                            ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                            : "text-slate-300 hover:bg-slate-800/50"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {item.name}
                      </button>
                    );
                  })}
                </nav>

                {/* Quick Actions */}
                <div className="mt-8 pt-8 border-t border-slate-700/50">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase mb-4">
                    Quick Actions
                  </h4>
                  <Button className="w-full mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    <Plus className="w-4 h-4 mr-2" />
                    New Inquiry
                  </Button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-600 hover:bg-slate-800 transition-colors text-sm font-medium">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                </div>

                {/* Support Card */}
                <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-semibold text-amber-300 mb-1">
                        Need Help?
                      </h4>
                      <p className="text-xs text-slate-400 mb-3">
                        Contact our support team
                      </p>
                      <a
                        href="https://wa.me/9779704502011"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        Chat on WhatsApp →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {activeTab === "dashboard" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Welcome Section - PERSONALIZED */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Welcome back, {agentProfile.agencyName.split(" ")[0]}! 👋
                  </h2>
                  <p className="text-slate-400">
                    Your individual dashboard - Browse shared B2B tours and track your own inquiries
                  </p>
                </div>

                {/* Stats Grid - INDIVIDUAL FOR EACH AGENT */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative group"
                      >
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                        <div className="relative p-6 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-slate-600/50 transition-all">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-slate-400 text-sm font-medium mb-2">
                                {stat.label}
                              </p>
                              <p className="text-2xl font-bold text-white">
                                {stat.value}
                              </p>
                              <div className="flex items-center gap-1 mt-2">
                                <TrendIcon className={`w-4 h-4 ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`} />
                                <span className={`text-xs font-semibold ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                                  {stat.change}
                                </span>
                              </div>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                              <Icon className={`w-6 h-6 ${stat.textColor}`} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Quick Access Tours - SHARED FOR ALL AGENTS */}
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Popular B2B Tours */}
                  <div className="lg:col-span-2">
                    <div className="p-6 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-400" />
                        Top B2B Tours Available
                      </h3>
                      <div className="space-y-3">
                        {SHARED_B2B_TOURS.slice(0, 3).map((tour) => (
                          <div
                            key={tour._id}
                            className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:border-slate-500/50 transition-all"
                          >
                            <div>
                              <h4 className="font-semibold text-white">
                                {tour.name}
                              </h4>
                              <p className="text-xs text-slate-400 mt-1">
                                ⭐ {tour.rating} ({tour.reviews} reviews)
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-cyan-400">
                                ₹{tour.b2bPrice.toLocaleString()}
                              </p>
                              <p className="text-xs text-slate-400">B2B Price</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button
                        onClick={() => setActiveTab("tours")}
                        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      >
                        Browse All Shared Tours
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>

                  {/* Your Recent Inquiries - INDIVIDUAL */}
                  <div className="p-6 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-400" />
                      Your Recent Inquiries
                    </h3>
                    <div className="space-y-3">
                      {agentInquiries.slice(0, 3).map((inquiry) => (
                        <div key={inquiry.id} className="text-sm">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-white">
                                {inquiry.tourName}
                              </p>
                              <p className="text-xs text-slate-400">
                                {inquiry.customerName}
                              </p>
                            </div>
                            <div
                              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                inquiry.status === "confirmed"
                                  ? "bg-emerald-500/20 text-emerald-300"
                                  : inquiry.status === "pending"
                                    ? "bg-orange-500/20 text-orange-300"
                                    : "bg-red-500/20 text-red-300"
                              }`}
                            >
                              {inquiry.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => setActiveTab("inquiries")}
                      variant="outline"
                      className="w-full mt-4 border-slate-600 hover:bg-slate-700"
                    >
                      View All Inquiries
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "tours" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Shared B2B Tours Catalog
                  </h2>
                  <p className="text-slate-400">
                    These tours are available to all agents at the same B2B rates
                  </p>
                </div>

                {/* Search & Filter */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      placeholder="Search tours by name or destination..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors text-slate-300">
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                </div>

                {/* Tours Grid - SHARED FOR ALL AGENTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTours.map((tour, idx) => (
                    <motion.div
                      key={tour._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group rounded-xl overflow-hidden border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-slate-600 transition-all hover:shadow-2xl hover:shadow-blue-500/10"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={tour.image}
                          alt={tour.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80" />

                        {/* Badge */}
                        <div className="absolute top-3 right-3">
                          {tour.hasGoodies && (
                            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-semibold">
                              🎁 With Goodies
                            </span>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-white text-sm font-bold">
                            {tour.rating}
                          </span>
                          <span className="text-slate-300 text-xs">
                            ({tour.reviews})
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-bold text-white text-lg mb-1 group-hover:text-cyan-300 transition-colors">
                          {tour.name}
                        </h3>
                        <p className="text-slate-400 text-sm mb-3 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {tour.destination}
                        </p>

                        {/* Duration & Availability */}
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {tour.duration}
                          </span>
                          <span className="text-emerald-400 font-semibold">
                            {tour.availability} left
                          </span>
                        </div>

                        {/* Pricing - SAME FOR ALL AGENTS */}
                        <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                          <p className="text-xs text-slate-400 mb-1">Shared B2B Price</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-cyan-300">
                              ₹{tour.b2bPrice.toLocaleString()}
                            </span>
                            <span className="text-sm text-slate-400 line-through">
                              ₹{tour.price.toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-emerald-400">
                              Save ₹{(tour.price - tour.b2bPrice).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* CTA */}
                        <Button
                          onClick={() => handleBookTour(tour)}
                          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
                        >
                          Create Your Inquiry
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "inquiries" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Your Booking Inquiries
                  </h2>
                  <p className="text-slate-400">
                    Track and manage all your customer inquiries
                  </p>
                </div>

                {/* Search & Filters */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      placeholder="Search by tour name or customer..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    {["all", "pending", "confirmed"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setActiveFilter(status)}
                        className={cn(
                          "px-4 py-2 rounded-lg font-medium text-sm transition-all",
                          activeFilter === status
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                            : "bg-slate-800 border border-slate-700 text-slate-300 hover:border-slate-600"
                        )}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Your Inquiries Table - INDIVIDUAL */}
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-700/50 border-b border-slate-700">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-slate-300">
                            Inquiry ID
                          </th>
                          <th className="px-6 py-4 text-left font-semibold text-slate-300">
                            Tour / Customer
                          </th>
                          <th className="px-6 py-4 text-left font-semibold text-slate-300">
                            Travelers
                          </th>
                          <th className="px-6 py-4 text-left font-semibold text-slate-300">
                            Est. Value
                          </th>
                          <th className="px-6 py-4 text-left font-semibold text-slate-300">
                            Date
                          </th>
                          <th className="px-6 py-4 text-left font-semibold text-slate-300">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {filteredInquiries.map((inquiry) => (
                          <motion.tr
                            key={inquiry.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-slate-700/30 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <span className="font-mono text-cyan-400 font-semibold">
                                {inquiry.id}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-white">
                                  {inquiry.tourName}
                                </p>
                                <p className="text-xs text-slate-400">
                                  {inquiry.customerName}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-white font-medium">
                              {inquiry.travelers}
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-bold text-cyan-300">
                                ₹{inquiry.estimatedValue.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-400">
                              {new Date(inquiry.date).toLocaleDateString(
                                "en-IN"
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-block px-3 py-1 rounded-full font-semibold text-xs ${
                                  inquiry.status === "confirmed"
                                    ? "bg-emerald-500/20 text-emerald-300"
                                    : inquiry.status === "pending"
                                      ? "bg-orange-500/20 text-orange-300"
                                      : "bg-red-500/20 text-red-300"
                                }`}
                              >
                                {inquiry.status === "confirmed" && (
                                  <>
                                    <CheckCircle className="w-3 h-3 inline mr-1" />
                                  </>
                                )}
                                {inquiry.status === "pending" && (
                                  <>
                                    <Clock className="w-3 h-3 inline mr-1" />
                                  </>
                                )}
                                {inquiry.status.charAt(0).toUpperCase() +
                                  inquiry.status.slice(1)}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "bookings" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Your Confirmed Bookings
                  </h3>
                  <p className="text-slate-400 mb-6">
                    View all your confirmed bookings here
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "commissions" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center py-16">
                  <TrendingUp className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Your Commission Tracking
                  </h3>
                  <p className="text-slate-400 mb-6">
                    Monitor your earnings and commissions
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Booking Modal */}
      {selectedTour && (
        <BookingFormModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedTour(null);
          }}
          tripName={selectedTour.name}
          tripId={selectedTour._id}
          travelers={1}
          selectedDate={selectedTour.dates?.[0]?.date}
          selectedPrice={selectedTour.b2bPrice}
          totalAmount={selectedTour.b2bPrice}
        />
      )}
    </div>
  );
}