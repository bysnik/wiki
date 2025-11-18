---
outline: deep
---

# RPMBUILD

## Подготовка RPM-окружения

Установите необходимые пакеты:
```bash
apt-get install rpmdevtools rpm-build gcc-c++ git-core
```

Создайте дерево сборки:
```bash
$ rpmdev-setuptree
```

Проверьте, присутствует ли в системе директория RPM, введя команду: 
```bash
$ ls ∼/
```

::: warning Если директория не присутствует в системе, то введите:
```bash
$ mv ∼/rpmbuild ∼/RPM
```
:::

Откройте файл `∼/.rpmmacros`:
```bash
$ nano ~/.rpmmacros
```

Если в файле есть другие строки, то удалите их. При заполнении файла применяйте только латинские символы. Содержимое файла должно иметь вид:
```
%_topdir %homedir/RPM
%packager Your_name Your_lastname <name@mail.domain>
```

::: tip Дополнение
Для того, чтобы можно было подписывать пакеты, я добавляю следующие строки в файл `∼/.rpmmacros`:
```
%__gpg /usr/bin/gpg
%__gpg_sign_cmd %{__gpg} --batch --no-verbose --no-armor --no-secmem-warning -u "%{_gpg_name}" -sbo %{__signature_filename} %{__plaintext_filename}
```
:::

## Сборка пакета с простыми файлами

Пример простого RPM-пакета для **ALT Linux**, который устанавливает **обои рабочего стола** и может использоваться как **branding-пакет** (например, `mycompany-wallpapers`).

### Пример структуры архива

```
mycompany-wallpapers-1.0/
├── README
├── wallpaper1.jpg
├── wallpaper2.png
└── themes/
    ├── dark.jpg
    └── light.jpg
```

### `mycompany-wallpapers.spec`

```spec
%define wallpaper_dir /usr/share/backgrounds/mycompany

Name:           mycompany-wallpapers
Version:        1.0
Release:        alt1
Summary:        MyCompany Branding Wallpapers
Group:          User Interface/Desktops
License:        Proprietary
Url:            https://mycompany.example.com/
BuildArch:      noarch

Source0:        %{name}-%{version}.tar.gz
BuildRequires:  rpm-build

%description
Official wallpapers for MyCompany desktop branding.

%prep
%setup -q

%install
# Создаём корневой каталог для обоев
install -d -m 0755 %{buildroot}%{wallpaper_dir}

# Копируем всё содержимое (включая подкаталоги) в целевой каталог
cp -r ./* %{buildroot}%{wallpaper_dir}/

# Убеждаемся, что права корректны
chmod -R u+rwX,go+rX,go-w %{buildroot}%{wallpaper_dir}

%files
%doc %{wallpaper_dir}/README
%{wallpaper_dir}/

%changelog
* Wed Oct 15 2025 Nikita Bystrov <bystrovno@basealt.ru> 1.0-alt1
- Initial wallpaper package with archive-based source
```

### Сборка пакета

Скопируйте spec и источники
```bash
cp mycompany-wallpapers.spec ~/RPM/SPECS/
cp mycompany-wallpapers-1.0.tar.gz ~/RPM/SOURCES/
```

Соберите пакет
```bash
rpmbuild -ba ~/RPM/SPECS/mycompany-wallpapers.spec
```

Готовый RPM будет в `~/RPM/RPMS/noarch/`.

### Как использовать обои

После установки:

```bash
apt-get install ./mycompany-wallpapers-1.0-alt1.noarch.rpm
```

Файлы окажутся в:

```
/usr/share/backgrounds/
```

Пользователи (или системный администратор) могут указать его как обои через настройки рабочего стола (в GNOME, KDE, XFCE и т.д.) или, например, через Групповые Политики.

## Метапакеты
source: "https://www.altlinux.org/%D0%9C%D0%B5%D1%82%D0%B0%D0%BF%D0%B0%D0%BA%D0%B5%D1%82%D1%8B_start"

Метапакеты в Linux — это пустые пакеты, которые только описывают зависимости. Они облегчают установку совместной группы программ, предварительно выбранных сопровождающим метапакета.

По сути пакет представляет собой один rpm-spec, без gear/rules и файлов с исходниками, в котором описан главный пакет (но не всегда) и подпакеты в которых указаны зависимости. Подпакеты могут входить в главный пакет.

При установке такого пакета в систему не добавляются никакие файлы, но из зависимостей пакета ставятся программы.

