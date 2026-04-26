// Mock for npm:@supabase/supabase-js@2 used by edge function smoke tests.
// Records calls and returns canned successful responses so handlers can run
// end-to-end without a real backend.

type Call = { kind: string; args: unknown[] };
const calls: Call[] = [];
export const __calls = calls;

class QueryBuilder {
  constructor(private table: string) {}
  insert(row: unknown) {
    calls.push({ kind: `from(${this.table}).insert`, args: [row] });
    return this;
  }
  select(_cols?: string) {
    return this;
  }
  single() {
    return Promise.resolve({ data: { id: "smoke-donation-id" }, error: null });
  }
  then<TResult1 = unknown, TResult2 = never>(
    onfulfilled?: (value: { data: unknown; error: null }) => TResult1 | PromiseLike<TResult1>,
    onrejected?: (reason: unknown) => TResult2 | PromiseLike<TResult2>,
  ) {
    return Promise.resolve({ data: [], error: null }).then(onfulfilled, onrejected);
  }
}

class SupabaseClient {
  from(table: string) {
    calls.push({ kind: `from(${table})`, args: [] });
    return new QueryBuilder(table);
  }
  rpc(name: string, params?: unknown) {
    calls.push({ kind: `rpc(${name})`, args: [params] });
    // Return an empty batch so process-email-queue exits cleanly.
    if (name === "read_email_batch") {
      return Promise.resolve({ data: [], error: null });
    }
    if (name === "delete_email" || name === "move_to_dlq") {
      return Promise.resolve({ data: true, error: null });
    }
    return Promise.resolve({ data: null, error: null });
  }
  auth = {
    getUser: () =>
      Promise.resolve({ data: { user: { id: "smoke-user" } }, error: null }),
  };
}

export function createClient(_url: string, _key: string, _opts?: unknown) {
  calls.push({ kind: "createClient", args: [] });
  return new SupabaseClient();
}

export type { SupabaseClient };
