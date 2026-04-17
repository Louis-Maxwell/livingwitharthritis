import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Search, X, ArrowRight, FileText, Dumbbell, Utensils, Sun, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface SearchItem {
  label: string;
  href: string;
  category: string;
  icon: React.ElementType;
}

// Internal indexed item: pre-lowercased label for O(1)-per-compare matching.
interface IndexedItem extends SearchItem {
  l: string; // lowercase label, computed once
}

const joints = ["knee", "hip", "shoulder", "hand", "back", "ankle"] as const;
const exercises = ["swimming", "yoga", "cycling", "walking", "tai-chi", "pilates", "stretching", "strength-training"] as const;

const exerciseLabels: Record<string, string> = {
  swimming: "Swimming", yoga: "Yoga", cycling: "Cycling", walking: "Walking",
  "tai-chi": "Tai Chi", pilates: "Pilates", stretching: "Stretching", "strength-training": "Strength Training"
};
const jointLabels: Record<string, string> = {
  knee: "Knee", hip: "Hip", shoulder: "Shoulder", hand: "Hand", back: "Back", ankle: "Ankle"
};

const jointExerciseItems: SearchItem[] = joints.flatMap((joint) =>
  exercises.map((exercise) => ({
    label: `${exerciseLabels[exercise]} for ${jointLabels[joint]} Arthritis`,
    href: `/exercises/${exercise}/${joint}`,
    category: "Joint Exercises",
    icon: Dumbbell,
  }))
);

const rawIndex: SearchItem[] = [
  { label: "Home", href: "/", category: "Pages", icon: FileText },
  { label: "About Us", href: "/about", category: "Pages", icon: FileText },
  { label: "Exercise Hub", href: "/exercises", category: "Pages", icon: Dumbbell },
  { label: "Diet & Nutrition Hub", href: "/diet", category: "Pages", icon: Utensils },
  { label: "Self Help Tool", href: "/self-help", category: "Pages", icon: Dumbbell },
  { label: "Virtual Assistant", href: "/chat", category: "Pages", icon: FileText },
  { label: "Trust & Credibility", href: "/trust", category: "Pages", icon: FileText },
  { label: "Community Hub", href: "/community", category: "Pages", icon: FileText },
  { label: "Blog", href: "/blog", category: "Pages", icon: FileText },
  { label: "Health Tools", href: "/health-tools", category: "Pages", icon: Dumbbell },
  { label: "Zakat Appeal", href: "/zakat-appeal", category: "Pages", icon: FileText },
  { label: "Osteoarthritis", href: "/conditions/osteoarthritis", category: "Conditions", icon: Stethoscope },
  { label: "Rheumatoid Arthritis", href: "/conditions/rheumatoid-arthritis", category: "Conditions", icon: Stethoscope },
  { label: "Psoriatic Arthritis", href: "/conditions/psoriatic-arthritis", category: "Conditions", icon: Stethoscope },
  ...jointExerciseItems,
  { label: "Best Diet for Joint Pain UK", href: "/blog/best-diet-for-joint-pain-uk", category: "Blog", icon: Utensils },
  { label: "Turmeric for Arthritis UK", href: "/blog/turmeric-for-arthritis-uk", category: "Blog", icon: Utensils },
  { label: "Omega-3 & Fish Oil", href: "/blog/arthritis-and-omega-3-fish-oil", category: "Blog", icon: Utensils },
  { label: "Knee Arthritis Exercises UK", href: "/blog/knee-arthritis-exercises-uk", category: "Blog", icon: Dumbbell },
  { label: "Hand Exercises for Arthritis", href: "/blog/hand-exercises-for-arthritis", category: "Blog", icon: Dumbbell },
  { label: "Shoulder Arthritis Exercises UK", href: "/blog/shoulder-arthritis-exercises-uk", category: "Blog", icon: Dumbbell },
  { label: "NHS Arthritis Exercises", href: "/blog/nhs-arthritis-exercises", category: "Blog", icon: Dumbbell },
  { label: "Swimming for Arthritis UK", href: "/blog/swimming-for-arthritis-uk", category: "Blog", icon: Dumbbell },
  { label: "Yoga for Arthritis Beginners", href: "/blog/yoga-for-arthritis-beginners", category: "Blog", icon: Dumbbell },
  { label: "Arthritis & Sleep Problems", href: "/blog/arthritis-and-sleep-problems", category: "Blog", icon: FileText },
  { label: "Arthritis & Mental Health", href: "/blog/arthritis-and-mental-health", category: "Blog", icon: FileText },
  { label: "Natural Pain Relief Arthritis UK", href: "/blog/natural-pain-relief-arthritis-uk", category: "Blog", icon: FileText },
  { label: "Anti-Inflammatory Herbs & Spices", href: "/blog/anti-inflammatory-herbs-spices-arthritis", category: "Blog", icon: Utensils },
  { label: "Gut Health & Arthritis", href: "/blog/gut-health-arthritis-connection", category: "Blog", icon: Utensils },
  { label: "Meal Planning for Arthritis UK", href: "/blog/meal-planning-arthritis-uk", category: "Blog", icon: Utensils },
  { label: "Arthritis Supplements UK", href: "/blog/arthritis-supplements-uk", category: "Blog", icon: FileText },
  { label: "Cold Weather & Joint Pain", href: "/blog/arthritis-and-cold-weather-uk", category: "Blog", icon: FileText },
  { label: "Cycling for Arthritis UK", href: "/blog/arthritis-and-cycling-uk", category: "Blog", icon: Dumbbell },
  { label: "Tai Chi for Arthritis UK", href: "/blog/tai-chi-for-arthritis-uk", category: "Blog", icon: Dumbbell },
  { label: "Hydrotherapy Arthritis UK", href: "/blog/hydrotherapy-arthritis-uk", category: "Blog", icon: Dumbbell },
  { label: "Morning Stretches", href: "/daily-tips/morning-stretches", category: "Tips", icon: Sun },
  { label: "Stay Hydrated", href: "/daily-tips/stay-hydrated", category: "Tips", icon: Sun },
  { label: "Anti-inflammatory Snacks", href: "/daily-tips/anti-inflammatory-snacks", category: "Tips", icon: Sun },
  { label: "Walk 20 Minutes", href: "/daily-tips/walk-20-minutes", category: "Tips", icon: Sun },
  { label: "Prioritise Sleep", href: "/daily-tips/prioritise-sleep", category: "Tips", icon: Sun },
  { label: "Pace Yourself", href: "/daily-tips/pace-yourself", category: "Tips", icon: Sun },
];

