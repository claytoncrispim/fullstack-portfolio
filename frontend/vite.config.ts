import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This rule says: "Any request starting with '/api'..."
      '/api': {
        // "...forward it to our main Netlify site address."
        target: 'https://glittery-biscuit-328eb3.netlify.app',
        changeOrigin: true,

        // --- THE FINAL FIX ---
        // This tells Vite to be extremely verbose in the terminal about the proxy.
        logLevel: 'debug',
        // This tells the proxy not to fail on SSL certificate issues.
        secure: false,
      },
    }
  }
})