// src/components/TrendingDestinations.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface TrendingDestination {
  _id: string;
  name: string;
  price: number;
  image: string;
  url: string;
  order: number;
  isActive: boolean;
}

export function TrendingDestinations() {
  const { toast } = useToast();
  const [destinations, setDestinations] = useState<TrendingDestination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    try {
      setIsLoading(true);
      
      // Get API URL with fallback
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const endpoint = `${apiUrl}/api/v1/trending-destinations/active`;
      
      console.log('Fetching trending destinations from:', endpoint);
      
      const response = await fetch(endpoint);
      
      console.log('Response status:', response.status);
      console.log('Response content-type:', response.headers.get('content-type'));
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Server returned non-JSON response');
        const text = await response.text();
        console.error('Response text:', text.substring(0, 200));
        throw new Error('Server returned invalid response format');
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.status === 'success' && data.data && data.data.trendingDestinations) {
        setDestinations(data.data.trendingDestinations);
        console.log('Loaded destinations:', data.data.trendingDestinations.length);
      } else {
        console.warn('Unexpected data structure:', data);
        setDestinations([]);
      }
    } catch (error: any) {
      console.error('Error loading trending destinations:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // Only show toast in development mode
      if (import.meta.env.DEV) {
        toast({
          title: "Failed to load destinations",
          description: error.message,
          variant: "destructive",
        });
      }
      
      setDestinations([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show the section if there are no destinations or still loading
  if (isLoading || destinations.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted py-8 border-b border-border">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl font-display font-bold mb-4"
        >
          Trending Destinations
        </motion.h2>

        <div className="overflow-x-auto hide-scrollbar -mx-4 px-4 scrollbar-smooth">
          <div className="flex gap-6" style={{ minWidth: "max-content" }}>
            {destinations.map((destination, index) => (
              <motion.div
                key={destination._id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0"
              >
                <Link
                  to={destination.url}
                  className="block relative w-48 aspect-[3/4] rounded-xl overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback image if the image fails to load
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=600&fit=crop';
                    }}
                  />
                  <div className="gradient-overlay" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-primary-foreground">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-primary-foreground/80 font-semibold">
                      ₹{destination.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}