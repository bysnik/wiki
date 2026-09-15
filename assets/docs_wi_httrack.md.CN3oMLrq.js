import{_ as i,o as a,c as n,aj as l}from"./chunks/framework.BZR1KcQy.js";const F=JSON.parse('{"title":"HTTrack","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/httrack.md","filePath":"docs/wi/httrack.md","lastUpdated":1789469157000}'),p={name:"docs/wi/httrack.md"};function e(h,s,k,t,r,d){return a(),n("div",null,s[0]||(s[0]=[l(`<h1 id="httrack" tabindex="-1">HTTrack <a class="header-anchor" href="#httrack" aria-label="Permalink to &quot;HTTrack&quot;">​</a></h1><p>HTTrack Website Copier, copy websites to your computer</p><p><a href="https://github.com/xroche/httrack" target="_blank" rel="noreferrer">https://github.com/xroche/httrack</a></p><p><a href="https://packages.altlinux.org/ru/p11/srpms/httrack/" target="_blank" rel="noreferrer">https://packages.altlinux.org/ru/p11/srpms/httrack/</a> <a href="https://git.altlinux.org/gitoskop/#/srpms/h/httrack.git/-/tree/p11" target="_blank" rel="noreferrer">https://git.altlinux.org/gitoskop/#/srpms/h/httrack.git/-/tree/p11</a> - nossl</p><h2 id="инструкция-по-сборке-httrack-3-50-2-из-исходников" tabindex="-1">Инструкция по сборке HTTrack 3.50-2 из исходников <a class="header-anchor" href="#инструкция-по-сборке-httrack-3-50-2-из-исходников" aria-label="Permalink to &quot;Инструкция по сборке HTTrack 3.50-2 из исходников&quot;">​</a></h2><h3 id="назначение" tabindex="-1">Назначение <a class="header-anchor" href="#назначение" aria-label="Permalink to &quot;Назначение&quot;">​</a></h3><p>Сборка HTTrack с поддержкой SSL/TLS из официального репозитория GitHub для работы с HTTPS-сайтами.</p><h3 id="предварительные-требования" tabindex="-1">Предварительные требования <a class="header-anchor" href="#предварительные-требования" aria-label="Permalink to &quot;Предварительные требования&quot;">​</a></h3><p>Установленные пакеты:</p><ul><li><code>gcc</code></li><li><code>make</code></li><li><code>libssl-devel</code></li><li><code>zlib-devel</code></li><li><code>autoconf</code></li><li><code>automake</code></li><li><code>libtool</code></li><li><code>autoconf-archive</code></li><li><code>pkg-config</code></li><li><code>git</code></li></ul><h3 id="команды" tabindex="-1">Команды <a class="header-anchor" href="#команды" aria-label="Permalink to &quot;Команды&quot;">​</a></h3><p><strong>1. Установка зависимостей:</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build-essential</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> autoconf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> automake</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libtool</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> autoconf-archive</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pkg-config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libssl-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zlib-devel</span></span></code></pre></div><p><strong>3. Генерация скрипта <code>configure</code>:</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./bootstrap</span></span></code></pre></div><p><strong>4. Конфигурация и сборка:</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./configure</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --prefix=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$HOME</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">/usr</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -j$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nproc</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div><p><strong>5. Проверка:</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$HOME/usr/bin/httrack --version</span></span></code></pre></div><h3 id="ожидаемыи-результат" tabindex="-1">Ожидаемый результат <a class="header-anchor" href="#ожидаемыи-результат" aria-label="Permalink to &quot;Ожидаемый результат&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>HTTrack version 3.50-2</span></span></code></pre></div><p>В выводе отсутствует маркер <code>nossl</code> — подтверждение поддержки SSL/TLS.</p><h3 id="примечания" tabindex="-1">Примечания <a class="header-anchor" href="#примечания" aria-label="Permalink to &quot;Примечания&quot;">​</a></h3><ul><li>Установка выполняется в <code>$HOME/usr</code> без прав root.</li><li>Для запуска без указания полного пути добавьте <code>$HOME/usr/bin</code> в переменную <code>PATH</code>.</li><li>Готовый бинарник запускается как <code>$HOME/usr/bin/httrack</code>.</li></ul><h2 id="планы-на-сборку" tabindex="-1">Планы на сборку <a class="header-anchor" href="#планы-на-сборку" aria-label="Permalink to &quot;Планы на сборку&quot;">​</a></h2><h3 id="взять-спеку-нашу" tabindex="-1">Взять спеку нашу: <a class="header-anchor" href="#взять-спеку-нашу" aria-label="Permalink to &quot;Взять спеку нашу:&quot;">​</a></h3><details class="details custom-block"><summary>Details</summary><div class="language-rpm-spec vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rpm-spec</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%def_enable shared</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%def_disable static</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%define</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Name HTTrack</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%define</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lname lib%name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%define</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> origver 3.45-3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Name:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> httrack</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Version:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.45.3</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Release:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> alt1.2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Epoch:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Summary:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> An easy-to-use offline browser utility</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">License:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> %gpl2plus</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Group:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Networking/File transfer</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Url:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> http://www.httrack.com</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Source0:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> %name-%version.tar.gz</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Source1:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> %name.conf</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Patch:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> httrack-3.47.3-alt-makefile.patch</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Packager:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Led </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">led@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%{?_enable_shared:Requires: %lname </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> %version-%release}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">BuildRequires(pre): rpm-build-licenses</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> Automatically added by buildreq on Tue Mar 04 2008</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">BuildRequires:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gcc-c++ zlib-devel ImageMagick</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%set_automake_version 1.10</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">BuildRequires:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> desktop-file-utils</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%description</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%Name is an easy-to-use offline browser utility. It allows you to</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">download a World Wide website from the Internet to a </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> directory,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">building recursively all directories, getting html, images, and other</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">files from the server to your computer. %Name arranges the original</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">site&#39;s relative link-structure. Simply open a page of the &quot;mirrored&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">website in your browser, and you can browse the site from link to link,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">as if you were viewing it online. %Name can also update an existing</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mirrored site, and resume interrupted downloads. %Name is fully</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">configurable, and has an integrated help system.</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_enabled shared</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%package</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -n %lname</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Summary:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Shared library for %Name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Group:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> System/Libraries</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -n %lname</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">This package contains shared library for %Name.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%endif</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%package</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -n %lname-devel</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Summary:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Development files for %Name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Group:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Development/C</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Requires:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> %lname%{?_disable_shared:-devel-static} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> %EVR</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -n %lname-devel</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">This package contains development files required for packaging</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%Name-based software.</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_enabled static</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%package</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -n %lname-devel-static</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Summary:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Static libraries for %Name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Group:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Development/C</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Requires:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> %lname-devel </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> %EVR</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -n %lname-devel-static</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">This package contains development libraries required for packaging</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">statically linked %Name-based software.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%endif</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%package</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -n web%name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Summary:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Offline browser - %name and htsserver frontend</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Group:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Networking/File transfer</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Requires:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> %name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> %EVR</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -n web%name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Offline browser: copy websites to a </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> directory.</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%prep</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">%setup</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">%patch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -p1</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%build</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ACLOCAL</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;aclocal -I m4&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> %autoreconf</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">%configure</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> %{</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">subst_enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> shared}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %{subst_enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> static}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%make_build</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">convert</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -depth</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> html/server/div/web%name.xpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> web%{name}_48.png</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> s </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 32</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 24</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 16</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    convert</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -resize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${s}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$s </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-depth</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> html/server/div/web%name.xpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> web%{name}_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.png</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">done</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%install</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%make_install DESTDIR</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">%buildroot</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> install</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mv</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %buildroot%_docdir/%name{,-%version}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0644</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> AUTHORS</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> README</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %buildroot%_docdir/%name-%version/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m644</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %SOURCE1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %buildroot/%_sysconfdir/%name.conf</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> s </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 48</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 32</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 24</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 16</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0644</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {web%{name}_</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,%buildroot%_iconsdir/hicolor/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\${s}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/apps/web%name}.png</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">done</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %buildroot%_libdir/%name/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.la</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">desktop-file-install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --dir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %buildroot%_desktopdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">	--add-category=FileTransfer</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">	%buildroot%_desktopdir/WebHTTrack.desktop</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%files</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_docdir/%name-%version</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_bindir/%name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_datadir/%name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%exclude %_datadir/%name/libtest</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%exclude %_datadir/%name/icons</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_man1dir/%name.1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%config(noreplace)</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> %_sysconfdir/%name.conf</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_enabled shared</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%files -n %lname</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_libdir/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.so.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_libdir/%name/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.so.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%endif</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%files -n %lname-devel</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_includedir/%name</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_enabled shared</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_libdir/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.so</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_libdir/%name/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.so</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%endif</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">_enabled static</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%files -n %lname-devel-static</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_libdir/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.a</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_libdir/%name/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.a</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%endif</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%files -n web%name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_bindir/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%exclude %_bindir/%name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_man1dir/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%exclude %_man1dir/%name.1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_datadir/%name/icons</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_pixmapsdir/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_desktopdir/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%_iconsdir/hicolor/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/apps/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%changelog</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Wed Oct 20 2021 Grigory Ustinov </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">grenka@altlinux.org</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 1:3.45.3-alt1.2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Fixed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> FTBFS.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Thu Jul 12 2018 Igor Vlasenko </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">viy@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 1:3.45.3-alt1.1.qa1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> NMU</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (by </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">repocop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">). See http://www.altlinux.org/Tools/Repocop</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> applied</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> repocop</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fixes:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> beehive-log-dependency-needs-epoch-x86_64</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> httrack</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Mon Jun 23 2014 Michael Shigorin </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mike@altlinux.org</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 1:3.45.3-alt1.1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rebuild</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> working</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> package</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (reworked </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">one</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> got</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> overworked</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> thus</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> broken</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Sun Apr 22 2012 Michael Shigorin </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mike@altlinux.org</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.45.3-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3.45.3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (moved </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">back</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> srpm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Mon May 23 2011 Repocop Q. A. Robot </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">repocop@altlinux.org</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.43.9-alt1.qa1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> NMU</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (by </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">repocop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">). See http://www.altlinux.org/Tools/Repocop</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> applied</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> repocop</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fixes:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> freedesktop-desktop-file-proposed-patch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> webhttrack</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> postclean-03-private-rpm-macros</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> the</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spec</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Sat Aug 21 2010 Michael Shigorin </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mike@altlinux.org</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.43.9-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 3.43-9C</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (maybe </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">closes</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #9356)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> patch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> teardown</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Wed Dec 09 2009 Michael Shigorin </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mike@altlinux.org</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.43.7-alt1.1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> built</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Sisyphus</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (again), thanks led@</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Fri Aug 28 2009 Led </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">led@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.43.7-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3.43.7</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Sun May 24 2009 Led </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">led@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.43.5-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3.43.5</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Sat Feb 28 2009 Led </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">led@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.43.3-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3.43.3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Sun Feb 15 2009 Led </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">led@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.43.2-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3.43.2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cleaned</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spec</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Sat Nov 08 2008 Led </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">led@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.43.1-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3.43.1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Sun Aug 10 2008 Led </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">led@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.42.3-alt3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fixed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.desktop</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Sat Aug 09 2008 Led </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">led@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.42.3-alt2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fixed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.desktop</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Thu Jul 31 2008 Led </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">led@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.42.3-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3.42.3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Fri Apr 04 2008 Led </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">led@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.42-alt3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> added</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> post</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> scripts</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> menus</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Fri Mar 21 2008 Led </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">led@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.42-alt2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 3.42-2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Tue Mar 04 2008 Led </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">led@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.42-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3.42</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fixed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %%changelog</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cleaned</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> spec</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fixed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> License</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Wed Apr 19 2006 Andrey Semenov </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mitrofan@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.40.2-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3.40.2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Sat Jan 28 2006 Andrey Semenov </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mitrofan@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.40-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> version</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Mon Feb 14 2005 Andrey Semenov </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mitrofan@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.33-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3.33</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Tue May 11 2004 Andrey Semenov </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mitrofan@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.32.2-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> version</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Broken</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> engine</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 64-bit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> archs</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Mon Apr 12 2004 Andrey Semenov </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mitrofan@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.32-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> version</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Fixed:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> css</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> and</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> files</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> were</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> not</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> parsed!</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Fixed:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> again</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> broken</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file://</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (infinite </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">loops</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> with</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> local</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> crawls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Fixed:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Bandwidth</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> limiter</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> more</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gentle</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> with</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> low</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> transfer</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rate</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Fixed:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> external</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wrappers</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> were</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> not</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> called</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> during</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> updates/continue</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> New:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> additional</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> callback</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> examples</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Fixed:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> overflow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> in</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> unzip.c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fixed</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> New:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tests</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> are</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> now</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cached</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> better</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> performances!</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> New:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %%r</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (protocol) option </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user-defined structure</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Mon Mar 15 2004 Andrey Semenov </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mitrofan@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.31-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> version</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bugs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> fixed</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> experimental</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> categories</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> implemented</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> new</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cache</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (ZIP </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">file</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .m3u</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> files</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> now</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> crawled</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .aam</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> files</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> now</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> crawled</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> full</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> HTTP</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> headers</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> are</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> now</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stored</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> in</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cache</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Wed Dec 10 2003 Andrey Semenov </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mitrofan@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.30-alt2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> removed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.la</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> files</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Sun Oct 12 2003 Andrey Semenov </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mitrofan@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.30-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> New:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Webhttrack,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> linux/unix/bsd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Web</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GUI</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> httrack</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> New:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;URL hack&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> feature</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> New:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> HTTP-headers</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> charset</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> is</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> now</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> propagated</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> in</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> the</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> html</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> New:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> loadable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> external</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> engine</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> callbacks</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> New:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Experimental</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;.mht&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> archives</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> format</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Wed Apr 02 2003 Andrey Semenov </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mitrofan@altlinux.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 3.23-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> First</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> version</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> of</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> RPM</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> package.</span></span></code></pre></div></details><h3 id="ну-и-аналогичненько-собрать-пакет" tabindex="-1">Ну и аналогичненько собрать пакет <a class="header-anchor" href="#ну-и-аналогичненько-собрать-пакет" aria-label="Permalink to &quot;Ну и аналогичненько собрать пакет&quot;">​</a></h3><p>Ниже — переработанный spec для ALT Linux. Основные изменения относительно исходного:</p><ul><li>Поднята версия до <strong>3.50.2</strong> (то, что собралось из GitHub-репозитория).</li><li>Источник — официальный git-репозиторий <code>https://github.com/xroche/httrack</code>.</li><li>В <code>BuildRequires</code> добавлены <strong><code>openssl-devel</code></strong>, <code>autoconf</code>, <code>automake</code>, <code>libtool</code>, <code>autoconf-archive</code>, <code>pkg-config</code> — без них <code>./bootstrap</code> падает, а <code>configure</code> не находит OpenSSL и собирает <code>nossl</code>-версию.</li><li>В <code>Release</code> и <code>Summary</code> отражена поддержка SSL/TLS.</li><li>Удалён <code>Patch</code> — он от старой версии 3.47.3 и к 3.50.2 неприменим.</li><li>Добавлен вызов <code>./bootstrap</code> перед <code>%configure</code> — в git-сборке <code>configure</code> генерируется автоматически.</li></ul><p>Пояснения по ключевым местам</p><ul><li><strong><code>BuildRequires: openssl-devel</code></strong> — именно из-за его отсутствия в старом spec собирался <code>nossl</code>-бинарник. Это единственное, что нужно для включения SSL, отдельного флага <code>--with-openssl</code> у HTTrack нет: OpenSSL подхватывается автоматически.</li><li><strong><code>./bootstrap</code> в <code>%build</code></strong> — в git-сборке нет готового <code>configure</code>, он генерируется на месте. Требуется <code>autoconf-archive</code> и <code>pkg-config</code>, иначе падает с <code>possibly undefined macro: AC_MSG_ERROR</code>.</li><li><strong><code>Source0</code></strong> — предполагается, что вы кладёте в <code>SOURCES/</code> tarball, собранный через <code>git archive</code> с уже инициализированным подмодулем <code>src/coucal</code>. Если паковать через <code>%_sourcedir</code> прямо из git, понадобится отдельная обработка сабмодулей.</li><li><strong><code>Name: httrack-ssl</code></strong> — пакет имеет собственное имя, <code>apt-get</code> видит его как отдельный продукт.</li><li><strong><code>Conflicts: httrack</code></strong> — прямой запрет на одновременную установку со старым <code>httrack</code>. Файлы у них одинаковые (<code>/usr/bin/httrack</code>, <code>/usr/share/httrack/</code> и т. д.), поэтому конфликт неизбежен.</li><li><strong><code>Obsoletes: httrack &lt; %EVR</code></strong> — если в системе стоит <code>httrack</code> более старой версии, <code>apt-get</code> при установке <code>httrack-ssl</code> автоматически его удалит и поставит SSL-версию.</li><li><strong><code>Provides: httrack = %EVR</code></strong> — виртуально удовлетворяет зависимости других пакетов, которые требуют <code>httrack</code>. Это позволяет <code>httrack-ssl</code> выступать в роли полноценной замены.</li><li><strong><code>%name</code> остаётся <code>httrack</code></strong> для путей (<code>%_bindir/%name</code>, <code>%_datadir/%name</code> и т. д.), чтобы файлы легли в стандартные места <code>/usr/bin/httrack</code>, <code>/usr/share/httrack/</code>. Меняется только <code>Name</code> RPM-пакета. Благодаря <code>Conflicts</code> одновременно с оригиналом он не встанет.</li></ul><details class="details custom-block"><summary>НЕЙРОПОЛЯ</summary><div class="language-prm-spec vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">prm-spec</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>%def_enable shared</span></span>
<span class="line"><span>%def_disable static</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%define Name HTTrack</span></span>
<span class="line"><span>%define lname lib%name</span></span>
<span class="line"><span>%define origver 3.50.2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Name: httrack-ssl</span></span>
<span class="line"><span>Version: 3.50.2</span></span>
<span class="line"><span>Release: alt1</span></span>
<span class="line"><span>Epoch: 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Summary: An easy-to-use offline browser utility (SSL/TLS enabled)</span></span>
<span class="line"><span>License: %gpl2plus</span></span>
<span class="line"><span>Group: Networking/File transfer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Url: https://github.com/xroche/httrack</span></span>
<span class="line"><span>Source0: httrack-%version.tar.gz</span></span>
<span class="line"><span>Source1: %name.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Packager:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Conflicts: httrack</span></span>
<span class="line"><span>Obsoletes: httrack &lt; %EVR</span></span>
<span class="line"><span>Provides: httrack = %EVR</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%{?_enable_shared:Requires: %lname = %version-%release}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BuildRequires(pre): rpm-build-licenses</span></span>
<span class="line"><span>BuildRequires: gcc-c++ zlib-devel ImageMagick</span></span>
<span class="line"><span>BuildRequires: desktop-file-utils</span></span>
<span class="line"><span>BuildRequires: openssl-devel</span></span>
<span class="line"><span>BuildRequires: autoconf automake libtool autoconf-archive pkg-config</span></span>
<span class="line"><span>BuildRequires: git</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%set_automake_version 1.10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description</span></span>
<span class="line"><span>%Name is an easy-to-use offline browser utility. It allows you to</span></span>
<span class="line"><span>download a World Wide website from the Internet to a local directory,</span></span>
<span class="line"><span>building recursively all directories, getting html, images, and other</span></span>
<span class="line"><span>files from the server to your computer. %Name arranges the original</span></span>
<span class="line"><span>site&#39;s relative link-structure. Simply open a page of the &quot;mirrored&quot;</span></span>
<span class="line"><span>website in your browser, and you can browse the site from link to link,</span></span>
<span class="line"><span>as if you were viewing it online. %Name can also update an existing</span></span>
<span class="line"><span>mirrored site, and resume interrupted downloads. %Name is fully</span></span>
<span class="line"><span>configurable, and has an integrated help system.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>This build is compiled with OpenSSL support, enabling HTTPS mirroring.</span></span>
<span class="line"><span>It replaces the regular httrack package.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%if_enabled shared</span></span>
<span class="line"><span>%package -n %lname</span></span>
<span class="line"><span>Summary: Shared library for %Name</span></span>
<span class="line"><span>Group: System/Libraries</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description -n %lname</span></span>
<span class="line"><span>This package contains shared library for %Name.</span></span>
<span class="line"><span>%endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>%package -n %lname-devel</span></span>
<span class="line"><span>Summary: Development files for %Name</span></span>
<span class="line"><span>Group: Development/C</span></span>
<span class="line"><span>Requires: %lname%{?_disable_shared:-devel-static} = %EVR</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description -n %lname-devel</span></span>
<span class="line"><span>This package contains development files required for packaging</span></span>
<span class="line"><span>%Name-based software.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>%if_enabled static</span></span>
<span class="line"><span>%package -n %lname-devel-static</span></span>
<span class="line"><span>Summary: Static libraries for %Name</span></span>
<span class="line"><span>Group: Development/C</span></span>
<span class="line"><span>Requires: %lname-devel = %EVR</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description -n %lname-devel-static</span></span>
<span class="line"><span>This package contains development libraries required for packaging</span></span>
<span class="line"><span>statically linked %Name-based software.</span></span>
<span class="line"><span>%endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>%package -n web%name</span></span>
<span class="line"><span>Summary: Offline browser - %name and htsserver frontend</span></span>
<span class="line"><span>Group: Networking/File transfer</span></span>
<span class="line"><span>Requires: %name = %EVR</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description -n web%name</span></span>
<span class="line"><span>Offline browser: copy websites to a local directory.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>%prep</span></span>
<span class="line"><span># Источник формируется из git-репозитория с подмодулями:</span></span>
<span class="line"><span>#   git clone --recurse-submodules https://github.com/xroche/httrack.git</span></span>
<span class="line"><span>#   cd httrack</span></span>
<span class="line"><span>#   git archive --format=tar.gz --prefix=httrack-%version/ \\</span></span>
<span class="line"><span>#       -o ../httrack-%version.tar.gz HEAD</span></span>
<span class="line"><span># (при этом src/coucal должен быть уже инициализирован)</span></span>
<span class="line"><span>%setup -q -n httrack-%version</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>%build</span></span>
<span class="line"><span># В git-сборке configure генерируется на месте</span></span>
<span class="line"><span>./bootstrap</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Наличие openssl-devel в BuildRequires включает SSL-поддержку автоматически.</span></span>
<span class="line"><span>%configure \\</span></span>
<span class="line"><span>    %{subst_enable shared} \\</span></span>
<span class="line"><span>    %{subst_enable static}</span></span>
<span class="line"><span>%make_build</span></span>
<span class="line"><span></span></span>
<span class="line"><span>convert -depth 8 html/server/div/web%name.xpm web%{name}_48.png</span></span>
<span class="line"><span>for s in 32 24 16; do</span></span>
<span class="line"><span>    convert -resize \${s}x$s -depth 8 html/server/div/web%name.xpm web%{name}_$s.png</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>%install</span></span>
<span class="line"><span>%make_install DESTDIR=%buildroot install</span></span>
<span class="line"><span>mv %buildroot%_docdir/%name{,-%version}</span></span>
<span class="line"><span>install -m 0644 AUTHORS README %buildroot%_docdir/%name-%version/</span></span>
<span class="line"><span>install -D -m644 %SOURCE1 %buildroot/%_sysconfdir/%name.conf</span></span>
<span class="line"><span>for s in 48 32 24 16; do</span></span>
<span class="line"><span>    install -D -m 0644 {web%{name}_$s,%buildroot%_iconsdir/hicolor/\${s}x$s/apps/web%name}.png</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span>rm %buildroot%_libdir/%name/*.la</span></span>
<span class="line"><span>desktop-file-install --dir %buildroot%_desktopdir \\</span></span>
<span class="line"><span>    --add-category=FileTransfer \\</span></span>
<span class="line"><span>    %buildroot%_desktopdir/WebHTTrack.desktop</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files</span></span>
<span class="line"><span>%_docdir/%name-%version</span></span>
<span class="line"><span>%_bindir/%name</span></span>
<span class="line"><span>%_datadir/%name</span></span>
<span class="line"><span>%exclude %_datadir/%name/libtest</span></span>
<span class="line"><span>%exclude %_datadir/%name/icons</span></span>
<span class="line"><span>%_man1dir/%name.1*</span></span>
<span class="line"><span>%config(noreplace) %_sysconfdir/%name.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>%if_enabled shared</span></span>
<span class="line"><span>%files -n %lname</span></span>
<span class="line"><span>%_libdir/*.so.*</span></span>
<span class="line"><span>%_libdir/%name/*.so.*</span></span>
<span class="line"><span>%endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files -n %lname-devel</span></span>
<span class="line"><span>%_includedir/%name</span></span>
<span class="line"><span>%if_enabled shared</span></span>
<span class="line"><span>%_libdir/*.so</span></span>
<span class="line"><span>%_libdir/%name/*.so</span></span>
<span class="line"><span>%endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>%if_enabled static</span></span>
<span class="line"><span>%files -n %lname-devel-static</span></span>
<span class="line"><span>%_libdir/*.a</span></span>
<span class="line"><span>%_libdir/%name/*.a</span></span>
<span class="line"><span>%endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files -n web%name</span></span>
<span class="line"><span>%_bindir/*</span></span>
<span class="line"><span>%exclude %_bindir/%name</span></span>
<span class="line"><span>%_man1dir/*</span></span>
<span class="line"><span>%exclude %_man1dir/%name.1*</span></span>
<span class="line"><span>%_datadir/%name/icons</span></span>
<span class="line"><span>%_pixmapsdir/*</span></span>
<span class="line"><span>%_desktopdir/*</span></span>
<span class="line"><span>%_iconsdir/hicolor/*/apps/*</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>%changelog</span></span>
<span class="line"><span>* Tue Sep 15 2026 &lt;packager@example.com&gt; 1:3.50.2-alt1</span></span>
<span class="line"><span>- Rebuilt from upstream GitHub (xroche/httrack) at 3.50.2</span></span>
<span class="line"><span>- Enabled SSL/TLS support via openssl-devel</span></span>
<span class="line"><span>- Renamed package to httrack-ssl; Conflicts/Obsoletes/Provides httrack</span></span>
<span class="line"><span>- Added autoconf/automake/libtool/autoconf-archive/pkg-config to BuildRequires</span></span>
<span class="line"><span>- Dropped obsolete patch httrack-3.47.3-alt-makefile.patch</span></span></code></pre></div></details>`,33)]))}const c=i(p,[["render",e]]);export{F as __pageData,c as default};
