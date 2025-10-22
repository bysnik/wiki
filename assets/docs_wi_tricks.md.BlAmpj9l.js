import{_ as n,c as a,o as p,ag as e}from"./chunks/framework.D4Vqf8I7.js";const h=JSON.parse('{"title":"Всякие фишки и мелочь","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/tricks.md","filePath":"docs/wi/tricks.md","lastUpdated":1761126589000}'),l={name:"docs/wi/tricks.md"};function i(t,s,c,o,r,d){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="всякие-фишки-и-мелочь" tabindex="-1">Всякие фишки и мелочь <a class="header-anchor" href="#всякие-фишки-и-мелочь" aria-label="Permalink to &quot;Всякие фишки и мелочь&quot;">​</a></h1><h2 id="проверка-работы-динамиков" tabindex="-1">Проверка работы динамиков <a class="header-anchor" href="#проверка-работы-динамиков" aria-label="Permalink to &quot;Проверка работы динамиков&quot;">​</a></h2><p>В Linux можно проверить звук через терминал несколькими способами. Вот основные из них:</p><p><strong>Проверка через <code>speaker-test</code> (встроенный тест динамика)</strong></p><p>Утилита <code>speaker-test</code> генерирует тестовый звук.</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">speaker-test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wav</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span></span></code></pre></div><ul><li><code>-t wav</code> — тип сигнала (можно также <code>sine</code> для синусоиды).</li><li><code>-c 2</code> — количество каналов (2 = стерео).</li></ul><p>Чтобы остановить — нажмите <strong>Ctrl+C</strong>.</p><p>Если команда не найдена, установите пакет <code>alsa-utils</code>:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> alsa-utils</span></span></code></pre></div><p><strong>Проверка уровня громкости и состояния звука</strong></p><p>Через ALSA:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">amixer</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Master</span></span></code></pre></div><p>Если звук выключен:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">amixer</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sset</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Master</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> unmute</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">amixer</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sset</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Master</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 80%</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   # установить громкость</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pactl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sinks</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> short</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # список аудиовыходов</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pactl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get-sink-volume</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @DEFAULT_SINK@</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   # текущая громкость</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pactl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set-sink-volume</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @DEFAULT_SINK@</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 80%</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   # установить громкость</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pactl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set-sink-mute</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @DEFAULT_SINK@</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   # включить звук</span></span></code></pre></div><p><strong>Проверка, работает ли звуковая карта</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lspci</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> audio</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># или для USB-устройств:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lsusb</span></span></code></pre></div><p>Также можно посмотреть логи:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dmesg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> audio</span></span></code></pre></div><hr><p><strong>Простой тест через <code>beep</code> (если поддерживается)</strong></p><p>Некоторые системы поддерживают системный спикер:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;\\a&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># или</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">beep</span></span></code></pre></div><blockquote><p>Утилита <code>beep</code> может потребовать установки и прав на <code>/dev/input/by-path/...</code>.</p></blockquote><h2 id="проброс-репозитория-в-закрытыи-контур" tabindex="-1">Проброс репозитория в закрытый контур <a class="header-anchor" href="#проброс-репозитория-в-закрытыи-контур" aria-label="Permalink to &quot;Проброс репозитория в закрытый контур&quot;">​</a></h2><ol><li>Разворачивают локальный репо.</li><li>Далее с делают копию на патаскун нашего репо.</li><li>Проверяют патаскун на антивирусе (требования ФСТЭК) .</li><li>С проверенного патаскуна синхронизируют с локальным репо в закрытом контуре. Синхранизации наш репо- патаскун-локальный репо в закрытом контуре делают через rsync. Это стандартная процедура для закрытого контура.</li></ol><p>Второй вариант. Если используются сертифицированные версии МЭ. И есть доступ через них в закрытый контур (Физически не разделены) То регулятор разрешает так скажем однустороннюю связь по определенным портам. Тогда Локальный репо в открытой их сети. Проверка этого репо чере антивирус. И синхронизациия уже этого репо с репо в закрытой сети через сертифицированный МЭ.</p><p>Обязательно в любом случае повторно проверяется перед использованием репо в закрытой сети антивирусом. Желательно другим. То есть в KAV в открытой (не сертифицированной сети) или патаскун. В Закрытой Drweb. Или Наоборот. Но это рекомендация ФСТЭК. Можно и одним но опять не рекомендовано. Но наказание за это не предусмотрено. Максимум рекомендация ФСТЭК при проверке ОИ.</p><h2 id="чем-можно-проверить-диск-в-альт-линукс" tabindex="-1">Чем можно проверить диск в Альт Линукс <a class="header-anchor" href="#чем-можно-проверить-диск-в-альт-линукс" aria-label="Permalink to &quot;Чем можно проверить диск в Альт Линукс&quot;">​</a></h2><p>smartctl (smartmontools)</p><p>Дополнительно в gnome доступен следующий инструмент: gnome-disk-utility</p><p>hdparm — Инструмент для тестирования скорости чтения (бенчмаркинг) и управления параметрами работы в основном HDD-дисков через низкоуровневые настройки.</p><p>badblocks — Утилита для прямого поиска сбойных секторов на поверхности диска.</p><p>fsck — стандартная утилита для проверки и исправления ошибок файловых систем (ext2/ext3/ext4, FAT, NTFS и др.)</p><p>testdisk</p><p>btrfs check</p><h2 id="что-то-про-ansible" tabindex="-1">что то про Ansible <a class="header-anchor" href="#что-то-про-ansible" aria-label="Permalink to &quot;что то про Ansible&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">TIP</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Далее — доставка на свежеустановленную систему ключей Ansible и установка hostname. Если в ОСи будут установлены ключи от Ansible, то дальше можно все сделать через сам Ansible. Тут нам поможет пакет alterator-postinstall и простейший скрипт, который доставит в /root/.ssh/authorized_keys нужные ключи. У меня 2 Ansible, 1 в головном офисе, и 1 в филиале, канал с которым, мягко говоря, оставляет желать лучшего. Поэтому 2 ключа. Так же нужно позаботиться об инженерах техподдержки, и закинуть в свежую систему скрипт, который на основе существующих в AD записей для компьютеров, будет подбирать подходящий hostname для нового ПК перед вводом в домен. Эти скрипты тоже нужно будет доставить в целевую систему. Скрипт назовем 87-set-ansbls-keys.sh, и напишем в нем следующее (ну почти так, ключи я вам не покажу =Ъ):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#!/bin/sh</span></span></code></pre></div><p>. install2-init-functions</p><p>echo &quot;ssh-rsa бла-бла-бла-набор-символов root@ansible-filial-hostname&quot; &gt; $destdir/root/.ssh/authorized_keys echo &quot;ssh-rsa бла-бла-бла-набор-символов root@ansible-hostname&quot; &gt;&gt; $destdir/root/.ssh/authorized_keys</p><p>cp /var/ChangeHostName.py $destdir/var/</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Тут одна тонкость — таргет указывается с преффиксом $destdir, иначе установщик, выполняя директиву postinstall, запишет ключи в свой /root, а не в устанавливаемую ОС.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Скрипт поиска подходящего hostname прост, как 5 копеек (которых никто не видел уже черт знает сколько лет). Я создал в AD бесправную учетку, чтобы Python мог сходить в AD и считать уже существующие в определенной OU учетки компьютеров, и выбрать следующий по списку.</span></span></code></pre></div><p>#!/usr/bin/python3</p><h1 id="coding-utf-8" tabindex="-1">-<em>- coding: utf-8 -</em>- <a class="header-anchor" href="#coding-utf-8" aria-label="Permalink to &quot;-*- coding: utf-8 -*-&quot;">​</a></h1><p>import os import sys from getpass import getpass from ldap3 import Server, Connection, SUBTREE, LEVEL import time</p><p>username=&quot;lab.ru\\linux_to_domain&quot; password=&quot;Passw0rd!&quot;</p><p>server = Server(&quot;dc-1.lab.ru&quot;, port=389, use_ssl=False, get_info=&#39;ALL&#39;) connection = Connection(server, user=username, password=password, fast_decoder=True, auto_bind=True, auto_referrals=True, check_names=False, read_only=True, lazy=False, raise_exceptions=False)</p><p>hostnamedigit=1 hostname = &quot;ARM-&quot;+&#39;{:0&gt;4}&#39;.format(hostnamedigit)</p><p>def get_all_ad_hosts(connection):</p><pre><code>results = list()
elements = connection.extend.standard.paged_search(
    search_base=&#39;OU=LINUX,OU=Computers,dc=lab,dc=ru&#39;,
    search_filter=&#39;(&amp;(objectCategory=computer)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))&#39;,
    search_scope=SUBTREE,
    attributes=[&#39;name&#39;],
    paged_size=100)
for element in elements:
    host = dict()
    if &#39;dn&#39; in element:
        host[&#39;dn&#39;] = element[&#39;dn&#39;]
        host[&#39;name&#39;] = element[&#39;attributes&#39;][u&#39;name&#39;][0]
        results.append(host)
return(results)
connection.unbind()
</code></pre><p>def search_for_duplicatename(hostname,list_of_computers): for computer in list_of_computers: if computer[&#39;name&#39;].casefold() == hostname.casefold(): print(hostname+&quot; already exists&quot;) return 1 return 0</p><p>computers = get_all_ad_hosts(connection) while search_for_duplicatename(hostname, computers) != 0: hostnamedigit += 1 hostname = &quot;ARM-&quot;+&#39;{:0&gt;4}&#39;.format(hostnamedigit) print(hostname) os.system(&quot;hostnamectl set-hostname &quot;+hostname) print(&quot;Your system is gonna reboot in 10 seconds....&quot;) time.sleep(10) os.system(&quot;reboot now&quot;)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Теперь о том, куда же эти скрипты поместить. Целевая директория — архив altinst, находящийся в корне ISO. В архиве скрипт нужно расположить в директории /usr/share/install2/postinstall.d/ и не забыть сделать его исполняемым, иначе чуда не произойдет. Скрипт подбора hostname я положил в /var, хотя это не играет особой роли.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Оговорюсь лишь о том, что для доставки файлов, открытых ключей и прочего, мы опубликовали их рядом с репозиториями. Там все равно web-сервер поднят, почему бы его не использовать?</span></span>
<span class="line"><span>3.1. Доставить внутренние сертификаты, импортировать их</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- name: Install local CA certs</span></span>
<span class="line"><span>  gather_facts: false</span></span>
<span class="line"><span>  hosts: simply</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span>    - name: Execute script</span></span>
<span class="line"><span>      shell: |</span></span>
<span class="line"><span>        mkdir /tmp/certs</span></span>
<span class="line"><span>        cd /tmp/certs</span></span>
<span class="line"><span>        wget --no-check-certificate https://local-repo-srv.lab.ru/alt_custom-repo/certs/root.crt</span></span>
<span class="line"><span>        wget --no-check-certificate https://local-repo-srv.lab.ru/alt_custom-repo/certs/subca.crt</span></span>
<span class="line"><span>        cp ./rootca.crt /etc/pki/ca-trust/source/anchors/</span></span>
<span class="line"><span>        cp ./subca.crt /etc/pki/ca-trust/source/anchors/</span></span>
<span class="line"><span>        chmod a-x /etc/pki/ca-trust/source/anchors/*</span></span>
<span class="line"><span>        update-ca-trust extract</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3.2. Добавить локальные репозитории</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- name: add repositories</span></span>
<span class="line"><span>  gather_facts: false</span></span>
<span class="line"><span>  hosts: simply</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span>    - name: delete all /etc/apt/sources.list.d/</span></span>
<span class="line"><span>      shell: rm -f /etc/apt/sources.list.d/*</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: create lab.list</span></span>
<span class="line"><span>      copy:</span></span>
<span class="line"><span>        dest: /etc/apt/sources.list.d/lab.list</span></span>
<span class="line"><span>        content: |</span></span>
<span class="line"><span>          rpm [p10] http:// local-repo-srv.lab.ru /alt_main-repo p10/branch/x86_64 classic</span></span>
<span class="line"><span>          rpm [p10] http:// local-repo-srv.lab.ru /alt_main-repo p10/branch/noarch classic</span></span>
<span class="line"><span>          rpm [alt_custom_repo] http:// local-repo-srv.lab.ru /alt_custom-repo x86_64 alt_custom_repo</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: add custom gpg key</span></span>
<span class="line"><span>      shell: curl http:// local-repo-srv.lab.ru /alt_custom-repo/x86_64/base/custom_repo.pgp &gt;&gt; /etc/apt/custom_repo.pgp &amp;&amp; gpg --no-default-keyring --keyring /usr/lib/alt-gpgkeys/pubring.gpg --import /etc/apt/custom_repo.pgp</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: add /etc/apt/vendors.list.d/lab.list</span></span>
<span class="line"><span>      copy:</span></span>
<span class="line"><span>        dest: /etc/apt/vendors.list.d/lab.list</span></span>
<span class="line"><span>        content: |</span></span>
<span class="line"><span>          simple-key &quot;alt_custom_repo&quot; {</span></span>
<span class="line"><span>          Fingerprint &quot;бла-бла-бла-буквы-и-цЫфры&quot;;</span></span>
<span class="line"><span>          Name &quot;Vasily &lt;Vasya@lab.ru&gt;&quot;;</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: apt-get update</span></span>
<span class="line"><span>      shell: |</span></span>
<span class="line"><span>apt-get update</span></span>
<span class="line"><span>	apt-get dist-upgrade -y</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3.3. Установить в систему весь требуемый софт, …</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- name: soft installation</span></span>
<span class="line"><span>  gather_facts: false</span></span>
<span class="line"><span>  hosts: simply</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: update</span></span>
<span class="line"><span>      shell: apt-get update -y</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: install packages</span></span>
<span class="line"><span>      apt_rpm:</span></span>
<span class="line"><span>        name:</span></span>
<span class="line"><span>          - sudo</span></span>
<span class="line"><span>          - apt-scripts</span></span>
<span class="line"><span>          - openssh</span></span>
<span class="line"><span>          - task-auth-ad-sssd</span></span>
<span class="line"><span>          - sssd-ad</span></span>
<span class="line"><span>          - samba-client</span></span>
<span class="line"><span>          - 1c-preinstall-full</span></span>
<span class="line"><span>          - vmware-view-preinstall</span></span>
<span class="line"><span>          - onlyoffice-desktopeditors</span></span>
<span class="line"><span>          - nano</span></span>
<span class="line"><span>          - firefox</span></span>
<span class="line"><span>          - libinput</span></span>
<span class="line"><span>          - libinput-devel</span></span>
<span class="line"><span>          - xorg-drv-libinput</span></span>
<span class="line"><span>          - xorg-drv-libinput-devel</span></span>
<span class="line"><span>          - x11vnc</span></span>
<span class="line"><span>          - x11vnc-service</span></span>
<span class="line"><span>          - 1c-enterprise-8.3.18.1483-thin-client</span></span>
<span class="line"><span>          - vlc</span></span>
<span class="line"><span>          - google-chrome-stable</span></span>
<span class="line"><span>          - autofs</span></span>
<span class="line"><span>          - vmware-horizon-client</span></span>
<span class="line"><span>          - system-config-printer</span></span>
<span class="line"><span>          - kde5-spectacle</span></span>
<span class="line"><span>          - evolution</span></span>
<span class="line"><span>          - evolution-ews</span></span>
<span class="line"><span>          - conky</span></span>
<span class="line"><span>          - remmina</span></span>
<span class="line"><span>          - remmina-plugins</span></span>
<span class="line"><span>          - cups</span></span>
<span class="line"><span>        state: present</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: remove Libre, stop cups</span></span>
<span class="line"><span>      shell: |</span></span>
<span class="line"><span>            apt-get remove libreoffice5 -y &amp;&amp; apt-get clean -y &amp;&amp; apt-get autoremove -y</span></span>
<span class="line"><span>            systemctl stop cups</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#для VNC есть еще таска для установки пароля, но я вам ее не покажу.</span></span>
<span class="line"><span>#Там тривиально</span></span>
<span class="line"><span>    - name: x11vnc config</span></span>
<span class="line"><span>      copy:</span></span>
<span class="line"><span>        dest: /usr/sbin/x11vnc-start-daemon</span></span>
<span class="line"><span>        content: |</span></span>
<span class="line"><span>          #!/bin/bash</span></span>
<span class="line"><span>          AUTH=\`ps aux | grep &quot;\\-auth &quot; | head -n 1\`</span></span>
<span class="line"><span>          AUTH=\${AUTH/*\\-auth /}</span></span>
<span class="line"><span>          AUTH=\${AUTH/ */}</span></span>
<span class="line"><span>          /usr/bin/x11vnc -auth $AUTH -dontdisconnect -usepw -shared -forever -rfbport 5900 -rfbauth /etc/vncpasswd -display :0 -repeat</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: catalogs and files</span></span>
<span class="line"><span>      file:</span></span>
<span class="line"><span>        path: &quot;{{ item.path }}&quot;</span></span>
<span class="line"><span>        state: &quot;{{ item.state }}&quot;</span></span>
<span class="line"><span>      with_items:</span></span>
<span class="line"><span>        - { path: /etc/skel/Рабочий стол/, state: directory } #каталог для создания ярлыков</span></span>
<span class="line"><span>        - { path: /mnt/share/, state: directory } #каталог для монтирования «сетевых дисков»</span></span>
<span class="line"><span>        - { path: /var/ChangeHostName.py, state: absent } #удаление скрипта подбора hostname</span></span>
<span class="line"><span>        - { path: /opt/1cv8/x86_64/8.3.18.1483/libstdc++.so.6, state: absent } #для работы 1С этот файл надо удалить. Не спрашивайте, это не баг, это фича.</span></span>
<span class="line"><span>        - { path: /etc/skel/.1C/1cestart/, state: directory } #каталог для монтирования шары со списком баз для 1С</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: create links</span></span>
<span class="line"><span>      file:</span></span>
<span class="line"><span>        src: &quot;{{ item.src }}&quot;</span></span>
<span class="line"><span>        dest: &quot;{{ item.dest }}&quot;</span></span>
<span class="line"><span>        state: &quot;{{ item.state }}&quot;</span></span>
<span class="line"><span>        mode: &quot;{{ item.mode }}&quot;</span></span>
<span class="line"><span>        force: yes</span></span>
<span class="line"><span>      with_items:</span></span>
<span class="line"><span>        - { src: /mnt/share/, dest: /etc/skel/Рабочий стол/Сетевые_Папки, state: link, mode: &#39;755&#39; }</span></span>
<span class="line"><span>        - { src: /usr/share/applications/firefox.desktop, dest: /etc/skel/Рабочий стол/firefox.desktop, state: link, mode: &#39;755&#39; }</span></span>
<span class="line"><span>        - { src: /usr/share/applications/google-chrome.desktop, dest: /etc/skel/Рабочий стол/google-chrome.desktop, state: link, mode: &#39;755&#39; }</span></span>
<span class="line"><span>        - { src: /usr/share/applications/1cestart-8.3.18-1483.desktop, dest: /etc/skel/Рабочий стол/1C.desktop, state: link, mode: &#39;755&#39; }</span></span>
<span class="line"><span>        - { src: /usr/share/kf5/applications/kf5/org.kde.dolphin.desktop, dest: /etc/skel/Рабочий стол/Dolphin.desktop, state: link, mode: &#39;755&#39; }</span></span>
<span class="line"><span>        - { src: /usr/share/applications/onlyoffice-desktopeditors.desktop, dest: /etc/skel/Рабочий стол/onlyoffice-desktopeditors.desktop, state: link, mode: &#39;755&#39; }</span></span>
<span class="line"><span>        - { src: /usr/share/applications/vmware-view.desktop, dest: /etc/skel/Рабочий стол/vmware-view.desktop, state: link, mode: &#39;755&#39; }</span></span>
<span class="line"><span>        - { src: /mnt/.services/1CBases/1cestart_alt.cfg, dest: /etc/skel/.1C/1cestart/1cestart.cfg, state: link, mode: &#39;755&#39; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: copy files</span></span>
<span class="line"><span>      copy:</span></span>
<span class="line"><span>        src: &quot;{{ item.src }}&quot;</span></span>
<span class="line"><span>        dest: &quot;{{ item.dest }}&quot;</span></span>
<span class="line"><span>        owner: &quot;{{ item.owner }}&quot;</span></span>
<span class="line"><span>        group: &quot;{{ item.group }}&quot;</span></span>
<span class="line"><span>        mode: &quot;{{ item.mode }}&quot;</span></span>
<span class="line"><span>      with_items:</span></span>
<span class="line"><span>#блок копирования настроек cups. Они для всех одинаковы, подключается очередь</span></span>
<span class="line"><span>#печати на принтер MyQ</span></span>
<span class="line"><span>        - { src: /etc/ansible/playbooks/files/cups/cupsd.conf, dest: /etc/cups/cupsd.conf, owner: root, group: lp, mode: &#39;640&#39; }</span></span>
<span class="line"><span>        - { src: /etc/ansible/playbooks/files/cups/cups-files.conf, dest: /etc/cups/cups-files.conf, owner: root, group: root, mode: &#39;644&#39; }</span></span>
<span class="line"><span>        - { src: /etc/ansible/playbooks/files/cups/printers.conf, dest: /etc/cups/printers.conf, owner: root, group: lp, mode: &#39;600&#39; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: enable services</span></span>
<span class="line"><span>      service:</span></span>
<span class="line"><span>        name: &quot;{{ item }}&quot;</span></span>
<span class="line"><span>        enabled: yes</span></span>
<span class="line"><span>        state: restarted</span></span>
<span class="line"><span>      with_items:</span></span>
<span class="line"><span>        - x11vnc</span></span>
<span class="line"><span>        - cups</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: firefox set krb enable</span></span>
<span class="line"><span>      copy:</span></span>
<span class="line"><span>        dest: /usr/lib64/firefox/browser/defaults/preferences/myprefs.js</span></span>
<span class="line"><span>        content: |</span></span>
<span class="line"><span>          pref(&quot;network.negotiate-auth.trusted-uris&quot;,&quot;.lab.ru&quot;);</span></span>
<span class="line"><span>          pref(&quot;network.automatic-ntlm-auth.trusted-uris&quot;,&quot;.lab.ru&quot;);</span></span>
<span class="line"><span>          pref(&quot;network.automatic-ntlm-auth.allow-non-fqdn&quot;,&quot;true&quot;);</span></span>
<span class="line"><span>          pref(&quot;network.negotiate-auth.allow-non-fqdn&quot;,&quot;true&quot;);</span></span>
<span class="line"><span>          pref(&quot;network.negotiate-auth.delegation-uris&quot;,&quot;.lab.ru&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: chrome set krb enable</span></span>
<span class="line"><span>      copy:</span></span>
<span class="line"><span>        dest: /etc/opt/chrome/policies/managed/krb.json</span></span>
<span class="line"><span>        content: |</span></span>
<span class="line"><span>          {</span></span>
<span class="line"><span>            &quot;AuthServerAllowlist&quot;: &quot;*.lab.ru&quot;,</span></span>
<span class="line"><span>            &quot;AuthNegotiateDelegateAllowlist&quot;: &quot;*.lab.ru&quot;</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: apt dedup, enable cups</span></span>
<span class="line"><span>      shell: |</span></span>
<span class="line"><span>             apt-get dedup -y</span></span>
<span class="line"><span>             systemctl start cups</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3.4. Сформировать конфиги для подключения ПК к домену, ..</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- name:  pre-domain config</span></span>
<span class="line"><span>  gather_facts: false</span></span>
<span class="line"><span>  hosts: simply</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span>          - name: krb config</span></span>
<span class="line"><span>            copy:</span></span>
<span class="line"><span>              dest: /etc/krb5.conf</span></span>
<span class="line"><span>              content: |</span></span>
<span class="line"><span>                [logging]</span></span>
<span class="line"><span>                # default = FILE:/var/log/krb5libs.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                [libdefaults]</span></span>
<span class="line"><span>                 default_realm = LAB.RU</span></span>
<span class="line"><span>                 dns_lookup_realm = true</span></span>
<span class="line"><span>                 dns_lookup_kdc = true</span></span>
<span class="line"><span>                 ticket_lifetime = 24h</span></span>
<span class="line"><span>                 renew_lifetime = 7d</span></span>
<span class="line"><span>                 rdns = false</span></span>
<span class="line"><span>                 forwardable = yes</span></span>
<span class="line"><span>                 default_ccache_name = FILE:/tmp/krb5cc_%{uid}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          - name: samba config</span></span>
<span class="line"><span>            copy:</span></span>
<span class="line"><span>              dest: /etc/samba/smb.conf</span></span>
<span class="line"><span>              content: |</span></span>
<span class="line"><span>                [global]</span></span>
<span class="line"><span>                security = ads</span></span>
<span class="line"><span>                realm = LAB.RU</span></span>
<span class="line"><span>                workgroup = LAB</span></span>
<span class="line"><span>                netbios name = {{inventory_hostname}}</span></span>
<span class="line"><span>                template shell = /bin/bash</span></span>
<span class="line"><span>                kerberos method = system keytab</span></span>
<span class="line"><span>                wins support = no</span></span>
<span class="line"><span>                idmap config * : range = 10000-20000000</span></span>
<span class="line"><span>                idmap config * : backend = tdb</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          - name: sssd config</span></span>
<span class="line"><span>            copy:</span></span>
<span class="line"><span>              dest: /etc/sssd/sssd.conf</span></span>
<span class="line"><span>              content: |</span></span>
<span class="line"><span>                [sssd]</span></span>
<span class="line"><span>                config_file_version = 2</span></span>
<span class="line"><span>                user = root</span></span>
<span class="line"><span>                domains = LAB.RU</span></span>
<span class="line"><span>                services = pam,nss,autofs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                [nss]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                [pam]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                [domain/LAB.RU]</span></span>
<span class="line"><span>                id_provider = ad</span></span>
<span class="line"><span>                auth_provider = ad</span></span>
<span class="line"><span>                chpass_provider = ad</span></span>
<span class="line"><span>                default_shell = /bin/bash</span></span>
<span class="line"><span>                fallback_homedir = /home/%d/%u</span></span>
<span class="line"><span>                ad_server = dc-1.lab.ru,dc-2.lab.ru</span></span>
<span class="line"><span>                ad_backup_server = _srv_</span></span>
<span class="line"><span>                cache_credentials = true</span></span>
<span class="line"><span>                debug_level = 2</span></span>
<span class="line"><span>#монтирование сетевых дисков. Через pam mount ничего не вышло. Он либо багованый,</span></span>
<span class="line"><span>#либо фича у него такая, но мы перешли на смб, который монтирует шары при</span></span>
<span class="line"><span>#обращении к ним пользователя </span></span>
<span class="line"><span>          - name: autofs config</span></span>
<span class="line"><span>            copy:</span></span>
<span class="line"><span>              dest: /etc/auto.master</span></span>
<span class="line"><span>              content: |</span></span>
<span class="line"><span>                /mnt/share        /etc/auto.samba --ghost</span></span>
<span class="line"><span>                /mnt/.services    /etc/auto2.samba --ghost --timeout 60</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>          - name: autofs config 1</span></span>
<span class="line"><span>            copy:</span></span>
<span class="line"><span>              dest: /etc/auto.samba</span></span>
<span class="line"><span>              content: |</span></span>
<span class="line"><span>                disk_1  -fstype=cifs,multiuser,cruid=$UID,sec=krb5,domain=LAB.RU      ://dfs-server.lab.ru/Share</span></span>
<span class="line"><span>                disk_2  -fstype=cifs,multiuser,cruid=$UID,sec=krb5,domain=LAB.RU      ://file-server.lab.ru/Share2</span></span>
<span class="line"><span>                disk_3  -fstype=cifs,multiuser,cruid=$UID,sec=krb5,domain=LAB.RU      ://file-server.lab.ru/Share3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          - name: autofs config 2</span></span>
<span class="line"><span>            copy:</span></span>
<span class="line"><span>              dest: /etc/auto2.samba</span></span>
<span class="line"><span>              content: |</span></span>
<span class="line"><span>                1CBases      -fstype=cifs,multiuser,cruid=$UID,sec=krb5,domain=LAB.RU      ://file-server.lab.ru /1CBases</span></span>
<span class="line"><span>                background   -fstype=cifs,multiuser,cruid=$UID,sec=krb5,domain=LAB.RU      ://file-server.lab.ru/background</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>          - name: enable autofs</span></span>
<span class="line"><span>            service:</span></span>
<span class="line"><span>              name: autofs</span></span>
<span class="line"><span>              enabled: yes</span></span>
<span class="line"><span>              state: restarted</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          - name: configure nsswitch and cronyd</span></span>
<span class="line"><span>            lineinfile:</span></span>
<span class="line"><span>              path: &quot;{{ item.path }}&quot;</span></span>
<span class="line"><span>              regexp: &quot;{{ item.regexp }}&quot;</span></span>
<span class="line"><span>              line: &quot;{{ item.line }}&quot;</span></span>
<span class="line"><span>            loop:</span></span>
<span class="line"><span>              - { path: /etc/nsswitch.conf, regexp: &#39;^passwd&#39;, line: &#39;passwd:     files sss&#39; }</span></span>
<span class="line"><span>              - { path: /etc/nsswitch.conf, regexp: &#39;^shadow&#39;, line: &#39;shadow:     tcb files sss&#39; }</span></span>
<span class="line"><span>              - { path: /etc/nsswitch.conf, regexp: &#39;^group&#39;, line: &#39;group:      files sss&#39; }</span></span>
<span class="line"><span>              - { path: /etc/chrony.conf, regexp: &#39;^pool&#39;, line: &#39;pool dc-1.lab.ru iburst&#39; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          - name: set control policy and system-auth</span></span>
<span class="line"><span>            shell: |</span></span>
<span class="line"><span>                  control sudo public</span></span>
<span class="line"><span>                  control system-auth sss</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#Cisco WSA – довольно «интересный» proxy-сервер..</span></span>
<span class="line"><span>#И так как далеко не все Linux’овые приложения умеют использовать krb-тикеты</span></span>
<span class="line"><span>#для авторизации на прокси, приходится использовать костыль. Нет, можно было</span></span>
<span class="line"><span>#заставить пользователя сначала запустить браузер, авторизоваться на проксе,</span></span>
<span class="line"><span>#и только после этого получить доступ в интернет, скажем, с мессенджера..</span></span>
<span class="line"><span>#но мы посчитали это издевательством.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          - name: proxy auth script</span></span>
<span class="line"><span>            copy:</span></span>
<span class="line"><span>              dest: /var/proxy_auth.sh</span></span>
<span class="line"><span>              content: |</span></span>
<span class="line"><span>                #!/bin/bash</span></span>
<span class="line"><span>                ip=$(echo \`ifconfig eth0 2&gt;/dev/null|awk &#39;/inet addr:/ {print $2}&#39;|sed &#39;s/addr://&#39;\`)</span></span>
<span class="line"><span>                echo &quot;curl -isL --negotiate -u : https://proxy-server.lab.ru/same_text/$ip/http://lab.ru/ &gt; /dev/null&quot; &gt; /tmp/proxy_auth.sh</span></span>
<span class="line"><span>                /bin/bash /tmp/proxy_auth.sh</span></span>
<span class="line"><span>                rm -f /tmp/proxy_auth.sh</span></span>
<span class="line"><span>              mode: &quot;755&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          - name: create logon script fpr proxy auth</span></span>
<span class="line"><span>            copy:</span></span>
<span class="line"><span>              dest: /etc/profile.d/proxy_auth.sh</span></span>
<span class="line"><span>              content: |</span></span>
<span class="line"><span>                #!/bin/bash</span></span>
<span class="line"><span>                /var/proxy_auth.sh</span></span>
<span class="line"><span>              mode: &quot;755&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3.5. Настроить ssh согласно требованиям от ИБ, в том числе ограничить доступ для определенных групп AD</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- name: ssh</span></span>
<span class="line"><span>  gather_facts: false</span></span>
<span class="line"><span>  hosts: simply</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span>          - name: edit sshd config</span></span>
<span class="line"><span>            lineinfile:</span></span>
<span class="line"><span>                    path: /etc/openssh/sshd_config</span></span>
<span class="line"><span>                    regex: &quot;^(#)?{{item.key}}&quot;</span></span>
<span class="line"><span>                    line: &quot;{{item.key}} {{item.value}}&quot;</span></span>
<span class="line"><span>                    state: present</span></span>
<span class="line"><span>            loop:</span></span>
<span class="line"><span>                            - { key: &quot;LogLevel&quot;, value: &quot;VERBOSE&quot; }</span></span>
<span class="line"><span>                            - { key: &quot;PermitRootLogin&quot;, value: &quot;prohibit-password&quot; }</span></span>
<span class="line"><span>                            - { key: &quot;MaxAuthTries&quot;, value: &quot;3&quot; }</span></span>
<span class="line"><span>                            - { key: &quot;MaxSessions&quot;, value: &quot;2&quot; }</span></span>
<span class="line"><span>                            - { key: &quot;PermitEmptyPasswords&quot;, value: &quot;no&quot; }</span></span>
<span class="line"><span>                            - { key: &quot;UsePAM&quot;, value: &quot;yes&quot; }</span></span>
<span class="line"><span>                            - { key: &quot;AllowGroups&quot;, value: &quot;domain?users root wheel linux-sudoers&quot; }</span></span>
<span class="line"><span>#да, да, именно в таком формате тут нужно указывать доменные группы с пробелами</span></span>
<span class="line"><span>#в названиях</span></span>
<span class="line"><span>            notify:</span></span>
<span class="line"><span>                    - restart sshd</span></span>
<span class="line"><span>                    - enable sshd</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  handlers:</span></span>
<span class="line"><span>          - name: restart sshd</span></span>
<span class="line"><span>            service:</span></span>
<span class="line"><span>                    name: sshd</span></span>
<span class="line"><span>                    state: restarted</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          - name: enable sshd</span></span>
<span class="line"><span>            service:</span></span>
<span class="line"><span>                    name: sshd</span></span>
<span class="line"><span>                    enabled: yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3.6. Настроить доступ к sudo для определенной группы AD</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- name: sudoers</span></span>
<span class="line"><span>  gather_facts: false</span></span>
<span class="line"><span>  hosts: simply</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span>          - name: edit sudoers file</span></span>
<span class="line"><span>            blockinfile:</span></span>
<span class="line"><span>                    path: /etc/sudoers</span></span>
<span class="line"><span>                    backup: yes</span></span>
<span class="line"><span>                    block: |</span></span>
<span class="line"><span>                            %Linux-Sudoers ALL=(ALL) ALL</span></span>
<span class="line"><span>                            %Linux-Users ALL=/usr/bin/apt-cache</span></span>
<span class="line"><span>                            %Linux-Users ALL=/usr/sbin/poweroff</span></span>
<span class="line"><span>                            %Linux-Users ALL=/usr/sbin/NetworkManager</span></span>
<span class="line"><span>                    validate: /usr/sbin/visudo -cf %s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          - name: replace line</span></span>
<span class="line"><span>            lineinfile:</span></span>
<span class="line"><span>                    path: /etc/sudoers</span></span>
<span class="line"><span>                    regexp: &#39;^@includedir /etc/sudoers.d&#39;</span></span>
<span class="line"><span>                    line: &#39;#@includedir /etc/sudoers.d&#39;</span></span>
<span class="line"><span>                    validate: /usr/sbin/visudo -cf %s</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3.8. Ввести ПК в домен</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#При запуске спрашивает логин и пароль (в «приватном» виде).</span></span>
<span class="line"><span>#После чего получает керберос-тикет и подключает ОС к домену</span></span>
<span class="line"><span>- name: domain join</span></span>
<span class="line"><span>  gather_facts: false</span></span>
<span class="line"><span>  hosts: simply</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  vars_prompt:</span></span>
<span class="line"><span>    - name: &quot;adlogin&quot;</span></span>
<span class="line"><span>      prompt: &quot;Enter AD Login&quot;</span></span>
<span class="line"><span>      private: no</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: &quot;password&quot;</span></span>
<span class="line"><span>      prompt: &quot;Enter password&quot;</span></span>
<span class="line"><span>      private: yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span>    - name: domain check</span></span>
<span class="line"><span>      shell: timeout 6s net ads testjoin</span></span>
<span class="line"><span>      register: domain_state</span></span>
<span class="line"><span>      failed_when: domain_state.rc == 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: Clear the sssd cache</span></span>
<span class="line"><span>      shell: rm -f /var/lib/sss/db/* /var/lib/sss/mc/*</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: get krb ticket</span></span>
<span class="line"><span>      shell: echo &#39;{{ password }}&#39;| kinit &quot;{{ adlogin }}&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: join domain</span></span>
<span class="line"><span>      command: net ads join -U &quot;{{ adlogin }}&quot;%&quot;{{ password }}&quot; createcomputer=&quot;/Computers/Linux&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: sssd enable</span></span>
<span class="line"><span>      service:</span></span>
<span class="line"><span>        name: sssd</span></span>
<span class="line"><span>        enabled: yes</span></span>
<span class="line"><span>        state: restarted</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: reboot</span></span>
<span class="line"><span>      reboot:</span></span>
<span class="line"><span>        reboot_timeout: 120</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3.10. Предусмотреть возможность массового обновления</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Тут пришлось сделать отдельный playbook для обновления, и отдельный playbook для брендирования, так как мы пошли по простому пути – не стали пилить тему для кедов, а просто поменяли интересующие нас картинки. И поэтому при обновлении пакетов картинки затираются. Поэтому сразу после обновления происходит брендирование.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Playbook апдейта:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- name: update and upgrade</span></span>
<span class="line"><span>  hosts: simply</span></span>
<span class="line"><span>  gather_facts: false</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  - name: update &amp; upgrade</span></span>
<span class="line"><span>    shell: |</span></span>
<span class="line"><span>      apt-get update -y &amp;&amp; apt-get dist-upgrade -y</span></span>
<span class="line"><span>      apt-get dedup -y</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Брендинг у нас уже был (но я вам его не покажу, мне запретили). И поэтому playbook обновления выглядят так:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- import_playbook: update.yml</span></span>
<span class="line"><span>- import_playbook: branding.yml</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Ограничение пропускной способности сетевого соединения в Linux</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Если в процессе работы с вашей системой Linux для настольных компьютеров вы нередко одновременно используете множество работающих с сетью приложений или разделяете пропускную способность своего домашнего сетевого соединения между несколькими компьютерами, вы наверняка хотите максимально контролировать использование ресурсов имеющегося сетевого соединения. В противном случае при загрузке файлов большого объема с помощью специализированного приложения ваша интерактивная сессия SSH может начать работать с большим замедлением или перестать работать вообще. Либо в процессе синхронизации директории большого объема с сервером Dropbox ваши домашние могут начать жаловаться на постоянные перерывы, возникающие в процессе просмотра видео из сети.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>В данном руководстве я постараюсь описать два различных подхода к ограничению пропускной способности сетевого соединения в Linux.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Ограничение пропускной способности сетевого соединения на уровне приложения в Linux</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Одним из инструментов для ограничения пропускной способности сетевого соединения, использующим интерфейс командной строки системы, является утилита под названием [trickle](http://monkey.org/~marius/trickle). Trickle позволяет осуществлять шейпинг трафика, генерируемого любым из существующих приложений, путем «подгрузки» библиотеки с реализацией механизма сетевых сокетов и алгоритмов ограничения пропускной способности сетевого соединения в процессе запуска приложения. Преимущество утилиты trickle заключается в том, что она функционирует исключительно в пространстве пользователя, поэтому вам не понадобятся привилегии пользователя root для ограничения пропускной способности сетевого соединения на уровне какого-либо из приложений. Для совместимости с утилитой trickle приложение должно использовать интерфейс сетевых сокетов без статического связывания с соответствующей системной библиотекой. Утилита trickle может оказаться полезной тогда, когда вам нужно ограничить пропускную способность сетевого соединения на уровне приложения, которое не имеет аналогичного встроенного механизма.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Для установки trickle в Ubuntu, Debian и производных дистрибутивах следует использовать следующую команду:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ sudo apt-get install trickle</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Для установки trickle в дистрибутивах Fedora или CentOS/RHEL (с подключенным репозиторием EPEL) следует использовать следующую команду:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ sudo yum install trickle</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Утилита trickle используется следующим образом. Необходимо просто разместить вызов trickle (а также флаги и значения лимитов скоростей) перед командой, которую вы желаете исполнить.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ trickle -d &lt;лимит-скорости-приема&gt; -u &lt;лимит-скорости-передачи&gt; &lt;команда&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>С помощью данной команды устанавливаются заданные лимиты скоростей приема и передачи данных (в КБ/с) для приложения, запускаемого с помощью заданной команды.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Например, для установки ограничения максимальной скорости передачи данных для утилиты scp, равного 100 КБ/с, может использоваться следующая команда:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ trickle -u 100 scp backup.tgz alice@remote\\_host.com:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>При желании вы можете установить ограничение максимальной скорости приема данных (равное, к примеру, 300 КБ/с) для вашего веб-браузера Firefox, создав специальный файл запуска приложения со следующей командой запуска:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>trickle -d 300 firefox %u</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Наконец, утилита trickle может запускаться в режиме демона и контролировать «общую» пропускную способность сетевого соединения для всех приложений, которые были запущены с помощью нее. Для запуска trickle в режиме демона (т.е., trickled) может использоваться следующая команда:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ sudo trickled -d 1000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>После того, как демон trickled начнет работу в фоновом режиме, вы можете запускать другие приложения с помощью утилиты trickle. Теперь, если вы запустите с помощью утилиты trickle одно приложение, его скорость приема данных будет ограничиваться 1000 КБ/с. Если же вы запустите с помощью утилиты trickle еще одно приложение, скорость приема данных каждого из этих приложений будет ограничиваться 500 КБ/с и так далее…</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Ограничение пропускной способности сетевого соединения на уровне сетевого интерфейса в Linux</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Еще один способ управления пропускной способностью вашего сетевого соединения заключается в установке лимитов скоростей приема и передачи данных на уровне сетевого интерфейса. Данный подход может оказаться полезным тогда, когда вы делите соединение с сетью Интернет с кем-либо еще. Как и в подавляющем большинстве случаев, в Linux есть необходимый для этого инструмент. Сценарий [wondershaper](http://lartc.org/wondershaper/) предназначен для выполнения описанной задачи: он ограничивает пропускную способность сетевого соединения на уровне сетевого интерфейса.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>На самом деле, wondershaper является простым сценарием командной оболочки, который использует утилиту [tc](http://lartc.org/manpages/tc.txt) для установки параметров шейпинга трафика и качества сетевого соединения на уровне заданного сетевого интерфейса. Шейпинг исходящего трафика осуществляется путем распределения пакетов по очередям с разными приоритетами, шейпинг входящего трафика - путем отбрасывания пакетов.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Фактически, список полезных функций сценария wondershaper не ограничивался добавлением возможности управления пропускной способностью для каждого из сетевых интерфейсов. Wondershaper также пытается максимально снизить задержки интерактивных сессий, таких, как SSH в процессе загрузки или передачи файлов больших объемов. Кроме того, он гарантирует, что при передаче файлов больших объемов (например, при синхронизации директорий с сервером Dropbox) не будет значительно снижаться скорость загрузки файлов и наоборот.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Для установки wondershaper в Ubuntu, Debian и производных дистрибутивах следует использовать следующую команду:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ sudo apt-get install wondershaper</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Для установки wondershaper в дистрибутиве Fedora или CentOS/RHEL (с подключенным репозиторием EPEL) следует использовать следующую команду:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ sudo yum install wondershaper</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Сценарий wondershaper используется следующим образом:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ sudo wondershaper &lt;интерфейс&gt; &lt;лимит-скорости-приема&gt; &lt;лимит-скорости-передачи&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Например, для установки максимальных скоростей приема/передачи данных для сетевого интерфейса eth0, равных 1000 и 500 Кб/с соответственно, может использоваться следующая команда:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ sudo wondershaper eth0 1000 500</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Вы можете удалить установленное ограничение пропускной способности сетевого интерфейса с помощью следующей команды:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ sudo wondershaper clear eth0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Если вас интересует принцип работы сценария wondershaper, вы можете изучить его содержимое (/sbin/wondershaper).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Заключение</span></span>
<span class="line"><span></span></span>
<span class="line"><span>В данном руководстве я рассказал о двух различных вариантах ограничения пропускной способности сетевого соединения в системе Linux для настольных компьютеров, а именно, об ограничении пропускной способности сетевого соединения на уровне отдельных приложений и на уровне сетевых интерфейсов. Оба рассмотренных инструмента являются максимально простыми и позволяют быстро и просто организовать шейпинг ранее никоим образом не контролируемого сетевого трафика. Те из вас, кто желает узнать больше о способах ограничения пропускной способности сетевых соединений в Linux, могут ознакомиться со [следующим руководством](http://www.lartc.org/lartc.html).</span></span></code></pre></div></div>`,39)]))}const k=n(l,[["render",i]]);export{h as __pageData,k as default};
