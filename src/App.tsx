import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "@/pages/Index";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import FintechDashboard from "@/pages/projects/ui/ux design";
import BrandIdentity from "@/pages/projects/graphicdesign";
import EcommercePlatform from "@/pages/projects/webdesign";
import MobileAppDesign from "@/pages/projects/videoediting";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import Payments from "@/pages/Payments";
import { AuthProvider } from "@/context/AuthContext";
import ChatBot from "@/components/ChatBot";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Component to handle hash scrolling
const ScrollToAnchor = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace("#", "");

      const scrollToElement = () => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };

      // Try immediately
      if (scrollToElement()) return;

      // Poll for the element if not found immediately
      const intervalId = setInterval(() => {
        if (scrollToElement()) {
          clearInterval(intervalId);
        }
      }, 100);

      // Stop trying after 2 seconds
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
      }, 2000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToAnchor />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects/fintech-dashboard" element={<FintechDashboard />} />
            <Route path="/projects/brand-identity" element={<BrandIdentity />} />
            <Route path="/projects/ecommerce-platform" element={<EcommercePlatform />} />
            <Route path="/projects/mobile-app-design" element={<MobileAppDesign />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;