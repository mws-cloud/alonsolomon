-- ניהול משתמשי פאנל מתוך הפאנל עצמו + סגירת פרצת אבטחה:
-- ההרשמה ל-Auth פתוחה לציבור (anon key ציבורי), ולכן הרשאות "לכל משתמש
-- מחובר" חושפות לידים לכל נרשם. מעתה הגישה נבדקת מול רשימת מורשים
-- (panel_users) שמנוהלת מהפאנל. בטוח להרצה חוזרת (idempotent).

create table if not exists public.panel_users (
  email text primary key,
  added_by text,
  created_at timestamptz not null default now()
);

alter table public.panel_users enable row level security;

-- הפונקציה רצה כ-security definer כדי לקרוא את הרשימה בלי תלות ב-RLS.
create or replace function public.is_panel_member()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.panel_users
    where lower(email) = lower(coalesce(auth.email(), ''))
  );
$$;

revoke all on function public.is_panel_member() from public;
grant execute on function public.is_panel_member() to authenticated, anon;

-- זריעה ראשונית: המנהלת והלקוח. הוספות נוספות — מטאב "משתמשים" בפאנל.
insert into public.panel_users (email, added_by) values
  ('vika4086@gmail.com', 'seed'),
  ('alon@a-solomon.com', 'seed')
on conflict (email) do nothing;

-- ניהול הרשימה: רק חברי פאנל רואים, מוסיפים ומסירים.
drop policy if exists "panel_users_member_select" on public.panel_users;
create policy "panel_users_member_select"
  on public.panel_users for select
  to authenticated
  using (public.is_panel_member());

drop policy if exists "panel_users_member_insert" on public.panel_users;
create policy "panel_users_member_insert"
  on public.panel_users for insert
  to authenticated
  with check (public.is_panel_member());

drop policy if exists "panel_users_member_delete" on public.panel_users;
create policy "panel_users_member_delete"
  on public.panel_users for delete
  to authenticated
  using (public.is_panel_member());

-- הידוק הרשאות קיימות: מ"כל משתמש מחובר" ל"חבר פאנל בלבד".
drop policy if exists "leads_auth_select" on public.leads;
create policy "leads_auth_select"
  on public.leads for select
  to authenticated
  using (public.is_panel_member());

drop policy if exists "leads_auth_update" on public.leads;
create policy "leads_auth_update"
  on public.leads for update
  to authenticated
  using (public.is_panel_member())
  with check (public.is_panel_member());

drop policy if exists "landing_content_auth_insert" on public.landing_content;
create policy "landing_content_auth_insert"
  on public.landing_content for insert
  to authenticated
  with check (public.is_panel_member());

drop policy if exists "landing_content_auth_update" on public.landing_content;
create policy "landing_content_auth_update"
  on public.landing_content for update
  to authenticated
  using (public.is_panel_member())
  with check (public.is_panel_member());
