import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import SkeletonSection from "@/components/landing/SkeletonSection";
import PageHero from "@/components/ui/PageHero";

const AITrustSection = lazy(() => import("@/components/landing/AITrustSection"));
const Footer = lazy(() => import("@/components/Footer"));

const AISafety = () => (
  <>
    <Helmet>
      <title>AI Safety & Trust | Living With Arthritis UK</title>
      <meta name="description" content="How our AI health assistant is co-designed with HCPC-registered clinicians, validated against NICE guidelines, and safeguarded for people living with arthritis." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/ai-safety" />
    </Helmet>
    <Header />
    <main id="main-content" role="main" tabIndex={-1}>
      <PageHero
        eyebrow="AI Safety"
        title="Clinician-led, evidence-checked AI"
        description="Built with rheumatologists and physiotherapists. Validated against current NICE guidelines."
      />
      <Suspense fallback={<SkeletonSection />}>
        <AITrustSection />
      </Suspense>
    </main>
    <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
      <Footer />
    </Suspense>
  </>
);

export default AISafety;
