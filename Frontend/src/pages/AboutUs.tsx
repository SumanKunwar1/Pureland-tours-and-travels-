import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Building2,
  Bus,
  CalendarDays,
  Check,
  ClipboardList,
  Clapperboard,
  Compass,
  Crown,
  Eye,
  FileText,
  Flower2,
  Footprints,
  Gift,
  Globe2,
  GraduationCap,
  HandHeart,
  Heart,
  HeartHandshake,
  Hotel,
  Landmark,
  Leaf,
  Luggage,
  Mail,
  Map,
  MapPin,
  MessageCircle,
  Mountain,
  PartyPopper,
  PawPrint,
  Phone,
  Plane,
  ScrollText,
  ShieldCheck,
  Ship,
  Smile,
  Sparkles,
  Stamp,
  Sun,
  Target,
  Ticket,
  Trees,
  Tv,
  Umbrella,
  Users,
  Waves,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Button } from "@/components/ui/button";

import heroPilgrimage from "@/assets/hero-pilgrimage.jpg";
import destBhutan from "@/assets/dest-bhutan.jpg";
import destLadakh from "@/assets/dest-ladakh.jpg";
import destSpiti from "@/assets/dest-spiti.jpg";
import destBali from "@/assets/dest-bali.jpg";

interface IconItem {
  icon: LucideIcon;
  text: string;
  note?: string;
}

const taglines = [
  "Buddhist Pilgrimage",
  "Spiritual Journeys",
  "Dharma Holidays",
  "Worldwide Travel",
];

const stats = [
  { value: "23+", label: "Years Experience", icon: Award },
  { value: "700+", label: "Tour Packages", icon: Luggage },
  { value: "50+", label: "Destinations", icon: Globe2 },
  { value: "5,000+", label: "Happy Travelers", icon: Smile },
  { value: "25+", label: "Countries", icon: Map },
];

const travelStyles = [
  "Pilgrimage",
  "Spiritual",
  "Retreat",
  "Cultural",
  "Luxury",
  "Adventure",
  "Leisure",
];

const initiatives = [
  { icon: GraduationCap, text: "Free education" },
  { icon: BookOpen, text: "Monastic education" },
  { icon: Flower2, text: "International Ngyungne Retreats" },
  { icon: Sun, text: "Weekly meditation retreats" },
];

const specialities: IconItem[] = [
  { icon: Flower2, text: "Pilgrimage Tours" },
  { icon: Mountain, text: "Sacred Himalayan Destinations" },
  { icon: Sun, text: "Retreat & Meditation Journeys" },
  {
    icon: ScrollText,
    text: "Lung • Tri • Wang",
    note: "Transmission • Instruction • Empowerment",
  },
  { icon: HandHeart, text: "Buddhist Ceremonies & Prayers" },
  { icon: Crown, text: "Audience / Meeting Arrangements" },
  { icon: BookOpen, text: "Dharma & Spiritual Learning" },
  { icon: Landmark, text: "Monastery & Heritage Tours" },
  { icon: Globe2, text: "Peace & World Peace Programs" },
];

const sacredPillars: IconItem[] = [
  { icon: Landmark, text: "Sacred Places" },
  { icon: BookOpen, text: "Sacred Teachings" },
  { icon: Sun, text: "Sacred Practices" },
  { icon: HeartHandshake, text: "Sacred Communities" },
];

const mediaPartners: IconItem[] = [
  { icon: Leaf, text: "Bodhi Teaching & Meditation Center" },
  { icon: Tv, text: "Dharma Television HD" },
];

const destinations = [
  "Nepal",
  "Tibet / Xizang",
  "Bhutan",
  "India",
  "Sri Lanka",
  "Thailand",
  "Laos",
  "Cambodia",
  "Vietnam",
  "Singapore",
  "Malaysia",
  "Japan",
  "Bali",
  "Dubai / UAE",
  "Canada",
  "USA",
  "Europe",
  "Middle East",
  "Northeast Asia",
  "South Africa & beyond",
];

