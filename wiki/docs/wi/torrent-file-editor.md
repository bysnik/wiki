# Torrent File Editor

![](/img/torrent-file-editor.png)

https://github.com/torrent-file-editor/torrent-file-editor

Графическое приложение на базе Qt, предназначенное для создания и редактирования .torrent-файлов.

## Сборка из исходников QT6

Установим необходимые зависимости:
```bash
apt-get install qt6-base-devel qt6-tools-devel qt6-svg-devel qt6-5compat-devel
```

Сборка программы:
```bash
git clone --depth 1 --branch v1.0.2 https://github.com/torrent-file-editor/torrent-file-editor.git
```
```bash
cd torrent-file-editor
```
```bash
mkdir build && cd build
```
```bash
cmake -DCMAKE_BUILD_TYPE=Release -DQT6_BUILD=ON ..
```
```bash
make -j$(nproc)
```

Запуск программы:
```bash
./torrent-file-editor
```

## Сборка пакета под Альт

1. Скачайте исходные коды в директорию `~/RPM/SOURCES/`:
```bash
wget https://github.com/torrent-file-editor/torrent-file-editor/archive/refs/tags/v1.0.3.tar.gz
```

2. Создайте файл `~/RPM/SOURCES/torrent-file-editor.desktop`

`torrent-file-editor.desktop`
```desktop
[Desktop Entry]
Type=Application
Version=1.0.3
Name=Torrent File Editor
Name[ru]=Редактор торрент-файлов
Comment=Application for creating and editing .torrent files
Comment[ru]=Приложение для создания и редактирования .torrent файлов
Exec=torrent-file-editor
Icon=torrent-file-editor
Terminal=false
Categories=Network;Utility;
Keywords=torrent;bittorrent;editor;
Keywords[ru]=торрент;битторрент;редактор;

```

3. Создайте файл `~/RPM/SPECS/torrent-file-editor.spec`

`torrent-file-editor`
```spec
Name:           torrent-file-editor
Version:        1.0.3
Release:        alt1
Summary:        Qt-based GUI application for creating and editing .torrent files
Group:          Networking/Other
License:        GPL-3.0
Url:            https://github.com/torrent-file-editor/torrent-file-editor
Source0:        https://github.com/torrent-file-editor/torrent-file-editor/archive/refs/tags/v%{version}/%{name}-%{version}.tar.gz
Source1:        %{name}.desktop

BuildRequires:  cmake
BuildRequires:  gcc-c++
BuildRequires:  qt6-base-devel
BuildRequires:  qt6-tools-devel
BuildRequires:  qt6-svg-devel
BuildRequires:  qt6-5compat-devel

%description
Torrent File Editor is a Qt-based GUI application designed for creating and editing .torrent files. It provides a graphical interface for viewing and modifying torrent file metadata.

%prep
%setup -q -n %{name}-%{version}

%build
mkdir -p build
cd build
cmake -DCMAKE_BUILD_TYPE=Release -DQT6_BUILD=ON -DCMAKE_INSTALL_PREFIX=%{_prefix} ..
make %{?_smp_mflags}

%install
mkdir -p %buildroot%_bindir
install -m 0755 build/torrent-file-editor %buildroot%_bindir/torrent-file-editor

mkdir -p %buildroot%_desktopdir
install -m 0644 %{SOURCE1} %buildroot%_desktopdir/%{name}.desktop

mkdir -p %buildroot%_iconsdir/hicolor/scalable/apps
install -m 0644 icons/app.svg %buildroot%_iconsdir/hicolor/scalable/apps/%{name}.svg

%post
if [ -x /usr/bin/gtk-update-icon-cache ]; then
    gtk-update-icon-cache -q %{_iconsdir}/hicolor || true
fi

%postun
if [ -x /usr/bin/gtk-update-icon-cache ]; then
    gtk-update-icon-cache -q %{_iconsdir}/hicolor || true
fi

%files
%_bindir/torrent-file-editor
%_desktopdir/%{name}.desktop
%_iconsdir/hicolor/scalable/apps/%{name}.svg

%changelog
* Thu Jun 18 2026 bystrovno <bystrovno@basealt.ru> 1.0.3-alt1
- Initial build for ALT Linux
```

4. Соберите пакет:
```bash
rpmbuild -ba ~/RPM/SPECS/torrent-file-editor.spec
```

5. Результат будет лежать в:
```bash
...
Wrote: /home/<user>/RPM/SRPMS/torrent-file-editor-1.0.3-alt1.src.rpm (w2.lzdio)
Wrote: /home/<user>/RPM/RPMS/x86_64/torrent-file-editor-1.0.3-alt1.x86_64.rpm (w2.lzdio)
Wrote: /home/<user>/RPM/RPMS/x86_64/torrent-file-editor-debuginfo-1.0.3-alt1.x86_64.rpm (w2.lzdio)
```

::: warning Мой собранный пакет
- torrent-file-editor-1.0.3: [torrent-file-editor-1.0.3-alt1.x86_64.rpm](https://raw.githubusercontent.com/bysnik/wiki/main/rpms/torrent-file-editor-1.0.3-alt1.x86_64.rpm)
:::


