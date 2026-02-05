import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import {
  Users,
  Award,
  MapPin,
  Heart,
  Target,
  Eye,
  Compass,
  Sparkles,
  Mountain,
  Plane,
  Building2,
  Globe2,
  HeartHandshake,
  Flower2,
  Moon,
  Sun,
  Wind,
  TreePine,
  Waves,
  Star,
  Shield,
  MessageCircle,
  Mail,
  Phone,
  CheckCircle2,
  Hotel,
  Car,
} from "lucide-react";

// You can replace these with your actual image URLs
const images = {
  hero: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop",
  nepal: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
  europe: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop",
  tibet: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop",
  bhutan: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop",
  spiritual: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=600&fit=crop",
  himalaya: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
};

const stats = [
  { label: "Years of Experience", value: "10+", icon: Award },
  { label: "Tour Packages", value: "100+", icon: Plane },
  { label: "Destinations", value: "50+", icon: Globe2 },
  { label: "Happy Travelers", value: "5000+", icon: Heart },
];

const services = [
  {
    title: "Inbound & Outbound Tours",
    icon: Globe2,
    description:
      "Discover the best of Nepal, Tibet, Bhutan, India, Europe, Asia, and beyond with our expertly curated tour packages.",
    image: images.nepal,
  },
  {
    title: "Air Ticket Booking",
    icon: Plane,
    description:
      "Get the best deals on domestic and international flight tickets with our reliable booking services.",
    image: images.europe,
  },
  {
    title: "Hotel Reservations",
    icon: Hotel,
    description:
      "From luxury hotels to comfortable accommodations, we arrange the perfect stay for your journey.",
    image: images.bhutan,
  },
  {
    title: "Car & Coach Bookings",
    icon: Car,
    description:
      "Professional transportation services including car rentals and coach bookings for group travel.",
    image: images.tibet,
  },
];

const destinations = [
  { icon: Mountain, text: "Nepal Tours" },
  { icon: Globe2, text: "Europe Packages" },
  { icon: Flower2, text: "Tibet Expeditions" },
  { icon: Sparkles, text: "Bhutan Journeys" },
  { icon: Sun, text: "India Tours" },
  { icon: Plane, text: "China Trips" },
  { icon: MapPin, text: "Canada & USA" },
  { icon: TreePine, text: "Cambodia & Thailand" },
];

const tourTypes = [
  { icon: Heart, text: "Romantic Holidays" },
  { icon: Mountain, text: "Adventure Tours" },
  { icon: Sparkles, text: "Wildlife Tours" },
  { icon: Waves, text: "Beach Holidays" },
  { icon: Flower2, text: "Pilgrimage Tours" },
  { icon: Building2, text: "Heritage & Culture" },
];

const whyChooseUs = [
  "Considerable experience in the travel industry",
  "Best deals on tours and travel packages",
  "Reliable air ticketing services",
  "Professional hotel reservation support",
  "Expert car and coach booking assistance",
  "Comprehensive visa support services",
  "Tailored packages for unique travel needs",
  "Dedicated team for customer satisfaction",
];

const coreValues = [
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description: "Fully dedicated to satisfying every client's heart with exceptional service.",
  },
  {
    icon: Shield,
    title: "Reliability & Trust",
    description: "Building a reputation for providing extraordinary travel experiences.",
  },
  {
    icon: Sparkles,
    title: "Expertise & Knowledge",
    description: "Wealth of knowledge bringing you the best destinations across the globe.",
  },
  {
    icon: Target,
    title: "Customization",
    description: "Every journey is unique - we offer tailored packages for your specific needs.",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={images.hero}
              alt="Pure Land Tours & Travels"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
          </div>

          {/* Content */}
          <div className="container-custom relative z-10 text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground mb-4">
                <Globe2 className="w-4 h-4" />
                <span className="text-sm font-medium">Your Trusted Travel Partner</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
                Pure Land Tours
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                  & Travels Pvt. Ltd.
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light">
                Luxury • Comfort • Adventure • Unforgettable Experiences
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Kathmandu, Nepal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  <span>Worldwide Travel Services</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center gap-2 text-white/60"
            >
              <span className="text-xs uppercase tracking-wider">Scroll</span>
              <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                <div className="w-1 h-3 rounded-full bg-white/60" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-4xl font-display font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Welcome to Pure Land Tours & Travels
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    A reliable travel service provider in Nepal! With considerable experience in the industry, our team delivers the best travel services and customer satisfaction.
                  </p>
                  <p>
                    We offer the best deals on inbound and outbound tours, air tickets, car/coach bookings, and hotel reservations, and also provide reliable support for visas.
                  </p>
                  <p>
                    Discover a world of luxury, comfort, and adventure with Pure Land Tours & Travels! We aim to build a reputation for providing extraordinary travel experiences tailored to your needs.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Core Values */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Our Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive travel solutions for all your journey needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Destinations We Cover */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Destinations We Cover
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Bringing you the best of Nepal, Europe, Tibet, Bhutan, India, China, Canada, USA, Cambodia, Thailand, and more
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {destinations.map((dest, index) => (
                <motion.div
                  key={dest.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-md transition-all duration-300"
                >
                  <div className="p-3 rounded-full bg-primary/10">
                    <dest.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-center">{dest.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tour Types */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Perfect Trip for Every Traveler
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                All packages are customizable to meet your unique needs, preferences, and budget
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              {tourTypes.map((type, index) => (
                <motion.div
                  key={type.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <type.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-center">{type.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Why Choose Pure Land Tours & Travels?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Your trusted partner for unforgettable travel experiences
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {whyChooseUs.map((reason, index) => (
                <motion.div
                  key={reason}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                  <div className="relative bg-card border border-border p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 mt-1">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <p className="font-medium leading-relaxed">{reason}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                At Pure Land Tours & Travels, we are fully dedicated to satisfying every client's heart. We are proud of our services and hold expertise in creating unforgettable experiences for our clients. Our team is always ready to welcome and delight each client, passionate about providing unmatched products and services.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We can help you plan your dream trip perfectly and ensure you get the most out of your journey. Whether you want a romantic holiday, an adventure tour, a wildlife tour, a beach holiday, a pilgrimage tour, or a heritage or culture tour, we have the perfect trip plan tailored to your needs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section-padding bg-gradient-to-br from-primary/20 via-accent/10 to-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Let us help you plan your dream trip with our expert guidance
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                <motion.a
                  href="tel:+9779863593271"
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-4 rounded-full bg-primary/10">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Call Us</p>
                    <p className="font-semibold">(+977) 986-3593271</p>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:info@purelandtours.com"
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-4 rounded-full bg-primary/10">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email Us</p>
                    <p className="font-semibold text-sm">info@purelandtours.com</p>
                  </div>
                </motion.a>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-4 rounded-full bg-primary/10">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Visit Us</p>
                    <p className="font-semibold text-sm">Kathmandu, Nepal</p>
                  </div>
                </motion.a>
              </div>

              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <p>Trinity Tower, Maharajgunj, Kathmandu, Nepal</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}