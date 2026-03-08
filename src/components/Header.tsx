import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Construction, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import lwaLogo from "@/assets/lwa-logo.png";
import ResourceLibraryModal from "@/components/ResourceLibraryModal";

const DonationBanner = lazy(() => import("@/components/DonationBanner"));

const BuildingBanner = () => (
  <div className="bg-foreground text-background py-2 text-center relative">
    <div className="container mx-auto px-6 flex items-center justify-center gap-2 relative">
      <Construction className="w-3.5 h-3.5 text-secondary" />
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
  const [resourceModalOpen, setResourceModalOpen] = useState(false);
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
    { label: "About Arthritis", href: "#about", action: () => navigate("/about") },
    { label: "Our Services", href: "#services" },
    { label: "Conditions", href: "#conditions" },
    { label: "Self Help Tool", href: "/self-help", action: () => navigate("/self-help") },
    { label: "Blog", href: "/blog", action: () => navigate("/blog") },
    { label: "Get Involved", href: "#involved" },
    { label: "Shop", href: "/shop", action: () => navigate("/shop") },
  ];

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <BuildingBanner />

      {/* Premium Logo Bar */}
      <div className="bg-background border-b border-border/15">
         <div className="container mx-auto px-6 md:px-10 py-4 flex items-center justify-center">
           <a href="/" className="flex items-center gap-4 group">
             <div className="relative">
               <img
                 src={lwaLogo}
                 alt="Living With Arthritis logo"
                 className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
               />
             </div>
             <div className="flex flex-col leading-none">
               <span className="text-[11px] tracking-[0.35em] uppercase font-semibold text-muted-foreground/60 mb-1">
                 United Kingdom
               </span>
               <span className="text-xl sm:text-2xl md:text-[1.7rem] font-black text-foreground tracking-[-0.03em] leading-none uppercase">
                 Living With
               </span>
               <span className="text-xl sm:text-2xl md:text-[1.7rem] font-black text-primary tracking-[-0.03em] leading-none uppercase mt-0.5">
                 Arthritis
               </span>
             </div>
           </a>
         </div>
      </div>

      <Suspense fallback={<div className="bg-navy h-[42px]" />}>
        <DonationBanner />
      </Suspense>

      <header
        style={{ transform: visible || mobileMenuOpen ? "translateY(0)" : "translateY(-100%)" }}
        className={`sticky top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl shadow-medium border-b border-border/30"
            : "bg-background border-b border-border/20"
        }`}
      >
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex justify-between items-center h-[52px]">

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
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-all duration-200 cursor-pointer group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full group-hover:w-3/4 transition-all duration-300" />
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
                className="hidden sm:flex btn-primary-cta h-10 px-7 rounded-full text-xs font-bold tracking-wider"
              >
                <Heart className="w-3.5 h-3.5 mr-2" />
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
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-background z-[70] lg:hidden shadow-2xl flex flex-col border-l border-border/30 animate-in slide-in-from-right duration-300"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/20">
              <span className="text-lg font-extrabold text-foreground">Menu</span>
              <Button variant="ghost" size="icon" className="rounded-lg h-9 w-9" onClick={() => setMobileMenuOpen(false)}>
                <X size={18} />
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.action) {
                      link.action();
                    } else {
                      scrollToSection(link.href);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-5 py-4 text-[15px] font-semibold text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="p-6 space-y-3 border-t border-border/20">
              <Button
                className="w-full btn-secondary-cta h-14 rounded-full text-sm font-bold tracking-wide"
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
          </div>
        </>
      )}
    </>
  );
};

export default Header;
