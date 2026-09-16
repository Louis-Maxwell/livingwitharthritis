import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import PageHero from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SymptomQuiz from "@/components/tools/SymptomQuiz";
import { SYMPTOM_FAQS } from "@/data/symptomChecker";
import { Activity } from "lucide-react";
import MedicalDisclaimerStrip from "@/components/MedicalDisclaimerStrip";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import ArticleCitations from "@/components/blog/ArticleCitations";
import { CITATIONS_SYMPTOM_CHECKER } from "@/data/clinical/ukCitations";

const PAGE_URL = "https://livingwitharthritis.org.uk/symptom-checker";
const TITLE = "Arthritis Symptom Checker (UK) — Educational Guide Finder";
const DESCRIPTION =
  "Free UK arthritis symptom checker: urgent red-flag screen, joint areas, duration and severity. Get educational links to condition hubs, exercise, diet and PIP — not a diagnosis.";

export default function SymptomChecker() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${PAGE_URL}#faq`,
    url: PAGE_URL,
    inLanguage: "en-GB",
    mainEntity: SYMPTOM_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": PAGE_URL,
    url: PAGE_URL,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    about: {
      "@type": "MedicalCondition",
      name: "Arthritis",
    },
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
      geographicArea: { "@type": "Country", name: "United Kingdom" },
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable-intro"],
    },
    publisher: {
      "@type": "Organization",
      name: "Living With Arthritis UK",
      url: "https://livingwitharthritis.org.uk",
    },
  };

  return (
    <>
      <Helmet>
        <title>{TITLE} | Living With Arthritis UK</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta property="og:title" content={`${TITLE} | Living With Arthritis UK`} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${TITLE} | Living With Arthritis UK`} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <script type="application/ld+json">{JSON.stringify(webPageJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb
          segments={[
            { label: "Health tools", href: "/health-tools" },
            { label: "Symptom checker" },
          ]}
        />

        <PageHero
          badge={
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-sm px-3 py-1">
              <Activity className="w-3.5 h-3.5 mr-1.5" aria-hidden /> Free UK educational tool
            </Badge>
          }
          title={
            <>
              Arthritis <span className="text-primary">symptom checker</span>
            </>
          }
          subtitle="A careful, accessible UK starting point for joint pain, stiffness and swelling — with an urgent-symptom screen first, then guides to explore. Not a diagnosis."
        />

        <main id="main-content" className="container mx-auto px-5 md:px-10 pb-16 md:pb-24 max-w-3xl">
          <aside
            className="speakable-intro my-8 pl-5 border-l-4 border-primary bg-card/50 py-3 pr-3 rounded-r-lg"
            aria-label="Summary"
          >
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              Use this checker to organise symptoms and open relevant Living With Arthritis guides on conditions,
              exercise, diet and PIP. If you have emergency symptoms such as a suddenly hot red joint with fever, or
              loss of bladder or bowel control with back pain, call <strong>999</strong>. For urgent non-emergency
              advice, contact <strong>NHS 111</strong>. This tool does not diagnose arthritis.
            </p>
          </aside>

          <div className="mb-8">
            <MedicalDisclaimerStrip variant="tool" />
          </div>
          <EducationalDisclaimerBox lastReviewed="2026-09-16" />
          <TopicClusterNav path="/symptom-checker" />
          <ArticleCitations citations={CITATIONS_SYMPTOM_CHECKER} />

          <section
            aria-label="Symptom checker questionnaire"
            className="rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-sm"
          >
            <SymptomQuiz />
          </section>

          <section className="mt-14" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="font-display text-2xl font-bold text-foreground mb-4">
              Symptom checker FAQs
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {SYMPTOM_FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base sm:text-lg font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <p className="mt-10 text-sm text-muted-foreground leading-relaxed">
            Prefer a different tool? Try our{" "}
            <Link to="/health-tools" className="text-primary underline-offset-4 hover:underline font-medium">
              health toolkit
            </Link>
            ,{" "}
            <Link to="/self-assessment" className="text-primary underline-offset-4 hover:underline font-medium">
              self-assessment
            </Link>
            , or{" "}
            <Link to="/chat" className="text-primary underline-offset-4 hover:underline font-medium">
              information chatbot
            </Link>
            .
          </p>
        </main>

        <Footer />
      </div>
    </>
  );
}
