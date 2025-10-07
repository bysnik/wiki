---
outline: deep
---

# ZeroTier

![](https://www.zerotier.com/wp-content/uploads/2025/01/Default-OG-Image.jpg)

ZeroTier — это программное обеспечение с открытым исходным кодом, предназначенное для создания виртуальных частных сетей (VPN) на основе концепции «сети как услуги» (Network as a Service). Оно позволяет объединять устройства, находящиеся в разных физических сетях и географических локациях, в одну логическую сеть, как если бы они были подключены к одному локальному коммутатору. Это особенно полезно для удалённой работы, распределённых команд, IoT-устройств или гибридных облачных инфраструктур, где требуется безопасное и прозрачное сетевое взаимодействие.

Архитектура ZeroTier основана на децентрализованной модели с использованием глобальной распределённой системы управления, называемой планетой (Planet). Планета — это набор публичных корневых серверов (roots), которые обеспечивают начальное обнаружение узлов и маршрутизацию между ними. Каждая сеть в ZeroTier идентифицируется 64-битным идентификатором и управляется через веб-интерфейс или API. Администратор может настраивать правила доступа, IP-адресацию, маршруты и другие параметры, не требуя сложной настройки на каждом клиенте.

Когда устройство (нода) подключается к сети ZeroTier, оно получает виртуальный сетевой интерфейс с собственным MAC- и IP-адресом. Весь трафик между узлами шифруется с использованием современных криптографических протоколов (на основе Curve25519, Salsa20 и Poly1305), что обеспечивает высокий уровень безопасности. ZeroTier использует технологию peer-to-peer (P2P): как только узлы обнаруживают друг друга через корневые серверы, они стремятся установить прямое соединение, минуя центральные серверы, что снижает задержки и нагрузку на инфраструктуру.

Если прямое P2P-соединение невозможно (например, из-за NAT или файрволов), ZeroTier автоматически переключается на ретрансляцию трафика через промежуточные реле-серверы (relays), обеспечивая работоспособность сети в любых условиях. При этом вся логика маршрутизации и авторизации остаётся прозрачной для пользователя — достаточно установить клиент и присоединиться к нужной сети по её идентификатору.

ZeroTier поддерживает все основные операционные системы — Windows, macOS, Linux, Android, iOS, а также может работать на маршрутизаторах и встраиваемых устройствах. Это делает его универсальным решением для создания защищённых и масштабируемых сетей без необходимости в сложной настройке традиционных VPN-серверов или специализированного оборудования.

Важно отметить, что, несмотря на использование централизованных компонентов (планеты и реле), ZeroTier сохраняет контроль за сетью в руках её владельца: администратор полностью управляет политиками доступа, а трафик между доверенными узлами остаётся зашифрованным и не подвержен вмешательству со стороны третьих лиц, включая саму компанию ZeroTier. Это сочетание простоты, безопасности и гибкости делает ZeroTier популярным выбором как для частных пользователей, так и для корпоративных сред.

::: tip
Ссылка на последнюю версю пакета для Альт Линукс https://git.altlinux.org/tasks/337183/build/100/x86_64/rpms/zerotier-one-1.12.2-alt1.x86_64.rpm

Сейчас последняя версия это 1.16.0, а для альта - 1.12.2, так как он был удалён из репозитория https://packages.altlinux.org/ru/sisyphus/srpms/zerotier-one/

Вот графический интерфейс контроллера: https://github.com/key-networks/ztncui

Вот графический интерфейс клиента: https://github.com/zerotier/DesktopUI
:::

## Сборка rpm-пакета ZeroTier-One

Тут описаны мои потуги по сборке последней версии ZeroTierOne для Альт Линукс П11 (версия 1.16.0 на момент написания статьи).

1. Устновка необходимых пакетов (скорее всего тут перечислены не все)

```bash
apt-get install rpmdevtools rpm-build gcc-c++ git-core gem-ronn-ng gem-ronn ronn libstdc++-devel libminiupnpc-devel rust rust-cargo udev-rules clang libssl-devel libminiupnpc-devel
```

2. Не знаю почему, но я не использовал `GEAR`, так что собирал чисто с помощью `rpmbuild`. Подготавливаем дерево каталогов для сборки:

```bash
rpmdev-setuptree
```

3. Просто куда-нибудь клонируем два репозитория: один с исходниками и готовой спекой для 1.12.2 версии, и второй - последняя версия от разработчиков:

```bash
git clone http://git.altlinux.org/gears/z/zerotier-one.git
```
```bash
git clone https://github.com/zerotier/ZeroTierOne.git
```

4. Переходим в директорию с 1.12.2 версией и начинаем шаманить:

```bash
cd zerotier-one
```

- Редактируем спеку, меняем только версию (можно ещё changelog написать, если охота):

```spec
Version: 1.16.0
```

::: warning
Для некоммерческого использования: в строку 58 добавляем параметр `ZT_NONFREE=1`:
```spec
%make_build ZT_USE_MINIUPNPC=1 ZT_NONFREE=1 one
```
При добавлении данного параметра должна произойти Non Free сборка, содержащая контролер, ранее же этот контроллер шёл в поставке свободно, теперь только так (подробнее об этом ниже).
:::

- Копируем спеку в директорию сборки:

```bash
cp zerotier-one.spec ~/RPM/SPECS/
```

- Создаем директорию:

```bash
mkdir -p zerotier-one-development-1.16.0
```

- Копируем какие-то растовские файлы:

```bash
cp -R zerotier-one/zeroidc zerotier-one-development-1.16.0/
```

- Проваливаемся в скопированные файлы:

```bash
cd zerotier-one-development-1.16.0/zeroidc
```

- Генерируем директорию `vendor`:

```bash
cargo vendor
```

- Переносим сгенерированную директорию:

```bash
mv ./vendor ../
```

Должна получиться следующая структура:

```bash
zerotier-one-development-1.16.0/
├── vendor
└── zeroidc
```

- Поднимаемся на уровень выше:

```bash
cd ..
```

- Архивируем директорию и сразу переносим её в нашу сборочницу:

```bash
tar cvf ~/RPM/SOURCES/zerotier-one-development-1.16.0.tar zerotier-one-development-1.16.0
```

5. Теперь работаем с исходниками.

```bash
cd ..
```

- После клонирования должна быть директория `ZeroTierOne`. Переименовываем её:

```bash
mv ZeroTierOne zerotier-one-1.16.0
```

- Архивируем директорию и сразу переносим её в нашу сборочницу:

```bash
tar cvf ~/RPM/SOURCES/zerotier-one-1.16.0.tar zerotier-one-1.16.0
```

6. Если всё сделано правильно и я нигде не ошибся при описании, то можно проводить сборку пакета:

```bash
rpmbuild -ba ~/RPM/SPECS/zerotier-one.spec
```

7. По завершению сборки должен появиться пакет `~/RPM/RPMS/x86_64/zerotier-one-1.16.0-alt1.x86_64.rpm`, который можно попробовать установить:

```bash
apt-get install ~/RPM/RPMS/x86_64/zerotier-one-1.16.0-alt1.x86_64.rpm
```

8. Проверьте его статус после установки (он не должен быть запущен) и действуйте дальше сами):

