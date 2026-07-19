// הגדרות משותפות לדף הנחיתה ולפאנל הניהול.
// המפתח האנונימי (anon) הוא ציבורי בתכנון — הוא נשלח לכל דפדפן שגולש באתר,
// וההרשאות בפועל נאכפות על ידי Row Level Security בצד השרת.

// ה-Supabase של האתר רץ בהתקנה עצמית על שרת mws (לא supabase.com) —
// זו הכתובת שגם האתר הראשי משתמש בה, והמיגרציות מוחלות עליה אוטומטית.
export const SUPABASE_URL =
  "https://supabase-nqqqt938d9ut1ybg56qi8ovg.deploy.mws.co.il";

export const SUPABASE_ANON_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc4MjMwODQ2MCwiZXhwIjo0OTM3OTgyMDYwLCJyb2xlIjoiYW5vbiJ9.gn1oZzci-HHqzsLJ5e3FspypeFuifA8GC4rPWHj-poI";

// שליחת המייל לעו"ד עוברת דרך פרויקט הענן הישן, כי מנוע הפונקציות בשרת
// החדש שבור כרגע (worker boot error). הליד עצמו נשמר גם במסד החדש ישירות
// (ראו LeadForm), כך שהפאנל רואה אותו. כשהפונקציות בשרת החדש יתוקנו —
// להחזיר ל-`${SUPABASE_URL}/functions/v1/send-contact-email` ולהסיר את הכתיבה הכפולה.
export const FORM_ENDPOINT =
  "https://emkrjhmlorbjqaltivpo.supabase.co/functions/v1/send-contact-email";

// מספר הוואטסאפ של המשרד (זהה לאתר הראשי).
export const WHATSAPP = "972535715552";

// תווית שמבדלת את הלידים של דף הנחיתה בדף הניהול ובמסד הנתונים.
export const LEAD_SOURCE = "דף נחיתה — תכנית שכר טרחה";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

/** אירועי המרה — יורים רק אם תגי המדידה מותקנים בדף. */
export function trackLead(action: string): void {
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      fbq?: (...args: unknown[]) => void;
    };
    if (w.gtag) {
      w.gtag("event", "generate_lead", { event_category: "lead", event_label: action });
      /* TODO: כשמתקבלת תווית המרה מ-Google Ads, לבטל את ההערה ולהזין אותה:
      w.gtag("event", "conversion", { send_to: "AW-XXXXXXXXXX/XXXXXXXXXXX" });
      */
    }
    if (w.fbq) {
      w.fbq("track", "Lead", { content_name: action });
    }
  } catch {
    /* מדידה לעולם לא מפילה את הדף */
  }
}
