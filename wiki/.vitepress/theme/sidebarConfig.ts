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
        { text: 'Назад', link: '/docs/de/09.02.06.3.2025/' },       
      ]
    },
    {
      items: [
        { text: 'Подготовка стенда', link: '/docs/de/09.02.06.3.2025/s/' },       
      ]
    },
    {
      items: [
        { text: 'Модуль 1', link: '/docs/de/09.02.06.3.2025/m1/' },
        { text: 'Модуль 2', link: '/docs/de/09.02.06.3.2025/m2/' }, 
        { text: 'Модуль 3', link: '/docs/de/09.02.06.3.2025/m3/' }, 
        { text: 'Вариативная часть', link: '/docs/de/09.02.06.3.2025/v/' },        
      ]
    }
  ],

  '/docs/de/09.02.06.3.2025/m1/': [
    {
      items: [
        { text: 'Назад', link: '/docs/de/09.02.06.3.2025/' },       
      ]
    },
    {
      items: [
        { text: 'Подготовка стенда', link: '/docs/de/09.02.06.3.2025/s/' },       
      ]
    },
    {
      text: 'Модуль 1',
      items: [
        { text: 'Задание 1', link: '/docs/de/09.02.06.3.2025/m1/t1' }, 
        { text: 'Задание 2', link: '/docs/de/09.02.06.3.2025/m1/t2' },
        { text: 'Задание 3', link: '/docs/de/09.02.06.3.2025/m1/t3' },
        { text: 'Задание 4', link: '/docs/de/09.02.06.3.2025/m1/t4' },
        { text: 'Задание 5', link: '/docs/de/09.02.06.3.2025/m1/t5' },
        { text: 'Задание 6', link: '/docs/de/09.02.06.3.2025/m1/t6' },
        { text: 'Задание 7', link: '/docs/de/09.02.06.3.2025/m1/t7' },
        { text: 'Задание 8', link: '/docs/de/09.02.06.3.2025/m1/t8' },
        { text: 'Задание 9', link: '/docs/de/09.02.06.3.2025/m1/t9' },
        { text: 'Задание 10', link: '/docs/de/09.02.06.3.2025/m1/t10' },
        { text: 'Задание 11', link: '/docs/de/09.02.06.3.2025/m1/t11' },     
      ]
    },
    {
      items: [
        { text: 'Модуль 2', link: '/docs/de/09.02.06.3.2025/m2/' }, 
        { text: 'Модуль 3', link: '/docs/de/09.02.06.3.2025/m3/' }, 
        { text: 'Вариативная часть', link: '/docs/de/09.02.06.3.2025/v/' },        
      ]
    }
  ],

    '/docs/de/09.02.06.3.2025/m2/': [
    {
      items: [
        { text: 'Назад', link: '/docs/de/09.02.06.3.2025/' },       
      ]
    },
    {
      items: [
        { text: 'Подготовка стенда', link: '/docs/de/09.02.06.3.2025/s/' },       
      ]
    },
    {
      items: [
        { text: 'Модуль 1', link: '/docs/de/09.02.06.3.2025/m1/' },       
      ]
    },
    {
      text: 'Модуль 2',
      items: [
        { text: 'Задание 1', link: '/docs/de/09.02.06.3.2025/m2/t1' }, 
        { text: 'Задание 2', link: '/docs/de/09.02.06.3.2025/m2/t2' },
        { text: 'Задание 3', link: '/docs/de/09.02.06.3.2025/m2/t3' },
        { text: 'Задание 4', link: '/docs/de/09.02.06.3.2025/m2/t4' },
        { text: 'Задание 5', link: '/docs/de/09.02.06.3.2025/m2/t5' },
        { text: 'Задание 6', link: '/docs/de/09.02.06.3.2025/m2/t6' },
        { text: 'Задание 7', link: '/docs/de/09.02.06.3.2025/m2/t7' },
        { text: 'Задание 8', link: '/docs/de/09.02.06.3.2025/m2/t8' },
        { text: 'Задание 9', link: '/docs/de/09.02.06.3.2025/m2/t9' }, 
      ]
    },
    {
      items: [
        { text: 'Модуль 3', link: '/docs/de/09.02.06.3.2025/m3/' }, 
        { text: 'Вариативная часть', link: '/docs/de/09.02.06.3.2025/v/' },        
      ]
    }
  ],

      '/docs/de/09.02.06.3.2025/m3/': [
    {
      items: [
        { text: 'Назад', link: '/docs/de/09.02.06.3.2025/' },       
      ]
    },
    {
      items: [
        { text: 'Подготовка стенда', link: '/docs/de/09.02.06.3.2025/s/' },       
      ]
    },
    {
      items: [
        { text: 'Модуль 1', link: '/docs/de/09.02.06.3.2025/m1/' },  
        { text: 'Модуль 2', link: '/docs/de/09.02.06.3.2025/m2/' },      
      ]
    },
    {
      text: 'Модуль 3',
      items: [
        { text: 'Задание 1', link: '/docs/de/09.02.06.3.2025/m3/t1' }, 
        { text: 'Задание 2', link: '/docs/de/09.02.06.3.2025/m3/t2' },
        { text: 'Задание 3', link: '/docs/de/09.02.06.3.2025/m3/t3' },
        { text: 'Задание 4', link: '/docs/de/09.02.06.3.2025/m3/t4' },
        { text: 'Задание 5', link: '/docs/de/09.02.06.3.2025/m3/t5' },
        { text: 'Задание 6', link: '/docs/de/09.02.06.3.2025/m3/t6' },
        { text: 'Задание 7', link: '/docs/de/09.02.06.3.2025/m3/t7' },
        { text: 'Задание 8', link: '/docs/de/09.02.06.3.2025/m3/t8' },
        { text: 'Задание 9', link: '/docs/de/09.02.06.3.2025/m3/t9' }, 
      ]
    },
    {
      items: [
        { text: 'Вариативная часть', link: '/docs/de/09.02.06.3.2025/v/' },        
      ]
    }
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
        { text: '1С:Предприятие 8.3', link: '/docs/wi/1c' },
        { text: 'Cloud-init', link: '/docs/wi/cloudinit' },
        { text: '! Codeberg Pages', link: '/docs/wi/codeberg-pages' },
        { text: '! CTFd', link: '/docs/wi/ctfd' },
        { text: 'Docker', link: '/docs/wi/docker' },
        { text: 'Forgejo', link: '/docs/wi/forgejo' },
        { text: 'Gitea', link: '/docs/wi/gitea' },
        { text: 'Git', link: '/docs/wi/git' },
        { text: 'GNS3', link: '/docs/wi/gns3' },
        { text: 'Harbor', link: '/docs/wi/harbor' },
        { text: 'Logism', link: '/docs/wi/logism' },
        { text: 'MinIO', link: '/docs/wi/minio' },
        { text: 'Modelio', link: '/docs/wi/modelio' },
        { text: '! Moodle', link: '/docs/wi/moodle' },
        { text: 'Podman', link: '/docs/wi/podman' },
        { text: 'RARS Emulator', link: '/docs/wi/rars' },
        { text: 'Uptime Kuma', link: '/docs/wi/uptime-kuma' },
        { text: 'VM VirtualBox', link: '/docs/wi/vbox' },
        { text: 'Семантическое версионирование', link: 'https://semver.org/lang/ru/' },
      ]
    },
    {
      text: 'Сервисы (В планах)',
      collapsed: true,
      items: [
        { text: 'Bacula', link: '/docs/wi/bacula' },
        { text: 'BigBlueButton', link: '/docs/wi/bigbluebutton' },
        { text: 'Ejudge', link: '/docs/wi/ejudge' },
        { text: 'Flatpak', link: '/docs/wi/flatpak' },
        { text: 'Foreman', link: '/docs/wi/foreman' },
        { text: 'glpi', link: '/docs/wi/glpi' },
        { text: 'keycloak', link: '/docs/wi/keycloak' },
        { text: 'MediaWiki', link: '/docs/wi/mediawiki' },
        { text: 'Netbox', link: '/docs/wi/netbox' },
        { text: 'Nextcloud', link: '/docs/wi/nextcloud' },
        { text: 'NocoBase', link: '/docs/wi/nocobase' },
        { text: 'Open Project', link: '/docs/wi/open-project' },
        { text: 'OpenUDS', link: '/docs/wi/openuds' },
        { text: 'OpenVPN', link: '/docs/wi/openvpn' },
        { text: 'Pacemaker', link: '/docs/wi/pacemaker' },
        { text: 'Proxmox Backup Server', link: '/docs/wi/pbs' },
        { text: 'Redmine', link: '/docs/wi/redmine' },
        { text: 'Smath Studio', link: '/docs/wi/smath-studio' },
        { text: 'SOGo', link: '/docs/wi/sogo' },
        { text: 'Sphinx', link: '/docs/wi/sphinx' },
        { text: 'Taskcafe', link: '/docs/wi/taskcafe' },
        { text: 'Thunderbird + NextCloud', link: '/docs/wi/thunderbird-nextcloud' },
        { text: 'UrBackup', link: '/docs/wi/urbackup' },
        { text: 'Veyon', link: '/docs/wi/veyon' },
        { text: 'Weblate', link: '/docs/wi/weblate' },
        { text: 'Zabbix', link: '/docs/wi/zabbix' },
      ]
    },
    {
      text: 'Различное по мелочи',
      collapsed: true,
      items: [
        { text: 'Веб-камеры', link: '/docs/wi/webcam' },
        { text: 'Phoronix Test Suite', link: '/docs/wi/pts' },
        { text: 'Фишки', link: '/docs/wi/tricks' },
        { text: '! ZeroTier', link: '/docs/wi/zerotier' },
        { text: 'Git и Obsidian', link: '/docs/wi/git-obsidian' },
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
    },

    {
      items: [
        {
          text: 'Open Source CRM',
          collapsed: true,
          items: [
            { text: 'SuiteCRM', link: '/docs/wi/games/suitecrm' },
            { text: 'Totum', link: '/docs/wi/games/totum' },
            { text: 'EspoCRM', link: '/docs/wi/games/espocrm' },
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
        { text: 'Архитектура аппаратных средств', link: '/docs/disciplines/aas/' },
        { text: 'Операционные системы и среды', link: '/docs/disciplines/osis/' },
        { text: 'Основы алгоритмизации и программирования', link: '/docs/disciplines/oaip/' },
        { text: 'Основы теории информации', link: '/docs/disciplines/oti/' },
        { text: 'Основы проектирования баз данных', link: '/docs/disciplines/opbd/' },
        { text: 'Стандартизация, сертификация и техническое документоведение', link: '/docs/disciplines/ssitd/' },
        { text: 'Технологии физического уровня передачи данных', link: '/docs/disciplines/tfupd/' },      
      ]
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
          ]
        },
        {
          text: 'ПМ.02: Организация сетевого администрирования операционных систем',
          collapsed: true,
          items: [
            { text: 'Описание модуля', link: '/docs/disciplines/pm2/' },
            { text: 'МДК 02.01 Администрирование сетевых операционных сетей', link: '/docs/disciplines/pm2/mdk21/' },
            { text: 'МДК 02.02 Программное обеспечение компьютерных сетей', link: '/docs/disciplines/pm2/mdk22/' },
            { text: 'МДК 02.03 Организация администрирования компьютерных систем', link: '/docs/disciplines/pm2/mdk23/' },
          ]
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
  ],

  '/docs/disciplines/pm1/': [
    {
      text: 'ПМ.01: Настройка сетевой инфраструктуры',
      items: [
        { text: 'Все дисциплины', link: '/docs/disciplines/' },
        { text: 'Описание модуля', link: '/docs/disciplines/pm1/' },
        { text: 'МДК 01.01 Компьютерные сети', link: '/docs/disciplines/pm1/mdk11/' },
        { text: 'МДК 01.02 Организация, принципы построения и функционирования компьютерных сетей', link: '/docs/disciplines/pm1/mdk12/' },
        { text: 'МДК 01.03 Безопасность компьютерных сетей', link: '/docs/disciplines/pm1/mdk13/' },
      ]
    }
  ],

  '/docs/disciplines/pm2/': [
    {
      text: 'ПМ.02: Организация сетевого администрирования операционных систем',
      items: [
        { text: 'Все дисциплины', link: '/docs/disciplines/' },
        { text: 'Описание модуля', link: '/docs/disciplines/pm2/' },
        { text: 'МДК 02.01 Администрирование сетевых операционных сетей', link: '/docs/disciplines/pm2/mdk21/' },
        { text: 'МДК 02.02 Программное обеспечение компьютерных сетей', link: '/docs/disciplines/pm2/mdk22/' },
        { text: 'МДК 02.03 Организация администрирования компьютерных систем', link: '/docs/disciplines/pm2/mdk23/' },
      ]
    }
  ],

  '/docs/disciplines/pm3/': [
    {
      text: 'ПМ.03: Эксплуатация объектов сетевой инфраструктуры',
      items: [
        { text: 'Все дисциплины', link: '/docs/disciplines/' },
        { text: 'Описание модуля', link: '/docs/disciplines/pm3/' },
        { text: 'МДК 03.01 Эксплуатация объектов сетевой инфраструктуры', link: '/docs/disciplines/pm3/mdk31/' },
        { text: 'МДК 03.02 Ремонт и восстановление работоспособности компьютерных сетей', link: '/docs/disciplines/pm3/mdk32/' },
      ]
    }
  ],

  '/docs/disciplines/pm1/mdk11/': [
    {
      text: 'МДК 01.01 Компьютерные сети',
      items: [
        { text: 'Назад к модулю', link: '/docs/disciplines/pm1/' },
        { text: 'Урок 0. История развития т/к сетей', link: '/docs/disciplines/pm1/mdk11/history' },
        { text: 'Урок 0. Утилита TCPDump', link: '/docs/disciplines/pm1/mdk11/tcpdump' },
      ]
    }
  ],

  '/docs/disciplines/pm1/mdk12/': [
    {
      text: 'МДК 01.02 Организация, принципы построения и функционирования компьютерных сетей',
      items: [
        { text: 'Назад к модулю', link: '/docs/disciplines/pm1/' },
        { text: 'Урок 0. Тестовый', link: '/docs/disciplines/pm1/mdk11/page' },
      ]
    }
  ],

  '/docs/disciplines/pm1/mdk13/': [
    {
      text: 'МДК 01.03 Безопасность компьютерных сетей',
      items: [
        { text: 'Назад к модулю', link: '/docs/disciplines/pm1/' },
        { text: 'Урок 0. Тестовый', link: '/docs/disciplines/pm1/mdk12/page' },
      ]
    }
  ],

  '/docs/disciplines/pm2/mdk21/': [
    {
      text: 'МДК 02.01 Администрирование сетевых операционных сетей',
      items: [
        { text: 'Назад к модулю', link: '/docs/disciplines/pm2/' },
        { text: 'Урок 0. Основы контроля доступа', link: '/docs/disciplines/pm2/mdk21/basicaccesscontrol' },
        { text: 'Урок 0. NAT', link: '/docs/disciplines/pm2/mdk21/nat' },
      ]
    }
  ],

  '/docs/disciplines/pm2/mdk22/': [
    {
      text: 'МДК 02.02 Программное обеспечение компьютерных сетей',
      items: [
        { text: 'Назад к модулю', link: '/docs/disciplines/pm2/' },
        { text: 'Урок 0. Тестовый', link: '/docs/disciplines/pm2/mdk22/page' },
      ]
    }
  ],

  '/docs/disciplines/pm2/mdk23/': [
    {
      text: 'МДК 02.03 Организация администрирования компьютерных систем',
      items: [
        { text: 'Назад к модулю', link: '/docs/disciplines/pm2/' },
        { text: 'Урок 0. Тестовый', link: '/docs/disciplines/pm2/mdk23/page' },
      ]
    }
  ],

  '/docs/disciplines/pm3/mdk31/': [
    {
      text: 'МДК 03.01 Эксплуатация объектов сетевой инфраструктуры',
      items: [
        { text: 'Назад к модулю', link: '/docs/disciplines/pm3/' },
        { text: 'Урок ?. LXC и LXD', link: '/docs/disciplines/pm3/mdk31/lxclxd' },
        { text: 'Урок ?. Контейнеризация', link: '/docs/disciplines/pm3/mdk31/containers' },
      ]
    }
  ],

  '/docs/disciplines/pm3/mdk32/': [
    {
      text: 'МДК 03.02 Ремонт и восстановление работоспособности компьютерных сетей',
      items: [
        { text: 'Назад к модулю', link: '/docs/disciplines/pm3/' },
        { text: 'Урок 0. Тестовый', link: '/docs/disciplines/pm3/mdk32/page' },
      ]
    }
  ],
// Операционные системы и среды
  '/docs/disciplines/osis/': [
    {
      text: 'Операционные системы и среды',
      items: [
        { text: 'Назад к дисциплинам', link: '/docs/disciplines/' },
        { "text": "УМК и прочее", "link": "/docs/disciplines/osis/"},
      ]
    },

    {
      text: 'Лекции',
      collapsed: true,
      items: [
        { text: "Лекция 1", "link": "/docs/disciplines/osis/l1" },
        { text: "Лекция 2", "link": "/docs/disciplines/osis/l2" },
        { text: "Лекция 3", "link": "/docs/disciplines/osis/l3" },
        { text: "Лекция 4", "link": "/docs/disciplines/osis/l4" },
        { text: "Лекция 5", "link": "/docs/disciplines/osis/l5" },
        { text: "Лекция 6", "link": "/docs/disciplines/osis/l6" },
        { text: "Лекция 7", "link": "/docs/disciplines/osis/l7" },
        { text: "Лекция 8", "link": "/docs/disciplines/osis/l8" },
        { text: "Лекция 9", "link": "/docs/disciplines/osis/l9" },
        { text: "Лекция 10", "link": "/docs/disciplines/osis/l10" },
        { text: "Лекция 11", "link": "/docs/disciplines/osis/l11" },
      ]
    },

    {
      text: 'Практические работы',
      collapsed: true,
      items: [
        { text: "Практическая работа 1", "link": "/docs/disciplines/osis/p1" },
        { text: "Практическая работа 2", "link": "/docs/disciplines/osis/p2" },
        { text: "Практическая работа 3", "link": "/docs/disciplines/osis/p3" },
        { text: "Практическая работа 4", "link": "/docs/disciplines/osis/p4" },
        { text: "Практическая работа 5", "link": "/docs/disciplines/osis/p5" },
        { text: "Практическая работа 6", "link": "/docs/disciplines/osis/p6" },
        { text: "Практическая работа 7", "link": "/docs/disciplines/osis/p7" },
        { text: "Практическая работа 8", "link": "/docs/disciplines/osis/p8" },
      ]
    },

    {
      text: 'Самостоятельные работы',
      collapsed: true,
      items: [
        { text: "Самостоятельная работа 1", "link": "/docs/disciplines/osis/s1" },
        { text: "Самостоятельная работа 2", "link": "/docs/disciplines/osis/s2" },
        { text: "Самостоятельная работа 3", "link": "/docs/disciplines/osis/s3" },
        { text: "Самостоятельная работа 4", "link": "/docs/disciplines/osis/s4" },
        { text: "Самостоятельная работа 5", "link": "/docs/disciplines/osis/s5" },
        { text: "Самостоятельная работа 6", "link": "/docs/disciplines/osis/s6" },
        { text: "Самостоятельная работа 7", "link": "/docs/disciplines/osis/s7" },
        { text: "Самостоятельная работа 8", "link": "/docs/disciplines/osis/s8" },
      ]
    }
  ],
// Архитектура аппаратных средств
  '/docs/disciplines/aas/': [
    {
      text: 'Архитектура аппаратных средств',
      items: [
        { text: 'Назад к дисциплинам', link: '/docs/disciplines/' },
        { "text": "УМК и прочее", "link": "/docs/disciplines/ass/"},
      ]
    },

    {
      text: 'Лекции',
      collapsed: true,
      items: [
        { text: "Лекция 1", "link": "/docs/disciplines/ass/l1" },
        { text: "Лекция 2", "link": "/docs/disciplines/ass/l2" },
        { text: "Лекция 3", "link": "/docs/disciplines/ass/l3" },
        { text: "Лекция 4", "link": "/docs/disciplines/ass/l4" },
        { text: "Лекция 5", "link": "/docs/disciplines/ass/l5" },
        { text: "Лекция 6", "link": "/docs/disciplines/ass/l6" },
        { text: "Лекция 7", "link": "/docs/disciplines/ass/l7" },
        { text: "Лекция 8", "link": "/docs/disciplines/ass/l8" },
        { text: "Лекция 9", "link": "/docs/disciplines/ass/l9" },
        { text: "Лекция 10", "link": "/docs/disciplines/ass/l10" },
        { text: "Лекция 11", "link": "/docs/disciplines/ass/l11" },
        { text: "Лекция 12", "link": "/docs/disciplines/ass/l12" },
        { text: "Лекция 13", "link": "/docs/disciplines/ass/l13" },
        { text: "Лекция 14", "link": "/docs/disciplines/ass/l14" },
        { text: "Лекция 15", "link": "/docs/disciplines/ass/l15" },
        { text: "Лекция 16", "link": "/docs/disciplines/ass/l16" },
        { text: "Лекция 17", "link": "/docs/disciplines/ass/l17" },
      ]
    },

    {
      text: 'Практические работы',
      collapsed: true,
      items: [
        { text: "Практическая работа 1", "link": "/docs/disciplines/ass/p1" },
        { text: "Практическая работа 2", "link": "/docs/disciplines/ass/p2" },
        { text: "Практическая работа 3", "link": "/docs/disciplines/ass/p3" },
        { text: "Практическая работа 4", "link": "/docs/disciplines/ass/p4" },
        { text: "Практическая работа 5", "link": "/docs/disciplines/ass/p5" },
        { text: "Практическая работа 6", "link": "/docs/disciplines/ass/p6" },
        { text: "Практическая работа 7", "link": "/docs/disciplines/ass/p7" },
        { text: "Практическая работа 8", "link": "/docs/disciplines/ass/p8" },
      ]
    },

    {
      text: 'Самостоятельные работы',
      collapsed: true,
      items: [
        { text: "Самостоятельная работа 1", "link": "/docs/disciplines/ass/s1" },
        { text: "Самостоятельная работа 2", "link": "/docs/disciplines/ass/s2" },
        { text: "Самостоятельная работа 3", "link": "/docs/disciplines/ass/s3" },
        { text: "Самостоятельная работа 4", "link": "/docs/disciplines/ass/s4" },
        { text: "Самостоятельная работа 5", "link": "/docs/disciplines/ass/s5" },
        { text: "Самостоятельная работа 6", "link": "/docs/disciplines/ass/s6" },
        { text: "Самостоятельная работа 7", "link": "/docs/disciplines/ass/s7" },
        { text: "Самостоятельная работа 8", "link": "/docs/disciplines/ass/s8" },
      ]
    }
  ],
// Основы алгоритмизации и программирования
  '/docs/disciplines/oaip/': [
    {
      text: 'Основы алгоритмизации и программирования',
      items: [
        { text: 'Назад к дисциплинам', link: '/docs/disciplines/' },
        { "text": "УМК и прочее", "link": "/docs/disciplines/oaip/"},
      ]
    },

    {
      text: 'Лекции',
      collapsed: true,
      items: [
        { text: "Лекция 1", "link": "/docs/disciplines/oaip/l1" },
        { text: "Лекция 2", "link": "/docs/disciplines/oaip/l2" },
        { text: "Лекция 3", "link": "/docs/disciplines/oaip/l3" },
        { text: "Лекция 4", "link": "/docs/disciplines/oaip/l4" },
        { text: "Лекция 5", "link": "/docs/disciplines/oaip/l5" },
        { text: "Лекция 6", "link": "/docs/disciplines/oaip/l6" },
        { text: "Лекция 7", "link": "/docs/disciplines/oaip/l7" },
        { text: "Лекция 8", "link": "/docs/disciplines/oaip/l8" },
        { text: "Лекция 9", "link": "/docs/disciplines/oaip/l9" },
        { text: "Лекция 10", "link": "/docs/disciplines/oaip/l10" },
        { text: "Лекция 11", "link": "/docs/disciplines/oaip/l11" },
      ]
    },

    {
      text: 'Практические работы',
      collapsed: true,
      items: [
        { text: "Практическая работа 1", "link": "/docs/disciplines/oaip/p1" },
        { text: "Практическая работа 2", "link": "/docs/disciplines/oaip/p2" },
        { text: "Практическая работа 3", "link": "/docs/disciplines/oaip/p3" },
        { text: "Практическая работа 4", "link": "/docs/disciplines/oaip/p4" },
        { text: "Практическая работа 5", "link": "/docs/disciplines/oaip/p5" },
        { text: "Практическая работа 6", "link": "/docs/disciplines/oaip/p6" },
        { text: "Практическая работа 7", "link": "/docs/disciplines/oaip/p7" },
        { text: "Практическая работа 8", "link": "/docs/disciplines/oaip/p8" },
        { text: "Практическая работа 9", "link": "/docs/disciplines/oaip/p9" },
        { text: "Практическая работа 10", "link": "/docs/disciplines/oaip/p10" },
        { text: "Практическая работа 11", "link": "/docs/disciplines/oaip/p11" },
        { text: "Практическая работа 12", "link": "/docs/disciplines/oaip/p12" },
        { text: "Практическая работа 13", "link": "/docs/disciplines/oaip/p13" },
        { text: "Практическая работа 14", "link": "/docs/disciplines/oaip/p14" },
        { text: "Практическая работа 15", "link": "/docs/disciplines/oaip/p15" },
        { text: "Практическая работа 16", "link": "/docs/disciplines/oaip/p16" },
        { text: "Практическая работа 17", "link": "/docs/disciplines/oaip/p17" },
        { text: "Практическая работа 18", "link": "/docs/disciplines/oaip/p18" },
        { text: "Практическая работа 19", "link": "/docs/disciplines/oaip/p19" },
        { text: "Практическая работа 20", "link": "/docs/disciplines/oaip/p20" },
        { text: "Практическая работа 21", "link": "/docs/disciplines/oaip/p21" },
        { text: "Практическая работа 22", "link": "/docs/disciplines/oaip/p22" },
      ]
    },

    {
      text: 'Самостоятельные работы',
      collapsed: true,
      items: [
        { text: "Самостоятельная работа 1", "link": "/docs/disciplines/oaip/s1" },
        { text: "Самостоятельная работа 2", "link": "/docs/disciplines/oaip/s2" },
        { text: "Самостоятельная работа 3", "link": "/docs/disciplines/oaip/s3" },
        { text: "Самостоятельная работа 4", "link": "/docs/disciplines/oaip/s4" },
        { text: "Самостоятельная работа 5", "link": "/docs/disciplines/oaip/s5" },
        { text: "Самостоятельная работа 6", "link": "/docs/disciplines/oaip/s6" },
        { text: "Самостоятельная работа 7", "link": "/docs/disciplines/oaip/s7" },
        { text: "Самостоятельная работа 8", "link": "/docs/disciplines/oaip/s8" },
      ]
    }
  ],
// Основы проектирования баз данных
  '/docs/disciplines/opbd/': [
    {
      text: 'Основы проектирования баз данных',
      items: [
        { text: 'Назад к дисциплинам', link: '/docs/disciplines/' },
        { "text": "УМК и прочее", "link": "/docs/disciplines/opbd/"},
      ]
    },

    {
      text: 'Лекции',
      collapsed: true,
      items: [
        { text: "Лекция 1", "link": "/docs/disciplines/opbd/l1" },
        { text: "Лекция 2", "link": "/docs/disciplines/opbd/l2" },
        { text: "Лекция 3", "link": "/docs/disciplines/opbd/l3" },
      ]
    },

    {
      text: 'Практические работы',
      collapsed: true,
      items: [
        { text: "Практическая работа 1", "link": "/docs/disciplines/opbd/p1" },
        { text: "Практическая работа 2", "link": "/docs/disciplines/opbd/p2" },
        { text: "Практическая работа 3", "link": "/docs/disciplines/opbd/p3" },
        { text: "Практическая работа 4", "link": "/docs/disciplines/opbd/p4" },
        { text: "Практическая работа 5", "link": "/docs/disciplines/opbd/p5" },
        { text: "Практическая работа 6", "link": "/docs/disciplines/opbd/p6" },
        { text: "Практическая работа 7", "link": "/docs/disciplines/opbd/p7" },
        { text: "Практическая работа 8", "link": "/docs/disciplines/opbd/p8" },
        { text: "Практическая работа 9", "link": "/docs/disciplines/opbd/p9" },
        { text: "Практическая работа 10", "link": "/docs/disciplines/opbd/p10" },
        { text: "Практическая работа 11", "link": "/docs/disciplines/opbd/p11" },
        { text: "Практическая работа 12", "link": "/docs/disciplines/opbd/p12" },
        { text: "Практическая работа 13", "link": "/docs/disciplines/opbd/p13" },
        { text: "Практическая работа 14", "link": "/docs/disciplines/opbd/p14" },
        { text: "Практическая работа 15", "link": "/docs/disciplines/opbd/p15" },
        { text: "Практическая работа 16", "link": "/docs/disciplines/opbd/p16" },
        { text: "Практическая работа 17", "link": "/docs/disciplines/opbd/p17" },
      ]
    },

    {
      text: 'Самостоятельные работы',
      collapsed: true,
      items: [
        { text: "Самостоятельная работа 1", "link": "/docs/disciplines/opbd/s1" },
        { text: "Самостоятельная работа 2", "link": "/docs/disciplines/opbd/s2" },
        { text: "Самостоятельная работа 3", "link": "/docs/disciplines/opbd/s3" },
        { text: "Самостоятельная работа 4", "link": "/docs/disciplines/opbd/s4" },
        { text: "Самостоятельная работа 5", "link": "/docs/disciplines/opbd/s5" },
        { text: "Самостоятельная работа 6", "link": "/docs/disciplines/opbd/s6" },
        { text: "Самостоятельная работа 7", "link": "/docs/disciplines/opbd/s7" },
      ]
    }
  ],
// Основы теории информации
  '/docs/disciplines/oti/': [
    {
      text: 'Основы теории информации',
      items: [
        { text: 'Назад к дисциплинам', link: '/docs/disciplines/' },
        { "text": "УМК и прочее", "link": "/docs/disciplines/oti/"},
      ]
    },

    {
      text: 'Лекции',
      collapsed: true,
      items: [
        { text: "Лекция 1", "link": "/docs/disciplines/oti/l1" },
        { text: "Лекция 2", "link": "/docs/disciplines/oti/l2" },
        { text: "Лекция 3", "link": "/docs/disciplines/oti/l3" },
        { text: "Лекция 4", "link": "/docs/disciplines/oti/l4" },
        { text: "Лекция 5", "link": "/docs/disciplines/oti/l5" },
        { text: "Лекция 6", "link": "/docs/disciplines/oti/l6" },
        { text: "Лекция 7", "link": "/docs/disciplines/oti/l7" },
        { text: "Лекция 8", "link": "/docs/disciplines/oti/l8" },
        { text: "Лекция 9", "link": "/docs/disciplines/oti/l9" },
        { text: "Лекция 10", "link": "/docs/disciplines/oti/l10" },
        { text: "Лекция 11", "link": "/docs/disciplines/oti/l11" },
        { text: "Лекция 12", "link": "/docs/disciplines/oti/l12" },
        { text: "Лекция 13", "link": "/docs/disciplines/oti/l13" },
      ]
    },

    {
      text: 'Практические работы',
      collapsed: true,
      items: [
        { text: "Практическая работа 1", "link": "/docs/disciplines/oti/p1" },
        { text: "Практическая работа 2", "link": "/docs/disciplines/oti/p2" },
        { text: "Практическая работа 3", "link": "/docs/disciplines/oti/p3" },
        { text: "Практическая работа 4", "link": "/docs/disciplines/oti/p4" },
        { text: "Практическая работа 5", "link": "/docs/disciplines/oti/p5" },
        { text: "Практическая работа 6", "link": "/docs/disciplines/oti/p6" },
        { text: "Практическая работа 7", "link": "/docs/disciplines/oti/p7" },
        { text: "Практическая работа 8", "link": "/docs/disciplines/oti/p8" },
        { text: "Практическая работа 9", "link": "/docs/disciplines/oti/p9" },
      ]
    },

    {
      text: 'Самостоятельные работы',
      collapsed: true,
      items: [
        { text: "Самостоятельная работа 1", "link": "/docs/disciplines/oti/s1" },
        { text: "Самостоятельная работа 2", "link": "/docs/disciplines/oti/s2" },
        { text: "Самостоятельная работа 3", "link": "/docs/disciplines/oti/s3" },
        { text: "Самостоятельная работа 4", "link": "/docs/disciplines/oti/s4" },
        { text: "Самостоятельная работа 5", "link": "/docs/disciplines/oti/s5" },
        { text: "Самостоятельная работа 6", "link": "/docs/disciplines/oti/s6" },
        { text: "Самостоятельная работа 7", "link": "/docs/disciplines/oti/s7" },
        { text: "Самостоятельная работа 8", "link": "/docs/disciplines/oti/s8" },
        { text: "Самостоятельная работа 9", "link": "/docs/disciplines/oti/s9" },
      ]
    }
  ],
// Стандартизация, сертификация и техническое документоведение
  '/docs/disciplines/ssitd/': [
    {
      text: 'Стандартизация, сертификация и техническое документоведение',
      items: [
        { text: 'Назад к дисциплинам', link: '/docs/disciplines/' },
        { "text": "УМК и прочее", "link": "/docs/disciplines/ssitd/"},
      ]
    },

    {
      text: 'Лекции',
      collapsed: true,
      items: [
        { text: "Лекция 1", "link": "/docs/disciplines/ssitd/l1" },
        { text: "Лекция 2", "link": "/docs/disciplines/ssitd/l2" },
        { text: "Лекция 3", "link": "/docs/disciplines/ssitd/l3" },
        { text: "Лекция 4", "link": "/docs/disciplines/ssitd/l4" },
        { text: "Лекция 5", "link": "/docs/disciplines/ssitd/l5" },
        { text: "Лекция 6", "link": "/docs/disciplines/ssitd/l6" },
        { text: "Лекция 7", "link": "/docs/disciplines/ssitd/l7" },
        { text: "Лекция 8", "link": "/docs/disciplines/ssitd/l8" },
        { text: "Лекция 9", "link": "/docs/disciplines/ssitd/l9" },
        { text: "Лекция 10", "link": "/docs/disciplines/ssitd/l10" },
        { text: "Лекция 11", "link": "/docs/disciplines/ssitd/l11" },
        { text: "Лекция 12", "link": "/docs/disciplines/ssitd/l12" },
        { text: "Лекция 13", "link": "/docs/disciplines/ssitd/l13" },
        { text: "Лекция 14", "link": "/docs/disciplines/ssitd/l14" },
        { text: "Лекция 15", "link": "/docs/disciplines/ssitd/l15" },
        { text: "Лекция 16", "link": "/docs/disciplines/ssitd/l16" },
        { text: "Лекция 17", "link": "/docs/disciplines/ssitd/l17" },
        { text: "Лекция 18", "link": "/docs/disciplines/ssitd/l18" },
        { text: "Лекция 19", "link": "/docs/disciplines/ssitd/l19" },
        { text: "Лекция 20", "link": "/docs/disciplines/ssitd/l20" },
        { text: "Лекция 21", "link": "/docs/disciplines/ssitd/l21" },
        { text: "Лекция 22", "link": "/docs/disciplines/ssitd/l22" },
        { text: "Лекция 23", "link": "/docs/disciplines/ssitd/l23" },
        { text: "Лекция 24", "link": "/docs/disciplines/ssitd/l24" },
      ]
    },

    {
      text: 'Практические работы',
      collapsed: true,
      items: [
        { text: "Практическая работа 1", "link": "/docs/disciplines/ssitd/p1" },
        { text: "Практическая работа 2", "link": "/docs/disciplines/ssitd/p2" },
        { text: "Практическая работа 3", "link": "/docs/disciplines/ssitd/p3" },
        { text: "Практическая работа 4", "link": "/docs/disciplines/ssitd/p4" },
      ]
    },

    {
      text: 'Самостоятельные работы',
      collapsed: true,
      items: [
        { text: "Самостоятельная работа 1", "link": "/docs/disciplines/ssitd/s1" },
        { text: "Самостоятельная работа 2", "link": "/docs/disciplines/ssitd/s2" },
        { text: "Самостоятельная работа 3", "link": "/docs/disciplines/ssitd/s3" },
        { text: "Самостоятельная работа 4", "link": "/docs/disciplines/ssitd/s4" },
      ]
    }
  ],
// Технологии физического уровня передачи данных
  '/docs/disciplines/tfupd/': [
    {
      text: 'Технологии физического уровня передачи данных',
      items: [
        { text: 'Назад к дисциплинам', link: '/docs/disciplines/' },
        { "text": "УМК и прочее", "link": "/docs/disciplines/tfupd/"},
      ]
    },

    {
      text: 'Лекции',
      collapsed: true,
      items: [
        { text: "Лекция 1", "link": "/docs/disciplines/tfupd/l1" },
        { text: "Лекция 2", "link": "/docs/disciplines/tfupd/l2" },
        { text: "Лекция 3", "link": "/docs/disciplines/tfupd/l3" },
        { text: "Лекция 4", "link": "/docs/disciplines/tfupd/l4" },
      ]
    },

    {
      text: 'Практические работы',
      collapsed: true,
      items: [
        { text: "Практическая работа 1", "link": "/docs/disciplines/tfupd/p1" },
        { text: "Практическая работа 2", "link": "/docs/disciplines/tfupd/p2" },
        { text: "Практическая работа 3", "link": "/docs/disciplines/tfupd/p3" },
        { text: "Практическая работа 4", "link": "/docs/disciplines/tfupd/p4" },
        { text: "Практическая работа 5", "link": "/docs/disciplines/tfupd/p5" },
        { text: "Практическая работа 6", "link": "/docs/disciplines/tfupd/p6" },
        { text: "Практическая работа 7", "link": "/docs/disciplines/tfupd/p7" },
        { text: "Практическая работа 8", "link": "/docs/disciplines/tfupd/p8" },
        { text: "Практическая работа 9", "link": "/docs/disciplines/tfupd/p9" },
        { text: "Практическая работа 10", "link": "/docs/disciplines/tfupd/p10" },
        { text: "Практическая работа 11", "link": "/docs/disciplines/tfupd/p11" },
        { text: "Практическая работа 12", "link": "/docs/disciplines/tfupd/p12" },
        { text: "Практическая работа 13", "link": "/docs/disciplines/tfupd/p13" },
        { text: "Практическая работа 14", "link": "/docs/disciplines/tfupd/p14" },
        { text: "Практическая работа 15", "link": "/docs/disciplines/tfupd/p15" },
        { text: "Практическая работа 16", "link": "/docs/disciplines/tfupd/p16" },
      ]
    },

    {
      text: 'Самостоятельные работы',
      collapsed: true,
      items: [
        { text: "Самостоятельная работа 1", "link": "/docs/disciplines/tfupd/s1" },
        { text: "Самостоятельная работа 2", "link": "/docs/disciplines/tfupd/s2" },
        { text: "Самостоятельная работа 3", "link": "/docs/disciplines/tfupd/s3" },
        { text: "Самостоятельная работа 4", "link": "/docs/disciplines/tfupd/s4" },
      ]
    }
  ],
  
}