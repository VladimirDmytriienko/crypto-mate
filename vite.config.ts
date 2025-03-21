import path from "path"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
export default defineConfig({
  plugins: [react({ babel: { configFile: true } }), TanStackRouterVite(), tailwindcss(),], 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
});
