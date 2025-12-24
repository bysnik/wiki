import{_ as a,c as n,o as p,ag as e}from"./chunks/framework.D4Vqf8I7.js";const h=JSON.parse('{"title":"Jitsi Meet","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/jitsi.md","filePath":"docs/wi/jitsi.md","lastUpdated":1766581123000}'),t={name:"docs/wi/jitsi.md"};function i(l,s,o,c,r,d){return p(),n("div",null,s[0]||(s[0]=[e(`<h1 id="jitsi-meet" tabindex="-1">Jitsi Meet <a class="header-anchor" href="#jitsi-meet" aria-label="Permalink to &quot;Jitsi Meet&quot;">​</a></h1><p><img src="https://meetrix.io/articles/content/images/2023/07/Jitsi.png" alt=""></p><h2 id="установка-пакетов" tabindex="-1">Установка пакетов <a class="header-anchor" href="#установка-пакетов" aria-label="Permalink to &quot;Установка пакетов&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-get install prosody jitsi-meet-prosody jitsi-meet-web jitsi-meet-web-config jicofo jitsi-videobridge</span></span></code></pre></div><h2 id="настроика-имени-хоста" tabindex="-1">Настройка имени хоста <a class="header-anchor" href="#настроика-имени-хоста" aria-label="Permalink to &quot;Настройка имени хоста&quot;">​</a></h2><p>Установить имя хоста системы на доменное имя, которое будет использоваться для Jitsi:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># hostnamectl set-hostname jitsi2</span></span></code></pre></div><p>Установить локальное сопоставление имени хоста сервера с IP-адресом 127.0.0.1, для этого дописать в файл <code>/etc/hosts</code> строку:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>127.0.0.1    jitsi2.test.alt jitsi2</span></span></code></pre></div><p><strong>Примечание</strong></p><p>После изменения имени компьютера могут перестать запускаться приложения. Для решения этой проблемы необходимо перезагрузить систему.</p><p>Проверить правильность установленного имени можно, выполнив команды:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># hostname</span></span>
<span class="line"><span>jitsi2</span></span>
<span class="line"><span># hostname -f</span></span>
<span class="line"><span>jitsi2.test.alt</span></span>
<span class="line"><span>$ ping &quot;$(hostname)&quot;</span></span>
<span class="line"><span>PING jitsi2.test.alt (127.0.0.1) 56(84) bytes of data.</span></span>
<span class="line"><span>64 bytes from localhost (127.0.0.1): icmp_seq=1 ttl=64 time=0.053 ms</span></span>
<span class="line"><span>[...]</span></span></code></pre></div><h2 id="настроика-xmpp-сервера-prosody" tabindex="-1">Настройка XMPP-сервера (prosody) <a class="header-anchor" href="#настроика-xmpp-сервера-prosody" aria-label="Permalink to &quot;Настройка XMPP-сервера (prosody)&quot;">​</a></h2><p>Создать каталог <code>/etc/prosody/conf.d</code> для хранения пользовательских конфигураций:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># mkdir -p /etc/prosody/conf.d</span></span></code></pre></div><p>В конец файла <code>/etc/prosody/prosody.cfg.lua</code> дописать строку:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Include &quot;conf.d/*.cfg.lua&quot;</span></span></code></pre></div><p>Создать конфигурационный файл prosody для вашего домена (например, <code>/etc/prosody/conf.d/jitsi2.test.alt.cfg.lua</code>) со следующим содержимым:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>plugin_paths = { &quot;/usr/share/jitsi-meet/prosody-plugins/&quot; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- domain mapper options, must at least have domain base set to use the mapper</span></span>
<span class="line"><span>muc_mapper_domain_base = &quot;jitsi2.test.alt&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cross_domain_bosh = false;</span></span>
<span class="line"><span>consider_bosh_secure = true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>----------- Virtual hosts -----------</span></span>
<span class="line"><span>VirtualHost &quot;jitsi2.test.alt&quot;</span></span>
<span class="line"><span>    authentication = &quot;anonymous&quot;</span></span>
<span class="line"><span>    ssl = {</span></span>
<span class="line"><span>       key = &quot;/var/lib/prosody/jitsi2.test.alt.key&quot;;</span></span>
<span class="line"><span>       certificate = &quot;/var/lib/prosody/jitsi2.test.alt.crt&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    speakerstats_component = &quot;speakerstats.jitsi2.test.alt&quot;</span></span>
<span class="line"><span>    conference_duration_component = &quot;conferenceduration.jitsi2.test.alt&quot;</span></span>
<span class="line"><span>         -- we need bosh</span></span>
<span class="line"><span>    modules_enabled = {</span></span>
<span class="line"><span>        &quot;bosh&quot;;</span></span>
<span class="line"><span>        &quot;pubsub&quot;;</span></span>
<span class="line"><span>        &quot;ping&quot;; -- Enable mod_ping</span></span>
<span class="line"><span>        &quot;speakerstats&quot;;</span></span>
<span class="line"><span>        &quot;turncredentials&quot;;</span></span>
<span class="line"><span>        &quot;conference_duration&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    c2s_require_encryption = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Component &quot;conference.jitsi2.test.alt&quot; &quot;muc&quot;</span></span>
<span class="line"><span>    storage = &quot;memory&quot;</span></span>
<span class="line"><span>    modules_enabled = {</span></span>
<span class="line"><span>        &quot;muc_meeting_id&quot;;</span></span>
<span class="line"><span>        &quot;muc_domain_mapper&quot;;</span></span>
<span class="line"><span>        -- &quot;token_verification&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    admins = { &quot;focus@auth.jitsi2.test.alt&quot; }</span></span>
<span class="line"><span>    muc_room_locking = false</span></span>
<span class="line"><span>    muc_room_default_public_jids = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>VirtualHost &quot;auth.jitsi2.test.alt&quot;</span></span>
<span class="line"><span>    ssl = {</span></span>
<span class="line"><span>        key = &quot;/var/lib/prosody/auth.jitsi2.test.alt.key&quot;;</span></span>
<span class="line"><span>        certificate = &quot;/var/lib/prosody/auth.jitsi2.test.alt.crt&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    authentication = &quot;internal_plain&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- internal muc component, meant to enable pools of jibri and jigasi clients</span></span>
<span class="line"><span>Component &quot;internal.auth.jitsi2.test.alt&quot; &quot;muc&quot;</span></span>
<span class="line"><span>    storage = &quot;memory&quot;</span></span>
<span class="line"><span>    modules_enabled = {</span></span>
<span class="line"><span>        &quot;ping&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    admins = { &quot;focus@auth.jitsi2.test.alt&quot;, &quot;jvb@auth.jitsi2.test.alt&quot; }</span></span>
<span class="line"><span>    muc_room_locking = false</span></span>
<span class="line"><span>    muc_room_default_public_jids = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Component &quot;focus.jitsi2.test.alt&quot;</span></span>
<span class="line"><span>    component_secret = &quot;secret1&quot; -- достаточно длинный пароль, он же JICOFO_SECRET</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Component &quot;speakerstats.jitsi2.test.alt&quot; &quot;speakerstats_component&quot;</span></span>
<span class="line"><span>    muc_component = &quot;conference.jitsi2.test.alt&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Component &quot;conferenceduration.jitsi2.test.alt&quot; &quot;conference_duration_component&quot;</span></span>
<span class="line"><span>    muc_component = &quot;conference.jitsi2.test.alt&quot;</span></span></code></pre></div><p>Сгенерировать сертификаты для виртуальных хостов jitsi2.test.alt и auth.jitsi2.test.alt:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># prosodyctl cert generate jitsi2.test.alt</span></span>
<span class="line"><span># prosodyctl cert generate auth.jitsi2.test.alt</span></span></code></pre></div><p>Зарегистрировать сертификаты в системе, как доверенные (сертификаты нужно регистрировать там, где устанавливается Jicofo):</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># ln -s /var/lib/prosody/jitsi2.test.alt.crt /etc/pki/ca-trust/source/anchors/</span></span>
<span class="line"><span># ln -s /var/lib/prosody/auth.jitsi2.test.alt.crt /etc/pki/ca-trust/source/anchors/</span></span>
<span class="line"><span># update-ca-trust</span></span></code></pre></div><p>Запустить prosody:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># prosodyctl start</span></span></code></pre></div><h2 id="настроика-jicofo" tabindex="-1">Настройка jicofo <a class="header-anchor" href="#настроика-jicofo" aria-label="Permalink to &quot;Настройка jicofo&quot;">​</a></h2><p>Jicofo подключается к XMPP-серверу и как внешний XMPP-компонент, и как пользовательский аккаунт с JID focus@auth.jitsi2.test.alt.</p><p>В файле <code>/etc/jitsi/jicofo/config</code> следует указать:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Jitsi Conference Focus settings</span></span>
<span class="line"><span># sets the host name of the XMPP server</span></span>
<span class="line"><span>JICOFO_HOST=localhost</span></span>
<span class="line"><span></span></span>
<span class="line"><span># sets the XMPP domain (default: none)</span></span>
<span class="line"><span>JICOFO_HOSTNAME=jitsi2.test.alt</span></span>
<span class="line"><span></span></span>
<span class="line"><span># sets the secret used to authenticate as an XMPP component</span></span>
<span class="line"><span>JICOFO_SECRET=secret1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># overrides the prefix for the XMPP component domain. Default: &quot;focus&quot;</span></span>
<span class="line"><span>#JICOFO_FOCUS_SUBDOMAIN=focus</span></span>
<span class="line"><span></span></span>
<span class="line"><span># sets the port to use for the XMPP component connection</span></span>
<span class="line"><span>JICOFO_PORT=5347</span></span>
<span class="line"><span></span></span>
<span class="line"><span># sets the XMPP domain name to use for XMPP user logins</span></span>
<span class="line"><span>JICOFO_AUTH_DOMAIN=auth.jitsi2.test.alt</span></span>
<span class="line"><span></span></span>
<span class="line"><span># sets the username to use for XMPP user logins</span></span>
<span class="line"><span>JICOFO_AUTH_USER=focus</span></span>
<span class="line"><span></span></span>
<span class="line"><span># sets the password to use for XMPP user logins</span></span>
<span class="line"><span>JICOFO_AUTH_PASSWORD=secret2</span></span>
<span class="line"><span></span></span>
<span class="line"><span># extra options to pass to the jicofo daemon</span></span>
<span class="line"><span>JICOFO_OPTS=&quot;\${JICOFO_FOCUS_SUBDOMAIN:+ --subdomain=$JICOFO_FOCUS_SUBDOMAIN}&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># adds java system props that are passed to jicofo (default are for home and logging config file)</span></span>
<span class="line"><span>JAVA_SYS_PROPS=&quot;-Dnet.java.sip.communicator.SC_HOME_DIR_LOCATION=/etc/jitsi</span></span>
<span class="line"><span>-Dnet.java.sip.communicator.SC_HOME_DIR_NAME=jicofo</span></span>
<span class="line"><span>-Dnet.java.sip.communicator.SC_LOG_DIR_LOCATION=/var/log/jitsi</span></span>
<span class="line"><span>-Djava.util.logging.config.file=/etc/jitsi/jicofo/logging.properties&quot;</span></span></code></pre></div><p><strong>Важно</strong></p><p>В строке</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>JICOFO_SECRET=secret1</span></span></code></pre></div><p>должен быть указан пароль, установленный в файле <code>/etc/prosody/conf.d/jitsi2.test.alt.cfg.lua</code>.</p><p>В строке</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>JICOFO_AUTH_PASSWORD=secret2</span></span></code></pre></div><p>должен быть указан пароль пользователя focus.</p><p>В файле <code>/etc/jitsi/jicofo/sip-communicator.properties</code> следует указать:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>org.jitsi.jicofo.health.ENABLE_HEALTH_CHECKS=true</span></span>
<span class="line"><span>org.jitsi.jicofo.BRIDGE_MUC=JvbBrewery@internal.auth.jitsi2.test.alt</span></span></code></pre></div><p>Запустите jicofo:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># systemctl start jicofo</span></span></code></pre></div><p>Убедитесь, что jicofo подключается к XMPP-серверу:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># curl -i localhost:8888/about/health</span></span>
<span class="line"><span>HTTP/1.1 500 Internal Server Error</span></span>
<span class="line"><span>Date: Wed, 04 May 2022 10:02:05 GMT</span></span>
<span class="line"><span>Content-Type: application/json</span></span>
<span class="line"><span>Content-Length: 56</span></span>
<span class="line"><span>Server: Jetty(9.4.15.v20190215)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>No operational bridges available (total bridge count: 0)</span></span></code></pre></div><p>Так как пока ни одного Jitsi Videobridge к серверу не подключено, jicofo ответит кодом ответа 500 и сообщением <em>No operational bridges available</em>. Если в ответе сообщение об ошибке иного рода — следует проверить настройки и связь между prosody и jicofo.</p><h2 id="настроика-jitsi-videobridge" tabindex="-1">Настройка jitsi-videobridge <a class="header-anchor" href="#настроика-jitsi-videobridge" aria-label="Permalink to &quot;Настройка jitsi-videobridge&quot;">​</a></h2><p>Заменить содержимое файла <code>/etc/jitsi/videobridge/config</code> на следующее:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Jitsi Videobridge settings</span></span>
<span class="line"><span></span></span>
<span class="line"><span># extra options to pass to the JVB daemon</span></span>
<span class="line"><span>JVB_OPTS=&quot;--apis=,&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># adds java system props that are passed to jvb (default are for home and logging config file)</span></span>
<span class="line"><span>JAVA_SYS_PROPS=&quot;-Dnet.java.sip.communicator.SC_HOME_DIR_LOCATION=/etc/jitsi</span></span>
<span class="line"><span>-Dnet.java.sip.communicator.SC_HOME_DIR_NAME=videobridge</span></span>
<span class="line"><span>-Dnet.java.sip.communicator.SC_LOG_DIR_LOCATION=/var/log/jitsi</span></span>
<span class="line"><span>-Djava.util.logging.config.file=/etc/jitsi/videobridge/logging.properties</span></span>
<span class="line"><span>-Dconfig.file=/etc/jitsi/videobridge/application.conf&quot;</span></span></code></pre></div><p>В качестве файлов конфигурации jitsi-videobridge используются файлы <code>/etc/jitsi/videobridge/application.conf</code> и <code>/etc/jitsi/videobridge/sip-communicator.properties</code>.</p><p>В файле <code>/etc/jitsi/videobridge/application.conf</code> необходимо указать:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>videobridge {</span></span>
<span class="line"><span>    stats {</span></span>
<span class="line"><span>        enabled = true</span></span>
<span class="line"><span>        transports = [</span></span>
<span class="line"><span>            { type = &quot;muc&quot; }</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    apis {</span></span>
<span class="line"><span>        xmpp-client {</span></span>
<span class="line"><span>            configs {</span></span>
<span class="line"><span>                shard {</span></span>
<span class="line"><span>                    hostname = &quot;localhost&quot;</span></span>
<span class="line"><span>                    domain = &quot;auth.jitsi2.test.alt&quot;</span></span>
<span class="line"><span>                    username = &quot;jvb&quot;</span></span>
<span class="line"><span>                    password = &quot;secret3&quot;</span></span>
<span class="line"><span>                    muc_jids = &quot;JvbBrewery@internal.auth.jitsi2.test.alt&quot;</span></span>
<span class="line"><span>                    # The muc_nickname must be unique across all instances</span></span>
<span class="line"><span>                    muc_nickname = &quot;jvb-mid-123&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>Важно</strong></p><p>В строке</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>password = &quot;secret3&quot;</span></span></code></pre></div><p>должен быть указан пароль пользователя jvb.</p><p>Вместо слова shard можно использовать любой идентификатор (оно идентифицирует подключение к xmpp-серверу и jicofo).</p><p>Измените содержимое файла <code>/etc/jitsi/videobridge/sip-communicator.properties</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>org.ice4j.ice.harvest.DISABLE_AWS_HARVESTER=true</span></span>
<span class="line"><span>org.ice4j.ice.harvest.STUN_MAPPING_HARVESTER_ADDRESSES=meet-jit-si-turnrelay.jitsi.net:443</span></span>
<span class="line"><span>org.jitsi.videobridge.ENABLE_STATISTICS=true</span></span>
<span class="line"><span>org.jitsi.videobridge.STATISTICS_TRANSPORT=muc</span></span>
<span class="line"><span>org.jitsi.videobridge.xmpp.user.shard.HOSTNAME=localhost</span></span>
<span class="line"><span>org.jitsi.videobridge.xmpp.user.shard.DOMAIN=auth.jitsi2.test.alt</span></span>
<span class="line"><span>org.jitsi.videobridge.xmpp.user.shard.USERNAME=jvb</span></span>
<span class="line"><span>org.jitsi.videobridge.xmpp.user.shard.PASSWORD=secret3</span></span>
<span class="line"><span>org.jitsi.videobridge.xmpp.user.shard.MUC_JIDS=JvbBrewery@internal.auth.jitsi2.test.alt</span></span>
<span class="line"><span>org.jitsi.videobridge.xmpp.user.shard.MUC_NICKNAME=6d8b40cb-fe32-49f5-a5f6-13d2c3f95bba</span></span></code></pre></div><p><strong>Примечание</strong></p><p>Если JVB-машина отделена от клиентов при помощи NAT, то потребуется донастройка.</p><p>Запустите JVB:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># systemctl start jitsi-videobridge</span></span></code></pre></div><p>Убедитесь, что между JVB и jicofo есть связь:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># curl -i localhost:8888/about/health</span></span>
<span class="line"><span>HTTP/1.1 200 OK</span></span>
<span class="line"><span>Date: Wed, 04 May 2022 10:06:04 GMT</span></span>
<span class="line"><span>Content-Length: 0</span></span>
<span class="line"><span>Server: Jetty(9.4.15.v20190215)</span></span></code></pre></div><p>Если всё сделано правильно, jicofo на healthcheck-запрос будет отдавать HTTP-код 200.</p><h2 id="настроика-веб-приложения-jitsi-meet" tabindex="-1">Настройка веб-приложения Jitsi Meet <a class="header-anchor" href="#настроика-веб-приложения-jitsi-meet" aria-label="Permalink to &quot;Настройка веб-приложения Jitsi Meet&quot;">​</a></h2><p>Получить SSL/TLS-сертификат для домена.</p><p><strong>Примечание</strong></p><p>Можно создать сертификат без обращения к УЦ. При использовании такого сертификата в браузере будут выводиться предупреждения.</p><p>Для создания самоподписанного сертификата следует:</p><ul><li>создать корневой ключ:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># openssl genrsa -out rootCA.key 2048</span></span></code></pre></div><ul><li>создать корневой сертификат:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># openssl req -x509 -new -key rootCA.key -days 10000 -out rootCA.crt -subj &quot;/C=RU/ST=Russia/L=Moscow/CN=SuperPlat CA Root&quot;</span></span></code></pre></div><ul><li>сгенерировать ключ:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># openssl genrsa -out jitsi2.test.alt.key 2048</span></span></code></pre></div><ul><li>создать запрос на сертификат (тут важно указать имя сервера: домен или IP):</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># openssl req -new -key jitsi2.test.alt.key -out jitsi2.test.alt.csr -subj &quot;/C=RU/L=Moscow/CN=jitsi2.test.alt&quot;</span></span></code></pre></div><ul><li>подписать запрос на сертификат корневым сертификатом:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># openssl x509 -req -in jitsi2.test.alt.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out jitsi2.test.alt.crt -days 5000</span></span>
<span class="line"><span>Signature ok</span></span>
<span class="line"><span>subject=C = RU, CN = jitsi2.test.alt</span></span>
<span class="line"><span>Getting CA Private Key</span></span></code></pre></div><p>Положить ключ и сертификат в папку <code>/etc/jitsi/meet/</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># cp jitsi2.test.alt.crt /etc/jitsi/meet/</span></span>
<span class="line"><span># cp jitsi2.test.alt.key /etc/jitsi/meet/</span></span></code></pre></div><p>В пакете jitsi-meet-web-config есть примеры конфигурации для веб-клиента (*-config.js) и веб-сервера (*.example.apache, *.example).</p><p>Внести изменения в файл <code>/etc/httpd2/conf/sites-available/jitsi2.test.alt.conf</code> (изменить имя, указать сертификат):</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;VirtualHost *:80&gt;</span></span>
<span class="line"><span>    ServerName jitsi2.test.alt</span></span>
<span class="line"><span>    Redirect permanent / https://jitsi2.test.alt/</span></span>
<span class="line"><span>    RewriteEngine On</span></span>
<span class="line"><span>    RewriteCond %{HTTPS} off</span></span>
<span class="line"><span>    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]</span></span>
<span class="line"><span>&lt;/VirtualHost&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;VirtualHost *:443&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ServerName jitsi2.test.alt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  SSLProtocol TLSv1 TLSv1.1 TLSv1.2</span></span>
<span class="line"><span>  SSLEngine on</span></span>
<span class="line"><span>  SSLProxyEngine on</span></span>
<span class="line"><span>  SSLCertificateFile /etc/jitsi/meet/jitsi2.test.alt.crt</span></span>
<span class="line"><span>  SSLCertificateKeyFile /etc/jitsi/meet/jitsi2.test.alt.key</span></span>
<span class="line"><span>  SSLCipherSuite &quot;EECDH+ECDSA+AESGCM:EECDH+aRSA+AESGCM:EECDH+ECDSA+SHA256:EECDH+aRSA+SHA256:EECDH+ECDSA+SHA384:EECDH+ECDSA+SHA256:EECDH+aRSA+SHA384:EDH+aRSA+AESGCM:EDH+aRSA+SHA256:EDH+aRSA:EECDH:!aNULL:!eNULL:!MEDIUM:!LOW:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS:!RC4:!SEED&quot;</span></span>
<span class="line"><span>  SSLHonorCipherOrder on</span></span>
<span class="line"><span>  Header set Strict-Transport-Security &quot;max-age=31536000&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  DocumentRoot &quot;/usr/share/jitsi-meet&quot;</span></span>
<span class="line"><span>  &lt;Directory &quot;/usr/share/jitsi-meet&quot;&gt;</span></span>
<span class="line"><span>    Options Indexes MultiViews Includes FollowSymLinks</span></span>
<span class="line"><span>    AddOutputFilter Includes html</span></span>
<span class="line"><span>    AllowOverride All</span></span>
<span class="line"><span>    Order allow,deny</span></span>
<span class="line"><span>    Allow from all</span></span>
<span class="line"><span>  &lt;/Directory&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ErrorDocument 404 /static/404.html</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Alias &quot;/config.js&quot; &quot;/etc/jitsi/meet/jitsi2.test.alt-config.js&quot;</span></span>
<span class="line"><span>  &lt;Location /config.js&gt;</span></span>
<span class="line"><span>    Require all granted</span></span>
<span class="line"><span>  &lt;/Location&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Alias &quot;/external_api.js&quot; &quot;/usr/share/jitsi-meet/libs/external_api.min.js&quot;</span></span>
<span class="line"><span>  &lt;Location /external_api.js&gt;</span></span>
<span class="line"><span>    Require all granted</span></span>
<span class="line"><span>  &lt;/Location&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ProxyPreserveHost on</span></span>
<span class="line"><span>  ProxyPass /http-bind http://localhost:5280/http-bind/</span></span>
<span class="line"><span>  ProxyPassReverse /http-bind http://localhost:5280/http-bind/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  RewriteEngine on</span></span>
<span class="line"><span>  RewriteRule ^/([a-zA-Z0-9]+)$ /index.html</span></span>
<span class="line"><span> &lt;/VirtualHost&gt;</span></span></code></pre></div><p>Установить пакет apache2-mod_ssl, если он еще не установлен:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># apt-get install apache2-mod_ssl</span></span></code></pre></div><p>Включить конфигурацию Apache:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># a2ensite jitsi2.test.alt</span></span></code></pre></div><p>Запустить веб-сервер Apache2 и добавить его в автозагрузку:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># systemctl enable --now httpd2</span></span></code></pre></div><h2 id="работа-с-сервисом" tabindex="-1">Работа с сервисом <a class="header-anchor" href="#работа-с-сервисом" aria-label="Permalink to &quot;Работа с сервисом&quot;">​</a></h2><p>Для общения достаточно запустить веб-браузер и перейти на сайт. В нашем примере сервис доступен по адресу: <code>https://jitsi2.test.alt</code>:</p><p><img src="https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet1.png" alt="Главная страница jitsi-meet"></p><p>Для того чтобы начать новую конференцию, достаточно придумать и ввести название будущей конференции (в имени можно использовать буквы на любом языке и пробелы). Чуть ниже будет отображаться список прошлых созданных конференций.</p><p><strong>Примечание</strong></p><p>Зная URL конференции, в неё может зайти любой желающий. Конференция создаётся, когда в неё заходит первый участник, и существует до выхода последнего. Предотвратить случайных посетителей можно выбрав достаточно длинный URL на главной странице веб-портала, генератор по умолчанию с этим справляется.</p><p>Можно предотвратить неавторизованное создание новых конференций подробнее в <a href="https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/educational-resources-jiysi-meet-secure.html" target="_blank" rel="noreferrer">Отключение возможности неавторизованного создания новых конференций</a>.</p><p>Ввести название конференции и нажать кнопку <strong>ОК</strong>. Будет создана конференция:</p><p><img src="https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet2.png" alt="Конференция jitsi-meet"></p><p><strong>Примечание</strong></p><p>После создания конференции браузер попросит дать ему разрешение на использование веб-камеры и микрофона: <img src="https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet2_2.png" alt="Запрос на использование веб-камеры и микрофона"></p><p>После создания конференции её администратором становится только тот, кто её создал. Администратор может удалять пользователей из конференции, выключать их микрофоны, давать пользователю слово. В случае если администратор покинул конференцию, то её администратором становится тот, кто подключился следующий после него.</p><p>Конференция существует до тех пор, пока в ней есть хотя бы один человек.</p><p>Внизу окна конференции находится панель управления:</p><p><img src="https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet-control-panel.png" alt="Панель управления jitsi-meet"></p><p>Первая кнопка на панели управления кнопка <strong>Показать экран</strong>. Если нажать на эту кнопку, откроется окно, в котором можно выбрать, что будет демонстрироваться другим участникам конференции. Доступны следующие опции:</p><ul><li>экран монитора;</li><li>окно приложения;</li><li>определённая вкладка браузера.</li></ul><p><img src="https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet3.png" alt="Выбор окна экрана"></p><p>Нажатие на кнопку <strong>Хочу говорить</strong> сигнализирует организатору, что участник хочет говорить. В окне, соответствующем персонажу (справа), появится такой же значок ладони.</p><p>Кнопка <strong>Чат</strong> запускает чат в данной конференции:</p><p><img src="https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet-chat.png" alt="Чат конференции jitsi-meet"> Следующие кнопки на панели управления и их назначение:</p><ul><li><strong>Микрофон</strong>  — позволяет включать и отключать микрофон;</li><li><strong>Завершить</strong>  — выход из конференции;</li><li><strong>Камера</strong>  — включение и выключение веб-камеры;</li><li><strong>Вкл/Выкл плитку</strong>  — вывести окна собеседников в центр чата;</li><li><strong>Информация о чате</strong>  — всплывающее окно, в котором приведена ссылка на конференцию. Здесь же администратор конференции может установить пароль для доступа к конференции: <img src="https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet-password.png" alt="Установка пароля для доступа к конференции"></li><li><strong>Больше</strong>  — настройка дополнительных функций Jitsi Meet: <img src="https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet-more.png" alt="Установка дополнительных функций Jitsi Meet"></li></ul><h2 id="отключение-возможности-неавторизованного-создания-новых-конференции" tabindex="-1">Отключение возможности неавторизованного создания новых конференций <a class="header-anchor" href="#отключение-возможности-неавторизованного-создания-новых-конференции" aria-label="Permalink to &quot;Отключение возможности неавторизованного создания новых конференций&quot;">​</a></h2><p>Можно разрешить создавать новые конференции только авторизованным пользователям. При этом каждый раз, при попытке создать новую конференцию, Jitsi Meet запросит имя пользователя и пароль. После создания конференции другие пользователи смогут присоединиться к ней анонимно.</p><p>Для отключения возможности неавторизованного создания новых конференций, необходимо выполнить следующие действия:</p><ul><li>отредактировать файл <code>/etc/prosody/conf.d/jitsi2.test.alt.cfg.lua</code>, изменив в нем запись:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>VirtualHost &quot;jitsi2.test.alt&quot;</span></span>
<span class="line"><span>authentication = &quot;anonymous&quot;</span></span></code></pre></div><p>на:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>VirtualHost &quot;jitsi2.test.alt&quot;</span></span>
<span class="line"><span>authentication = &quot;internal_hashed&quot;</span></span></code></pre></div><ul><li>добавить в конец файла <code>/etc/prosody/conf.d/jitsi2.test.alt.cfg.lua</code> строки:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>VirtualHost &quot;guest.jitsi2.test.alt&quot;</span></span>
<span class="line"><span>authentication = &quot;anonymous&quot;</span></span>
<span class="line"><span>c2s_require_encryption = false</span></span></code></pre></div><p>Эти настройки позволят анонимным пользователям присоединяться к конференциям, созданным пользователем, прошедшим аутентификацию. При этом у гостя должен иметься уникальный адрес и пароль конференции (если этот пароль задан);</p><ul><li>в файле <code>/etc/jitsi/meet/jitsi2.test.alt-config.js</code> указать параметры анонимного домена:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>domain: &#39;jitsi2.test.alt&#39;,</span></span>
<span class="line"><span>anonymousdomain: &#39;guest.jitsi2.test.alt&#39;,</span></span></code></pre></div><ul><li>в файл <code>/etc/jitsi/jicofo/sip-communicator.properties</code> добавить строку:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>org.jitsi.jicofo.auth.URL=XMPP:jitsi2.test.alt</span></span></code></pre></div><ul><li>перезапустить процессы Jitsi Meet для загрузки новой конфигурации:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># prosodyctl restart</span></span>
<span class="line"><span># systemctl restart jicofo</span></span>
<span class="line"><span># systemctl restart jitsi-videobridge</span></span></code></pre></div><p>Теперь при создании конференции сервер Jitsi Meet будет требовать ввести имя пользователя и пароль: <img src="https://docs.altlinux.org/ru-RU/alt-server/10.1/html/alt-server/images/jitsi-meet-admin.png" alt="Запрос пароля при создании конференции"></p>`,129)]))}const g=a(t,[["render",i]]);export{h as __pageData,g as default};
