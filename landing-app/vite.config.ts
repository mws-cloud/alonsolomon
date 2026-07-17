import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// אפליקציית דף הנחיתה + פאנל הניהול.
// הבילד יוצא ישירות אל public/program של האתר הראשי, כך שהדף מוגש
// כקבצים סטטיים אמיתיים תחת a-solomon.com/program (עובד גם ללא SPA fallback בשרת).
export default defineConfig({
  base: "/program/",
  plugins: [react()],
  server: { port: 8090 },
  build: {
    outDir: resolve(__dirname, "../public/program"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin/index.html"),
      },
    },
  },
});
