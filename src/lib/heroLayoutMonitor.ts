/**
 * Lightweight client-side monitoring for landing-page hero layout issues.
 *
 * Emits structured `console` events (and `window.dispatchEvent` for external
 * listeners / future analytics hooks) on hero mount, and watches for:
 *  - headline text clipping (scrollWidth > clientWidth, or scrollHeight > clientHeight)
 *  - unusual viewport measurements (zero/negative dims, extreme DPR, sub-280 width)
 *  - hero image render failure
 *
 * Designed to be cheap: one ResizeObserver, throttled checks, no re-renders.
 */

export type HeroMonitorEvent =
  | {
      type: 'hero:render';
      viewport: { width: number; height: number; dpr: number };
      timestamp: number;
    }
  | {
      type: 'hero:alert';
      reason:
        | 'headline-clipped-horizontal'
        | 'headline-clipped-vertical'
        | 'viewport-zero'
        | 'viewport-too-narrow'
        | 'viewport-extreme-dpr'
        | 'hero-image-failed';
      detail: Record<string, number | string | boolean>;
      timestamp: number;
    };

const EVENT_NAME = 'lwa:hero-monitor';
const MIN_REASONABLE_WIDTH = 280;
const MAX_REASONABLE_DPR = 5;

const emit = (event: HeroMonitorEvent) => {
  if (typeof window === 'undefined') return;
  if (event.type === 'hero:alert') {
    // Use console.warn so it surfaces in monitoring dashboards / Sentry breadcrumbs.
     
    console.warn('[hero-monitor]', event.reason, event.detail);
  } else {
     
    console.info('[hero-monitor]', event.type, event.viewport);
  }
  try {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: event }));
  } catch {
    /* no-op */
  }
};

const getViewport = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
  dpr: window.devicePixelRatio || 1,
});

export const reportHeroRender = () => {
  if (typeof window === 'undefined') return;
  const vp = getViewport();
  emit({ type: 'hero:render', viewport: vp, timestamp: Date.now() });

  if (vp.width === 0 || vp.height === 0) {
    emit({
      type: 'hero:alert',
      reason: 'viewport-zero',
      detail: vp,
      timestamp: Date.now(),
    });
  } else if (vp.width < MIN_REASONABLE_WIDTH) {
    emit({
      type: 'hero:alert',
      reason: 'viewport-too-narrow',
      detail: vp,
      timestamp: Date.now(),
    });
  }
  if (vp.dpr > MAX_REASONABLE_DPR) {
    emit({
      type: 'hero:alert',
      reason: 'viewport-extreme-dpr',
      detail: vp,
      timestamp: Date.now(),
    });
  }
};

export const reportHeroImageFailure = (src: string) => {
  emit({
    type: 'hero:alert',
    reason: 'hero-image-failed',
    detail: { src },
    timestamp: Date.now(),
  });
};

/**
 * Observe a headline element for clipping. Returns a cleanup function.
 * Tolerance accounts for sub-pixel rounding.
 */
export const observeHeadlineClipping = (
  element: HTMLElement,
  tolerance = 2,
): (() => void) => {
  if (typeof window === 'undefined' || !('ResizeObserver' in window)) {
    return () => undefined;
  }

  let lastReportedKey = '';

  const check = () => {
    const horizontalOverflow = element.scrollWidth - element.clientWidth;
    const verticalOverflow = element.scrollHeight - element.clientHeight;

    if (horizontalOverflow > tolerance) {
      const key = `h:${horizontalOverflow}`;
      if (key !== lastReportedKey) {
        lastReportedKey = key;
        emit({
          type: 'hero:alert',
          reason: 'headline-clipped-horizontal',
          detail: {
            scrollWidth: element.scrollWidth,
            clientWidth: element.clientWidth,
            overflow: horizontalOverflow,
            viewportWidth: window.innerWidth,
          },
          timestamp: Date.now(),
        });
      }
    } else if (verticalOverflow > tolerance) {
      const key = `v:${verticalOverflow}`;
      if (key !== lastReportedKey) {
        lastReportedKey = key;
        emit({
          type: 'hero:alert',
          reason: 'headline-clipped-vertical',
          detail: {
            scrollHeight: element.scrollHeight,
            clientHeight: element.clientHeight,
            overflow: verticalOverflow,
            viewportWidth: window.innerWidth,
          },
          timestamp: Date.now(),
        });
      }
    }
  };

  const ro = new ResizeObserver(() => {
    // Defer to next frame so layout has settled.
    window.requestAnimationFrame(check);
  });
  ro.observe(element);
  // Initial check after first paint.
  window.requestAnimationFrame(check);

  return () => ro.disconnect();
};

export const HERO_MONITOR_EVENT = EVENT_NAME;
