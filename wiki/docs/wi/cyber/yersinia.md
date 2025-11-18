# yersinia

## Назначение

Пакет 'yersinia' не найден в ALT Linux p11 (x86_64/i586/noarch).

ArchWiki: [страница не найдена] (https://wiki.archlinux.org/title/Yersinia)

## Установка

### ALT Linux
```bash
sudo apt-get update && sudo apt-get install yersinia
```

### Kali Linux
```bash
sudo apt install yersinia
```

## Ссылки

- [ALT Linux (srpms)](https://packages.altlinux.org/ru/p11/srpms/yersinia/)
- [Kali Tools](https://www.kali.org/tools/yersinia/)
- [ArchWiki](https://wiki.archlinux.org/title/Yersinia)


---
title: "Атаки на сетевое оборудование с Kali Linux"
source: "https://habr.com/ru/articles/326968/"
author:
  - "[[Лука Сафонов]]"
published: 2017-04-20
created: 2025-11-18
description: "В данной статье мы рассмотрим актуальные атаки на сетевое оборудование и инструменты, доступные в популярном дистрибутиве Kali Linux для их проведения. Атакуем CISCO маршрутизатор В состав Kali..."
tags:
  - "clippings"
---
![image](https://habrastorage.org/r/w1560/getpro/habr/post_images/a30/c2d/676/a30c2d676b07070487c16f388a8cb659.png)  

  
В данной статье мы рассмотрим актуальные атаки на сетевое оборудование и инструменты, доступные в популярном дистрибутиве Kali Linux для их проведения.

  

## Атакуем CISCO маршрутизатор

  

В состав Kali Linux входит несколько инструментов, которые можно использовать для аудита оборудования CISCO. Список можно посмотреть в разделе Vulnerability Analysis — Cisco Tools:

  
![](https://habrastorage.org/r/w1560/files/8f3/24f/967/8f324f9674ef4ac6a0a560989e679006.png)  

**Cisco Audit Tool или CAT**  
Используется для брутфорса пароля при выключенном режиме aaa-mode, брутфорса SNMP community-строк и проверки на уязвимость IOS History bug ([https://tools.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-19981014-ios-hist](https://tools.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-19981014-ios-hist))

  

Пример использования:

  
```
CAT -h 192.168.1.209 -w /root/cisco/wordlist/snmpcommunities -a /root/cisco/wordlist/password_list -i
```
  
![](https://habrastorage.org/r/w1560/files/174/0b4/d17/1740b4d172bc4edb8f8c8eab783fd596.png)  

**Cisco Global Exploiter или CGE**  
Используется для экслпутации известных уязвимостей. Нам доступно 14 атак:

  
![](https://habrastorage.org/r/w1560/files/794/a2d/5f1/794a2d5f1c0b4f1e8e7080bbbc464eb7.png)  

Пример использования:

  
```
cge.pl 192.168.1.201 3
```
  
![](https://habrastorage.org/r/w1560/files/429/4ac/074/4294ac0749854e04abb0a677357c11c8.png)  

  
**cisco-ocs**  
Инструмент для автоматизации поиска устройств со стандартными значениями пароля для telnet и режима enable, который может искать устройства в диапазоне адресов. Может использоваться при сканировании больших сетей.

  

Пример использования:

  
```
cisco-ocs 192.168.1.207 192.168.1.209
```
  
![](https://habrastorage.org/r/w1560/files/a02/13d/b00/a0213db009b04cf0ae5f8dd54862adca.png)  

  
**cisco-torch**  
Многофункциональный сканер уязвимостей для оборудования Cisco. Может сканировать несколько IP адресов за раз, подгружая из текстового файла. Запускать cisco-torch в Kali Linux следует, находясь в рабочей директории /usr/share/cisco-torch.

  

Пример использования:

  

Поиск доступных интерфейсов и протоколов и определение типа оборудования.

  
```
cisco-torch -A 192.168.1.201
```
  
![](https://habrastorage.org/r/w1560/files/107/de9/053/107de905343949da846d69666c29a790.png)  

Может использоваться для брутфорса паролей и SNMP community-строк.

  
```
cisco-torch -s -b 192.168.1.209
```
  

Для использования своего словаря, его нужно поместить в /usr/share/cisco-torch вместо файла password.txt

  
![](https://habrastorage.org/r/w1560/files/4ff/fab/e5f/4fffabe5fed249ae923db4cfb0e943b1.png)  

  
**copy-router-config.pl и merge-copy-config.pl**  
Инструменты для загрузки текущей конфигурации маршрутизатора cisco при известной community-строке на свой tftp-сервер. В дальнейшем можно модифицировать конфигурацию и снова загрузить на сервер.

  

Пример использования:

  
```
copy-router-config.pl 192.168.1.201 192.168.1.3 private
```
  

Для автоматизации подобной атаки, где нас интересует только загрузка конфигурации на свой TFTP-сервер лучше воспользоваться модулем Metasploit auxiliary/scanner/snmp/cisco\_config\_tftp  
Или NSE скриптом [nmap snmp-ios-config](https://nmap.org/nsedoc/scripts/snmp-ios-config.html).

  

## Атакуем L2 протоколы

  
![](https://habrastorage.org/r/w1560/files/090/bef/b73/090befb733234bdd86c13ed93af1e00f.png)  

Yersinia — многофункциональный инструмент для атак на протоколы L2 (Data Link) уровня OSI.  
Умеет проводить атаки на DHCP, STP, CDP, DTP, HSRP и другие.

  

Работать с Yersinia можно в нескольких режимах:

  

Запуск в режиме сервера и управление при помощи команд, похожих на cisco cli.

  
```
yersinia -D
telnet 127.0.0.1 12000
```
  

Логин и пароль root/root  
Пароль для перехода в режим enable – tomac

  
1. Запуск в интерактивном режиме
  
```
yersinia -I
```
  
![](https://habrastorage.org/r/w1560/files/34e/3a9/d93/34e3a9d93f244850bdec19ea9e7010a5.png)  

Опции управления доступны по нажатии на клавишу h:

  
![](https://habrastorage.org/r/w1560/files/59c/db8/ab1/59cdb8ab18c24783a39481a5accb380e.png)  
1. Графический интерфейс GTK
  
![](https://habrastorage.org/r/w1560/files/88d/404/8d8/88d4048d89624e069d156daaef32512d.png)  

Графический интерфейс может работать нестабильно. В режиме сервера не поддерживает некоторые виды атак, вроде DHCP Rogue server. Так что, основным режимом запуска можно считать интерактивный режим.

  

## Атакуем DHCP сервер

  

В качестве примера продемонстрируем атаку на переполнение пула IP-адресов DHCP сервера. Данная атака может быть использована для выведения из строя корпоративного DHCP сервера и последующая его замещение поддельным, конфигудрация которого настроена таким образом, что весь трафик новых клиентов будет проходить через хост атакующего. Таким образом будет проведена одна из атак MitM.

  

На стороне атакующего можно выполнить скрипт nmap для обнаружения DHCP сервера в локальной сети.

  
```
nmap -n --script=broadcast-dhcp-discover
```
  
![](https://habrastorage.org/r/w1560/files/f0a/519/5df/f0a5195dffa34aa6966f13168193ddb6.png)  

Теперь запускаем Yersinia в интерактивном режиме и переходим в режим DHCP выбрав его нажатием клавиши g.

  
![](https://habrastorage.org/r/w1560/files/429/e2e/430/429e2e4302484cbc97b2b959069f1031.png)  

Теперь в этом режиме будут видны все DHCP пакеты, полученные Yersinia.  
Проверим список выданных адресов DHCP сервера до атаки:

  
![](https://habrastorage.org/r/w1560/files/b3b/331/96e/b3b33196e09f4245999aab5a37063226.png)  

Yersinia показывает DHCP пакеты, выловленные из сети:

  
![](https://habrastorage.org/r/w1560/files/74b/9a0/f54/74b9a0f5468d4ecb9cf70825e29b7a4b.png)  

Если выбрать пакет и нажать сочетание клавиш Shift+L то можно затем при помощи атаки RAW пересылать этот пакет в сеть, или модифицировать его при помощи нажатия клавиши e – переход в режим редактирования пакета.

  

При нажатии на клавишу x получаем список доступных атак:

  
![](https://habrastorage.org/r/w1560/files/21b/02a/372/21b02a3721724d0e8593c536251885ab.png)  

Выбираем 1

  

Видим, что начинает отправлять огромное количество DHCP Discover запросов:

  
![](https://habrastorage.org/r/w1560/files/40e/fc2/809/40efc2809db246828488f3fd9bc2fea5.png)  

Через некоторое время можно остановить атаку нажатием на клавиши L и затем Enter:

  
![](https://habrastorage.org/r/w1560/files/c2e/9a5/1ab/c2e9a51ab406414289177f461e527f62.png)  

Nmap больше не показывает доступных DHCP серверов в сети. Коропоративный DHCP сервер выведен из строя.

  
![](https://habrastorage.org/r/w1560/files/976/339/727/97633972754d41c3a12476c29b0c4a51.png)  

Проверим таблицу выданных IP-адресов на роутере:

  
![](https://habrastorage.org/r/w1560/files/bbe/859/0fd/bbe8590fd73b4a2e8cd43d8dd6d71ad8.png)  

Далее вы можете запустить атаку Rogue DHCP в Yersinia, либо при помощи модуля Metasploit или любым другим способом, чтобы провести MitM атаку.

  
![](https://habrastorage.org/r/w1560/files/eef/fe1/f84/eeffe1f848ab4beab498c8bd7d421913.png)  

Атаку на истощение пула IP адресов DHCP сервера можно так же провести при помощи инструмента [DHCPig](https://github.com/kamorin/DHCPig). При помощи Yersinia можно проводить атаки и на другие популярные протоколы, такие как STP (Spanning Tree Protocol) и HSRP (Hot Standby Router Protocol), которые так же позволят вам прослушивать трафик в сети.

  

## Атака на переполнение CAM таблицы коммутатора.

  

Еще одна атака, которая переполняет CAM таблицу коммутатора, хранящую список MAC адресов, работающих на определенном порту. Некоторые коммутаторы при ее переполнении начинают работать как хабы, рассылая пакеты на все порты, тем самым создавая идеальные условия для проведения атак класса MitM.

  

В Kali Linux для проведения данной атаки присутствует инструмент macof

  

Пример использования:

  
```
macof -i eth0
```
  

Где eth0 – интерфейс, к которому подключен коммутатор для атаки.

  

## Защита

  

Для защиты от подобного рода атак производителями используются различные, обычно проприетарные, технологии. На коммутаторах Cisco следует активировать DHCP Snooping и PortSecutiy во избежание атак на протокол DHCP и CAM Overflow. Для защиты от атак на HSRP и прочие протоколы используются другие технологии. Всегда нужно помнить, что дорогостоящее сетевое оборудование после правильной настройки может существенно повысить безопасность сетевой инфраструктуры, в то же время недонастроенное или настроенное неправильно может само стать инструментом в руках злоумышленника и угрозой безопасности. Выявление уязвимостей сетевого оборудования при проведении [тестирования на проникновение](https://red-delta.ru/pentest/) и применение рекомендаций по результатам аудита помогает снизить риски взлома информационной системы злоумышленниками.

+35

Как устроен мир по ту сторону карты

Выбирайте курсы по отзывам

Road to Highload