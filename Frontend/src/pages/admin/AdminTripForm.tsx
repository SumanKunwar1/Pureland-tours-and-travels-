// src/pages/admin/AdminTripForm.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Plus, X, Upload, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { cn } from "@/lib/utils";

interface ItineraryDay {
  day: number;
  title: string;
  highlights: string[];
}

interface TripDate {
  date: string;
  price: number;
  available: number;
}

// Trip Categories and Types based on Navbar structure
const TRIP_CATEGORIES = {
  "Group Trips": {
    value: "group-trips",
    subcategories: [
      { label: "Upcoming Group Trips", value: "upcoming", route: "/trips/upcoming" },
      { label: "Fixed Departure Trips", value: "fixed-departure", route: "/trips/fixed-departure" },
    ],
  },
  "Travel Styles": {
    value: "travel-styles",
    subcategories: [
      { label: "Pilgrimage Trips", value: "pilgrimage", route: "/trips/pilgrimage" },
      { label: "Solo Trips", value: "solo", route: "/style/solo" },
      { label: "Group Travel", value: "group", route: "/trips/group" },
      { label: "Weekend Trips", value: "weekend", route: "/trips/weekend" },
      { label: "Adventure Trips", value: "adventure", route: "/style/adventure" },
    ],
  },
  "Destinations": {
    value: "destinations",
    subcategories: [
      { label: "Domestic Trips", value: "domestic", route: "/domestic-trips" },
      { label: "International Trips", value: "international", route: "/international-trips" },
    ],
  },
  "Combo Trips": {
    value: "combo-trips",
    subcategories: [
      { label: "Combo Packages", value: "combo", route: "/trips/combo" },
    ],
  },
  "Retreats": {
    value: "retreats",
    subcategories: [
      { label: "Meditation Retreats", value: "meditation", route: "/retreats/meditation" },
      { label: "Spiritual Retreats", value: "spiritual", route: "/retreats/spiritual" },
      { label: "Wellness Retreats", value: "wellness", route: "/retreats/wellness" },
      { label: "Yoga Retreats", value: "yoga", route: "/retreats/yoga" },
    ],
  },
  "Customised Trips": {
    value: "customised",
    subcategories: [
      { label: "Custom Packages", value: "custom", route: "/custom" },
    ],
  },
  "Deals": {
    value: "deals",
    subcategories: [
      { label: "Seasonal Deals", value: "seasonal", route: "/deals/seasonal" },
      { label: "Limited Time Offers", value: "limited", route: "/deals/limited" },
    ],
  },
};

