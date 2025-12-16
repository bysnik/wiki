import{_ as a,c as n,o as p,ag as e}from"./chunks/framework.D4Vqf8I7.js";const m=JSON.parse('{"title":"RPMBUILD","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"docs/wi/rpmbuild.md","filePath":"docs/wi/rpmbuild.md","lastUpdated":1765883695000}'),l={name:"docs/wi/rpmbuild.md"};function i(t,s,c,r,o,d){return p(),n("div",null,s[0]||(s[0]=[e(`<h1 id="rpmbuild" tabindex="-1">RPMBUILD <a class="header-anchor" href="#rpmbuild" aria-label="Permalink to &quot;RPMBUILD&quot;">​</a></h1><h2 id="подготовка-rpm-окружения" tabindex="-1">Подготовка RPM-окружения <a class="header-anchor" href="#подготовка-rpm-окружения" aria-label="Permalink to &quot;Подготовка RPM-окружения&quot;">​</a></h2><p>Установите необходимые пакеты:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rpmdevtools</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rpm-build</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gcc-c++</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git-core</span></span></code></pre></div><p>Создайте дерево сборки:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rpmdev-setuptree</span></span></code></pre></div><p>Проверьте, присутствует ли в системе директория RPM, введя команду:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ls</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ∼/</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">Если директория не присутствует в системе, то введите:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mv</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ∼/rpmbuild</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ∼/RPM</span></span></code></pre></div></div><p>Откройте файл <code>∼/.rpmmacros</code>:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nano</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.rpmmacros</span></span></code></pre></div><p>Если в файле есть другие строки, то удалите их. При заполнении файла применяйте только латинские символы. Содержимое файла должно иметь вид:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>%_topdir %homedir/RPM</span></span>
<span class="line"><span>%packager Your_name Your_lastname &lt;name@mail.domain&gt;</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">Дополнение</p><p>Для того, чтобы можно было подписывать пакеты, я добавляю следующие строки в файл <code>∼/.rpmmacros</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>%__gpg /usr/bin/gpg</span></span>
<span class="line"><span>%__gpg_sign_cmd %{__gpg} --batch --no-verbose --no-armor --no-secmem-warning -u &quot;%{_gpg_name}&quot; -sbo %{__signature_filename} %{__plaintext_filename}</span></span></code></pre></div></div><h2 id="сборка-пакета-с-простыми-фаилами" tabindex="-1">Сборка пакета с простыми файлами <a class="header-anchor" href="#сборка-пакета-с-простыми-фаилами" aria-label="Permalink to &quot;Сборка пакета с простыми файлами&quot;">​</a></h2><p>Пример простого RPM-пакета для <strong>ALT Linux</strong>, который устанавливает <strong>обои рабочего стола</strong> и может использоваться как <strong>branding-пакет</strong> (например, <code>mycompany-wallpapers</code>).</p><h3 id="пример-структуры-архива" tabindex="-1">Пример структуры архива <a class="header-anchor" href="#пример-структуры-архива" aria-label="Permalink to &quot;Пример структуры архива&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mycompany-wallpapers-1.0/</span></span>
<span class="line"><span>├── README</span></span>
<span class="line"><span>├── wallpaper1.jpg</span></span>
<span class="line"><span>├── wallpaper2.png</span></span>
<span class="line"><span>└── themes/</span></span>
<span class="line"><span>    ├── dark.jpg</span></span>
<span class="line"><span>    └── light.jpg</span></span></code></pre></div><h3 id="mycompany-wallpapers-spec" tabindex="-1"><code>mycompany-wallpapers.spec</code> <a class="header-anchor" href="#mycompany-wallpapers-spec" aria-label="Permalink to &quot;\`mycompany-wallpapers.spec\`&quot;">​</a></h3><div class="language-spec vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">spec</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>%define wallpaper_dir /usr/share/backgrounds/mycompany</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Name:           mycompany-wallpapers</span></span>
<span class="line"><span>Version:        1.0</span></span>
<span class="line"><span>Release:        alt1</span></span>
<span class="line"><span>Summary:        MyCompany Branding Wallpapers</span></span>
<span class="line"><span>Group:          User Interface/Desktops</span></span>
<span class="line"><span>License:        Proprietary</span></span>
<span class="line"><span>Url:            https://mycompany.example.com/</span></span>
<span class="line"><span>BuildArch:      noarch</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Source0:        %{name}-%{version}.tar.gz</span></span>
<span class="line"><span>BuildRequires:  rpm-build</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description</span></span>
<span class="line"><span>Official wallpapers for MyCompany desktop branding.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%prep</span></span>
<span class="line"><span>%setup -q</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%install</span></span>
<span class="line"><span># Создаём корневой каталог для обоев</span></span>
<span class="line"><span>install -d -m 0755 %{buildroot}%{wallpaper_dir}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Копируем всё содержимое (включая подкаталоги) в целевой каталог</span></span>
<span class="line"><span>cp -r ./* %{buildroot}%{wallpaper_dir}/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Убеждаемся, что права корректны</span></span>
<span class="line"><span>chmod -R u+rwX,go+rX,go-w %{buildroot}%{wallpaper_dir}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files</span></span>
<span class="line"><span>%doc %{wallpaper_dir}/README</span></span>
<span class="line"><span>%{wallpaper_dir}/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%changelog</span></span>
<span class="line"><span>* Wed Oct 15 2025 Nikita Bystrov &lt;bystrovno@basealt.ru&gt; 1.0-alt1</span></span>
<span class="line"><span>- Initial wallpaper package with archive-based source</span></span></code></pre></div><h3 id="сборка-пакета" tabindex="-1">Сборка пакета <a class="header-anchor" href="#сборка-пакета" aria-label="Permalink to &quot;Сборка пакета&quot;">​</a></h3><p>Скопируйте spec и источники</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mycompany-wallpapers.spec</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/RPM/SPECS/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mycompany-wallpapers-1.0.tar.gz</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/RPM/SOURCES/</span></span></code></pre></div><p>Соберите пакет</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rpmbuild</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -ba</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/RPM/SPECS/mycompany-wallpapers.spec</span></span></code></pre></div><p>Готовый RPM будет в <code>~/RPM/RPMS/noarch/</code>.</p><h3 id="как-использовать-обои" tabindex="-1">Как использовать обои <a class="header-anchor" href="#как-использовать-обои" aria-label="Permalink to &quot;Как использовать обои&quot;">​</a></h3><p>После установки:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./mycompany-wallpapers-1.0-alt1.noarch.rpm</span></span></code></pre></div><p>Файлы окажутся в:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/usr/share/backgrounds/</span></span></code></pre></div><p>Пользователи (или системный администратор) могут указать его как обои через настройки рабочего стола (в GNOME, KDE, XFCE и т.д.) или, например, через Групповые Политики.</p><h2 id="метапакеты" tabindex="-1">Метапакеты <a class="header-anchor" href="#метапакеты" aria-label="Permalink to &quot;Метапакеты&quot;">​</a></h2><p>source: &quot;<a href="https://www.altlinux.org/%D0%9C%D0%B5%D1%82%D0%B0%D0%BF%D0%B0%D0%BA%D0%B5%D1%82%D1%8B_start" target="_blank" rel="noreferrer">https://www.altlinux.org/Метапакеты_start</a>&quot;</p><p>Метапакеты в Linux — это пустые пакеты, которые только описывают зависимости. Они облегчают установку совместной группы программ, предварительно выбранных сопровождающим метапакета.</p><p>По сути пакет представляет собой один rpm-spec, без gear/rules и файлов с исходниками, в котором описан главный пакет (но не всегда) и подпакеты в которых указаны зависимости. Подпакеты могут входить в главный пакет.</p><p>При установке такого пакета в систему не добавляются никакие файлы, но из зависимостей пакета ставятся программы.</p><p>Если удалить мета-пакет из системы, удалится только он сам, оставив все установленные из зависимостей пакеты в системе.</p><p>В данной статье будет описано создание такого пакета в ALT Linux.</p><h3 id="примеры-пакетов-в-alt-linux" tabindex="-1">Примеры пакетов в ALT Linux <a class="header-anchor" href="#примеры-пакетов-в-alt-linux" aria-label="Permalink to &quot;Примеры пакетов в ALT Linux&quot;">​</a></h3><h4 id="mate" tabindex="-1">Mate <a class="header-anchor" href="#mate" aria-label="Permalink to &quot;Mate&quot;">​</a></h4><p><a href="https://git.altlinux.org/srpms/m/mate.git" target="_blank" rel="noreferrer">https://git.altlinux.org/srpms/m/mate.git</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mate</span></span>
<span class="line"><span>├── .git</span></span>
<span class="line"><span>└── mate.spec</span></span></code></pre></div><p>Спек:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Name: mate</span></span>
<span class="line"><span>Version: 1.26.0</span></span>
<span class="line"><span>Release: alt3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Summary: MATE Desktop installers</span></span>
<span class="line"><span>License: %gpl2plus</span></span>
<span class="line"><span>Group: Graphical desktop/MATE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BuildArch: noarch</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BuildPreReq: rpm-build-licenses</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description</span></span>
<span class="line"><span>A set of virtual packages for MATE Desktop installation.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%package minimal</span></span>
<span class="line"><span>Summary: MATE Desktop minimal installer</span></span>
<span class="line"><span>Group: Graphical desktop/MATE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requires: mate-desktop mate-session mate-panel mate-menus mate-window-manager mate-settings-daemon</span></span>
<span class="line"><span>Requires: mate-polkit mate-control-center mate-media mate-screensaver mate-power-manager mate-notification-daemon</span></span>
<span class="line"><span>Requires: mate-system-monitor mate-file-manager mate-file-archiver mate-terminal mate-text-editor</span></span>
<span class="line"><span>Requires: mate-themes mate-icon-theme mate-backgrounds mate-user-guide</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description minimal</span></span>
<span class="line"><span>This virtual package installs MATE Desktop with minimum components.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%package default</span></span>
<span class="line"><span>Summary: MATE Desktop installer for optimal user&#39;s requirements</span></span>
<span class="line"><span>Group: Graphical desktop/MATE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requires: mate-minimal</span></span>
<span class="line"><span>Requires: mate-calc mate-disk-usage-analyzer</span></span>
<span class="line"><span>Requires: mate-document-viewer mate-document-viewer-caja mate-document-viewer-thumbnailer</span></span>
<span class="line"><span>Requires: mate-file-manager-extensions mate-file-manager-archiver</span></span>
<span class="line"><span>Requires: mate-image-viewer mate-menu-editor mate-screenshot mate-search-tool mate-sensors-applet</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description default</span></span>
<span class="line"><span>This virtual package installs MATE Desktop for an average user&#39;s</span></span>
<span class="line"><span>requirements.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%package maxi</span></span>
<span class="line"><span>Summary: MATE Desktop full installer</span></span>
<span class="line"><span>Group: Graphical desktop/MATE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requires: mate-default</span></span>
<span class="line"><span>Requires: mate-disk-image-mounter</span></span>
<span class="line"><span>Requires: mate-document-viewer-djvu mate-document-viewer-dvi mate-document-viewer-pixbuf mate-document-viewer-xps</span></span>
<span class="line"><span>Requires: mate-file-manager-image-converter mate-file-manager-open-terminal</span></span>
<span class="line"><span>Requires: mate-file-manager-sendto mate-file-manager-share mate-file-manager-wallpaper mate-system-log</span></span>
<span class="line"><span>Requires: python3-module-caja</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description maxi</span></span>
<span class="line"><span>This virtual package installs full MATE Desktop.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files minimal</span></span>
<span class="line"><span>%files default</span></span>
<span class="line"><span>%files maxi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%changelog</span></span>
<span class="line"><span>* Wed May 14 2025 Anton Midyukov &lt;antohami@altlinux.org&gt; 1.26.0-alt3</span></span>
<span class="line"><span>- removed mate-file-manager-beesu</span></span></code></pre></div><h5 id="информация" tabindex="-1">Информация <a class="header-anchor" href="#информация" aria-label="Permalink to &quot;Информация&quot;">​</a></h5><p>Основные данные:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Name: mate</span></span>
<span class="line"><span>Version: 1.26.0</span></span>
<span class="line"><span>Release: alt3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Summary: MATE Desktop installers</span></span>
<span class="line"><span>License: %gpl2plus</span></span>
<span class="line"><span>Group: Graphical desktop/MATE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BuildArch: noarch</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description</span></span>
<span class="line"><span>A set of virtual packages for MATE Desktop installation.</span></span></code></pre></div><p>Пакет minimal:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>%package minimal</span></span>
<span class="line"><span>Summary: MATE Desktop minimal installer</span></span>
<span class="line"><span>Group: Graphical desktop/MATE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requires: mate-desktop mate-session mate-panel mate-menus mate-window-manager mate-settings-daemon</span></span>
<span class="line"><span>Requires: mate-polkit mate-control-center mate-media mate-screensaver mate-power-manager mate-notification-daemon</span></span>
<span class="line"><span>Requires: mate-system-monitor mate-file-manager mate-file-archiver mate-terminal mate-text-editor</span></span>
<span class="line"><span>Requires: mate-themes mate-icon-theme mate-backgrounds mate-user-guide</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description minimal</span></span>
<span class="line"><span>This virtual package installs MATE Desktop with minimum components.</span></span></code></pre></div><p>Пакет default:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>%package default</span></span>
<span class="line"><span>Summary: MATE Desktop installer for optimal user&#39;s requirements</span></span>
<span class="line"><span>Group: Graphical desktop/MATE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requires: mate-minimal</span></span>
<span class="line"><span>Requires: mate-calc mate-disk-usage-analyzer</span></span>
<span class="line"><span>Requires: mate-document-viewer mate-document-viewer-caja mate-document-viewer-thumbnailer</span></span>
<span class="line"><span>Requires: mate-file-manager-extensions mate-file-manager-archiver</span></span>
<span class="line"><span>Requires: mate-image-viewer mate-menu-editor mate-screenshot mate-search-tool mate-sensors-applet</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description default</span></span>
<span class="line"><span>This virtual package installs MATE Desktop for an average user&#39;s equirements.</span></span></code></pre></div><p>Пакет maxi:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>%package maxi</span></span>
<span class="line"><span>Summary: MATE Desktop full installer</span></span>
<span class="line"><span>Group: Graphical desktop/MATE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requires: mate-default</span></span>
<span class="line"><span>Requires: mate-disk-image-mounter</span></span>
<span class="line"><span>Requires: mate-document-viewer-djvu mate-document-viewer-dvi mate-document-viewer-pixbuf mate-document-viewer-xps</span></span>
<span class="line"><span>Requires: mate-file-manager-image-converter mate-file-manager-open-terminal</span></span>
<span class="line"><span>Requires: mate-file-manager-sendto mate-file-manager-share mate-file-manager-wallpaper mate-system-log</span></span>
<span class="line"><span>Requires: python3-module-caja</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description maxi</span></span>
<span class="line"><span>This virtual package installs full MATE Desktop.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files minimal</span></span>
<span class="line"><span>%files default</span></span>
<span class="line"><span>%files maxi</span></span></code></pre></div><h5 id="конечные-фаилы" tabindex="-1">Конечные файлы <a class="header-anchor" href="#конечные-фаилы" aria-label="Permalink to &quot;Конечные файлы&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>%files minimal</span></span>
<span class="line"><span>%files default</span></span>
<span class="line"><span>%files maxi</span></span></code></pre></div><h5 id="пакеты" tabindex="-1">Пакеты <a class="header-anchor" href="#пакеты" aria-label="Permalink to &quot;Пакеты&quot;">​</a></h5><p>В результате получатся следующие пакеты:</p><ul><li>mate-minimal</li><li>mate-default</li><li>mate-maxi</li></ul><h3 id="попробуем-создать-метапакет-с-любимыми-программами" tabindex="-1">Попробуем создать метапакет с любимыми программами <a class="header-anchor" href="#попробуем-создать-метапакет-с-любимыми-программами" aria-label="Permalink to &quot;Попробуем создать метапакет с любимыми программами&quot;">​</a></h3><p>Создаем каталог:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ mkdir mymeta</span></span></code></pre></div><p>Инициализируем git:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mymeta$ git init .</span></span></code></pre></div><p><strong>Примечание:</strong> Gear/rules не нужен!!!</p><p>Пишем спек mymeta.spec:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Name: petr-apps</span></span>
<span class="line"><span>Version: 1.0</span></span>
<span class="line"><span>Release: alt1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Summary: Apps for Petr Akhlamov</span></span>
<span class="line"><span>License: none</span></span>
<span class="line"><span>Group: none</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BuildArch: noarch</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description</span></span>
<span class="line"><span>A set of virtual packages for install apps for Petr Akhlamov.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%package graphics</span></span>
<span class="line"><span>Summary: Graphics apps</span></span>
<span class="line"><span>License: none</span></span>
<span class="line"><span>Group: Graphics</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requires: gimp darktable rawtherapee converseen shutter inkscape</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description graphics</span></span>
<span class="line"><span>This virtual package installs graphics apps for Petr Akhlamov</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%package office</span></span>
<span class="line"><span>Summary: Office apps</span></span>
<span class="line"><span>License: none</span></span>
<span class="line"><span>Group: Office</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requires: LibreOffice-still LibreOffice-still-langpack-ru LibreOffice-still-gtk3 LibreOffice-still-qt6 kde5-korganizer kde5-profile foliate qpdfview mytetra scantailor ocrmypdf pdfarranger pdfshuffler pdfmixtool</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description office</span></span>
<span class="line"><span>This virtual package installs office apps for Petr Akhlamov</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%package multimedia</span></span>
<span class="line"><span>Summary: Multimedia apps</span></span>
<span class="line"><span>License: none</span></span>
<span class="line"><span>Group: Multimedia</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requires: clementine qmmp vlc-maxi mpc-qt audacity shotcut mkvtoolnix-gui cheese obs-studio isomaster</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description multimedia</span></span>
<span class="line"><span>This virtual package installs multimedia apps for Petr Akhlamov</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%package network</span></span>
<span class="line"><span>Summary: Network apps</span></span>
<span class="line"><span>License: none</span></span>
<span class="line"><span>Group: Network</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requires: firefox thunderbird yt-dlp qbittorrent telegram-desktop</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description network</span></span>
<span class="line"><span>This virtual package installs network apps for Petr Akhlamov</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%package education</span></span>
<span class="line"><span>Summary: Education apps</span></span>
<span class="line"><span>License: none</span></span>
<span class="line"><span>Group: Education</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requires: stellarium</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description education</span></span>
<span class="line"><span>This virtual package installs education apps for Petr Akhlamov</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%package system</span></span>
<span class="line"><span>Summary: System apps</span></span>
<span class="line"><span>License: none</span></span>
<span class="line"><span>Group: System</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requires: qdirstat bleachbit grub-customizer hardinfo cpu-x doublecmd-qt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description system</span></span>
<span class="line"><span>This virtual package installs system apps for Petr Akhlamov</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%package full</span></span>
<span class="line"><span>Summary: All apps</span></span>
<span class="line"><span>License: none</span></span>
<span class="line"><span>Group: none</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requires: petr-apps-graphics</span></span>
<span class="line"><span>Requires: petr-apps-office</span></span>
<span class="line"><span>Requires: petr-apps-multimedia</span></span>
<span class="line"><span>Requires: petr-apps-network</span></span>
<span class="line"><span>Requires: petr-apps-education</span></span>
<span class="line"><span>Requires: petr-apps-system</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description full</span></span>
<span class="line"><span>This virtual package installs all apps for Petr Akhlamov</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files graphics</span></span>
<span class="line"><span>%files office</span></span>
<span class="line"><span>%files multimedia</span></span>
<span class="line"><span>%files network</span></span>
<span class="line"><span>%files education</span></span>
<span class="line"><span>%files system</span></span>
<span class="line"><span>%files full</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%changelog</span></span>
<span class="line"><span>* Thu Jul 17 2025 Petr Akhlamov &lt;ahlamovpm@basealt.ru&gt; 1.0-alt1</span></span>
<span class="line"><span>- initial build</span></span></code></pre></div><p>Добавляем информацию в репозиторий и собираем пакет:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ git add .</span></span>
<span class="line"><span>$ git commit -am &quot;add apps&quot;</span></span>
<span class="line"><span>$ gear --hasher -- hsh --no-sisyphus-check -v</span></span></code></pre></div><p>Содержимое репозитория:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>my_packages</span></span>
<span class="line"><span>├── .git</span></span>
<span class="line"><span>└── mymeta.spec</span></span></code></pre></div><h5 id="конечные-фаилы-1" tabindex="-1">Конечные файлы <a class="header-anchor" href="#конечные-фаилы-1" aria-label="Permalink to &quot;Конечные файлы&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>%files graphics</span></span>
<span class="line"><span>%files office</span></span>
<span class="line"><span>%files multimedia</span></span>
<span class="line"><span>%files network</span></span>
<span class="line"><span>%files education</span></span>
<span class="line"><span>%files system</span></span>
<span class="line"><span>%files full</span></span></code></pre></div><h5 id="пакеты-1" tabindex="-1">Пакеты <a class="header-anchor" href="#пакеты-1" aria-label="Permalink to &quot;Пакеты&quot;">​</a></h5><p>В результате получатся следующие пакеты:</p><ul><li>petr-apps-graphics</li><li>petr-apps-office</li><li>petr-apps-multimedia</li><li>petr-apps-network</li><li>petr-apps-education</li><li>petr-apps-system</li><li>petr-apps-full</li></ul><h2 id="ярлычки-программ" tabindex="-1">Ярлычки программ <a class="header-anchor" href="#ярлычки-программ" aria-label="Permalink to &quot;Ярлычки программ&quot;">​</a></h2><p>source: &quot;<a href="https://www.altlinux.org/%D0%AF%D1%80%D0%BB%D1%8B%D1%87%D0%BA%D0%B8_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC" target="_blank" rel="noreferrer">https://www.altlinux.org/Ярлычки_программ</a>&quot;</p><p>Ярлыки приложений, или файлы.desktop, представляют из себя конфигурационный файл, в котором прописаны параметры.</p><h3 id="пример-фаила" tabindex="-1">Пример файла <a class="header-anchor" href="#пример-фаила" aria-label="Permalink to &quot;Пример файла&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[Desktop Entry]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Тип ярлыка</span></span>
<span class="line"><span>Type=Application</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Версия спецификации ярлыков приложений, которой соответствует этот файл</span></span>
<span class="line"><span>Version=1.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Название приложения</span></span>
<span class="line"><span>Name=jDownloader</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Комментарий, который может/будет использоваться в качестве подсказки</span></span>
<span class="line"><span>Comment=Программа для скачивания видео</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Путь к папке, в которой выполняется исполняемый файл</span></span>
<span class="line"><span>Path=/home/petr/apps/jd2/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Исполняемый файл приложения, возможно с аргументами.</span></span>
<span class="line"><span>Exec=/home/petr/apps/jd2/JDownloader2</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Имя значка, который будет использоваться для отображения этого ярлыка</span></span>
<span class="line"><span>Icon=/home/petr/apps/jd2/themes/standard/org/jdownloader/images/updaterIcon100.png</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Описывает, должно ли это приложение запускаться в терминале или нет</span></span>
<span class="line"><span>Terminal=false</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Описывает категории, в которых должен отображаться этот ярлык</span></span>
<span class="line"><span>Categories=Network;</span></span></code></pre></div><h4 id="категории" tabindex="-1">Категории <a class="header-anchor" href="#категории" aria-label="Permalink to &quot;Категории&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Категория</th><th>Описание</th></tr></thead><tbody><tr><td>AudioVideo</td><td>Приложение для воспроизведения, создания или обработки мультимедиа (аудио/видео)</td></tr><tr><td>Audio</td><td>Аудиоприложения</td></tr><tr><td>Video</td><td>Видеоприложения</td></tr><tr><td>Development</td><td>Приложения для разработки</td></tr><tr><td>Education</td><td>Образовательное ПО</td></tr><tr><td>Game</td><td>Игры</td></tr><tr><td>Graphics</td><td>Приложение для просмотра, создания или обработки графики</td></tr><tr><td>Network</td><td>Сетевые приложения</td></tr><tr><td>Office</td><td>Офисные приложения</td></tr><tr><td>Science</td><td>Научные приложения</td></tr><tr><td>Settings</td><td>Приложения настройки</td></tr><tr><td>System</td><td>Системные приложения</td></tr><tr><td>Utility</td><td>Полезности, &quot;аксессуары&quot;</td></tr></tbody></table><ul><li><a href="https://specifications.freedesktop.org/menu-spec/latest/apa.html" target="_blank" rel="noreferrer">Источник</a></li></ul><h4 id="пример-ярлычка-wine" tabindex="-1">Пример ярлычка Wine <a class="header-anchor" href="#пример-ярлычка-wine" aria-label="Permalink to &quot;Пример ярлычка Wine&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[Desktop Entry]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Имя</span></span>
<span class="line"><span>Name=VLC media player</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Префикс, команда wine, путь до ярлыка или до .exe</span></span>
<span class="line"><span>Exec=env WINEPREFIX=&quot;/home/petr/.wine&quot; wine C:\\\\\\\\ProgramData\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\Start\\\\ Menu\\\\\\\\Programs\\\\\\\\VideoLAN\\\\\\\\VLC\\\\ media\\\\ player.lnk</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Или</span></span>
<span class="line"><span># Exec=env WINEPREFIX=&quot;/home/petr/.wine&quot; wine &#39;/home/petr/.wine/drive_c/Program Files/VideoLAN/VLC/vlc.exe&#39;</span></span>
<span class="line"><span># Или</span></span>
<span class="line"><span># wine &#39;/home/petr/.wine/drive_c/Program Files/VideoLAN/VLC/vlc.exe&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Тип ярлыка</span></span>
<span class="line"><span>Type=Application</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Уведомление при запуске</span></span>
<span class="line"><span>StartupNotify=true</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Путь к папке, в которой выполняется исполняемый файл</span></span>
<span class="line"><span>Path=/home/petr/.wine/dosdevices/c:/Program Files/VideoLAN/VLC</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#Значок</span></span>
<span class="line"><span>Icon=8127_vlc.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#свойство для связи окна с приложением-владельцем</span></span>
<span class="line"><span>StartupWMClass=vlc.exe</span></span></code></pre></div><h4 id="пример-веб-ярлычка" tabindex="-1">Пример Веб-ярлычка <a class="header-anchor" href="#пример-веб-ярлычка" aria-label="Permalink to &quot;Пример Веб-ярлычка&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[Desktop Entry]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Имя</span></span>
<span class="line"><span>Name=Альт-вики</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Команда для открытия сайта в браузере</span></span>
<span class="line"><span>URL=http://www.altlinux.org</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Тип ярлыка</span></span>
<span class="line"><span>Type=Link</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#Значок</span></span>
<span class="line"><span>Icon=user-bookmarks</span></span></code></pre></div><h3 id="где-хранятся-фаилы" tabindex="-1">Где хранятся файлы? <a class="header-anchor" href="#где-хранятся-фаилы" aria-label="Permalink to &quot;Где хранятся файлы?&quot;">​</a></h3><p>Эти файлы хранятся в каталоге</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/usr/share/applications/</span></span></code></pre></div><p>для приложений, установленных в системе или</p><ul><li>в</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/.local/share/applications/</span></span></code></pre></div><p>для пользовательских программ.</p><p>Пользовательские ярлыки имеют приоритет над системными.</p><h4 id="wine" tabindex="-1">Wine <a class="header-anchor" href="#wine" aria-label="Permalink to &quot;Wine&quot;">​</a></h4><p>Ярлыки Wine хранятся в</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/home/%user%/.local/share/applications/wine/Programs</span></span></code></pre></div><p>Если после Wine в меню много ненужных ярлыков перейдите в указанную папку и удалите ненужный ярлык — после этого он пропадет в меню.</p><h5 id="как-поместить-ярлык-вместо-прочего-в-категорию-wine" tabindex="-1">Как поместить ярлык вместо &quot;Прочего&quot; в категорию &quot;Wine&quot; <a class="header-anchor" href="#как-поместить-ярлык-вместо-прочего-в-категорию-wine" aria-label="Permalink to &quot;Как поместить ярлык вместо &quot;Прочего&quot; в категорию &quot;Wine&quot;&quot;">​</a></h5><p>При создании ярлычка с Wine ярлычок попадает в категорию &quot;Прочее&quot;, даже если Вы укажете категорию &quot;Wine&quot;. Чтобы добавить ярлычок в вышеуказанную категорию, нужно проделать следующее.</p><p>Предположим, у Вас desktop-файл с Wine программой лежит в следующем каталоге:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/home/%user%/.local/share/applications/wine/Programs/dmaster2/Download Master.desktop</span></span></code></pre></div><p>Для него нужно создать файл меню.</p><p>Для этого идем в следующий каталог:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/home/%user%/.config/menus/applications-merged</span></span></code></pre></div><p>И создаем файл с произвольным именем с расширением *.menu. (Хотя обычно, автоматически, присваивается имя типа <strong>wine-Programs-Download Master-Download Master.menu</strong>)</p><p>Файл.menu представляет из себя следующий файл:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!DOCTYPE Menu PUBLIC &quot;-//freedesktop//DTD Menu 1.0//EN&quot;</span></span>
<span class="line"><span>&quot;http://www.freedesktop.org/standards/menu-spec/menu-1.0.dtd&quot;&gt;</span></span>
<span class="line"><span>&lt;Menu&gt;</span></span>
<span class="line"><span>  &lt;Name&gt;Applications&lt;/Name&gt;</span></span>
<span class="line"><span>  &lt;Menu&gt;</span></span>
<span class="line"><span>    &lt;Name&gt;wine-wine&lt;/Name&gt;</span></span>
<span class="line"><span>    &lt;Directory&gt;wine-wine.directory&lt;/Directory&gt;</span></span>
<span class="line"><span>      &lt;Menu&gt;</span></span>
<span class="line"><span>         &lt;Name&gt;wine-Programs&lt;/Name&gt;</span></span>
<span class="line"><span>         &lt;Directory&gt;wine-Programs.directory&lt;/Directory&gt;</span></span>
<span class="line"><span>           &lt;Menu&gt;</span></span>
<span class="line"><span>             &lt;Name&gt;wine-Programs-dmaster2&lt;/Name&gt;</span></span>
<span class="line"><span>             &lt;Directory&gt;wine-Programs-dmaster2.directory&lt;/Directory&gt;</span></span>
<span class="line"><span>               &lt;Include&gt;</span></span>
<span class="line"><span>                 &lt;Filename&gt;wine-Programs-dmaster2-Download Master.desktop&lt;/Filename&gt;</span></span>
<span class="line"><span>               &lt;/Include&gt;</span></span>
<span class="line"><span>           &lt;/Menu&gt;</span></span>
<span class="line"><span>      &lt;/Menu&gt;</span></span>
<span class="line"><span>  &lt;/Menu&gt;</span></span>
<span class="line"><span>&lt;/Menu&gt;</span></span></code></pre></div><p>В этом файле древообразно прописывается структура каталогов меню Wine и указывается ярлык запуска. После сохранения файла в меню ярлычок для Wine должен появиться в соответствующем разделе.</p>`,111)]))}const u=a(l,[["render",i]]);export{m as __pageData,u as default};
