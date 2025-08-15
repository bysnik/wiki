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
    }
  ],
   
  '/docs/de/09.02.06.3.2025/': [
    {
      items: [
        { text: 'Подготовка стенда', link: '/docs/de/09.02.06.3.2025/s/' },       
      ]
    },
    {
      text: 'Модули',
      items: [
        { text: 'Модуль 1', link: '/docs/de/09.02.06.3.2025/m1/' },
        { text: 'Модуль 2', link: '/docs/de/09.02.06.3.2025/m2/' }, 
        { text: 'Модуль 3', link: '/docs/de/09.02.06.3.2025/m3/' }, 
        { text: 'Вариативная часть', link: '/docs/de/09.02.06.3.2025/v/' },        
      ]
    },
  ],

  '/docs/wi/': [
    {
      text: 'Дистрибутивы Альт',
      items: [
        { text: 'Альт СП', link: '/docs/wi/altsp/' },       
      ]
    },
    {
      text: 'Сервисы',
      items: [
        { text: 'Podman', link: '/docs/wi/podman' },
        { text: 'Docker', link: '/docs/wi/docker' },
        { text: 'Gitea', link: '/docs/wi/gitea' },  
        { text: 'Git', link: '/docs/wi/git' }, 
        { text: 'Harbor', link: '/docs/wi/harbor' }, 
        { text: 'Cloud-init', link: '/docs/wi/cloudinit' }, 
        { text: 'MinIO', link: '/docs/wi/minio' },
        { text: '! Uptime Kuma', link: '/docs/wi/uptime-kuma' },
        { text: '! Codeberg Pages', link: '/docs/wi/codeberg-pages' },
        { text: '! Forgejo', link: '/docs/wi/forgejo' }, 
        { text: '! CTFd', link: '/docs/wi/ctfd' },    
        { text: '! Moodle', link: '/docs/wi/moodle' },  
        { text: '! Modelio', link: '/docs/wi/modelio' },
      ]
    },
    {
      items: [
        {
          text: 'Различное по мелочи',
          collapsed: true,
          items: [
            { text: 'Веб-камеры', link: '/docs/wi/webcam' },
            { text: 'Phoronix Test Suite', link: '/docs/wi/pts' },
            { text: 'Фишки', link: '/docs/wi/tricks' },
          ]
        }
      ]
    },
    {
      items: [
        {
          text: 'Игры',
          collapsed: true,
          items: [
            { text: 'Minecraft', link: '/docs/wi/games/minecraft' },
          ]
        }
      ]
    }
  ],

  '/docs/wi/altsp/': [
    {
      items: [
        { text: 'Назад', link: '/docs/wi/' },
        { text: 'Альт СП', link: '/docs/wi/altsp/' },
        { text: '1) x86-64, aarch64, Elbrus', link: '/docs/wi/altsp/1.arch' },
        { text: '2) Legacy or CSM, UEFU (Secure Boot)', link: '/docs/wi/altsp/2.install' },
        { text: '3) Ядро не ниже 6.1', link: '/docs/wi/altsp/3.core' },
        { text: '4) Графическая среда MATE', link: '/docs/wi/altsp/4.mate' },
        { text: '5) Работа на нескольких мониторах (видеокартах)', link: '/docs/wi/altsp/5.monitors' },
        { text: '6) Графическая настройка multiuser mode', link: '/docs/wi/altsp/6.graph_mult' },
        { text: '7) Руссифицированный интерфейс и документация', link: '/docs/wi/altsp/7.rus' },
        { text: '8) Различные варианты установки', link: '/docs/wi/altsp/8.var_inst' },
        { text: '9) Спасательный LiveCD', link: '/docs/wi/altsp/9.livecd' },
        { text: '10) Программный RAID и LVM', link: '/docs/wi/altsp/10.raid_lvm' },
        { text: '11) Безопасный режим', link: '/docs/wi/altsp/11.safemode' },
        { text: '12) OEM установка', link: '/docs/wi/altsp/12.oem' },
        { text: '13) Снапшоты', link: '/docs/wi/altsp/13.snapshot' },
        { text: '14) Выбор приложений во время установки', link: '/docs/wi/altsp/14.apps' },
        { text: '15) Инструмент поиска уязвимостей', link: '/docs/wi/altsp/15.trivy' },
        { text: '16) Инструмент проверки checksum', link: '/docs/wi/altsp/16.checksum' },
        { text: '17) Пароль на загрузчик', link: '/docs/wi/altsp/17.grub_pass' },
        { text: '18) Блокировка vtty', link: '/docs/wi/altsp/18.vtty' },
        { text: '19) Режим Киоск', link: '/docs/wi/altsp/19.kiosk' },
        { text: '20) Ограничение USB-устройств в GUI', link: '/docs/wi/altsp/20.usb' },
        { text: '21) Мониторинг ресурсов', link: '/docs/wi/altsp/21.resources' },
        { text: '22) Единый графический интерфейс для настроек', link: '/docs/wi/altsp/22.alterator' },
        { text: '23) Изолированные сеансы', link: '/docs/wi/altsp/23.isolate' },
        { text: '24) Права доступа', link: '/docs/wi/altsp/24.access_right' },
        { text: '25) Программа для ограничения ресурсов', link: '/docs/wi/altsp/25.limits' },
        { text: '26) Ограничение действий в консоли', link: '/docs/wi/altsp/26.controlpp' },
        { text: '27) Ограничение параллельных сеансов', link: '/docs/wi/altsp/27.maxlog' },
        { text: '28) Ограничение прав на запуск', link: '/docs/wi/altsp/28.secure' },
        { text: '29) Хеш-функции по ГОСТ Р 34.11-2012', link: '/docs/wi/altsp/29.rus_hash' },
        { text: '30) SSH-туннели и ГОСТ Р 34.12-2015', link: '/docs/wi/altsp/30.rus_ssh' },
        { text: '31) Смарт-карты', link: '/docs/wi/altsp/31.smartcard' },
        { text: '32) Восстановление сеанса', link: '/docs/wi/altsp/32.acco' },
        { text: '33) Экранная клавиатура', link: '/docs/wi/altsp/33.virtkeyb' },
        { text: '34) Работа с доменом Active Directory', link: '/docs/wi/altsp/34.ad' },
        { text: '35) Графический инструмент для работы с AD и GPO', link: '/docs/wi/altsp/35.admc' },
        { text: '36) Доступ к политикам AD', link: '/docs/wi/altsp/36.gpui' },
        { text: '37) Сетевые файлы и каталоги', link: '/docs/wi/altsp/37.share' },
        { text: '38) Функционирование пользовательских политик', link: '/docs/wi/altsp/38.ad_mate' },
        { text: '39) Домен FreeIPA', link: '/docs/wi/altsp/39.freeipa' },
        { text: '40) Безопасные VPN соединения', link: '/docs/wi/altsp/40.openvpn' },
        { text: '41) VPN-туннели ГОСТ Р 34.12-2015', link: '/docs/wi/altsp/41.openvpn_rus' },
        { text: '42) Межсетевой экран', link: '/docs/wi/altsp/42.firewall' },
        { text: '43) Изоляция приложений', link: '/docs/wi/altsp/43.isolate_app' },
        { text: '44) Безопасные настройки по умолчанию', link: '/docs/wi/altsp/44.safe_sett' },
        { text: '45) Управление фиксированными состояниями ключевых объектов', link: '/docs/wi/altsp/45.sec_obj' },
        { text: '46) OpenSSL по ГОСТ Р 34.11.2012', link: '/docs/wi/altsp/46.openssl_rus' },
        { text: '47) Утилита для работы с Электронными Подписями', link: '/docs/wi/altsp/47.cryptopro' },
        { text: '48) ФСТЭК 25.12.2020 г.  Методика выявления уязвимостей', link: '/docs/wi/altsp/48.fstek' },
        { text: '49) IMA и EVM', link: '/docs/wi/altsp/49.imaevm' },
        { text: '50) Локальная виртуализация', link: '/docs/wi/altsp/50.locvirt' },
        { text: '51) Поддержка файловых систем', link: '/docs/wi/altsp/51.manyfs' },
        { text: '52) Поддержка сетевых протоколов', link: '/docs/wi/altsp/52.netprotokols' },
        { text: '53) Доустановка ПО', link: '/docs/wi/altsp/53.apt' },
        { text: '54) Исходные коды, обновления, инструменты для сборки', link: '/docs/wi/altsp/54.opensource' },
        { text: '55) Единая система для установки ПО', link: '/docs/wi/altsp/55.epm' },
        { text: '56) Отечественные корневые сертификаты', link: '/docs/wi/altsp/56.digital.gov' },
        { text: '57) Поддержка корневых сертификатов ТЦИ', link: '/docs/wi/altsp/57.tlscc' },
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