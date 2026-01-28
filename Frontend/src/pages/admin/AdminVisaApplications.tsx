// src/pages/admin/AdminVisaApplications.tsx
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
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Plane,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { cn } from "@/lib/utils";

interface VisaApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  status: "Under Review" | "Approved" | "Rejected" | "Pending Documents";
  submittedDate: string;
  data: any;
}

export default function AdminVisaApplications() {
  const { toast } = useToast();
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<VisaApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<VisaApplication | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    // Load applications from localStorage
    const stored = localStorage.getItem("visaApplications");
    if (stored) {
      const apps = JSON.parse(stored);
      setApplications(apps);
      setFilteredApplications(apps);
    }
  }, []);

  useEffect(() => {
    // Filter applications
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((app) => app.status === filterStatus);
    }

    setFilteredApplications(filtered);
  }, [searchTerm, filterStatus, applications]);

  const updateApplicationStatus = (id: string, newStatus: VisaApplication["status"]) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
    localStorage.setItem("visaApplications", JSON.stringify(updated));

    toast({
      title: "Status Updated",
      description: `Application status changed to ${newStatus}`,
    });

    if (selectedApplication?.id === id) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300";
      case "Rejected":
        return "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300";
      case "Under Review":
        return "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300";
      case "Pending Documents":
        return "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300";
      default:
        return "bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4" />;
      case "Rejected":
        return <XCircle className="w-4 h-4" />;
      case "Under Review":
        return <Clock className="w-4 h-4" />;
      case "Pending Documents":
        return <FileText className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Destination", "Status", "Submitted Date"];
    const rows = filteredApplications.map((app) => [
      app.name,
      app.email,
      app.phone,
      app.destination,
      app.status,
      new Date(app.submittedDate).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "visa-applications.csv";
    a.click();

    toast({
      title: "Export Successful",
      description: "Applications exported to CSV",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Visa Applications</h1>
            <p className="text-muted-foreground mt-1">
              Manage and review visa applications
            </p>
          </div>
          <Button onClick={exportToCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="text-sm text-muted-foreground">Total Applications</div>
            <div className="text-2xl font-bold mt-1">{applications.length}</div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="text-sm text-muted-foreground">Under Review</div>
            <div className="text-2xl font-bold mt-1 text-blue-600">
              {applications.filter((a) => a.status === "Under Review").length}
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="text-sm text-muted-foreground">Approved</div>
            <div className="text-2xl font-bold mt-1 text-green-600">
              {applications.filter((a) => a.status === "Approved").length}
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="text-sm text-muted-foreground">Pending Documents</div>
            <div className="text-2xl font-bold mt-1 text-amber-600">
              {applications.filter((a) => a.status === "Pending Documents").length}
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
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending Documents">Pending Documents</option>
              </select>
            </div>
            <div className="text-sm text-muted-foreground flex items-center">
              Showing {filteredApplications.length} of {applications.length} applications
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm">Applicant</th>
                  <th className="text-left p-4 font-semibold text-sm">Contact</th>
                  <th className="text-left p-4 font-semibold text-sm">Destination</th>
                  <th className="text-left p-4 font-semibold text-sm">Status</th>
                  <th className="text-left p-4 font-semibold text-sm">Submitted</th>
                  <th className="text-left p-4 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app, index) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-t border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{app.name}</div>
                            <div className="text-xs text-muted-foreground">ID: {app.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{app.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{app.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-sm">{app.destination}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
                            getStatusColor(app.status)
                          )}
                        >
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(app.submittedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedApplication(app);
                              setShowDetailsModal(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
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
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-lg border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Application Details</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  ID: {selectedApplication.id}
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
                  {["Under Review", "Approved", "Rejected", "Pending Documents"].map(
                    (status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={
                          selectedApplication.status === status ? "default" : "outline"
                        }
                        onClick={() =>
                          updateApplicationStatus(
                            selectedApplication.id,
                            status as VisaApplication["status"]
                          )
                        }
                      >
                        {status}
                      </Button>
                    )
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailField label="Full Name" value={selectedApplication.data.fullName} />
                  <DetailField label="Gender" value={selectedApplication.data.gender} />
                  <DetailField label="Date of Birth" value={selectedApplication.data.dateOfBirth} />
                  <DetailField label="Nationality" value={selectedApplication.data.nationality} />
                  <DetailField label="Marital Status" value={selectedApplication.data.maritalStatus} />
                  <DetailField label="Occupation" value={selectedApplication.data.occupation} />
                </div>
              </div>

              {/* Passport Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Passport Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailField label="Passport Number" value={selectedApplication.data.passportNumber} />
                  <DetailField label="Passport Type" value={selectedApplication.data.passportType} />
                  <DetailField label="Date of Issue" value={selectedApplication.data.dateOfIssue} />
                  <DetailField label="Date of Expiry" value={selectedApplication.data.dateOfExpiry} />
                  <DetailField label="Place of Issue" value={selectedApplication.data.placeOfIssue} />
                  <DetailField label="Issuing Country" value={selectedApplication.data.issuingCountry} />
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailField label="Email" value={selectedApplication.data.email} />
                  <DetailField label="Phone" value={selectedApplication.data.phone} />
                  <DetailField label="Address" value={selectedApplication.data.residentialAddress} />
                  <DetailField label="City" value={selectedApplication.data.city} />
                  <DetailField label="Country" value={selectedApplication.data.country} />
                  <DetailField label="Postal Code" value={selectedApplication.data.postalCode} />
                </div>
              </div>

              {/* Travel Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  Travel Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailField label="Destination" value={selectedApplication.data.destinationCountry} />
                  <DetailField label="Purpose of Visit" value={selectedApplication.data.purposeOfVisit} />
                  <DetailField label="Arrival Date" value={selectedApplication.data.arrivalDate} />
                  <DetailField label="Departure Date" value={selectedApplication.data.departureDate} />
                  <DetailField label="Duration of Stay" value={selectedApplication.data.durationOfStay} />
                  <DetailField label="Number of Entries" value={selectedApplication.data.numberOfEntries} />
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailField label="Expenses Bearer" value={selectedApplication.data.expensesBearer} />
                  <DetailField label="Estimated Budget" value={selectedApplication.data.estimatedBudget} />
                  <DetailField label="Sufficient Funds" value={selectedApplication.data.sufficientFunds} />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-card border-t border-border p-6">
              <Button
                onClick={() => setShowDetailsModal(false)}
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

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/30 rounded-lg p-3">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-sm font-medium">{value || "N/A"}</div>
    </div>
  );
}