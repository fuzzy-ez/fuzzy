import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

const r = (p: string) => resolve(__dirname, p)
export default defineConfig({
  plugins: [Vue(), VueJsx()],
  optimizeDeps: {
    disabled: true,
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    coverage: {
      provider: 'c8',
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
