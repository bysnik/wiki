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

## Мои, вроде как, успешные потуги по сборке последней версии

Тут описаны мои потуги по сборке последней версии ZeroTierOne для Альт Линукс П11 (версия 1.16.0 на момент написания статьи).

1. Устновка необходимых пакетов (скорее всего тут перечислены не все)

```bash
apt-get install rpmdevtools rpm-build gcc-c++ git-core gem-ronn-ng gem-ronn ronn libstdc++-devel libminiupnpc-devel rust rust-cargo udev-rules clang libssl-devel libminiupnpc-devel
```

2. Не знаю почему, но я не использовал GEAR, так что собирал чисто с помощью rpmbuild. Подготавливаем дерево каталогов для сборки:

```bash
rpmdev-setuptree
```

3. Просто куда-нибудь клонируем два репозитория: один с исходниками и готовой спекой для 1.12 версии, и второй - последняя версия от разработчиков:

```bash
git clone http://git.altlinux.org/gears/z/zerotier-one.git

git clone https://github.com/zerotier/ZeroTierOne.git
```

4. Переходим в директорию с 1.12 версией и начинаем шаманить:

```bash
cd zerotier-one
```

- Редактируем спеку, меняем только версию (можно ещё changelog написать, если охота):

```spec
Version: 1.16.0
```

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
cd zerotier-one-development/zeroidc
```

- Генерируем директорию vendor:

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

- После клонирования должна быть директория ZeroTierOne. Переименовываем её:

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
Эта инструкция далеко не истина в последней инстанции. Собирал по наитию, как ёжик в тумане. Я вообще устанавливал этот пакет поверх уже установленной версии 1.12.2, и вот что плохое у меня случилось:
1. Вроде как, консольные утилиты раньше можно было использовать не под рутом, а теперь они работают только под рутом (по хорошему перепроверить бы, память уже подводит) ).
2. После обновления, ztncui, не смотря на то, что увидел zerotier, выдает ошибку HTTPError: Response code 404 (Not Found), но при этом ZeroTier version 1.16.0 он определяет. Вот за это всё-таки обидно.

P.S. по пункту 2:

Открыл я тут ZeroTier Release Notes 2025-08-21 -- Version 1.16.0 и вот что тут написано: ```The network controller (`controller/`) is now under a commercial source-available license. Default binary builds no longer contain the controller.```

То есть, он теперь идёт отдельно и не поставляется вместе с клиентом, который я собирал. Ну, теперь хотя бы понятно, почему вебморда контроллера не работает как надо)

Но при этом у меня продолжила спокойно работать сеть, созданная на сайте zerotier.com, панель управления увидила, что у меня последняя версия.

P.S.2 по пункту 2:

Контроллер по-прежнему существует в основном репозитории ZeroTierOne, но теперь находится в подкаталоге: ZeroTierOne/nonfree/controller/

Для некоммерческого использования: можно попробовать собрать из исходников с `ZT_NONFREE=1`. (`git clone https://github.com/zerotier/ZeroTierOne.git && cd ZeroTierOne && make ZT_NONFREE=1 && sudo ./zerotier-one -D /var/lib/zerotier-one-controller` (насчёт последней команды запуская я не уверен) Возможно попробую потом на чистой машине это сделать)
:::

В принципе, я считаю, что шалость удалась. Вот сама собранная rpm`ка если кому надо: [zerotier-one-1.16.0-alt1.x86_64.rpm](https://raw.githubusercontent.com/bysnik/wiki/main/rpms/zerotier-one-1.16.0-alt1.x86_64.rpm)

## Desktop UI

Соберём и сделаем автозапуск графического интерфейса, который будет висеть в трее. С помощью него можно подключаться к сетям и чёт там настраивать.

1. Клонируем репозиторий:
```bash
git clone https://github.com/zerotier/DesktopUI.git
```

2. Переходим в корень склонированного репозитория. Дальше я никуда перемещаться не буду. Все пути будут описаны от этой точки.
```bash
cd DesktopUI
```

3. Устанавливаем необходимые пакеты:
```bash
apt-get install meson ninja-build libgtk+3-devel pkg-config libayatana-appindicator3-devel
```

4. Редактируем файл `tray/Makefile` строки 24 и 25:
```Makefile
TRAY_CFLAGS := $(OPT_FLAGS) -DTRAY_APPINDICATOR=1 $(shell pkg-config --cflags ayatana-appindicator3-0.1) -std=c99
TRAY_LDFLAGS := $(shell pkg-config --libs ayatana-appindicator3-0.1)
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

### Немного ИИ шаманства

За эту работу пока что не ручаюсь, ибо это просто черновик)

Ниже приведён пример **полноценного `.spec` файла**, который учитывает все шаги, включая патчи под `ayatana-appindicator`, сборку через `make`, установку бинарника и создание systemd user unit.

#### `zerotier-desktop-ui.spec`