```bash
systemctl status zerotie-one
```

::: warning
Эта инструкция далеко не истина в последней инстанции. Собирал по наитию, как ёжик в тумане. А  устанавливал этот пакет я вообще поверх уже установленной версии 1.12.2, и вот что плохое у меня случилось:
1. После обновления, ztncui, не смотря на то, что увидел zerotier, выдает ошибку HTTPError: Response code 404 (Not Found), но при этом ZeroTier version 1.16.0 он определяет. Вот за это всё-таки обидно.

P.S. по пункту 2:

Открыл я тут ZeroTier Release Notes 2025-08-21 -- Version 1.16.0 и вот что тут написано: ```The network controller (`controller/`) is now under a commercial source-available license. Default binary builds no longer contain the controller.```

То есть, он теперь идёт отдельно и не поставляется вместе с клиентом, который я собирал. Ну, теперь хотя бы понятно, почему вебморда контроллера не работает как надо)

Но при этом у меня продолжила спокойно работать сеть, созданная на сайте zerotier.com, панель управления увидила, что у меня последняя версия.

P.S.2 по пункту 2:

Контроллер по-прежнему существует в основном репозитории ZeroTierOne, но теперь находится в подкаталоге: `ZeroTierOne/nonfree/controller/`

Для некоммерческого использования: можно попробовать собрать из исходников с `ZT_NONFREE=1`.
```bash 
make ZT_NONFREE=1
```
:::

