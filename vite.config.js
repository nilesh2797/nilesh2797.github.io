import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Base path for GitHub Pages
  // For username.github.io (personal site): use '/'
  // For username.github.io/repo-name (project site): use '/repo-name/'
  base: '/',
})