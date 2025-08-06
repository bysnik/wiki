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

## Настройка подключение клинта Docker к репозиторию по HTTP

На клиенте, отредактируйте файла /etc/docker/daemon.json Нужно добавить блок с примерным содержимым:

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

Для запуска docker демона от пользователя можно использовать пакет docker-engine-rootless. Установить его можно следующей командой:
```bash
apt-get install docker-engine-rootless
```
Далее нужно настроить запуск демона от пользователя:
```bash
$ dockerd-rootless-setuptool.sh install
```
И экcпортировать переменную DOCKER_HOST:
```bash
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock
```
Последнюю строку можно добавить, в файл из которого шелл инициализирует переменные, например, в ~/.bash_profile, если используется bash. 