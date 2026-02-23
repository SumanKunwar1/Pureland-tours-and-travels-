// src/pages/agent/AgentDashboard.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  Users,
  Gift,
  ChevronDown,
  CalendarDays,
  Briefcase,
  LogOut,
  Package,
  Star,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Trip {
  _id: string;
  name: string;
  destination: string;
  image: string;
  duration: string;
  price: number;
  b2bPrice: number;
  originalPrice: number;
  discount: number;
  commission: number;
  dates: Array<{ date: string; price: number }>;
  hasGoodies: boolean;
  tripCategory: string;
  tripType: string;
}

const MOCK_TRIPS: Trip[] = [
  {
    _id: "1",
    name: "Mystical Bhutan - Land of Thunder Dragon",
    destination: "Bhutan",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop",
    duration: "6 Days / 5 Nights",
    price: 45000,
    b2bPrice: 38000,
    originalPrice: 55000,
    discount: 10000,
    commission: 15,
    dates: [
      { date: "2026-03-15", price: 45000 },
      { date: "2026-04-10", price: 47000 },
    ],
    hasGoodies: true,
    tripCategory: "travel-styles",
    tripType: "pilgrimage",
  },
  {
    _id: "2",
    name: "Nepal Heritage Tour - Temples & Mountains",
    destination: "Kathmandu",
    image: "https://images.unsplash.com/photo-1507743403345-8ebf43e39f1c?w=800&h=600&fit=crop",
    duration: "5 Days / 4 Nights",
    price: 28000,
    b2bPrice: 23000,
    originalPrice: 35000,
    discount: 7000,
    commission: 12,
    dates: [
      { date: "2026-03-20", price: 28000 },
      { date: "2026-04-15", price: 29000 },
    ],
    hasGoodies: false,
    tripCategory: "india-trips",
    tripType: "",
  },
  {
    _id: "3",
    name: "Pokhara Lakeside Retreat",
    destination: "Pokhara",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    duration: "4 Days / 3 Nights",
    price: 22000,
    b2bPrice: 18500,
    originalPrice: 28000,
    discount: 6000,
    commission: 10,
    dates: [
      { date: "2026-03-25", price: 22000 },
      { date: "2026-04-20", price: 23000 },
    ],
    hasGoodies: true,
    tripCategory: "india-trips",
    tripType: "",
  },
  {
    _id: "4",
    name: "Lumbini Spiritual Journey",
    destination: "Lumbini",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    duration: "3 Days / 2 Nights",
    price: 18000,
    b2bPrice: 15000,
    originalPrice: 23000,
    discount: 5000,
    commission: 12,
    dates: [
      { date: "2026-03-18", price: 18000 },
      { date: "2026-04-12", price: 19000 },
    ],
    hasGoodies: false,
    tripCategory: "travel-styles",
    tripType: "pilgrimage",
  },
  {
    _id: "5",
    name: "Everest Base Camp Trek",
    destination: "Everest Region",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=600&fit=crop",
    duration: "12 Days / 11 Nights",
    price: 95000,
    b2bPrice: 78000,
    originalPrice: 115000,
    discount: 20000,
    commission: 18,
    dates: [
      { date: "2026-04-05", price: 95000 },
      { date: "2026-05-10", price: 98000 },
    ],
    hasGoodies: true,
    tripCategory: "travel-styles",
    tripType: "adventure",
  },
  {
    _id: "6",
    name: "Chitwan Wildlife Safari",
    destination: "Chitwan",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
    duration: "3 Days / 2 Nights",
    price: 24000,
    b2bPrice: 20000,
    originalPrice: 30000,
    discount: 6000,
    commission: 12,
    dates: [
      { date: "2026-03-22", price: 24000 },
      { date: "2026-04-18", price: 25000 },
    ],
    hasGoodies: false,
    tripCategory: "india-trips",
    tripType: "",
  },
];

