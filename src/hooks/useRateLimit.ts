import { useRef, useCallback } from "react";

interface RateLimitOptions {
  maxAttempts: number;
  windowMs: number;
}

export function useRateLimit({ maxAttempts = 5, windowMs = 60000 }: RateLimitOptions) {
  const attemptsRef = useRef<number[]>([]);

  const checkLimit = useCallback((): boolean => {
    const now = Date.now();
    attemptsRef.current = attemptsRef.current.filter((t) => now - t < windowMs);
    if (attemptsRef.current.length >= maxAttempts) {
      return false; // rate limited
    }
    attemptsRef.current.push(now);
    return true; // allowed
  }, [maxAttempts, windowMs]);

  const remaining = useCallback((): number => {
    const now = Date.now();
    attemptsRef.current = attemptsRef.current.filter((t) => now - t < windowMs);
    return Math.max(0, maxAttempts - attemptsRef.current.length);
  }, [maxAttempts, windowMs]);

  return { checkLimit, remaining };
}
