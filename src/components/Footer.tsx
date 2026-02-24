import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, ArrowUp, Heart } from "lucide-react";
import accreditationLogos from "@/assets/accreditation-logos.png";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const footerLinks = {
    getHelp: [
      { label: "Virtual Assistant", href: "/chat" },
      { label: "Self Help Tool", href: "#resources" },
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
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-6 md:px-10 py-20 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <span className="text-[15px] font-display font-bold leading-none block tracking-tight">Living With</span>
                <span className="text-[15px] font-display font-bold leading-none block text-primary mt-0.5 tracking-tight">Arthritis<sup className="text-[8px] align-super">™</sup></span>
              </div>
            </div>
            <p className="text-white/25 leading-[1.7] mb-8 max-w-xs text-sm">
              Supporting 10 million people living with arthritis through information, research, and community.
            </p>
            <div className="space-y-3">
              <a href="tel:07760512084" className="flex items-center gap-3 text-white/25 hover:text-white/60 transition-colors duration-300 text-sm">
                <Phone className="w-3.5 h-3.5" />
                <span>07760 512 084</span>
              </a>
              <a href="mailto:info@livingwitharthritis.org.uk" className="flex items-center gap-3 text-white/25 hover:text-white/60 transition-colors duration-300 text-sm">
                <Mail className="w-3.5 h-3.5" />
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
              <h4 className="section-label text-white/20 mb-5 text-[10px]">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link: any) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={link.onClick ? (e: React.MouseEvent) => { e.preventDefault(); link.onClick(); } : undefined}
                      className="text-white/30 hover:text-white/70 transition-colors duration-300 text-sm cursor-pointer"
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
            <h4 className="section-label text-white/20 mb-5 text-[10px]">Follow Us</h4>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                  >
                    <Icon className="w-3.5 h-3.5 text-white/30" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Accreditation */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 md:px-10 py-10 flex justify-center">
          <img
            src={accreditationLogos}
            alt="Chartered Society of Physiotherapy and Health & Care Professions Council logos"
            className="h-20 md:h-28 object-contain"
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 md:px-10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/15 text-xs tracking-wide">© {new Date().getFullYear()} Living with Arthritis™</p>
            <div className="flex items-center gap-6 text-xs">
              <a href="#" className="text-white/15 hover:text-white/40 transition-colors duration-300">Privacy</a>
              <a href="#" className="text-white/15 hover:text-white/40 transition-colors duration-300">Terms</a>
              <a href="#" className="text-white/15 hover:text-white/40 transition-colors duration-300">Accessibility</a>
              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3 h-3 text-white/20" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;