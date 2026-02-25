import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Globe, BookOpen, Sun, Heart, FileText, Stethoscope } from "lucide-react";

const sitemapSections = [
  {
    title: "Main Pages",
    icon: Globe,
    links: [
      { label: "Home", href: "/", description: "Arthritis support, services and resources" },
      { label: "Virtual Assistant", href: "/chat", description: "AI-powered arthritis guidance chat" },
      { label: "Sign In / Register", href: "/auth", description: "Access your account" },
    ],
  },
  {
    title: "Condition Guides",
    icon: Stethoscope,
    links: [
      { label: "Osteoarthritis", href: "/conditions/osteoarthritis", description: "Symptoms, causes, exercises and diet for OA" },
      { label: "Rheumatoid Arthritis", href: "/conditions/rheumatoid-arthritis", description: "Autoimmune arthritis: diagnosis, treatment and living with RA" },
      { label: "Psoriatic Arthritis", href: "/conditions/psoriatic-arthritis", description: "Joint and skin condition: symptoms, treatment and support" },
    ],
  },
  {
    title: "Blog Articles",
    icon: BookOpen,
    links: [
      { label: "All Articles", href: "/blog", description: "Evidence-based UK arthritis advice" },
      { label: "Best Diet for Joint Pain UK", href: "/blog/best-diet-for-joint-pain-uk", description: "Anti-inflammatory foods and Mediterranean diet guidance" },
      { label: "NHS Arthritis Exercises", href: "/blog/nhs-arthritis-exercises", description: "Low-impact exercises recommended by UK physiotherapists" },
      { label: "Osteoarthritis Symptoms", href: "/blog/osteoarthritis-symptoms-uk", description: "Recognise symptoms and when to see your GP" },
      { label: "Arthritis Supplements UK", href: "/blog/arthritis-supplements-uk", description: "Glucosamine, collagen, turmeric and omega-3 reviewed" },
      { label: "Arthritis Medication UK", href: "/blog/arthritis-medication-uk", description: "NHS treatments and pain relief options explained" },
    ],
  },
  {
    title: "Daily Tips",
    icon: Sun,
    links: [
      { label: "Daily Living Overview", href: "/daily-tips/overview", description: "A holistic approach to managing joint stiffness" },
      { label: "Morning Stretches", href: "/daily-tips/morning-stretches", description: "Gentle stretches to ease morning stiffness" },
      { label: "Stay Hydrated", href: "/daily-tips/stay-hydrated", description: "Why hydration matters for joint health" },
      { label: "Anti-inflammatory Snacks", href: "/daily-tips/anti-inflammatory-snacks", description: "Healthy snacks that fight inflammation" },
      { label: "Walk 20 Minutes", href: "/daily-tips/walk-20-minutes", description: "Low-impact walking for mobility" },
      { label: "Prioritise Sleep", href: "/daily-tips/prioritise-sleep", description: "Better sleep for pain management" },
      { label: "Pace Yourself", href: "/daily-tips/pace-yourself", description: "Energy management throughout the day" },
    ],
  },
  {
    title: "Support & Donate",
    icon: Heart,
    links: [
      { label: "Donate", href: "/#fundraising", description: "Help us reach our fundraising goal" },
    ],
  },
  {
    title: "Technical",
    icon: FileText,
    links: [
      { label: "XML Sitemap", href: "/sitemap.xml", description: "Machine-readable sitemap for search engines", external: true },
    ],
  },
];

const Sitemap = () => (
  <>
    <Helmet>
      <title>Sitemap – Living With Arthritis UK</title>
      <meta name="description" content="Browse all pages on Living With Arthritis UK. Find arthritis advice, exercises, diet tips and support resources." />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/sitemap" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Sitemap</h1>
        <p className="text-muted-foreground mb-12">A complete list of pages on our website.</p>

        <div className="space-y-10">
          {sitemapSections.map((section) => {
            const Icon = section.icon;
            return (
              <section key={section.title}>
                <div className="flex items-center gap-2.5 mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-foreground">{section.title}</h2>
                </div>
                <ul className="space-y-1">
                  {section.links.map((link: any) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-baseline gap-3 rounded-lg px-4 py-3 hover:bg-accent transition-colors"
                        >
                          <span className="text-primary font-medium text-sm group-hover:underline">{link.label}</span>
                          <span className="text-muted-foreground text-xs hidden sm:inline">— {link.description}</span>
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="group flex items-baseline gap-3 rounded-lg px-4 py-3 hover:bg-accent transition-colors"
                        >
                          <span className="text-primary font-medium text-sm group-hover:underline">{link.label}</span>
                          <span className="text-muted-foreground text-xs hidden sm:inline">— {link.description}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default Sitemap;