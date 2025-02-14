import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoImport from 'unplugin-auto-import/vite'

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
    VueRouter({}),
    Components({
      dirs:['src/components'],
      dts: true
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          pinia: ['defineStore', 'storeToRefs', 'acceptHMRUpdate']
        },
        {
          'vue-meta': ['useMeta']
        }
      ],
      dts: true,
      viteOptimizeDeps: true,
      dirs: ['src/stores/**', 'src/composables/**']
    }),
    ],
    server :{
      proxy: {
       '/api': {
         target: 'http://localhost:3001',
         changeOrigin: true
       }
      }
   },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
  },
})