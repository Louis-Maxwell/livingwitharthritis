import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ukCities } from "@/data/ukCities";

interface SitemapLink {
  label: string;
  href: string;
  external?: boolean;
}

const EXERCISE_TYPES = [
  ["swimming", "Swimming"],
  ["yoga", "Yoga"],
  ["cycling", "Cycling"],
  ["walking", "Walking"],
  ["tai-chi", "Tai Chi"],
  ["pilates", "Pilates"],
  ["stretching", "Stretching"],
  ["strength-training", "Strength Training"],
] as const;
const JOINT_TYPES = [
  ["knee", "Knee"],
  ["hip", "Hip"],
  ["shoulder", "Shoulder"],
  ["hand", "Hand"],
  ["back", "Back"],
  ["ankle", "Ankle"],
] as const;
// Programmatic /conditions/:condition/:subpage URLs — previously only linked
// from their parent condition page, so they appeared as orphans in audits.
// Mirrors the 13 conditions in src/data/conditionSubpages.ts (× 4 sub-pages = 52).
const CONDITION_SUBPAGE_SLUGS = [
  ["osteoarthritis", "Osteoarthritis"],
  ["rheumatoid-arthritis", "Rheumatoid Arthritis"],
  ["psoriatic-arthritis", "Psoriatic Arthritis"],
  ["gout", "Gout"],
  ["ankylosing-spondylitis", "Ankylosing Spondylitis"],
  ["juvenile-arthritis", "Juvenile Arthritis"],
  ["fibromyalgia", "Fibromyalgia"],
  ["lupus", "Lupus"],
  ["knee-arthritis", "Knee Arthritis"],
  ["hand-arthritis", "Hand Arthritis"],
  ["shoulder-arthritis", "Shoulder Arthritis"],
  ["foot-and-ankle-arthritis", "Foot & Ankle Arthritis"],
  ["elbow-arthritis", "Elbow Arthritis"],
  ["hip-arthritis", "Hip Arthritis"],
  ["polymyalgia-rheumatica", "Polymyalgia Rheumatica"],
  ["reactive-arthritis", "Reactive Arthritis"],
] as const;
const SUBPAGE_KINDS = [
  ["symptoms", "Symptoms"],
  ["treatment", "Treatment"],
  ["exercises", "Exercises"],
  ["diet", "Diet"],
] as const;

const exerciseMatrixLinks: SitemapLink[] = EXERCISE_TYPES.flatMap(([exSlug, exLabel]) =>
  JOINT_TYPES.map(([jSlug, jLabel]) => ({
    label: `${exLabel} for ${jLabel} Arthritis`,
    href: `/exercises/${exSlug}-for-${jSlug}-arthritis`,
  })),
);

const conditionSubpageLinks: SitemapLink[] = CONDITION_SUBPAGE_SLUGS.flatMap(
  ([condSlug, condLabel]) =>
    SUBPAGE_KINDS.map(([subSlug, subLabel]) => ({
      label: `${condLabel} – ${subLabel}`,
      href: `/conditions/${condSlug}/${subSlug}`,
    })),
);

const cityLinks: SitemapLink[] = ukCities.map((c) => ({
  label: `Arthritis Support in ${c.name}`,
  href: `/arthritis-support/${c.slug}`,
}));

