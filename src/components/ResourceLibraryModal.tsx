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
      { name: "NHS Arthritis Overview", url: "https://www.nhs.uk/conditions/arthritis/", type: "Guide", desc: "Comprehensive NHS guide covering symptoms, diagnosis and treatment" },
      { name: "Find NHS Services Near You", url: "https://www.nhs.uk/service-search", type: "Tool", desc: "Locate physiotherapy, rheumatology and pain clinics in your area" },
      { name: "NICE Osteoarthritis Guidelines (CG177)", url: "https://www.nice.org.uk/guidance/cg177", type: "Guideline", desc: "Evidence-based clinical recommendations for managing OA" },
      { name: "NICE Rheumatoid Arthritis (NG100)", url: "https://www.nice.org.uk/guidance/ng100", type: "Guideline", desc: "Best-practice pathways for RA diagnosis and treatment" },
      { name: "British Society for Rheumatology", url: "https://www.rheumatology.org.uk/", type: "Professional", desc: "UK specialist body for rheumatology education and guidelines" },
    ],
  },
  {
    category: "Benefits & Legal Rights",
    icon: PoundSterling,
    color: "bg-emerald-500/10 text-emerald-600",
    badgeColor: "bg-emerald-600 text-white",
    items: [
      { name: "Personal Independence Payment (PIP)", url: "https://www.gov.uk/pip", type: "Gov.uk", desc: "Check eligibility and apply for disability living support" },
      { name: "Attendance Allowance", url: "https://www.gov.uk/attendance-allowance", type: "Gov.uk", desc: "Financial help for over-65s with care needs due to disability" },
      { name: "Citizens Advice – Disability Benefits", url: "https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/", type: "Advice", desc: "Free, independent guidance on claiming disability benefits" },
      { name: "Equality Act 2010 – Your Rights", url: "https://www.gov.uk/guidance/equality-act-2010-guidance", type: "Legal", desc: "Legal protections against disability discrimination at work" },
      { name: "ACAS – Reasonable Adjustments", url: "https://www.acas.org.uk/reasonable-adjustments", type: "Workplace", desc: "Employer obligations to accommodate your condition at work" },
      { name: "Blue Badge Scheme", url: "https://www.gov.uk/apply-blue-badge", type: "Gov.uk", desc: "Apply for disabled parking permits for mobility difficulties" },
    ],
  },
  {
    category: "Charities & Support Groups",
    icon: Users,
    color: "bg-violet-500/10 text-violet-600",
    badgeColor: "bg-violet-600 text-white",
    items: [
      { name: "Versus Arthritis", url: "https://www.versusarthritis.org/", type: "Charity", desc: "UK's largest arthritis charity — research, support and campaigns" },
      { name: "Arthritis Action – Self-Management", url: "https://www.arthritisaction.org.uk/", type: "Charity", desc: "Practical self-management support and local group meetings" },
      { name: "NRAS – RA Support Network", url: "https://nras.org.uk/get-support/", type: "Support", desc: "Helpline, peer support groups and RA-specific resources" },
      { name: "National Ankylosing Spondylitis Society", url: "https://nass.co.uk/", type: "Charity", desc: "Specialist support for AS and axial spondyloarthritis" },
      { name: "Psoriasis & Psoriatic Arthritis Alliance", url: "https://www.papaa.org/", type: "Support", desc: "Information and community for PsA patients and families" },
    ],
  },
  {
    category: "Exercise & Movement",
    icon: Dumbbell,
    color: "bg-orange-500/10 text-orange-600",
    badgeColor: "bg-orange-600 text-white",
    items: [
      { name: "Low-Impact Exercises for OA", url: "#exercises", type: "Guide", desc: "Gentle joint-friendly exercises for osteoarthritis pain relief" },
      { name: "Swimming & Water Aerobics", url: "#exercises", type: "Exercise", desc: "Buoyancy-supported movement that's easy on joints" },
      { name: "Yoga & Tai Chi for Joint Health", url: "#exercises", type: "Exercise", desc: "Mind-body practices proven to reduce stiffness and improve balance" },
      { name: "Strength Training for Arthritis", url: "#exercises", type: "Guide", desc: "Build muscle support around affected joints safely" },
      { name: "NHS Couch to 5K (Adapted)", url: "https://www.nhs.uk/live-well/exercise/running-and-aerobic-exercises/get-running-with-couch-to-5k/", type: "Programme", desc: "Gradual walking-to-running programme adaptable for arthritis" },
    ],
  },
  {
    category: "Nutrition & Anti-Inflammatory Diet",
    icon: Apple,
    color: "bg-green-500/10 text-green-600",
    badgeColor: "bg-green-600 text-white",
    items: [
      { name: "Mediterranean Diet for Arthritis", url: "#nutrition", type: "Diet", desc: "The gold-standard anti-inflammatory eating pattern for joint health" },
      { name: "Anti-Inflammatory Foods Guide", url: "#nutrition", type: "Guide", desc: "Key foods that reduce inflammation: oily fish, berries, olive oil, nuts" },
      { name: "Omega-3 Rich Recipes", url: "#nutrition", type: "Recipe", desc: "Delicious salmon, mackerel and sardine recipes for joint support" },
      { name: "Supplements: Glucosamine, Collagen & Turmeric", url: "#nutrition", type: "Guide", desc: "Evidence review of popular joint supplements and what works" },
      { name: "Foods to Avoid with Arthritis", url: "#nutrition", type: "Guide", desc: "Pro-inflammatory foods that may worsen joint pain and swelling" },
    ],
  },
  {
    category: "Mental Health & Wellbeing",
    icon: Brain,
    color: "bg-pink-500/10 text-pink-600",
    badgeColor: "bg-pink-600 text-white",
    items: [
      { name: "Mindfulness for Chronic Pain", url: "#wellbeing", type: "Guide", desc: "Evidence-based mindfulness techniques to manage pain perception" },
      { name: "Sleep Improvement for Arthritis", url: "#wellbeing", type: "Tips", desc: "Sleep hygiene strategies when pain disrupts your rest" },
      { name: "Managing Anxiety & Depression", url: "#wellbeing", type: "Guide", desc: "CBT-based tools for the emotional impact of chronic conditions" },
      { name: "NHS Talking Therapies", url: "https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/nhs-talking-therapies/", type: "NHS", desc: "Free NHS psychological support — self-refer without a GP" },
    ],
  },
  {
    category: "Treatments & Medication",
    icon: Pill,
    color: "bg-cyan-500/10 text-cyan-600",
    badgeColor: "bg-cyan-600 text-white",
    items: [
      { name: "Turmeric & Curcumin Evidence", url: "#treatments", type: "Research", desc: "Systematic review of curcumin's anti-inflammatory effects on joints" },
      { name: "Ginger for Joint Pain Relief", url: "#treatments", type: "Research", desc: "Clinical evidence on gingerols reducing OA pain and stiffness" },
      { name: "Pain Management Options", url: "#treatments", type: "Guide", desc: "From paracetamol to biologics — understanding your treatment ladder" },
      { name: "When to See a Rheumatologist", url: "#treatments", type: "Advice", desc: "Red flags and referral criteria for specialist assessment" },
      { name: "DMARDs & Biologic Therapies", url: "#treatments", type: "Guide", desc: "How disease-modifying drugs work to slow inflammatory arthritis" },
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
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">{item.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                        </td>
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