export default function AdminTripForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    tripCategory: "", // Main category
    tripType: "", // Subcategory
    tripRoute: "", // Auto-filled based on type
    duration: "",
    description: "",
    price: "",
    originalPrice: "",
    discount: "",
    status: "Active",
    image: "",
    inclusions: [""],
    exclusions: [""],
    notes: [""],
    itinerary: [{ day: 1, title: "", highlights: [""] }] as ItineraryDay[],
    dates: [{ date: "", price: 0, available: 20 }] as TripDate[],
    tags: "", // Additional tags for search/filtering
  });

  const [currentTab, setCurrentTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableTypes, setAvailableTypes] = useState<any[]>([]);

  const tabs = ["Basic Info", "Category & Type", "Pricing", "Itinerary", "Inclusions", "Dates"];

  useEffect(() => {
    if (isEdit) {
      // Load trip data for editing
      setFormData({
        name: "Spiti Valley Winter Expedition",
        destination: "Spiti Valley",
        tripCategory: "travel-styles",
        tripType: "adventure",
        tripRoute: "/style/adventure",
        duration: "7 Days / 6 Nights",
        description: "Experience the winter wonderland of Spiti Valley...",
        price: "25000",
        originalPrice: "35000",
        discount: "10000",
        status: "Active",
        image: "",
        inclusions: ["Accommodation", "Meals", "Transport"],
        exclusions: ["Flight tickets", "Personal expenses"],
        notes: ["Carry warm clothes", "Valid ID required"],
        itinerary: [
          {
            day: 1,
            title: "Arrival in Shimla",
            highlights: ["Pick up from airport", "Hotel check-in"],
          },
        ],
        dates: [{ date: "2026-03-15", price: 25000, available: 20 }],
        tags: "adventure, snow, mountain, winter",
      });
      setSelectedCategory("travel-styles");
    }
  }, [id, isEdit]);

  useEffect(() => {
    // Update available types when category changes
    if (selectedCategory) {
      const category = Object.values(TRIP_CATEGORIES).find(
        (cat) => cat.value === selectedCategory
      );
      if (category) {
        setAvailableTypes(category.subcategories);
      }
    }
  }, [selectedCategory]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setFormData((prev) => ({
      ...prev,
      tripCategory: value,
      tripType: "",
      tripRoute: "",
    }));
  };

  const handleTypeChange = (value: string) => {
    const selectedType = availableTypes.find((type) => type.value === value);
    setFormData((prev) => ({
      ...prev,
      tripType: value,
      tripRoute: selectedType ? selectedType.route : "",
    }));
  };

  const handleArrayChange = (
    field: "inclusions" | "exclusions" | "notes",
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: "inclusions" | "exclusions" | "notes") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (
    field: "inclusions" | "exclusions" | "notes",
    index: number
  ) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleItineraryChange = (
    dayIndex: number,
    field: "title" | "highlights",
    value: string,
    highlightIndex?: number
  ) => {
    const newItinerary = [...formData.itinerary];
    if (field === "title") {
      newItinerary[dayIndex].title = value;
    } else if (field === "highlights" && highlightIndex !== undefined) {
      newItinerary[dayIndex].highlights[highlightIndex] = value;
    }
    setFormData((prev) => ({ ...prev, itinerary: newItinerary }));
  };

  const addItineraryDay = () => {
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day: prev.itinerary.length + 1, title: "", highlights: [""] },
      ],
    }));
  };

  const addItineraryHighlight = (dayIndex: number) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[dayIndex].highlights.push("");
    setFormData((prev) => ({ ...prev, itinerary: newItinerary }));
  };

  const removeItineraryHighlight = (dayIndex: number, highlightIndex: number) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[dayIndex].highlights = newItinerary[dayIndex].highlights.filter(
      (_, i) => i !== highlightIndex
    );
    setFormData((prev) => ({ ...prev, itinerary: newItinerary }));
  };

  const handleDateChange = (
    index: number,
    field: "date" | "price" | "available",
    value: string | number
  ) => {
    const newDates = [...formData.dates];
    newDates[index] = { ...newDates[index], [field]: value };
    setFormData((prev) => ({ ...prev, dates: newDates }));
  };

  const addDate = () => {
    setFormData((prev) => ({
      ...prev,
      dates: [...prev.dates, { date: "", price: 0, available: 20 }],
    }));
  };

  const removeDate = (index: number) => {
    const newDates = formData.dates.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, dates: newDates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate required fields
      if (!formData.name || !formData.destination || !formData.price) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      if (!formData.tripCategory || !formData.tripType) {
        toast({
          title: "Validation Error",
          description: "Please select trip category and type",
          variant: "destructive",
        });
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: isEdit ? "Trip updated" : "Trip created",
        description: `Trip has been ${isEdit ? "updated" : "created"} successfully and will appear on ${formData.tripRoute}`,
      });

      navigate("/admin/trips");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save trip",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/trips")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-display font-bold">
                {isEdit ? "Edit Trip" : "Create New Trip"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {isEdit ? "Update trip details" : "Add a new trip package"}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(index)}
              className={cn(
                "px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 -mb-px",
                currentTab === index
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-card rounded-xl border border-border p-6 space-y-6">
            {/* Basic Info Tab */}
            {currentTab === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Trip Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Spiti Valley Winter Expedition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Destination *
                    </label>
                    <Input
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder="e.g., Spiti Valley, Himachal Pradesh"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Duration *
                    </label>
                    <Input
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 7 Days / 6 Nights"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description *
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed trip description..."
                    rows={5}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Search Tags (comma-separated)
                  </label>
                  <Input
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="e.g., adventure, snow, mountain, winter, trekking"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    These tags help users find your trip in search
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Featured Image
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">Click to upload image</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 5MB (Recommended: 1200x800px)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Category & Type Tab */}
            {currentTab === 1 && (
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-4 flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Select where this trip will appear on your website
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      Choose the main category and specific type to determine the trip's location in navigation
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Main Category *
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                    required
                  >
                    <option value="">Select a category...</option>
                    {Object.entries(TRIP_CATEGORIES).map(([label, data]) => (
                      <option key={data.value} value={data.value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCategory && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Trip Type *
                    </label>
                    <select
                      value={formData.tripType}
                      onChange={(e) => handleTypeChange(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                      required
                    >
                      <option value="">Select a type...</option>
                      {availableTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {formData.tripRoute && (
                  <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                      Trip Location Set Successfully
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      This trip will appear on:{" "}
                      <span className="font-mono font-semibold">
                        {formData.tripRoute}
                      </span>
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                      Users will find this trip when they navigate to this page from the website menu
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Pricing Tab */}
            {currentTab === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Current Price (₹) *
                    </label>
                    <Input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="25000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Original Price (₹)
                    </label>
                    <Input
                      name="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      placeholder="35000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Discount (₹)
                    </label>
                    <Input
                      name="discount"
                      type="number"
                      value={formData.discount}
                      onChange={handleInputChange}
                      placeholder="10000"
                    />
                  </div>
                </div>

                {formData.originalPrice && formData.price && (
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm">
                      <span className="font-semibold">Discount Percentage:</span>{" "}
                      {(
                        ((Number(formData.originalPrice) - Number(formData.price)) /
                          Number(formData.originalPrice)) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Customers save ₹
                      {Number(formData.originalPrice) - Number(formData.price)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Itinerary Tab */}
            {currentTab === 3 && (
              <div className="space-y-4">
                {formData.itinerary.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="border border-border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Day {day.day}</h3>
                      {formData.itinerary.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newItinerary = formData.itinerary.filter(
                              (_, i) => i !== dayIndex
                            );
                            setFormData((prev) => ({
                              ...prev,
                              itinerary: newItinerary.map((d, i) => ({
                                ...d,
                                day: i + 1,
                              })),
                            }));
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      value={day.title}
                      onChange={(e) =>
                        handleItineraryChange(dayIndex, "title", e.target.value)
                      }
                      placeholder="Day title (e.g., Arrival in Shimla)"
                    />
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Highlights</label>
                      {day.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex gap-2">
                          <Input
                            value={highlight}
                            onChange={(e) =>
                              handleItineraryChange(
                                dayIndex,
                                "highlights",
                                e.target.value,
                                highlightIndex
                              )
                            }
                            placeholder="Activity or highlight"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              removeItineraryHighlight(dayIndex, highlightIndex)
                            }
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addItineraryHighlight(dayIndex)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Highlight
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addItineraryDay}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Day
                </Button>
              </div>
            )}

            {/* Inclusions Tab */}
            {currentTab === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Inclusions
                  </label>
                  <div className="space-y-2">
                    {formData.inclusions.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) =>
                            handleArrayChange("inclusions", index, e.target.value)
                          }
                          placeholder="What's included"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeArrayItem("inclusions", index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("inclusions")}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Inclusion
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Exclusions
                  </label>
                  <div className="space-y-2">
                    {formData.exclusions.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) =>
                            handleArrayChange("exclusions", index, e.target.value)
                          }
                          placeholder="What's not included"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeArrayItem("exclusions", index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("exclusions")}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Exclusion
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Notes</label>
                  <div className="space-y-2">
                    {formData.notes.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) =>
                            handleArrayChange("notes", index, e.target.value)
                          }
                          placeholder="Important note"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeArrayItem("notes", index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("notes")}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Dates Tab */}
            {currentTab === 5 && (
              <div className="space-y-4">
                {formData.dates.map((date, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-lg p-4 flex gap-4"
                  >
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">Date</label>
                      <Input
                        type="date"
                        value={date.date}
                        onChange={(e) =>
                          handleDateChange(index, "date", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">
                        Price
                      </label>
                      <Input
                        type="number"
                        value={date.price}
                        onChange={(e) =>
                          handleDateChange(index, "price", Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">
                        Available Seats
                      </label>
                      <Input
                        type="number"
                        value={date.available}
                        onChange={(e) =>
                          handleDateChange(
                            index,
                            "available",
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDate(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addDate}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Date
                </Button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentTab(Math.max(0, currentTab - 1))}
              disabled={currentTab === 0}
            >
              Previous
            </Button>
            <div className="flex gap-2">
              {currentTab === tabs.length - 1 ? (
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  {isEdit ? "Update Trip" : "Create Trip"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setCurrentTab(Math.min(tabs.length - 1, currentTab + 1))}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}