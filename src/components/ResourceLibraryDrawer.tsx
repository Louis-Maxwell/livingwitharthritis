import { memo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ExternalLink,
  Stethoscope,
  PoundSterling,
  Users,
  Shield,
  BookOpen,
  Heart,
  Activity,
  Apple,
  Dumbbell,
  Brain,
  Pill,
  ChevronDown,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const resourceCategories = [
  {
    category: "NHS & Medical",
    icon: Stethoscope,
    color: "icon-circle-sky",
    items: [
      { name: "NHS Arthritis Overview", url: "https://www.nhs.uk/conditions/arthritis/", type: "Guide" },
      { name: "Find NHS Services Near You", url: "https://www.nhs.uk/service-search", type: "Tool" },
      { name: "NICE Osteoarthritis Guidelines", url: "https://www.nice.org.uk/guidance/cg177", type: "Guideline" },
      { name: "NICE Rheumatoid Arthritis", url: "https://www.nice.org.uk/guidance/ng100", type: "Guideline" },
    ],
  },
  {
    category: "Benefits & Rights",
    icon: PoundSterling,
    color: "icon-circle-emerald",
    items: [
      { name: "Check PIP Eligibility", url: "https://www.gov.uk/pip", type: "Gov.uk" },
      { name: "Attendance Allowance", url: "https://www.gov.uk/attendance-allowance", type: "Gov.uk" },
      { name: "Citizens Advice – Disability Benefits", url: "https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/", type: "Advice" },
      { name: "Equality Act 2010 Guidance", url: "https://www.gov.uk/guidance/equality-act-2010-guidance", type: "Legal" },
      { name: "ACAS – Reasonable Adjustments", url: "https://www.acas.org.uk/reasonable-adjustments", type: "Workplace" },
    ],
  },
  {
    category: "Support & Community",
    icon: Users,
    color: "icon-circle-violet",
    items: [
      { name: "Arthritis Action – Self-Management", url: "https://www.arthritisaction.org.uk/", type: "Charity" },
      { name: "NRAS – RA Support Groups", url: "https://nras.org.uk/get-support/", type: "Support" },
      { name: "Arthritis Care (Age UK)", url: "https://www.ageuk.org.uk/information-advice/health-wellbeing/conditions-illnesses/arthritis/", type: "Support" },
    ],
  },
  {
    category: "Exercise & Movement",
    icon: Dumbbell,
    color: "icon-circle-coral",
    items: [
      { name: "Low-Impact Exercises for OA", url: "#exercises", type: "Guide" },
      { name: "Swimming & Water Aerobics", url: "#exercises", type: "Exercise" },
      { name: "Yoga & Tai Chi for Joints", url: "#exercises", type: "Exercise" },
      { name: "Strength Training Guide", url: "#exercises", type: "Guide" },
    ],
  },
  {
    category: "Nutrition & Diet",
    icon: Apple,
    color: "icon-circle-emerald",
    items: [
      { name: "Mediterranean Diet for Arthritis", url: "#nutrition", type: "Diet" },
      { name: "Anti-Inflammatory Foods", url: "#nutrition", type: "Guide" },
      { name: "Omega-3 Rich Recipes", url: "#nutrition", type: "Recipe" },
      { name: "Supplements: Glucosamine & Collagen", url: "#nutrition", type: "Guide" },
    ],
  },
  {
    category: "Mental Health & Wellbeing",
    icon: Brain,
    color: "icon-circle-violet",
    items: [
      { name: "Mindfulness for Chronic Pain", url: "#wellbeing", type: "Guide" },
      { name: "Sleep Improvement Tips", url: "#wellbeing", type: "Tips" },
      { name: "Managing Stress with Arthritis", url: "#wellbeing", type: "Guide" },
    ],
  },
  {
    category: "Treatments & Medication",
    icon: Pill,
    color: "icon-circle-teal",
    items: [
      { name: "Turmeric & Curcumin Evidence", url: "#treatments", type: "Research" },
      { name: "Ginger for Joint Pain", url: "#treatments", type: "Research" },
      { name: "Pain Management Options", url: "#treatments", type: "Guide" },
      { name: "When to See a Rheumatologist", url: "#treatments", type: "Advice" },
    ],
  },
];

interface ResourceLibraryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResourceLibraryDrawer = memo(({ open, onOpenChange }: ResourceLibraryDrawerProps) => {
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(["NHS & Medical"]));
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCat = (cat: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const filteredCategories = searchQuery
    ? resourceCategories.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((cat) => cat.items.length > 0)
    : resourceCategories;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border/30">
          <SheetTitle className="text-xl font-bold text-foreground flex items-center gap-3">
            <div className="icon-circle icon-circle-primary w-10 h-10">
              <BookOpen className="h-5 w-5" />
            </div>
            Resource Library
          </SheetTitle>
          <p className="text-sm text-muted-foreground mt-1">
            UK arthritis resources — NHS, benefits, exercises, nutrition & more.
          </p>
          {/* Search */}
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            const isExpanded = expandedCats.has(cat.category) || !!searchQuery;
            return (
              <div key={cat.category} className="rounded-xl border border-border/30 overflow-hidden">
                {/* Accordion header */}
                <button
                  onClick={() => toggleCat(cat.category)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className={`${cat.color} w-9 h-9 rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-sm font-semibold text-foreground">{cat.category}</span>
                    <span className="text-[10px] text-muted-foreground ml-2">({cat.items.length})</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground/50 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                </button>

                {/* Expanded items */}
                {isExpanded && (
                  <div className="border-t border-border/20 bg-muted/20">
                    {cat.items.map((item, idx) => (
                      <div
                        key={item.name}
                        className={`flex items-center justify-between px-4 py-2.5 hover:bg-accent/40 transition-colors ${
                          idx < cat.items.length - 1 ? "border-b border-border/15" : ""
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <span className="text-[13px] font-medium text-foreground block truncate">{item.name}</span>
                          <Badge variant="secondary" className="text-[9px] mt-0.5 font-medium">{item.type}</Badge>
                        </div>
                        {item.url.startsWith("http") ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-xs font-medium flex items-center gap-1 hover:underline shrink-0 ml-3"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Visit
                          </a>
                        ) : (
                          <button
                            onClick={() => {
                              onOpenChange(false);
                              setTimeout(() => {
                                const el = document.getElementById(item.url.replace("#", ""));
                                el?.scrollIntoView({ behavior: "smooth" });
                              }, 300);
                            }}
                            className="text-primary text-xs font-medium flex items-center gap-1 hover:underline shrink-0 ml-3 cursor-pointer"
                          >
                            <Activity className="w-3 h-3" />
                            View
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom trust strip */}
        <div className="px-6 py-4 border-t border-border/30 flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Heart className="h-3 w-3 text-primary" />
            NHS-Complementary
          </span>
          <span className="text-border">|</span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-3 w-3 text-primary" />
            NICE Aligned
          </span>
          <span className="text-border">|</span>
          <span className="inline-flex items-center gap-1.5">
            <Shield className="h-3 w-3 text-primary" />
            UK Verified
          </span>
        </div>
      </SheetContent>
    </Sheet>
  );
});

ResourceLibraryDrawer.displayName = "ResourceLibraryDrawer";
export default ResourceLibraryDrawer;
