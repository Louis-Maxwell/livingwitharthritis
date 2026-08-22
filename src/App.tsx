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
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { DeferredMount } from "@/components/DeferredMount";
import CanonicalEnforcer from "@/components/CanonicalEnforcer";
import SeoDefaults from "@/components/SeoDefaults";
import RootOrganizationSchema from "@/components/seo/RootOrganizationSchema";
import SkipToContent from "@/components/SkipToContent";
import { COMPARISON_ROUTES } from "@/data/comparison-routes.generated";
import { isPrerenderDocumentReady } from "@/lib/prerenderReady";

// Home is eager — it's the top entry point (~36% of pageviews) so
// shipping it in the main bundle removes a Suspense round-trip on first paint.
import Index from "./pages/Index";
import GuideLayout from "./components/layouts/GuideLayout";
const LocalizedHome = lazy(() => import("./pages/LocalizedHome"));
const LocalizedOsteoarthritis = lazy(() => import("./pages/LocalizedOsteoarthritis"));

const ChatBotWidget = lazy(() => import("./components/ChatBotWidget"));
const CookieBanner = lazy(() => import("./components/landing/CookieBanner"));
const AccessibilityToolbar = lazy(() => import("./components/AccessibilityToolbar"));
const MobileBottomNav = lazy(() => import("./components/MobileBottomNav"));
const MobileNextStepBar = lazy(() => import("./components/MobileNextStepBar"));
const DonationNotification = lazy(() => import("./components/DonationNotification"));
const EngagementTracker = lazy(() => import("./components/EngagementTracker"));


