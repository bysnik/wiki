# Всякие фишки и мелочь

## Проверка работы динамиков

В Linux можно проверить звук через терминал несколькими способами. Вот основные из них:

**Проверка через `speaker-test` (встроенный тест динамика)**

Утилита `speaker-test` генерирует тестовый звук.

```bash
speaker-test -t wav -c 2
```

- `-t wav` — тип сигнала (можно также `sine` для синусоиды).
- `-c 2` — количество каналов (2 = стерео).

Чтобы остановить — нажмите **Ctrl+C**.

Если команда не найдена, установите пакет `alsa-utils`:
```bash
apt-get install alsa-utils
```


**Проверка уровня громкости и состояния звука**

Через ALSA:
```bash
amixer sget Master
```

Если звук выключен:
```bash
amixer sset Master unmute
amixer sset Master 80%   # установить громкость
```

```bash
pactl list sinks short    # список аудиовыходов
pactl get-sink-volume @DEFAULT_SINK@   # текущая громкость
pactl set-sink-volume @DEFAULT_SINK@ 80%   # установить громкость
pactl set-sink-mute @DEFAULT_SINK@ false   # включить звук
```


**Проверка, работает ли звуковая карта**

```bash
lspci | grep -i audio
# или для USB-устройств:
lsusb
```

Также можно посмотреть логи:
```bash
dmesg | grep -i audio
```

---

**Простой тест через `beep` (если поддерживается)**

Некоторые системы поддерживают системный спикер:

```bash
echo -e "\a"
# или
beep
```

> Утилита `beep` может потребовать установки и прав на `/dev/input/by-path/...`.



## 皆さんこんにちは！ Устанавливаем поддержку нормальной японской раскладки

mozc позволит печатать romaji и получать навыходе хирагану, катакану и, соответственно, кандзи.

Я настраивал это только в KDE Plasma 6

1. Устанавливаем необходимые пакеты:
```bash
apt-get install fcitx5-qt fcitx5-configtool fcitx5 fcitx5-gtk fcitx5-mozc
```


```bash

```


2. Редактируем файл:
```bash
nano ~/.bash_profile
```
Добавляем строки:
```bash
export GTK_IM_MODULE=fcitx5
export QT_IM_MODULE=fcitx5
export XMODIFIERS=@im=fcitx5
```

3. Перезагружаем компьютер. Теперь раскладкой управляет fcitx5.

4. Переходим в настройки KDE: Клавиатура - Клавиатура.

Включаем раскладки, удаляем все лишние, оставляем только Английская (США)

5. Переходим в настройки fcitx5. В трее правой кнопкой мыши по текущей раскладке, далее нажимаем настройки.

6. В группу добавляем метод ввода mozc и другие нужные раскладки.

![](/img/mozc.png)

Профит

::: warning Wayland-VS_Codium-fcitx5
С этой системой в Wayland шалит VS Codium. Чтобы это решить, отредактируйте параметры запуска, измените их на:
```bash
--enable-features=UseOzonePlatform --ozone-platform=wayland --enable-wayland-ime %F
```

Я привёл параметры запуска в ярлычке в меню приложений KDE. Если запускаете через консоль, то уберите `%F`
:::




## Проброс репозитория в закрытый контур

1) Разворачивают локальный репо. 
2) Далее с делают копию на флеш-устройство нашего репо. 
3) Проверяют флеш-устройство на антивирусе (требования ФСТЭК) . 
4) С проверенного флеш-устройствоа синхронизируют с локальным репо  в закрытом контуре. 
Синхранизации наш репо- флеш-устройство-локальный репо в закрытом контуре делают через rsync. Это стандартная процедура для закрытого контура.

Второй вариант. Если используются сертифицированные версии МЭ. И есть доступ через них в закрытый контур (Физически не разделены) То регулятор разрешает так скажем однустороннюю связь по определенным портам. Тогда Локальный репо в открытой их сети. Проверка этого репо чере антивирус. И синхронизациия уже этого репо с репо в закрытой сети через сертифицированный МЭ.

