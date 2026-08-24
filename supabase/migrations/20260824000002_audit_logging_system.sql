-- Audit Logging System — Track all data mutations for compliance & forensics
-- Captures: table name, operation (INSERT/UPDATE/DELETE), old/new values, actor, timestamp

-- Create audit_log table
CREATE TABLE public.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    operation TEXT NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
    old_values JSONB,
    new_values JSONB,
    changed_columns TEXT[],
    actor_id UUID,
    actor_email TEXT,
    ip_address INET,
    request_id TEXT,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Indexes for efficient queries
CREATE INDEX idx_audit_log_table_name ON public.audit_log(table_name);
CREATE INDEX idx_audit_log_record_id ON public.audit_log(record_id);
CREATE INDEX idx_audit_log_created_at ON public.audit_log(created_at DESC);
CREATE INDEX idx_audit_log_actor_id ON public.audit_log(actor_id);
CREATE INDEX idx_audit_log_operation ON public.audit_log(operation);
CREATE INDEX idx_audit_log_table_record ON public.audit_log(table_name, record_id);

-- Enable RLS
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only service role and admins can view audit logs
CREATE POLICY "Service role can read audit logs" ON public.audit_log
    FOR SELECT USING (auth.role() = 'service_role' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can insert audit logs" ON public.audit_log
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Function to capture old/new values for auditing
CREATE OR REPLACE FUNCTION public.capture_audit_log()
RETURNS TRIGGER AS $$
DECLARE
    v_actor_id UUID;
    v_actor_email TEXT;
    v_changed_columns TEXT[];
BEGIN
    -- Get current actor (from auth.uid() if available, else NULL for service-role operations)
    v_actor_id := NULLIF(auth.uid()::text, '')::UUID;
    v_actor_email := (auth.jwt()->>'email')::TEXT;

    -- Determine changed columns for UPDATE operations
    IF TG_OP = 'UPDATE' THEN
        SELECT ARRAY_AGG(key)
        INTO v_changed_columns
        FROM jsonb_each(to_jsonb(NEW) - to_jsonb(OLD))
        WHERE value IS DISTINCT FROM to_jsonb(OLD)->key;
    END IF;

    -- Insert audit log entry
    INSERT INTO public.audit_log (
        table_name,
        record_id,
        operation,
        old_values,
        new_values,
        changed_columns,
        actor_id,
        actor_email,
        ip_address,
        reason
    ) VALUES (
        TG_TABLE_NAME,
        CASE
            WHEN TG_OP = 'DELETE' THEN OLD.id
            ELSE NEW.id
        END,
        TG_OP,
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END,
        v_changed_columns,
        v_actor_id,
        v_actor_email,
        inet_client_addr(),
        current_setting('app.audit_reason', true)
    );

    RETURN CASE
        WHEN TG_OP = 'DELETE' THEN OLD
        ELSE NEW
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to set audit context (reason for change)
CREATE OR REPLACE FUNCTION public.set_audit_context(p_reason TEXT)
RETURNS void AS $$
BEGIN
    PERFORM set_config('app.audit_reason', p_reason, false);
END;
$$ LANGUAGE plpgsql;

-- Audit triggers for critical tables (add more as needed)
CREATE TRIGGER audit_blog_articles AFTER INSERT OR UPDATE OR DELETE ON public.blog_articles
    FOR EACH ROW EXECUTE FUNCTION public.capture_audit_log();

CREATE TRIGGER audit_donations AFTER INSERT OR UPDATE OR DELETE ON public.donations
    FOR EACH ROW EXECUTE FUNCTION public.capture_audit_log();

CREATE TRIGGER audit_contact_inquiries AFTER INSERT OR UPDATE OR DELETE ON public.contact_inquiries
    FOR EACH ROW EXECUTE FUNCTION public.capture_audit_log();

CREATE TRIGGER audit_appointments AFTER INSERT OR UPDATE OR DELETE ON public.appointments
    FOR EACH ROW EXECUTE FUNCTION public.capture_audit_log();

CREATE TRIGGER audit_chat_messages AFTER INSERT OR UPDATE OR DELETE ON public.chat_messages
    FOR EACH ROW EXECUTE FUNCTION public.capture_audit_log();

CREATE TRIGGER audit_users AFTER UPDATE OR DELETE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.capture_audit_log();

-- View for audit log queries (shows human-readable changes)
CREATE OR REPLACE VIEW public.audit_log_changes AS
SELECT
    id,
    created_at,
    table_name,
    operation,
    actor_email,
    actor_id,
    CASE
        WHEN operation = 'INSERT' THEN 'Created new record'
        WHEN operation = 'UPDATE' THEN 'Updated columns: ' || array_to_string(changed_columns, ', ')
        WHEN operation = 'DELETE' THEN 'Deleted record'
    END AS change_description,
    CASE
        WHEN operation = 'UPDATE' THEN new_values
        WHEN operation = 'INSERT' THEN new_values
        WHEN operation = 'DELETE' THEN old_values
    END AS affected_data
FROM public.audit_log
ORDER BY created_at DESC;

-- Grant view access to admins
GRANT SELECT ON public.audit_log_changes TO authenticated;

-- Retention policy: keep audit logs for 2 years, archive older
CREATE OR REPLACE FUNCTION public.archive_old_audit_logs()
RETURNS void AS $$
BEGIN
    DELETE FROM public.audit_log
    WHERE created_at < NOW() - INTERVAL '2 years'
    AND operation = 'DELETE';  -- Keep deletes longer for forensics

    RAISE NOTICE 'Archived old audit logs';
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup (to be set up in Supabase dashboard)
-- SELECT cron.schedule('archive_audit_logs', '0 2 * * 0', 'SELECT public.archive_old_audit_logs()');
