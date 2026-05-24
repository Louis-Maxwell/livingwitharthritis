import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: (() => {
        // Strict 2-colour palette: RED + WHITE only.
        // Every hard-coded Tailwind named-colour shade (e.g. bg-blue-500,
        // text-gray-700, bg-black) is remapped here so it cannot escape.
        const RED = "hsl(350 85% 42%)";
        const BLACK = RED;   // no black anywhere
        const WHITE = "hsl(0 0% 100%)";

        const shadeMap = (base: "red" | "black" | "white") => {
          const v = base === "red" ? RED : base === "black" ? BLACK : WHITE;
          return {
            50:  base === "red" ? "hsl(350 60% 97%)" : WHITE,
            100: base === "red" ? "hsl(350 60% 94%)" : WHITE,
            200: base === "red" ? "hsl(350 65% 88%)" : WHITE,
            300: base === "red" ? "hsl(350 70% 78%)" : WHITE,
            400: base === "red" ? "hsl(350 75% 60%)" : WHITE,
            500: v,
            600: base === "red" ? "hsl(350 90% 38%)" : RED,
            700: base === "red" ? "hsl(350 90% 32%)" : RED,
            800: base === "red" ? "hsl(350 90% 26%)" : RED,
            900: base === "red" ? "hsl(350 90% 20%)" : RED,
            950: RED,
            DEFAULT: v,
          };

        };
        const red = shadeMap("red");
        const black = shadeMap("red");      // black aliased to red
        const warmRed = red;
        const coolBlack = red;              // all "neutral" tones → red

        return {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
          secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
          destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
          muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
          accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
          popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
          card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
          gold: { DEFAULT: "hsl(var(--gold))", foreground: "hsl(var(--gold-foreground))", muted: "hsl(var(--gold-muted))" },
          amber: warmRed,
          emerald: coolBlack,
          sky: coolBlack,
          violet: warmRed,
          coral: warmRed,
          teal: coolBlack,
          navy: { DEFAULT: "hsl(var(--navy))", foreground: "hsl(var(--navy-foreground))" },
          "tint-blue": "hsl(var(--tint-blue))",
          "tint-green": "hsl(var(--tint-green))",
          "tint-amber": "hsl(var(--tint-amber))",
          "tint-rose": "hsl(var(--tint-rose))",
          "tint-violet": "hsl(var(--tint-violet))",
          "tint-cyan": "hsl(var(--tint-cyan))",
          "tint-peach": "hsl(var(--tint-peach))",
          "tint-mint": "hsl(var(--tint-mint))",
          "tint-lavender": "hsl(var(--tint-lavender))",
          "tint-coral": "hsl(var(--tint-coral))",
          sidebar: {
            DEFAULT: "hsl(var(--sidebar-background))",
            foreground: "hsl(var(--sidebar-foreground))",
            primary: "hsl(var(--sidebar-primary))",
            "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
            accent: "hsl(var(--sidebar-accent))",
            "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
            border: "hsl(var(--sidebar-border))",
            ring: "hsl(var(--sidebar-ring))",
          },
          // Override Tailwind's default named palettes so any leftover
          // bg-blue-500 / text-green-600 etc. resolves to red, black or white.
          red: warmRed,
          rose: warmRed,
          pink: warmRed,
          orange: warmRed,
          yellow: warmRed,
          fuchsia: warmRed,
          blue: coolBlack,
          green: coolBlack,
          lime: coolBlack,
          indigo: coolBlack,
          purple: coolBlack,
          cyan: coolBlack,
          slate: coolBlack,
          zinc: coolBlack,
          neutral: coolBlack,
          stone: coolBlack,
          gray: coolBlack,
          white: WHITE,
          black: BLACK,
          transparent: "transparent",
          current: "currentColor",
        };
      })(),
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(16px)", filter: "blur(4px)" },
          to: { opacity: "1", transform: "translateY(0)", filter: "blur(0px)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-scale": {
          from: { opacity: "0", transform: "scale(0.95) translateY(12px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-6px) rotate(1deg)" },
          "66%": { transform: "translateY(-3px) rotate(-1deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in-scale": "fade-in-scale 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up": "slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        float: "float 6s ease-in-out infinite",
        "float-gentle": "float-gentle 8s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        "wiggle": "wiggle 1s ease-in-out",
        "scale-in": "scale-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        large: "var(--shadow-large)",
        xl: "var(--shadow-xl)",
        glass: "var(--shadow-glass)",
        primary: "var(--shadow-primary)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;