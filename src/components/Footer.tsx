import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    getHelp: [
      { label: "Online Community", href: "#" },
      { label: "Virtual Assistant", href: "#" },
      { label: "Self Help Tool", href: "#" },
      { label: "Book Appointment", href: "#" },
    ],
    aboutArthritis: [
      { label: "Conditions A-Z", href: "#" },
      { label: "Symptoms", href: "#" },
      { label: "Treatments", href: "#" },
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
    <footer className="relative bg-accent text-accent-foreground overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-8 py-20 lg:py-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand — editorial serif */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="text-3xl font-display font-bold text-accent-foreground leading-none block">
                  Living With
                </span>
                <span className="text-3xl font-display font-bold text-primary leading-none block">
                  Arthritis
                </span>
              </div>
              <p className="text-accent-foreground/50 leading-relaxed mb-10 max-w-sm font-light">
                Supporting 10 million people living with arthritis through 
                information, research, and community.
              </p>
              
              {/* Contact */}
              <div className="space-y-4">
                <a href="tel:07760512084" className="flex items-center gap-4 text-accent-foreground/50 hover:text-accent-foreground transition-colors duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">07760 512084</span>
                </a>
                <a href="mailto:info@livingwitharthritis.org.uk" className="flex items-center gap-4 text-accent-foreground/50 hover:text-accent-foreground transition-colors duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">info@livingwitharthritis.org.uk</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Get Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h4 className="editorial-caption text-accent-foreground/40 mb-6">Get Help</h4>
            <ul className="space-y-3">
              {footerLinks.getHelp.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-accent-foreground/50 hover:text-accent-foreground transition-colors duration-300 text-sm font-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* About Arthritis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h4 className="editorial-caption text-accent-foreground/40 mb-6">About Arthritis</h4>
            <ul className="space-y-3">
              {footerLinks.aboutArthritis.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-accent-foreground/50 hover:text-accent-foreground transition-colors duration-300 text-sm font-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <h4 className="editorial-caption text-accent-foreground/40 mb-6">Follow Us</h4>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 group"
                  >
                    <Icon className="w-4 h-4 text-accent-foreground/40 group-hover:text-accent-foreground transition-colors" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-accent-foreground/30 text-xs editorial-caption text-center md:text-left">
              © 2024 Living with Arthritis. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs">
              <a href="#" className="text-accent-foreground/30 hover:text-accent-foreground/60 transition-colors">Privacy Policy</a>
              <a href="#" className="text-accent-foreground/30 hover:text-accent-foreground/60 transition-colors">Terms of Service</a>
              <a href="#" className="text-accent-foreground/30 hover:text-accent-foreground/60 transition-colors">Cookie Settings</a>
            </div>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-accent-foreground/40 group-hover:text-accent-foreground transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
