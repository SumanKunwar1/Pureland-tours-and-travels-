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
} from "lucide-react";

// You can replace these with your actual image URLs
const images = {
  hero: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop",
  buddhist: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop",
  hindu: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
  meditation: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
  nature: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
  spiritual: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=600&fit=crop",
  himalaya: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop",
};

const stats = [
  { label: "Years of Experience", value: "2+", icon: Award },
  { label: "Pilgrimage Tours", value: "70+", icon: Flower2 },
  { label: "Spiritual Programs", value: "10+", icon: Sparkles },
  { label: "Happy Pilgrims", value: "1400+", icon: Heart },
];

const services = [
  {
    title: "Buddhist Pilgrimage Tours",
    icon: Flower2,
    description:
      "Sacred journeys to enlightenment sites including Bodh Gaya, Sarnath, Lumbini, and other holy Buddhist destinations.",
    image: images.buddhist,
  },
  {
    title: "Hindu Pilgrimage Tours",
    icon: Sun,
    description:
      "Customized spiritual tours to temples, ghats, and sacred Hindu pilgrimage sites across India and neighboring countries.",
    image: images.hindu,
  },
  {
    title: "Meditation & Retreats",
    icon: Moon,
    description:
      "Ngyungne retreats, meditation programs, and spiritual healing journeys for inner peace and transformation.",
    image: images.meditation,
  },
  {
    title: "Ticketing & Reservations",
    icon: Plane,
    description:
      "Professional flight, train, hotel bookings and visa support for domestic and international travel.",
    image: images.nature,
  },
];

const spiritualActivities = [
  { icon: Moon, text: "Meditation Programs" },
  { icon: Sparkles, text: "Ngyungne & Nyungne Retreats" },
  { icon: Flower2, text: "Puja & Religious Ceremonies" },
  { icon: Wind, text: "Chanting & Prayer Programs" },
  { icon: HeartHandshake, text: "Food & Robe Offerings" },
  { icon: Heart, text: "Animal Feeding & Compassion" },
  { icon: TreePine, text: "Short-term Monastic Experience" },
];

const healingServices = [
  { icon: Sparkles, text: "Meditation-based Mental Healing" },
  { icon: Heart, text: "Stress & Anxiety Support" },
  { icon: Waves, text: "Aura & Energy Healing" },
  { icon: Shield, text: "Ritual Cleansing & Protection" },
  { icon: Flower2, text: "Yoga & Mindfulness Retreats" },
];

const whyChooseUs = [
  "Specialized in Buddhist & Hindu pilgrimage tourism",
  "Strong spiritual and cultural foundation",
  "Experienced in religious event travel management",
  "Trusted ticketing & reservation services",
  "Strategic location in Siliguri - Himalayan gateway",
  "Ethical, transparent, and compassionate service",
];

