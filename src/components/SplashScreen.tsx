import { useState, useEffect, memo } from "react";
import "./SplashScreen.css";

/* Inline LogoMark to avoid importing Header */
const SplashLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="28" cy="7.5" r="5" fill="hsl(var(--primary))" />
    <path d="M28 13 C28 18, 26 22, 22 26 C18 30, 15 36, 13 46 L19 46 C20 40, 22 35, 24 31 Q26 27, 28 27 Q30 27, 32 31 C34 35, 36 40, 37 46 L43 46 C41 36, 38 30, 34 26 C30 22, 28 18, 28 13Z" fill="hsl(var(--primary))" />
    <path d="M20.5 36 Q28 33, 35.5 36" stroke="hsl(var(--background))" strokeWidth="2.8" strokeLinecap="round" fill="none" />
    <path d="M26 17 C22 15, 16 12, 10 5" stroke="hsl(var(--primary))" strokeWidth="3.2" strokeLinecap="round" fill="none" />
    <path d="M30 17 C34 15, 40 12, 46 5" stroke="hsl(var(--primary))" strokeWidth="3.2" strokeLinecap="round" fill="none" />
    <circle cx="9" cy="4" r="2" fill="hsl(var(--primary))" opacity="0.7" />
    <circle cx="47" cy="4" r="2" fill="hsl(var(--primary))" opacity="0.7" />
  </svg>
);

const SplashScreen = memo(({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit">("loading");

  useEffect(() => {
    // Animate progress bar from 0 → 100 over ~1.8s
    const start = performance.now();
    const duration = 1800;
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(eased * 100);

      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Brief pause at 100%, then exit
        setTimeout(() => setPhase("exit"), 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (phase === "exit") {
      const t = setTimeout(onComplete, 600); // match exit animation duration
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-all duration-600 ${
        phase === "exit" ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
      style={{ transitionDuration: "600ms" }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[100px] pointer-events-none splash-orb-1" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[400px] h-[400px] rounded-full bg-secondary/[0.03] blur-[80px] pointer-events-none splash-orb-2" />

      {/* Logo + text */}
      <div className="flex flex-col items-center gap-6 splash-entrance">
        {/* Animated logo */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-150 splash-pulse" />
          <SplashLogo className="w-20 h-20 sm:w-24 sm:h-24 relative z-10 splash-logo" />
        </div>

        {/* Brand name */}
        <div className="text-center splash-text">
          <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight leading-tight">
            <span className="text-foreground">LIVING WITH</span>
            <br />
            <span className="text-primary">ARTHRITIS</span>
          </h1>
          <p className="text-[10px] sm:text-xs text-muted-foreground tracking-[0.3em] mt-1.5 uppercase font-medium">
            United Kingdom
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 sm:w-56 mt-4">
          <div className="h-[3px] w-full bg-border/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-primary to-primary/60 rounded-full transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground/60 text-center mt-3 font-medium tracking-wider">
            {progress < 100 ? "Loading experience..." : "Welcome"}
          </p>
        </div>
      </div>
    </div>
  );
});

SplashScreen.displayName = "SplashScreen";
export default SplashScreen;
