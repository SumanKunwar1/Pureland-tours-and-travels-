// src/pages/DalaiLamaDarshan.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingFormModal } from "@/components/shared/BookingFormModal";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Heart,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Random images for variety
const randomImages = [
  "https://images.unsplash.com/photo-1578841387282-5a150ad16e93?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1516685038896-40e7371a4a4f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1579154204601-01d82976d5dc?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1580832261868-6f1b4fdf0c62?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1516737713241-dac347a21d42?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
];

const availableDates = [
  { id: 1, label: "Jan 7 - 16, 2025", month: "January", spots: 15 },
  { id: 2, label: "Feb 14 - 23, 2025", month: "February", spots: 18 },
  { id: 3, label: "Mar 7 - 16, 2025", month: "March", spots: 12 },
  { id: 4, label: "Mar 21 - 30, 2025", month: "March", spots: 16 },
  { id: 5, label: "Apr 11 - 20, 2025", month: "April", spots: 20 },
  { id: 6, label: "May 2 - 11, 2025", month: "May", spots: 14 },
];

const itineraryDays = [
  {
    day: 1,
    date: "Day 1",
    title: "Kathmandu → Bangalore → Bylakuppe",
    activities: [
      "Departure from Tribhuvan International Airport",
      "Arrival at Bangalore Airport",
      "Drive to Bylakuppe via scenic Western Ghats",
      "Visit Namdroling Monastery - Golden Temple",
    ],
  },
  {
    day: 2,
    date: "Day 2",
    title: "Namdroling & Sera Monastery",
    activities: [
      "Ngagyur Nyingma Institute",
      "Nyingma Retreat Center",
      "Visit Sera Monastery (Sera Je & Sera Mey)",
      "Experience meditation sessions",
    ],
  },
  {
    day: 3,
    date: "Day 3",
    title: "Mundgod - Preparation",
    activities: [
      "Drive to Mundgod",
      "Briefing session for H.H. audience",
      "Visit Gaden Jangtse Monastery",
      "Visit Gaden Shartse Monastery",
    ],
  },
  {
    day: 4,
    date: "Day 4",
    title: "✨ BLESSED AUDIENCE WITH H.H. DALAI LAMA",
    activities: [
      "Receive teachings and blessings from His Holiness",
      "Group photo opportunity (if permitted)",
      "Blessed moments of spiritual presence",
      "Evening meditation",
    ],
    highlighted: true,
  },
];

const inclusions = [
  "Round-trip Flights (Kathmandu-Bangalore-Delhi-Kathmandu)",
  "AC Vehicles for ground transportation",
  "Accommodation (hotels & monastery guest houses)",
  "All meals - Pure Vegetarian",
  "H.H. Dalai Lama audience arrangements",
  "Monastery entrance fees",
  "Expert guides & trip captains",
  "All permits & taxes",
];

