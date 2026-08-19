# Open Brodcast Software

![](https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1905180/ss_aefa14f73426de7ae6be79876b1a8055b11291bc.1920x1080.jpg?t=1733595297)

OBS (Open Broadcaster Software) — это бесплатное и открытое программное обеспечение для записи видео и стриминга в реальном времени, широко используемое стримерами, геймерами и контент-мейкерами. Оно позволяет захватывать экран, веб-камеру, микрофон и другие источники, настраивать сцены и переходы, накладывать наложения (overlays), а также транслировать напрямую на платформы вроде YouTube, Twitch или Facebook Live. OBS поддерживает высокое качество записи, гибкие настройки кодеков и работает на Windows, macOS и Linux.

## Установка

```bash
apt-get install obs-studio
```

или

```bash
flatpak install flathub com.obsproject.Studio
```

## Для Wayland

Установите пакеты `xdg-desktop-portal`, `xdg-desktop-portal-wlr` и `slurp`, иначе вы не сможете увидеть опцию захвата экрана или же она не будет работать.

## Плагины (если устанавливали через apt-get)

obs-vkcapture

obs-studio-plugin-vaapi

obs-studio-plugin-droidcam

obs-studio-plugin-multi-rtmp

obs-studio-plugin-input-overlay - потыкал его, чёт плохо работает

### Сборка плагина obs-studio-plugin-rtspserver

::: warning Собранный пакет
- obs-studio-plugin-rtspserver-3.1.0: [obs-studio-plugin-rtspserver-3.1.0-alt1.x86_64.rpm](https://raw.githubusercontent.com/bysnik/wiki/main/rpms/obs-studio-plugin-rtspserver-3.1.0-alt1.x86_64.rpm)
:::

1. Скачиваем исходники:
```bash
wget -O ~/RPM/SOURCES/obs-rtspserver-3.1.0.tar.gz https://github.com/iamscottxu/obs-rtspserver/archive/refs/tags/v3.1.0.tar.gz
```

2. Создаём спеку:
```bash
nano ~/RPM/SPECS/obs-studio-plugin-rtspserver.spec
```
::: details
```spec
%define _unpackaged_files_terminate_build 1

Name: obs-studio-plugin-rtspserver
Version: 3.1.0
Release: alt1

Summary: This is a plugin for obs-studio, encode and publish to a RTSP stream.

License: GPLv2
Group: Video
Url: https://github.com/iamscottxu/obs-rtspserver

Source: obs-rtspserver-%version.tar.gz

BuildRequires(pre): rpm-macros-cmake

BuildRequires: cmake
BuildRequires: gcc-c++
BuildRequires: pkgconfig(libobs)
BuildRequires: pkgconfig(obs-frontend-api)
BuildRequires: pkgconfig(Qt6Core)
BuildRequires: pkgconfig(Qt6Widgets)
BuildRequires: libb64-devel

Requires: obs-studio
Requires: libb64

ExcludeArch: %ix86 %arm %mips

%description
This is a plugin for obs-studio, encode and publish to a RTSP stream.

%prep
%setup -n obs-rtspserver-%version

# Фикс заголовков для GCC 13+
sed -i '1s/^/#include <cstdlib>\n/' rtsp-server/net/MemoryManager.cpp
sed -i '1s/^/#include <string>\n/' rtsp_output_helper.h
sed -i '8i #include <cstdint>' rtsp-server/xop/media.h

# Обход get_git_version (нет .git в tar-архиве)
sed -i 's|get_git_version(OBS_PLUGUN_GIT_TAG OBS_PLUGUIN_VERSION OBS_PLUGUIN_SHORT_VERSION OBS_PLUGUIN_LONG_VERSION)|set(OBS_PLUGUN_GIT_TAG "v%version")\nset(OBS_PLUGUIN_VERSION "%version")\nset(OBS_PLUGUIN_SHORT_VERSION "%version")\nset(OBS_PLUGUIN_LONG_VERSION "%version")|' CMakeLists.txt

# Убираем -Werror
sed -i 's/-Werror//g' external/ObsPluginHelpers.cmake

# Переопределяем путь к заголовкам OBS на системный
sed -i 's|set(OBS_FRONTEND_API_INCLUDE_DIRS "${CMAKE_SOURCE_DIR}/UI/obs-frontend-api")|set(OBS_FRONTEND_API_INCLUDE_DIRS "%_includedir/obs")|' CMakeLists.txt

# Используем системный libb64 вместо пустого подмодуля
sed -i 's|include_directories("3rdpart/libb64/libb64/include")|include_directories("%_includedir")|' rtsp-server/CMakeLists.txt
sed -i '/add_subdirectory(3rdpart\/libb64)/d' rtsp-server/CMakeLists.txt
sed -i 's|libb64)|b64)|' rtsp-server/CMakeLists.txt

%build
%add_optflags -Wno-reorder

%cmake \
    -DLIBOBS_INCLUDE_DIR=%_includedir/obs \
    -DLIBOBS_LIB=%_libdir/libobs.so \
    -DOBS_FRONTEND_API_INCLUDE_DIR=%_includedir/obs \
    -DOBS_FRONTEND_API_LIB=%_libdir/libobs-frontend-api.so
%cmake_build

%install
%cmake_install

# ObsPluginHelpers.cmake ставит файлы в ${CMAKE_SOURCE_DIR}/release.
# Переносим их в системные пути ALT Linux.
mkdir -p %buildroot%_libdir/obs-plugins
mkdir -p %buildroot%_datadir/obs/obs-plugins

install -m 0644 \
    %buildroot%_builddir/obs-rtspserver-%version/release/obs-plugins/64bit/obs-rtspserver.so \
    %buildroot%_libdir/obs-plugins/obs-rtspserver.so

cp -a \
    %buildroot%_builddir/obs-rtspserver-%version/release/data/obs-plugins/obs-rtspserver \
    %buildroot%_datadir/obs/obs-plugins/

rm -rf %buildroot%_builddir

%files
%doc README.md LICENSE
%_libdir/obs-plugins/obs-rtspserver.so
%_datadir/obs/obs-plugins/obs-rtspserver

%changelog
* Tue Aug 19 2026 Nikita Bystrov <bystrovno@basealt.ru> 3.1.0-alt1
- initial build for ALT
```
:::


3. Устанавливаем сборочные зависимости:
```bash
apt-get install cmake gcc-c++ libobs obs-frontend-api Qt6Core Qt6Widgets libb64-devel
```

4. Собираем плагин:
```bash
rpmbuild -ba ~/RPM/SPECS/obs-studio-plugi-rtspserver.spec
```