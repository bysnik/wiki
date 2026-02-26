import{_ as a,c as n,o as i,ag as p}from"./chunks/framework.D4Vqf8I7.js";const o=JSON.parse('{"title":"Ansible","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"docs/wi/ansible.md","filePath":"docs/wi/ansible.md","lastUpdated":1772109236000}'),l={name:"docs/wi/ansible.md"};function e(t,s,h,k,r,c){return i(),n("div",null,s[0]||(s[0]=[p(`<h1 id="ansible" tabindex="-1">Ansible <a class="header-anchor" href="#ansible" aria-label="Permalink to &quot;Ansible&quot;">​</a></h1><p><img src="https://habrastorage.org/getpro/habr/upload_files/81b/5e2/9f1/81b5e29f12b41ba26dff6cdd05848a5b.webp" alt=""></p><p>Ansible — система управления конфигурациями, написанная на Python, с использованием декларативного языка разметки для описания конфигураций. Используется для автоматизации настройки и развертывания программного обеспечения. Обычно используется для управления Linux-узлами, но Windows также поддерживается. Поддерживает работу с сетевыми устройствами, на которых установлен Python версии 2.4 и выше по SSH или WinRM соединению.</p><p><a href="https://www.altlinux.org/Ansible" target="_blank" rel="noreferrer">https://www.altlinux.org/Ansible</a></p><p><a href="https://docs.ansible.com/projects/ansible/latest/collections/index.html" target="_blank" rel="noreferrer">https://docs.ansible.com/projects/ansible/latest/collections/index.html</a></p><h2 id="быстрыи-старт" tabindex="-1">Быстрый старт <a class="header-anchor" href="#быстрыи-старт" aria-label="Permalink to &quot;Быстрый старт&quot;">​</a></h2><h3 id="установка-на-сервер" tabindex="-1">Установка на сервер: <a class="header-anchor" href="#установка-на-сервер" aria-label="Permalink to &quot;Установка на сервер:&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible</span></span></code></pre></div><h3 id="установка-на-клиенты" tabindex="-1">Установка на клиенты: <a class="header-anchor" href="#установка-на-клиенты" aria-label="Permalink to &quot;Установка на клиенты:&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python-module-yaml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python-module-jinja2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python-modules-json</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python-modules-distutils</span></span></code></pre></div><p>На клиенте должен быть настроен ключевой (безпарольный) доступ по ssh к пользователю root на клиенте пользователем, который будет работать с ansible на сервере (не root).</p><p>Все дальнейшие действия производим на сервере.</p><h3 id="редактируем-фаил-etc-ansible-hosts-это-фаил-которыи-содержит-списки-хостов-и-группы-этих-хостов" tabindex="-1">Редактируем файл <code>/etc/ansible/hosts</code> - это файл, который содержит списки хостов и группы этих хостов: <a class="header-anchor" href="#редактируем-фаил-etc-ansible-hosts-это-фаил-которыи-содержит-списки-хостов-и-группы-этих-хостов" aria-label="Permalink to &quot;Редактируем файл \`/etc/ansible/hosts\` - это файл, который содержит списки хостов и группы этих хостов:&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[all:vars]</span></span>
<span class="line"><span>ansible_user=root</span></span>
<span class="line"><span>ansible_python_interpreter=/usr/bin/python3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ниже указываем хосты</span></span></code></pre></div><p>Пример файла hosts:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[all:vars]</span></span>
<span class="line"><span>ansible_user=root</span></span>
<span class="line"><span>ansible_python_interpreter=/usr/bin/python3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[group1]</span></span>
<span class="line"><span>192.168.100.101</span></span>
<span class="line"><span>192.168.100.102</span></span>
<span class="line"><span>192.168.100.103</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[servers]</span></span>
<span class="line"><span>altsrv1.courses.alt</span></span>
<span class="line"><span>altsrv2.courses.alt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[wks]</span></span>
<span class="line"><span>altwks1 ansible_ssh_port=2221 ansible_ssh_host=192.168.100.201</span></span>
<span class="line"><span>altwks2 ansible_ssh_port=2221 ansible_ssh_host=192.168.100.202</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[alt:children]</span></span>
<span class="line"><span>servers</span></span>
<span class="line"><span>wks</span></span></code></pre></div><h3 id="использование-ad-hoc-команд-в-ansible" tabindex="-1">Использование ad-hoc команд в Ansible <a class="header-anchor" href="#использование-ad-hoc-команд-в-ansible" aria-label="Permalink to &quot;Использование ad-hoc команд в Ansible&quot;">​</a></h3><p>Проверяем связь с клиентом с помощью модуля ping в интерактивном режиме:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ping</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> servers</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">altsrv1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> SUCCESS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;changed&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;ping&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;pong&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">altsrv2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> SUCCESS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;changed&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;ping&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;pong&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>где servers - это группа хостов из файла <code>/etc/ansible/hosts</code></p><p>Пример. Выполнение команды на управляемых узлах</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hosts</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> shell</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;uname -a&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> servers</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">altsrv2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CHANGED</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &gt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Linux</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> altsrv2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 5.10.82-std-def-alt1</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #1 SMP Fri Dec 3 14:49:25 UTC 2021 x86_64 GNU/Linux</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">altsrv1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CHANGED</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &gt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Linux</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> altsrv1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 5.10.82-std-def-alt1</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #1 SMP Fri Dec 3 14:49:25 UTC 2021 x86_64 GNU/Linux</span></span></code></pre></div><p>Пример. Удаление файла</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;name=/etc/nologin state=absent&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> all</span></span></code></pre></div><h3 id="создание-хеша-пароля" tabindex="-1">Создание хеша пароля: <a class="header-anchor" href="#создание-хеша-пароля" aria-label="Permalink to &quot;Создание хеша пароля:&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkpasswd</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">passwor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><p>Получаем строку.</p><p>Далее используем ansible-vault:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> encrypt_string</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;ранее полученный хэш&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">New</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> password:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Confirm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> New</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> password:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vault</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    $ANSIBLE_VAULT;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AES256</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    65366666616436396133363165346432623166616161383037613833393438363039336438386265</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    6633613030303565316431336531313261366532376336640a623861316166643730323833666263</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    65333534303663363066323832376231616261363636616330366634616334663234666330623934</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    3764343932663632350a393563366331376630666239386163656531343936616438316434343738</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    36636533366433353939666333313538633539383365643766663563616534623863396166356530</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    63306638373134303961353364333131386361653064306364346265313334353436303239373838</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    62346136656161653430383730663661393830313430343539366663383431626365633465376436</span></span></code></pre></div><p>И теперь весь этот блок, начиная с <code>!vault |</code> необходимо использовать в ансибле</p><h2 id="ansible-galaxy" tabindex="-1"><code>ansible-galaxy</code> <a class="header-anchor" href="#ansible-galaxy" aria-label="Permalink to &quot;\`ansible-galaxy\`&quot;">​</a></h2><h3 id="_1-управление-ролями-установка-и-создание-шаблонов" tabindex="-1">1. Управление ролями: установка и создание шаблонов <a class="header-anchor" href="#_1-управление-ролями-установка-и-создание-шаблонов" aria-label="Permalink to &quot;1. Управление ролями: установка и создание шаблонов&quot;">​</a></h3><p><code>ansible-galaxy</code> — утилита для работы с <strong>ролями</strong> (репозиториями переиспользуемого кода Ansible) и <strong>коллекциями</strong>.</p><h4 id="_1-1-поиск-и-установка-ролеи-из-galaxy" tabindex="-1">1.1. Поиск и установка ролей из Galaxy <a class="header-anchor" href="#_1-1-поиск-и-установка-ролеи-из-galaxy" aria-label="Permalink to &quot;1.1. Поиск и установка ролей из Galaxy&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Поиск ролей по ключевому слову</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ansible-galaxy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> search</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Установка роли в каталог ~/.ansible/roles/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ansible-galaxy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> geerlingguy.nginx</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Установка роли в произвольный каталог</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ansible-galaxy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> geerlingguy.nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./roles/</span></span></code></pre></div><blockquote><p>💡 <strong>Важно:</strong> Установленные роли автоматически подключаются в плейбуках через <code>roles:</code> без указания полного пути.</p></blockquote><h4 id="_1-2-создание-собственнои-роли" tabindex="-1">1.2. Создание собственной роли <a class="header-anchor" href="#_1-2-создание-собственнои-роли" aria-label="Permalink to &quot;1.2. Создание собственной роли&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Генерация структуры роли</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ansible-galaxy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> webserver</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Результат — каталог с шаблонной структурой:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">webserver/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> defaults/</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # значения по умолчанию</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tasks/</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       # основные задачи (main.yml)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> handlers/</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # обработчики</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> templates/</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   # шаблоны Jinja2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> files/</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       # статические файлы</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tests/</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       # плейбуки тестов</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vars/</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # переменные</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  meta/</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       # метаданные и зависимости</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">└──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> README.md</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Файл README</span></span></code></pre></div><h3 id="_2-управление-зависимостями-через-requirements-yml" tabindex="-1">2. Управление зависимостями через <code>requirements.yml</code> <a class="header-anchor" href="#_2-управление-зависимостями-через-requirements-yml" aria-label="Permalink to &quot;2. Управление зависимостями через \`requirements.yml\`&quot;">​</a></h3><p>Для воспроизводимости окружения все зависимости проекта описываются в файле <code>requirements.yml</code>.</p><h4 id="_2-1-фаил-зависимостеи-для-ролеи" tabindex="-1">2.1. Файл зависимостей для ролей <a class="header-anchor" href="#_2-1-фаил-зависимостеи-для-ролеи" aria-label="Permalink to &quot;2.1. Файл зависимостей для ролей&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># requirements.yml</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">roles</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">geerlingguy.php</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4.0.0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">https://github.com/example/custom-role.git</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    scm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">git</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">main</span></span></code></pre></div><p>Установка всех зависимостей одной командой:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ansible-galaxy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> requirements.yml</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./roles/</span></span></code></pre></div><h4 id="_2-2-фаил-зависимостеи-для-коллекции-ansible-≥2-9" tabindex="-1">2.2. Файл зависимостей для коллекций (Ansible ≥2.9) <a class="header-anchor" href="#_2-2-фаил-зависимостеи-для-коллекции-ansible-≥2-9" aria-label="Permalink to &quot;2.2. Файл зависимостей для коллекций (Ansible ≥2.9)&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># collections/requirements.yml</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">collections</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">community.general</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&gt;=4.0.0&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ansible.posix</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">source</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">https://galaxy.ansible.com</span></span></code></pre></div><p>Установка коллекций:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ansible-galaxy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> collection</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> collections/requirements.yml</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./collections/</span></span></code></pre></div><blockquote><p>⚠️ <strong>Примечание:</strong> При работе с приватными репозиториями используйте параметр <code>--token</code> или настройте <code>ansible.cfg</code>:</p><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[galaxy]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">server_list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = automation_hub</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[galaxy_server.automation_hub]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=https://cloud.redhat.com/api/automation-hub/</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">token</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=YOUR_TOKEN</span></span></code></pre></div></blockquote><h2 id="полезные-рецепты-с-альтвики" tabindex="-1">Полезные рецепты с Альтвики <a class="header-anchor" href="#полезные-рецепты-с-альтвики" aria-label="Permalink to &quot;Полезные рецепты с Альтвики&quot;">​</a></h2><p>Рецепты применяются командой:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ansible-playbook &lt;имя файла&gt;</span></span></code></pre></div><h3 id="прописывание-репозитория" tabindex="-1">Прописывание репозитория <a class="header-anchor" href="#прописывание-репозитория" aria-label="Permalink to &quot;Прописывание репозитория&quot;">​</a></h3><p>Файл: /etc/ansible/playbooks/repo.yml</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- hosts: local</span></span>
<span class="line"><span>  remote_user: root</span></span>
<span class="line"><span>  tasks: </span></span>
<span class="line"><span>  - name: Remove all repositories</span></span>
<span class="line"><span>    shell: apt-repo rm all</span></span>
<span class="line"><span>  - name: Add official mirror</span></span>
<span class="line"><span>    shell: apt-repo add http://10.10.3.77/repo/p8</span></span>
<span class="line"><span>  - name: Add official mirror with arepo</span></span>
<span class="line"><span>    shell: apt-repo add &#39;rpm http://10.10.3.77/repo/p8 x86_64-i586 classic&#39;</span></span>
<span class="line"><span>  - name: Add extra repository </span></span>
<span class="line"><span>    shell: apt-repo add &#39;rpm http://10.10.3.77/repo/extra x86_64 extra&#39;</span></span></code></pre></div><p><strong>Примечание:</strong> Используется <a href="http://docs.ansible.com/ansible/latest/modules/shell_module.html" target="_blank" rel="noreferrer">модуль shell</a> и программа apt-repo.</p><h3 id="установка-пакета" tabindex="-1">Установка пакета <a class="header-anchor" href="#установка-пакета" aria-label="Permalink to &quot;Установка пакета&quot;">​</a></h3><p>Файл: /etc/ansible/playbooks/install-ifcplugin.yml</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- hosts: local</span></span>
<span class="line"><span>  remote_user: root</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span>  - name: Update cache and install ifcplugin</span></span>
<span class="line"><span>    apt_rpm:</span></span>
<span class="line"><span>      name: ifcplugin</span></span>
<span class="line"><span>      state: present</span></span>
<span class="line"><span>      update_cache: yes</span></span></code></pre></div><h3 id="обновление-системы" tabindex="-1">Обновление системы <a class="header-anchor" href="#обновление-системы" aria-label="Permalink to &quot;Обновление системы&quot;">​</a></h3><p>С версии ansible-2.9.27-alt2 и ansible-core-2.14.2-alt1:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- hosts: local</span></span>
<span class="line"><span>  remote_user: root</span></span>
<span class="line"><span>  gather_facts: no</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span>  - name: Update cache</span></span>
<span class="line"><span>    apt_rpm:</span></span>
<span class="line"><span>      update_cache: true</span></span>
<span class="line"><span>  - name: Upgrade system</span></span>
<span class="line"><span>    apt_rpm:</span></span>
<span class="line"><span>      dist_upgrade: true</span></span>
<span class="line"><span>  - name: Upgrade kernel</span></span>
<span class="line"><span>    apt_rpm:</span></span>
<span class="line"><span>      update_kernel: true</span></span>
<span class="line"><span>  - name: Clean package cache</span></span>
<span class="line"><span>    apt_rpm:</span></span>
<span class="line"><span>      clean: true</span></span></code></pre></div><p>Или всё в одном:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- hosts: local</span></span>
<span class="line"><span>  remote_user: root</span></span>
<span class="line"><span>  gather_facts: no</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span>  - name: Upgrade system</span></span>
<span class="line"><span>    apt_rpm:</span></span>
<span class="line"><span>      update_cache: true</span></span>
<span class="line"><span>      dist_upgrade: true</span></span>
<span class="line"><span>      update_kernel: true</span></span>
<span class="line"><span>      clean: true</span></span></code></pre></div><p><strong>Примечание:</strong> Используется <a href="https://docs.ansible.com/ansible/latest/collections/community/general/apt_rpm_module.html" target="_blank" rel="noreferrer">модуль apt_rpm</a>.</p><h3 id="пример-с-установкои-и-настроикои-xrdp-server-через-роль" tabindex="-1">Пример с установкой и настройкой xrdp-server через роль <a class="header-anchor" href="#пример-с-установкои-и-настроикои-xrdp-server-через-роль" aria-label="Permalink to &quot;Пример с установкой и настройкой xrdp-server через роль&quot;">​</a></h3><p>Структура проекта:</p><ul><li><p>xrdp-server.yaml - главный запускатор, пусть лежит в любом месте.</p></li><li><p>/etc/ansible/roles/xrdp-server/ - директория роли</p></li><li><p>/etc/ansible/roles/xrdp-server/tasks/main.yml - основной плейбук роли</p></li><li><p>/etc/ansible/roles/xrdp-server/vars/main.yml - там у меня буквально одна переменная чисто подстраховаться</p></li><li><p>/etc/ansible/roles/xrdp-server/всё-остальное - тут у меня всё пусто, чисто как было создано командой ansible-galaxy</p></li></ul><h4 id="xrdp-server-yaml" tabindex="-1">xrdp-server.yaml <a class="header-anchor" href="#xrdp-server-yaml" aria-label="Permalink to &quot;xrdp-server.yaml&quot;">​</a></h4><details class="details custom-block"><summary>Details</summary><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">hosts</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">rdp_server</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  roles</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">role</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">xrdp-server</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      vars</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        rdp_users</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">username</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">user1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            password_hash</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!vault</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              $ANSIBLE_VAULT;1.1;AES256</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              65366666616436396133363165346432623166616161383037613833393438363039336438386265</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              6633613030303565316431336531313261366532376336640a623861316166643730323833666263</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              65333534303663363066323832376231616261363636616330366634616334663234666330623934</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              3764343932663632350a393563366331376630666239386163656531343936616438316434343738</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              36636533366433353939666333313538633539383365643766663563616534623863396166356530</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              63306638373134303961353364333131386361653064306364346265313334353436303239373838</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              62346136656161653430383730663661393830313430343539366663383431626365633465376436</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              35396137323135613661</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">username</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">user2</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            password_hash</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!vault</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              $ANSIBLE_VAULT;1.1;AES256</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              65366666616436396133363165346432623166616161383037613833393438363039336438386265</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              6633613030303565316431336531313261366532376336640a623861316166643730323833666263</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              65333534303663363066323832376231616261363636616330366634616334663234666330623934</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              3764343932663632350a393563366331376630666239386163656531343936616438316434343738</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              36636533366433353939666333313538633539383365643766663563616534623863396166356530</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              63306638373134303961353364333131386361653064306364346265313334353436303239373838</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              62346136656161653430383730663661393830313430343539366663383431626365633465376436</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              35396137323135613661</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">username</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">user3</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            password_hash</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!vault</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              $ANSIBLE_VAULT;1.1;AES256</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              65366666616436396133363165346432623166616161383037613833393438363039336438386265</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              6633613030303565316431336531313261366532376336640a623861316166643730323833666263</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              65333534303663363066323832376231616261363636616330366634616334663234666330623934</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              3764343932663632350a393563366331376630666239386163656531343936616438316434343738</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              36636533366433353939666333313538633539383365643766663563616534623863396166356530</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              63306638373134303961353364333131386361653064306364346265313334353436303239373838</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              62346136656161653430383730663661393830313430343539366663383431626365633465376436</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              35396137323135613661</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">username</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">user4</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            password_hash</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!vault</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              $ANSIBLE_VAULT;1.1;AES256</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              65366666616436396133363165346432623166616161383037613833393438363039336438386265</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              6633613030303565316431336531313261366532376336640a623861316166643730323833666263</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              65333534303663363066323832376231616261363636616330366634616334663234666330623934</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              3764343932663632350a393563366331376630666239386163656531343936616438316434343738</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              36636533366433353939666333313538633539383365643766663563616534623863396166356530</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              63306638373134303961353364333131386361653064306364346265313334353436303239373838</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              62346136656161653430383730663661393830313430343539366663383431626365633465376436</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              35396137323135613661</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">username</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">user5</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            password_hash</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!vault</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              $ANSIBLE_VAULT;1.1;AES256</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              65366666616436396133363165346432623166616161383037613833393438363039336438386265</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              6633613030303565316431336531313261366532376336640a623861316166643730323833666263</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              65333534303663363066323832376231616261363636616330366634616334663234666330623934</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              3764343932663632350a393563366331376630666239386163656531343936616438316434343738</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              36636533366433353939666333313538633539383365643766663563616534623863396166356530</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              63306638373134303961353364333131386361653064306364346265313334353436303239373838</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              62346136656161653430383730663661393830313430343539366663383431626365633465376436</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              35396137323135613661</span></span></code></pre></div></details><h4 id="etc-ansible-roles-xrdp-server-tasks-main-yml" tabindex="-1">/etc/ansible/roles/xrdp-server/tasks/main.yml <a class="header-anchor" href="#etc-ansible-roles-xrdp-server-tasks-main-yml" aria-label="Permalink to &quot;/etc/ansible/roles/xrdp-server/tasks/main.yml&quot;">​</a></h4><details class="details custom-block"><summary>Details</summary><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#SPDX-License-Identifier: MIT-0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># tasks file for xrdp-server</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Ensure rdp_users is defined and not empty</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  assert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    that</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">rdp_users is defined</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">rdp_users | length &gt; 0</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    fail_msg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;rdp_users must be defined and contain at least one user&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  when</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">configure_users | default(true)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Install xrdp</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  apt_rpm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">xrdp</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    state</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">present</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    update_cache</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">yes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Set WaylandEnable=false in /etc/gdm/custom.conf for GNOME</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/etc/gdm/custom.conf</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    regexp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;^#?\\s*WaylandEnable\\s*=.*$&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;WaylandEnable=false&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Set UserWindowManager=/usr/bin/gnome-session in /etc/xrdp/sesman.ini for GNOME</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/etc/xrdp/sesman.ini</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    regexp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;^#?\\s*UserWindowManager\\s*=\\s*startwm\\.sh$&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;UserWindowManager=/usr/bin/gnome-session&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Set DefaultWindowManager=/usr/bin/gnome-session in /etc/xrdp/sesman.ini for GNOME</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/etc/xrdp/sesman.ini</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    regexp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;^#?\\s*DefaultWindowManager\\s*=\\s*startwm\\.sh$&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;DefaultWindowManager=/usr/bin/gnome-session&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Enable and start services</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  systemd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ item }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">yes</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    state</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">started</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    masked</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">no</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  loop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">xrdp</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">xrdp-sesman</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Create users</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  user</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ item.username }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    password</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ item.password_hash }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    state</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">present</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    create_home</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">yes</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    shell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/bin/bash</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    groups</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">tsusers,fuse</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  loop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ rdp_users }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Reboot system</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  reboot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    reboot_timeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">300</span></span></code></pre></div></details><h4 id="etc-ansible-roles-xrdp-server-vars-main-yml" tabindex="-1">/etc/ansible/roles/xrdp-server/vars/main.yml <a class="header-anchor" href="#etc-ansible-roles-xrdp-server-vars-main-yml" aria-label="Permalink to &quot;/etc/ansible/roles/xrdp-server/vars/main.yml&quot;">​</a></h4><details class="details custom-block"><summary>Details</summary><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#SPDX-License-Identifier: MIT-0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># vars file for xrdp-server</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">rdp_users</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: []</span></span></code></pre></div></details><h2 id="ссылки" tabindex="-1">Ссылки <a class="header-anchor" href="#ссылки" aria-label="Permalink to &quot;Ссылки&quot;">​</a></h2><ul><li><a href="http://habr.com/ru/post/508762/" target="_blank" rel="noreferrer">Основы Ansible, без которых ваши плейбуки — комок слипшихся макарон</a></li></ul><hr><p>использование плагина <a href="https://docs.ansible.com/ansible/latest/collections/community/general/nmap_inventory.html" target="_blank" rel="noreferrer">nmap</a> в связке с плагином <a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/constructed_inventory.html" target="_blank" rel="noreferrer">constructed</a>. При запуске он опрашивает указанные подсети и формирует список хостов для применения плейбуков или ролей, а потом делает свои грязные делишки на отобранные по правилам хосты.</p><p>Использование ANSIBLE VAULT Назначение:</p><ul><li>Шифрование данных</li><li>Хранение шифрованных данных</li><li>Расшифровка данных только в момент использования этих данных Работа с ansible-vault в интерактивном режиме:</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> decrypt</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> edit</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> view</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> encrypt</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> encrypt_string</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rekey</span></span></code></pre></div><p>Шифрование отдельных строк:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> encrypt_string</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;password&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">New</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> password:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Confirm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> New</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> password:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vault</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ANSIBLE_VAULT;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AES256</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    36616364663239636230386638643139383237326533363236323339666162323163376565313138</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    3333636130646636363639363530643364656534336338370a383131306136353337303261366430</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    61366633656262373236333434353539633631366533623630373032366461346630636635313235</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    6631393939646632360a656430626338336533376437646232323161653939383739353564353934</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    6338</span></span></code></pre></div><p>Применение полученного результата, создадим плейбук в котором используются зашифрованная строка:</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">play1.yml</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Получим пароль</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">hosts</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">localhost</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">gather_facts</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">no</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">vars</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">password</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!vault</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">$ANSIBLE_VAULT;1.1;AES256</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    36616364663239636230386638643139383237326533363236323339666162323163376565313138</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    3333636130646636363639363530643364656534336338370a383131306136353337303261366430</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    61366633656262373236333434353539633631366533623630373032366461346630636635313235</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    6631393939646632360a656430626338336533376437646232323161653939383739353564353934</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    6338</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">tasks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">debug</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">msg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Пароль: {{ password }} &quot;</span></span></code></pre></div><p>Выполним полученный плейбук:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-play</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> play1.yml</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Получим ошибку, т.к. не указан пароль для расшифровки</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-playbook</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> play1.yml</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --ask-vault-password</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PLAY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [Получим </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">пароль]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">******************************************************************************</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">TASK</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [debug]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">***************************************************************************************</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ok:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [localhost] =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;msg&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Пароль: password &quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PLAY</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> RECAP</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*****************************************************************************************</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">localhost</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ok=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> changed=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> unreachable=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">failed</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> skipped</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rescued</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ignored</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Создание</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> строки</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> пригодной</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> для</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> встраивание</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> в</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> плейбуки:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> encrypt_string</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;password&#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;user_password&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user_password:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> !vault</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ANSIBLE_VAULT;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AES256</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    63366162373537346533316265303361303766393938333439633965613866623130376330616531</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    3664323366666234363636656264333133653562396135310a633237613966343065643736363733</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    34313737643732616662356539383130373962356363333366353834366163313030663563623037</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    3633663230373636330a326262353464323334363632323639313633313531333164343664376438</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    3433</span></span></code></pre></div><p>Создание хранилища в виде файла:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /tmp/vault1.yml</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">New</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> password:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Confirm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> New</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> password:</span></span></code></pre></div><p>Запускается редактор по-умолчанию для редактирование файла (vim). Просмотр результата:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /tmp/vault1.yml</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ANSIBLE_VAULT;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AES256</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    31306565313730343431623364613939373162323163643238613137323261653139623062646438</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    3764383630306665666439663530613538363035386232640a643265356263303133623037363234</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    33326336386338613064383732663664396436643864303137653966376139643465353566313330</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    3662323665636463630a653637376438326164306536313638653633333930626262636362353962</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    36613462333261346633323464646437316464343034353830316437373431643765</span></span></code></pre></div><p>Просмотр дешифрованного содержимого файла:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> view</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /tmp/vault1.yml</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> password:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user_password:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> netlab123</span></span></code></pre></div><p>Использование шифрованных файлов в плейбуке: play1.yml:</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Получим пароль</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">hosts</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">localhost</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">vars_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/tmp/vault1.yml&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">gather_facts</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">no</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">tasks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">debug</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">msg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Пароль: {{ user_password }}&quot;</span></span></code></pre></div><p>Результат:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-playbook</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> play1.yml</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --ask-vault-password</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> password:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PLAY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [Получим </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">пароль]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">******************************************************************************</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">TASK</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [debug]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">***************************************************************************************</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ok:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [localhost] =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;msg&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Пароль: netlab123&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PLAY</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> RECAP</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*****************************************************************************************</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">localhost</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ok=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> changed=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> unreachable=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">failed</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> skipped</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rescued</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ignored</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0</span></span></code></pre></div><p>Редактирование зашифрованного содержимого файла:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> EDITOR=nano</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> edit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /tmp/vault1.yml</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Данные в виде словаря</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">passwords:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user1:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">password:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> netlab123</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user2:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">password:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> netlab123</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Изменённый</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> плейбук:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">play1.yml:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Получим</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> пароль</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">hosts:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> localhost</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vars_files:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;/tmp/vault1.yml&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">gather_facts:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> no</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tasks:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> debug</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">debug:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">msg:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Пароль пользователя {{ item.key }} :</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">{{ item.value.password }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">loop:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;{{ passwords | dict2items }}&quot;</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-playbook</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> play1.yml</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --ask-vault-password</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> password:</span></span></code></pre></div><p>Шифрованние/дешифрование готового файла:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user-passwords.yml</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # создаём файл</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> encrypt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user-passwords.yml</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # шифрование файла</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user-passwords.yml</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # просмотр результата</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> view</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user-passwords.yml</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # просмотр</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> decrypt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user-passwords.yml</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # шифрование файла</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> encrypt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user-passwords.yml</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # зашифруем снова</span></span></code></pre></div><p>Шифрование (+ хранение) файла:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.ssh/id_rsa</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> id_rsa.encrypted</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> encrypt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> id_rsa.encrypted</span></span></code></pre></div><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Создадим плейбук для копирования зашифрованного файла</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">copy-file.yml</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Соединяемся с другим узлом</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">hosts</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">remotehost</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">gather_facts</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">no</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">become</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">tasks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Копирование файла на удалённый сервер</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">copy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">id_rsa.encrypted</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dest</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">~/.ssh/remote_key</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">mode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;0600&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Пример использования</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">use-user.yml</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Соединяемся с другим узлом</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">hosts</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">remotehost</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">vars_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;user-passwords.yml&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">gather_facts</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">no</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">tasks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Установим учётную запись и пароль для соединения</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">set_fact</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ansible_user</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ item.key }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ansible_password</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ item.value.password }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">with_items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ passwords | dict2items }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">when</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">item.key == &quot;user1&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Посмотрим в какие группы входит пользователь</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">shell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/usr/bin/id</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">register</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">result</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Посмотрим результат</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">debug</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">msg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Пользователь {{ ansible_user }} входит в группы</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">{{result.stdout}}&quot;</span></span></code></pre></div><p>Потребуется sshpass:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># apt-get install sshpass</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-playbook</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> use-user.yml</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --ask-vault-password</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> password:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> no_log:</span></span></code></pre></div><p>Использование ansible-vault без введения пароля:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ANSIBLE_VAULT_PASSWORD_FILE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">--vault-password-file</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-playbook</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> use-user.yml</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --vault-password-file=</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +x</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">vault-password-fil</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><p>say_password:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#!/bin/sh</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> U2FsdGVkX1+7Gd8IBqVzGfDmsrbRcT2K0SNZSq8158o=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> openssl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> aes-</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">256-cbc</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -pass</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pass:somepassword</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> 2&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/dev/null</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Использование</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> в</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ролях:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> r1/vars</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> открытая</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> часть:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> закрытая</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> часть:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">passwords.yml:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># vars file for r1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">passwords:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">user1:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">password:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;netlab123&quot;</span></span></code></pre></div><p>Шифруем файл «закрытой части»:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> encrypt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> passwords.yml</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">New</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> password:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Confirm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> New</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> password:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Encryption</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> successful</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Изменяем</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> файл</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> с</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> задачами:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ../tasks/</span></span></code></pre></div><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">main.yml</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># tasks file for r1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Создаём пользователя без пароля</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">user</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ item.key }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ item.value.append }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groups</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ item.value.groups }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">loop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ users | dict2items }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Добавим файл с паролем</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">include_vars</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">passwords.yml</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Создаём пароль для пользователя</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">user</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ item.key }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">password</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ item.value.password |</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">password_hash(&#39;sha512&#39;) }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">loop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{ passwords | dict2items }}&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">no_log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-playbook</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> r1task.yml</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --vault-password-file=say_password</span></span></code></pre></div><p>Использование нескольких хранилищ:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.ansible/inventory.ini</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> EDITOR=nano</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --vault-id</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> become105@prompt</span></span></code></pre></div><p>/home/sysadmin/.ansible/192.168.100.105.yml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- @</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">prompt</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /home/sysadmin/.ansible/192.168.100.105.yml</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ANSIBLE_VAULT;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1.2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AES256</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">become105</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> become105</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">r1task.yml:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vars_files:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;/home/sysadmin/.ansible/192.168.100.105.yml&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-playbook</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> r1task.yml</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --vault-password-file=say_password</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">--vault-id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">become105</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">--vault-password-file</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">--vault-id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Система управления конфигурациями</span></span>
<span class="line"><span>Ansible</span></span>
<span class="line"><span>Основы Ansible</span></span>
<span class="line"><span>Об Ansible</span></span>
<span class="line"><span>• Ansible</span></span>
<span class="line"><span>• Декларативный синтаксис</span></span>
<span class="line"><span>• Отличительные особенности Ansible</span></span>
<span class="line"><span>◦ не требует агентского ПО</span></span>
<span class="line"><span>◦ декларативный синтаксис</span></span>
<span class="line"><span>◦ push-модель управления</span></span>
<span class="line"><span>◦ паралельное выполнение изменений</span></span>
<span class="line"><span>Назначение</span></span>
<span class="line"><span>• Настройка</span></span>
<span class="line"><span>• Множество управляемых узлов</span></span>
<span class="line"><span>• Параметризация</span></span>
<span class="line"><span>• Сборка фактов</span></span>
<span class="line"><span>Архитектура</span></span>
<span class="line"><span>• Управляющий хост</span></span>
<span class="line"><span>• Управляемые хосты (targets)</span></span>
<span class="line"><span>• Сетевое взаимодействие</span></span>
<span class="line"><span>• Модули</span></span>
<span class="line"><span>• Задание (tasks)</span></span>
<span class="line"><span>Архитектура Ansible</span></span></code></pre></div><p><img src="https://habrastorage.org/getpro/habr/upload_files/5f2/284/e80/5f2284e805ee0ad18b680351866a6621.png" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Установка в ОС Альт</span></span>
<span class="line"><span>Управляющий узел</span></span>
<span class="line"><span>$ apt-get install ansible</span></span>
<span class="line"><span>/etc/ansible/ansible.cfg</span></span>
<span class="line"><span>~/.ansible.cfg</span></span>
<span class="line"><span>Подключение к управлемым узлам</span></span>
<span class="line"><span>• ssh root@host</span></span>
<span class="line"><span>$ ssh-keygen</span></span>
<span class="line"><span>$ ssh-copy-id root@&lt;host&gt;</span></span>
<span class="line"><span>• ssh user@host</span></span>
<span class="line"><span>Управляемые узлы</span></span>
<span class="line"><span>$ apt-get install python3 python3-module-yaml python3-module-jinja2 python3-</span></span>
<span class="line"><span>module-jsonlib</span></span>
<span class="line"><span>Файл инвентаризации (Inventory)</span></span>
<span class="line"><span>/etc/ansible/hosts</span></span>
<span class="line"><span>$ ansible -i ./hosts</span></span>
<span class="line"><span>$ ANSIBLE_HOSTS=./hosts</span></span>
<span class="line"><span>Структура файлов инвентаризации</span></span>
<span class="line"><span>[all:vars]</span></span>
<span class="line"><span>ansible_user=root</span></span>
<span class="line"><span>ansible_python_interpreter=/usr/bin/python3</span></span>
<span class="line"><span>mail.domain.alt</span></span>
<span class="line"><span>[webservers]</span></span>
<span class="line"><span>www.domain.alt</span></span>
<span class="line"><span>private-web.domain.alt</span></span>
<span class="line"><span>[dbases]</span></span>
<span class="line"><span>db[1:3].domain.alt</span></span>
<span class="line"><span>all:</span></span>
<span class="line"><span>hosts:</span></span>
<span class="line"><span>mail.domain.alt</span></span>
<span class="line"><span>children:</span></span>
<span class="line"><span>webservers:</span></span>
<span class="line"><span>host:</span></span>
<span class="line"><span>www.domain.alt</span></span>
<span class="line"><span>private-web.domain.alt</span></span>
<span class="line"><span>dbases:</span></span>
<span class="line"><span>hosts:</span></span>
<span class="line"><span>db[1:3].domain.alt</span></span>
<span class="line"><span>Хосты в файле инвенторизации</span></span>
<span class="line"><span>Группы файла инвентаризации</span></span>
<span class="line"><span>Переменные файла инвентаризации</span></span>
<span class="line"><span>Пример файла инвентаризации</span></span>
<span class="line"><span>[all:vars]</span></span>
<span class="line"><span>ansible_user=root</span></span>
<span class="line"><span>ansible_python_interpreter=/usr/bin/python3</span></span>
<span class="line"><span>[group1]</span></span>
<span class="line"><span>192.168.100.101</span></span>
<span class="line"><span>192.168.100.102</span></span>
<span class="line"><span>192.168.100.103</span></span>
<span class="line"><span>[servers]</span></span>
<span class="line"><span>altsrv1.courses.alt</span></span>
<span class="line"><span>altsrv2.courses.alt</span></span>
<span class="line"><span>[wks]</span></span>
<span class="line"><span>altwks1 ansible_ssh_port=2221 ansible_ssh_host=192.168.100.201</span></span>
<span class="line"><span>altwks2 ansible_ssh_port=2221 ansible_ssh_host=192.168.100.202</span></span>
<span class="line"><span>[alt:children]</span></span>
<span class="line"><span>servers</span></span>
<span class="line"><span>wks</span></span>
<span class="line"><span>Динамическая инвентаризация</span></span>
<span class="line"><span>Дополнительное чтение</span></span>
<span class="line"><span>• https://habr.com/ru/post/509938/</span></span>
<span class="line"><span>Использование ad-hoc команд в Ansible</span></span>
<span class="line"><span>Ad-hoc команды</span></span>
<span class="line"><span>• Типичное применение</span></span>
<span class="line"><span>◦ управление службами и процессами</span></span>
<span class="line"><span>◦ проверка содержимого файлов журналов</span></span>
<span class="line"><span>◦ проверка установленного ПО</span></span>
<span class="line"><span>◦ проверка системных параметров и данных производительности</span></span>
<span class="line"><span>◦ знакомство с новыми модулями</span></span>
<span class="line"><span>Синтаксис команды ansible</span></span>
<span class="line"><span>$ ansible [-i inventory ] \\</span></span>
<span class="line"><span>[-m module] [-a &quot;params&quot;] \\</span></span>
<span class="line"><span>[ -b ] \\</span></span>
<span class="line"><span>[all|group|host]</span></span>
<span class="line"><span>• -i inventory-file</span></span>
<span class="line"><span>• -m module</span></span>
<span class="line"><span>• -a “param1=val param2=val”</span></span>
<span class="line"><span>• -b</span></span>
<span class="line"><span>• all|group|host</span></span>
<span class="line"><span>Пример. ping средствами Ansible</span></span>
<span class="line"><span>$ ansible -i hosts -m ping servers</span></span>
<span class="line"><span>altsrv1 | SUCCESS =&gt; {</span></span>
<span class="line"><span>&quot;changed&quot;: false,</span></span>
<span class="line"><span>&quot;ping&quot;: &quot;pong&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>altsrv2 | SUCCESS =&gt; {</span></span>
<span class="line"><span>&quot;changed&quot;: false,</span></span>
<span class="line"><span>&quot;ping&quot;: &quot;pong&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>$ ansible -m ping all</span></span>
<span class="line"><span>Пример. Выполнение команды на управляемых узлах</span></span>
<span class="line"><span>$ ansible -i hosts -m shell -a &#39;uname -a&#39; servers</span></span>
<span class="line"><span>altsrv2 | CHANGED | rc=0 &gt;&gt;</span></span>
<span class="line"><span>Linux altsrv2 5.10.82-std-def-alt1 #1 SMP Fri Dec 3 14:49:25 UTC 2021 x86_64</span></span>
<span class="line"><span>GNU/Linux</span></span>
<span class="line"><span>altsrv1 | CHANGED | rc=0 &gt;&gt;</span></span>
<span class="line"><span>Linux altsrv1 5.10.82-std-def-alt1 #1 SMP Fri Dec 3 14:49:25 UTC 2021 x86_64</span></span>
<span class="line"><span>GNU/Linux</span></span>
<span class="line"><span>Пример. Удаление файла</span></span>
<span class="line"><span>$ ansible -m file -a &quot;name=/etc/nologin state=absent&quot; all</span></span>
<span class="line"><span>Цветовой вывод ansible</span></span>
<span class="line"><span>• зеленый</span></span>
<span class="line"><span>• желтый</span></span>
<span class="line"><span>• красный</span></span>
<span class="line"><span>Модули Ansible</span></span>
<span class="line"><span>О модулях</span></span>
<span class="line"><span>• Модули Ansible</span></span>
<span class="line"><span>$ ansible -m module -a &quot;name1=value1 name2=value2&quot;</span></span>
<span class="line"><span>$ ansible -i hosts -m copy -a &#39;src=/etc/hosts dst=/etc&#39; all</span></span>
<span class="line"><span>• https://docs.ansible.com</span></span>
<span class="line"><span>Часто используемые модули</span></span>
<span class="line"><span>Модуль Назначение</span></span>
<span class="line"><span>ping Проверка доступности узла</span></span>
<span class="line"><span>setup Сбор фактов с управляемых узлов</span></span>
<span class="line"><span>apt_rpm Установка/обновление ПО</span></span>
<span class="line"><span>service Управление службами</span></span>
<span class="line"><span>systemd Управление службами средствами systemd</span></span>
<span class="line"><span>copy Копирование файлов</span></span>
<span class="line"><span>file создание, удаление, изменение атрибутов</span></span>
<span class="line"><span>файлов</span></span>
<span class="line"><span>template Тиражирование шаблонных файлов</span></span>
<span class="line"><span>replace Замена строк в файлах на основе регулярных</span></span>
<span class="line"><span>выражений</span></span>
<span class="line"><span>Модуль Назначение</span></span>
<span class="line"><span>lineinfile Вставка, замена, удаление строк в файлах</span></span>
<span class="line"><span>user Управление пользовательскими УЗ</span></span>
<span class="line"><span>group Управление УЗ групп</span></span>
<span class="line"><span>command, shell Выполнение произвольных внешних команд</span></span>
<span class="line"><span>окружения</span></span>
<span class="line"><span>debug Вывод отладочной информации</span></span>
<span class="line"><span>Рецепты (плейбуки) ansible</span></span>
<span class="line"><span>О рецептах</span></span>
<span class="line"><span>Правила написания YAML-плейбуков</span></span>
<span class="line"><span>1. Отступы пробелами</span></span>
<span class="line"><span>2. Списки play, tasks</span></span>
<span class="line"><span>3. Равенство отступов</span></span>
<span class="line"><span>Структура плейбука</span></span>
<span class="line"><span>play1</span></span>
<span class="line"><span>task1</span></span>
<span class="line"><span>task2</span></span>
<span class="line"><span>. . .</span></span>
<span class="line"><span>play2</span></span>
<span class="line"><span>task1</span></span>
<span class="line"><span>task2</span></span>
<span class="line"><span>. . .</span></span>
<span class="line"><span>. . .</span></span>
<span class="line"><span>• Play (hosts-&gt;tasks)</span></span></code></pre></div></div><h2 id="что-то-про-ansible" tabindex="-1">что то про Ansible <a class="header-anchor" href="#что-то-про-ansible" aria-label="Permalink to &quot;что то про Ansible&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Далее — доставка на свежеустановленную систему ключей Ansible и установка hostname. Если в ОСи будут установлены ключи от Ansible, то дальше можно все сделать через сам Ansible. Тут нам поможет пакет alterator-postinstall и простейший скрипт, который доставит в /root/.ssh/authorized_keys нужные ключи. У меня 2 Ansible, 1 в головном офисе, и 1 в филиале, канал с которым, мягко говоря, оставляет желать лучшего. Поэтому 2 ключа. Так же нужно позаботиться об инженерах техподдержки, и закинуть в свежую систему скрипт, который на основе существующих в AD записей для компьютеров, будет подбирать подходящий hostname для нового ПК перед вводом в домен. Эти скрипты тоже нужно будет доставить в целевую систему. Скрипт назовем 87-set-ansbls-keys.sh, и напишем в нем следующее (ну почти так, ключи я вам не покажу =Ъ):</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>. install2-init-functions</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;ssh-rsa бла-бла-бла-набор-символов root@ansible-filial-hostname&quot; &gt; $destdir/root/.ssh/authorized_keys</span></span>
<span class="line"><span>echo &quot;ssh-rsa бла-бла-бла-набор-символов root@ansible-hostname&quot; &gt;&gt; $destdir/root/.ssh/authorized_keys</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cp /var/ChangeHostName.py $destdir/var/</span></span></code></pre></div><p>Тут одна тонкость — таргет указывается с преффиксом $destdir, иначе установщик, выполняя директиву postinstall, запишет ключи в свой /root, а не в устанавливаемую ОС.</p><p>Скрипт поиска подходящего hostname прост, как 5 копеек (которых никто не видел уже черт знает сколько лет). Я создал в AD бесправную учетку, чтобы Python мог сходить в AD и считать уже существующие в определенной OU учетки компьютеров, и выбрать следующий по списку.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/usr/bin/python3</span></span>
<span class="line"><span># -*- coding: utf-8 -*-</span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span>import sys</span></span>
<span class="line"><span>from getpass import getpass</span></span>
<span class="line"><span>from ldap3 import Server, Connection, SUBTREE, LEVEL</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span></span></span>
<span class="line"><span>username=&quot;lab.ru\\linux_to_domain&quot;</span></span>
<span class="line"><span>password=&quot;Passw0rd!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server = Server(&quot;dc-1.lab.ru&quot;, port=389, use_ssl=False, get_info=&#39;ALL&#39;)</span></span>
<span class="line"><span>connection = Connection(server, user=username, password=password,</span></span>
<span class="line"><span>               fast_decoder=True, auto_bind=True, auto_referrals=True, check_names=False, read_only=True,</span></span>
<span class="line"><span>               lazy=False, raise_exceptions=False)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>hostnamedigit=1</span></span>
<span class="line"><span>hostname = &quot;ARM-&quot;+&#39;{:0&gt;4}&#39;.format(hostnamedigit)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def get_all_ad_hosts(connection):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    results = list()</span></span>
<span class="line"><span>    elements = connection.extend.standard.paged_search(</span></span>
<span class="line"><span>        search_base=&#39;OU=LINUX,OU=Computers,dc=lab,dc=ru&#39;,</span></span>
<span class="line"><span>        search_filter=&#39;(&amp;(objectCategory=computer)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))&#39;,</span></span>
<span class="line"><span>        search_scope=SUBTREE,</span></span>
<span class="line"><span>        attributes=[&#39;name&#39;],</span></span>
<span class="line"><span>        paged_size=100)</span></span>
<span class="line"><span>    for element in elements:</span></span>
<span class="line"><span>        host = dict()</span></span>
<span class="line"><span>        if &#39;dn&#39; in element:</span></span>
<span class="line"><span>            host[&#39;dn&#39;] = element[&#39;dn&#39;]</span></span>
<span class="line"><span>            host[&#39;name&#39;] = element[&#39;attributes&#39;][u&#39;name&#39;][0]</span></span>
<span class="line"><span>            results.append(host)</span></span>
<span class="line"><span>    return(results)</span></span>
<span class="line"><span>    connection.unbind()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def search_for_duplicatename(hostname,list_of_computers):</span></span>
<span class="line"><span>    for computer in list_of_computers:</span></span>
<span class="line"><span>        if computer[&#39;name&#39;].casefold() == hostname.casefold():</span></span>
<span class="line"><span>            print(hostname+&quot; already exists&quot;)</span></span>
<span class="line"><span>            return 1</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>computers = get_all_ad_hosts(connection)</span></span>
<span class="line"><span>while search_for_duplicatename(hostname, computers) != 0:</span></span>
<span class="line"><span>    hostnamedigit += 1</span></span>
<span class="line"><span>    hostname = &quot;ARM-&quot;+&#39;{:0&gt;4}&#39;.format(hostnamedigit)</span></span>
<span class="line"><span>print(hostname)</span></span>
<span class="line"><span>os.system(&quot;hostnamectl set-hostname &quot;+hostname)</span></span>
<span class="line"><span>print(&quot;Your system is gonna reboot in 10 seconds....&quot;)</span></span>
<span class="line"><span>time.sleep(10)</span></span>
<span class="line"><span>os.system(&quot;reboot now&quot;)</span></span></code></pre></div><p>Теперь о том, куда же эти скрипты поместить. Целевая директория — архив altinst, находящийся в корне ISO. В архиве скрипт нужно расположить в директории /usr/share/install2/postinstall.d/ и не забыть сделать его исполняемым, иначе чуда не произойдет. Скрипт подбора hostname я положил в /var, хотя это не играет особой роли.</p><p>Оговорюсь лишь о том, что для доставки файлов, открытых ключей и прочего, мы опубликовали их рядом с репозиториями. Там все равно web-сервер поднят, почему бы его не использовать? 3.1. Доставить внутренние сертификаты, импортировать их</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- name: Install local CA certs</span></span>
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
<span class="line"><span>        update-ca-trust extract</span></span></code></pre></div><p>3.2. Добавить локальные репозитории</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- name: add repositories</span></span>
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
<span class="line"><span>	apt-get dist-upgrade -y</span></span></code></pre></div><p>3.3. Установить в систему весь требуемый софт, …</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- name: soft installation</span></span>
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
<span class="line"><span>             systemctl start cups</span></span></code></pre></div><p>3.4. Сформировать конфиги для подключения ПК к домену, ..</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- name:  pre-domain config</span></span>
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
<span class="line"><span>              mode: &quot;755&quot;</span></span></code></pre></div><p>3.5. Настроить ssh согласно требованиям от ИБ, в том числе ограничить доступ для определенных групп AD</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- name: ssh</span></span>
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
<span class="line"><span>                    enabled: yes</span></span></code></pre></div><p>3.6. Настроить доступ к sudo для определенной группы AD</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- name: sudoers</span></span>
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
<span class="line"><span>                    validate: /usr/sbin/visudo -cf %s</span></span></code></pre></div><p>3.8. Ввести ПК в домен</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#При запуске спрашивает логин и пароль (в «приватном» виде).</span></span>
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
<span class="line"><span>        reboot_timeout: 120</span></span></code></pre></div><p>3.10. Предусмотреть возможность массового обновления</p><p>Тут пришлось сделать отдельный playbook для обновления, и отдельный playbook для брендирования, так как мы пошли по простому пути – не стали пилить тему для кедов, а просто поменяли интересующие нас картинки. И поэтому при обновлении пакетов картинки затираются. Поэтому сразу после обновления происходит брендирование.</p><p>Playbook апдейта:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- name: update and upgrade</span></span>
<span class="line"><span>  hosts: simply</span></span>
<span class="line"><span>  gather_facts: false</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  - name: update &amp; upgrade</span></span>
<span class="line"><span>    shell: |</span></span>
<span class="line"><span>      apt-get update -y &amp;&amp; apt-get dist-upgrade -y</span></span>
<span class="line"><span>      apt-get dedup -y</span></span></code></pre></div><p>Брендинг у нас уже был (но я вам его не покажу, мне запретили). И поэтому playbook обновления выглядят так:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- import_playbook: update.yml</span></span>
<span class="line"><span>- import_playbook: branding.yml</span></span></code></pre></div></div>`,123)]))}const g=a(l,[["render",e]]);export{o as __pageData,g as default};
