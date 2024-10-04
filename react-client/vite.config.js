import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/assets': {
        target: 'http://localhost:3001/assets',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/assets/, ''),
      },
    },
  },
})
