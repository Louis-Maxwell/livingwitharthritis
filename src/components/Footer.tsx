import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    "Get Help": [
      { label: "Helpline", href: "#" },
      { label: "Online Community", href: "#" },
      { label: "Virtual Assistant", href: "#" },
      { label: "Self-Help Tools", href: "#" },
      { label: "Find a Specialist", href: "#" },
    ],
    "About Arthritis": [
      { label: "Conditions A-Z", href: "#" },
      { label: "Symptoms Guide", href: "#" },
      { label: "Treatment Options", href: "#" },
      { label: "Research Updates", href: "#" },
      { label: "Living Well", href: "#" },
    ],
    "Get Involved": [
      { label: "Donate", href: "#" },
      { label: "Volunteer", href: "#" },
      { label: "Corporate Partners", href: "#" },
      { label: "Events", href: "#" },
      { label: "Legacy Giving", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-display text-2xl lg:text-3xl font-semibold text-white mb-4">
              Stay Informed, Stay Empowered
            </h3>
            <p className="text-white/70 mb-8">
              Get the latest research updates, management tips, and community news delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-primary transition-colors"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 group">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-premium flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">L</span>
              </div>
              <div>
                <span className="font-display text-xl font-semibold text-white">Living with</span>
                <span className="font-display text-xl font-semibold text-primary ml-1">Arthritis</span>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed max-w-sm">
              Supporting millions of people living with arthritis through education, 
              research, and compassionate community support since 2010.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-4 h-4 text-primary" />
                <span>0800 989 0031</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@livingwitharthritis.org</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4 text-primary" />
                <span>London, United Kingdom</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-6">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>© 2024 Living with Arthritis. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;