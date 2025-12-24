import{_ as a,c as n,o as p,ag as l}from"./chunks/framework.D4Vqf8I7.js";const k=JSON.parse('{"title":"Ansible","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/ansible.md","filePath":"docs/wi/ansible.md","lastUpdated":1766581044000}'),i={name:"docs/wi/ansible.md"};function e(t,s,c,h,r,o){return p(),n("div",null,s[0]||(s[0]=[l(`<h1 id="ansible" tabindex="-1">Ansible <a class="header-anchor" href="#ansible" aria-label="Permalink to &quot;Ansible&quot;">​</a></h1><p><img src="https://habrastorage.org/getpro/habr/upload_files/81b/5e2/9f1/81b5e29f12b41ba26dff6cdd05848a5b.webp" alt=""></p><p>Ansible — система управления конфигурациями, написанная на Python, с использованием декларативного языка разметки для описания конфигураций. Используется для автоматизации настройки и развертывания программного обеспечения. Обычно используется для управления Linux-узлами, но Windows также поддерживается. Поддерживает работу с сетевыми устройствами, на которых установлен Python версии 2.4 и выше по SSH или WinRM соединению.</p><p><a href="https://www.altlinux.org/Ansible" target="_blank" rel="noreferrer">https://www.altlinux.org/Ansible</a></p><h2 id="быстрыи-старт" tabindex="-1">Быстрый старт <a class="header-anchor" href="#быстрыи-старт" aria-label="Permalink to &quot;Быстрый старт&quot;">​</a></h2><h3 id="установка-на-сервер" tabindex="-1">Установка на сервер: <a class="header-anchor" href="#установка-на-сервер" aria-label="Permalink to &quot;Установка на сервер:&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible</span></span></code></pre></div><h3 id="установка-на-клиенты" tabindex="-1">Установка на клиенты: <a class="header-anchor" href="#установка-на-клиенты" aria-label="Permalink to &quot;Установка на клиенты:&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python-module-yaml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python-module-jinja2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python-modules-json</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python-modules-distutils</span></span></code></pre></div><p>На клиенте должен быть настроен доступ по ssh пользователем, находящимся в группе wheel.</p><p>Все дальнейшие действия производим на сервере.</p><h3 id="редактируем-фаил-etc-ansible-hosts-это-фаил-которыи-содержит-списки-хостов-и-группы-этих-хостов" tabindex="-1">Редактируем файл <code>/etc/ansible/hosts</code> - это файл, который содержит списки хостов и группы этих хостов: <a class="header-anchor" href="#редактируем-фаил-etc-ansible-hosts-это-фаил-которыи-содержит-списки-хостов-и-группы-этих-хостов" aria-label="Permalink to &quot;Редактируем файл \`/etc/ansible/hosts\` - это файл, который содержит списки хостов и группы этих хостов:&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[all:vars]</span></span>
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
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Linux</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> altsrv2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 5.10.82-std-def-alt1</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #1 SMP Fri Dec 3 14:49:25 UTC 2021 x86_64</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GNU/Linux</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">altsrv1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CHANGED</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &gt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Linux</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> altsrv1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 5.10.82-std-def-alt1</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #1 SMP Fri Dec 3 14:49:25 UTC 2021 x86_64</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GNU/Linux</span></span></code></pre></div><p>Пример. Удаление файла</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;name=/etc/nologin state=absent&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> all</span></span></code></pre></div><h3 id="создание-хеша-пароля" tabindex="-1">Создание хеша пароля: <a class="header-anchor" href="#создание-хеша-пароля" aria-label="Permalink to &quot;Создание хеша пароля:&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkpasswd</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">passwor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><p>Получаем строку.</p><p>Далее используем ansible-vault:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ansible-vault</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> encrypt_string</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;ранее полученный хэш&#39;</span></span>
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
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    62346136656161653430383730663661393830313430343539366663383431626365633465376436</span></span></code></pre></div><p>И теперь весь этот блок, начиная с <code>!vault |</code> необходимо использовать в ансибле</p><h2 id="полезные-рецепты-с-альтвики" tabindex="-1">Полезные рецепты с Альтвики <a class="header-anchor" href="#полезные-рецепты-с-альтвики" aria-label="Permalink to &quot;Полезные рецепты с Альтвики&quot;">​</a></h2><p>Рецепты применяются командой:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ansible-playbook &lt;имя файла&gt;</span></span></code></pre></div><h3 id="прописывание-репозитория" tabindex="-1">Прописывание репозитория <a class="header-anchor" href="#прописывание-репозитория" aria-label="Permalink to &quot;Прописывание репозитория&quot;">​</a></h3><p>Файл: /etc/ansible/playbooks/repo.yml</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- hosts: local</span></span>
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
<span class="line"><span>      clean: true</span></span></code></pre></div><p><strong>Примечание:</strong> Используется <a href="https://docs.ansible.com/ansible/latest/collections/community/general/apt_rpm_module.html" target="_blank" rel="noreferrer">модуль apt_rpm</a>.</p><h4 id="ссылки" tabindex="-1">Ссылки <a class="header-anchor" href="#ссылки" aria-label="Permalink to &quot;Ссылки&quot;">​</a></h4><ul><li><a href="http://habr.com/ru/post/508762/" target="_blank" rel="noreferrer">Основы Ansible, без которых ваши плейбуки — комок слипшихся макарон</a></li></ul><hr><p>использование плагина <a href="https://docs.ansible.com/ansible/latest/collections/community/general/nmap_inventory.html" target="_blank" rel="noreferrer">nmap</a> в связке с плагином <a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/constructed_inventory.html" target="_blank" rel="noreferrer">constructed</a>. При запуске он опрашивает указанные подсети и формирует список хостов для применения плейбуков или ролей, а потом делает свои грязные делишки на отобранные по правилам хосты.</p><p>:::</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Использование ANSIBLE VAULT</span></span>
<span class="line"><span>Назначение:</span></span>
<span class="line"><span>- Шифрование данных</span></span>
<span class="line"><span>- Хранение шифрованных данных</span></span>
<span class="line"><span>- Расшифровка данных только в момент использования этих данных</span></span>
<span class="line"><span>Работа с ansible-vault в интерактивном режиме:</span></span>
<span class="line"><span>$ ansible-vault</span></span>
<span class="line"><span>- create</span></span>
<span class="line"><span>- decrypt</span></span>
<span class="line"><span>- edit</span></span>
<span class="line"><span>- view</span></span>
<span class="line"><span>- encrypt</span></span>
<span class="line"><span>- encrypt_string</span></span>
<span class="line"><span>- rekey</span></span>
<span class="line"><span>Шифрование отдельных строк:</span></span>
<span class="line"><span>$ ansible-vault encrypt_string &#39;password&#39;</span></span>
<span class="line"><span>New Vault password:</span></span>
<span class="line"><span>Confirm New Vault password:</span></span>
<span class="line"><span>!vault |</span></span>
<span class="line"><span>$ANSIBLE_VAULT;1.1;AES256</span></span>
<span class="line"><span>366163646632396362303866386431</span></span>
<span class="line"><span>39383237326533363236323339666162323163376565313138</span></span>
<span class="line"><span>3333636130646636363639363530643364656534336338370a3831313061363533</span></span>
<span class="line"><span>37303261366430</span></span>
<span class="line"><span>613666336562623732363334343535396336313665336236303730323664613466</span></span>
<span class="line"><span>30636635313235</span></span>
<span class="line"><span>6631393939646632360a6564306263383365333764376462323231616539393837</span></span>
<span class="line"><span>39353564353934</span></span>
<span class="line"><span>6338</span></span>
<span class="line"><span>Применение полученного результата, создадим плейбук в котором</span></span>
<span class="line"><span>используются зашифрованная строка:</span></span>
<span class="line"><span>play1.yml:</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span>- name: Получим пароль</span></span>
<span class="line"><span>hosts: localhost</span></span>
<span class="line"><span>gather_facts: no</span></span>
<span class="line"><span>vars:</span></span>
<span class="line"><span>password: !vault |</span></span>
<span class="line"><span>$ANSIBLE_VAULT;1.1;AES256</span></span>
<span class="line"><span>366163646632396362303866386431393832373265333632363233396661623231</span></span>
<span class="line"><span>63376565313138</span></span>
<span class="line"><span>3333636130646636363639363530643364656534336338370a3831313061363533</span></span>
<span class="line"><span>37303261366430</span></span>
<span class="line"><span>613666336562623732363334343535396336313665336236303730323664613466</span></span>
<span class="line"><span>30636635313235</span></span>
<span class="line"><span>6631393939646632360a6564306263383365333764376462323231616539393837</span></span>
<span class="line"><span>39353564353934</span></span>
<span class="line"><span>6338</span></span>
<span class="line"><span>tasks:</span></span>
<span class="line"><span>- name: debug</span></span>
<span class="line"><span>debug:</span></span>
<span class="line"><span>msg: &quot;Пароль: {{ password }} &quot;</span></span>
<span class="line"><span>Выполним полученный плейбук:</span></span>
<span class="line"><span>$ ansible-play play1.yml</span></span>
<span class="line"><span># Получим ошибку, т.к. не указан пароль для расшифровки</span></span>
<span class="line"><span>$ ansible-playbook play1.yml --ask-vault-password</span></span>
<span class="line"><span>PLAY [Получим пароль]</span></span>
<span class="line"><span>******************************************************************</span></span>
<span class="line"><span>************</span></span>
<span class="line"><span>TASK [debug]</span></span>
<span class="line"><span>******************************************************************</span></span>
<span class="line"><span>*********************</span></span>
<span class="line"><span>ok: [localhost] =&gt; {</span></span>
<span class="line"><span>&quot;msg&quot;: &quot;Пароль: password &quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>PLAY RECAP</span></span>
<span class="line"><span>******************************************************************</span></span>
<span class="line"><span>***********************</span></span>
<span class="line"><span>localhost : ok=1 changed=0 unreachable=0</span></span>
<span class="line"><span>failed=0 skipped=0 rescued=0 ignored=0</span></span>
<span class="line"><span>Создание строки пригодной для встраивание в плейбуки:</span></span>
<span class="line"><span>$ ansible-vault encrypt_string &#39;password&#39; --name &#39;user_password&#39;</span></span>
<span class="line"><span>user_password: !vault |</span></span>
<span class="line"><span>$ANSIBLE_VAULT;1.1;AES256</span></span>
<span class="line"><span>633661623735373465333162653033613037663939383334396339656138666231</span></span>
<span class="line"><span>30376330616531</span></span>
<span class="line"><span>3664323366666234363636656264333133653562396135310a6332376139663430</span></span>
<span class="line"><span>65643736363733</span></span>
<span class="line"><span>343137376437326166623565393831303739623563633333663538343661633130</span></span>
<span class="line"><span>30663563623037</span></span>
<span class="line"><span>3633663230373636330a3262623534643233343636323236393136333135313331</span></span>
<span class="line"><span>64343664376438</span></span>
<span class="line"><span>3433</span></span>
<span class="line"><span>Создание хранилища в виде файла:</span></span>
<span class="line"><span>$ ansible-vault create /tmp/vault1.yml</span></span>
<span class="line"><span>New Vault password:</span></span>
<span class="line"><span>Confirm New Vault password:</span></span>
<span class="line"><span>Запускается редактор по-умолчанию для редактирование файла (vim).</span></span>
<span class="line"><span>Просмотр результата:</span></span>
<span class="line"><span>$ cat /tmp/vault1.yml</span></span>
<span class="line"><span>$ANSIBLE_VAULT;1.1;AES256</span></span>
<span class="line"><span>313065653137303434316233646139393731623231636432386131373232616531</span></span>
<span class="line"><span>39623062646438</span></span>
<span class="line"><span>3764383630306665666439663530613538363035386232640a6432653562633031</span></span>
<span class="line"><span>33623037363234</span></span>
<span class="line"><span>333263363863386130643837326636643964366438643031376539663761396434</span></span>
<span class="line"><span>65353566313330</span></span>
<span class="line"><span>3662323665636463630a6536373764383261643065363136386536333339306262</span></span>
<span class="line"><span>62636362353962</span></span>
<span class="line"><span>366134623332613466333234646464373164643430343538303164373734316437</span></span>
<span class="line"><span>65</span></span>
<span class="line"><span>Просмотр дешифрованного содержимого файла:</span></span>
<span class="line"><span>$ ansible-vault view /tmp/vault1.yml</span></span>
<span class="line"><span>Vault password:</span></span>
<span class="line"><span>user_password: netlab123</span></span>
<span class="line"><span>Использование шифрованных файлов в плейбуке:</span></span>
<span class="line"><span>play1.yml:</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span>- name: Получим пароль</span></span>
<span class="line"><span>hosts: localhost</span></span>
<span class="line"><span>vars_files: &quot;/tmp/vault1.yml&quot;</span></span>
<span class="line"><span>gather_facts: no</span></span>
<span class="line"><span>tasks:</span></span>
<span class="line"><span>- name: debug</span></span>
<span class="line"><span>debug:</span></span>
<span class="line"><span>msg: &quot;Пароль: {{ user_password }}&quot;</span></span>
<span class="line"><span>Результат:</span></span>
<span class="line"><span>$ ansible-playbook play1.yml --ask-vault-password</span></span>
<span class="line"><span>Vault password:</span></span>
<span class="line"><span>PLAY [Получим пароль]</span></span>
<span class="line"><span>******************************************************************</span></span>
<span class="line"><span>************</span></span>
<span class="line"><span>TASK [debug]</span></span>
<span class="line"><span>******************************************************************</span></span>
<span class="line"><span>*********************</span></span>
<span class="line"><span>ok: [localhost] =&gt; {</span></span>
<span class="line"><span>&quot;msg&quot;: &quot;Пароль: netlab123&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>PLAY RECAP</span></span>
<span class="line"><span>******************************************************************</span></span>
<span class="line"><span>***********************</span></span>
<span class="line"><span>localhost : ok=1 changed=0 unreachable=0</span></span>
<span class="line"><span>failed=0 skipped=0 rescued=0 ignored=0</span></span>
<span class="line"><span>Редактирование зашифрованного содержимого файла:</span></span>
<span class="line"><span>$ EDITOR=nano ansible-vault edit /tmp/vault1.yml</span></span>
<span class="line"><span># Данные в виде словаря</span></span>
<span class="line"><span>passwords:</span></span>
<span class="line"><span>user1:</span></span>
<span class="line"><span>password: netlab123</span></span>
<span class="line"><span>user2:</span></span>
<span class="line"><span>password: netlab123</span></span>
<span class="line"><span>Изменённый плейбук:</span></span>
<span class="line"><span>play1.yml:</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span>- name: Получим пароль</span></span>
<span class="line"><span>hosts: localhost</span></span>
<span class="line"><span>vars_files: &quot;/tmp/vault1.yml&quot;</span></span>
<span class="line"><span>gather_facts: no</span></span>
<span class="line"><span>tasks:</span></span>
<span class="line"><span>- name: debug</span></span>
<span class="line"><span>debug:</span></span>
<span class="line"><span>msg: &quot;Пароль пользователя {{ item.key }} :</span></span>
<span class="line"><span>{{ item.value.password }}&quot;</span></span>
<span class="line"><span>loop: &quot;{{ passwords | dict2items }}&quot;</span></span>
<span class="line"><span>$ ansible-playbook play1.yml --ask-vault-password</span></span>
<span class="line"><span>Vault password:</span></span>
<span class="line"><span>Шифрованние/дешифрование готового файла:</span></span>
<span class="line"><span>$ vim user-passwords.yml # создаём файл</span></span>
<span class="line"><span>$ ansible-vault encrypt user-passwords.yml # шифрование файла</span></span>
<span class="line"><span>$ cat user-passwords.yml # просмотр результата</span></span>
<span class="line"><span>$ ansible-vault view user-passwords.yml # просмотр</span></span>
<span class="line"><span>$ ansible-vault decrypt user-passwords.yml # шифрование файла</span></span>
<span class="line"><span>$ ansible-vault encrypt user-passwords.yml # зашифруем снова</span></span>
<span class="line"><span>Шифрование (+ хранение) файла:</span></span>
<span class="line"><span>$ cp ~/.ssh/id_rsa id_rsa.encrypted</span></span>
<span class="line"><span>$ ansible-vault encrypt id_rsa.encrypted</span></span>
<span class="line"><span>Создадим плейбук для копирования зашифрованного файла:</span></span>
<span class="line"><span>copy-file.yml:</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span>- name: Соединяемся с другим узлом</span></span>
<span class="line"><span>hosts: remotehost</span></span>
<span class="line"><span>gather_facts: no</span></span>
<span class="line"><span>become: false</span></span>
<span class="line"><span>tasks:</span></span>
<span class="line"><span>- name: Копирование файла на удалённый сервер</span></span>
<span class="line"><span>copy:</span></span>
<span class="line"><span>src: id_rsa.encrypted</span></span>
<span class="line"><span>dest: ~/.ssh/remote_key</span></span>
<span class="line"><span>mode: &#39;0600&#39;</span></span>
<span class="line"><span>Пример использования:</span></span>
<span class="line"><span>use-user.yml:</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span>- name: Соединяемся с другим узлом</span></span>
<span class="line"><span>hosts: remotehost</span></span>
<span class="line"><span>vars_files: &quot;user-passwords.yml&quot;</span></span>
<span class="line"><span>gather_facts: no</span></span>
<span class="line"><span>tasks:</span></span>
<span class="line"><span>- name: Установим учётную запись и пароль для соединения</span></span>
<span class="line"><span>set_fact:</span></span>
<span class="line"><span>ansible_user: &quot;{{ item.key }}&quot;</span></span>
<span class="line"><span>ansible_password: &quot;{{ item.value.password }}&quot;</span></span>
<span class="line"><span>with_items: &quot;{{ passwords | dict2items }}&quot;</span></span>
<span class="line"><span>when:</span></span>
<span class="line"><span>- item.key == &quot;user1&quot;</span></span>
<span class="line"><span>- name: Посмотрим в какие группы входит пользователь</span></span>
<span class="line"><span>shell: /usr/bin/id</span></span>
<span class="line"><span>register: result</span></span>
<span class="line"><span>- name: Посмотрим результат</span></span>
<span class="line"><span>debug:</span></span>
<span class="line"><span>msg: &quot;Пользователь {{ ansible_user }} входит в группы</span></span>
<span class="line"><span>{{result.stdout}}&quot;</span></span>
<span class="line"><span>Потребуется sshpass:</span></span>
<span class="line"><span># apt-get install sshpass</span></span>
<span class="line"><span>$ ansible-playbook use-user.yml --ask-vault-password</span></span>
<span class="line"><span>Vault password:</span></span>
<span class="line"><span>- no_log:</span></span>
<span class="line"><span>Использование ansible-vault без введения пароля:</span></span>
<span class="line"><span>ANSIBLE_VAULT_PASSWORD_FILE=</span></span>
<span class="line"><span>--vault-password-file=</span></span>
<span class="line"><span>$ ansible-playbook use-user.yml --vault-password-file=</span></span>
<span class="line"><span>$ chmod +x &lt;vault-password-file&gt;</span></span>
<span class="line"><span>say_password:</span></span>
<span class="line"><span>#!/bin/sh</span></span>
<span class="line"><span>echo U2FsdGVkX1+7Gd8IBqVzGfDmsrbRcT2K0SNZSq8158o= | openssl aes-</span></span>
<span class="line"><span>256-cbc -d -a -pass pass:somepassword 2&gt;/dev/null</span></span>
<span class="line"><span>Использование ansible-vault в ролях:</span></span>
<span class="line"><span>$ cd r1/vars</span></span>
<span class="line"><span>- открытая часть:</span></span>
<span class="line"><span>- закрытая часть:</span></span>
<span class="line"><span>passwords.yml:</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span># vars file for r1</span></span>
<span class="line"><span>passwords:</span></span>
<span class="line"><span>user1:</span></span>
<span class="line"><span>password: &quot;netlab123&quot;</span></span>
<span class="line"><span>Шифруем файл «закрытой части»:</span></span>
<span class="line"><span>$ ansible-vault encrypt passwords.yml</span></span>
<span class="line"><span>New Vault password:</span></span>
<span class="line"><span>Confirm New Vault password:</span></span>
<span class="line"><span>Encryption successful</span></span>
<span class="line"><span>Изменяем файл с задачами:</span></span>
<span class="line"><span>$ cd ../tasks/</span></span>
<span class="line"><span>main.yml:</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span># tasks file for r1</span></span>
<span class="line"><span>- name: Создаём пользователя без пароля</span></span>
<span class="line"><span>user:</span></span>
<span class="line"><span>name: &quot;{{ item.key }}&quot;</span></span>
<span class="line"><span>append: &quot;{{ item.value.append }}&quot;</span></span>
<span class="line"><span>groups: &quot;{{ item.value.groups }}&quot;</span></span>
<span class="line"><span>loop: &quot;{{ users | dict2items }}&quot;</span></span>
<span class="line"><span>- name: Добавим файл с паролем</span></span>
<span class="line"><span>include_vars: passwords.yml</span></span>
<span class="line"><span>- name: Создаём пароль для пользователя</span></span>
<span class="line"><span>user:</span></span>
<span class="line"><span>name: &quot;{{ item.key }}&quot;</span></span>
<span class="line"><span>password: &quot;{{ item.value.password |</span></span>
<span class="line"><span>password_hash(&#39;sha512&#39;) }}&quot;</span></span>
<span class="line"><span>loop: &quot;{{ passwords | dict2items }}&quot;</span></span>
<span class="line"><span>no_log: true</span></span>
<span class="line"><span>$ ansible-playbook r1task.yml --vault-password-file=say_password</span></span>
<span class="line"><span>Использование нескольких хранилищ:</span></span>
<span class="line"><span>$ cat ~/.ansible/inventory.ini</span></span>
<span class="line"><span>$ EDITOR=nano ansible-vault create --vault-id become105@prompt</span></span>
<span class="line"><span>/home/sysadmin/.ansible/192.168.100.105.yml</span></span>
<span class="line"><span>- @</span></span>
<span class="line"><span>- prompt</span></span>
<span class="line"><span>$ cat /home/sysadmin/.ansible/192.168.100.105.yml</span></span>
<span class="line"><span>$ANSIBLE_VAULT;1.2;AES256;become105</span></span>
<span class="line"><span>$ vim become105</span></span>
<span class="line"><span>r1task.yml:</span></span>
<span class="line"><span>vars_files: &quot;/home/sysadmin/.ansible/192.168.100.105.yml&quot;</span></span>
<span class="line"><span>$ ansible-playbook r1task.yml --vault-password-file=say_password</span></span>
<span class="line"><span>--vault-id=become105</span></span>
<span class="line"><span>--vault-password-file=</span></span>
<span class="line"><span>--vault-id=</span></span></code></pre></div><p>:::</p>`,52)]))}const u=a(i,[["render",e]]);export{k as __pageData,u as default};
