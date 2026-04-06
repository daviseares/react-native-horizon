import { defineConfig } from 'vitepress';

const repo = 'https://github.com/daviseares/react-native-horizon';

export default defineConfig({
  title: 'react-native-horizon',
  description: 'High-performance native 360 viewer for React Native and Expo.',
  lang: 'en-US',
  base: '/react-native-horizon/',
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'react-native-horizon',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/props' },
      { text: 'GitHub', link: repo }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Quick Start', link: '/guide/quick-start' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Props', link: '/api/props' },
          { text: 'Events', link: '/api/events' }
        ]
      },
      {
        text: 'Project',
        items: [
          { text: 'Platform Status', link: '/project/platform-status' },
          { text: 'Roadmap', link: '/project/roadmap' }
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: repo }],
    footer: {
      message: 'Built with Expo Modules and native rendering.',
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
    ['meta', { property: 'og:description', content: 'Native 360 viewer for React Native with iOS and Android rendering.' }],
    ['meta', { property: 'og:image', content: '/react-native-horizon/logo.svg' }]
  ]
});
