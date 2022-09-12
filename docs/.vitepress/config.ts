import { defineConfig } from 'vitepress'

const guides = [
  { text: 'Quick Start', link: '/guide/index' },
  { text: 'Installation', link: '/guide/install' },
  { text: 'Overview', link: '/guide/overview' },
  { text: 'i18n', link: '/guide/i18n' },
  { text: 'Theming', link: '/guide/theme' },
  { text: 'Dark Mode', link: '/guide/dark' },
  { text: 'Changelog', link: '/guide/changelog' },
]
const nav = [
  {
    text: 'Guide',
    link: '/guide/index',
  },
  {
    text: 'Components',
    link: '/components/button',
  },
]

const sidebar = {
  '/guide': [
    {
      text: 'Development Guide',
      items: guides,
    },
  ],
  '/components': [
    {
      text: 'Basic',
      items: [
        {
          text: 'button',
          link: '/components/button',
        },
      ],
    },
  ],
}
export default defineConfig({

  title: 'Fuzzy-UI',
  lang: 'en-US',
  description: 'easy to use components',
  head: [
    ['meta', { property: 'og:title', content: 'Fuzzy-UI' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Fuzzy-UI for easy to use components',
      },
    ],
    [
      'meta',
      { property: 'og:url', content: 'https://github.com/fuzzy-ez/fuzzy' },
    ],
    ['link', { rel: 'icon', href: '/vite.svg', type: 'image/svg+xml' }],
  ],
  appearance: true,
  themeConfig: {
    logo: '/vite.svg',
    editLink: {
      pattern: 'https://github.com/fuzzy-ui/fuzzy-ui/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },
    nav,
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/fuzzy-ez/fuzzy',
      },
    ],
    sidebar,
    algolia: {
      appId: '',
      apiKey: '',
      indexName: '',
    },
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2022 priority',
    },
  },
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
})
