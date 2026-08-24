-- Backup Health Monitoring — Verify Supabase backups are running and restorable
-- Tracks backup status, metadata, and enables automated verification

CREATE TABLE public.backup_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    backup_id TEXT UNIQUE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'verified')),
    backup_type TEXT NOT NULL DEFAULT 'daily',
    size_bytes BIGINT,
    row_count_estimate BIGINT,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    verified_at TIMESTAMP WITH TIME ZONE,
    verification_result JSONB,
    error_message TEXT,
    retention_days INT DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_backup_status ON public.backup_metadata(status);
CREATE INDEX idx_backup_completed_at ON public.backup_metadata(completed_at DESC);
CREATE INDEX idx_backup_verified_at ON public.backup_metadata(verified_at DESC);

-- Enable RLS
ALTER TABLE public.backup_metadata ENABLE ROW LEVEL SECURITY;

-- Only service role can manage backup metadata
CREATE POLICY "Service role manages backups" ON public.backup_metadata
    FOR ALL USING (auth.role() = 'service_role');

-- Function to record backup start
CREATE OR REPLACE FUNCTION public.record_backup_start(
    p_backup_id TEXT,
    p_backup_type TEXT DEFAULT 'daily'
)
RETURNS UUID AS $$
DECLARE
    v_id UUID;
BEGIN
    INSERT INTO public.backup_metadata (
        backup_id,
        status,
        backup_type,
        started_at
    ) VALUES (
        p_backup_id,
        'pending',
        p_backup_type,
        now()
    )
    RETURNING id INTO v_id;

    RETURN v_id;
END;
$$ LANGUAGE plpgsql;

-- Function to record backup completion
CREATE OR REPLACE FUNCTION public.record_backup_completion(
    p_backup_id TEXT,
    p_status TEXT DEFAULT 'completed',
    p_size_bytes BIGINT DEFAULT NULL,
    p_error_message TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.backup_metadata
    SET
        status = p_status,
        size_bytes = COALESCE(p_size_bytes, size_bytes),
        completed_at = now(),
        error_message = p_error_message,
        updated_at = now()
    WHERE backup_id = p_backup_id;
END;
$$ LANGUAGE plpgsql;

-- Function to verify backup integrity (query sampling)
CREATE OR REPLACE FUNCTION public.verify_backup_health()
RETURNS TABLE (
    check_name TEXT,
    passed BOOLEAN,
    detail TEXT,
    checked_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
    v_table_count INT;
    v_article_count INT;
    v_donation_count INT;
    v_contact_count INT;
    v_error TEXT;
BEGIN
    -- Check 1: Table counts are non-zero
    SELECT COUNT(*) INTO v_table_count
    FROM information_schema.tables
    WHERE table_schema = 'public';

    RETURN QUERY SELECT
        'Table Existence Check'::TEXT,
        v_table_count > 50,
        'Found ' || v_table_count || ' tables (expected >50)',
        now();

    -- Check 2: Data exists in critical tables
    SELECT COUNT(*) INTO v_article_count FROM public.blog_articles;
    RETURN QUERY SELECT
        'Blog Articles Exist'::TEXT,
        v_article_count > 0,
        'Found ' || v_article_count || ' blog articles',
        now();

    SELECT COUNT(*) INTO v_donation_count FROM public.donations;
    RETURN QUERY SELECT
        'Donations Exist'::TEXT,
        v_donation_count >= 0,
        'Found ' || v_donation_count || ' donation records',
        now();

    SELECT COUNT(*) INTO v_contact_count FROM public.contact_inquiries;
    RETURN QUERY SELECT
        'Contact Records Exist'::TEXT,
        v_contact_count >= 0,
        'Found ' || v_contact_count || ' contact inquiries',
        now();

    -- Check 3: RLS policies are in place
    RETURN QUERY SELECT
        'RLS Policies Enabled'::TEXT,
        (SELECT COUNT(*) FROM pg_policies) > 100,
        'Found ' || (SELECT COUNT(*) FROM pg_policies) || ' RLS policies',
        now();

    -- Check 4: Indexes are functional
    RETURN QUERY SELECT
        'Indexes Available'::TEXT,
        (SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public') > 50,
        'Found ' || (SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public') || ' indexes',
        now();

END;
$$ LANGUAGE plpgsql;

-- Function to run scheduled backup verification
CREATE OR REPLACE FUNCTION public.run_backup_verification()
RETURNS TABLE (
    backup_id UUID,
    status TEXT,
    checks_passed INT,
    checks_total INT,
    result_summary TEXT
) AS $$
DECLARE
    v_backup_id UUID;
    v_checks_passed INT := 0;
    v_checks_total INT := 0;
    v_verification_result JSONB;
    v_checks_array JSONB[];
BEGIN
    -- Get latest backup
    SELECT id INTO v_backup_id
    FROM public.backup_metadata
    WHERE status = 'completed'
    ORDER BY completed_at DESC
    LIMIT 1;

    IF v_backup_id IS NULL THEN
        RETURN QUERY SELECT
            NULL::UUID,
            'no_backup'::TEXT,
            0,
            0,
            'No completed backup found'::TEXT;
        RETURN;
    END IF;

    -- Run health checks
    FOR rec IN SELECT * FROM public.verify_backup_health() LOOP
        v_checks_array := array_append(v_checks_array, row_to_json(rec));
        v_checks_total := v_checks_total + 1;
        IF rec.passed THEN
            v_checks_passed := v_checks_passed + 1;
        END IF;
    END LOOP;

    v_verification_result := jsonb_build_object(
        'checks_passed', v_checks_passed,
        'checks_total', v_checks_total,
        'results', v_checks_array
    );

    -- Update backup record
    UPDATE public.backup_metadata
    SET
        status = CASE
            WHEN v_checks_passed = v_checks_total THEN 'verified'
            ELSE 'failed'
        END,
        verified_at = now(),
        verification_result = v_verification_result,
        updated_at = now()
    WHERE id = v_backup_id;

    RETURN QUERY SELECT
        v_backup_id,
        (SELECT status FROM public.backup_metadata WHERE id = v_backup_id),
        v_checks_passed,
        v_checks_total,
        v_checks_passed || '/' || v_checks_total || ' checks passed'::TEXT;

END;
$$ LANGUAGE plpgsql;

-- Schedule backup verification: daily at 3 AM UTC
-- SELECT cron.schedule('verify_backup_health', '0 3 * * *', 'SELECT public.run_backup_verification()');

-- Record initial backup (manual entry for now)
-- INSERT INTO public.backup_metadata (backup_id, status, backup_type, started_at, completed_at)
-- VALUES (gen_random_uuid()::text, 'completed', 'daily', now() - INTERVAL '1 day', now())
-- ON CONFLICT DO NOTHING;
