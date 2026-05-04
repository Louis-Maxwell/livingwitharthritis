import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import SkeletonSection from "@/components/landing/SkeletonSection";
import PageHero from "@/components/ui/PageHero";

const AITrustSection = lazy(() => import("@/components/landing/AITrustSection"));
const AISafetyExtras = lazy(() => import("@/components/landing/AISafetyExtras"));
const Footer = lazy(() => import("@/components/Footer"));

const AISafety = () => (
  <>
    <Helmet>
      <title>AI Safety in Arthritis Care UK: Clinician-Led, NICE-Aligned Assistant</title>
      <meta name="description" content="How our arthritis AI assistant is co-designed with HCPC-registered clinicians, validated against NICE guidelines and safeguarded under UK GDPR for patient safety." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/ai-safety" />
      <meta property="og:title" content="AI Safety in Arthritis Care UK: Clinician-Led, NICE-Aligned Assistant" />
      <meta property="og:description" content="How our arthritis AI assistant is co-designed with HCPC-registered clinicians, validated against NICE guidelines and safeguarded under UK GDPR for patient safety." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/ai-safety" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AI Safety in Arthritis Care UK: Clinician-Led, NICE-Aligned Assistant" />
      <meta name="twitter:description" content="How our arthritis AI assistant is co-designed with HCPC-registered clinicians, validated against NICE guidelines and safeguarded under UK GDPR for patient safety." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
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
      <Suspense fallback={<SkeletonSection />}>
        <AISafetyExtras />
      </Suspense>
    </main>
    <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
      <Footer />
    </Suspense>
  </>
);

export default AISafety;
