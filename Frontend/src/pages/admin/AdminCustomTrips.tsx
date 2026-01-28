// src/pages/admin/AdminCustomTrips.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Mail,
  Phone,
  Users,
  Calendar,
  DollarSign,
  MessageSquare,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { cn } from "@/lib/utils";

interface CustomTripRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelers: string;
  dates: string;
  budget: string;
  message: string;
  status: "New" | "In Progress" | "Quoted" | "Confirmed" | "Cancelled";
  submittedDate: string;
}

export default function AdminCustomTrips() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<CustomTripRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<CustomTripRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<CustomTripRequest | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    // Load requests from localStorage
    const stored = localStorage.getItem("customTripRequests");
    if (stored) {
      const reqs = JSON.parse(stored);
      setRequests(reqs);
      setFilteredRequests(reqs);
    } else {
      // Add some sample data for demonstration
      const sampleData: CustomTripRequest[] = [
        {
          id: "1",
          name: "Amit Sharma",
          email: "amit.sharma@example.com",
          phone: "+91 98765 43210",
          destination: "Spiti Valley",
          travelers: "2 Adults, 1 Child",
          dates: "March 2026",
          budget: "₹50,000 - ₹75,000",
          message: "Looking for a family-friendly adventure trip with cultural experiences",
          status: "New",
          submittedDate: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Priya Patel",
          email: "priya.patel@example.com",
          phone: "+91 87654 32109",
          destination: "Bhutan",
          travelers: "4 Adults",
          dates: "April 2026",
          budget: "₹1,00,000 - ₹1,50,000",
          message: "Interested in spiritual and meditation retreat",
          status: "In Progress",
          submittedDate: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
      setRequests(sampleData);
      setFilteredRequests(sampleData);
      localStorage.setItem("customTripRequests", JSON.stringify(sampleData));
    }
  }, []);

  useEffect(() => {
    // Filter requests
    let filtered = requests;

    if (searchTerm) {
      filtered = filtered.filter(
        (req) =>
          req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((req) => req.status === filterStatus);
    }

    setFilteredRequests(filtered);
  }, [searchTerm, filterStatus, requests]);

  const updateRequestStatus = (id: string, newStatus: CustomTripRequest["status"]) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
    localStorage.setItem("customTripRequests", JSON.stringify(updated));

    toast({
      title: "Status Updated",
      description: `Request status changed to ${newStatus}`,
    });

    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300";
      case "In Progress":
        return "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300";
      case "Quoted":
        return "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300";
      case "Confirmed":
        return "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300";
      case "Cancelled":
        return "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "New":
        return <Clock className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      case "Quoted":
        return <DollarSign className="w-4 h-4" />;
      case "Confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "Cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Destination", "Travelers", "Dates", "Budget", "Status", "Submitted"];
    const rows = filteredRequests.map((req) => [
      req.name,
      req.email,
      req.phone,
      req.destination,
      req.travelers,
      req.dates,
      req.budget,
      req.status,
      new Date(req.submittedDate).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "custom-trip-requests.csv";
    a.click();

    toast({
      title: "Export Successful",
      description: "Requests exported to CSV",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Custom Trip Requests</h1>
            <p className="text-muted-foreground mt-1">
              Manage customised trip enquiries
            </p>
          </div>
          <Button onClick={exportToCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="text-sm text-muted-foreground">Total Requests</div>
            <div className="text-2xl font-bold mt-1">{requests.length}</div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="text-sm text-muted-foreground">New</div>
            <div className="text-2xl font-bold mt-1 text-blue-600">
              {requests.filter((r) => r.status === "New").length}
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="text-sm text-muted-foreground">In Progress</div>
            <div className="text-2xl font-bold mt-1 text-amber-600">
              {requests.filter((r) => r.status === "In Progress").length}
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="text-sm text-muted-foreground">Quoted</div>
            <div className="text-2xl font-bold mt-1 text-purple-600">
              {requests.filter((r) => r.status === "Quoted").length}
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="text-sm text-muted-foreground">Confirmed</div>
            <div className="text-2xl font-bold mt-1 text-green-600">
              {requests.filter((r) => r.status === "Confirmed").length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-md border border-border bg-background"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Quoted">Quoted</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="text-sm text-muted-foreground flex items-center">
              Showing {filteredRequests.length} of {requests.length} requests
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm">Customer</th>
                  <th className="text-left p-4 font-semibold text-sm">Contact</th>
                  <th className="text-left p-4 font-semibold text-sm">Trip Details</th>
                  <th className="text-left p-4 font-semibold text-sm">Budget</th>
                  <th className="text-left p-4 font-semibold text-sm">Status</th>
                  <th className="text-left p-4 font-semibold text-sm">Submitted</th>
                  <th className="text-left p-4 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                      No requests found
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req, index) => (
                    <motion.tr
                      key={req.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-t border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-semibold text-sm">{req.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {req.id}</div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{req.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{req.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <span className="font-medium">{req.destination}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            <span>{req.travelers}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{req.dates}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          {req.budget}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
                            getStatusColor(req.status)
                          )}
                        >
                          {getStatusIcon(req.status)}
                          {req.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-muted-foreground">
                          {new Date(req.submittedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedRequest(req);
                            setShowDetailsModal(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Request Details</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  ID: {selectedRequest.id}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetailsModal(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Update */}
              <div className="bg-muted/50 rounded-lg p-4">
                <label className="block text-sm font-semibold mb-2">Update Status</label>
                <div className="flex flex-wrap gap-2">
                  {["New", "In Progress", "Quoted", "Confirmed", "Cancelled"].map(
                    (status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={
                          selectedRequest.status === status ? "default" : "outline"
                        }
                        onClick={() =>
                          updateRequestStatus(
                            selectedRequest.id,
                            status as CustomTripRequest["status"]
                          )
                        }
                      >
                        {status}
                      </Button>
                    )
                  )}
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                <div className="space-y-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Full Name</div>
                    <div className="text-sm font-medium">{selectedRequest.name}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Email</div>
                      <div className="text-sm font-medium">{selectedRequest.email}</div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Phone</div>
                      <div className="text-sm font-medium">{selectedRequest.phone}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Trip Details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Destination</div>
                      <div className="text-sm font-medium">{selectedRequest.destination}</div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Travel Dates</div>
                      <div className="text-sm font-medium">{selectedRequest.dates}</div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Number of Travelers</div>
                      <div className="text-sm font-medium">{selectedRequest.travelers}</div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Budget (per person)</div>
                      <div className="text-sm font-medium">{selectedRequest.budget}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Message */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Customer Message
                </h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm leading-relaxed">{selectedRequest.message}</p>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="flex gap-3">
                <Button className="flex-1" asChild>
                  <a href={`mailto:${selectedRequest.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </a>
                </Button>
                <Button className="flex-1" variant="outline" asChild>
                  <a href={`tel:${selectedRequest.phone}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call Customer
                  </a>
                </Button>
              </div>
            </div>

            <div className="sticky bottom-0 bg-card border-t border-border p-6">
              <Button
                onClick={() => setShowDetailsModal(false)}
                variant="outline"
                className="w-full"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}