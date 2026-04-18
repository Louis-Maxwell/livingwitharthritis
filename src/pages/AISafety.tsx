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
      <title>AI Safety in Arthritis Care UK: Clinician-Led, NICE-Aligned Assistant</title>
      <meta name="description" content="How our arthritis AI assistant is co-designed with HCPC-registered clinicians, validated against NICE guidelines and safeguarded under UK GDPR for patient safety." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/ai-safety" />
    </Helmet>
    <Header />
    <main id="main-content" role="main" tabIndex={-1}>
      <PageHero
        badge="AI Safety"
        title="Safe, Clinician-Led AI for Arthritis Support"
        subtitle="Built with UK rheumatologists and physiotherapists. Validated against current NICE guidelines and protected under UK GDPR."
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
