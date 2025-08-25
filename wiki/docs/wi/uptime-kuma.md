---
outline: deep
---

# Uptime Kuma

<!--<img src="https://github.com/louislam/uptime-kuma/raw/master/public/icon.svg" width="200"/>-->

<img src="https://user-images.githubusercontent.com/1336778/212262296-e6205815-ad62-488c-83ec-a5b0d0689f7c.jpg" width="700" alt="" />

https://github.com/louislam/uptime-kuma?tab=readme-ov-file


## 🔧 Установка

### 🐳 Docker

```bash
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:1
```

Uptime Kuma теперь запущена и доступна по адресу `http://0.0.0.0:3001`.

> [!WARNING]
> Файловые системы типа **NFS** (Network File System) **НЕ** поддерживаются. Пожалуйста, используйте локальный каталог или том.

> [!NOTE]
> Если вы хотите ограничить доступ только localhost (без открытия порта для других пользователей или для использования [обратного прокси](https://github.com/louislam/uptime-kuma/wiki/Reverse-Proxy)), вы можете пробросить порт следующим образом:
>
> ```bash
> docker run -d --restart=always -p 127.0.0.1:3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:1
> ```

### 💪🏻 Установка без Docker

Установка зависимостей:
```bash
apt-get install node npm git 

npm install pm2 -g
```

Запуск приложения:

```bash
git clone https://github.com/louislam/uptime-kuma.git
cd uptime-kuma
npm run setup

# Вариант 1. Запустить для проверки
node server/server.js

# (Рекомендуется) Вариант 2. Запустить в фоновом режиме с помощью PM2
# Установите PM2, если у вас его нет:
npm install pm2 -g && pm2 install pm2-logrotate

# Запуск сервера
pm2 start server/server.js --name uptime-kuma
```

Uptime Kuma теперь запущена и доступна по адресу `http://localhost:3001`

Полезные команды PM2

```bash
# Чтобы посмотреть вывод консоли в реальном времени
pm2 monit

# Чтобы добавить в автозагрузку
pm2 save && pm2 startup
```

### Расширенные варианты установки

Если вам нужны дополнительные опции или вы хотите использовать обратный прокси, ознакомьтесь с руководством:

https://github.com/louislam/uptime-kuma/wiki/%F0%9F%94%A7-How-to-Install
