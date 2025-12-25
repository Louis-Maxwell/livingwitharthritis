import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Users, Gift, Calendar, Star } from "lucide-react";

const involvementOptions = [
  { icon: Heart, label: "Make a Donation", description: "Support our mission directly" },
  { icon: Users, label: "Volunteer With Us", description: "Share your time and skills" },
  { icon: Gift, label: "Corporate Partnerships", description: "Partner for greater impact" },
  { icon: Calendar, label: "Fundraising Events", description: "Join our community events" },
  { icon: Star, label: "Legacy Giving", description: "Leave a lasting impact" },
];

const FundraisingSection = () => {
  return (
    <section id="involved" className="py-24 lg:py-32 bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                Get Involved
              </span>
              <h2 className="font-display text-display-md lg:text-display-lg text-white mb-6">
                Together, We Can Make a{' '}
                <span className="text-accent">Difference</span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Every contribution helps us support millions living with arthritis. 
                Join our community of changemakers and help us advance research, 
                education, and patient care.
              </p>
            </div>

            {/* Options list */}
            <div className="space-y-4">
              {involvementOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div 
                    key={index}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 cursor-pointer transition-all duration-300 animate-fade-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white group-hover:text-primary transition-colors">
                        {option.label}
                      </div>
                      <div className="text-sm text-white/60">{option.description}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Featured card */}
          <div className="relative">
            <Card className="bg-gradient-to-br from-primary to-primary/80 border-0 shadow-elegant overflow-hidden">
              <CardContent className="p-8 lg:p-10">
                <div className="inline-block px-4 py-1 mb-6 text-xs font-semibold tracking-wider uppercase bg-white/20 text-white rounded-full">
                  Featured Program
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
                  Young Adult Hub
                </h3>
                <p className="text-white/80 leading-relaxed mb-8">
                  A dedicated space for young adults aged 18-35 living with arthritis. 
                  Connect, share, and grow with peers who understand your unique challenges.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-display font-bold text-white">5,000+</div>
                    <div className="text-xs text-white/70">Active Members</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-display font-bold text-white">200+</div>
                    <div className="text-xs text-white/70">Monthly Events</div>
                  </div>
                </div>

                <Button 
                  size="lg"
                  className="w-full bg-white text-primary hover:bg-white/90 font-semibold shadow-medium hover:shadow-elegant transition-all duration-300 group"
                >
                  Join the Hub
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Decorative floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-2xl rotate-12 opacity-20" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundraisingSection;