# Matrix + Synapse + Element

Немного доработанная версия этой инструкции: https://www.dmosk.ru/scripts.php?object=compose-matrix-synapse

## Пример docker-compose для развертывания сервера Matrix Synapse

В данной инструкции рассматривается пошаговая настройка сервера **Matrix Synapse** с использованием **Docker** и **docker-compose**.

Предполагается, что [Docker](docker) и [docker-compose](docker) уже установлены.

Развертываемый стек включает следующие компоненты:

1. **synapse-app** — сервер Matrix Synapse.
2. **synapse-db** — база данных PostgreSQL 16.
3. **element** — веб-клиент Element.
4. **nginx** — обратный прокси для маршрутизации трафика и поддержки HTTPS.
5. **synapse-admin** — административная веб-панель.

## Подготовка рабочей директории

Создадим каталог для размещения всех файлов проекта:

```bash
mkdir -p /opt/matrix
```
```bash
cd /opt/matrix
```

## Файл `docker-compose.yml`

Создадим основной файл оркестрации:

```bash
vi docker-compose.yml
```

Содержимое файла:

```yaml
services:

  synapse-app:
    image: matrixdotorg/synapse:latest
    container_name: synapse-app
    hostname: synapse-app
    restart: unless-stopped
    environment:
      TZ: "Europe/Moscow"
      SYNAPSE_CONFIG_PATH: /data/homeserver.yaml
    volumes:
      - ./synapse_data:/data
    depends_on:
      - synapse-db
 
  synapse-db:
    image: docker.io/postgres:16-alpine
    container_name: synapse-db
    hostname: synapse-db
    restart: unless-stopped
    environment:
      TZ: "Europe/Moscow"
      POSTGRES_USER: synapse
      POSTGRES_PASSWORD: synapse_password-123
      POSTGRES_INITDB_ARGS: --encoding=UTF-8 --lc-collate=C --lc-ctype=C
    volumes:
      - ./pgsql_data:/var/lib/postgresql/data
 
  element:
    image: vectorim/element-web:latest
    hostname: element
    container_name: element
    restart: unless-stopped
    environment:
      TZ: "Europe/Moscow"
    volumes:
      - ./element_data/config.json:/app/config.json
 
  nginx:
    image: nginx
    hostname: nginx
    container_name: nginx
    restart: unless-stopped
    depends_on:
      - synapse-app
      - element
    environment:
      TZ: "Europe/Moscow"
    ports:
      - 80:80
    volumes:
      - ./nginx_data/conf.d/element.conf:/etc/nginx/conf.d/element.conf
```

## Генерация конфигурации Synapse

Перед запуском нужно сгенерировать базовый конфигурационный файл `homeserver.yaml`.

```bash
docker run -it --rm -v ./synapse_data:/data \
    -e SYNAPSE_SERVER_NAME=matrix.dmosk.ru \
    -e SYNAPSE_REPORT_STATS=no matrixdotorg/synapse:latest generate
```

> **Важно:** `matrix.example.local` — это доменное имя вашего сервера. Замените его на реальное, если будете использовать публичный домен.

Теперь отредактируем файл:

```bash
vi synapse_data/homeserver.yaml
```

Найдите секцию `database` и замените её на следующую:

```yaml
database:
  name: psycopg2
  txn_limit: 10000
  args:
    user: synapse
    password: synapse_password-123
    database: synapse
    host: synapse-db
    port: 5432
    cp_min: 5
    cp_max: 10
```

## Настройка веб-клиента Element

Создадим каталог и скачаем конфигурацию:

```bash
mkdir -p element_data
```
```bash
curl -sL https://develop.element.io/config.json -o element_data/config.json
```

## Настройка Nginx

Создадим структуру каталогов:

```bash
mkdir -p nginx_data/conf.d
```

Создадим конфигурационный файл:

```bash
vi nginx_data/conf.d/element.conf
```

Содержимое:

```nginx
server {
    listen       80 default_server;
    #listen       443 ssl default_server;
    #listen       8448 ssl default_server;
    server_name  matrix.example.local;

    location ~ /.well-known {
        root /usr/share/nginx/html;
        allow all;
    }

    #ssl_certificate     cert.pem;
    #ssl_certificate_key cert.pem;

    #if ($scheme = 'http') {
        #return 301 https://$host$request_uri;
    #}

    location / {
        proxy_pass         http://element;
        proxy_redirect     off;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    }

    location ~ ^(/_matrix|/_synapse/) {
        proxy_pass http://synapse-app:8008;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $host;
        client_max_body_size 100M;
        proxy_http_version 1.1;
    }
}
```

