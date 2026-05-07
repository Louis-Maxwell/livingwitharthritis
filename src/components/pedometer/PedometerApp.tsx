/**
 * Pedometer++ — Step Tracking Tool
 * Self-contained interactive pedometer with simulated step sensor,
 * weekly/monthly history, achievements and goal settings.
 *
 * 📱 TODO: Replace simulated sensor in usePedometer with real
 * DeviceMotionEvent / Web Pedometer API integration when wrapping in Capacitor.
 */

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const STEP_LENGTH_M = 0.762;
const CALORIES_PER_STEP = 0.04;
const DEFAULT_GOAL = 10000;
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

type StepHistory = Record<string, number>;
type UnitSystem = 'km' | 'mi';

function dateKey(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function seedHistory(): StepHistory {
  const today = new Date();
  const history: StepHistory = {};
  for (let i = 29; i >= 1; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = dateKey(d);
    const base = 6000 + Math.random() * 8000;
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    history[key] = Math.round(base * (isWeekend ? 0.75 : 1));
  }
  history[dateKey(today)] = Math.floor(4200 + Math.random() * 2000);
  return history;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────

function useStorage<T>(key: string, initial: T | (() => T)): [T, (v: T | ((prev: T) => T)) => void] {
  const [val, setVal] = useState<T>(() => {
    try {
      const s = localStorage.getItem(key);
      if (s) return JSON.parse(s) as T;
    } catch { /* ignore */ }
    return typeof initial === 'function' ? (initial as () => T)() : initial;
  });
  const set = useCallback((v: T | ((prev: T) => T)) => {
    setVal(prev => {
      const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, [key]);
  return [val, set];
}

function usePedometer({ goal, unitSystem }: { goal: number; unitSystem: UnitSystem }) {
  const [history, setHistory] = useStorage<StepHistory>('pedo_history', seedHistory);
  const [liveSteps, setLive] = useState(0);
  const [isTracking, setTracking] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const todayKey = dateKey();

  const todayTotal = (history[todayKey] || 0) + liveSteps;

  const startTracking = useCallback(() => {
    if (isTracking) return;
    setTracking(true);
    intervalRef.current = setInterval(() => {
      const newSteps = Math.floor(Math.random() * 3) + 1;
      setLive(s => s + newSteps);
      setLastUpdate(Date.now());
    }, 800);
  }, [isTracking]);

  const stopTracking = useCallback(() => {
    setTracking(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setHistory(prev => ({
      ...prev,
      [todayKey]: (prev[todayKey] || 0) + liveSteps,
    }));
    setLive(0);
  }, [liveSteps, todayKey, setHistory]);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const distanceM = todayTotal * STEP_LENGTH_M;
  const distanceKm = distanceM / 1000;
  const distanceMi = distanceM * 0.000621371;
  const calories = Math.round(todayTotal * CALORIES_PER_STEP);
  const activeMin = Math.round((todayTotal / 100) * 1.2);
  const pct = Math.min(todayTotal / goal, 1);

  const weekData = useMemo(() => {
    const out = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = dateKey(d);
      out.push({
        label: DAYS[d.getDay()],
        steps: k === todayKey ? todayTotal : (history[k] || 0),
        isToday: i === 0,
      });
    }
    return out;
  }, [history, todayTotal, todayKey]);

  const monthData = useMemo(() => {
    const weeks = [];
    for (let w = 3; w >= 0; w--) {
      const days: number[] = [];
      for (let d = 6; d >= 0; d--) {
        const dt = new Date();
        dt.setDate(dt.getDate() - w * 7 - d);
        const k = dateKey(dt);
        days.push(k === todayKey ? todayTotal : (history[k] || 0));
      }
      const avg = Math.round(days.reduce((a, b) => a + b, 0) / days.length);
      weeks.push({ label: `W${4 - w}`, steps: avg, isToday: w === 0 });
    }
    return weeks;
  }, [history, todayTotal, todayKey]);

  const streak = useMemo(() => {
    let s = 0;
    const d = new Date();
    if (todayTotal < goal) d.setDate(d.getDate() - 1);
    while (s <= 365) {
      const k = dateKey(d);
      if ((history[k] || 0) >= goal) {
        s++;
        d.setDate(d.getDate() - 1);
      } else break;
    }
    return s;
  }, [history, todayTotal, goal]);

  const allTimeSteps = useMemo(
    () => Object.values(history).reduce((a, b) => a + b, 0) + liveSteps,
    [history, liveSteps],
  );

  const bestDay = useMemo(
    () => Math.max(...Object.values(history), todayTotal),
    [history, todayTotal],
  );

  return {
    todayTotal, liveSteps, isTracking, startTracking, stopTracking, lastUpdate,
    distanceKm, distanceMi, calories, activeMin, pct,
    weekData, monthData, streak, allTimeSteps, bestDay, history,
    goal, unitSystem,
  };
}

type PedoState = ReturnType<typeof usePedometer>;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(Math.round(n)));
const fmtFull = (n: number) => Math.round(n).toLocaleString();

// ─────────────────────────────────────────────────────────────────────────────
// STEP RING
// ─────────────────────────────────────────────────────────────────────────────

function StepRing({ pct, steps, goal, size = 260 }: { pct: number; steps: number; goal: number; size?: number }) {
  const R = size / 2 - 18;
  const C = 2 * Math.PI * R;
  const animRef = useRef<number | null>(null);
  const [animPct, setAnimPct] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1200;
    const target = pct;
    const animate = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setAnimPct(ease * target);
      if (p < 1) animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [pct]);

  const animDash = C * Math.min(animPct, 1);
  const color1 = pct >= 1 ? '#FFD700' : '#FF6B35';
  const color2 = pct >= 1 ? '#FF8C00' : '#FF3366';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={R + 10} fill="none"
        stroke={pct >= 1 ? '#FFD70020' : '#FF6B3520'} strokeWidth={20} />
      <circle cx={size / 2} cy={size / 2} r={R} fill="none"
        stroke="#ffffff0d" strokeWidth={14}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <circle cx={size / 2} cy={size / 2} r={R} fill="none"
        stroke="url(#ringGrad)" strokeWidth={14} strokeLinecap="round"
        strokeDasharray={`${animDash} ${C}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        filter="url(#glow)" />
      <text x={size / 2} y={size / 2 - 10} textAnchor="middle"
        fontWeight={700}
        fontSize={pct >= 1 ? 38 : steps > 9999 ? 36 : 42} fill="#ffffff">
        {fmtFull(steps)}
      </text>
      <text x={size / 2} y={size / 2 + 16} textAnchor="middle"
        fontWeight={400} fontSize={12} fill="#ffffff80" letterSpacing="2">
        STEPS TODAY
      </text>
      <text x={size / 2} y={size / 2 + 36} textAnchor="middle"
        fontWeight={500} fontSize={12} fill="#FF6B35">
        {pct >= 1 ? 'GOAL CRUSHED!' : `${Math.round(pct * 100)}% of ${fmtFull(goal)}`}
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BAR CHART
// ─────────────────────────────────────────────────────────────────────────────

function BarChart({ data, goal, height = 140 }: {
  data: { label: string; steps: number; isToday?: boolean }[];
  goal: number;
  height?: number;
}) {
  const max = Math.max(...data.map(d => d.steps), goal * 0.5);
  const [hovered, setHovered] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', left: 0, right: 0,
        top: `${((max - goal) / max) * height}px`,
        borderTop: '1px dashed #FF6B3550', zIndex: 1,
      }}>
        <span style={{
          position: 'absolute', right: 0, top: -18,
          fontSize: 10, color: '#FF6B35', letterSpacing: 1,
        }}>GOAL {fmt(goal)}</span>
      </div>

      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: 5,
        height, position: 'relative', zIndex: 2,
      }}>
        {data.map((d, i) => {
          const barH = animated ? Math.round((d.steps / max) * height) : 0;
          const metGoal = d.steps >= goal;
          return (
            <div key={i}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}>
              {hovered === i && (
                <div style={{
                  position: 'absolute', bottom: height + 32,
                  background: '#1a1a2e', border: '1px solid #ffffff15',
                  borderRadius: 8, padding: '6px 10px', fontSize: 12,
                  color: '#fff', whiteSpace: 'nowrap', zIndex: 10,
                  boxShadow: '0 4px 20px #00000060',
                }}>
                  <div style={{ fontWeight: 700 }}>{fmtFull(d.steps)} steps</div>
                  <div style={{ color: '#ffffff60', fontSize: 11, marginTop: 2 }}>{d.label}</div>
                </div>
              )}
              <div style={{
                width: '100%', borderRadius: 5,
                background: metGoal
                  ? 'linear-gradient(180deg, #FFD700, #FF8C00)'
                  : d.isToday
                    ? 'linear-gradient(180deg, #FF6B35, #FF3366)'
                    : 'linear-gradient(180deg, #ffffff20, #ffffff10)',
                height: barH,
                transition: `height 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 40}ms`,
                cursor: 'pointer',
                boxShadow: d.isToday ? '0 0 10px #FF3366aa' : 'none',
              }} />
              <span style={{
                fontSize: 10, color: d.isToday ? '#FF6B35' : '#ffffff60',
                fontWeight: d.isToday ? 700 : 400,
              }}>{d.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// METRIC CARD
// ─────────────────────────────────────────────────────────────────────────────

function MetricCard({ icon, label, value, unit, sub, accent = '#FF6B35', delay = 0 }: {
  icon: ReactNode; label: string; value: ReactNode; unit?: string;
  sub?: string; accent?: string; delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const style: CSSProperties = {
    background: 'linear-gradient(135deg, #1e2340, #141728)',
    border: '1px solid #ffffff0a',
    borderRadius: 20, padding: '18px 16px',
    display: 'flex', flexDirection: 'column', gap: 4,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: 'opacity 0.4s, transform 0.4s',
    position: 'relative', overflow: 'hidden',
  };

  return (
    <div style={style}>
      <div style={{
        position: 'absolute', top: -20, right: -20, width: 80, height: 80,
        borderRadius: '50%', background: accent, opacity: 0.08,
        filter: 'blur(20px)',
      }} />
      <div style={{ fontSize: 22, marginBottom: 2, color: accent }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 26, color: '#fff', lineHeight: 1 }}>
        {value}
        {unit && <span style={{ fontSize: 14, fontWeight: 400, color: '#ffffff80', marginLeft: 3 }}>{unit}</span>}
      </div>
      <div style={{ fontSize: 11, color: '#ffffff70', letterSpacing: 1, textTransform: 'uppercase' }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: accent, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACHIEVEMENTS
// ─────────────────────────────────────────────────────────────────────────────

type Achievement = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  req: (allTime: number, best: number, goal: number, streak: number) => boolean;
};

const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_step', icon: '👟', title: 'First Steps', desc: 'Walk 1,000 steps', req: s => s >= 1000 },
  { id: 'five_k', icon: '🏃', title: 'Five Thousand', desc: 'Reach 5,000 in a day', req: (_, b) => b >= 5000 },
  { id: 'goal_getter', icon: '🎯', title: 'Goal Getter', desc: 'Hit your daily goal', req: (_, b, g) => b >= g },
  { id: 'ten_k', icon: '🔥', title: 'Ten Thousand', desc: '10,000 steps in a day', req: (_, b) => b >= 10000 },
  { id: 'streak_7', icon: '⚡', title: 'Week Warrior', desc: '7-day streak', req: (_, __, ___, st) => st >= 7 },
  { id: 'hundred_k', icon: '💎', title: 'Century Club', desc: '100,000 all-time steps', req: s => s >= 100000 },
  { id: 'marathon', icon: '🏅', title: 'Marathon', desc: 'Walk 42km in one day', req: (_, b) => b * 0.000762 >= 42 },
  { id: 'streak_30', icon: '👑', title: 'Iron Legs', desc: '30-day streak', req: (_, __, ___, st) => st >= 30 },
];

function AchievementBadge({ ach, unlocked, delay = 0 }: { ach: Achievement; unlocked: boolean; delay?: number }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div style={{
      background: unlocked ? 'linear-gradient(135deg,#1e2340,#2a1f3d)' : 'linear-gradient(135deg,#111420,#0e1120)',
      border: `1px solid ${unlocked ? '#FF6B3530' : '#ffffff08'}`,
      borderRadius: 16, padding: '14px 12px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center',
      opacity: vis ? 1 : 0, transform: vis ? 'scale(1)' : 'scale(0.9)',
      transition: 'opacity 0.3s, transform 0.3s',
      filter: unlocked ? 'none' : 'grayscale(1)',
    }}>
      <div style={{ fontSize: 28, opacity: unlocked ? 1 : 0.3 }}>{ach.icon}</div>
      <div style={{ fontWeight: 700, fontSize: 12, color: unlocked ? '#fff' : '#ffffff60' }}>{ach.title}</div>
      <div style={{ fontSize: 10, color: '#ffffff60', lineHeight: 1.3 }}>{ach.desc}</div>
      {unlocked && (
        <div style={{
          fontSize: 9, background: '#FF6B3520', color: '#FF6B35',
          borderRadius: 4, padding: '2px 6px', fontWeight: 700, letterSpacing: 1,
        }}>UNLOCKED</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SETTINGS
// ─────────────────────────────────────────────────────────────────────────────

function SettingsPanel({ goal, setGoal, unit, setUnit, onClose }: {
  goal: number; setGoal: (g: number) => void;
  unit: UnitSystem; setUnit: (u: UnitSystem) => void;
  onClose: () => void;
}) {
  const [localGoal, setLocalGoal] = useState(goal);
  const presets = [5000, 7500, 10000, 12500, 15000];

  return (
    <div role="dialog" aria-modal="true" aria-label="Pedometer settings"
      style={{
        position: 'fixed', inset: 0, background: '#00000080',
        backdropFilter: 'blur(12px)', zIndex: 100,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} style={{
        background: 'linear-gradient(180deg, #1a1f3a, #111420)',
        border: '1px solid #ffffff15', borderRadius: '24px 24px 0 0',
        padding: '28px 24px 40px', width: '100%', maxWidth: 480,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ fontWeight: 700, fontSize: 22, color: '#fff', margin: 0 }}>Settings</h2>
          <button onClick={onClose} aria-label="Close settings" style={{
            background: '#ffffff15', border: 'none', color: '#fff',
            width: 32, height: 32, borderRadius: '50%', fontSize: 16, cursor: 'pointer',
          }}>×</button>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, color: '#ffffff70', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
            Daily Step Goal
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {presets.map(p => (
              <button key={p} onClick={() => setLocalGoal(p)} style={{
                padding: '8px 16px', borderRadius: 12,
                background: localGoal === p ? 'linear-gradient(135deg,#FF6B35,#FF3366)' : '#ffffff10',
                border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>{p.toLocaleString()}</button>
            ))}
          </div>
          <input type="range" min={1000} max={30000} step={500} value={localGoal}
            onChange={e => setLocalGoal(Number(e.target.value))}
            aria-label="Custom step goal"
            style={{ width: '100%', accentColor: '#FF6B35' }} />
          <div style={{ textAlign: 'center', color: '#FF6B35', fontWeight: 700, fontSize: 20, marginTop: 8 }}>
            {localGoal.toLocaleString()} steps
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, color: '#ffffff70', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
            Distance Unit
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['km', 'mi'] as UnitSystem[]).map(u => (
              <button key={u} onClick={() => setUnit(u)} style={{
                flex: 1, padding: '12px', borderRadius: 12,
                background: unit === u ? 'linear-gradient(135deg,#FF6B35,#FF3366)' : '#ffffff10',
                border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer',
              }}>{u === 'km' ? 'Kilometres' : 'Miles'}</button>
            ))}
          </div>
        </div>

        <button onClick={() => { setGoal(localGoal); onClose(); }} style={{
          width: '100%', padding: '16px', borderRadius: 16,
          background: 'linear-gradient(135deg, #FF6B35, #FF3366)',
          border: 'none', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 20px #FF3366aa',
        }}>Save Settings</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────────────────────────────────────

function TodayTab({ ped }: { ped: PedoState }) {
  const {
    todayTotal, isTracking, startTracking, stopTracking,
    pct, distanceKm, distanceMi, calories, activeMin,
    streak, goal, unitSystem, lastUpdate,
  } = ped;

  const dist = unitSystem === 'km'
    ? { val: distanceKm.toFixed(2), unit: 'km' }
    : { val: distanceMi.toFixed(2), unit: 'mi' };

  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (!isTracking) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 300);
    return () => clearTimeout(t);
  }, [lastUpdate, isTracking]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
        <div style={{
          transform: pulse ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <StepRing pct={pct} steps={todayTotal} goal={goal} />
        </div>
        <button onClick={isTracking ? stopTracking : startTracking} style={{
          marginTop: 20,
          background: isTracking
            ? 'linear-gradient(135deg, #1a1a2e, #2d1b2e)'
            : 'linear-gradient(135deg, #FF6B35, #FF3366)',
          border: isTracking ? '2px solid #FF336640' : 'none',
          color: '#fff', borderRadius: 30,
          padding: '14px 36px', fontSize: 15, fontWeight: 700,
          cursor: 'pointer', letterSpacing: 0.5,
          boxShadow: isTracking ? 'none' : '0 6px 24px #FF336680',
          transition: 'all 0.3s',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          {isTracking ? (
            <><span style={{
              width: 10, height: 10, background: '#FF3366', borderRadius: 2,
              display: 'inline-block', animation: 'pedoPulse 1s infinite',
            }} /> Stop Tracking</>
          ) : (
            <>▶ Start Walking</>
          )}
        </button>
        {isTracking && (
          <div style={{ marginTop: 10, fontSize: 12, color: '#FF6B35' }}>
            Tracking active — keep moving!
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <MetricCard icon="📍" label="Distance" value={dist.val} unit={dist.unit} accent="#FF6B35" delay={0} />
        <MetricCard icon="🔥" label="Calories" value={fmtFull(calories)} unit="kcal" accent="#FF3366" delay={80} />
        <MetricCard icon="⏱" label="Active Time" value={activeMin} unit="min" accent="#9B59FF" delay={160} />
        <MetricCard icon="✦" label="Streak" value={streak} unit="days" accent="#FFD700"
          sub={streak >= 7 ? 'Week warrior!' : streak > 0 ? 'Keep it up!' : 'Start today!'} delay={240} />
      </div>

      {pct < 1 && (
        <div style={{
          background: 'linear-gradient(135deg, #1e2340, #141728)',
          border: '1px solid #FF6B3520',
          borderRadius: 16, padding: '16px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 12, color: '#ffffff70', letterSpacing: 1, textTransform: 'uppercase' }}>Steps remaining</div>
            <div style={{ fontWeight: 700, fontSize: 28, color: '#FF6B35' }}>
              {fmtFull(Math.max(0, goal - todayTotal))}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: '#ffffff60' }}>
              ≈ {((goal - todayTotal) * STEP_LENGTH_M / 1000).toFixed(1)} km left
            </div>
            <div style={{ fontSize: 12, color: '#ffffff60', marginTop: 4 }}>
              ≈ {Math.round((goal - todayTotal) / 100)} min walk
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryTab({ ped }: { ped: PedoState }) {
  const { weekData, monthData, goal, allTimeSteps, bestDay } = ped;
  const [view, setView] = useState<'week' | 'month'>('week');

  const chartData = view === 'week' ? weekData : monthData;
  const weekAvg = Math.round(weekData.reduce((a, b) => a + b.steps, 0) / 7);
  const weekTotal = weekData.reduce((a, b) => a + b.steps, 0);
  const goalDays = weekData.filter(d => d.steps >= goal).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', background: '#ffffff0a', borderRadius: 12, padding: 4, gap: 4 }}>
        {(['week', 'month'] as const).map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            flex: 1, padding: '10px', borderRadius: 10,
            background: view === v ? 'linear-gradient(135deg,#FF6B35,#FF3366)' : 'transparent',
            border: 'none', color: view === v ? '#fff' : '#ffffff70',
            fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
          }}>{v.charAt(0).toUpperCase() + v.slice(1)}</button>
        ))}
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #1e2340, #141728)',
        border: '1px solid #ffffff0a', borderRadius: 20, padding: '20px 16px',
      }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>
          {view === 'week' ? 'This Week' : 'Last 4 Weeks'}
        </div>
        <div style={{ fontSize: 12, color: '#ffffff60', marginBottom: 20 }}>
          {view === 'week' ? `${goalDays}/7 days hit goal` : 'Weekly averages'}
        </div>
        <BarChart data={chartData} goal={goal} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[
          { label: 'Week Total', value: fmt(weekTotal) },
          { label: 'Daily Avg', value: fmt(weekAvg) },
          { label: 'Goal Days', value: `${goalDays}/7` },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'linear-gradient(135deg, #1e2340, #141728)',
            border: '1px solid #ffffff0a', borderRadius: 16,
            padding: '14px 12px', textAlign: 'center',
          }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#fff' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: '#ffffff60', marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #1a1040, #0e0a2e)',
        border: '1px solid #9B59FF20', borderRadius: 20, padding: '20px',
      }}>
        <div style={{ fontSize: 12, color: '#9B59FF', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
          All-Time Records
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 28, color: '#fff' }}>
              {(allTimeSteps / 1000).toFixed(1)}k
            </div>
            <div style={{ fontSize: 11, color: '#ffffff60', textTransform: 'uppercase', letterSpacing: 1 }}>Total Steps</div>
            <div style={{ fontSize: 12, color: '#9B59FF', marginTop: 2 }}>
              ≈ {(allTimeSteps * STEP_LENGTH_M / 1000).toFixed(0)} km walked
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 28, color: '#fff' }}>{fmtFull(bestDay)}</div>
            <div style={{ fontSize: 11, color: '#ffffff60', textTransform: 'uppercase', letterSpacing: 1 }}>Best Day</div>
            <div style={{ fontSize: 12, color: '#9B59FF', marginTop: 2 }}>Personal record</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementsTab({ ped }: { ped: PedoState }) {
  const { allTimeSteps, bestDay, goal, streak } = ped;
  const unlocked = ACHIEVEMENTS.reduce<Record<string, boolean>>((acc, a) => {
    acc[a.id] = a.req(allTimeSteps, bestDay, goal, streak);
    return acc;
  }, {});
  const count = Object.values(unlocked).filter(Boolean).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e2340, #141728)',
        border: '1px solid #FFD70020', borderRadius: 20, padding: '20px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
        <div style={{ fontWeight: 700, fontSize: 32, color: '#FFD700' }}>
          {count} / {ACHIEVEMENTS.length}
        </div>
        <div style={{ fontSize: 13, color: '#ffffff70', marginTop: 4 }}>Achievements Unlocked</div>
        <div style={{ height: 8, background: '#ffffff10', borderRadius: 4, marginTop: 16, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 4,
            transition: 'width 1s cubic-bezier(0.34,1.56,0.64,1)',
            background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
            width: `${(count / ACHIEVEMENTS.length) * 100}%`,
          }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {ACHIEVEMENTS.map((a, i) => (
          <AchievementBadge key={a.id} ach={a} unlocked={unlocked[a.id]} delay={i * 60} />
        ))}
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #0f1a2e, #0a1020)',
        border: '1px solid #ffffff08', borderRadius: 16, padding: '16px 20px',
      }}>
        <div style={{ fontSize: 12, color: '#ffffff60', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
          Next to unlock
        </div>
        {ACHIEVEMENTS.filter(a => !unlocked[a.id]).slice(0, 3).map(a => (
          <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 20, opacity: 0.4 }}>{a.icon}</span>
            <div>
              <div style={{ fontSize: 13, color: '#ffffff80', fontWeight: 600 }}>{a.title}</div>
              <div style={{ fontSize: 11, color: '#ffffff60' }}>{a.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'today', label: 'Today' },
  { id: 'history', label: 'History' },
  { id: 'achievements', label: 'Awards' },
] as const;
type TabId = typeof TABS[number]['id'];

export default function PedometerApp() {
  const [tab, setTab] = useState<TabId>('today');
  const [goal, setGoal] = useStorage<number>('pedo_goal', DEFAULT_GOAL);
  const [unit, setUnit] = useStorage<UnitSystem>('pedo_unit', 'km');
  const [showSettings, setShowSettings] = useState(false);

  const ped = usePedometer({ goal, unitSystem: unit });

  const today = new Date();
  const dateStr = `${DAYS[today.getDay()]}, ${today.getDate()} ${MONTHS[today.getMonth()]}`;

  return (
    <div style={{
      background: 'linear-gradient(160deg, #0d0f1e 0%, #0a0c18 60%, #070810 100%)',
      color: '#fff',
      maxWidth: 460,
      margin: '0 auto',
      borderRadius: 28,
      padding: '24px 20px 32px',
      boxShadow: '0 20px 60px hsl(var(--foreground) / 0.15)',
      position: 'relative',
    }}>
      <style>{`
        @keyframes pedoPulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: '#ffffff80', letterSpacing: 2, textTransform: 'uppercase' }}>
            Pedometer
          </div>
          <div style={{ fontWeight: 700, fontSize: 18, marginTop: 2 }}>{dateStr}</div>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          aria-label="Open settings"
          style={{
            background: '#ffffff10', border: '1px solid #ffffff15',
            color: '#fff', width: 40, height: 40, borderRadius: 12,
            cursor: 'pointer', fontSize: 18,
          }}
        >⚙</button>
      </div>

      <div style={{
        display: 'flex', background: '#ffffff0a', borderRadius: 14, padding: 4, gap: 4, marginBottom: 20,
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '10px 8px', borderRadius: 10,
            background: tab === t.id ? 'linear-gradient(135deg,#FF6B35,#FF3366)' : 'transparent',
            border: 'none', color: tab === t.id ? '#fff' : '#ffffff70',
            fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'today' && <TodayTab ped={ped} />}
      {tab === 'history' && <HistoryTab ped={ped} />}
      {tab === 'achievements' && <AchievementsTab ped={ped} />}

      {showSettings && (
        <SettingsPanel
          goal={goal}
          setGoal={setGoal}
          unit={unit}
          setUnit={setUnit}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
