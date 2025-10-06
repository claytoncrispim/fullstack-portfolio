import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- THIS IS THE FINAL FIX ---
  // We add this 'server' section to configure the local development server.
  server: {
    proxy: {
      // This rule tells Vite that any request starting with '/api'
      // should be forwarded to our live Netlify backend.
      '/api': {
        target: 'https://glittery-biscuit-328eb3.netlify.app',
        changeOrigin: true, // This is important for security (CORS)
      },
    }
  }
})