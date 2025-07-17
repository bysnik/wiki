import { defineConfig } from 'vitepress'
import { themeConfig } from './theme/themeConfig.ts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "СиСА Вики",
  description: "Сборник различной документации по Сетевому и Системному администрированию",
  lang: 'ru',
	base: '/wiki/',
  themeConfig: themeConfig,
})
