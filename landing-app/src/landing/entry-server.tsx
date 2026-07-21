import { renderToString } from "react-dom/server";
import App from "./App";

// משמש את prerender.mjs בזמן הבנייה: מחזיר את ה-HTML של דף הנחיתה
// כמחרוזת, כדי להזריק אותו ל-index.html הסטטי (SEO ללא תלות ב-JS).
export function render(): string {
  return renderToString(<App />);
}
