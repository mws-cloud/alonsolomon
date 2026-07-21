import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

// בזמן prerender (Node) אין localStorage — שומרים על אחסון סשן רק בדפדפן,
// אחרת יצירת הלקוח הייתה קורסת בבנייה.
const isBrowser = typeof window !== "undefined";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: isBrowser ? window.localStorage : undefined,
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
  },
});
