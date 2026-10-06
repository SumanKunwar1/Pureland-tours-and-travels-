// src/components/home/TourSection.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { TourGrid } from "@/components/home/TourGrid";
import type { TourTrip } from "@/components/home/TourCard";
import { API_BASE_URL } from "@/lib/api-config";
import { toRouteList } from "@/lib/trip-taxonomy";
import type { HomeTourSectionConfig } from "@/lib/home-sections";
import { cn } from "@/lib/utils";

interface TourSectionProps extends HomeTourSectionConfig {
  /** How many cards to show before "View All" takes over. */
  limit?: number;
  tone?: "background" | "muted";
}

/**
 * One homepage tour section: heading, description, and the trips an admin
 * assigned to it. Renders nothing until it has at least one trip, so the
 * homepage never shows an empty shelf.
 */
export function TourSection({
  id,
  title,
  description,
  highlights,
  route,
  imageShape,
  limit = 4,
  tone = "background",
}: TourSectionProps) {
  const [trips, setTrips] = useState<TourTrip[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchTrips = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/trips?tripRoute=${encodeURIComponent(route)}&limit=12&sort=-createdAt`
        );

        if (!cancelled && response.data.status === "success") {
          // The client-side filter is a backstop in case the query param is ignored.
          setTrips(
            (response.data.data.trips as TourTrip[]).filter((trip) =>
              toRouteList(trip.tripRoute).includes(route)
            )
          );
        }
      } catch (error) {
        console.error(`Error fetching trips for "${title}":`, error);
      }
    };

    fetchTrips();

    return () => {
      cancelled = true;
    };
  }, [route, title]);

  if (trips.length === 0) return null;

  return (
    <section
      className={cn("py-12 md:py-16 lg:py-20", tone === "muted" ? "bg-muted" : "bg-background")}
      aria-labelledby={`${id}-heading`}
      data-testid={`tour-section-${id}`}
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-8 md:mb-10"
        >
          <span className="block h-1 w-12 rounded-full bg-accent mx-auto mb-4" aria-hidden="true" />
          <h2
            id={`${id}-heading`}
            className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold [text-wrap:balance]"
          >
            {title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground [text-wrap:balance]">{description}</p>
          {highlights && (
            <p className="mt-2 text-sm sm:text-base italic text-primary [text-wrap:balance]">{highlights}</p>
          )}
        </motion.div>

        <TourGrid trips={trips.slice(0, limit)} imageShape={imageShape} />

        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to={route} aria-label={`View all ${title}`}>
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
