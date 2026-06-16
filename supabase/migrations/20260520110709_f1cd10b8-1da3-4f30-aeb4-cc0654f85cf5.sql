ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS proceedings_started boolean,
  ADD COLUMN IF NOT EXISTS is_represented boolean,
  ADD COLUMN IF NOT EXISTS client_note text;