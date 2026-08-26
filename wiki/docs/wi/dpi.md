# DPI

**DPI (Deep Packet Inspection — глубокая проверка пакетов)** — это технология анализа сетевого трафика, при которой инспектируется не только заголовок пакета (IP-адреса, порты, протокол), но и **содержимое полезной нагрузки (payload)** на уровне прикладного уровня (L7 модели OSI). В отличие от традиционных межсетевых экранов, которые работают на уровнях L3–L4 и принимают решения на основе IP и портов, DPI способен распознавать конкретные приложения, сервисы, команды и даже типы данных внутри трафика — например, отличить видеопоток YouTube от обычного HTTPS-трафика, обнаружить торрент-сессию или выявить попытку передачи конфиденциальной информации.

**Как это работает?**  
DPI-система перехватывает сетевые пакеты, собирает их в логические потоки (flows), восстанавливает сессии (например, HTTP-запросы или TLS-рукопожатия) и применяет к ним набор правил или сигнатур. Эти правила могут быть основаны на:
- **Строковых шаблонах** (например, поиск "User-Agent: BitTorrent" в заголовках),
- **Поведенческих паттернах** (характерный обмен пакетами у мессенджеров),
- **Анализе метаданных** (SNI в TLS, JA3-фингерпринты, DNS-запросы),
- **Машинном обучении** (в продвинутых системах).

Если трафик соответствует критериям блокировки (например, обнаружен запрещённый сервис), DPI-система может **отбросить пакет**, **перенаправить его**, **ограничить пропускную способность** или **записать в лог** для дальнейшего анализа.

**Где применяется DPI?**  
Технология широко используется интернет-провайдерами для тарификации (например, «безлимит на YouTube»), корпорациями — для контроля за использованием ресурсов и защиты от утечек данных, а также в системах кибербезопасности (IDS/IPS) для обнаружения вредоносного трафика. Однако эффективность DPI снижается при массовом переходе на **шифрование (HTTPS, TLS 1.3)**, так как содержимое пакетов становится недоступным для анализа. В таких случаях DPI вынужден полагаться на косвенные признаки — например, доменное имя из SNI (Server Name Indication) или поведение соединения.

https://packages.altlinux.org/ru/p11/binary/libnDPI/x86_64/2705258196539121831

https://github.com/ntop/nDPI

ntopng

Netify 

[Сетевой трафик]
        ↓
[iptables + NFQUEUE] → перенаправляет пакеты в userspace
        ↓
