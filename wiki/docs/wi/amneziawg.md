# AmneziaWG

![](https://habrastorage.org/getpro/habr/upload_files/876/754/f9a/876754f9a7551b445c2d75414f71cfd0.png)

**Amnezia VPN** — это бесплатный и открытый проект, разработанный российскими энтузиастами для обхода интернет-цензуры и защиты приватности пользователей в условиях усиления блокировок и DPI-анализа (глубокой инспекции трафика). В отличие от традиционных VPN-сервисов, Amnezia не предоставляет собственные серверы, а позволяет пользователям развернуть зашифрованный туннель на собственном VPS (виртуальном сервере) с использованием различных протоколов, включая OpenVPN, WireGuard, Shadowsocks, Cloak и другие. Особое внимание в проекте уделяется **маскировке (обфускации) трафика**, чтобы он выглядел как обычный HTTPS, SSH или другой легитимный трафик, что затрудняет его распознавание и блокировку со стороны провайдеров или государственных фильтров.

**AmneziaWG** (Amnezia WireGuard) — это модифицированная версия популярного протокола **WireGuard**, расширенная функциями обфускации. Стандартный WireGuard, несмотря на высокую скорость и надёжность, легко детектируется по характерному UDP-трафику и часто блокируется в странах с жёсткой цензурой (например, в России, Иране, Китае). AmneziaWG решает эту проблему, добавляя **псевдослучайные джиттеры (Jc, Jmin, Jmax)** и **уникальные заголовки (H1–H4)**, а также параметры **S1/S2**, которые изменяют структуру пакетов, делая их похожими на обычный шум или легитимный трафик. При этом сохраняются все преимущества WireGuard: минимальная задержка, высокая производительность и простота настройки.

Важной особенностью AmneziaWG является наличие **нативной поддержки на уровне ядра Linux** через специальный kernel module. Это позволяет обрабатывать обфусцированный трафик напрямую в ядре, без необходимости запуска пользовательских демонов (вроде `amneziawg-go`), что повышает скорость, снижает потребление ресурсов и улучшает стабильность соединения. Конфигурация AmneziaWG выглядит почти как у обычного WireGuard, но включает дополнительные поля (`S1`, `S2`, `Jc`, `Jmin`, `Jmax`, `H1–H4`), которые **должны быть одинаковыми на клиенте и сервере** (за исключением параметров джиттера). Таким образом, AmneziaWG сочетает в себе **высокую степень скрытности** и **производительность на уровне ядра**, что делает его одним из самых эффективных решений для обхода современных систем блокировки.

## Установка

1. Устанавливаем необходимые пакеты (я тут их с перебором бахнул) ):

```bash
apt-get install amnezia-vpn-client kernel-modules-amneziawg-6.12
```

```bash
apt-get install amnezia-vpn-service amneziawg-go amneziawg-tools
```

::: details Устаревшее

