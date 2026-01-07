import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { RedirectToSignIn, RedirectToSignUp } from "@clerk/clerk-react";
import Index from "@/pages/Index";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import HumanCenteredDesign from "@/pages/projects/ux design";
import Identity from "@/pages/projects/graphicdesign";
import WebDesign from "@/pages/projects/webdesign";
import VideoEditing from "@/pages/projects/videoediting";

import Dashboard from "@/pages/Dashboard";
import Payments from "@/pages/Payments";
import Legal from "@/pages/Legal";
import UnderDevelopment from "@/pages/UnderDevelopment";
import Game from "@/pages/Game";
import Ghost from "@/pages/Ghost";
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
            {/* <Route path="/game" element={<Game />} />
            <Route path="/ghost" element={<Ghost />} /> */}
            <Route path="/login" element={<RedirectToSignIn />} />
            <Route path="/signup" element={<RedirectToSignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects/ui-ux-design" element={<HumanCenteredDesign />} />
            <Route path="/projects/identity" element={<Identity />} />
            <Route path="/projects/webdesign" element={<WebDesign />} />
            <Route path="/projects/video-editing" element={<VideoEditing />} />
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