[Suricata https://packages.altlinux.org/ru/p11/binary/suricata/x86_64/] → DPI-анализ
        ↓
[Решение: DROP / ACCEPT]
        ↓
[iptables] ← управление через NFQUEUE или динамические правила


https://docs.securityonion.net/en/2.4/getting-started.html - как замена сборки ниже


## Suricata (в режиме IPS) + NFQUEUE + iptables


## 🔧 Шаг 1: Установка Suricata

```bash
sudo apt-get install suricata 
```


Проверьте версию:
```bash
suricata --build-info
```

Убедитесь, что поддерживается **NFQUEUE**:
```bash
suricata --build-info | grep NFQ
# Должно быть: NFQ support:                       yes
```

---

## 🔧 Шаг 2: Настройка Suricata для работы в режиме IPS через NFQUEUE

### 2.1 Резервная копия конфига
```bash
sudo cp /etc/suricata/suricata.yaml /etc/suricata/suricata.yaml.bak
```

### 2.2 Отредактируйте основной конфиг

Откройте файл:
```bash
sudo nano /etc/suricata/suricata.yaml
```

#### 🔹 Найдите секцию `af-packet` и **закомментируйте или удалите** её (мы не будем использовать AF_PACKET, так как трафик приходит через NFQUEUE).

#### 🔹 Найдите секцию `outputs` и **включите NFQUEUE**

Пример:
```yaml
outputs:
  - console:
      enabled: no
  - file:
      enabled: no
  - eve-log:
      enabled: no
  - stats:
      enabled: no
  - nfq:
      enabled: yes
      queue: 0
      # По умолчанию: если правило с action "drop", пакет будет отброшен
```

> `queue: 0` — номер очереди NFQUEUE, с которой будет работать Suricata.

#### 🔹 Отключите ненужные логи (опционально, для производительности)

```yaml
logging:
  default-log-level: warning
```

#### 🔹 Убедитесь, что включена поддержка протоколов

По умолчанию включены HTTP, TLS, DNS и др. Проверьте:
```yaml
app-layer:
  protocols:
    tls:
      enabled: yes
    http:
      enabled: yes
    dns:
      enabled: yes
```

---

## 🔧 Шаг 3: Создание правил DPI (локальные правила)

Suricata использует правила в формате Snort. Мы создадим свои.

### 3.1 Создайте файл локальных правил

```bash
sudo nano /etc/suricata/rules/local.rules
```

Добавьте примеры:

```suricata
# Блокировать торрент-трафик по сигнатуре
drop ip any any -> any any (msg:"P2P BitTorrent detected"; flow:established,to_server; content:"BitTorrent"; nocase; reference:url,example.com; sid:1000001; rev:1;)

# Блокировать доступ к youtube.com по HTTP Host
drop http any any -> any any (msg:"Block YouTube HTTP"; http.host; content:"youtube.com"; nocase; sid:1000002; rev:1;)

# Блокировать по SNI в TLS (HTTPS)
drop tls any any -> any any (msg:"Block YouTube TLS"; tls.sni; content:"youtube.com"; nocase; sid:1000003; rev:1;)

# Блокировать Telegram (по домену)
drop tls any any -> any any (msg:"Block Telegram"; tls.sni; content:"telegram.org"; nocase; sid:1000004; rev:1;)
```

> ⚠️ **Важно**:  
> - Используйте `drop`, а не `alert`, чтобы **блокировать** трафик.  
> - `sid` (Signature ID) должен быть уникальным и > 1000000 для пользовательских правил.

### 3.2 Подключите файл правил в конфиге

В том же `suricata.yaml` найдите секцию:

```yaml
rule-files:
  - suricata.rules
```

Добавьте ваш файл:

```yaml
rule-files:
  - suricata.rules
  - local.rules
```

---

## 🔧 Шаг 4: Настройка iptables для перенаправления трафика в Suricata

Suricata не перехватывает трафик сам — его нужно направить через **NFQUEUE**.

### Вариант A: Фильтрация **всего трафика через машину** (если это шлюз)

```bash
# Очистите цепочку (опционально)
sudo iptables -F

# Перенаправляем ВЕСЬ проходящий трафик в NFQUEUE 0
sudo iptables -I FORWARD -j NFQUEUE --queue-num 0
```

> Это актуально, если машина работает как **роутер/шлюз** для других устройств.

### Вариант B: Фильтрация **локального исходящего трафика**

```bash
sudo iptables -I OUTPUT -j NFQUEUE --queue-num 0
```

> Подходит для тестирования на одном ПК.

### ⚠️ Важно: не блокируйте SSH!

Если вы подключены по SSH, добавьте исключение:

```bash
# Разрешить SSH до NFQUEUE
sudo iptables -I OUTPUT -p tcp --dport 22 -j ACCEPT
# ИЛИ для шлюза:
sudo iptables -I FORWARD -p tcp --dport 22 -j ACCEPT
```

Иначе вы можете потерять соединение!

---

## 🔧 Шаг 5: Запуск Suricata в режиме IPS

Остановите службу (если запущена):
```bash
sudo systemctl stop suricata
```

Запустите вручную для теста:
```bash
sudo suricata -c /etc/suricata/suricata.yaml -q 0
```

Флаги:
- `-c` — путь к конфигу,
- `-q 0` — обрабатывать очередь NFQUEUE №0.

> Если всё работает, вы увидите логи в терминале. Нажмите `Ctrl+C` для остановки.

### Запуск как службы (опционально)

Отредактируйте `/lib/systemd/system/suricata.service` или создайте override:

```bash
sudo systemctl edit suricata
```

Добавьте:
```ini
[Service]
ExecStart=
ExecStart=/usr/bin/suricata -c /etc/suricata/suricata.yaml -q 0
```

Затем:
```bash
sudo systemctl daemon-reload
sudo systemctl enable suricata
sudo systemctl start suricata
```

---

## 🔍 Шаг 6: Тестирование

### Тест 1: Попробуйте открыть YouTube в браузере
- Если используется HTTP (редко), правило сработает.
- Если HTTPS — Suricata проверит **SNI** в TLS handshake и **заблокирует соединение**, если правило активно.

### Тест 2: Проверка торрент-трафика
Запустите торрент-клиент → Suricata должен обнаружить строку `BitTorrent` и **сбросить соединение**.

### Тест 3: Просмотр логов

Логи Suricata (если включены):
```bash
sudo tail -f /var/log/suricata/fast.log
```

Или в реальном времени при ручном запуске — в консоли.

---

## 🛡️ Безопасность и производительность

### Советы:
- Не используйте слишком много правил — это снижает производительность.
- Для HTTPS помните: **SNI не шифруется**, но в будущем (с ESNI/ECH) это изменится.
- Suricata потребляет CPU. На слабых устройствах (например, Raspberry Pi) ограничьте объём трафика.
- Регулярно обновляйте правила (например, через `suricata-update`).

Установка `suricata-update` (если не установлена):
```bash
sudo apt install suricata-update
sudo suricata-update
sudo suricata-update enable-source et/open
```

> Но для пользовательских правил (`local.rules`) обновления не нужны.

---

## 🧪 Пример: полный сценарий для домашнего шлюза

1. Машина с двумя интерфейсами: `eth0` (WAN), `eth1` (LAN).
2. Настроена переадресация IP:
   ```bash
   echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward
   ```
3. iptables:
   ```bash
   iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
   iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT
   iptables -A FORWARD -i eth0 -o eth1 -m state --state RELATED,ESTABLISHED -j ACCEPT
   iptables -I FORWARD -j NFQUEUE --queue-num 0
   ```
4. Suricata запущен с `-q 0`.

→ Теперь **весь трафик LAN → WAN** проходит через DPI и фильтруется!


# EveBox

EveBox is a web based Suricata "EVE" event viewer for Elastic Search.

- Homepage and documentation: https://evebox.org

<ImageZoom src="https://evebox.org/img/evebox-inbox-dark.png" />

## Features

- A web based event viewer with an "Inbox" approach to alert
  management.
- Event search.
- An agent for sending Suricata events to the EveBox server (but you
  can use Filebeat/Logstash instead).
- Embedded SQLite for self-contained installations.

## Requirements

- Suricata - to generate alerts and events.

And one of...

- An existing ElasticSearch/Logstash (version 7 or greater) setup
  already handling Suricata events (EveBox has issues with Filebeat
  indices at this time).
- Just Elastic Search, using EveBox or the EveBox agent to add events.
- Nothing - EveBox can use an embedded SQLite database suitable for
  lower load installations (note: not all features supported yet).
- A modern web browser.

## Installation.

Download a package and run the evebox application against your
existing Elastic Search server.

Example:

    ./evebox server -e http://localhost:9200

Then visit http://localhost:5636 with your browser.

Available downloads including RPM and Debian package repositories can be found
at [https://evebox.org/#downloads](https://evebox.org/#downloads).

### EveCtl

EveCtl (https://evebox.org/evectl) is an easy way to get started with
Suricata and EveBox on Linux machines. (Note: Podman or Docker
required).

### ClearNDR Community Edition

EveBox is included in the [ClearNDR Community
Edition](https://www.stamus-networks.com/clear-ndr-community).

### Docker

If you wish to install EveBox with Docker an up to date image is
hosted on Docker hub.

Example:

```
docker pull jasonish/evebox:latest
docker run -it -p 5636:5636 jasonish/evebox:latest -e http://elasticsearch:9200
```

replacing your __http://elasticsearch:9200__ with that of your Elastic
Search URL. You most likely do not want to use localhost here as that
will be the localhost of the container, not of the host.

OR if you want to link to an already running Elastic Search container:

```
docker run -it -p 5636:5636 --link elasticsearch jasonish/evebox:latest
```

Then visit http://localhost:5636 with your browser.

## Usage

EveBox runs as a server exposing a web interface on port 5636 by
default.

### With an Existing Elastic Search Server With Events

The basic mode where `eve` events are being sent to Elastic Search
with Logstash and or Filebeat.

```
evebox server -e http://elasticsearch:9200
```

### With the Embedded SQLite Database

This is useful if you don't have Elastic Search and running EveBox on
the same machine as Suricata. It uses an embedded SQLite database for
events and is suitable for ligher loads. Currently SQLite does not
support reporting.

```
evebox server -D . --datastore sqlite --input /var/log/suricata/eve.json
```

More documentation can be found at http://evebox.readthedocs.io/en/latest/.

## Building EveBox

EveBox consists of a JavaScript frontend, and a backend written in Rust. To
build Evebox the following requirements must first be satisfied:

* Node.js v18 or newer installed.
* Latest Rust stable.

First checkout EveBox:

```
git clone https://github.com/jasonish/evebox.git ~/projects/evebox
```

Then to build the binary:
```
make
```

Or to build a release package:
```
make dist
```

### Possible Issues

## Run in Development Mode

```
./dev.sh -e http://elasticsearch:9200
```

to run in development mode using an Elastic Search datastore at
http://elasticsearch:9200.

The connect your browser to http://localhost:4200. Note this port is
different than the EveBox port, as the Angular CLI/Webpack development
server is used to serve up the web application with backend requests
being proxied to the Go application.

In development mode changes to Go files will trigger a
recompile/restart, and changes to the web app will trigger a recompile
of the javascript and a browser refresh.
