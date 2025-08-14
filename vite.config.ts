import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/ponder": {
        target: "http://localhost:42069",
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/ponder/, ""),
      },
    },
  },
});
