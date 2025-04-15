
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const App = () => (
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
          <Route path="/new-donation" element={<NewDonation />} />
          <Route path="/my-donations" element={<MyDonations />} />
          <Route path="/edit-donation/:id" element={<EditDonation />} />
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

export default App;
