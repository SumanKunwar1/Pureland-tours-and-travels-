import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  Download, 
  ChevronDown, 
  ChevronUp,
  Check,
  X,
  MessageCircle,
  Minus,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { cn } from "@/lib/utils";

import destGeorgia from "@/assets/dest-georgia.jpg";

interface ItineraryDay {
  day: number;
  title: string;
  highlights: string[];
}

const tripData = {
  id: "georgia-winter",
  name: "Georgia Winter Group Trip",
  description: "Georgia is a stunning destination that offers a unique blend of ancient history, breathtaking landscapes, and vibrant culture. From the snow-capped Caucasus Mountains to the charming cobblestone streets of Tbilisi, every moment in Georgia is magical. This winter trip is designed to give you the best of Georgian hospitality, cuisine, and adventure.",
  image: destGeorgia,
  duration: "7N/8D",
  price: 52999,
  originalPrice: 56999,
  discount: 4000,
  dates: [
    { month: "Feb", date: "28 Feb 2026", price: 52999 },
    { month: "Mar", date: "7 Mar 2026", price: 52999 },
    { month: "Mar", date: "14 Mar 2026", price: 54999 },
  ],
  itinerary: [
    {
      day: 0,
      title: "Arrival at Tbilisi International Airport | Transfer to Hotel | Free Time",
      highlights: [
        "Welcome to Georgia! Our representative will meet you at Tbilisi International Airport",
        "Transfer to your hotel and check-in",
        "Take some time to relax and freshen up",
        "In the evening, explore the vibrant nightlife of Tbilisi",
        "Enjoy a leisurely walk around the hotel area"
      ]
    },
    {
      day: 1,
      title: "Tbilisi City Tour | Old Town Exploration | Cable Car Ride",
      highlights: [
        "After breakfast, embark on a comprehensive tour of Tbilisi",
        "Visit the iconic Holy Trinity Cathedral",
        "Explore the charming Old Town with colorful balconies and narrow streets",
        "Take a cable car ride to Narikala Fortress for panoramic views",
        "Traditional Georgian dinner with local wine and live folk music"
      ]
    },
    {
      day: 2,
      title: "Drive to Kazbegi | Gergeti Trinity Church | Mountain Views",
      highlights: [
        "Scenic drive along the stunning Georgian Military Highway to Kazbegi",
        "Stop at Ananuri Fortress for photos",
        "Visit the Russia-Georgia Friendship Monument",
        "Jeep ride to the famous Gergeti Trinity Church at 2,170 meters",
        "Breathtaking views of Mount Kazbek as a backdrop",
        "Overnight stay in Kazbegi"
      ]
    },
    {
      day: 3,
      title: "Skiing in Gudauri | Winter Sports Activities",
      highlights: [
        "Head to Gudauri, Georgia's premier ski resort",
        "Enjoy a full day on the slopes (beginners to experienced)",
        "Ski equipment rental and lessons available",
        "Non-skiers can enjoy tubing and paragliding",
        "Soak in stunning mountain scenery from cozy cafes"
      ]
    },
    {
      day: 4,
      title: "Kakheti Wine Region | Winery Tours | Wine Tasting",
      highlights: [
        "Travel to Kakheti, Georgia's famous wine region",
        "Visit traditional wineries and learn about 8,000-year-old winemaking",
        "Generous wine tastings paired with local cheese and bread",
        "Explore Sighnaghi, known as the 'City of Love'",
        "Experience the romantic atmosphere of the town"
      ]
    },
    {
      day: 5,
      title: "Mtskheta Day Trip | UNESCO Heritage Sites | Jvari Monastery",
      highlights: [
        "Visit Mtskheta, Georgia's ancient capital (UNESCO World Heritage Site)",
        "Explore Svetitskhoveli Cathedral, one of the holiest sites",
        "Visit the hilltop Jvari Monastery with stunning river views",
        "Return to Tbilisi for shopping and leisure time"
      ]
    },
    {
      day: 6,
      title: "Free Day in Tbilisi | Spa & Relaxation | Farewell Dinner",
      highlights: [
        "Enjoy a relaxing day in Tbilisi",
        "Visit the famous sulfur baths for a traditional spa experience",
        "Explore the trendy Fabrika area",
        "Shop for souvenirs at the Dry Bridge Market",
        "Special farewell dinner celebrating our Georgian adventure"
      ]
    },
    {
      day: 7,
      title: "Departure | Airport Transfer | Goodbye Georgia",
      highlights: [
        "After breakfast, check out from the hotel",
        "Transfer to Tbilisi International Airport",
        "Bid farewell to Georgia with memories that will last a lifetime",
        "We hope to see you on another adventure soon!"
      ]
    },
  ],
  inclusions: [
    "7 Nights accommodation in 3-4 star hotels",
    "Daily breakfast and selected meals",
    "All airport and inter-city transfers",
    "Experienced English-speaking guide",
    "All sightseeing as per itinerary",
    "Entry tickets to monuments",
    "One day ski pass at Gudauri",
    "Wine tasting experience",
    "Travel insurance",
    "24/7 trip captain support"
  ],
  exclusions: [
    "International airfare",
    "Visa fees (if applicable)",
    "Personal expenses",
    "Tips and gratuities",
    "Adventure activities not mentioned",
    "Ski equipment rental",
    "Meals not mentioned in inclusions",
    "Travel insurance upgrade"
  ],
  notes: [
    "Passport with minimum 6 months validity required",
    "Travel insurance is mandatory",
    "Warm winter clothing is essential",
    "Basic fitness level recommended for mountain activities",
    "Group size: 12-20 travelers",
    "Single room supplement available at additional cost",
    "Itinerary may be modified due to weather conditions",
    "Full payment required 30 days before departure"
  ]
};

