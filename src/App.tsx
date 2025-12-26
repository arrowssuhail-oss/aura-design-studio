import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FintechDashboard from "./pages/projects/FintechDashboard";
import BrandIdentity from "./pages/projects/BrandIdentity";
import EcommercePlatform from "./pages/projects/EcommercePlatform";
import MobileAppDesign from "./pages/projects/MobileAppDesign";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/fintech-dashboard" element={<FintechDashboard />} />
          <Route path="/projects/brand-identity" element={<BrandIdentity />} />
          <Route path="/projects/ecommerce-platform" element={<EcommercePlatform />} />
          <Route path="/projects/mobile-app-design" element={<MobileAppDesign />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;