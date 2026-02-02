# DupeGuru

![](/img/dupeguru.png)

dupeGuru — это кроссплатформенное графическое приложение с открытым исходным кодом для поиска дубликатов файлов в операционных системах Linux, macOS и Windows. Написанное преимущественно на Python 3 с использованием фреймворка Qt (через PyQt) для построения пользовательского интерфейса, утилита анализирует содержимое файлов с помощью различных алгоритмов сравнения (включая хеширование и анализ метаданных аудио/изображений), позволяя гибко настраивать критерии поиска и безопасно удалять или перемещать обнаруженные дубликаты. Благодаря модульной архитектуре dupeGuru поддерживает специализированные режимы работы для музыки (сравнение по тегам и акустическому отпечатку), изображений (визуальное сравнение) и обычных файлов, что делает его универсальным инструментом для очистки дискового пространства и организации цифровых данных.

## Сборка rpm-пакета

::: warning Ссылка на собраный пакет
DupeGuru: [dupeguru-4.3.1-alt1.x86_64.rpm](https://raw.githubusercontent.com/bysnik/wiki/main/rpms/dupeguru-4.3.1-alt1.x86_64.rpm)

Пересобрал, сделал патч под Python 3.12
:::

Установка сборочных зависимостей:
```bash
apt-get install python3-devel python3-module-setuptools python3-module-PyQt5-devel make python3-module-distro python3-module-mutagen python3-module-polib python3-module-semantic_version python3-module-xxhash
```

### Скачивание исходников:
```bash
wget https://github.com/arsenetar/dupeguru/archive/refs/tags/4.3.1.tar.gz
```

### Копируем архив в сборочницу:
```bash
cp ./4.3.1.tar.gz ~/RPM/SOURCES/4.3.1.tar.gz
```

### Создаём патч:

1. Создайте файл `dupeguru-sandbox-to-subprocess.patch` и поместите в него следующее:

```diff
diff -Naur dupeguru-4.3.1/build.py dupeguru-4.3.1-modified/build.py
--- dupeguru-4.3.1/build.py	2022-07-08 06:06:06.000000000 +0300
+++ dupeguru-4.3.1-modified/build.py	2026-02-02 12:43:26.747653102 +0300
@@ -10,7 +10,8 @@
 import shutil
 from multiprocessing import Pool
 
-from setuptools import sandbox
+import subprocess
+import sys
 from hscommon import sphinxgen
 from hscommon.build import (
     add_to_pythonpath,
@@ -118,7 +119,7 @@
 def build_pe_modules():
     print("Building PE Modules")
     # Leverage setup.py to build modules
-    sandbox.run_setup("setup.py", ["build_ext", "--inplace"])
+    subprocess.check_call([sys.executable, "setup.py", "build_ext", "--inplace"])
 
 
 def build_normal():
diff -Naur dupeguru-4.3.1/hscommon/pygettext.py dupeguru-4.3.1-modified/hscommon/pygettext.py
--- dupeguru-4.3.1/hscommon/pygettext.py	2022-07-08 06:06:06.000000000 +0300
+++ dupeguru-4.3.1-modified/hscommon/pygettext.py	2026-02-02 12:55:28.222580520 +0300
@@ -15,7 +15,9 @@
 #
 
 import os
-import imp
+import types
+#import imp
+import importlib.util
 import sys
 import glob
 import token
@@ -108,16 +110,17 @@
 def _visit_pyfiles(list, dirname, names):
     """Helper for getFilesForName()."""
     # get extension for python source files
-    if "_py_ext" not in globals():
-        global _py_ext
-        _py_ext = [triple[0] for triple in imp.get_suffixes() if triple[2] == imp.PY_SOURCE][0]
+    #if "_py_ext" not in globals():
+    #    global _py_ext
+    #    _py_ext = [triple[0] for triple in imp.get_suffixes() if triple[2] == imp.PY_SOURCE][0]
 
     # don't recurse into CVS directories
     if "CVS" in names:
         names.remove("CVS")
 
     # add all *.py files to list
-    list.extend([os.path.join(dirname, file) for file in names if os.path.splitext(file)[1] == _py_ext])
+    #list.extend([os.path.join(dirname, file) for file in names if os.path.splitext(file)[1] == _py_ext])
+    list.extend([os.path.join(dirname, file) for file in names if file.endswith('.py')])
 
 
 def _get_modpkg_path(dotted_name, pathlist=None):
@@ -133,14 +136,19 @@
     if len(parts) > 1:
         # we have a dotted path, import top-level package
         try:
-            file, pathname, description = imp.find_module(parts[0], pathlist)
-            if file:
-                file.close()
+            #file, pathname, description = imp.find_module(parts[0], pathlist)
+            #if file:
+            #    file.close()
+            spec = importlib.util.find_spec(parts[0], pathlist)
+            if spec is None:
+                return None
+            pathname = spec.submodule_search_locations[0] if spec.submodule_search_locations else spec.origin
         except ImportError:
             return None
 
         # check if it's indeed a package
-        if description[2] == imp.PKG_DIRECTORY:
+        #if description[2] == imp.PKG_DIRECTORY:
+        if spec.submodule_search_locations:
             # recursively handle the remaining name parts
             pathname = _get_modpkg_path(parts[1], [pathname])
         else:
@@ -148,11 +156,17 @@
     else:
         # plain name
         try:
-            file, pathname, description = imp.find_module(dotted_name, pathlist)
-            if file:
-                file.close()
-            if description[2] not in [imp.PY_SOURCE, imp.PKG_DIRECTORY]:
+            #file, pathname, description = imp.find_module(dotted_name, pathlist)
+            #if file:
+            #    file.close()
+            #if description[2] not in [imp.PY_SOURCE, imp.PKG_DIRECTORY]:
+            spec = importlib.util.find_spec(dotted_name, pathlist)
+            if spec is None:
                 pathname = None
+            elif spec.origin and not spec.origin.endswith('.py') and not spec.submodule_search_locations:
+                pathname = None
+            else:
+                pathname = spec.submodule_search_locations[0] if spec.submodule_search_locations else spec.origin
         except ImportError:
             pathname = None
```

2. Копируем патч в сборочницу:
```bash
cp dupeguru-sandbox-to-subprocess.patch ~/RPM/SOURCES/
```

### Создаём spec-файл:

Файл `~/RPM/SPECS/dupeguru.spec`:

```spec
Name: dupeguru
Version: 4.3.1
Release: alt1
Summary: Find duplicate files visually
License: GPL-3.0-or-later
Group: File tools

AutoReqProv: no

URL: https://github.com/arsenetar/dupeguru
Source0: https://github.com/arsenetar/dupeguru/archive/refs/tags/%{version}.tar.gz
Patch0: dupeguru-sandbox-to-subprocess.patch

BuildArch: x86_64
BuildRequires: python3-devel python3-module-setuptools python3-module-pyqt5 python3-module-PyQt5-devel make
Requires: python3-module-PyQt5 python3-module-distro python3-module-mutagen python3-module-polib python3-module-semantic_version python3-module-xxhash python3-module-send2trash

%description
dupeGuru is a tool to find duplicate files on your computer. It can search
by filename, content, or music tags. This package uses the Qt UI.

%prep
%setup -q -n %{name}-%{version}
%patch0 -p1

%build
make

%install
rm -rf %{buildroot}

# Удаляем временные артефакты
rm -rf build/ env/ *.egg-info/

# Устанавливаем только нужное
mkdir -p %{buildroot}/opt/dupeguru
cp -r \
    core/ \
    hscommon/ \
    images/ \
    locale/ \
    qt/ \
    help/ \
    run.py \
    LICENSE \
    README.md \
    CREDITS \
    %{buildroot}/opt/dupeguru/

# Создаём запускаемый скрипт
mkdir -p %{buildroot}%{_bindir}
cat > %{buildroot}%{_bindir}/dupeguru << 'EOF'
#!/bin/sh
exec python3 /opt/dupeguru/run.py "$@"
EOF
chmod +x %{buildroot}%{_bindir}/dupeguru

# Desktop-файл
mkdir -p %{buildroot}%{_datadir}/applications
cat > %{buildroot}%{_datadir}/applications/dupeguru.desktop << EOF
[Desktop Entry]
Name=dupeGuru
Comment=Find and remove duplicate files
Exec=dupeguru
Icon=edit-find
Terminal=false
Type=Application
Categories=Utility;FileTools;
StartupNotify=true
EOF

%files
%dir /opt/dupeguru
/opt/dupeguru/*
%{_bindir}/dupeguru
%{_datadir}/applications/dupeguru.desktop

%changelog
* Wed Oct 22 2025 Nikita Bystrov <bystrovno@basealt.ru> %version-%release
- Initial build for ALT Linux
```

### Собираем пакет

```bash
rpmbuild -ba ~/RPM/SPECS/dupeguru.spec
```