11 ноября 2025 года появилось решение проблемы с DNS взамен systemd-resolved: Для работы DNS установите пакет libnss-resolve. В версии пакета [amnezia-vpn-4.8.10.0-alt2](https://packages.altlinux.org/ru/sisyphus/srpms/amnezia-vpn/3276394386284475711) добавили этот пакет в зависимость, так что ничего делать не нужно.

Настраиваем systemd-resolved (https://bugzilla.altlinux.org/52679)

```bash
apt-get install systemd-networkd
```
```bash
systemctl enable --now systemd-resolved
```
```bash
ln -sf /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf
```
:::

2. Запускаем сервис:
```bash
systemctl enable --now AmneziaVPN
```

3. Перезагружаем систему.

4. Теперь входим в графическое приложение как обычно через меню приложений.

## Настройка сервера OpenVPN, WireGuard, Shadowsocks, IKEv2/IPSec и Cloak, L2TP/IPSec, PPTP, OpenConnect VPN, SSTP, XRay Reality, MPLS, VLESS, L2TP, FreeLAN SSL P2. Помимо VLESS существуют и другие защищённые протоколы, такие как Trojan, Cloak, ShadowTLS, Hysteria/Hysteria2, mKCP и прочие...

Графическая панель 3X-UI X‑UI, Marzban, Hiddify — так называемые «панели», веб‑интерфейсы для прокси‑серверов. В их основе чаще всего используется тот же самый XRay. Изначально задуманы как более простой в установке и настройке вариант сервера для неподкованных пользователей. 3X-UI - легко устанавливается в Docker, сразу на английском с возможностью переключения на русский, имеет в себе все что надо - и главное, работает!

Однако, эти панели при неправильном управлении добавляют множество уязвимостей и могут привести к блокировке. Хоть в этой инструкции я и привожу пример настройки через панель 3X-UI и стараюсь её обезопасить, всё же рекомендую настраивать XRay напрямую через консоль.

___

Попробовал запустить сервер с помощью Amnezia VPN Client, как собственно и описывается везде в инструкциях по амнезии. Установил XRay. С чем столкнуля? 1. В судоерс раскомментировал строку с wheel no passwd (возможно, можно и без нопассвд), также установил и запустил Докер. И он завёлся)

Просто дал Амнезии логин и пароль от рута, ну и, естественно, включил и настроил ссш для рута

А вот с подключением к серверу уже траблы пошли. У меня сервер на виртуалке в VM VB, а подключаюсь с хоста. Чёт крутится подключение, но не подключается. ВОЗМОЖНО, виной всему тот прикол, что у меня два сетевых адаптера (стандартный нат и внутренний адаптер хоста) ИЛИ всё из-за того, что у меня был выключен сервис AmneziaVPN)



---




# Настройка туннеля на базе протокола Amnezia-WG на ОС Альт

Данное руководство описывает кейс настройки туннелирования для получения доступа к клиентов в сеть Интернет.

Изначальная структура стенда:

![](/img/amnezia/schema.png)

- Маршрутизатор на базе Альт Сервер 11. Имеет два сетевых адаптера: Во внешную сеть и в локальную сеть. Адрес в локальной сети: `192.168.0.1/24`. Изначально машрутизация не настраивается, в следвствие чего локальная сеть `192.168.0.0/24` выхода во внешную сеть не имеет. Ниже по тексту, так как данный хост будет использоваться как сервер AmneziaWG, будет называться `сервером`.
- Клиент на базе Альт Рабочая станция К 11. Имеет один сетевой адаптер в локальную сеть. Адрес в локальной сети: `192.168.0.2/24`.
- Клиент на базе Альт Сервер 11. Имеет один сетевой адаптер в локальную сеть. Адрес в локальной сети: `192.168.0.3/24`.

## Подготовительные действия для всех вариантов настройки:

0. Обеспечение связности сети между клиентами и сервером. Изначально на сервере не настраивается маршрутизация, клиенты пингуют сервер и наоборот, но клиенты не имеют доступ к сети Интернет, а сервер имеет.

1. Установка необходимых пакетов:
```bash
apt-get install kernel-modules-amneziawg-6.12 amneziawg-tools
```

2. Убедитесь, что ваш фаерволл не блокирует DNS-запросы (порт 53).
```bash
iptables -L -n -v | grep 53
```

3. Убедитесь, что порт 51820 свободен:
```bash
ss -tulpn | grep 51820
```

4. При создании конфигурационных файлов необходимо будет указывать параметры обфускации. Ниже приведена таблица, описывающая каждый параметр.

| Параметр | Описание | Диапазон | Пример |
|----------|----------|----------|--------|
| `Jc` | Количество junk-пакетов | 3-6 | `5` |
| `Jmin` | Мин. размер junk (байт) | 40-89 | `55` |
| `Jmax` | Макс. размер junk (байт) | Jmin+50..Jmin+250 | `200` |
| `S1` | Padding init-сообщения (байт) | 15-150 | `72` |
| `S2` | Padding response-сообщения (байт) | 15-150, S1+56≠S2 | `56` |
| `S3` | Padding cookie-сообщения (байт) | 8-55 | `32` |
| `S4` | Padding data-сообщения (байт) | 4-27 | `16` |
| `H1` | Идентификатор init-сообщения | Диапазон uint32 | `134567-245678` |
| `H2` | Идентификатор response-сообщения | Диапазон uint32 | `3456789-4567890` |
| `H3` | Идентификатор cookie-сообщения | Диапазон uint32 | `56789012-67890123` |
| `H4` | Идентификатор data-сообщения | Диапазон uint32 | `456789012-567890123` |

