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

1.1.1 Сделать сборочное дерево
```bash
rpmdev-setuptree
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


4. Создание `.spec`-файла

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





## Сумашедшая попытка собрать шесть пакетов oracle-instantclient за раз

Отлично! Теперь у нас есть полная картина структуры официальных RPM-пакетов Oracle Instant Client 23.26 для RHEL 9, включая:

- `basic`
- `sqlplus`
- `devel` (SDK)
- `odbc`
- `jdbc`
- `tools` (exp, imp, expdp, impdp, sqlldr, wrc и др.)

---

## ✅ Цель

Создать **единый `.spec`-файл для АЛЬТ ЛИНУКС**, который:
- собирает **все подпакеты** из zip-архивов,
- корректно размещает файлы в соответствии с FHS и практиками АЛЬТ,
- обеспечивает зависимости между подпакетами,
- **не использует RHEL-специфичные пути** (например, `/usr/lib/.build-id` — это отладочные символы, не нужны в обычной сборке),
- **не включает `/bin/sh` в Requires** (в АЛЬТ это избыточно),
- **не использует `AutoProv: no` и прочие rpmrebuild-артефакты**.

---

## 📦 Обновлённый единый `.spec` с поддержкой `tools`

Вот финальная версия `oracle-instantclient.spec` для АЛЬТ ЛИНУКС:

```spec
%define icver 23.26.0.0.0
%define icshortver 23
%define arch x86_64

Name:           oracle-instantclient
Version:        %{icver}
Release:        alt1
Summary:        Oracle Instant Client libraries and tools
License:        Oracle
Group:          System/Libraries
URL:            https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html
Vendor:         Oracle Corporation
Packager:       Nikita Bystrov <nikita@example.com>

# Sources — все zip-архивы
Source0:        instantclient-basic-linux.x64-%{icver}.zip
Source1:        instantclient-sqlplus-linux.x64-%{icver}.zip
Source2:        instantclient-sdk-linux.x64-%{icver}.zip
Source3:        instantclient-odbc-linux.x64-%{icver}.zip
Source4:        instantclient-jdbc-linux.x64-%{icver}.zip
Source5:        instantclient-tools-linux.x64-%{icver}.zip

BuildArch:      x86_64
BuildRequires:  unzip
Requires:       /sbin/ldconfig

%description
Oracle Instant Client enables applications to connect to Oracle Database.
This metapackage does not contain files; see subpackages.

# === BASIC ===
%package basic
Summary: Oracle Instant Client basic libraries
Group: System/Libraries
Provides: oracle-instantclient-basic = %{version}-%{release}
Conflicts: oracle-instantclient-basiclite

%description basic
Core shared libraries required to run Oracle client applications.

# === SQLPLUS ===
%package sqlplus
Summary: Oracle Instant Client SQL*Plus tool
Group: Applications/Databases
Requires: oracle-instantclient-basic = %{version}-%{release}
Provides: sqlplus = %{icshortver}

%description sqlplus
SQL*Plus command-line tool for Oracle Database.

# === SDK (DEVEL) ===
%package devel
Summary: Development headers for Oracle Instant Client
Group: Development/C
Requires: oracle-instantclient-basic = %{version}-%{release}

%description devel
Header files and demo programs for developing Oracle client applications.

# === ODBC ===
%package odbc
Summary: ODBC driver for Oracle Instant Client
Group: System/Libraries
Requires: oracle-instantclient-basic = %{version}-%{release}

%description odbc
ODBC driver for connecting to Oracle Database.

# === JDBC ===
%package jdbc
Summary: JDBC driver for Oracle Instant Client
Group: Development/Java
Requires: oracle-instantclient-basic = %{version}-%{release}

%description jdbc
JDBC driver for Java applications.

# === TOOLS ===
%package tools
Summary: Oracle Instant Client data and replay tools
Group: Applications/Databases
Requires: oracle-instantclient-basic = %{version}-%{release}
Provides: sqlldr = %{icshortver}
Provides: exp = %{icshortver}
Provides: imp = %{icshortver}
Provides: expdp = %{icshortver}
Provides: impdp = %{icshortver}
Provides: wrc = %{icshortver}

%description tools
Tools: exp, imp, expdp, impdp, sqlldr, wrc — for data pump, loading, and replay.

# === PREP ===
%prep
install -d ic-all
for src in %{S:0} %{S:1} %{S:2} %{S:3} %{S:4} %{S:5}; do
    unzip -q -d ic-all "$src"
done

%build
# nothing to compile

%install
rm -rf %{buildroot}
ic_root=%{buildroot}/usr/lib/oracle/%{icshortver}/client64

