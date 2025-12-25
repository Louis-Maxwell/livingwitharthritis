import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const DonationTiersSection = () => {
  const tiers = [
    {
      amount: "£25",
      title: "Supporter",
      description: "Help us provide essential resources",
      benefits: [
        "Thank you recognition",
        "Monthly newsletter",
        "Community updates",
      ],
      featured: false,
    },
    {
      amount: "£100",
      title: "Champion",
      description: "Make a meaningful impact",
      benefits: [
        "All Supporter benefits",
        "Social media recognition",
        "Exclusive webinar access",
        "Supporter certificate",
      ],
      featured: true,
    },
    {
      amount: "£500",
      title: "Patron",
      description: "Become a cornerstone of our mission",
      benefits: [
        "All Champion benefits",
        "Logo on our website",
        "VIP event invitations",
        "Personal thank you from CEO",
        "Annual impact report",
      ],
      featured: false,
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Support Our Mission
          </span>
          <h2 className="font-display text-display-md lg:text-display-lg text-foreground mb-6">
            Choose Your{' '}
            <span className="text-primary">Impact Level</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your generosity directly supports research, patient care, and community programs. 
            Every donation makes a difference.
          </p>
        </div>

        {/* Tiers grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden transition-all duration-500 animate-fade-in ${
                tier.featured 
                  ? 'bg-gradient-to-br from-primary to-primary/90 border-primary shadow-elegant scale-105 z-10' 
                  : 'bg-card border-border/50 hover:shadow-medium hover:-translate-y-1'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {tier.featured && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardContent className={`p-8 ${tier.featured ? 'text-primary-foreground' : ''}`}>
                {/* Amount */}
                <div className="mb-6">
                  <div className={`text-4xl lg:text-5xl font-display font-bold ${tier.featured ? 'text-white' : 'text-foreground'}`}>
                    {tier.amount}
                  </div>
                  <div className={`text-sm ${tier.featured ? 'text-white/70' : 'text-muted-foreground'}`}>
                    one-time donation
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className={`font-display text-xl font-semibold mb-2 ${tier.featured ? 'text-white' : 'text-foreground'}`}>
                  {tier.title}
                </h3>
                <p className={`text-sm mb-6 ${tier.featured ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {tier.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        tier.featured ? 'bg-white/20' : 'bg-primary/10'
                      }`}>
                        <Check className={`w-3 h-3 ${tier.featured ? 'text-white' : 'text-primary'}`} />
                      </div>
                      <span className={`text-sm ${tier.featured ? 'text-white/90' : 'text-foreground'}`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  size="lg"
                  className={`w-full font-medium transition-all duration-300 group ${
                    tier.featured 
                      ? 'bg-white text-primary hover:bg-white/90 shadow-medium' 
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  Donate {tier.amount}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom donation note */}
        <p className="text-center text-muted-foreground mt-12">
          Want to give a different amount?{' '}
          <a href="#" className="text-primary font-medium hover:underline">
            Make a custom donation
          </a>
        </p>
      </div>
    </section>
  );
};

export default DonationTiersSection;