## Описание методов настройки

В данном руководстве описываются три метода настройки AmneziaWG на хостах:

1. Настройка через Etcnet: Удобно, когда в системе сетевая подсистема работает через Etcnet и отсутствует DE. Повзоляет настроить как сервер, так и клиент.
2. Ручная настройка (ip-link): Базовый метод настройки, не сохраняет настройки после перезагрузки системы. Повзоляет настроить как сервер, так и клиент.
3. Настройка через Amnezia VPN Client: Данный метод удобен когда в системе присутствует DE. Теоретически возможно через данный клиент настроить и сервер, но так как севрер будет настроен только через Docker, данный метод здесь не описан.

## Настройка через Etcnet

Настройка через Etcnet требует подготовительных действий. Данные действия необходимы выполнить на всех хостах, где конфигурирование адаптера туннеля будет производиться посредством Etcnet.

Необходимо отредактировать файл `/etc/net/options.d/00-default`:

- В блок `# tools` необходимо добавить строку:
```
AWG=/usr/bin/awg
```

- В переменную `IFGROUP[3]` необходимо добавить `awg` (например, `IFGROUP[3]='... wg oconn awg'`).

### Настройка клиента

1. Генерация ключевой пары:
```bash
awg genkey | tee client_private.key | awg pubkey > client_public.key
```

Далее эти ключи понадобятся для составления конфигурационных файлов как клиента, так и сервера.

2. Создание директории конфигурационных файлов сетевого адаптера `awg0`:
```bash
mkdir /etc/net/ifaces/awg0
```

3. Создание файла `options`:
```bash
tee /etc/net/ifaces/awg0/options <<EOF
TYPE=awg
AWG_CONF=awg0.conf
ONBOOT=yes
EOF
```

4. Создание файла `ipv4address`:
```bash
tee /etc/net/ifaces/awg0/ipv4address <<EOF
10.0.0.2/24
EOF
```

5. Создание файла `ipv4route`:
```bash
tee /etc/net/ifaces/awg0/ipv4route <<EOF
default via 10.0.0.1
EOF
```

6. Создание файла `resolv.conf`:
```bash
tee /etc/net/ifaces/awg0/resolv.conf <<EOF
nameserver 77.88.8.8
EOF
```

7. Создание файла `awg0.conf`:
```ini
[Interface]
PrivateKey = <Приватный ключ клиента>
ListenPort = 51820

# Параметры обфускации, указанные Вами
Jc = 5
Jmin = 41
Jmax = 120
S1 = 64
S2 = 26
S3 = 32
S4 = 16
H1 = 134567-245678
H2 = 3456789-4567890
H3 = 56789012-67890123
H4 = 456789012-567890123

[Peer]
PublicKey = <Публичный ключ сервера>
AllowedIPs = 0.0.0.0/0 # Разрешаем все сети
Endpoint = 192.168.0.1:51820 # Адрес сервера в сети
```

8. Перезагрузка сетевой подсистемы:
```bash
systemctl restart network
```

### Настройка сервера

1. Генерация ключевой пары:
```bash
awg genkey | tee server_private.key | awg pubkey > server_public.key
```

Далее эти ключи понадобятся для составления конфигурационных файлов как клиента, так и сервера.

2. Создание директории конфигурационных файлов сетевого адаптера `awg0`:
```bash
mkdir /etc/net/ifaces/awg0
```

3. Создание файла `options`:
```bash
tee /etc/net/ifaces/awg0/options <<EOF
TYPE=awg
AWG_CONF=awg0.conf
ONBOOT=yes
EOF
```

