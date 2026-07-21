// מזריק את ה-HTML המרונדר של דף הנחיתה לתוך index.html הסטטי, כדי שגוגל
// ובוטים שלא מריצים JS יראו את כל התוכן. בצד הלקוח React טוען מחדש (createRoot)
// ומריץ את אנימציות הכניסה כרגיל. רץ אחרי בניית הלקוח וה-SSR.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = resolve(__dirname, "../public/program/index.html");

// pathToFileURL — ב-Windows import() דורש file:// ולא נתיב גולמי.
const { render } = await import(
  pathToFileURL(resolve(__dirname, "dist-ssr/entry-server.js")).href
);
const appHtml = render();

let tpl = readFileSync(indexPath, "utf8");
const marker = '<div id="root"></div>';
if (!tpl.includes(marker)) {
  console.warn("prerender: לא נמצא root ריק (אולי כבר רונדר) — מדלג");
  process.exit(0);
}
tpl = tpl.replace(marker, `<div id="root">${appHtml}</div>`);
writeFileSync(indexPath, tpl, "utf8");
console.log(`prerender: הוזרקו ${appHtml.length} תווים ל-index.html`);
