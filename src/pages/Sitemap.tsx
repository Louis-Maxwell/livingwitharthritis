import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ukCities } from "@/data/ukCities";

interface SitemapLink {
  label: string;
  href: string;
  external?: boolean;
}

interface SitemapSection {
  title: string;
  links: SitemapLink[];
}

// Mirrors the URL groups in supabase/functions/generate-sitemap/index.ts
// so every XML sitemap entry has at least one internal link (de-orphan).
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
const CONDITION_SLUGS = [
  ["osteoarthritis", "Osteoarthritis"],
  ["rheumatoid-arthritis", "Rheumatoid Arthritis"],
  ["psoriatic-arthritis", "Psoriatic Arthritis"],
] as const;

const exerciseMatrixLinks: SitemapLink[] = EXERCISE_TYPES.flatMap(([exSlug, exLabel]) =>
  JOINT_TYPES.map(([jSlug, jLabel]) => ({
    label: `${exLabel} for ${jLabel} Arthritis`,
    href: `/exercises/${exSlug}-for-${jSlug}-arthritis`,
  })),
);

const cityLinks: SitemapLink[] = ukCities.map((c) => ({
  label: c.name,
  href: `/arthritis-support/${c.slug}`,
}));

const cityConditionLinks: SitemapLink[] = ukCities.flatMap((c) =>
  CONDITION_SLUGS.map(([condSlug, condLabel]) => ({
    label: `${c.name} – ${condLabel}`,
    href: `/arthritis-support/${c.slug}/${condSlug}`,
  })),
);

