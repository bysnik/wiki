# RustDesk

![](https://user-images.githubusercontent.com/71636191/170487506-8ef1f025-ad42-47f9-8d82-b49d0ec759ad.png)

RustDesk — это бесплатное, открытое и кроссплатформенное решение для удалённого рабочего стола, позволяющее пользователям подключаться к другим компьютерам через интернет или локальную сеть с минимальной настройкой; оно обеспечивает низкую задержку, шифрование трафика и поддерживает такие функции, как передача файлов, управление несколькими мониторами и проброс через NAT, при этом не требуя централизованных серверов — хотя при желании можно развернуть собственный сервер для полного контроля над соединениями.

## Устнановка клиента

```bash
apt-get install rustdesk
```

## Установка сервера

Как работает саморазмещаемый сервер?

Технически существует два исполняемых файла (сервера):

- **hbbs** — сервер идентификаторов RustDesk (rendezvous / сигнализации). Слушает TCP-порты (21114 — для HTTP в версии Pro, 21115, 21116, 21118 для WebSocket) и UDP-порт 21116.  
- **hbbr** — ретрансляционный сервер RustDesk. Слушает TCP-порты 21117 и 21119 (для WebSocket).

При установке с помощью скрипта, через Docker Compose или пакет .deb обе службы устанавливаются одновременно.

Ниже приведены схемы взаимодействия клиентов RustDesk с серверами hbbr и hbbs.

Пока RustDesk запущен на компьютере, этот компьютер постоянно отправляет пинги на сервер идентификаторов (hbbs), сообщая ему свой текущий IP-адрес и порт.

Когда вы инициируете подключение с компьютера A к компьютеру B, компьютер A обращается к серверу идентификаторов и запрашивает установление связи с компьютером B.

Сервер идентификаторов пытается напрямую соединить A и B, используя метод «пробивания NAT» (hole punching).

Если пробивание NAT не удаётся, то A будет взаимодействовать с B через ретрансляционный сервер (hbbr).

В большинстве случаев пробивание NAT проходит успешно, и ретрансляционный сервер вообще не задействуется.

См. также обсуждение на тему: «Стоит ли размещать собственный сервер RustDesk?»

**Необходимые порты**

Перечень портов, требуемых для саморазмещения сервера RustDesk, во многом зависит от вашей среды и задач, которые вы хотите решать с помощью RustDesk. В примерах документации, как правило, рекомендуется открывать все упомянутые порты.

**Основные порты:**  
- TCP 21114–21119  
- UDP 21116

Порты 21115–21117 являются минимально необходимыми для работы RustDesk — они используются для сигнализации, ретрансляции и прохождения NAT.

Порты TCP 21118 и 21119 — это WebSocket-порты для веб-клиента RustDesk. Чтобы обеспечить поддержку HTTPS, вам понадобится обратный прокси (reverse proxy). См. пример конфигурации Nginx.

Для пользователей Pro: если у вас нет SSL-прокси, необходимо открыть TCP-порт 21114 для работы API. Альтернативно, при использовании SSL-прокси можно открыть стандартный порт TCP 443.

https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/docker/

### Docker

```bash
docker image pull rustdesk/rustdesk-server
docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```

### Docker compose

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

::: tip
Получилось всё слишком легко. Главное, хотя бы разок запустить docker compose up и из логов загрузки вытащить Ключ для подключения
:::

### Podman Quadlet

Если вы хотите запускать контейнеры с помощью Podman как systemd сервисы, вы можете использоватть эти примеры Podman Quadlet конфигураций:
```systemd
[Container]
AutoUpdate=registry
Image=ghcr.io/rustdesk/rustdesk-server:latest
Exec=hbbs
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```
или
```systemd
[Container]
AutoUpdate=registry
Image=ghcr.io/rustdesk/rustdesk-server:latest
Exec=hbbr
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```

## SctgDesk Server

https://github.com/sctg-development/sctgdesk-server

Это модифицированная версия RustDesk Server, которая является бесплатной и имеет открытый исходный код.

*   Первое отличие заключается в том, что эта версия включает в себя новую *протокол tcp* режим включен в версию RustDesk Server Pro.
*   Второе отличие заключается в том, что эта версия включает в себя предварительную реализацию сервера API Rustdesk Server Pro.
    *   Поддержка персональной адресной книги
    *   Поддержка общей адресной книги на уровне группы
        *   Только для чтения, Чтение-запись, Admin
    *   Поддержка общей адресной книги на уровне пользователя
        *   Только для чтения, Чтение-запись, Admin
*   Третье отличие заключается в том, что эта версия включает в себя предварительную реализацию простой веб-консоли.

Веб-консоль доступна по адресу `http://<server-ip>:21114/` с логином "admin" и паролем "Hello,world!".

### Docker compose

Вы можете использовать следующие `docker-compose.yml` Файл для запуска сервера:

```yaml
version: '3'

networks:
  sctgdesk-net:
    external: false

services:
  hbbs:
    container_name: hbbs
    ports:
      - 21114:21114
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21118:21118
    image: sctg/sctgdesk-server:latest
    command: hbbs -r sctgdesk.example.com:21117
    volumes:
      - ./data:/usr/local/share/sctgdesk
    networks:
      - sctgdesk-net
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    ports:
      - 21117:21117
      - 21119:21119
    image: sctg/sctgdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/usr/local/share/sctgdesk
    networks:
      - sctgdesk-net
    restart: unless-stopped
```

и запустите сервер с:

```bash
mkdir -p data
docker-compose up 
```

### Пользователь admin по умолчанию

Пользователь admin по умолчанию создается с именем пользователя `admin` и пароль `Hello,world!`. Вы можете изменить пароль после первого входа в веб-консоль.
