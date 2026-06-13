import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // 1. Import modul path

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      // 2. Daftarkan '@' agar otomatis membaca folder 'src'
      '@': path.resolve(__dirname, './src'), 
    },
  },
})