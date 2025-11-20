# Jitsi Meet

![](https://meetrix.io/articles/content/images/2023/07/Jitsi.png)

## Установка пакетов

```
apt-get install prosody jitsi-meet-prosody jitsi-meet-web jitsi-meet-web-config jicofo jitsi-videobridge
```

## Настройка имени хоста

Установить имя хоста системы на доменное имя, которое будет использоваться для Jitsi:
```
# hostnamectl set-hostname jitsi2
```

Установить локальное сопоставление имени хоста сервера с IP-адресом 127.0.0.1, для этого дописать в файл `/etc/hosts` строку:
```
127.0.0.1    jitsi2.test.alt jitsi2
```

**Примечание**

После изменения имени компьютера могут перестать запускаться приложения. Для решения этой проблемы необходимо перезагрузить систему.

Проверить правильность установленного имени можно, выполнив команды:
```
# hostname
jitsi2
# hostname -f
jitsi2.test.alt
$ ping "$(hostname)"
PING jitsi2.test.alt (127.0.0.1) 56(84) bytes of data.
64 bytes from localhost (127.0.0.1): icmp_seq=1 ttl=64 time=0.053 ms
[...]
```


## Настройка XMPP-сервера (prosody)

Создать каталог `/etc/prosody/conf.d` для хранения пользовательских конфигураций:
```
# mkdir -p /etc/prosody/conf.d
```

В конец файла `/etc/prosody/prosody.cfg.lua` дописать строку:
```
Include "conf.d/*.cfg.lua"
```

Создать конфигурационный файл prosody для вашего домена (например, `/etc/prosody/conf.d/jitsi2.test.alt.cfg.lua`) со следующим содержимым:
```
plugin_paths = { "/usr/share/jitsi-meet/prosody-plugins/" }

-- domain mapper options, must at least have domain base set to use the mapper
muc_mapper_domain_base = "jitsi2.test.alt";

cross_domain_bosh = false;
consider_bosh_secure = true;

----------- Virtual hosts -----------
VirtualHost "jitsi2.test.alt"
    authentication = "anonymous"
    ssl = {
       key = "/var/lib/prosody/jitsi2.test.alt.key";
       certificate = "/var/lib/prosody/jitsi2.test.alt.crt";
    }
    speakerstats_component = "speakerstats.jitsi2.test.alt"
    conference_duration_component = "conferenceduration.jitsi2.test.alt"
         -- we need bosh
    modules_enabled = {
        "bosh";
        "pubsub";
        "ping"; -- Enable mod_ping
        "speakerstats";
        "turncredentials";
        "conference_duration";
    }
    c2s_require_encryption = false

Component "conference.jitsi2.test.alt" "muc"
    storage = "memory"
    modules_enabled = {
        "muc_meeting_id";
        "muc_domain_mapper";
        -- "token_verification";
    }
    admins = { "focus@auth.jitsi2.test.alt" }
    muc_room_locking = false
    muc_room_default_public_jids = true

VirtualHost "auth.jitsi2.test.alt"
    ssl = {
        key = "/var/lib/prosody/auth.jitsi2.test.alt.key";
        certificate = "/var/lib/prosody/auth.jitsi2.test.alt.crt";
    }
    authentication = "internal_plain"

-- internal muc component, meant to enable pools of jibri and jigasi clients
Component "internal.auth.jitsi2.test.alt" "muc"
    storage = "memory"
    modules_enabled = {
        "ping";
    }
    admins = { "focus@auth.jitsi2.test.alt", "jvb@auth.jitsi2.test.alt" }
    muc_room_locking = false
    muc_room_default_public_jids = true

Component "focus.jitsi2.test.alt"
    component_secret = "secret1" -- достаточно длинный пароль, он же JICOFO_SECRET

Component "speakerstats.jitsi2.test.alt" "speakerstats_component"
    muc_component = "conference.jitsi2.test.alt"

Component "conferenceduration.jitsi2.test.alt" "conference_duration_component"
    muc_component = "conference.jitsi2.test.alt"
```

Сгенерировать сертификаты для виртуальных хостов jitsi2.test.alt и auth.jitsi2.test.alt:
```
# prosodyctl cert generate jitsi2.test.alt
# prosodyctl cert generate auth.jitsi2.test.alt
```

Зарегистрировать сертификаты в системе, как доверенные (сертификаты нужно регистрировать там, где устанавливается Jicofo):
```
# ln -s /var/lib/prosody/jitsi2.test.alt.crt /etc/pki/ca-trust/source/anchors/
# ln -s /var/lib/prosody/auth.jitsi2.test.alt.crt /etc/pki/ca-trust/source/anchors/
# update-ca-trust
```

Запустить prosody:
```
# prosodyctl start
```


## Настройка jicofo

Jicofo подключается к XMPP-серверу и как внешний XMPP-компонент, и как пользовательский аккаунт с JID focus@auth.jitsi2.test.alt.

В файле `/etc/jitsi/jicofo/config` следует указать:
```
# Jitsi Conference Focus settings
# sets the host name of the XMPP server
JICOFO_HOST=localhost

# sets the XMPP domain (default: none)
JICOFO_HOSTNAME=jitsi2.test.alt

# sets the secret used to authenticate as an XMPP component
JICOFO_SECRET=secret1

# overrides the prefix for the XMPP component domain. Default: "focus"
#JICOFO_FOCUS_SUBDOMAIN=focus

# sets the port to use for the XMPP component connection
JICOFO_PORT=5347

# sets the XMPP domain name to use for XMPP user logins
JICOFO_AUTH_DOMAIN=auth.jitsi2.test.alt

# sets the username to use for XMPP user logins
JICOFO_AUTH_USER=focus

# sets the password to use for XMPP user logins
JICOFO_AUTH_PASSWORD=secret2

# extra options to pass to the jicofo daemon
JICOFO_OPTS="${JICOFO_FOCUS_SUBDOMAIN:+ --subdomain=$JICOFO_FOCUS_SUBDOMAIN}"

# adds java system props that are passed to jicofo (default are for home and logging config file)
JAVA_SYS_PROPS="-Dnet.java.sip.communicator.SC_HOME_DIR_LOCATION=/etc/jitsi
-Dnet.java.sip.communicator.SC_HOME_DIR_NAME=jicofo
-Dnet.java.sip.communicator.SC_LOG_DIR_LOCATION=/var/log/jitsi
-Djava.util.logging.config.file=/etc/jitsi/jicofo/logging.properties"
```

**Важно**

В строке
```
JICOFO_SECRET=secret1
```
должен быть указан пароль, установленный в файле `/etc/prosody/conf.d/jitsi2.test.alt.cfg.lua`.

В строке
```
JICOFO_AUTH_PASSWORD=secret2
```
должен быть указан пароль пользователя focus.

В файле `/etc/jitsi/jicofo/sip-communicator.properties` следует указать:
```
org.jitsi.jicofo.health.ENABLE_HEALTH_CHECKS=true
org.jitsi.jicofo.BRIDGE_MUC=JvbBrewery@internal.auth.jitsi2.test.alt
```

Запустите jicofo:
```
# systemctl start jicofo
```

Убедитесь, что jicofo подключается к XMPP-серверу:
```
# curl -i localhost:8888/about/health
HTTP/1.1 500 Internal Server Error
Date: Wed, 04 May 2022 10:02:05 GMT
Content-Type: application/json
Content-Length: 56
Server: Jetty(9.4.15.v20190215)

No operational bridges available (total bridge count: 0)
```
Так как пока ни одного Jitsi Videobridge к серверу не подключено, jicofo ответит кодом ответа 500 и сообщением *No operational bridges available*. Если в ответе сообщение об ошибке иного рода — следует проверить настройки и связь между prosody и jicofo.


## Настройка jitsi-videobridge

Заменить содержимое файла `/etc/jitsi/videobridge/config` на следующее:
```
# Jitsi Videobridge settings

# extra options to pass to the JVB daemon
JVB_OPTS="--apis=,"

# adds java system props that are passed to jvb (default are for home and logging config file)
JAVA_SYS_PROPS="-Dnet.java.sip.communicator.SC_HOME_DIR_LOCATION=/etc/jitsi
-Dnet.java.sip.communicator.SC_HOME_DIR_NAME=videobridge
-Dnet.java.sip.communicator.SC_LOG_DIR_LOCATION=/var/log/jitsi
-Djava.util.logging.config.file=/etc/jitsi/videobridge/logging.properties
-Dconfig.file=/etc/jitsi/videobridge/application.conf"
```

В качестве файлов конфигурации jitsi-videobridge используются файлы `/etc/jitsi/videobridge/application.conf` и `/etc/jitsi/videobridge/sip-communicator.properties`.

В файле `/etc/jitsi/videobridge/application.conf` необходимо указать:
```
videobridge {
    stats {
        enabled = true
        transports = [
            { type = "muc" }
        ]
    }
    apis {
        xmpp-client {
            configs {
                shard {
                    hostname = "localhost"
                    domain = "auth.jitsi2.test.alt"
                    username = "jvb"
                    password = "secret3"
                    muc_jids = "JvbBrewery@internal.auth.jitsi2.test.alt"
                    # The muc_nickname must be unique across all instances
                    muc_nickname = "jvb-mid-123"
                }
            }
        }
    }
}
```

**Важно**

В строке
```
password = "secret3"
```
должен быть указан пароль пользователя jvb.

Вместо слова shard можно использовать любой идентификатор (оно идентифицирует подключение к xmpp-серверу и jicofo).

Измените содержимое файла `/etc/jitsi/videobridge/sip-communicator.properties`:
```
org.ice4j.ice.harvest.DISABLE_AWS_HARVESTER=true
org.ice4j.ice.harvest.STUN_MAPPING_HARVESTER_ADDRESSES=meet-jit-si-turnrelay.jitsi.net:443
org.jitsi.videobridge.ENABLE_STATISTICS=true
org.jitsi.videobridge.STATISTICS_TRANSPORT=muc
org.jitsi.videobridge.xmpp.user.shard.HOSTNAME=localhost
org.jitsi.videobridge.xmpp.user.shard.DOMAIN=auth.jitsi2.test.alt
org.jitsi.videobridge.xmpp.user.shard.USERNAME=jvb
org.jitsi.videobridge.xmpp.user.shard.PASSWORD=secret3
org.jitsi.videobridge.xmpp.user.shard.MUC_JIDS=JvbBrewery@internal.auth.jitsi2.test.alt
org.jitsi.videobridge.xmpp.user.shard.MUC_NICKNAME=6d8b40cb-fe32-49f5-a5f6-13d2c3f95bba
```

**Примечание**

Если JVB-машина отделена от клиентов при помощи NAT, то потребуется донастройка.

Запустите JVB:
```
# systemctl start jitsi-videobridge
```

Убедитесь, что между JVB и jicofo есть связь:
```
# curl -i localhost:8888/about/health
HTTP/1.1 200 OK
Date: Wed, 04 May 2022 10:06:04 GMT
Content-Length: 0
Server: Jetty(9.4.15.v20190215)
```
Если всё сделано правильно, jicofo на healthcheck-запрос будет отдавать HTTP-код 200.


## Настройка веб-приложения Jitsi Meet

Получить SSL/TLS-сертификат для домена.

**Примечание**

Можно создать сертификат без обращения к УЦ. При использовании такого сертификата в браузере будут выводиться предупреждения.

Для создания самоподписанного сертификата следует:

- создать корневой ключ:
```
# openssl genrsa -out rootCA.key 2048
```
- создать корневой сертификат:
```
# openssl req -x509 -new -key rootCA.key -days 10000 -out rootCA.crt -subj "/C=RU/ST=Russia/L=Moscow/CN=SuperPlat CA Root"
```
- сгенерировать ключ:
```
# openssl genrsa -out jitsi2.test.alt.key 2048
```
- создать запрос на сертификат (тут важно указать имя сервера: домен или IP):
```
# openssl req -new -key jitsi2.test.alt.key -out jitsi2.test.alt.csr -subj "/C=RU/L=Moscow/CN=jitsi2.test.alt"
```
- подписать запрос на сертификат корневым сертификатом:
```
# openssl x509 -req -in jitsi2.test.alt.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out jitsi2.test.alt.crt -days 5000
Signature ok
subject=C = RU, CN = jitsi2.test.alt
Getting CA Private Key
```

Положить ключ и сертификат в папку `/etc/jitsi/meet/`:
```
# cp jitsi2.test.alt.crt /etc/jitsi/meet/
# cp jitsi2.test.alt.key /etc/jitsi/meet/
```

В пакете jitsi-meet-web-config есть примеры конфигурации для веб-клиента (\*-config.js) и веб-сервера (\*.example.apache, \*.example).

Внести изменения в файл `/etc/httpd2/conf/sites-available/jitsi2.test.alt.conf` (изменить имя, указать сертификат):
```
<VirtualHost *:80>
    ServerName jitsi2.test.alt
    Redirect permanent / https://jitsi2.test.alt/
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</VirtualHost>

<VirtualHost *:443>

  ServerName jitsi2.test.alt

  SSLProtocol TLSv1 TLSv1.1 TLSv1.2
  SSLEngine on
  SSLProxyEngine on
  SSLCertificateFile /etc/jitsi/meet/jitsi2.test.alt.crt
  SSLCertificateKeyFile /etc/jitsi/meet/jitsi2.test.alt.key
  SSLCipherSuite "EECDH+ECDSA+AESGCM:EECDH+aRSA+AESGCM:EECDH+ECDSA+SHA256:EECDH+aRSA+SHA256:EECDH+ECDSA+SHA384:EECDH+ECDSA+SHA256:EECDH+aRSA+SHA384:EDH+aRSA+AESGCM:EDH+aRSA+SHA256:EDH+aRSA:EECDH:!aNULL:!eNULL:!MEDIUM:!LOW:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS:!RC4:!SEED"
  SSLHonorCipherOrder on
  Header set Strict-Transport-Security "max-age=31536000"

  DocumentRoot "/usr/share/jitsi-meet"
  <Directory "/usr/share/jitsi-meet">
    Options Indexes MultiViews Includes FollowSymLinks
    AddOutputFilter Includes html
    AllowOverride All
    Order allow,deny
    Allow from all
  </Directory>

  ErrorDocument 404 /static/404.html

  Alias "/config.js" "/etc/jitsi/meet/jitsi2.test.alt-config.js"
  <Location /config.js>
    Require all granted
  </Location>

  Alias "/external_api.js" "/usr/share/jitsi-meet/libs/external_api.min.js"
  <Location /external_api.js>
    Require all granted
  </Location>

  ProxyPreserveHost on
  ProxyPass /http-bind http://localhost:5280/http-bind/
  ProxyPassReverse /http-bind http://localhost:5280/http-bind/

  RewriteEngine on
  RewriteRule ^/([a-zA-Z0-9]+)$ /index.html
 </VirtualHost>
```

Установить пакет apache2-mod\_ssl, если он еще не установлен:
```
# apt-get install apache2-mod_ssl
```

Включить конфигурацию Apache:
```
# a2ensite jitsi2.test.alt
```

Запустить веб-сервер Apache2 и добавить его в автозагрузку:
```
# systemctl enable --now httpd2
```


## Работа с сервисом

Для общения достаточно запустить веб-браузер и перейти на сайт. В нашем примере сервис доступен по адресу: `https://jitsi2.test.alt`:

![Главная страница jitsi-meet](https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet1.png)

Для того чтобы начать новую конференцию, достаточно придумать и ввести название будущей конференции (в имени можно использовать буквы на любом языке и пробелы). Чуть ниже будет отображаться список прошлых созданных конференций.

**Примечание**

Зная URL конференции, в неё может зайти любой желающий. Конференция создаётся, когда в неё заходит первый участник, и существует до выхода последнего. Предотвратить случайных посетителей можно выбрав достаточно длинный URL на главной странице веб-портала, генератор по умолчанию с этим справляется.

Можно предотвратить неавторизованное создание новых конференций подробнее в [Отключение возможности неавторизованного создания новых конференций](https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/educational-resources-jiysi-meet-secure.html).

Ввести название конференции и нажать кнопку **ОК**. Будет создана конференция:

![Конференция jitsi-meet](https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet2.png)

**Примечание**

После создания конференции браузер попросит дать ему разрешение на использование веб-камеры и микрофона: ![Запрос на использование веб-камеры и микрофона](https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet2_2.png)

После создания конференции её администратором становится только тот, кто её создал. Администратор может удалять пользователей из конференции, выключать их микрофоны, давать пользователю слово. В случае если администратор покинул конференцию, то её администратором становится тот, кто подключился следующий после него.

Конференция существует до тех пор, пока в ней есть хотя бы один человек.

Внизу окна конференции находится панель управления:

![Панель управления jitsi-meet](https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet-control-panel.png)

Первая кнопка на панели управления кнопка **Показать экран**. Если нажать на эту кнопку, откроется окно, в котором можно выбрать, что будет демонстрироваться другим участникам конференции. Доступны следующие опции:

- экран монитора;
- окно приложения;
- определённая вкладка браузера.

![Выбор окна экрана](https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet3.png)

Нажатие на кнопку **Хочу говорить** сигнализирует организатору, что участник хочет говорить. В окне, соответствующем персонажу (справа), появится такой же значок ладони.

Кнопка **Чат** запускает чат в данной конференции:

![Чат конференции jitsi-meet](https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet-chat.png) Следующие кнопки на панели управления и их назначение:

- **Микрофон**  — позволяет включать и отключать микрофон;
- **Завершить**  — выход из конференции;
- **Камера**  — включение и выключение веб-камеры;
- **Вкл/Выкл плитку**  — вывести окна собеседников в центр чата;
- **Информация о чате**  — всплывающее окно, в котором приведена ссылка на конференцию. Здесь же администратор конференции может установить пароль для доступа к конференции: ![Установка пароля для доступа к конференции](https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet-password.png)
- **Больше**  — настройка дополнительных функций Jitsi Meet: ![Установка дополнительных функций Jitsi Meet](https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet-more.png)



## Отключение возможности неавторизованного создания новых конференций

Можно разрешить создавать новые конференции только авторизованным пользователям. При этом каждый раз, при попытке создать новую конференцию, Jitsi Meet запросит имя пользователя и пароль. После создания конференции другие пользователи смогут присоединиться к ней анонимно.

Для отключения возможности неавторизованного создания новых конференций, необходимо выполнить следующие действия:

- отредактировать файл `/etc/prosody/conf.d/jitsi2.test.alt.cfg.lua`, изменив в нем запись:
```
VirtualHost "jitsi2.test.alt"
authentication = "anonymous"
```
на:
```
VirtualHost "jitsi2.test.alt"
authentication = "internal_hashed"
```
- добавить в конец файла `/etc/prosody/conf.d/jitsi2.test.alt.cfg.lua` строки:
```
VirtualHost "guest.jitsi2.test.alt"
authentication = "anonymous"
c2s_require_encryption = false
```
Эти настройки позволят анонимным пользователям присоединяться к конференциям, созданным пользователем, прошедшим аутентификацию. При этом у гостя должен иметься уникальный адрес и пароль конференции (если этот пароль задан);
- в файле `/etc/jitsi/meet/jitsi2.test.alt-config.js` указать параметры анонимного домена:
```
domain: 'jitsi2.test.alt',
anonymousdomain: 'guest.jitsi2.test.alt',
```
- в файл `/etc/jitsi/jicofo/sip-communicator.properties` добавить строку:
```
org.jitsi.jicofo.auth.URL=XMPP:jitsi2.test.alt
```
- перезапустить процессы Jitsi Meet для загрузки новой конфигурации:
```
# prosodyctl restart
# systemctl restart jicofo
# systemctl restart jitsi-videobridge
```

Теперь при создании конференции сервер Jitsi Meet будет требовать ввести имя пользователя и пароль: ![Запрос пароля при создании конференции](https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet-admin.png)