import { defineConfig } from 'vitepress'
import { themeConfig } from './theme/themeConfig.ts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My little wiki",
  description: "A VitePress Site",
  lang: 'ru',
	base: '/wiki/',
  themeConfig: themeConfig,
})
