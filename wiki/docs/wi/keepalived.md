# Keepalived

https://www.altlinux.org/Keepalived
https://selectel.ru/blog/tutorials/what-is-keepalived-and-vip/  

Keepalived - это программный комплекс обеспечивающий высокую доступность и балансировку нагрузки.  

Keepalived — программный инструмент, предназначенный для обеспечения высокой доступности и отказоустойчивости сетевых сервисов. Он первоначально был разработан для работы с Linux Virtual Server (LVS) для балансировки нагрузки, но его функциональность была расширена, и теперь его часто используют для управления Virtual IP (VIP) адресами и для организации механизма failover (переключение на резервный сервер при сбое основного).

Keepalived работает на основе протокола VRRP (Virtual Router Redundancy Protocol), который позволяет нескольким серверам обмениваться информацией о состоянии друг друга.

В случае отказа одного из серверов, другой сервер может автоматически взять на себя его функции, чтобы пользователи не заметили прерывания в работе сервиса.
VIP (Virtual IP)

VIP (Virtual IP Address) — это виртуальный IP-адрес, который не привязан к какому-то конкретному физическому интерфейсу. VIP может быть использован для того, чтобы обеспечить доступ к сервису, который работает на нескольких серверах (например, в кластере). В случае отказа одного сервера, VIP может быть перенесен на другой сервер, обеспечивая непрерывность работы сервиса.
Как они работают вместе

В типичной конфигурации с Keepalived и VIP:

    Один сервер назначается как “главный” или “мастер” и отвечает за управление VIP. Этот сервер обычно активно обслуживает запросы.
    Другой сервер или несколько серверов находятся в режиме ожидания и мониторят состояние мастера с помощью Keepalived.
    Если мастер сервер выходит из строя, один из резервных серверов автоматически берет на себя VIP и начинает обслуживать запросы.

Таким образом, пользователи продолжают получать доступ к сервису без заметных сбоев, даже если один из серверов выходит из строя.

## Тестовая конфигурация

