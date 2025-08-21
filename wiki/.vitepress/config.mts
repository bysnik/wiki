import { defineConfig } from 'vitepress'
import { themeConfig } from './theme/themeConfig.ts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "СиСА Вики",
  description: "Сборник различной документации по Сетевому и Системному администрированию",
  lang: 'ru',
  base: '/wiki/',
  themeConfig: themeConfig,
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/png', href: '/wiki/tcpip.png' }
    ],
    // ['meta', { name: 'theme-color', content: '#5f67ee' }],
    // ['meta', { property: 'og:type', content: 'website' }],
    // ['meta', { property: 'og:site_name', content: 'VitePress' }],
    // [
    //   'meta',
    //   {
    //     property: 'og:image',
    //     content: 'https://vitepress.dev/vitepress-og.jpg'
    //   }
    // ],
    // ['meta', { property: 'og:url', content: 'https://vitepress.dev/' }],
    // [
    //   'script',
    //   {
    //     src: 'https://cdn.usefathom.com/script.js',
    //     'data-site': 'AZBRSFGG',
    //     'data-spa': 'auto',
    //     defer: ''
    //   }
    // ]
  ],

})