В принципе, я считаю, что шалость удалась. Вот сама собранная rpm`ка (без контроллера) если кому надо: [zerotier-one-1.16.0-alt1.x86_64.rpm](https://raw.githubusercontent.com/bysnik/wiki/main/rpms/zerotier-one-1.16.0-alt1.x86_64.rpm)

Также, собрал Non Free версию: [zerotier-one-1.16.0-alt1.nf.x86_64.rpm](https://raw.githubusercontent.com/bysnik/wiki/main/rpms/zerotier-one-1.16.0-alt1.nf.x86_64.rpm)

## Desktop UI

Соберём и сделаем автозапуск графического интерфейса, который будет висеть в трее. С помощью него можно подключаться к сетям и чёт там настраивать.

::: warning
Была попытка сборка именно релиза 1.8.3, а не текущего состояния main ветки (6 октября 2025 года). Там у меня проблема с зависимостями, а именно `tauri-libappindicator-sys` требует именно `appindicator3` которого в Альте нет и ради которого делается патч (при сборке пакета).
:::

::: tip
Кстати, в репозитории уже несколько лет висит Pull Request на тоже самое, что мы тут патчим: https://github.com/zerotier/DesktopUI/pull/57
:::

::: warning
Для работы этого трея нужно, чтобы хотя бы единожды у пользователя, который запускает сервис, были права на sudo, потом их можно отключить. Иначе Вы увидите ошибку sudo (я тестил на чистой машине)
:::

### Сборка руками из исходников

1. Устанавливаем необходимые пакеты:
```bash
apt-get install meson ninja-build libgtk+3-devel pkg-config libayatana-appindicator3-devel
```
2. Клонируем репозиторий:
```bash
git clone https://github.com/zerotier/DesktopUI.git
```

::: tip
Кстати, без изменений этой инструкции, по состоянию на 6 октября 2025 года, можно собрать ветку 1.16.0 из этого же репозитория:
```bash
git clone -b 1.16.0 https://github.com/zerotier/DesktopUI.git
```
:::

3. Переходим в корень склонированного репозитория. Дальше я никуда перемещаться не буду. Все пути будут описаны от этой точки.
```bash
cd DesktopUI
```

4. Редактируем файл `tray/Makefile` строки 24 и 25:
```Makefile
TRAY_CFLAGS := $(OPT_FLAGS) -DTRAY_APPINDICATOR=1 $(shell pkg-config --cflags appindicator3-0.1) -std=c99
TRAY_LDFLAGS := $(shell pkg-config --libs appindicator3-0.1)
```

Необходимо заменить `appindicator3-0.1` на `ayatana-appindicator3-0.1`.

5. Редактируем файл `tray/tray.h` строку 34
```c
#include <libappindicator/app-indicator.h>
```

Необходимо заменить `libappindicator/app-indicator.h` на `libayatana-appindicator/app-indicator.h`

6. Редактируем файл `build.rs` строку 17:
```rust
println!("cargo:rustc-link-lib=dylib=appindicator3");
```

Необходимо заменить `appindicator3` на `ayatana-appindicator3`.

7. Начинаем процесс сборки:
```bash
make
```

8. Далее будет настраивать автозапуск. Переносим собранный бинарный файл:
```bash
mv ./target/debug/zerotier_desktop_ui /usr/local/bin/
```

9. Будем создавать пользовательский юнит systemd. Создаём директорию для юнитов (если её нет):
```bash
mkdir -p ~/.config/systemd/user
```

10. Создаём файл юнита:
```bash
nano ~/.config/systemd/user/zerotier-desktop-ui.service
```

11. Вставляем следующее содержимое:
```systemd
[Unit]
Description=ZeroTier Desktop UI
After=graphical-session.target
PartOf=graphical-session.target

