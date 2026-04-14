import { memo, useEffect, useRef } from "react";

/**
 * Subtle 3D floating orbs for the hero background.
 * Lightweight canvas overlay with soft glowing spheres that drift slowly.
 */
const Hero3DBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animId = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface Orb {
      x: number; y: number; z: number;
      radius: number; speed: number; phase: number;
      color: string; opacity: number;
    }

    const orbs: Orb[] = [];
    const colors = [
      "228, 0, 43",    // crimson
      "200, 160, 80",  // gold
      "180, 40, 60",   // deep rose
      "220, 180, 120", // warm amber
      "160, 30, 50",   // dark crimson
    ];

    for (let i = 0; i < 8; i++) {
      orbs.push({
        x: Math.random(),
        y: Math.random(),
        z: Math.random() * 200 + 100,
        radius: 60 + Math.random() * 120,
        speed: 0.2 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        color: colors[i % colors.length],
        opacity: 0.015 + Math.random() * 0.025,
      });
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loop = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.008;
      const t = timeRef.current;

      for (const orb of orbs) {
        const px = orb.x * w + Math.sin(t * orb.speed + orb.phase) * 80;
        const py = orb.y * h + Math.cos(t * orb.speed * 0.7 + orb.phase) * 50;
        const pulse = 1 + Math.sin(t * 2 + orb.phase) * 0.15;
        const r = orb.radius * pulse;

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, r);
        gradient.addColorStop(0, `rgba(${orb.color}, ${orb.opacity * 1.5})`);
        gradient.addColorStop(0.4, `rgba(${orb.color}, ${orb.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`);

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animId.current = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    animId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
});

Hero3DBackground.displayName = "Hero3DBackground";
export default Hero3DBackground;