Если удалить мета-пакет из системы, удалится только он сам, оставив все установленные из зависимостей пакеты в системе.

В данной статье будет описано создание такого пакета в ALT Linux.

### Примеры пакетов в ALT Linux

#### Mate

[https://git.altlinux.org/srpms/m/mate.git](https://git.altlinux.org/srpms/m/mate.git)

```
mate
├── .git
└── mate.spec
```

Спек:

```
Name: mate
Version: 1.26.0
Release: alt3

Summary: MATE Desktop installers
License: %gpl2plus
Group: Graphical desktop/MATE

BuildArch: noarch

BuildPreReq: rpm-build-licenses

%description
A set of virtual packages for MATE Desktop installation.

%package minimal
Summary: MATE Desktop minimal installer
Group: Graphical desktop/MATE

Requires: mate-desktop mate-session mate-panel mate-menus mate-window-manager mate-settings-daemon
Requires: mate-polkit mate-control-center mate-media mate-screensaver mate-power-manager mate-notification-daemon
Requires: mate-system-monitor mate-file-manager mate-file-archiver mate-terminal mate-text-editor
Requires: mate-themes mate-icon-theme mate-backgrounds mate-user-guide

%description minimal
This virtual package installs MATE Desktop with minimum components.

%package default
Summary: MATE Desktop installer for optimal user's requirements
Group: Graphical desktop/MATE

Requires: mate-minimal
Requires: mate-calc mate-disk-usage-analyzer
Requires: mate-document-viewer mate-document-viewer-caja mate-document-viewer-thumbnailer
Requires: mate-file-manager-extensions mate-file-manager-archiver
Requires: mate-image-viewer mate-menu-editor mate-screenshot mate-search-tool mate-sensors-applet

%description default
This virtual package installs MATE Desktop for an average user's
requirements.

%package maxi
Summary: MATE Desktop full installer
Group: Graphical desktop/MATE

Requires: mate-default
Requires: mate-disk-image-mounter
Requires: mate-document-viewer-djvu mate-document-viewer-dvi mate-document-viewer-pixbuf mate-document-viewer-xps
Requires: mate-file-manager-image-converter mate-file-manager-open-terminal
Requires: mate-file-manager-sendto mate-file-manager-share mate-file-manager-wallpaper mate-system-log
Requires: python3-module-caja

%description maxi
This virtual package installs full MATE Desktop.

%files minimal
%files default
%files maxi

%changelog
* Wed May 14 2025 Anton Midyukov <antohami@altlinux.org> 1.26.0-alt3
- removed mate-file-manager-beesu
```

##### Информация

Основные данные:

```
Name: mate
Version: 1.26.0
Release: alt3

Summary: MATE Desktop installers
License: %gpl2plus
Group: Graphical desktop/MATE

BuildArch: noarch

%description
A set of virtual packages for MATE Desktop installation.
```

Пакет minimal:

```
%package minimal
Summary: MATE Desktop minimal installer
Group: Graphical desktop/MATE

Requires: mate-desktop mate-session mate-panel mate-menus mate-window-manager mate-settings-daemon
Requires: mate-polkit mate-control-center mate-media mate-screensaver mate-power-manager mate-notification-daemon
Requires: mate-system-monitor mate-file-manager mate-file-archiver mate-terminal mate-text-editor
Requires: mate-themes mate-icon-theme mate-backgrounds mate-user-guide

%description minimal
This virtual package installs MATE Desktop with minimum components.
```

Пакет default:

```
%package default
Summary: MATE Desktop installer for optimal user's requirements
Group: Graphical desktop/MATE

Requires: mate-minimal
Requires: mate-calc mate-disk-usage-analyzer
Requires: mate-document-viewer mate-document-viewer-caja mate-document-viewer-thumbnailer
Requires: mate-file-manager-extensions mate-file-manager-archiver
Requires: mate-image-viewer mate-menu-editor mate-screenshot mate-search-tool mate-sensors-applet

%description default
This virtual package installs MATE Desktop for an average user's equirements.
```

Пакет maxi:

```
%package maxi
Summary: MATE Desktop full installer
Group: Graphical desktop/MATE

Requires: mate-default
Requires: mate-disk-image-mounter
Requires: mate-document-viewer-djvu mate-document-viewer-dvi mate-document-viewer-pixbuf mate-document-viewer-xps
Requires: mate-file-manager-image-converter mate-file-manager-open-terminal
Requires: mate-file-manager-sendto mate-file-manager-share mate-file-manager-wallpaper mate-system-log
Requires: python3-module-caja

%description maxi
This virtual package installs full MATE Desktop.

%files minimal
%files default
%files maxi
```

##### Конечные файлы

```
%files minimal
%files default
%files maxi
```

##### Пакеты

В результате получатся следующие пакеты:

- mate-minimal
- mate-default
- mate-maxi

### Попробуем создать метапакет с любимыми программами

Создаем каталог:

```
$ mkdir mymeta
```

Инициализируем git:

```
mymeta$ git init .
```

**Примечание:** Gear/rules не нужен!!!

Пишем спек mymeta.spec:

```
Name: petr-apps
Version: 1.0
Release: alt1

Summary: Apps for Petr Akhlamov
License: none
Group: none

BuildArch: noarch

%description
A set of virtual packages for install apps for Petr Akhlamov.

%package graphics
Summary: Graphics apps
License: none
Group: Graphics

Requires: gimp darktable rawtherapee converseen shutter inkscape

%description graphics
This virtual package installs graphics apps for Petr Akhlamov

%package office
Summary: Office apps
License: none
Group: Office

Requires: LibreOffice-still LibreOffice-still-langpack-ru LibreOffice-still-gtk3 LibreOffice-still-qt6 kde5-korganizer kde5-profile foliate qpdfview mytetra scantailor ocrmypdf pdfarranger pdfshuffler pdfmixtool

%description office
This virtual package installs office apps for Petr Akhlamov

%package multimedia
Summary: Multimedia apps
License: none
Group: Multimedia

Requires: clementine qmmp vlc-maxi mpc-qt audacity shotcut mkvtoolnix-gui cheese obs-studio isomaster

%description multimedia
This virtual package installs multimedia apps for Petr Akhlamov

%package network
Summary: Network apps
License: none
Group: Network

Requires: firefox thunderbird yt-dlp qbittorrent telegram-desktop

%description network
This virtual package installs network apps for Petr Akhlamov

%package education
Summary: Education apps
License: none
Group: Education

Requires: stellarium

%description education
This virtual package installs education apps for Petr Akhlamov

%package system
Summary: System apps
License: none
Group: System

Requires: qdirstat bleachbit grub-customizer hardinfo cpu-x doublecmd-qt

%description system
This virtual package installs system apps for Petr Akhlamov

%package full
Summary: All apps
License: none
Group: none

Requires: petr-apps-graphics
Requires: petr-apps-office
Requires: petr-apps-multimedia
Requires: petr-apps-network
Requires: petr-apps-education
Requires: petr-apps-system

%description full
This virtual package installs all apps for Petr Akhlamov

%files graphics
%files office
%files multimedia
%files network
%files education
%files system
%files full

%changelog
* Thu Jul 17 2025 Petr Akhlamov <ahlamovpm@basealt.ru> 1.0-alt1
- initial build
```

Добавляем информацию в репозиторий и собираем пакет:

```
$ git add .
$ git commit -am "add apps"
$ gear --hasher -- hsh --no-sisyphus-check -v
```

Содержимое репозитория:

```
my_packages
├── .git
└── mymeta.spec
```

##### Конечные файлы

```
%files graphics
%files office
%files multimedia
%files network
%files education
%files system
%files full
```

##### Пакеты

В результате получатся следующие пакеты:

- petr-apps-graphics
- petr-apps-office
- petr-apps-multimedia
- petr-apps-network
- petr-apps-education
- petr-apps-system
- petr-apps-full


## Ярлычки программ
source: "https://www.altlinux.org/%D0%AF%D1%80%D0%BB%D1%8B%D1%87%D0%BA%D0%B8_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC"

Ярлыки приложений, или файлы.desktop, представляют из себя конфигурационный файл, в котором прописаны параметры.

### Пример файла

```
[Desktop Entry]

# Тип ярлыка
Type=Application

# Версия спецификации ярлыков приложений, которой соответствует этот файл
Version=1.0

# Название приложения
Name=jDownloader

# Комментарий, который может/будет использоваться в качестве подсказки
Comment=Программа для скачивания видео

# Путь к папке, в которой выполняется исполняемый файл
Path=/home/petr/apps/jd2/

# Исполняемый файл приложения, возможно с аргументами.
Exec=/home/petr/apps/jd2/JDownloader2

# Имя значка, который будет использоваться для отображения этого ярлыка
Icon=/home/petr/apps/jd2/themes/standard/org/jdownloader/images/updaterIcon100.png

# Описывает, должно ли это приложение запускаться в терминале или нет
Terminal=false

# Описывает категории, в которых должен отображаться этот ярлык
Categories=Network;
```

#### Категории

| Категория | Описание |
| --- | --- |
| AudioVideo | Приложение для воспроизведения, создания или обработки мультимедиа (аудио/видео) |
| Audio | Аудиоприложения |
| Video | Видеоприложения |
| Development | Приложения для разработки |
| Education | Образовательное ПО |
| Game | Игры |
| Graphics | Приложение для просмотра, создания или обработки графики |
| Network | Сетевые приложения |
| Office | Офисные приложения |
| Science | Научные приложения |
| Settings | Приложения настройки |
| System | Системные приложения |
| Utility | Полезности, "аксессуары" |

- [Источник](https://specifications.freedesktop.org/menu-spec/latest/apa.html)

#### Пример ярлычка Wine

```
[Desktop Entry]

# Имя
Name=VLC media player

# Префикс, команда wine, путь до ярлыка или до .exe
Exec=env WINEPREFIX="/home/petr/.wine" wine C:\\\\ProgramData\\\\Microsoft\\\\Windows\\\\Start\\ Menu\\\\Programs\\\\VideoLAN\\\\VLC\\ media\\ player.lnk

# Или
# Exec=env WINEPREFIX="/home/petr/.wine" wine '/home/petr/.wine/drive_c/Program Files/VideoLAN/VLC/vlc.exe'
# Или
# wine '/home/petr/.wine/drive_c/Program Files/VideoLAN/VLC/vlc.exe'

# Тип ярлыка
Type=Application

# Уведомление при запуске
StartupNotify=true

# Путь к папке, в которой выполняется исполняемый файл
Path=/home/petr/.wine/dosdevices/c:/Program Files/VideoLAN/VLC

#Значок
Icon=8127_vlc.0

#свойство для связи окна с приложением-владельцем
StartupWMClass=vlc.exe
```

#### Пример Веб-ярлычка

```
[Desktop Entry]

# Имя
Name=Альт-вики

# Команда для открытия сайта в браузере
URL=http://www.altlinux.org

# Тип ярлыка
Type=Link

#Значок
Icon=user-bookmarks
```

### Где хранятся файлы?

Эти файлы хранятся в каталоге

```
/usr/share/applications/
```

для приложений, установленных в системе или

- в
```
~/.local/share/applications/
```

для пользовательских программ.

Пользовательские ярлыки имеют приоритет над системными.

#### Wine

Ярлыки Wine хранятся в

```
/home/%user%/.local/share/applications/wine/Programs
```

Если после Wine в меню много ненужных ярлыков перейдите в указанную папку и удалите ненужный ярлык — после этого он пропадет в меню.

##### Как поместить ярлык вместо "Прочего" в категорию "Wine"

При создании ярлычка с Wine ярлычок попадает в категорию "Прочее", даже если Вы укажете категорию "Wine". Чтобы добавить ярлычок в вышеуказанную категорию, нужно проделать следующее.

Предположим, у Вас desktop-файл с Wine программой лежит в следующем каталоге:

```
/home/%user%/.local/share/applications/wine/Programs/dmaster2/Download Master.desktop
```

Для него нужно создать файл меню.

Для этого идем в следующий каталог:

```
/home/%user%/.config/menus/applications-merged
```

И создаем файл с произвольным именем с расширением \*.menu. (Хотя обычно, автоматически, присваивается имя типа **wine-Programs-Download Master-Download Master.menu**)

Файл.menu представляет из себя следующий файл:

```
<!DOCTYPE Menu PUBLIC "-//freedesktop//DTD Menu 1.0//EN"
"http://www.freedesktop.org/standards/menu-spec/menu-1.0.dtd">
<Menu>
  <Name>Applications</Name>
  <Menu>
    <Name>wine-wine</Name>
    <Directory>wine-wine.directory</Directory>
      <Menu>
         <Name>wine-Programs</Name>
         <Directory>wine-Programs.directory</Directory>
           <Menu>
             <Name>wine-Programs-dmaster2</Name>
             <Directory>wine-Programs-dmaster2.directory</Directory>
               <Include>
                 <Filename>wine-Programs-dmaster2-Download Master.desktop</Filename>
               </Include>
           </Menu>
      </Menu>
  </Menu>
</Menu>
```

В этом файле древообразно прописывается структура каталогов меню Wine и указывается ярлык запуска. После сохранения файла в меню ярлычок для Wine должен появиться в соответствующем разделе.