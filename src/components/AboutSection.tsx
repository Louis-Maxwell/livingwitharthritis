import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Users, Briefcase, Database, ArrowRight, CheckCircle2 } from "lucide-react";

const AboutSection = () => {
  const statistics = [
    { number: "60M+", label: "Adults diagnosed globally", icon: Users },
    { number: "1 in 4", label: "Adults affected by arthritis", icon: Activity },
    { number: "52%", label: "Working age (18-64)", icon: Briefcase },
    { number: "100+", label: "Related conditions", icon: Database },
  ];

  const features = [
    "Personalized care recommendations",
    "Expert medical guidance",
    "24/7 community support",
    "Latest research updates",
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-gradient-medical">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Understanding Arthritis
          </span>
          <h2 className="font-display text-display-md lg:text-display-lg text-foreground mb-6">
            Knowledge is the First Step to{' '}
            <span className="text-primary">Better Living</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Arthritis encompasses over 100 different conditions. Understanding your specific type 
            empowers you to make informed decisions about your health and wellbeing.
          </p>
        </div>

        {/* Statistics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20">
          {statistics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="group bg-card hover:shadow-medium transition-all duration-500 border-border/50 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 lg:p-8 text-center relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                  <Icon className="w-8 h-8 mx-auto mb-4 text-primary opacity-80" />
                  <div className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-display-sm text-foreground mb-4">
                We're Here to Support Your Journey
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                For over a decade, we've been the trusted partner for millions navigating 
                life with arthritis. Our comprehensive approach combines medical expertise, 
                community support, and cutting-edge research.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 shadow-soft hover:shadow-medium transition-all duration-300 group"
            >
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-premium rounded-3xl opacity-10 blur-3xl" />
            <Card className="relative bg-card border-border/50 shadow-elegant overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <blockquote className="font-display text-2xl lg:text-3xl text-foreground italic mb-6 leading-relaxed">
                      "You are not alone in your journey. Together, we can overcome any challenge."
                    </blockquote>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20" />
                      <div className="text-left">
                        <div className="font-semibold text-foreground">Dr. Sarah Mitchell</div>
                        <div className="text-sm text-muted-foreground">Chief Medical Officer</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;