4. Создание файла `ipv4address`:
```bash
tee /etc/net/ifaces/awg0/ipv4address <<EOF
10.0.0.1/24
EOF
```

5. Создание файла `awg0.conf`:
```ini
[Interface]
PrivateKey = <Приватный ключ сервера>
ListenPort = 51820

# Параметры обфускации, указанные Вами
Jc = 5
Jmin = 41
Jmax = 120
S1 = 64
S2 = 26
S3 = 32
S4 = 16
H1 = 134567-245678
H2 = 3456789-4567890
H3 = 56789012-67890123
H4 = 456789012-567890123


[Peer] # Клиент 1
PublicKey = <Публичный ключ клиента>
AllowedIPs = 10.0.0.2/32 # Префикс обязательно 32

[Peer] # Клиент 2
PublicKey = <Публичный ключ клиента>
AllowedIPs = 10.0.0.3/32 # Префикс обязательно 32
```

8. Презагрузка сетевой подсистемы:
```bash
systemctl restart network
```

9. Дополнительно: настройка маршрутизации:
```bash
# Включение пересылки пакетов (для постоянного эффекта раскомментируйте net.ipv4.ip_forward=1 в /etc/net/sysctl.conf)
sysctl -w net.ipv4.ip_forward=1

# Маскарадинг трафика из туннеля во внешний интерфейс
iptables -t nat -A POSTROUTING -o <внешний интерфейс> -j MASQUERADE

# Разрешение форвардинга между туннелем и внешним интерфейсом
iptables -A FORWARD -i awg0 -o <внешний интерфейс> -j ACCEPT
iptables -A FORWARD -i <внешний интерфейс> -o awg0 -m state --state RELATED,ESTABLISHED -j ACCEPT

# Разрешение обратой пересылки для связи между клиентами
iptables -A FORWARD -i awg0 -o awg0 -j ACCEPT
```

Чтобы сохранить настройки iptables:
```bash
iptables-save > /etc/sysconfig/iptables

systemctl enable iptables
```

## Ручная настройка (ip-link)

### Настройка клиента

1. Генерация ключевой пары:
```bash
awg genkey | tee client_private.key | awg pubkey > client_public.key
```

Далее эти ключи понадобятся для составления конфигурационных файлов как клиента, так и сервера.

2. Создание сетевого адаптера:
```bash
ip link add awg0 type amneziawg
```

3. Добавление ip-адреса интерфейса:
```bash
ip addr add 10.0.0.2/24 dev awg0
```

4. Добавление сервера:
```bash
awg set awg0 \
  private-key <Приватный ключ клиента>.key \ # Путь до файла с ключом
  endpoint 192.168.0.1:51820 \ # Адрес сервера в сети
  peer <Публичный ключ сервера> \ # В виде строки
  endpoint 192.168.0.1:51820 \ # Адрес сервера в сети
  allowed-ips 0.0.0.0/0 \ # Разрешаем все сети
```

Настройка обфускации в интерактивном режиме:
```bash
awg set awg0 jc 5 jmin 41 jmax 120 s1 64 s2 26 s3 32 s4 16 h1 134567-245678 h2 3456789-4567890 h3 56789012-67890123 h4 456789012-567890123
```

> Дополнительно:
> Используя `awg setconf` можно настроить сервер (и клиенты) посредством заранее написанного конфигурационного файла:
>```bash
>awg setconf awg0 <конфигурационный файл>.conf # Путь до файла
>```

5. Включение сетевого адаптера:
```bash
ip link set up dev awg0
```

### Настройка сервера

1. Генерация ключевой пары:
```bash
awg genkey | tee client_private.key | awg pubkey > client_public.key
```

Далее эти ключи понадобятся для составления конфигурационных файлов как клиента, так и сервера.

2. Создание сетевого адаптера:
```bash
ip link add awg0 type amneziawg
```

3. Добавление ip-адреса интерфейса:
```bash
ip addr add 10.0.0.1/24 dev awg0
```

