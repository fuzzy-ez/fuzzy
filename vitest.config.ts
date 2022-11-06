import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'

const r = (p: string) => resolve(__dirname, p)
export default defineConfig({
  plugins: [
    Vue(),
    VueJsx(),
    DefineOptions(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
    }),
  ],
  optimizeDeps: {
    disabled: true,
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
  resolve: {
    alias: {
      '@fuzzy/cli': r('./packages/cli'),
      '@fuzzy/components': r('./packages/components'),
      '@fuzzy/utils': r('./packages/utils'),
      'fuzzy': r('./packages/onu-ui'),
    },
  },
})
