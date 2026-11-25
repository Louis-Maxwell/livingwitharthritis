/** Use recorded substantive changes, not inherited clinical review defaults or a build clock. */
export function blogContentLastmod(post, contentChange) {
  const dates = [post?.date, post?.updated_at, contentChange]
    .filter((value) => typeof value === 'string')
    .map((value) => value.slice(0, 10))
    .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value));
  return dates.sort().at(-1);
}
