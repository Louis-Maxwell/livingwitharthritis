import { memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

const resourceCategories = [
  {
    category: "NHS & Medical",
    icon: Stethoscope,
    color: "bg-blue-500/10 text-blue-600",
    badgeColor: "bg-blue-600 text-white",
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
    color: "bg-emerald-500/10 text-emerald-600",
    badgeColor: "bg-emerald-600 text-white",
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
    color: "bg-violet-500/10 text-violet-600",
    badgeColor: "bg-violet-600 text-white",
    items: [
      { name: "Arthritis Action – Self-Management", url: "https://www.arthritisaction.org.uk/", type: "Charity" },
      { name: "NRAS – RA Support Groups", url: "https://nras.org.uk/get-support/", type: "Support" },
      { name: "Versus Arthritis", url: "https://www.versusarthritis.org/", type: "Charity" },
      { name: "Arthritis Care (Age UK)", url: "https://www.ageuk.org.uk/information-advice/health-wellbeing/conditions-illnesses/arthritis/", type: "Support" },
    ],
  },
  {
    category: "Exercise & Movement",
    icon: Dumbbell,
    color: "bg-orange-500/10 text-orange-600",
    badgeColor: "bg-orange-600 text-white",
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
    color: "bg-green-500/10 text-green-600",
    badgeColor: "bg-green-600 text-white",
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
    color: "bg-pink-500/10 text-pink-600",
    badgeColor: "bg-pink-600 text-white",
    items: [
      { name: "Mindfulness for Chronic Pain", url: "#wellbeing", type: "Guide" },
      { name: "Sleep Improvement Tips", url: "#wellbeing", type: "Tips" },
      { name: "Managing Stress with Arthritis", url: "#wellbeing", type: "Guide" },
    ],
  },
  {
    category: "Treatments & Medication",
    icon: Pill,
    color: "bg-cyan-500/10 text-cyan-600",
    badgeColor: "bg-cyan-600 text-white",
    items: [
      { name: "Turmeric & Curcumin Evidence", url: "#treatments", type: "Research" },
      { name: "Ginger for Joint Pain", url: "#treatments", type: "Research" },
      { name: "Pain Management Options", url: "#treatments", type: "Guide" },
      { name: "When to See a Rheumatologist", url: "#treatments", type: "Advice" },
    ],
  },
];

interface ResourceLibraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResourceLibraryModal = memo(({ open, onOpenChange }: ResourceLibraryModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto p-0">
      <DialogHeader className="sticky top-0 bg-background z-10 px-6 pt-6 pb-4 border-b border-border/30">
        <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          Resource Library
        </DialogTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Comprehensive UK resources for managing arthritis — NHS services, benefits, exercises, nutrition and more.
        </p>
      </DialogHeader>

      <div className="px-6 pb-6 pt-4 space-y-6">
        {resourceCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.category} className="group">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`rounded-lg p-2 ${cat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-base text-foreground">{cat.category}</h3>
                <Badge variant="secondary" className="text-[10px] font-medium">
                  {cat.items.length} resources
                </Badge>
              </div>

              {/* Table */}
              <div className="rounded-xl border border-border/50 overflow-hidden bg-card/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/40 text-left">
                      <th className="px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Resource</th>
                      <th className="px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell">Type</th>
                      <th className="px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider text-right">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.items.map((item, idx) => (
                      <tr
                        key={item.name}
                        className={`hover:bg-accent/50 transition-colors ${
                          idx < cat.items.length - 1 ? "border-b border-border/30" : ""
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-foreground">{item.name}</td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <Badge className={`${cat.badgeColor} text-[10px]`}>{item.type}</Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {item.url.startsWith("http") ? (
                            <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-xs gap-1">
                              <a href={item.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3" />
                                Visit
                              </a>
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs gap-1"
                              onClick={() => {
                                onOpenChange(false);
                                setTimeout(() => {
                                  const el = document.getElementById(item.url.replace("#", ""));
                                  el?.scrollIntoView({ behavior: "smooth" });
                                }, 300);
                              }}
                            >
                              <Activity className="h-3 w-3" />
                              View
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* Bottom trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border/30">
          <span className="inline-flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 text-primary" />
            NHS-Complementary
          </span>
          <span className="text-border">|</span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            NICE Aligned
          </span>
          <span className="text-border">|</span>
          <span className="inline-flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            UK Verified
          </span>
        </div>
      </div>
    </DialogContent>
  </Dialog>
));

ResourceLibraryModal.displayName = "ResourceLibraryModal";
export default ResourceLibraryModal;
