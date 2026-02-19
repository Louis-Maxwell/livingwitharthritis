import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, CalendarCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DonationBanner from "@/components/DonationBanner";
import AboutUsModal from "@/components/AboutUsModal";
import { AppointmentModal } from "@/components/AppointmentModal";

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
    { label: "Articles & Guides", href: "/blog" },
    { label: "Get Involved", href: "#involved" },
  ];

  const scrollToSection = (href: string) => {
    if (!href.startsWith("#")) {
      window.location.href = href;
      return;
    }
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
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-2xl shadow-soft border-b border-border/30"
            : "bg-background/40 backdrop-blur-xl border-b border-transparent"
        }`}
        role="banner"
      >
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group" aria-label="Living With Arthritis – home">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft group-hover:shadow-medium transition-shadow duration-300" aria-hidden="true">
                <Heart className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none" aria-hidden="true">
                <span className="text-[15px] font-display font-bold text-foreground tracking-tight">
                  Living With
                </span>
                <span className="text-[15px] font-display font-bold text-primary tracking-tight">
                  Arthritis
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
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
                  className="px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-accent/60 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <AppointmentModal
                trigger={
                  <Button
                    size="sm"
                    className="hidden lg:flex btn-primary-cta h-10 px-5 rounded-full text-xs font-bold tracking-wider"
                    aria-label="Book a free consultation"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                    Book Free Consultation
                  </Button>
                }
              />

              <Button
                size="sm"
                onClick={() => {
                  const el = document.getElementById("involved");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden sm:flex btn-primary-cta h-10 px-5 rounded-full text-xs font-bold tracking-wider opacity-70 hover:opacity-100 bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Donate to Living With Arthritis"
              >
                <Heart className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                Donate
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full h-10 w-10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-menu"
              >
                {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
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
              aria-hidden="true"
            />
            <motion.div
              id="mobile-nav-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-background z-[70] lg:hidden shadow-2xl flex flex-col border-l border-border/30"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/30">
                <span className="text-lg font-display font-bold text-foreground">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={18} aria-hidden="true" />
                </Button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1" aria-label="Mobile navigation">
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
                    className="block w-full text-left px-5 py-4 text-[15px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-2xl transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="p-6 space-y-3 border-t border-border/30">
                <AppointmentModal
                  trigger={
                    <Button
                      className="w-full btn-primary-cta h-13 rounded-full text-sm font-bold tracking-wider"
                      aria-label="Book a free consultation"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <CalendarCheck className="w-4 h-4 mr-2" aria-hidden="true" />
                      Book Free Consultation
                    </Button>
                  }
                />
                <Button
                  variant="outline"
                  className="w-full h-11 rounded-full text-sm font-semibold border-primary/30 text-primary hover:bg-primary/5"
                  onClick={() => {
                    const el = document.getElementById("involved");
                    el?.scrollIntoView({ behavior: "smooth" });
                    setMobileMenuOpen(false);
                  }}
                  aria-label="Donate to Living With Arthritis"
                >
                  <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
                  Donate
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