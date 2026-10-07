const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as
  | string
  | undefined;

export function PaymentTestModeBanner() {
  if (!clientToken?.startsWith('pk_test_')) return null;
  return (
    <div className="w-full rounded-lg bg-muted px-4 py-2 text-center text-xs text-foreground">
      Test mode: no real money is taken. Use card 4242 4242 4242 4242.
    </div>
  );
}