export default function AgentDashboard() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  const categories = ["All", "Pilgrimage", "Adventure", "Heritage", "Wildlife", "Trekking"];
  const budgetRanges = [
    "Under ₹20,000",
    "₹20,000 - ₹40,000",
    "₹40,000 - ₹60,000",
    "₹60,000 - ₹80,000",
    "Above ₹80,000",
  ];
  const durations = ["1-3 Days", "4-6 Days", "7-10 Days", "10+ Days"];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("agentLoggedIn");
    navigate("/agent/login");
  };

  const filterTripsByBudget = (trip: Trip, budgetRange: string): boolean => {
    const price = trip.b2bPrice;
    switch (budgetRange) {
      case "Under ₹20,000":
        return price < 20000;
      case "₹20,000 - ₹40,000":
        return price >= 20000 && price < 40000;
      case "₹40,000 - ₹60,000":
        return price >= 40000 && price < 60000;
      case "₹60,000 - ₹80,000":
        return price >= 60000 && price < 80000;
      case "Above ₹80,000":
        return price >= 80000;
      default:
        return true;
    }
  };

  const handleBudgetChange = (budget: string, checked: boolean) => {
    if (checked) {
      setSelectedBudgets([...selectedBudgets, budget]);
    } else {
      setSelectedBudgets(selectedBudgets.filter((b) => b !== budget));
    }
  };

  const handleDurationChange = (duration: string, checked: boolean) => {
    if (checked) {
      setSelectedDurations([...selectedDurations, duration]);
    } else {
      setSelectedDurations(selectedDurations.filter((d) => d !== duration));
    }
  };

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      trip.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
      trip.tripType.toLowerCase().includes(activeCategory.toLowerCase());

    const matchesBudget =
      selectedBudgets.length === 0 ||
      selectedBudgets.some((budget) => filterTripsByBudget(trip, budget));

    return matchesSearch && matchesCategory && matchesBudget;
  });

  const totalEarnings = filteredTrips.reduce(
    (sum, trip) => sum + (trip.price - trip.b2bPrice),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Agent Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-xl font-display font-bold text-foreground">
                    Agent Portal
                  </h1>
                  <p className="text-xs text-muted-foreground">B2B Travel Partner</p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-foreground">
                  {user?.name || "Agent"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.agencyName || "Travel Agency"}
                </p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Available</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {filteredTrips.length}
            </h3>
            <p className="text-sm text-muted-foreground">Total Packages</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-muted-foreground">Potential</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              ₹{(totalEarnings / 1000).toFixed(0)}K
            </h3>
            <p className="text-sm text-muted-foreground">Earnings Pool</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-xs text-muted-foreground">Average</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">12-18%</h3>
            <p className="text-sm text-muted-foreground">Commission Rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-muted-foreground">Status</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">Active</h3>
            <p className="text-sm text-muted-foreground">Partner Status</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom pb-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-1">
                  Available Tour Packages
                </h2>
                <p className="text-sm text-muted-foreground">
                  Browse all tours with exclusive B2B pricing
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search tours or destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 mt-6 overflow-x-auto hide-scrollbar pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 shrink-0 p-6 border-r border-slate-200">
              <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
                  <Filter className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Filters</span>
                </div>

                {/* Budget Filter */}
                <Collapsible open={isBudgetOpen} onOpenChange={setIsBudgetOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💰</span>
                      <span className="text-sm font-medium">B2B Budget</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        isBudgetOpen && "rotate-180"
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="py-3 space-y-3">
                    {budgetRanges.map((range) => (
                      <label
                        key={range}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          id={range}
                          checked={selectedBudgets.includes(range)}
                          onCheckedChange={(checked) =>
                            handleBudgetChange(range, checked as boolean)
                          }
                        />
                        <span className="text-sm text-muted-foreground">
                          {range}
                        </span>
                      </label>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Duration Filter */}
                <Collapsible open={isDurationOpen} onOpenChange={setIsDurationOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Duration</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        isDurationOpen && "rotate-180"
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="py-3 space-y-3">
                    {durations.map((duration) => (
                      <label
                        key={duration}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          id={duration}
                          checked={selectedDurations.includes(duration)}
                          onCheckedChange={(checked) =>
                            handleDurationChange(duration, checked as boolean)
                          }
                        />
                        <span className="text-sm text-muted-foreground">
                          {duration}
                        </span>
                      </label>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </aside>

            {/* Trip Cards Grid */}
            <div className="flex-1 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTrips.map((trip, index) => (
                  <motion.div
                    key={trip._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/agent/trip/${trip._id}`}
                      className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 block"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Image */}
                        <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0">
                          <img
                            src={trip.image}
                            alt={trip.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {trip.hasGoodies && (
                            <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <Gift className="w-3 h-3" />
                              Goodies
                            </div>
                          )}
                          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {trip.commission}% Commission
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4">
                          {/* Destination */}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                            <MapPin className="w-3 h-3" />
                            {trip.destination}
                          </div>

                          {/* Title */}
                          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {trip.name}
                          </h3>

                          {/* Duration */}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                            <Clock className="w-3 h-3" />
                            {trip.duration}
                          </div>

                          {/* B2B Pricing */}
                          <div className="bg-primary/5 rounded-lg p-3 mb-3">
                            <p className="text-xs text-muted-foreground mb-1">
                              B2B Price (Your Cost)
                            </p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-bold text-primary">
                                ₹{trip.b2bPrice.toLocaleString()}
                              </span>
                              <span className="text-xs text-muted-foreground line-through">
                                ₹{trip.price.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-xs text-green-600 font-medium mt-1">
                              Your Earning: ₹
                              {(trip.price - trip.b2bPrice).toLocaleString()}
                            </p>
                          </div>

                          {/* Dates */}
                          {trip.dates && trip.dates.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <CalendarDays className="w-3 h-3 text-primary" />
                              {trip.dates.length} departure{trip.dates.length > 1 ? "s" : ""}{" "}
                              available
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {filteredTrips.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No trips found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}