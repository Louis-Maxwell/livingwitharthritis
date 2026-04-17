import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AITrustSafetyModal from "@/components/AITrustSafetyModal";

const Footer = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("footer.columns.getHelp"),
      links: [
        { label: t("footer.links.virtualPhysio"), href: "/chat" },
        { label: t("footer.links.exerciseHub"), href: "/exercises" },
        { label: t("footer.links.dietHub"), href: "/diet" },
        { label: t("footer.links.selfHelp"), href: "/self-help" },
        { label: t("footer.links.flareUps"), href: "/arthritis-flare-ups" },
      ],
    },
    {
      title: t("footer.columns.aboutArthritis"),
      links: [
        { label: t("footer.links.osteoarthritis"), href: "/conditions/osteoarthritis" },
        { label: t("footer.links.rheumatoid"), href: "/conditions/rheumatoid-arthritis" },
        { label: t("footer.links.psoriatic"), href: "/conditions/psoriatic-arthritis" },
        { label: t("footer.links.blog"), href: "/blog" },
        { label: t("footer.links.ukGuide"), href: "/guides/uk-arthritis" },
        { label: t("footer.links.nhsGuide"), href: "/guides/nhs-services" },
        { label: t("footer.links.dietGuide"), href: "/guides/diet" },
        { label: t("footer.links.exerciseGuide"), href: "/guides/exercise" },
        { label: t("footer.links.benefitsGuide"), href: "/guides/benefits-pip" },
      ],
    },
    {
      title: t("footer.columns.organisation"),
      links: [
        { label: t("footer.links.mission"), href: "/about" },
        { label: t("footer.links.trust"), href: "/trust" },
        { label: t("footer.links.governance"), href: "/governance" },
        { label: t("footer.links.finances"), href: "/finances" },
        { label: t("footer.links.impact"), href: "/impact" },
        { label: t("footer.links.community"), href: "/community" },
        { label: t("footer.links.corporate"), href: "/corporate-giving" },
        { label: t("footer.links.press"), href: "/press" },
        { label: t("footer.links.partners"), href: "/partners" },
        { label: t("footer.links.sitemap"), href: "/sitemap" },
      ],
    },
    {
      title: t("footer.columns.legal"),
      links: [
        { label: t("footer.links.privacy"), href: "/privacy" },
        { label: t("footer.links.cookies"), href: "/cookies" },
        { label: t("footer.links.terms"), href: "/terms" },
        { label: t("footer.links.accessibility"), href: "/accessibility" },
        { label: t("footer.links.safeguarding"), href: "/safeguarding" },
        { label: t("footer.links.complaints"), href: "/complaints" },
      ],
    },
    {
      title: t("footer.columns.connect"),
      links: [
        { label: "X / Twitter", href: "https://x.com/ArthritisOrg" },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/112596569/" },
      ],
    },
  ];

  const legalTitle = t("footer.columns.legal");

  return (
    <footer className="bg-muted/30 border-t border-border/20 pb-20 lg:pb-0" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-6 md:px-12 py-16 lg:py-20">
        {/* Logo + tagline */}
        <div className="mb-14">
          <p className="text-lg font-bold text-foreground tracking-tight">Living With Arthritis</p>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-sm leading-relaxed">
            {t("footer.tagline")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-5">{col.title}</h4>
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
                {col.title === legalTitle && (
                  <li>
                    <AITrustSafetyModal />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/15">
        <div className="container mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-muted-foreground/50 text-[11px] tracking-wide">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <a
            href="https://maxwellhealth.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-bold text-xs tracking-wide hover:text-primary transition-colors"
          >
            {t("footer.designedBy")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
