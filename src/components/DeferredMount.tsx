import { afterPageLoad } from "@/lib/afterPageLoad";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Defers mounting children until the browser is idle (or after a timeout fallback).
 * Used to keep non-critical widgets out of the critical render path.
 */
export const DeferredMount = ({ children, timeout = 2500 }: { children: ReactNode; timeout?: number }) => {
  const [ready, setReady] = useState(false);

  // Waits for the page load event, then an idle moment, so deferred
  // widgets never delay the route's own content from painting.
  useEffect(() => afterPageLoad(() => setReady(true), timeout), [timeout]);

  if (!ready) return null;
  return <>{children}</>;
};

export default DeferredMount;
