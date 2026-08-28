
## Ну такое ховно

### 1. Установка заголовков ядра и инструментов сборки
```bash
apt-get update
apt-get dist-upgrade
apt-get install rpm-build kernel-headers-modules-6.18
```

https://repos.loongson.cn/loonggpu/repos/loongnix25/

https://github.com/suijingfeng/xf86-video-loongson - alternative driver

### 2. Сборка модуля ядра `loonggpu.ko`
```bash
git clone --branch aosc/v1.0.2-lnd25.1 https://github.com/AOSC-Tracking/loonggpu-kernel-dkms.git
cd loonggpu-kernel-dkms
make KSRC=/usr/src/linux-6.18.37-6.18-alt1.port.la64/
```

### 3. Установка модуля
```bash
cp loonggpu.ko /lib/modules/6.18.37-6.18-alt1.port.la64gp/kernel/drivers/gpu/drm/loongson/
depmod -a
modprobe loonggpu
```

### 4. Установка пользовательских пакетов (перепаковка .deb в .rpm)
Скачайте из репозитория Deepin или AOSC файлы:
- `libloong-gpucomp_*.deb` https://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/loong-gpucomp/  - у этой псины проблемы с libedit2, ска такая
- `loonggl_*.deb` https://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/loonggl/
- `xserver-xorg-video-loonggpu_*.deb` https://mirror.eu.ossplanet.net/deepin/beige/pool/main/x/xserver-xorg-video-loonggpu/
- `loonggpu-driver_*.deb` https://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/loonggpu-driver/
- `loonggpu-settings_*.deb` http://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/loonggpu-settings/
- `ldrm_*.deb` (содержит `libldrm.so.1`) https://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/ldrm/
- firmware-loongson-graphics_1.0.2+lnd25.1-0_loongarch64.deb https://packages.aosc.io/files/loongarch64/stable/firmware-loongson-graphics/2:1.0.2+lnd25.1
- https://pkg.loongnix.cn/loongnix/25/pool/main/libe/libedit/ - это и есть libedit2


https://github.com/loongson/Firmware/tree/main

Перепакуйте и установите с игнорированием зависимостей:
```bash
epm repack *.deb          # создаёт RPM-пакеты
rpm -Uvh --nodeps *.rpm   # установка всех RPM без проверки зависимостей
```

### 5. Создание симлинка для `libedit.so.2`
```bash
ln -sf /usr/lib/loongarch64-linux-gnu/libedit.so.2 /usr/lib64/libedit.so.2
ldconfig
```

### 6. Копирование Xorg-драйвера в системный каталог
```bash
cp /usr/lib/xorg/modules/drivers/loonggpu_drv.so /usr/lib64/X11/modules/drivers/
```

### 7. Копирование Mesa-драйвера в `/usr/lib64/dri/`
```bash
mkdir -p /usr/lib64/dri
cp /usr/lib/loongarch64-linux-gnu/dri/loonggpu_dri.so /usr/lib64/dri/
```

### 8. Настройка Xorg (конфиг)
Создайте `/etc/X11/xorg.conf.d/99-loonggpu.conf`:
```bash
cat > /etc/X11/xorg.conf.d/99-loonggpu.conf <<EOF
Section "Device"
    Identifier "LoongGPU"
    Driver "loonggpu"
EndSection
EOF
```

```bash
cat > /etc/environment  <<EOF
MESA_LOADER_DRIVER_OVERRIDE=loonggpu
EOF
```

### 9. Перезагрузка
```bash
reboot
```



[basealt@basealt ~]$ LD_LIBRARY_PATH=/usr/lib/loongarch64-linux-gnu:/usr/lib/loongarch64-linux-gnu/loonggpu LIBGL_DRIVERS_PATH=/usr/lib64/X11/modules/dri:/usr/lib/loongarch64-linux-gnu/dri:/usr/lib64/dri __GLX_VENDOR_LIBRARY_NAME=gsgpu glmark2

---

## ✅ Проверка результата

После перезагрузки войдите в X11-сессию и выполните:
```bash
ls -l /dev/dri/          # должны быть card0 и renderD128
cat /var/log/Xorg.0.log | grep -i loong   # должно быть загружено Module loonggpu
```

Если нужно проверить рендерер (покажет `llvmpipe`, но это ожидаемо при отсутствии полноценного Mesa-драйвера):
```bash
glxinfo | grep "OpenGL renderer"
```





















