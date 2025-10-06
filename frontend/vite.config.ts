import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This rule will intercept our clean '/api/contact' call
      '/api': {
        // We tell it to forward directly to the REAL function URL
        target: 'https://glittery-biscuit-328eb3.netlify.app/.netlify/functions',
        changeOrigin: true,
        // This rewrite rule correctly formats the final URL.
        // It changes '/api/contact' to '/contact' before sending it.
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})