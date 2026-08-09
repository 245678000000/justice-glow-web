import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 把体积大且更新频率低的依赖拆成独立 chunk，提高二次访问的缓存命中率
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-markdown": ["react-markdown"],
          "vendor-retell": ["retell-client-js-sdk"],
          "vendor-supabase": ["@supabase/supabase-js"],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
}));