## Первый запуск

Запустим стек:

```bash
docker-compose up -d
```

Проверим доступность:

```bash
curl -s http://localhost | head -n 5
```

Если возвращается HTML-код — всё работает.

## Создание первого пользователя

Создадим администратора через контейнер Synapse:

```bash
docker exec -it synapse-app register_new_matrix_user -c /data/homeserver.yaml http://localhost:8008
```

Следуйте инструкциям:

```
New user localpart [root]: admin
Password: ********
Confirm password: ********
Make admin [no]: yes
```

Вы увидите:

```
Success!
```

## Настройка HTTPS с Let's Encrypt

### 1. Обновим `docker-compose.yml`

Убедитесь, что в сервисе `nginx` пробрасываются порты **80** и **443**, а также тома:

```yaml
  ...
  nginx:
    ...
    ports:
      - 80:80
      - 443:443
    volumes:
      - ./nginx_data/conf.d/element.conf:/etc/nginx/conf.d/element.conf
      - ./nginx_data/well-known:/usr/share/nginx/html
      - /opt/letsencrypt:/etc/letsencrypt
```

### 2. Перезапустим nginx

```bash
docker-compose up -d nginx
```

### 3. Получим сертификат

```bash
docker run -it --rm --name certbot \
    -v "/opt/letsencrypt:/etc/letsencrypt" \
    -v "/opt/matrix/nginx_data/well-known:/usr/share/nginx/html" \
    certbot/certbot certonly --webroot --agree-tos --email postmaster@example.local \
    --webroot-path /usr/share/nginx/html/ -d matrix.example.local
```

### 4. Обновим конфигурацию Nginx

Отредактируем `nginx_data/conf.d/element.conf`:

```nginx
server {
    listen       80 default_server;
    listen       443 ssl default_server;
    listen       8448 ssl default_server;
    server_name  matrix.example.local;

    location ~ /.well-known {
        root /usr/share/nginx/html;
        allow all;
    }

    ssl_certificate     /etc/letsencrypt/live/matrix.example.local/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/matrix.example.local/privkey.pem;

    if ($scheme = 'http') {
        return 301 https://$host$request_uri;
    }
    ...
```

### 5. Перезагрузим Nginx

```bash
docker exec nginx sh -c "nginx -t && nginx -s reload"
```

Теперь сервер доступен по **https://matrix.example.local**.

## Установка административной панели Synapse Admin

Для быстрого управления аккаунтами Matrix может быть использована админ-консоль **synapse-admin**. Загружаем соответствующий проект:

git clone https://github.com/Awesome-Technologies/synapse-admin.git admin_data

### 1. Добавим сервис в `docker-compose.yml`

Добавьте в конец файла:

```yaml
  synapse-admin:
    container_name: synapse-admin
    hostname: synapse-admin
    image: awesometechnologies/synapse-admin:latest
    build:
      context: admin_data/.
      args:
        - REACT_APP_SERVER=https://matrix.domain.ru
        - BASE_PATH=/admin
    restart: unless-stopped
    environment:
      TZ: "Europe/Moscow"
```


### 2. Обновим Nginx

Добавим в `element.conf` (внутри блока `server` для 443):

```nginx
    location /admin {
        proxy_pass http://synapse-admin/;
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}
```

### 3. Перезапустим стек

```bash
docker exec nginx sh -c "nginx -t && nginx -s reload"
```

Теперь админка доступна по:  
**https://matrix.example.local/admin/**

Войдите под созданным ранее администратором.

### 4. Перезапускаем все сервисы

```bash
docker-compose up -d --build
```

## Заключение

Вы успешно развернули:

- Сервер Matrix Synapse с PostgreSQL 16  
- Веб-клиент Element  
- Обратный прокси Nginx с поддержкой HTTPS  
- Административную панель Synapse Admin  

> **Важно:** Для публичного использования замените `matrix.example.local` на реальный домен и настройте DNS. 