Обязательно в любом случае повторно проверяется перед использованием репо в закрытой сети антивирусом. Желательно другим. То есть в KAV в открытой (не сертифицированной сети) или флеш-устройство. В Закрытой Drweb. Или Наоборот. Но это рекомендация ФСТЭК. Можно и одним но опять не рекомендовано. Но наказание за это не предусмотрено. Максимум рекомендация ФСТЭК при проверке ОИ.

## Чем можно проверить диск в Альт Линукс

smartctl (smartmontools)

Дополнительно в gnome доступен следующий инструмент: gnome-disk-utility

hdparm — Инструмент для тестирования скорости чтения (бенчмаркинг) и управления параметрами работы в основном HDD-дисков через низкоуровневые настройки.

badblocks — Утилита для прямого поиска сбойных секторов на поверхности диска.

fsck — стандартная утилита для проверки и исправления ошибок файловых систем (ext2/ext3/ext4, FAT, NTFS и др.)

testdisk

btrfs check

## что то про Ansible
::: tip
```
Далее — доставка на свежеустановленную систему ключей Ansible и установка hostname. Если в ОСи будут установлены ключи от Ansible, то дальше можно все сделать через сам Ansible. Тут нам поможет пакет alterator-postinstall и простейший скрипт, который доставит в /root/.ssh/authorized_keys нужные ключи. У меня 2 Ansible, 1 в головном офисе, и 1 в филиале, канал с которым, мягко говоря, оставляет желать лучшего. Поэтому 2 ключа. Так же нужно позаботиться об инженерах техподдержки, и закинуть в свежую систему скрипт, который на основе существующих в AD записей для компьютеров, будет подбирать подходящий hostname для нового ПК перед вводом в домен. Эти скрипты тоже нужно будет доставить в целевую систему. Скрипт назовем 87-set-ansbls-keys.sh, и напишем в нем следующее (ну почти так, ключи я вам не покажу =Ъ):

#!/bin/sh
```
. install2-init-functions

echo "ssh-rsa бла-бла-бла-набор-символов root@ansible-filial-hostname" > $destdir/root/.ssh/authorized_keys
echo "ssh-rsa бла-бла-бла-набор-символов root@ansible-hostname" >> $destdir/root/.ssh/authorized_keys

cp /var/ChangeHostName.py $destdir/var/
```
Тут одна тонкость — таргет указывается с преффиксом $destdir, иначе установщик, выполняя директиву postinstall, запишет ключи в свой /root, а не в устанавливаемую ОС.

Скрипт поиска подходящего hostname прост, как 5 копеек (которых никто не видел уже черт знает сколько лет). Я создал в AD бесправную учетку, чтобы Python мог сходить в AD и считать уже существующие в определенной OU учетки компьютеров, и выбрать следующий по списку.
```
#!/usr/bin/python3
# -*- coding: utf-8 -*-
import os
import sys
from getpass import getpass
from ldap3 import Server, Connection, SUBTREE, LEVEL
import time

username="lab.ru\linux_to_domain"
password="Passw0rd!"

server = Server("dc-1.lab.ru", port=389, use_ssl=False, get_info='ALL')
connection = Connection(server, user=username, password=password,
               fast_decoder=True, auto_bind=True, auto_referrals=True, check_names=False, read_only=True,
               lazy=False, raise_exceptions=False)

hostnamedigit=1
hostname = "ARM-"+'{:0>4}'.format(hostnamedigit)

def get_all_ad_hosts(connection):

    results = list()
    elements = connection.extend.standard.paged_search(
        search_base='OU=LINUX,OU=Computers,dc=lab,dc=ru',
        search_filter='(&(objectCategory=computer)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))',
        search_scope=SUBTREE,
        attributes=['name'],
        paged_size=100)
    for element in elements:
        host = dict()
        if 'dn' in element:
            host['dn'] = element['dn']
            host['name'] = element['attributes'][u'name'][0]
            results.append(host)
    return(results)
    connection.unbind()

def search_for_duplicatename(hostname,list_of_computers):
    for computer in list_of_computers:
        if computer['name'].casefold() == hostname.casefold():
            print(hostname+" already exists")
            return 1
    return 0

