# Moxa

<ImageZoom src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3DJ5sxVltBPCZXaTa_3G4Bcbk74zBjEnyrHfGqE7l-S4TzUXt7zUNwa8&s=10" />

# Устновка Real TTY Linux Kernel 6.x Driver в Альт

https://www.moxa.com/en/support/product-support/software-and-documentation/search?psid=148613

1. Скачайте драйвер: https://cdn-cms-frontdoor-dfc8ebanh6bkb3hs.a02.azurefd.net/getmedia/c1b228ac-3fc5-4612-bb49-99cbcc140ebe/moxa-real-tty-linux-kernel-6.x-driver-driver-v6.2.tar

2. Установите следующие пакеты:
```bash
apt-get install gcc make binutils gawk openssl libssl-devel
```

2. Перейдите в каталог `moxa-real-tty-linux-kernel-6.x-driver-driver-v6.2/moxa/` под пользователем `root` и запустите установку:
```bash
./mxinst
```