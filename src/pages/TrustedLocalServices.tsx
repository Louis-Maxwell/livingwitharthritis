import { lazyWithRetry } from "@/lib/chunkRecovery";
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { ExternalLink, MapPin } from "lucide-react";
import { CHARITY } from "@/config/charity";

const Footer = lazyWithRetry(() => import("@/components/Footer"));

const PATH = "/trusted-local-services";
const TITLE = `Trusted Local Services | ${CHARITY.shortName}`;
const DESCRIPTION =
  "Local services we know and recommend to people living with arthritis, including ear and hearing care in Dartford.";

// eslint-disable-next-line react-refresh/only-export-components
export const TRUSTED_SERVICES = [
  {
    name: "Tragus – The Ear Specialists",
    description:
      "Private ear and hearing clinic for adults and children, offering microsuction ear wax removal, hearing tests, hearing aids and tinnitus support.",
    location: "Dartford, Kent",
    url: "https://tragusuk.com/",
    cta: "Visit Tragus",
  },
] as const;

const TrustedLocalServices = () => (
  <>
    <Helmet>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={`${CHARITY.siteUrl}${PATH}`} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${CHARITY.siteUrl}${PATH}`} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={`${CHARITY.siteUrl}/images/hero-walking-group-1600.webp`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="index, follow" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        gradient="from-muted/30 via-background to-muted/10"
        pattern="grid"
        title="Trusted local services"
        subtitle="Services we know and recommend to people living with arthritis."
      />
      <main id="main-content" className="w-full px-6 md:px-10 lg:px-20 py-10 md:py-16 max-w-5xl mx-auto">
        <p className="text-foreground/80 leading-relaxed max-w-3xl">
          These are local services we know and are happy to recommend. Listing a service is not an
          endorsement of any clinical outcome, and it does not replace advice from your GP or care team.
          Living With Arthritis is not responsible for third-party services.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {TRUSTED_SERVICES.map((s) => (
            <li key={s.url} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm flex flex-col">
              <h2 className="text-xl font-bold text-foreground">{s.name}</h2>
              <p className="mt-2 text-foreground/80 leading-relaxed">{s.description}</p>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" aria-hidden /> {s.location}
              </p>
              <a
                href={s.url}
                target="_blank"
                rel="noopener nofollow"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {s.cta} <ExternalLink className="w-4 h-4" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  </>
);

export default TrustedLocalServices;
