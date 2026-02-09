import { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, ArrowUp, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const scrollToTop = () => window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from("newsletter_subscriptions" as any).insert({
        email,
        source: "footer"
      } as any);
      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already subscribed!",
            description: "This email is already on our mailing list."
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Thank you!",
          description: "You've been subscribed to our newsletter."
        });
      }
      setEmail("");
    } catch {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const footerLinks = {
    getHelp: [{
      label: "Online Community",
      href: "#involved"
    }, {
      label: "Virtual Assistant",
      href: "/chat"
    }, {
      label: "Self Help Tool",
      href: "#resources"
    }, {
      label: "Book Appointment",
      href: "#services"
    }],
    aboutArthritis: [{
      label: "Symptoms & Treatments",
      href: "#conditions"
    }, {
      label: "Nutrition Guide",
      href: "#nutrition"
    }, {
      label: "Virtual Physiotherapy",
      href: "#services"
    }],
    aboutUs: [{
      label: "Our Mission",
      href: "#"
    }, {
      label: "Annual Reports",
      href: "#"
    }, {
      label: "Press & Media",
      href: "#"
    }]
  };
  const socialLinks = [{
    icon: Facebook,
    href: "#",
    label: "Facebook"
  }, {
    icon: Twitter,
    href: "#",
    label: "Twitter"
  }, {
    icon: Instagram,
    href: "#",
    label: "Instagram"
  }, {
    icon: Youtube,
    href: "#",
    label: "Youtube"
  }, {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn"
  }];
  return <footer className="bg-navy text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 py-14">
          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div>
              <span className="section-label text-gold mb-2 block">Newsletter</span>
              <h3 className="text-2xl font-display font-bold mb-2">Stay informed</h3>
              <p className="text-white/50 text-sm">
                Get the latest research, tips, and community news delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-3">
              <Input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} className="bg-white/10 border-white/15 text-white placeholder:text-white/30 rounded-full px-5" required />
              <Button type="submit" disabled={isSubmitting} className="btn-primary-cta px-6 rounded-full text-sm whitespace-nowrap">
                {isSubmitting ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main links */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-display font-bold leading-tight block">Living With</span>
                <span className="text-lg font-display font-bold leading-tight block text-primary">Arthritis</span>
              </div>
            </div>
            <p className="text-white/50 leading-relaxed mb-6 max-w-sm text-sm">
              Supporting 10 million people living with arthritis through information, research, and community.
            </p>
            <div className="space-y-3">
              <a href="tel:07760512084" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span>07760 512 084</span>
              </a>
              <a href="mailto:info@livingwitharthritis.org.uk" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>info@livingwitharthritis.org.uk</span>
              </a>
            </div>
          </div>

          {/* Links */}
          {[{
          title: "Get Help",
          links: footerLinks.getHelp
        }, {
          title: "About Arthritis",
          links: footerLinks.aboutArthritis
        }, {
          title: "About Us",
          links: footerLinks.aboutUs
        }].map(section => <div key={section.title} className="lg:col-span-2">
              <h4 className="section-label text-white/40 mb-4 text-[10px]">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map(link => <li key={link.label}>
                    <a href={link.href} className="text-white/50 hover:text-white transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>)}
              </ul>
            </div>)}

          {/* Social */}
          <div className="lg:col-span-2">
            <h4 className="section-label text-white/40 mb-4 text-[10px]">Follow Us</h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(social => {
              const Icon = social.icon;
              return <a key={social.label} href={social.href} aria-label={social.label} className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center hover:bg-primary/30 transition-colors">
                    <Icon className="w-4 h-4 text-white/50" />
                  </a>;
            })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/8">
        <div className="container mx-auto px-4 md:px-8 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/30 text-xs">© 2025 Living with Arthritis. All rights reserved. </p>
            <div className="flex items-center gap-5 text-xs">
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors">Privacy</a>
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors">Terms</a>
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors">Accessibility</a>
              <button onClick={scrollToTop} className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="Scroll to top">
                <ArrowUp className="w-3.5 h-3.5 text-white/40" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;