4. Добавление клиента:
```bash
awg set awg0 \
  listen-port 51820 \
  private-key <Приватный ключ сервера>.key \ # Путь до файла с ключом
  endpoint 192.168.0.1:51820 \ # Адрес сервера в сети
  peer <Публичный ключ клиента> \ # В виде строки
  allowed-ips 10.0.0.2/32 # Префикс обязательно 32
```

Для следующих клиентов выполните:
```bash
awg set awg0 \
  endpoint 192.168.0.1:51820 \ # Адрес сервера в сети
  peer <Публичный ключ клиента> \ # В виде строки
  allowed-ips 10.0.0.3/32 # Префикс обязательно 32
```

Настройка обфускации в интерактивном режиме:
```bash
awg set awg0 jc 5 jmin 41 jmax 120 s1 64 s2 26 s3 32 s4 16 h1 134567-245678 h2 3456789-4567890 h3 56789012-67890123 h4 456789012-567890123
```

> Дополнительно:
> Используя `awg setconf` можно настроить сервер (и клиенты) посредством заранее написанного конфигурационного файла:
>```bash
>awg setconf awg0 <конфигурационный файл>.conf # Путь до файла
>```

5. Включение сетевого адаптера:
```bash
ip link set up dev awg0
```

6. Дополнительно: настройка маршрутизации:
```bash
# Включение пересылки пакетов (для постоянного эффекта раскомментируйте net.ipv4.ip_forward=1 в /etc/net/sysctl.conf)
sysctl -w net.ipv4.ip_forward=1

# Маскарадинг трафика из туннеля во внешний интерфейс
iptables -t nat -A POSTROUTING -o <внешний интерфейс> -j MASQUERADE

# Разрешение форвардинга между туннелем и внешним интерфейсом
iptables -A FORWARD -i awg0 -o <внешний интерфейс> -j ACCEPT
iptables -A FORWARD -i <внешний интерфейс> -o awg0 -m state --state RELATED,ESTABLISHED -j ACCEPT

# Разрешение обратой пересылки для связи между клиентами
iptables -A FORWARD -i awg0 -o awg0 -j ACCEPT
```

Чтобы сохранить настройки iptables:
```bash
iptables-save > /etc/sysconfig/iptables

systemctl enable iptables
```

## Настройка через Amnezia VPN Client

### Настройка клиента

1. Устанавливаем клиент:
```bash
apt-get install amnezia-vpn-client
```
2. Запускаем сервис:
```bash
systemctl enable --now AmneziaVPN
```

3. Создание файла `awg0.conf`:
```ini
[Interface]
PrivateKey = <Приватный ключ клиента>
Address = 10.0.0.2/32 # <ip-адрес клиента в приватной сети>/32 ОБЯЗАТЕЛЬНО
DNS = 8.8.8.8 # адрес nameserver'а
ListenPort = 51820

# Параметры обфускации, указанные Вами
Jc = 5
Jmin = 41
Jmax = 120
S1 = 64
S2 = 26
S3 = 32
S4 = 16
H1 = 134567-245678
H2 = 3456789-4567890
H3 = 56789012-67890123
H4 = 456789012-567890123

[Peer]
PublicKey = <Публичный ключ сервера>
AllowedIPs = 0.0.0.0/0 # Разрешаем все сети
Endpoint = 192.168.0.1:51820 # Адрес сервера в сети
```

4. Запускаем AmneziaVPN:
![](/img/amnezia/1.png)

Нажимаем на клавишу: "Приступим".

5. Выбираем пункт: Файл с настройками подключения:
![](/img/amnezia/2.png)

6. Находим файл конфигурации в файловом менеджере, после чего нажимаем: "Подключиться".
![](/img/amnezia/3.png)

7. Конфигурационный файл сохраняется в списке серверов, теперь необходимо нажать на большую круглую клавишу "Подключиться", чтобы подключиться к приватной сети:
![](/img/amnezia/4.png)

8. Клиент автоматически создаст виртуальный сетевой адаптер адаптер, настройт маршрутизацию и резолвер.
![](/img/amnezia/5.png)














<!-- 
## Настройка через сервис SystemD

