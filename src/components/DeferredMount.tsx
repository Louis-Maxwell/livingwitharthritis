import { useEffect, useState, type ReactNode } from "react";

/**
 * Defers mounting children until the browser is idle (or after a timeout fallback).
 * Used to keep non-critical widgets out of the critical render path.
 */
export const DeferredMount = ({ children, timeout = 2500 }: { children: ReactNode; timeout?: number }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const mount = () => { if (!cancelled) setReady(true); };

    const win = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (typeof win.requestIdleCallback === "function") {
      win.requestIdleCallback(mount, { timeout });
    } else {
      const t = window.setTimeout(mount, timeout);
      return () => { cancelled = true; window.clearTimeout(t); };
    }
    return () => { cancelled = true; };
  }, [timeout]);

  if (!ready) return null;
  return <>{children}</>;
};

export default DeferredMount;
