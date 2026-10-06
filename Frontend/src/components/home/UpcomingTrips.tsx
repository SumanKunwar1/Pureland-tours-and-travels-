// src/components/sections/UpcomingTrips.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api-config";
import { toRouteList } from "@/lib/trip-taxonomy";
import { TourGrid } from "@/components/home/TourGrid";
import type { TourTrip } from "@/components/home/TourCard";

type Trip = TourTrip & { destination: string };

// This section is reserved for Group Trips. A trip appears here only when an
// admin explicitly ticks that type, never by being recent.
const GROUP_TRIPS_ROUTE = "/trips/group";



const categories = [
  "All",
  "Nepal",
  "Sikkim",
  "Darjeeling",
  "Tsopema Himalchal",
  "Canada",
  "USA",
  "Australia",
  "Russia",
  "UK",
  "Europe",
  "Phillipine",
  "Dubai",
  "Azerbaijan",
  "Armenia",
  "Baku",
  "Brazil",
  "South Africa",
  "Georgia",  
  "Turkey", 
  "Egypt", 
  "Saudi Arabia", 
  "Qatar", 
  "Korea", 
  "Taiwan", 
  "Malaysia",
  "Tibet", 
  "China", 
  "Hongkong", 
  "Loas", 
  "Cambodia", 
  "Phillipines"
];

export function UpcomingTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchUpcomingTrips();
  }, []);

  const fetchUpcomingTrips = async () => {
    try {
      setLoading(true);
      // Fetch only 4 active trips, sorted by creation date (newest first)
      // Ask the API for group trips only. The client-side filter below is a
      // backstop in case the query param is ignored.
      const response = await axios.get(
        `${API_BASE_URL}/trips?tripRoute=${encodeURIComponent(
          GROUP_TRIPS_ROUTE
        )}&limit=12&sort=-createdAt`
      );

      if (response.data.status === 'success') {
        const groupTrips = (response.data.data.trips as Trip[]).filter((trip) =>
          toRouteList(trip.tripRoute).includes(GROUP_TRIPS_ROUTE)
        );
        setTrips(groupTrips);
      }
    } catch (error) {
      console.error("Error fetching upcoming trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrips = trips.filter((trip) => {
    if (activeCategory === "All") return true;
    
    // Check if destination or name contains the category
    return (
      trip.destination.toLowerCase().includes(activeCategory.toLowerCase()) ||
      trip.name.toLowerCase().includes(activeCategory.toLowerCase())
    );
  });

  // Limit to maximum 4 trips
  const displayTrips = filteredTrips.slice(0, 4);

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Upcoming Group Trips
          </h2>
          <Link to={GROUP_TRIPS_ROUTE}>
            <Button variant="outline" className="self-start sm:self-center">
              See All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Category Pills */}
        <div className="overflow-x-auto hide-scrollbar -mx-4 px-4 mb-8">
          <div className="flex gap-2 pb-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "filter-pill",
                  activeCategory === category && "filter-pill-active"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Trip Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : displayTrips.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No upcoming trips available at the moment.
            </p>
          </div>
        ) : (
          <TourGrid trips={displayTrips} />
        )}
      </div>
    </section>
  );
}
