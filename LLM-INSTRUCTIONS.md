# LLM Instructions — אתר משרד עו"ד אלון סולומון ושות'

## 1. סקירה כללית

| שדה | ערך |
|------|------|
| **שם המשרד** | עו"ד אלון סולומון ושות' (Adv. Alon Solomon & Partners) |
| **תחום** | דיני משפחה, גירושין, חלוקת רכוש |
| **כתובת** | המגדל הצפוני, רחוב הארבעה 28, תל אביב |
| **טלפון** | 077-5255923 |
| **פקס** | 077-5255924 |
| **מייל** | info@solomon-law.co.il |
| **שעות פעילות** | א'-ה' 09:00-18:00 |
| **Base URL** | https://solomon-law.co.il |
| **WhatsApp** | 972775255923 |

---

## 2. טכנולוגיות

| טכנולוגיה | שימוש |
|------------|-------|
| React 18 | UI framework |
| TypeScript 5 | Type safety |
| Vite 5 | Build tool & dev server |
| Tailwind CSS v3 | Styling (utility-first) |
| shadcn/ui | UI component library (Radix-based) |
| react-router-dom 6 | Client-side routing (SPA) |
| react-helmet-async | SEO meta tags per page |
| @tanstack/react-query | Data fetching (configured, not heavily used yet) |
| Lucide React | Icon library |
| tailwindcss-animate | Animation utilities |

---

## 3. פונטים (Google Fonts)

| פונט | שימוש | Tailwind class |
|------|-------|----------------|
| **Heebo** | כותרות (h1–h6) | `font-heading` |
| **Assistant** | גוף טקסט | `font-body` |

- נטענים דרך `<link>` ב-`index.html`
- `font-heading` מוחל אוטומטית על h1–h6 ב-`index.css`
- `font-body` מוחל אוטומטית על `body` ב-`index.css`
- Default sans stack: `Heebo, Assistant, Arial, sans-serif`

---

## 4. פלטת צבעים (HSL)

### Design Tokens (index.css `:root`)

| Token | HSL | שימוש |
|-------|-----|-------|
| `--primary` (navy) | `220 45% 20%` | רקע ראשי כהה, Header, Footer |
| `--primary-foreground` | `40 33% 98%` | טקסט על רקע navy |
| `--accent` (gold) | `38 70% 50%` | כפתורים, הדגשות, אייקונים |
| `--background` (cream) | `40 33% 98%` | רקע דפים |
| `--foreground` | `220 30% 15%` | טקסט ראשי |
| `--muted` | `35 20% 94%` | רקע sections חלופיים |
| `--muted-foreground` | `220 15% 45%` | טקסט משני |
| `--secondary` | `35 30% 92%` | רקע בז' חם |
| `--navy` | `220 45% 20%` | Custom navy token |
| `--navy-light` | `220 35% 30%` | Navy בהיר יותר |
| `--gold` | `38 70% 50%` | זהב ראשי |
| `--gold-light` | `38 60% 70%` | זהב בהיר (hover) |
| `--cream` | `40 33% 98%` | רקע קרם |

### Tailwind Custom Classes

| Class | תיאור |
|-------|--------|
| `bg-gradient-navy` | גרדיאנט navy → navy-light (180deg) |
| `text-gradient-gold` | טקסט זהב גרדיאנט |
| `shadow-elegant` | צל עדין navy-based |
| `border-gold` | גבול זהב |
| `text-navy` | צבע טקסט navy |
| `text-gold` | צבע טקסט זהב |
| `bg-cream` | רקע קרם |

### כלל חשוב
> **לעולם לא להשתמש בצבעים ישירים** (כמו `bg-blue-900`, `text-yellow-500`).
> תמיד להשתמש ב-semantic tokens: `bg-primary`, `text-gold`, `bg-accent` וכו'.

---

## 5. מבנה תיקיות

```
src/
├── pages/              # דפי האתר (כל דף = route)
├── components/
│   ├── layout/         # Layout, Header, Footer, WhatsAppButton
│   ├── home/           # סקשנים של עמוד הבית
│   ├── ui/             # shadcn/ui components
│   ├── ArticlePage.tsx # תבנית מאמר כללית
│   ├── NavLink.tsx     # קומפוננטת ניווט
│   └── SEO.tsx         # קומפוננטת SEO
├── hooks/              # Custom hooks
├── lib/                # Utilities (cn helper)
├── assets/             # תמונות ונכסים
└── index.css           # Design system & global styles
public/
├── sitemap.xml         # Sitemap ל-SEO
├── robots.txt          # הוראות לסורקים
├── og-image.jpg        # תמונת OG (1200x630)
└── placeholder.svg     # תמונת placeholder
```

---

## 6. קומפוננטות ליבה

