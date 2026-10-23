/** Today's date (YYYY-MM-DD) in the charity's timezone. */
export function todayInLondon(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
