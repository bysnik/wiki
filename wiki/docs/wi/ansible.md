---
outline: deep
---

# Ansible

<ImageZoom src="https://habrastorage.org/getpro/habr/upload_files/81b/5e2/9f1/81b5e29f12b41ba26dff6cdd05848a5b.webp" />

Ansible — система управления конфигурациями, написанная на Python, с использованием декларативного языка разметки для описания конфигураций. Используется для автоматизации настройки и развертывания программного обеспечения. Обычно используется для управления Linux-узлами, но Windows также поддерживается. Поддерживает работу с сетевыми устройствами, на которых установлен Python версии 2.4 и выше по SSH или WinRM соединению.

https://www.altlinux.org/Ansible

https://docs.ansible.com/projects/ansible/latest/collections/index.html

## Быстрый старт

### Установка на сервер:
```bash
apt-get install ansible
```

### Установка на клиенты:
```bash
apt-get install python python-module-yaml python-module-jinja2 python-modules-json python-modules-distutils
```

На клиенте должен быть настроен ключевой (безпарольный) доступ по ssh к пользователю root на клиенте пользователем, который будет работать с ansible на сервере (не root).

Все дальнейшие действия производим на сервере.

### Редактируем файл `/etc/ansible/hosts` - это файл, который содержит списки хостов и группы этих хостов:

```
[all:vars]
ansible_user=root
ansible_python_interpreter=/usr/bin/python3

ниже указываем хосты
```

Пример файла hosts:
```
[all:vars]
ansible_user=root
ansible_python_interpreter=/usr/bin/python3

[group1]
192.168.100.101
192.168.100.102
192.168.100.103

[servers]
altsrv1.courses.alt
altsrv2.courses.alt

[wks]
altwks1 ansible_ssh_port=2221 ansible_ssh_host=192.168.100.201
altwks2 ansible_ssh_port=2221 ansible_ssh_host=192.168.100.202

[alt:children]
servers
wks
```

### Использование ad-hoc команд в Ansible

Проверяем связь с клиентом с помощью модуля ping в интерактивном режиме:
```bash
$ ansible -m ping servers
altsrv1 | SUCCESS => {
"changed": false,
"ping": "pong"
}
altsrv2 | SUCCESS => {
"changed": false,
"ping": "pong"
}
```

где servers - это группа хостов из файла `/etc/ansible/hosts`

Пример. Выполнение команды на управляемых узлах
```bash
$ ansible -i hosts -m shell -a 'uname -a' servers
altsrv2 | CHANGED | rc=0 >>
Linux altsrv2 5.10.82-std-def-alt1 #1 SMP Fri Dec 3 14:49:25 UTC 2021 x86_64 GNU/Linux
altsrv1 | CHANGED | rc=0 >>
Linux altsrv1 5.10.82-std-def-alt1 #1 SMP Fri Dec 3 14:49:25 UTC 2021 x86_64 GNU/Linux
```

Пример. Удаление файла
```bash
$ ansible -m file -a "name=/etc/nologin state=absent" all
```



### Создание хеша пароля:
```bash
mkpasswd <password>
```
Получаем строку.

Далее используем ansible-vault:
```bash
$ ansible-vault encrypt_string 'ранее полученный хэш'
New Vault password:
Confirm New Vault password:
!vault |
    $ANSIBLE_VAULT;1.1;AES256
    65366666616436396133363165346432623166616161383037613833393438363039336438386265
    6633613030303565316431336531313261366532376336640a623861316166643730323833666263
    65333534303663363066323832376231616261363636616330366634616334663234666330623934
    3764343932663632350a393563366331376630666239386163656531343936616438316434343738
    36636533366433353939666333313538633539383365643766663563616534623863396166356530
    63306638373134303961353364333131386361653064306364346265313334353436303239373838
    62346136656161653430383730663661393830313430343539366663383431626365633465376436
```