### Layout (`src/components/layout/Layout.tsx`)
עוטף **כל** דף באתר.
```tsx
<div className="min-h-screen flex flex-col font-sans" dir="rtl">
  <Header />
  <main className="flex-1">{children}</main>
  <Footer />
  <WhatsAppButton />
</div>
```

### SEO (`src/components/SEO.tsx`)
מוסיף meta tags דינמיים לכל דף.
```tsx
<SEO
  title="כותרת הדף | עו״ד אלון סולומון"
  description="תיאור מטא עד 160 תווים"
  canonical="https://solomon-law.co.il/path"
/>
```
Props: `title`, `description`, `canonical`, `ogImage?`

### ArticlePage (`src/components/ArticlePage.tsx`)
תבנית למאמרים/מדריכים. כולל: hero section, sections חלופיים (רקע לבן/muted), CTA section.
```tsx
<ArticlePage
  seo={{ title, description, canonical }}
  heroTitle="כותרת ראשית"
  heroSubtitle="תת-כותרת אופציונלית"
  sections={[{ title: "כותרת", content: <p>תוכן</p> }]}
  ctaTitle="כותרת CTA"
  ctaText="טקסט CTA"
/>
```

### Header (`src/components/layout/Header.tsx`)
- ניווט sticky עם לוגו (שם המשרד)
- NavItems: בית, השירותים שלנו, מדריכים, שאלות נפוצות, אודות, צור קשר
- כפתור CTA "לתיאום פגישה" (→ /contact)
- תפריט המבורגר במובייל (Sheet)

### Footer (`src/components/layout/Footer.tsx`)
3 עמודות:
1. **אודות** — תיאור קצר של המשרד
2. **קישורים מהירים** — בית, שירותים, מדריכים, שאלות נפוצות, צור קשר
3. **פרטי התקשרות** — כתובת, טלפון, מייל, שעות פעילות

### WhatsAppButton (`src/components/layout/WhatsAppButton.tsx`)
- כפתור ירוק צף (fixed bottom-left)
- מספר: `972775255923`
- הודעת ברירת מחדל: "שלום, אשמח לקבל ייעוץ משפטי בנושא גירושין"

---

## 7. רשימת נתיבים (Routes)

| נתיב | קומפוננטה | תיאור |
|-------|-----------|--------|
| `/` | Index | עמוד הבית |
| `/services` | Services | שירותי המשרד |
| `/faq` | FAQ | שאלות נפוצות |
| `/contact` | Contact | טופס יצירת קשר |
| `/about` | About | אודות המשרד |
| `/case-studies` | CaseStudies | תיקים לדוגמה |
| `/guides` | Guides | רשימת מדריכים |
| `/legal-methodology-family-law` | Methodology | מתודולוגיה משפטית |
| `/adv-alon-solomon-profile` | AttorneyProfile | פרופיל עו"ד |
| `/conflict-resolution-divorce-israel-2026` | ConflictResolution | יישוב סכסוכים |
| `/jurisdiction-race-family-vs-rabbinical-court` | JurisdictionRace | מירוץ סמכויות |
| `/parental-responsibility-and-timeshare` | ParentalResponsibility | אחריות הורית |
| `/child-support-israel-2026-guide` | ChildSupport | מזונות ילדים |
| `/child-support-rabbinical-vs-family-court-nuances` | ChildSupportDifferences | הבדלי מזונות בין ערכאות |
| `/parental-alienation-legal-strategy` | ParentalAlienation | ניכור הורי |
| `/parenting-agreements-and-mediation` | ParentingAgreements | הסכמי הורות וגישור |
| `/inheritance-and-pre-marital-assets-division` | InheritanceAssets | ירושה ונכסים טרום-נישואין |
| `/pension-division-experts-israel` | PensionDivision | חלוקת פנסיה |
| `/earning-capacity-and-career-assets-divorce` | EarningCapacity | כושר השתכרות |
| `/spousal-support-and-ketubah-israel` | SpousalSupport | מזונות בן/בת זוג |
| `/divorce-grounds-and-specific-housing` | DivorceGrounds | עילות גירושין ודיור ספציפי |
| `/ketubah-lawsuit-rabbinical-court-israel` | KetubahLawsuit | תביעת כתובה |
| `/ketubah-vs-property-division-israel` | KetubahVsProperty | כתובה מול איזון משאבים |
| `/prenuptial-agreements-israel-guide` | PrenuptialAgreements | הסכמים טרום-נישואין |
| `/inheritance-conflicts-and-wills-strategy` | WillsAndInheritance | צוואות וסכסוכי ירושה |
| `*` | NotFound | דף 404 |

---

## 8. אשכולות תוכן (Clusters)