const travelServices: IconItem[] = [
  { icon: Ticket, text: "Air Ticket Booking" },
  { icon: Hotel, text: "Hotel • Guest House • Homestay" },
  { icon: Bus, text: "Car & Coach Booking" },
  { icon: Stamp, text: "Visa Assistance" },
  { icon: ShieldCheck, text: "Travel Insurance" },
  { icon: FileText, text: "Documentation" },
  { icon: CalendarDays, text: "Customized Itinerary Planning" },
  { icon: ClipboardList, text: "Retreat & Pilgrimage Registration" },
  { icon: Plane, text: "Inbound & Outbound Tours" },
];

const tripsOfWisdom: IconItem[] = [
  { icon: Landmark, text: "Pilgrimage Tours" },
  { icon: Sun, text: "Retreat Journeys" },
  { icon: ScrollText, text: "Sacred Practice Trips" },
  { icon: HandHeart, text: "Spiritual Ceremonies" },
  { icon: Globe2, text: "World Peace Prayer Trips" },
  { icon: Footprints, text: "Peace Walk Journeys" },
  { icon: Building2, text: "Monastery Tours" },
  { icon: Leaf, text: "Wellness Journeys" },
  { icon: Compass, text: "Heritage & Cultural Exploration" },
  { icon: Gift, text: "Journey of Dana (Offering)" },
  { icon: Mountain, text: "Nature Discovery Journeys" },
];

const tripsOfFreedom: IconItem[] = [
  { icon: Users, text: "Family Holidays" },
  { icon: Heart, text: "Romantic Holidays" },
  { icon: Mountain, text: "Adventure Tours" },
  { icon: PawPrint, text: "Wildlife Tours" },
  { icon: Ship, text: "Cruise Holidays" },
  { icon: PartyPopper, text: "Festival Trips" },
  { icon: Umbrella, text: "Beach Holidays" },
  { icon: Waves, text: "Water Activities" },
  { icon: Landmark, text: "Cultural Holidays" },
  { icon: Sparkles, text: "Luxury Holidays" },
  { icon: Trees, text: "Nature & Leisure Tours" },
];

const whyPureLand = [
  "Buddhist Pilgrimage Specialization",
  "Experienced Travel Coordination",
  "Customized Travel Programs",
  "Spiritual & Dharma Partnerships",
  "Reliable Travel Services",
  "Accommodation & Transportation Support",
  "Visa & Documentation Assistance",
  "Retreat & Pilgrimage Registration",
  "International Travel Network",
  "Spiritual • Cultural • Travel Experience",
];

const promises: IconItem[] = [
  { icon: Globe2, text: "Travel with Purpose" },
  { icon: Sun, text: "Journey with Wisdom" },
  { icon: Landmark, text: "Discover the Sacred" },
];

