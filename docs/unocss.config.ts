import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno({
      attributifyPseudo: true,
    }),
    presetAttributify(),
    presetIcons({
      cdn: 'https://esm.sh/',
    }),
    presetTypography(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],

  shortcuts: [
    {
    },
  ],
})
