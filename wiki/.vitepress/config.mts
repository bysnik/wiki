import { defineConfig } from 'vitepress'
import { themeConfig } from './theme/themeConfig.ts'

import rpmSpecRaw from '@wooorm/starry-night/source.rpm-spec'
import changelogsRaw from '@wooorm/starry-night/source.changelogs.rpm-spec'

function toShikiLanguage(rawGrammar, langName) {
  return {
    name: langName,
    scopeName: rawGrammar.scopeName,
    patterns: rawGrammar.patterns,
    repository: rawGrammar.repository
    // aliases убраны, чтобы избежать циклических ссылок
  }
}

export default defineConfig({
  title: "СиСА Вики",
  description: "Сборник различной документации по Сетевому и Системному администрированию",
  lang: 'ru',
  base: '/wiki/',
  themeConfig: themeConfig,
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/wiki/tcpip.png' }],
  ],
  sitemap: {
    hostname: 'https://bysnik.github.io/wiki/',
  },
  markdown: {
    math: true,
    async shikiSetup(shiki) {
      shiki.loadLanguage(toShikiLanguage(changelogsRaw, 'changelogs-rpm-spec'))
      shiki.loadLanguage(toShikiLanguage(rpmSpecRaw, 'rpm-spec'))
    }
  }
})