### Настройка клиента

1. Генерация ключевой пары:
```bash
awg genkey | tee client_private.key | awg pubkey > client_public.key
```

2. Создаём конфигурационный файл `/etc/amnezia/amneziawg/awg0.conf` со следующим содержимым:
```ini
[Interface]
PrivateKey = <Приватный ключ клиента>
ListenPort = 51820

# Параметры обфускации, указанные Вами (при необходимости)
Jc = 6
Jmin = 40
Jmax = 120
S1 = 64
S2 = 64
S3 = 64
S4 = 64
H1 = 123-456
H2 = 789
H3 = 101-202
H4 = 303-404

[Peer]
PublicKey = <Публичный ключ сервера>
AllowedIPs = 0.0.0.0/0 # Разрешаем все сети
Endpoint = 192.168.0.1:51820 # Адрес сервера в сети
```

3. Создаём сервис `/etc/systemd/system/awg-quick@.service` со следующим содержимым:
```bash
[Unit]
Description=AmneziaWG Client via awg-quick(8) for %I
After=network-online.target nss-lookup.target
Wants=network-online.target nss-lookup.target

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/usr/bin/awg-quick up %i
ExecStop=/usr/bin/awg-quick down %i
ExecReload=/bin/bash -c 'exec /usr/bin/awg syncconf %i <(exec /usr/bin/awg-quick strip %i)'
Environment=WG_ENDPOINT_RESOLUTION_RETRIES=infinity

[Install]
WantedBy=multi-user.target
```

Включаем сервис
```bash
systemctl daemon-reload
systemctl enable awg-quick@awg0
systemctl start awg-quick@awg0
```

### Настройка сервера

1. Генерация ключевой пары:
```bash
awg genkey | tee client_private.key | awg pubkey > client_public.key
```

2. Создаём конфигурационный файл `/etc/amnezia/amneziawg/awg0.conf` со следующим содержимым:
```ini
[Interface]
PrivateKey = <Приватный ключ сервера>
ListenPort = 51820

# Параметры обфускации, указанные Вами (при необходимости)
Jc = 6
Jmin = 40
Jmax = 120
S1 = 64
S2 = 64
S3 = 64
S4 = 64
H1 = 123-456
H2 = 789
H3 = 101-202
H4 = 303-404

[Peer] # Клиент 1
PublicKey = <Публичный ключ клиента>
AllowedIPs = 10.0.0.2/32 # Префикс обязательно 32

[Peer] # Клиент 2
PublicKey = <Публичный ключ клиента>
AllowedIPs = 10.0.0.3/32 # Префикс обязательно 32
```

3. Создаём сервис `/etc/systemd/system/awg-quick@.service` со следующим содержимым:
```bash
[Unit]
Description=AmneziaWG Server via awg-quick(8) for %I
After=network-online.target nss-lookup.target
Wants=network-online.target nss-lookup.target

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/usr/bin/awg-quick up %i
ExecStop=/usr/bin/awg-quick down %i
ExecReload=/bin/bash -c 'exec /usr/bin/awg syncconf %i <(exec /usr/bin/awg-quick strip %i)'
Environment=WG_ENDPOINT_RESOLUTION_RETRIES=infinity

[Install]
WantedBy=multi-user.target
```

Включаем сервис
```bash
systemctl daemon-reload
systemctl enable awg-quick@awg0
systemctl start awg-quick@awg0
```

4. Дополнительно: настройка маршрутизации:
```bash
# Включение пересылки пакетов (для постоянного эффекта раскомментируйте net.ipv4.ip_forward=1 в /etc/net/sysctl.conf)
sysctl -w net.ipv4.ip_forward=1

# Маскарадинг трафика из туннеля во внешний интерфейс
iptables -t nat -A POSTROUTING -o <внешний интерфейс> -j MASQUERADE

# Разрешение форвардинга между туннелем и внешним интерфейсом
iptables -A FORWARD -i awg0 -o <внешний интерфейс> -j ACCEPT
iptables -A FORWARD -i <внешний интерфейс> -o awg0 -m state --state RELATED,ESTABLISHED -j ACCEPT

# Разрешение обратой пересылки для связи между клиентами
iptables -A FORWARD -i awg0 -o awg0 -j ACCEPT
```