const tabs = ["Itinerary", "Inclusions", "Costing", "Notes"];

export default function TripDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Itinerary");
  const [expandedDays, setExpandedDays] = useState<number[]>([0]);
  const [travelers, setTravelers] = useState(1);
  const [selectedDate, setSelectedDate] = useState(tripData.dates[0]);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 400;
      setIsSticky(window.scrollY > heroHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDay = (day: number) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const scrollToSection = (tabName: string) => {
    setActiveTab(tabName);
    const element = document.getElementById(tabName.toLowerCase());
    if (element) {
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img
          src={tripData.image}
          alt={tripData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-custom">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground"
            >
              {tripData.name}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="flex-1 lg:max-w-3xl">
            {/* About Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-display font-bold mb-4">
                About {tripData.name.split(" ").slice(0, -2).join(" ")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {tripData.description}
              </p>
            </section>

            {/* Sticky Tabs */}
            <div className={cn(
              "bg-background py-4 mb-8 border-b border-border",
              isSticky && "sticky top-20 z-40"
            )}>
              <div className="flex flex-wrap gap-3">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => scrollToSection(tab)}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-sm font-medium border transition-all",
                      activeTab === tab
                        ? "bg-foreground text-background border-foreground"
                        : "border-border hover:border-foreground"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Itinerary Section */}
            <section id="itinerary" className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">
                  Itinerary Breakdown
                </h2>
                <Button variant="default" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Itinerary
                </Button>
              </div>

              <div className="space-y-4">
                {tripData.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="bg-emerald-light rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleDay(day.day)}
                      className="w-full flex items-center gap-4 p-5 text-left"
                    >
                      <span className="shrink-0 px-3 py-1 bg-background rounded-full text-sm font-medium">
                        Day {day.day}
                      </span>
                      <span className="flex-1 font-semibold">{day.title}</span>
                      {expandedDays.includes(day.day) ? (
                        <ChevronUp className="w-5 h-5 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 shrink-0" />
                      )}
                    </button>
                    {expandedDays.includes(day.day) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="px-5 pb-5"
                      >
                        <ul className="list-disc list-inside space-y-2 pl-16 text-muted-foreground">
                          {day.highlights.map((point, index) => (
                            <li key={index} className="leading-relaxed">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions Section */}
            <section id="inclusions" className="mb-12">
              <h2 className="text-2xl font-display font-bold mb-6">
                What's Included
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-primary flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Included
                  </h3>
                  <ul className="space-y-3">
                    {tripData.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-destructive flex items-center gap-2">
                    <X className="w-5 h-5" />
                    Not Included
                  </h3>
                  <ul className="space-y-3">
                    {tripData.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <X className="w-4 h-4 text-destructive shrink-0 mt-1" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Costing Section */}
            <section id="costing" className="mb-12">
              <h2 className="text-2xl font-display font-bold mb-6">
                Pricing Details
              </h2>
              <div className="bg-muted rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold">Sharing Mode</th>
                      <th className="text-right p-4 font-semibold">Price per Person</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-4">Double Sharing</td>
                      <td className="p-4 text-right">
                        <span className="text-xl font-bold">₹{tripData.price.toLocaleString()}</span>
                        <span className="ml-2 price-original">₹{tripData.originalPrice.toLocaleString()}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4">Triple Sharing</td>
                      <td className="p-4 text-right">
                        <span className="text-xl font-bold">₹{(tripData.price - 3000).toLocaleString()}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4">Single Room Supplement</td>
                      <td className="p-4 text-right">
                        <span className="text-xl font-bold">+₹15,000</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Notes Section */}
            <section id="notes" className="mb-12">
              <h2 className="text-2xl font-display font-bold mb-6">
                Important Notes
              </h2>
              <ul className="space-y-3">
                {tripData.notes.map((note, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{note}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Sticky Booking Card */}
          <div className="lg:w-96">
            <div className="lg:sticky lg:top-24">
              <div className="bg-card rounded-2xl border border-border shadow-lg p-6">
                {/* Price */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Trip Starts From</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">₹{selectedDate.price.toLocaleString()}</span>
                    <span className="price-original">₹{tripData.originalPrice.toLocaleString()}</span>
                  </div>
                  <span className="price-discount">₹{tripData.discount.toLocaleString()} Off</span>
                  <p className="text-sm text-muted-foreground mt-1">Per Person</p>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium">Trip Dates</span>
                  </div>
                  <div className="space-y-2">
                    {tripData.dates.map((date, index) => (
                      <label
                        key={index}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all",
                          selectedDate.date === date.date
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="tripDate"
                            checked={selectedDate.date === date.date}
                            onChange={() => setSelectedDate(date)}
                            className="w-4 h-4 text-primary"
                          />
                          <span>{date.date}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ₹{date.price.toLocaleString()}/Person
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Traveler Count */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-medium">No. of Travellers</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <button
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-border transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-semibold">{travelers}</span>
                    <button
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-border transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="py-4 border-t border-border mb-6">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total Amount</span>
                    <span className="text-2xl font-bold">
                      ₹{(selectedDate.price * travelers).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Book Now */}
                <Button className="w-full h-12 text-base mb-4">
                  Book Now
                </Button>

                {/* WhatsApp */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span>Any Doubt?</span>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
