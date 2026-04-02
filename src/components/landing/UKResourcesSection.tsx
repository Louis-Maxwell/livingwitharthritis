import { memo } from "react";
import {
  Heart,
  Stethoscope,
  PoundSterling,
  Users,
  ExternalLink,
  MapPin,
  Shield,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const nhsResources = [
  {
    icon: Stethoscope,
    title: "NHS Arthritis Services",
    description:
      "Access free NHS physiotherapy, rheumatology referrals, and pain management clinics across the UK. Ask your GP for a referral.",
    links: [
      { label: "NHS Arthritis Overview", url: "https://www.nhs.uk/conditions/arthritis/" },
      { label: "Find NHS Services Near You", url: "https://www.nhs.uk/service-search" },
    ],
    badge: "NHS",
    badgeColor: "bg-blue-600 text-white",
  },
  {
    icon: PoundSterling,
    title: "PIP & Benefits Support",
    description:
      "If arthritis substantially affects your daily life, you may be eligible for Personal Independence Payment (PIP), Attendance Allowance, or Access to Work grants.",
    links: [
      { label: "Check PIP Eligibility", url: "https://www.gov.uk/pip" },
      { label: "Attendance Allowance", url: "https://www.gov.uk/attendance-allowance" },
      { label: "Citizens Advice – Disability Benefits", url: "https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/" },
    ],
    badge: "Benefits",
    badgeColor: "bg-emerald-600 text-white",
  },
  {
    icon: Users,
    title: "Local Support Groups",
    description:
      "Connect with other people living with arthritis near you. Support groups offer shared experiences, practical tips, and emotional encouragement.",
    links: [
      { label: "Arthritis Action – Self-Management", url: "https://www.arthritisaction.org.uk/" },
      { label: "NRAS – RA Support Groups", url: "https://nras.org.uk/get-support/" },
    ],
    badge: "Community",
    badgeColor: "bg-violet-600 text-white",
  },
  {
    icon: Shield,
    title: "Your Rights & Workplace",
    description:
      "Under the Equality Act 2010, arthritis can be classed as a disability. You're entitled to reasonable adjustments at work, including flexible hours and ergonomic equipment.",
    links: [
      { label: "Equality Act 2010 – GOV.UK", url: "https://www.gov.uk/guidance/equality-act-2010-guidance" },
      { label: "ACAS – Reasonable Adjustments", url: "https://www.acas.org.uk/reasonable-adjustments" },
    ],
    badge: "Legal Rights",
    badgeColor: "bg-primary text-white",
  },
];

const UKResourcesSection = memo(() => (
  <section
    id="uk-resources"
    className="py-12 md:py-16"
    aria-labelledby="uk-resources-heading"
  >
    {/* Header */}
    <div className="text-center mb-10">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
        <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
        <span className="text-sm font-semibold text-primary tracking-wide uppercase">
          UK Resources
        </span>
      </div>
      <h2
        id="uk-resources-heading"
        className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3"
      >
        Support for{" "}
        <span className="text-primary">10 Million UK Patients</span>
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
        From NHS services and benefit entitlements to local support groups —
        everything you need to manage arthritis in the United Kingdom.
      </p>
    </div>

    {/* Cards Grid */}
    <div className="grid gap-5 sm:grid-cols-2">
      {nhsResources.map((resource) => {
        const Icon = resource.icon;
        return (
          <Card key={resource.title} className="h-full border border-border/60 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2.5">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {resource.title}
                  </h3>
                </div>
                <Badge className={`${resource.badgeColor} text-xs font-medium shrink-0`}>
                  {resource.badge}
                </Badge>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {resource.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {resource.links.map((link) => (
                  <Button
                    key={link.label}
                    variant="outline"
                    size="sm"
                    asChild
                    className="text-xs h-8 gap-1.5"
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>

    {/* Bottom trust strip */}
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <Heart className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        NHS-Complementary Care
      </span>
      <span className="hidden sm:inline text-border">|</span>
      <span className="inline-flex items-center gap-1.5">
        <BookOpen className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        NICE Guidelines Aligned
      </span>
      <span className="hidden sm:inline text-border">|</span>
      <span className="inline-flex items-center gap-1.5">
        <Shield className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        Equality Act 2010 Aware
      </span>
    </div>
  </section>
));

UKResourcesSection.displayName = "UKResourcesSection";
export default UKResourcesSection;
