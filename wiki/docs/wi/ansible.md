# Ansible

![](https://habrastorage.org/getpro/habr/upload_files/81b/5e2/9f1/81b5e29f12b41ba26dff6cdd05848a5b.webp)

Ansible — система управления конфигурациями, написанная на Python, с использованием декларативного языка разметки для описания конфигураций. Используется для автоматизации настройки и развертывания программного обеспечения. Обычно используется для управления Linux-узлами, но Windows также поддерживается. Поддерживает работу с сетевыми устройствами, на которых установлен Python версии 2.4 и выше по SSH или WinRM соединению.

https://www.altlinux.org/Ansible

## Быстрый старт

### Установка на сервер:
```bash
apt-get install ansible
```

### Установка на клиенты:
```bash
apt-get install python python-module-yaml python-module-jinja2 python-modules-json python-modules-distutils
```

На клиенте должен быть настроен доступ по ssh пользователем, находящимся в группе wheel.

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
Linux altsrv2 5.10.82-std-def-alt1 #1 SMP Fri Dec 3 14:49:25 UTC 2021 x86_64
GNU/Linux
altsrv1 | CHANGED | rc=0 >>
Linux altsrv1 5.10.82-std-def-alt1 #1 SMP Fri Dec 3 14:49:25 UTC 2021 x86_64
GNU/Linux
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

  

#### Ссылки

- [Основы Ansible, без которых ваши плейбуки — комок слипшихся макарон](http://habr.com/ru/post/508762/)

---

использование плагина [nmap](https://docs.ansible.com/ansible/latest/collections/community/general/nmap_inventory.html) в связке с плагином [constructed](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/constructed_inventory.html). При запуске он опрашивает указанные подсети и формирует список хостов для применения плейбуков или ролей, а потом делает свои грязные делишки на отобранные по правилам хосты.


:::
Использование ANSIBLE VAULT
Назначение:
- Шифрование данных
- Хранение шифрованных данных
- Расшифровка данных только в момент использования этих данных
Работа с ansible-vault в интерактивном режиме:
$ ansible-vault
- create
- decrypt
- edit
- view
- encrypt
- encrypt_string
- rekey
Шифрование отдельных строк:
$ ansible-vault encrypt_string 'password'
New Vault password:
Confirm New Vault password:
!vault |
$ANSIBLE_VAULT;1.1;AES256
366163646632396362303866386431
39383237326533363236323339666162323163376565313138
3333636130646636363639363530643364656534336338370a3831313061363533
37303261366430
613666336562623732363334343535396336313665336236303730323664613466
30636635313235
6631393939646632360a6564306263383365333764376462323231616539393837
39353564353934
6338
Применение полученного результата, создадим плейбук в котором
используются зашифрованная строка:
play1.yml:
---
- name: Получим пароль
hosts: localhost
gather_facts: no
vars:
password: !vault |
$ANSIBLE_VAULT;1.1;AES256
366163646632396362303866386431393832373265333632363233396661623231
63376565313138
3333636130646636363639363530643364656534336338370a3831313061363533
37303261366430
613666336562623732363334343535396336313665336236303730323664613466
30636635313235
6631393939646632360a6564306263383365333764376462323231616539393837
39353564353934
6338
tasks:
- name: debug
debug:
msg: "Пароль: {{ password }} "
Выполним полученный плейбук:
$ ansible-play play1.yml
# Получим ошибку, т.к. не указан пароль для расшифровки
$ ansible-playbook play1.yml --ask-vault-password
PLAY [Получим пароль]
******************************************************************
************
TASK [debug]
******************************************************************
*********************
ok: [localhost] => {
"msg": "Пароль: password "
}
PLAY RECAP
******************************************************************
***********************
localhost : ok=1 changed=0 unreachable=0
failed=0 skipped=0 rescued=0 ignored=0
Создание строки пригодной для встраивание в плейбуки:
$ ansible-vault encrypt_string 'password' --name 'user_password'
user_password: !vault |
$ANSIBLE_VAULT;1.1;AES256
633661623735373465333162653033613037663939383334396339656138666231
30376330616531
3664323366666234363636656264333133653562396135310a6332376139663430
65643736363733
343137376437326166623565393831303739623563633333663538343661633130
30663563623037
3633663230373636330a3262623534643233343636323236393136333135313331
64343664376438
3433
Создание хранилища в виде файла:
$ ansible-vault create /tmp/vault1.yml
New Vault password:
Confirm New Vault password:
Запускается редактор по-умолчанию для редактирование файла (vim).
Просмотр результата:
$ cat /tmp/vault1.yml
$ANSIBLE_VAULT;1.1;AES256
313065653137303434316233646139393731623231636432386131373232616531
39623062646438
3764383630306665666439663530613538363035386232640a6432653562633031
33623037363234
333263363863386130643837326636643964366438643031376539663761396434
65353566313330
3662323665636463630a6536373764383261643065363136386536333339306262
62636362353962
366134623332613466333234646464373164643430343538303164373734316437
65
Просмотр дешифрованного содержимого файла:
$ ansible-vault view /tmp/vault1.yml
Vault password:
user_password: netlab123
Использование шифрованных файлов в плейбуке:
play1.yml:
---
- name: Получим пароль
hosts: localhost
vars_files: "/tmp/vault1.yml"
gather_facts: no
tasks:
- name: debug
debug:
msg: "Пароль: {{ user_password }}"
Результат:
$ ansible-playbook play1.yml --ask-vault-password
Vault password:
PLAY [Получим пароль]
******************************************************************
************
TASK [debug]
******************************************************************
*********************
ok: [localhost] => {
"msg": "Пароль: netlab123"
}
PLAY RECAP
******************************************************************
***********************
localhost : ok=1 changed=0 unreachable=0
failed=0 skipped=0 rescued=0 ignored=0
Редактирование зашифрованного содержимого файла:
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
$ ansible-playbook play1.yml --ask-vault-password
Vault password:
Шифрованние/дешифрование готового файла:
$ vim user-passwords.yml # создаём файл
$ ansible-vault encrypt user-passwords.yml # шифрование файла
$ cat user-passwords.yml # просмотр результата
$ ansible-vault view user-passwords.yml # просмотр
$ ansible-vault decrypt user-passwords.yml # шифрование файла
$ ansible-vault encrypt user-passwords.yml # зашифруем снова
Шифрование (+ хранение) файла:
$ cp ~/.ssh/id_rsa id_rsa.encrypted
$ ansible-vault encrypt id_rsa.encrypted
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
Потребуется sshpass:
# apt-get install sshpass
$ ansible-playbook use-user.yml --ask-vault-password
Vault password:
- no_log:
Использование ansible-vault без введения пароля:
ANSIBLE_VAULT_PASSWORD_FILE=
--vault-password-file=
$ ansible-playbook use-user.yml --vault-password-file=
$ chmod +x <vault-password-file>
say_password:
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
Шифруем файл «закрытой части»:
$ ansible-vault encrypt passwords.yml
New Vault password:
Confirm New Vault password:
Encryption successful
Изменяем файл с задачами:
$ cd ../tasks/
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
$ ansible-playbook r1task.yml --vault-password-file=say_password
Использование нескольких хранилищ:
$ cat ~/.ansible/inventory.ini
$ EDITOR=nano ansible-vault create --vault-id become105@prompt
/home/sysadmin/.ansible/192.168.100.105.yml
- @
- prompt
$ cat /home/sysadmin/.ansible/192.168.100.105.yml
$ANSIBLE_VAULT;1.2;AES256;become105
$ vim become105
r1task.yml:
vars_files: "/home/sysadmin/.ansible/192.168.100.105.yml"
$ ansible-playbook r1task.yml --vault-password-file=say_password
--vault-id=become105
--vault-password-file=
--vault-id=
:::