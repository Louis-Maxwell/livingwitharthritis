/**
 * Timeout utilities for edge functions.
 *
 * Prevents hung requests from external APIs, slow database operations,
 * and expensive computations from consuming worker slots indefinitely.
 */

/**
 * Execute a promise with a timeout. Rejects if the promise doesn't settle within timeoutMs.
 * @param promise The promise to execute
 * @param timeoutMs Timeout in milliseconds
 * @param label Optional label for error messages (e.g., "embedQuery", "send-email")
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  label: string = "operation"
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(`${label} timed out after ${timeoutMs}ms`)),
        timeoutMs
      )
    ),
  ]);
}

/**
 * Create an AbortSignal that times out after timeoutMs.
 * Use with fetch() or other AbortSignal-aware APIs.
 * @example
 * const signal = timeoutSignal(5000);
 * const resp = await fetch(url, { signal });
 */
export function timeoutSignal(timeoutMs: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
}

/**
 * Safe JSON.parse with timeout protection.
 * Prevents pathological regex or parsing operations from hanging.
 */
export async function parseJsonWithTimeout<T>(
  text: string,
  timeoutMs: number = 2000
): Promise<T> {
  return withTimeout(
    Promise.resolve(JSON.parse(text) as T),
    timeoutMs,
    "JSON.parse"
  );
}
