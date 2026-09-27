/**
 * Pure helpers for a guide's clinical-review fields (`reviewStatus`,
 * `last_reviewed`) in src/content/blog/posts/<slug>.json. Used by
 * scripts/mark-blog-reviewed.mjs and covered by Vitest.
 *
 * Key order is preserved; new keys are placed right after `updated_at`
 * (`last_reviewed` first, then `reviewStatus`) so diffs stay small.
 */

/** Today's date (YYYY-MM-DD) in the charity's timezone. */
export function todayInLondon(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function withFields(post, fields) {
  const out = {};
  const pending = { ...fields };
  for (const [key, value] of Object.entries(post)) {
    if (key in pending) {
      out[key] = pending[key];
      delete pending[key];
    } else {
      out[key] = value;
    }
    if (key === "updated_at") {
      for (const k of ["last_reviewed", "reviewStatus"]) {
        if (k in pending && !(k in post)) {
          out[k] = pending[k];
          delete pending[k];
        }
      }
    }
  }
  return { ...out, ...pending };
}

/** Flag a guide as awaiting clinical review. */
export function markPostPending(post) {
  return withFields(post, { reviewStatus: "pending" });
}

/** Flip a guide to reviewed and stamp `last_reviewed` with `date`. */
export function markPostReviewed(post, date = todayInLondon()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`invalid review date "${date}"`);
  if (post.date && date < post.date) {
    throw new Error(`${post.slug}: review date ${date} is before publish date ${post.date}`);
  }
  return withFields(post, { last_reviewed: date, reviewStatus: "reviewed" });
}

export function serializePost(post) {
  return `${JSON.stringify(post, null, 2)}\n`;
}
