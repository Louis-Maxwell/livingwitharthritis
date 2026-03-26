import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, ArrowUp, Heart, Sparkles } from "lucide-react";
import accreditationLogosWebp from "@/assets/accreditation-logos.webp";
import accreditationLogosPng from "@/assets/accreditation-logos.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const footerLinks = {
    getHelp: [
      { label: "Virtual Physiotherapy", href: "/chat" },
      { label: "Exercise Hub", href: "/exercises" },
      { label: "Diet & Nutrition Hub", href: "/diet" },
      { label: "Self Help Tool", href: "/self-help" },
      { label: "Pain Journal", href: "/pain-journal" },
    ],
    aboutArthritis: [
      { label: "Osteoarthritis", href: "/conditions/osteoarthritis" },
      { label: "Rheumatoid Arthritis", href: "/conditions/rheumatoid-arthritis" },
      { label: "Psoriatic Arthritis", href: "/conditions/psoriatic-arthritis" },
      { label: "Blog & Research", href: "/blog" },
      { label: "Arthritis Flare-Ups", href: "/arthritis-flare-ups" },
    ],
    aboutUs: [
      { label: "Our Mission", href: "/about" },
      { label: "Trust & Credibility", href: "/trust" },
      { label: "Governance & Constitution", href: "/governance" },
      { label: "Our Finances", href: "/finances" },
      { label: "Our Impact", href: "/impact" },
      { label: "Community Hub", href: "/community" },
      { label: "Corporate Giving", href: "/corporate-giving" },
      { label: "Sitemap", href: "/sitemap" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookies Policy", href: "/cookies" },
      { label: "Terms & Conditions", href: "/privacy" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-background text-foreground border-t border-border/40 pb-20 lg:pb-0" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-6 md:px-10 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-sm font-bold leading-none block tracking-tight text-foreground">Living With</span>
                <span className="text-sm font-bold leading-none block text-foreground mt-0.5 tracking-tight">Arthritis<sup className="text-[7px] align-super ml-0.5">™</sup></span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-xs text-sm">
              The UK's most comprehensive arthritis support platform, trusted by over 50,000 people with evidence-based, clinically reviewed care.
            </p>

            <div className="space-y-3">
              <a href="tel:07760512084" className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm">
                <Phone className="w-4 h-4" />
                <span>07760 512 084</span>
              </a>
              <a href="mailto:info@livingwitharthritis.org.uk" className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm">
                <Mail className="w-4 h-4" />
                <span>info@livingwitharthritis.org.uk</span>
              </a>
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Get Help", links: footerLinks.getHelp },
            { title: "About Arthritis", links: footerLinks.aboutArthritis },
            { title: "Organisation", links: footerLinks.aboutUs },
          ].map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-5">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                   <Link to={link.href} className="link-underline text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm pb-0.5">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social + Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-5">Connect</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                   <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="social-icon w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary-foreground"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Accreditation */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-6 md:px-10 py-8 flex justify-center">
          <picture>
            <source srcSet={accreditationLogosWebp} type="image/webp" />
            <img
              src={accreditationLogosPng}
              alt="Chartered Society of Physiotherapy and Health & Care Professions Council logos"
              className="h-16 md:h-20 object-contain opacity-70"
              width={306}
              height={112}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-6 md:px-10 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div>
              <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} Living with Arthritis™ — All rights reserved</p>
              <p className="text-muted-foreground/70 text-[10px] mt-0.5">Charity Registration Number: Pending · Registered in England & Wales</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground text-xs">Rated 4.9/5 by 2,400+ patients</span>
              <button
                onClick={scrollToTop}
                className="social-icon w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary-foreground btn-press"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Made by */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-6 md:px-10 py-4 flex justify-center">
          <span className="text-muted-foreground/60 text-[10px] tracking-widest uppercase">
            Designed & Built by <span className="font-semibold text-muted-foreground">MaxwellHealth</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
