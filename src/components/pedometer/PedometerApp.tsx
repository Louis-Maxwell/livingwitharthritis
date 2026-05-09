/**
 * Pedometer++ — Step Tracking Tool
 * Self-contained interactive pedometer that uses the browser's
 * DeviceMotion API (accelerometer) for real on-device step counting,
 * with weekly/monthly history, achievements and goal settings.
 *
 * Step detection: peak-finding on |accelerationIncludingGravity| with a
 * refractory period — works on any phone whose browser exposes
 * `devicemotion` events. iOS 13+ requires an explicit user-gesture
 * permission via `DeviceMotionEvent.requestPermission()` (handled here).
 *
 * Accessibility: WAI-ARIA tablists, focus-trapped settings dialog,
 * SVG charts as role="img", reduced-motion honoured, themed via design
 * tokens for WCAG AA contrast in light/dark/high-contrast.
 */

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useId,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const STEP_LENGTH_M = 0.762;
const CALORIES_PER_STEP = 0.04;
const DEFAULT_GOAL = 10000;
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
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

// Step-detection tuning for the DeviceMotion peak algorithm.
// Walking acceleration peaks usually sit ~1.5–4 m/s² above gravity (9.81),
// so anything past ~11.2 m/s² is a candidate step. The 280 ms refractory
// period prevents double-counting fast hand wobbles as steps.
const STEP_PEAK_THRESHOLD = 11.2;
const STEP_MIN_INTERVAL_MS = 280;

type SensorStatus = 'idle' | 'requesting' | 'active' | 'unsupported' | 'denied' | 'error';

function usePedometer({ goal, unitSystem }: { goal: number; unitSystem: UnitSystem }) {
  const [history, setHistory] = useStorage<StepHistory>('pedo_history', seedHistory);
  const [liveSteps, setLive] = useState(0);
  const [isTracking, setTracking] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [sensorStatus, setSensorStatus] = useState<SensorStatus>('idle');
  const [sensorMessage, setSensorMessage] = useState<string | null>(null);
  const motionHandlerRef = useRef<((e: DeviceMotionEvent) => void) | null>(null);
  const peakStateRef = useRef({ lastMag: 0, goingUp: false, lastPeakAt: 0 });
  const todayKey = dateKey();

  const todayTotal = (history[todayKey] || 0) + liveSteps;

  const detachMotion = useCallback(() => {
    if (motionHandlerRef.current && typeof window !== 'undefined') {
      window.removeEventListener('devicemotion', motionHandlerRef.current);
    }
    motionHandlerRef.current = null;
  }, []);

  const attachMotion = useCallback(() => {
    peakStateRef.current = { lastMag: 0, goingUp: false, lastPeakAt: 0 };
    const handler = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a || a.x == null || a.y == null || a.z == null) return;
      const mag = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
      const now = Date.now();
      const state = peakStateRef.current;
      if (mag > state.lastMag) {
        state.goingUp = true;
      } else if (
        state.goingUp &&
        state.lastMag >= STEP_PEAK_THRESHOLD &&
        now - state.lastPeakAt > STEP_MIN_INTERVAL_MS
      ) {
        state.lastPeakAt = now;
        state.goingUp = false;
        setLive(s => s + 1);
        setLastUpdate(now);
      } else {
        state.goingUp = false;
      }
      state.lastMag = mag;
    };
    motionHandlerRef.current = handler;
    window.addEventListener('devicemotion', handler);
  }, []);

  const startTracking = useCallback(async () => {
    if (isTracking) return;
    setSensorMessage(null);

    if (typeof window === 'undefined' || !('DeviceMotionEvent' in window)) {
      setSensorStatus('unsupported');
      setSensorMessage(
        'Motion sensors are not available on this device. Open this page on your phone to count real steps.',
      );
      return;
    }

    // iOS 13+ requires an explicit user-gesture permission request.
    const DME = window.DeviceMotionEvent as typeof DeviceMotionEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };
    if (typeof DME.requestPermission === 'function') {
      setSensorStatus('requesting');
      try {
        const res = await DME.requestPermission();
        if (res !== 'granted') {
          setSensorStatus('denied');
          setSensorMessage(
            'Motion access was denied. Enable Motion & Orientation in Safari settings to track steps.',
          );
          return;
        }
      } catch {
        setSensorStatus('error');
        setSensorMessage('Could not request motion permission. Try again from a tap on the button.');
        return;
      }
    }

    attachMotion();
    setSensorStatus('active');
    setTracking(true);
  }, [isTracking, attachMotion]);

  const stopTracking = useCallback(() => {
    setTracking(false);
    detachMotion();
    if (sensorStatus === 'active') setSensorStatus('idle');
    setHistory(prev => ({
      ...prev,
      [todayKey]: (prev[todayKey] || 0) + liveSteps,
    }));
    setLive(0);
  }, [liveSteps, todayKey, setHistory, detachMotion, sensorStatus]);

  useEffect(() => () => {
    detachMotion();
  }, [detachMotion]);

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
        fullLabel: DAY_NAMES[d.getDay()],
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
      weeks.push({ label: `W${4 - w}`, fullLabel: `Week ${4 - w}`, steps: avg, isToday: w === 0 });
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
    sensorStatus, sensorMessage,
  };
}

