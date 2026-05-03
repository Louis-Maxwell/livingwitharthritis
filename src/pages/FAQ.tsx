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
      <meta name="keywords" content="what causes arthritis, is arthritis curable, how to reduce joint inflammation, best pain relief for arthritis, difference between osteoarthritis and rheumatoid arthritis, exercises to avoid with arthritis, how to support someone with chronic pain, arthritis symptoms, arthritis treatment, arthritis medication, arthritis diet, anti-inflammatory diet, arthritis flare up, joint swelling causes, natural remedies for arthritis, arthritis FAQ" />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/faq" />
      <meta property="og:title" content="Arthritis FAQs UK: Symptoms, Treatment, Diet & Exercise Answers" />
      <meta property="og:description" content="Arthritis FAQs answered by UK clinicians — symptoms, flare-ups, treatment, diet, exercise, AI safety and how to access free Living With Arthritis support." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/faq" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Arthritis FAQs UK: Symptoms, Treatment, Diet & Exercise Answers" />
      <meta name="twitter:description" content="Arthritis FAQs answered by UK clinicians — symptoms, flare-ups, treatment, diet, exercise, AI safety and how to access free Living With Arthritis support." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
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
