import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
server: {
    proxy: {
      '/api': 'http://localhost:3000', // Cambia esto si tu backend está en otro puerto
    },
  },
});
