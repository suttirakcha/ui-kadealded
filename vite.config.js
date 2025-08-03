import path from "path"
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// because __dirname was showing undefined
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
 
  server: {
    port: 5173, // Your frontend's development port
    proxy: {
      '/otp': { // When a request starts with '/otp'
        target: 'http://localhost:8000', // Proxy it to your backend server
        changeOrigin: true, // Needed for CORS to work correctly
        secure: false, // Set to true if your backend uses HTTPS, false for HTTP in dev
      },
      // IMPORTANT: If you still have other API routes under /api (e.g., app.use("/api", authUserRouter)),
      // you will need a separate proxy entry for them as well:
      // '/api': {
      //   target: 'http://localhost:8000',
      //   changeOrigin: true,
      //   secure: false,
      // },
    },
  },
});