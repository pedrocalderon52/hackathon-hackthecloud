import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/apps': {
        target: 'http://backend:3500',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://backend:3500',
        changeOrigin: true,
      }
    }
  }
})