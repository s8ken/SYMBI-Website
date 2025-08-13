-- Verify and create the notify_signups table
-- This will show existing data and ensure the table structure is correct

-- Check if table exists and show structure
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'notify_signups' 
  AND table_schema = 'public';

-- Create table if it doesn't exist (safe to run multiple times)
CREATE TABLE IF NOT EXISTS public.notify_signups (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL,
  source text,
  ua text,
  ip text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create index for email lookups (safe to run multiple times)
CREATE INDEX IF NOT EXISTS idx_notify_signups_email 
ON public.notify_signups (email);

-- Show any existing signups
SELECT 
  id,
  email,
  source,
  created_at,
  CASE 
    WHEN created_at > now() - interval '1 day' THEN 'Today'
    WHEN created_at > now() - interval '7 days' THEN 'This week'
    ELSE 'Older'
  END as signup_period
FROM public.notify_signups 
ORDER BY created_at DESC 
LIMIT 10;

-- Show signup statistics
SELECT 
  COUNT(*) as total_signups,
  COUNT(DISTINCT email) as unique_emails,
  source,
  DATE(created_at) as signup_date
FROM public.notify_signups 
GROUP BY source, DATE(created_at)
ORDER BY signup_date DESC;