Чтобы сохранить настройки iptables:
```bash
iptables-save > /etc/sysconfig/iptables

systemctl enable iptables
```


## Настройка через NetworkManager

Данный метод нельзя назвать штатным, так как из коробки NetworkManager не умеет работать с протоколом amneziawg, но существует неофициальный плагин `https://github.com/vovochka404/network-manager-amneziawg` с помощью которого можно настроить `только клиента`.

Требуются дополнительные действия в виде сборки и установки данного плагина.

0. Установка плагина из готового пакета от автора плагина:
```bash
wget https://github.com/vovochka404/network-manager-amneziawg/releases/download/v0.9.10/NetworkManager-amneziawg-0.9.10-amd64.rpm
```
```bash
apt-get install ./NetworkManager-amneziawg-0.9.10-amd64.rpm
```

0. Сборка из исходников:
```bash
apt-get install build-essential glib2-devel libnm-devel cmake pkg-config gettext intltool libgtk+3-devel libgtk4-devel libnma-devel
```
```bash
$ wget https://github.com/vovochka404/network-manager-amneziawg/archive/refs/tags/v0.9.10.tar.gz
```
```bash
$ tar -xvzf v0.9.10.tar.gz
```
```bash
$ cd network-manager-amneziawg-0.9.10
```
```bash
$ mkdir build && cd build
```

```bash
$ cmake .. -DWITH_GTK3=OFF -DWITH_GTK4=OFF -DCMAKE_INSTALL_PREFIX=/usr -DCMAKE_INSTALL_LIBDIR=lib64 && cmake --build .
```
```bash
make install
```
```bash
systemctl restart NetworkManager
```


### Настройка клиента

1. Генерация ключевой пары:
```bash
awg genkey | tee client_private.key | awg pubkey > client_public.key
```

2. Создание файла awg0.conf:
```ini
[Interface]
PrivateKey = <Приватный ключ клиента>
ListenPort = 51820

# Параметры обфускации, указанные Вами (при необходимости)
Jc = 6
Jmin = 40
Jmax = 120
S1 = 64
S2 = 64
S3 = 64
S4 = 64
H1 = 123-456
H2 = 789
H3 = 101-202
H4 = 303-404

[Peer]
PublicKey = <Публичный ключ сервера>
AllowedIPs = 0.0.0.0/0 # Разрешаем все сети
Endpoint = 192.168.0.1:51820 # Адрес сервера в сети
```


## Usage

### nmcli Examples

#### Import existing configuration

```bash
nmcli c import type amneziawg file /path/to/vpn.conf
```


#### Create connection manually

```bash
# Create the VPN connection
nmcli c add type vpn ifname '*' vpn-type amneziawg con-name "My AmneziaWG VPN"

# Set interface private key
nmcli c modify "My AmneziaWG VPN" vpn.data \
  "local-private-key=YAnL1JqN5iMHW2kHbNfT9xLqX5vBz1mQWc8p3Kf9R0E="

# Set peer public key
nmcli c modify "My AmneziaWG VPN" vpn.data \
  "peer-1-public-key=XbK2mPw8nR4tY6vLqZ9hF1cJ3sA5gD7eB9uG2pK0M="

# Set peer endpoint
nmcli c modify "My AmneziaWG VPN" vpn.data \
  "peer-1-endpoint=vpn.example.com:51820"

# Set peer allowed IPs
nmcli c modify "My AmneziaWG VPN" vpn.data \
  "peer-1-allowed-ips=0.0.0.0/0,::/0"

# Activate the connection
nmcli c up "My AmneziaWG VPN"
```

#### List connections

```bash
nmcli c show | grep amneziawg
```

#### View connection details

```bash
nmcli c show "My AmneziaWG VPN"
```

#### Delete connection

```bash
nmcli c delete "My AmneziaWG VPN"
```

```
-->