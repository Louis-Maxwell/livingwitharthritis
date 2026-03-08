import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

const ChatBotWidget = lazy(() => import("./components/ChatBotWidget"));
const CookieConsent = lazy(() => import("./components/CookieConsent"));


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
const ZakatAppeal = lazy(() => import("./pages/ZakatAppeal"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const AccessibilityPage = lazy(() => import("./pages/Accessibility"));
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
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Index />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/appointments" element={<AdminAppointments />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/daily-tips/:slug" element={<DailyTipDetail />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/conditions/osteoarthritis" element={<Osteoarthritis />} />
      <Route path="/conditions/rheumatoid-arthritis" element={<RheumatoidArthritis />} />
      <Route path="/conditions/psoriatic-arthritis" element={<PsoriaticArthritis />} />
      <Route path="/self-help" element={<SelfHelpTool />} />
      <Route path="/zakat-appeal" element={<ZakatAppeal />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/cookies" element={<CookiesPolicy />} />
      <Route path="/accessibility" element={<AccessibilityPage />} />
      <Route path="/shop" element={<NotFound />} />
      <Route path="/sitemap" element={<Sitemap />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
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
          <Suspense fallback={null}>
            <ChatBotWidget />
          </Suspense>
          <Suspense fallback={null}>
            <CookieConsent />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
