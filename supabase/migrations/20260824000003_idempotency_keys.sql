-- Idempotency Keys — Prevent duplicate submissions for payments, forms, transactions
-- Ensures that if a request is retried (network timeout, etc), duplicate isn't processed

CREATE TABLE public.idempotency_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    method TEXT NOT NULL,
    path TEXT NOT NULL,
    request_body JSONB,
    response_status INT,
    response_body JSONB,
    actor_id UUID,
    actor_email TEXT,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now() + INTERVAL '24 hours'
);

-- Indexes
CREATE INDEX idx_idempotency_key ON public.idempotency_keys(key);
CREATE INDEX idx_idempotency_expires_at ON public.idempotency_keys(expires_at);
CREATE INDEX idx_idempotency_created_at ON public.idempotency_keys(created_at DESC);

-- Enable RLS
ALTER TABLE public.idempotency_keys ENABLE ROW LEVEL SECURITY;

-- Only service role can manage idempotency keys
CREATE POLICY "Service role manages idempotency" ON public.idempotency_keys
    FOR ALL USING (auth.role() = 'service_role');

-- Function to check if request already processed
CREATE OR REPLACE FUNCTION public.check_idempotency(
    p_key TEXT,
    p_method TEXT,
    p_path TEXT
)
RETURNS TABLE (
    already_processed BOOLEAN,
    response_status INT,
    response_body JSONB
) AS $$
DECLARE
    v_record RECORD;
BEGIN
    SELECT * INTO v_record
    FROM public.idempotency_keys
    WHERE key = p_key
        AND method = p_method
        AND path = p_path
        AND expires_at > now();

    IF v_record IS NOT NULL THEN
        RETURN QUERY SELECT true, v_record.response_status, v_record.response_body;
    ELSE
        RETURN QUERY SELECT false, NULL::INT, NULL::JSONB;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to store idempotency result
CREATE OR REPLACE FUNCTION public.store_idempotency_result(
    p_key TEXT,
    p_method TEXT,
    p_path TEXT,
    p_request_body JSONB,
    p_response_status INT,
    p_response_body JSONB,
    p_actor_id UUID DEFAULT NULL,
    p_actor_email TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.idempotency_keys (
        key,
        method,
        path,
        request_body,
        response_status,
        response_body,
        actor_id,
        actor_email,
        ip_address,
        expires_at
    ) VALUES (
        p_key,
        p_method,
        p_path,
        p_request_body,
        p_response_status,
        p_response_body,
        p_actor_id,
        p_actor_email,
        inet_client_addr(),
        now() + INTERVAL '24 hours'
    )
    ON CONFLICT (key) DO UPDATE SET
        response_status = EXCLUDED.response_status,
        response_body = EXCLUDED.response_body,
        expires_at = EXCLUDED.expires_at;
END;
$$ LANGUAGE plpgsql;

-- Cleanup function for expired keys
CREATE OR REPLACE FUNCTION public.cleanup_expired_idempotency_keys()
RETURNS void AS $$
BEGIN
    DELETE FROM public.idempotency_keys
    WHERE expires_at < now();

    RAISE NOTICE 'Cleaned up expired idempotency keys';
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup: daily at 2 AM UTC
-- SELECT cron.schedule('cleanup_idempotency_keys', '0 2 * * *', 'SELECT public.cleanup_expired_idempotency_keys()');
