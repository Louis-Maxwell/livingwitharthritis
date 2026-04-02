import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, ArrowUp, Heart } from "lucide-react";
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
      
    ],
    aboutArthritis: [
      { label: "Osteoarthritis", href: "/conditions/osteoarthritis" },
      { label: "Rheumatoid Arthritis", href: "/conditions/rheumatoid-arthritis" },
      { label: "Psoriatic Arthritis", href: "/conditions/psoriatic-arthritis" },
      { label: "Blog & Research", href: "/blog" },
      { label: "Arthritis Flare-Ups", href: "/arthritis-flare-ups" },
    ],
    guides: [
      { label: "UK Arthritis Guide", href: "/guides/uk-arthritis" },
      { label: "NHS Services Guide", href: "/guides/nhs-services" },
      { label: "Diet & Nutrition Guide", href: "/guides/diet" },
      { label: "Exercise Guide", href: "/guides/exercise" },
      { label: "Benefits & PIP Guide", href: "/guides/benefits-pip" },
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
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Safeguarding Policy", href: "/safeguarding" },
      { label: "Complaints Procedure", href: "/complaints" },
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
    <footer className="bg-navy text-white pb-20 lg:pb-0" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-6 md:px-12 py-20 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-14 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-sm font-bold leading-none block tracking-tight text-white">Living With</span>
                <span className="text-sm font-bold leading-none block text-white mt-0.5 tracking-tight">Arthritis<sup className="text-[7px] align-super ml-0.5 text-white/40">™</sup></span>
              </div>
            </div>
            <p className="text-white/40 leading-relaxed mb-8 max-w-xs text-sm">
              The UK's most comprehensive arthritis support platform, trusted by over 50,000 people with evidence-based, clinically reviewed care.
            </p>

            <div className="space-y-3.5">
              <a href="tel:07760512084" className="flex items-center gap-2.5 text-white/35 hover:text-white/70 transition-colors duration-300 text-sm">
                <Phone className="w-4 h-4" />
                <span>07760 512 084</span>
              </a>
              <a href="mailto:info@livingwitharthritis.org.uk" className="flex items-center gap-2.5 text-white/35 hover:text-white/70 transition-colors duration-300 text-sm">
                <Mail className="w-4 h-4" />
                <span>info@livingwitharthritis.org.uk</span>
              </a>
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Get Help", links: footerLinks.getHelp },
            { title: "About Arthritis", links: footerLinks.aboutArthritis },
            { title: "Guides", links: footerLinks.guides },
            { title: "Organisation", links: footerLinks.aboutUs },
          ].map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-6">{section.title}</h4>
              <ul className="space-y-3.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                   <Link to={link.href} className="text-white/40 hover:text-white/80 transition-colors duration-300 text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social + Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-6">Connect</h4>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                   <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-5">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-white/40 hover:text-white/80 transition-colors duration-300 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Accreditation */}
      <div className="border-t border-white/6">
        <div className="container mx-auto px-6 md:px-12 py-10 flex justify-center">
          <picture>
            <source srcSet={accreditationLogosWebp} type="image/webp" />
            <img
              src={accreditationLogosPng}
              alt="Chartered Society of Physiotherapy and Health & Care Professions Council logos"
              className="h-16 md:h-20 object-contain opacity-40 brightness-200"
              width={306}
              height={112}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="container mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div>
              <p className="text-white/25 text-xs tracking-wider">© {new Date().getFullYear()} Living with Arthritis™ — All rights reserved</p>
              <p className="text-white/15 text-[10px] mt-1 tracking-wider">27 Old Gloucester Street, London WC1N 3AX · Registered in England & Wales</p>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-white/20 text-xs tracking-wider">Rated 4.9/5 by 2,400+ patients*</span>
              <button
                onClick={scrollToTop}
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all duration-300"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Made by */}
      <div className="border-t border-white/4">
        <div className="container mx-auto px-6 md:px-12 py-5 flex justify-center">
          <span className="text-white/15 text-[10px] tracking-[0.3em] uppercase">
            Designed & Built by <span className="font-semibold text-white/25">MaxwellHealth</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
