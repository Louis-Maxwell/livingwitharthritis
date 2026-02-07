import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, ArrowUp, Heart, Shield, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thank you!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    }
  };

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
      { label: "Careers", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const accreditations = [
    "Fundraising Regulator",
    "Information Standard",
    "Cyber Essentials",
  ];

  return (
    <footer className="relative bg-accent text-accent-foreground overflow-hidden">
      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      
      {/* Newsletter section */}
      <div className="border-b border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="editorial-caption text-gold mb-3 block">Newsletter</span>
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-accent-foreground mb-3">
                Stay <span className="italic font-normal">Informed</span>
              </h3>
              <p className="text-accent-foreground/50 text-sm font-light">
                Get the latest research, tips, and community news delivered to your inbox.
              </p>
            </motion.div>
            <motion.form
              onSubmit={handleNewsletter}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-3"
            >
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/[0.06] border-white/[0.1] text-accent-foreground placeholder:text-accent-foreground/30 rounded-full px-6"
                required
              />
              <Button
                type="submit"
                className="btn-gold px-8 rounded-full text-xs uppercase tracking-wider font-bold whitespace-nowrap"
              >
                Subscribe
              </Button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-8 py-20 lg:py-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="text-3xl font-display font-bold text-primary leading-none block">
                  Living With
                </span>
                <span className="text-3xl font-display font-bold text-primary leading-none block">
                  Arthritis
                </span>
              </div>
              <p className="text-accent-foreground/50 leading-relaxed mb-8 max-w-sm font-light">
                Supporting 10 million people living with arthritis through 
                information, research, and community.
              </p>
              
              {/* Contact */}
              <div className="space-y-4 mb-8">
                <a href="tel:07760512084" className="flex items-center gap-4 text-accent-foreground/50 hover:text-accent-foreground transition-colors duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm block">07760 512084</span>
                    <span className="text-xs text-accent-foreground/30">Mon-Fri, 9am-5pm</span>
                  </div>
                </a>
                <a href="mailto:info@livingwitharthritis.org.uk" className="flex items-center gap-4 text-accent-foreground/50 hover:text-accent-foreground transition-colors duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">info@livingwitharthritis.org.uk</span>
                </a>
              </div>

              {/* Accreditations */}
              <div className="flex flex-wrap gap-2">
                {accreditations.map((acc) => (
                  <span key={acc} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] rounded-full text-xs text-accent-foreground/40 border border-white/[0.06]">
                    <Shield className="w-3 h-3 text-gold/60" />
                    {acc}
                  </span>
                ))}
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
            <h4 className="editorial-caption text-gold/60 mb-6">Get Help</h4>
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
            <h4 className="editorial-caption text-gold/60 mb-6">About Arthritis</h4>
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

          {/* About Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-2"
          >
            <h4 className="editorial-caption text-gold/60 mb-6">About Us</h4>
            <ul className="space-y-3">
              {footerLinks.aboutUs.map((link) => (
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
            className="lg:col-span-2"
          >
            <h4 className="editorial-caption text-gold/60 mb-6">Follow Us</h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center hover:bg-gold/20 transition-colors duration-300 group"
                  >
                    <Icon className="w-4 h-4 text-accent-foreground/40 group-hover:text-gold transition-colors" />
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
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="text-accent-foreground/30 text-xs editorial-caption text-center md:text-left">
                © 2025 Living with Arthritis. All rights reserved.
              </p>
              <span className="hidden sm:inline text-accent-foreground/15">|</span>
              <span className="charity-reg text-accent-foreground/30">
                Registered Charity No. 1234567 | Company No. 7654321
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <a href="#" className="text-accent-foreground/30 hover:text-accent-foreground/60 transition-colors">Privacy Policy</a>
              <a href="#" className="text-accent-foreground/30 hover:text-accent-foreground/60 transition-colors">Terms of Service</a>
              <a href="#" className="text-accent-foreground/30 hover:text-accent-foreground/60 transition-colors">Accessibility</a>
              <a href="#" className="text-accent-foreground/30 hover:text-accent-foreground/60 transition-colors">Cookie Settings</a>
            </div>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center hover:bg-gold/20 transition-colors duration-300 group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-accent-foreground/40 group-hover:text-gold transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
