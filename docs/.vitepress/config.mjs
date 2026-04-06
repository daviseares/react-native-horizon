import { defineConfig } from 'vitepress';

const repo = 'https://github.com/daviseares/react-native-horizon';

export default defineConfig({
  title: 'react-native-horizon',
  description: 'High-performance 360 viewer for React Native and Expo.',
  lang: 'pt-BR',
  base: '/react-native-horizon/',
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'react-native-horizon',
    nav: [
      { text: 'Guia', link: '/guide/getting-started' },
      { text: 'API', link: '/api/props' },
      { text: 'GitHub', link: repo }
    ],
    sidebar: [
      {
        text: 'Guia',
        items: [
          { text: 'Introducao', link: '/guide/getting-started' },
          { text: 'Exemplo Rapido', link: '/guide/quick-start' }
        ]
      },
      {
        text: 'Referencia',
        items: [
          { text: 'Props', link: '/api/props' },
          { text: 'Eventos', link: '/api/events' }
        ]
      },
      {
        text: 'Projeto',
        items: [
          { text: 'Status de Plataforma', link: '/project/platform-status' },
          { text: 'Roadmap', link: '/project/roadmap' }
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: repo }],
    footer: {
      message: 'Feito com Expo Modules e render nativo.',
      copyright: 'MIT License'
    },
    search: {
      provider: 'local'
    }
  },
  head: [
    ['meta', { name: 'theme-color', content: '#0d1b3e' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'react-native-horizon' }],
    ['meta', { property: 'og:description', content: 'Viewer 360 para React Native com iOS e Android nativos.' }],
    ['meta', { property: 'og:image', content: '/react-native-horizon/logo.svg' }]
  ]
});
