# Geckodriver

Прокси-сервер для использования клиентов, совместимых с W3C WebDriver, для взаимодействия с браузерами на основе Gecko.

Эта программа предоставляет HTTP API, описанный протоколом WebDriver , для связи с браузерами Gecko, такими как Firefox. Она преобразует вызовы в протокол удаленного доступа Marionette , выступая в качестве прокси между локальным и удаленным концами.

## Установка готового бинарника

Скачайте со страницы релизов: https://github.com/mozilla/geckodriver/releases

## Соборка пакета под Альт

1. Скачайте исходные коды в директорию `~/RPM/SOURCES/`:
```bash
wget https://github.com/mozilla/geckodriver/archive/refs/tags/v0.37.0.tar.gz
```

2. Создайте файл `~/RPM/SPECS/geckodriver.spec`

`geckodriver.spec`
```spec
Name:           geckodriver
Version:        0.37.0
Release:        alt1
Summary:        WebDriver implementation for Firefox
Group:          Development/Tools
License:        MPL-2.0
Url:            https://github.com/mozilla/geckodriver
Source0:        https://github.com/mozilla/geckodriver/archive/refs/tags/v%{version}/geckodriver-%{version}.tar.gz

BuildRequires:  rust
BuildRequires:  rust-cargo
BuildRequires:  gcc

%description
Geckodriver is a proxy for using W3C WebDriver-compatible clients to interact with Gecko-based browsers. It provides an HTTP API described by the WebDriver protocol to communicate with Gecko browsers, such as Firefox.

%prep
%setup -q -n geckodriver-%{version}

%build
cargo build --release

%install
mkdir -p %buildroot%_bindir
install -m 0755 target/release/geckodriver %buildroot%_bindir/geckodriver

%files
%_bindir/geckodriver

%changelog
* Thu Jun 18 2026 bystrovno <bystrovno@basealt.ru> 0.37.0-alt1
- Initial build for ALT Linux
```

3. Соберите пакет:
```bash
rpmbuild -ba ~/RPM/SPECS/geckodriver.spec
```

4. Результат будет лежать в:
```bash
...
Wrote: /home/<user>/RPM/SRPMS/geckodriver-0.37.0-alt1.src.rpm (w2.lzdio)
Wrote: /home/<user>/RPM/RPMS/x86_64/geckodriver-0.37.0-alt1.x86_64.rpm (w2.lzdio)
Wrote: /home/<user>/RPM/RPMS/x86_64/geckodriver-debuginfo-0.37.0-alt1.x86_64.rpm (w2.lzdio)
```

::: warning Мой собранный пакет
- geckodriver-0.37.0: [geckodriver-0.37.0-alt1.x86_64.rpm](https://raw.githubusercontent.com/bysnik/wiki/main/rpms/geckodriver-0.37.0-alt1.x86_64.rpm)
:::