И теперь весь этот блок, начиная с `!vault |` необходимо использовать в ансибле

## `ansible-galaxy`

### 1. Управление ролями: установка и создание шаблонов

`ansible-galaxy` — утилита для работы с **ролями** (репозиториями переиспользуемого кода Ansible) и **коллекциями**.

#### 1.1. Поиск и установка ролей из Galaxy

```bash
# Поиск ролей по ключевому слову
ansible-galaxy search nginx

# Установка роли в каталог ~/.ansible/roles/
ansible-galaxy install geerlingguy.nginx

# Установка роли в произвольный каталог
ansible-galaxy install geerlingguy.nginx -p ./roles/
```

> 💡 **Важно:** Установленные роли автоматически подключаются в плейбуках через `roles:` без указания полного пути.

#### 1.2. Создание собственной роли

```bash
# Генерация структуры роли
ansible-galaxy init webserver

# Результат — каталог с шаблонной структурой:
webserver/
├── defaults/    # значения по умолчанию
├── tasks/       # основные задачи (main.yml)
├── handlers/    # обработчики
├── templates/   # шаблоны Jinja2
├── files/       # статические файлы
├── tests/       # плейбуки тестов
├── vars/        # переменные
├──  meta/       # метаданные и зависимости
└── README.md    # Файл README
```

### 2. Управление зависимостями через `requirements.yml`

Для воспроизводимости окружения все зависимости проекта описываются в файле `requirements.yml`.

#### 2.1. Файл зависимостей для ролей

```yaml
# requirements.yml
roles:
  - src: geerlingguy.php
    version: 4.0.0
  - src: https://github.com/example/custom-role.git
    scm: git
    version: main
```

Установка всех зависимостей одной командой:

```bash
ansible-galaxy install -r requirements.yml -p ./roles/
```

#### 2.2. Файл зависимостей для коллекций (Ansible ≥2.9)

```yaml
# collections/requirements.yml
collections:
  - name: community.general
    version: ">=4.0.0"
  - name: ansible.posix
  - source: https://galaxy.ansible.com
```

Установка коллекций:

```bash
ansible-galaxy collection install -r collections/requirements.yml -p ./collections/
```

> ⚠️ **Примечание:** При работе с приватными репозиториями используйте параметр `--token` или настройте `ansible.cfg`:
> ```ini
> [galaxy]
> server_list = automation_hub
> 
> [galaxy_server.automation_hub]
> url=https://cloud.redhat.com/api/automation-hub/
> token=YOUR_TOKEN
> ```

## Полезные рецепты с Альтвики

Рецепты применяются командой:

```
ansible-playbook <имя файла>
```

### Прописывание репозитория

Файл: /etc/ansible/playbooks/repo.yml

```
- hosts: local
  remote_user: root
  tasks: 
  - name: Remove all repositories
    shell: apt-repo rm all
  - name: Add official mirror
    shell: apt-repo add http://10.10.3.77/repo/p8
  - name: Add official mirror with arepo
    shell: apt-repo add 'rpm http://10.10.3.77/repo/p8 x86_64-i586 classic'
  - name: Add extra repository 
    shell: apt-repo add 'rpm http://10.10.3.77/repo/extra x86_64 extra'
```

