DO $$
DECLARE
  q text;
BEGIN
  FOREACH q IN ARRAY ARRAY['auth_emails','transactional_emails','auth_emails_dlq','transactional_emails_dlq']
  LOOP
    IF to_regclass('pgmq.q_' || q) IS NULL THEN
      PERFORM pgmq.create(q);
    END IF;
  END LOOP;
END $$;