export default function DalaiLamaDarshanPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const [travelers, setTravelers] = useState(1);

  // Fixed trip data - matches your booking system requirements
  const tripId = "dalai-lama-darshan-2025";
  const tripName = "His Holiness the 14th Dalai Lama - Darshan Pilgrimage";
  const pricePerPerson = 100000;
  const totalPrice = pricePerPerson * travelers;

  const getRandomImage = (index: number) => {
    return randomImages[index % randomImages.length];
  };

  const handleBookNow = () => {
    // This will open the modal with properly formatted data
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section with Image */}
        <section className="relative pt-20 pb-0 overflow-hidden">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 mb-8"
            >
              <div className="inline-block">
                <span className="text-sm font-semibold text-primary">
                  🙏 EXCLUSIVE PILGRIMAGE
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                His Holiness the 14th Dalai Lama
                <br />
                <span className="text-primary">Darshan Pilgrimage</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-3xl">
                Experience a transformative 9-day spiritual journey. Receive
                blessings directly from His Holiness the 14th Dalai Lama,
                visit sacred monasteries, and experience inner transformation.
              </p>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative h-96 md:h-[480px] w-full overflow-hidden"
          >
            <img
              src={getRandomImage(0)}
              alt="His Holiness the Dalai Lama"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-8 pt-16">
              <p className="text-white text-sm font-semibold">
                A sacred journey to spiritual enlightenment
              </p>
            </div>
          </motion.div>
        </section>

        {/* Main Content Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Main Content - Left */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Facts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {[
                    { label: "Duration", value: "9 Days" },
                    { label: "Blessed Audience", value: "Day 4" },
                    { label: "Monasteries", value: "8 Sites" },
                    { label: "Group Type", value: "Limited" },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.label}
                      </p>
                      <p className="font-bold text-foreground">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </motion.div>

                {/* Itinerary Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    9-Day Journey Overview
                  </h2>

                  <div className="space-y-3">
                    {itineraryDays.map((day, index) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-lg p-4 border-l-4 transition-all ${
                          day.highlighted
                            ? "bg-primary/15 border-l-primary"
                            : "bg-white border-l-secondary"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-foreground">
                            {day.title}
                          </h3>
                          {day.highlighted && (
                            <span className="text-xs font-bold text-primary">
                              ✨ SPECIAL
                            </span>
                          )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-2">
                          {day.activities.map((activity, idx) => (
                            <div key={idx} className="flex gap-2">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">
                                {activity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-6">
                    View Full 9-Day Itinerary
                  </Button>
                </motion.div>

                {/* Image Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    Journey Highlights
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {randomImages.slice(0, 6).map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="relative h-40 rounded-lg overflow-hidden group"
                      >
                        <img
                          src={img}
                          alt={`Journey highlight ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Inclusions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    What's Included
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    {inclusions.map((item, idx) => (
                      <div key={idx} className="flex gap-3 p-3 bg-white rounded-lg">
                        <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* BOOKING CARD - Right (Sticky) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:sticky lg:top-24 space-y-6"
              >
                {/* Price Card */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-primary/20 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
                    <p className="text-sm font-semibold opacity-90 mb-2">
                      Per Person Price
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">
                        ₹{pricePerPerson.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs opacity-75 mt-2">
                      Including all flights, accommodation & meals
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    {/* Date Selection */}
                    <div className="space-y-3">
                      <label className="block font-semibold text-foreground">
                        🗓️ Select Your Date
                      </label>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {availableDates.map((date) => (
                          <motion.button
                            key={date.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedDate(date)}
                            className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                              selectedDate.id === date.id
                                ? "border-primary bg-primary/10"
                                : "border-border bg-white hover:border-primary/50"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold text-foreground">
                                  {date.label}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {date.spots} spots left
                                </p>
                              </div>
                              {selectedDate.id === date.id && (
                                <span className="text-primary font-bold">✓</span>
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Traveler Count */}
                    <div className="space-y-3">
                      <label className="block font-semibold text-foreground">
                        👥 Number of Travelers
                      </label>
                      <div className="flex items-center gap-3 bg-secondary rounded-lg p-3">
                        <button
                          onClick={() =>
                            setTravelers(Math.max(1, travelers - 1))
                          }
                          className="w-10 h-10 rounded-lg bg-white border border-border hover:bg-muted transition-colors flex items-center justify-center font-bold"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center font-bold text-lg text-foreground">
                          {travelers}
                        </span>
                        <button
                          onClick={() =>
                            setTravelers(Math.min(10, travelers + 1))
                          }
                          className="w-10 h-10 rounded-lg bg-white border border-border hover:bg-muted transition-colors flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="bg-secondary rounded-lg p-4 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">
                        Total Amount
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        ₹{totalPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {travelers} × ₹{pricePerPerson.toLocaleString()}
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2 bg-primary/10 rounded-lg p-4">
                      <div className="flex gap-2">
                        <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-foreground font-semibold">
                          20% Down Payment to Secure Spot
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-foreground font-semibold">
                          Zero-Cost EMI Available
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-foreground font-semibold">
                          Free Cancellation on Groups
                        </span>
                      </div>
                    </div>

                    {/* CTA BUTTONS */}
                    <div className="space-y-3 pt-4 border-t border-border">
                      <Button
                        size="lg"
                        onClick={handleBookNow}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg py-6"
                      >
                        🎉 BOOK NOW
                      </Button>

                      <a
                        href={`https://wa.me/919876543210?text=Hi!%20I%27m%20interested%20in%20the%20Dalai%20Lama%20Darshan%20pilgrimage%20for%20${selectedDate.label}.%20Total%20travelers:%20${travelers},%20Amount:%20₹${totalPrice.toLocaleString()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full font-bold border-2"
                        >
                          💬 Chat Now
                        </Button>
                      </a>
                    </div>

                    {/* Trust Badge */}
                    <div className="pt-4 border-t border-border text-center">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-primary">✓</span> Secure
                        Booking • <span className="font-semibold text-primary">✓</span> 24/7 Support
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/30 space-y-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Selected Details
                  </h3>
                  <div className="text-sm space-y-1">
                    <p className="text-foreground">
                      <strong>Date:</strong> {selectedDate.label}
                    </p>
                    <p className="text-foreground">
                      <strong>Travelers:</strong> {travelers} person
                      {travelers !== 1 ? "s" : ""}
                    </p>
                    <p className="text-foreground">
                      <strong>Total:</strong>{" "}
                      <span className="font-bold text-primary">
                        ₹{totalPrice.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why This Journey */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                Why This Pilgrimage?
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Direct Blessing",
                    desc: "Receive teachings from His Holiness the 14th Dalai Lama",
                  },
                  {
                    title: "Sacred Monasteries",
                    desc: "Visit 8 ancient Buddhist temples and spiritual sites",
                  },
                  {
                    title: "Expert Guides",
                    desc: "Trained spiritual guides with 24/7 support",
                  },
                  {
                    title: "Pure Vegetarian",
                    desc: "All meals included - traditional pure vegetarian food",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-secondary rounded-lg p-6"
                  >
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Booking Modal - Using the standard component */}
      <BookingFormModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        tripName={tripName}
        tripId={tripId}
        travelers={travelers}
        selectedDate={selectedDate.label}
        selectedPrice={pricePerPerson}
        totalAmount={totalPrice}
      />

      <Footer />
      <WhatsAppButton />
    </div>
  );
}