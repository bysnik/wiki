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
  ],
 
  '/docs/disciplines/': [
    {
      text: 'Общепрофессиональные дисциплины',
      items: [
        { text: 'Технологии физического уровня передачи данных', link: '/docs/disciplines/tfupd/' },
        { text: 'Операционные системы и среды', link: '/docs/disciplines/osis/' },
        { text: 'Стандартизация, сертификация и техническое документоведение', link: '/docs/disciplines/ssitd/' },
        { text: 'Основы алгоритмизации и программирования', link: '/docs/disciplines/oaip/' },
        { text: 'Архитектура аппаратных средств', link: '/docs/disciplines/aas/' },
        { text: 'Основы проектирования баз данных', link: '/docs/disciplines/opbd/' },
        { text: 'Под вопросом: Основы теории информации', link: '/docs/disciplines/oti/' },
      ],
    },

    {
      text: 'Профессиональные модули',
      items: [
        {
          text: 'ПМ.01: Настройка сетевой инфраструктуры',
          collapsed: true,
          items: [
            { text: 'Описание модуля', link: '/docs/disciplines/pm1/' },
            { text: 'МДК 01.01 Компьютерные сети', link: '/docs/disciplines/pm1/mdk11/' },
            { text: 'МДК 01.02 Организация, принципы построения и функционирования компьютерных сетей', link: '/docs/disciplines/pm1/mdk12/' },
            { text: 'МДК 01.03 Безопасность компьютерных сетей', link: '/docs/disciplines/pm1/mdk13/' },
          ],
        },
        {
          text: 'ПМ.02: Организация сетевого администрирования операционных систем',
          collapsed: true,
          items: [
            { text: 'Описание модуля', link: '/docs/disciplines/pm2/' },
            { text: 'МДК 02.01 Администрирование сетевых операционных сетей', link: '/docs/disciplines/pm2/mdk21/' },
            { text: 'МДК 02.02 Программное обеспечение компьютерных сетей', link: '/docs/disciplines/pm2/mdk22/' },
            { text: 'МДК 02.03 Организация администрирования компьютерных систем', link: '/docs/disciplines/pm2/mdk23/' },
          ],
        },
        {
          text: 'ПМ.03: Эксплуатация объектов сетевой инфраструктуры',
          collapsed: true,
          items: [
            { text: 'Описание модуля', link: '/docs/disciplines/pm3/' },
            { text: 'МДК 03.01 Эксплуатация объектов сетевой инфраструктуры', link: '/docs/disciplines/pm3/mdk31/' },
            { text: 'МДК 03.02 Ремонт и восстановление работоспособности компьютерных сетей', link: '/docs/disciplines/pm3/mdk32/' },
          ]
        }
      ]
    }
  ]
}