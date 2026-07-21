import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// בנייה נפרדת ל-SSR: מייצרת חבילת Node שמייצאת render() עבור prerender.mjs.
// יוצאת ל-dist-ssr ולכן לא נוגעת בפלט הלקוח שב-public/program.
export default defineConfig({
  base: "/program/",
  plugins: [react()],
  build: {
    ssr: resolve(__dirname, "src/landing/entry-server.tsx"),
    outDir: resolve(__dirname, "dist-ssr"),
    emptyOutDir: true,
  },
});
