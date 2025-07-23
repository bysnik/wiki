# Docker

это платформа для разработки, доставки и запуска приложений в контейнерах.

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