import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface SitemapLink {
  label: string;
  href: string;
  external?: boolean;
}

interface SitemapSection {
  title: string;
  links: SitemapLink[];
}

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
    links: [
      { label: "All Cities", href: "/arthritis-support" },
      { label: "London", href: "/arthritis-support/london" },
      { label: "Birmingham", href: "/arthritis-support/birmingham" },
      { label: "Manchester", href: "/arthritis-support/manchester" },
      { label: "Leeds", href: "/arthritis-support/leeds" },
      { label: "Glasgow", href: "/arthritis-support/glasgow" },
      { label: "Liverpool", href: "/arthritis-support/liverpool" },
      { label: "Edinburgh", href: "/arthritis-support/edinburgh" },
      { label: "Bristol", href: "/arthritis-support/bristol" },
      { label: "Sheffield", href: "/arthritis-support/sheffield" },
      { label: "Newcastle", href: "/arthritis-support/newcastle" },
      { label: "Cardiff", href: "/arthritis-support/cardiff" },
      { label: "Nottingham", href: "/arthritis-support/nottingham" },
      { label: "Leicester", href: "/arthritis-support/leicester" },
      { label: "Belfast", href: "/arthritis-support/belfast" },
      { label: "Brighton", href: "/arthritis-support/brighton" },
      { label: "Oxford", href: "/arthritis-support/oxford" },
      { label: "Cambridge", href: "/arthritis-support/cambridge" },
      { label: "Bath", href: "/arthritis-support/bath" },
      { label: "York", href: "/arthritis-support/york" },
      { label: "Exeter", href: "/arthritis-support/exeter" },
    ],
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
        <title>Sitemap – Living With Arthritis UK</title>
        <meta
          name="description"
          content="Browse all pages on Living With Arthritis UK. Find arthritis advice, exercises, diet tips and support resources."
        />
        {/* Prevent confusion with /sitemap.xml — this is a human-readable index */}
        <meta name="robots" content="noindex, follow" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/site-index" />
      <meta property="og:title" content="Sitemap – Living With Arthritis UK" />
      <meta property="og:description" content="Browse all pages on Living With Arthritis UK. Find arthritis advice, exercises, diet tips and support resources." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/sitemap" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Sitemap – Living With Arthritis UK" />
      <meta name="twitter:description" content="Browse all pages on Living With Arthritis UK. Find arthritis advice, exercises, diet tips and support resources." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
    </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-12 pb-20 md:pt-20 md:pb-28">
          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground mb-16 uppercase">
            Sitemap
          </h1>

          {/* Sections in two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {sitemapSections.map((section) => (
              <section key={section.title} className="break-inside-avoid">
                {/* Section heading */}
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
                  {section.title}
                </h2>
                <div className="h-px bg-border mb-5" />

                {/* Links */}
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
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