computers = get_all_ad_hosts(connection)
while search_for_duplicatename(hostname, computers) != 0:
    hostnamedigit += 1
    hostname = "ARM-"+'{:0>4}'.format(hostnamedigit)
print(hostname)
os.system("hostnamectl set-hostname "+hostname)
print("Your system is gonna reboot in 10 seconds....")
time.sleep(10)
os.system("reboot now")
```
Теперь о том, куда же эти скрипты поместить. Целевая директория — архив altinst, находящийся в корне ISO. В архиве скрипт нужно расположить в директории /usr/share/install2/postinstall.d/ и не забыть сделать его исполняемым, иначе чуда не произойдет. Скрипт подбора hostname я положил в /var, хотя это не играет особой роли.

Оговорюсь лишь о том, что для доставки файлов, открытых ключей и прочего, мы опубликовали их рядом с репозиториями. Там все равно web-сервер поднят, почему бы его не использовать?
3.1. Доставить внутренние сертификаты, импортировать их

- name: Install local CA certs
  gather_facts: false
  hosts: simply
  tasks:
    - name: Execute script
      shell: |
        mkdir /tmp/certs
        cd /tmp/certs
        wget --no-check-certificate https://local-repo-srv.lab.ru/alt_custom-repo/certs/root.crt
        wget --no-check-certificate https://local-repo-srv.lab.ru/alt_custom-repo/certs/subca.crt
        cp ./rootca.crt /etc/pki/ca-trust/source/anchors/
        cp ./subca.crt /etc/pki/ca-trust/source/anchors/
        chmod a-x /etc/pki/ca-trust/source/anchors/*
        update-ca-trust extract

3.2. Добавить локальные репозитории

- name: add repositories
  gather_facts: false
  hosts: simply
  tasks:
    - name: delete all /etc/apt/sources.list.d/
      shell: rm -f /etc/apt/sources.list.d/*

    - name: create lab.list
      copy:
        dest: /etc/apt/sources.list.d/lab.list
        content: |
          rpm [p10] http:// local-repo-srv.lab.ru /alt_main-repo p10/branch/x86_64 classic
          rpm [p10] http:// local-repo-srv.lab.ru /alt_main-repo p10/branch/noarch classic
          rpm [alt_custom_repo] http:// local-repo-srv.lab.ru /alt_custom-repo x86_64 alt_custom_repo

    - name: add custom gpg key
      shell: curl http:// local-repo-srv.lab.ru /alt_custom-repo/x86_64/base/custom_repo.pgp >> /etc/apt/custom_repo.pgp && gpg --no-default-keyring --keyring /usr/lib/alt-gpgkeys/pubring.gpg --import /etc/apt/custom_repo.pgp

    - name: add /etc/apt/vendors.list.d/lab.list
      copy:
        dest: /etc/apt/vendors.list.d/lab.list
        content: |
          simple-key "alt_custom_repo" {
          Fingerprint "бла-бла-бла-буквы-и-цЫфры";
          Name "Vasily <Vasya@lab.ru>";
          }

    - name: apt-get update
      shell: |
apt-get update
	apt-get dist-upgrade -y

3.3. Установить в систему весь требуемый софт, …

- name: soft installation
  gather_facts: false
  hosts: simply
  tasks:

    - name: update
      shell: apt-get update -y

    - name: install packages
      apt_rpm:
        name:
          - sudo
          - apt-scripts
          - openssh
          - task-auth-ad-sssd
          - sssd-ad
          - samba-client
          - 1c-preinstall-full
          - vmware-view-preinstall
          - onlyoffice-desktopeditors
          - nano
          - firefox
          - libinput
          - libinput-devel
          - xorg-drv-libinput
          - xorg-drv-libinput-devel
          - x11vnc
          - x11vnc-service
          - 1c-enterprise-8.3.18.1483-thin-client
          - vlc
          - google-chrome-stable
          - autofs
          - vmware-horizon-client
          - system-config-printer
          - kde5-spectacle
          - evolution
          - evolution-ews
          - conky
          - remmina
          - remmina-plugins
          - cups
        state: present

    - name: remove Libre, stop cups
      shell: |
            apt-get remove libreoffice5 -y && apt-get clean -y && apt-get autoremove -y
            systemctl stop cups

#для VNC есть еще таска для установки пароля, но я вам ее не покажу.
#Там тривиально
    - name: x11vnc config
      copy:
        dest: /usr/sbin/x11vnc-start-daemon
        content: |
          #!/bin/bash
          AUTH=`ps aux | grep "\-auth " | head -n 1`
          AUTH=${AUTH/*\-auth /}
          AUTH=${AUTH/ */}
          /usr/bin/x11vnc -auth $AUTH -dontdisconnect -usepw -shared -forever -rfbport 5900 -rfbauth /etc/vncpasswd -display :0 -repeat

    - name: catalogs and files
      file:
        path: "{{ item.path }}"
        state: "{{ item.state }}"
      with_items:
        - { path: /etc/skel/Рабочий стол/, state: directory } #каталог для создания ярлыков
        - { path: /mnt/share/, state: directory } #каталог для монтирования «сетевых дисков»
        - { path: /var/ChangeHostName.py, state: absent } #удаление скрипта подбора hostname
        - { path: /opt/1cv8/x86_64/8.3.18.1483/libstdc++.so.6, state: absent } #для работы 1С этот файл надо удалить. Не спрашивайте, это не баг, это фича.
        - { path: /etc/skel/.1C/1cestart/, state: directory } #каталог для монтирования шары со списком баз для 1С

    - name: create links
      file:
        src: "{{ item.src }}"
        dest: "{{ item.dest }}"
        state: "{{ item.state }}"
        mode: "{{ item.mode }}"
        force: yes
      with_items:
        - { src: /mnt/share/, dest: /etc/skel/Рабочий стол/Сетевые_Папки, state: link, mode: '755' }
        - { src: /usr/share/applications/firefox.desktop, dest: /etc/skel/Рабочий стол/firefox.desktop, state: link, mode: '755' }
        - { src: /usr/share/applications/google-chrome.desktop, dest: /etc/skel/Рабочий стол/google-chrome.desktop, state: link, mode: '755' }
        - { src: /usr/share/applications/1cestart-8.3.18-1483.desktop, dest: /etc/skel/Рабочий стол/1C.desktop, state: link, mode: '755' }
        - { src: /usr/share/kf5/applications/kf5/org.kde.dolphin.desktop, dest: /etc/skel/Рабочий стол/Dolphin.desktop, state: link, mode: '755' }
        - { src: /usr/share/applications/onlyoffice-desktopeditors.desktop, dest: /etc/skel/Рабочий стол/onlyoffice-desktopeditors.desktop, state: link, mode: '755' }
        - { src: /usr/share/applications/vmware-view.desktop, dest: /etc/skel/Рабочий стол/vmware-view.desktop, state: link, mode: '755' }
        - { src: /mnt/.services/1CBases/1cestart_alt.cfg, dest: /etc/skel/.1C/1cestart/1cestart.cfg, state: link, mode: '755' }

    - name: copy files
      copy:
        src: "{{ item.src }}"
        dest: "{{ item.dest }}"
        owner: "{{ item.owner }}"
        group: "{{ item.group }}"
        mode: "{{ item.mode }}"
      with_items:
#блок копирования настроек cups. Они для всех одинаковы, подключается очередь
#печати на принтер MyQ
        - { src: /etc/ansible/playbooks/files/cups/cupsd.conf, dest: /etc/cups/cupsd.conf, owner: root, group: lp, mode: '640' }
        - { src: /etc/ansible/playbooks/files/cups/cups-files.conf, dest: /etc/cups/cups-files.conf, owner: root, group: root, mode: '644' }
        - { src: /etc/ansible/playbooks/files/cups/printers.conf, dest: /etc/cups/printers.conf, owner: root, group: lp, mode: '600' }

    - name: enable services
      service:
        name: "{{ item }}"
        enabled: yes
        state: restarted
      with_items:
        - x11vnc
        - cups

    - name: firefox set krb enable
      copy:
        dest: /usr/lib64/firefox/browser/defaults/preferences/myprefs.js
        content: |
          pref("network.negotiate-auth.trusted-uris",".lab.ru");
          pref("network.automatic-ntlm-auth.trusted-uris",".lab.ru");
          pref("network.automatic-ntlm-auth.allow-non-fqdn","true");
          pref("network.negotiate-auth.allow-non-fqdn","true");
          pref("network.negotiate-auth.delegation-uris",".lab.ru");

    - name: chrome set krb enable
      copy:
        dest: /etc/opt/chrome/policies/managed/krb.json
        content: |
          {
            "AuthServerAllowlist": "*.lab.ru",
            "AuthNegotiateDelegateAllowlist": "*.lab.ru"
          }

    - name: apt dedup, enable cups
      shell: |
             apt-get dedup -y
             systemctl start cups

3.4. Сформировать конфиги для подключения ПК к домену, ..

- name:  pre-domain config
  gather_facts: false
  hosts: simply
  tasks:
          - name: krb config
            copy:
              dest: /etc/krb5.conf
              content: |
                [logging]
                # default = FILE:/var/log/krb5libs.log

                [libdefaults]
                 default_realm = LAB.RU
                 dns_lookup_realm = true
                 dns_lookup_kdc = true
                 ticket_lifetime = 24h
                 renew_lifetime = 7d
                 rdns = false
                 forwardable = yes
                 default_ccache_name = FILE:/tmp/krb5cc_%{uid}

          - name: samba config
            copy:
              dest: /etc/samba/smb.conf
              content: |
                [global]
                security = ads
                realm = LAB.RU
                workgroup = LAB
                netbios name = {{inventory_hostname}}
                template shell = /bin/bash
                kerberos method = system keytab
                wins support = no
                idmap config * : range = 10000-20000000
                idmap config * : backend = tdb

          - name: sssd config
            copy:
              dest: /etc/sssd/sssd.conf
              content: |
                [sssd]
                config_file_version = 2
                user = root
                domains = LAB.RU
                services = pam,nss,autofs

                [nss]

                [pam]

                [domain/LAB.RU]
                id_provider = ad
                auth_provider = ad
                chpass_provider = ad
                default_shell = /bin/bash
                fallback_homedir = /home/%d/%u
                ad_server = dc-1.lab.ru,dc-2.lab.ru
                ad_backup_server = _srv_
                cache_credentials = true
                debug_level = 2
#монтирование сетевых дисков. Через pam mount ничего не вышло. Он либо багованый,
#либо фича у него такая, но мы перешли на смб, который монтирует шары при
#обращении к ним пользователя 
          - name: autofs config
            copy:
              dest: /etc/auto.master
              content: |
                /mnt/share        /etc/auto.samba --ghost
                /mnt/.services    /etc/auto2.samba --ghost --timeout 60


          - name: autofs config 1
            copy:
              dest: /etc/auto.samba
              content: |
                disk_1  -fstype=cifs,multiuser,cruid=$UID,sec=krb5,domain=LAB.RU      ://dfs-server.lab.ru/Share
                disk_2  -fstype=cifs,multiuser,cruid=$UID,sec=krb5,domain=LAB.RU      ://file-server.lab.ru/Share2
                disk_3  -fstype=cifs,multiuser,cruid=$UID,sec=krb5,domain=LAB.RU      ://file-server.lab.ru/Share3

          - name: autofs config 2
            copy:
              dest: /etc/auto2.samba
              content: |
                1CBases      -fstype=cifs,multiuser,cruid=$UID,sec=krb5,domain=LAB.RU      ://file-server.lab.ru /1CBases
                background   -fstype=cifs,multiuser,cruid=$UID,sec=krb5,domain=LAB.RU      ://file-server.lab.ru/background


          - name: enable autofs
            service:
              name: autofs
              enabled: yes
              state: restarted

          - name: configure nsswitch and cronyd
            lineinfile:
              path: "{{ item.path }}"
              regexp: "{{ item.regexp }}"
              line: "{{ item.line }}"
            loop:
              - { path: /etc/nsswitch.conf, regexp: '^passwd', line: 'passwd:     files sss' }
              - { path: /etc/nsswitch.conf, regexp: '^shadow', line: 'shadow:     tcb files sss' }
              - { path: /etc/nsswitch.conf, regexp: '^group', line: 'group:      files sss' }
              - { path: /etc/chrony.conf, regexp: '^pool', line: 'pool dc-1.lab.ru iburst' }

          - name: set control policy and system-auth
            shell: |
                  control sudo public
                  control system-auth sss

#Cisco WSA – довольно «интересный» proxy-сервер..
#И так как далеко не все Linux’овые приложения умеют использовать krb-тикеты
#для авторизации на прокси, приходится использовать костыль. Нет, можно было
#заставить пользователя сначала запустить браузер, авторизоваться на проксе,
#и только после этого получить доступ в интернет, скажем, с мессенджера..
#но мы посчитали это издевательством.

          - name: proxy auth script
            copy:
              dest: /var/proxy_auth.sh
              content: |
                #!/bin/bash
                ip=$(echo `ifconfig eth0 2>/dev/null|awk '/inet addr:/ {print $2}'|sed 's/addr://'`)
                echo "curl -isL --negotiate -u : https://proxy-server.lab.ru/same_text/$ip/http://lab.ru/ > /dev/null" > /tmp/proxy_auth.sh
                /bin/bash /tmp/proxy_auth.sh
                rm -f /tmp/proxy_auth.sh
              mode: "755"

          - name: create logon script fpr proxy auth
            copy:
              dest: /etc/profile.d/proxy_auth.sh
              content: |
                #!/bin/bash
                /var/proxy_auth.sh
              mode: "755"

3.5. Настроить ssh согласно требованиям от ИБ, в том числе ограничить доступ для определенных групп AD

- name: ssh
  gather_facts: false
  hosts: simply
  tasks:
          - name: edit sshd config
            lineinfile:
                    path: /etc/openssh/sshd_config
                    regex: "^(#)?{{item.key}}"
                    line: "{{item.key}} {{item.value}}"
                    state: present
            loop:
                            - { key: "LogLevel", value: "VERBOSE" }
                            - { key: "PermitRootLogin", value: "prohibit-password" }
                            - { key: "MaxAuthTries", value: "3" }
                            - { key: "MaxSessions", value: "2" }
                            - { key: "PermitEmptyPasswords", value: "no" }
                            - { key: "UsePAM", value: "yes" }
                            - { key: "AllowGroups", value: "domain?users root wheel linux-sudoers" }
#да, да, именно в таком формате тут нужно указывать доменные группы с пробелами
#в названиях
            notify:
                    - restart sshd
                    - enable sshd

  handlers:
          - name: restart sshd
            service:
                    name: sshd
                    state: restarted

          - name: enable sshd
            service:
                    name: sshd
                    enabled: yes

3.6. Настроить доступ к sudo для определенной группы AD

- name: sudoers
  gather_facts: false
  hosts: simply
  tasks:
          - name: edit sudoers file
            blockinfile:
                    path: /etc/sudoers
                    backup: yes
                    block: |
                            %Linux-Sudoers ALL=(ALL) ALL
                            %Linux-Users ALL=/usr/bin/apt-cache
                            %Linux-Users ALL=/usr/sbin/poweroff
                            %Linux-Users ALL=/usr/sbin/NetworkManager
                    validate: /usr/sbin/visudo -cf %s

          - name: replace line
            lineinfile:
                    path: /etc/sudoers
                    regexp: '^@includedir /etc/sudoers.d'
                    line: '#@includedir /etc/sudoers.d'
                    validate: /usr/sbin/visudo -cf %s

3.8. Ввести ПК в домен

#При запуске спрашивает логин и пароль (в «приватном» виде).
#После чего получает керберос-тикет и подключает ОС к домену
- name: domain join
  gather_facts: false
  hosts: simply

  vars_prompt:
    - name: "adlogin"
      prompt: "Enter AD Login"
      private: no

    - name: "password"
      prompt: "Enter password"
      private: yes

  tasks:
    - name: domain check
      shell: timeout 6s net ads testjoin
      register: domain_state
      failed_when: domain_state.rc == 0

    - name: Clear the sssd cache
      shell: rm -f /var/lib/sss/db/* /var/lib/sss/mc/*

    - name: get krb ticket
      shell: echo '{{ password }}'| kinit "{{ adlogin }}"

    - name: join domain
      command: net ads join -U "{{ adlogin }}"%"{{ password }}" createcomputer="/Computers/Linux"

    - name: sssd enable
      service:
        name: sssd
        enabled: yes
        state: restarted

    - name: reboot
      reboot:
        reboot_timeout: 120

3.10. Предусмотреть возможность массового обновления

Тут пришлось сделать отдельный playbook для обновления, и отдельный playbook для брендирования, так как мы пошли по простому пути – не стали пилить тему для кедов, а просто поменяли интересующие нас картинки. И поэтому при обновлении пакетов картинки затираются. Поэтому сразу после обновления происходит брендирование.

Playbook апдейта:

- name: update and upgrade
  hosts: simply
  gather_facts: false
  tasks:

  - name: update & upgrade
    shell: |
      apt-get update -y && apt-get dist-upgrade -y
      apt-get dedup -y

Брендинг у нас уже был (но я вам его не покажу, мне запретили). И поэтому playbook обновления выглядят так:

- import_playbook: update.yml
- import_playbook: branding.yml

## Ограничение пропускной способности сетевого соединения в Linux

Если в процессе работы с вашей системой Linux для настольных компьютеров вы нередко одновременно используете множество работающих с сетью приложений или разделяете пропускную способность своего домашнего сетевого соединения между несколькими компьютерами, вы наверняка хотите максимально контролировать использование ресурсов имеющегося сетевого соединения. В противном случае при загрузке файлов большого объема с помощью специализированного приложения ваша интерактивная сессия SSH может начать работать с большим замедлением или перестать работать вообще. Либо в процессе синхронизации директории большого объема с сервером Dropbox ваши домашние могут начать жаловаться на постоянные перерывы, возникающие в процессе просмотра видео из сети.

В данном руководстве я постараюсь описать два различных подхода к ограничению пропускной способности сетевого соединения в Linux.

## Ограничение пропускной способности сетевого соединения на уровне приложения в Linux

Одним из инструментов для ограничения пропускной способности сетевого соединения, использующим интерфейс командной строки системы, является утилита под названием [trickle](http://monkey.org/~marius/trickle). Trickle позволяет осуществлять шейпинг трафика, генерируемого любым из существующих приложений, путем «подгрузки» библиотеки с реализацией механизма сетевых сокетов и алгоритмов ограничения пропускной способности сетевого соединения в процессе запуска приложения. Преимущество утилиты trickle заключается в том, что она функционирует исключительно в пространстве пользователя, поэтому вам не понадобятся привилегии пользователя root для ограничения пропускной способности сетевого соединения на уровне какого-либо из приложений. Для совместимости с утилитой trickle приложение должно использовать интерфейс сетевых сокетов без статического связывания с соответствующей системной библиотекой. Утилита trickle может оказаться полезной тогда, когда вам нужно ограничить пропускную способность сетевого соединения на уровне приложения, которое не имеет аналогичного встроенного механизма.

Для установки trickle в Ubuntu, Debian и производных дистрибутивах следует использовать следующую команду:

$ sudo apt-get install trickle

Для установки trickle в дистрибутивах Fedora или CentOS/RHEL (с подключенным репозиторием EPEL) следует использовать следующую команду:

$ sudo yum install trickle

Утилита trickle используется следующим образом. Необходимо просто разместить вызов trickle (а также флаги и значения лимитов скоростей) перед командой, которую вы желаете исполнить.

$ trickle -d <лимит-скорости-приема> -u <лимит-скорости-передачи> <команда>

С помощью данной команды устанавливаются заданные лимиты скоростей приема и передачи данных (в КБ/с) для приложения, запускаемого с помощью заданной команды.

Например, для установки ограничения максимальной скорости передачи данных для утилиты scp, равного 100 КБ/с, может использоваться следующая команда:

$ trickle -u 100 scp backup.tgz alice@remote\_host.com:

При желании вы можете установить ограничение максимальной скорости приема данных (равное, к примеру, 300 КБ/с) для вашего веб-браузера Firefox, создав специальный файл запуска приложения со следующей командой запуска:

trickle -d 300 firefox %u

Наконец, утилита trickle может запускаться в режиме демона и контролировать «общую» пропускную способность сетевого соединения для всех приложений, которые были запущены с помощью нее. Для запуска trickle в режиме демона (т.е., trickled) может использоваться следующая команда:

$ sudo trickled -d 1000

После того, как демон trickled начнет работу в фоновом режиме, вы можете запускать другие приложения с помощью утилиты trickle. Теперь, если вы запустите с помощью утилиты trickle одно приложение, его скорость приема данных будет ограничиваться 1000 КБ/с. Если же вы запустите с помощью утилиты trickle еще одно приложение, скорость приема данных каждого из этих приложений будет ограничиваться 500 КБ/с и так далее…

## Ограничение пропускной способности сетевого соединения на уровне сетевого интерфейса в Linux

Еще один способ управления пропускной способностью вашего сетевого соединения заключается в установке лимитов скоростей приема и передачи данных на уровне сетевого интерфейса. Данный подход может оказаться полезным тогда, когда вы делите соединение с сетью Интернет с кем-либо еще. Как и в подавляющем большинстве случаев, в Linux есть необходимый для этого инструмент. Сценарий [wondershaper](http://lartc.org/wondershaper/) предназначен для выполнения описанной задачи: он ограничивает пропускную способность сетевого соединения на уровне сетевого интерфейса.

На самом деле, wondershaper является простым сценарием командной оболочки, который использует утилиту [tc](http://lartc.org/manpages/tc.txt) для установки параметров шейпинга трафика и качества сетевого соединения на уровне заданного сетевого интерфейса. Шейпинг исходящего трафика осуществляется путем распределения пакетов по очередям с разными приоритетами, шейпинг входящего трафика - путем отбрасывания пакетов.

Фактически, список полезных функций сценария wondershaper не ограничивался добавлением возможности управления пропускной способностью для каждого из сетевых интерфейсов. Wondershaper также пытается максимально снизить задержки интерактивных сессий, таких, как SSH в процессе загрузки или передачи файлов больших объемов. Кроме того, он гарантирует, что при передаче файлов больших объемов (например, при синхронизации директорий с сервером Dropbox) не будет значительно снижаться скорость загрузки файлов и наоборот.

Для установки wondershaper в Ubuntu, Debian и производных дистрибутивах следует использовать следующую команду:

$ sudo apt-get install wondershaper

Для установки wondershaper в дистрибутиве Fedora или CentOS/RHEL (с подключенным репозиторием EPEL) следует использовать следующую команду:

$ sudo yum install wondershaper

Сценарий wondershaper используется следующим образом:

$ sudo wondershaper <интерфейс> <лимит-скорости-приема> <лимит-скорости-передачи>

Например, для установки максимальных скоростей приема/передачи данных для сетевого интерфейса eth0, равных 1000 и 500 Кб/с соответственно, может использоваться следующая команда:

$ sudo wondershaper eth0 1000 500

Вы можете удалить установленное ограничение пропускной способности сетевого интерфейса с помощью следующей команды:

$ sudo wondershaper clear eth0

Если вас интересует принцип работы сценария wondershaper, вы можете изучить его содержимое (/sbin/wondershaper).

## Заключение

В данном руководстве я рассказал о двух различных вариантах ограничения пропускной способности сетевого соединения в системе Linux для настольных компьютеров, а именно, об ограничении пропускной способности сетевого соединения на уровне отдельных приложений и на уровне сетевых интерфейсов. Оба рассмотренных инструмента являются максимально простыми и позволяют быстро и просто организовать шейпинг ранее никоим образом не контролируемого сетевого трафика. Те из вас, кто желает узнать больше о способах ограничения пропускной способности сетевых соединений в Linux, могут ознакомиться со [следующим руководством](http://www.lartc.org/lartc.html).

```
:::