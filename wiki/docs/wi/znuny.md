---
outline: deep
---

# Znuny OTRS

![](https://media.licdn.com/dms/image/v2/D4D12AQEkvB14kAEA1A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1689080388968?e=2147483647&v=beta&t=H2PcishkaF5cppDy5pkpwBUhSe2dY43ZQWnn0X8XDPY)

Znuny — это сообщество-ориентированная версия популярной системы управления запросами и инцидентами, изначально известной как OTRS (Open-source Ticket Request System). После того как оригинальный проект OTRS перешёл к коммерческой модели и ограничил функциональность бесплатной версии, сообщество разработчиков и пользователей создало Znuny как полностью открытый и свободный форк OTRS. Znuny сохраняет все ключевые возможности системы: управление тикетами, интеграцию с почтой, гибкие правила обработки обращений, поддержку SLA, а также расширенные возможности для настройки под нужды конкретной организации.

Znuny активно развивается сообществом и остаётся совместимым с большим количеством существующих модулей и расширений, созданных для OTRS. Это делает его привлекательным решением для компаний и ИТ-отделов, которым нужна надёжная, гибкая и бесплатная система поддержки без зависимости от коммерческих лицензий. Znuny можно развернуть как внутренний сервис поддержки, так и использовать для взаимодействия с клиентами — благодаря веб-интерфейсу, API и возможностям интеграции с другими системами.

## Установка версии 6.0.38 из репозитория

Для работы системы необходима база данных и веб-сервер, в примере используется `PostgreSQL` и `Apache`. Все команды необходимо выполнять с правами администратора системы.

Устанавливаем необходимые пакеты:
```bash
apt-get install perl-DBD-Pg otrs otrs-apache2
```

### Настройка сервера базы данных

Лично я всеми руками за `PostgreSQL`, но на всякий оставляю тут инструкцию и для `MySQL`.

#### Настройка PostgreSQL

Устанавливаем `PostgreSQL Server`:
```bash
apt-get install postgresql17-server
```

Создание конфигурационных файлов `PostgreSQL` и создание пароля администратора:
```bash
/etc/init.d/postgresql initdb
```

Запуск сервиса `postgresql`:
```bash
systemctl enable --now postgresql
```

#### Настройка MySQL

Устанавливаем `MySQL Server`:
```bash
apt-get install MySQL-server
```

В файл `/var/lib/mysql/my.cnf` добавляем директиву из файла-рекомедации: `max_allowed_packet=50M`

Включаем автостарт сервиса при загрузке системы и запускаем его:
```bash
systemctl enable --now mysqld
```

Для настройки безопасности после запуска `MySQL` необходимо выполнить скрипт
```bash
/usr/bin/mysql_secure_installation
```

Скрипт задаст Вам несколько вопросов. 
```bash
Skip root password for root 
#По умолчанию пароль для root пустой, поэтому просто нажмите Enter.

Install new password for root: security
#Задайте пароль для root
Do remove an anonymous user
#Удалим анонимного пользователя
Do not disallow remote connections
#Не запрещаем коннект к базе с удаленных серверов 
#(если, конечно, эта опция вам нужна, в другом случае, запретите ее)
Do remove a test database
#Тестовая база нам не нужна - удаляйте ее
Do reload the privileges
#Перегрузим привилегии для их активации
```

Пароль `root` от `MySQL`: используется тот что вы задали в предыдущем пункте

### Настройка Apache2

Включаем использование каталога с расширениями для `apache2`:
```bash
a2enextra httpd-addon.d
```

Кроме того, в пакете `apache2` присутствует `010-httpd-addon.d.conf`, содержащий `httpd-addon.d=no`, что приводит к отключению `httpd-addon.d` при запуске `a2chkconfig`. Следует переопределить это значение, например, так:
```bash
echo httpd-addon.d=yes > /etc/httpd2/conf/extra-start.d/999-otrs.conf
```

Не беда, если следующие шаги (блок `Дополнительные настройки`) вы выполнять не будете. Далее все эти моменты можно отследить на страницу "Admin Support Data Collector (Сбор данных для поддержки)" на странице Администрирования.

::: details Дополнительные настройки
Вообще, эта заррраза ругается на всякую фигню: ой ой, у тебя не установлен модуль `perl` для `Oracle DB` и `MS DB`, вот жешь ты плохой. У тебя не установлена поддержка китайских символов. Ну ты и хад! Ну и т.д.

![](https://www.meme-arsenal.com/memes/b23f273efb17fcd5536ef8eb129fbad7.jpg)

Да, плюсом там руготня про оптимизацию.

Так что ниже будут все доп моменты чтобы убрать все ошибки. КРОМЕ ОДНОЙ: Znuny не может определить Линукс - Он не знает про Альт(

Устанавливаем дополнительные компоненты:

```bash
apt-get install perl-CSS-Minifier-XS perl-Pg perl-JavaScript-Minifier-XS perl-NTLM perl-DBD-ODBC perl-ldap perl-Crypt-Random-Source perl-Encode-HanExtra
```

Активируем модули `apache2`:
```bash
a2enmod deflate
```
```bash
a2enmod filter
```
```bash
a2enmod headers
```

Установка `prefork MPM`:
```bash
apt-get install apache2-httpd-prefork
```

Удаление `worker MPM`:
```bash
apt-get remove apache2-httpd-worker
```

Проверка:
```bash
apachectl -V | grep -i mpm
```
:::

::: warning
На текущий момент мне осталось решить проблоемы с:
- Размер подкачки более 200МВ - Ну каапец
- Теоретически должен быть пакет Аля [perl-DBD-Oracle](oracle-dbd), но у Альта его нет

:::

Запускаем демон веб-сервера и устанавливаем его на автозапуск:
```bash
systemctl enable --now httpd2
```

### Первоначальные настройки

Открываем браузер, в адресную строку вводим `http://ip_вашего_сервера/otrs/installer.pl`, следуем инструкциям для инсталляции.


После входа будет видна ошибка, что демон `Cron` не запущен. Запуск `Cron`:

```bash
/var/www/webapps/otrs/bin/Cron.sh start otrs
```

## Клиенты

Ссылка для клиентов: `http://ip_вашего_сервера/otrs/customer.pl`


## Сборка RPM-пакета версии 7.2.3

::: tip
Это, на 14.10.2025г. последняя версия (дата выпуска: 2025-09-24)
:::

::: warning
Итак, после кучи тестов я жёстко дописал спеку, это новая версия пакетов

Вот ссылка на собранные пакеты: 
- otrs-7.2.3: [otrs-7.2.3-alt1.noarch.rpm](https://raw.githubusercontent.com/bysnik/wiki/main/rpms/otrs-7.2.3-alt1.noarch.rpm)
- otrs-apache2-7.2.3: [otrs-apache2-7.2.3-alt1.noarch.rpm](https://raw.githubusercontent.com/bysnik/wiki/main/rpms/otrs-apache2-7.2.3-alt1.noarch.rpm)
:::

1. Скачиваем архив с необходимой версией:
```bash
wget https://download.znuny.org/releases/znuny-7.2.3.tar.bz2
```

2. Переносим его в сборочнику:
```bash
mv znuny-7.2.3.tar.bz2 ~/RPM/SOURCE/
```

3. Клонируем репозиторий со старой версией:
```bash
git clone http://git.altlinux.org/gears/o/otrs.git
```

4. Переходим в этот репозиторий:
```bash
cd ./otrs
```

5. Редактируем файл `apache2.conf`:

Строку
```apache
Alias /otrs-web/ "/var/www/webapps/otrs/var/httpd/htdocs/"
```
меняем на
```apache
Alias /znuny-web/ "/var/www/webapps/otrs/var/httpd/htdocs/"
```

6. Переносим в сборочницу дополнительные файлы:
```bash
cp README.ALT.rus ~/RPM/SOURCES/
```
```bash
cp otrs-hold.conf ~/RPM/SOURCES/
```
```bash
cp apache2.conf ~/RPM/SOURCES/
```

7. Правим spec-файл и копируем его в сборочницу:
```bash
mv otrs.spec ~/RPM/SPECS/
```

::: details Обновлённая спека

УУУУ, очень сильно редактируем спеку:
```spec:line-numbers {6,26,69,70,83,84,112-117,119-122,154-161}
%define _unpackaged_files_terminate_build 1
%define installdir %webserver_webappsdir/%name
%define otrs_user otrs

Name: otrs
Version: 7.2.3
Release: alt1

Summary: Open source Ticket Request System Community Edition
Group: Networking/WWW
License: GPL-3.0-only
Url: https://www.znuny.org/en

Source0: https://download.znuny.org/releases/znuny-%version.tar.bz2
Source1: README.ALT.rus
Source2: otrs-hold.conf
Source3: apache2.conf

BuildArch: noarch

BuildRequires(pre): rpm-macros-webserver-common rpm-macros-apache2 >= 3.9

Requires: webserver-common 

# requires for perl
Requires: perl-CGI perl-DBI perl-DateTime perl-Template perl-Unicode-Collate perl-Moo perl-Archive-Tar perl-Archive-Zip perl-TimeDate perl-Net-DNS perl-YAML-LibYAML perl-CSS-Minifier-XS perl-Pg perl-JavaScript-Minifier-XS perl-NTLM perl-DBD-ODBC perl-ldap perl-Crypt-Random-Source perl-Encode-HanExtra perl-CSS-Minifier perl-JavaScript-Minifier perl-Data-UUID perl-Email-Valid perl-Crypt-PasswdMD5 perl-Pod-Strip perl-CPAN perl-Math-Random-Secure perl-Crypt-Eksblowfish perl-Crypt-SSLeay perl-JSON-XS perl-Mail-IMAPClient perl-IO-Socket-SSL perl-Text-CSV_XS perl-XML-LibXSLT perl-XML-Parser perl-CPAN-Meta perl-Spreadsheet-XLSX perl-DBD-mysql perl-DBD-Pg

%add_findreq_skiplist */bin/*
%add_findreq_skiplist */Kernel/*
%add_findreq_skiplist */scripts/*
%add_findreq_skiplist */examples/*

%description
OTRS is an Open source Ticket Request System (also well known
as trouble ticket system) with many features to manage customer
telephone calls and e-mails. The system is built to allow your
support, sales, pre-sales, billing, internal IT, helpdesk, e.t.c.
departments to react quickly to inbound inquiries.

This is the ((OTRS)) Community Edition Fork by Znuny GmbH

%package apache2
Summary: Apache 2.x web-server configuration for %name
Group: Networking/WWW
Requires: %name = %version-%release, apache2, apache2-mod_perl perl-Apache-DBI
%description apache2
Apache 2.x web-server configuration for %name

%prep
%setup -n znuny-%version

%install
# install apache config
install -pD -m0644 %SOURCE3 %buildroot%_sysconfdir/httpd2/conf/addon.d/A.%name.conf

# install apt's hold file
install -pD -m0644 %SOURCE2 %buildroot%_sysconfdir/apt/apt.conf.d/%name-hold.conf

# install otrs
mkdir -p %buildroot%installdir
cp -rp * %buildroot%installdir/

#install docs
install -pD -m0644 %SOURCE1 README.ALT.rus

#replace '/opt/otrs' to '/var/www/webapps/otrs' in all files
find %buildroot%installdir -type f -exec sed -i -e "s/\/opt\/otrs/\/var\/www\/webapps\/otrs/g" {} \;

# add use lib '/var/www/webapps/otrs'; in bin/cgi-bin/installer.pl
sed -i '/^use lib/a use lib "/var/www/webapps/otrs";' %buildroot%installdir/bin/cgi-bin/installer.pl

# remove files
find %buildroot%installdir -name '*.spec' -delete
find %buildroot%installdir -name '*.conf' -delete

#install default config
cp %buildroot%installdir/Kernel/Config.pm.dist %buildroot%installdir/Kernel/Config.pm
# cd %buildroot%installdir/Kernel/Config/
# for foo in *.dist; do cp $foo `basename $foo .dist`; done
cd %buildroot%installdir/var/cron/
for foo in *.dist; do cp $foo `basename $foo .dist`; done

# replace home path
sed -i "s|/opt/znuny|%installdir|g" %buildroot%installdir/Kernel/Config.pm

# all needed files packaged from %%builddir
rm -f %buildroot%installdir/ARCHIVE
rm -f %buildroot%installdir/AUTHORS.md
rm -f %buildroot%installdir/CHANGES.md
rm -f %buildroot%installdir/CONTRIBUTING.md
rm -f %buildroot%installdir/COPYING
rm -f %buildroot%installdir/COPYING-Third-Party
rm -f %buildroot%installdir/INSTALL.md
rm -f %buildroot%installdir/README.md
rm -f %buildroot%installdir/SECURITY.md
rm -f %buildroot%installdir/UPDATING.md
rm -f %buildroot%installdir/Custom/README

%pre
if id %otrs_user >/dev/null 2>&1; then
    # update groups
    usermod -g %webserver_group %otrs_user
    # update home dir
    usermod -d %installdir %otrs_user
else
   %_sbindir/useradd -r  -g %webserver_group -c 'OTRS User' -d %installdir -s '/dev/null' %otrs_user >/dev/null 2>&1 || :
fi

%post
cd %installdir/bin/

./znuny.SetPermissions.pl \
    --znuny-user=%otrs_user \
    --web-group=%webserver_group \
    --skip-regex="Config.pm" \
    %installdir || :
./Cron.sh start %otrs_user || :

# create symlink for Kernel Modules
if [ ! -e /opt/znuny ]; then
    ln -sf /var/www/webapps/otrs /opt/znuny || :
fi

%files
%doc AUTHORS.md
%doc CHANGES.md
%doc CONTRIBUTING.md
%doc COPYING
%doc COPYING-Third-Party
%doc INSTALL.md
%doc README.md
%doc README.ALT.rus
%doc SECURITY.md
%doc UPDATING.md
%doc Custom/README
%defattr(0775,root, %webserver_group)
%dir %installdir
%config(noreplace) %attr(0660,root,%webserver_group) %installdir/Kernel/Config.pm
#config(noreplace) %attr(0660,root,%webserver_group) %installdir/Kernel/Config/GenericAgent.pm
%installdir/Kernel
%installdir/bin
%installdir/scripts
%installdir/doc
%installdir/var
%installdir/i18n
%installdir/RELEASE

%config(noreplace) %attr(0644,root,root) %_sysconfdir/apt/apt.conf.d/%name-hold.conf

%files apache2
%config(noreplace) %attr(0644,root,root) %_sysconfdir/httpd2/conf/addon.d/A.%name.conf

%changelog
* Wed Oct 15 2025 Nikita Bystrov <bystrovno@basealt.ru> 7.2.3-alt1
- Updated to Znuny 7.2.3
- Added use lib '/var/www/webapps/otrs' to installer.pl for correct module loading
- Patched Kernel/Config.pm to use correct $Self->{Home}
- Added compatibility symlink /opt/znuny → /var/www/webapps/otrs in %post for Kernel Modules
- Adjusted file permissions via znuny.SetPermissions.pl in %post
- Kept package name 'otrs' for upgrade compatibility from OTRS 6.0.x
- Added most required Perl dependencies for Znuny 7.2.3; some may still require manual installation via CPAN

* Sun Oct 31 2021 Sergey Y. Afonin <asy@altlinux.org> 6.0.38-alt1
- New version

* Wed Sep 29 2021 Sergey Y. Afonin <asy@altlinux.org> 6.0.36-alt1
- New version
  the "((OTRS)) Community Edition Fork" by Znuny GmbH
- changed URL
- updated README.ALT.rus

* Mon Sep 27 2021 Sergey Y. Afonin <asy@altlinux.org> 6.0.30-alt1
- New version
  final release of "((OTRS)) Community Edition 6" from OTRS AG

* Fri May 21 2021 Anton Farygin <rider@altlinux.ru> 6.0.29-alt2
- removed all apache post scripts (they moved to filetriggers from apache2)

* Fri Aug 21 2020 Sergey Y. Afonin <asy@altlinux.org> 6.0.29-alt1
- New version
- updated License tag to SPDX syntax
- updated README.ALT.rus

* Fri Oct 25 2019 Sergey Y. Afonin <asy@altlinux.org> 6.0.23-alt1
- New version (ALT #37331)
- changed License (GAGPLv3 to GPLv3)
- updated Apache 2 configuration
- updated README.ALT.rus
- removed otrs-InnoDBLogFileSize.patch
- updated Requires
- removed Packager field

* Fri Nov 10 2017 Sergey Y. Afonin <asy@altlinux.ru> 5.0.23-alt1
- New version

* Thu May 04 2017 Sergey Y. Afonin <asy@altlinux.ru> 5.0.17-alt1
- New version
- added */examples/* to findreq_skiplist
- updated description for Apache 2.4 in README.ALT.rus

* Tue May 31 2016 Sergey Y. Afonin <asy@altlinux.ru> 5.0.10-alt1
- New version
- added description for Apache 2.4 to README.ALT.rus

* Mon Mar 14 2016 Sergey Y. Afonin <asy@altlinux.ru> 5.0.7-alt1
- New version

* Fri Feb 05 2016 Sergey Y. Afonin <asy@altlinux.ru> 5.0.6-alt1
- New version

* Fri Oct 23 2015 Sergey Y. Afonin <asy@altlinux.ru> 5.0.1-alt1
- New version
- updated otrs-InnoDBLogFileSize.patch
- updated README.ALT.rus

* Fri Oct 16 2015 Sergey Y. Afonin <asy@altlinux.ru> 4.0.13-alt1
- New version
- fixed otrs-hold.conf

* Wed Sep 16 2015 Sergey Y. Afonin <asy@altlinux.ru> 4.0.12-alt1
- New version
- added perl-Archive-Tar to Requires
- updated README.ALT.rus

* Mon Aug 03 2015 Sergey Y. Afonin <asy@altlinux.ru> 4.0.10-alt1
- New version
- added mpm_itk_module section to configuration of apache2

* Tue Jun 09 2015 Sergey Y. Afonin <asy@altlinux.ru> 4.0.8-alt1
- New version

* Sat Apr 25 2015 Sergey Y. Afonin <asy@altlinux.ru> 4.0.7-alt1
- New version

* Sat Nov 08 2014 Sergey Y. Afonin <asy@altlinux.ru> 3.3.10-alt1
- New version (ALT #30453)

* Tue Sep 02 2014 Sergey Y. Afonin <asy@altlinux.ru> 3.3.8-alt1
- New version

* Tue Mar 18 2014 Sergey Y. Afonin <asy@altlinux.ru> 3.3.5-alt2
- added to Requires: perl-Time-Piece

* Wed Mar 12 2014 Sergey Y. Afonin <asy@altlinux.ru> 3.3.5-alt1
- New version

* Fri May 17 2013 Sergey Y. Afonin <asy@altlinux.ru> 3.2.6-alt2
- added to Requires:
  perl-Term-ANSIColor perl-TimeDate perl-YAML-LibYAML
- added apt's hold file for the package otrs

* Fri May 17 2013 Sergey Y. Afonin <asy@altlinux.ru> 3.2.6-alt1
- New version (ALT #28490)

* Sun Mar 10 2013 Sergey Y. Afonin <asy@altlinux.ru> 3.2.2-alt1
- New version
- disabled doc-admin-de-pdf subpackage (missed in this release)

* Tue Oct 09 2012 Sergey Y. Afonin <asy@altlinux.ru> 3.1.10-alt1
- New version
   Warning: OTRS 3.1 supports only UTF-8 as internal character set.
            Non-UTF-8 installations of OTRS must switch to UTF-8.
- added perl-Unicode-Normalize to Requires
- described GenericAgent.pm as %%config
- used %%post_apache2_rpma2chkconfigfile instead of "httpd2 condreload"

* Tue Feb 07 2012 Pavel Zilke <zidex at altlinux dot org> 2.4.11-alt1.2
- spec fixes

* Fri Sep 30 2011 Pavel Zilke <zidex at altlinux dot org> 2.4.11-alt1.1
- spec fixes

* Thu Sep 29 2011 Pavel Zilke <zidex at altlinux dot org> 2.4.11-alt1
- Security fixes:
  + Vulnerabilities in OTRS-Core allows read access to any file on local file system;
    CVE-2011-2746 (ALT #26186)

* Mon Oct 25 2010 Pavel Zilke <zidex at altlinux dot org> 2.4.9-alt1
- Security fixes:
  + AgentTicketZoom is vulnerable to XSS attacks from HTML e-mails;
    OSA-2010-03 (ALT #24419)

* Wed Sep 22 2010 Pavel Zilke <zidex at altlinux dot org> 2.4.8-alt1
- New version 2.4.8

* Sun Feb 21 2010 Pavel Zilke <zidex at altlinux dot org> 2.4.7-alt1
- Security fixes:
  + Vulnerability in OTRS-Core allows SQL-Injection;
    CVE-2010-0438 (ALT #22947)

* Thu Jan 21 2010 Pavel Zilke <zidex at altlinux dot org> 2.4.6-alt1
- Initial build for ALT Linux
```
:::

7. Устанавливаем дополнительные пакеты для сборки:
```bash
apt-get install rpm-macros-webserver-common rpm-macros-apache2
```

8. Производим сборку:
```bash
rpmbuild -ba ~/RPM/SPECS/otrs.spec
```

9. В результате получаем файлы:
- `~/RPM/RPMS/noarch/otrs-7.2.3-alt1.noarch.rpm`
- `~/RPM/RPMS/noarch/otrs-apache2-7.2.3-alt1.noarch.rpm`


### Особенности установки этой версии

1. Устанавливаем зависимости для `cpan`:
```bash
apt-get install gcc make perl-devel
```

2. Устанавливаем недостающие модули `perl`:
```bash
cpan Crypt::JWT Hash::Merge iCal::Parser Jq
```
Там просто всё по умолчанию жмакаете.

3. Дополнительные компоненты `perl` из инструкции для версии 6 устанавливать не нужно, они подтягиваются сами как зависимости.

4. Ну и, соответсвенно, установка необходимых основных пакетов, будет примерно такая:
```bash
apt-get install postgresql17-server ./otrs-7.2.3-alt1.noarch.rpm ./otrs-apache2-7.2.3-alt1.noarch.rpm
```

5. Насчёт `Cron` - пакет при установке автоматически должен запускать `Cron` и типа через 5 минут после запуска `Znuny` ошибка пропадёт.