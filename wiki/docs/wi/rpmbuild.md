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




