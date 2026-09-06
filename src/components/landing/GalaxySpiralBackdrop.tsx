import { memo, useEffect, useRef } from "react";

/**
 * Interactive spiral-galaxy particle backdrop (canvas 2D — no Three.js).
 * White / soft-blue / amber arms around a bright core on deep black space.
 * Slow auto-rotate + pointer parallax / mild attract; touch-friendly.
 * prefers-reduced-motion → single static frame. Pauses when off-screen.
 * Lazy-inits after first paint (rAF + optional idle) to protect LCP.
 */

type Particle = {
  /** Base polar radius in normalised units (0–1 relative to min dimension). */
  r: number;
  /** Base angle (radians). */
  theta: number;
  /** Arm offset / thickness jitter. */
  arm: number;
  size: number;
  /** 0 white, 1 blue, 2 amber */
  tint: 0 | 1 | 2;
  bright: number;
  /** Soft z for parallax depth (0 near → 1 far). */
  z: number;
};

const TINTS: ReadonlyArray<readonly [number, number, number]> = [
  [255, 255, 255],
  [160, 200, 255],
  [255, 190, 110],
];

const ARM_COUNT = 3;
const GOLDEN = 2.399963229728653; // ~137.5° in radians

function particleBudget(): number {
  if (typeof window === "undefined") return 600;
  const w = window.innerWidth;
  const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
  if (w < 480 || coarse) return 220;
  if (w < 768) return 360;
  if (w < 1280) return 560;
  return 780;
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined"
    && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
}

function seedParticles(count: number): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / count;
    // Log-spiral density denser near core
    const r = Math.pow(t, 0.72) * 0.92 + Math.random() * 0.04;
    const arm = i % ARM_COUNT;
    const theta = r * 4.2 + arm * ((Math.PI * 2) / ARM_COUNT) + (Math.random() - 0.5) * 0.35;
    // Occasional field stars outside arms
    const field = Math.random() < 0.12;
    const tintRoll = Math.random();
    const tint: 0 | 1 | 2 =
      tintRoll < 0.55 ? 0 : tintRoll < 0.82 ? 1 : 2;
    out.push({
      r: field ? 0.35 + Math.random() * 0.7 : r,
      theta: field ? Math.random() * Math.PI * 2 : theta + i * GOLDEN * 0.0003,
      arm,
      size: field
        ? 0.4 + Math.random() * 0.9
        : 0.6 + Math.random() * (r < 0.2 ? 2.2 : 1.4),
      tint: field ? 0 : tint,
      bright: field ? 0.25 + Math.random() * 0.45 : 0.45 + Math.random() * 0.55,
      z: field ? 0.7 + Math.random() * 0.3 : Math.min(1, r * 0.85 + Math.random() * 0.2),
    });
  }
  return out;
}

