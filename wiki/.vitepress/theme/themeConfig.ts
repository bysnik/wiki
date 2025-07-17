import { DefaultTheme } from 'vitepress'
import { sidebarConfig } from './sidebarConfig.ts'


export const themeConfig: DefaultTheme.Config = { 
    sidebar: sidebarConfig, 
    logo: '/src/img/tcpip.jpg',
    nav: [
      {
        text: 'Материалы по дисциплинам',
        items: [
          { text: 'Все материалы', link: '/docs/disciplines/' },
        ]
      },
      {
        text: 'Демонстрационные экзамены',
        items: [
          { text: 'Все Демонстрационные экзамены', link: '/docs/de/' },
          { text: 'КОД 09.02.06-3-2025', link: '/docs/de/09.02.06.3.2025/' },

        ]
      },
      {
        text: 'Документация',
        link: '/docs/wi/'
      },
      {
        text: 'О нас',
        link: '/docs/about'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nik5612/wiki' },
//      { icon: 'gitlab', link: 'https://gitlab.basealt.space/' }
    ],

    footer: {
      message: 'Контакты: bystrovno@basealt.ru',
      copyright: '© 2025 – настоящее время, Никита Б.'
    },

    editLink: {
      pattern: 'https://github.com/nik5612/wiki/edit/main/wiki/:path'
    },


    search: {
      provider: 'local',
      options: {
        locales: {
          ru: { // используйте ключ `root`, если хотите перевести локаль по умолчанию
            translations: {
              button: {
                buttonText: 'Поиск',
                buttonAriaLabel: 'Поиск'
              },
              modal: {
                displayDetails: 'Отобразить подробный список',
                resetButtonTitle: 'Сбросить поиск',
                backButtonTitle: 'Закрыть поиск',
                noResultsText: 'Нет результатов по запросу',
                footer: {
                  selectText: 'выбрать',
                  selectKeyAriaLabel: 'выбрать',
                  navigateText: 'перейти',
                  navigateUpKeyAriaLabel: 'стрелка вверх',
                  navigateDownKeyAriaLabel: 'стрелка вниз',
                  closeText: 'закрыть',
                  closeKeyAriaLabel: 'esc'
                }
              },
            }
          }
        }
      }
    }
  }