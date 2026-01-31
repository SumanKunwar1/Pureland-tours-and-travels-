// src/pages/admin/AdminAgents.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Download,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Briefcase,
  Globe,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import AdminLayout from "@/components/admin/AdminLayout";

interface Agent {
  _id: string;
  agentId: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  website?: string;
  experience: string;
  status: "Pending" | "Approved" | "Rejected";
  commissionRate: number;
  totalBookings: number;
  totalRevenue: number;
  isActive: boolean;
  notes?: string;
  approvedBy?: {
    name: string;
    email: string;
  };
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  totalAgents: number;
  pendingAgents: number;
  approvedAgents: number;
  rejectedAgents: number;
  activeAgents: number;
  totalRevenue: number;
  totalBookings: number;
  avgCommissionRate: number;
  topAgents: Array<{
    fullName: string;
    companyName: string;
    totalRevenue: number;
    totalBookings: number;
  }>;
}

export default function AdminAgents() {
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [commissionRate, setCommissionRate] = useState(10);
  const [rejectionNotes, setRejectionNotes] = useState("");

  useEffect(() => {
    fetchAgents();
    fetchStats();
  }, [searchQuery, statusFilter]);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append("search", searchQuery);
      if (statusFilter !== "All") queryParams.append("status", statusFilter);

      const response = await fetch(
        `http://localhost:5000/api/v1/agents?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch agents");

      const data = await response.json();
      setAgents(data.data.agents);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load agents",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/agents/admin/stats",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch stats");

      const data = await response.json();
      setStats(data.data);
    } catch (error) {
      console.error("Failed to load statistics");
    }
  };

  const handleApprove = async () => {
    if (!selectedAgent) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/agents/${selectedAgent._id}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ commissionRate }),
        }
      );

      if (!response.ok) throw new Error("Failed to approve agent");

      toast({
        title: "Success",
        description: "Agent approved successfully",
      });

      setApproveDialogOpen(false);
      fetchAgents();
      fetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve agent",
        variant: "destructive",
      });
    }
  };

  const handleReject = async () => {
    if (!selectedAgent) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/agents/${selectedAgent._id}/reject`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ notes: rejectionNotes }),
        }
      );

      if (!response.ok) throw new Error("Failed to reject agent");

      toast({
        title: "Success",
        description: "Agent rejected",
      });

      setRejectDialogOpen(false);
      setRejectionNotes("");
      fetchAgents();
      fetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject agent",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedAgent) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/agents/${selectedAgent._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete agent");

      toast({
        title: "Success",
        description: "Agent deleted successfully",
      });

      setDeleteDialogOpen(false);
      fetchAgents();
      fetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete agent",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Approved: "bg-green-100 text-green-800 border-green-200",
      Rejected: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <span
        className={cn(
          "px-3 py-1 rounded-full text-xs font-semibold border",
          styles[status as keyof typeof styles]
        )}
      >
        {status}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agent Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage travel agent applications and partnerships
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Agents</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalAgents}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold mt-1">{stats.pendingAgents}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Agents</p>
                  <p className="text-2xl font-bold mt-1">{stats.activeAgents}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Commission</p>
                  <p className="text-2xl font-bold mt-1">{stats.avgCommissionRate}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Agents Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Agent ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Name & Company
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Experience
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Applied On
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-muted-foreground">Loading agents...</span>
                      </div>
                    </td>
                  </tr>
                ) : agents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                      No agents found
                    </td>
                  </tr>
                ) : (
                  agents.map((agent) => (
                    <tr key={agent._id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold">
                          {agent.agentId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{agent.fullName}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {agent.companyName}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-1">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            {agent.email}
                          </p>
                          <p className="text-sm flex items-center gap-1">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            {agent.phone}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          {agent.city}, {agent.state}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm">{agent.experience} years</span>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(agent.status)}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          {formatDate(agent.createdAt)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedAgent(agent);
                              setViewDialogOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {agent.status === "Pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedAgent(agent);
                                  setCommissionRate(10);
                                  setApproveDialogOpen(true);
                                }}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedAgent(agent);
                                  setRejectDialogOpen(true);
                                }}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedAgent(agent);
                              setDeleteDialogOpen(true);
                            }}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agent Details</DialogTitle>
              <DialogDescription>
                Complete information about the agent application
              </DialogDescription>
            </DialogHeader>
            {selectedAgent && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Agent ID</Label>
                    <p className="font-mono font-semibold">{selectedAgent.agentId}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedAgent.status)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Full Name</Label>
                    <p className="font-medium">{selectedAgent.fullName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Company Name</Label>
                    <p className="font-medium">{selectedAgent.companyName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedAgent.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{selectedAgent.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">City</Label>
                    <p className="font-medium">{selectedAgent.city}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">State</Label>
                    <p className="font-medium">{selectedAgent.state}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Experience</Label>
                    <p className="font-medium">{selectedAgent.experience} years</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Website</Label>
                    <p className="font-medium">
                      {selectedAgent.website || "Not provided"}
                    </p>
                  </div>
                </div>

                {selectedAgent.status === "Approved" && (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Commission Rate</Label>
                        <p className="font-medium">{selectedAgent.commissionRate}%</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Total Bookings</Label>
                        <p className="font-medium">{selectedAgent.totalBookings}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Total Revenue</Label>
                        <p className="font-medium">
                          {formatCurrency(selectedAgent.totalRevenue)}
                        </p>
                      </div>
                    </div>

                    {selectedAgent.approvedAt && (
                      <div>
                        <Label className="text-muted-foreground">Approved On</Label>
                        <p className="font-medium">
                          {formatDate(selectedAgent.approvedAt)}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {selectedAgent.notes && (
                  <div>
                    <Label className="text-muted-foreground">Notes</Label>
                    <p className="font-medium">{selectedAgent.notes}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Approve Dialog */}
        <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve Agent</DialogTitle>
              <DialogDescription>
                Set commission rate and approve this agent application
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                <Input
                  id="commissionRate"
                  type="number"
                  min="0"
                  max="100"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Standard commission rate is 10%
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setApproveDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Agent
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Agent</DialogTitle>
              <DialogDescription>
                Provide a reason for rejecting this application
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="rejectionNotes">Rejection Notes</Label>
                <Textarea
                  id="rejectionNotes"
                  value={rejectionNotes}
                  onChange={(e) => setRejectionNotes(e.target.value)}
                  placeholder="Reason for rejection..."
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                className="bg-red-600 hover:bg-red-700"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Agent</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this agent? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                variant="destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Agent
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}