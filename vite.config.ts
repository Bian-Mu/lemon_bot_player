import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/metadata': {
        target: 'https://lemonyaweb.top:10721',
        changeOrigin: true,
        secure: false
      },
      '/get': {
        target: 'https://lemonyaweb.top:10721',
        changeOrigin: true,
        secure: false
      },
      '/image': {
        target: 'https://lemonyaweb.top:10721',
        changeOrigin: true,
        secure: false
      },
      '/lyrics': {
        target: 'https://lemonyaweb.top:10721',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
