// src/components/agent/ProtectedAgentRoute.tsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

interface ProtectedAgentRouteProps {
  children: React.ReactNode;
}

/**
 * Protected Route Component for Agent Dashboard
 * 
 * This component checks localStorage for agent authentication
 * and only allows access if user has role: "agent"
 */
export default function ProtectedAgentRoute({
  children,
}: ProtectedAgentRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Check localStorage for agent data
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const agentLoggedIn = localStorage.getItem("agentLoggedIn");

    console.log("🔍 ProtectedAgentRoute - Checking authorization");
    console.log("   User data:", userStr);
    console.log("   Token:", token ? "exists" : "missing");
    console.log("   Agent logged in:", agentLoggedIn);

    if (!userStr || !token) {
      console.log("❌ No user or token found");
      setIsAuthorized(false);
      return;
    }

    try {
      const user = JSON.parse(userStr);
      console.log("👤 User from localStorage:", user);
      console.log("👤 User role:", user.role);

      // Check if user has agent role
      if (user.role === "agent" && agentLoggedIn === "true") {
        console.log("✅ User is authorized as agent");
        setIsAuthorized(true);
      } else {
        console.log("❌ User role is not 'agent' or not logged in as agent");
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("❌ Error parsing user data:", error);
      setIsAuthorized(false);
    }
  }, []);

  // Loading state
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-slate-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Not authorized
  if (!isAuthorized) {
    console.log("🚀 Redirecting to /agent/login - not authorized");
    return <Navigate to="/agent/login" replace />;
  }

  // Authorized - render dashboard
  console.log("🎉 Rendering agent dashboard");
  return <>{children}</>;
}