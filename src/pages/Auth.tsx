import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SeoHead from '@/components/SeoHead';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/chat');
      }
      setIsLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/chat');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4 py-16">
      <SeoHead
        title="Sign In or Create Account"
        description="Sign in to Living With Arthritis UK to access your free arthritis support tools, virtual physiotherapy and personalised resources."
        path="/auth"
        noindex
      />
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl relative z-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Left rail — value proposition copy */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block space-y-6 pr-4"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
            Living With Arthritis UK · Member access
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground leading-tight">
            Your free, private arthritis support account
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Creating a Living With Arthritis account unlocks the virtual
            physiotherapy assistant, your personalised exercise plan, diet
            guidance, and a private space to track flare-ups and progress
            over time. Everything is free for everyone in the UK, with no
            paywalls, no upsells, and no data ever sold to third parties.
          </p>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Evidence-based guidance</p>
                <p className="text-sm text-muted-foreground">
                  Built with HCPC-registered physiotherapists and aligned to
                  NICE clinical guidance for osteoarthritis, rheumatoid
                  arthritis, gout, lupus and fibromyalgia.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Private by design</p>
                <p className="text-sm text-muted-foreground">
                  Your chats, symptom notes and progress data stay encrypted
                  and visible only to you. We never share personal data with
                  advertisers, insurers or employers.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Saves your progress</p>
                <p className="text-sm text-muted-foreground">
                  Pick up exercise programmes, anti-inflammatory meal plans
                  and pacing tools across any device — phone, tablet or
                  desktop — without losing your place.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="font-semibold text-foreground">UK-based human support</p>
                <p className="text-sm text-muted-foreground">
                  Stuck or worried? Email, WhatsApp or call our London team
                  for a personal reply within two business days. You are
                  not alone.
                </p>
              </div>
            </li>
          </ul>
          <p className="text-xs text-muted-foreground border-t border-border/60 pt-4">
            Living With Arthritis UK is an independent not-for-profit
            information service. Educational content is reviewed by
            registered clinicians and is not a substitute for individual
            medical advice — always consult your GP or specialist for
            decisions about your care.
          </p>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-3xl font-bold text-foreground mb-2"
              >
                Welcome Back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground"
              >
                Sign in to access the virtual physiotherapy assistant
              </motion.p>
            </div>

            {/* Auth UI */}
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'hsl(var(--primary))',
                      brandAccent: 'hsl(var(--primary))',
                      brandButtonText: 'white',
                      defaultButtonBackground: 'hsl(var(--secondary))',
                      defaultButtonBackgroundHover: 'hsl(var(--secondary))',
                      inputBackground: 'hsl(var(--background))',
                      inputBorder: 'hsl(var(--border))',
                      inputBorderHover: 'hsl(var(--primary))',
                      inputBorderFocus: 'hsl(var(--primary))',
                      inputText: 'hsl(var(--foreground))',
                      inputLabelText: 'hsl(var(--foreground))',
                      inputPlaceholder: 'hsl(var(--muted-foreground))',
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '0.75rem',
                      buttonBorderRadius: '0.75rem',
                      inputBorderRadius: '0.75rem',
                    },
                    space: {
                      inputPadding: '0.75rem',
                      buttonPadding: '0.75rem',
                    },
                    fonts: {
                      bodyFontFamily: 'Inter, sans-serif',
                      buttonFontFamily: 'Inter, sans-serif',
                      inputFontFamily: 'Inter, sans-serif',
                      labelFontFamily: 'Inter, sans-serif',
                    },
                  },
                },
                className: {
                  container: 'auth-container',
                  button: 'auth-button',
                  input: 'auth-input',
                  label: 'auth-label',
                },
              }}
              providers={[]}
              redirectTo={`${window.location.origin}/chat`}
            />

            <p className="mt-6 text-xs text-muted-foreground text-center leading-relaxed">
              By continuing you agree to our{' '}
              <a href="/terms" className="underline hover:text-primary">terms</a>{' '}
              and{' '}
              <a href="/privacy" className="underline hover:text-primary">privacy policy</a>.
              Accounts are free and you can delete yours at any time from
              your profile settings.
            </p>

            {/* Back to home link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-center"
            >
              <button
                onClick={() => navigate('/')}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to home
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
