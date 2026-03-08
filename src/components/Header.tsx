import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Construction, BookOpen, ChevronDown, Stethoscope, Activity, Apple, Users, Newspaper, ShoppingBag, HelpCircle, HandHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

/* Dynamic SVG logo mark – flowing figure with curved "A" */
const LogoMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Head */}
    <circle cx="28" cy="7.5" r="5" fill="hsl(var(--primary))" />
    
    {/* Flowing body – curved torso into "A" legs */}
    <path
      d="M28 13 C28 18, 26 22, 22 26 C18 30, 15 36, 13 46 L19 46 C20 40, 22 35, 24 31 Q26 27, 28 27 Q30 27, 32 31 C34 35, 36 40, 37 46 L43 46 C41 36, 38 30, 34 26 C30 22, 28 18, 28 13Z"
      fill="hsl(var(--primary))"
    />
    
    {/* Crossbar – curved */}
    <path
      d="M20.5 36 Q28 33, 35.5 36"
      stroke="hsl(var(--background))"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    
    {/* Left arm – flowing upward curve */}
    <path
      d="M26 17 C22 15, 16 12, 10 5"
      stroke="hsl(var(--primary))"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
    
    {/* Right arm – flowing upward curve */}
    <path
      d="M30 17 C34 15, 40 12, 46 5"
      stroke="hsl(var(--primary))"
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
    />
    
    {/* Left hand flourish */}
    <circle cx="9" cy="4" r="2" fill="hsl(var(--primary))" opacity="0.7" />
    {/* Right hand flourish */}
    <circle cx="47" cy="4" r="2" fill="hsl(var(--primary))" opacity="0.7" />
  </svg>
);

