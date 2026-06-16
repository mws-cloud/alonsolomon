
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

create type public.lead_status as enum ('new', 'called', 'in_progress', 'irrelevant', 'reminder');

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  message text,
  form_type text not null default 'contact',
  status public.lead_status not null default 'new',
  call_attempts integer not null default 0,
  reminder_at timestamptz,
  last_action_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status);
create index leads_reminder_idx on public.leads (reminder_at) where reminder_at is not null;

alter table public.leads enable row level security;

-- No policies: all client access denied. Only service role (edge functions) can access.

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.update_updated_at_column();
