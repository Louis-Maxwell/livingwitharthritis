// Mock for https://esm.sh/stripe@18.5.0 used by smoke tests.
// Verifies signatures by simply parsing the body as JSON.

class StripeMock {
  constructor(_key: string, _opts?: unknown) {}
  webhooks = {
    constructEventAsync: async (body: string, _sig: string, _secret: string) => {
      return JSON.parse(body);
    },
  };
}

export default StripeMock;
export type Stripe = unknown;
// Some code uses `Stripe.Event` / `Stripe.Checkout.Session` as types only;
// type-only references are erased at runtime so no shims needed here.