**Примечание:** Используется [модуль shell](http://docs.ansible.com/ansible/latest/modules/shell_module.html) и программа apt-repo.

  

### Установка пакета

Файл: /etc/ansible/playbooks/install-ifcplugin.yml

```
- hosts: local
  remote_user: root
  tasks:
  - name: Update cache and install ifcplugin
    apt_rpm:
      name: ifcplugin
      state: present
      update_cache: yes
```

### Обновление системы

С версии ansible-2.9.27-alt2 и ansible-core-2.14.2-alt1:

```
- hosts: local
  remote_user: root
  gather_facts: no
  tasks:
  - name: Update cache
    apt_rpm:
      update_cache: true
  - name: Upgrade system
    apt_rpm:
      dist_upgrade: true
  - name: Upgrade kernel
    apt_rpm:
      update_kernel: true
  - name: Clean package cache
    apt_rpm:
      clean: true
```

Или всё в одном:

```
- hosts: local
  remote_user: root
  gather_facts: no
  tasks:
  - name: Upgrade system
    apt_rpm:
      update_cache: true
      dist_upgrade: true
      update_kernel: true
      clean: true
```

**Примечание:** Используется [модуль apt\_rpm](https://docs.ansible.com/ansible/latest/collections/community/general/apt_rpm_module.html).


### Пример с установкой и настройкой xrdp-server через роль

Структура проекта:

- xrdp-server.yaml - главный запускатор, пусть лежит в любом месте.

- /etc/ansible/roles/xrdp-server/ - директория роли

- /etc/ansible/roles/xrdp-server/tasks/main.yml - основной плейбук роли

- /etc/ansible/roles/xrdp-server/vars/main.yml - там у меня буквально одна переменная чисто подстраховаться

- /etc/ansible/roles/xrdp-server/всё-остальное - тут у меня всё пусто, чисто как было создано командой ansible-galaxy

#### xrdp-server.yaml

::: details
```yaml
- hosts: rdp_server
  roles:
    - role: xrdp-server
      vars:
        rdp_users:
          - username: user1
            password_hash: !vault |
              $ANSIBLE_VAULT;1.1;AES256
              65366666616436396133363165346432623166616161383037613833393438363039336438386265
              6633613030303565316431336531313261366532376336640a623861316166643730323833666263
              65333534303663363066323832376231616261363636616330366634616334663234666330623934
              3764343932663632350a393563366331376630666239386163656531343936616438316434343738
              36636533366433353939666333313538633539383365643766663563616534623863396166356530
              63306638373134303961353364333131386361653064306364346265313334353436303239373838
              62346136656161653430383730663661393830313430343539366663383431626365633465376436
              35396137323135613661
          - username: user2
            password_hash: !vault |
              $ANSIBLE_VAULT;1.1;AES256
              65366666616436396133363165346432623166616161383037613833393438363039336438386265
              6633613030303565316431336531313261366532376336640a623861316166643730323833666263
              65333534303663363066323832376231616261363636616330366634616334663234666330623934
              3764343932663632350a393563366331376630666239386163656531343936616438316434343738
              36636533366433353939666333313538633539383365643766663563616534623863396166356530
              63306638373134303961353364333131386361653064306364346265313334353436303239373838
              62346136656161653430383730663661393830313430343539366663383431626365633465376436
              35396137323135613661
          - username: user3
            password_hash: !vault |
              $ANSIBLE_VAULT;1.1;AES256
              65366666616436396133363165346432623166616161383037613833393438363039336438386265
              6633613030303565316431336531313261366532376336640a623861316166643730323833666263
              65333534303663363066323832376231616261363636616330366634616334663234666330623934
              3764343932663632350a393563366331376630666239386163656531343936616438316434343738
              36636533366433353939666333313538633539383365643766663563616534623863396166356530
              63306638373134303961353364333131386361653064306364346265313334353436303239373838
              62346136656161653430383730663661393830313430343539366663383431626365633465376436
              35396137323135613661
          - username: user4
            password_hash: !vault |
              $ANSIBLE_VAULT;1.1;AES256
              65366666616436396133363165346432623166616161383037613833393438363039336438386265
              6633613030303565316431336531313261366532376336640a623861316166643730323833666263
              65333534303663363066323832376231616261363636616330366634616334663234666330623934
              3764343932663632350a393563366331376630666239386163656531343936616438316434343738
              36636533366433353939666333313538633539383365643766663563616534623863396166356530
              63306638373134303961353364333131386361653064306364346265313334353436303239373838
              62346136656161653430383730663661393830313430343539366663383431626365633465376436
              35396137323135613661
          - username: user5
            password_hash: !vault |
              $ANSIBLE_VAULT;1.1;AES256
              65366666616436396133363165346432623166616161383037613833393438363039336438386265
              6633613030303565316431336531313261366532376336640a623861316166643730323833666263
              65333534303663363066323832376231616261363636616330366634616334663234666330623934
              3764343932663632350a393563366331376630666239386163656531343936616438316434343738
              36636533366433353939666333313538633539383365643766663563616534623863396166356530
              63306638373134303961353364333131386361653064306364346265313334353436303239373838
              62346136656161653430383730663661393830313430343539366663383431626365633465376436
              35396137323135613661
```
:::

#### /etc/ansible/roles/xrdp-server/tasks/main.yml

::: details
```yaml
#SPDX-License-Identifier: MIT-0
---
# tasks file for xrdp-server
- name: Ensure rdp_users is defined and not empty
  assert:
    that:
      - rdp_users is defined
      - rdp_users | length > 0
    fail_msg: "rdp_users must be defined and contain at least one user"
  when: configure_users | default(true)
- name: Install xrdp
  apt_rpm:
    name: xrdp
    state: present
    update_cache: yes  
- name: Set WaylandEnable=false in /etc/gdm/custom.conf for GNOME
  replace:
    path: /etc/gdm/custom.conf
    regexp: '^#?\s*WaylandEnable\s*=.*$'
    replace: 'WaylandEnable=false'
- name: Set UserWindowManager=/usr/bin/gnome-session in /etc/xrdp/sesman.ini for GNOME
  replace:
    path: /etc/xrdp/sesman.ini
    regexp: '^#?\s*UserWindowManager\s*=\s*startwm\.sh$'
    replace: 'UserWindowManager=/usr/bin/gnome-session'
- name: Set DefaultWindowManager=/usr/bin/gnome-session in /etc/xrdp/sesman.ini for GNOME
  replace:
    path: /etc/xrdp/sesman.ini
    regexp: '^#?\s*DefaultWindowManager\s*=\s*startwm\.sh$'
    replace: 'DefaultWindowManager=/usr/bin/gnome-session'
- name: Enable and start services
  systemd:
    name: "{{ item }}"
    enabled: yes
    state: started
    masked: no
  loop:
  - xrdp
  - xrdp-sesman
- name: Create users
  user:
    name: "{{ item.username }}"
    password: "{{ item.password_hash }}"
    state: present
    create_home: yes
    shell: /bin/bash
    groups: tsusers,fuse
  loop: "{{ rdp_users }}"
- name: Reboot system
  reboot:
    reboot_timeout: 300
```
:::

#### /etc/ansible/roles/xrdp-server/vars/main.yml

::: details
```yaml
#SPDX-License-Identifier: MIT-0
---
# vars file for xrdp-server
rdp_users: []
```
:::

## Ссылки

- [Основы Ansible, без которых ваши плейбуки — комок слипшихся макарон](http://habr.com/ru/post/508762/)

---

использование плагина [nmap](https://docs.ansible.com/ansible/latest/collections/community/general/nmap_inventory.html) в связке с плагином [constructed](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/constructed_inventory.html). При запуске он опрашивает указанные подсети и формирует список хостов для применения плейбуков или ролей, а потом делает свои грязные делишки на отобранные по правилам хосты.



Использование ANSIBLE VAULT
Назначение:
- Шифрование данных
- Хранение шифрованных данных
- Расшифровка данных только в момент использования этих данных
Работа с ansible-vault в интерактивном режиме:
```bash
$ ansible-vault
- create
- decrypt
- edit
- view
- encrypt
- encrypt_string
- rekey
```
Шифрование отдельных строк:
```bash
$ ansible-vault encrypt_string 'password'
New Vault password:
Confirm New Vault password:
!vault |
$ANSIBLE_VAULT;1.1;AES256
    36616364663239636230386638643139383237326533363236323339666162323163376565313138
    3333636130646636363639363530643364656534336338370a383131306136353337303261366430
    61366633656262373236333434353539633631366533623630373032366461346630636635313235
    6631393939646632360a656430626338336533376437646232323161653939383739353564353934
    6338
```
Применение полученного результата, создадим плейбук в котором
используются зашифрованная строка:
```yaml
play1.yml:
---
- name: Получим пароль
hosts: localhost
gather_facts: no
vars:
password: !vault |
$ANSIBLE_VAULT;1.1;AES256
    36616364663239636230386638643139383237326533363236323339666162323163376565313138
    3333636130646636363639363530643364656534336338370a383131306136353337303261366430
    61366633656262373236333434353539633631366533623630373032366461346630636635313235
    6631393939646632360a656430626338336533376437646232323161653939383739353564353934
    6338
tasks:
- name: debug
debug:
msg: "Пароль: {{ password }} "
```
Выполним полученный плейбук:
```bash
$ ansible-play play1.yml
# Получим ошибку, т.к. не указан пароль для расшифровки
$ ansible-playbook play1.yml --ask-vault-password
PLAY [Получим пароль]
******************************************************************************
TASK [debug]
***************************************************************************************
ok: [localhost] => {
"msg": "Пароль: password "
}
PLAY RECAP
*****************************************************************************************
localhost : ok=1 changed=0 unreachable=0
failed=0 skipped=0 rescued=0 ignored=0
Создание строки пригодной для встраивание в плейбуки:
$ ansible-vault encrypt_string 'password' --name 'user_password'
user_password: !vault |
$ANSIBLE_VAULT;1.1;AES256
    63366162373537346533316265303361303766393938333439633965613866623130376330616531
    3664323366666234363636656264333133653562396135310a633237613966343065643736363733
    34313737643732616662356539383130373962356363333366353834366163313030663563623037
    3633663230373636330a326262353464323334363632323639313633313531333164343664376438
    3433
```
Создание хранилища в виде файла:
```bash
$ ansible-vault create /tmp/vault1.yml
New Vault password:
Confirm New Vault password:
```
Запускается редактор по-умолчанию для редактирование файла (vim).
Просмотр результата:
```bash
$ cat /tmp/vault1.yml
$ANSIBLE_VAULT;1.1;AES256
    31306565313730343431623364613939373162323163643238613137323261653139623062646438
    3764383630306665666439663530613538363035386232640a643265356263303133623037363234
    33326336386338613064383732663664396436643864303137653966376139643465353566313330
    3662323665636463630a653637376438326164306536313638653633333930626262636362353962
    36613462333261346633323464646437316464343034353830316437373431643765
```
Просмотр дешифрованного содержимого файла:
```bash
$ ansible-vault view /tmp/vault1.yml
Vault password:
user_password: netlab123
```
Использование шифрованных файлов в плейбуке:
play1.yml:
```yaml
---
- name: Получим пароль
hosts: localhost
vars_files: "/tmp/vault1.yml"
gather_facts: no
tasks:
- name: debug
debug:
msg: "Пароль: {{ user_password }}"
```
Результат:
```bash
$ ansible-playbook play1.yml --ask-vault-password
Vault password:
PLAY [Получим пароль]
******************************************************************************
TASK [debug]
***************************************************************************************
ok: [localhost] => {
"msg": "Пароль: netlab123"
}
PLAY RECAP
*****************************************************************************************
localhost : ok=1 changed=0 unreachable=0
failed=0 skipped=0 rescued=0 ignored=0
```
Редактирование зашифрованного содержимого файла:
```bash
$ EDITOR=nano ansible-vault edit /tmp/vault1.yml
# Данные в виде словаря
passwords:
user1:
password: netlab123
user2:
password: netlab123
Изменённый плейбук:
play1.yml:
---
- name: Получим пароль
hosts: localhost
vars_files: "/tmp/vault1.yml"
gather_facts: no
tasks:
- name: debug
debug:
msg: "Пароль пользователя {{ item.key }} :
{{ item.value.password }}"
loop: "{{ passwords | dict2items }}"
```
```bash
$ ansible-playbook play1.yml --ask-vault-password
Vault password:
```
Шифрованние/дешифрование готового файла:
```bash
$ vim user-passwords.yml # создаём файл
$ ansible-vault encrypt user-passwords.yml # шифрование файла
$ cat user-passwords.yml # просмотр результата
$ ansible-vault view user-passwords.yml # просмотр
$ ansible-vault decrypt user-passwords.yml # шифрование файла
$ ansible-vault encrypt user-passwords.yml # зашифруем снова
```
Шифрование (+ хранение) файла:
```bash
$ cp ~/.ssh/id_rsa id_rsa.encrypted
$ ansible-vault encrypt id_rsa.encrypted
```
```yaml
Создадим плейбук для копирования зашифрованного файла:
copy-file.yml:
---
- name: Соединяемся с другим узлом
hosts: remotehost
gather_facts: no
become: false
tasks:
- name: Копирование файла на удалённый сервер
copy:
src: id_rsa.encrypted
dest: ~/.ssh/remote_key
mode: '0600'
Пример использования:
use-user.yml:
---
- name: Соединяемся с другим узлом
hosts: remotehost
vars_files: "user-passwords.yml"
gather_facts: no
tasks:
- name: Установим учётную запись и пароль для соединения
set_fact:
ansible_user: "{{ item.key }}"
ansible_password: "{{ item.value.password }}"
with_items: "{{ passwords | dict2items }}"
when:
- item.key == "user1"
- name: Посмотрим в какие группы входит пользователь
shell: /usr/bin/id
register: result
- name: Посмотрим результат
debug:
msg: "Пользователь {{ ansible_user }} входит в группы
{{result.stdout}}"
```
Потребуется sshpass:
```bash
# apt-get install sshpass
$ ansible-playbook use-user.yml --ask-vault-password
Vault password:
- no_log:
```
Использование ansible-vault без введения пароля:
```bash
ANSIBLE_VAULT_PASSWORD_FILE=
--vault-password-file=
$ ansible-playbook use-user.yml --vault-password-file=
$ chmod +x <vault-password-file>
```
say_password:
```bash
#!/bin/sh
echo U2FsdGVkX1+7Gd8IBqVzGfDmsrbRcT2K0SNZSq8158o= | openssl aes-
256-cbc -d -a -pass pass:somepassword 2>/dev/null
Использование ansible-vault в ролях:
$ cd r1/vars
- открытая часть:
- закрытая часть:
passwords.yml:
---
# vars file for r1
passwords:
user1:
password: "netlab123"
```
Шифруем файл «закрытой части»:
```bash
$ ansible-vault encrypt passwords.yml
New Vault password:
Confirm New Vault password:
Encryption successful
Изменяем файл с задачами:
$ cd ../tasks/
```
```yaml
main.yml:
---
# tasks file for r1
- name: Создаём пользователя без пароля
user:
name: "{{ item.key }}"
append: "{{ item.value.append }}"
groups: "{{ item.value.groups }}"
loop: "{{ users | dict2items }}"
- name: Добавим файл с паролем
include_vars: passwords.yml
- name: Создаём пароль для пользователя
user:
name: "{{ item.key }}"
password: "{{ item.value.password |
password_hash('sha512') }}"
loop: "{{ passwords | dict2items }}"
no_log: true
```
```bash
$ ansible-playbook r1task.yml --vault-password-file=say_password
```
Использование нескольких хранилищ:
```bash
$ cat ~/.ansible/inventory.ini
$ EDITOR=nano ansible-vault create --vault-id become105@prompt
```
/home/sysadmin/.ansible/192.168.100.105.yml
```yaml
- @
- prompt
```
```bash
$ cat /home/sysadmin/.ansible/192.168.100.105.yml
$ANSIBLE_VAULT;1.2;AES256;become105
$ vim become105
r1task.yml:
vars_files: "/home/sysadmin/.ansible/192.168.100.105.yml"
$ ansible-playbook r1task.yml --vault-password-file=say_password
--vault-id=become105
--vault-password-file=
--vault-id=
```

::: tip
```
Система управления конфигурациями
Ansible
Основы Ansible
Об Ansible
• Ansible
• Декларативный синтаксис
• Отличительные особенности Ansible
◦ не требует агентского ПО
◦ декларативный синтаксис
◦ push-модель управления
◦ паралельное выполнение изменений
Назначение
• Настройка
• Множество управляемых узлов
• Параметризация
• Сборка фактов
Архитектура
• Управляющий хост
• Управляемые хосты (targets)
• Сетевое взаимодействие
• Модули
• Задание (tasks)
Архитектура Ansible
```
<ImageZoom src="https://habrastorage.org/getpro/habr/upload_files/5f2/284/e80/5f2284e805ee0ad18b680351866a6621.png" />
```
Установка в ОС Альт
Управляющий узел
$ apt-get install ansible
/etc/ansible/ansible.cfg
~/.ansible.cfg
Подключение к управлемым узлам
• ssh root@host
$ ssh-keygen
$ ssh-copy-id root@<host>
• ssh user@host
Управляемые узлы
$ apt-get install python3 python3-module-yaml python3-module-jinja2 python3-
module-jsonlib
Файл инвентаризации (Inventory)
/etc/ansible/hosts
$ ansible -i ./hosts
$ ANSIBLE_HOSTS=./hosts
Структура файлов инвентаризации
[all:vars]
ansible_user=root
ansible_python_interpreter=/usr/bin/python3
mail.domain.alt
[webservers]
www.domain.alt
private-web.domain.alt
[dbases]
db[1:3].domain.alt
all:
hosts:
mail.domain.alt
children:
webservers:
host:
www.domain.alt
private-web.domain.alt
dbases:
hosts:
db[1:3].domain.alt
Хосты в файле инвенторизации
Группы файла инвентаризации
Переменные файла инвентаризации
Пример файла инвентаризации
[all:vars]
ansible_user=root
ansible_python_interpreter=/usr/bin/python3
[group1]
192.168.100.101
192.168.100.102
192.168.100.103
[servers]
altsrv1.courses.alt
altsrv2.courses.alt
[wks]
altwks1 ansible_ssh_port=2221 ansible_ssh_host=192.168.100.201
altwks2 ansible_ssh_port=2221 ansible_ssh_host=192.168.100.202
[alt:children]
servers
wks
Динамическая инвентаризация
Дополнительное чтение
• https://habr.com/ru/post/509938/
Использование ad-hoc команд в Ansible
Ad-hoc команды
• Типичное применение
◦ управление службами и процессами
◦ проверка содержимого файлов журналов
◦ проверка установленного ПО
◦ проверка системных параметров и данных производительности
◦ знакомство с новыми модулями
Синтаксис команды ansible
$ ansible [-i inventory ] \
[-m module] [-a "params"] \
[ -b ] \
[all|group|host]
• -i inventory-file
• -m module
• -a “param1=val param2=val”
• -b
• all|group|host
Пример. ping средствами Ansible
$ ansible -i hosts -m ping servers
altsrv1 | SUCCESS => {
"changed": false,
"ping": "pong"
}
altsrv2 | SUCCESS => {
"changed": false,
"ping": "pong"
}
$ ansible -m ping all
Пример. Выполнение команды на управляемых узлах
$ ansible -i hosts -m shell -a 'uname -a' servers
altsrv2 | CHANGED | rc=0 >>
Linux altsrv2 5.10.82-std-def-alt1 #1 SMP Fri Dec 3 14:49:25 UTC 2021 x86_64
GNU/Linux
altsrv1 | CHANGED | rc=0 >>
Linux altsrv1 5.10.82-std-def-alt1 #1 SMP Fri Dec 3 14:49:25 UTC 2021 x86_64
GNU/Linux
Пример. Удаление файла
$ ansible -m file -a "name=/etc/nologin state=absent" all
Цветовой вывод ansible
• зеленый
• желтый
• красный
Модули Ansible
О модулях
• Модули Ansible
$ ansible -m module -a "name1=value1 name2=value2"
$ ansible -i hosts -m copy -a 'src=/etc/hosts dst=/etc' all
• https://docs.ansible.com
Часто используемые модули
Модуль Назначение
ping Проверка доступности узла
setup Сбор фактов с управляемых узлов
apt_rpm Установка/обновление ПО
service Управление службами
systemd Управление службами средствами systemd
copy Копирование файлов
file создание, удаление, изменение атрибутов
файлов
template Тиражирование шаблонных файлов
replace Замена строк в файлах на основе регулярных
выражений
Модуль Назначение
lineinfile Вставка, замена, удаление строк в файлах
user Управление пользовательскими УЗ
group Управление УЗ групп
command, shell Выполнение произвольных внешних команд
окружения
debug Вывод отладочной информации
Рецепты (плейбуки) ansible
О рецептах
Правила написания YAML-плейбуков
1. Отступы пробелами
2. Списки play, tasks
3. Равенство отступов
Структура плейбука
play1
task1
task2
. . .
play2
task1
task2
. . .
. . .
• Play (hosts->tasks)

```
:::



## что то про Ansible
::: tip

Далее — доставка на свежеустановленную систему ключей Ansible и установка hostname. Если в ОСи будут установлены ключи от Ansible, то дальше можно все сделать через сам Ansible. Тут нам поможет пакет alterator-postinstall и простейший скрипт, который доставит в /root/.ssh/authorized_keys нужные ключи. У меня 2 Ansible, 1 в головном офисе, и 1 в филиале, канал с которым, мягко говоря, оставляет желать лучшего. Поэтому 2 ключа. Так же нужно позаботиться об инженерах техподдержки, и закинуть в свежую систему скрипт, который на основе существующих в AD записей для компьютеров, будет подбирать подходящий hostname для нового ПК перед вводом в домен. Эти скрипты тоже нужно будет доставить в целевую систему. Скрипт назовем 87-set-ansbls-keys.sh, и напишем в нем следующее (ну почти так, ключи я вам не покажу =Ъ):

```
#!/bin/sh

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
```
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
```
3.2. Добавить локальные репозитории
```
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
```
3.3. Установить в систему весь требуемый софт, …
```
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
```
3.4. Сформировать конфиги для подключения ПК к домену, ..
```
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
```
3.5. Настроить ssh согласно требованиям от ИБ, в том числе ограничить доступ для определенных групп AD
```
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
```
3.6. Настроить доступ к sudo для определенной группы AD
```
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
```
3.8. Ввести ПК в домен
```
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
```
3.10. Предусмотреть возможность массового обновления

Тут пришлось сделать отдельный playbook для обновления, и отдельный playbook для брендирования, так как мы пошли по простому пути – не стали пилить тему для кедов, а просто поменяли интересующие нас картинки. И поэтому при обновлении пакетов картинки затираются. Поэтому сразу после обновления происходит брендирование.

Playbook апдейта:
```
- name: update and upgrade
  hosts: simply
  gather_facts: false
  tasks:

  - name: update & upgrade
    shell: |
      apt-get update -y && apt-get dist-upgrade -y
      apt-get dedup -y
```
Брендинг у нас уже был (но я вам его не покажу, мне запретили). И поэтому playbook обновления выглядят так:
```
- import_playbook: update.yml
- import_playbook: branding.yml
```
:::