[Service]
Type=simple
ExecStart=/usr/local/bin/zerotier_desktop_ui
Restart=on-failure
RestartSec=5
Environment=DISPLAY=:0
Environment=XDG_RUNTIME_DIR=/run/user/%U

[Install]
WantedBy=default.target
```

12. Перезагрузка конфигурации systemd для пользователя:
```bash
systemctl --user daemon-reload
```

13. Включение автозапуска:
```bash
systemctl --user enable zerotier-desktop-ui.service
```

14. Запустк сервиса:
```bash
systemctl --user start zerotier-desktop-ui.service
```

### Собираем rpm-пакет

1. Клонируем репозиторий:
```bash
git clone https://github.com/zerotier/DesktopUI.git
```

::: tip
Кстати, без изменений этой инструкции, по состоянию на 6 октября 2025 года, можно собрать ветку 1.16.0 из этого же репозитория:
```bash
git clone -b 1.16.0 https://github.com/zerotier/DesktopUI.git
```
:::

2. Переименуйте директорию `DesktopUI` в `DesktopUI-1.8.3`:
```bash
mv DesktopUI DesktopUI-1.8.3
```

3. Создаём файл `zerotier-desktop-ui.spec`

```spec
Name:           zerotier-desktop-ui
Version:        1.8.3
Release:        alt1
Summary:        ZeroTier Desktop UI — system tray application for managing ZeroTier networks
Group:          Applications/Internet

License:        MPL-2.0
URL:            https://github.com/zerotier/DesktopUI

# Build dependencies
BuildRequires:  meson
BuildRequires:  ninja-build
BuildRequires:  pkgconfig(gtk+-3.0)
BuildRequires:  pkgconfig(ayatana-appindicator3-0.1)
BuildRequires:  rust

# Runtime dependencies
Requires:       zerotier-one

# Патчи для совместимости с Ayatana AppIndicator
Patch0:         use-ayatana-appindicator.patch

Source0:        %{name}-%{version}.tar

%description
ZeroTier Desktop UI is a system tray application that allows you to manage ZeroTier networks
from your desktop environment. This RPM builds the UI with Ayatana AppIndicator support.

%prep
%setup -q -n DesktopUI-%{version}

# Применяем патч для замены appindicator → ayatana-appindicator
%patch0 -p1

%build
# Сборка через make (внутри Makefile вызывается cargo и meson)
make %{?_smp_mflags}

%install
# Очистка
rm -rf %{buildroot}

# Установка бинарника
install -Dm755 target/debug/zerotier_desktop_ui \
    %{buildroot}%{_bindir}/zerotier_desktop_ui

# Установка systemd user unit
install -Dm644 packaging/systemd/zerotier-desktop-ui.service \
    %{buildroot}%{_userunitdir}/zerotier-desktop-ui.service

%files
%{_bindir}/zerotier_desktop_ui
%{_userunitdir}/zerotier-desktop-ui.service

