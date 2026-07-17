-- דף נחיתה "תכנית שכר טרחת מינימום" (/program) + פאנל ניהול:
-- טבלת תוכן נערך + הרשאות קריאה/עדכון לידים למשתמשים מחוברים.
-- בטוח להרצה חוזרת (idempotent). לא נוגע בנתונים קיימים.

-- 1) טבלת התוכן של דף הנחיתה: כל טקסט בדף ניתן לעריכה מהפאנל.
create table if not exists public.landing_content (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.landing_content enable row level security;

-- קריאה חופשית (דף הנחיתה ציבורי); כתיבה רק למשתמשים מחוברים (הלקוח בפאנל).
drop policy if exists "landing_content_public_read" on public.landing_content;
create policy "landing_content_public_read"
  on public.landing_content for select
  using (true);

drop policy if exists "landing_content_auth_insert" on public.landing_content;
create policy "landing_content_auth_insert"
  on public.landing_content for insert
  to authenticated
  with check (true);

drop policy if exists "landing_content_auth_update" on public.landing_content;
create policy "landing_content_auth_update"
  on public.landing_content for update
  to authenticated
  using (true)
  with check (true);

-- עדכון updated_at אוטומטי (הפונקציה מוגדרת במיגרציה 20260520095853).
drop trigger if exists landing_content_set_updated_at on public.landing_content;
create trigger landing_content_set_updated_at
  before update on public.landing_content
  for each row execute function public.update_updated_at_column();

-- 2) הרשאות לפאנל על טבלת הלידים הקיימת:
--    משתמש מחובר (הלקוח) יכול לקרוא ולעדכן לידים (סטטוס/הערות).
--    הוספת לידים נשארת דרך פונקציית send-contact-email בלבד (service role).
drop policy if exists "leads_auth_select" on public.leads;
create policy "leads_auth_select"
  on public.leads for select
  to authenticated
  using (true);

drop policy if exists "leads_auth_update" on public.leads;
create policy "leads_auth_update"
  on public.leads for update
  to authenticated
  using (true)
  with check (true);
