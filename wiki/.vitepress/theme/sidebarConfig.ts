import type { DefaultTheme } from 'vitepress'


export const sidebarConfig: DefaultTheme.Sidebar = {
  // Для файлов из корня
  '/': [
    {
      items: [
        { text: 'Материалы по дисциплинам', link: '/docs/disciplines/' },
        { text: 'Демонстрационные экзамены', link: '/docs/de/' },
        { text: 'Документация', link: '/docs/wi/' },
        { text: 'Дорожная карта студентаы', link: '/docs/roadmap' },
      ]
    },
  ],
   

  '/docs/wi/': [
    {
      text: 'Основные блоки',
      items: [
        { text: 'Ссылка', link: '/docs/wi/1' },
        { text: 'Ссылка', link: '/docs/wi/2' },
        {
          text: 'Блок 2 уровень',
          collapsed: true,
          items: [
            { text: 'Тестовый гайд', link: '/docs/wi/testguide/' },
            { text: 'Ссылка', link: '/docs/wi/4' },
            { text: 'Ссылка', link: '/docs/wi/5' },
          ],
        },
        {
          text: 'Блок 2 уровень',
          collapsed: true,
          items: [
            { text: 'Ссылка', link: '/docs/wi/6' },
            { text: 'Ссылка', link: '/docs/wi/7' },
            { text: 'Ссылка', link: '/docs/wi/8' },
          ],
        },
        {
          text: 'Блок 2 уровень',
          collapsed: true,
          items: [
            { text: 'Ссылка', link: '/docs/wi/9' },
            { text: 'Ссылка', link: '/docs/wi/10' },
            { text: 'Ссылка', link: '/docs/wi/11' },
          ],
        },
      ]
    }
  ]
}