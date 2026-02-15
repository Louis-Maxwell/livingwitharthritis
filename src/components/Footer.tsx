import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, ArrowUp, Heart } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const footerLinks = {
    getHelp: [
      { label: "Online Community", href: "#involved" },
      { label: "Virtual Assistant", href: "/chat" },
      { label: "Self Help Tool", href: "#resources" },
      { label: "Book Appointment", href: "#services" },
    ],
    aboutArthritis: [
      { label: "Symptoms & Treatments", href: "#conditions" },
      { label: "Nutrition Guide", href: "#nutrition" },
      { label: "Virtual Physiotherapy", href: "#services" },
    ],
    aboutUs: [
      { label: "Our Mission", href: "#" },
      { label: "Annual Reports", href: "#" },
      { label: "Press & Media", href: "#" },
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
      {/* Main links */}
      <div className="container mx-auto px-5 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-[15px] font-display font-bold leading-none block">Living With</span>
                <span className="text-[15px] font-display font-bold leading-none block text-primary mt-0.5">Arthritis</span>
              </div>
            </div>
            <p className="text-white/35 leading-relaxed mb-6 max-w-xs text-sm">
              Supporting 10 million people living with arthritis through information, research, and community.
            </p>
            <div className="space-y-2.5">
              <a href="tel:07760512084" className="flex items-center gap-2.5 text-white/35 hover:text-white/70 transition-colors text-sm">
                <Phone className="w-3.5 h-3.5" />
                <span>07760 512 084</span>
              </a>
              <a href="mailto:info@livingwitharthritis.org.uk" className="flex items-center gap-2.5 text-white/35 hover:text-white/70 transition-colors text-sm">
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
              <h4 className="section-label text-white/30 mb-4 text-[10px]">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white/40 hover:text-white/80 transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div className="lg:col-span-2">
            <h4 className="section-label text-white/30 mb-4 text-[10px]">Follow Us</h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center hover:bg-white/12 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-white/40" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/6">
        <div className="container mx-auto px-5 md:px-8 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/25 text-xs">Living with Arthritis</p>
            <div className="flex items-center gap-5 text-xs">
              <a href="#" className="text-white/25 hover:text-white/50 transition-colors">Privacy</a>
              <a href="#" className="text-white/25 hover:text-white/50 transition-colors">Terms</a>
              <a href="#" className="text-white/25 hover:text-white/50 transition-colors">Accessibility</a>
              <button
                onClick={scrollToTop}
                className="w-7 h-7 rounded-lg bg-white/6 flex items-center justify-center hover:bg-white/12 transition-colors"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3 h-3 text-white/30" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
