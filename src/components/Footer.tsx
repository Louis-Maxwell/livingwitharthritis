import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import FooterMostRead from "@/components/FooterMostRead";
import HelplineWidget from "@/components/HelplineWidget";
import NewsletterSignup from "@/components/NewsletterSignup";
import SiteLogo from "@/components/SiteLogo";
import { CHARITY, hasCharityAddress } from "@/config/charity";

const columns = [
  {
    title: "Get Help",
    links: [
      { label: "Our Services", href: "/services" },
      { label: "Virtual Physiotherapy", href: "/chat" },
      { label: "Exercise Hub", href: "/exercises" },
      { label: "Diet & Nutrition Hub", href: "/diet" },
      { label: "Supplements Guide", href: "/supplements" },
      { label: "Self Help Tool", href: "/self-help" },
      { label: "Arthritis Flare-Ups", href: "/arthritis-flare-ups" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "About Arthritis",
    links: [
      { label: "Osteoarthritis", href: "/conditions/osteoarthritis" },
      { label: "Rheumatoid Arthritis", href: "/conditions/rheumatoid-arthritis" },
      { label: "Psoriatic Arthritis", href: "/conditions/psoriatic-arthritis" },
      { label: "Blog & Research", href: "/blog" },
      { label: "UK Arthritis Guide", href: "/guides/uk-arthritis" },
      { label: "Health Services Guide", href: "/guides/health-services" },
      { label: "Diet & Nutrition Guide", href: "/guides/diet" },
      { label: "Exercise Guide", href: "/guides/exercise" },
      { label: "Benefits & PIP Guide", href: "/guides/benefits-pip" },
      { label: "Azathioprine Guide", href: "/guides/azathioprine-for-arthritis" },
    ],
  },
  {
    title: "Organisation",
    links: [
      { label: "Our Mission", href: "/about" },
      { label: "Trust & Credibility", href: "/trust" },
      { label: "AI Transparency", href: "/about/ai-transparency" },
      { label: "AI Answers & Tools", href: "/ai" },
      { label: "Connect an AI Assistant", href: "/connect" },
      { label: "Clinical Sources", href: "/sources" },
      { label: "Editorial Standards", href: "/editorial-standards" },
      { label: "Governance", href: "/governance" },
      
      { label: "Our Impact", href: "/impact" },
      { label: "Community Hub", href: "/community" },
      { label: "Corporate Giving", href: "/corporate-giving" },
      { label: "Press & Media", href: "/press" },
      { label: "Partners", href: "/partners" },
      { label: "Sitemap", href: "/site-index" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookies Policy", href: "/cookies" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Safeguarding Policy", href: "/safeguarding" },
      { label: "Complaints Procedure", href: "/complaints" },
      { label: "Image Gallery", href: "/gallery" },
      { label: "Image Credits", href: "/credits" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "X / Twitter", href: "https://x.com/ArthritisOrg" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/112596569/" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border/20 pb-20 lg:pb-0" role="contentinfo" aria-label="Site footer">
      {/* Helpline strip — sits above the footer on every page */}
      <HelplineWidget />

      {/* Newsletter signup — wide band below helpline */}
      <div className="container mx-auto px-6 md:px-12 pt-12 lg:pt-16">
        <NewsletterSignup variant="card" source="footer" />
      </div>

      <FooterMostRead />
      <div className="container mx-auto px-6 md:px-12 py-16 lg:py-20">
        <div className="mb-14">
          <SiteLogo variant="full" markClassName="h-10 md:h-12" textClassName="text-3xl md:text-4xl" />
          <p className="text-sm text-muted-foreground mt-3 max-w-sm leading-relaxed">
            Free physiotherapy, diet plans and evidence-based support for people living with arthritis across the UK.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-5">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-primary transition-colors duration-200 text-[13px]"
                      >
                        {link.label}
                      </a>
                    ) : link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        className="text-foreground/70 hover:text-primary transition-colors duration-200 text-[13px]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-foreground/70 hover:text-primary transition-colors duration-200 text-[13px]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/15">
        <div className="container mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="text-[11px] text-muted-foreground tracking-wide">
            <p>
              © {new Date().getFullYear()} {CHARITY.legalName}™ ·{" "}
              <a
                href={CHARITY.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-primary hover:underline transition-colors"
              >
                Registered Charity in England &amp; Wales No. {CHARITY.number}
              </a>
            </p>
            {hasCharityAddress() && (
              <address className="not-italic mt-1.5 flex items-start gap-1.5 leading-relaxed">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  Registered address: {CHARITY.address.name}, {CHARITY.address.street},{" "}
                  {CHARITY.address.locality}, {CHARITY.address.region} {CHARITY.address.postalCode}
                </span>
              </address>
            )}
            <p className="mt-1.5">Recently registered with the Charity Commission for England and Wales.</p>
          </div>
          <a
            href="https://maxwellhealth.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-bold text-xs tracking-wide hover:text-primary transition-colors"
          >
            Designed & Built by Maxwell Health
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
