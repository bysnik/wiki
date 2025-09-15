---
title: "Сага о драйверах — ALT Linux Wiki"
source: "https://www.altlinux.org/%D0%A1%D0%B0%D0%B3%D0%B0_%D0%BE_%D0%B4%D1%80%D0%B0%D0%B9%D0%B2%D0%B5%D1%80%D0%B0%D1%85"
author:
published:
created: 2025-09-15
description:
tags:
  - "clippings"
---
Статья пишется на основе знаменитой статьи ["Сага о драйверах"](https://docs.altlinux.org/ru-RU/archive/7.0.5/html-single/simply-linux/index.html#idm45151940002288)

Замечания и предложения по статье можно посылать в телеграмм канал [Saga\_o\_Driverah](https://t.me/Saga_o_Driverah)

  

## Про установку драйверов

Перед началом экспериментов с подбором драйвера, если он есть в репозитории, но не входит в основной пакет с ядром, следует ознакомиться со статьёй " [Обновление\_ядра#Доустановка\_модулей\_ядра](https://www.altlinux.org/%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5_%D1%8F%D0%B4%D1%80%D0%B0#%D0%94%D0%BE%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0_%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D0%B5%D0%B9_%D1%8F%D0%B4%D1%80%D0%B0 "Обновление ядра") ". Данная статья не касается драйверов для принтеров и сканерах, о них читайте в [Инструкции по поиску и применению драйверов для принтеров, сканеров и МФУ](https://www.altlinux.org/Drivers "Drivers") и смотрите поддержку своего принтера на [OpenPrinting](https://openprinting.github.io/printers/)

## У вас не работает "железо", что делать

Часто на форуме можно встретить вопрос такого типа:

```
"Я поставил ваш дистрибутив на свой ноутбук, и у меня не работает карточка WiFi".
```

Давайте на примере этого вопроса узнаем кое-что об оборудовании компьютера (дальше для краткости я его буду просто называть "железо") и о программах,которые с ним работают (для краткости - драйвера).

"Железо" может быть внутри компьютера, или внешним. Оно может подсоединяться к "сердцу" компьютера, его процессору по различным шинам (линиям связи). Для обеспечения этой связи обычно используется "материнская плата" (видел я и компьютеры, в которых она называлась просто "задняя стенка";-) ).

Существует достаточно много различных типов таких шин — USB, PCI, PS/2, SATA, RS-232 (к ней подключены порты COM и LPT) [^1] и т.п.

Если говорить про карточку Wi-Fi в ноутбуке, то она может находиться или на шине USB, или на шине PCI (я говорю о них как о типе шин, так как, например, USB бывают разными — как, впрочем, и PCI ).

```
Для обнаружения таких устройств существуют две команды: lspci и lsusb.
```

### 2

Вот я сейчас сижу за ноутбуком и даю команду:

```
$ lsusb
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 006 Device 002: ID 0bda:57b4 Realtek Semiconductor Corp. USB Camera
Bus 006 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 008 Device 002: ID 13d3:3501 IMC Networks 
Bus 008 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub
Bus 005 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 007 Device 004: ID 1ea7:0064 SHARKOON Technologies GmbH 2.4GHz Wireless rechargeable vertical mouse [More&Better]
Bus 007 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

Здесь $ - это не часть команды, а приглашение bash и в контексте статьи означает, что команду можно давать от обычного пользователя

  
Разберём одну строчку:

```
Bus 007 Device 004: ID 1ea7:0064 SHARKOON Technologies GmbH 2.4GHz Wireless rechargeable vertical mouse [More&Better]
```

- Bus 007 - устройство висит на седьмой шине USB
- Device 004:- оно на этой шине четвертое
- ID 1ea7:0064 - это его идентификатор, определяющая какая фирма произвела устройство (Id Vendor) и идентификатор самого устройства (Id Device)
- SHARKOON Technologies GmbH 2.4GHz Wireless rechargeable vertical mouse \[More&Better\] - имя устройства. За его идентификацию отвечает пакет usbids [\[1\]](http://packages.altlinux.org/en/Sisyphus/srpms/usbids)

.

Допустим нам надо посмотреть какой драйвер (в данном случае модуль ядра) "обслуживает" устройство мыши.

Для этого даём команду:

```
# lsusb  -tv
/:  Bus 08.Port 1: Dev 1, Class=root_hub, Driver=ohci-pci/5p, 12M
    ID 1d6b:0001 Linux Foundation 1.1 root hub
    |__ Port 5: Dev 2, If 0, Class=Wireless, Driver=btusb, 12M
        ID 13d3:3501 IMC Networks 
    |__ Port 5: Dev 2, If 1, Class=Wireless, Driver=btusb, 12M
        ID 13d3:3501 IMC Networks 
/:  Bus 07.Port 1: Dev 1, Class=root_hub, Driver=ohci-pci/5p, 12M
    ID 1d6b:0001 Linux Foundation 1.1 root hub
    |__ Port 1: Dev 4, If 0, Class=Human Interface Device, Driver=usbhid, 12M
        ID 1ea7:0064 SHARKOON Technologies GmbH 2.4GHz Wireless rechargeable vertical mouse [More&Better]
....
    ID 1d6b:0003 Linux Foundation 3.0 root hub
/:  Bus 01.Port 1: Dev 1, Class=root_hub, Driver=vhci_hcd/8p, 480M
    ID 1d6b:0002 Linux Foundation 2.0 root hub
```

Здесь # - это не часть команды, а приглашение bash пользователя root и в контексте статьи означает, что команду нужно давать от пользователя root.

lsusb -t наглядно показывает какое USB устройство подсоединено к конкретному порту USB, Но нам в данном случае важно, что команда показывает какой драйвер использует то, или иное устройство [^3]. В данном случае, мы видим, например, что "IMC Networks" использует модуль ядра (драйвер) btusb. И мы видим что это составное устройство. Зная устройство своего ноутбука, могу сразу сказать, что это комбинированная внутренняя карточка, одновременно работающая и с Wi-Fi и c bluetooth (сам в своё время покупал, заменив старую карточку).

### 4

Ну и для примера приведу как работать с командой lspci. На другом компьютере даю команду lspci:

```
00:00.0 Host bridge: Advanced Micro Devices, Inc. [AMD] Family 15h (Models 10h-1fh) Processor Root Complex
00:00.2 IOMMU: Advanced Micro Devices, Inc. [AMD] Family 15h (Models 10h-1fh) I/O Memory Management Unit
00:04.0 PCI bridge: Advanced Micro Devices, Inc. [AMD] Family 15h (Models 10h-1fh) Processor Root Port
...
00:18.4 Host bridge: Advanced Micro Devices, Inc. [AMD] Family 15h (Models 10h-1fh) Processor Function 4
00:18.5 Host bridge: Advanced Micro Devices, Inc. [AMD] Family 15h (Models 10h-1fh) Processor Function 5
01:00.0 VGA compatible controller: NVIDIA Corporation GF119 [GeForce GT 610] (rev a1)
01:00.1 Audio device: NVIDIA Corporation GF119 HDMI Audio Controller (rev a1)
03:00.0 Network controller: Realtek Semiconductor Co., Ltd. RTL8812AE 802.11ac PCIe Wireless Network Adapter (rev 01)
04:00.0 Ethernet controller: Qualcomm Atheros AR8161 Gigabit Ethernet (rev 10)
05:00.0 USB controller: Renesas Technology Corp. uPD720201 USB 3.0 Host Controller (rev 03)
```

Нас интересует это устройство:

```
03:00.0 Network controller: Realtek Semiconductor Co., Ltd. RTL8812AE 802.11ac PCIe Wireless Network Adapter (rev 01)
```
- 03:00.0 - это "порт" подключения устройства
- Network controller: Realtek Semiconductor Co., Ltd. RTL8812AE 802.11ac PCIe Wireless Network Adapter (rev 01) - его название. За определение названия отвечает пакет pciids [\[2\]](http://packages.altlinux.org/en/Sisyphus/srpms/pciids)

Для поиска драйверов важны идентификаторы вендора (Id Vendor) и устройства (Id Device), именно по ним ищет "операционка" какой драйвер (модуль ядра) нужно загрузить. И по ним легче искать в интернете какой драйвер нужно использовать. Для примера, посмотрим эти идентификаторы у карточки "Network controller: Realtek Semiconductor Co., Ltd. RTL8812AE 802.11ac PCIe Wireless Network Adapter (rev 01)". Мы видим из предыдущей команды, что она подключена к порту 03:00.0. Даём следующую команду:

```
$ lspci -n -s 03:00.0
03:00.0 0280: 10ec:8812 (rev 01)
```

Что мы видим:

- 03:00.0 - это "порт"подключения
- 0280: идентификатор контроллера
- 10ec:8812 - идентификатор вендора и идентификатор устройства

  
Иногда удобнее увидеть и имя устройства, тогда можно дать такую команду:

```
$ lspci -nn -s 03:00.0
03:00.0 Network controller [0280]: Realtek Semiconductor Co., Ltd. RTL8812AE 802.11ac PCIe Wireless Network Adapter [10ec:8812] (rev 01)
```

Для того, чтобы посмотреть какой модуль ядра (драйвер) "обслуживает" сейчас данное устройство надо дать команду:

```
# lspci -k -s 03:00.0 
03:00.0 Network controller: Realtek Semiconductor Co., Ltd. RTL8812AE 802.11ac PCIe Wireless Network Adapter (rev 01)
        Subsystem: Realtek Semiconductor Co., Ltd. RTL8812AE 802.11ac PCIe Wireless Network Adapter
        Kernel driver in use: rtl8821ae
```

Как мы видим используется драйвер rtl8821ae

Хуже бывает, если система не говорит о загруженном драйвере, т.е. отсутствует строчка

```
Kernel driver in use: rtl8821ae
```

В этом случае нам надо искать какой драйвер надо использовать.

## Немного теории

Под драйверами [^5] часто понимают все программы, обеспечивающие работу устройств.

В Линукс можно выделить несколько видов программ, работающих с устройствами.

Наибольшая часть из таких программ в Линукс входят в ядро. Это почти все драйвера, работающие с внутренними устройствами компьютера и многие устройства использующие шину USB. Большинство из таких драйверов входят в основную ветку разработки ядра и входят в пакет kernel-image. Кроме того, помимо модулей ядра, входящих в основную ветку ядра, существуют модули ядра по какой-либо причине в него не входящие. Обычно это или модули ядра с закрытыми частями от разработчиков "железа", или новые, ещё не отлаженные до конца, модули.

Поскольку Linux достаточно динамичная "среда" программирования [^6], то иногда появляется ситуация, что какое-то оборудование могут поддерживать несколько модулей ядра.

При наличии нескольких конкурирующих модулей для работы с конкретным устройством, возникает задача указать, какой модуль применять. Для этого применяются опции блокировки конкретного модуля. Для этого в каталоге /etc/modprobe.d для этого создаётся файл, обычно с именем blacklist\_суффикс.conf [^7] и с опцией blacklist имя\_модуля.

Например, в пакет kernel-modules-e1000e-std-def входит файл blacklist-e1000e.conf с содержимым:

```
blacklist e1000e
```

Модули ядра расположены в каталоге /lib/modules/ **имя\_релиза\_ядра**. [^8].

Помимо модулей ядра с оборудованием работают и модули других программ, которые в обыденной жизни тоже называют драйверами.

Так со сканерами работают модули программы sane, расположенные в каталоге (для архитектуры **x86\_64**) /usr/lib64/sane (входят в пакет libsane). Поддерживаемые сканеры проектом Sane можно посмотреть в [\[3\]](http://www.sane-project.org/sane-supported-devices.html)

А с принтерами работают модули cups, который имеет свои модули поддержки принтеров. Про поддержку принтеров проектом Cups можно посмотреть [\[4\]](https://openprinting.org/printers)

Также существуют отдельные модули, обеспечивающие работу графического режима работы ОС - модули работающие с xorg и c wayland.

## Где искать драйвер

- во-первых, стоит поставить пакет типа kernel-doc-6.12 / kernel-doc-std-def, но там обычно есть описания только модулей ядра, которые уже входят в ядро.
- во-вторых, на сайте [linux-hardware.org](https://linux-hardware.org/?view=search) [^9] есть возможность поискать по идентификаторам вендора и устройства какой драйвер нужен для вашего устройства.

Например:

```
Ищем карточку Realtek Semiconductor Co., Ltd. RTL8812AE 802.11ac PCIe Wireless Network Adapter по её идентификаторам вендора и устройства, и потом по ссылке находим какой драйвер ядра её поддерживает.
```
- в-третьих, искать в интернете по идентификаторам, лучше по идентификаторам (Id Vendor и Id Device), в том виде как выдают их команды lsusb и lspci.

Искать по коммерческому названию устройств не эффективно, так как в поиске получите или описание драйверов для Windows или рекламу купить это устройство.

## Немного о драйверах и прошивках

В силу того, между разработчиками оборудования существует конкуренция, его разработчики не заинтересованы подробно делиться подобным кодом их работы. Особенно новыми разработками. Поэтому довольно часто создаются закрытые прошивки, которые загружаются драйвером в ОЗУ компьютера или во внутреннюю память самого устройства. Ещё одна из причин использовать прошивки - их применение уменьшает стоимость аппаратной части устройства.

Этим "грешат" как некоторые внутренние устройства, например Ethernet и Wi-Fi карты, так и некоторые принтеры и сканеры. Бывают ситуации, что драйвер есть, а прошивки ему не хватает. [^10]

Например модуль ядра для Wi-Fi Broadcom, входящий на момент написания статьи в основное дерево, требует отдельной прошивки, но условия её распространения не позволяют нет только включать прошивку в дистрибутив, но даже класть в репозиторий (см [Wi-fi\_Broadcom](https://www.altlinux.org/Wi-fi_Broadcom "Wi-fi Broadcom")). Недавно появился модуль bcmwl, устраняющий эту проблему, но он ещё не вошёл в основное дерево ядра и пока распространяется отдельно.

Ещё одним из вариантом применения прошивок является ситуация, когда создаётся модуль ядра, который умеет работать с импортируемой частью драйвера от другой ОС. Ярким примером такого модуля является история модуля ядра [ndiswrapper](https://ru.wikipedia.org/wiki/NDISwrapper).[^11]

## Схема работы ядра с оборудованием

Упрощённо работу ядра с оборудованием можно представить так:

- после загрузки ядра, ядро обнаруживает устройства, которые или находятся внутри компьютера, или присоединены к его внутренним или внешним шинам и распознаёт их по их идентификаторам.
- если модуль ядра не загружен к текущему моменту в ОЗУ (некоторые модули ядра могут входить в основную часть ядра и загружаться как единое целое с ним), то условно "диспетчер" (далее без кавычек) модулей ядра ищет по информации находящейся в модулях ядра, необходимый модуль.
- после нахождения модуля ядра, диспетчер проверяет, есть ли этот модуль в "черном списке" (blacklist) на загрузку, и если нет, то загружает этот модуль ядра
- в момент загрузки модуля диспетчер модулей ядра ищет в /etc/modprobe.d/ информацию о том, с какими параметрами загружать модуль.
- в этот момент, при необходимости, загружается прошивка, нужная для работы модуля.
- в виртуальной файловой системе /sys создаётся информация об устройстве и загруженном модуле ядра для того, чтобы внешние программы могли получить информацию об устройстве и модуле
- запускается udev, который считывает свои правила (/lib/udev/rules.d/\*.rules) и в соответствии с ними, создаёт (при необходимости) в файловой системе "устройства" /dev (иногда их называют "нодами устройств"), которые являются одним из каналов общения между программами и устройствами. Ude v может использовать программные средства, которые обеспечивают дальнейшую работу с устройством. Например, usbmodeswitch меняет "заводские" идентификаторы вендора и устройства модема на идентификаторы, аналогичных модемов, поддерживаемых ядром.

В принципе, в большинстве случаев этого достаточно для начала работы с устройствами.

Раньше ноды устройств создавались статически. Некоторые ноды и сейчас создаются статически (и их может создать грамотный администратор) и лежат в каталоге /dev уже в момент загрузки устройств. Но теория и практика применения Линукс развивалась и теперь большинство необходимых нод создаются и удаляются динамически.

## Про команды работы с модулями ядра

### Команда lsmod

- Для того, чтобы понять почему не работает какое-либо устройство, стоит посмотреть какие модули ядра загрузились в ОЗУ. Это можно сделать с помощью команды lsmod.

```
# lsmod
Module                  Size  Used by
btrfs                1810432  0
blake2b_generic        20480  0
xor                    24576  1 btrfs
...

ehci_pci               16384  0
serio_raw              16384  0
ehci_hcd               65536  1 ehci_pci
scsi_common            16384  6 scsi_mod,usb_storage,pktcdvd,uas,libata,sr_mod
```

Расшифруем что выдаёт команда lsmod:

- первый столбец - имя модуля
- второй столбец - занимаемое им место
- как (в связке с чем) он используется

### Команда modinfo

- Для того, чтобы посмотреть информацию о модуле ядра используется команда modinfo

Например:

```
# modinfo -m acpi-cpufreq.ko
или
# modinfo /lib/modules/$(uname -r)/kernel/drivers/cpufreq/acpi-cpufreq.ko 

filename:       /lib/modules/6.1.10-un-def-alt1/kernel/drivers/cpufreq/acpi-cpufreq.ko
alias:          acpi
license:        GPL
description:    ACPI Processor P-States Driver
author:         Paul Diefenbaugh, Dominik Brodowski
srcversion:     AEED556A80507DE37550964
alias:          cpu:type:x86,ven*fam*mod*:feature:*00E8*
alias:          cpu:type:x86,ven*fam*mod*:feature:*0016*
alias:          acpi*:ACPI0007:*
alias:          acpi*:LNXCPU:*
depends:        
retpoline:      Y
intree:         Y
name:           acpi_cpufreq
vermagic:       6.1.10-un-def-alt1 SMP preempt mod_unload modversions 
sig_id:         PKCS#7
signer:         Build time autogenerated kernel key
sig_key:        1D:99:23:2B:7B:A2:C2:14:28:CF:48:1E:DE:E9:2A:57:D4:83:60:47
sig_hashalgo:   sha512
signature:      E7:6F:7F:4F:DA:FC:E1:69:42:2B:28:82:BA:B5:44:90:68:32:E5:F6:
                7A:03:60:DE:E1:30:DB:8E:37:38:39:4A:3F:12:1E:BC:62:D8:70:A3:
                75:CF:4F:2F:9A:BD:09:F3:61:AE:FA:BF:F9:E0:7C:D7:45:21:95:E3:
 ...
                0F:43:AD:84:48:B2:A0:70:52:E0:70:54:BA:6A:5C:0E:41:64:D3:95:
                BD:BE:E8:EC:FC:79:C5:40:37:D6:63:0D
parm:           acpi_pstate_strict:value 0 or non-zero. non-zero -> strict ACPI checks are performed during frequency changes. (uint)
```

#### Как определить какие устройства поддерживает данный модуль ядра (на примере nouveau):

```
# modinfo -F alias -m nouveau
pci:v000012D2d*sv*sd*bc03sc*i*
pci:v000010DEd*sv*sd*bc03sc*i*
```

##### Расшифровка алиаса modinfo:

```
pci - устройства на шине pci
v000012D2 - поддерживаемый вендор
d* - поддерживаются все идентификаторы устройства данного вендора (звездочка - означает - все)
```

- Поддерживаются все ID от Вендоров:

```
12d2:* 
10dE:*
```

##### Ещё пример расшифровки алиаса:

```
pci:v00008086d00005A84sv*sd*bc03sc*i*

8086 - Вендор (intel)
5a84 - идентификатор устройства
sv*, sd*: Версии поставщика подсистемы и версия подсистемного устройства (все)
bc: Базовый класс. Он определяет, что это за устройство - IDE interface, Ethernet controller, USB Controller, ... и т.д.
В частности - bc03 - Означает Display controller. 

sc*:  Подкласс к базовому классу (все). 
i*:   интерфейс                  (все)
```

#### Параметры управления модулем ядра

[Параметры модулей ядра](https://it.wikireading.ru/1966)

Команда modinfo -F parm выдаёт параметры управлением модулем ядра, например:

```
# modinfo -F parm -m nouveau
vram_pushbuf:Create DMA push buffers in VRAM (int)
kms_vram_pushbuf:Place EVO/NVD push buffers in VRAM (default: auto) (int)
tv_norm:Default TV norm.
                Supported: PAL, PAL-M, PAL-N, PAL-Nc, NTSC-M, NTSC-J,
                        hd480i, hd480p, hd576i, hd576p, hd720p, hd1080i.
                Default: PAL
                *NOTE* Ignored for cards with external TV encoders. (charp)
mst:Enable DisplayPort multi-stream (default: enabled) (int)
tv_disable:Disable TV-out detection (int)
ignorelid:Ignore ACPI lid status (int)
duallink:Allow dual-link TMDS (default: enabled) (int)
hdmimhz:Force a maximum HDMI pixel clock (in MHz) (int)
config:option string to pass to driver core (charp)
debug:debug string to pass to driver core (charp)
noaccel:disable kernel/abi16 acceleration (int)
modeset:enable driver (default: auto, 0 = disabled, 1 = enabled, 2 = headless) (int)
atomic:Expose atomic ioctl (default: disabled) (int)
runpm:disable (0), force enable (1), optimus only default (-1) (int)
NVreg_RegistryDwords:A semicolon-separated list of key=integer pairs of GSP-RM registry keys (charp)
```

Перевод на русский:

```
vram_pushbuf:Создать буферы push DMA в VRAM (целое число)
kms_vram_pushbuf:Поместить буферы push EVO/NVD в VRAM (по умолчанию: auto) (целое число)
tv_norm: По умолчанию tv_norm
                 Поддерживается: PAL, PAL-M, PAL-N, PAL-Nc, NTSC-M, NTSC-J, hd480i, hd480p, hd576i, hd576p, hd720p, hd1080i.
По умолчанию: PAL
                 *ПРИМЕЧАНИЕ* Игнорируется для карт с внешними ТВ-кодерами (указатель на строку)
mst:Разрешить многопоточность DisplayPort (по умолчанию: включено) (целое число)
tv_disable: Запретить обнаружение выхода на ТВ (целое число)
ignorelid:Игнорировать статус ACPI  (целое число)
duallink:Разрешить двухканальный TMDS (по умолчанию: включено) (целое число)
hdmimhz:Принудительно установить максимальную тактовую частоту пикселей HDMI (в МГц) (целое число)
config:Строка параметров для передачи ядру драйвера (указатель на строку)
debug:Строка отладки для передачи ядру драйвера (указатель на строку)
noaccel:Отключить ускорение ядра/abi16 (целое число)
modeset:Включить драйвер (по умолчанию: авто, 0 = отключено, 1 = включено, 2 = безголовый) (целое число)
atomic:Открыть атомарный ioctl (по умолчанию: отключено) (целое число)
runpm:Отключить (0), принудительно включить (1), только optimus по умолчанию (-1) (целое)
NVreg_RegistryDwords: список пар ключ=целое число ключей реестра GSP-RM, разделенных точкой с запятой (указатель на строку)
```

### Команда modprobe

- Для того, чтобы загрузить из командной строки какой либо модуль ядра в ОЗУ можно использовать команду modprobe имя\_модуля. Команда modprobe имя\_модуля умеет загружать модули из каталога с текущим ядром, и упомянутая в файле /lib/modules/$(uname -r)/modules.dep.

Пример:

```
# modprobe xor
#
```

Если в ответ на команду не было сообщений, то существенных ошибок при загрузке ядра не было (хотя из предыдущего сообщения видно, что модуль уже загружен, надо будет потом проверить всегда-ли так с командой modprobe).

- Проведём маленький эксперимент

Перед ним модуль nvidia загружен

```
# lsmod | grep -e ^nvidia" "
nvidia              15884288  1199 nvidia_modeset
```

А модуль nouveau нет

```
# lsmod | grep -e ^nouveau" "
#
```

Создадим файл /etc/modprobe.d/my\_blacklist.conf с таким содержанием:

```
blacklist nouveau
```

А теперь по очереди попробуем загрузить эти модули:

```
# modprobe nvidia
# 
# modprobe nouveau
#
# modprobe nouveau_bad
modprobe: FATAL: Module nouveau_bad not found in directory /lib/modules/6.1.11-un-def-alt1
#
# lsmod | grep -e ^nouveau" "
nouveau              2433024  0
lsmod | grep -e ^nvidia" "
nvidia              15884288  1193 nvidia_modeset
#
```

Как мы видим

- модуль nouveau не смотря на blacklist загрузился, но не используется (ноль в том месте, где указывается с каким модулем связан) [^12]
- не было никаких сообщений о том, что модуль nvidia уже загружен
- было сообщение, что модуля nouveau\_bad не существует [^13]

Что-бы не ломать работу систему в будушем, я удаляю файл /etc/modprobe.d/my\_blacklist.conf, если кто повторял мой эксперимент, советую сделать это и вам;-)

### Команда insmod

- Второй способ загрузки модуля ядра, это выполнение команды insmod, она позволяет загружать модуль из заданного каталога, например:

```
# insmod /lib/modules/$(uname -r)/kernel/drivers/cpufreq/acpi-cpufreq.ko 
# insmod /lib/modules/$(uname -r)/kernel/drivers/cpufreq/acpi-cpufreq.ko 
insmod: ERROR: could not insert module /lib/modules/6.1.10-un-def-alt1/kernel/drivers/cpufreq/acpi-cpufreq.ko: File exists
```

Здесь я преднамеренно попытался загрузить командой insmod один и тот-же модуль. В первый раз всё прошло без ошибок, а второй раз выдало информацию об ошибке (модуль уже загружен).

### Команда rmmod

- Для того, чтобы выгрузить модуль ядра rmmod имя\_модуля.

Важно заметить, что работающий с устройством модуль нельзя выгрузить.

Пример 1:

```
# rmmod  acpi-cpufreq
#
```

Модуль был выгружен из ОЗУ без ошибок, что в принципе означает, что модуль в данный момент был не задействован.

Пример 2:

```
# rmmod nvidia
rmmod: ERROR: Module nvidia is in use by: nvidia_modeset
```

Попытка выгрузки модуля не удалась, так-как он задействован в работе с железом.

### 14

- Для того, чтобы посмотреть события, произошедшие с ядром, можно использовать команду dmesg

```
# dmesg | tail -n2
[28945.743841] nvidia_modeset: disagrees about version of symbol module_layout
[29157.059850] acpi_cpufreq: overriding BIOS provided _PSD data
```

Мы видим последние два сообщения ядра.

Реальный пример использования dmesg с [форума ALT Linux](https://forum.altlinux.org/index.php?topic=39188.msg313469#msg313469)

```
# dmesg | grep -A6 -B2 firmware

[    0.000000]   HighMem zone: 296802 pages, LIFO batch:31
[    0.000000] Using APIC driver default
[    0.000000] SFI: Simple Firmware Interface v0.81 http://simplefirmware.org
[    0.000000] Local APIC disabled by BIOS -- you can enable it with "lapic"
[    0.000000] APIC: disable apic facility
[    0.000000] APIC: switched to apic NOOP
[    0.000000] smpboot: Allowing 1 CPUs, 0 hotplug CPUs
[    0.000000] PM: Registered nosave memory: [mem 0x00000000-0x00000fff]
[    0.000000] PM: Registered nosave memory: [mem 0x0009f000-0x0009ffff]
```

### Команда udevadm

- Для анализа событий происходящих в момент подсоединения, или отсоединения устройства пригодятся команды мониторинга udevadm

Пример:

```
# udevadm monitor
monitor will print the received events for:
UDEV - the event which udev sends out after rule processing
KERNEL - the kernel uevent

KERNEL[30557.800595] add      /devices/pci0000:00/0000:00:10.0/usb5/5-2 (usb)
KERNEL[30557.802173] add      /devices/pci0000:00/0000:00:10.0/usb5/5-2/5-2:1.0 (usb)
KERNEL[30557.806378] add      /devices/virtual/workqueue/scsi_tmf_9 (workqueue)
KERNEL[30557.806434] add      /devices/pci0000:00/0000:00:10.0/usb5/5-2/5-2:1.0/host9 (scsi)
KERNEL[30557.806470] add      /devices/pci0000:00/0000:00:10.0/usb5/5-2/5-2:1.0/host9/scsi_host/host9 (scsi_host)
...

UDEV  [30558.029462] add      /devices/pci0000:00/0000:00:10.0/usb5/5-2/5-2:1.0/host9/target9:0:0/9:0:0:0/block/sdi (block)
UDEV  [30558.092521] add      /devices/pci0000:00/0000:00:10.0/usb5/5-2/5-2:1.0/host9/target9:0:0/9:0:0:0/block/sdi/sdi2 (block)
UDEV  [30558.133565] add      /devices/pci0000:00/0000:00:10.0/usb5/5-2/5-2:1.0/host9/target9:0:0/9:0:0:0/block/sdi/sdi1 (block)
UDEV  [30558.135974] bind     /devices/pci0000:00/0000:00:10.0/usb5/5-2/5-2:1.0/host9/target9:0:0/9:0:0:0 (scsi)
```

Вот так показывает udevadm события, связанные с вставлением внешнего диска.

- Здесь сообщения, начинающиеся со слова KERNEL - это сообщения ядра, сообщения начинающиеся со слова UDEV - сообщения UDEV.
- \[30558.133565\] - это время события
- add - это выполняемая операция
- /devices/pci0000:00/0000:00:10.0/usb5/5-2/5-2:1.0 (usb) - это адрес устройства внутри файловой системы /sys

## Немного о драйверах видеокарт

Для работы видео карт в графическом режиме помимо драйвера ядра, требуются модули графического сервера (например xorg).

Так для работы карт [nvidia](https://www.altlinux.org/Nvidia "Nvidia") требуется модуль ядра и соответствующий ему модуль xorg.

Для проприетарного модуля ядра nvidia, входящего в пакет kernel-modules-nvidia, требуется графический модуль xorg, входящий в пакет nvidia\_glx\_версия\_модуля.

А для свободного драйвера nouveau (пакет kernel-modules-drm-nouvea..), также умеющего работать с картами nvidia требуется графический модуль nouveau (пакеты xorg-drv-nouveau и xorg-dri-nouveau).

Это касается не только карт Nvidia, но и многих других видеокарт. В последнее время появилась тенденция большую часть поддержки стандартных и наиболее часто встречающихся карт переносить внутрь ядра, оставляя только несколько универсальных графических модулей xorg (см [Kernel mode setting](https://wiki.archlinux.org/title/Kernel_mode_setting_\(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9\))).

## Примечания

## Ссылки

[Проба\_оборудования](https://www.altlinux.org/%D0%9F%D1%80%D0%BE%D0%B1%D0%B0_%D0%BE%D0%B1%D0%BE%D1%80%D1%83%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F "Проба оборудования")

[^1]: строго говоря LPT и Com-порты не шины, например COM-порты это выход шины RS32

[^2]: lsusb — утилита для вывода информации о шинах USB в системе и подключенных к ним устройствах.

[^3]: Существуют и другие способы выяснения с каким модулем ядра работает данное устройство часть из них описана, например [здесь](https://unix.stackexchange.com/questions/60078/find-out-which-modules-are-associated-with-a-usb-device)

[^4]: Утилита lspci служит для вывода информации о всех имеющихся в системе шинах PCI и всех подключенных к ним устройствах.

[^5]: в жаргоне их часто просто называют "дровами"

[^6]: Конечно это ОС, но и благодаря лицензии GPL, это очень удобная среда в которой программисты могут делиться своими знаниями и наработками. Впрочем это вопрос отдельной статьи

[^7]: Обязательная часть здесь только расширение conf, имя файла выбирается с учетом того, что-бы было легче что находится внутри

[^8]: Имя релиза загруженного ядра выдаёт команда uname -r

[^9]: Проект по анонимному сбору сведений об оборудовании компьютеров под управлением Linux по всему миру и помощи людям в совместном устранении проблем, связанных с оборудованием, проверке совместимости с Linux и поиске драйверов. Смотри так-же [о пробах оборудования](https://www.altlinux.org/%D0%9F%D1%80%D0%BE%D0%B1%D0%B0_%D0%BE%D0%B1%D0%BE%D1%80%D1%83%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F "Проба оборудования")

[^10]: Для анализа таких ситуаций помогает анализ выдачи команды dmesg.

[^11]: К сожалению на момент написания статьи он не представлен в текущем ядре

[^12]: Я сам удивился, когда увидел, что он загрузился;-). Если я где-то ошибся дайте знать;-) Меня самого смущает этот результат

[^13]: Естественно, ведь я его только сейчас выдумал

[^14]: В системах с systemd можно так-же использовать команду journalctl -bk (см [Журналирование в systemd](https://www.altlinux.org/Journald "Journald"))