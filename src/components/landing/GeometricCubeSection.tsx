import { memo, useEffect, useRef, useCallback } from "react";

/**
 * Scroll-reactive isometric cube cluster — rotates and transforms
 * as the user scrolls through the page. Inspired by Aevolve's
 * suspended geometric aesthetic.
 */
const GeometricCubeSection = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const animId = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const t = scrollProgress.current;

    // Subtle radial glow
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.55);
    grad.addColorStop(0, "rgba(228,0,43,0.03)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const cos30 = Math.cos(Math.PI / 6);
    const sin30 = Math.sin(Math.PI / 6);
    const cubeSize = Math.min(w, h) * 0.065;

    function project(x: number, y: number, z: number): [number, number] {
      return [(x - z) * cos30, -(x + z) * sin30 - y];
    }

    function drawCube(cx: number, cy: number, s: number, alpha: number, highlight: number) {
      if (!ctx) return;
      const verts = [
        project(0, 0, 0), project(s, 0, 0), project(s, 0, s), project(0, 0, s),
        project(0, -s, 0), project(s, -s, 0), project(s, -s, s), project(0, -s, s),
      ];

      const r = Math.round(20 + highlight * 40);
      const g = Math.round(20 + highlight * 5);
      const b = Math.round(20 + highlight * 8);

      const faces = [
        { indices: [4, 5, 6, 7], color: `rgba(${r},${g},${b},${alpha * 0.95})` },
        { indices: [0, 1, 5, 4], color: `rgba(${r + 15},${g + 10},${b + 10},${alpha * 0.85})` },
        { indices: [0, 3, 7, 4], color: `rgba(${r + 8},${g + 5},${b + 5},${alpha * 0.9})` },
        { indices: [1, 2, 6, 5], color: `rgba(${r - 5},${g - 5},${b - 5},${alpha * 0.8})` },
        { indices: [3, 2, 6, 7], color: `rgba(${r + 2},${g},${b},${alpha * 0.85})` },
      ];

      for (const face of faces) {
        ctx.beginPath();
        face.indices.forEach((i, idx) => {
          const [px, py] = verts[i];
          if (idx === 0) ctx.moveTo(cx + px, cy + py);
          else ctx.lineTo(cx + px, cy + py);
        });
        ctx.closePath();
        ctx.fillStyle = face.color;
        ctx.fill();
        ctx.strokeStyle = `rgba(200,200,200,${alpha * 0.25})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }

    // Cube grid layout
    const cubes = [
      { gx: 0, gy: 0, gz: 0 }, { gx: 1, gy: 0, gz: 0 }, { gx: 2, gy: 0, gz: 0 },
      { gx: 0, gy: 0, gz: 1 }, { gx: 1, gy: 0, gz: 1 }, { gx: 2, gy: 0, gz: 1 },
      { gx: 0, gy: 0, gz: 2 }, { gx: 1, gy: 0, gz: 2 }, { gx: 2, gy: 0, gz: 2 },
      { gx: 0, gy: 1, gz: 0 }, { gx: 1, gy: 1, gz: 0 }, { gx: 2, gy: 1, gz: 0 },
      { gx: 0, gy: 1, gz: 1 }, { gx: 1, gy: 1, gz: 1 }, { gx: 2, gy: 1, gz: 1 },
      { gx: 0, gy: 2, gz: 0 }, { gx: 1, gy: 2, gz: 0 }, { gx: 0, gy: 2, gz: 1 },
      { gx: 1, gy: 2, gz: 1 }, { gx: 2, gy: 2, gz: 0 },
      { gx: 0, gy: 3, gz: 0 }, { gx: 1, gy: 3, gz: 0 },
    ];

    // Scroll-driven rotation
    const rotAngle = t * Math.PI * 0.8;
    const floatY = Math.sin(t * Math.PI * 2) * 12;
    const explodeFactor = Math.sin(t * Math.PI) * 0.15;

    const centerX = w / 2;
    const centerY = h / 2 + floatY;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotAngle);

    // Suspension wire
    ctx.beginPath();
    ctx.moveTo(0, -h / 2 - floatY - 80);
    ctx.lineTo(0, -cubeSize * 4);
    ctx.strokeStyle = "rgba(150,150,150,0.12)";
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Sort for painter's algorithm
    const sorted = [...cubes].sort((a, b) => (a.gx + a.gz - a.gy) - (b.gx + b.gz - b.gy));

    for (const cube of sorted) {
      const explode = explodeFactor * cubeSize;
      const ox = (cube.gx - 1) * cubeSize * (1 + explodeFactor * 0.4) + (cube.gx - 1) * explode;
      const oy = cube.gy * cubeSize * (1 + explodeFactor * 0.4) + cube.gy * explode;
      const oz = (cube.gz - 1) * cubeSize * (1 + explodeFactor * 0.4) + (cube.gz - 1) * explode;

      // Subtle per-cube micro-float
      const phase = cube.gx * 0.7 + cube.gz * 1.1 + cube.gy * 0.9;
      const microX = Math.sin(t * 6 + phase) * 1.5;
      const microY = Math.cos(t * 8 + phase) * 1;

      const [px, py] = project(ox + microX, -oy + microY, oz);
      const dist = Math.sqrt(cube.gx ** 2 + cube.gz ** 2 + cube.gy ** 2);
      const alpha = Math.max(0.55, 1 - dist * 0.06);
      const highlight = Math.max(0, Math.sin(t * Math.PI * 3 + phase) * 0.5);

      drawCube(px, py, cubeSize * 0.9, alpha, highlight);
    }

    ctx.restore();

    // Ambient particles that drift with scroll
    for (let i = 0; i < 8; i++) {
      const px = w * 0.15 + Math.sin(t * 2 + i * 2.1) * w * 0.35;
      const py = h * 0.2 + Math.cos(t * 2.5 + i * 1.7) * h * 0.3;
      const r = 1.2 + Math.sin(t * 3 + i) * 0.5;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(228,0,43,${0.06 + Math.sin(t * 4 + i) * 0.03})`;
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when section enters bottom, 1 when it exits top
        const raw = 1 - (rect.bottom / (vh + rect.height));
        scrollProgress.current = Math.max(0, Math.min(1, raw));
        draw();
        ticking = false;
      });
    };

    // Also run idle animation loop for smoothness
    let idleT = 0;
    const idleLoop = () => {
      idleT += 0.002;
      // Blend scroll progress with subtle idle motion
      scrollProgress.current = Math.max(0, Math.min(1, scrollProgress.current)) + Math.sin(idleT) * 0.001;
      draw();
      animId.current = requestAnimationFrame(idleLoop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", draw);
    animId.current = requestAnimationFrame(idleLoop);
    onScroll();

    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", draw);
    };
  }, [draw]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-16 sm:py-24"
      aria-label="Geometric visual"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Canvas graphic */}
          <div className="relative aspect-square max-w-[520px] mx-auto lg:mx-0 w-full">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              aria-hidden="true"
              style={{ imageRendering: "auto" }}
            />
            <div
              className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-[0.06]"
              style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
            />
          </div>

          {/* Text content */}
          <div className="text-center lg:text-left space-y-6">
            <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-primary/70">
              Built Different
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-[1.1]">
              Structured Support,{" "}
              <span className="text-primary">Piece by Piece</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              Like interlocking building blocks, our services connect
              physiotherapy, nutrition, exercise, and community into one
              cohesive support system — designed to help you rebuild
              strength and confidence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              {[
                { label: "Physiotherapy", opacity: "" },
                { label: "Nutrition", opacity: "/70" },
                { label: "Exercise", opacity: "/50" },
                { label: "Community", opacity: "/30" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className={`w-2 h-2 rounded-full bg-primary${item.opacity}`} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

GeometricCubeSection.displayName = "GeometricCubeSection";
export default GeometricCubeSection;