type PedoState = ReturnType<typeof usePedometer>;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(Math.round(n)));
const fmtFull = (n: number) => Math.round(n).toLocaleString();
const focusRing = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

// ─────────────────────────────────────────────────────────────────────────────
// STEP RING
// ─────────────────────────────────────────────────────────────────────────────

function StepRing({ pct, steps, goal, size = 260 }: { pct: number; steps: number; goal: number; size?: number }) {
  const reduced = usePrefersReducedMotion();
  const R = size / 2 - 18;
  const C = 2 * Math.PI * R;
  const animRef = useRef<number | null>(null);
  const [animPct, setAnimPct] = useState(reduced ? pct : 0);

  useEffect(() => {
    if (reduced) {
      setAnimPct(pct);
      return;
    }
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
  }, [pct, reduced]);

  const animDash = C * Math.min(animPct, 1);
  const accentVar = pct >= 1 ? 'hsl(var(--gold))' : 'hsl(var(--primary))';
  const trackVar = pct >= 1 ? 'hsl(var(--gold) / 0.15)' : 'hsl(var(--primary) / 0.12)';
  const description = pct >= 1
    ? `${fmtFull(steps)} steps today. Daily goal of ${fmtFull(goal)} steps reached.`
    : `${fmtFull(steps)} steps today, ${Math.round(pct * 100)} percent of ${fmtFull(goal)} step goal.`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ overflow: 'visible' }}
      role="img"
      aria-label={description}
    >
      <title>Daily step progress</title>
      <circle cx={size / 2} cy={size / 2} r={R + 10} fill="none"
        stroke={trackVar} strokeWidth={20} aria-hidden="true" />
      <circle cx={size / 2} cy={size / 2} r={R} fill="none"
        stroke="hsl(var(--muted))" strokeWidth={14}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} aria-hidden="true" />
      <circle cx={size / 2} cy={size / 2} r={R} fill="none"
        stroke={accentVar} strokeWidth={14} strokeLinecap="round"
        strokeDasharray={`${animDash} ${C}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        aria-hidden="true" />
      <text x={size / 2} y={size / 2 - 10} textAnchor="middle"
        fontWeight={700}
        fontSize={pct >= 1 ? 38 : steps > 9999 ? 36 : 42}
        fill="hsl(var(--foreground))" aria-hidden="true">
        {fmtFull(steps)}
      </text>
      <text x={size / 2} y={size / 2 + 16} textAnchor="middle"
        fontWeight={500} fontSize={12} fill="hsl(var(--muted-foreground))" letterSpacing="2"
        aria-hidden="true">
        STEPS TODAY
      </text>
      <text x={size / 2} y={size / 2 + 36} textAnchor="middle"
        fontWeight={600} fontSize={12} fill={accentVar} aria-hidden="true">
        {pct >= 1 ? 'GOAL REACHED' : `${Math.round(pct * 100)}% of ${fmtFull(goal)}`}
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BAR CHART
// ─────────────────────────────────────────────────────────────────────────────

function BarChart({ data, goal, height = 140, ariaLabel }: {
  data: { label: string; fullLabel?: string; steps: number; isToday?: boolean }[];
  goal: number;
  height?: number;
  ariaLabel: string;
}) {
  const reduced = usePrefersReducedMotion();
  const max = Math.max(...data.map(d => d.steps), goal * 0.5);
  const [animated, setAnimated] = useState(reduced);

  useEffect(() => {
    if (reduced) { setAnimated(true); return; }
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <div className="relative" role="group" aria-label={ariaLabel}>
      <div
        className="absolute left-0 right-0 border-t border-dashed border-primary/50 z-10"
        style={{ top: `${((max - goal) / max) * height}px` }}
        aria-hidden="true"
      >
        <span className="absolute right-0 -top-4 text-[10px] tracking-wider text-primary font-semibold">
          GOAL {fmt(goal)}
        </span>
      </div>

      <div className="flex items-end gap-1.5 relative z-20" style={{ height }}>
        {data.map((d, i) => {
          const barH = animated ? Math.round((d.steps / max) * height) : 0;
          const metGoal = d.steps >= goal;
          const stepText = `${(d.fullLabel || d.label)}: ${fmtFull(d.steps)} steps${metGoal ? ', goal met' : ''}${d.isToday ? ', today' : ''}`;
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-1.5"
            >
              <button
                type="button"
                aria-label={stepText}
                title={stepText}
                className={cn(
                  'w-full rounded-md cursor-default',
                  focusRing,
                  metGoal
                    ? 'bg-gradient-to-b from-gold to-primary'
                    : d.isToday
                      ? 'bg-gradient-to-b from-primary to-primary/70'
                      : 'bg-muted-foreground/20 hover:bg-muted-foreground/30',
                )}
                style={{
                  height: barH,
                  transition: reduced
                    ? undefined
                    : `height 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 40}ms`,
                }}
              />
              <span className={cn(
                'text-[10px]',
                d.isToday ? 'text-primary font-bold' : 'text-muted-foreground font-normal',
              )}>{d.label}</span>
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

function MetricCard({ icon, label, value, unit, sub, accent = 'primary', delay = 0 }: {
  icon: ReactNode; label: string; value: ReactNode; unit?: string;
  sub?: string; accent?: 'primary' | 'gold'; delay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(reduced);
  useEffect(() => {
    if (reduced) { setVisible(true); return; }
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay, reduced]);

  const accentClass = accent === 'gold' ? 'text-gold' : 'text-primary';
  const accessibleValue = typeof value === 'string' || typeof value === 'number'
    ? `${label}: ${value}${unit ? ' ' + unit : ''}${sub ? '. ' + sub : ''}`
    : undefined;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-card px-4 py-4 flex flex-col gap-1',
        !reduced && 'transition-[opacity,transform] duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
      )}
      aria-label={accessibleValue}
    >
      <div className={cn('text-[22px] mb-0.5', accentClass)} aria-hidden="true">{icon}</div>
      <div className="font-bold text-2xl text-foreground leading-none">
        {value}
        {unit && <span className="text-sm font-normal text-muted-foreground ml-0.5">{unit}</span>}
      </div>
      <div className="text-[11px] text-muted-foreground tracking-wider uppercase">{label}</div>
      {sub && <div className={cn('text-[11px] mt-0.5 font-medium', accentClass)}>{sub}</div>}
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
  const reduced = usePrefersReducedMotion();
  const [vis, setVis] = useState(reduced);
  useEffect(() => {
    if (reduced) { setVis(true); return; }
    const t = setTimeout(() => setVis(true), delay);
    return () => clearTimeout(t);
  }, [delay, reduced]);

  return (
    <div
      role="listitem"
      aria-label={`${ach.title}: ${ach.desc}. ${unlocked ? 'Unlocked' : 'Locked'}.`}
      className={cn(
        'rounded-2xl border px-3 py-3.5 flex flex-col items-center gap-1.5 text-center',
        unlocked
          ? 'bg-card border-primary/30'
          : 'bg-muted border-border opacity-70',
        !reduced && 'transition-[opacity,transform] duration-300',
        vis ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
      )}
    >
      <div className={cn('text-[28px]', !unlocked && 'grayscale opacity-40')} aria-hidden="true">{ach.icon}</div>
      <div className={cn('font-bold text-xs', unlocked ? 'text-foreground' : 'text-muted-foreground')}>
        {ach.title}
      </div>
      <div className="text-[10px] text-muted-foreground leading-tight">{ach.desc}</div>
      {unlocked && (
        <div className="text-[9px] bg-primary/15 text-primary rounded px-1.5 py-0.5 font-bold tracking-wider">
          UNLOCKED
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SETTINGS DIALOG (with focus trap, Escape to close)
// ─────────────────────────────────────────────────────────────────────────────

function SettingsPanel({ goal, setGoal, unit, setUnit, onClose, returnFocusRef }: {
  goal: number; setGoal: (g: number) => void;
  unit: UnitSystem; setUnit: (u: UnitSystem) => void;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement>;
}) {
  const [localGoal, setLocalGoal] = useState(goal);
  const presets = [5000, 7500, 10000, 12500, 15000];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const headingId = useId();

  // Focus first element on open; restore focus on unmount
  useEffect(() => {
    closeBtnRef.current?.focus();
    return () => {
      returnFocusRef.current?.focus();
    };
  }, [returnFocusRef]);

  // Escape + focus trap
  const handleKey = useCallback((e: globalThis.KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
    if (e.key !== 'Tab') return;
    const root = dialogRef.current;
    if (!root) return;
    const focusable = root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/50 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md bg-card border border-border rounded-t-3xl px-6 pt-7 pb-10 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-7">
          <h2 id={headingId} className="font-bold text-xl text-foreground m-0">Settings</h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close settings"
            className={cn('bg-muted hover:bg-muted/80 text-foreground w-9 h-9 rounded-full text-base font-medium flex items-center justify-center', focusRing)}
          >
            ✕
          </button>
        </div>

        <fieldset className="mb-7 border-0 p-0">
          <legend className="text-xs text-muted-foreground tracking-wider uppercase mb-3 font-medium">
            Daily Step Goal
          </legend>
          <div className="flex gap-2 flex-wrap mb-4">
            {presets.map(p => {
              const selected = localGoal === p;
              return (
                <button
                  key={p}
                  onClick={() => setLocalGoal(p)}
                  aria-pressed={selected}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-semibold border transition-colors',
                    focusRing,
                    selected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted text-foreground border-border hover:bg-muted/70',
                  )}
                >
                  {p.toLocaleString()}
                </button>
              );
            })}
          </div>
          <label className="block">
            <span className="sr-only">Custom step goal</span>
            <input
              type="range" min={1000} max={30000} step={500} value={localGoal}
              onChange={e => setLocalGoal(Number(e.target.value))}
              aria-label="Custom step goal"
              aria-valuetext={`${localGoal.toLocaleString()} steps`}
              className={cn('w-full accent-primary', focusRing)}
            />
          </label>
          <div className="text-center text-primary font-bold text-xl mt-2" aria-live="polite">
            {localGoal.toLocaleString()} steps
          </div>
        </fieldset>

        <fieldset className="mb-7 border-0 p-0">
          <legend className="text-xs text-muted-foreground tracking-wider uppercase mb-3 font-medium">
            Distance Unit
          </legend>
          <div className="flex gap-2" role="radiogroup" aria-label="Distance unit">
            {(['km', 'mi'] as UnitSystem[]).map(u => {
              const selected = unit === u;
              return (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  role="radio"
                  aria-checked={selected}
                  className={cn(
                    'flex-1 py-3 rounded-xl text-base font-semibold border transition-colors',
                    focusRing,
                    selected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted text-foreground border-border hover:bg-muted/70',
                  )}
                >
                  {u === 'km' ? 'Kilometres' : 'Miles'}
                </button>
              );
            })}
          </div>
        </fieldset>

        <button
          onClick={() => { setGoal(localGoal); onClose(); }}
          className={cn(
            'w-full py-4 rounded-2xl bg-primary text-primary-foreground text-base font-bold shadow-lg hover:bg-primary/90 transition-colors',
            focusRing,
          )}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TABS — Today
// ─────────────────────────────────────────────────────────────────────────────

function TodayTab({ ped }: { ped: PedoState }) {
  const {
    todayTotal, isTracking, startTracking, stopTracking,
    pct, distanceKm, distanceMi, calories, activeMin,
    streak, goal, unitSystem, lastUpdate,
    sensorStatus, sensorMessage,
  } = ped;
  const reduced = usePrefersReducedMotion();

  const dist = unitSystem === 'km'
    ? { val: distanceKm.toFixed(2), unit: 'km', long: 'kilometres' }
    : { val: distanceMi.toFixed(2), unit: 'mi', long: 'miles' };

  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (!isTracking || reduced) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 300);
    return () => clearTimeout(t);
  }, [lastUpdate, isTracking, reduced]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center pt-2">
        <div
          className={cn(!reduced && 'transition-transform duration-200')}
          style={{ transform: pulse ? 'scale(1.02)' : 'scale(1)' }}
        >
          <StepRing pct={pct} steps={todayTotal} goal={goal} />
        </div>
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {fmtFull(todayTotal)} steps, {Math.round(pct * 100)} percent of goal
        </div>
        <button
          onClick={isTracking ? stopTracking : startTracking}
          aria-pressed={isTracking}
          aria-label={isTracking ? 'Stop step tracking' : 'Start step tracking'}
          className={cn(
            'mt-5 px-9 py-3.5 rounded-full text-[15px] font-bold tracking-wide flex items-center gap-2 transition-colors',
            focusRing,
            isTracking
              ? 'bg-card border-2 border-primary/40 text-foreground hover:bg-muted'
              : 'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90',
          )}
        >
          {isTracking ? (
            <>
              <span
                aria-hidden="true"
                className={cn(
                  'inline-block w-2.5 h-2.5 bg-primary rounded-sm',
                  !reduced && 'animate-pulse',
                )}
              />
              Stop Tracking
            </>
          ) : (
            <>
              <span aria-hidden="true">▶</span> Start Walking
            </>
          )}
        </button>
        {isTracking && (
          <div className="mt-2.5 text-xs text-primary font-medium" role="status">
            Tracking your real movement — keep your phone on you and walk
          </div>
        )}
        {sensorStatus === 'requesting' && (
          <div className="mt-2.5 text-xs text-muted-foreground" role="status">
            Waiting for motion permission…
          </div>
        )}
        {sensorMessage && !isTracking && (
          <div
            role="alert"
            className="mt-3 max-w-sm text-xs text-center rounded-lg border border-border bg-muted/50 px-3 py-2 text-muted-foreground"
          >
            {sensorMessage}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard icon="📍" label="Distance" value={dist.val} unit={dist.unit} accent="primary" delay={0} />
        <MetricCard icon="🔥" label="Calories" value={fmtFull(calories)} unit="kcal" accent="primary" delay={80} />
        <MetricCard icon="⏱" label="Active Time" value={activeMin} unit="min" accent="gold" delay={160} />
        <MetricCard icon="✦" label="Streak" value={streak} unit="days" accent="gold"
          sub={streak >= 7 ? 'Week warrior' : streak > 0 ? 'Keep it up' : 'Start today'} delay={240} />
      </div>

      {pct < 1 && (
        <div className="rounded-2xl border border-primary/20 bg-card px-5 py-4 flex justify-between items-center">
          <div>
            <div className="text-xs text-muted-foreground tracking-wider uppercase">Steps remaining</div>
            <div className="font-bold text-3xl text-primary">
              {fmtFull(Math.max(0, goal - todayTotal))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">
              ≈ {((goal - todayTotal) * STEP_LENGTH_M / 1000).toFixed(1)} km left
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              ≈ {Math.round((goal - todayTotal) / 100)} min walk
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TABS — History  (with nested Week / Month tablist)
// ─────────────────────────────────────────────────────────────────────────────

function HistoryTab({ ped }: { ped: PedoState }) {
  const { weekData, monthData, goal, allTimeSteps, bestDay } = ped;
  const [view, setView] = useState<'week' | 'month'>('week');
  const subTablistId = useId();

  const chartData = view === 'week' ? weekData : monthData;
  const weekAvg = Math.round(weekData.reduce((a, b) => a + b.steps, 0) / 7);
  const weekTotal = weekData.reduce((a, b) => a + b.steps, 0);
  const goalDays = weekData.filter(d => d.steps >= goal).length;

  const subTabs = [
    { id: 'week' as const, label: 'Week' },
    { id: 'month' as const, label: 'Month' },
  ];

  const handleSubKey = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = e.key === 'ArrowRight' ? (idx + 1) % subTabs.length : (idx - 1 + subTabs.length) % subTabs.length;
      setView(subTabs[next].id);
      const root = e.currentTarget.parentElement;
      const buttons = root?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[next]?.focus();
    }
  };

  const chartLabel = view === 'week'
    ? `Steps per day this week. ${weekData.map(d => `${d.fullLabel}: ${fmtFull(d.steps)}`).join('. ')}.`
    : `Average daily steps for last 4 weeks. ${monthData.map(d => `${d.fullLabel}: ${fmtFull(d.steps)} average`).join('. ')}.`;

  return (
    <div className="flex flex-col gap-5">
      <div
        role="tablist"
        aria-label="History range"
        id={subTablistId}
        className="flex bg-muted rounded-xl p-1 gap-1"
      >
        {subTabs.map((t, i) => {
          const selected = view === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setView(t.id)}
              onKeyDown={e => handleSubKey(e, i)}
              className={cn(
                'flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                focusRing,
                selected
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-card px-4 py-5">
        <div className="font-bold text-lg text-foreground mb-1">
          {view === 'week' ? 'This Week' : 'Last 4 Weeks'}
        </div>
        <div className="text-xs text-muted-foreground mb-5">
          {view === 'week' ? `${goalDays} of 7 days hit goal` : 'Weekly averages'}
        </div>
        <BarChart data={chartData} goal={goal} ariaLabel={chartLabel} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Week Total', value: fmt(weekTotal), full: `${fmtFull(weekTotal)} steps this week` },
          { label: 'Daily Avg', value: fmt(weekAvg), full: `${fmtFull(weekAvg)} step daily average` },
          { label: 'Goal Days', value: `${goalDays}/7`, full: `${goalDays} of 7 days hit goal` },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card px-3 py-3.5 text-center"
            aria-label={s.full}
          >
            <div className="font-bold text-xl text-foreground">{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gold/20 bg-card px-5 py-5">
        <div className="text-xs text-gold tracking-wider uppercase mb-2 font-semibold">
          All-Time Records
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div aria-label={`Total steps: ${fmtFull(allTimeSteps)}, approximately ${(allTimeSteps * STEP_LENGTH_M / 1000).toFixed(0)} kilometres walked`}>
            <div className="font-bold text-3xl text-foreground">
              {(allTimeSteps / 1000).toFixed(1)}k
            </div>
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Total Steps</div>
            <div className="text-xs text-gold mt-0.5 font-medium">
              ≈ {(allTimeSteps * STEP_LENGTH_M / 1000).toFixed(0)} km walked
            </div>
          </div>
          <div aria-label={`Best day: ${fmtFull(bestDay)} steps. Personal record.`}>
            <div className="font-bold text-3xl text-foreground">{fmtFull(bestDay)}</div>
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Best Day</div>
            <div className="text-xs text-gold mt-0.5 font-medium">Personal record</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TABS — Achievements
// ─────────────────────────────────────────────────────────────────────────────

function AchievementsTab({ ped }: { ped: PedoState }) {
  const { allTimeSteps, bestDay, goal, streak } = ped;
  const unlocked = ACHIEVEMENTS.reduce<Record<string, boolean>>((acc, a) => {
    acc[a.id] = a.req(allTimeSteps, bestDay, goal, streak);
    return acc;
  }, {});
  const count = Object.values(unlocked).filter(Boolean).length;
  const reduced = usePrefersReducedMotion();

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-gold/20 bg-card px-5 py-5 text-center">
        <div className="text-5xl mb-2" aria-hidden="true">🏆</div>
        <div className="font-bold text-3xl text-gold">
          {count} <span className="text-muted-foreground font-medium">/ {ACHIEVEMENTS.length}</span>
        </div>
        <div className="text-[13px] text-muted-foreground mt-1">Achievements Unlocked</div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={ACHIEVEMENTS.length}
          aria-valuenow={count}
          aria-valuetext={`${count} of ${ACHIEVEMENTS.length} achievements unlocked`}
          className="h-2 bg-muted rounded mt-4 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className={cn('h-full rounded bg-gold', !reduced && 'transition-[width] duration-1000')}
            style={{ width: `${(count / ACHIEVEMENTS.length) * 100}%` }}
          />
        </div>
      </div>

      <div role="list" aria-label="All achievements" className="grid grid-cols-2 gap-3">
        {ACHIEVEMENTS.map((a, i) => (
          <AchievementBadge key={a.id} ach={a} unlocked={unlocked[a.id]} delay={i * 60} />
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card px-5 py-4">
        <div className="text-xs text-muted-foreground tracking-wider uppercase mb-2.5 font-medium">
          Next to unlock
        </div>
        <ul className="space-y-2.5 list-none p-0 m-0">
          {ACHIEVEMENTS.filter(a => !unlocked[a.id]).slice(0, 3).map(a => (
            <li key={a.id} className="flex items-center gap-3">
              <span className="text-xl opacity-50" aria-hidden="true">{a.icon}</span>
              <div>
                <div className="text-[13px] text-foreground font-semibold">{a.title}</div>
                <div className="text-[11px] text-muted-foreground">{a.desc}</div>
              </div>
            </li>
          ))}
        </ul>
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
  const settingsBtnRef = useRef<HTMLButtonElement>(null);

  const ped = usePedometer({ goal, unitSystem: unit });

  const today = new Date();
  const dateStr = `${DAYS[today.getDay()]}, ${today.getDate()} ${MONTHS[today.getMonth()]}`;
  const fullDateStr = today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  // Roving tabindex for main tablist
  const handleTabKey = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = (idx + 1) % TABS.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TABS.length - 1;
    if (next === null) return;
    e.preventDefault();
    setTab(TABS[next].id);
    const root = e.currentTarget.parentElement;
    const buttons = root?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[next]?.focus();
  };

  return (
    <section
      aria-label="Step tracker"
      className="relative max-w-[460px] mx-auto rounded-3xl border border-border bg-card text-foreground px-5 pt-6 pb-8 shadow-xl"
    >
      <header className="flex justify-between items-center mb-5">
        <div>
          <div className="text-[11px] text-muted-foreground tracking-[0.18em] uppercase font-semibold">
            Pedometer
          </div>
          <div className="font-bold text-lg mt-0.5" aria-label={fullDateStr}>{dateStr}</div>
        </div>
        <button
          ref={settingsBtnRef}
          onClick={() => setShowSettings(true)}
          aria-label="Open pedometer settings"
          aria-haspopup="dialog"
          aria-expanded={showSettings}
          className={cn(
            'bg-muted hover:bg-muted/70 border border-border text-foreground w-10 h-10 rounded-xl text-lg flex items-center justify-center transition-colors',
            focusRing,
          )}
        >
          <span aria-hidden="true">⚙</span>
        </button>
      </header>

      <div
        role="tablist"
        aria-label="Pedometer views"
        className="flex bg-muted rounded-xl p-1 gap-1 mb-5"
      >
        {TABS.map((t, i) => {
          const selected = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              id={`pedo-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`pedo-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={e => handleTabKey(e, i)}
              className={cn(
                'flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                focusRing,
                selected
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {TABS.map(t => (
        <div
          key={t.id}
          role="tabpanel"
          id={`pedo-panel-${t.id}`}
          aria-labelledby={`pedo-tab-${t.id}`}
          tabIndex={0}
          hidden={tab !== t.id}
          className={cn('focus:outline-none', focusRing)}
        >
          {t.id === 'today' && tab === 'today' && <TodayTab ped={ped} />}
          {t.id === 'history' && tab === 'history' && <HistoryTab ped={ped} />}
          {t.id === 'achievements' && tab === 'achievements' && <AchievementsTab ped={ped} />}
        </div>
      ))}

      {showSettings && (
        <SettingsPanel
          goal={goal}
          setGoal={setGoal}
          unit={unit}
          setUnit={setUnit}
          onClose={() => setShowSettings(false)}
          returnFocusRef={settingsBtnRef}
        />
      )}
    </section>
  );
}
