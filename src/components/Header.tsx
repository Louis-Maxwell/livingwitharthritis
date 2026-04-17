import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, BookOpen, ChevronDown, Stethoscope, Activity, Newspaper, ShoppingBag, HandHeart, ArrowRight, Utensils, MessageCircle, Dumbbell, Bone, ShieldCheck, HeartPulse, Sparkles, Globe, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const _CartDrawer = lazy(() => import("@/components/CartDrawer"));
const ResourceLibraryDrawer = lazy(() => import("@/components/ResourceLibraryDrawer"));
const SiteSearch = lazy(() => import("@/components/SiteSearch"));

const DonationBanner = lazy(() => import("@/components/DonationBanner"));

/* Dynamic SVG logo mark */
const LogoMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="28" cy="7.5" r="5" fill="hsl(var(--primary))" />
    <path d="M28 13 C28 18, 26 22, 22 26 C18 30, 15 36, 13 46 L19 46 C20 40, 22 35, 24 31 Q26 27, 28 27 Q30 27, 32 31 C34 35, 36 40, 37 46 L43 46 C41 36, 38 30, 34 26 C30 22, 28 18, 28 13Z" fill="hsl(var(--primary))" />
    <path d="M20.5 36 Q28 33, 35.5 36" stroke="hsl(var(--background))" strokeWidth="2.8" strokeLinecap="round" fill="none" />
    <path d="M26 17 C22 15, 16 12, 10 5" stroke="hsl(var(--primary))" strokeWidth="3.2" strokeLinecap="round" fill="none" />
    <path d="M30 17 C34 15, 40 12, 46 5" stroke="hsl(var(--primary))" strokeWidth="3.2" strokeLinecap="round" fill="none" />
    <circle cx="9" cy="4" r="2" fill="hsl(var(--primary))" opacity="0.7" />
    <circle cx="47" cy="4" r="2" fill="hsl(var(--primary))" opacity="0.7" />
  </svg>
);

type SubItem = {
  label: string;
  desc: string;
  icon: React.ElementType;
  href: string;
  action?: () => void;
  color?: string;
};

