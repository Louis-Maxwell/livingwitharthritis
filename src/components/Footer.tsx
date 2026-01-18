import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
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
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 md:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-display font-bold mb-4 text-primary">
                Living With Arthritis
              </h3>
              <p className="text-accent-foreground/70 leading-relaxed mb-8 max-w-sm">
                Supporting 10 million people living with arthritis through 
                information, research, and community. Together, we make a difference.
              </p>
              
              {/* Contact info */}
              <div className="space-y-3">
                <a href="tel:08009890031" className="flex items-center gap-3 text-accent-foreground/70 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>0800 989 0031</span>
                </a>
                <a href="mailto:info@livingwitharthritis.org.uk" className="flex items-center gap-3 text-accent-foreground/70 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>info@livingwitharthritis.org.uk</span>
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
          >
            <h4 className="font-bold text-white mb-6">Get Help</h4>
            <ul className="space-y-3">
              {footerLinks.getHelp.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-accent-foreground/60 hover:text-white transition-colors duration-200 text-sm">
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
          >
            <h4 className="font-bold text-white mb-6">About Arthritis</h4>
            <ul className="space-y-3">
              {footerLinks.aboutArthritis.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-accent-foreground/60 hover:text-white transition-colors duration-200 text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors duration-200 group"
                  >
                    <Icon className="w-4 h-4 text-accent-foreground/60 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-accent-foreground/50 text-sm text-center md:text-left">
              © 2024 Living with Arthritis. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-accent-foreground/50 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-accent-foreground/50 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-accent-foreground/50 hover:text-white transition-colors">Cookie Settings</a>
            </div>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-colors duration-200 group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-accent-foreground/60 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
