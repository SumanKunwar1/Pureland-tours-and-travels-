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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const itineraryDays = [
  {
    day: 1,
    date: "Jan 7",
    title: "Kathmandu → Bangalore → Bylakuppe",
    activities: [
      "Departure from Tribhuvan International Airport",
      "Arrival at Bangalore Airport",
      "Drive to Bylakuppe via scenic Western Ghats",
      "Visit Namdroling Monastery - Golden Temple",
      "Explore Tibetan settlement",
    ],
    overnight: "Bylakuppe",
  },
  {
    day: 2,
    date: "Jan 8",
    title: "Namdroling & Sera Monastery",
    activities: [
      "Ngagyur Nyingma Institute",
      "Nyingma Retreat Center",
      "Visit Sera Monastery (Sera Je & Sera Mey)",
      "Experience meditation sessions",
    ],
    overnight: "Bylakuppe",
  },
  {
    day: 3,
    date: "Jan 9",
    title: "Mundgod - Preparation for Audience",
    activities: [
      "Drive to Mundgod",
      "Briefing session for H.H. audience",
      "Visit Gaden Jangtse Monastery",
      "Visit Gaden Shartse Monastery",
      "Visit Drepung Gomang & Drepung Loseling",
    ],
    overnight: "Mundgod",
  },
  {
    day: 4,
    date: "Jan 10",
    title: "✨ SPECIAL AUDIENCE WITH H.H. DALAI LAMA",
    activities: [
      "Receive teachings and blessings from His Holiness",
      "Group photo opportunity (if permitted)",
      "Blessed moments of spiritual presence",
      "Evening meditation and gratitude",
    ],
    overnight: "Mundgod",
    highlighted: true,
  },
  {
    day: 5,
    date: "Jan 11",
    title: "Bylakuppe → Bangalore → Delhi",
    activities: [
      "Early morning drive to Bangalore",
      "Flight Bangalore to Delhi",
      "Transfer to hotel",
      "Evening rest and reflection",
    ],
    overnight: "Delhi",
  },
  {
    day: 6,
    date: "Jan 12",
    title: "Delhi → Tsopema (Rewalsar Lake)",
    activities: [
      "Drive to sacred Tsopema (Rewalsar Lake)",
      "Visit Guru Rinpoche Cave",
      "Evening Kora around the holy lake",
      "Spiritual meditation by the lake",
    ],
    overnight: "Rewalsar",
  },
  {
    day: 7,
    date: "Jan 13",
    title: "Tsopema - Deep Spiritual Immersion",
    activities: [
      "Visit Tso-Pema Monasteries",
      "Explore Padmasambhava Statue Viewpoint",
      "Evening Kora and prayers",
      "Sunset meditation",
    ],
    overnight: "Rewalsar",
  },
  {
    day: 8,
    date: "Jan 15",
    title: "Tsopema → Amritsar (Golden Temple)",
    activities: [
      "Drive to Amritsar",
      "Visit Sri Harmandir Sahib (Golden Temple)",
      "Langar Seva experience",
      "Optional: Wagah Border Flag Ceremony",
    ],
    overnight: "Amritsar",
  },
  {
    day: 9,
    date: "Jan 16",
    title: "Amritsar → Delhi → Kathmandu",
    activities: [
      "Early morning Golden Temple visit",
      "Drive to Delhi Airport",
      "Flight Delhi → Kathmandu",
      "Tour ends with blessings",
    ],
    overnight: "Home",
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

const exclusions = [
  "Personal expenses (shopping, tips)",
  "Travel insurance (recommended)",
  "Weather-related costs",
  "Donations to monasteries",
];

export default function DalaiLamaDarshanPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section with Large Image */}
        <section className="relative pt-20 pb-8 md:pb-12">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="inline-block">
                <span className="text-sm font-semibold text-primary">
                  EXCLUSIVE PILGRIMAGE
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                His Holiness the 14th Dalai Lama
                <br />
                <span className="text-primary">Darshan Pilgrimage</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl">
                A transformative 9-day spiritual journey across South India and
                North, culminating in a blessed direct audience with His
                Holiness the 14th Dalai Lama.
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Jan 7-16, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-semibold">9 Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Limited Group</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <div className="relative h-96 md:h-[500px] w-full overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1578841387282-5a150ad16e93?w=1200&h=600&fit=crop"
                alt="His Holiness the Dalai Lama"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* Quick Facts Section */}
        <section className="py-8 bg-secondary/50">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Blessed Audience", value: "Day 4 - Mundgod" },
                { label: "Monasteries", value: "8 Sacred Sites" },
                { label: "Meals", value: "Pure Vegetarian" },
                { label: "Group Size", value: "Limited Only" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-lg p-4 text-center"
                >
                  <p className="text-xs text-muted-foreground mb-1">
                    {item.label}
                  </p>
                  <p className="font-semibold text-foreground text-sm">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-display font-bold text-foreground">
                Journey Highlights
              </h2>
            </motion.div>

            {/* Image Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  img: "https://images.unsplash.com/photo-1580832261868-6f1b4fdf0c62?w=500&h=350&fit=crop",
                  title: "Blessed Audience",
                  desc: "Receive teachings from His Holiness",
                },
                {
                  img: "https://images.unsplash.com/photo-1578841387282-5a150ad16e93?w=500&h=350&fit=crop",
                  title: "Sacred Monasteries",
                  desc: "Visit ancient Buddhist temples",
                },
                {
                  img: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=500&h=350&fit=crop",
                  title: "Spiritual Journey",
                  desc: "Experience inner transformation",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative rounded-lg overflow-hidden h-64 cursor-pointer"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Day-wise Itinerary */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container-custom">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-bold text-foreground mb-8"
            >
              Your 9-Day Itinerary
            </motion.h2>

            <div className="space-y-4">
              {itineraryDays.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-lg p-4 md:p-6 transition-all ${
                    day.highlighted
                      ? "bg-primary/20 border-2 border-primary"
                      : "bg-white border border-border"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div className="flex gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                          day.highlighted
                            ? "bg-primary text-white"
                            : "bg-secondary text-primary"
                        }`}
                      >
                        {day.day}
                      </div>
                      <div>
                        <p
                          className={`text-xs font-semibold ${
                            day.highlighted
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {day.date}
                        </p>
                        <h3 className="font-semibold text-foreground">
                          {day.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-foreground whitespace-nowrap">
                      Stay: {day.overnight}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-2 md:ml-16">
                    {day.activities.map((activity, idx) => (
                      <div key={idx} className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">
                          {activity}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Inclusions & Exclusions */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Inclusions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  What's Included
                </h3>
                <div className="space-y-3">
                  {inclusions.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-3"
                    >
                      <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Exclusions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                  Not Included
                </h3>
                <div className="space-y-3">
                  {exclusions.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-3"
                    >
                      <span className="text-2xl">○</span>
                      <span className="text-muted-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why This Journey */}
        <section className="py-12 md:py-16 bg-secondary/50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-display font-bold text-foreground">
                Why Choose This Pilgrimage?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Direct Blessing",
                  desc: "Receive teachings directly from His Holiness the 14th Dalai Lama",
                },
                {
                  title: "Sacred Sites",
                  desc: "Visit 8 monasteries and ancient Buddhist pilgrimage destinations",
                },
                {
                  title: "Expert Guidance",
                  desc: "Trained spiritual guides and 24/7 support throughout your journey",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-lg p-6 text-center"
                >
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-secondary rounded-lg p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                Limited Spots Available
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                This is a rare opportunity to receive blessings from His
                Holiness. Secure your place now.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Book Your Spot
                </Button>
                <a
                  href="https://wa.me/919876543210?text=Hi!%20I%27m%20interested%20in%20the%20Dalai%20Lama%20Darshan%20pilgrimage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline">
                    Contact via WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      <BookingFormModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        tripName="His Holiness the 14th Dalai Lama - Darshan Pilgrimage"
        tripId="dalai-lama-darshan-2025"
        selectedDate="Jan 7-16, 2025"
      />

      <Footer />
      <WhatsAppButton />
    </div>
  );
}