import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import SkeletonSection from "@/components/landing/SkeletonSection";
import PageHero from "@/components/ui/PageHero";

const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const Footer = lazy(() => import("@/components/Footer"));

const FAQ = () => (
  <>
    <Helmet>
      <title>Arthritis FAQs UK: Symptoms, Treatment, Diet & Exercise Answers</title>
      <meta name="description" content="Arthritis FAQs answered by UK clinicians — symptoms, flare-ups, treatment, diet, exercise, AI safety and how to access free Living With Arthritis support." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/faq" />
    </Helmet>
    <Header />
    <main id="main-content" role="main" tabIndex={-1}>
      <PageHero
        badge="FAQ"
        title="Arthritis Questions Answered by UK Clinicians"
        subtitle="Quick, evidence-based answers about symptoms, treatment, diet, exercise and how Living With Arthritis UK supports you."
      />
      <Suspense fallback={<SkeletonSection />}>
        <FAQSection />
      </Suspense>
    </main>
    <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
      <Footer />
    </Suspense>
  </>
);

export default FAQ;