const sitemapSections: SitemapSection[] = [
  {
    title: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Exercise Hub", href: "/exercises" },
      { label: "Diet & Nutrition Hub", href: "/diet" },
      { label: "Trust & Credibility", href: "/trust" },
      { label: "Community Hub", href: "/community" },
      { label: "Virtual Assistant", href: "/chat" },
      { label: "Self Help Tool", href: "/self-help" },
      { label: "Health Tools", href: "/health-tools" },
      { label: "Blog", href: "/blog" },
      { label: "Sign In / Register", href: "/auth" },
    ],
  },
  {
    title: "Condition Guides",
    links: [
      { label: "Osteoarthritis", href: "/conditions/osteoarthritis" },
      { label: "Rheumatoid Arthritis", href: "/conditions/rheumatoid-arthritis" },
      { label: "Psoriatic Arthritis", href: "/conditions/psoriatic-arthritis" },
      { label: "Arthritis Flare-Ups", href: "/arthritis-flare-ups" },
    ],
  },
  {
    title: "In-Depth Guides",
    links: [
      { label: "UK Arthritis Guide", href: "/guides/uk-arthritis" },
      { label: "Exercise Guide", href: "/guides/exercise" },
      { label: "Diet Guide", href: "/guides/diet" },
      { label: "Health Services Guide", href: "/guides/health-services" },
      { label: "Benefits & PIP Guide", href: "/guides/benefits-pip" },
    ],
  },
  {
    title: "Regional Hubs",
    links: [
      { label: "North West", href: "/regions/north-west" },
      { label: "Midlands", href: "/regions/midlands" },
      { label: "Scotland", href: "/regions/scotland" },
      { label: "Wales", href: "/regions/wales" },
    ],
  },
  {
    title: "Waiting List & Tools",
    links: [
      { label: "Arthritis Waiting List Help", href: "/arthritis-waiting-list-help" },
      { label: "Waiting Time Calculator", href: "/tools/waiting-time" },
      { label: "Arthritis Starter Guide", href: "/arthritis-starter-guide" },
    ],
  },
  {
    title: "Diet & Nutrition Articles",
    links: [
      { label: "Best Diet for Joint Pain UK", href: "/blog/best-diet-for-joint-pain-uk" },
      { label: "Turmeric for Arthritis", href: "/blog/turmeric-for-arthritis-uk" },
      { label: "Omega-3 & Fish Oil", href: "/blog/arthritis-and-omega-3-fish-oil" },
      { label: "Anti-Inflammatory Herbs & Spices", href: "/blog/anti-inflammatory-herbs-spices-arthritis" },
      { label: "Gut Health & Arthritis", href: "/blog/gut-health-arthritis-connection" },
      { label: "Meal Planning for Arthritis", href: "/blog/meal-planning-arthritis-uk" },
      { label: "Arthritis & Weight Loss UK", href: "/blog/arthritis-and-weight-loss-uk" },
      { label: "Arthritis Supplements UK", href: "/blog/arthritis-supplements-uk" },
      { label: "Arthritis Medication UK", href: "/blog/arthritis-medication-uk" },
    ],
  },
  {
    title: "Exercise & Movement Articles",
    links: [
      { label: "Arthritis Exercises", href: "/blog/arthritis-exercises" },
      { label: "Knee Exercises", href: "/blog/knee-arthritis-exercises-uk" },
      { label: "Hand Exercises", href: "/blog/hand-exercises-for-arthritis" },
      { label: "Shoulder Exercises", href: "/blog/shoulder-arthritis-exercises-uk" },
      { label: "Foot & Ankle Arthritis", href: "/blog/foot-and-ankle-arthritis-uk" },
      { label: "Swimming for Arthritis", href: "/blog/swimming-for-arthritis-uk" },
      { label: "Yoga for Arthritis", href: "/blog/yoga-for-arthritis-beginners" },
      { label: "Cycling for Arthritis", href: "/blog/arthritis-and-cycling-uk" },
      { label: "Tai Chi for Arthritis", href: "/blog/tai-chi-for-arthritis-uk" },
      { label: "Hydrotherapy", href: "/blog/hydrotherapy-arthritis-uk" },
      { label: "Staying Active in Winter", href: "/blog/staying-active-arthritis-winter-uk" },
    ],
  },
  {
    title: "Exercises by Joint",
    links: exerciseMatrixLinks,
  },
  {
    title: "Lifestyle & Wellbeing",
    links: [
      { label: "Cold Weather & Joint Pain", href: "/blog/arthritis-and-cold-weather-uk" },
      { label: "Arthritis & Sleep Problems", href: "/blog/arthritis-and-sleep-problems" },
      { label: "Arthritis & Mental Health", href: "/blog/arthritis-and-mental-health" },
      { label: "Arthritis at Work UK", href: "/blog/arthritis-and-work-uk" },
      { label: "Arthritis Flare-Up Guide", href: "/blog/arthritis-flare-up-what-to-do" },
      { label: "Osteoarthritis Symptoms UK", href: "/blog/osteoarthritis-symptoms-uk" },
      { label: "Natural Pain Relief", href: "/blog/natural-pain-relief-arthritis-uk" },
      { label: "Gardening with Arthritis", href: "/blog/gardening-with-arthritis-uk" },
      { label: "TENS Machines", href: "/blog/tens-machines-arthritis-uk" },
      { label: "Spinal Arthritis & Back Pain", href: "/blog/spinal-arthritis-back-pain-uk" },
      { label: "Mindfulness for Pain", href: "/blog/mindfulness-for-chronic-pain-uk" },
      { label: "Travelling with Arthritis", href: "/blog/travelling-with-arthritis-uk" },
    ],
  },
  {
    title: "Daily Tips",
    links: [
      { label: "Daily Living Overview", href: "/daily-tips/overview" },
      { label: "Daily Living for Joint Health", href: "/daily-tips/daily-living" },
      { label: "Health Tips", href: "/daily-tips/health-tips" },
      { label: "Morning Stretches", href: "/daily-tips/morning-stretches" },
      { label: "Stay Hydrated", href: "/daily-tips/stay-hydrated" },
      { label: "Anti-Inflammatory Snacks", href: "/daily-tips/anti-inflammatory-snacks" },
      { label: "Walk 20 Minutes", href: "/daily-tips/walk-20-minutes" },
      { label: "Prioritise Sleep", href: "/daily-tips/prioritise-sleep" },
      { label: "Pace Yourself", href: "/daily-tips/pace-yourself" },
    ],
  },
  {
    title: "UK Arthritis Support by City",
    links: [{ label: "All Cities", href: "/arthritis-support" }, ...cityLinks],
  },
  {
    title: "City × Condition Pages",
    links: cityConditionLinks,
  },
  {
    title: "Support & Donate",
    links: [
      { label: "Donate", href: "/#fundraising" },
      { label: "Zakat Appeal", href: "/zakat-appeal" },
      { label: "Ways to Help", href: "/ways-to-help" },
      { label: "Corporate Giving", href: "/corporate-giving" },
    ],
  },
  {
    title: "About & Governance",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Governance", href: "/governance" },
      { label: "Finances", href: "/finances" },
      { label: "Partners", href: "/partners" },
      { label: "Press", href: "/press" },
      { label: "Safeguarding", href: "/safeguarding" },
      { label: "Impact Stories", href: "/impact-stories" },
    ],
  },
  {
    title: "Legal & Policies",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookies Policy", href: "/cookies" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Complaints", href: "/complaints" },
      { label: "XML Sitemap", href: "/sitemap.xml", external: true },
    ],
  },
];

const Sitemap = () => {
  return (
    <>
      <Helmet>
        <title>Site Index – Living With Arthritis UK</title>
        {/* Single robots directive: noindex but follow so this page passes link equity
            to every URL in the XML sitemap (de-orphans matrix/city/tip pages). */}
        <meta name="robots" content="noindex, follow" />
        <meta
          name="description"
          content="Browse every page on Living With Arthritis UK: condition guides, exercises by joint, city support, daily tips and more."
        />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/sitemap" />
        <meta property="og:title" content="Sitemap – Living With Arthritis UK" />
        <meta property="og:description" content="Browse every page on Living With Arthritis UK." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/sitemap" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sitemap – Living With Arthritis UK" />
        <meta name="twitter:description" content="Browse every page on Living With Arthritis UK." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-12 pb-20 md:pt-20 md:pb-28">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground mb-6 uppercase">
            Sitemap
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-16">
            A complete index of every page on Living With Arthritis UK — including all
            exercise routines by joint, every UK city support page, and the daily tips library.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {sitemapSections.map((section) => (
              <section key={section.title} className="break-inside-avoid">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
                  {section.title}
                </h2>
                <div className="h-px bg-border mb-5" />

                <ul className="space-y-2 columns-1 sm:columns-2 md:columns-1 lg:columns-2 gap-x-6">
                  {section.links.map((link) => (
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
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Sitemap;
