import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, ArrowUp, Heart, Sparkles } from "lucide-react";
import accreditationLogos from "@/assets/accreditation-logos.png";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const footerSections = [
    {
      title: "Get help",
      links: [
        { label: "Virtual Assistant", href: "/chat" },
        { label: "Self Help Tool", href: "/self-help" },
        { label: "Contact us", href: "#contact" },
      ],
    },
    {
      title: "About Arthritis",
      links: [
        { label: "Conditions we cover", href: "#conditions" },
        { label: "Physiotherapy", href: "#services" },
        { label: "Blog & articles", href: "/blog" },
      ],
    },
    {
      title: "Get involved",
      links: [
        { label: "Donate", href: "#involved" },
        { label: "Fundraise for us", href: "#involved" },
        { label: "Volunteer", href: "#involved" },
      ],
    },
    {
      title: "About us",
      links: [
        { label: "Our mission", href: "/about" },
        { label: "Sitemap", href: "/sitemap" },
        { label: "Accessibility", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Red top accent bar — BRC style */}
      <div className="h-1 bg-primary w-full" />

      <div className="container mx-auto px-6 md:px-10 py-16 lg:py-20 relative">
        {/* Top: Logo + CTA */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-14 pb-14 border-b border-background/10">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Heart className="w-[18px] h-[18px] text-primary-foreground fill-primary-foreground" />
              </div>
              <div>
                <span className="text-[15px] font-extrabold leading-none block tracking-tight text-background">Living With</span>
                <span className="text-[15px] font-extrabold leading-none block text-primary mt-0.5 tracking-tight">Arthritis<sup className="text-[7px] align-super ml-0.5">™</sup></span>
              </div>
            </div>
            <p className="text-background/40 leading-[1.8] text-sm">
              Supporting 10 million people living with arthritis through information, research, and community.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="#involved"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-10 text-sm font-bold uppercase tracking-widest transition-all duration-200"
            >
              Donate
            </a>
            <div className="flex items-center gap-3">
              <a href="tel:07760512084" className="flex items-center gap-2 text-background/40 hover:text-background/70 transition-colors text-sm">
                <Phone className="w-3.5 h-3.5" />
                <span>07760 512 084</span>
              </a>
            </div>
            <a href="mailto:info@livingwitharthritis.org.uk" className="flex items-center gap-2 text-background/40 hover:text-background/70 transition-colors text-sm">
              <Mail className="w-3.5 h-3.5" />
              <span>info@livingwitharthritis.org.uk</span>
            </a>
          </div>
        </div>

        {/* Link columns — BRC grid style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-14 mb-14">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-bold text-background mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-background/50 hover:text-background transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-10 border-t border-background/10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-background/30 uppercase tracking-wider">Follow us</span>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-background/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <img
            src={accreditationLogos}
            alt="Chartered Society of Physiotherapy and Health & Care Professions Council logos"
            className="h-16 md:h-20 object-contain"
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/[0.06]">
        <div className="container mx-auto px-6 md:px-10 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/25 text-xs">© {new Date().getFullYear()} Living with Arthritis™</p>
            <div className="flex items-center gap-6 text-xs">
              <a href="#" className="text-background/25 hover:text-background/50 transition-colors">Privacy</a>
              <a href="#" className="text-background/25 hover:text-background/50 transition-colors">Terms</a>
              <a href="#" className="text-background/25 hover:text-background/50 transition-colors">Cookies</a>
              <a href="#" className="text-background/25 hover:text-background/50 transition-colors">Accessibility</a>
              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-full bg-background/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Made by MaxwellHealth */}
      <div className="border-t border-background/[0.04]">
        <div className="container mx-auto px-6 md:px-10 py-4 flex justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="group flex items-center gap-2 text-background/20 hover:text-background/50 transition-all duration-500 text-[11px] tracking-[0.2em] uppercase font-medium">
                <span>Made by</span>
                <span className="relative font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)] transition-all duration-500">
                  MaxwellHealth
                </span>
                <Sparkles className="w-3 h-3 text-primary/40 group-hover:text-primary group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)] transition-all duration-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              className="w-64 bg-foreground border-background/10 text-background shadow-2xl shadow-primary/10 rounded-xl p-5"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight bg-gradient-to-r from-background to-background/80 bg-clip-text text-transparent">MaxwellHealth</p>
                  <p className="text-[11px] text-background/40 mt-1 leading-relaxed">Crafted with care for better health outcomes.</p>
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
