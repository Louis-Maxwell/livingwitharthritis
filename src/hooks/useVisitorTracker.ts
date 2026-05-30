import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "lwa_visitor_tracked";

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function track() {
      const alreadyTracked = sessionStorage.getItem(SESSION_KEY);

      if (!alreadyTracked) {
        // New visit – increment and get updated count
        const { data, error } = await supabase.rpc("increment_visitor_count");
        if (!error && data && !cancelled) {
          setCount(Number(data));
          sessionStorage.setItem(SESSION_KEY, "1");
          return;
        }
      }

      // Already tracked this session or increment failed – just read
      const { data: rows } = await supabase
        .from("site_visitor_count")
        .select("total_count")
        .eq("id", 1)
        .single();

      if (rows && !cancelled) {
        setCount(Number(rows.total_count));
      }
    }

    // Defer to idle so the Supabase chunk + RPC stay off the LCP critical path.
    const schedule =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? (cb: () => void) =>
            (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
              .requestIdleCallback(cb, { timeout: 3000 })
        : (cb: () => void) => window.setTimeout(cb, 1500);
    const handle = schedule(() => { if (!cancelled) track(); });

    return () => {
      cancelled = true;
      if (typeof window !== "undefined" && "cancelIdleCallback" in window && typeof handle === "number") {
        (window as Window & { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(handle);
      }
    };
  }, []);

  return count;
}