::: details
```
Это копия чата ChatGPT, которым поделились. Она не будет добавлена в память.

Пожаловаться на обсуждение
пн, 3 авг. в 12:49
проверь наличие какого то бемарка в репозитории альта архитектура loongson

Да, в репозитории ALT для архитектуры loongarch64 есть несколько бенчмарков.

Самый простой вариант — STREAM для проверки пропускной способности памяти:

uname -m
apt-get update
apt-get install stream-mem

stream_c

Пакет stream-mem-5.10-alt3 присутствует в стабильном репозитории p11_loongarch64. В него входят программы /usr/bin/stream_c и /usr/bin/stream_f; результаты выдаются по операциям Copy, Scale, Add и Triad в MB/s. Карточка пакета в ALT

Также доступны:

Пакет	Назначение	Версия в p11_loongarch64
stress-ng	нагрузка CPU, памяти, кеша и подсистем ядра	0.21.04-alt1
fio	производительность дисков и файловых систем	3.37-alt1
iperf3	пропускная способность сети	3.19.1-alt1

Источники: stress-ng, fio, iperf3.

Короткий тест процессора:

apt-get install stress-ng
stress-ng --cpu "$(nproc)" --timeout 60s --metrics-brief

Однако разработчики stress-ng прямо указывают, что это прежде всего нагрузочный тест, а не точный сравнительный бенчмарк.

В Sisyphus_loongarch64 дополнительно есть полноценный комплексный HPC Challenge Benchmark (hpcc), измеряющий CPU, память и сеть, но в стабильной ветке p11_loongarch64 его пока нет. Карточка hpcc

Важно: сначала проверьте uname -m. Эти пакеты относятся к современной архитектуре loongarch64. Если система покажет mips64el, это старое поколение Loongson и другой репозиторий.

[root@alt-work-loongson ~]# 
[root@alt-work-loongson ~]# uname -m
loongarch64
[root@alt-work-loongson ~]# 
[root@alt-work-loongson ~]# 
[root@alt-work-loongson ~]# 
[root@alt-work-loongson ~]# inxi -v7
System:
  Host: alt-work-loongson Kernel: 6.18.37-6.18-alt1.port.la64 arch: loongarch64 bits: 64
    compiler: gcc v: 13.2.1 clocksource: Constant
  Console: pty pts/0 DM: GDM v: 48.0 Distro: ALT 11.2 prometheus
Machine:
  Type: Desktop System: Loongson product: Loongson-3C6000/Sx1-7A2000x1-AC612A0_V1.0 v: N/A
    serial: N/A Chassis: type: 3 serial: N/A
  Mobo: Loongson model: AC612A0_V1.0 serial: N/A UEFI: Loongson
    v: Loongson-FwSdk-V5.0.0343-stable2511 date: 12/29/25 11:24:46
Battery:
  Message: No system battery data found. Is one present?
Memory:
  System RAM: total: 64 GiB available: 63.49 GiB used: 4.33 GiB (6.8%)
  Report: arrays: 2 capacity: 256 GiB installed: 64 GiB slots: 4 active: 2 type: DDR4
    eec: Single-bit ECC
  Array-1: capacity: N/A installed: 64 GiB slots: 2 note: check modules: 2 EC: N/A
    max-module-size: N/A
  Device-1: CPU0_A0 type: DDR4 detail: registered (buffered) size: 32 GiB speed: 3200 MT/s
    volts: 1.2 width (bits): data: 64 total: 72 manufacturer: Kingston part-no: 9965754-053.C00G
    serial: 6324B674
  Device-2: CPU0_A3 type: DDR4 detail: registered (buffered) size: 32 GiB speed: 3200 MT/s
    volts: 1.2 width (bits): data: 64 total: 72 manufacturer: Kingston part-no: 9965754-053.C00G
    serial: F014B8CE
  Array-2: capacity: 256 GiB installed: N/A slots: 2 modules: 0 EC: Single-bit ECC
    max-module-size: 128 GiB note: est.
CPU:
  Info: 16-core model: Loongson-3C6000/S bits: 64 type: MT MCP smt: enabled
    arch: Loongson-3/LoongArch rev: 0x10 cache: L1: 2 MiB L2: 4 MiB L3: 32 MiB
  Speed (MHz): avg: 2200 min/max: N/A volts: 1.2 V ext-clock: 25 MHz cores: 1: 2200 2: 2200
    3: 2200 4: 2200 5: 2200 6: 2200 7: 2200 8: 2200 9: 2200 10: 2200 11: 2200 12: 2200 13: 2200
    14: 2200 15: 2200 16: 2200 17: 2200 18: 2200 19: 2200 20: 2200 21: 2200 22: 2200 23: 2200
    24: 2200 25: 2200 26: 2200 27: 2200 28: 2200 29: 2200 30: 2200 31: 2200 32: 2200
    bogomips: 140800
  Flags: complex cpucfg crc32 crypto fpu lam lasx lbt_arm lbt_mips lbt_x86 lspw lsx lvz ual
Graphics:
  Device-1: Loongson LLC LG100 GPU driver: N/A arch: ? bus-ID: 00:06.0 chip-ID: 0014:7a25
    class-ID: 0400
  Display: unspecified server: X.org v: 1.21.1.24 with: Xwayland v: 24.1.13
    compositor: gnome-shell driver: gpu: loongson tty: 236x57
  Monitor-1: HDMI-A-1 model: VGA serial: 0000000000001 res: 1920x1080 dpi: 92
    size: 476x268mm (18.74x10.55") diag: 604mm (23.8") modes: max: 1920x1080 min: 720x400
  API: EGL v: 1.5 platforms: device: 1 drv: swrast gbm: drv: kms_swrast surfaceless: drv: swrast
    inactive: wayland,x11,device-0
  API: OpenGL v: 4.5 vendor: mesa v: 25.3.6 note: console (EGL sourced) renderer: llvmpipe
    (LLVM 20.1.8 128 bits)
  API: Vulkan v: 1.4.335 layers: 1 surfaces: N/A device: 0 type: cpu driver: mesa llvmpipe
    device-ID: 10005:0000
  Info: Tools: api: clinfo, eglinfo, glxinfo, vulkaninfo gpu: nvidia-settings wl: wayland-info
    x11: xdpyinfo, xprop, xrandr
Audio:
  Device-1: Loongson LLC LG100 GPU driver: N/A bus-ID: 00:06.0 chip-ID: 0014:7a25 class-ID: 0400
  Device-2: Loongson LLC driver: snd_hda_intel v: kernel bus-ID: 00:06.2 chip-ID: 0014:7a37
    class-ID: 0403
  Device-3: Loongson LLC HDA driver: snd_hda_intel v: kernel bus-ID: 00:07.0 chip-ID: 0014:7a07
    class-ID: 0403
  API: ALSA v: k6.18.37-6.18-alt1.port.la64 status: kernel-api
  Server-1: PipeWire v: 1.4.7 status: n/a (root, process) with: 1: pipewire-pulse status: active
    2: wireplumber status: active
Network:
  Device-1: Motorcomm Micro. YT6801 Gigabit Ethernet driver: yt6801 v: 1.0.31 pcie:
    speed: 2.5 GT/s lanes: 1 port: 4000 bus-ID: 05:00.0 chip-ID: 1f0a:6801 class-ID: 0200
  IF: enp5s0 state: up speed: 1000 Mbps duplex: full mac: 00:55:25:13:01:14
  IP v4: 10.4.129.139/23 type: dynamic noprefixroute scope: global broadcast: 10.4.129.255
  IP v6: 2a0c:88c0:1:813:255:25ff:fe13:114/64 type: dynamic mngtmpaddr proto kernel_ra
    scope: global
  IP v6: fe80::255:25ff:fe13:114/64 virtual: proto kernel_ll scope: link
  Device-2: Motorcomm Micro. YT6801 Gigabit Ethernet driver: yt6801 v: 1.0.31 pcie:
    speed: 2.5 GT/s lanes: 1 port: 5000 bus-ID: 06:00.0 chip-ID: 1f0a:6801 class-ID: 0200
  IF: enp6s0 state: down mac: 00:55:25:13:01:13
  WAN IP: 193.43.10.250
Bluetooth:
  Message: No bluetooth data found.
Logical:
  Message: No logical block device data found.
RAID:
  Message: No RAID data found.
Drives:
  Local Storage: total: 931.51 GiB used: 9.42 GiB (1.0%)
  ID-1: /dev/nvme0n1 vendor: Kingston model: SNV3S1000G size: 931.51 GiB speed: 63.2 Gb/s
    lanes: 4 tech: SSD serial: 50026B7687735ECD fw-rev: ETFKIN.7 temp: 44.9 C scheme: GPT
  Message: No optical or floppy data found.
Partition:
  ID-1: / size: 686.97 GiB used: 9.42 GiB (1.4%) fs: ext4 dev: /dev/nvme0n1p4 label: N/A
    uuid: d192368f-40ef-4f3d-b874-ad1cdf831a2d
  ID-2: /boot/efi size: 510 MiB used: 408 KiB (0.1%) fs: vfat dev: /dev/nvme0n1p1 label: N/A
    uuid: EB8C-9991
Swap:
  ID-1: swap-1 type: partition size: 32 GiB used: 0 KiB (0.0%) priority: -2 dev: /dev/nvme0n1p2
    label: N/A uuid: 3183f739-f92d-4ac1-9ef6-44b69dc0874b
Unmounted:
  ID-1: /dev/nvme0n1p3 size: 200 GiB fs: ext4 label: N/A
    uuid: a527d179-a2c4-4aed-b130-1c83b97ef921
USB:
  Hub-1: 1-0:1 info: full speed or root hub ports: 4 rev: 2.0 speed: 480 Mb/s lanes: 1
    chip-ID: 1d6b:0002 class-ID: 0900
  Hub-2: 2-0:1 info: full speed or root hub ports: 4 rev: 2.0 speed: 480 Mb/s lanes: 1
    chip-ID: 1d6b:0002 class-ID: 0900
  Hub-3: 3-0:1 info: full speed or root hub ports: 4 rev: 1.1 speed: 12 Mb/s lanes: 1
    chip-ID: 1d6b:0001 class-ID: 0900
  Hub-4: 4-0:1 info: full speed or root hub ports: 4 rev: 1.1 speed: 12 Mb/s lanes: 1
    chip-ID: 1d6b:0001 class-ID: 0900
  Device-1: 4-1:5 info: China Resource Semico Usb Mouse type: mouse driver: hid-generic,usbhid
    interfaces: 1 rev: 1.1 speed: 1.5 Mb/s lanes: 1 power: 98mA chip-ID: 1a2c:0042 class-ID: 0301
  Device-2: 4-2:4 info: INSTANT USB Keyboard type: keyboard,mouse driver: hid-generic,usbhid
    interfaces: 2 rev: 1.1 speed: 1.5 Mb/s lanes: 1 power: 100mA chip-ID: 30fa:2031 class-ID: 0300
  Hub-5: 5-0:1 info: hi-speed hub with single TT ports: 4 rev: 2.0 speed: 480 Mb/s lanes: 1
    chip-ID: 1d6b:0002 class-ID: 0900
  Hub-6: 6-0:1 info: super-speed hub ports: 4 rev: 3.0 speed: 5 Gb/s lanes: 1 chip-ID: 1d6b:0003
    class-ID: 0900
Use of uninitialized value in substitution (s///) at /usr/bin/inxi line 27674.
Use of uninitialized value in concatenation (.) or string at /usr/bin/inxi line 27675.
Sensors:
  Src: lm-sensors+/sys Message: No sensor data found using /sys/class/hwmon or lm-sensors.
Info:
  Processes: 420 Power: uptime: 21m states: freeze,mem,disk suspend: deep wakeups: 0
    hibernate: platform Init: systemd v: 257 target: graphical (5) default: graphical
  Packages: pm: rpm-apt pkgs: 1966 Compilers: N/A Shell: Bash v: 5.2.37
    running-in: pty pts/0 (SSH) inxi: 3.3.38
[root@alt-work-loongson ~]# 

У вас современная платформа LoongArch64: Loongson 3C6000/S, 16 физических ядер и 32 потока, 64 ГБ DDR4-3200 ECC. Пакеты из p11_loongarch64 подходят.

Начнём с памяти:

apt-get update
apt-get install stream-mem

OMP_NUM_THREADS="$(nproc)" OMP_PROC_BIND=true stream_c

В конце будут показатели Copy, Scale, Add, Triad в MB/s. Пришлите весь вывод — разберу результаты. Пакет stream-mem для loongarch64

Для CPU:

apt-get install stress-ng

stress-ng --cpu 1 --cpu-method matrixprod --timeout 60s --metrics-brief
stress-ng --cpu "$(nproc)" --cpu-method matrixprod --timeout 60s --metrics-brief

Первая команда покажет однопоточную производительность, вторая — производительность всех 32 потоков. Сравнивать результаты нужно при одинаковой версии stress-ng и одинаковых параметрах. Пакет stress-ng

Для NVMe без воздействия на разделы:

apt-get install fio

fio --name=seqwrite \
    --filename=/var/tmp/fio-test.bin \
    --size=8G \
    --rw=write \
    --bs=1M \
    --direct=1 \
    --ioengine=libaio \
    --iodepth=32 \
    --group_reporting

fio --name=seqread \
    --filename=/var/tmp/fio-test.bin \
    --size=8G \
    --rw=read \
    --bs=1M \
    --direct=1 \
    --ioengine=libaio \
    --iodepth=32 \
    --group_reporting

rm -f /var/tmp/fio-test.bin

Здесь тестируется файл, а не непосредственно /dev/nvme0n1, поэтому таблица разделов и существующие данные не перезаписываются.

Важный момент: датчики температуры системой не обнаружены, поэтому пока ограничимся короткими тестами. Кроме того, видеоускорение сейчас не работает: используется программный рендерер llvmpipe, поэтому результаты графического бенчмарка будут показывать производительность CPU, а не GPU Loongson LG100. Показатель bogomips: 140800 из inxi также не является реальным бенчмарком.

а как включить поддержку GPU Loongson LG100.

Сейчас аппаратное 3D-ускорение LG100 включить одной настройкой нельзя: в ALT установлен драйвер контроллера вывода loongson, но отсутствует драйвер непосредственно GPU 0014:7a25. Поэтому монитор работает, а OpenGL/Vulkan используют процессорный llvmpipe.

В точной версии ALT-пакета для вашего ядра 6.18.37-alt1.port.la64 присутствует loongson.ko, но нет loonggpu.ko или gsgpu.ko. Состав kernel-modules-drm-6.18

Для начала проверим, не установлены ли драйверы отдельно:

lspci -nnk -s 00:06.0
lspci -nnk -s 00:06.1

ls -la /dev/dri

lsmod | grep -E 'loongson|loonggpu|gsgpu'

modinfo loongson 2>&1 | grep -E 'filename|description|alias'
modinfo loonggpu 2>&1
modinfo gsgpu 2>&1

rpm -qa | grep -Ei 'loonggpu|gsgpu|loonggl|gpucomp|ldrm'
apt-cache search loonggpu
apt-cache search gsgpu

journalctl -b -k --no-pager |
    grep -Ei 'loonggpu|gsgpu|loongson|drm|firmware' |
    tail -n 150

Пришлите вывод целиком.

Что потребуется, если пакетов действительно нет:

прошивка firmware-loongson-graphics;
модуль ядра loonggpu/gsgpu;
библиотеки ldrm, loong-gpucomp, loonggl;
Xorg-драйвер xserver-xorg-video-loonggpu.

Такой комплект уже существует в AOSC OS: их метапакет перечисляет все указанные компоненты, а модуль адаптирован к ядрам до Linux 6.18. Состав LoongGPU Driver, описание версии 1.0.2.

Но пакеты AOSC нельзя просто ставить поверх ALT: у них другой формат пакетов, зависимости и графический стек. Для ALT потребуется отдельная RPM-сборка драйвера. Само ядро ALT уже содержит совместимые поправки для gsgpu/loonggpu, поэтому портирование технически предусмотрено, но пользовательские библиотеки и модуль GPU пока не входят в штатный DRM-пакет ALT. После вывода диагностики станет понятно, нужно ли собирать весь комплект или какой-то его компонент уже присутствует.

Выложил файл

Диагностика подтвердила причину: аппаратное 3D-ускорение LG100 в вашей установке ALT отсутствует.

Что видно по выводу:

00:06.0 [0014:7a25] — сам LG100, строка Kernel driver in use отсутствует.
00:06.1 [0014:7a36] — контроллер вывода, использует loongson.
loongson.ko поддерживает только PCI ID 7a36 и 7a06, но не 7a25.
Модулей loonggpu и gsgpu нет.
Пакетов loonggl, ldrm, loong-gpucomp тоже нет.
Поэтому OpenGL работает через программный llvmpipe.

Повторно загружать loongson бессмысленно — он уже работает и отвечает только за вывод изображения.

Как действительно включить LG100

Нужен отдельный стек LoongGPU 1.0.2:

firmware-loongson-graphics;
модуль ядра loonggpu/gsgpu;
ldrm;
loong-gpucomp;
loonggl;
xserver-xorg-video-loonggpu.

В официальном p11_loongarch64 этих пакетов сейчас нет. В комплекте DRM вашего ядра присутствует только loongson.ko. Состав пакета ALT

Исходный код модуля LoongGPU открыт, а AOSC адаптировала его к ядру Linux 6.18. Исходный код модуля, описание версии 1.0.2. Ядро ALT также содержит специальную поправку совместимости для gsgpu/loonggpu, но самого драйвера и пользовательских библиотек в ALT нет.

Итог: штатной командой в текущем ALT ускорение не включить. Реальные варианты:

собрать полный комплект LoongGPU в RPM специально для ALT;
дождаться/запросить официальную сборку у команды ALT;
использовать поддерживаемую дискретную AMD-видеокарту;
установить систему, где LoongGPU уже интегрирован, например AOSC OS или совместимую версию Loongnix.

Ставить пакеты AOSC/Loongnix напрямую поверх ALT не стоит: они могут заменить libGL, Xorg-компоненты и оставить систему без графического интерфейса. Для сохранения ALT нужен именно отдельный RPM-порт всего комплекта, а не только сборка loonggpu.ko.
вчера

Подготовка выполнена успешно:

контрольная сумма прошивки совпала;
lg100_cp.bin и lg200_cp.bin установлены;
modprobe действительно ставит loonggpu.ko перед loongson.ko;
повторяющиеся строки зависимостей ttm и i2c-algo-bit в выводе не являются ошибкой.

Теперь пересоберите initramfs:

make-initrd -k "$(uname -r)"

Если команда завершится без ошибок:

reboot

После загрузки проверьте от root:

lspci -nnk -s 00:06.0
lspci -nnk -s 00:06.1

ls -la /dev/dri/by-path

readlink -f /sys/class/drm/card0/device/driver
readlink -f /sys/class/drm/renderD128/device/driver

journalctl -b -k --no-pager |
grep -Ei 'loonggpu|gsgpu|lg100|firmware|drm' |
tail -n 250

В терминале графического пользователя:

glxinfo -B
inxi -Gxx

Главный ожидаемый результат:

00:06.0  Kernel driver in use: loonggpu
00:06.1  Kernel driver in use: loonggpu-dc

А в glxinfo -B:

Accelerated: yes

и renderer уже не llvmpipe.

Если после перезагрузки графика не откроется, но SSH будет доступен, откат:

rm -f /etc/modprobe.d/loonggpu-order.conf
make-initrd -k "$(uname -r)"
reboot

[root@basealt ~]#  
[root@basealt ~]# lspci -nnk -s 00:06.0
lspci -nnk -s 00:06.1

ls -la /dev/dri/by-path

readlink -f /sys/class/drm/card0/device/driver
readlink -f /sys/class/drm/renderD128/device/driver

journalctl -b -k --no-pager |
grep -Ei 'loonggpu|gsgpu|lg100|firmware|drm' |
tail -n 250
00:06.0 Multimedia video controller [0400]: Loongson Technology LLC LG100 GPU [0014:7a25] (rev 01)
       Kernel driver in use: loonggpu
00:06.1 VGA compatible controller [0300]: Loongson Technology LLC Display Controller [0014:7a36] (rev 02)
       Kernel driver in use: loonggpu-dc
итого 0
drwxr-xr-x 2 root root  80 авг 27 15:49 .
drwxr-xr-x 3 root root 100 авг 27 15:49 ..
lrwxrwxrwx 1 root root   8 авг 27 15:49 pci-0000:00:06.1-card -> ../card0
lrwxrwxrwx 1 root root  13 авг 27 15:49 pci-0000:00:06.1-render -> ../renderD128
/sys/bus/pci/drivers/loonggpu-dc
/sys/bus/pci/drivers/loonggpu-dc
авг 27 15:49:24 basealt.kompas.test kernel: ACPI: bus type drm_connector registered
авг 27 15:49:24 basealt.kompas.test kernel: loonggpu: loading out-of-tree module taints kernel.
авг 27 15:49:24 basealt.kompas.test kernel: loonggpu: module verification failed: signature and/or required key missing - tainting kernel
авг 27 15:49:24 basealt.kompas.test kernel: [drm] loonggpu kernel modesetting enabled.
авг 27 15:49:24 basealt.kompas.test kernel: [drm] initializing kernel modesetting (LG100 0x0014:0x7A25 0x0000:0x0000 0x01).
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Set 7A2000 device in loonggpu driver
авг 27 15:49:24 basealt.kompas.test kernel: [drm] register mmio base: 0x39172000
авг 27 15:49:24 basealt.kompas.test kernel: [drm] register mmio size: 256
авг 27 15:49:24 basealt.kompas.test kernel: [drm] loonggpu dc register mmio base: 0x39110000
авг 27 15:49:24 basealt.kompas.test kernel: [drm] loonggpu dc register mmio size: 65536
авг 27 15:49:24 basealt.kompas.test kernel: [drm] loonggpu dc io base: 0xffff800038d54000
авг 27 15:49:24 basealt.kompas.test kernel: kcd kcd: LG100 not supported in kcd
авг 27 15:49:24 basealt.kompas.test kernel: [drm] GPU Family: LG100 series LG110, Feature:0x00000000
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Firmware Version: 1.0.0
авг 27 15:49:24 basealt.kompas.test kernel: [drm] aper_base 0xe0020000000 SIZE 0x10000000 bytes  
авг 27 15:49:24 basealt.kompas.test kernel: loonggpu 0000:00:06.0: Video RAM: 256M 0x0001000000000000 - 0x000100000FFFFFFF (256M used)
авг 27 15:49:24 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GART: 256M 0x0000000000000000 - 0x000000000FFFFFFF
авг 27 15:49:24 basealt.kompas.test kernel: [drm] loonggpu: 3072M of GTT memory ready.
авг 27 15:49:24 basealt.kompas.test kernel: [drm] GART: num cpu pages 16384, num gpu pages 16384
авг 27 15:49:24 basealt.kompas.test kernel: [drm] vm size is 1024 GB, 3 levels, block size is 11-bit
авг 27 15:49:24 basealt.kompas.test kernel: [drm] PCIE GART of 256M enabled (table at 0x000100000FFC0000).
авг 27 15:49:24 basealt.kompas.test kernel: [drm] ZIP META: num cpu pages 128, num gpu pages 128
авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU get vbios from vram Success  
авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU vbios header info:
авг 27 15:49:24 basealt.kompas.test kernel: [drm] ver:2.1 links:2 max_planes:0 name:Loongson-VBIOS info:
авг 27 15:49:24 basealt.kompas.test kernel: [drm] oem-vendor:VU oem-product:2022
авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU vbios crtc-0 max_frep:340000 width:4096 height:4096
авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU vbios crtc-1 max_frep:340000 width:4096 height:4096
авг 27 15:49:24 basealt.kompas.test kernel: loonggpu 0000:00:06.0: VRAM: 256M DDR4 32bit 2400Mhz.
авг 27 15:49:24 basealt.kompas.test kernel: loonggpu 0000:00:06.0: LOONGGPU: shaders_num: 64, shaders_freq: 480, freq_count: 3.
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Encoder Parse: #0x01-vga feature:0 type:dac hotplug:polling.
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Encoder Parse: config_type:timing edid_method:i2c reset_gpio:0.
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Encoder Parse: #0x02-hdmi feature:0 type:tmds hotplug:irq.
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Encoder Parse: config_type:timing edid_method:i2c reset_gpio:0.
авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU Display Core initialized with v1.0!
авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU DC construct links:2
авг 27 15:49:24 basealt.kompas.test kernel: [drm] PCIE ZIP META of 2M enabled (table at 0x000100000FC00000).
авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU DC init gpio 0 addr 0x50 finish
авг 27 15:49:24 basealt.kompas.test kernel: [drm] [Bridge_phy] vga encoder-0 be attach to this bridge.
авг 27 15:49:24 basealt.kompas.test kernel: [drm] [Bridge_phy] vga init finish.
авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU DC init gpio 1 addr 0x50 finish
авг 27 15:49:24 basealt.kompas.test kernel: [drm] [Bridge_phy] hdmi encoder-1 be attach to this bridge.
авг 27 15:49:24 basealt.kompas.test kernel: [drm] [Bridge_phy] hdmi init finish.
авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU DC irq init sources number:13
авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU Display Crtcs
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Crtc 0: name:crtc-0
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Crtc 1: name:crtc-1
авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU Display Connectors
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Connector 0: name:VGA-1
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Connector 1: name:HDMI-A-1
авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU Display Encoders
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Encoder 0: name:TMDS-41
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Encoder 1: name:TMDS-43
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Config crtc number:2 meta addr 0x100000fa00000
авг 27 15:49:24 basealt.kompas.test kernel: [drm] loonggpu_dc_scale_init: family_type:1 no bpipe, not support scaling.
авг 27 15:49:24 basealt.kompas.test kernel: [drm] Initialized gsgpu 1.0.0 for 0000:00:06.1 on minor 0
авг 27 15:49:24 basealt.kompas.test kernel: [drm] fb mappable at 0xE002F000000
авг 27 15:49:24 basealt.kompas.test kernel: [drm] vram apper at 0xE0020000000
авг 27 15:49:24 basealt.kompas.test kernel: [drm] size 8306688
авг 27 15:49:24 basealt.kompas.test kernel: [drm] fb depth is 24
авг 27 15:49:24 basealt.kompas.test kernel: [drm]    pitch is 7680
авг 27 15:49:24 basealt.kompas.test kernel: [drm] screen_base 0xFFFF800034000000
авг 27 15:49:24 basealt.kompas.test kernel: [drm] screen_size 0x7EC000
авг 27 15:49:24 basealt.kompas.test kernel: loonggpu-dc 0000:00:06.1: [drm] fb0: gsgpudrmfb frame buffer device
авг 27 15:49:24 basealt.kompas.test systemd[1]: Starting modprobe@drm.service - Load Kernel Module drm...
авг 27 15:49:24 basealt.kompas.test systemd[1]: systemd-hibernate-clear.service - Clear Stale Hibernate Storage Info was skipped because of an unmet condition check (ConditionPathExists=/sys/firmware/efi/efivars/HibernateLocation-8cf264
4b-4b0b-428f-9387-6d876050dc67).
авг 27 15:49:24 basealt.kompas.test systemd[1]: modprobe@drm.service: Deactivated successfully.
авг 27 15:49:24 basealt.kompas.test systemd[1]: Finished modprobe@drm.service - Load Kernel Module drm.
[root@basealt ~]#

[root@basealt ~]#  
[root@basealt ~]# cat /home/basealt/inxi.txt  
[basealt@basealt ~]$ inxi -Gxx
Graphics:
 Device-1: Loongson LLC LG100 GPU driver: loonggpu v: kernel arch: ?
   bus-ID: 00:06.0 chip-ID: 0014:7a25
 Display: x11 server: X.Org v: 1.21.1.24 with: Xwayland v: 24.1.13
   compositor: gnome-shell v: 48.5 driver: dri: gsgpu gpu: loonggpu,loonggpu-dc
   note: X driver n/a, try sudo/root display-ID: :0 screens: 1
 Screen-1: 0 s-res: 1920x1080 s-dpi: 93
 Monitor-1: HDMI-A-1 mapped: HDMI-1 model: Dell P2419HC res: 1920x1080
   hz: 60 dpi: 93 diag: 604mm (23.8")
 API: EGL v: 1.5 platforms: device: 1 drv: swrast gbm: drv: kms_swrast
   surfaceless: drv: swrast x11: drv: swrast inactive: wayland,device-0
 API: OpenGL v: 4.5 vendor: mesa v: 25.3.6 glx-v: 1.4 direct-render: yes
   renderer: llvmpipe (LLVM 20.1.8 128 bits) device-ID: ffffffff:ffffffff
 API: Vulkan v: 1.4.335 surfaces: N/A device: 0 type: cpu
   driver: mesa llvmpipe device-ID: 10005:0000
 Info: Tools: api: clinfo, eglinfo, glxinfo, vulkaninfo
   gpu: nvidia-settings wl: wayland-info x11: xdpyinfo, xprop, xrandr
[basealt@basealt ~]$  
[root@basealt ~]#  
[root@basealt ~]#  
[root@basealt ~]# cat /home/basealt/glxinfo-b.txt
glx: failed to create dri3 screen
failed to load driver: loonggpu

name of display: :0
display: :0  screen: 0
direct rendering: Yes
Extended renderer info (GLX_MESA_query_renderer):
   Vendor: Mesa (0xffffffff)
   Device: llvmpipe (LLVM 20.1.8, 128 bits) (0xffffffff)
   Version: 25.3.6
   Accelerated: no
   Video memory: 16134MB
   Unified memory: yes
   Preferred profile: core (0x1)
   Max core profile version: 4.5
   Max compat profile version: 4.5
   Max GLES1 profile version: 1.1
   Max GLES[23] profile version: 3.2
Memory info (GL_ATI_meminfo):
   VBO free memory - total: 0 MB, largest block: 0 MB
   VBO free aux. memory - total: 12252 MB, largest block: 12252 MB
   Texture free memory - total: 0 MB, largest block: 0 MB
   Texture free aux. memory - total: 12252 MB, largest block: 12252 MB
   Renderbuffer free memory - total: 0 MB, largest block: 0 MB
   Renderbuffer free aux. memory - total: 12252 MB, largest block: 12252 MB
Memory info (GL_NVX_gpu_memory_info):
   Dedicated video memory: 0 MB
   Total available memory: 16134 MB
   Currently available dedicated video memory: 0 MB
OpenGL vendor string: Mesa
OpenGL renderer string: llvmpipe (LLVM 20.1.8, 128 bits)
OpenGL core profile version string: 4.5 (Core Profile) Mesa 25.3.6
OpenGL core profile shading language version string: 4.50
OpenGL core profile context flags: (none)
OpenGL core profile profile mask: core profile

OpenGL version string: 4.5 (Compatibility Profile) Mesa 25.3.6
OpenGL shading language version string: 4.50
OpenGL context flags: (none)
OpenGL profile mask: compatibility profile

OpenGL ES profile version string: OpenGL ES 3.2 Mesa 25.3.6
OpenGL ES profile shading language version string: OpenGL ES GLSL ES 3.20

[root@basealt ~]#

Ядровой драйвер LG100 теперь работает корректно:
Выложил файл
графика не  запустилась после перезагрузки
Выложил файл
Выложил файл

По выводу зависает не ядро GPU:

в журнале ядра нет timeout, reset, fault или GPU hang;
kKompas остаётся живым: STAT=Sl+;
основной поток ждёт в poll_schedule_timeout;
процесс потребляет 27,9% CPU и 31,7% RAM.

Это указывает на зависание внутри пользовательского процесса или графической библиотеки. Точное место пока не определено. Ошибка xdpyinfo возникла только потому, что команда выполнена от root, у которого нет X11-cookie пользователя basealt.

Пока КОМПАС завис, выполните:

pid="$(pgrep -u basealt -n -x kKompas)"
echo "PID=$pid"

echo '=== ПОТОКИ ==='
ps -L -p "$pid" \
  -o pid,tid,psr,stat,wchan:35,%cpu,%mem,etime,comm \
  --sort=-%cpu |
head -n 40

echo '=== ГРАФИЧЕСКИЕ БИБЛИОТЕКИ ==='
grep -E \
  'loonggpu|gsgpu|swrast|libGLX|libEGL|libGL\.so' \
  /proc/"$pid"/maps |
sort -u

echo '=== ПАМЯТЬ ==='
free -h
grep -E 'VmPeak|VmSize|VmRSS|VmSwap|Threads' \
  /proc/"$pid"/status

echo '=== СИСТЕМНЫЕ ВЫЗОВЫ ЗА 10 СЕКУНД ==='
timeout 10s strace -f -tt -T \
  -p "$pid" \
  -o /var/tmp/kompas-hang.strace

tail -n 100 /var/tmp/kompas-hang.strace

После сохранения диагностики завершите зависший процесс штатным сигналом:

kill -TERM "$pid"

Затем проверим вероятную связь с предупреждением драйвера о неверных GPU timestamps. Запустите ускоренный вариант с отключённым ожиданием вертикальной синхронизации:

cd /home/basealt/KOMPAS_LOONG64/KOMPAS

env \
  LD_LIBRARY_PATH="/usr/lib/loongarch64-linux-gnu:/usr/lib/loongarch64-linux-gnu/loonggpu" \
  LIBGL_DRIVERS_PATH=/usr/lib/loongarch64-linux-gnu/loonggpu/dri \
  __GLX_VENDOR_LIBRARY_NAME=loonggpu \
  QT_QPA_PLATFORM=xcb \
  QT_XCB_GL_INTEGRATION=xcb_glx \
  vblank_mode=0 \
  ./KOMPAS.sh

vblank_mode=0 сейчас является диагностическим тестом, а не подтверждённым исправлением. Если КОМПАС снова зависнет, используйте программный рендерер и не запускайте рабочие документы через LoongGPU до выяснения причины:

cd /home/basealt/KOMPAS_LOONG64/KOMPAS

env -u __GLX_VENDOR_LIBRARY_NAME \
    -u LIBGL_DRIVERS_PATH \
    -u LD_LIBRARY_PATH \
    LIBGL_ALWAYS_SOFTWARE=1 \
    ./KOMPAS.sh
Выложил файл
в идеале я хотел бы добиться полной поддержки графики loongson гномом

Выложил файл
[basealt@basealt ~]$ stage=/opt/loonggpu-lnd25.1

timeout 30s env \
  LD_LIBRARY_PATH="$stage/usr/lib/gsgpu:$stage/usr/lib" \
  LIBGL_DRIVERS_PATH="$stage/usr/lib/gsgpu/dri:/usr/lib64/X11/modules/dri" \
  GBM_BACKENDS_PATH="$stage/usr/lib/gbm" \
  GBM_BACKEND=gsgpu \
  __EGL_VENDOR_LIBRARY_FILENAMES="$stage/usr/share/glvnd/egl_vendor.d/60_gsgpu.json" \
  LIBGL_DEBUG=verbose \
  EGL_LOG_LEVEL=debug \
  eglinfo -B -p x11 \
  > /home/basealt/eglinfo-gsgpu-lnd25.1-x11.txt 2>&1

echo "Код X11: $?"
cat /home/basealt/eglinfo-gsgpu-lnd25.1-x11.txt
Ошибка сегментирования
Код X11: 139
libEGL debug: Native platform type: x11 (build-time configuration)
libEGL debug: EGL user error 0x3001 (EGL_NOT_INITIALIZED) in eglQueryString

libEGL debug: LG100 X11 platform: Arbitration gsgpu successful
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 476, column 8: unknown application attribute: executable_regexp.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 713, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 714, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 751, column 8: unknown application attribute: application_name_match.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 799, column 8: unknown application attribute: application_name_match.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1035, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1036, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1120, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1121, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1124, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1125, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1127, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1128, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1130, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1131, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1139, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1140, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1143, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1144, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1145, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1148, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1149, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1151, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1152, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1252, column 4: unknown device attribute: device.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1339, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1345, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1347, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1354, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1360, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1413, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1419, column 11: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1422, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1429, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1435, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1439, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1446, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 41, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 42, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 43, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 44, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 45, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 48, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 49, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 50, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 53, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 54, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 57, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 58, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 59, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 60, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 63, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 64, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 65, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 66, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 69, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 70, column 12: <option> should be inside <application>.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 73, column 8: unknown element: engine.
libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 74, column 12: <option> should be inside <application>.
libGL: Can't open configuration file /etc/drirc: No such file or directory.
libGL: Can't open configuration file /home/basealt/.drirc: No such file or directory.
libEGL debug: failed to open /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/loonggpu_dri.so: /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/loonggpu_dri.so: cannot open shared object file: No such file or directory

libEGL debug: failed to open /usr/lib64/X11/modules/dri/loonggpu_dri.so: /usr/lib64/X11/modules/dri/loonggpu_dri.so: cannot open shared object file: No such file or directory

libEGL warning: DRI2: failed to open loonggpu (search paths /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri:/usr/lib64/X11/modules/dri)
libEGL debug: failed to open /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/loonggpu_dri.so: /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/loonggpu_dri.so: cannot open shared object file: No such file or directory

libEGL debug: failed to open /usr/lib64/X11/modules/dri/loonggpu_dri.so: /usr/lib64/X11/modules/dri/loonggpu_dri.so: cannot open shared object file: No such file or directory

libEGL warning: DRI2: failed to open loonggpu (search paths /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri:/usr/lib64/X11/modules/dri)
libEGL debug: failed to open /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/swrast_dri.so: /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/swrast_dri.so: cannot open shared object file: No such file or directory

libEGL debug: DRI2: dlopen(/usr/lib64/X11/modules/dri/swrast_dri.so)
libEGL debug: found extension DRI_Core'
libEGL info: found extension DRI_Core version 1
libEGL debug: found extension DRI_SWRast'
libEGL info: found extension DRI_SWRast version 5
libEGL debug: found extension DRI_DRI2'
gbm: failed to open any driver (search paths /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri:/usr/lib64/X11/modules/dri)
gbm: Last dlopen error: /usr/lib64/X11/modules/dri/loonggpu_dri.so: cannot open shared object file: No such file or directory
failed to load driver: loonggpu
[basealt@basealt ~]$ 


Теперь подтверждена не проблема путей, а несовместимость или DRM-аутентификация:

    X11 успешно выбирает gsgpu и загружает нужный loonggpu_dri.so, после чего процесс падает.

    GBM получает -13 (EACCES) при LOONGGPU_INFO_ACCEL_WORKING.

    В исходном драйвере AOSC этот ioctl помечен DRM_AUTH | DRM_RENDER_ALLOW; сам обработчик ACCEL_WORKING не возвращает EACCES. Значит отказ возникает на уровне проверки DRM-клиента — либо открыт card0 без DRM-аутентификации, либо установленный модуль не соответствует стеку lnd25.1. Исходный код AOSC

1. Проверка GBM от root

Это позволит отделить DRM-аутентификацию от несовместимости ABI:

stage=/opt/loonggpu-lnd25.1

timeout 30s env \
  LD_LIBRARY_PATH="$stage/usr/lib/gsgpu:$stage/usr/lib/loonggpu:$stage/usr/lib" \
  LIBGL_DRIVERS_PATH="$stage/usr/lib/loonggpu/dri:$stage/usr/lib/gsgpu/dri:/usr/lib64/X11/modules/dri" \
  GBM_BACKENDS_PATH="$stage/usr/lib/gbm" \
  GBM_BACKEND=gsgpu \
  __EGL_VENDOR_LIBRARY_FILENAMES="$stage/usr/share/glvnd/egl_vendor.d/60_gsgpu.json" \
  LIBGL_DEBUG=verbose \
  EGL_LOG_LEVEL=debug \
  eglinfo -B -p gbm \
  > /root/eglinfo-combined-gbm-root.txt 2>&1

rc=$?
echo "Код GBM root: $rc"
cat /root/eglinfo-combined-gbm-root.txt

Интерпретация:

    если исчезнет failed (-13), проблема связана с DRM-аутентификацией;

    если останется -13 или произойдёт сегментация, вероятна несовместимость модуля и библиотек.

2. Узнать, какое устройство открывает GBM

Выполните как basealt:

stage=/opt/loonggpu-lnd25.1

timeout 15s strace \
  -f -yy -s 128 \
  -e trace=openat,ioctl \
  -o /home/basealt/eglinfo-combined-gbm.strace \
  env \
    LD_LIBRARY_PATH="$stage/usr/lib/gsgpu:$stage/usr/lib/loonggpu:$stage/usr/lib" \
    LIBGL_DRIVERS_PATH="$stage/usr/lib/loonggpu/dri:$stage/usr/lib/gsgpu/dri:/usr/lib64/X11/modules/dri" \
    GBM_BACKENDS_PATH="$stage/usr/lib/gbm" \
    GBM_BACKEND=gsgpu \
    __EGL_VENDOR_LIBRARY_FILENAMES="$stage/usr/share/glvnd/egl_vendor.d/60_gsgpu.json" \
    eglinfo -B -p gbm

echo "Код strace: $?"

grep -E \
  '/dev/dri|DRM_IOCTL|EACCES|EPERM' \
  /home/basealt/eglinfo-combined-gbm.strace |
tail -n 100

Нужно увидеть, где возникает EACCES:

    на /dev/dri/card0;

    на /dev/dri/renderD128;

    либо непосредственно на DRM_IOCTL_LOONGGPU_INFO.

3. Идентификация модуля ядра

Текущий loonggpu.ko не принадлежит RPM, поэтому его происхождение и соответствие lnd25.1 пока неизвестны:

gpu_module="$(modinfo -n loonggpu)"

echo "=== МОДУЛЬ ==="
ls -lh "$gpu_module"
sha256sum "$gpu_module"

modinfo loonggpu |
grep -E 'filename|version|srcversion|vermagic|firmware'

echo "=== СТРОКИ СБОРКИ ==="
strings "$gpu_module" |
grep -Ei 'lnd25|ud25|rc1|loonggpu.*1\.0\.2|gcc version|clang version' |
head -n 100

AOSC публикует для данного пользовательского стека модуль той же линии 1.0.2+lnd25.1; именно соответствие этой версии сейчас требуется проверить. Пакет модуля AOSC

Пока не подключайте библиотеки глобально к GNOME: оба теста завершаются SIGSEGV, поэтому глобальное включение снова может повредить запуск всего сеанса. Пришлите вывод трёх проверок.

Выложил файл
Выложил файл
Выложил файл

Drop-in GDM не решил загрузку Xorg: сервер продолжил открывать системный /usr/lib64/X11/modules/dri/gsgpu_dri.so, а libloong-gpucomp.so.1 остался недоступен.

Также старый X-сервер при завершении упал внутри libexa.so. Это ещё один признак проблемной связки loonggpu DDX + EXA + ShadowFB. Ошибок GPU/DRM в приведённом фрагменте нет.

Пустой gnome-shell PID означает, что после перезапуска пользователь basealt ещё не вошёл в GNOME.

1. Удаляем неэффективный drop-in

Пока не перезапускайте GDM второй раз:

rm -f \
  /etc/systemd/system/gdm.service.d/50-loonggpu-lnd25.1.conf

rmdir \
  /etc/systemd/system/gdm.service.d 2>/dev/null || true

systemctl daemon-reload

systemctl show gdm.service -p Environment

Environment= должен стать пустым.

2. Сравниваем установленный и новый стек
stage=/opt/loonggpu-lnd25.1

echo '=== DRI ==='

sha256sum \
  /usr/lib64/dri/gsgpu_dri.so \
  "$stage/usr/lib/gsgpu/dri/gsgpu_dri.so"

echo '=== GLAPI ==='

sha256sum \
  /usr/lib/loongarch64-linux-gnu/gsgpu/libgsgpu_glapi.so.0 \
  "$stage/usr/lib/gsgpu/libgsgpu_glapi.so.0"

echo '=== GPUCOMP ==='

sha256sum \
  /usr/lib/loongarch64-linux-gnu/libloong-gpucomp.so.1 \
  "$stage/usr/lib/libloong-gpucomp.so.1"

echo '=== LDRM ==='

sha256sum \
  /lib64/libldrm.so.1 \
  "$stage/usr/lib/libldrm.so.1"

echo '=== RUNPATH НОВОГО DRI ==='

readelf -d \
  "$stage/usr/lib/gsgpu/dri/gsgpu_dri.so" |
grep -E 'NEEDED|RPATH|RUNPATH'

echo '=== ЗАВИСИМОСТИ НОВОГО DRI С ЕГО СТЕКОМ ==='

env \
  LD_LIBRARY_PATH="$stage/usr/lib/gsgpu:$stage/usr/lib" \
  ldd "$stage/usr/lib/gsgpu/dri/gsgpu_dri.so" |
grep -E 'gsgpu|gpucomp|ldrm|not found'
3. Уточняем падение EXA
grep -n -B 30 -A 40 \
  'Caught signal 6' \
  /var/log/Xorg.1.log |
tail -n 120

journalctl -b -k \
  --since "$(cat /root/loonggpu-gdm-test-start)" \
  --no-pager |
grep -Ei \
  'loonggpu|gsgpu|timeout|fault|hang|reset|ring|drm'

Дальнейшее действие определяется хешами:

если файлы старого и lnd25.1 стека одинаковые — достаточно исправить системный поиск libloong-gpucomp.so.1;
если хеши различаются — нужно направить Xorg именно на комплект lnd25.1, не смешивая его со старыми библиотеками.

Глобально добавлять весь /opt/loonggpu-lnd25.1 в ld.so.conf до сравнения не следует: при разных версиях это снова создаст смешанный EGL/DRI-стек.

[root@basealt loonggpu-lnd25.1-debs]#  
[root@basealt loonggpu-lnd25.1-debs]# stage=/opt/loonggpu-lnd25.1

echo '=== DRI ==='

sha256sum \
 /usr/lib64/dri/gsgpu_dri.so \
 "$stage/usr/lib/gsgpu/dri/gsgpu_dri.so"

echo '=== GLAPI ==='

sha256sum \
 /usr/lib/loongarch64-linux-gnu/gsgpu/libgsgpu_glapi.so.0 \
 "$stage/usr/lib/gsgpu/libgsgpu_glapi.so.0"

echo '=== GPUCOMP ==='

sha256sum \
 /usr/lib/loongarch64-linux-gnu/libloong-gpucomp.so.1 \
 "$stage/usr/lib/libloong-gpucomp.so.1"

echo '=== LDRM ==='

sha256sum \
 /lib64/libldrm.so.1 \
 "$stage/usr/lib/libldrm.so.1"

echo '=== RUNPATH НОВОГО DRI ==='

readelf -d \
 "$stage/usr/lib/gsgpu/dri/gsgpu_dri.so" |
grep -E 'NEEDED|RPATH|RUNPATH'

echo '=== ЗАВИСИМОСТИ НОВОГО DRI С ЕГО СТЕКОМ ==='

env \
 LD_LIBRARY_PATH="$stage/usr/lib/gsgpu:$stage/usr/lib" \
 ldd "$stage/usr/lib/gsgpu/dri/gsgpu_dri.so" |
grep -E 'gsgpu|gpucomp|ldrm|not found'
=== DRI ===
aff7101ab877db0026fa0f8274e03a579f1b4fd2c16fabe2478d08f224d0da0a  /usr/lib64/dri/gsgpu_dri.so
aff7101ab877db0026fa0f8274e03a579f1b4fd2c16fabe2478d08f224d0da0a  /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/gsgpu_dri.so
=== GLAPI ===
b04f00255f9d04a482342ef0c1394546f1fb8851fbbc8ba315143a78f7894ae7  /usr/lib/loongarch64-linux-gnu/gsgpu/libgsgpu_glapi.so.0
b04f00255f9d04a482342ef0c1394546f1fb8851fbbc8ba315143a78f7894ae7  /opt/loonggpu-lnd25.1/usr/lib/gsgpu/libgsgpu_glapi.so.0
=== GPUCOMP ===
f8651e3eae63ba76fe7684d3f4fdeb73cecfacc8e0baf3ca5fbb8561c6b82d99  /usr/lib/loongarch64-linux-gnu/libloong-gpucomp.so.1
f8651e3eae63ba76fe7684d3f4fdeb73cecfacc8e0baf3ca5fbb8561c6b82d99  /opt/loonggpu-lnd25.1/usr/lib/libloong-gpucomp.so.1
=== LDRM ===
55dfc197cf88575542121f13a7932a18a4a2eb6e51a918deae86efe1049995f6  /lib64/libldrm.so.1
55dfc197cf88575542121f13a7932a18a4a2eb6e51a918deae86efe1049995f6  /opt/loonggpu-lnd25.1/usr/lib/libldrm.so.1
=== RUNPATH НОВОГО DRI ===
0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libgsgpu_glapi.so.0]
0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libexpat.so.1]
0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libdrm.so.2]
0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libldrm.so.1]
0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libloong-gpucomp.so.1]
0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libz.so.1]
0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libsensors.so.5]
0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libelf.so.1]
0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libstdc++.so.6]
0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libm.so.6]
0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libgcc_s.so.1]
0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libc.so.6]
0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [ld-linux-loongarch-lp64d.so.1]
0x000000000000001d (RUNPATH)            Библиотека runpath: [/usr/lib/loongarch64-linux-gnu/gsgpu]
=== ЗАВИСИМОСТИ НОВОГО DRI С ЕГО СТЕКОМ ===
/opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/gsgpu_dri.so: /lib64/libtinfo.so.6: no version information available (required by /opt/loonggpu-lnd25.1/usr/lib/libloong-gpucomp.so.1)
/opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/gsgpu_dri.so: /lib64/libtinfo.so.6: no version information available (required by /lib64/libedit.so.2)
       libgsgpu_glapi.so.0 => /opt/loonggpu-lnd25.1/usr/lib/gsgpu/libgsgpu_glapi.so.0 (0x00007fff9c160000)
       libldrm.so.1 => /opt/loonggpu-lnd25.1/usr/lib/libldrm.so.1 (0x00007fff9c0c0000)
       libloong-gpucomp.so.1 => /opt/loonggpu-lnd25.1/usr/lib/libloong-gpucomp.so.1 (0x00007fff99c00000)
[root@basealt loonggpu-lnd25.1-debs]#  
[root@basealt loonggpu-lnd25.1-debs]# grep -n -B 30 -A 40 \
 'Caught signal 6' \
 /var/log/Xorg.1.log |
tail -n 120

journalctl -b -k \
 --since "$(cat /root/loonggpu-gdm-test-start)" \
 --no-pager |
grep -Ei \
 'loonggpu|gsgpu|timeout|fault|hang|reset|ring|drm'
авг 28 11:21:25 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to gnome-shell for invalid read access from 00005555ed000100
авг 28 11:21:25 basealt.kompas.test kernel: era = 00007fff10f68894 in libEGL_gsgpu.so.0.0.0[18894,7fff10f50000+48000]
авг 28 11:21:25 basealt.kompas.test kernel: ra  = 00007fff10f71ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fff10f50000+48000]
авг 28 11:21:26 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to gnome-session-c for invalid read access from 00005555c9000100
авг 28 11:21:26 basealt.kompas.test kernel: era = 00007fff9ce28894 in libEGL_gsgpu.so.0.0.0[18894,7fff9ce10000+48000]
авг 28 11:21:26 basealt.kompas.test kernel: ra  = 00007fff9ce31ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fff9ce10000+48000]
авг 28 11:21:26 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to mutter-x11-fram for invalid read access from 00005555b8000100
авг 28 11:21:26 basealt.kompas.test kernel: era = 00007fff50c08894 in libEGL_gsgpu.so.0.0.0[18894,7fff50bf0000+48000]
авг 28 11:21:26 basealt.kompas.test kernel: ra  = 00007fff50c11ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fff50bf0000+48000]
авг 28 11:21:27 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 00005555f3000100
авг 28 11:21:27 basealt.kompas.test kernel: era = 00007ffef6c58894 in libEGL_gsgpu.so.0.0.0[18894,7ffef6c40000+48000]
авг 28 11:21:27 basealt.kompas.test kernel: ra  = 00007ffef6c61ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7ffef6c40000+48000]
авг 28 11:21:27 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 0000555661000100
авг 28 11:21:27 basealt.kompas.test kernel: era = 00007fffe46b8894 in libEGL_gsgpu.so.0.0.0[18894,7fffe46a0000+48000]
авг 28 11:21:27 basealt.kompas.test kernel: ra  = 00007fffe46c1ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fffe46a0000+48000]
авг 28 11:21:27 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 000055559f000100
авг 28 11:21:27 basealt.kompas.test kernel: era = 00007fff61038894 in libEGL_gsgpu.so.0.0.0[18894,7fff61020000+48000]
авг 28 11:21:27 basealt.kompas.test kernel: ra  = 00007fff61041ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fff61020000+48000]
авг 28 11:21:27 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 000055565f000100
авг 28 11:21:27 basealt.kompas.test kernel: era = 00007ffef4748894 in libEGL_gsgpu.so.0.0.0[18894,7ffef4730000+48000]
авг 28 11:21:27 basealt.kompas.test kernel: ra  = 00007ffef4751ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7ffef4730000+48000]
авг 28 11:21:28 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 0000555602000100
авг 28 11:21:28 basealt.kompas.test kernel: era = 00007fff3e6d8894 in libEGL_gsgpu.so.0.0.0[18894,7fff3e6c0000+48000]
авг 28 11:21:28 basealt.kompas.test kernel: ra  = 00007fff3e6e1ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fff3e6c0000+48000]
авг 28 11:21:28 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 00005555eb000100
авг 28 11:21:28 basealt.kompas.test kernel: era = 00007fffab1b8894 in libEGL_gsgpu.so.0.0.0[18894,7fffab1a0000+48000]
авг 28 11:21:28 basealt.kompas.test kernel: ra  = 00007fffab1c1ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fffab1a0000+48000]
авг 28 11:21:28 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 00005555fe000100
авг 28 11:21:28 basealt.kompas.test kernel: era = 00007fff13108894 in libEGL_gsgpu.so.0.0.0[18894,7fff130f0000+48000]
авг 28 11:21:28 basealt.kompas.test kernel: ra  = 00007fff13111ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fff130f0000+48000]
[root@basealt loonggpu-lnd25.1-debs]#

Результат однозначный:
Выложил файл
Выложил файл
Выложил файл
Выложил файл

[root@basealt loonggpu-lnd25.1-debs]# journalctl -b -k --since '-5 min' --no-pager |
grep -Ei \
 'loonggpu|gsgpu|fault|hang|timeout|reset|ring|segfault'

grep -Ei \
 'gsgpu|loonggpu|DRI3|renderer|llvmpipe|failed|error|segmentation' \
 /home/basealt/kompas-gsgpu.log |
tail -n 100
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f0081c000
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f00830000
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f008106c0
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f00858000
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f0086c000
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f00880000
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f00895000
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f008a9000
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f008bd000
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f008d1000
авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111
авг 28 11:54:30 basealt.kompas.test kernel: [drm:loonggpu_job_timedout [loonggpu]] *ERROR* ring gfx timeout, signaled seq=391831, emitted seq=391834
авг 28 11:54:30 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU reset begin!
libGL: OpenDriver: trying /usr/lib64/dri/tls/gsgpu_dri.so
libGL: OpenDriver: trying /usr/lib64/dri/gsgpu_dri.so
/usr/share/libldrm/loonggpu.ids version: 1.0.0
libGL: Using DRI3 for screen 0
LLVM failed to compile shader
gsgpu: can't compile a main shader part
LLVM failed to compile shader
gsgpu: can't compile a main shader part
LLVM failed to compile shader
gsgpu: can't compile a main shader part
LLVM failed to compile shader
gsgpu: can't compile a main shader part
LLVM failed to compile shader
Failed to build shader variant (type=1) 1
LLVM failed to compile shader
Failed to build shader variant (type=1) 1
[root@basealt loonggpu-lnd25.1-debs]#

КОМПАС в режиме gsgpu использовать нельзя: драйвер действительно завис на сложных шейдерах и выполнил GPU reset.

Последовательность подтверждена журналом:

КОМПАС загрузил gsgpu_dri.so и libGLX_gsgpu.so.
Шейдер потребовал 103 адресуемых скалярных регистра при пределе драйвера 102.
Компиляция шейдера завершилась ошибкой.
Появились многочисленные VM_CONTEXT1_PROTECTION_FAULT.
Через ровно 10 секунд возник ring gfx timeout.
Драйвер начал GPU reset.

Код 124 здесь не означает успешное завершение: после timeout процесс kKompas с PID 20013 остался работать.

1. Остановите оставшийся процесс

От root:

pid=20013
exe="$(readlink -f "/proc/$pid/exe" 2>/dev/null || true)"

echo "PID=$pid"
echo "EXE=$exe"

case "$exe" in
  */kKompas)
    kill -TERM "$pid"
    sleep 3

    if kill -0 "$pid" 2>/dev/null; then
      kill -KILL "$pid"
    fi
    ;;
  *)
    echo "PID уже завершён или принадлежит другому процессу — не трогаем"
    ;;
esac

Проверьте:

pgrep -a -u basealt -f 'KOMPAS.sh|[/]kKompas'
2. Проверьте результат сброса GPU
journalctl -b -k \
  --since '2026-08-28 11:54:15' \
  --no-pager |
grep -Ei \
  'loonggpu|gsgpu|fault|timeout|reset|ring' |
tail -n 150

Если графический интерфейс сейчас искажён, зависает либо журнал заканчивается только на GPU reset begin, сохраните работу и перезагрузите компьютер. Выгружать loonggpu вручную при работающем Xorg не следует.

3. Запустите КОМПАС через llvmpipe

После восстановления системы запускайте из терминала basealt:

cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1

env \
  DISPLAY=:1 \
  LIBGL_ALWAYS_SOFTWARE=1 \
  MESA_LOADER_DRIVER_OVERRIDE=llvmpipe \
  __GLX_VENDOR_LIBRARY_NAME=mesa \
  __EGL_VENDOR_LIBRARY_FILENAMES=/usr/share/glvnd/egl_vendor.d/50_mesa.json \
  QT_QPA_PLATFORM=xcb \
  QT_XCB_GL_INTEGRATION=xcb_glx \
  ./KOMPAS.sh \
  2>&1 |
tee /home/basealt/kompas-llvmpipe.log

В КОМПАСе установите:

Настройка → Параметры →
Система → Общие → Управление системой
«Качество сглаживания» → «Без сглаживания»;
«Вариант отрисовки» → «Базовый».

После этого полностью перезапустите КОМПАС. Именно такую настройку при проблемах OpenGL рекомендует официальная документация АСКОН. Инструкция КОМПАС-3D v25

Драйвер gsgpu предоставляет только OpenGL 2.1. Это соответствует минимальному требованию КОМПАС — OpenGL 2.0, но рекомендуемая конфигурация требует OpenGL 4.5 и не менее 4 ГБ видеопамяти. У LG100 обнаружено 256 МиБ — в 16 раз меньше 4 ГиБ. АСКОН также отдельно указывает, что стабильная работа на встроенной графике не гарантируется. Аппаратные требования КОМПАС-3D v25

Сначала пришлите журнал завершения GPU reset: до его проверки повторять аппаратный запуск КОМПАС не стоит.

Выложил файл

Сброс GPU не завершился. Драйвер завис внутри процедуры восстановления:

loonggpu_device_gpu_recover
└─ loonggpu_device_ip_suspend_phase1
   └─ dc_suspend

С GPU reset begin прошло минимум 11 минут 24 секунды, а каждые 123 секунды ядро фиксирует зависшие задачи. Ожидать восстановления дальше бессмысленно.

Строку:

echo 0 > /proc/sys/kernel/hung_task_timeout_secs

не выполняйте — она только скроет предупреждения, но не исправит GPU.

Перезагрузите компьютер

Сначала закройте доступные приложения и от root:
Выложил файл
Выложил файл
Выложил файл
Выложил файл
Выложил файл

Результат проверки:

все XML синтаксически корректны;
контрольные суммы успешно рассчитаны — файлы читаются;
сообщения file: Permission denied не отражают общие права доступа, поскольку sha256sum и Python те же файлы прочитали;
пустой вывод grep означает только отсутствие указанных слов в открытом виде;
корректность XML-синтаксиса не исключает логическую ошибку данных или дефект программы.

Теперь нужен тест без содержимого docTemplates. Выполняйте его в графическом терминале пользователя basealt, не от root:

(
  templates=/home/basealt/KOMPAS_LOONG64/KOMPAS/Clang-Release-x64-Linux/Resources/docTemplates
  saved="${templates}.saved-test"
  empty_result="${templates}.empty-test-result"

  if [ -e "$saved" ] || [ -e "$empty_result" ]; then
    echo "Найдены остатки предыдущего теста:"
    ls -ld "$saved" "$empty_result" 2>/dev/null
    exit 1
  fi

  restore_templates()
  {
    [ -d "$templates" ] && mv "$templates" "$empty_result"
    [ -d "$saved" ] && mv "$saved" "$templates"
  }

  trap restore_templates EXIT

  mv "$templates" "$saved"
  install -d -m 0755 "$templates"

  cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1

  kompas_ld="$PWD/Clang-Release-x64-Linux:$PWD/usr/lib/llvm-18/lib:$PWD/lib/loongarch64-linux-gnu"

  timeout 30s env \
    LD_LIBRARY_PATH="$kompas_ld" \
    LIBGL_ALWAYS_SOFTWARE=true \
    GALLIUM_DRIVER=softpipe \
    __GLX_VENDOR_LIBRARY_NAME=mesa \
    __EGL_VENDOR_LIBRARY_FILENAMES=/usr/share/glvnd/egl_vendor.d/50_mesa.json \
    LIBGL_DRIVERS_PATH=/usr/lib64/X11/modules/dri:/usr/lib64/dri \
    MESA_GL_VERSION_OVERRIDE=2.1 \
    QT_QPA_PLATFORM=xcb \
    QT_XCB_GL_INTEGRATION=xcb_glx \
    ./Clang-Release-x64-Linux/kKompas \
    > /home/basealt/kompas-empty-templates.log 2>&1

  rc=$?
  echo "Код теста: $rc"
  tail -n 120 /home/basealt/kompas-empty-templates.log
)

Результат трактуется так:

124 — КОМПАС работал все 30 секунд; неисправность связана с одним из файлов docTemplates.
134 и std::bad_alloc — ошибка находится в коде обработки системных путей/шаблонов, а не в XML.
другой код — понадобится его значение и последние строки журнала.

Оригинальный docTemplates автоматически вернётся на место.

Выложил файл
не упал после входа в настройки

Результат подтверждён: docTemplates необходим для воспроизведения падения. При пустом каталоге настройки открываются и процесс работает до тайм-аута (124).

Также подтверждено, что отсутствующие UI_AppPaths.config и UI_Shortcuts.config сами по себе не вызывают bad_alloc: предупреждения остались, но программа не упала.
Точный триггер найден: spw.xml самостоятельно вызывает std::bad_alloc при открытии параметров. Сам XML синтаксически корректен, поэтому это ошибка обработки его содержимого LoongArch-сборкой КОМПАС.

Сделаем обратимый рабочий вариант — перенесём только spw.xml за пределы docTemplates:

templates=/home/basealt/KOMPAS_LOONG64/KOMPAS/Clang-Release-x64-Linux/Resources/docTemplates
disabled=/home/basealt/KOMPAS_LOONG64/KOMPAS/disabled-docTemplates

install -d -m 0755 "$disabled"

if [ -e "$disabled/spw.xml" ]; then
  echo "Резервный spw.xml уже существует:"
  ls -l "$disabled/spw.xml"
else
  mv "$templates/spw.xml" "$disabled/spw.xml"
fi

echo '=== АКТИВНЫЕ ШАБЛОНЫ ==='
ls -l "$templates"

echo '=== ОТКЛЮЧЁННЫЙ ШАБЛОН ==='
ls -l "$disabled/spw.xml"

Теперь финальная проверка со всеми файлами, кроме spw.xml. Выполните от basealt, откройте параметры и подождите:

cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1

kompas_ld="$PWD/Clang-Release-x64-Linux:$PWD/usr/lib/llvm-18/lib:$PWD/lib/loongarch64-linux-gnu"

timeout 60s env \
  LD_LIBRARY_PATH="$kompas_ld" \
  LIBGL_ALWAYS_SOFTWARE=true \
  GALLIUM_DRIVER=softpipe \
  __GLX_VENDOR_LIBRARY_NAME=mesa \
  __EGL_VENDOR_LIBRARY_FILENAMES=/usr/share/glvnd/egl_vendor.d/50_mesa.json \
  LIBGL_DRIVERS_PATH=/usr/lib64/X11/modules/dri:/usr/lib64/dri \
  MESA_GL_VERSION_OVERRIDE=2.1 \
  QT_QPA_PLATFORM=xcb \
  QT_XCB_GL_INTEGRATION=xcb_glx \
  ./Clang-Release-x64-Linux/kKompas \
  > /home/basealt/kompas-without-spw.log 2>&1

rc=$?
echo "Код финального теста: $rc"

grep -Ei \
  'bad_alloc|Аварий|Aborted|Ошибка сегментирования|failed|Не удалось' \
  /home/basealt/kompas-without-spw.log |
tail -n 100

Если результат 124, обходное решение подтверждено. Недоступен будет только тип шаблона, описанный spw.xml; остальные восемь XML останутся активны.

Чтобы исследовать, какое поле spw.xml вызывает ошибку, покажите его содержимое:

nl -ba \
  /home/basealt/KOMPAS_LOONG64/KOMPAS/disabled-docTemplates/spw.xml |
sed -n '1,260p'

Вернуть файл можно командой:

mv \
  /home/basealt/KOMPAS_LOONG64/KOMPAS/disabled-docTemplates/spw.xml \
  /home/basealt/KOMPAS_LOONG64/KOMPAS/Clang-Release-x64-Linux/Resources/docTemplates/spw.xml
работает. давай поправим параметры и запустим с другой графикой

Теперь переключаемся с однопоточного softpipe на многопоточный программный llvmpipe. Аппаратный gsgpu для КОМПАС пока не используем из-за уже подтверждённого зависания GPU.

1. Сохраняем безопасные параметры КОМПАС

Запустите от basealt через softpipe:

cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1

kompas_ld="$PWD/Clang-Release-x64-Linux:$PWD/usr/lib/llvm-18/lib:$PWD/lib/loongarch64-linux-gnu"

env \
  LD_LIBRARY_PATH="$kompas_ld" \
  LIBGL_ALWAYS_SOFTWARE=true \
  GALLIUM_DRIVER=softpipe \
  __GLX_VENDOR_LIBRARY_NAME=mesa \
  __EGL_VENDOR_LIBRARY_FILENAMES=/usr/share/glvnd/egl_vendor.d/50_mesa.json \
  LIBGL_DRIVERS_PATH=/usr/lib64/X11/modules/dri:/usr/lib64/dri \
  MESA_GL_VERSION_OVERRIDE=2.1 \
  QT_QPA_PLATFORM=xcb \
  QT_XCB_GL_INTEGRATION=xcb_glx \
  ./Clang-Release-x64-Linux/kKompas

В КОМПАС откройте:

Настройка
→ Параметры
→ Система
→ Общие
→ Управление системой

Установите:

Качество сглаживания: Без сглаживания
Вариант отрисовки: Базовый

Нажмите «ОК» и полностью закройте КОМПАС. Согласно документации АСКОН, эти параметры применяются только после перезапуска. Инструкция КОМПАС-3D v25

2. Проверяем llvmpipe
cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1

kompas_ld="$PWD/Clang-Release-x64-Linux:$PWD/usr/lib/llvm-18/lib:$PWD/lib/loongarch64-linux-gnu"

env \
  LD_LIBRARY_PATH="$kompas_ld" \
  LIBGL_ALWAYS_SOFTWARE=true \
  GALLIUM_DRIVER=llvmpipe \
  __GLX_VENDOR_LIBRARY_NAME=mesa \
  LIBGL_DRIVERS_PATH=/usr/lib64/X11/modules/dri:/usr/lib64/dri \
  glxinfo -B |
grep -E \
  'direct rendering|Vendor:|Device:|Accelerated:|OpenGL vendor|OpenGL renderer|OpenGL version'

Ожидаемый признак:

OpenGL renderer string: llvmpipe
Accelerated: no

Здесь Accelerated: no означает отсутствие аппаратного GPU, но llvmpipe использует несколько потоков CPU и обычно быстрее softpipe.

3. Запускаем КОМПАС через llvmpipe
cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1

kompas_ld="$PWD/Clang-Release-x64-Linux:$PWD/usr/lib/llvm-18/lib:$PWD/lib/loongarch64-linux-gnu"

timeout 90s env \
  LD_LIBRARY_PATH="$kompas_ld" \
  LIBGL_ALWAYS_SOFTWARE=true \
  GALLIUM_DRIVER=llvmpipe \
  __GLX_VENDOR_LIBRARY_NAME=mesa \
  __EGL_VENDOR_LIBRARY_FILENAMES=/usr/share/glvnd/egl_vendor.d/50_mesa.json \
  LIBGL_DRIVERS_PATH=/usr/lib64/X11/modules/dri:/usr/lib64/dri \
  QT_QPA_PLATFORM=xcb \
  QT_XCB_GL_INTEGRATION=xcb_glx \
  ./Clang-Release-x64-Linux/kKompas \
  2>&1 |
tee /home/basealt/kompas-llvmpipe.log

rc=${PIPESTATUS[0]}
echo "Код kKompas: $rc"

Во время теста откройте параметры и любой документ:

124 — КОМПАС проработал все 90 секунд;
0 — закрыт нормально;
134 — снова возникло необработанное исключение.

spw.xml пока должен оставаться в disabled-docTemplates. Если llvmpipe пройдёт тест, следующим шагом закрепим этот режим в отдельном постоянном скрипте запуска.

124 давай попробуем с другой графикой

llvmpipe стабилен. Следующий безопасный вариант — zink: OpenGL преобразуется в Vulkan, а Vulkan выполняется программным lavapipe. Это другой графический путь, но он не задействует проблемный LG100.

Сначала найдём совместимые компоненты:

cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1

echo '=== ZINK В КОМПЛЕКТЕ КОМПАС ==='

find \
  "$PWD/lib/loongarch64-linux-gnu" \
  "$PWD/Clang-Release-x64-Linux" \
  \( -type f -o -type l \) \
  -name 'zink_dri.so' \
  -print 2>/dev/null

echo '=== СИСТЕМНЫЙ ZINK ==='

find \
  /usr/lib64 \
  /usr/lib \
  \( -type f -o -type l \) \
  -name 'zink_dri.so' \
  -print 2>/dev/null

echo '=== VULKAN LAVAPIPE ICD ==='

find \
  /usr/share/vulkan/icd.d \
  /etc/vulkan/icd.d \
  -type f \
  \( -iname '*lvp*.json' -o -iname '*lavapipe*.json' \) \
  -print 2>/dev/null

echo '=== ВСЕ VULKAN ICD ==='

find \
  /usr/share/vulkan/icd.d \
  /etc/vulkan/icd.d \
  -type f \
  -name '*.json' \
  -print \
  -exec sed -n '1,80p' {} \; \
  2>/dev/null

Mesa документирует MESA_LOADER_DRIVER_OVERRIDE=zink как штатный способ выбора Zink; lavapipe является программным Vulkan-растеризатором на базе LLVMpipe. Переменные Mesa, структура драйверов Mesa

Пришлите вывод. Важно подобрать zink_dri.so той же версии Mesa, которую загружает КОМПАС. Смешивать его встроенную Mesa 25.0.3 с системным модулем Mesa 25.3.6 без проверки нельзя.

Аппаратный gsgpu следующим не запускаем: ранее КОМПАС уже вызвал через него VM fault, ring gfx timeout и зависший GPU reset.
```
:::