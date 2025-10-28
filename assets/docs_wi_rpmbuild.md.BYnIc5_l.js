import{_ as a,c as n,o as p,ag as e}from"./chunks/framework.D4Vqf8I7.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/rpmbuild.md","filePath":"docs/wi/rpmbuild.md","lastUpdated":1761644065000}'),i={name:"docs/wi/rpmbuild.md"};function l(t,s,c,r,o,d){return p(),n("div",null,s[0]||(s[0]=[e(`<p>Пример простого RPM-пакета для <strong>ALT Linux</strong>, который устанавливает <strong>обои рабочего стола</strong> и может использоваться как <strong>branding-пакет</strong> (например, <code>mycompany-wallpapers</code>).</p><h2 id="пример-структуры-архива" tabindex="-1">Пример структуры архива <a class="header-anchor" href="#пример-структуры-архива" aria-label="Permalink to &quot;Пример структуры архива&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mycompany-wallpapers-1.0/</span></span>
<span class="line"><span>├── README</span></span>
<span class="line"><span>├── wallpaper1.jpg</span></span>
<span class="line"><span>├── wallpaper2.png</span></span>
<span class="line"><span>└── themes/</span></span>
<span class="line"><span>    ├── dark.jpg</span></span>
<span class="line"><span>    └── light.jpg</span></span></code></pre></div><h2 id="mycompany-wallpapers-spec" tabindex="-1"><code>mycompany-wallpapers.spec</code> <a class="header-anchor" href="#mycompany-wallpapers-spec" aria-label="Permalink to &quot;\`mycompany-wallpapers.spec\`&quot;">​</a></h2><div class="language-spec vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">spec</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>%define wallpaper_dir /usr/share/backgrounds/mycompany</span></span>
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
<span class="line"><span>- Initial wallpaper package with archive-based source</span></span></code></pre></div><h2 id="сборка-пакета-в-alt-linux" tabindex="-1">Сборка пакета в ALT Linux <a class="header-anchor" href="#сборка-пакета-в-alt-linux" aria-label="Permalink to &quot;Сборка пакета в ALT Linux&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rpm-build</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rpmdev-setuptree</span></span></code></pre></div><p>Скопируйте spec и источники</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mycompany-wallpapers.spec</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/RPM/SPECS/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mycompany-wallpapers-1.0.tar.gz</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/RPM/SOURCES/</span></span></code></pre></div><p>Соберите пакет</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rpmbuild</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -ba</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/RPM/SPECS/mycompany-wallpapers.spec</span></span></code></pre></div><p>Готовый RPM будет в <code>~/RPM/RPMS/noarch/</code>.</p><h3 id="как-использовать-обои" tabindex="-1">Как использовать обои <a class="header-anchor" href="#как-использовать-обои" aria-label="Permalink to &quot;Как использовать обои&quot;">​</a></h3><p>После установки:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./mycompany-wallpapers-1.0-alt1.noarch.rpm</span></span></code></pre></div><p>Файлы окажутся в:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/usr/share/backgrounds/</span></span></code></pre></div><p>Пользователи (или системный администратор) могут указать его как обои через настройки рабочего стола (в GNOME, KDE, XFCE и т.д.) или, например, через Групповые Политики.</p>`,19)]))}const k=a(i,[["render",l]]);export{g as __pageData,k as default};
