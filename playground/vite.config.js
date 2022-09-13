import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { FuzzyResolver } from 'fuzzy-ui'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      vueTemplate: true,
      resolvers: [FuzzyResolver()],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [FuzzyResolver()],
      dts: 'src/components.d.ts',
    }),
    Layouts(),
    Pages(),
  ],
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, 'src/'),
    },
  },
})
