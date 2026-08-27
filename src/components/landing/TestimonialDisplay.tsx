import { memo, useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  condition?: string;
  type: 'patient' | 'donor';
  quote: string;
  context?: string;
  image_url?: string;
  display_order: number;
}

const TestimonialDisplay = memo(() => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Supabase client removed - functionality to be restored later
        setTestimonials([]);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="h-64 bg-muted/30 rounded-xl animate-pulse" />
        </div>
      </section>
    );
  }

  if (!testimonials.length) return null;

  const patientTestimonials = testimonials.filter(t => t.type === 'patient');
  const donorTestimonials = testimonials.filter(t => t.type === 'donor');

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-16 md:py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
    >
      <div className="container mx-auto px-6 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mb-5">
            <Quote className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3"
          >
            Why people trust Living with Arthritis
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Real stories from people who've changed their lives with our guidance—and supporters
            who believe in building lasting solutions for everyone living with arthritis.
          </p>
        </div>

        {/* Patient Testimonials */}
        {patientTestimonials.length > 0 && (
          <div className="mb-20">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-8 text-center">
              From people living with arthritis
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patientTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="rounded-2xl bg-card border border-border p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="text-foreground/90 leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    {testimonial.condition && (
                      <p className="text-sm text-foreground/60">{testimonial.condition}</p>
                    )}
                    {testimonial.context && (
                      <p className="text-xs text-foreground/50 mt-1">{testimonial.context}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Donor Testimonials */}
        {donorTestimonials.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-8 text-center">
              From our supporters
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {donorTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="rounded-2xl bg-primary/5 border border-primary/20 p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-emerald-400 text-emerald-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="text-foreground/90 leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t border-primary/20 pt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    {testimonial.context && (
                      <p className="text-sm text-foreground/60">{testimonial.context}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

TestimonialDisplay.displayName = "TestimonialDisplay";
export default TestimonialDisplay;
