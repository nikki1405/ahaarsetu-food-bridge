
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Login from "./pages/login";
import Register from "./pages/register";
import DonorDashboard from "./pages/donor-dashboard";
import ReceiverDashboard from "./pages/receiver-dashboard";
import MyDonations from "./pages/my-donations";
import EditDonation from "./pages/edit-donation";
import DonationDetails from "./pages/donation-details";
import NewDonation from "./pages/new-donation";
import About from "./pages/about";
import Contact from "./pages/contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Route protection based on user role
const ProtectedDonorRoute = ({ children }: { children: React.ReactNode }) => {
  // In a real app, this would check authentication state from context/store
  const userRole = localStorage.getItem("userRole") || "";
  
  if (userRole !== "donor") {
    return <Navigate to="/receiver-dashboard" />;
  }
  
  return <>{children}</>;
};

const App = () => {
  // For demo purposes, let's check if we're on a receiver page to set the role
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    // This is just for demo - in a real app, this would come from auth
    const path = window.location.pathname;
    if (path.includes("receiver") && !localStorage.getItem("userRole")) {
      localStorage.setItem("userRole", "receiver");
    } else if (path.includes("donor") && !localStorage.getItem("userRole")) {
      localStorage.setItem("userRole", "donor");
    }
    setInitialized(true);
  }, []);
  
  if (!initialized) {
    return null; // Prevent flash of wrong content
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
            <Route path="/receiver-dashboard" element={<ReceiverDashboard />} />
            
            {/* Protected Donor Routes */}
            <Route path="/new-donation" element={
              <ProtectedDonorRoute>
                <NewDonation />
              </ProtectedDonorRoute>
            } />
            <Route path="/my-donations" element={
              <ProtectedDonorRoute>
                <MyDonations />
              </ProtectedDonorRoute>
            } />
            <Route path="/edit-donation/:id" element={
              <ProtectedDonorRoute>
                <EditDonation />
              </ProtectedDonorRoute>
            } />
            
            <Route path="/donation/:id" element={<DonationDetails />} />
            <Route path="/food-map" element={<Navigate to="/receiver-dashboard" />} /> {/* Temporary redirect until food-map is created */}
            <Route path="/my-requests" element={<Navigate to="/receiver-dashboard" />} /> {/* Temporary redirect until my-requests is created */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
