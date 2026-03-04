import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/ui/PageTransition";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const Chat = lazy(() => import("./pages/Chat"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminAppointments = lazy(() => import("./pages/AdminAppointments"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const DailyTipDetail = lazy(() => import("./pages/DailyTipDetail"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Osteoarthritis = lazy(() => import("./pages/conditions/Osteoarthritis"));
const RheumatoidArthritis = lazy(() => import("./pages/conditions/RheumatoidArthritis"));
const PsoriaticArthritis = lazy(() => import("./pages/conditions/PsoriaticArthritis"));
const SelfHelpTool = lazy(() => import("./pages/SelfHelpTool"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback with skeleton-style animation
const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
    <div className="relative">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-7 w-7 border-3 border-primary border-t-transparent" />
      </div>
    </div>
    <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
  </div>
);

// Optimized QueryClient with caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/chat" element={<PageTransition><Chat /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
        <Route path="/admin/appointments" element={<PageTransition><AdminAppointments /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><BlogIndex /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/daily-tips/:slug" element={<PageTransition><DailyTipDetail /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} />
        <Route path="/conditions/osteoarthritis" element={<PageTransition><Osteoarthritis /></PageTransition>} />
        <Route path="/conditions/rheumatoid-arthritis" element={<PageTransition><RheumatoidArthritis /></PageTransition>} />
        <Route path="/conditions/psoriatic-arthritis" element={<PageTransition><PsoriaticArthritis /></PageTransition>} />
        <Route path="/self-help" element={<PageTransition><SelfHelpTool /></PageTransition>} />
        <Route path="/sitemap" element={<PageTransition><Sitemap /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
