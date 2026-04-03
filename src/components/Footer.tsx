import { Link } from "react-router-dom";

const Footer = () => {
  const columns = [
    {
      title: "Get Help",
      links: [
        { label: "Virtual Physiotherapy", href: "/chat" },
        { label: "Exercise Hub", href: "/exercises" },
        { label: "Diet & Nutrition Hub", href: "/diet" },
        { label: "Self Help Tool", href: "/self-help" },
        { label: "Arthritis Flare-Ups", href: "/arthritis-flare-ups" },
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
        { label: "NHS Services Guide", href: "/guides/nhs-services" },
        { label: "Diet & Nutrition Guide", href: "/guides/diet" },
        { label: "Exercise Guide", href: "/guides/exercise" },
        { label: "Benefits & PIP Guide", href: "/guides/benefits-pip" },
      ],
    },
    {
      title: "Organisation",
      links: [
        { label: "Our Mission", href: "/about" },
        { label: "Trust & Credibility", href: "/trust" },
        { label: "Governance", href: "/governance" },
        { label: "Our Finances", href: "/finances" },
        { label: "Our Impact", href: "/impact" },
        { label: "Community Hub", href: "/community" },
        { label: "Corporate Giving", href: "/corporate-giving" },
        { label: "Press & Media", href: "/press" },
        { label: "Partners", href: "/partners" },
        { label: "Sitemap", href: "/sitemap" },
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
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Facebook", href: "#" },
        { label: "X / Twitter", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "YouTube", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-muted/40 border-t border-border pb-20 lg:pb-0" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-6 md:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-muted-foreground/60 text-sm font-medium mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        className="text-foreground hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-foreground hover:text-primary transition-colors duration-200 text-sm"
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

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Living with Arthritis™ · 27 Old Gloucester Street, London WC1N 3AX · Registered in England & Wales
          </p>
          <span className="text-muted-foreground/60 text-xs">
            Designed & Built by MaxwellHealth
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
