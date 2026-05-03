import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { ukCities } from "@/data/ukCities";
import { MapPin, Hospital, ArrowRight, Stethoscope, Calculator, Users } from "lucide-react";

const BASE = "https://livingwitharthritis.org.uk";

interface Region {
  slug: string;
  name: string;
  intro: string;
  citySlugs: string[];
  highlights: string[];
  keywords: string;
}

const REGIONS: Record<string, Region> = {
  "north-west": {
    slug: "north-west",
    name: "North West England",
    intro: "Find arthritis support, rheumatology services, and patient communities across Manchester, Liverpool, Preston, Blackpool, Warrington and Wigan. The North West is home to leading rheumatology centres including the Kellgren Centre and the Royal Liverpool Hospital.",
    citySlugs: ["manchester", "liverpool", "preston", "blackpool", "warrington", "wigan"],
    highlights: [
      "Kellgren Centre for Rheumatology — Manchester",
      "Royal Liverpool Hospital — specialist rheumatology",
      "Aintree University Hospital MSK service",
      "Lancashire Teaching Hospitals rheumatology referrals",
    ],
    keywords: "arthritis support north west england, rheumatology manchester liverpool, north west arthritis services",
  },
  "midlands": {
    slug: "midlands",
    name: "The Midlands",
    intro: "Explore arthritis services across Birmingham, Coventry, Wolverhampton, Stoke-on-Trent, Nottingham, Leicester and Derby. The Midlands hosts the renowned Haywood Hospital rheumatology centre and the Queen Elizabeth Hospital Birmingham.",
    citySlugs: ["birmingham", "coventry", "wolverhampton", "stoke-on-trent", "nottingham", "leicester", "derby"],
    highlights: [
      "Queen Elizabeth Hospital Birmingham — major rheumatology centre",
      "Haywood Hospital, Stoke — specialist rheumatology",
      "Queen's Medical Centre Nottingham",
      "Black Country MSK Service — Wolverhampton",
    ],
    keywords: "arthritis midlands, rheumatology birmingham nottingham, midlands arthritis support",
  },
  "scotland": {
    slug: "scotland",
    name: "Scotland",
    intro: "Access arthritis care across Glasgow, Edinburgh, Aberdeen and Dundee through Scotland's health service. Scottish patients benefit from Versus Arthritis Scotland support networks and university-led research at Glasgow and Edinburgh.",
    citySlugs: ["glasgow", "edinburgh", "aberdeen", "dundee"],
    highlights: [
      "Gartnavel General Hospital Rheumatology — Glasgow",
      "Western General Hospital — Edinburgh",
      "Aberdeen Royal Infirmary Rheumatology",
      "Versus Arthritis Scotland support",
    ],
    keywords: "arthritis scotland, the health service scotland rheumatology, scottish arthritis support",
  },
  "wales": {
    slug: "wales",
    name: "Wales",
    intro: "Find arthritis support across Cardiff, Swansea and Welsh health boards. Wales's health service provides specialist rheumatology with Arthritis Cymru offering Welsh-language patient support.",
    citySlugs: ["cardiff", "swansea"],
    highlights: [
      "University Hospital of Wales — Cardiff",
      "Morriston Hospital — Swansea",
      "Arthritis Cymru — Welsh patient support",
      "Cardiff & Vale University Health Board",
    ],
    keywords: "arthritis wales cymru, the health service wales rheumatology, welsh arthritis support",
  },
};

const RegionHub = () => {
  const { region } = useParams<{ region: string }>();
  const r = region ? REGIONS[region] : undefined;

  useEffect(() => {
    if (!r) return;
    const ld = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: `Arthritis Support in ${r.name} | Living With Arthritis`,
      description: r.intro,
      url: `${BASE}/regions/${r.slug}`,
      inLanguage: "en-GB",
      audience: {
        "@type": "MedicalAudience",
        audienceType: "Patient",
        geographicArea: { "@type": "AdministrativeArea", name: `${r.name}, United Kingdom` },
      },
    };
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Regions", item: `${BASE}/regions` },
        { "@type": "ListItem", position: 3, name: r.name, item: `${BASE}/regions/${r.slug}` },
      ],
    };
    const s1 = document.createElement("script");
    s1.type = "application/ld+json";
    s1.text = JSON.stringify(ld);
    s1.dataset.region = "1";
    document.head.appendChild(s1);
    const s2 = document.createElement("script");
    s2.type = "application/ld+json";
    s2.text = JSON.stringify(breadcrumb);
    s2.dataset.region = "2";
    document.head.appendChild(s2);
    return () => {
      document.querySelectorAll("script[data-region]").forEach((el) => el.remove());
    };
  }, [r]);

  if (!r) return <Navigate to="/404" replace />;

  const cities = r.citySlugs.map((s) => ukCities.find((c) => c.slug === s)).filter(Boolean) as typeof ukCities;

  return (
    <>
      <Helmet>
        <title>{`Arthritis Support in ${r.name} — Rheumatology & Local Help | Living With Arthritis`}</title>
        <meta name="description" content={`${r.intro.slice(0, 155)}`} />
        <meta name="keywords" content={r.keywords} />
        <link rel="canonical" href={`${BASE}/regions/${r.slug}`} />
        <meta property="og:title" content={`Arthritis Support in ${r.name}`} />
        <meta property="og:description" content={r.intro} />
        <meta property="og:url" content={`${BASE}/regions/${r.slug}`} />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content={r.name} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Arthritis Support in ${r.name}`} />
        <meta name="twitter:description" content={r.intro.slice(0, 200)} />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
      </Helmet>

      <Header />

      <PageBreadcrumb segments={[{ label: "Regions", href: "/regions" }, { label: r.name }]} />

      <main className="container mx-auto px-6 md:px-10 py-10 max-w-5xl">
        <div className="flex items-center gap-2 text-primary mb-3">
          <MapPin className="w-5 h-5" />
          <span className="text-sm font-medium uppercase tracking-wide">United Kingdom</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">
          Arthritis Support in {r.name}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl">{r.intro}</p>

        <section className="bg-card border border-border rounded-2xl p-6 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Hospital className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Major Rheumatology Centres</h2>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {r.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-foreground/85 bg-muted/30 rounded-xl p-4">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Cities & Towns in {r.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((c) => (
              <Link
                key={c.slug}
                to={`/arthritis-support/${c.slug}`}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-sm transition-all group"
              >
                <p className="font-semibold text-foreground group-hover:text-primary">{c.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.localTrust}</p>
                <ArrowRight className="w-4 h-4 text-primary mt-3 opacity-0 group-hover:opacity-100 transition" />
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <Calculator className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Worried about the health service waiting times in {r.name}?</h2>
              <p className="text-muted-foreground mb-4">
                Use our free Arthritis Waiting Time Calculator to estimate your referral wait and discover what to do while you wait.
              </p>
              <Link
                to="/tools/waiting-time"
                className="inline-flex items-center gap-1.5 text-primary font-medium hover:underline"
              >
                Open the calculator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary" /> Common Conditions
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { slug: "osteoarthritis", label: "Osteoarthritis" },
              { slug: "rheumatoid-arthritis", label: "Rheumatoid Arthritis" },
              { slug: "psoriatic-arthritis", label: "Psoriatic Arthritis" },
            ].map((c) => (
              <Link
                key={c.slug}
                to={`/conditions/${c.slug}`}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all"
              >
                <p className="font-semibold text-sm">{c.label}</p>
                <p className="text-xs text-muted-foreground mt-1">UK guide & support</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default RegionHub;
