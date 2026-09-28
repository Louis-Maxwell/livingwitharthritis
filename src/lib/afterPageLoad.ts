type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/**
 * Runs `callback` once the page has loaded and the main thread is idle, so
 * optional work (banners, widgets, measurement, probes) never competes with
 * the page's own content for bandwidth or paint. Returns a cancel function.
 */
export function afterPageLoad(callback: () => void, idleTimeout = 2500): () => void {
  const win = window as IdleWindow;
  let cancelled = false;
  let idleId: number | undefined;
  let timerId: number | undefined;

  const run = () => {
    if (!cancelled) callback();
  };
  const schedule = () => {
    if (cancelled) return;
    if (typeof win.requestIdleCallback === "function") idleId = win.requestIdleCallback(run, { timeout: idleTimeout });
    else timerId = window.setTimeout(run, Math.min(idleTimeout, 1200));
  };

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });

  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
    if (idleId !== undefined && typeof win.cancelIdleCallback === "function") win.cancelIdleCallback(idleId);
    if (timerId !== undefined) window.clearTimeout(timerId);
  };
}
