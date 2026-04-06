// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ command }) => {
  const isProd = command === 'build'

  return {
    base: '/react/', // selalu pakai /react
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      fs: { strict: false }, // optional, biar dev server bisa akses file
      // rewrite semua request /react/* ke /
      middlewareMode: false,
      proxy: {
        '^/react/.*': {
          target: 'http://localhost:5173/',
          rewrite: (path) => path.replace(/^\/react/, ''),
        },
      },
    },
  }
})