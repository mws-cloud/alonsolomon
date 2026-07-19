// Shared config for landing page + admin panel.
// Anon/publishable key is public by design; RLS enforces permissions server-side.
// Coolify injects VITE_SUPABASE_* at build time (managed Supabase).

const managedUrl = "https://supabase-nqqqt938d9ut1ybg56qi8ovg.deploy.mws.co.il";

export const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() || managedUrl;

// Fallback: the managed anon JWT (public), so local/dev builds work without env.
export const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined)?.trim() ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() ||
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc4MjMwODQ2MCwiZXhwIjo0OTM3OTgyMDYwLCJyb2xlIjoiYW5vbiJ9.gn1oZzci-HHqzsLJ5e3FspypeFuifA8GC4rPWHj-poI";

// שליחת המייל לעו"ד עוברת דרך פרויקט הענן הישן, כי מנוע הפונקציות בשרת
// המנוהל מחזיר כרגע worker boot error. הליד עצמו נשמר גם במסד המנוהל ישירות
// (ראו LeadForm), כך שהפאנל רואה אותו. כשהפונקציות בשרת המנוהל יתוקנו —
// להחזיר ל-`${SUPABASE_URL}/functions/v1/send-contact-email` ולהסיר את הכתיבה הכפולה.
export const FORM_ENDPOINT =
  "https://emkrjhmlorbjqaltivpo.supabase.co/functions/v1/send-contact-email";

export const WHATSAPP = "972535715552";
export const LEAD_SOURCE = "דף נחיתה — תכנית שכר טרחה";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function trackLead(action: string): void {
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      fbq?: (...args: unknown[]) => void;
    };
    if (w.gtag) {
      w.gtag("event", "generate_lead", { event_category: "lead", event_label: action });
    }
    if (w.fbq) {
      w.fbq("track", "Lead", { content_name: action });
    }
  } catch {
    /* analytics must never break the page */
  }
}
