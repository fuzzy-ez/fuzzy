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
      imports: ['vue'],
      vueTemplate: true,
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [FuzzyResolver()],
      dts: 'src/components.d.ts',
    }),
  ],
})
