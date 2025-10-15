Пример простого RPM-пакета для **ALT Linux**, который устанавливает **обои рабочего стола** и может использоваться как **branding-пакет** (например, `mycompany-wallpapers`).

---

## Структура проекта

```
mycompany-wallpapers/
├── mycompany-wallpapers.spec
├── SOURCES/
│   └── wallpaper.jpg
└── README
```

---

## `mycompany-wallpapers.spec`

```spec
%define wallpaper_name mycompany-wallpaper.jpg
%define wallpaper_dir  /usr/share/backgrounds

Name:           mycompany-wallpapers
Version:        1.0
Release:        alt1
Summary:        MyCompany Branding Wallpapers
Group:          User Interface/Desktops
License:        Proprietary
Url:            https://mycompany.example.com/
BuildArch:      noarch

Source0:        wallpaper.jpg
Source1:        README

BuildRequires:  rpm-build

%description
Official wallpapers for MyCompany desktop branding.

%prep
%setup -T -c

%install
install -d -m 0755 %buildroot%wallpaper_dir
install -p -m 0644 %SOURCE0 %buildroot%wallpaper_dir/%wallpaper_name
install -p -m 0644 %SOURCE1 %buildroot%_datadir/doc/%name-%version/

%files
%doc %_datadir/doc/%name-%version/README
%wallpaper_dir/%wallpaper_name

%changelog
* Wed Oct 15 2025 Nikita Bystrov <bystrovno@basealt.ru> 1.0-alt1
- Initial branding wallpaper package
```

---

## Подготовка файлов

1. Положите ваше изображение в `SOURCES/wallpaper.jpg`.
2. Создайте `SOURCES/README` с кратким описанием (лицензия, автор и т.п.).

---

## Сборка пакета в ALT Linux

```bash
# Установите зависимости (если нужно)
apt-get install rpm-build
```
# Создайте структуру rpmbuild (если нет)
```bash
rpmdev-setuptree
```

Скопируйте spec и источники
```bash
cp mycompany-wallpapers.spec ~/RPM/SPECS/
cp SOURCES/* ~/RPM/SOURCES/
```

Соберите пакет
```bash
rpmbuild -ba ~/RPM/SPECS/mycompany-wallpapers.spec
```

Готовый RPM будет в `~/RPM/RPMS/noarch/`.

---

### Как использовать обои

После установки:

```bash
apt-get install ./mycompany-wallpapers-1.0-alt1.noarch.rpm
```

Файл окажется в:

```
/usr/share/backgrounds/mycompany-wallpaper.jpg
```

Пользователи (или системный администратор) могут указать его как обои через настройки рабочего стола (в GNOME, KDE, XFCE и т.д.).




