// src/pages/admin/AdminHeroSection.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, Eye, EyeOff, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { cn } from "@/lib/utils";
import axiosInstance from "@/lib/axios"; // ✅ Import the configured axios instance

interface HeroImage {
  _id: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminHeroSection() {
  const { toast } = useToast();
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState<HeroImage | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    subtitle: "",
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    loadHeroImages();
  }, []);

  const loadHeroImages = async () => {
    try {
      setIsLoading(true);
      console.log("🔄 Fetching hero images...");

      // ✅ Use axios instance - it handles auth automatically
      const response = await axiosInstance.get('/hero-images');

      console.log("✅ Hero images loaded:", response.data.results);
      
      if (response.data.status === "success") {
        setHeroImages(response.data.data.heroImages);
      }
    } catch (error: any) {
      console.error("❌ Error loading hero images:", error);
      
      // Check if it's an auth error (axios interceptor handles 401)
      if (error.response?.status === 401) {
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 1500);
      } else {
        toast({
          title: "Error",
          description: error.response?.data?.message || error.message || "Failed to load hero images",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingImage(null);
    setFormData({
      imageUrl: "",
      title: "",
      subtitle: "",
      order: heroImages.length + 1,
      isActive: true,
    });
    setPreviewImage("");
    setShowModal(true);
  };

  const handleEdit = (image: HeroImage) => {
    setEditingImage(image);
    setFormData({
      imageUrl: image.imageUrl,
      title: image.title || "",
      subtitle: image.subtitle || "",
      order: image.order,
      isActive: image.isActive,
    });
    setPreviewImage(image.imageUrl);
    setShowModal(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
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
        setFormData({ ...formData, imageUrl: result });
      };
      reader.readAsDataURL(file);

      toast({
        title: "Image Loaded",
        description: "Image preview created. For production, implement cloud upload (Cloudinary/AWS S3).",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      toast({
        title: "Error",
        description: "Please provide an image URL or upload an image",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      // ✅ Use axios instance
      if (editingImage) {
        await axiosInstance.patch(`/hero-images/${editingImage._id}`, formData);
        toast({
          title: "Success",
          description: "Hero image updated successfully",
        });
      } else {
        await axiosInstance.post('/hero-images', formData);
        toast({
          title: "Success",
          description: "Hero image created successfully",
        });
      }

      setShowModal(false);
      loadHeroImages();
    } catch (error: any) {
      console.error("❌ Error saving hero image:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to save hero image",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleActive = async (id: string) => {
    try {
      // ✅ Use axios instance
      await axiosInstance.patch(`/hero-images/${id}/toggle-active`);
      
      toast({
        title: "Success",
        description: "Hero image status updated",
      });
      
      loadHeroImages();
    } catch (error: any) {
      console.error("❌ Error toggling hero image:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hero image?")) {
      return;
    }

    try {
      // ✅ Use axios instance
      await axiosInstance.delete(`/hero-images/${id}`);
      
      toast({
        title: "Success",
        description: "Hero image deleted successfully",
      });
      
      loadHeroImages();
    } catch (error: any) {
      console.error("❌ Error deleting hero image:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to delete hero image",
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
            <h1 className="text-3xl font-bold">Hero Section Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage homepage hero banner images and slideshow
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Hero Image
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && heroImages.length === 0 && (
          <div className="bg-card rounded-lg border border-dashed border-border p-12 text-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hero images yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first hero image to display on the homepage
            </p>
            <Button onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Add Hero Image
            </Button>
          </div>
        )}

        {/* Hero Images Grid */}
        {!isLoading && heroImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroImages.map((image) => (
              <motion.div
                key={image._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "bg-card rounded-lg border overflow-hidden transition-all hover:shadow-lg",
                  !image.isActive && "opacity-60"
                )}
              >
                <div className="relative aspect-video">
                  <img
                    src={image.imageUrl}
                    alt={image.title || "Hero image"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => toggleActive(image._id)}
                      className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
                      title={image.isActive ? "Hide from homepage" : "Show on homepage"}
                    >
                      {image.isActive ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="text-white">
                      <p className="text-sm font-semibold">
                        Order: {image.order} | {image.isActive ? "Active" : "Inactive"}
                      </p>
                      {image.title && (
                        <p className="text-sm mt-1 font-medium">{image.title}</p>
                      )}
                      {image.subtitle && (
                        <p className="text-xs mt-0.5 text-white/80">{image.subtitle}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(image)}
                      className="flex-1"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(image._id)}
                      className="flex-1"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
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
                  {editingImage ? "Edit Hero Image" : "Add Hero Image"}
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
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Hero Image *
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
                      <div className="relative aspect-video rounded-lg overflow-hidden border">
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
                      value={formData.imageUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, imageUrl: e.target.value });
                        setPreviewImage(e.target.value);
                      }}
                      disabled={isSaving}
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title (Optional)
                  </label>
                  <Input
                    placeholder="e.g., Sacred Pilgrimages"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    maxLength={100}
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Main heading displayed on the hero banner
                  </p>
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subtitle (Optional)
                  </label>
                  <Input
                    placeholder="e.g., Journey to Divine Destinations"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                    maxLength={200}
                    disabled={isSaving}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Subheading displayed below the title
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
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) || 1 })
                    }
                    required
                    disabled={isSaving}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Lower numbers appear first in the slideshow
                  </p>
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-4 h-4"
                    disabled={isSaving}
                  />
                  <label
                    htmlFor="isActive"
                    className="text-sm font-medium cursor-pointer"
                  >
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
                    ) : editingImage ? (
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