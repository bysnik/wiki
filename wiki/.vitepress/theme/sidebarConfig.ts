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

  '/docs/de/09.02.06.1.2026/': [
    {
      items: [
        { text: 'Назад', link: '/docs/de/09.02.06.1.2026/' },       
      ]
    },
    {
      items: [
        { text: 'Подготовка стенда', link: '/docs/de/09.02.06.1.2026/s/' },       
      ]
    },
    {
      items: [
        { text: 'Модуль 1', link: '/docs/de/09.02.06.1.2026/m1/' },
        { text: 'Модуль 2', link: '/docs/de/09.02.06.1.2026/m2/' }, 
        { text: 'Модуль 3', link: '/docs/de/09.02.06.1.2026/m3/' }, 
        { text: 'Вариативная часть', link: '/docs/de/09.02.06.1.2026/v/' },        
      ]
    }
  ],

  '/docs/de/09.02.06.1.2026/m1/': [
    {
      items: [
        { text: 'Назад', link: '/docs/de/09.02.06.1.2026/' },       
      ]
    },
    {
      items: [
        { text: 'Подготовка стенда', link: '/docs/de/09.02.06.1.2026/s/' },       
      ]
    },
    {
      text: 'Модуль 1',
      items: [
        { text: 'Задание 1', link: '/docs/de/09.02.06.1.2026/m1/t1' }, 
        { text: 'Задание 2', link: '/docs/de/09.02.06.1.2026/m1/t2' },
        { text: 'Задание 3', link: '/docs/de/09.02.06.1.2026/m1/t3' },
        { text: 'Задание 4', link: '/docs/de/09.02.06.1.2026/m1/t4' },
        { text: 'Задание 5', link: '/docs/de/09.02.06.1.2026/m1/t5' },
        { text: 'Задание 6', link: '/docs/de/09.02.06.1.2026/m1/t6' },
        { text: 'Задание 7', link: '/docs/de/09.02.06.1.2026/m1/t7' },
        { text: 'Задание 8', link: '/docs/de/09.02.06.1.2026/m1/t8' },
        { text: 'Задание 9', link: '/docs/de/09.02.06.1.2026/m1/t9' },
        { text: 'Задание 10', link: '/docs/de/09.02.06.1.2026/m1/t10' },
        { text: 'Задание 11', link: '/docs/de/09.02.06.1.2026/m1/t11' },     
      ]
    },
    {
      items: [
        { text: 'Модуль 2', link: '/docs/de/09.02.06.1.2026/m2/' }, 
        { text: 'Модуль 3', link: '/docs/de/09.02.06.1.2026/m3/' }, 
        { text: 'Вариативная часть', link: '/docs/de/09.02.06.1.2026/v/' },        
      ]
    }
  ],

    '/docs/de/09.02.06.1.2026/m2/': [
    {
      items: [
        { text: 'Назад', link: '/docs/de/09.02.06.1.2026/' },       
      ]
    },
    {
      items: [
        { text: 'Подготовка стенда', link: '/docs/de/09.02.06.1.2026/s/' },       
      ]
    },
    {
      items: [
        { text: 'Модуль 1', link: '/docs/de/09.02.06.1.2026/m1/' },       
      ]
    },
    {
      text: 'Модуль 2',
      items: [
        { text: 'Задание 1', link: '/docs/de/09.02.06.1.2026/m2/t1' }, 
        { text: 'Задание 2', link: '/docs/de/09.02.06.1.2026/m2/t2' },
        { text: 'Задание 3', link: '/docs/de/09.02.06.1.2026/m2/t3' },
        { text: 'Задание 4', link: '/docs/de/09.02.06.1.2026/m2/t4' },
        { text: 'Задание 5', link: '/docs/de/09.02.06.1.2026/m2/t5' },
        { text: 'Задание 6', link: '/docs/de/09.02.06.1.2026/m2/t6' },
        { text: 'Задание 7', link: '/docs/de/09.02.06.1.2026/m2/t7' },
        { text: 'Задание 8', link: '/docs/de/09.02.06.1.2026/m2/t8' },
        { text: 'Задание 9', link: '/docs/de/09.02.06.1.2026/m2/t9' }, 
      ]
    },
    {
      items: [
        { text: 'Модуль 3', link: '/docs/de/09.02.06.1.2026/m3/' }, 
        { text: 'Вариативная часть', link: '/docs/de/09.02.06.1.2026/v/' },        
      ]
    }
  ],

      '/docs/de/09.02.06.1.2026/m3/': [
    {
      items: [
        { text: 'Назад', link: '/docs/de/09.02.06.1.2026/' },       
      ]
    },
    {
      items: [
        { text: 'Подготовка стенда', link: '/docs/de/09.02.06.1.2026/s/' },       
      ]
    },
    {
      items: [
        { text: 'Модуль 1', link: '/docs/de/09.02.06.1.2026/m1/' },  
        { text: 'Модуль 2', link: '/docs/de/09.02.06.1.2026/m2/' },      
      ]
    },
    {
      text: 'Модуль 3',
      items: [
        { text: 'Задание 1', link: '/docs/de/09.02.06.1.2026/m3/t1' }, 
        { text: 'Задание 2', link: '/docs/de/09.02.06.1.2026/m3/t2' },
        { text: 'Задание 3', link: '/docs/de/09.02.06.1.2026/m3/t3' },
        { text: 'Задание 4', link: '/docs/de/09.02.06.1.2026/m3/t4' },
        { text: 'Задание 5', link: '/docs/de/09.02.06.1.2026/m3/t5' },
        { text: 'Задание 6', link: '/docs/de/09.02.06.1.2026/m3/t6' },
        { text: 'Задание 7', link: '/docs/de/09.02.06.1.2026/m3/t7' },
        { text: 'Задание 8', link: '/docs/de/09.02.06.1.2026/m3/t8' },
        { text: 'Задание 9', link: '/docs/de/09.02.06.1.2026/m3/t9' }, 
      ]
    },
    {
      items: [
        { text: 'Вариативная часть', link: '/docs/de/09.02.06.1.2026/v/' },        
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
        { text: '! Anytype', link: '/docs/wi/anytype' }, // чёт тип обсидиана
        { text: '! Beekeeper Studio', link: '/docs/wi/beekeeper-studio' },
        { text: '! BSS Crypto Plugin', link: '/docs/wi/bssCryptoPlugin' },
        { text: '! Bugzilla', link: '/docs/wi/bugzilla' },
        { text: 'Cloud-init', link: '/docs/wi/cloudinit' },
        { text: '! Codeberg Pages', link: '/docs/wi/codeberg-pages' },
        { text: '! CTFd', link: '/docs/wi/ctfd' }, 
        { text: '! DPI', link: '/docs/wi/dpi' },
        { text: '! DupeGuru', link: '/docs/wi/dupeguru' },
        { text: '! INFRAX', link: '/docs/wi/infrax' }, 
        { text: '! Компас 3D', link: '/docs/wi/compas3d' },
        { text: '! Matrix', link: '/docs/wi/matrix' },   
        { text: 'MinIO', link: '/docs/wi/minio' },     
        { text: '! Moodle', link: '/docs/wi/moodle' },
        { text: 'MTS Link', link: '/docs/wi/mts-link' },
        { text: '! n8n', link: '/docs/wi/n8n' },
        { text: '! OpenStack', link: '/docs/wi/openstack' }, 
        { text: '! RustDesk', link: '/docs/wi/rustdesk' },
        { text: 'Uptime Kuma', link: '/docs/wi/uptime-kuma' },
        { text: 'WinApps', link: '/docs/wi/winapps' },
        { text: 'Yandex Music', link: '/docs/wi/yandexmusic' },
      ]
    },
    {
      text: 'Single Sign-On',
      collapsed: true,
      items: [
        { text: '! Keycloak', link: '/docs/wi/keycloak' },
        { text: '0 zitadel', link: '/docs/wi/zitadel' }, // https://github.com/zitadel/zitadel   
      ]
    },
    
    {
      text: 'Git и репозитории',
      collapsed: true,
      items: [
        { text: 'Forgejo', link: '/docs/wi/forgejo' },
        { text: 'Git', link: '/docs/wi/git' },
        { text: 'Gitea', link: '/docs/wi/gitea' },
        { text: 'GitLab', link: '/docs/wi/gitlab' },
      ]
    },

    {
      text: 'Контейнеризация и оркестрация',
      collapsed: true,
      items: [
        { text: '0 caretta', link: '/docs/wi/caretta' }, // https://github.com/groundcover-com/caretta 
        { text: 'Docker', link: '/docs/wi/docker' },
        { text: '0 Deckhouse', link: '/docs/wi/deckhouse' },
        { text: '0 Kubernetes', link: '/docs/wi/kubernetes' },
        { text: '0 kubesolo', link: '/docs/wi/kubesolo' }, // https://github.com/portainer/kubesolo
        { text: '0 K3s', link: '/docs/wi/k3s' },
        { text: '! K9s', link: '/docs/wi/k9s' },
        { text: '! Lens', link: '/docs/wi/k8slens' },
        { text: '0 Openshift', link: '/docs/wi/openshift' }, // https://packages.altlinux.org/ru/sisyphus/srpms/openshift-installer/
        { text: 'Podman', link: '/docs/wi/podman' },
        { text: '! Rancher', link: '/docs/wi/rancher' },
        {
          text: 'Репозитории',
          collapsed: true,
          items: [
            { text: 'Harbor', link: '/docs/wi/harbor' }, 
            { text: '0 openrepo', link: '/docs/wi/openrepo' }, // https://github.com/openkilt/openrepo
            { text: '0 Zot Registry', link: '/docs/wi/zotregistry' },
          ]
        }
      ]
    },

    {
      text: 'Автоматизация и IaC',
      collapsed: true,
      items: [
        { text: '0 Ansible', link: '/docs/wi/ansible' },
        { text: '! Foreman', link: '/docs/wi/foreman' }, 
        { text: '! OpenTofu', link: '/docs/wi/opentofu' },
        { text: '0 Puppet', link: '/docs/wi/puppet' },
        { text: '0 semaphore', link: '/docs/wi/semaphore' }, // https://github.com/semaphoreui/semaphore
        { text: '! Terraform', link: '/docs/wi/terraform' },
      ]
    },

    {
      text: 'Open Source DCIM',
      collapsed: true,
      items: [
        { text: '! GLPi', link: '/docs/wi/glpi' },
        { text: '0 NetBox', link: '/docs/wi/netbox' }, 

      ]
    },
    {
      text: 'Open Source CRM',
      collapsed: true,
      items: [
        { text: '0 IceBw', link: '/docs/wi/icebw' }, 
        { text: '! NocoBase', link: '/docs/wi/nocobase' }, 
        { text: '0 SuiteCRM', link: '/docs/wi/games/suitecrm' },
        { text: '0 Totum', link: '/docs/wi/games/totum' },
        { text: '0 EspoCRM', link: '/docs/wi/games/espocrm' },
      ]
    },

    {
      text: 'Open Source SIEM',
      collapsed: true,
      items: [
        { text: '! Clear NDR (SELKS)', link: '/docs/wi/selks' }, // Как дополнение к Wazuh для сетевого мониторинга
        { text: '0 homer', link: '/docs/wi/homer' }, // https://github.com/sipcapture/homer
        { text: '0 maltrail', link: '/docs/wi/maltrail' }, // https://github.com/stamparm/maltrail
        { text: '! Nagios', link: '/docs/wi/nagios' },// https://www.nagios.org/projects/nagios-core/
        { text: '0 NetAlertXc', link: '/docs/wi/NetAlertXc' }, // https://github.com/jokob-sk/NetAlertX
        { text: '0 Skydive', link: '/docs/wi/skydive' }, // https://github.com/skydive-project/skydive
        { text: '! Sniffnet', link: '/docs/wi/sniffnet' },
        { text: '0 tpotce', link: '/docs/wi/tpotce' }, // https://github.com/telekom-security/tpotce
        { text: '! Wazuh', link: '/docs/wi/wazuh' },
        { text: '0 zeek', link: '/docs/wi/zeek' }, // https://github.com/zeek/zeek
      ]
    },

    {
      text: 'Прикладное ПО',
      collapsed: true,
      items: [
        { text: 'Logism', link: '/docs/wi/logism' },
        { text: 'Modelio', link: '/docs/wi/modelio' },
        { text: 'OBS', link: '/docs/wi/obs' },
        { text: 'RARS Emulator', link: '/docs/wi/rars' },
        { text: 'Smath Studio', link: '/docs/wi/smath-studio' }, 
        { text: 'VM VirtualBox', link: '/docs/wi/vbox' },
      ]
    },

    {
      text: 'Управление проектами и задачами',
      collapsed: true,
      items: [
        { text: '0 kanban-tui', link: '/docs/wi/kanban-tui' }, // https://github.com/Zaloog/kanban-tui
        { text: '! Open Project', link: '/docs/wi/open-project' },
        { text: '0 plane', link: '/docs/wi/plane' }, // https://github.com/makeplane/plane
        { text: '0 Redmine', link: '/docs/wi/redmine' },
        { text: '! Taskcafe', link: '/docs/wi/taskcafe' },
        { text: '0 worklenz', link: '/docs/wi/worklenz' }, // https://github.com/Worklenz/worklenz
        { text: 'Znuny', link: '/docs/wi/znuny' },
      ]
    },

    {
      text: 'Резервное копирование',
      collapsed: true,
      items: [
        { text: '0 Bacula', link: '/docs/wi/bacula' },
        { text: '0 Proxmox Backup Server', link: '/docs/wi/pbs' },
        { text: '0 Restic', link: '/docs/wi/restic' },
      ]
    },
    
    {
      text: 'Симуляторы сети',
      collapsed: true,
      items: [
        { text: '0 EVE-NG', link: '/docs/wi/eve-ng' },
        { text: 'GNS3', link: '/docs/wi/gns3' },
        { text: '! Containerlab', link: '/docs/wi/containerlab' }, // CLI
        { text: '! Mininet', link: '/docs/wi/mininet' },
        { text: '! PNetLab', link: '/docs/wi/pnetlab' }, // Cloud
      ]
    },

    {
      text: 'Self-hosted Инструменты',
      collapsed: true,
      items: [
        { text: '! Draw.io', link: '/docs/wi/draw.io' },
        { text: '! IT-tools', link: '/docs/wi/it-tools' }, 
        { text: '! Photopea', link: '/docs/wi/photopea' }, 
        { text: '! Stirling PDF', link: '/docs/wi/stirling-pdf' }, 
      ]
    },

    {
      text: 'Веб-серверы',
      collapsed: true,
      items: [
        { text: '0 Angie', link: '/docs/wi/angie' },
        { text: '0 Apache2', link: '/docs/wi/apache2' }, 
        { text: '! Caddy', link: '/docs/wi/caddy' },
        { text: '0 HAProxy', link: '/docs/wi/haproxy' },
        { text: '0 Lighttpd', link: '/docs/wi/lighttpd' },
        { text: '0 Nginx', link: '/docs/wi/nginx' }, 
        { text: '0 Nginx-Lua-Anti-DDoS', link: '/docs/wi/Nginx-Lua-Anti-DDoS' }, // https://github.com/C0nw0nk/Nginx-Lua-Anti-DDoS
        { text: '0 Traefik', link: '/docs/wi/traefik' },
      ]
    },

    {
      text: 'Сервисы (В планах)',
      collapsed: true,
      items: [
        { text: '! Apache Guacamole', link: '/docs/wi/apacheguacamole' },
        { text: '0 Audiobookself', link: '/docs/wi/audiobookself' }, // audiobookself.org
        { text: '0 Audiorelay', link: '/docs/wi/audiorelay' }, //Turn your phone into a microphone or speakers for PC
        { text: '0 BigBlueButton', link: '/docs/wi/bigbluebutton' },
        { text: '0 Ejudge', link: '/docs/wi/ejudge' }, // система для проведения олимпиады по программированию с автопроверкой кода 
        { text: '0 Flatpak', link: '/docs/wi/flatpak' }, 
        { text: '0 Goaccess', link: '/docs/wi/goaccess' }, // https://packages.altlinux.org/ru/p11/srpms/goaccess/
        { text: '0 LocalSend', link: '/docs/wi/localsend' }, // Аналог AirDrop, только OpenSource, работает)
        { text: '0 MediaWiki', link: '/docs/wi/mediawiki' },
        { text: '0 MODX', link: '/docs/wi/modx' }, // CMS
        { text: '0 NextCloud', link: '/docs/wi/nextcloud' },
        { text: '0 OpenNebula', link: '/docs/wi/opennebula' }, 
        { text: '0 OpenUDS', link: '/docs/wi/openuds' },
        { text: '0 Open vAIR', link: '/docs/wi/openvair' }, // какая то русская система виртуализации
        { text: '0 Pacemaker', link: '/docs/wi/pacemaker' }, // менеджер ресурсов кластера
        { text: '0 Penpot', link: '/docs/wi/penpot' }, //https://penpot.app/self-host аналог Figma
        { text: '0 SOGo', link: '/docs/wi/sogo' },
        { text: '0 Sphinx', link: '/docs/wi/sphinx' }, // автодокументирование кода
        { text: '0 Veyon', link: '/docs/wi/veyon' },
        { text: '0 Weblate', link: '/docs/wi/weblate' },
        { text: '0 XCP-ng', link: '/docs/wi/xcp-ng' }, // hypervisor based on XEN
        { text: '0 Zabbix', link: '/docs/wi/zabbix' },
      ]
    },
    
    {
      text: 'Сетевое туннелирование',
      collapsed: true,
      items: [
        { text: 'AmneziaWG', link: '/docs/wi/amneziawg' },
        { text: '! obfsproxy', link: '/docs/wi/obfsproxy' },
        { text: '0 OpenVPN', link: '/docs/wi/openvpn' },
        { text: 'ZeroTier', link: '/docs/wi/zerotier' },
      ]
    },
    
    {
      text: 'Игры',
      collapsed: true,
      items: [
        { text: 'DayZ', link: '/docs/wi/games/dayz' },
        { text: 'Minecraft', link: '/docs/wi/games/minecraft' },
        { text: 'Moonlight', link: '/docs/wi/games/moonlight' },
        { text: 'RenPy', link: '/docs/wi/games/renpy' },
      ]
    },

    {
      text: 'Различное по мелочи',
      collapsed: true,
      items: [
        { text: 'Веб-камеры', link: '/docs/wi/webcam' },
        { text: 'Семантическое версионирование', link: 'https://semver.org/lang/ru/' },
        { text: 'Фишки', link: '/docs/wi/tricks' },
        { text: '! ALT in WSL', link: '/docs/wi/alt-wsl' },
        { text: 'Git и Obsidian', link: '/docs/wi/git-obsidian' },
        { text: 'Phoronix Test Suite', link: '/docs/wi/pts' },
        { text: 'RPMBUILD', link: '/docs/wi/rpmbuild' },
        { text: '! Thunderbird + NextCloud', link: '/docs/wi/thunderbird-nextcloud' }, 
        { text: 'Wake On Lan', link: '/docs/wi/wake-on-lan' },
        { text: 'deb', link: '/docs/wi/deb' },
      ]
    },

    {
      text: 'Приколы с GitHub (Заготовка)',
      collapsed: true,
      items: [
          { text: '0 spacebarchat', link: '/docs/wi/spacebarchat' }, // https://github.com/spacebarchat/spacebarchat реверс инж Дискордика (сервер и клиент)
          { text: '0 homer', link: '/docs/wi/homer' }, // https://github.com/bastienwirtz/homer
          { text: '0 openipc', link: '/docs/wi/openipc' }, // https://openipc.org/
          { text: '0 bunkerweb', link: '/docs/wi/bunkerweb' }, // https://docs.bunkerweb.io/latest/
          { text: '0 Mindmap', link: '/docs/wi/Mindmap' }, // https://github.com/Ignitetechnologies/Mindmap
          { text: '0 vhs', link: '/docs/wi/vhs' }, // https://github.com/charmbracelet/vhs
          { text: '0 phpLDAPadmin', link: '/docs/wi/phpLDAPadmin' }, // https://github.com/leenooks/phpLDAPadmin
          { text: '0 Chikago95', link: '/docs/wi/chikago95' }, // https://github.com/grassmunk/Chicago95 работает) забавно
          { text: '0 monaco-editor', link: '/docs/wi/monaco-editor' }, // https://github.com/microsoft/monaco-editor
          { text: '0 counter-osint-guide-ru', link: '/docs/wi/counter-osint-guide-ru' }, // https://github.com/soxoj/counter-osint-guide-ru
          { text: '0 isd', link: '/docs/wi/isd' }, // https://github.com/kainctl/isd  epm install isd.x86_64-linux.AppImage вот и вся установка
          { text: '0 dockerify-android', link: '/docs/wi/dockerify-android' }, // https://github.com/Shmayro/dockerify-android так или иначе работает
          { text: '0 RedisInsight', link: '/docs/wi/RedisInsight' }, // https://github.com/redis/RedisInsight
          { text: '0 scrypted', link: '/docs/wi/scrypted' }, // https://docs.scrypted.app/
          { text: '0 lossless-cut', link: '/docs/wi/lossless-cut' }, // https://github.com/mifi/lossless-cut
          { text: '0 wrapguard', link: '/docs/wi/wrapguard' }, // https://github.com/puzed/wrapguard
          { text: '0 cap', link: '/docs/wi/cap' }, // https://github.com/tiagozip/cap
          { text: '0 lofi-engine', link: '/docs/wi/lofi-engine' }, // https://github.com/meel-hd/lofi-engine#lofi-engine забавно)
          { text: '0 openrouter-bot', link: '/docs/wi/openrouter-bot' }, // https://github.com/Lifailon/openrouter-bot
          { text: '0 ssh-bot', link: '/docs/wi/ssh-bot' }, // https://github.com/Lifailon/ssh-bot
          { text: '0 sshx', link: '/docs/wi/sshx' }, // https://github.com/ekzhang/sshx


          { text: '0 hddsuperclone', link: '/docs/wi/hddsuperclone' }, // https://www.hddsuperclone.com
          { text: '0 rescuezilla', link: '/docs/wi/rescuezilla' }, // https://github.com/rescuezilla/rescuezilla
        ]
    },

    {
      "text": "Кибербезопасность (Заготовка)",
      "collapsed": true,
      "items": [
        {
          "text": "0trace",
          "collapsed": true,
          "items": [
            { "text": "0trace", "link": "/docs/wi/cyber/0trace" },
            { "text": "dnsmap", "link": "/docs/wi/cyber/dnsmap" },
            { "text": "ip2host", "link": "/docs/wi/cyber/ip2host" },
            { "text": "whois", "link": "/docs/wi/cyber/whois" }
          ]
        },
        {
          "text": "analysis",
          "collapsed": true,
          "items": [
            { "text": "angr", "link": "/docs/wi/cyber/angr" },
            { "text": "binaryninja", "link": "/docs/wi/cyber/binaryninja" },
            { "text": "ghidra", "link": "/docs/wi/cyber/ghidra" },
            { "text": "radare2", "link": "/docs/wi/cyber/radare2" }
          ]
        },
        {
          "text": "anti-forensic",
          "collapsed": true,
          "items": [
            { "text": "secure-delete", "link": "/docs/wi/cyber/secure-delete" },
            { "text": "timestomp", "link": "/docs/wi/cyber/timestomp" },
            { "text": "transmogrify", "link": "/docs/wi/cyber/transmogrify" }
          ]
        },
        {
          "text": "automation",
          "collapsed": true,
          "items": [
            { "text": "faraday", "link": "/docs/wi/cyber/faraday" },
            { "text": "pwnypot", "link": "/docs/wi/cyber/pwnypot" }
          ]
        },
        {
          "text": "backdoor",
          "collapsed": true,
          "items": [
            { "text": "shellter", "link": "/docs/wi/cyber/shellter" },
            { "text": "veil", "link": "/docs/wi/cyber/veil" },
            { "text": "donut", "link": "/docs/wi/cyber/donut" }
          ]
        },
        {
          "text": "binary",
          "collapsed": true,
          "items": [
            { "text": "binwalk", "link": "/docs/wi/cyber/binwalk" },
            { "text": "objdump", "link": "/docs/wi/cyber/objdump" },
            { "text": "readelf", "link": "/docs/wi/cyber/readelf" },
            { "text": "strace", "link": "/docs/wi/cyber/strace" }
          ]
        },
        {
          "text": "bluetooth",
          "collapsed": true,
          "items": [
            { "text": "bluelog", "link": "/docs/wi/cyber/bluelog" },
            { "text": "bluez", "link": "/docs/wi/cyber/bluez" },
            { "text": "spooftooph", "link": "/docs/wi/cyber/spooftooph" }
          ]
        },
        {
          "text": "code-audit",
          "collapsed": true,
          "items": [
            { "text": "flawfinder", "link": "/docs/wi/cyber/flawfinder" },
            { "text": "rats", "link": "/docs/wi/cyber/rats" },
            { "text": "cppcheck", "link": "/docs/wi/cyber/cppcheck" }
          ]
        },
        {
          "text": "cracker",
          "collapsed": true,
          "items": [
            { "text": "hashcat", "link": "/docs/wi/cyber/hashcat" },
            { "text": "john", "link": "/docs/wi/cyber/john" },
            { "text": "oclHashcat", "link": "/docs/wi/cyber/oclHashcat" },
            { "text": "rarcrack", "link": "/docs/wi/cyber/rarcrack" }
          ]
        },
        {
          "text": "crypto",
          "collapsed": true,
          "items": [
            { "text": "xortool", "link": "/docs/wi/cyber/xortool" },
            { "text": "rsactftool", "link": "/docs/wi/cyber/rsactftool" },
            { "text": "fealnx", "link": "/docs/wi/cyber/fealnx" }
          ]
        },
        {
          "text": "defensive",
          "collapsed": true,
          "items": [
            { "text": "aide", "link": "/docs/wi/cyber/aide" },
            { "text": "ossec", "link": "/docs/wi/cyber/ossec" },
            { "text": "tripwire", "link": "/docs/wi/cyber/tripwire" }
          ]
        },
        {
          "text": "disassembler",
          "collapsed": true,
          "items": [
            { "text": "cutter", "link": "/docs/wi/cyber/cutter" },
            { "text": "lida", "link": "/docs/wi/cyber/lida" },
            { "text": "retdec", "link": "/docs/wi/cyber/retdec" }
          ]
        },
        {
          "text": "dos",
          "collapsed": true,
          "items": [
            { "text": "slowloris", "link": "/docs/wi/cyber/slowloris" },
            { "text": "goldeneye", "link": "/docs/wi/cyber/goldeneye" },
            { "text": "HOIC", "link": "/docs/wi/cyber/HOIC" }
          ]
        },
        {
          "text": "exploitation",
          "collapsed": true,
          "items": [
            { "text": "metasploit", "link": "/docs/wi/cyber/metasploit" },
            { "text": "exploitdb", "link": "/docs/wi/cyber/exploitdb" },
            { "text": "searchsploit", "link": "/docs/wi/cyber/searchsploit" },
            { "text": "pwntools", "link": "/docs/wi/cyber/pwntools" }
          ]
        },
        {
          "text": "firmware",
          "collapsed": true,
          "items": [
            { "text": "binwalk", "link": "/docs/wi/cyber/binwalk" },
            { "text": "firmadyne", "link": "/docs/wi/cyber/firmadyne" },
            { "text": "ubootextract", "link": "/docs/wi/cyber/ubootextract" }
          ]
        },
        {
          "text": "fuzzing",
          "collapsed": true,
          "items": [
            { "text": "afl", "link": "/docs/wi/cyber/afl" },
            { "text": "boofuzz", "link": "/docs/wi/cyber/boofuzz" },
            { "text": "wfuzz", "link": "/docs/wi/cyber/wfuzz" },
            { "text": "sulley", "link": "/docs/wi/cyber/sulley" }
          ]
        },
        {
          "text": "honeypot",
          "collapsed": true,
          "items": [
            { "text": "cowrie", "link": "/docs/wi/cyber/cowrie" },
            { "text": "dionaea", "link": "/docs/wi/cyber/dionaea" },
            { "text": "kippo", "link": "/docs/wi/cyber/kippo" }
          ]
        },
        {
          "text": "mobile",
          "collapsed": true,
          "items": [
            { "text": "adb", "link": "/docs/wi/cyber/adb" },
            { "text": "apktool", "link": "/docs/wi/cyber/apktool" },
            { "text": "drozer", "link": "/docs/wi/cyber/drozer" },
            { "text": "jadx", "link": "/docs/wi/cyber/jadx" }
          ]
        },
        {
          "text": "networking",
          "collapsed": true,
          "items": [
            { "text": "scapy", "link": "/docs/wi/cyber/scapy" },
            { "text": "hping3", "link": "/docs/wi/cyber/hping3" },
            { "text": "yersinia", "link": "/docs/wi/cyber/yersinia" },
            { "text": "netsniff-ng", "link": "/docs/wi/cyber/netsniff-ng" }
          ]
        },
        {
          "text": "recon",
          "collapsed": true,
          "items": [
            { "text": "amass", "link": "/docs/wi/cyber/amass" },
            { "text": "subfinder", "link": "/docs/wi/cyber/subfinder" },
            { "text": "assetfinder", "link": "/docs/wi/cyber/assetfinder" },
            { "text": "httprobe", "link": "/docs/wi/cyber/httprobe" }
          ]
        },
        {
          "text": "reversing",
          "collapsed": true,
          "items": [
            { "text": "radare2", "link": "/docs/wi/cyber/radare2" },
            { "text": "x64dbg", "link": "/docs/wi/cyber/x64dbg" },
            { "text": "lida", "link": "/docs/wi/cyber/lida" }
          ]
        },
        {
          "text": "scanner",
          "collapsed": true,
          "items": [
            { "text": "nmap", "link": "/docs/wi/cyber/nmap" },
            { "text": "masscan", "link": "/docs/wi/cyber/masscan" },
            { "text": "rustscan", "link": "/docs/wi/cyber/rustscan" },
            { "text": "naabu", "link": "/docs/wi/cyber/naabu" }
          ]
        },
        {
          "text": "sniffer",
          "collapsed": true,
          "items": [
            { "text": "wireshark", "link": "/docs/wi/cyber/wireshark" },
            { "text": "tcpdump", "link": "/docs/wi/cyber/tcpdump" },
            { "text": "dsniff", "link": "/docs/wi/cyber/dsniff" }
          ]
        },
        {
          "text": "social",
          "collapsed": true,
          "items": [
            { "text": "set", "link": "/docs/wi/cyber/set" },
            { "text": "seclists", "link": "/docs/wi/cyber/seclists" },
            { "text": "phishing-frenzy", "link": "/docs/wi/cyber/phishing-frenzy" }
          ]
        },
        {
          "text": "spoofing",
          "collapsed": true,
          "items": [
            { "text": "arpspoof", "link": "/docs/wi/cyber/arpspoof" },
            { "text": "dnschef", "link": "/docs/wi/cyber/dnschef" },
            { "text": "sslsplit", "link": "/docs/wi/cyber/sslsplit" }
          ]
        },
        {
          "text": "stego",
          "collapsed": true,
          "items": [
            { "text": "steghide", "link": "/docs/wi/cyber/steghide" },
            { "text": "outguess", "link": "/docs/wi/cyber/outguess" },
            { "text": "stegsolve", "link": "/docs/wi/cyber/stegsolve" }
          ]
        },
        {
          "text": "tunnel",
          "collapsed": true,
          "items": [
            { "text": "proxychains", "link": "/docs/wi/cyber/proxychains" },
            { "text": "chisel", "link": "/docs/wi/cyber/chisel" },
            { "text": "ngrok", "link": "/docs/wi/cyber/ngrok" },
            { "text": "iodine", "link": "/docs/wi/cyber/iodine" }
          ]
        },
        {
          "text": "voip",
          "collapsed": true,
          "items": [
            { "text": "sipvicious", "link": "/docs/wi/cyber/sipvicious" },
            { "text": "ucsniff", "link": "/docs/wi/cyber/ucsniff" },
            { "text": "rtpbreak", "link": "/docs/wi/cyber/rtpbreak" }
          ]
        },
        {
          "text": "webapp",
          "collapsed": true,
          "items": [
            { "text": "burpsuite", "link": "/docs/wi/cyber/burpsuite" },
            { "text": "sqlmap", "link": "/docs/wi/cyber/sqlmap" },
            { "text": "xsser", "link": "/docs/wi/cyber/xsser" },
            { "text": "commix", "link": "/docs/wi/cyber/commix" },
            { "text": "dalfox", "link": "/docs/wi/cyber/dalfox" }
          ]
        },
        {
          "text": "windows",
          "collapsed": true,
          "items": [
            { "text": "mimikatz", "link": "/docs/wi/cyber/mimikatz" },
            { "text": "bloodhound", "link": "/docs/wi/cyber/bloodhound" },
            { "text": "crackmapexec", "link": "/docs/wi/cyber/crackmapexec" },
            { "text": "impacket", "link": "/docs/wi/cyber/impacket" }
          ]
        },
        {
          "text": "wireless",
          "collapsed": true,
          "items": [
            { "text": "aircrack-ng", "link": "/docs/wi/cyber/aircrack-ng" },
            { "text": "reaver", "link": "/docs/wi/cyber/reaver" },
            { "text": "mdk4", "link": "/docs/wi/cyber/mdk4" },
            { "text": "wifite2", "link": "/docs/wi/cyber/wifite2" }
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
        { text: 'Урок 0. NAT', link: '/docs/disciplines/pm2/mdk21/nat' },
      ]
    }
  ],

  '/docs/disciplines/pm2/mdk22/': [
    {
      text: 'МДК 02.02 Программное обеспечение компьютерных сетей',
      items: [
        { text: 'Назад к модулю', link: '/docs/disciplines/pm2/' },
        { text: 'Урок 0. Сага о драйверах', link: '/docs/disciplines/pm2/mdk22/driver_saga' },
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
        { "text": "УМК и прочее", "link": "/docs/disciplines/aas/"},
      ]
    },

    {
      text: 'Лекции',
      collapsed: true,
      items: [
        { text: "Лекция 1", "link": "/docs/disciplines/aas/l1" },
        { text: "Лекция 2", "link": "/docs/disciplines/aas/l2" },
        { text: "Лекция 3", "link": "/docs/disciplines/aas/l3" },
        { text: "Лекция 4", "link": "/docs/disciplines/aas/l4" },
        { text: "Лекция 5", "link": "/docs/disciplines/aas/l5" },
        { text: "Лекция 6", "link": "/docs/disciplines/aas/l6" },
        { text: "Лекция 7", "link": "/docs/disciplines/aas/l7" },
        { text: "Лекция 8", "link": "/docs/disciplines/aas/l8" },
        { text: "Лекция 9", "link": "/docs/disciplines/aas/l9" },
        { text: "Лекция 10", "link": "/docs/disciplines/aas/l10" },
        { text: "Лекция 11", "link": "/docs/disciplines/aas/l11" },
        { text: "Лекция 12", "link": "/docs/disciplines/aas/l12" },
        { text: "Лекция 13", "link": "/docs/disciplines/aas/l13" },
        { text: "Лекция 14", "link": "/docs/disciplines/aas/l14" },
        { text: "Лекция 15", "link": "/docs/disciplines/aas/l15" },
        { text: "Лекция 16", "link": "/docs/disciplines/aas/l16" },
        { text: "Лекция 17", "link": "/docs/disciplines/aas/l17" },
      ]
    },

    {
      text: 'Практические работы',
      collapsed: true,
      items: [
        { text: "Практическая работа 1", "link": "/docs/disciplines/aas/p1" },
        { text: "Практическая работа 2", "link": "/docs/disciplines/aas/p2" },
        { text: "Практическая работа 3", "link": "/docs/disciplines/aas/p3" },
        { text: "Практическая работа 4", "link": "/docs/disciplines/aas/p4" },
        { text: "Практическая работа 5", "link": "/docs/disciplines/aas/p5" },
        { text: "Практическая работа 6", "link": "/docs/disciplines/aas/p6" },
        { text: "Практическая работа 7", "link": "/docs/disciplines/aas/p7" },
        { text: "Практическая работа 8", "link": "/docs/disciplines/aas/p8" },
      ]
    },

    {
      text: 'Самостоятельные работы',
      collapsed: true,
      items: [
        { text: "Самостоятельная работа 1", "link": "/docs/disciplines/aas/s1" },
        { text: "Самостоятельная работа 2", "link": "/docs/disciplines/aas/s2" },
        { text: "Самостоятельная работа 3", "link": "/docs/disciplines/aas/s3" },
        { text: "Самостоятельная работа 4", "link": "/docs/disciplines/aas/s4" },
        { text: "Самостоятельная работа 5", "link": "/docs/disciplines/aas/s5" },
        { text: "Самостоятельная работа 6", "link": "/docs/disciplines/aas/s6" },
        { text: "Самостоятельная работа 7", "link": "/docs/disciplines/aas/s7" },
        { text: "Самостоятельная работа 8", "link": "/docs/disciplines/aas/s8" },
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
        { text: "Алгоритмы сортировки", "link": "/docs/disciplines/oaip/sorts" },
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