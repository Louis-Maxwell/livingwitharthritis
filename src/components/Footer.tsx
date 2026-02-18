import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, ArrowUp, Heart } from "lucide-react";
import AboutUsModal from "@/components/AboutUsModal";

const Footer = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const footerLinks = {
    getHelp: [
      { label: "Virtual Assistant", href: "/chat" },
      { label: "Self Help Tool", href: "#resources" },
      { label: "Book Consultation", href: "#", onClick: () => {} },
    ],
    aboutArthritis: [
      { label: "Symptoms & Treatments", href: "#conditions" },
      { label: "Virtual Physiotherapy", href: "#services" },
      { label: "Articles & Guides", href: "/blog" },
    ],
    aboutUs: [
      { label: "Our Mission", href: "#", onClick: () => setAboutOpen(true) },
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
                <span className="text-[15px] font-display font-bold leading-none block text-primary mt-0.5 tracking-tight">Arthritis</span>
              </div>
            </div>
            <p className="text-white/60 leading-[1.7] mb-8 max-w-xs text-sm">
              Supporting 10 million people living with arthritis through information, research, and community.
            </p>
            <div className="space-y-3">
              <a href="tel:07760512084" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 text-sm" aria-label="Call us on 07760 512 084">
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>07760 512 084</span>
              </a>
              <a href="mailto:info@livingwitharthritis.org.uk" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 text-sm" aria-label="Email info@livingwitharthritis.org.uk">
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
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
              <h4 className="section-label text-white/50 mb-5 text-[10px]">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link: any) => (
                  <li key={link.label}>
                    <a
                      href={link.onClick ? undefined : link.href}
                      onClick={link.onClick ? (e: React.MouseEvent) => { e.preventDefault(); link.onClick(); } : undefined}
                      className="text-white/60 hover:text-white transition-colors duration-300 text-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-sm"
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
            <h4 className="section-label text-white/50 mb-5 text-[10px]">Follow Us</h4>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={`Follow us on ${social.label}`}
                    className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                  >
                    <Icon className="w-3.5 h-3.5 text-white/70" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 md:px-10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/50 text-xs tracking-wide">Living with Arthritis</p>
            <div className="flex items-center gap-6 text-xs">
              <a href="#" className="text-white/50 hover:text-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-sm">Privacy</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-sm">Terms</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-sm">Accessibility</a>
              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                aria-label="Scroll to top of page"
              >
                <ArrowUp className="w-3 h-3 text-white/60" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <AboutUsModal open={aboutOpen} onOpenChange={setAboutOpen} />
    </footer>
  );
};

export default Footer;