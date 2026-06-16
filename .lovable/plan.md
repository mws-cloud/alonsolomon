## תיקונים

### 1. וואטסאפ – מספר סלולר במקום קווי
החלפת כל המופעים של `972775255923` ל-`972535715552` ב:
- `src/components/layout/WhatsAppButton.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Header.tsx` (אם רלוונטי)
- `src/components/home/HeroSection.tsx`
- `src/components/home/CTASection.tsx`
- `src/pages/Contact.tsx` (phoneNumber לוואטסאפ בלבד; הטלפון הקווי 077-5255923 נשאר להתקשרות)
- `src/pages/InstantConsultation.tsx` (קישורי wa.me בלבד)

הערה: מספרי `tel:077-5255923` נשארים כפי שהם – זה הקו של המשרד.

### 2. אייקון וואטסאפ נבלע באייקון הנגישות בסלולר
ב-`src/components/layout/WhatsAppButton.tsx`:
- העברת הכפתור מ-`bottom-6 left-4` ל-`bottom-24 left-4` במובייל (`md:bottom-6`) כדי להרים אותו מעל וידג'ט הנגישות שיושב בפינה התחתונה.
- הגדלת ה-z-index ל-`z-[60]`.

### 3. עדכון מייל בכל האתר
החלפת `info@solomon-law.co.il` ל-`alon@a-solomon.com` ב:
- `src/components/layout/Footer.tsx`
- `src/pages/Contact.tsx`
- `src/pages/InstantConsultation.tsx`
- `src/pages/Careers.tsx`
- `src/pages/Career.tsx`
- `index.html` (schema.org + meta אם יש)

### 4. עדכון כתובת
לפורמט: `אלון סולומון ושות', המגדל הצפוני קומה 5, הארבעה 28 ת"א-יפו`
- `src/components/layout/Footer.tsx` (שורה 67)
- `src/components/home/CTASection.tsx` (שורה 41)
- `src/pages/Contact.tsx` (שורה 265 + meta description)
- `index.html` (schema streetAddress)

### 5. מספר הפקס דהוי
ב-`src/pages/Contact.tsx` (שורה 266) – הטקסט `פקס: 077-5362173` משתמש בצבע מעומעם. שינוי ל-`text-ink` במקום הצבע המופחת הנוכחי כדי שיהיה בולט.
כנ"ל ב-`src/components/home/CTASection.tsx` שורה 40 (`text-[#E8E4DC]/30`) – להחליף לאטימות גבוהה יותר על הרקע הכהה (למשל `text-cream/70`).

### 6. עמוד "המשרד" – `src/pages/Team.tsx`
- כותרת ה-Hero (שורה ~22): `משרד עו"ד אלון סולומון ושו'ת` → `משרד עו"ד אלון סולומון ושות'`.
- כותרת ה-h3 בכרטיס "צוות מקצועי ומסור" / Subtitle של ה-Hero (שורה ~26): `צוות מקצועי ומנוסה בדיני משפחה, גירושין וירושה` → `דיני משפחה, גירושים, וירושה`.
- מחיקת הכיתוב מתחת לתמונת הצוות: הסרת ה-`<p>` עם `עו״ד אלון סולומון עם הצוות המקצועי של המשרד`.
- בכותרת "על המשרד" בתוכן (`ושו'ת'`) – ליישר ל-`ושות'`.
- ב-Footer: `עו״ד אלון סולומון ושו'ת` → `עו״ד אלון סולומון ושות'`.

### 7. דרושים – `src/pages/Careers.tsx`
שורה 46: `מזכירה/סדרנית משרד` → `מזכירה לשעות אחה"צ`.

## אימות לאחר ביצוע
- בדיקת כפתור הוואטסאפ במובייל (375px) שלא חופף לאייקון הנגישות.
- בדיקת עמוד `/team` ועמוד `/contact` שכל הפרטים נכונים.
- בדיקה שכל `wa.me` מצביעים ל-`972535715552`.
