// src/pages/DomesticTrips.tsx
import TripListingPage from "@/components/trips/TripListingPage";
import destLadakh from "@/assets/dest-ladakh.jpg";

const destinations = [
  "All", "Kathmandu", "Bhaktapur", "Lalitpur", "Pokhara", "Mukhtinath", "Lumbini", "Chitwan", "Nagarkot", "Bandipur", "Dhulikhel", "Gosaikunda", "Rara Lake",
  "Everest Region"
];

const DomesticTrips = () => {
  return (
    <TripListingPage
      title="Explore all Nepal Tour Packages"
      tagline="Discover Incredible Nepal with us"
      subtitle="From mountains to lakes, explore the beauty of our homeland."
      description="Nepal is a land of diverse landscapes, rich culture, and endless adventures. Our Nepal trips take you to the most breathtaking destinations across the country. Whether it's the snow-capped peaks of the Himalayas, the serene lakes of Pokhara, or the sacred pilgrimage sites of Lumbini and Muktinath - experience the very best of Nepal."
      heroImage="https://www.relaxgetaways.com/uploads/media/Most%20Visited%20Places%20in%20Nepal/Most%20Visited%20Places%20in%20Nepal%20Intero.jpg"
      filterDestinations={destinations}
      tripCategory="nepal-trips"
    />
  );
};

export default DomesticTrips;