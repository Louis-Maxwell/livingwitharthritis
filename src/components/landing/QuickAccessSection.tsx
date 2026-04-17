import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Dumbbell, Utensils, Users, MessageCircle, Stethoscope, ArrowRight, Activity
} from "lucide-react";

const GUIDE_DEFS = [
  { key: "ukArthritis", href: "/guides/uk-arthritis" },
  { key: "nhs", href: "/guides/nhs-services" },
  { key: "diet", href: "/guides/diet" },
  { key: "exercise", href: "/guides/exercise" },
  { key: "benefits", href: "/guides/benefits-pip" },
] as const;

const HUB_DEFS = [
  { id: "exercises", key: "exercises", href: "/exercises", icon: Dumbbell },
  { id: "diet", key: "diet", href: "/diet", icon: Utensils },
  { id: "community", key: "community", href: "/community", icon: Users },
  { id: "chat", key: "chat", href: "/chat", icon: MessageCircle },
  { id: "conditions", key: "conditions", href: "/conditions/osteoarthritis", icon: Stethoscope },
  { id: "health-tools", key: "healthTools", href: "/health-tools", icon: Activity },
] as const;

export default function QuickAccessSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-24 lg:py-32 relative" aria-labelledby="quick-access-heading">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 pattern-dots pointer-events-none opacity-50" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl relative">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="section-label text-primary/60 mb-5 block">{t("quickAccess.label")}</span>
          <h2
            id="quick-access-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.06] mb-6"
          >
            {t("quickAccess.headingLead")}{" "}
            <span className="text-primary italic">{t("quickAccess.headingAccent")}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t("quickAccess.description")}
          </p>
        </div>

        {/* Hub cards — enhanced with numbered corners and richer hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HUB_DEFS.map((hub, i) => {
            const Icon = hub.icon;
            const title = t(`quickAccess.hubs.${hub.key}.title`);
            const description = t(`quickAccess.hubs.${hub.key}.description`);
            return (
              <button
                key={hub.id}
                onClick={() => navigate(hub.href)}
                aria-label={`${t("quickAccess.goTo")} ${title}`}
                className="premium-card group text-start p-9 lg:p-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary relative overflow-hidden"
              >
                {/* Subtle corner number */}
                <span className="absolute top-4 end-5 text-[4rem] font-display font-bold text-primary/[0.03] leading-none select-none pointer-events-none group-hover:text-primary/[0.06] transition-colors duration-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/[0.05] flex items-center justify-center mb-7 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-[-3deg] transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors duration-500">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.8] mb-6">{description}</p>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary tracking-[0.15em] uppercase opacity-60 group-hover:opacity-100 group-hover:gap-2.5 transition-all duration-300">
                    {t("quickAccess.explore")}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Pillar guide links */}
        <div className="mt-16 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50 mb-5">{t("quickAccess.guidesLabel")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {GUIDE_DEFS.map((g) => (
              <Link
                key={g.href}
                to={g.href}
                className="feature-pill hover:scale-[1.03] transition-transform duration-200"
              >
                {t(`quickAccess.guides.${g.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
