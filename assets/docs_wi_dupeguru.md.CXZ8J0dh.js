import{_ as n,C as p,o as l,c as t,j as i,a as e,G as h,aj as k}from"./chunks/framework.BZR1KcQy.js";const F=JSON.parse('{"title":"DupeGuru","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/dupeguru.md","filePath":"docs/wi/dupeguru.md","lastUpdated":1788534566000}'),r={name:"docs/wi/dupeguru.md"};function d(o,s,E,g,c,y){const a=p("ImageZoom");return l(),t("div",null,[s[0]||(s[0]=i("h1",{id:"dupeguru",tabindex:"-1"},[e("DupeGuru "),i("a",{class:"header-anchor",href:"#dupeguru","aria-label":'Permalink to "DupeGuru"'},"​")],-1)),h(a,{src:"/img/dupeguru.png"}),s[1]||(s[1]=k(`<p><a href="https://github.com/arsenetar/dupeguru" target="_blank" rel="noreferrer">https://github.com/arsenetar/dupeguru</a></p><p>dupeGuru — это кроссплатформенное графическое приложение с открытым исходным кодом для поиска дубликатов файлов в операционных системах Linux, macOS и Windows. Написанное преимущественно на Python 3 с использованием фреймворка Qt (через PyQt) для построения пользовательского интерфейса, утилита анализирует содержимое файлов с помощью различных алгоритмов сравнения (включая хеширование и анализ метаданных аудио/изображений), позволяя гибко настраивать критерии поиска и безопасно удалять или перемещать обнаруженные дубликаты. Благодаря модульной архитектуре dupeGuru поддерживает специализированные режимы работы для музыки (сравнение по тегам и акустическому отпечатку), изображений (визуальное сравнение) и обычных файлов, что делает его универсальным инструментом для очистки дискового пространства и организации цифровых данных.</p><h2 id="сборка-rpm-пакета" tabindex="-1">Сборка rpm-пакета <a class="header-anchor" href="#сборка-rpm-пакета" aria-label="Permalink to &quot;Сборка rpm-пакета&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">Ссылка на собраный пакет</p><p>DupeGuru: <a href="https://raw.githubusercontent.com/bysnik/wiki/main/repo/x86_64/RPMS.classic/dupeguru-4.3.1-alt1.x86_64.rpm" target="_blank" rel="noreferrer">dupeguru-4.3.1-alt1.x86_64.rpm</a></p><p>Пересобрал, сделал патч под Python 3.12</p></div><p>Установка сборочных зависимостей:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-setuptools</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-PyQt5-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-distro</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-mutagen</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-polib</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-semantic_version</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-module-xxhash</span></span></code></pre></div><h3 id="скачивание-исходников" tabindex="-1">Скачивание исходников: <a class="header-anchor" href="#скачивание-исходников" aria-label="Permalink to &quot;Скачивание исходников:&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/arsenetar/dupeguru/archive/refs/tags/4.3.1.tar.gz</span></span></code></pre></div><h3 id="копируем-архив-в-сборочницу" tabindex="-1">Копируем архив в сборочницу: <a class="header-anchor" href="#копируем-архив-в-сборочницу" aria-label="Permalink to &quot;Копируем архив в сборочницу:&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./4.3.1.tar.gz</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/RPM/SOURCES/4.3.1.tar.gz</span></span></code></pre></div><h3 id="создаем-патч" tabindex="-1">Создаём патч: <a class="header-anchor" href="#создаем-патч" aria-label="Permalink to &quot;Создаём патч:&quot;">​</a></h3><ol><li>Создайте файл <code>dupeguru-sandbox-to-subprocess.patch</code> и поместите в него следующее:</li></ol><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">diff -Naur dupeguru-4.3.1/build.py dupeguru-4.3.1-modified/build.py</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">--- dupeguru-4.3.1/build.py	2022-07-08 06:06:06.000000000 +0300</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+++ dupeguru-4.3.1-modified/build.py	2026-02-02 12:43:26.747653102 +0300</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-light-font-weight:bold;--shiki-dark:#B392F0;--shiki-dark-font-weight:bold;">@@ -10,7 +10,8 @@</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> import shutil</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> from multiprocessing import Pool</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-from setuptools import sandbox</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import subprocess</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import sys</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> from hscommon import sphinxgen</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> from hscommon.build import (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     add_to_pythonpath,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-light-font-weight:bold;--shiki-dark:#B392F0;--shiki-dark-font-weight:bold;">@@ -118,7 +119,7 @@</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> def build_pe_modules():</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     print(&quot;Building PE Modules&quot;)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     # Leverage setup.py to build modules</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-    sandbox.run_setup(&quot;setup.py&quot;, [&quot;build_ext&quot;, &quot;--inplace&quot;])</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    subprocess.check_call([sys.executable, &quot;setup.py&quot;, &quot;build_ext&quot;, &quot;--inplace&quot;])</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> def build_normal():</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">diff -Naur dupeguru-4.3.1/hscommon/pygettext.py dupeguru-4.3.1-modified/hscommon/pygettext.py</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">--- dupeguru-4.3.1/hscommon/pygettext.py	2022-07-08 06:06:06.000000000 +0300</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+++ dupeguru-4.3.1-modified/hscommon/pygettext.py	2026-02-02 12:55:28.222580520 +0300</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-light-font-weight:bold;--shiki-dark:#B392F0;--shiki-dark-font-weight:bold;">@@ -15,7 +15,9 @@</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> #</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> import os</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-import imp</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import types</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+#import imp</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+import importlib.util</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> import sys</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> import glob</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> import token</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-light-font-weight:bold;--shiki-dark:#B392F0;--shiki-dark-font-weight:bold;">@@ -108,16 +110,17 @@</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> def _visit_pyfiles(list, dirname, names):</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     &quot;&quot;&quot;Helper for getFilesForName().&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     # get extension for python source files</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-    if &quot;_py_ext&quot; not in globals():</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-        global _py_ext</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-        _py_ext = [triple[0] for triple in imp.get_suffixes() if triple[2] == imp.PY_SOURCE][0]</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    #if &quot;_py_ext&quot; not in globals():</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    #    global _py_ext</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    #    _py_ext = [triple[0] for triple in imp.get_suffixes() if triple[2] == imp.PY_SOURCE][0]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     # don&#39;t recurse into CVS directories</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     if &quot;CVS&quot; in names:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         names.remove(&quot;CVS&quot;)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     # add all *.py files to list</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-    list.extend([os.path.join(dirname, file) for file in names if os.path.splitext(file)[1] == _py_ext])</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    #list.extend([os.path.join(dirname, file) for file in names if os.path.splitext(file)[1] == _py_ext])</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+    list.extend([os.path.join(dirname, file) for file in names if file.endswith(&#39;.py&#39;)])</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> def _get_modpkg_path(dotted_name, pathlist=None):</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-light-font-weight:bold;--shiki-dark:#B392F0;--shiki-dark-font-weight:bold;">@@ -133,14 +136,19 @@</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     if len(parts) &gt; 1:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         # we have a dotted path, import top-level package</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         try:</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-            file, pathname, description = imp.find_module(parts[0], pathlist)</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-            if file:</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-                file.close()</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            #file, pathname, description = imp.find_module(parts[0], pathlist)</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            #if file:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            #    file.close()</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            spec = importlib.util.find_spec(parts[0], pathlist)</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            if spec is None:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+                return None</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            pathname = spec.submodule_search_locations[0] if spec.submodule_search_locations else spec.origin</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         except ImportError:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">             return None</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         # check if it&#39;s indeed a package</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-        if description[2] == imp.PKG_DIRECTORY:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+        #if description[2] == imp.PKG_DIRECTORY:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+        if spec.submodule_search_locations:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">             # recursively handle the remaining name parts</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">             pathname = _get_modpkg_path(parts[1], [pathname])</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         else:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-light-font-weight:bold;--shiki-dark:#B392F0;--shiki-dark-font-weight:bold;">@@ -148,11 +156,17 @@</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     else:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         # plain name</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         try:</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-            file, pathname, description = imp.find_module(dotted_name, pathlist)</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-            if file:</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-                file.close()</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-            if description[2] not in [imp.PY_SOURCE, imp.PKG_DIRECTORY]:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            #file, pathname, description = imp.find_module(dotted_name, pathlist)</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            #if file:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            #    file.close()</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            #if description[2] not in [imp.PY_SOURCE, imp.PKG_DIRECTORY]:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            spec = importlib.util.find_spec(dotted_name, pathlist)</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            if spec is None:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                 pathname = None</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            elif spec.origin and not spec.origin.endswith(&#39;.py&#39;) and not spec.submodule_search_locations:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+                pathname = None</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+            else:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+                pathname = spec.submodule_search_locations[0] if spec.submodule_search_locations else spec.origin</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         except ImportError:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">             pathname = None</span></span></code></pre></div><ol start="2"><li>Копируем патч в сборочницу:</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dupeguru-sandbox-to-subprocess.patch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/RPM/SOURCES/</span></span></code></pre></div><h3 id="создаем-spec-фаил" tabindex="-1">Создаём spec-файл: <a class="header-anchor" href="#создаем-spec-фаил" aria-label="Permalink to &quot;Создаём spec-файл:&quot;">​</a></h3><p>Файл <code>~/RPM/SPECS/dupeguru.spec</code>:</p><div class="language-rpm-spec vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rpm-spec</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Name:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dupeguru</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Version:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 4.3.1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Release:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> alt1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Summary:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Find duplicate files visually</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">License:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> GPL-3.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-or-later</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Group:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> File tools</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AutoReqProv:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">URL:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> https://github.com/arsenetar/dupeguru</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Source0:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> https://github.com/arsenetar/dupeguru/archive/refs/tags/%{version}.tar.gz</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Patch0:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dupeguru-sandbox-to-subprocess.patch</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">BuildArch:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> x86_64</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">BuildRequires:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> python3-devel python3-module-setuptools python3-module-pyqt5 python3-module-PyQt5-devel make</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Requires:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> python3-module-PyQt5 python3-module-distro python3-module-mutagen python3-module-polib python3-module-semantic_version python3-module-xxhash python3-module-send2trash</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%description</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dupeGuru is a tool to find duplicate files on your computer. It can search</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">by filename, content, or music tags. This package uses the Qt UI.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%prep</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">%setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -q -n %{name}-%{version}</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">%patch0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -p1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%build</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%install</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -rf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %{buildroot}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> Удаляем временные артефакты</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -rf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> env/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.egg-info/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> Устанавливаем только нужное</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %{buildroot}/opt/dupeguru</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    core/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    hscommon/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    images/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    locale/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    qt/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    help/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    run.py</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    LICENSE</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    README.md</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    CREDITS</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    %{buildroot}/opt/dupeguru/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> Создаём запускаемый скрипт</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %{buildroot}%{_bindir}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %{buildroot}%{_bindir}/dupeguru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;EOF&#39;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">#!/bin/sh</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">exec python3 /opt/dupeguru/run.py &quot;$@&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chmod</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %{buildroot}%{_bindir}/dupeguru</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">#</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> Desktop-файл</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %{buildroot}%{_datadir}/applications</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %{buildroot}%{_datadir}/applications/dupeguru.desktop</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> EOF</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">[Desktop Entry]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Name=dupeGuru</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Comment=Find and remove duplicate files</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Exec=dupeguru</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Icon=edit-find</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Terminal=false</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Type=Application</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Categories=Utility;FileTools;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">StartupNotify=true</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%files</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%dir /opt/dupeguru</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/opt/dupeguru/*</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%{_bindir}/dupeguru</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%{_datadir}/applications/dupeguru.desktop</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">%changelog</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Wed Oct 22 2025 Nikita Bystrov </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bystrovno@basealt.ru</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 4.3.1-alt1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Initial</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ALT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Linux</span></span></code></pre></div><h3 id="собираем-пакет" tabindex="-1">Собираем пакет <a class="header-anchor" href="#собираем-пакет" aria-label="Permalink to &quot;Собираем пакет&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rpmbuild</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -ba</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/RPM/SPECS/dupeguru.spec</span></span></code></pre></div>`,20))])}const m=n(r,[["render",d]]);export{F as __pageData,m as default};
