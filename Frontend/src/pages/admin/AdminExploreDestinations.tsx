// src/pages/admin/AdminExploreDestinations.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, Eye, EyeOff, Upload, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { cn } from "@/lib/utils";
import axiosInstance from "@/lib/axios"; // ✅ Use centralized axios instance

type FilterType = "all" | "international" | "domestic" | "weekend" | "Retreats & Healing";

interface ExploreDestination {
  _id: string;
  name: string;
  image: string;
  type: "international" | "domestic" | "weekend" | "Retreats & Healing";
  url: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminExploreDestinations() {
  const { toast } = useToast();
  const [destinations, setDestinations] = useState<ExploreDestination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDestination, setEditingDestination] = useState<ExploreDestination | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    type: "international" as "international" | "domestic" | "weekend" | "Retreats & Healing",
    url: "",
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    try {
      setIsLoading(true);
      
      // ✅ Use axiosInstance - it handles auth automatically
      const response = await axiosInstance.get('/explore-destinations');
      
      if (response.data.status === "success") {
        setDestinations(response.data.data.exploreDestinations);
      }
    } catch (error: any) {
      console.error("Error loading destinations:", error);
      
      // axios interceptor handles 401 redirects automatically
      if (error.response?.status !== 401) {
        toast({
          title: "Error",
          description: error.response?.data?.message || error.message || "Failed to load destinations",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDestinations = destinations.filter(
    dest => filterType === "all" || dest.type === filterType
  );

  const handleCreate = () => {
    setEditingDestination(null);
    setFormData({
      name: "",
      image: "",
      type: "international",
      url: "",
      order: destinations.length + 1,
      isActive: true,
    });
    setPreviewImage("");
    setShowModal(true);
  };

  const handleEdit = (destination: ExploreDestination) => {
    setEditingDestination(destination);
    setFormData({
      name: destination.name,
      image: destination.image,
      type: destination.type,
      url: destination.url,
      order: destination.order,
      isActive: destination.isActive,
    });
    setPreviewImage(destination.image);
    setShowModal(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.image || !formData.url) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      // ✅ Use axiosInstance for POST/PATCH
      if (editingDestination) {
        await axiosInstance.patch(`/explore-destinations/${editingDestination._id}`, formData);
        toast({
          title: "Success",
          description: "Destination updated successfully",
        });
      } else {
        await axiosInstance.post('/explore-destinations', formData);
        toast({
          title: "Success",
          description: "Destination created successfully",
        });
      }

      setShowModal(false);
      loadDestinations();
    } catch (error: any) {
      console.error("Error saving destination:", error);
      
      // axios interceptor handles 401 redirects automatically
      if (error.response?.status !== 401) {
        toast({
          title: "Error",
          description: error.response?.data?.message || error.message || "Failed to save destination",
          variant: "destructive",
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const toggleActive = async (id: string) => {
    try {
      // ✅ Use axiosInstance
      await axiosInstance.patch(`/explore-destinations/${id}/toggle-active`);
      
      toast({
        title: "Success",
        description: "Destination status updated",
      });
      
      loadDestinations();
    } catch (error: any) {
      console.error("Error toggling destination:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) {
      return;
    }

    try {
      // ✅ Use axiosInstance
      await axiosInstance.delete(`/explore-destinations/${id}`);
      
      toast({
        title: "Success",
        description: "Destination deleted successfully",
      });
      
      loadDestinations();
    } catch (error: any) {
      console.error("Error deleting destination:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to delete destination",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Explore Destinations</h1>
            <p className="text-muted-foreground mt-1">
              Manage featured destinations on homepage
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Destination
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "international", "domestic", "weekend", "Retreats & Healing"] as FilterType[]).map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(type)}
            >
              {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredDestinations.length === 0 && (
          <div className="bg-card rounded-lg border border-dashed border-border p-12 text-center">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No destinations found</h3>
            <p className="text-muted-foreground mb-4">
              {filterType === "all" 
                ? "Create your first destination to get started" 
                : `No ${filterType} destinations yet`}
            </p>
            <Button onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Add Destination
            </Button>
          </div>
        )}

        {/* Destinations Grid */}
        {!isLoading && filteredDestinations.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredDestinations.map((destination) => (
              <motion.div
                key={destination._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  "relative group cursor-pointer",
                  !destination.isActive && "opacity-50"
                )}
                onClick={() => handleEdit(destination)}
              >
                <div className="relative aspect-square rounded-full overflow-hidden border-4 border-border hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Action Buttons */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActive(destination._id);
                      }}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      {destination.isActive ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(destination._id);
                      }}
                      className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-semibold",
                      destination.type === "international" && "bg-blue-500 text-white",
                      destination.type === "domestic" && "bg-green-500 text-white",
                      destination.type === "weekend" && "bg-orange-500 text-white",
                      destination.type === "Retreats & Healing" && "bg-purple-500 text-white",
                    )}>
                      {destination.type === "international" ? "Int'l" : 
                       destination.type === "domestic" ? "Dom" : 
                       destination.type === "weekend" ? "Wknd" : "Heal"}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-sm font-medium line-clamp-1">{destination.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">Order: {destination.order}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold">
                  {editingDestination ? "Edit Destination" : "Add Destination"}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModal(false)}
                  disabled={isSaving}
                >
                  ✕
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Destination Name *
                  </label>
                  <Input
                    placeholder="e.g., Bali"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isSaving}
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Destination Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      type: e.target.value as "international" | "domestic" | "weekend" | "Retreats & Healing"
                    })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    required
                    disabled={isSaving}
                  >
                    <option value="international">International</option>
                    <option value="domestic">Domestic</option>
                    <option value="weekend">Weekend</option>
                    <option value="Retreats & Healing">Retreats & Healing</option>
                  </select>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Destination Image *
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="cursor-pointer"
                        disabled={isSaving}
                      />
                      <Upload className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    {previewImage && (
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border mx-auto">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <p className="text-sm text-muted-foreground">
                      Or enter image URL:
                    </p>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setPreviewImage(e.target.value);
                      }}
                      disabled={isSaving}
                    />
                  </div>
                </div>

                {/* URL/Link */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Destination URL *
                  </label>
                  <Input
                    placeholder="/trip/bali-tour or https://example.com"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    required
                    disabled={isSaving}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Internal link (e.g., /trip/bali-tour) or external URL
                  </p>
                </div>

                {/* Order */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Display Order *
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    required
                    disabled={isSaving}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Lower numbers appear first
                  </p>
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4"
                    disabled={isSaving}
                  />
                  <label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
                    Active (Show on homepage)
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="flex-1"
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : editingDestination ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}