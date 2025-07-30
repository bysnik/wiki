import { DefaultTheme } from 'vitepress'
import { sidebarConfig } from './sidebarConfig.ts'


export const themeConfig: DefaultTheme.Config = { 
    lastUpdated: {
      text: 'Обновлено',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    sidebar: sidebarConfig, 
    logo: '/tcpip.png',
    nav: [
      {
        text: 'Материалы по дисциплинам',
        items: [
          { text: 'Главная: материалы', link: '/docs/disciplines/' },
          { text: 'Технологии физического уровня передачи данных', link: '/docs/disciplines/tfupd/' },
          { text: 'Операционные системы и среды', link: '/docs/disciplines/osis/' },
          { text: 'Стандартизация, сертификация и техническое документоведение', link: '/docs/disciplines/ssitd/' },
          { text: 'Основы алгоритмизации и программирования', link: '/docs/disciplines/oaip/' },
          { text: 'Архитектура аппаратных средств', link: '/docs/disciplines/aas/' },
          { text: 'Основы проектирования баз данных', link: '/docs/disciplines/opbd/' },
          { text: 'Под вопросом: Основы теории информации', link: '/docs/disciplines/oti/' },
          { text: 'ПМ.01: Настройка сетевой инфраструктуры', link: '/docs/disciplines/pm1/' },
          { text: 'ПМ.02: Организация сетевого администрирования операционных систем', link: '/docs/disciplines/pm2/' },
          { text: 'ПМ.03: Эксплуатация объектов сетевой инфраструктуры', link: '/docs/disciplines/pm3/' },
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
      copyright: '© 2025 – настоящее время, Никита Б. Разработано на <a href="https://github.com/vuejs/vitepress">VitePress</a>.'
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
              }
            }
          }
        }
      }
    }
  }