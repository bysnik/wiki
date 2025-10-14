# perl-DBD-Oracle

Тут мы кумекаем над данным пакетом

https://github.com/perl5-dbi/DBD-Oracle

https://github.com/perl5-dbi/DBD-Oracle/archive/refs/tags/v1.91_2.tar.gz

https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html?spm=a2ty_o01.29997173.0.0.6f79c921eTugMg

___

1. Подготовка окружения

1.1 Убедись, что установлены базовые зависимости:
```bash
apt-get install perl perl-devel perl-DBI gcc make rpm-build
```

1.2 Установи Oracle Instant Client (минимум: Basic + SDK)

Скачай с [официального сайта Oracle](https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html):

- `oracle-instantclient-basic-*.rpm`
- `oracle-instantclient-devel-*.rpm`

Установи их:
```bash
rpm -ivh oracle-instantclient-basic-*.rpm
rpm -ivh oracle-instantclient-devel-*.rpm
```

1.3 Настрой переменные окружения (временно для сборки):

```bash
export ORACLE_HOME=/usr/lib/oracle/<версия>/client64
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:$LD_LIBRARY_PATH
export PATH=$ORACLE_HOME/bin:$PATH
```

Замени `<версия>` на актуальную (например, `21.13`).

Проверь, что `sqlplus` работает:
```bash
sqlplus /nolog
```

2. Получение исходников DBD::Oracle

```bash
wget https://github.com/perl5-dbi/DBD-Oracle/archive/refs/tags/v1.91_2.tar.gz
tar -xzf v1.91_2.tar.gz
cd DBD-Oracle-1.91_2
```

3. Сборка Perl-модуля (локально, для проверки)

```bash
perl Makefile.PL
make
make test
```

Если сборка прошла успешно — можно переходить к созданию `.spec`-файла.


4. Создание `.spec`-файла для АЛЬТ ЛИНУКС

Создай файл `perl-DBD-Oracle.spec` в `~/RPM/SPECS/`:

```spec
Name: perl-DBD-Oracle
Version: 1.91
Release: alt2
Summary: Oracle database driver for the Perl DBI
License: Artistic 1.0 or GPL
Group: Development/Perl
Url: https://metacpan.org/release/DBD-Oracle
Source0: https://github.com/perl5-dbi/perl-DBD-Oracle/archive/refs/tags/v%{version}_%(echo %{release} | cut -d_ -f2).tar.gz

BuildRequires: perl perl-devel perl-DBI gcc make
Requires: perl-DBI, oracle-instantclient-basic

%description
DBD::Oracle is a Perl module which works with the DBI module to provide
access to Oracle databases.

%prep
%setup -q -n DBD-Oracle-%{version}_%(echo %{release} | cut -d_ -f2).tar.gz

%build
perl Makefile.PL INSTALLDIRS=vendor
make %{?_smp_mflags}

%install
make pure_install DESTDIR=%{buildroot}
find %{buildroot} -type f -name .packlist -exec rm -f {} \;
find %{buildroot} -depth -type d -exec rmdir {} 2>/dev/null \;

%files
%doc README* COPYRIGHT Changes
%{perl_vendorlib}/DBD/
%{perl_vendorarch}/auto/DBD/Oracle/

%changelog
* Tue Oct 14 2025 Nikita Bystrov <bystrovno@basealt.ru> 1.91-alt2
- Initial build for ALT Linux from v1.91_2
```

5. Сборка RPM

Помести `.spec` в `~/RPM/SPECS/`, а архив — в `~/RPM/SOURCES/`.

Запусти сборку:
```bash
rpmbuild -ba ~/RPM/SPECS/perl-DBD-Oracle.spec
```

Можно также попробовать упаковать:
- oracle-instantclient-basic
- oracle-instantclient-basiclite
- oracle-instantclient-sqlplus
- oracle-instantclient-devel
- oracle-instantclient-jdbc
- oracle-instantclient-odbc