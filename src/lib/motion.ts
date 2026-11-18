/**
 * Whether decorative motion may run in this browser. False when the user
 * asks for reduced motion and while the build-time prerenderer is taking its
 * snapshot, so static/prerendered HTML never ships content in a hidden state.
 */
export function motionAllowed(): boolean {
  if (typeof window === "undefined") return false;
  if ("__PRERENDER_INJECTED__" in window) return false;
  if (/LWAPrerenderer/i.test(navigator.userAgent)) return false;
  return !(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
}
