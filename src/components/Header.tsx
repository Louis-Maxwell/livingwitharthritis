import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DonationBanner from "@/components/DonationBanner";
import AboutUsModal from "@/components/AboutUsModal";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About Arthritis", href: "#about", action: () => setAboutOpen(true) },
    { label: "Our Services", href: "#services" },
    { label: "Conditions", href: "#conditions" },
    { label: "Nutrition", href: "#nutrition" },
    { label: "Get Involved", href: "#involved" },
  ];

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <DonationBanner />

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-2xl shadow-soft border-b border-border/40"
            : "bg-background/60 backdrop-blur-xl border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-5 md:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-soft">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-display font-bold text-foreground">
                  Living With
                </span>
                <span className="text-[15px] font-display font-bold text-primary">
                  Arthritis
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={(e) => {
                    if (link.action) {
                      e.preventDefault();
                      link.action();
                    } else {
                      scrollToSection(link.href);
                    }
                  }}
                  className="px-3.5 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <a href="tel:07760512084" className="hidden md:flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="font-medium">07760 512 084</span>
              </a>

              <Button
                size="sm"
                onClick={() => {
                  const el = document.getElementById("involved");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden sm:flex btn-primary-cta h-9 px-5 rounded-full text-xs font-semibold"
              >
                <Heart className="w-3.5 h-3.5 mr-1.5" />
                Donate
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-lg h-9 w-9"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-background z-[70] lg:hidden shadow-2xl flex flex-col border-l border-border"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <span className="text-base font-display font-bold text-foreground">Menu</span>
                <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8" onClick={() => setMobileMenuOpen(false)}>
                  <X size={18} />
                </Button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-0.5">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={() => {
                      if (link.action) {
                        link.action();
                      } else {
                        scrollToSection(link.href);
                      }
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3.5 text-[15px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all cursor-pointer"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="p-5 space-y-3 border-t border-border">
                <Button
                  className="w-full btn-primary-cta h-12 rounded-full text-sm font-semibold"
                  onClick={() => {
                    const el = document.getElementById("involved");
                    el?.scrollIntoView({ behavior: "smooth" });
                    setMobileMenuOpen(false);
                  }}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Donate Now
                </Button>
                <div className="text-center">
                  <a href="tel:07760512084" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="w-3 h-3 inline mr-1" />
                    Free Helpline: 07760 512 084
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AboutUsModal open={aboutOpen} onOpenChange={setAboutOpen} />
    </>
  );
};

export default Header;
