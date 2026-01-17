import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Use './' se o site for ficar em uma subpasta, mas '/' é o padrão para Netlify
  build: {
    outDir: 'dist', // Pasta que será gerada
  }
})
