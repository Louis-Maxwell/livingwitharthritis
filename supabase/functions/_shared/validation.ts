// Zod-based input validation helpers for edge functions.
//
// Usage:
//   import { z } from "../_shared/validation.ts";
//   const Schema = z.object({ name: z.string().trim().min(1).max(100) });
//   const parsed = parseWithSchema(Schema, body, req, requestId);
//   if (!parsed.ok) return parsed.response;
//   const { name } = parsed.data;

import { z, ZodError, ZodSchema } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import { errJson } from "./http.ts";

export { z, ZodError };
export type { ZodSchema };

/**
 * Parse `data` with `schema`. On success returns the typed value.
 * On failure returns a 400 response with `validation_failed` envelope and
 * field-level errors keyed by dotted path (e.g. `donor.email`).
 */
export function parseWithSchema<T>(
  schema: ZodSchema<T>,
  data: unknown,
  req: Request,
  requestId: string,
): { ok: true; data: T } | { ok: false; response: Response } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { ok: true, data: result.data };
  }

  const fields: Record<string, string[]> = {};
  for (const issue of result.error.issues) {
    const path = issue.path.length > 0 ? issue.path.join(".") : "_root";
    if (!fields[path]) fields[path] = [];
    fields[path].push(issue.message);
  }

  return {
    ok: false,
    response: errJson(req, {
      code: "validation_failed",
      message: "One or more fields are invalid.",
      fields,
      requestId,
    }),
  };
}

// ---------- Reusable primitives ----------

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "Email is required")
  .max(255, "Email must be 255 characters or fewer")
  .email("Invalid email address");

export const phoneSchema = z
  .string()
  .trim()
  .min(3, "Phone is too short")
  .max(20, "Phone must be 20 characters or fewer")
  // Allow digits, spaces, +, -, (, )
  .regex(/^[0-9+\-\s()]+$/, "Phone contains invalid characters");

export const shortText = (max = 200) =>
  z.string().trim().min(1, "This field is required").max(max, `Must be ${max} characters or fewer`);

export const longText = (max = 2000) =>
  z.string().trim().min(1, "This field is required").max(max, `Must be ${max} characters or fewer`);

export const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (use YYYY-MM-DD)");