Рассмотрим на примере почтовых серверов dovecot с настроенной репликацией [Dovecot\\Replication](https://www.altlinux.org/Dovecot%5CReplication "Dovecot\Replication")  

- balance01 - сервер балансировки №1 IP 192.168.135.235
- balance02 - сервер балансировки №2 IP 192.168.135.236
- dovecot01 - back-end сервер №1 IP 192.168.135.238
- dovecot02 - back-end сервер №2 IP 192.168.135.239
- 192.168.135.237 - виртуальный адрес по которому будут доступны back-end серверы

## Предварительная настройка балансировочных серверов

Установим нужный пакет на обоих серверах балансировки:

```
# apt-get install keepalived
```

Изменим параметр ядра **net.ipv4.ip\_forward** для этого в файле /etc/net/sysctl.conf добавим:

```
net.ipv4.ip_forward = 1
```

Для немедленного применения настроек выполним:

```
# sysctl -p
```

## Настройка MASTER сервера

Создадим файл настройки:

```
# touch /etc/keepalived/keepalived.conf
```

Комментарии в файле настройки выделяются знаком "!"  
Добавим блок **global\_defs**:

```
global_defs {
  ! имя балансера
  router_id LVS_1
}
```

Добавим блок **vrrp\_instance** отвечающий за настройку виртуального роутера, для каждого сетевого интерфейса необходимо настроить, по крайне мере один блок vrrp\_instance. Вы можете добавить необходимое количество блоков для каждой группы виртуальных IP:

```
vrrp_instance DOVECOT {
        !Указывает на то что в каком состоянии стартует нода
        state MASTER
        !Интерфейс для виртуальных IP
        interface ens18
        !Интерфейс для обмена служебными пакетами между нодами
        lvs_sync_daemon_inteface ens18
        !Уникальное имя виртуального роутера
        virtual_router_id 102
        !Приоритет данной ноды относительно других, нода с наибольшим приоритетом переходит в состояние MASTER
        priority 150
        !Как часто происходит обновление состояния кластера
        advert_int 1
        !Аутентификация используется для синхронизации между нодами
        authentication {
                auth_type PASS
                auth_pass 12345678
        }
        !Виртуальные адреса, которые настроит keealived
        virtual_ipaddress {
                192.168.135.237/24
        }
}
```

Далее следует блок настройки виртуального сервера:

```
virtual_server 192.168.135.237 22 {
        !Частота проверок
        delay_loop 6
        !Выбираем режим балансировки, для dovecot лучше выбрать Locality-Based Least-Connection
        lb_algo lblc
        !Выбираем метод перенаправления, в нашем случае Direct Routing
        lb_kind DR
        protocol TCP
        !Описываем back-end серверы
        real_server 192.168.135.238 143 {
                !Задаем вес сервера
                weight 1
                !Настраиваем проверку на доступность
                TCP_CHECK {
                        connect_timeout 3
                        connect_port 143
                        nb_get_retry 3
                        delay_before_retry 3
                }
        }
        real_server 192.168.135.239 143 {
                weight 1
                TCP_CHECK {
                        connect_timeout 3
                        connect_port 143
                        nb_get_retry 3
                        delay_before_retry 3
                }
        }
}
```

Запустим и добавим сервис keepalived в автозагрузку:

```
# systemctl enable keepalived
# systemctl start keepalived
```

На MASTER ноде должен добавится виртуальный IP:

```
# ip a | grep ens18
2: ens18: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    inet 192.168.135.235/24 brd 192.168.135.255 scope global ens18
    inet 192.168.135.237/24 scope global secondary ens18
```

## Настройка BACKUP сервера

Файл настройки BACKUP сервера отличается только следующими параметрами:

```
router_id LVS_2
state BACKUP
priority 100
```

## Настройка back-end серверов

Необходимо настроить виртуальный IP на обоих back-end серверах. Для этого в файл /etc/net/ifaces/ens18/ipv4address добавим наш виртуальный IP:

```
192.168.135.237/24
```

Только MASTER сервер балансировки должен отвечать ARP запросы виртуального IP адреса. Необходимо установить параметры ядра **arp\_ignore** и **arp\_announce** для сетевого интерфейса с виртуальным IP, для того чтобы они не реагировали на ARP запросы для виртуального IP адреса. Для этого для этого в файле /etc/net/sysctl.conf добавим:

```
net.ipv4.conf.ens18.arp_ignore = 1
net.ipv4.conf.ens18.arp_announce = 2
```

Для немедленного применения выполним:

```
# sysctl -p
```

На обоих back-end серверах должен появится виртуальный IP адрес:

```
# ip a |grep ens18
2: ens18: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    inet 192.168.135.238/24 brd 192.168.135.255 scope global ens18
    inet 192.168.135.237/24 scope global secondary ens18
```









## Настройка Keepalived и VIP в Облачной платформе

Установку и настройку будем проводить на примере серверов Master (192.168.10.10) и Backup (192.168.10.20) с установленной ОС Ubuntu 22.04. В качестве VIP будем использовать адрес 192.168.10.22.

В большинстве популярных дистрибутивов Linux keepalived доступен в официальных репозиториях и может быть установлен оттуда. Установим и активируем демон Keepalived на двух серверах:

```
apt update
apt install keepalived
systemctl enable keepalived
```

После установки необходимо заполнить конфигурационный файл **/etc/keepalived/keepalived.conf: nano /etc/keepalived/keepalived.conf**

Пример конфигурации для сервера Master:

```bash
global_defs {
   router_id MASTER
}
vrrp_instance VI_1 {
    state MASTER
    interface eth0  # Замените на имя вашего сетевого интерфейса
    virtual_router_id 51
    priority 101  # Установите приоритет выше, чем у резервного сервера
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass your_password  # Замените на надежный пароль
    }

    virtual_ipaddress {
        192.168.10.22
    }
}
```

Пример конфигурации для сервера Backup:

```bash
global_defs {
   router_id BACKUP
}
vrrp_instance VI_1 {
    state BACKUP
    interface eth0  # Замените на имя вашего сетевого интерфейса
    virtual_router_id 51
    priority 100  # Установите приоритет ниже, чем у основного сервера
    advert_int 1
    authentication {
        auth_type PASS
    auth_pass your_password  # Должен совпадать с паролем на основном сервере
    }
    virtual_ipaddress {
        192.168.10.22
    }
}
```

Описание параметров:

- global\_defs: глобальные определения, включая уникальный идентификатор для данного роутера.
- vrrp\_instance: определяет VRRP-инстанс (виртуальный маршрутизатор) с именем VI\_1.
	- state: устанавливает состояние узла как BACKUP.
	- interface: указывает сетевой интерфейс, на котором будет работать VIP.
	- virtual\_router\_id: уникальный идентификатор VRRP для группы виртуальных маршрутизаторов. Должен совпадать с идентификатором на основном сервере.
	- priority: приоритет для определения основного и резервного узлов. Установите его ниже, чем у основного сервера.
	- advert\_int: интервал объявления состояния (в секундах).
	- authentication: настройки аутентификации для безопасности. Должен совпадать с паролем на основном сервере.
	- virtual\_ipaddress: указывает VIP, который будет управляться этим узлом.

Настраивать IP-алиас в любом другом месте, кроме файла конфигурации Keepalived, не требуется. Keepalived автоматически назначит IP-адрес нужному сетевому интерфейсу.

После внесения изменений в конфигурацию запустим Keepalived для применения настроек:

```
systemctl start keepalived
```

Проверить статус Keepalived можно командой:

```
systemctl status keepalived
```
```bash
root@master:~# systemctl status keepalived
● keepalived.service - Keepalive Daemon (LVS and VRRP)
     Loaded: loaded (/lib/systemd/system/keepalived.service; enabled; vendor preset: enabled)
     Active: active (running) 
   Main PID: 798 (keepalived)
      Tasks: 2 (limit: 1060)
     Memory: 5.1M
        CPU: 149ms
     CGroup: /system.slice/keepalived.service
             ├─798 /usr/sbin/keepalived --dont-fork
             └─803 /usr/sbin/keepalived --dont-fork
```

## Различия конфигураций серверов Master и Backup

Конфигурации серверов Master и Backup в Keepalived имеют несколько ключевых различий, которые определяют, какой из серверов будет основным, а какой — резервным. Основные различия касаются параметров.

### Параметр state

- Master: в конфигурации основного сервера этот параметр установлен как MASTER. Это означает, что сервер будет пытаться взять на себя управление VIP при запуске.
- Backup: в конфигурации резервного сервера параметр установлен как BACKUP, что указывает, что сервер будет ждать, пока основной сервер выйдет из строя, прежде чем взять на себя VIP.

### Параметр priority

- Master: приоритет на основном сервере выше (например, 101), что позволяет ему выигрывать выбор в пользу MASTER-состояния и управлять VIP.
- Backup: на резервном сервере приоритет ниже (например, 100). Это означает, что он станет MASTER только если основной сервер станет недоступным.

### Идентификатор роутера (router\_id):

- Master: идентификатор роутера на Master-сервере может быть указан как MASTER, чтобы подчеркнуть его роль.
- Backup: на Backup-сервере этот идентификатор может быть указан как BACKUP.

Это помогает различать конфигурации и легко идентифицировать роли серверов.

## Проверка конфигурации

Для начала проверим доступность адреса с помощью ICMP-запросов:

```bash
root@test:~# ping 192.168.10.22
PING 192.168.10.22 (192.168.10.22) 56(84) bytes of data.
64 bytes from 192.168.10.22: icmp_seq=1 ttl=64 time=1.48 ms
64 bytes from 192.168.10.22: icmp_seq=2 ttl=64 time=0.274 ms
64 bytes from 192.168.10.22: icmp_seq=3 ttl=64 time=0.263 ms
```

Подключимся по ssh, чтобы точно убедиться, что подключение будет выполняться к виртуальной машине Master.

```bash
ssh root@192.168.10.22
Welcome to Ubuntu 22.04.4 LTS (GNU/Linux 5.15.0-119-generic x86_64)
root@master:~#
```

Для проверки корректности работы keepalived [отключим ВМ](https://docs.selectel.ru/cloud/servers/manage/manage-server/#turn-off-server) Master в панели управления и посмотрим, переключится ли адрес 192.168.10.22 на ВМ Backup.

```bash
root@test:~# ping 192.168.10.22
PING 192.168.10.22 (192.168.10.22) 56(84) bytes of data.
64 bytes from 192.168.10.22: icmp_seq=1 ttl=64 time=0.768 ms
64 bytes from 192.168.10.22: icmp_seq=2 ttl=64 time=0.233 ms
64 bytes from 192.168.10.22: icmp_seq=3 ttl=64 time=0.302 ms
64 bytes from 192.168.10.22: icmp_seq=4 ttl=64 time=0.277 ms
```

При подключении через ssh видим приглашение на сервере Backup:

```bash
root@test:~# ssh root@192.168.10.22
root@backup:~#
```

На сетевом интерфейсе eth0 появился адрес 192.168.20.22, а в логах демона keepalived запись о том, что ВМ является мастером:

```bash
root@backup:~# ip a
1: lo:  mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0:  mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether fa:16:3e:72:9e:05 brd ff:ff:ff:ff:ff:ff
    altname enp0s3
    altname ens3
    inet 192.168.10.20/24 brd 192.168.10.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet 192.168.10.22/32 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::f816:3eff:fe72:9e05/64 scope link 
       valid_lft forever preferred_lft forever

root@backup:~# systemctl status keepalived
● keepalived.service - Keepalive Daemon (LVS and VRRP)
     Loaded: loaded (/lib/systemd/system/keepalived.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2024-08-29 07:57:18 UTC; 6h ago
   Main PID: 1036 (keepalived)
      Tasks: 2 (limit: 1060)
     Memory: 1.9M
        CPU: 1.436s
     CGroup: /system.slice/keepalived.service
             ├─1036 /usr/sbin/keepalived --dont-fork
             └─1037 /usr/sbin/keepalived --dont-fork

Aug 29 07:57:18 backup Keepalived[1036]: Starting VRRP child process, pid=1037
Aug 29 07:57:18 backup systemd[1]: keepalived.service: Got notification message from PID 1037, but reception only permitted for main PID 1036
Aug 29 07:57:18 backup Keepalived_vrrp[1037]: (/etc/keepalived/keepalived.conf: Line 13) Truncating auth_pass to 8 characters
Aug 29 07:57:18 backup Keepalived[1036]: Startup complete
Aug 29 07:57:18 backup systemd[1]: Started Keepalive Daemon (LVS and VRRP).
Aug 29 07:58:30 backup Keepalived_vrrp[1037]: (VI_1) Entering BACKUP STATE
Aug 29 14:17:35 backup Keepalived_vrrp[1037]: (VI_1) Entering MASTER STATE
```

## Настройка доступа во внешнюю сеть

Если необходим доступ к серверам Master и Backup извне, к VIP адресу можно [подключить публичный адрес](https://docs.selectel.ru/cloud/networks/public-ip-addresses/#create-public-ip).

В панели управления добавим новый публичный адрес и привяжем его к порту. Для этого перейдем в карточку приватной сети 192.168.10.0/24 на вкладку Порты, добавим новый порт с адресацией 192.168.10.22 и подключим публичный адрес 87.228.8.202.

![](https://6ef4e6a1-9d49-47ac-bfed-170f67a815cf.selcdn.net/blog/wp-content/uploads/2024/10/unnamed-1.png)

Перезапустим службу Keepalived:

```bash
systemctl restart keepalived
```

Проверим доступность публичного адреса:

```bash
root@test:~# ping 87.228.8.202

PING 87.228.8.202 (87.228.8.202) 56(84) bytes of data.

64 bytes from 87.228.8.202: icmp_seq=1 ttl=63 time=0.520 ms

64 bytes from 87.228.8.202: icmp_seq=2 ttl=63 time=0.322 ms

64 bytes from 87.228.8.202: icmp_seq=3 ttl=63 time=0.322 ms
```

При подключении через ssh также видим, что keepalived отрабатывает корректно и подключения по умолчанию попадают на сервер Master, а при его недоступности — на Backup.

## Заключение

В этой статье мы рассмотрели настройку Keepalived на двух серверах с использованием одного виртуального IP-адреса (VIP) для обеспечения высокой доступности. Мы использовали адреса из приватной подсети и публичный IP, но вы также можете применять адреса из публичных подсетей.

Keepalived позволяет автоматически переключать VIP с основного сервера на резервный в случае сбоя, обеспечивая непрерывность работы сервиса. Это решение минимизирует простои и повышает надежность вашей инфраструктуры.