// Lazy load pages for code splitting
const Chat = lazy(() => import("./pages/Chat"));
const Auth = lazy(() => import("./pages/Auth"));
const OAuthConsent = lazy(() => import("./pages/OAuthConsent"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminAppointments = lazy(() => import("./pages/AdminAppointments"));
const AdminPsiDashboard = lazy(() => import("./pages/AdminPsiDashboard"));
const AdminEmails = lazy(() => import("./pages/AdminEmails"));
const AdminSeoHealth = lazy(() => import("./pages/AdminSeoHealth"));
const AdminDistribute = lazy(() => import("./pages/AdminDistribute"));
const AdminRankTracker = lazy(() => import("./pages/AdminRankTracker"));
const AdminKeywordStrategy = lazy(() => import("./pages/AdminKeywordStrategy"));
const AdminContentRefresh = lazy(() => import("./pages/AdminContentRefresh"));
const AdminBacklinks = lazy(() => import("./pages/AdminBacklinks"));
const AdminChatFeedback = lazy(() => import("./pages/AdminChatFeedback"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const Library = lazy(() => import("./pages/Library"));
const LibraryTopic = lazy(() => import("./pages/LibraryTopic"));
const BlogHub = lazy(() => import("./pages/BlogHub"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const DailyTipDetail = lazy(() => import("./pages/DailyTipDetail"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const AITransparency = lazy(() => import("./pages/about/AITransparency"));
const Connect = lazy(() => import("./pages/Connect"));
const Sources = lazy(() => import("./pages/about/Sources"));
const AICitations = lazy(() => import("./pages/about/AICitations"));
const AIGuidelines = lazy(() => import("./pages/about/AIGuidelines"));
const AiHub = lazy(() => import("./pages/AiHub"));
const AccessibilityForAi = lazy(() => import("./pages/about/AccessibilityForAi"));
const Osteoarthritis = lazy(() => import("./pages/conditions/Osteoarthritis"));
const RheumatoidArthritis = lazy(() => import("./pages/conditions/RheumatoidArthritis"));
const PsoriaticArthritis = lazy(() => import("./pages/conditions/PsoriaticArthritis"));
const Gout = lazy(() => import("./pages/conditions/Gout"));
const AnkylosingSpondylitis = lazy(() => import("./pages/conditions/AnkylosingSpondylitis"));
const JuvenileArthritis = lazy(() => import("./pages/conditions/JuvenileArthritis"));
const Fibromyalgia = lazy(() => import("./pages/conditions/Fibromyalgia"));
const Lupus = lazy(() => import("./pages/conditions/Lupus"));
const KneeArthritis = lazy(() => import("./pages/conditions/KneeArthritis"));
const HipArthritis = lazy(() => import("./pages/conditions/HipArthritis"));
const HandArthritis = lazy(() => import("./pages/conditions/HandArthritis"));
const ShoulderArthritis = lazy(() => import("./pages/conditions/ShoulderArthritis"));
const ElbowArthritis = lazy(() => import("./pages/conditions/ElbowArthritis"));
const PolymyalgiaRheumatica = lazy(() => import("./pages/conditions/PolymyalgiaRheumatica"));
const ReactiveArthritis = lazy(() => import("./pages/conditions/ReactiveArthritis"));
const CalcificPeriarthritis = lazy(() => import("./pages/conditions/CalcificPeriarthritis"));
const SelfHelpTool = lazy(() => import("./pages/SelfHelpTool"));
const SymptomChecker = lazy(() => import("./pages/SymptomChecker"));
const ZakatAppeal = lazy(() => import("./pages/ZakatAppeal"));
const ExerciseHub = lazy(() => import("./pages/ExerciseHub"));
const DietHub = lazy(() => import("./pages/DietHub"));
const MediterraneanDietForArthritis = lazy(() => import("./pages/diet/MediterraneanDietForArthritis"));
const FoodsToAvoidWithArthritis = lazy(() => import("./pages/diet/FoodsToAvoidWithArthritis"));
const KneeOsteoarthritisExercises = lazy(() => import("./pages/blog/KneeOsteoarthritisExercises"));
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
const ArthritisPainRelief = lazy(() => import("./pages/guides/ArthritisPainRelief"));
const CanExerciseMakeOsteoarthritisWorse = lazy(() => import("./pages/guides/CanExerciseMakeOsteoarthritisWorse"));
const HipExercisesForOsteoarthritis = lazy(() => import("./pages/guides/HipExercisesForOsteoarthritis"));
const ShoulderPainRelief = lazy(() => import("./pages/guides/ShoulderPainRelief"));
const SteroidsGuide = lazy(() => import("./pages/pillar/SteroidsGuide"));
const AzathioprineGuide = lazy(() => import("./pages/pillar/AzathioprineGuide"));
const FebuxostatGoutGuide = lazy(() => import("./pages/pillar/FebuxostatGoutGuide"));
const PainkillersNsaidsGuide = lazy(() => import("./pages/pillar/PainkillersNsaidsGuide"));
const BenefitsPIPGuide = lazy(() => import("./pages/pillar/BenefitsPIPGuide"));
const KneeReplacementSurgeryGuide = lazy(() => import("./pages/pillar/KneeReplacementSurgeryGuide"));
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
const Gallery = lazy(() => import("./pages/Gallery"));
const Credits = lazy(() => import("./pages/Credits"));
const TaiChiForBalance = lazy(() => import("./pages/exercises/TaiChiForBalance"));
const TaiChiForArthritis = lazy(() => import("./pages/exercises/TaiChiForArthritis"));
const SeatedTaiChiForArthritis = lazy(() => import("./pages/exercises/SeatedTaiChiForArthritis"));
const TaiChiForBeginners = lazy(() => import("./pages/exercises/TaiChiForBeginners"));
const AnkleArthritisExercises = lazy(() => import("./pages/exercises/AnkleArthritisExercises"));
const NeckArthritisExercises = lazy(() => import("./pages/exercises/NeckArthritisExercises"));
const ExerciseConditionPage = lazy(() => import("./pages/ExerciseConditionPage"));
const ConditionSubpagePage = lazy(() => import("./pages/ConditionSubpagePage"));
const CityServicePage = lazy(() => import("./pages/CityServicePage"));
const Pedometer = lazy(() => import("./pages/Pedometer"));
const SelfAssessment = lazy(() => import("./pages/SelfAssessment"));
const Buddy = lazy(() => import("./pages/Buddy"));
const BuddyMatch = lazy(() => import("./pages/BuddyMatch"));
const DebugSchema = lazy(() => import("./pages/DebugSchema"));
const EditorialStandards = lazy(() => import("./pages/EditorialStandards"));
const AuthorProfile = lazy(() => import("./pages/AuthorProfile"));
const SupplementsHub = lazy(() => import("./pages/supplements/SupplementsHub"));
const Glucosamine = lazy(() => import("./pages/supplements/Glucosamine"));
const Msm = lazy(() => import("./pages/supplements/Msm"));
const Turmeric = lazy(() => import("./pages/supplements/Turmeric"));
const Collagen = lazy(() => import("./pages/supplements/Collagen"));
const CollagenAlternatives = lazy(
  () => import("./pages/supplements/CollagenAlternatives"),
);
const LivingWithArthritis = lazy(() => import("./pages/LivingWithArthritis"));
const ArthritisMentalHealth = lazy(() => import("./pages/ArthritisMentalHealth"));
const FaqArticle = lazy(() => import("./pages/FaqArticle"));
const ExpertArticle = lazy(() => import("./pages/ExpertArticle"));
const PatientStory = lazy(() => import("./pages/PatientStory"));
const FrailtyManagementHub = lazy(() => import("./pages/guides/FrailtyManagementHub"));
const SarcopeniaMuscleControl = lazy(() => import("./pages/guides/SarcopeniaMuscleControl"));
const PreventativeMSKHealth = lazy(() => import("./pages/guides/PreventativeMSKHealth"));
const BoneDensityOsteoporosis = lazy(() => import("./pages/guides/BoneDensityOsteoporosis"));
const FallPreventionOlderAdults = lazy(() => import("./pages/guides/FallPreventionOlderAdults"));
const Arthritis = lazy(() => import("./pages/conditions/Arthritis"));
const MusculoskeletalHealth = lazy(() => import("./pages/guides/MusculoskeletalHealth"));
const DisabilitySupport = lazy(() => import("./pages/guides/DisabilitySupport"));
const PetsHub = lazy(() => import("./pages/PetsHub"));
const PetArticle = lazy(() => import("./pages/PetArticle"));
const CorporatePartnerships = lazy(() => import("./pages/CorporatePartnerships"));
const Glossary = lazy(() => import("./pages/Glossary"));
const GlossaryTerm = lazy(() => import("./pages/GlossaryTerm"));
const ComparisonPage = lazy(() => import("./pages/ComparisonPage"));

// Phase 1 / Phase 3 — IA stubs + Newly Diagnosed full guide
const NewlyDiagnosed = lazy(() => import("./pages/guides/NewlyDiagnosed"));
const DrugGuideStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.DrugGuideStub })),
);
const SurgeryStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.SurgeryStub })),
);
const ComplementaryTherapiesStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.ComplementaryTherapiesStub })),
);
const InsuranceStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.InsuranceStub })),
);
const WorkStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.WorkStub })),
);
const TravelStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.TravelStub })),
);
const FindSpecialistStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.FindSpecialistStub })),
);
const ConnectGroupsStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.ConnectGroupsStub })),
);
const EventsStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.EventsStub })),
);
const PodcastsStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.PodcastsStub })),
);
const HelplineStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.HelplineStub })),
);
const VolunteerStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.VolunteerStub })),
);
const AdvocacyStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.AdvocacyStub })),
);
const ResearchStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.ResearchStub })),
);
const ClinicalTrialsStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.ClinicalTrialsStub })),
);
const GrantsStub = lazy(() =>
  import("./pages/stubs").then((m) => ({ default: m.GrantsStub })),
);
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

  // GA4 SPA pageview tracker. GA4 is loaded with send_page_view:false and only
  // after analytics consent, so this sends every pageview — including the first
  // one, which is re-sent when `analytics-ready` fires post-consent.
  useEffect(() => {
    const sendPageView = () => {
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      if (typeof w.gtag !== "function") return;
      w.gtag("event", "page_view", {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
        send_to: "G-ZLLSD3PXZ9",
      });
    };
    sendPageView();
    window.addEventListener("analytics-ready", sendPageView);
    return () => window.removeEventListener("analytics-ready", sendPageView);
  }, [location.pathname, location.search]);


  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        {/* Localized landing pages (ES/FR/DE/PT). Foundation set —
            other localized routes fall through to English until
            translated equivalents exist. */}
        <Route path="/es" element={<LocalizedHome />} />
        <Route path="/fr" element={<LocalizedHome />} />
        <Route path="/de" element={<LocalizedHome />} />
        <Route path="/pt" element={<LocalizedHome />} />
        <Route path="/es/conditions/osteoarthritis" element={<LocalizedOsteoarthritis />} />
        <Route path="/fr/conditions/osteoarthritis" element={<LocalizedOsteoarthritis />} />
        <Route path="/de/conditions/osteoarthritis" element={<LocalizedOsteoarthritis />} />
        <Route path="/pt/conditions/osteoarthritis" element={<LocalizedOsteoarthritis />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/appointments" element={<AdminAppointments />} />
        <Route path="/admin/psi" element={<AdminPsiDashboard />} />
        <Route path="/admin/emails" element={<AdminEmails />} />
        <Route path="/admin/seo-health" element={<AdminSeoHealth />} />
        <Route path="/admin/distribute" element={<AdminDistribute />} />
        <Route path="/admin/rank-tracker" element={<AdminRankTracker />} />
        <Route path="/admin/keyword-strategy" element={<AdminKeywordStrategy />} />
        <Route path="/admin/content-refresh" element={<AdminContentRefresh />} />
        <Route path="/admin/backlinks" element={<AdminBacklinks />} />
        <Route path="/admin/chat-feedback" element={<AdminChatFeedback />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/:slug" element={<LibraryTopic />} />
        <Route path="/blog-hub" element={<BlogHub />} />
        <Route path="/blog/category/:category" element={<BlogCategory />} />
        <Route path="/blog/knee-arthritis-exercises-uk" element={<KneeOsteoarthritisExercises />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/daily-tips/:slug" element={<DailyTipDetail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/about/ai-transparency" element={<AITransparency />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/ai-citations" element={<AICitations />} />
        <Route path="/ai-guidelines" element={<AIGuidelines />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/ai" element={<AiHub />} />
        <Route path="/accessibility-for-ai" element={<AccessibilityForAi />} />
        <Route path="/editorial-standards" element={<EditorialStandards />} />
        <Route path="/authors/:slug" element={<AuthorProfile variant="author" />} />
        <Route path="/reviewers/:slug" element={<AuthorProfile variant="reviewer" />} />
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
        <Route path="/conditions/hip-arthritis" element={<HipArthritis />} />
        <Route path="/conditions/shoulder-arthritis" element={<ShoulderArthritis />} />
        <Route path="/conditions/elbow-arthritis" element={<ElbowArthritis />} />
        <Route path="/conditions/elbow-pain" element={<ElbowArthritis />} />
        <Route path="/conditions/polymyalgia-rheumatica" element={<PolymyalgiaRheumatica />} />
        <Route path="/conditions/reactive-arthritis" element={<ReactiveArthritis />} />
        <Route path="/conditions/calcific-periarthritis" element={<CalcificPeriarthritis />} />
        <Route path="/conditions/calcific-tendinitis" element={<CalcificPeriarthritis />} />
        <Route path="/conditions/axial-spondyloarthritis" element={<AnkylosingSpondylitis />} />
        <Route path="/supplements" element={<SupplementsHub />} />
        <Route path="/supplements/glucosamine" element={<Glucosamine />} />
        <Route path="/supplements/msm" element={<Msm />} />
        <Route path="/supplements/turmeric" element={<Turmeric />} />
        <Route path="/supplements/collagen" element={<Collagen />} />
        <Route
          path="/supplements/collagen-alternatives"
          element={<CollagenAlternatives />}
        />
        <Route path="/living-with-arthritis" element={<LivingWithArthritis />} />
        <Route path="/arthritis-mental-health" element={<ArthritisMentalHealth />} />
        <Route path="/guides/frailty-management-hub" element={<GuideLayout currentPath="/guides/frailty-management-hub"><FrailtyManagementHub /></GuideLayout>} />
        <Route path="/guides/sarcopenia-muscle-loss" element={<GuideLayout currentPath="/guides/sarcopenia-muscle-loss"><SarcopeniaMuscleControl /></GuideLayout>} />
        <Route path="/guides/preventative-msk-health" element={<GuideLayout currentPath="/guides/preventative-msk-health"><PreventativeMSKHealth /></GuideLayout>} />
        <Route path="/guides/bone-density-osteoporosis" element={<GuideLayout currentPath="/guides/bone-density-osteoporosis"><BoneDensityOsteoporosis /></GuideLayout>} />
        <Route path="/guides/fall-prevention-older-adults" element={<GuideLayout currentPath="/guides/fall-prevention-older-adults"><FallPreventionOlderAdults /></GuideLayout>} />
        <Route path="/conditions/arthritis" element={<Arthritis />} />
        <Route path="/guides/musculoskeletal-health" element={<GuideLayout currentPath="/guides/musculoskeletal-health"><MusculoskeletalHealth /></GuideLayout>} />
        <Route path="/guides/disability-support" element={<GuideLayout currentPath="/guides/disability-support"><DisabilitySupport /></GuideLayout>} />
        <Route path="/faq/:slug" element={<FaqArticle />} />
        <Route path="/expert/:slug" element={<ExpertArticle />} />
        <Route path="/stories/:slug" element={<PatientStory />} />
        <Route path="/conditions/:condition/:subpage" element={<ConditionSubpagePage />} />
        <Route path="/self-help" element={<SelfHelpTool />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/exercises" element={<ExerciseHub />} />
        <Route path="/exercises/tai-chi-for-balance" element={<TaiChiForBalance />} />
        <Route path="/exercises/tai-chi-for-arthritis" element={<TaiChiForArthritis />} />
        <Route path="/exercises/seated-tai-chi-for-arthritis" element={<SeatedTaiChiForArthritis />} />
        <Route path="/exercises/tai-chi-for-beginners" element={<TaiChiForBeginners />} />
        <Route path="/exercises/ankle-arthritis-exercises" element={<AnkleArthritisExercises />} />
        <Route path="/exercises/neck-arthritis-exercises" element={<NeckArthritisExercises />} />
        <Route path="/diet" element={<DietHub />} />
        <Route path="/diet/mediterranean-diet-for-arthritis" element={<MediterraneanDietForArthritis />} />
        <Route path="/diet/foods-to-avoid-with-arthritis" element={<FoodsToAvoidWithArthritis />} />
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
        <Route path="/exercises/:joint/for/:condition" element={<ExerciseConditionPage />} />
        <Route path="/uk/:city/:service" element={<CityServicePage />} />
        <Route path="/exercises/:slug" element={<ExerciseJointPage />} />
        <Route path="/site-index" element={<Sitemap />} />
        <Route path="/corporate-giving" element={<CorporateGiving />} />
        <Route path="/donation-result" element={<DonationSuccess />} />
        <Route path="/donation-result/success" element={<DonationSuccess />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route path="/governance" element={<Governance />} />
        
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
        <Route path="/guides/arthritis-pain-relief" element={<ArthritisPainRelief />} />
        <Route path="/guides/can-exercise-make-osteoarthritis-worse" element={<CanExerciseMakeOsteoarthritisWorse />} />
        <Route path="/guides/hip-exercises-for-osteoarthritis" element={<HipExercisesForOsteoarthritis />} />
        <Route path="/guides/shoulder-pain-relief" element={<ShoulderPainRelief />} />
        <Route path="/guides/benefits-pip" element={<BenefitsPIPGuide />} />
        <Route path="/guides/knee-replacement-surgery" element={<KneeReplacementSurgeryGuide />} />
        <Route path="/guides/steroids-for-arthritis" element={<SteroidsGuide />} />
        <Route path="/guides/azathioprine-for-arthritis" element={<AzathioprineGuide />} />
        <Route path="/guides/febuxostat-for-gout" element={<FebuxostatGoutGuide />} />
        <Route path="/guides/painkillers-and-nsaids" element={<PainkillersNsaidsGuide />} />
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
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/self-assessment" element={<SelfAssessment />} />
        <Route path="/buddy" element={<Buddy />} />
        <Route path="/buddy/match" element={<BuddyMatch />} />
        <Route path="/debug/schema" element={<DebugSchema />} />

        {/* Phase 1 — 5-pillar IA stubs + Newly Diagnosed full guide */}
        <Route path="/guides/newly-diagnosed" element={<GuideLayout currentPath="/guides/newly-diagnosed"><NewlyDiagnosed /></GuideLayout>} />
        <Route path="/treatments/drug-guide" element={<DrugGuideStub />} />
        <Route path="/treatments/surgery-options" element={<SurgeryStub />} />
        <Route path="/treatments/complementary-therapies" element={<ComplementaryTherapiesStub />} />
        <Route path="/guides/insurance-coverage" element={<InsuranceStub />} />
        <Route path="/guides/work-with-arthritis" element={<WorkStub />} />
        <Route path="/guides/travel-with-arthritis" element={<TravelStub />} />
        <Route path="/tools/find-specialist" element={<FindSpecialistStub />} />
        <Route path="/community/connect-groups" element={<ConnectGroupsStub />} />
        <Route path="/events" element={<EventsStub />} />
        <Route path="/podcasts" element={<PodcastsStub />} />
        <Route path="/helpline" element={<HelplineStub />} />
        <Route path="/volunteer" element={<VolunteerStub />} />
        <Route path="/advocacy" element={<AdvocacyStub />} />
        <Route path="/research" element={<ResearchStub />} />
        <Route path="/research/clinical-trials" element={<ClinicalTrialsStub />} />
        <Route path="/research/grants" element={<GrantsStub />} />

        <Route path="/pets" element={<PetsHub />} />
        <Route path="/pets/:slug" element={<PetArticle />} />
        <Route path="/corporate-partnerships" element={<CorporatePartnerships />} />

        <Route path="/glossary" element={<Glossary />} />
        <Route path="/glossary/:term" element={<GlossaryTerm />} />

        {/* Auto-generated comparison guides (COMPARISON_ROUTES). Registered
            explicitly so they don't fight the /guides/* catch-alls above. */}
        {COMPARISON_ROUTES.map((path) => (
          <Route key={path} path={path} element={<ComparisonPage />} />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
}

function AppWithSync() {
  useCartSync();
  useLinkPrefetch();
  useScrollDepth();
  const location = useLocation();

  // Signal the prerender renderer (@prerenderer/renderer-puppeteer) that the
  // route's React tree — including JSON-LD injected via useEffect — has
  // settled and document.head is ready to be snapshotted into static HTML.
  useEffect(() => {
    const startedAt = Date.now();
    const maxWaitMs = 30_000;
    let interval: number | undefined;

    const fire = () => {
      if (interval !== undefined) window.clearInterval(interval);
      document.dispatchEvent(new Event("prerender-ready"));
    };

    const check = () => {
      if (isPrerenderDocumentReady(document, location.pathname)) {
        // Helmet updates title/meta in a microtask after the route commits.
        window.setTimeout(fire, 50);
        return;
      }
      if (Date.now() - startedAt >= maxWaitMs) {
        console.warn(
          `[prerender] timed out waiting for route metadata: ${location.pathname}`,
        );
        fire();
      }
    };

    interval = window.setInterval(check, 100);
    check();

    return () => {
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [location.pathname]);

  return (
    <>
      <SkipToContent />
      <CanonicalEnforcer />
      <RootOrganizationSchema />
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
              <SeoDefaults />
              <Suspense fallback={null}>
                <AppWithSync />
              </Suspense>
              <DeferredMount timeout={1200}>
                <Suspense fallback={null}>
                  <EngagementTracker />
                  <CookieBanner />
                  <MobileBottomNav />
                  <MobileNextStepBar />
                  <AccessibilityToolbar />
                </Suspense>
              </DeferredMount>
              <DeferredMount timeout={4000}>
                <Suspense fallback={null}>
                  <ChatBotWidget />
                  <DonationNotification />
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
