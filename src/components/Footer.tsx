import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, ArrowUp, Heart, Sparkles } from "lucide-react";
import accreditationLogos from "@/assets/accreditation-logos.png";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const footerLinks = {
    getHelp: [
      { label: "Virtual Assistant", href: "/chat" },
      { label: "Self Help Tool", href: "/self-help" },
    ],
    aboutArthritis: [
      { label: "Symptoms & Treatments", href: "#conditions" },
      { label: "Virtual Physiotherapy", href: "#services" },
      { label: "Blog", href: "/blog" },
    ],
    aboutUs: [
      { label: "Our Mission", href: "/about" },
      { label: "Sitemap", href: "/sitemap" },
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
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 py-20 lg:py-24 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-foreground flex items-center justify-center">
                <Heart className="w-[17px] h-[17px] text-primary" />
              </div>
              <div>
                <span className="text-base font-black leading-none block tracking-tight text-primary-foreground uppercase">Living With</span>
                <span className="text-base font-black leading-none block text-primary-foreground mt-0.5 tracking-tight uppercase">Arthritis<sup className="text-[7px] align-super ml-0.5">™</sup></span>
              </div>
            </div>
            <p className="text-primary-foreground/60 leading-[1.8] mb-8 max-w-xs text-sm">
              Supporting 10 million people living with arthritis through information, research, and community.
            </p>
            <div className="space-y-3">
              <a href="tel:07760512084" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm group">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>07760 512 084</span>
              </a>
              <a href="mailto:info@livingwitharthritis.org.uk" className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm group">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
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
            { title: "About Us", links: footerLinks.aboutUs },
          ].map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground/40 mb-5">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link: any) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={link.onClick ? (e: React.MouseEvent) => { e.preventDefault(); link.onClick(); } : undefined}
                      className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground/40 mb-5">Follow Us</h4>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Accreditation */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 md:px-10 py-10 flex justify-center">
          <img
            src={accreditationLogos}
            alt="Chartered Society of Physiotherapy and Health & Care Professions Council logos"
            className="h-20 md:h-28 object-contain"
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 md:px-10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/40 text-xs">© {new Date().getFullYear()} Living with Arthritis™</p>
            <div className="flex items-center gap-6 text-xs">
              <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">Privacy</a>
              <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">Terms</a>
              <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">Accessibility</a>
              <button
                onClick={scrollToTop}
                className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-all duration-200"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Made by MaxwellHealth */}
      <div className="border-t border-primary-foreground/[0.06]">
        <div className="container mx-auto px-6 md:px-10 py-5 flex justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="group flex items-center gap-2 text-primary-foreground/30 hover:text-primary-foreground/60 transition-all duration-500 text-[11px] tracking-[0.2em] uppercase font-medium">
                <span>Made by</span>
                <span className="relative font-bold text-primary-foreground group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-500">
                  MaxwellHealth
                </span>
                <Sparkles className="w-3 h-3 text-primary-foreground/40 group-hover:text-primary-foreground group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] transition-all duration-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              className="w-64 bg-primary border-primary-foreground/10 text-primary-foreground shadow-2xl rounded-xl p-5"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight text-primary-foreground">MaxwellHealth</p>
                  <p className="text-[11px] text-primary-foreground/50 mt-1 leading-relaxed">Crafted with care for better health outcomes.</p>
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
