import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/ui/PageTransition";
import { RouteProgressBar } from "@/components/ui/RouteProgressBar";
import { useCartSync } from "@/hooks/useCartSync";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import SplashScreen from "@/components/SplashScreen";

const ChatBotWidget = lazy(() => import("./components/ChatBotWidget"));
const CookieConsent = lazy(() => import("./components/CookieConsent"));
const AccessibilityToolbar = lazy(() => import("./components/AccessibilityToolbar"));
const MobileBottomNav = lazy(() => import("./components/MobileBottomNav"));


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
const ExerciseHub = lazy(() => import("./pages/ExerciseHub"));
const DietHub = lazy(() => import("./pages/DietHub"));
const TrustCredibility = lazy(() => import("./pages/TrustCredibility"));
const CommunityHub = lazy(() => import("./pages/CommunityHub"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const AccessibilityPage = lazy(() => import("./pages/Accessibility"));
const PainJournal = lazy(() => import("./pages/PainJournal"));
const ArthritisFlareUps = lazy(() => import("./pages/ArthritisFlareUps"));
const BlogCategory = lazy(() => import("./pages/BlogCategory"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ArthritisSupportIndex = lazy(() => import("./pages/ArthritisSupportIndex"));
const CityArthritisPage = lazy(() => import("./pages/CityArthritisPage"));
const ExerciseJointPage = lazy(() => import("./pages/ExerciseJointPage"));
const CorporateGiving = lazy(() => import("./pages/CorporateGiving"));
const DonationSuccess = lazy(() => import("./pages/DonationSuccess"));
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
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/appointments" element={<AdminAppointments />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/category/:category" element={<BlogCategory />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/daily-tips/:slug" element={<DailyTipDetail />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/conditions/osteoarthritis" element={<Osteoarthritis />} />
          <Route path="/conditions/rheumatoid-arthritis" element={<RheumatoidArthritis />} />
          <Route path="/conditions/psoriatic-arthritis" element={<PsoriaticArthritis />} />
          <Route path="/self-help" element={<SelfHelpTool />} />
          <Route path="/exercises" element={<ExerciseHub />} />
          <Route path="/diet" element={<DietHub />} />
          <Route path="/zakat-appeal" element={<ZakatAppeal />} />
          <Route path="/trust" element={<TrustCredibility />} />
          <Route path="/community" element={<CommunityHub />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/pain-journal" element={<PainJournal />} />
          <Route path="/arthritis-flare-ups" element={<ArthritisFlareUps />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/arthritis-support" element={<ArthritisSupportIndex />} />
          <Route path="/arthritis-support/:city" element={<CityArthritisPage />} />
          <Route path="/exercises/:slug" element={<ExerciseJointPage />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/corporate-giving" element={<CorporateGiving />} />
          <Route path="/donation-result" element={<DonationSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

function AppWithSync() {
  useCartSync();
  return (
    <>
      <RouteProgressBar />
      <AnimatedRoutes />
    </>
  );
}

const App = () => {
  const [splashDone, setSplashDone] = useState(() => sessionStorage.getItem("splash-done") === "true");

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
    sessionStorage.setItem("splash-done", "true");
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <AppWithSync />
              </Suspense>
              <Suspense fallback={null}>
                <ChatBotWidget />
              </Suspense>
              <Suspense fallback={null}>
                <CookieConsent />
              </Suspense>
              <Suspense fallback={null}>
                <AccessibilityToolbar />
              </Suspense>
              <Suspense fallback={null}>
                <MobileBottomNav />
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