// Curated set of every public, indexable page. Auth/admin/utility routes
// (/auth, /admin/*, /donation-result, /unsubscribe,
// /debug/*) are intentionally omitted from this user-facing index.
// Thin combinatorial templates (city×condition, /uk/{city}/{service},
// /exercises/{joint}/for/{condition}) are omitted so Google is not
// re-fed empty URLs. /chat is public and indexable.
const ALL_LINKS: SitemapLink[] = [
  // Main pages
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "UK Arthritis Search Insights", href: "/about/uk-arthritis-search-insights" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Blog", href: "/blog" },
  { label: "Blog Hub", href: "/blog-hub" },
  { label: "Community Hub", href: "/community" },
  { label: "Complaints", href: "/complaints" },
  { label: "Chat / Help & Support", href: "/chat" },
  { label: "Contact", href: "/contact" },
  { label: "Cookies Policy", href: "/cookies" },
  { label: "Corporate Giving", href: "/corporate-giving" },
  { label: "Credits", href: "/credits" },
  { label: "Diet & Nutrition Hub", href: "/diet" },
  { label: "Donate", href: "/donate" },
  { label: "Exercise Hub", href: "/exercises" },
  { label: "Expert Articles", href: "/expert-articles" },
  { label: "FAQ", href: "/faq" },
  
  { label: "Gallery", href: "/gallery" },
  { label: "Governance", href: "/governance" },
  { label: "Health Tools", href: "/health-tools" },
  { label: "Impact Stories", href: "/impact" },
  { label: "Library", href: "/library" },
  { label: "Lived Experiences", href: "/stories" },
  { label: "Partners", href: "/partners" },
  { label: "Pedometer", href: "/pedometer" },
  { label: "Press", href: "/press" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Resource Directory", href: "/resources-directory" },
  { label: "Safeguarding", href: "/safeguarding" },
  { label: "Self-Assessment", href: "/self-assessment" },
  { label: "Self-Help Tool", href: "/self-help" },
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Trust & Credibility", href: "/trust" },
  { label: "Ways to Help", href: "/ways-to-help" },
  { label: "Zakat Appeal", href: "/zakat-appeal" },

  // Conditions
  { label: "Ankylosing Spondylitis", href: "/conditions/ankylosing-spondylitis" },
  { label: "Arthritis Flare-Ups", href: "/arthritis-flare-ups" },
  { label: "Fibromyalgia", href: "/conditions/fibromyalgia" },
  { label: "Gout", href: "/conditions/gout" },
  { label: "Elbow Pain & Arthritis", href: "/conditions/elbow-arthritis" },
  { label: "Foot & Ankle Arthritis", href: "/conditions/foot-and-ankle-arthritis" },
  { label: "Hand Arthritis", href: "/conditions/hand-arthritis" },
  { label: "Juvenile Arthritis", href: "/conditions/juvenile-arthritis" },
  { label: "Knee Arthritis", href: "/conditions/knee-arthritis" },
  { label: "Lupus", href: "/conditions/lupus" },
  { label: "Osteoarthritis", href: "/conditions/osteoarthritis" },
  { label: "Psoriatic Arthritis", href: "/conditions/psoriatic-arthritis" },
  { label: "Rheumatoid Arthritis", href: "/conditions/rheumatoid-arthritis" },
  { label: "Shoulder Arthritis", href: "/conditions/shoulder-arthritis" },
  { label: "Calcific Periarthritis", href: "/conditions/calcific-periarthritis" },

  // Pillar guides
  { label: "UK Arthritis Guide", href: "/guides/uk-arthritis" },
  { label: "Exercise Guide", href: "/guides/exercise" },
  { label: "Diet Guide", href: "/guides/diet" },
  { label: "Health Services Guide", href: "/guides/health-services" },
  { label: "Benefits & PIP Guide", href: "/guides/benefits-pip" },

  // Tai chi pillar pages
  { label: "Tai Chi for Arthritis", href: "/exercises/tai-chi-for-arthritis" },
  { label: "Tai Chi for Balance", href: "/exercises/tai-chi-for-balance" },
  { label: "Tai Chi for Beginners", href: "/exercises/tai-chi-for-beginners" },
  { label: "Seated Tai Chi for Arthritis", href: "/exercises/seated-tai-chi-for-arthritis" },

  // Diet pillar
  { label: "Mediterranean Diet for Arthritis", href: "/diet/mediterranean-diet-for-arthritis" },

  // Myths
  { label: "Does Cracking Knuckles Cause Arthritis?", href: "/myths/does-cracking-knuckles-cause-arthritis" },

  // Waiting list & tools
  { label: "Arthritis Waiting List Help", href: "/arthritis-waiting-list-help" },
  { label: "Waiting Time Calculator", href: "/tools/waiting-time" },

  // Buddy
  { label: "Buddy Programme", href: "/buddy" },
  { label: "Buddy Match", href: "/buddy/match" },

  // Regional hubs
  { label: "North West Region", href: "/regions/north-west" },
  { label: "Midlands Region", href: "/regions/midlands" },
  { label: "Scotland Region", href: "/regions/scotland" },
  { label: "Wales Region", href: "/regions/wales" },
  { label: "UK Arthritis Support – All Cities", href: "/arthritis-support" },

  // Blog – Diet & nutrition articles
  { label: "Best Diet for Joint Pain UK", href: "/blog/best-diet-for-joint-pain-uk" },
  { label: "Turmeric for Arthritis", href: "/blog/turmeric-for-arthritis" },
  { label: "Omega-3 & Fish Oil for Arthritis", href: "/blog/arthritis-and-omega-3-fish-oil" },
  { label: "Anti-Inflammatory Herbs & Spices", href: "/blog/anti-inflammatory-herbs-spices-arthritis" },
  { label: "Gut Health & Arthritis", href: "/blog/gut-health-arthritis-connection" },
  { label: "Meal Planning for Arthritis", href: "/blog/meal-planning-arthritis-uk" },
  { label: "Arthritis & Weight Loss UK", href: "/blog/arthritis-and-weight-loss-uk" },
  { label: "Arthritis Supplements UK", href: "/blog/arthritis-supplements-uk" },
  { label: "Arthritis Medication UK", href: "/blog/arthritis-medication-guide" },

  // Blog – Exercise articles
  { label: "Arthritis Exercises", href: "/blog/arthritis-exercises" },
  { label: "Knee Arthritis Exercises", href: "/blog/knee-arthritis-exercises-uk" },
  { label: "Hand Exercises for Arthritis", href: "/blog/hand-exercises-for-arthritis" },
  { label: "Shoulder Arthritis Exercises", href: "/blog/shoulder-arthritis-exercises-uk" },
  { label: "Foot & Ankle Arthritis", href: "/blog/foot-and-ankle-arthritis-uk" },
  { label: "Swimming for Arthritis", href: "/blog/swimming-for-arthritis" },
  { label: "Yoga for Arthritis Beginners", href: "/blog/yoga-for-arthritis-beginners" },
  { label: "Cycling for Arthritis", href: "/blog/cycling-with-arthritis" },
  { label: "Tai Chi for Arthritis (Article)", href: "/blog/tai-chi-for-arthritis-uk" },
  { label: "Hydrotherapy for Arthritis", href: "/blog/hydrotherapy-arthritis-uk" },
  { label: "Staying Active in Winter", href: "/blog/staying-active-arthritis-winter-uk" },

  // Blog – Lifestyle & wellbeing
  { label: "Cold Weather & Joint Pain", href: "/blog/cold-weather-arthritis-uk-winter" },
  { label: "Arthritis & Sleep Problems", href: "/blog/arthritis-and-sleep-problems" },
  { label: "Arthritis & Mental Health", href: "/blog/arthritis-and-mental-health-uk" },
  { label: "Arthritis at Work UK", href: "/blog/arthritis-and-work-uk" },
  { label: "Arthritis Flare-Up Guide", href: "/blog/arthritis-flare-up-what-to-do" },
  { label: "Osteoarthritis Symptoms UK", href: "/blog/osteoarthritis-symptoms-uk" },
  { label: "Natural Pain Relief for Arthritis", href: "/blog/natural-pain-relief-arthritis-uk" },
  { label: "Gardening with Arthritis", href: "/blog/gardening-with-arthritis-uk" },
  { label: "TENS Machines for Arthritis", href: "/blog/tens-machines-arthritis-uk" },
  { label: "Spinal Arthritis & Back Pain", href: "/blog/spinal-arthritis-back-pain-uk" },
  { label: "Mindfulness for Chronic Pain", href: "/blog/mindfulness-for-chronic-pain-uk" },
  { label: "Travelling with Arthritis", href: "/blog/travelling-with-arthritis-uk" },

  // Daily tips
  { label: "Daily Living Overview", href: "/daily-tips/overview" },
  { label: "Daily Living for Joint Health", href: "/daily-tips/daily-living" },
  { label: "Health Tips", href: "/daily-tips/health-tips" },
  { label: "Morning Stretches", href: "/daily-tips/morning-stretches" },
  { label: "Stay Hydrated", href: "/daily-tips/stay-hydrated" },
  { label: "Anti-Inflammatory Snacks", href: "/daily-tips/anti-inflammatory-snacks" },
  { label: "Walk 20 Minutes a Day", href: "/daily-tips/walk-20-minutes" },
  { label: "Prioritise Sleep", href: "/daily-tips/prioritise-sleep" },
  { label: "Pace Yourself", href: "/daily-tips/pace-yourself" },

  // Real generated pages (exercise joint guides, condition sub-pages, city hubs)
  ...exerciseMatrixLinks,
  ...conditionSubpageLinks,
  ...cityLinks,

  // XML sitemap (external)
  { label: "XML Sitemap (machine-readable)", href: "/sitemap.xml", external: true },
];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function bucketFor(label: string): string {
  const ch = label.trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(ch) ? ch : "#";
}

const Sitemap = () => {
  const { groups, presentLetters } = useMemo(() => {
    const seen = new Set<string>();
    const unique = ALL_LINKS.filter((l) => {
      if (seen.has(l.href)) return false;
      seen.add(l.href);
      return true;
    });

    const sorted = [...unique].sort((a, b) =>
      a.label.localeCompare(b.label, "en-GB", { sensitivity: "base" }),
    );

    const grouped: Record<string, SitemapLink[]> = {};
    for (const link of sorted) {
      const key = bucketFor(link.label);
      (grouped[key] ||= []).push(link);
    }
    const present = new Set(Object.keys(grouped));
    return { groups: grouped, presentLetters: present };
  }, []);

  return (
    <>
      <Helmet>
        <title>Site Index (A–Z) | Living With Arthritis UK</title>
        <meta name="robots" content="noindex, follow" />
        <meta
          name="description"
          content="A–Z index of every page on Living With Arthritis UK — condition guides, exercises, daily tips, regional support and more, listed alphabetically."
        />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <meta property="og:title" content="Site Index (A–Z) | Living With Arthritis UK" />
        <meta property="og:description" content="Every page on Living With Arthritis UK, listed alphabetically." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/site-index" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:locale" content="en_GB" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-12 pb-20 md:pt-20 md:pb-28">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Site Index
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground mb-6 uppercase">
            A–Z Index
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Every page on Living With Arthritis UK, listed alphabetically. Use the
            letters below to jump to a section, or browse the full list.
          </p>

          {/* Alpha jump nav */}
          <nav
            aria-label="Jump to letter"
            className="sticky top-0 z-20 -mx-4 sm:mx-0 mb-12 bg-background/95 backdrop-blur border-y border-border py-3"
          >
            <ul className="flex flex-wrap gap-1.5 sm:gap-2 px-4 sm:px-0">
              {LETTERS.map((letter) => {
                const isPresent = presentLetters.has(letter);
                return (
                  <li key={letter}>
                    {isPresent ? (
                      <a
                        href={`#letter-${letter}`}
                        className="inline-flex items-center justify-center w-9 h-9 text-sm font-semibold rounded border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                      >
                        {letter}
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="inline-flex items-center justify-center w-9 h-9 text-sm font-semibold rounded border border-border/40 text-muted-foreground/40 cursor-not-allowed"
                      >
                        {letter}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-14">
            {LETTERS.filter((l) => groups[l]?.length).map((letter) => (
              <section
                key={letter}
                id={`letter-${letter}`}
                className="scroll-mt-24"
              >
                <div className="flex items-baseline gap-4 mb-5">
                  <h2 className="font-display text-5xl sm:text-6xl font-black text-primary leading-none">
                    {letter}
                  </h2>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {groups[letter].length} {groups[letter].length === 1 ? "page" : "pages"}
                  </span>
                </div>
                <div className="h-px bg-border mb-6" />
                <ul className="columns-1 sm:columns-2 lg:columns-3 gap-x-8 space-y-2.5">
                  {groups[letter].map((link) => (
                    <li key={link.href} className="break-inside-avoid">
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-foreground underline decoration-border hover:decoration-primary hover:text-primary transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-foreground underline decoration-border hover:decoration-primary hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {groups["#"]?.length ? (
              <section id="letter-#" className="scroll-mt-24">
                <div className="flex items-baseline gap-4 mb-5">
                  <h2 className="font-display text-5xl sm:text-6xl font-black text-primary leading-none">
                    #
                  </h2>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Other
                  </span>
                </div>
                <div className="h-px bg-border mb-6" />
                <ul className="columns-1 sm:columns-2 lg:columns-3 gap-x-8 space-y-2.5">
                  {groups["#"].map((link) => (
                    <li key={link.href} className="break-inside-avoid">
                      <Link
                        to={link.href}
                        className="text-sm text-foreground underline decoration-border hover:decoration-primary hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Sitemap;