%changelog
* Mon Oct 06 2025 Nikita Bystrov bystrovno@basealt.ru - 1.8.3-alt1
- Initial RPM package for ZeroTier Desktop UI with Ayatana AppIndicator support
```

4. Вам понадобится создать **патч**, который автоматизирует изменения, описанные в шагах 4–6 инструкции по ручной сборке:

- Распакуйте исходники релиза во временную директорию (или скопируйте директорию `DesktopUI-1.8.3`)
```bash
tar -xzf DesktopUI-1.8.3.tar.gz /tmp/DesktopUI-1.8.3
```
Или
```bash
cp DesktopUI-1.8.3/ /tmp/DesktopUI-1.8.3
```
- Перейдите в данную директорию
```bash
cd /tmp/DesktopUI-1.8.3
```

- Сохраните исходное состояние исходных файлов.

```bash
git init
```
```bash
git add .
```
```bash
git commit -m "original"
```

- Внесите нужные изменения **вручную**:

`tray/Makefile`:
Найдите строки с `appindicator3-0.1` и замените на `ayatana-appindicator3-0.1`:
```bash
sed -i 's/appindicator3-0.1/ayatana-appindicator3-0.1/g' tray/Makefile
```

`tray/tray.h`:
Замените заголовок:
```bash
sed -i 's|libappindicator/app-indicator.h|libayatana-appindicator/app-indicator.h|' tray/tray.h
```

`build.rs`:
Замените имя библиотеки:
```bash
sed -i 's/appindicator3/ayatana-appindicator3/' build.rs
```


- Сгенерируйте новый патч

```bash
git diff > ~/RPM/SOURCES/use-ayatana-appindicator.patch
```

- Проверьте патч

```bash
cd /tmp/DesktopUI-1.8.3
```
```bash
git reset --hard  # или удалите изменения
```
```bash
patch -p1 < ~/RPM/SOURCES/use-ayatana-appindicator.patch
```

Если нет ошибок — патч готов.

Должен получиться следующий патч `use-ayatana-appindicator.patch`:
```diff
diff --git a/build.rs b/build.rs
index a332a99..e6edaab 100644
--- a/build.rs
+++ b/build.rs
@@ -14,6 +14,6 @@ fn main() {
         println!("cargo:rustc-link-lib=dylib=gdk-3");
         println!("cargo:rustc-link-lib=dylib=gobject-2.0");
         println!("cargo:rustc-link-lib=dylib=glib-2.0");
-        println!("cargo:rustc-link-lib=dylib=appindicator3");
+        println!("cargo:rustc-link-lib=dylib=ayatana-appindicator3");
     }
 }
diff --git a/tray/Makefile b/tray/Makefile
index 2111412..2b6ed01 100644
--- a/tray/Makefile
+++ b/tray/Makefile
@@ -21,8 +21,8 @@ else ifeq ($(shell uname -s),Linux)
 	else
 		OPT_FLAGS := -Og
 	endif
-	TRAY_CFLAGS := $(OPT_FLAGS) -DTRAY_APPINDICATOR=1 $(shell pkg-config --cflags appindicator3-0.1) -std=c99
-	TRAY_LDFLAGS := $(shell pkg-config --libs appindicator3-0.1)
+	TRAY_CFLAGS := $(OPT_FLAGS) -DTRAY_APPINDICATOR=1 $(shell pkg-config --cflags ayatana-appindicator3-0.1) -std=c99
+	TRAY_LDFLAGS := $(shell pkg-config --libs ayatana-appindicator3-0.1)
 else ifeq ($(shell uname -s),Darwin)
 	RM=rm -f
 	LIB_NAME=libzt_desktop_tray.a
diff --git a/tray/tray.h b/tray/tray.h
index fe18fea..0ed4ffc 100644
--- a/tray/tray.h
+++ b/tray/tray.h
@@ -31,7 +31,7 @@ void tray_update(struct tray *tray);
 #if defined(TRAY_APPINDICATOR)
 
 #include <gtk/gtk.h>
-#include <libappindicator/app-indicator.h>
+#include <libayatana-appindicator/app-indicator.h>
 
 #define TRAY_APPINDICATOR_ID "tray-id"
```

5. Создайте папку `DesktopUI-1.8.3/packaging/systemd/` в корне исходников (не `/tmp` !) и поместите туда файл `DesktopUI-1.8.3/packaging/systemd/zerotier-desktop-ui.service`:

```systemd
[Unit]
Description=ZeroTier Desktop UI
After=graphical-session.target
PartOf=graphical-session.target

