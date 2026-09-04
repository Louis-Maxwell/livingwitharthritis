import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SocialShareButtons from "@/components/SocialShareButtons";
import FaqAccordion from "@/components/faq/FaqAccordion";
import {
  getCityService,
  services,
  serviceLabel,
  serviceShortLabel,
  type ServiceSlug,
} from "@/data/city-services";
import {
  MapPin,
  Stethoscope,
  Users,
  Apple,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const BASE = "https://livingwitharthritis.org.uk";

const serviceIcon: Record<ServiceSlug, typeof Stethoscope> = {
  physiotherapy: Stethoscope,
  "support-groups": Users,
  "diet-support": Apple,
  "waiting-list-help": Clock,
};

/**
 * Programmatic SEO page: /uk/:city/:service
 * 26 cities × 4 services = 104 unique pages.
 */
const CityServicePage = () => {
  const { city: citySlug, service: serviceSlug } =
    useParams<{ city: string; service: string }>();

  const data = citySlug && serviceSlug ? getCityService(citySlug, serviceSlug) : null;

  // Hooks must run unconditionally on every render, so this effect re-derives
  // everything it needs from the route params itself rather than relying on
  // variables computed after the early-return below.
  useEffect(() => {
    const data = citySlug && serviceSlug ? getCityService(citySlug, serviceSlug) : null;
    if (!data) return;
    const { city, service } = data;
    const sLabel = serviceLabel[service];
    const path = `/uk/${city.slug}/${service}`;
    const url = `${BASE}${path}`;
    const title = `${sLabel} for Arthritis in ${city.name} (${city.region}) — Local UK Guide`;
    const description =
      `Find ${sLabel.toLowerCase()} for arthritis in ${city.name}: local services, waiting-time tips and practical next steps near you.`;

    const medicalLd = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: title,
      description,
      url,
      inLanguage: "en-GB",
      audience: {
        "@type": "MedicalAudience",
        audienceType: "Patient",
        geographicArea: {
          "@type": "City",
          name: city.name,
          containedInPlace: { "@type": "Country", name: "United Kingdom" },
        },
      },
      dateModified: new Date().toISOString().slice(0, 10),
    };
    const placeLd = {
      "@context": "https://schema.org",
      "@type": "Place",
      name: `${sLabel} in ${city.name}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.region,
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.lat,
        longitude: city.lng,
      },
    };
    // FAQPage intentionally not emitted here — <FaqAccordion> below covers it.
    const nodes: HTMLScriptElement[] = [];
    for (const data of [medicalLd, placeLd]) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      nodes.push(s);
    }
    return () => nodes.forEach((n) => n.remove());
  }, [citySlug, serviceSlug]);

  if (!data) return <Navigate to="/arthritis-support" replace />;

  const { city, service, content } = data;
  const path = `/uk/${city.slug}/${service}`;
  const url = `${BASE}${path}`;
  const sLabel = serviceLabel[service];
  const title = `${sLabel} for Arthritis in ${city.name} (${city.region}) — Local UK Guide`;
  const description =
    `Find ${sLabel.toLowerCase()} for arthritis in ${city.name}: local services, waiting-time tips and practical next steps near you.`;
  const Icon = serviceIcon[service];

  const siblingServices = services.filter((s) => s !== service);

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        path={path}
        noindex
        keywords={content.keywords}
      />
      <Header />
      <PageBreadcrumb
        segments={[
          { label: city.name, href: `/arthritis-support/${city.slug}` },
          { label: sLabel },
        ]}
      />

      <main id="main-content" className="container mx-auto px-6 md:px-10 py-10 max-w-4xl">
        {/* Hero */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-primary mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">
              {city.name}, {city.region} • <Icon className="w-4 h-4 inline-block -mt-0.5" /> {sLabel}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {content.headline}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {content.intro}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            <strong className="text-foreground">Local context:</strong> {content.localStats}
          </p>
        </header>

        {/* Local resources */}
        <section className="mb-10">
          <h2 className="section-header-left text-xl font-semibold text-foreground mb-4">
            {sLabel} options in {city.name}
          </h2>
          <div className="space-y-3">
            {content.localResources.map((r, i) => (
              <article
                key={i}
                className="bg-card border border-border rounded-xl p-5"
              >
                <h3 className="font-semibold text-foreground">{r.name}</h3>
                <div className="text-xs uppercase tracking-wide text-primary mt-1 mb-2">
                  {r.type}
                </div>
                <p className="text-sm text-muted-foreground">{r.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mb-10">
          <h2 className="section-header-left text-xl font-semibold text-foreground mb-4">
            Tips for {serviceShortLabel[service].toLowerCase()} in {city.name}
          </h2>
          <ul className="space-y-2">
            {content.tips.map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-primary/5 rounded-xl p-4"
              >
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Primary CTA */}
        <section className="mb-10">
          <Link
            to={content.ctaPath}
            className="flex items-center justify-between p-5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
          >
            <span className="font-semibold">{content.ctaLabel}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        {/* Sibling services in same city */}
        <section className="mb-10">
          <h2 className="section-header-left text-xl font-semibold text-foreground mb-4">
            Other arthritis support in {city.name}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {siblingServices.map((s) => {
              const SibIcon = serviceIcon[s];
              return (
                <Link
                  key={s}
                  to={`/uk/${city.slug}/${s}`}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
                >
                  <span className="flex items-center gap-3 text-foreground font-medium">
                    <SibIcon className="w-4 h-4 text-primary" />
                    {serviceLabel[s]} in {city.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              );
            })}
            <Link
              to={`/arthritis-support/${city.slug}`}
              className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors sm:col-span-2"
            >
              <span className="text-foreground font-medium">
                Full {city.name} arthritis support hub
              </span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>
        </section>

        {/* Pillar CTAs */}
        <section className="mb-10 grid sm:grid-cols-2 gap-3">
          <Link
            to="/exercises"
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
          >
            <span className="text-foreground font-medium">All arthritis exercises</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
          <Link
            to="/diet"
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
          >
            <span className="text-foreground font-medium">Anti-inflammatory diet guide</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
          <Link
            to="/conditions/arthritis"
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
          >
            <span className="text-foreground font-medium">Browse arthritis conditions</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
          <Link
            to="/chat"
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
          >
            <span className="text-foreground font-medium">Help &amp; support team</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
        </section>

        {/* People Also Ask */}
        <section className="mb-10">
          <h2 className="section-header-left text-xl font-semibold text-foreground mb-4">
            {sLabel} in {city.name} — People Also Ask
          </h2>
          <FaqAccordion
            idPrefix={`${city.slug}-${service}-faq`}
            items={[
              { question: `Where can I find ${sLabel.toLowerCase()} for arthritis in ${city.name}?`, answer: `${city.name} residents can access ${sLabel.toLowerCase()} for arthritis through their GP, local public-healthcare services and a growing range of community providers. Most local options accept self-referral; start with your GP for a structured care pathway.` },
              { question: `How long is the wait for ${sLabel.toLowerCase()} in ${city.name}?`, answer: `Waiting times for ${sLabel.toLowerCase()} in ${city.name} vary by provider and pathway. Public-healthcare routes typically take 4–18 weeks; private and community options are usually faster. Use the tips on this page to make progress while you wait.` },
              { question: `Is ${sLabel.toLowerCase()} for arthritis free in ${city.name}?`, answer: `Many ${sLabel.toLowerCase()} pathways for arthritis in ${city.name} are available at no cost through public healthcare. Private and specialist routes are paid but often have shorter waits.` },
              { question: `What should I do while waiting for ${sLabel.toLowerCase()} in ${city.name}?`, answer: `Start the evidence-based self-management steps that physiotherapists recommend: low-impact movement, an anti-inflammatory diet, and pacing your daily activities. Our exercises and diet guides cover the same routines used in formal programmes.` },
            ]}
          />
        </section>

        <SocialShareButtons title={title} slug={`uk/${city.slug}/${service}`} />

        <div className="mt-8 text-xs text-muted-foreground bg-muted/40 rounded-xl p-4">
          <strong>Note:</strong> Local service availability and waiting times change frequently.
          Always confirm details with your GP or local provider before acting on this information.
          See <a href="https://www.gov.uk/health" target="_blank" rel="noopener noreferrer" className="underline">gov.uk/health</a> for current public-healthcare guidance.
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CityServicePage;
