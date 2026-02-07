import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import DonationBanner from "@/components/DonationBanner";
import AboutUsModal from "@/components/AboutUsModal";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.97]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About Arthritis", href: "#about" },
    { label: "Get Help", href: "#help" },
    { label: "Get Involved", href: "#involved" },
    { label: "Shop", href: "#shop" },
    { label: "In Your Area", href: "#area" },
  ];

  return (
    <>
      <DonationBanner />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block bg-accent text-accent-foreground"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-6">
              <span className="text-xs text-accent-foreground/70 font-medium">The UK's Leading Arthritis Resource</span>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setAboutOpen(true)} className="text-xs text-accent-foreground/60 hover:text-accent-foreground transition-colors cursor-pointer">About Us</button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.header
        style={{ opacity: headerOpacity }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`sticky top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-background/85 backdrop-blur-2xl shadow-large border-b border-border/30"
            : "bg-background border-b border-border/50"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center py-5 lg:py-6">
            {/* Logo — editorial serif */}
            <motion.a
              href="/"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col"
            >
              <span className="text-2xl md:text-3xl font-display font-bold text-primary tracking-tight leading-none">
                Living With
              </span>
              <span className="text-2xl md:text-3xl font-display font-bold text-primary tracking-tight leading-none">
                Arthritis
              </span>
            </motion.a>

            {/* Desktop nav — editorial spacing */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                  className="relative px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground transition-all duration-400 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary rounded-full group-hover:w-2/3 transition-all duration-500 ease-out" />
                </motion.a>
              ))}
            </nav>

            {/* Right side actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex hover:bg-primary/5 rounded-full w-10 h-10"
              >
                <Search size={18} className="text-muted-foreground" />
              </Button>

              <Button
                className="hidden sm:flex btn-premium text-primary-foreground font-bold px-7 py-2.5 rounded-full text-sm uppercase tracking-wider"
              >
                Donate
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile menu — editorial fullscreen */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:hidden bg-background border-t border-border/50 overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-8 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="block px-4 py-4 text-xl font-display font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="pt-6">
                  <Button className="w-full btn-premium text-primary-foreground font-bold py-4 rounded-full text-base uppercase tracking-wider">
                    Donate Now
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AboutUsModal open={aboutOpen} onOpenChange={setAboutOpen} />
    </>
  );
};

export default Header;
