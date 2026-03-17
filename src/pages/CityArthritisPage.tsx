import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SocialShareButtons from "@/components/SocialShareButtons";
import { ukCities } from "@/data/ukCities";
import { MapPin, Hospital, Phone, BookOpen, ArrowRight, Users, Dumbbell, Apple, Heart } from "lucide-react";
import { motion } from "framer-motion";

const BASE = "https://livingwitharthritis.org.uk";

const CityArthritisPage = () => {
  const { city } = useParams<{ city: string }>();
  const cityData = ukCities.find((c) => c.slug === city);

  if (!cityData) return <Navigate to="/404" replace />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `Arthritis Support in ${cityData.name} | Living With Arthritis`,
    description: cityData.description,
    url: `${BASE}/arthritis-support/${cityData.slug}`,
    inLanguage: "en-GB",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
      geographicArea: { "@type": "AdministrativeArea", name: `${cityData.name}, United Kingdom` },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Arthritis Support", item: `${BASE}/arthritis-support` },
      { "@type": "ListItem", position: 3, name: cityData.name, item: `${BASE}/arthritis-support/${cityData.slug}` },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{`Arthritis Support in ${cityData.name} — NHS Services & Local Help | Living With Arthritis`}</title>
        <meta name="description" content={cityData.description} />
        <link rel="canonical" href={`${BASE}/arthritis-support/${cityData.slug}`} />
        <meta property="og:title" content={`Arthritis Support in ${cityData.name}`} />
        <meta property="og:description" content={cityData.description} />
        <meta property="og:url" content={`${BASE}/arthritis-support/${cityData.slug}`} />
        <meta property="og:type" content="article" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content={cityData.name} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <Header />

      <PageBreadcrumb segments={[
        { label: "Arthritis Support", href: "/arthritis-support" },
        { label: cityData.name },
      ]} />

      <main className="container mx-auto px-6 md:px-10 py-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Hero */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-primary mb-3">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">{cityData.region}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Arthritis Support in {cityData.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{cityData.description}</p>
            <p className="text-sm text-muted-foreground mt-2">Population: approx. {cityData.population}</p>
          </div>

          {/* NHS Trust */}
          <section className="bg-card border border-border rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Hospital className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">NHS Rheumatology Services</h2>
            </div>
            <p className="text-muted-foreground mb-3">
              Your local NHS trust for rheumatology referrals in {cityData.name} is <strong>{cityData.nhsTrust}</strong>.
              Ask your GP for a referral if you're experiencing persistent joint pain, stiffness, or swelling.
            </p>
            <a
              href={cityData.nhsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:underline text-sm font-medium"
            >
              Visit {cityData.nhsTrust} website <ArrowRight className="w-4 h-4" />
            </a>
          </section>

          {/* Local Resources */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Local Resources in {cityData.name}
            </h2>
            <ul className="space-y-3">
              {cityData.localResources.map((resource, i) => (
                <li key={i} className="flex items-start gap-3 bg-muted/30 rounded-xl p-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-foreground">{resource}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What You Can Do */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Managing Arthritis in {cityData.name}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Dumbbell, title: "Stay Active", desc: "Regular low-impact exercise like walking, swimming, and cycling helps maintain joint mobility.", link: "/exercises", linkText: "Exercise guides" },
                { icon: Apple, title: "Eat Well", desc: "An anti-inflammatory Mediterranean diet can reduce pain and stiffness.", link: "/diet", linkText: "Diet hub" },
                { icon: Heart, title: "Get Support", desc: "Connect with others living with arthritis in your area and online.", link: "/community", linkText: "Community" },
                { icon: BookOpen, title: "Learn More", desc: "Understand your condition better with our evidence-based guides.", link: "/blog", linkText: "Blog articles" },
              ].map(({ icon: Icon, title, desc, link, linkText }) => (
                <div key={title} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{desc}</p>
                  <Link to={link} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                    {linkText} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* How to Get Help */}
          <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" /> How to Get an NHS Referral in {cityData.name}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Visit your GP and describe your symptoms (pain, stiffness, swelling)</li>
              <li>Ask specifically for a referral to rheumatology</li>
              <li>You may be referred to <strong>{cityData.nhsTrust}</strong></li>
              <li>Waiting times vary — ask your GP about the current wait</li>
              <li>While waiting, try our <Link to="/self-help" className="text-primary hover:underline">self-help tools</Link></li>
            </ol>
          </section>

          {/* Other Cities */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Arthritis Support in Other UK Cities</h2>
            <div className="flex flex-wrap gap-2">
              {ukCities
                .filter((c) => c.slug !== cityData.slug)
                .slice(0, 12)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={`/arthritis-support/${c.slug}`}
                    className="text-sm px-3 py-1.5 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
          </section>

          <SocialShareButtons title={`Arthritis Support in ${cityData.name}`} slug={`arthritis-support/${cityData.slug}`} />
        </motion.div>
      </main>

      <Footer />
    </>
  );
};

export default CityArthritisPage;
