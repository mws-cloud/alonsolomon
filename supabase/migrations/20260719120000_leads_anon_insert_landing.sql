-- דף הנחיתה /program כותב לידים ישירות לטבלה (בנוסף לשליחת המייל דרך
-- הפונקציה בענן הישן), כי מנוע ה-edge functions בשרת זה אינו זמין כרגע.
-- ההרשאה מוגבלת ללידים של דף הנחיתה בלבד — אי אפשר להוסיף לידים אחרים.
-- בטוח להרצה חוזרת (idempotent).

drop policy if exists "leads_anon_insert_landing" on public.leads;
create policy "leads_anon_insert_landing"
  on public.leads for insert
  to anon
  with check (form_type = 'דף נחיתה — תכנית שכר טרחה');
