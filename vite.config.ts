import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),

    // optional optimizations (safe)
    compression({
      algorithm: "brotliCompress",
      ext: ".br"
    }),
    compression({
      algorithm: "gzip",
      ext: ".gz"
    })
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },

  build: {
    reportCompressedSize: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "vendor-react";
            }

            if (id.includes("recharts")) {
              return "vendor-charts";
            }

            if (
              id.includes("axios") ||
              id.includes("dompurify") ||
              id.includes("marked")
            ) {
              return "vendor-utils";
            }

            return "vendor";
          }
        }
      }
    }
  }
});