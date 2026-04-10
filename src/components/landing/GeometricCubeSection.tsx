import { memo, useEffect, useRef } from "react";

/**
 * Animated geometric cube graphic — pure CSS/canvas, no heavy deps.
 * Inspired by suspended dark geometric cube clusters.
 */
const GeometricCubeSection = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w: number, h: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Cube vertices for an isometric cube
    const cubeSize = 38;
    const cos30 = Math.cos(Math.PI / 6);
    const sin30 = Math.sin(Math.PI / 6);

    // Project 3D to 2D isometric
    function project(x: number, y: number, z: number): [number, number] {
      return [
        (x - z) * cos30,
        -(x + z) * sin30 - y,
      ];
    }

    // Cube faces (top, left, right)
    function drawCube(cx: number, cy: number, s: number, alpha: number) {
      if (!ctx) return;
      const verts = [
        project(0, 0, 0), project(s, 0, 0), project(s, 0, s), project(0, 0, s),
        project(0, -s, 0), project(s, -s, 0), project(s, -s, s), project(0, -s, s),
      ];

      const faces = [
        { indices: [4, 5, 6, 7], color: `rgba(20,20,20,${alpha * 0.95})` },   // top
        { indices: [0, 1, 5, 4], color: `rgba(35,35,35,${alpha * 0.85})` },    // right
        { indices: [0, 3, 7, 4], color: `rgba(28,28,28,${alpha * 0.9})` },     // left
        { indices: [1, 2, 6, 5], color: `rgba(15,15,15,${alpha * 0.8})` },     // right-back
        { indices: [3, 2, 6, 7], color: `rgba(22,22,22,${alpha * 0.85})` },    // left-back
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
        ctx.strokeStyle = `rgba(180,180,180,${alpha * 0.35})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    // Cluster of cubes in a formation
    const cubes = [
      { gx: 0, gy: 0, gz: 0 },
      { gx: 1, gy: 0, gz: 0 },
      { gx: 2, gy: 0, gz: 0 },
      { gx: 0, gy: 0, gz: 1 },
      { gx: 1, gy: 0, gz: 1 },
      { gx: 2, gy: 0, gz: 1 },
      { gx: 0, gy: 0, gz: 2 },
      { gx: 1, gy: 0, gz: 2 },
      { gx: 0, gy: 1, gz: 0 },
      { gx: 1, gy: 1, gz: 0 },
      { gx: 2, gy: 1, gz: 0 },
      { gx: 0, gy: 1, gz: 1 },
      { gx: 1, gy: 1, gz: 1 },
      { gx: 0, gy: 2, gz: 0 },
      { gx: 1, gy: 2, gz: 0 },
      { gx: 0, gy: 2, gz: 1 },
      { gx: 2, gy: 0, gz: 2 },
      { gx: 1, gy: 2, gz: 1 },
    ];

    let t = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      // Subtle gradient background
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
      grad.addColorStop(0, "rgba(15,15,15,0.02)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      t += 0.004;

      // Gentle floating & rotation
      const floatY = Math.sin(t * 1.2) * 8;
      const rotAngle = Math.sin(t * 0.5) * 0.06;

      const centerX = w / 2;
      const centerY = h / 2 + floatY;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotAngle);

      // Suspension line
      ctx.beginPath();
      ctx.moveTo(0, -h / 2 - floatY - 50);
      ctx.lineTo(0, -cubes.length * 3);
      ctx.strokeStyle = "rgba(120,120,120,0.15)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Sort cubes for painter's algorithm (back to front)
      const sorted = [...cubes].sort((a, b) => {
        const da = a.gx + a.gz - a.gy;
        const db = b.gx + b.gz - b.gy;
        return da - db;
      });

      for (const cube of sorted) {
        const ox = (cube.gx - 1) * cubeSize;
        const oy = cube.gy * cubeSize;
        const oz = (cube.gz - 1) * cubeSize;

        // Individual cube float offsets
        const phase = cube.gx * 0.7 + cube.gz * 1.1 + cube.gy * 0.9;
        const dx = Math.sin(t * 1.5 + phase) * 2;
        const dy = Math.cos(t * 1.8 + phase) * 1.5;

        const [px, py] = project(ox + dx, -oy + dy, oz);
        const distFromCenter = Math.sqrt(cube.gx * cube.gx + cube.gz * cube.gz + cube.gy * cube.gy);
        const alpha = Math.max(0.5, 1 - distFromCenter * 0.08);

        drawCube(px, py, cubeSize * 0.92, alpha);
      }

      ctx.restore();

      // Ambient particles
      for (let i = 0; i < 6; i++) {
        const px = w * 0.2 + Math.sin(t * 0.3 + i * 2.1) * w * 0.3;
        const py = h * 0.3 + Math.cos(t * 0.4 + i * 1.7) * h * 0.25;
        const r = 1 + Math.sin(t + i) * 0.5;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,180,180,${0.08 + Math.sin(t * 2 + i) * 0.04})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24" aria-label="Geometric visual">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Canvas graphic */}
          <div className="relative aspect-square max-w-[500px] mx-auto lg:mx-0 w-full">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              aria-hidden="true"
              style={{ imageRendering: "auto" }}
            />
            {/* Subtle glow behind */}
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
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Physiotherapy</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary/70" />
                <span>Nutrition</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary/50" />
                <span>Exercise</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary/30" />
                <span>Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

GeometricCubeSection.displayName = "GeometricCubeSection";
export default GeometricCubeSection;