### Cluster 0 — אודות המשרד
- `/about`, `/legal-methodology-family-law`, `/adv-alon-solomon-profile`

### Cluster 1 — הליך הגירושין
- `/conflict-resolution-divorce-israel-2026`, `/jurisdiction-race-family-vs-rabbinical-court`

### Cluster 2 — ילדים
- `/parental-responsibility-and-timeshare`, `/child-support-israel-2026-guide`
- `/child-support-rabbinical-vs-family-court-nuances`, `/parental-alienation-legal-strategy`
- `/parenting-agreements-and-mediation`

### Cluster 3 — חלוקת רכוש
- `/inheritance-and-pre-marital-assets-division`, `/pension-division-experts-israel`
- `/earning-capacity-and-career-assets-divorce`

### Cluster 4 — מזונות וכתובה
- `/spousal-support-and-ketubah-israel`, `/divorce-grounds-and-specific-housing`
- `/ketubah-lawsuit-rabbinical-court-israel`, `/ketubah-vs-property-division-israel`

### Cluster 5 — הסכמים וצוואות
- `/prenuptial-agreements-israel-guide`, `/inheritance-conflicts-and-wills-strategy`

---

## 9. סקשני עמוד הבית (Index)

| סקשן | קובץ | תיאור |
|-------|------|--------|
| HeroSection | `src/components/home/HeroSection.tsx` | תמונת עו"ד (`src/assets/alon-solomon.jpg`), כותרת ראשית, 3 feature cards (חוק, אסטרטגיה, מפת דרכים) |
| ServicesPreview | `src/components/home/ServicesPreview.tsx` | 3 כרטיסי שירות עם אייקונים |
| CaseStudiesSection | `src/components/home/CaseStudiesSection.tsx` | 9 תיקים לדוגמה, מציג 4 ראשונים + לינק לעמוד מלא |
| WhyNowSection | `src/components/home/WhyNowSection.tsx` | 3 סיבות לייעוץ מוקדם |
| PressSection | `src/components/home/PressSection.tsx` | 4 כתבות (כלכליסט, גלובס, Walla, mako) בגריד 2×2 |
| TestimonialsSection | `src/components/home/TestimonialsSection.tsx` | 12 עדויות לקוחות בגריד 3 עמודות |
| CTASection | `src/components/home/CTASection.tsx` | CTA עם כפתור "לתיאום פגישת ייעוץ" (→ /contact) + טלפון |

---

## 10. SEO ומטא

- **Schema.org JSON-LD** (`LegalService` type) ב-`index.html`
- **OG Image**: `/og-image.jpg` (1200×630)
- **Sitemap**: `public/sitemap.xml` — כל הנתיבים
- **Robots.txt**: `public/robots.txt` עם `Sitemap: https://solomon-law.co.il/sitemap.xml`
- **SEO Component**: קומפוננטת `<SEO>` דינמית לכל דף עם title, description, canonical, ogImage
- **כללי SEO**: title < 60 תווים, description < 160 תווים, H1 יחיד לדף, alt text לתמונות

---

## 11. כללי עריכה

1. **שפה**: כל התוכן בעברית. Layout הוא RTL (`dir="rtl"`)
2. **עטיפת דף**: כל דף חדש חייב להיות עטוף ב-`<Layout>` + `<SEO>`
3. **מאמרים**: מאמרים/מדריכים משתמשים בקומפוננטת `<ArticlePage>`
4. **CTA**: כל כפתור CTA מפנה ל-`/contact`
5. **כפתורים**: צבע `bg-gold hover:bg-gold-light text-primary` עם `font-semibold`
6. **נתיב חדש**: להוסיף ל-`App.tsx` **מעל** ה-catch-all `*` route
7. **צבעים**: רק semantic tokens — לא צבעים ישירים
8. **אייקונים**: Lucide React בלבד
9. **Responsive**: Mobile-first, שימוש ב-`md:` ו-`lg:` breakpoints
10. **תוספת דף לניווט**: לעדכן `Header.tsx` (navItems array) ו-`Footer.tsx` (קישורים מהירים)

### דוגמה ליצירת דף חדש:
```tsx
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

const NewPage = () => (
  <Layout>
    <SEO title="כותרת | עו״ד אלון סולומון" description="תיאור" canonical="https://solomon-law.co.il/new-page" />
    {/* תוכן הדף */}
  </Layout>
);
export default NewPage;
```

---

## 12. פרטי קשר

| שדה | ערך |
|------|------|
| טלפון | 077-5255923 |
| פקס | 077-5255924 |
| מייל | info@solomon-law.co.il |
| כתובת | המגדל הצפוני, רחוב הארבעה 28, תל אביב |
| WhatsApp | [972775255923](https://wa.me/972775255923) |
| שעות פעילות | א'-ה' 09:00-18:00 |
