# Moxa

![](https://cdn.moxa.ru.com/r/d5x9lvQWns4/rs:fit:740:0:1/q:100/plain/files/1/347/37314907/original/moxa_kollaj.jpg@jpg)

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