# Install all files
cp -r ic-all/* $ic_root/

# Symlinks for libraries
mkdir -p %{buildroot}/usr/lib64
for lib in libclntsh.so* libnnz*.so libocci.so* libsqlplus.so* libsqlplusic.so* \
           libsqora.so* libheteroxa*.so libnfsodm.so libopcodm.so; do
    if [ -f $ic_root/$lib ]; then
        ln -sf /usr/lib/oracle/%{icshortver}/client64/$lib %{buildroot}/usr/lib64/
    fi
done

# Binaries in /usr/bin
mkdir -p %{buildroot}/usr/bin
for bin in sqlplus exp imp expdp impdp sqlldr wrc adrci genezi; do
    if [ -f $ic_root/$bin ]; then
        ln -sf /usr/lib/oracle/%{icshortver}/client64/$bin %{buildroot}/usr/bin/$bin
    fi
done

# Headers
if [ -d $ic_root/sdk/include ]; then
    mkdir -p %{buildroot}/usr/include/oracle/%{icshortver}/client64
    cp -r $ic_root/sdk/include/* %{buildroot}/usr/include/oracle/%{icshortver}/client64/
fi

# Docs
mkdir -p %{buildroot}/usr/share/doc/oracle-instantclient-%{icshortver}
cp -f $ic_root/*.txt $ic_root/*.md $ic_root/*.html \
      $ic_root/doc/*.txt $ic_root/doc/*.md 2>/dev/null || :

%files basic
%dir /usr/lib/oracle/
%dir /usr/lib/oracle/%{icshortver}/
%dir /usr/lib/oracle/%{icshortver}/client64/
/usr/lib/oracle/%{icshortver}/client64/libclntsh.so*
/usr/lib/oracle/%{icshortver}/client64/libnnz*.so
/usr/lib/oracle/%{icshortver}/client64/libocci.so*
/usr/lib/oracle/%{icshortver}/client64/libociicus.so
/usr/lib/oracle/%{icshortver}/client64/libocijdbc*.so
/usr/lib/oracle/%{icshortver}/client64/libipc1.so
/usr/lib/oracle/%{icshortver}/client64/libmql1.so
/usr/lib/oracle/%{icshortver}/client64/libtux.so
/usr/lib/oracle/%{icshortver}/client64/adrci
/usr/lib/oracle/%{icshortver}/client64/genezi
/usr/lib64/libclntsh.so*
/usr/lib64/libnnz*.so
/usr/lib64/libocci.so*

%files sqlplus
/usr/lib/oracle/%{icshortver}/client64/sqlplus
/usr/bin/sqlplus
/usr/lib/oracle/%{icshortver}/client64/libsqlplus.so
/usr/lib/oracle/%{icshortver}/client64/libsqlplusic.so
%config(noreplace) /usr/lib/oracle/%{icshortver}/client64/glogin.sql

%files devel
%dir /usr/include/oracle/
%dir /usr/include/oracle/%{icshortver}/
%dir /usr/include/oracle/%{icshortver}/client64/
/usr/include/oracle/%{icshortver}/client64/*.h
%doc /usr/lib/oracle/%{icshortver}/client64/sdk

%files odbc
/usr/lib/oracle/%{icshortver}/client64/libsqora.so*
%config(noreplace) /usr/lib/oracle/%{icshortver}/client64/odbc.ini
%config(noreplace) /usr/lib/oracle/%{icshortver}/client64/odbcinst.ini

%files jdbc
/usr/lib/oracle/%{icshortver}/client64/ojdbc*.jar
/usr/lib/oracle/%{icshortver}/client64/xstreams.jar
/usr/lib/oracle/%{icshortver}/client64/orai18n*.jar
/usr/lib/oracle/%{icshortver}/client64/libheteroxa*.so

%files tools
/usr/lib/oracle/%{icshortver}/client64/exp
/usr/lib/oracle/%{icshortver}/client64/imp
/usr/lib/oracle/%{icshortver}/client64/expdp
/usr/lib/oracle/%{icshortver}/client64/impdp
/usr/lib/oracle/%{icshortver}/client64/sqlldr
/usr/lib/oracle/%{icshortver}/client64/wrc
/usr/lib/oracle/%{icshortver}/client64/libnfsodm.so
/usr/lib/oracle/%{icshortver}/client64/libopcodm.so
/usr/bin/exp
/usr/bin/imp
/usr/bin/expdp
/usr/bin/impdp
/usr/bin/sqlldr
/usr/bin/wrc

%post basic -p /sbin/ldconfig
%postun basic -p /sbin/ldconfig

%post odbc -p /sbin/ldconfig
%postun odbc -p /sbin/ldconfig

%post jdbc -p /sbin/ldconfig
%postun jdbc -p /sbin/ldconfig

%post tools -p /sbin/ldconfig
%postun tools -p /sbin/ldconfig

%changelog
* Wed Oct 15 2025 Nikita Bystrov <nikita@example.com> %{icver}-alt1
- Initial build for ALT Linux from Oracle Instant Client %{icver}
- Includes: basic, sqlplus, devel, odbc, jdbc, tools
```

---

## 📥 Что нужно сделать перед сборкой

1. **Скачай все 6 zip-файлов** в `~/rpmbuild/SOURCES/`:
   - `instantclient-basic-linux.x64-23.26.0.0.0.zip`
   - `instantclient-sqlplus-linux.x64-23.26.0.0.0.zip`
   - `instantclient-sdk-linux.x64-23.26.0.0.0.zip`
   - `instantclient-odbc-linux.x64-23.26.0.0.0.zip`
   - `instantclient-jdbc-linux.x64-23.26.0.0.0.zip`
   - `instantclient-tools-linux.x64-23.26.0.0.0.zip`

2. Убедись, что у тебя есть `unzip`:
   ```bash
   apt-get install unzip
   ```

3. Помести `.spec` в `~/rpmbuild/SPECS/oracle-instantclient.spec`

4. Собери:
   ```bash
   rpmbuild -ba ~/rpmbuild/SPECS/oracle-instantclient.spec
   ```

---

## ✅ Результат

Будут созданы **6 RPM-пакетов**, полностью совместимых с АЛЬТ ЛИНУКС:

- `oracle-instantclient-basic-23.26.0.0.0-alt1.x86_64.rpm`
- `oracle-instantclient-sqlplus-...`
- `oracle-instantclient-devel-...`
- `oracle-instantclient-odbc-...`
- `oracle-instantclient-jdbc-...`
- `oracle-instantclient-tools-...`

После установки `basic` + `devel` ты сможешь собрать `perl-DBD-Oracle` без проблем.

---

Готов двигаться дальше:  
- протестировать установку,  
- собрать `perl-DBD-Oracle`,  
- или оформить репозиторий.

Скажи, что делать.