type NavLink = {
  label: string;
  href: string;
  action?: () => void;
  subs?: SubItem[];
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [resourceDrawerOpen, setResourceDrawerOpen] = useState(false);
  
  const navigate = useNavigate();
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setScrolled(currentY > 20);
    if (currentY < 80) {
      setVisible(true);
    } else if (currentY < lastScrollY.current - 4) {
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

  const navLinks: NavLink[] = [
    {
      label: "Newly Diagnosed",
      href: "/about",
      action: () => navigate("/about"),
      subs: [
        { label: "What Is Arthritis?", desc: "Over 100 types affecting millions", icon: Stethoscope, href: "/about", action: () => navigate("/about"), color: "text-primary bg-primary/10" },
        { label: "Newly Diagnosed Guide", desc: "Your essential first steps", icon: Sparkles, href: "/community", action: () => navigate("/community"), color: "text-primary bg-primary/10" },
        { label: "Types of Arthritis", desc: "OA, RA, Gout, PsA & more", icon: Bone, href: "#conditions", color: "text-primary bg-primary/10" },
      ],
    },
    {
      label: "Track & Manage",
      href: "/self-help",
      action: () => navigate("/self-help"),
      subs: [
        { label: "AI Health Assistant", desc: "24/7 evidence-based chat support", icon: MessageCircle, href: "/chat", action: () => navigate("/chat"), color: "text-primary bg-primary/10" },
        { label: "Self Help Tool", desc: "Interactive joint exercise diagram", icon: Activity, href: "/self-help", action: () => navigate("/self-help"), color: "text-primary bg-primary/10" },
        { label: "Health Tools", desc: "Quiz, calculator & exercise planner", icon: HeartPulse, href: "/health-tools", action: () => navigate("/health-tools"), color: "text-primary bg-primary/10" },
      ],
    },
    {
      label: "Treatments",
      href: "/exercises",
      action: () => navigate("/exercises"),
      subs: [
        { label: "Exercise Hub", desc: "Knee, hand, shoulder & chair exercises", icon: Dumbbell, href: "/exercises", action: () => navigate("/exercises"), color: "text-primary bg-primary/10" },
        { label: "Diet & Nutrition Hub", desc: "Anti-inflammatory & Mediterranean diet", icon: Utensils, href: "/diet", action: () => navigate("/diet"), color: "text-primary bg-primary/10" },
      ],
    },
    {
      label: "Conditions",
      href: "#conditions",
      subs: [
        { label: "Osteoarthritis", desc: "The most common form of arthritis", icon: Bone, href: "/conditions/osteoarthritis", action: () => navigate("/conditions/osteoarthritis"), color: "text-primary bg-primary/10" },
        { label: "Rheumatoid Arthritis", desc: "Autoimmune joint inflammation", icon: HeartPulse, href: "/conditions/rheumatoid-arthritis", action: () => navigate("/conditions/rheumatoid-arthritis"), color: "text-rose-600 bg-rose-500/10" },
        { label: "Psoriatic Arthritis", desc: "Joint pain with skin psoriasis", icon: ShieldCheck, href: "/conditions/psoriatic-arthritis", action: () => navigate("/conditions/psoriatic-arthritis"), color: "text-primary bg-primary/10" },
        { label: "Gout & Other Types", desc: "Crystal, fibromyalgia & more", icon: Stethoscope, href: "#conditions", color: "text-primary bg-primary/10" },
      ],
    },
    {
      label: "Blog & Stories",
      href: "/blog",
      action: () => navigate("/blog"),
      subs: [
        { label: "Blog Articles", desc: "100+ evidence-based health articles", icon: Newspaper, href: "/blog", action: () => navigate("/blog"), color: "text-primary bg-primary/10" },
        { label: "Expert Articles", desc: "Clinician-written specialist guides", icon: Stethoscope, href: "/expert-articles", action: () => navigate("/expert-articles"), color: "text-primary bg-primary/10" },
        { label: "Lived Experiences", desc: "Real stories from real patients", icon: Heart, href: "/stories", action: () => navigate("/stories"), color: "text-primary bg-primary/10" },
        { label: "Resource Directory", desc: "UK NHS, charities & benefits", icon: Globe, href: "/resources-directory", action: () => navigate("/resources-directory"), color: "text-primary bg-primary/10" },
      ],
    },
    {
      label: "Support Us",
      href: "#involved",
      subs: [
        { label: "Donate", desc: "Power the progress for a cure", icon: Heart, href: "#involved", color: "text-primary bg-primary/10" },
        { label: "Fundraise for Us", desc: "Run, bake, cycle or create", icon: HandHeart, href: "#involved", color: "text-primary bg-primary/10" },
        { label: "Zakat Appeal", desc: "Give your Zakat to joint health", icon: Globe, href: "/zakat-appeal", action: () => navigate("/zakat-appeal"), color: "text-primary bg-primary/10" },
        { label: "Trust & Credibility", desc: "Governance, advisors & evidence", icon: ShieldCheck, href: "/trust", action: () => navigate("/trust"), color: "text-primary bg-primary/10" },
      ],
    },
    { label: "Resources", href: "#resources", action: () => setResourceDrawerOpen(true) },
    { label: "Shop", href: "/shop", action: () => navigate("/shop") },
  ];

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!activeDropdown) return;
    const closeOnScroll = () => setActiveDropdown(null);
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [activeDropdown]);

  useEffect(() => {
    if (!activeDropdown) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-nav-dropdown]')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [activeDropdown]);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const mobileNavItems = [
    { label: "Newly Diagnosed", icon: Sparkles, desc: "Your essential first steps guide", href: "/about", action: () => navigate("/about") },
    { label: "Self Help Tool", icon: Activity, desc: "Interactive joint exercise diagram", href: "/self-help", action: () => navigate("/self-help") },
    { label: "Exercises & Diet", icon: Dumbbell, desc: "Physio exercises & nutrition plans", href: "/exercises", action: () => navigate("/exercises") },
    { label: "Conditions", icon: HeartPulse, desc: "OA, RA, Gout, PsA & more", href: "#conditions" },
    { label: "Blog & Stories", icon: Newspaper, desc: "40+ evidence-based articles", href: "/blog", action: () => navigate("/blog") },
    { label: "Support Us", icon: HandHeart, desc: "Donate, volunteer & fundraise", href: "#involved" },
    { label: "Resources", icon: BookOpen, desc: "NHS pathways, benefits & guides", href: "#resources", action: () => setResourceDrawerOpen(true) },
    { label: "Shop", icon: ShoppingBag, desc: "Recommended arthritis products", href: "/shop", action: () => navigate("/shop") },
  ];

  const isHidden = !visible && !mobileMenuOpen;

  return (
    <>
      {/* Skip to content — first focusable element */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-primary-foreground focus:rounded-xl focus:text-sm focus:font-bold focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* ── STICKY WRAPPER — entire header block sticks together ── */}
      <div
        className={`sticky top-0 z-50 transition-transform duration-300 ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        {/* Donation Banner */}
        <Suspense fallback={<div className="bg-primary h-[38px]" />}>
          <DonationBanner />
        </Suspense>

        {/* Logo Bar */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-background/95 backdrop-blur-xl border-b border-border/30"
              : "bg-background border-b border-border/15"
          }`}
        >
          <div className="container mx-auto px-6 md:px-10 py-2.5 flex items-center justify-between gap-4">
            {/* Logo — left aligned */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 group cursor-pointer select-none shrink-0"
              aria-label="Living With Arthritis — Go to homepage"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0">
                <LogoMark className="w-full h-full drop-shadow-sm group-hover:scale-105 transition-transform duration-300" aria-hidden="true" />
              </div>
              <span className="text-lg sm:text-xl md:text-[1.55rem] font-black text-primary tracking-tight leading-none uppercase">
                Living With Arthritis
              </span>
            </button>

            {/* Desktop: search + theme on right of logo */}
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-end">
              <Suspense fallback={null}><SiteSearch /></Suspense>
              <ThemeToggle />
            </div>

            {/* Mobile: search icon + hamburger */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg h-9 w-9"
                onClick={() => setMobileSearchOpen((v) => !v)}
                aria-label="Open search"
              >
                <Search size={18} aria-hidden="true" />
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/donate")}
                className="h-9 px-4 rounded-full text-[11px] font-bold tracking-wider bg-[hsl(0,72%,51%)] hover:bg-[hsl(0,72%,45%)] text-white shadow-md shadow-red-500/20"
              >
                <Heart className="w-3 h-3 mr-1.5 fill-white/30" />
                Donate Now
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg h-9 w-9"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </Button>
            </div>
          </div>

          {/* Mobile search bar — slides in below logo */}
          {mobileSearchOpen && (
            <div className="lg:hidden px-4 pb-3 border-t border-border/20 pt-3 bg-background/95 backdrop-blur-xl">
              <Suspense fallback={null}><SiteSearch /></Suspense>
            </div>
          )}
        </div>



        {/* Nav Bar */}
        <header
          role="banner"
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-background/95 backdrop-blur-xl shadow-md border-b border-border/30"
              : "bg-background border-b border-border/20"
          }`}
        >
          <div className="mx-auto px-6 md:px-10 max-w-[1400px]">
            <div className="flex justify-between items-center h-[46px]">

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-0.5 mx-auto" aria-label="Main navigation">
                {navLinks.map((link) => (
                  <div key={link.label} className="relative" data-nav-dropdown>
                    <button
                      onClick={(e) => {
                        if (link.subs) {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === link.label ? null : link.label);
                        } else {
                          if (link.action) {
                            e.preventDefault();
                            link.action();
                          } else {
                            scrollToSection(link.href);
                          }
                          setActiveDropdown(null);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape" && activeDropdown === link.label) {
                          setActiveDropdown(null);
                        }
                      }}
                      aria-expanded={link.subs ? activeDropdown === link.label : undefined}
                      aria-haspopup={link.subs ? "true" : undefined}
                      className={`px-3.5 py-1.5 text-[13px] font-semibold rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                        activeDropdown === link.label
                          ? "text-primary bg-primary/5"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {link.label}
                      {link.subs && <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`} aria-hidden="true" />}
                    </button>

                    {/* Rich sub-menu dropdown */}
                    {link.subs && activeDropdown === link.label && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[90]" role="menu" aria-label={`${link.label} submenu`}>
                        <div className="relative bg-background border border-border/30 rounded-xl shadow-2xl shadow-black/8 p-1.5 min-w-[340px] animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                          {/* Top notch */}
                          <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-background border-l border-t border-border/30" />
                          {link.subs.map((sub, idx) => {
                            const Icon = sub.icon;
                            return (
                              <button
                                key={sub.label}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  if (sub.action) {
                                    sub.action();
                                  } else if (sub.href.startsWith("#")) {
                                    scrollToSection(sub.href);
                                  } else {
                                    navigate(sub.href);
                                  }
                                }}
                                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent/60 transition-all duration-150 cursor-pointer group/item ${idx > 0 ? "mt-0.5" : ""}`}
                                role="menuitem"
                              >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/item:scale-110 ${sub.color || "text-primary bg-primary/10"}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="block text-[13px] font-semibold text-foreground group-hover/item:text-primary transition-colors">{sub.label}</span>
                                  <span className="block text-[11px] text-muted-foreground/60 leading-snug">{sub.desc}</span>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/20 group-hover/item:text-primary/50 opacity-0 group-hover/item:opacity-100 transition-all duration-150 group-hover/item:translate-x-0.5 rtl:rotate-180 rtl:group-hover/item:-translate-x-0.5" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Persistent Donate button — charity red, matches Ways to Help pill style */}
                <button
                  onClick={() => navigate("/zakat-appeal")}
                  className="ms-3 group relative inline-flex items-center gap-1.5 px-5 py-2 text-[13px] font-bold rounded-full bg-destructive text-destructive-foreground border border-destructive/80 hover:bg-destructive/90 hover:shadow-md hover:shadow-destructive/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-white/30 transition-transform duration-300 group-hover:scale-110" />
                  {t("nav.donateNow")}
                </button>

                {/* Ways to Help link */}
                <button
                  onClick={() => navigate("/ways-to-help")}
                  className="ms-1.5 group relative inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold rounded-full bg-gradient-to-r from-primary/10 to-accent/30 text-primary border border-primary/20 hover:from-primary hover:to-primary hover:text-primary-foreground hover:border-primary hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  {t("nav.waysToHelp")}
                </button>
              </nav>

              {/* Mobile placeholder — keeps header height consistent on mobile */}
              <div className="lg:hidden w-full" />
            </div>
          </div>
        </header>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-0 end-0 bottom-0 w-[80%] max-w-sm bg-background z-[70] lg:hidden shadow-2xl flex flex-col border-s border-border/30 animate-in slide-in-from-right rtl:slide-in-from-left duration-300" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <div className="flex items-center justify-between p-6 border-b border-border/20">
              <div className="flex items-center gap-2.5">
                <LogoMark className="w-8 h-8" />
                <span className="text-lg font-extrabold text-primary">{t("nav.menu")}</span>
              </div>
              <Button variant="ghost" size="icon" className="rounded-lg h-9 w-9" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={18} />
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1" aria-label="Mobile navigation">
              {mobileNavItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (item.action) {
                        item.action();
                      } else if (item.href.startsWith("#")) {
                        scrollToSection(item.href);
                      } else {
                        navigate(item.href);
                      }
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-4 text-[15px] font-semibold text-muted-foreground hover:text-foreground hover:bg-accent active:bg-accent/80 rounded-xl transition-all cursor-pointer group min-h-[56px]"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-[18px] h-[18px] text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block truncate">{item.label}</span>
                      <span className="text-[11px] font-normal text-muted-foreground/70 truncate block">{item.desc}</span>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="p-6 space-y-3 border-t border-border/20">
              <Button
                className="w-full btn-secondary-cta h-14 rounded-full text-sm font-bold tracking-wide"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/chat");
                }}
              >
                <MessageCircle className="w-4 h-4 me-2" />
                {t("nav.talkToAI")}
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 rounded-full text-xs font-semibold"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/zakat-appeal");
                }}
              >
                <Globe className="w-3.5 h-3.5 me-2" />
                {t("nav.zakatAppeal")}
              </Button>
            </div>
          </div>
        </>
      )}

      <Suspense fallback={null}><ResourceLibraryDrawer open={resourceDrawerOpen} onOpenChange={setResourceDrawerOpen} /></Suspense>
    </>
  );
};

export default Header;
