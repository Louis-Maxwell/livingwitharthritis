import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Construction, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DonationBanner from "@/components/DonationBanner";

const BuildingBanner = () => (
  <div className="bg-foreground text-background py-2 text-center relative">
    <div className="container mx-auto px-6 flex items-center justify-center gap-2 relative">
      <Construction className="w-3.5 h-3.5 text-primary" />
      <p className="text-[11px] sm:text-xs font-medium tracking-wide">
        This website is currently being built — some features may be incomplete.
      </p>
    </div>
  </div>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setScrolled(currentY > 20);
    if (currentY < 300) {
      setVisible(true);
    } else if (currentY < lastScrollY.current) {
      setVisible(true);
    } else if (currentY > lastScrollY.current + 10) {
      setVisible(false);
    }
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navLinks = [
    { label: "Get help", href: "#services", action: undefined },
    { label: "Get involved", href: "#involved", action: undefined },
    { label: "Conditions", href: "#conditions", action: undefined },
    { label: "About us", href: "/about", action: () => navigate("/about") },
    { label: "Blog", href: "/blog", action: () => navigate("/blog") },
    { label: "Self Help", href: "/self-help", action: () => navigate("/self-help") },
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
        animate={{ y: visible || mobileMenuOpen ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl shadow-medium border-b border-border/30"
            : "bg-background border-b border-border/20"
        }`}
      >
        {/* Top bar with logo and donate */}
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex justify-between items-center h-[68px]">
            {/* Logo — BRC-inspired clean layout */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Heart className="w-[18px] h-[18px] text-primary-foreground fill-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-extrabold text-foreground tracking-tight leading-tight">
                  Living With
                </span>
                <span className="text-[15px] font-extrabold text-primary tracking-tight leading-tight">
                  Arthritis<sup className="text-[7px] align-super ml-0.5">™</sup>
                </span>
              </div>
            </a>

            {/* Right: Search + Donate */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex rounded-lg h-10 w-10 text-muted-foreground hover:text-foreground"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </Button>

              {/* BRC-style prominent red donate button */}
              <Button
                onClick={() => {
                  const el = document.getElementById("involved");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-8 rounded-none text-sm font-bold uppercase tracking-widest transition-all duration-200 shadow-none hover:shadow-primary"
              >
                Donate
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-lg h-10 w-10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation bar — BRC-style bottom nav row */}
        <nav className="hidden lg:block border-t border-border/30">
          <div className="container mx-auto px-6 md:px-10">
            <div className="flex items-center gap-0">
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
                  className="px-5 py-3.5 text-sm font-semibold text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
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
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-background z-[70] lg:hidden shadow-2xl flex flex-col border-l border-border/30"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/20">
                <span className="text-lg font-extrabold text-foreground">Menu</span>
                <Button variant="ghost" size="icon" className="rounded-lg h-9 w-9" onClick={() => setMobileMenuOpen(false)}>
                  <X size={18} />
                </Button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
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
                    className="block w-full text-left px-5 py-4 text-[15px] font-semibold text-foreground hover:text-primary hover:bg-accent border-b border-border/10 transition-all cursor-pointer"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="p-6 space-y-3 border-t border-border/20">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 rounded-none text-sm font-bold uppercase tracking-widest"
                  onClick={() => {
                    const el = document.getElementById("involved");
                    el?.scrollIntoView({ behavior: "smooth" });
                    setMobileMenuOpen(false);
                  }}
                >
                  Donate Now
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
