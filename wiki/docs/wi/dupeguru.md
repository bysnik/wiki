# DupeGuru

## Сборка rpm-пакета

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
cp ./dupeguru-4.3.1.tar.gz ~/RPM/SOURCE/dupeguru-4.3.1.tar.gz
```

### Создаём патч:

1. Разархивируем архив:
```bash
tar -xzf dupeguru-4.3.1.tar.gz
```

2. Делаем копию:
```bash
cp -r dupeguru-4.3.1 dupeguru-4.3.1-modified
```

3. Редактируем файл `dupeguru-4.3.1-modified/build.py`:

Замените:

```python
from setuptools import sandbox
...
sandbox.run_setup(...)
```

на:

```python
import subprocess
import sys
...
subprocess.check_call([sys.executable, "setup.py", "build_ext", "--inplace"])
```

Убедитесь, что вы заменили **все** вызовы `sandbox.run_setup`.

4. Создайте патч:

```bash
diff -Naur dupeguru-4.3.1 dupeguru-4.3.1-modified > dupeguru-sandbox-to-subprocess.patch
```

Должно получиться следующее, файл `dupeguru-sandbox-to-subprocess.patch`:

```diff
diff -Naur dupeguru-4.3.1/build.py dupeguru-4.3.1-modified/build.py
--- dupeguru-4.3.1/build.py	2022-07-08 06:06:06.000000000 +0300
+++ dupeguru-4.3.1-modified/build.py	2025-10-22 11:14:35.393716582 +0300
@@ -10,7 +10,8 @@
 import shutil
 from multiprocessing import Pool
 
-from setuptools import sandbox
+#from setuptools import sandbox
+import subprocess
 from hscommon import sphinxgen
 from hscommon.build import (
     add_to_pythonpath,
@@ -118,7 +119,8 @@
 def build_pe_modules():
     print("Building PE Modules")
     # Leverage setup.py to build modules
-    sandbox.run_setup("setup.py", ["build_ext", "--inplace"])
+    #sandbox.run_setup("setup.py", ["build_ext", "--inplace"])
+    subprocess.check_call([sys.executable, "setup.py", "build_ext", "--inplace"])
 
 
 def build_normal():
```

5. Копируем патч в сборочницу:
```bash
cp dupeguru-sandbox-to-subprocess.patch ~/RPM/SOURCE/
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
Requires: python3-module-PyQt5 python3-module-distro python3-module-mutagen python3-module-polib python3-module-semantic_version python3-module-xxhash

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