import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

// Defer Sonner toaster — it triggers layout reads on mount that cause forced reflow
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));
import { PageTransition } from "@/components/ui/PageTransition";
import { useCartSync } from "@/hooks/useCartSync";
import { useLinkPrefetch } from "@/hooks/useLinkPrefetch";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { DeferredMount } from "@/components/DeferredMount";
import CanonicalEnforcer from "@/components/CanonicalEnforcer";

// Home is eager — it's the top entry point (~36% of pageviews) so
// shipping it in the main bundle removes a Suspense round-trip on first paint.
import Index from "./pages/Index";

const ChatBotWidget = lazy(() => import("./components/ChatBotWidget"));
const CookieConsent = lazy(() => import("./components/CookieConsent"));
const AccessibilityToolbar = lazy(() => import("./components/AccessibilityToolbar"));
const MobileBottomNav = lazy(() => import("./components/MobileBottomNav"));
const MobileNextStepBar = lazy(() => import("./components/MobileNextStepBar"));
const DonationNotification = lazy(() => import("./components/DonationNotification"));
const ExitIntentModal = lazy(() => import("./components/ExitIntentModal"));
const EngagementTracker = lazy(() => import("./components/EngagementTracker"));


// Lazy load pages for code splitting
const Chat = lazy(() => import("./pages/Chat"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminAppointments = lazy(() => import("./pages/AdminAppointments"));
const AdminPsiDashboard = lazy(() => import("./pages/AdminPsiDashboard"));
const AdminEmails = lazy(() => import("./pages/AdminEmails"));
const AdminSeoHealth = lazy(() => import("./pages/AdminSeoHealth"));
const AdminDistribute = lazy(() => import("./pages/AdminDistribute"));
const AdminRankTracker = lazy(() => import("./pages/AdminRankTracker"));
const AdminContentRefresh = lazy(() => import("./pages/AdminContentRefresh"));
const AdminBacklinks = lazy(() => import("./pages/AdminBacklinks"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const Library = lazy(() => import("./pages/Library"));
const LibraryTopic = lazy(() => import("./pages/LibraryTopic"));
const BlogHub = lazy(() => import("./pages/BlogHub"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const DailyTipDetail = lazy(() => import("./pages/DailyTipDetail"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Osteoarthritis = lazy(() => import("./pages/conditions/Osteoarthritis"));
const RheumatoidArthritis = lazy(() => import("./pages/conditions/RheumatoidArthritis"));
const PsoriaticArthritis = lazy(() => import("./pages/conditions/PsoriaticArthritis"));
const Gout = lazy(() => import("./pages/conditions/Gout"));
const AnkylosingSpondylitis = lazy(() => import("./pages/conditions/AnkylosingSpondylitis"));
const JuvenileArthritis = lazy(() => import("./pages/conditions/JuvenileArthritis"));
const Fibromyalgia = lazy(() => import("./pages/conditions/Fibromyalgia"));
const Lupus = lazy(() => import("./pages/conditions/Lupus"));
const KneeArthritis = lazy(() => import("./pages/conditions/KneeArthritis"));
const HandArthritis = lazy(() => import("./pages/conditions/HandArthritis"));
const ShoulderArthritis = lazy(() => import("./pages/conditions/ShoulderArthritis"));
const PolymyalgiaRheumatica = lazy(() => import("./pages/conditions/PolymyalgiaRheumatica"));
const ReactiveArthritis = lazy(() => import("./pages/conditions/ReactiveArthritis"));
const SelfHelpTool = lazy(() => import("./pages/SelfHelpTool"));
const ZakatAppeal = lazy(() => import("./pages/ZakatAppeal"));
const ExerciseHub = lazy(() => import("./pages/ExerciseHub"));
const DietHub = lazy(() => import("./pages/DietHub"));
const MediterraneanDietForArthritis = lazy(() => import("./pages/diet/MediterraneanDietForArthritis"));
const DoesCrackingKnucklesCauseArthritis = lazy(() => import("./pages/myths/DoesCrackingKnucklesCauseArthritis"));
const TrustCredibility = lazy(() => import("./pages/TrustCredibility"));
const CommunityHub = lazy(() => import("./pages/CommunityHub"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const AccessibilityPage = lazy(() => import("./pages/Accessibility"));

const ArthritisFlareUps = lazy(() => import("./pages/ArthritisFlareUps"));
const BlogCategory = lazy(() => import("./pages/BlogCategory"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ArthritisSupportIndex = lazy(() => import("./pages/ArthritisSupportIndex"));
const CityArthritisPage = lazy(() => import("./pages/CityArthritisPage"));
const CityConditionPage = lazy(() => import("./pages/CityConditionPage"));
const ExerciseJointPage = lazy(() => import("./pages/ExerciseJointPage"));
const CorporateGiving = lazy(() => import("./pages/CorporateGiving"));
const DonationSuccess = lazy(() => import("./pages/DonationSuccess"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const Governance = lazy(() => import("./pages/Governance"));
const Finances = lazy(() => import("./pages/Finances"));
const ImpactStories = lazy(() => import("./pages/ImpactStories"));
const WaysToHelp = lazy(() => import("./pages/WaysToHelp"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const Safeguarding = lazy(() => import("./pages/Safeguarding"));
const Complaints = lazy(() => import("./pages/Complaints"));
const Donate = lazy(() => import("./pages/Donate"));
const UKArthritisGuide = lazy(() => import("./pages/pillar/UKArthritisGuide"));
const HealthServicesGuide = lazy(() => import("./pages/pillar/HealthServicesGuide"));
const DietGuide = lazy(() => import("./pages/pillar/DietGuide"));
const ExerciseGuide = lazy(() => import("./pages/pillar/ExerciseGuide"));
const BenefitsPIPGuide = lazy(() => import("./pages/pillar/BenefitsPIPGuide"));
const Press = lazy(() => import("./pages/Press"));
const Partners = lazy(() => import("./pages/Partners"));
const LivedExperiences = lazy(() => import("./pages/LivedExperiences"));
const ExpertArticles = lazy(() => import("./pages/ExpertArticles"));
const ResourceDirectory = lazy(() => import("./pages/ResourceDirectory"));
const HealthTools = lazy(() => import("./pages/HealthTools"));
const Services = lazy(() => import("./pages/Services"));
const FAQ = lazy(() => import("./pages/FAQ"));

const Contact = lazy(() => import("./pages/Contact"));
const RegionHub = lazy(() => import("./pages/regions/RegionHub"));
const WaitingListHelp = lazy(() => import("./pages/WaitingListHelp"));
const WaitingTimeCalculator = lazy(() => import("./pages/tools/WaitingTimeCalculator"));
const ArthritisStarterGuide = lazy(() => import("./pages/ArthritisStarterGuide"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Credits = lazy(() => import("./pages/Credits"));
const TaiChiForBalance = lazy(() => import("./pages/exercises/TaiChiForBalance"));
const TaiChiForArthritis = lazy(() => import("./pages/exercises/TaiChiForArthritis"));
const SeatedTaiChiForArthritis = lazy(() => import("./pages/exercises/SeatedTaiChiForArthritis"));
const TaiChiForBeginners = lazy(() => import("./pages/exercises/TaiChiForBeginners"));
const ExerciseConditionPage = lazy(() => import("./pages/ExerciseConditionPage"));
const Pedometer = lazy(() => import("./pages/Pedometer"));
const SelfAssessment = lazy(() => import("./pages/SelfAssessment"));
const Buddy = lazy(() => import("./pages/Buddy"));
const BuddyMatch = lazy(() => import("./pages/BuddyMatch"));
const NewsletterConfirm = lazy(() => import("./pages/NewsletterConfirm"));
const DebugSchema = lazy(() => import("./pages/DebugSchema"));
// No visible loader — Suspense falls back to null so the previous page
// (or blank background) stays visible until the next chunk is ready,
// avoiding the spinner flash on first paint.


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
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/appointments" element={<AdminAppointments />} />
        <Route path="/admin/psi" element={<AdminPsiDashboard />} />
        <Route path="/admin/emails" element={<AdminEmails />} />
        <Route path="/admin/seo-health" element={<AdminSeoHealth />} />
        <Route path="/admin/distribute" element={<AdminDistribute />} />
        <Route path="/admin/rank-tracker" element={<AdminRankTracker />} />
        <Route path="/admin/content-refresh" element={<AdminContentRefresh />} />
        <Route path="/admin/backlinks" element={<AdminBacklinks />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/:slug" element={<LibraryTopic />} />
        <Route path="/blog-hub" element={<BlogHub />} />
        <Route path="/blog/category/:category" element={<BlogCategory />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/daily-tips/:slug" element={<DailyTipDetail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/conditions/osteoarthritis" element={<Osteoarthritis />} />
        <Route path="/conditions/rheumatoid-arthritis" element={<RheumatoidArthritis />} />
        <Route path="/conditions/psoriatic-arthritis" element={<PsoriaticArthritis />} />
        <Route path="/conditions/gout" element={<Gout />} />
        <Route path="/conditions/ankylosing-spondylitis" element={<AnkylosingSpondylitis />} />
        <Route path="/conditions/juvenile-arthritis" element={<JuvenileArthritis />} />
        <Route path="/conditions/fibromyalgia" element={<Fibromyalgia />} />
        <Route path="/conditions/lupus" element={<Lupus />} />
        <Route path="/conditions/knee-arthritis" element={<KneeArthritis />} />
        <Route path="/conditions/hand-arthritis" element={<HandArthritis />} />
        <Route path="/conditions/shoulder-arthritis" element={<ShoulderArthritis />} />
        <Route path="/conditions/polymyalgia-rheumatica" element={<PolymyalgiaRheumatica />} />
        <Route path="/conditions/reactive-arthritis" element={<ReactiveArthritis />} />
        <Route path="/self-help" element={<SelfHelpTool />} />
        <Route path="/exercises" element={<ExerciseHub />} />
        <Route path="/exercises/tai-chi-for-balance" element={<TaiChiForBalance />} />
        <Route path="/exercises/tai-chi-for-arthritis" element={<TaiChiForArthritis />} />
        <Route path="/exercises/seated-tai-chi-for-arthritis" element={<SeatedTaiChiForArthritis />} />
        <Route path="/exercises/tai-chi-for-beginners" element={<TaiChiForBeginners />} />
        <Route path="/diet" element={<DietHub />} />
        <Route path="/diet/mediterranean-diet-for-arthritis" element={<MediterraneanDietForArthritis />} />
        <Route path="/myths/does-cracking-knuckles-cause-arthritis" element={<DoesCrackingKnucklesCauseArthritis />} />
        <Route path="/zakat-appeal" element={<ZakatAppeal />} />
        <Route path="/trust" element={<TrustCredibility />} />
        <Route path="/community" element={<CommunityHub />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiesPolicy />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
        
        <Route path="/arthritis-flare-ups" element={<ArthritisFlareUps />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:handle" element={<ProductDetail />} />
        <Route path="/arthritis-support" element={<ArthritisSupportIndex />} />
        <Route path="/arthritis-support/:city" element={<CityArthritisPage />} />
        <Route path="/arthritis-support/:city/:condition" element={<CityConditionPage />} />
        <Route path="/exercises/:joint/for-:condition" element={<ExerciseConditionPage />} />
        <Route path="/exercises/:slug" element={<ExerciseJointPage />} />
        <Route path="/site-index" element={<Sitemap />} />
        <Route path="/corporate-giving" element={<CorporateGiving />} />
        <Route path="/donation-result" element={<DonationSuccess />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/finances" element={<Finances />} />
        <Route path="/impact" element={<ImpactStories />} />
        <Route path="/ways-to-help" element={<WaysToHelp />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/safeguarding" element={<Safeguarding />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/guides/uk-arthritis" element={<UKArthritisGuide />} />
        <Route path="/guides/health-services" element={<HealthServicesGuide />} />
        <Route path="/guides/diet" element={<DietGuide />} />
        <Route path="/guides/exercise" element={<ExerciseGuide />} />
        <Route path="/guides/benefits-pip" element={<BenefitsPIPGuide />} />
        <Route path="/press" element={<Press />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/stories" element={<LivedExperiences />} />
        <Route path="/expert-articles" element={<ExpertArticles />} />
        <Route path="/resources-directory" element={<ResourceDirectory />} />
        <Route path="/health-tools" element={<HealthTools />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<FAQ />} />
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/regions/:region" element={<RegionHub />} />
        <Route path="/arthritis-waiting-list-help" element={<WaitingListHelp />} />
        <Route path="/tools/waiting-time" element={<WaitingTimeCalculator />} />
        <Route path="/pedometer" element={<Pedometer />} />
        <Route path="/arthritis-starter-guide" element={<ArthritisStarterGuide />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/self-assessment" element={<SelfAssessment />} />
        <Route path="/buddy" element={<Buddy />} />
        <Route path="/buddy/match" element={<BuddyMatch />} />
        <Route path="/newsletter/confirm" element={<NewsletterConfirm />} />
        <Route path="/debug/schema" element={<DebugSchema />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
}

function AppWithSync() {
  useCartSync();
  useLinkPrefetch();
  const location = useLocation();

  // Signal the prerender renderer (@prerenderer/renderer-puppeteer) that the
  // route's React tree — including JSON-LD injected via useEffect — has
  // settled and document.head is ready to be snapshotted into static HTML.
  useEffect(() => {
    const fire = () => {
      document.dispatchEvent(new Event("prerender-ready"));
    };
    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }).requestIdleCallback;
    const id = ric
      ? ric(fire, { timeout: 1200 })
      : (window.setTimeout(fire, 600) as unknown as number);
    return () => {
      const cic = (window as unknown as {
        cancelIdleCallback?: (id: number) => void;
      }).cancelIdleCallback;
      if (cic) cic(id);
      else window.clearTimeout(id);
    };
  }, [location.pathname]);

  return (
    <>
      <CanonicalEnforcer />
      <AnimatedRoutes />
    </>
  );
}

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <DeferredMount timeout={2000}>
              <Suspense fallback={null}>
                <Sonner />
              </Suspense>
            </DeferredMount>
            <BrowserRouter>
              <Suspense fallback={null}>
                <AppWithSync />
              </Suspense>
              <DeferredMount timeout={1200}>
                <Suspense fallback={null}>
                  <EngagementTracker />
                  <CookieConsent />
                  <MobileBottomNav />
                  <MobileNextStepBar />
                  <AccessibilityToolbar />
                </Suspense>
              </DeferredMount>
              <DeferredMount timeout={4000}>
                <Suspense fallback={null}>
                  <ChatBotWidget />
                  <DonationNotification />
                  <ExitIntentModal />
                </Suspense>
              </DeferredMount>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
