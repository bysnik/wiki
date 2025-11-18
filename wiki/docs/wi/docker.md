# Docker

![](https://1000logos.net/wp-content/uploads/2021/11/Docker-Logo-2015.png)

Docker – это открытая платформа для разработки, доставки и запуска приложений. Состоит из утилиты командной строки docker, которая вызывает одноименный сервис (сервис является потенциальной единой точкой отказа) и требует права доступа root. По умолчанию использует в качестве Container Runtime runc. Все файлы Docker (образы, контейнеры и др.) по умолчанию хранятся в каталоге /var/lib/docker.


## Установка Docker

Установка Docker и Docker Compose:
```bash
apt-get install docker-engine docker-compose
```

Для запуска Docker от пользователя (не root) следует выполнить несколько шагов:

Добавить пользователя в группу `docker`;
```bash
usermod ИМЯ_ПОЛЬЗОВАТЕЛЯ -aG docker
```

Выполнить повторный вход в систему.

Запуск сервиса docker:
```bash
systemctl enable --now docker
```

## Настройка подключения клиента Docker к репозиторию по HTTP

На клиенте, отредактируйте файла `/etc/docker/daemon.json` Нужно добавить блок с примерным содержимым:

```json
{
"insecure-registries" : ["myregistrydomain.com:5000", "0.0.0.0"]
}

```

Далее перезагружаем Docker:
```bash
systemctl restart docker
```

## Rootless

Для запуска docker демона от пользователя можно использовать пакет `docker-engine-rootless`. Установить его можно следующей командой:
```bash
apt-get install docker-engine-rootless
```
Далее нужно настроить запуск демона от пользователя:
```bash
$ dockerd-rootless-setuptool.sh install
```
И экcпортировать переменную `DOCKER_HOST`:
```bash
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock
```
Последнюю строку можно добавить, в файл из которого шелл инициализирует переменные, например, в `~/.bash_profile`, если используется `bash`. 


## Простейший репозиторий Docker в контейнере

```bash
docker run -d -p 5000:5000 --name my-registry registry:2
```


## Создание базового образа Docker на базе tar.xz образа Альт

Заходим на сайт https://ftp.altlinux.org/pub/distributions/ALTLinux/p11/images/cloud/x86_64/ или https://download.basealt.ru/pub/distributions/ALTLinux/p11/images/cloud/x86_64/ и скачиваем необходимый образ, например `alt-p11-rootfs-minimal-x86_64.tar.xz` (Архитектуру выбирайте по своему вкусу).

Далее, создаём рабочую директорию:
```bash
mkdir -p workdir && cd workdir
```

Распаковываем скаченный архив:
```bash
mkdir -p my-rootfs && tar -xf alt-p11-rootfs-minimal-x86_64.tar.xz -C alt-rootfs
```

Создаём Dockerfile:
```Dockerfile
FROM scratch
COPY alt-rootfs/ /
CMD ["/bin/bash"]
```

Производим сборку образа:
```bash
docker build -t altlinux:p11 .
```

Проверка работы образа:
```bash
docker run -it altlinux:p11 /bin/bash
```

## Docker Desktop

![](https://lh7-qw.googleusercontent.com/docsz/AD_4nXcJUyHMeleX4bZxoPwzJazF7wNsJEBRZR7Cu-fZEXebsi5Z4bnUpxda07yLkHN2OgpSLFEezCPG4hq3vVLAK1Sk-59E_2tJ2hqDQgR3sN2ExnSKu3EqRsiQESojTBn1TNTFaklM?key=5K-4atmrx18Kq4xriCXX3JiH)

https://docs.docker.com/desktop/troubleshoot-and-support/faqs/linuxfaqs/

```bash
epm play docker-desktop
```

```bash
grep "$USER" /etc/subuid >> /dev/null 2&>1 || (echo "$USER:100000:65536" | sudo tee -a /etc/subuid)
```
```bash
grep "$USER" /etc/subgid >> /dev/null 2&>1 || (echo "$USER:100000:65536" | sudo tee -a /etc/subgid)
```

```bash
apt-get install shadow-submap
```

```bash
control newgidmap public
```
```bash
control newuidmap public
```
Ну, ошибок больше нет, но Docker Engine тупо не стартует

## Непроверенное

### Создание собственного базового образа ОС с помощью tar

Работа должна выполняться в системе, из которой мы сделаем образ. Набор команд одинаковый и не зависит от дистрибутива Linux. При желании, мы можем заранее установить необходимые инструменты или наоборот, чтобы образ занимал меньше места, удалить некоторые пакеты и файлы.

После вводим команду:
```bash
tar --numeric-owner --exclude=/proc --exclude=/sys -cf alt-base.tar /
```

*где `alt-base.tar` будет именем tar-файла с нашей системой. В него попадет содержимое всех каталогов, кроме `/proc` и `/sys`.

И создаем образ:
```bash
cat alt-base.tar | docker import - alt-base:11.1
```
*где `alt-base.tar` — созданный тарбол; `alt-base:11.1` — имя образа, который будет создан.

Проверяем:
```bash
docker images
```