import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'


export default defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer()],
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    Components({
      resolvers: [
      ]
    })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
  },
})
