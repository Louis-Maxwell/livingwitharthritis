import { lazy, Suspense, memo, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

import { useDeferredVisible } from "@/hooks/useDeferredVisible";
import { AppointmentModal } from "@/components/AppointmentModal";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogTeaserSection from "@/components/BlogTeaserSection";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

// Lazy load below-fold sections for faster initial load

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const VirtualPhysioSection = lazy(() => import("@/components/VirtualPhysioSection"));
const NutritionArticleSection = lazy(() => import("@/components/NutritionArticleSection"));
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [deferRef, showDeferred] = useDeferredVisible<HTMLDivElement>("400px");

  useEffect(() => {
    const donation = searchParams.get("donation");
    if (donation === "success") {
      toast.success("Thank you for your generous donation! 💙", {
        description: "Your contribution helps people living with arthritis.",
        duration: 6000,
      });
      setSearchParams({}, { replace: true });
    } else if (donation === "cancelled") {
      toast.info("Donation cancelled. You can try again any time.");
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

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
        <Suspense fallback={<SectionLoader />}>
          <NutritionArticleSection />
        </Suspense>
        <BlogTeaserSection />

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
      

      {/* Sticky mobile booking bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-background/95 backdrop-blur-xl border-t border-border/40 px-4 py-3 shadow-large">
        <AppointmentModal
          trigger={
            <Button className="w-full btn-primary-cta h-12 rounded-full text-sm font-bold tracking-wide shadow-medium">
              <CalendarCheck className="w-4 h-4 mr-2" aria-hidden="true" />
              Book Free Consultation
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default Index;
