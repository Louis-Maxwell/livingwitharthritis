import { lazyWithRetry } from "@/lib/chunkRecovery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import SeoRedirectGate from "./components/SeoRedirectGate";
import { Suspense, useEffect, type ReactNode } from "react";

// Defer Sonner toaster — it triggers layout reads on mount that cause forced reflow
const Sonner = lazyWithRetry(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));
// Radix toast viewport: also deferred. use-toast keeps queued toasts in memory,
// so anything fired before it mounts still appears.
const Toaster = lazyWithRetry(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
import { PageTransition } from "@/components/ui/PageTransition";
import { useLinkPrefetch } from "@/hooks/useLinkPrefetch";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { DeferredMount } from "@/components/DeferredMount";
import SeoDefaults from "@/components/SeoDefaults";
import RootOrganizationSchema from "@/components/seo/RootOrganizationSchema";
import SkipToContent from "@/components/SkipToContent";
import RouteFocus from "@/components/RouteFocus";
import { COMPARISON_ROUTES } from "@/data/comparison-routes.generated";
import { isPrerenderDocumentReady } from "@/lib/prerenderReady";
import ErrorBoundary from "@/components/ErrorBoundary";

// Home is eager — it's the top entry point (~36% of pageviews) so
// shipping it in the main bundle removes a Suspense round-trip on first paint.
import Index from "./pages/Index";
import GuideLayout from "./components/layouts/GuideLayout";
const LocalizedHome = lazyWithRetry(() => import("./pages/LocalizedHome"));
const LocalizedOsteoarthritis = lazyWithRetry(() => import("./pages/LocalizedOsteoarthritis"));
const DonateClickStats = lazyWithRetry(() => import("./pages/DonateClickStats"));

const ChatBotWidget = lazyWithRetry(() => import("./components/ChatBotWidget"));
const CookieBanner = lazyWithRetry(() => import("./components/landing/CookieBanner"));
const AccessibilityToolbar = lazyWithRetry(() => import("./components/AccessibilityToolbar"));
const MobileBottomNav = lazyWithRetry(() => import("./components/MobileBottomNav"));
const MobileNextStepBar = lazyWithRetry(() => import("./components/MobileNextStepBar"));
const EngagementTracker = lazyWithRetry(() => import("./components/EngagementTracker"));


// Lazy load pages for code splitting
const Chat = lazyWithRetry(() => import("./pages/Chat"));
const BlogIndex = lazyWithRetry(() => import("./pages/BlogIndex"));
const BlogArchive = lazyWithRetry(() => import("./pages/BlogArchive"));
const Library = lazyWithRetry(() => import("./pages/Library"));
const GuidesHub = lazyWithRetry(() => import("./pages/GuidesHub"));
const BenefitsPipHub = lazyWithRetry(() => import("./pages/BenefitsPipHub"));
const SearchPage = lazyWithRetry(() => import("./pages/SearchPage"));
const LibraryTopic = lazyWithRetry(() => import("./pages/LibraryTopic"));
const BlogHub = lazyWithRetry(() => import("./pages/BlogHub"));
const BlogPost = lazyWithRetry(() => import("./pages/BlogPost"));
const Sitemap = lazyWithRetry(() => import("./pages/Sitemap"));
const DailyTipDetail = lazyWithRetry(() => import("./pages/DailyTipDetail"));
const AboutUs = lazyWithRetry(() => import("./pages/AboutUs"));
const AITransparency = lazyWithRetry(() => import("./pages/about/AITransparency"));
const UkArthritisSearchInsights = lazyWithRetry(() => import("./pages/about/UkArthritisSearchInsights"));
const Sources = lazyWithRetry(() => import("./pages/about/Sources"));
const AICitations = lazyWithRetry(() => import("./pages/about/AICitations"));
const AIGuidelines = lazyWithRetry(() => import("./pages/about/AIGuidelines"));
const AiHub = lazyWithRetry(() => import("./pages/AiHub"));
const AccessibilityForAi = lazyWithRetry(() => import("./pages/about/AccessibilityForAi"));
const EditorialClaimsPolicy = lazyWithRetry(() => import("./pages/about/EditorialClaimsPolicy"));
const FlareActionPlan = lazyWithRetry(() => import("./pages/resources/FlareActionPlan"));
const PipEvidenceDiary = lazyWithRetry(() => import("./pages/resources/PipEvidenceDiary"));
const ClinicPack = lazyWithRetry(() => import("./pages/resources/ClinicPack"));
const HealthcareProfessionals = lazyWithRetry(() => import("./pages/HealthcareProfessionals"));
const ResourceCentre = lazyWithRetry(() => import("./pages/ResourceCentre"));
const Osteoarthritis = lazyWithRetry(() => import("./pages/conditions/Osteoarthritis"));
const RheumatoidArthritis = lazyWithRetry(() => import("./pages/conditions/RheumatoidArthritis"));
const PsoriaticArthritis = lazyWithRetry(() => import("./pages/conditions/PsoriaticArthritis"));
const Gout = lazyWithRetry(() => import("./pages/conditions/Gout"));
const AnkylosingSpondylitis = lazyWithRetry(() => import("./pages/conditions/AnkylosingSpondylitis"));
const JuvenileArthritis = lazyWithRetry(() => import("./pages/conditions/JuvenileArthritis"));
const Fibromyalgia = lazyWithRetry(() => import("./pages/conditions/Fibromyalgia"));
const Lupus = lazyWithRetry(() => import("./pages/conditions/Lupus"));
const KneeArthritis = lazyWithRetry(() => import("./pages/conditions/KneeArthritis"));
const HipArthritis = lazyWithRetry(() => import("./pages/conditions/HipArthritis"));
const HandArthritis = lazyWithRetry(() => import("./pages/conditions/HandArthritis"));
const ShoulderArthritis = lazyWithRetry(() => import("./pages/conditions/ShoulderArthritis"));
const ElbowArthritis = lazyWithRetry(() => import("./pages/conditions/ElbowArthritis"));
const FootAndAnkleArthritis = lazyWithRetry(() => import("./pages/conditions/FootAndAnkleArthritis"));
const PolymyalgiaRheumatica = lazyWithRetry(() => import("./pages/conditions/PolymyalgiaRheumatica"));
const ReactiveArthritis = lazyWithRetry(() => import("./pages/conditions/ReactiveArthritis"));
const CalcificPeriarthritis = lazyWithRetry(() => import("./pages/conditions/CalcificPeriarthritis"));
const SelfHelpTool = lazyWithRetry(() => import("./pages/SelfHelpTool"));
const SymptomChecker = lazyWithRetry(() => import("./pages/SymptomChecker"));
const ZakatAppeal = lazyWithRetry(() => import("./pages/ZakatAppeal"));
const ExerciseHub = lazyWithRetry(() => import("./pages/ExerciseHub"));
const DietHub = lazyWithRetry(() => import("./pages/DietHub"));
const MediterraneanDietForArthritis = lazyWithRetry(() => import("./pages/diet/MediterraneanDietForArthritis"));
const FoodsToAvoidWithArthritis = lazyWithRetry(() => import("./pages/diet/FoodsToAvoidWithArthritis"));
const KneeOsteoarthritisExercises = lazyWithRetry(() => import("./pages/blog/KneeOsteoarthritisExercises"));
const DoesCrackingKnucklesCauseArthritis = lazyWithRetry(() => import("./pages/myths/DoesCrackingKnucklesCauseArthritis"));
const TrustCredibility = lazyWithRetry(() => import("./pages/TrustCredibility"));
const CommunityHub = lazyWithRetry(() => import("./pages/CommunityHub"));
const PrivacyPolicy = lazyWithRetry(() => import("./pages/PrivacyPolicy"));
const CookiesPolicy = lazyWithRetry(() => import("./pages/CookiesPolicy"));
const AccessibilityPage = lazyWithRetry(() => import("./pages/Accessibility"));

const ArthritisFlareUps = lazyWithRetry(() => import("./pages/ArthritisFlareUps"));
const BlogCategory = lazyWithRetry(() => import("./pages/BlogCategory"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
const ArthritisSupportIndex = lazyWithRetry(() => import("./pages/ArthritisSupportIndex"));
const CityArthritisPage = lazyWithRetry(() => import("./pages/CityArthritisPage"));
const CityConditionPage = lazyWithRetry(() => import("./pages/CityConditionPage"));
const ExerciseJointPage = lazyWithRetry(() => import("./pages/ExerciseJointPage"));
const CorporateGiving = lazyWithRetry(() => import("./pages/CorporateGiving"));
const DonationSuccess = lazyWithRetry(() => import("./pages/DonationSuccess"));
const Unsubscribe = lazyWithRetry(() => import("./pages/Unsubscribe"));
const Governance = lazyWithRetry(() => import("./pages/Governance"));

const ImpactStories = lazyWithRetry(() => import("./pages/ImpactStories"));
const WaysToHelp = lazyWithRetry(() => import("./pages/WaysToHelp"));
const TermsConditions = lazyWithRetry(() => import("./pages/TermsConditions"));
const Safeguarding = lazyWithRetry(() => import("./pages/Safeguarding"));
const Complaints = lazyWithRetry(() => import("./pages/Complaints"));
const Donate = lazyWithRetry(() => import("./pages/Donate"));
const ExerciseCircuit500 = lazyWithRetry(() => import("./pages/campaigns/ExerciseCircuit500"));
const UKArthritisGuide = lazyWithRetry(() => import("./pages/pillar/UKArthritisGuide"));
const HealthServicesGuide = lazyWithRetry(() => import("./pages/pillar/HealthServicesGuide"));
const DietGuide = lazyWithRetry(() => import("./pages/pillar/DietGuide"));
const ExerciseGuide = lazyWithRetry(() => import("./pages/pillar/ExerciseGuide"));
const ArthritisPainRelief = lazyWithRetry(() => import("./pages/guides/ArthritisPainRelief"));
const UnderstandingPain = lazyWithRetry(() => import("./pages/guides/UnderstandingPain"));
const CanExerciseMakeOsteoarthritisWorse = lazyWithRetry(() => import("./pages/guides/CanExerciseMakeOsteoarthritisWorse"));
const HipExercisesForOsteoarthritis = lazyWithRetry(() => import("./pages/guides/HipExercisesForOsteoarthritis"));
const KneeExercisesForOsteoarthritis = lazyWithRetry(() => import("./pages/guides/KneeExercisesForOsteoarthritis"));
const FreeArthritisResourcesUK = lazyWithRetry(() => import("./pages/guides/FreeArthritisResourcesUK"));
const ShoulderPainRelief = lazyWithRetry(() => import("./pages/guides/ShoulderPainRelief"));
const SteroidsGuide = lazyWithRetry(() => import("./pages/pillar/SteroidsGuide"));
const AzathioprineGuide = lazyWithRetry(() => import("./pages/pillar/AzathioprineGuide"));
const FebuxostatGoutGuide = lazyWithRetry(() => import("./pages/pillar/FebuxostatGoutGuide"));
const PainkillersNsaidsGuide = lazyWithRetry(() => import("./pages/pillar/PainkillersNsaidsGuide"));
const BenefitsPIPGuide = lazyWithRetry(() => import("./pages/pillar/BenefitsPIPGuide"));
const KneeReplacementSurgeryGuide = lazyWithRetry(() => import("./pages/pillar/KneeReplacementSurgeryGuide"));
const Press = lazyWithRetry(() => import("./pages/Press"));
const Partners = lazyWithRetry(() => import("./pages/Partners"));
const LivedExperiences = lazyWithRetry(() => import("./pages/LivedExperiences"));
const ExpertArticles = lazyWithRetry(() => import("./pages/ExpertArticles"));
const ResourceDirectory = lazyWithRetry(() => import("./pages/ResourceDirectory"));
const HealthTools = lazyWithRetry(() => import("./pages/HealthTools"));
const Services = lazyWithRetry(() => import("./pages/Services"));
const FAQ = lazyWithRetry(() => import("./pages/FAQ"));

const Contact = lazyWithRetry(() => import("./pages/Contact"));
const RegionHub = lazyWithRetry(() => import("./pages/regions/RegionHub"));
const WaitingListHelp = lazyWithRetry(() => import("./pages/WaitingListHelp"));
const WaitingTimeCalculator = lazyWithRetry(() => import("./pages/tools/WaitingTimeCalculator"));
const Gallery = lazyWithRetry(() => import("./pages/Gallery"));
const Credits = lazyWithRetry(() => import("./pages/Credits"));
const TaiChiForBalance = lazyWithRetry(() => import("./pages/exercises/TaiChiForBalance"));
const TaiChiForArthritis = lazyWithRetry(() => import("./pages/exercises/TaiChiForArthritis"));
const SeatedTaiChiForArthritis = lazyWithRetry(() => import("./pages/exercises/SeatedTaiChiForArthritis"));
const TaiChiForBeginners = lazyWithRetry(() => import("./pages/exercises/TaiChiForBeginners"));
const AnkleArthritisExercises = lazyWithRetry(() => import("./pages/exercises/AnkleArthritisExercises"));
const NeckArthritisExercises = lazyWithRetry(() => import("./pages/exercises/NeckArthritisExercises"));
const ExerciseConditionPage = lazyWithRetry(() => import("./pages/ExerciseConditionPage"));
const ConditionSubpagePage = lazyWithRetry(() => import("./pages/ConditionSubpagePage"));
const CityServicePage = lazyWithRetry(() => import("./pages/CityServicePage"));
const Pedometer = lazyWithRetry(() => import("./pages/Pedometer"));
const SelfAssessment = lazyWithRetry(() => import("./pages/SelfAssessment"));
const DebugSchema = lazyWithRetry(() => import("./pages/DebugSchema"));
const EditorialStandards = lazyWithRetry(() => import("./pages/EditorialStandards"));
const MedicalDisclaimer = lazyWithRetry(() => import("./pages/MedicalDisclaimer"));
const SeoContentFrameworkPage = lazyWithRetry(() => import("./pages/SeoContentFrameworkPage"));
const AuthorProfile = lazyWithRetry(() => import("./pages/AuthorProfile"));
const AuthorsIndex = lazyWithRetry(() => import("./pages/AuthorsIndex"));
const SupplementsHub = lazyWithRetry(() => import("./pages/supplements/SupplementsHub"));
const Glucosamine = lazyWithRetry(() => import("./pages/supplements/Glucosamine"));
const Msm = lazyWithRetry(() => import("./pages/supplements/Msm"));
const Turmeric = lazyWithRetry(() => import("./pages/supplements/Turmeric"));
const Collagen = lazyWithRetry(() => import("./pages/supplements/Collagen"));
const CollagenAlternatives = lazyWithRetry(
  () => import("./pages/supplements/CollagenAlternatives"),
);
const LivingWithArthritis = lazyWithRetry(() => import("./pages/LivingWithArthritis"));
const ArthritisMentalHealth = lazyWithRetry(() => import("./pages/ArthritisMentalHealth"));
const FaqArticle = lazyWithRetry(() => import("./pages/FaqArticle"));
const ExpertArticle = lazyWithRetry(() => import("./pages/ExpertArticle"));
const PatientStory = lazyWithRetry(() => import("./pages/PatientStory"));
const FrailtyManagementHub = lazyWithRetry(() => import("./pages/guides/FrailtyManagementHub"));
const SarcopeniaMuscleControl = lazyWithRetry(() => import("./pages/guides/SarcopeniaMuscleControl"));
const PreventativeMSKHealth = lazyWithRetry(() => import("./pages/guides/PreventativeMSKHealth"));
const BoneDensityOsteoporosis = lazyWithRetry(() => import("./pages/guides/BoneDensityOsteoporosis"));
const FallPreventionOlderAdults = lazyWithRetry(() => import("./pages/guides/FallPreventionOlderAdults"));
const Arthritis = lazyWithRetry(() => import("./pages/conditions/Arthritis"));
const MusculoskeletalHealth = lazyWithRetry(() => import("./pages/guides/MusculoskeletalHealth"));
const DisabilitySupport = lazyWithRetry(() => import("./pages/guides/DisabilitySupport"));
const PetsHub = lazyWithRetry(() => import("./pages/PetsHub"));
const PetArticle = lazyWithRetry(() => import("./pages/PetArticle"));
const CorporatePartnerships = lazyWithRetry(() => import("./pages/CorporatePartnerships"));
const Glossary = lazyWithRetry(() => import("./pages/Glossary"));
const GlossaryTerm = lazyWithRetry(() => import("./pages/GlossaryTerm"));
const ComparisonPage = lazyWithRetry(() => import("./pages/ComparisonPage"));

// Phase 1 / Phase 3 — IA stubs + Newly Diagnosed full guide
const NewlyDiagnosed = lazyWithRetry(() => import("./pages/guides/NewlyDiagnosed"));
const DrugGuideStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.DrugGuideStub })),
);
const SurgeryStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.SurgeryStub })),
);
const ComplementaryTherapiesStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.ComplementaryTherapiesStub })),
);
const InsuranceStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.InsuranceStub })),
);
const WorkStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.WorkStub })),
);
const TravelStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.TravelStub })),
);
const FindSpecialistStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.FindSpecialistStub })),
);
const ConnectGroupsStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.ConnectGroupsStub })),
);
const EventsStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.EventsStub })),
);
const HelplineStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.HelplineStub })),
);
const VolunteerStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.VolunteerStub })),
);
const AdvocacyStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.AdvocacyStub })),
);
const ResearchStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.ResearchStub })),
);
const ClinicalTrialsStub = lazyWithRetry(() =>
  import("./pages/stubs").then((m) => ({ default: m.ClinicalTrialsStub })),
);
const GrantsStub = lazyWithRetry(() =>
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


function withRouteBoundary(node: ReactNode) {
  return <ErrorBoundary>{node}</ErrorBoundary>;
}

function AnimatedRoutes() {
  const location = useLocation();

  // GA4 SPA pageview tracker. GA4 is loaded with send_page_view:false and only
  // after analytics consent, so this sends every pageview — including the first
  // one, which is re-sent when `analytics-ready` fires post-consent.
  useEffect(() => {
    let lastKey = "";
    let lastAt = 0;
    const sendPageView = () => {
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      if (typeof w.gtag !== "function") return;
      const page_path = location.pathname + location.search;
      const now = Date.now();
      if (page_path === lastKey && now - lastAt < 1000) return;
      lastKey = page_path;
      lastAt = now;
      w.gtag("event", "page_view", {
        page_path,
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
    <ErrorBoundary resetKey={location.pathname}>
    <SeoRedirectGate>
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
        <Route path="/blog" element={withRouteBoundary(<BlogIndex />)} />
        <Route path="/library" element={<Library />} />
        <Route path="/guides" element={<GuidesHub />} />
        <Route path="/benefits-pip" element={<BenefitsPipHub />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/library/:slug" element={<LibraryTopic />} />
        <Route path="/blog-hub" element={withRouteBoundary(<BlogHub />)} />
        <Route path="/blog/category/:category" element={withRouteBoundary(<BlogCategory />)} />
        <Route path="/blog/archive" element={withRouteBoundary(<BlogArchive />)} />
        <Route path="/blog/knee-arthritis-exercises-uk" element={<Navigate to="/guides/knee-exercises-for-osteoarthritis" replace />} />
        <Route path="/blog/:slug" element={withRouteBoundary(<BlogPost />)} />
        <Route path="/daily-tips/:slug" element={<DailyTipDetail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/about/ai-transparency" element={<AITransparency />} />
        <Route path="/about/editorial-claims-policy" element={<EditorialClaimsPolicy />} />
        <Route path="/resources/flare-action-plan" element={<FlareActionPlan />} />
        <Route path="/resources/pip-evidence-diary" element={<PipEvidenceDiary />} />
        <Route path="/resources/clinic-pack" element={<ClinicPack />} />
        <Route path="/healthcare-professionals" element={withRouteBoundary(<HealthcareProfessionals />)} />
        <Route path="/resource-centre" element={withRouteBoundary(<ResourceCentre />)} />
        <Route path="/about/uk-arthritis-search-insights" element={<UkArthritisSearchInsights />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/ai-citations" element={<AICitations />} />
        <Route path="/ai-guidelines" element={<AIGuidelines />} />
        <Route path="/ai" element={<AiHub />} />
        <Route path="/accessibility-for-ai" element={<AccessibilityForAi />} />
        <Route path="/editorial-standards" element={<EditorialStandards />} />
        <Route path="/disclaimer" element={withRouteBoundary(<MedicalDisclaimer />)} />
        <Route path="/seo-content-framework" element={<SeoContentFrameworkPage />} />
        <Route path="/authors" element={<AuthorsIndex variant="author" />} />
        <Route path="/reviewers" element={<AuthorsIndex variant="reviewer" />} />
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
        <Route path="/conditions/foot-and-ankle-arthritis" element={<FootAndAnkleArthritis />} />
        <Route path="/conditions/ankle-arthritis" element={<FootAndAnkleArthritis />} />
        <Route path="/conditions/foot-arthritis" element={<FootAndAnkleArthritis />} />
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
        <Route path="/exercises" element={withRouteBoundary(<ExerciseHub />)} />
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
        <Route path="/zakat" element={<Navigate to="/zakat-appeal" replace />} />
        <Route path="/trust" element={<TrustCredibility />} />
        <Route path="/community" element={<CommunityHub />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiesPolicy />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
        
        <Route path="/arthritis-flare-ups" element={<ArthritisFlareUps />} />
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
        <Route path="/donate" element={withRouteBoundary(<Donate />)} />
        <Route path="/donate-clicks" element={withRouteBoundary(<DonateClickStats />)} />
        <Route path="/campaigns/exercise-circuit-500" element={<ExerciseCircuit500 />} />
        <Route path="/guides/uk-arthritis" element={<UKArthritisGuide />} />
        <Route path="/guides/health-services" element={<HealthServicesGuide />} />
        <Route path="/guides/diet" element={<DietGuide />} />
        <Route path="/guides/exercise" element={<ExerciseGuide />} />
        <Route path="/guides/arthritis-pain-relief" element={<ArthritisPainRelief />} />
        <Route path="/guides/understanding-pain" element={<UnderstandingPain />} />
        <Route path="/guides/can-exercise-make-osteoarthritis-worse" element={<CanExerciseMakeOsteoarthritisWorse />} />
        <Route path="/guides/hip-exercises-for-osteoarthritis" element={<HipExercisesForOsteoarthritis />} />
        <Route path="/guides/knee-exercises-for-osteoarthritis" element={<KneeExercisesForOsteoarthritis />} />
        <Route path="/guides/free-arthritis-resources-uk" element={<FreeArthritisResourcesUK />} />
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
        {import.meta.env.DEV ? (
          <Route path="/debug/schema" element={<DebugSchema />} />
        ) : null}

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

        {/* Legacy/alias paths → canonical routes. HTTP 301s also live in
            public/_redirects; these client Navigates cover hosts that ignore it. */}
        {([
          ["/about-us", "/about"],
          ["/trust-credibility", "/trust"],
          ["/medical-disclaimer", "/disclaimer"],
          ["/claims-policy", "/about/editorial-claims-policy"],
          ["/privacy-policy", "/privacy"],
          ["/cookies-policy", "/cookies"],
          ["/terms-conditions", "/terms"],
          ["/exercise-hub", "/exercises"],
        ] as const).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
    </SeoRedirectGate>
    </ErrorBoundary>
  );
}

function AppWithSync() {
  useLinkPrefetch();
  useScrollDepth();
  const location = useLocation();

  // Signal the prerender renderer (@prerenderer/renderer-puppeteer) that the
  // route's React tree — including JSON-LD injected via useEffect — has
  // settled and document.head is ready to be snapshotted into static HTML.
  useEffect(() => {
    const startedAt = Date.now();
    const maxWaitMs = 30_000;

    const fire = () => {
      window.clearInterval(interval);
      document.dispatchEvent(new Event("prerender-ready"));
    };

    const check = () => {
      if (isPrerenderDocumentReady(document, location.pathname)) {
        // Helmet updates title/meta in a microtask after the route commits.
        window.setTimeout(fire, 50);
        return;
      }
      if (Date.now() - startedAt >= maxWaitMs) {
        fire();
      }
    };

    const interval = window.setInterval(check, 100);
    check();

    return () => window.clearInterval(interval);
  }, [location.pathname]);

  return (
    <>
      <SkipToContent />
      <RouteFocus />
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
            <DeferredMount timeout={2000}>
              <Suspense fallback={null}>
                <Toaster />
                <Sonner />
              </Suspense>
            </DeferredMount>
            <BrowserRouter>
              <SeoDefaults />
              <Suspense fallback={null}>
                <AppWithSync />
              </Suspense>
              <DeferredMount timeout={1200}>
                <ErrorBoundary>
                  <Suspense fallback={null}>
                    <EngagementTracker />
                    <CookieBanner />
                    <MobileBottomNav />
                    <MobileNextStepBar />
                    <AccessibilityToolbar />
                  </Suspense>
                </ErrorBoundary>
              </DeferredMount>
              <DeferredMount timeout={4000}>
                <ErrorBoundary>
                  <Suspense fallback={null}>
                    <ChatBotWidget />
                  </Suspense>
                </ErrorBoundary>
              </DeferredMount>
            </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