// Module-level: built once for the app lifetime, shared across mounts.
const SEARCH_INDEX: IndexedItem[] = rawIndex.map((it) => ({ ...it, l: it.label.toLowerCase() }));
const MAX_RESULTS = 8;
const MIN_QUERY = 2;
const DEBOUNCE_MS = 120;

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Debounce query → debounced. Avoids running the filter on every keystroke.
  useEffect(() => {
    if (query.length < MIN_QUERY) {
      setDebounced("");
      return;
    }
    const t = window.setTimeout(() => setDebounced(query), DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [query]);

  const results = useMemo(() => {
    if (debounced.length < MIN_QUERY) return [];
    const q = debounced.toLowerCase();
    const out: IndexedItem[] = [];
    // Manual loop with early exit at MAX_RESULTS — avoids allocating a full filtered array.
    for (let i = 0; i < SEARCH_INDEX.length; i++) {
      if (SEARCH_INDEX[i].l.includes(q)) {
        out.push(SEARCH_INDEX[i]);
        if (out.length >= MAX_RESULTS) break;
      }
    }
    return out;
  }, [debounced]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Combined outside-click + keyboard handler. Only attached while open
  // (except the global Ctrl/Cmd+K opener), so idle cost is zero.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const goTo = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      navigate(href);
    },
    [navigate]
  );

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/50 bg-muted/30 text-muted-foreground hover:bg-muted/60 transition-colors text-xs"
        aria-label="Search the site (Ctrl+K)"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline text-[10px] bg-background/60 border border-border/40 px-1 py-0.5 rounded font-mono ml-1">⌘K</kbd>
      </button>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2 bg-background border border-primary/30 rounded-lg px-3 py-1.5 shadow-lg min-w-[240px] sm:min-w-[300px]">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search exercises, joints, articles..."
          className="border-0 bg-transparent p-0 h-auto text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <button onClick={() => { setOpen(false); setQuery(""); }} className="shrink-0" aria-label="Close search">
          <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-background border border-border/60 rounded-xl shadow-xl z-50 overflow-hidden max-h-[320px] overflow-y-auto">
          {results.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => goTo(item.href)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b border-border/20 last:border-0"
              >
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </button>
            );
          })}
        </div>
      )}

      {debounced.length >= MIN_QUERY && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-background border border-border/60 rounded-xl shadow-xl z-50 p-4 text-center">
          <p className="text-sm text-muted-foreground">No results for "{debounced}"</p>
          <p className="text-xs text-muted-foreground mt-1">Try searching for a joint (knee, hip) or exercise (yoga, swimming)</p>
        </div>
      )}
    </div>
  );
}
