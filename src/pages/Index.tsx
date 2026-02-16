import { lazy, Suspense, memo } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { FloatingChatButton } from "@/components/FloatingChatButton";
import { useDeferredVisible } from "@/hooks/useDeferredVisible";

// Lazy load below-fold sections for faster initial load
const ImpactBanner = lazy(() => import("@/components/ImpactBanner"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const VirtualPhysioSection = lazy(() => import("@/components/VirtualPhysioSection"));
const ConditionsSection = lazy(() => import("@/components/ConditionsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FundraisingSection = lazy(() => import("@/components/FundraisingSection"));

const DonationNotification = lazy(() => import("@/components/DonationNotification"));
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));

// Minimal skeleton for lazy sections
const SectionLoader = memo(() => (
  <div className="py-16 flex items-center justify-center">
    <div className="animate-pulse h-4 w-32 bg-muted rounded" />
  </div>
));
SectionLoader.displayName = "SectionLoader";

const Index = () => {
  // Defer far-below-fold sections until near viewport (200px margin)
  const [deferRef, showDeferred] = useDeferredVisible<HTMLDivElement>("400px");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionLoader />}>
          
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

        {/* Deferred sections — only load JS when user scrolls near them */}
        <div ref={deferRef}>
          {showDeferred ? (
            <>
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
                <JointExerciseSection />
              </Suspense>
            </>
          ) : (
            // Placeholder height so footer doesn't jump
            <div className="py-16" />
          )}
        </div>
      </main>
      <Footer />
      <Suspense fallback={null}>
        {showDeferred && <DonationNotification />}
      </Suspense>
      <FloatingChatButton />
    </div>
  );
};

export default Index;
