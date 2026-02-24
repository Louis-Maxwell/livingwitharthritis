import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Construction } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DonationBanner from "@/components/DonationBanner";
import AboutUsModal from "@/components/AboutUsModal";

const BuildingBanner = () => (
  <div className="bg-navy text-navy-foreground py-2.5 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
    <div className="container mx-auto px-6 flex items-center justify-center gap-2.5 relative">
      <Construction className="w-3.5 h-3.5 text-gold animate-pulse" />
      <p className="text-[11px] sm:text-xs font-medium tracking-wide">
        This website is currently being built — some features may be incomplete.
      </p>
      <Construction className="w-3.5 h-3.5 text-gold animate-pulse hidden sm:block" />
    </div>
  </div>
);

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
    { label: "Get Involved", href: "#involved" },
  ];

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <BuildingBanner />
      <DonationBanner />

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-2xl shadow-soft border-b border-border/30"
            : "bg-background/40 backdrop-blur-xl border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft group-hover:shadow-medium transition-shadow duration-300">
                <Heart className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-display font-bold text-foreground tracking-tight">
                  Living With
                </span>
                <span className="text-[15px] font-display font-bold text-primary tracking-tight">
                  Arthritis<sup className="text-[8px] align-super">™</sup>
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
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
                  className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-accent/60 transition-all duration-300 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                onClick={() => {
                  const el = document.getElementById("involved");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden sm:flex btn-primary-cta h-10 px-6 rounded-full text-xs font-bold tracking-wider"
              >
                <Heart className="w-3.5 h-3.5 mr-2" />
                Donate
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full h-10 w-10"
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
              className="fixed inset-0 bg-foreground/15 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-background z-[70] lg:hidden shadow-2xl flex flex-col border-l border-border/30"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/30">
                <span className="text-lg font-display font-bold text-foreground">Menu</span>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" onClick={() => setMobileMenuOpen(false)}>
                  <X size={18} />
                </Button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    onClick={() => {
                      if (link.action) {
                        link.action();
                      } else {
                        scrollToSection(link.href);
                      }
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-5 py-4 text-[15px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-2xl transition-all cursor-pointer"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="p-6 space-y-3 border-t border-border/30">
                <Button
                  className="w-full btn-primary-cta h-13 rounded-full text-sm font-bold tracking-wider"
                  onClick={() => {
                    const el = document.getElementById("involved");
                    el?.scrollIntoView({ behavior: "smooth" });
                    setMobileMenuOpen(false);
                  }}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Donate Now
                </Button>
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