import { useState, useEffect, useRef, useCallback, lazy, Suspense, type MouseEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, BookOpen, ChevronDown, Stethoscope, Activity, Newspaper, ShoppingBag, HandHeart, ArrowRight, Utensils, MessageCircle, Dumbbell, Bone, ShieldCheck, HeartPulse, Sparkles, Globe, Search } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SiteLogo from "@/components/SiteLogo";

const _CartDrawer = lazy(() => import("@/components/CartDrawer"));
const ResourceLibraryDrawer = lazy(() => import("@/components/ResourceLibraryDrawer"));
const SiteSearch = lazy(() => import("@/components/SiteSearch"));
const DonationQuickBar = lazy(() => import("@/components/DonationQuickBar"));


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
  const { pathname } = useLocation();
  const [activeHash, setActiveHash] = useState<string>("");
  const lastScrollY = useRef(0);

  /* Track which in-page #section is currently in view (for hash links). */
  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }
    const ids = ["conditions", "involved", "resources"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHash(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  /* Determine if a top-level nav link is active (route OR hash match,
     including any of its sub-items routes). */
  const isLinkActive = useCallback(
    (link: NavLink): boolean => {
      const matchHref = (href: string) => {
        if (!href) return false;
        if (href.startsWith("#")) return activeHash === href;
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
      };
      if (matchHref(link.href)) return true;
      return Boolean(link.subs?.some((s) => matchHref(s.href)));
    },
    [pathname, activeHash]
  );

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
      label: "About Arthritis",
      href: "/conditions/arthritis",
      action: () => navigate("/conditions/arthritis"),
      subs: [
        { label: "What Is Arthritis?", desc: "Overview of 100+ types", icon: Stethoscope, href: "/conditions/arthritis", action: () => navigate("/conditions/arthritis"), color: "text-primary bg-primary/10" },
        { label: "Osteoarthritis", desc: "The most common form", icon: Bone, href: "/conditions/osteoarthritis", action: () => navigate("/conditions/osteoarthritis"), color: "text-primary bg-primary/10" },
        { label: "Rheumatoid Arthritis", desc: "Autoimmune joint inflammation", icon: HeartPulse, href: "/conditions/rheumatoid-arthritis", action: () => navigate("/conditions/rheumatoid-arthritis"), color: "text-primary bg-primary/10" },
        { label: "Psoriatic Arthritis", desc: "Joint pain with psoriasis", icon: ShieldCheck, href: "/conditions/psoriatic-arthritis", action: () => navigate("/conditions/psoriatic-arthritis"), color: "text-primary bg-primary/10" },
        { label: "Gout", desc: "Crystal arthritis — sudden, severe pain", icon: Stethoscope, href: "/conditions/gout", action: () => navigate("/conditions/gout"), color: "text-primary bg-primary/10" },
        { label: "Ankylosing Spondylitis", desc: "Spine & back arthritis", icon: Stethoscope, href: "/conditions/ankylosing-spondylitis", action: () => navigate("/conditions/ankylosing-spondylitis"), color: "text-primary bg-primary/10" },
        { label: "Juvenile Arthritis", desc: "Arthritis in children", icon: Stethoscope, href: "/conditions/juvenile-arthritis", action: () => navigate("/conditions/juvenile-arthritis"), color: "text-primary bg-primary/10" },
        { label: "Fibromyalgia", desc: "Widespread pain & fatigue", icon: Stethoscope, href: "/conditions/fibromyalgia", action: () => navigate("/conditions/fibromyalgia"), color: "text-primary bg-primary/10" },
        { label: "Lupus (SLE)", desc: "Autoimmune disease", icon: Stethoscope, href: "/conditions/lupus", action: () => navigate("/conditions/lupus"), color: "text-primary bg-primary/10" },
        { label: "Trust & Credibility", desc: "Our evidence, authors & governance", icon: ShieldCheck, href: "/trust", action: () => navigate("/trust"), color: "text-primary bg-primary/10" },
      ],
    },
    {
      label: "Managing Arthritis",
      href: "/living-with-arthritis",
      action: () => navigate("/living-with-arthritis"),
      subs: [
        { label: "Newly Diagnosed", desc: "Your step-by-step first weeks", icon: Sparkles, href: "/guides/newly-diagnosed", action: () => navigate("/guides/newly-diagnosed"), color: "text-primary bg-primary/10" },
        { label: "Pain Relief", desc: "Evidence-based pain management", icon: HeartPulse, href: "/guides/arthritis-pain-relief", action: () => navigate("/guides/arthritis-pain-relief"), color: "text-primary bg-primary/10" },
        { label: "Exercise & Movement", desc: "Knee, hand, tai chi & more", icon: Dumbbell, href: "/exercises", action: () => navigate("/exercises"), color: "text-primary bg-primary/10" },
        { label: "Nutrition & Diet", desc: "Anti-inflammatory eating", icon: Utensils, href: "/diet", action: () => navigate("/diet"), color: "text-primary bg-primary/10" },
        { label: "Emotional Wellbeing", desc: "Mental health support", icon: Heart, href: "/arthritis-mental-health", action: () => navigate("/arthritis-mental-health"), color: "text-primary bg-primary/10" },
        { label: "Work & Career", desc: "Rights, adjustments, flare plans", icon: ShieldCheck, href: "/guides/work-with-arthritis", action: () => navigate("/guides/work-with-arthritis"), color: "text-primary bg-primary/10" },
        { label: "Travel Tips", desc: "Flying, insurance, Blue Badge", icon: Globe, href: "/guides/travel-with-arthritis", action: () => navigate("/guides/travel-with-arthritis"), color: "text-primary bg-primary/10" },
        { label: "Drug Guide", desc: "NSAIDs, DMARDs, biologics", icon: Stethoscope, href: "/treatments/drug-guide", action: () => navigate("/treatments/drug-guide"), color: "text-primary bg-primary/10" },
        { label: "Surgery Options", desc: "Joint replacement & alternatives", icon: Bone, href: "/treatments/surgery-options", action: () => navigate("/treatments/surgery-options"), color: "text-primary bg-primary/10" },
        { label: "Complementary Therapies", desc: "Acupuncture, supplements", icon: Sparkles, href: "/treatments/complementary-therapies", action: () => navigate("/treatments/complementary-therapies"), color: "text-primary bg-primary/10" },
        { label: "Symptom Checker", desc: "Match your symptoms to conditions", icon: Activity, href: "/symptom-checker", action: () => navigate("/symptom-checker"), color: "text-primary bg-primary/10" },
        { label: "Find a Specialist", desc: "Rheumatologists, physios, OTs", icon: Stethoscope, href: "/tools/find-specialist", action: () => navigate("/tools/find-specialist"), color: "text-primary bg-primary/10" },
        { label: "Treatment Access & Costs", desc: "NHS, private, PIP, grants", icon: ShieldCheck, href: "/guides/insurance-coverage", action: () => navigate("/guides/insurance-coverage"), color: "text-primary bg-primary/10" },
      ],
    },
    {
      label: "Community & Support",
      href: "/community",
      action: () => navigate("/community"),
      subs: [
        { label: "Connect Groups", desc: "Free peer-support communities", icon: HandHeart, href: "/community/connect-groups", action: () => navigate("/community/connect-groups"), color: "text-primary bg-primary/10" },
        { label: "Helpline & Support", desc: "Real people, 2-day response", icon: MessageCircle, href: "/helpline", action: () => navigate("/helpline"), color: "text-primary bg-primary/10" },
        { label: "Events & Webinars", desc: "Free monthly online events", icon: Globe, href: "/events", action: () => navigate("/events"), color: "text-primary bg-primary/10" },
        { label: "Podcasts", desc: "Coming soon — UK arthritis podcast", icon: Newspaper, href: "/podcasts", action: () => navigate("/podcasts"), color: "text-primary bg-primary/10" },
        { label: "Patient Stories", desc: "Lived experience from real people", icon: Heart, href: "/stories", action: () => navigate("/stories"), color: "text-primary bg-primary/10" },
        { label: "Buddy Programme", desc: "1-to-1 peer mentoring", icon: HandHeart, href: "/buddy", action: () => navigate("/buddy"), color: "text-primary bg-primary/10" },
        { label: "Blog & Library", desc: "100+ evidence-based articles", icon: BookOpen, href: "/blog", action: () => navigate("/blog"), color: "text-primary bg-primary/10" },
        { label: "Glossary A–Z", desc: "Plain-English arthritis terms", icon: BookOpen, href: "/glossary", action: () => navigate("/glossary"), color: "text-primary bg-primary/10" },
        { label: "Pets & Arthritis", desc: "Dogs, cats, horses & more", icon: HeartPulse, href: "/pets", action: () => navigate("/pets"), color: "text-primary bg-primary/10" },
      ],
    },
    {
      label: "Get Involved",
      href: "/ways-to-help",
      action: () => navigate("/ways-to-help"),
      subs: [
        { label: "Donate", desc: "Power free arthritis support", icon: Heart, href: "/donate", action: () => navigate("/donate"), color: "text-primary bg-primary/10" },
        { label: "Volunteer", desc: "Flexible UK roles around lived experience", icon: HandHeart, href: "/volunteer", action: () => navigate("/volunteer"), color: "text-primary bg-primary/10" },
        { label: "Advocacy", desc: "Share your story, shape research", icon: ShieldCheck, href: "/advocacy", action: () => navigate("/advocacy"), color: "text-primary bg-primary/10" },
        { label: "Corporate Giving", desc: "Partner with us as an organisation", icon: Globe, href: "/corporate-giving", action: () => navigate("/corporate-giving"), color: "text-primary bg-primary/10" },
        { label: "Corporate Partnerships", desc: "Formal partnership programme", icon: Globe, href: "/corporate-partnerships", action: () => navigate("/corporate-partnerships"), color: "text-primary bg-primary/10" },
        { label: "Zakat Appeal", desc: "Give your Zakat to joint health", icon: Globe, href: "/zakat-appeal", action: () => navigate("/zakat-appeal"), color: "text-primary bg-primary/10" },
        { label: "Ways to Help", desc: "All the ways you can support us", icon: Heart, href: "/ways-to-help", action: () => navigate("/ways-to-help"), color: "text-primary bg-primary/10" },
      ],
    },
    {
      label: "Research",
      href: "/research",
      action: () => navigate("/research"),
      subs: [
        { label: "Our Research", desc: "Patient-priority studies", icon: BookOpen, href: "/research", action: () => navigate("/research"), color: "text-primary bg-primary/10" },
        { label: "Clinical Trials", desc: "Find UK trials you can join", icon: Stethoscope, href: "/research/clinical-trials", action: () => navigate("/research/clinical-trials"), color: "text-primary bg-primary/10" },
        { label: "Grant Opportunities", desc: "Seed funding for UK researchers", icon: Sparkles, href: "/research/grants", action: () => navigate("/research/grants"), color: "text-primary bg-primary/10" },
        { label: "AI Transparency", desc: "How we use AI responsibly", icon: ShieldCheck, href: "/about/ai-transparency", action: () => navigate("/about/ai-transparency"), color: "text-primary bg-primary/10" },
        { label: "Clinical Sources", desc: "Our evidence base", icon: BookOpen, href: "/sources", action: () => navigate("/sources"), color: "text-primary bg-primary/10" },
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
    const handleClick = (e: globalThis.MouseEvent) => {
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
    { label: "Pets & Arthritis", icon: HeartPulse, desc: "Dogs, cats, horses & more", href: "/pets", action: () => navigate("/pets") },
    { label: "Conditions", icon: HeartPulse, desc: "OA, RA, Gout, PsA & more", href: "#conditions" },
    { label: "Blog & Stories", icon: Newspaper, desc: "40+ evidence-based articles", href: "/blog", action: () => navigate("/blog") },
    { label: "Glossary", icon: BookOpen, desc: "Plain-English arthritis A–Z", href: "/glossary", action: () => navigate("/glossary") },
    { label: "Trust & Credibility", icon: ShieldCheck, desc: "Evidence, authors & governance", href: "/trust", action: () => navigate("/trust") },
    { label: "Support Us", icon: HandHeart, desc: "Donate, volunteer & fundraise", href: "#involved" },
    { label: "Corporate Partnerships", icon: Globe, desc: "Formal partnership programme", href: "/corporate-partnerships", action: () => navigate("/corporate-partnerships") },
    { label: "Resources", icon: BookOpen, desc: "Care pathways, benefits & guides", href: "#resources", action: () => setResourceDrawerOpen(true) },
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

        {/* Donation Quick Bar — top of sticky header */}
        <Suspense fallback={<div className="bg-primary h-[52px]" />}>
          <DonationQuickBar />
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
            {/* Logo — stick figure mark + wordmark */}
            <button
              onClick={() => navigate("/")}
              className="group cursor-pointer select-none shrink-0 transition-opacity hover:opacity-80"
              aria-label="Living With Arthritis — Go to homepage"
            >
              <span className="flex flex-col items-start leading-none">
                <SiteLogo
                  variant="full"
                  markClassName="h-8 md:h-10"
                  textClassName="text-lg sm:text-xl md:text-2xl"
                />
                <span className="mt-1 ms-11 md:ms-[3.25rem] text-[9px] md:text-[10px] font-bold tracking-[0.18em] uppercase text-primary">
                  Motion is Lotion
                </span>
              </span>
            </button>


            {/* Desktop: search + theme on right of logo */}
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-end">
              <Suspense fallback={null}><SiteSearch /></Suspense>
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            {/* Mobile: search icon + hamburger */}
            <div className="flex items-center gap-1.5 lg:hidden min-w-0">
              {/* Language + theme move into the drawer on narrow phones so the
                  header row never overflows the viewport. */}
              <span className="hidden sm:flex items-center gap-1.5">
                <LanguageSwitcher />
                <ThemeToggle />
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg h-9 w-9 shrink-0"
                onClick={() => setMobileSearchOpen((v) => !v)}
                aria-label="Open search"
              >
                <Search size={18} aria-hidden="true" />
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/donate")}
                className="h-9 px-3 sm:px-4 rounded-full text-[11px] font-bold tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 shrink-0"
              >
                <Heart className="w-3 h-3 mr-1.5 fill-background/30" />
                <span className="hidden xs:inline">Donate Now</span>
                <span className="xs:hidden">Donate</span>
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
                {navLinks.map((link) => {
                  const active = isLinkActive(link);
                  const open = activeDropdown === link.label;
                  const isHash = link.href.startsWith("#");
                  const topLevelHandlers = {
                    onClick: (e: MouseEvent) => {
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
                    },
                    onKeyDown: (e: KeyboardEvent) => {
                      if (e.key === "Escape" && activeDropdown === link.label) {
                        setActiveDropdown(null);
                      }
                    },
                    "aria-expanded": link.subs ? open : undefined,
                    "aria-haspopup": link.subs ? ("true" as const) : undefined,
                    "aria-current": active ? ("page" as const) : undefined,
                    className: `relative px-3.5 py-1.5 text-[13px] font-semibold rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                      open
                        ? "text-primary bg-primary/5"
                        : active
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`,
                  };
                  const topLevelContent = (
                    <>
                      {link.label}
                      {link.subs && <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />}
                      {/* Magazine-style active indicator */}
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute left-3.5 right-3.5 -bottom-[7px] h-[2px] bg-primary rounded-full origin-center transition-transform duration-300 ease-out ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </>
                  );
                  return (
                  <div key={link.label} className="relative" data-nav-dropdown>
                    {/* A real <Link>/<a href> is required here (not a <button>) so
                        crawlers that parse hrefs — not just those that execute JS —
                        can discover every hub page linked from this mega-menu. A
                        <button onClick={navigate(...)}> has no href at all and is
                        invisible to link-discovery crawling regardless of JS
                        rendering support. Hash-only items (e.g. "Resources", which
                        opens a drawer, not a real route) stay buttons since there's
                        no destination URL to expose. */}
                    {isHash ? (
                      <button {...topLevelHandlers}>{topLevelContent}</button>
                    ) : (
                      <Link to={link.href} {...topLevelHandlers}>{topLevelContent}</Link>
                    )}

                    {/* Rich sub-menu dropdown — always rendered in the DOM (not
                        conditionally mounted) so every link inside it is
                        crawlable even though it's only visually revealed on
                        hover/click. Visibility toggles via CSS, not JSX mount. */}
                    {link.subs && (
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[90] transition-all duration-200 ${
                          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1 pointer-events-none"
                        }`}
                        role="menu"
                        aria-label={`${link.label} submenu`}
                        aria-hidden={!open}
                      >
                        <div className="relative bg-background border border-border/30 rounded-xl shadow-2xl shadow-primary/8 p-1.5 min-w-[340px] max-h-[min(70vh,32rem)] overflow-y-auto overscroll-contain scrollbar-thin">
                          {/* Top notch */}
                          <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-background border-l border-t border-border/30" />
                          {link.subs.map((sub, idx) => {
                            const Icon = sub.icon;
                            return (
                              <Link
                                key={sub.label}
                                to={sub.href.startsWith("#") ? link.href : sub.href}
                                onClick={(e) => {
                                  setActiveDropdown(null);
                                  if (sub.href.startsWith("#")) {
                                    e.preventDefault();
                                    if (sub.action) sub.action();
                                    else scrollToSection(sub.href);
                                  } else if (sub.action) {
                                    e.preventDefault();
                                    sub.action();
                                  }
                                }}
                                tabIndex={open ? 0 : -1}
                                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent/60 transition-all duration-150 cursor-pointer group/item ${idx > 0 ? "mt-0.5" : ""}`}
                                role="menuitem"
                              >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/item:scale-110 ${sub.color || "text-primary bg-primary/10"}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="block text-[13px] font-semibold text-foreground group-hover/item:text-primary transition-colors">{sub.label}</span>
                                  <span className="block text-[11px] text-muted-foreground leading-snug">{sub.desc}</span>
                                </div>
                                <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover/item:opacity-100 group-hover/item:text-primary transition-all duration-150 group-hover/item:translate-x-0.5 rtl:rotate-180 rtl:group-hover/item:-translate-x-0.5" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  );
                })}

                {/* Persistent Donate button — charity red, matches Ways to Help pill style */}
                <Link
                  to="/zakat-appeal"
                  className="ms-3 group relative inline-flex items-center gap-1.5 px-5 py-2 text-[13px] font-bold rounded-full bg-destructive text-destructive-foreground border border-destructive/80 hover:bg-destructive/90 hover:shadow-md hover:shadow-destructive/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-background/30 transition-transform duration-300 group-hover:scale-110" />
                  Donate Now
                </Link>

                {/* Ways to Help — demoted to a quiet text link to avoid competing with primary Donate CTA */}
                <Link
                  to="/ways-to-help"
                  className="ms-3 inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground hover:text-primary underline-offset-4 hover:underline transition-colors duration-200"
                >
                  Ways to Help
                </Link>
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
                <SiteLogo variant="mark" markClassName="h-8 w-auto" />
                <span className="text-lg font-extrabold text-primary">Menu</span>
              </div>
              <Button variant="ghost" size="icon" className="rounded-lg h-9 w-9" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={18} />
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1" aria-label="Mobile navigation">
              {mobileNavItems.map((item, index) => {
                const Icon = item.icon;
                const active = item.href.startsWith("#")
                  ? activeHash === item.href && pathname === "/"
                  : item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                const isHashItem = item.href.startsWith("#");
                const commonProps = {
                  "aria-current": active ? ("page" as const) : undefined,
                  onClick: () => {
                    setMobileMenuOpen(false);
                    // Hash items (no real route) still need their own handler —
                    // either a custom action (e.g. opening the resource drawer)
                    // or a scroll-to-section fallback. Non-hash items are real
                    // <Link> elements now; every mobileNavItems action for those
                    // is just `() => navigate(item.href)`, redundant with what
                    // the Link's href already does, so it's intentionally not
                    // called here to avoid a double-navigation.
                    if (isHashItem) {
                      if (item.action) item.action();
                      else scrollToSection(item.href);
                    }
                  },
                  className: `relative flex items-center gap-3 w-full text-left px-4 py-4 text-[15px] font-semibold rounded-xl transition-all cursor-pointer group min-h-[56px] ${
                    active
                      ? "text-primary bg-primary/5 ring-1 ring-primary/15"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent active:bg-accent/80"
                  }`,
                  style: { animationDelay: `${index * 50}ms` },
                };
                const content = (
                  <>
                    {active && (
                      <span aria-hidden="true" className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r bg-primary" />
                    )}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${active ? "bg-primary/15" : "bg-primary/8 group-hover:bg-primary/15"}`}>
                      <Icon className="w-[18px] h-[18px] text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block truncate">{item.label}</span>
                      <span className="text-[11px] font-normal text-muted-foreground truncate block">{item.desc}</span>
                    </div>
                  </>
                );
                return isHashItem ? (
                  <button key={item.label} {...commonProps}>{content}</button>
                ) : (
                  <Link key={item.label} to={item.href} {...commonProps}>{content}</Link>
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
                <MessageCircle className="w-4 h-4 mr-2" />
                Start a chat
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 rounded-full text-xs font-semibold"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/zakat-appeal");
                }}
              >
                <Globe className="w-3.5 h-3.5 mr-2" />
                Zakat Appeal
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
