const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;

export function PaymentTestModeBanner() {
  if (!clientToken?.startsWith('pk_test_')) return null;
  return (
    <div className="w-full bg-accent px-4 py-2 text-center text-sm text-foreground">
      Test mode: no real money is taken. Use card 4242 4242 4242 4242.
    </div>
  );
}
