import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, ArrowUp, Heart, Sparkles, Globe, ShieldCheck } from "lucide-react";
import accreditationLogos from "@/assets/accreditation-logos.png";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
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
      { label: "Community Hub", href: "/community" },
      { label: "Corporate Giving", href: "/corporate-giving" },
      { label: "Zakat Appeal", href: "/zakat-appeal" },
      { label: "Sitemap", href: "/sitemap" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookies Policy", href: "/cookies" },
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
    <footer className="bg-primary text-primary-foreground relative overflow-hidden" role="contentinfo" aria-label="Site footer">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/8 blur-[180px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-6 md:px-10 py-24 lg:py-32 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-14 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <span className="text-base font-black leading-none block tracking-tight text-primary-foreground uppercase">Living With</span>
                <span className="text-base font-black leading-none block text-primary-foreground mt-0.5 tracking-tight uppercase">Arthritis<sup className="text-[7px] align-super ml-0.5">™</sup></span>
              </div>
            </div>
            <p className="text-primary-foreground/70 leading-[1.9] mb-6 max-w-xs text-sm">
              The UK's most comprehensive arthritis support platform. Building technology that supports 
              over 50,000 people across all four UK nations through evidence-based, clinically reviewed care.
            </p>

            {/* Institutional badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/5 border border-primary-foreground/8 text-primary-foreground/35 text-[10px] font-bold tracking-wider">
                <ShieldCheck className="w-3 h-3" /> HCPC Registered
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/8 border border-primary-foreground/12 text-primary-foreground/60 text-[10px] font-bold tracking-wider">
                <ShieldCheck className="w-3 h-3" /> CSP Accredited
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/8 border border-primary-foreground/12 text-primary-foreground/60 text-[10px] font-bold tracking-wider">
                <Globe className="w-3 h-3" /> 42 Countries
              </span>
            </div>

            <div className="space-y-4">
              <a href="tel:07760512084" className="flex items-center gap-3 text-primary-foreground/35 hover:text-primary-foreground/70 transition-all duration-300 text-sm group">
                <div className="w-9 h-9 rounded-xl bg-primary-foreground/5 flex items-center justify-center group-hover:bg-secondary/20 group-hover:scale-105 transition-all duration-300">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>07760 512 084</span>
              </a>
              <a href="mailto:info@livingwitharthritis.org.uk" className="flex items-center gap-3 text-primary-foreground/35 hover:text-primary-foreground/70 transition-all duration-300 text-sm group">
                <div className="w-9 h-9 rounded-xl bg-primary-foreground/5 flex items-center justify-center group-hover:bg-secondary/20 group-hover:scale-105 transition-all duration-300">
                  <Mail className="w-3.5 h-3.5" />
                </div>
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
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/25 mb-6">{section.title}</h4>
              <ul className="space-y-3.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-all duration-300 text-sm cursor-pointer hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social + Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/25 mb-6">Connect</h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl bg-primary-foreground/5 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/25 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-primary-foreground/35 hover:text-primary-foreground/60 transition-colors duration-300 text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Accreditation */}
      <div className="border-t border-primary-foreground/[0.05]">
        <div className="container mx-auto px-6 md:px-10 py-12 flex justify-center">
          <img
            src={accreditationLogos}
            alt="Chartered Society of Physiotherapy and Health & Care Professions Council logos"
            className="h-20 md:h-28 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
            width={320}
            height={112}
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-primary-foreground/[0.05]">
        <div className="container mx-auto px-6 md:px-10 py-7">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-primary-foreground/60 text-xs tracking-wider">© {new Date().getFullYear()} Living with Arthritis™ — All rights reserved</p>
              <p className="text-primary-foreground/40 text-[10px] mt-1 tracking-wider">Charity Registration Number: Pending · Registered in England & Wales</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-primary-foreground/50 text-[10px] tracking-wider">Rated 4.9/5 by 2,400+ patients</span>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-xl bg-primary-foreground/5 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:scale-105 transition-all duration-300"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Made by MaxwellHealth */}
      <div className="border-t border-primary-foreground/[0.04]">
        <div className="container mx-auto px-6 md:px-10 py-6 flex justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="group flex items-center gap-2 text-primary-foreground/15 hover:text-primary-foreground/45 transition-all duration-500 text-[11px] tracking-[0.25em] uppercase font-medium">
                <span>Designed & Built by</span>
                <span className="relative font-bold bg-gradient-to-r from-secondary via-secondary/80 to-secondary bg-clip-text text-transparent group-hover:drop-shadow-[0_0_8px_hsl(var(--secondary)/0.6)] transition-all duration-500">
                  MaxwellHealth
                </span>
                <Sparkles className="w-3 h-3 text-secondary/30 group-hover:text-secondary group-hover:drop-shadow-[0_0_6px_hsl(var(--secondary)/0.5)] transition-all duration-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              className="w-64 bg-foreground border-primary-foreground/10 text-primary-foreground shadow-2xl shadow-primary/10 rounded-xl p-5"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center shadow-lg shadow-secondary/20">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight bg-gradient-to-r from-background to-background/80 bg-clip-text text-transparent">MaxwellHealth</p>
                  <p className="text-[11px] text-primary-foreground/40 mt-1 leading-relaxed">Crafted with care for better health outcomes.</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
