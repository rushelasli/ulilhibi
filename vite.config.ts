import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
  vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('model-viewer'),
      },
    },
  }),
  tailwindcss(),
],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
