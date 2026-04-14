import { memo, useEffect, useRef, useCallback } from "react";

/**
 * Interactive 3D molecular/neural network — full-width dark section.
 * Nodes float and connect dynamically. Mouse proximity causes attraction ripples.
 * Represents "Connected Care" — the interconnected health support system.
 */

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  pulsePhase: number;
  type: "primary" | "secondary" | "accent";
}

const ParticleNetworkSection = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const nodesRef = useRef<Node[]>([]);
  const animId = useRef(0);
  const timeRef = useRef(0);
  const scrollRef = useRef(0);

  const initNodes = useCallback((w: number, h: number) => {
    const nodes: Node[] = [];
    const count = Math.min(65, Math.floor((w * h) / 18000));
    for (let i = 0; i < count; i++) {
      const type = i < 6 ? "primary" : i < 20 ? "secondary" : "accent";
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 300 - 150,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.2,
        baseRadius: type === "primary" ? 4 + Math.random() * 3 : type === "secondary" ? 2.5 + Math.random() * 2 : 1.2 + Math.random() * 1,
        pulsePhase: Math.random() * Math.PI * 2,
        type,
      });
    }
    nodesRef.current = nodes;
  }, []);

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
      if (nodesRef.current.length === 0) initNodes(w, h);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const t = timeRef.current;
    const mouse = mouseRef.current;
    const nodes = nodesRef.current;

    // Update positions
    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;
      node.z += node.vz;

      // Bounds with soft wrap
      if (node.x < -20) node.x = w + 20;
      if (node.x > w + 20) node.x = -20;
      if (node.y < -20) node.y = h + 20;
      if (node.y > h + 20) node.y = -20;
      if (node.z < -150) node.vz *= -1;
      if (node.z > 150) node.vz *= -1;

      // Mouse attraction for primary nodes
      if (mouse.active && node.type === "primary") {
        const dx = mouse.x * w - node.x;
        const dy = mouse.y * h - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          node.vx += dx * 0.00008;
          node.vy += dy * 0.00008;
        }
      }

      // Damping
      node.vx *= 0.998;
      node.vy *= 0.998;
    }

    // Project 3D to 2D
    const perspective = 800;
    const projected = nodes.map((n) => {
      const scale = perspective / (perspective + n.z);
      return {
        px: w / 2 + (n.x - w / 2) * scale,
        py: h / 2 + (n.y - h / 2) * scale,
        scale,
        node: n,
      };
    });

    // Draw connections
    const maxDist = 180;
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const a = projected[i];
        const b = projected[j];
        const dx = a.px - b.px;
        const dy = a.py - b.py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.15 * Math.min(a.scale, b.scale);
          // Crimson-tinted connections
          const pulse = Math.sin(t * 2 + i * 0.3) * 0.5 + 0.5;
          const r = 228;
          const g = Math.round(20 + pulse * 30);
          const bVal = Math.round(43 + pulse * 20);
          ctx.beginPath();
          ctx.moveTo(a.px, a.py);
          ctx.lineTo(b.px, b.py);
          ctx.strokeStyle = `rgba(${r},${g},${bVal},${opacity})`;
          ctx.lineWidth = 0.6 * Math.min(a.scale, b.scale);
          ctx.stroke();
        }
      }
    }

    // Draw nodes (back-to-front)
    projected.sort((a, b) => a.node.z - b.node.z);

    for (const { px, py, scale, node } of projected) {
      const pulse = Math.sin(t * 3 + node.pulsePhase) * 0.3 + 1;
      const radius = node.baseRadius * scale * pulse;

      // Glow for primary nodes
      if (node.type === "primary") {
        const glow = ctx.createRadialGradient(px, py, 0, px, py, radius * 4);
        glow.addColorStop(0, "rgba(228, 0, 43, 0.12)");
        glow.addColorStop(0.5, "rgba(228, 0, 43, 0.04)");
        glow.addColorStop(1, "rgba(228, 0, 43, 0)");
        ctx.beginPath();
        ctx.arc(px, py, radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      // Node
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);

      if (node.type === "primary") {
        const grad = ctx.createRadialGradient(px - radius * 0.3, py - radius * 0.3, 0, px, py, radius);
        grad.addColorStop(0, "rgba(255, 80, 80, 0.9)");
        grad.addColorStop(1, "rgba(228, 0, 43, 0.7)");
        ctx.fillStyle = grad;
      } else if (node.type === "secondary") {
        ctx.fillStyle = `rgba(200, 180, 170, ${0.35 * scale})`;
      } else {
        ctx.fillStyle = `rgba(180, 160, 150, ${0.2 * scale})`;
      }
      ctx.fill();

      // Highlight rim on primary
      if (node.type === "primary") {
        ctx.beginPath();
        ctx.arc(px, py, radius + 1, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 200, 200, ${0.15 * scale})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // Floating ring accents
    for (let i = 0; i < 3; i++) {
      const cx = w * (0.2 + i * 0.3) + Math.sin(t * 0.5 + i * 2) * 40;
      const cy = h * 0.5 + Math.cos(t * 0.7 + i * 1.5) * 60;
      const r = 40 + Math.sin(t + i) * 10;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(228, 0, 43, ${0.04 + Math.sin(t * 2 + i) * 0.02})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }, [initNodes]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };
    const onLeave = () => { mouseRef.current.active = false; };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      scrollRef.current = Math.max(0, Math.min(1, 1 - rect.bottom / (vh + rect.height)));
    };

    const loop = () => {
      timeRef.current += 0.01;
      draw();
      animId.current = requestAnimationFrame(loop);
    };

    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    animId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId.current);
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [draw]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      aria-label="Connected care network"
      style={{ background: "linear-gradient(180deg, #080808 0%, #0f0f0f 40%, #0a0808 100%)" }}
    >
      <div className="relative grid lg:grid-cols-2 gap-0 items-center min-h-[65vh]">
        {/* Text content — left side */}
        <div className="px-8 sm:px-12 lg:px-16 py-14 lg:py-0 space-y-6 text-center lg:text-left order-2 lg:order-1">
          <span className="inline-block text-xs font-bold tracking-[0.35em] uppercase text-white/30">
            Connected Care
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1]">
            Every point of care,{" "}
            <span style={{ color: "#E4002B" }}>interconnected</span>
          </h2>
          <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            Our network links physiotherapists, dietitians, exercise specialists,
            and community volunteers into a living support system — so no aspect
            of your wellbeing is ever overlooked.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4 max-w-sm mx-auto lg:mx-0">
            {[
              { val: "24/7", label: "AI Support" },
              { val: "50+", label: "Specialists" },
              { val: "120+", label: "Resources" },
              { val: "0", label: "Cost to you" },
            ].map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <p className="text-2xl font-extrabold text-white/90 tabular-nums">{s.val}</p>
                <p className="text-[11px] text-white/30 uppercase tracking-widest mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas — right half */}
        <div className="relative w-full h-[50vh] lg:h-[65vh] order-1 lg:order-2 cursor-crosshair">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            aria-hidden="true"
          />
          {/* Central glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(228,0,43,0.05) 0%, transparent 55%)",
            }}
          />
        </div>
      </div>
    </section>
  );
});

ParticleNetworkSection.displayName = "ParticleNetworkSection";
export default ParticleNetworkSection;