const bookingServices = [
  "Domestic & International Flight Ticketing",
  "India Railway Ticket Booking",
  "International Train Ticketing",
  "Hotel & Resort Reservations",
  "Guest House & Monastery Accommodation",
  "Group Bookings & Special Fare Assistance",
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
              alt="Padmasambhava Trip"
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
                <Flower2 className="w-4 h-4" />
                <span className="text-sm font-medium">Sacred Journeys Since 2016</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
                Padma Sambhava
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                  Trip Pvt. Ltd.
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light">
                Sacred Journeys • Pilgrimage • Spiritual Travel • Global Ticketing
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Siliguri, West Bengal, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  <span>Inbound & Outbound Tours</span>
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

        {/* About Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">About Us</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Gateway to Spiritual Transformation
                </h2>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Padma Sambhava Trip Pvt. Ltd.</strong> is a
                    professionally managed travel and tour company based in Siliguri, West Bengal,
                    the gateway to the Eastern Himalayas. We specialize in Buddhist and Hindu
                    pilgrimage tours, spiritual travel, and religious activity-based journeys.
                  </p>
                  <p>
                    Inspired by the enlightened legacy of Guru Padma Sambhava, our mission is to
                    offer journeys that combine faith, culture, peace, and professional travel
                    management. We proudly serve pilgrims, spiritual seekers, tourists,
                    institutions, and organizations from India and around the world.
                  </p>
                  <p>
                    We believe travel is more than movement—it is <strong>transformation</strong>.
                    Our journeys strengthen faith, promote peace and compassion, support mental and
                    spiritual well-being, and preserve religious and cultural heritage.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={images.spiritual}
                    alt="Spiritual Journey"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-xl max-w-xs"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Flower2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Our Philosophy</h3>
                      <p className="text-sm text-muted-foreground">
                        Faith, Culture, Peace, and Professional Excellence
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-muted/10">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-card border border-border mb-4 group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Our Vision & Philosophy
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We believe travel is more than movement—it is <strong>transformation</strong>
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-card border border-border p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">Our Mission</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Strengthen faith and devotion</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Promote peace, compassion, and harmony</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Support mental, emotional, and spiritual well-being</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Preserve religious and cultural heritage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Deliver safe, ethical, and responsible tourism</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-card border border-border p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6">
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    To become the most trusted name in spiritual and adventure travel, known for
                    our authentic experiences, exceptional service, and commitment to sustainable
                    tourism practices.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Authentic spiritual experiences</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Exceptional service quality</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Sustainable tourism commitment</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Compass className="w-4 h-4" />
                <span className="text-sm font-medium">Our Services</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Comprehensive Travel Solutions
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From pilgrimage tours to complete travel management
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary transition-all duration-300 h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Spiritual Activities */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <Flower2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Spiritual Programs</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Religious & Spiritual Activities
                </h2>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  We are well known for managing spiritual and religious programs alongside travel,
                  creating holistic experiences that nourish the soul.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {spiritualActivities.map((activity, index) => (
                    <motion.div
                      key={activity.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all duration-300"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <activity.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{activity.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src={images.meditation}
                  alt="Meditation"
                  className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Healing & Wellness */}
        <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <img
                  src={images.nature}
                  alt="Healing & Wellness"
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Wellness Programs</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Healing & Wellness Journeys
                </h2>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Spiritually rooted healing and wellness programs for those seeking balance beyond
                  conventional approaches.
                </p>

                <div className="space-y-4">
                  {healingServices.map((service, index) => (
                    <motion.div
                      key={service.text}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all duration-300"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 mt-1">
                        <service.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{service.text}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ticketing Services */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Plane className="w-4 h-4" />
                <span className="text-sm font-medium">Travel Services</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Professional Ticketing & Booking
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Trusted for professional ticketing and reservation services worldwide
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {bookingServices.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{service}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We ensure <strong className="text-foreground">competitive pricing</strong>,{" "}
                <strong className="text-foreground">reliable service</strong>, and{" "}
                <strong className="text-foreground">timely support</strong> for individuals,
                families, and large groups.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-gradient-to-br from-primary/10 via-accent/5 to-muted/10">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Why Choose Padma Sambhava Trip?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Your trusted partner for spiritual and cultural journeys
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

        {/* Location Advantage */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">Strategic Location</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Gateway to the Himalayas
                </h2>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Siliguri, West Bengal serves as the perfect hub for cross-border pilgrimage and
                  spiritual travel, connecting you to:
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                    <Mountain className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Sikkim, Bhutan & Nepal</h4>
                      <p className="text-sm text-muted-foreground">
                        Direct access to neighboring spiritual destinations
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                    <TreePine className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Darjeeling & Eastern Himalayas</h4>
                      <p className="text-sm text-muted-foreground">
                        Scenic mountain destinations and monasteries
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                    <Flower2 className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Major Buddhist Circuits</h4>
                      <p className="text-sm text-muted-foreground">
                        Connected to sacred pilgrimage routes across India
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src={images.himalaya}
                  alt="Himalayan Gateway"
                  className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
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
                Ready to Begin Your Sacred Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Let us guide you on a transformative pilgrimage that nourishes your soul
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                <motion.a
                  href="tel: +917363933945 / +917501610109 "
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-4 rounded-full bg-primary/10">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Call / WhatsApp</p>
                    <p className="font-semibold"> +917363933945</p>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:info@padmasambhavatrip.com"
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-4 rounded-full bg-primary/10">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email Us</p>
                    <p className="font-semibold text-sm">info@padmasambhavatrip.com</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://www.padmasambhavatrip.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-4 rounded-full bg-primary/10">
                    <Globe2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Visit Website</p>
                    <p className="font-semibold text-sm">padmasambhavatrip.com</p>
                  </div>
                </motion.a>
              </div>

              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <p>Siliguri, West Bengal, India - Gateway to the Eastern Himalayas</p>
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