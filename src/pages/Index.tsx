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

// Lazy load sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const VirtualPhysioSection = lazy(() => import("@/components/VirtualPhysioSection"));
const NutritionArticleSection = lazy(() => import("@/components/NutritionArticleSection"));
const ConditionsSection = lazy(() => import("@/components/ConditionsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));
const DonationNotification = lazy(() => import("@/components/DonationNotification"));

// Minimal loader
const SectionLoader = memo(() => (
  <div className="py-16 flex items-center justify-center">
    <div className="animate-pulse h-4 w-32 bg-muted rounded" />
  </div>
));
SectionLoader.displayName = "SectionLoader";

export default function Index() {
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

        {/* Deferred sections + new Articles & Guides */}
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
                <JointExerciseSection />
              </Suspense>

              {/* New Articles & Guides Section – engaging free resources */}
              <section className="py-16 px-4 md:px-8 bg-muted/30" aria-labelledby="articles-heading">
                <div className="max-w-7xl mx-auto">
                  <h2 id="articles-heading" className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Articles & Guides: Manage Arthritis Naturally
                  </h2>
                  <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
                    Explore free, evidence-based resources and low-impact exercise guides to reduce joint pain, improve
                    mobility, and live better with arthritis.
                  </p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Article 1 */}
                    <article className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <img
                        src="https://images.unsplash.com/photo-1571019613454-1cfac13c2a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Person doing gentle knee exercises for arthritis relief"
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-3">
                          Exercising with Arthritis: Improve Joint Pain and Stiffness
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Mayo Clinic guide on range-of-motion, strengthening, and low-impact aerobic exercises safe for
                          arthritis.
                        </p>
                        <a
                          href="https://www.mayoclinic.org/diseases-conditions/arthritis/in-depth/arthritis/art-20047971"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-primary hover:underline font-medium"
                        >
                          Read Full Guide →
                        </a>
                      </div>
                    </article>

                    {/* Article 2 */}
                    <article className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <img
                        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Low-impact water aerobics for joint-friendly arthritis exercise"
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-3">
                          14 Joint-Friendly Ways to Work Out With Arthritis
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Arthritis Foundation recommendations: walking in water, tai chi, yoga, and more low-impact
                          activities.
                        </p>
                        <a
                          href="https://www.arthritis.org/health-wellness/healthy-living/physical-activity/other-activities/14-ways-to-work-out-with-arthritis"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-primary hover:underline font-medium"
                        >
                          Explore Exercises →
                        </a>
                      </div>
                    </article>

                    {/* Article 3 – Open Access Scientific */}
                    <article className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Gentle stretching and strengthening for arthritis management"
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-3">Exercise Therapy for Knee and Hip Osteoarthritis</h3>
                        <p className="text-muted-foreground mb-4">
                          Free full-text review (PMC/NIH) on effective exercise prescriptions for osteoarthritis relief.
                        </p>
                        <a
                          href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10199279/"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-primary hover:underline font-medium"
                        >
                          Read Open Access Article →
                        </a>
                      </div>
                    </article>
                  </div>

                  <div className="text-center mt-12">
                    <p className="text-muted-foreground">
                      These free resources are from trusted organizations. Always consult your doctor before starting
                      new exercises.
                    </p>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="min-h-[60vh] sm:min-h-[80vh]" />
          )}
        </div>
      </main>

      <Footer />

      <Suspense fallback={null}>{showDeferred && <DonationNotification />}</Suspense>

      {/* Sticky mobile CTA */}
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
}

export default Index;