const contactLinks = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+977-9704502011",
    href: "https://wa.me/9779704502011",
  },
  {
    icon: Phone,
    label: "Booking",
    value: "+977-9843347095",
    href: "tel:+9779843347095",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@purelandtravels.com.np",
    href: "mailto:info@purelandtravels.com.np",
  },
  {
    icon: Globe2,
    label: "Website",
    value: "www.purelandtravels.com.np",
    href: "https://www.purelandtravels.com.np",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

function TripList({
  title,
  subtitle,
  image,
  imageAlt,
  items,
}: {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  items: IconItem[];
}) {
  return (
    <motion.article
      {...fadeUp}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="relative h-48 sm:h-56">
        <img src={image} alt={imageAlt} loading="lazy" className="h-full w-full object-cover" />
        <div className="gradient-overlay" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-300">{subtitle}</p>
          <h3 className="mt-1 text-2xl sm:text-3xl font-display font-bold text-white">{title}</h3>
        </div>
      </div>
      <ul className="grid gap-x-6 gap-y-3 p-6 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.text} className="flex items-center gap-3 text-sm sm:text-base">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <item.icon className="h-4 w-4 text-primary" aria-hidden="true" />
            </span>
            {item.text}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-center overflow-hidden">
          <img
            src={heroPilgrimage}
            alt="Himalayan monastery with prayer flags at sunrise"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75" />

          <div className="container-custom relative z-10 py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-amber-300" aria-hidden="true" />
                Kathmandu, Nepal
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-white [text-wrap:balance]">
                Pure Land Tours &amp; Travels
                <span className="block text-amber-300">Pvt. Ltd.</span>
              </h1>

              <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base sm:text-lg text-white/90">
                {taglines.map((tagline, index) => (
                  <li key={tagline} className="flex items-center gap-3">
                    {index > 0 && <span className="text-amber-300" aria-hidden="true">•</span>}
                    {tagline}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/trips/pilgrimage">Explore Pilgrimage Tours</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                >
                  <Link to="/contact">Talk to Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Us */}
        <section className="section-padding" aria-labelledby="about-heading">
          <div className="container-custom grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div {...fadeUp}>
              <span className="block h-1 w-12 rounded-full bg-accent mb-4" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">About Us</p>
              <h2
                id="about-heading"
                className="mt-2 text-3xl sm:text-4xl font-display font-bold [text-wrap:balance]"
              >
                Sacred journeys, guided from the heart of Nepal
              </h2>
              <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  <strong className="font-semibold text-foreground">
                    Pure Land Tours &amp; Travels Pvt. Ltd.
                  </strong>{" "}
                  is a Nepal-based travel company specializing in{" "}
                  <strong className="font-semibold text-foreground">
                    Buddhist pilgrimage, spiritual journeys, Dharma holidays, retreats, cultural tours
                    and comprehensive travel services
                  </strong>
                  .
                </p>
                <p>
                  Associated with{" "}
                  <strong className="font-semibold text-foreground">BTMC Foundation</strong>, Pure Land
                  supports educational, charitable and Dharma initiatives including{" "}
                  <strong className="font-semibold text-foreground">
                    free education, monastic education, International Ngyungne Retreats and weekly
                    meditation retreats
                  </strong>
                  .
                </p>
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {initiatives.map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-3 rounded-xl bg-emerald-light px-4 py-3 text-sm font-medium"
                  >
                    <item.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    {item.text}
                  </li>
                ))}
              </ul>

              <figure className="mt-8 border-l-4 border-accent bg-cream px-6 py-5 rounded-r-xl">
                <blockquote className="font-display text-lg sm:text-xl leading-snug">
                  The company is guided by the vision of Venerable Khen Rinpoche Sonam Gyurme.
                </blockquote>
                <figcaption className="mt-2 text-sm text-muted-foreground">
                  Founder of BTMC Foundation
                </figcaption>
              </figure>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="grid grid-cols-2 gap-4">
              <img
                src={destBhutan}
                alt="Cliffside Himalayan monastery in the clouds"
                loading="lazy"
                className="col-span-2 h-64 sm:h-80 w-full rounded-2xl object-cover shadow-lg"
              />
              <img
                src={destLadakh}
                alt="Snow-covered Himalayan peaks with prayer flags"
                loading="lazy"
                className="h-40 sm:h-52 w-full rounded-2xl object-cover shadow-lg"
              />
              <img
                src={destSpiti}
                alt="Hilltop monastery in a high Himalayan valley"
                loading="lazy"
                className="h-40 sm:h-52 w-full rounded-2xl object-cover shadow-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* Worldwide Travel Services - stats */}
        <section className="bg-emerald-dark text-white" aria-labelledby="worldwide-heading">
          <div className="container-custom py-14 md:py-16">
            <motion.div {...fadeUp} className="text-center">
              <h2 id="worldwide-heading" className="text-2xl sm:text-3xl font-display font-bold">
                Worldwide Travel Services
              </h2>
            </motion.div>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  {...fadeUp}
                  transition={{ delay: index * 0.08 }}
                  className="flex flex-col items-center text-center last:col-span-2 md:last:col-span-1"
                >
                  <stat.icon className="h-7 w-7 text-amber-300" aria-hidden="true" />
                  <dd className="mt-3 text-4xl md:text-5xl font-display font-bold">{stat.value}</dd>
                  <dt className="mt-1 text-sm text-white/75">{stat.label}</dt>
                </motion.div>
              ))}
            </dl>

            <ul className="mt-10 flex flex-wrap justify-center gap-2 border-t border-white/15 pt-8">
              {travelStyles.map((style) => (
                <li
                  key={style}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm"
                >
                  {style}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Our Speciality */}
        <section className="section-padding bg-cream" aria-labelledby="speciality-heading">
          <div className="container-custom">
            <SectionHeading
              id="speciality-heading"
              title="Our Speciality"
              description="Sacred journeys connecting people with Buddhist heritage, teachings and practice."
            />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {specialities.map((item, index) => (
                <motion.li
                  key={item.text}
                  {...fadeUp}
                  transition={{ delay: index * 0.05 }}
                  className="card-hover flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold">{item.text}</span>
                    {item.note && (
                      <span className="mt-0.5 block text-sm text-muted-foreground">{item.note}</span>
                    )}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* Spiritual Travel Experience */}
        <section className="section-padding" aria-labelledby="experience-heading">
          <div className="container-custom">
            <SectionHeading
              id="experience-heading"
              title="Spiritual Travel Experience"
              description="Our selected journeys combine:"
            />
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {sacredPillars.map((pillar, index) => (
                <motion.li
                  key={pillar.text}
                  {...fadeUp}
                  transition={{ delay: index * 0.08 }}
                  className="flex flex-col items-center rounded-2xl border border-border bg-card px-4 py-8 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
                    <pillar.icon className="h-7 w-7 text-amber-600" aria-hidden="true" />
                  </span>
                  <span className="mt-4 font-display text-lg sm:text-xl font-semibold">
                    {pillar.text}
                  </span>
                </motion.li>
              ))}
            </ul>
            <p className="mx-auto mt-8 max-w-3xl text-center text-muted-foreground">
              Programs may include spiritual teachings, meditation, transmissions, instructions,
              empowerments and Buddhist ceremonies, where officially arranged and permitted.
            </p>
          </div>
        </section>

        {/* Dharma • Meditation • Media */}
        <section className="section-padding bg-muted" aria-labelledby="media-heading">
          <div className="container-custom grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div {...fadeUp}>
              <span className="block h-1 w-12 rounded-full bg-accent mb-4" aria-hidden="true" />
              <h2 id="media-heading" className="text-3xl sm:text-4xl font-display font-bold">
                Dharma • Meditation • Media
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                Selected journeys can include{" "}
                <strong className="font-semibold text-foreground">
                  professional documentary and media coverage
                </strong>
                , with content shared through television and digital/social media platforms.
              </p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                <Clapperboard className="h-4 w-4" aria-hidden="true" />
                Television • Digital • Social media
              </p>
            </motion.div>

            <ul className="grid gap-4">
              {mediaPartners.map((partner, index) => (
                <motion.li
                  key={partner.text}
                  {...fadeUp}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <partner.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span className="font-display text-xl font-semibold">{partner.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* Destinations */}
        <section className="section-padding" aria-labelledby="destinations-heading">
          <div className="container-custom">
            <SectionHeading id="destinations-heading" title="Destinations" />
            <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
              {destinations.map((destination, index) => (
                <motion.li
                  key={destination}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm sm:text-base font-medium"
                >
                  <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                  {destination}
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* Our Travel Services */}
        <section className="section-padding bg-cream" aria-labelledby="services-heading">
          <div className="container-custom">
            <SectionHeading id="services-heading" title="Our Travel Services" />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {travelServices.map((service, index) => (
                <motion.li
                  key={service.text}
                  {...fadeUp}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </span>
                  <span className="font-semibold">{service.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* Trips of Wisdom / Trips of Freedom & Happiness */}
        <section className="section-padding" aria-labelledby="trips-heading">
          <div className="container-custom">
            <SectionHeading id="trips-heading" title="Two Ways to Travel with Us" />
            <div className="grid gap-8 lg:grid-cols-2">
              <TripList
                title="Trips of Wisdom"
                subtitle="Pilgrimage & practice"
                image={heroPilgrimage}
                imageAlt="Monastery complex beneath Himalayan peaks"
                items={tripsOfWisdom}
              />
              <TripList
                title="Trips of Freedom & Happiness"
                subtitle="Holidays & leisure"
                image={destBali}
                imageAlt="Turquoise sea beneath green cliffs"
                items={tripsOfFreedom}
              />
            </div>
          </div>
        </section>

        {/* Why Pure Land? */}
        <section className="section-padding bg-muted" aria-labelledby="why-heading">
          <div className="container-custom">
            <SectionHeading id="why-heading" title="Why Pure Land?" />
            <ul className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2">
              {whyPureLand.map((reason, index) => (
                <motion.li
                  key={reason}
                  {...fadeUp}
                  transition={{ delay: index * 0.04 }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 font-medium"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {reason}
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="section-padding" aria-label="Our vision and mission">
          <div className="container-custom grid gap-6 lg:grid-cols-2">
            <motion.article
              {...fadeUp}
              className="rounded-2xl bg-emerald-dark p-8 sm:p-10 text-white"
            >
              <Eye className="h-9 w-9 text-amber-300" aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-display font-bold">Our Vision</h2>
              <p className="mt-4 font-display text-xl leading-snug">
                To create meaningful journeys that connect people with peace, wisdom, compassion,
                harmony and spiritual well-being.
              </p>
              <p className="mt-4 leading-relaxed text-white/80">
                Through pilgrimage, meditation, cultural exploration and responsible tourism, we seek
                to help travelers discover sacred places and experience journeys of deeper
                understanding and inner peace.
              </p>
            </motion.article>

            <motion.article
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-cream p-8 sm:p-10"
            >
              <Target className="h-9 w-9 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-display font-bold">Our Mission</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                To provide{" "}
                <strong className="font-semibold text-foreground">
                  professional, reliable and meaningful travel services
                </strong>{" "}
                while creating opportunities for pilgrims, practitioners and travelers to experience
                sacred, cultural, natural and historical destinations around the world.
              </p>
            </motion.article>
          </div>
        </section>

        {/* Your Journey - closing & contact */}
        <section className="relative overflow-hidden" aria-labelledby="journey-heading">
          <img
            src={destLadakh}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-dark/90" />

          <div className="container-custom relative section-padding text-white">
            <motion.div {...fadeUp} className="text-center">
              <h2
                id="journey-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold [text-wrap:balance]"
              >
                Your Journey • Your Experience • Your Story
              </h2>
              <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4">
                {promises.map((promise) => (
                  <li key={promise.text} className="flex items-center gap-2 text-lg font-medium">
                    <promise.icon className="h-5 w-5 text-amber-300" aria-hidden="true" />
                    {promise.text}
                  </li>
                ))}
              </ul>
            </motion.div>

            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {contactLinks.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex h-full items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    <contact.icon className="h-6 w-6 shrink-0 text-amber-300" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-white/70">
                        {contact.label}
                      </span>
                      <span className="block break-words font-semibold lg:text-sm xl:text-base">{contact.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <p className="flex items-center gap-2 font-display text-xl font-semibold">
                  <MapPin className="h-5 w-5 text-amber-300" aria-hidden="true" />
                  Kathmandu, Nepal
                </p>
                <p className="mt-2 text-white/85">Trinity Tower, Maharajgunj | Jorpati, Pragati Marg</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <p className="flex items-center gap-2 font-display text-xl font-semibold">
                  <MapPin className="h-5 w-5 text-amber-300" aria-hidden="true" />
                  India
                </p>
                <p className="mt-2 font-semibold">Padma Sambhava Trip Pvt. Ltd.</p>
                <p className="text-white/85">
                  Paharganj, New Delhi • Rohini / Kurseong, Darjeeling, West Bengal
                </p>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-white/75">
              <span className="block font-semibold uppercase tracking-[0.2em] text-white">
                Pure Land Tours &amp; Travels Pvt. Ltd.
              </span>
              <span className="mt-1 block italic">
                Worldwide Travel Services | Buddhist Pilgrimage | Spiritual Journeys | Dharma Holidays
              </span>
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
