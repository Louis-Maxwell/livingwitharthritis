import { memo, useEffect, useRef, useCallback } from "react";

/**
 * Scroll-reactive 3D Rubik's cube — full-width dark cinematic section.
 * Rotates and floats as the user scrolls. Inspired by Aevolve's suspended cube.
 */
const GeometricCubeSection = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const animId = useRef(0);
  const idleT = useRef(0);

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
    const idle = idleT.current;

    // ── 3D rotation matrix (Y then X axis) driven by scroll ──
    const rotY = t * Math.PI * 1.2 + idle * 0.3;
    const rotX = 0.55 + Math.sin(t * Math.PI) * 0.25;

    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

    function project3D(x: number, y: number, z: number): [number, number, number] {
      // Rotate around Y
      let x1 = x * cosY - z * sinY;
      let z1 = x * sinY + z * cosY;
      // Rotate around X
      let y1 = y * cosX - z1 * sinX;
      let z2 = y * sinX + z1 * cosX;
      // Simple perspective
      const perspective = 600;
      const scale = perspective / (perspective + z2);
      return [x1 * scale, y1 * scale, z2];
    }

    const cubeUnit = Math.min(w, h) * 0.055;
    const gap = cubeUnit * 0.12;
    const step = cubeUnit + gap;

    // 3x3x3 Rubik's cube grid
    const cubes: { gx: number; gy: number; gz: number }[] = [];
    for (let gx = 0; gx < 3; gx++)
      for (let gy = 0; gy < 3; gy++)
        for (let gz = 0; gz < 3; gz++)
          cubes.push({ gx, gy, gz });

    // Face definitions for a unit cube (CCW winding for front faces)
    const faceTemplates = [
      { verts: [[0,0,0],[1,0,0],[1,0,1],[0,0,1]], shade: 0.45 }, // bottom
      { verts: [[0,1,0],[0,1,1],[1,1,1],[1,1,0]], shade: 0.95 }, // top
      { verts: [[0,0,0],[0,0,1],[0,1,1],[0,1,0]], shade: 0.7 },  // left
      { verts: [[1,0,0],[1,1,0],[1,1,1],[1,0,1]], shade: 0.6 },  // right
      { verts: [[0,0,0],[1,0,0],[1,1,0],[0,1,0]], shade: 0.55 }, // front
      { verts: [[0,0,1],[0,1,1],[1,1,1],[1,0,1]], shade: 0.75 }, // back
    ];

    const floatY = Math.sin(t * Math.PI * 2 + idle) * 10;
    const centerX = w / 2;
    const centerY = h / 2 + floatY;

    // Collect all faces with projected coords for sorting
    type FaceData = {
      projected: [number, number][];
      avgZ: number;
      shade: number;
      highlight: number;
    };
    const allFaces: FaceData[] = [];

    for (const cube of cubes) {
      const ox = (cube.gx - 1) * step;
      const oy = (cube.gy - 1) * step;
      const oz = (cube.gz - 1) * step;

      const phase = cube.gx * 1.3 + cube.gz * 0.9 + cube.gy * 1.7;
      const highlight = Math.max(0, Math.sin(t * Math.PI * 4 + phase + idle * 2) * 0.3);

      for (const face of faceTemplates) {
        const projVerts: [number, number][] = [];
        let zSum = 0;
        for (const v of face.verts) {
          const wx = ox + v[0] * cubeUnit;
          const wy = oy + v[1] * cubeUnit;
          const wz = oz + v[2] * cubeUnit;
          const [px, py, pz] = project3D(wx, -wy, wz);
          projVerts.push([centerX + px, centerY + py]);
          zSum += pz;
        }
        allFaces.push({
          projected: projVerts,
          avgZ: zSum / 4,
          shade: face.shade,
          highlight,
        });
      }
    }

    // Painter's algorithm: draw far faces first
    allFaces.sort((a, b) => a.avgZ - b.avgZ);

    for (const face of allFaces) {
      ctx.beginPath();
      face.projected.forEach(([px, py], i) => {
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();

      const base = Math.round(18 + face.shade * 30 + face.highlight * 35);
      const r = Math.min(255, base + Math.round(face.highlight * 80));
      const g = Math.round(base * 0.85);
      const b = Math.round(base * 0.88);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fill();

      ctx.strokeStyle = `rgba(180,180,180,0.18)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Suspension wire
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, centerY - cubeUnit * 2.5);
    ctx.strokeStyle = "rgba(150,150,150,0.1)";
    ctx.lineWidth = 0.7;
    ctx.stroke();

    // Ambient particles
    for (let i = 0; i < 10; i++) {
      const px = w * 0.1 + Math.sin(t * 2.5 + idle * 0.5 + i * 2.1) * w * 0.4;
      const py = h * 0.15 + Math.cos(t * 3 + idle * 0.7 + i * 1.7) * h * 0.35;
      const r = 1 + Math.sin(idle + i) * 0.5;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(228,0,43,${0.05 + Math.sin(idle * 2 + i) * 0.03})`;
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
        const raw = 1 - rect.bottom / (vh + rect.height);
        scrollProgress.current = Math.max(0, Math.min(1, raw));
        ticking = false;
      });
    };

    const loop = () => {
      idleT.current += 0.008;
      draw();
      animId.current = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", draw);
    animId.current = requestAnimationFrame(loop);
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
      className="relative w-full overflow-hidden"
      aria-label="Geometric visual"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)" }}
    >
      <div className="relative grid lg:grid-cols-2 gap-0 items-center min-h-[70vh]">
        {/* Canvas — full left half */}
        <div className="relative w-full h-[50vh] lg:h-[70vh]">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            aria-hidden="true"
          />
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(228,0,43,0.06) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Text content — right side */}
        <div className="px-8 sm:px-12 lg:px-16 py-12 lg:py-0 space-y-6 text-center lg:text-left">
          <span className="inline-block text-xs font-bold tracking-[0.35em] uppercase text-white/40">
            Built Different
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1]">
            Structured Support,{" "}
            <span style={{ color: "#E4002B" }}>Piece by Piece</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            Like interlocking building blocks, our services connect
            physiotherapy, nutrition, exercise, and community into one
            cohesive support system — designed to help you rebuild
            strength and confidence.
          </p>
          <div className="flex flex-wrap gap-5 justify-center lg:justify-start pt-2">
            {[
              { label: "Physiotherapy", alpha: 1 },
              { label: "Nutrition", alpha: 0.7 },
              { label: "Exercise", alpha: 0.5 },
              { label: "Community", alpha: 0.35 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-white/60">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: `rgba(228,0,43,${item.alpha})` }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

GeometricCubeSection.displayName = "GeometricCubeSection";
export default GeometricCubeSection;