```spec
# Замените на актуальную версию, если известна
%global commit 0000000000000000000000000000000000000000
%global shortcommit %(echo %{commit} | cut -c1-7)

Name:           zerotier-desktop-ui
Version:        1.8.3
Release:        alt1
Summary:        ZeroTier Desktop UI — system tray application for managing ZeroTier networks

License:        GPL-3.0-or-later
URL:            https://github.com/zerotier/DesktopUI
Source0:        https://github.com/zerotier/DesktopUI/archive/%{commit}/%{name}-%{shortcommit}.tar.gz

# Build dependencies
BuildRequires:  meson
BuildRequires:  ninja-build
BuildRequires:  pkgconfig(gtk+-3.0)
BuildRequires:  pkgconfig(ayatana-appindicator3-0.1)
BuildRequires:  rust
BuildRequires:  cargo

# Runtime dependencies
Requires:       zerotier-one
Requires:       libayatana-appindicator3

# Патчи для совместимости с Ayatana AppIndicator
Patch0:         use-ayatana-appindicator.patch

%description
ZeroTier Desktop UI is a system tray application that allows you to manage ZeroTier networks
from your desktop environment. This RPM builds the UI with Ayatana AppIndicator support.

%prep
%autosetup -n DesktopUI-%{commit}

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
%license LICENSE
%{_bindir}/zerotier_desktop_ui
%{_userunitdir}/zerotier-desktop-ui.service

%changelog
* Mon Oct 01 2025 Your Name <your@email.com> - 1.8.3-alt1
- Initial RPM package for ZeroTier Desktop UI with Ayatana AppIndicator support
```

---

#### Структура сопутствующих файлов

Вам понадобится создать **патч**, который автоматизирует изменения, описанные в шагах 4–6.

##### `use-ayatana-appindicator.patch`

```diff
diff --git a/tray/Makefile b/tray/Makefile
index xxxxxxx..yyyyyyy 100644
--- a/tray/Makefile
+++ b/tray/Makefile
@@ -21,8 +21,8 @@ OPT_FLAGS := -O2 -g -Wall -Wextra -Werror
 # For AppIndicator support
 TRAY_CFLAGS := $(OPT_FLAGS) -DTRAY_APPINDICATOR=1 $(shell pkg-config --cflags appindicator3-0.1) -std=c99
 TRAY_LDFLAGS := $(shell pkg-config --libs appindicator3-0.1)
+TRAY_CFLAGS := $(OPT_FLAGS) -DTRAY_APPINDICATOR=1 $(shell pkg-config --cflags ayatana-appindicator3-0.1) -std=c99
+TRAY_LDFLAGS := $(shell pkg-config --libs ayatana-appindicator3-0.1)
 
 # Default target
 all: tray
diff --git a/tray/tray.h b/tray/tray.h
index xxxxxxx..yyyyyyy 100644
--- a/tray/tray.h
+++ b/tray/tray.h
@@ -31,7 +31,7 @@
 #ifdef TRAY_APPINDICATOR
-#include <libappindicator/app-indicator.h>
+#include <libayatana-appindicator/app-indicator.h>
 #endif
 
 struct tray_menu;
diff --git a/build.rs b/build.rs
index xxxxxxx..yyyyyyy 100644
--- a/build.rs
+++ b/build.rs
@@ -14,7 +14,7 @@ fn main() {
     if cfg!(target_os = "linux") {
         if cfg!(feature = "appindicator") {
-            println!("cargo:rustc-link-lib=dylib=appindicator3");
+            println!("cargo:rustc-link-lib=dylib=ayatana-appindicator3");
         }
     }
 }
```

> 💡 **Примечание**: точные строки могут отличаться — убедитесь, что патч корректно применяется. Можно сгенерировать его командой `diff -u` после внесения изменений.

---

#### Дополнительно: systemd unit

Создайте папку `packaging/systemd/` в корне исходников и поместите туда:

##### `packaging/systemd/zerotier-desktop-ui.service`

```ini
[Unit]
Description=ZeroTier Desktop UI
After=graphical-session.target
PartOf=graphical-session.target

[Service]
Type=simple
ExecStart=%{_bindir}/zerotier_desktop_ui
Restart=on-failure
RestartSec=5
Environment=DISPLAY=:0
Environment=XDG_RUNTIME_DIR=/run/user/%U

[Install]
WantedBy=default.target
```

> В `.spec` файле используется макрос `%{_userunitdir}`, который в Fedora/RHEL обычно раскрывается в `/usr/lib/systemd/user`.

---

#### Как собрать RPM

1. Установите зависимости:
   ```bash
   sudo apt-get install rpm-build meson ninja-build gtk3-devel libayatana-appindicator3-devel rust cargo
   ```

2. Подготовьте дерево:
   ```bash
   mkdir -p ~/rpmbuild/{SOURCES,SPECS}
   cp zerotier-desktop-ui.spec ~/rpmbuild/SPECS/
   cp use-ayatana-appindicator.patch ~/rpmbuild/SOURCES/
   # Скачайте исходники (или используйте spectool -g)
   ```

3. Соберите:
   ```bash
   rpmbuild -ba ~/rpmbuild/SPECS/zerotier-desktop-ui.spec
   ```

---

#### Что делает этот пакет:

- Собирает UI с поддержкой **Ayatana AppIndicator** (актуально для Fedora, RHEL, openSUSE и др.)
- Устанавливает бинарник в `/usr/bin/`
- Устанавливает **systemd user unit** в `/usr/lib/systemd/user/`
- Пользователь может включить автозапуск командой:
  ```bash
  systemctl --user enable --now zerotier-desktop-ui.service
  ```

> ⚠️ Обратите внимание: пользователь должен быть в графической сессии (graphical session), и `XDG_RUNTIME_DIR` должен быть установлен (обычно это делает display manager).
