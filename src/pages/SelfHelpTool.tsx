import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

const VirtualPhysioSection = lazy(() => import("@/components/VirtualPhysioSection"));
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));

const SectionLoader = () => (
  <div className="py-8 flex items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
  </div>
);

export default function SelfHelpTool() {
  return (
    <ErrorBoundary
      fallback={<div className="p-12 text-center text-destructive">Something went wrong. Please refresh.</div>}
    >
      <Helmet>
        <title>Self Help Tool – Joint Exercise Diagram | Living With Arthritis UK</title>
        <meta
          name="description"
          content="Interactive self-help tool for arthritis joint exercises. Click on any joint to discover targeted exercises for pain relief and mobility."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-5 md:px-8 py-10 space-y-10 md:space-y-14">
          <div className="text-center">
            <span className="section-label text-primary mb-3 block">Self Help Tool</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Interactive Joint <span className="text-primary">Exercise Guide</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Click on any joint on the body diagram below to discover targeted exercises, stretches and tips for managing arthritis pain.
            </p>
          </div>

          <Suspense fallback={<SectionLoader />}>
            <VirtualPhysioSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <JointExerciseSection />
          </Suspense>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
