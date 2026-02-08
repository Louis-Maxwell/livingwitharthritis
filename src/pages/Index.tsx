import { lazy, Suspense, memo } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { FloatingChatButton } from "@/components/FloatingChatButton";

// Lazy load below-fold sections for faster initial load
const ImpactBanner = lazy(() => import("@/components/ImpactBanner"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const VirtualPhysioSection = lazy(() => import("@/components/VirtualPhysioSection"));
const ConditionsSection = lazy(() => import("@/components/ConditionsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FundraisingSection = lazy(() => import("@/components/FundraisingSection"));
const DonationTiersSection = lazy(() => import("@/components/DonationTiersSection"));
const DonationNotification = lazy(() => import("@/components/DonationNotification"));
const NutritionArticleSection = lazy(() => import("@/components/NutritionArticleSection"));
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));

// Minimal skeleton for lazy sections
const SectionLoader = memo(() => (
  <div className="py-16 flex items-center justify-center">
    <div className="animate-pulse h-4 w-32 bg-muted rounded" />
  </div>
));

SectionLoader.displayName = "SectionLoader";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionLoader />}>
          <ImpactBanner />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ServicesGrid />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <VirtualPhysioSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ConditionsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FundraisingSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <DonationTiersSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <JointExerciseSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <NutritionArticleSection />
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <DonationNotification />
      </Suspense>
      <FloatingChatButton />
    </div>
  );
};

export default Index;
