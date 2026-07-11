import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SocialShareButtons from "@/components/SocialShareButtons";
import ReadNextCards from "@/components/ReadNextCards";
import { ukCities } from "@/data/ukCities";
import { arthritisConditions } from "@/data/arthritisConditions";
import {
  MapPin,
  Hospital,
  Phone,
  ArrowRight,
  Stethoscope,
  AlertCircle,
  ListChecks,
  HeartPulse,
  BookOpen,
  Dumbbell,
  Apple,
  Timer,
} from "lucide-react";
import { motion } from "framer-motion";

const BASE = "https://livingwitharthritis.org.uk";

const CityConditionPage = () => {
  const { city, condition } = useParams<{ city: string; condition: string }>();
  const cityData = ukCities.find((c) => c.slug === city);
  const conditionData = arthritisConditions.find((c) => c.slug === condition);

  if (!cityData || !conditionData) return <Navigate to="/404" replace />;

  const url = `${BASE}/arthritis-support/${cityData.slug}/${conditionData.slug}`;
  const title = `${conditionData.name} Support in ${cityData.name} — Rheumatology & Local Help`;
  const description = `${conditionData.name} (${conditionData.shortName}) support in ${cityData.name}: rheumatology referrals via ${cityData.localTrust}, local resources, symptoms, and management. ${conditionData.ukPrevalence}`.slice(
    0,
    300,
  );
  const metaDescription = description.length > 158 ? description.slice(0, 155) + "..." : description;

  const medicalConditionLd = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: conditionData.name,
    alternateName: conditionData.shortName,
    description: conditionData.description,
    signOrSymptom: conditionData.commonSymptoms.map((s) => ({ "@type": "MedicalSignOrSymptom", name: s })),
    possibleTreatment: conditionData.managementApproaches.map((t) => ({ "@type": "MedicalTherapy", name: t })),
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description: metaDescription,
    url,
    inLanguage: "en-GB",
    about: { "@type": "MedicalCondition", name: conditionData.name },
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
      geographicArea: {
        "@type": "City",
        name: cityData.name,
        containedInPlace: { "@type": "Country", name: "United Kingdom" },
        geo: { "@type": "GeoCoordinates", latitude: cityData.lat, longitude: cityData.lng },
      },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Arthritis Support", item: `${BASE}/arthritis-support` },
      { "@type": "ListItem", position: 3, name: cityData.name, item: `${BASE}/arthritis-support/${cityData.slug}` },
      { "@type": "ListItem", position: 4, name: conditionData.name, item: url },
    ],
  };

  const medicalBusinessLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `${conditionData.name} Support in ${cityData.name}`,
    description: metaDescription,
    url,
    areaServed: {
      "@type": "City",
      name: cityData.name,
      containedInPlace: { "@type": "Country", name: "United Kingdom" },
      geo: { "@type": "GeoCoordinates", latitude: cityData.lat, longitude: cityData.lng },
    },
    medicalSpecialty: "Rheumatology",
    serviceType: `${conditionData.name} support and rheumatology guidance`,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How do I get an GP referral for ${conditionData.name} in ${cityData.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Visit your GP and describe your symptoms. Ask specifically for a referral to rheumatology. In ${cityData.name}, referrals are typically made to ${cityData.localTrust}.`,
        },
      },
      {
        "@type": "Question",
        name: `What are the common symptoms of ${conditionData.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: conditionData.commonSymptoms.join("; ") + ".",
        },
      },
      {
        "@type": "Question",
        name: `When should I see a GP about ${conditionData.name}?`,
        acceptedAnswer: { "@type": "Answer", text: conditionData.whenToSeeGP },
      },
    ],
  };

  const otherConditions = arthritisConditions.filter((c) => c.slug !== conditionData.slug);

  return (
    <>
      <Helmet>
        <title>{`${title} | Living With Arthritis`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content={cityData.name} />
        <meta name="geo.position" content={`${cityData.lat};${cityData.lng}`} />
        <meta name="ICBM" content={`${cityData.lat}, ${cityData.lng}`} />
        <meta
          name="keywords"
          content={`${conditionData.name} ${cityData.name}, ${conditionData.shortName} ${cityData.name}, rheumatology ${cityData.name}, arthritis ${cityData.name}, ${cityData.localTrust}`}
        />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <script type="application/ld+json">{JSON.stringify(medicalConditionLd)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageLd)}</script>
        <script type="application/ld+json">{JSON.stringify(medicalBusinessLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <Header />

      <PageBreadcrumb
        segments={[
          { label: "Arthritis Support", href: "/arthritis-support" },
          { label: cityData.name, href: `/arthritis-support/${cityData.slug}` },
          { label: conditionData.name },
        ]}
      />

      <main className="container mx-auto px-6 md:px-10 py-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Hero */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-primary mb-3">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">
                {cityData.name} · {cityData.region}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {conditionData.name} Support in {cityData.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-3">{conditionData.description}</p>
            <p className="text-sm text-muted-foreground">{conditionData.ukPrevalence}</p>
          </div>

          {/* GP Referral */}
          <section className="bg-card border border-border rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Hospital className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Rheumatology for {conditionData.shortName} in {cityData.name}
              </h2>
            </div>
            <p className="text-muted-foreground mb-3">
              In {cityData.name}, rheumatology referrals for {conditionData.name.toLowerCase()} are typically made to{" "}
              <strong>{cityData.localTrust}</strong>. Your GP is your starting point — early referral matters,
              especially for inflammatory arthritis.
            </p>
            <a
              href={cityData.trustUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:underline text-sm font-medium"
            >
              Visit {cityData.localTrust} <ArrowRight className="w-4 h-4" />
            </a>
          </section>

          {/* Symptoms */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-primary" /> Common Symptoms of {conditionData.name}
            </h2>
            <ul className="space-y-3">
              {conditionData.commonSymptoms.map((symptom, i) => (
                <li key={i} className="flex items-start gap-3 bg-muted/30 rounded-xl p-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-foreground">{symptom}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Management */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-primary" /> Managing {conditionData.shortName} in {cityData.name}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {conditionData.managementApproaches.map((approach) => (
                <div key={approach} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <HeartPulse className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-foreground">{approach}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Local resources */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Local Resources in {cityData.name}
            </h2>
            <ul className="space-y-2">
              {cityData.localResources.map((resource, i) => (
                <li key={i} className="flex items-start gap-3 bg-muted/30 rounded-xl p-4">
                  <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span className="text-foreground">{resource}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* When to see GP */}
          <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" /> When to See Your GP
            </h2>
            <p className="text-muted-foreground mb-4">{conditionData.whenToSeeGP}</p>
            <Link
              to={conditionData.conditionPagePath}
              className="inline-flex items-center gap-1.5 text-primary hover:underline text-sm font-medium"
            >
              Read our full {conditionData.name} guide <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          {/* How to get referral */}
          <section className="bg-card border border-border rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" /> Getting an GP Referral in {cityData.name}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Book a GP appointment and describe your symptoms in detail</li>
              <li>Ask specifically for a referral to rheumatology for suspected {conditionData.name.toLowerCase()}</li>
              <li>
                You may be referred to <strong>{cityData.localTrust}</strong>
              </li>
              <li>Ask about current waiting times and any urgent referral pathways</li>
              <li>
                While waiting, explore our{" "}
                <Link to="/self-help" className="text-primary hover:underline">
                  self-help tools
                </Link>{" "}
                and{" "}
                <Link to="/exercises" className="text-primary hover:underline">
                  exercise programmes
                </Link>
              </li>
            </ol>
          </section>

          {/* Other conditions in this city */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Other Arthritis Types in {cityData.name}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {otherConditions.map((c) => (
                <Link
                  key={c.slug}
                  to={`/arthritis-support/${cityData.slug}/${c.slug}`}
                  className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-sm transition-all"
                >
                  <p className="font-semibold text-foreground">{c.name} in {cityData.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{c.ukPrevalence}</p>
                </Link>
              ))}
              <Link
                to={`/arthritis-support/${cityData.slug}`}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-sm transition-all"
              >
                <p className="font-semibold text-foreground">All Arthritis Support in {cityData.name}</p>
                <p className="text-xs text-muted-foreground mt-1">health services, local resources & community</p>
              </Link>
            </div>
          </section>

          {/* Same condition in other cities */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {conditionData.name} Support in Other UK Cities
            </h2>
            <div className="flex flex-wrap gap-2">
              {ukCities
                .filter((c) => c.slug !== cityData.slug)
                .slice(0, 16)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={`/arthritis-support/${c.slug}/${conditionData.slug}`}
                    className="text-sm px-3 py-1.5 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
          </section>

          <ReadNextCards
            heading={`Recommended for ${cityData.name} readers`}
            subheading="Keep building your plan with these next steps."
            items={[
              {
                to: conditionData.conditionPagePath,
                eyebrow: "Full guide",
                title: `${conditionData.name}: Complete UK Guide`,
                description: `Symptoms, diagnosis, standard treatment pathways and self-management for ${conditionData.shortName}.`,
                readTime: "8 min read",
                icon: BookOpen,
                tint: "bg-tint-emerald",
                accent: "text-primary",
              },
              {
                to: "/tools/waiting-time-calculator",
                eyebrow: "Free tool",
                title: `Estimate ${cityData.region} rheumatology waiting time`,
                description: `See realistic 2026 rheumatology waiting estimates for ${cityData.name} and surrounding areas.`,
                readTime: "2 min",
                icon: Timer,
                tint: "bg-tint-amber",
                accent: "text-primary",
              },
              {
                to: "/exercises",
                eyebrow: "Self-help",
                title: "Joint-friendly exercise plans",
                description: `Low-impact routines you can start while waiting for your ${cityData.name} appointment.`,
                readTime: "5 min",
                icon: Dumbbell,
                tint: "bg-tint-sky",
                accent: "text-primary",
              },
            ]}
          />

          <SocialShareButtons
            title={`${conditionData.name} Support in ${cityData.name}`}
            slug={`arthritis-support/${cityData.slug}/${conditionData.slug}`}
          />
        </motion.div>
      </main>

      <Footer />
    </>
  );
};

export default CityConditionPage;
