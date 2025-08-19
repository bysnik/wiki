import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";
import { themeConfig } from './theme/themeConfig.ts'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: "СиСА Вики",
  description: "Сборник различной документации по Сетевому и Системному администрированию",
  lang: 'ru',
  base: '/wiki/',
  themeConfig: themeConfig,
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/png', href: '/wiki/tcpip_mini.png' }
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
  
  // Mermaid configuration
  mermaid: {
    theme: 'default',  // или 'dark', 'forest', etc.
    startOnLoad: true,
    securityLevel: 'loose',  // если нужны интерактивные элементы
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
    pie: {
    useWidth: 900, // Фикс для обрезания текста
  }
  },
  
  // Mermaid plugin configuration
  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container 
  },
}))