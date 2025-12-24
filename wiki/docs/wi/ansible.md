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