const dropdownSections = [
  { label: "About Arthritis", icon: Stethoscope, desc: "Learn about types & causes", href: "/about" },
  { label: "Our Services", icon: Activity, desc: "Physio, rehab & support", href: "#services" },
  { label: "Conditions", icon: Heart, desc: "OA, RA, Gout & more", href: "#conditions" },
  { label: "Self Help Tool", icon: HelpCircle, desc: "AI symptom checker", href: "/self-help" },
  { label: "Blog", icon: Newspaper, desc: "Articles & research", href: "/blog" },
  { label: "Get Involved", icon: HandHeart, desc: "Volunteer & fundraise", href: "#involved" },
  { label: "Shop", icon: ShoppingBag, desc: "Aids & supplements", href: "/shop" },
  { label: "Resource Library", icon: BookOpen, desc: "NHS, benefits & guides", href: "#resources" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [logoDropdownOpen, setLogoDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLogoDropdownOpen(false);
      }
    };
    if (logoDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [logoDropdownOpen]);

  type NavLink = {
    label: string;
    href: string;
    action?: () => void;
    hasIcon?: boolean;
    subs?: { label: string; href: string; action?: () => void }[];
  };

  const navLinks: NavLink[] = [
    {
      label: "About Arthritis",
      href: "#about",
      action: () => navigate("/about"),
      subs: [
        { label: "What is Arthritis?", href: "/about", action: () => navigate("/about") },
        { label: "Types of Arthritis", href: "#conditions" },
        { label: "Risk Factors", href: "/about", action: () => navigate("/about") },
        { label: "Diagnosis Journey", href: "#conditions" },
      ],
    },
    {
      label: "Our Services",
      href: "#services",
      subs: [
        { label: "Physiotherapy", href: "#services" },
        { label: "Nutrition Guidance", href: "#nutrition" },
        { label: "AI Chat Support", href: "/chat", action: () => navigate("/chat") },
        { label: "Exercise Programs", href: "/self-help", action: () => navigate("/self-help") },
      ],
    },
    {
      label: "Conditions",
      href: "#conditions",
      subs: [
        { label: "Osteoarthritis", href: "/conditions/osteoarthritis", action: () => navigate("/conditions/osteoarthritis") },
        { label: "Rheumatoid Arthritis", href: "/conditions/rheumatoid-arthritis", action: () => navigate("/conditions/rheumatoid-arthritis") },
        { label: "Psoriatic Arthritis", href: "/conditions/psoriatic-arthritis", action: () => navigate("/conditions/psoriatic-arthritis") },
        { label: "Gout", href: "#conditions" },
        { label: "Fibromyalgia", href: "#conditions" },
      ],
    },
    {
      label: "Self Help Tool",
      href: "/self-help",
      action: () => navigate("/self-help"),
      subs: [
        { label: "Joint Exercise Guide", href: "/self-help", action: () => navigate("/self-help") },
        { label: "Body Diagram", href: "/self-help", action: () => navigate("/self-help") },
        { label: "Daily Tips", href: "#daily-tips" },
      ],
    },
    {
      label: "Blog",
      href: "/blog",
      action: () => navigate("/blog"),
      subs: [
        { label: "Latest Articles", href: "/blog", action: () => navigate("/blog") },
        { label: "Exercise & Movement", href: "/blog", action: () => navigate("/blog") },
        { label: "Nutrition & Diet", href: "/blog", action: () => navigate("/blog") },
        { label: "Mental Health", href: "/blog", action: () => navigate("/blog") },
      ],
    },
    {
      label: "Get Involved",
      href: "#involved",
      subs: [
        { label: "Donate", href: "#involved" },
        { label: "Fundraise", href: "#involved" },
        { label: "Volunteer", href: "#involved" },
        { label: "Zakat Appeal", href: "/zakat-appeal", action: () => navigate("/zakat-appeal") },
      ],
    },
    { label: "Shop", href: "/shop", action: () => navigate("/shop") },
    { label: "Resource Library", href: "#resources", action: () => setResourceModalOpen(true), hasIcon: true },
  ];

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDropdownNav = (item: typeof dropdownSections[0]) => {
    setLogoDropdownOpen(false);
    if (item.label === "Resource Library") {
      setResourceModalOpen(true);
      return;
    }
    if (item.href.startsWith("#")) {
      scrollToSection(item.href);
    } else {
      navigate(item.href);
    }
  };

  return (
    <>
      <BuildingBanner />

      {/* Premium Logo Bar */}
      <div className="bg-background border-b border-border/15 relative" ref={dropdownRef}>
        <div className="container mx-auto px-6 md:px-10 py-4 flex items-center justify-center">
          <button
            onClick={() => setLogoDropdownOpen(!logoDropdownOpen)}
            className="flex items-center gap-3.5 group cursor-pointer select-none"
            aria-expanded={logoDropdownOpen}
            aria-haspopup="true"
          >
            {/* CSS Logo Mark */}
            <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0">
              <LogoMark className="w-full h-full drop-shadow-sm group-hover:scale-105 transition-transform duration-300" />
            </div>

            <div className="flex flex-col leading-none text-left">
              <span className="text-[10px] tracking-[0.35em] uppercase font-semibold text-muted-foreground/50 mb-0.5">
                United Kingdom
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-black text-foreground tracking-tight leading-none uppercase">
                Living With
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-black text-primary tracking-tight leading-none uppercase mt-px">
                Arthritis
              </span>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-muted-foreground/60 ml-1 transition-transform duration-300 ${
                logoDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Dropdown Panel */}
        {logoDropdownOpen && (
          <div className="absolute left-0 right-0 top-full z-[80] bg-background border-b border-border/30 shadow-xl animate-fade-in">
            <div className="container mx-auto px-6 md:px-10 py-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                Quick Navigation
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dropdownSections.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleDropdownNav(item)}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent transition-colors text-left group/item cursor-pointer"
                    >
                      <div className="rounded-lg bg-primary/10 p-2 shrink-0 group-hover/item:bg-primary/15 transition-colors">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-foreground block leading-tight">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground leading-tight mt-0.5 block">
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <Suspense fallback={<div className="bg-navy h-[42px]" />}>
        <DonationBanner />
      </Suspense>

      <header
        style={{ transform: visible || mobileMenuOpen ? "translateY(0)" : "translateY(-100%)" }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
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
                  className={`relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-all duration-200 cursor-pointer group ${
                    link.hasIcon ? "flex items-center gap-1.5" : ""
                  }`}
                >
                  {link.hasIcon && <BookOpen className="w-3.5 h-3.5" />}
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
          <div className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-background z-[70] lg:hidden shadow-2xl flex flex-col border-l border-border/30 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-border/20">
              <div className="flex items-center gap-2.5">
                <LogoMark className="w-8 h-8" />
                <span className="text-lg font-extrabold text-foreground">Menu</span>
              </div>
              <Button variant="ghost" size="icon" className="rounded-lg h-9 w-9" onClick={() => setMobileMenuOpen(false)}>
                <X size={18} />
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
              {dropdownSections.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      handleDropdownNav(item);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-3.5 text-[15px] font-semibold text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <span className="block">{item.label}</span>
                      <span className="text-[11px] font-normal text-muted-foreground/70">{item.desc}</span>
                    </div>
                  </button>
                );
              })}
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
      <ResourceLibraryModal open={resourceModalOpen} onOpenChange={setResourceModalOpen} />
    </>
  );
};

export default Header;
