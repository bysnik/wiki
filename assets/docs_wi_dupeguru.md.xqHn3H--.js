import{_ as a,c as n,o as p,ag as i}from"./chunks/framework.D4Vqf8I7.js";const c=JSON.parse('{"title":"DupeGuru","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/dupeguru.md","filePath":"docs/wi/dupeguru.md","lastUpdated":1761123703000}'),e={name:"docs/wi/dupeguru.md"};function l(t,s,h,d,o,u){return p(),n("div",null,s[0]||(s[0]=[i(`<h1 id="dupeguru" tabindex="-1">DupeGuru <a class="header-anchor" href="#dupeguru" aria-label="Permalink to &quot;DupeGuru&quot;">​</a></h1><h2 id="сборка-rpm-пакета" tabindex="-1">Сборка rpm-пакета <a class="header-anchor" href="#сборка-rpm-пакета" aria-label="Permalink to &quot;Сборка rpm-пакета&quot;">​</a></h2><p>Установка сборочных зависимостей:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-setuptools</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-PyQt5-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-distro</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-mutagen</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-polib</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-semantic_version</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-xxhash</span></span></code></pre></div><h3 id="скачивание-исходников" tabindex="-1">Скачивание исходников: <a class="header-anchor" href="#скачивание-исходников" aria-label="Permalink to &quot;Скачивание исходников:&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/arsenetar/dupeguru/archive/refs/tags/4.3.1.tar.gz</span></span></code></pre></div><h3 id="копируем-архив-в-сборочницу" tabindex="-1">Копируем архив в сборочницу: <a class="header-anchor" href="#копируем-архив-в-сборочницу" aria-label="Permalink to &quot;Копируем архив в сборочницу:&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./dupeguru-4.3.1.tar.gz</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/RPM/SOURCE/dupeguru-4.3.1.tar.gz</span></span></code></pre></div><h3 id="создаем-патч" tabindex="-1">Создаём патч: <a class="header-anchor" href="#создаем-патч" aria-label="Permalink to &quot;Создаём патч:&quot;">​</a></h3><ol><li>Разархивируем архив:</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -xzf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dupeguru-4.3.1.tar.gz</span></span></code></pre></div><ol start="2"><li>Делаем копию:</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dupeguru-4.3.1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dupeguru-4.3.1-modified</span></span></code></pre></div><ol start="3"><li>Редактируем файл <code>dupeguru-4.3.1-modified/build.py</code>:</li></ol><p>Замените:</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> setuptools </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sandbox</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sandbox.run_setup(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>на:</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> subprocess</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sys</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">subprocess.check_call([sys.executable, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;setup.py&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;build_ext&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;--inplace&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span></code></pre></div><p>Убедитесь, что вы заменили <strong>все</strong> вызовы <code>sandbox.run_setup</code>.</p><ol start="4"><li>Создайте патч:</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">diff</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Naur</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dupeguru-4.3.1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dupeguru-4.3.1-modified</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dupeguru-sandbox-to-subprocess.patch</span></span></code></pre></div><p>Должно получиться следующее, файл <code>dupeguru-sandbox-to-subprocess.patch</code>:</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">diff -Naur dupeguru-4.3.1/build.py dupeguru-4.3.1-modified/build.py</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">--- dupeguru-4.3.1/build.py	2022-07-08 06:06:06.000000000 +0300</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+++ dupeguru-4.3.1-modified/build.py	2025-10-22 11:14:35.393716582 +0300</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-light-font-weight:bold;--shiki-dark:#B392F0;--shiki-dark-font-weight:bold;">@@ -10,7 +10,8 @@</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> import shutil</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> from multiprocessing import Pool</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-from setuptools import sandbox</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+#from setuptools import sandbox</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import subprocess</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> from hscommon import sphinxgen</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> from hscommon.build import (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     add_to_pythonpath,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-light-font-weight:bold;--shiki-dark:#B392F0;--shiki-dark-font-weight:bold;">@@ -118,7 +119,8 @@</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> def build_pe_modules():</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     print(&quot;Building PE Modules&quot;)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     # Leverage setup.py to build modules</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-    sandbox.run_setup(&quot;setup.py&quot;, [&quot;build_ext&quot;, &quot;--inplace&quot;])</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    #sandbox.run_setup(&quot;setup.py&quot;, [&quot;build_ext&quot;, &quot;--inplace&quot;])</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    subprocess.check_call([sys.executable, &quot;setup.py&quot;, &quot;build_ext&quot;, &quot;--inplace&quot;])</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> def build_normal():</span></span></code></pre></div><ol start="5"><li>Копируем патч в сборочницу:</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dupeguru-sandbox-to-subprocess.patch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/RPM/SOURCE/</span></span></code></pre></div><h3 id="создаем-spec-фаил" tabindex="-1">Создаём spec-файл: <a class="header-anchor" href="#создаем-spec-фаил" aria-label="Permalink to &quot;Создаём spec-файл:&quot;">​</a></h3><p>Файл <code>~/RPM/SPECS/dupeguru.spec</code>:</p><div class="language-spec vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">spec</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Name: dupeguru</span></span>
<span class="line"><span>Version: 4.3.1</span></span>
<span class="line"><span>Release: alt1</span></span>
<span class="line"><span>Summary: Find duplicate files visually</span></span>
<span class="line"><span>License: GPL-3.0-or-later</span></span>
<span class="line"><span>Group: File tools</span></span>
<span class="line"><span></span></span>
<span class="line"><span>AutoReqProv: no</span></span>
<span class="line"><span></span></span>
<span class="line"><span>URL: https://github.com/arsenetar/dupeguru</span></span>
<span class="line"><span>Source0: https://github.com/arsenetar/dupeguru/archive/refs/tags/%{version}.tar.gz</span></span>
<span class="line"><span>Patch0: dupeguru-sandbox-to-subprocess.patch</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BuildArch: x86_64</span></span>
<span class="line"><span>BuildRequires: python3-devel python3-module-setuptools python3-module-pyqt5 python3-module-PyQt5-devel make</span></span>
<span class="line"><span>Requires: python3-module-PyQt5 python3-module-distro python3-module-mutagen python3-module-polib python3-module-semantic_version python3-module-xxhash</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description</span></span>
<span class="line"><span>dupeGuru is a tool to find duplicate files on your computer. It can search</span></span>
<span class="line"><span>by filename, content, or music tags. This package uses the Qt UI.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%prep</span></span>
<span class="line"><span>%setup -q -n %{name}-%{version}</span></span>
<span class="line"><span>%patch0 -p1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%build</span></span>
<span class="line"><span>make</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%install</span></span>
<span class="line"><span>rm -rf %{buildroot}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Удаляем временные артефакты</span></span>
<span class="line"><span>rm -rf build/ env/ *.egg-info/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Устанавливаем только нужное</span></span>
<span class="line"><span>mkdir -p %{buildroot}/opt/dupeguru</span></span>
<span class="line"><span>cp -r \\</span></span>
<span class="line"><span>    core/ \\</span></span>
<span class="line"><span>    hscommon/ \\</span></span>
<span class="line"><span>    images/ \\</span></span>
<span class="line"><span>    locale/ \\</span></span>
<span class="line"><span>    qt/ \\</span></span>
<span class="line"><span>    help/ \\</span></span>
<span class="line"><span>    run.py \\</span></span>
<span class="line"><span>    LICENSE \\</span></span>
<span class="line"><span>    README.md \\</span></span>
<span class="line"><span>    CREDITS \\</span></span>
<span class="line"><span>    %{buildroot}/opt/dupeguru/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Создаём запускаемый скрипт</span></span>
<span class="line"><span>mkdir -p %{buildroot}%{_bindir}</span></span>
<span class="line"><span>cat &gt; %{buildroot}%{_bindir}/dupeguru &lt;&lt; &#39;EOF&#39;</span></span>
<span class="line"><span>#!/bin/sh</span></span>
<span class="line"><span>exec python3 /opt/dupeguru/run.py &quot;$@&quot;</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>chmod +x %{buildroot}%{_bindir}/dupeguru</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Desktop-файл</span></span>
<span class="line"><span>mkdir -p %{buildroot}%{_datadir}/applications</span></span>
<span class="line"><span>cat &gt; %{buildroot}%{_datadir}/applications/dupeguru.desktop &lt;&lt; EOF</span></span>
<span class="line"><span>[Desktop Entry]</span></span>
<span class="line"><span>Name=dupeGuru</span></span>
<span class="line"><span>Comment=Find and remove duplicate files</span></span>
<span class="line"><span>Exec=dupeguru</span></span>
<span class="line"><span>Icon=edit-find</span></span>
<span class="line"><span>Terminal=false</span></span>
<span class="line"><span>Type=Application</span></span>
<span class="line"><span>Categories=Utility;FileTools;</span></span>
<span class="line"><span>StartupNotify=true</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files</span></span>
<span class="line"><span>%dir /opt/dupeguru</span></span>
<span class="line"><span>/opt/dupeguru/*</span></span>
<span class="line"><span>%{_bindir}/dupeguru</span></span>
<span class="line"><span>%{_datadir}/applications/dupeguru.desktop</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%changelog</span></span>
<span class="line"><span>* Wed Oct 22 2025 Nikita Bystrov &lt;bystrovno@basealt.ru&gt; %version-%release</span></span>
<span class="line"><span>- Initial build for ALT Linux</span></span></code></pre></div><h3 id="собираем-пакет" tabindex="-1">Собираем пакет <a class="header-anchor" href="#собираем-пакет" aria-label="Permalink to &quot;Собираем пакет&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rpmbuild</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -ba</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/RPM/SPECS/dupeguru.spec</span></span></code></pre></div>`,30)]))}const k=a(e,[["render",l]]);export{c as __pageData,k as default};