const GalaxySpiralBackdrop = memo(function GalaxySpiralBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let cancelled = false;
    let raf = 0;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let rotation = 0;
    let visible = true;
    let started = false;
    let lastTs = 0;

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: false };
    const reduced = prefersReducedMotion();

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawCore = (cx: number, cy: number, scale: number) => {
      const coreR = Math.min(w, h) * 0.09 * scale;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 3.2);
      g.addColorStop(0, "rgba(255, 250, 240, 0.95)");
      g.addColorStop(0.18, "rgba(255, 220, 160, 0.55)");
      g.addColorStop(0.4, "rgba(120, 170, 255, 0.18)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 3.2, 0, Math.PI * 2);
      ctx.fill();
    };

    const paint = (staticOnly = false) => {
      // Deep space
      ctx.fillStyle = "#03050a";
      ctx.fillRect(0, 0, w, h);

      // Soft nebula wash
      const neb = ctx.createRadialGradient(
        w * 0.52, h * 0.48, 0,
        w * 0.52, h * 0.48, Math.min(w, h) * 0.7,
      );
      neb.addColorStop(0, "rgba(40, 60, 120, 0.22)");
      neb.addColorStop(0.45, "rgba(20, 30, 60, 0.1)");
      neb.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, w, h);

      const px = pointer.x - 0.5;
      const py = pointer.y - 0.5;
      const parallaxX = px * 28;
      const parallaxY = py * 18;
      const cx = w * 0.52 + parallaxX * 0.35;
      const cy = h * 0.48 + parallaxY * 0.35;
      const scale = Math.min(w, h) * 0.48;

      drawCore(cx, cy, 1);

      // Mild attract/repel around pointer in screen space
      const mx = pointer.x * w;
      const my = pointer.y * h;
      const attract = pointer.active && !staticOnly;

      for (const p of particles) {
        const ang = p.theta + rotation;
        let x = cx + Math.cos(ang) * p.r * scale;
        let y = cy + Math.sin(ang) * p.r * scale * 0.62; // slight inclination

        // Depth parallax
        x += parallaxX * (1 - p.z) * 0.8;
        y += parallaxY * (1 - p.z) * 0.8;

        if (attract) {
          const dx = mx - x;
          const dy = my - y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 160) {
            // Soft repel near tip, slight attract further out
            const force = dist < 55 ? -0.08 : 0.035;
            x += (dx / dist) * force * (160 - dist);
            y += (dy / dist) * force * (160 - dist);
          }
        }

        const [r, g, b] = TINTS[p.tint];
        const alpha = p.bright * (0.55 + (1 - p.z) * 0.45);
        const sz = p.size * (0.7 + (1 - p.z) * 0.6);

        if (sz > 1.4 && p.r < 0.35) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, sz * 3);
          glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.35})`);
          glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, sz * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, sz, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bright core highlight on top
      drawCore(cx, cy, 0.55);
    };

    const tick = (ts: number) => {
      if (cancelled) return;
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0.016;
      lastTs = ts;

      // Ease pointer toward target
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      rotation += dt * 0.085; // slow auto-rotate
      paint(false);
    };

    // Listen on window so parallax works over copy/CTAs without stealing clicks.
    const onPointer = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        pointer.active = false;
        pointer.tx = 0.5;
        pointer.ty = 0.5;
        return;
      }
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.tx = 0.5;
      pointer.ty = 0.5;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && started && !reduced && !raf) {
          lastTs = 0;
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    const onResize = () => {
      resize();
      if (reduced || !started) {
        if (started) paint(true);
      }
    };

    const boot = () => {
      if (cancelled || started) return;
      started = true;
      resize();
      particles = seedParticles(particleBudget());
      paint(true);

      if (reduced) return;

      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerdown", onPointer, { passive: true });
      window.addEventListener("pointerup", onLeave, { passive: true });
      window.addEventListener("blur", onLeave);
      window.addEventListener("resize", onResize, { passive: true });
      raf = requestAnimationFrame(tick);
    };

    // Lazy-init after first paint (+ idle when available) to protect LCP.
    let idleId = 0;
    let timeoutId = 0;
    const afterPaint = () => {
      if (cancelled) return;
      const wdw = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      if (typeof wdw.requestIdleCallback === "function") {
        idleId = wdw.requestIdleCallback(boot, { timeout: 1200 });
      } else {
        timeoutId = window.setTimeout(boot, 180);
      }
    };
    const paintRaf = requestAnimationFrame(afterPaint);

    return () => {
      cancelled = true;
      cancelAnimationFrame(paintRaf);
      cancelAnimationFrame(raf);
      if (idleId && typeof (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback === "function") {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("pointerup", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      data-testid="galaxy-spiral-backdrop"
    >
      {/* CSS fallback so first paint is deep space before canvas boots */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 52% 48%, #1a2744 0%, #080c18 42%, #03050a 100%)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
});

GalaxySpiralBackdrop.displayName = "GalaxySpiralBackdrop";
export default GalaxySpiralBackdrop;
