-- Ensure unsubscribe_token and confirmation_token are only readable by service_role.
REVOKE SELECT (unsubscribe_token, confirmation_token) ON public.newsletter_subscriptions FROM anon, authenticated, public;
GRANT SELECT (unsubscribe_token, confirmation_token) ON public.newsletter_subscriptions TO service_role;