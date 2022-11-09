import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { FuzzyResolver } from 'fuzzy-ui'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue','@vueuse/core'],
      vueTemplate: true,
      dts: 'src/auto-imports.d.ts',
      dirs: ['./src/composables']
    }),
    Components({
      resolvers: [FuzzyResolver()],
      dts: './src/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, 'src/'),
    },
  },
})