[Service]
Type=simple
ExecStart=/usr/bin/zerotier_desktop_ui
Restart=on-failure
RestartSec=5
Environment=DISPLAY=:0
Environment=XDG_RUNTIME_DIR=/run/user/%U

[Install]
WantedBy=default.target
```

6. Установите зависимости:
```bash
apt-get install rpm-build meson ninja-build gtk3-devel libayatana-appindicator3-devel rust cargo
```

7. Подготовьте сборочницу, перенеся все подготовленные файлы:
```bash
cp zerotier-desktop-ui.spec ~/RPM/SPECS/
```
```bash
cp use-ayatana-appindicator.patch ~/RPM/SOURCES/
```
```bash
tar cvf ~/RPM/SOURCES/zerotier-desktop-ui-1.8.3.tar DesktopUI-1.8.3/
```

8. Соберите:
```bash
rpmbuild -ba ~/RPM/SPECS/zerotier-desktop-ui.spec
```

В принципе, я считаю, что шалость2 удалась. Вот сама собранная rpm`ка (из ветки 1.16.0) если кому надо: [zerotier-desktop-ui-1.8.3-alt1.x86_64.rpm](https://raw.githubusercontent.com/bysnik/wiki/main/rpms/zerotier-desktop-ui-1.8.3-alt1.x86_64.rpm)

После установки пакета необходимо включить сервис:
```bash
systemctl --user enable --now zerotier-desktop-ui.service
```

## ztncui

::: tip
Так, я переписал спеку, теперь она даже собирается. [ztncui-0.8.14-alt1.x86_64.rpm](https://raw.githubusercontent.com/bysnik/wiki/main/rpms/ztncui-0.8.14-alt1.x86_64.rpm) Так, ну вроде пакет рабочий
:::


- Устанавливает приложение в `/opt/ztncui`
- Создаёт пользователя `ztncui`
- Управляет службой через systemd

1. Убедитесь, что установлены необходимые пакеты:

```bash
apt-get install rpm-build git nodejs npm gcc-c++ make python3
```

2. Также установите `node-gyp` глобально:

```bash
npm install -g node-gyp
```

3. Клонирование и упаковка исходного кода

```bash
cd /tmp
```
```bash
git clone https://github.com/key-networks/ztncui
```

4. Создаём архив исходников (имя должно соответствовать версии)
```bash
tar -czf ~/RPM/SOURCES/ztncui-0.8.14.tar.gz ztncui
```

5. Создайте файл `~/RPM/SPECS/ztncui.spec` со следующим содержимым:

```spec
Name:           ztncui
Version:        0.8.14
Release:        alt1
Summary:        ZeroTier Network Controller Web UI
License:        GPL-3.0-or-later
Group:          Applications/Internet

AutoReqProv: no

URL:            https://github.com/key-networks/ztncui

Source0: %{name}-%{version}.tar.gz

# Зависимости
Requires: nodejs >= 14
Requires: zerotier-one

BuildRequires: npm
BuildRequires: gcc-c++
BuildRequires: make

%description
ztncui is a web-based user interface for managing a standalone ZeroTier network controller.

%prep
%setup -q -n %{name}

%build
cd src
npm install --production

%install
rm -rf %{buildroot}

# Основная установка в /opt
install -d %{buildroot}/opt/%{name}
cp -r . %{buildroot}/opt/%{name}/

# Удаляем .git и ненужные файлы
rm -rf %{buildroot}/opt/%{name}/.git*

# Создаём конфигурационный каталог
install -d %{buildroot}/etc/%{name}
install -d %{buildroot}/var/lib/%{name}

# Создаём пользователя (через %pre, см. ниже)

# Systemd unit
install -d %{buildroot}%{_unitdir}
cat > %{buildroot}%{_unitdir}/%{name}.service << 'EOF'
[Unit]
Description=ZeroTier Network Controller UI
After=network.target zerotier-one.service

[Service]
Type=simple
User=ztncui
Group=ztncui
WorkingDirectory=/opt/ztncui/src
EnvironmentFile=-/opt/ztncui/src/.env
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

%pre
# Создаём пользователя, если не существует
getent group ztncui >/dev/null || groupadd -r ztncui
getent passwd ztncui >/dev/null || useradd -r -g ztncui -d /var/lib/ztncui -s /sbin/nologin ztncui
exit 0

# Копируем passwd, если не существует
if [ ! -f /opt/ztncui/src/etc/passwd ]; then
    cp -v /opt/ztncui/src/etc/default.passwd /opt/ztncui/src/etc/passwd
    chown ztncui:ztncui /opt/ztncui/src/etc/passwd
    chmod 600 /opt/ztncui/src/etc/passwd
fi

# Создаём .env, если не существует
if [ ! -f /opt/ztncui/src/.env ]; then
    ZT_TOKEN=$(cat /var/lib/zerotier-one/authtoken.secret 2>/dev/null || echo "YOUR_TOKEN_HERE")
    cat > /opt/ztncui/src/.env << EOF
ZT_TOKEN=$ZT_TOKEN
NODE_ENV=production
EOF
    chown ztncui:ztncui /opt/ztncui/src/.env
    chmod 600 /opt/ztncui/src/.env
fi

%files
%attr(755, root, root) /opt/%{name}
%dir %attr(755, root, root) /etc/%{name}
%{_unitdir}/%{name}.service
%dir %attr(755, ztncui, ztncui) /var/lib/%{name}

%changelog
* Mon Oct 06 2025 Nikita Bystrov bystrovno@basealt.ru - %{version}-%{release}
- Initial RPM package for ALT Linux
```

6. Сборка RPM:

```bash
rpmbuild -ba ~/RPM/SPECS/ztncui.spec
```

7. Если всё прошло успешно, RPM-пакет будет в:

```bash
ls -l ~/RPM/RPMS/x86_64/ztncui-0.8.14-alt1.x86_64.rpm
```

8. Установка и запуск:

```bash
apt-get install ~/RPM/RPMS/ztncui-0.8.14-alt1.x86_64.rpm

# Убедитесь, что ZeroTier запущен
sudo systemctl enable --now zerotier-one

# Запустите ztncui
sudo systemctl enable --now ztncui

# Проверьте статус
systemctl status ztncui
```

Доступ к веб-интерфейсу:

По умолчанию:
- HTTP на `http://localhost:3000`

Также в файл `/opt/ztncui/src/.env` можно добавить следующее:
- `HTTP_ALL_INTERFACES=yes` Приложение можно заставить прослушивать все интерфейсы для HTTP-запросов, установив `HTTP_ALL_INTERFACES` в `.env` файл.
- `HTTPS_PORT=3443`
- `HTTPS_HOST=12.34.56.78` Приложение можно заставить прослушивать на определенном интерфейсе HTTPS-запросов, указав `HTTPS_HOST (имя хоста или IP-адрес интерфейса)` в `.env` файл. Если `HTTPS_HOST` не указан, но указано `HTTPS_PORT`, то приложение будет прослушивать запросы HTTPS на всех интерфейсах.

Важные замечания

1. **authtoken.secret**: Пакет пытается автоматически прочитать токен из `/var/lib/zerotier-one/authtoken.secret`. Убедитесь, что `zerotier-one` установлен и запущен **до** установки `ztncui` (Нужно, чтобы `zerotier-one` был собран вместе с контроллером, иначе, очевидно, работать не будет).
2. **Обновления**: При обновлении пакета конфиги (`/opt/ztncui/src/.env`, `/opt/ztncui/src/passwd`) не перезаписываются благодаря `%config(noreplace)`.

Тестирование: Должен вернуть HTML-код страницы входа
```bash
curl http://localhost:3000
```



