---
outline: deep
---

# Nextcloud

source: "https://www.altlinux.org/Nextcloud)"

Данная статья описывает частные случаи установки Nextcloud, официально рекомендованный способ его установки описан в документации дистрибутива ОС Альт, например в [Руководстве пользователя Альт Сервер 10.1](https://docs.altlinux.org/ru-RU/alt-server/10.1/html-single/alt-server/index.html#nextcloud). Также стоит иметь в виду, что Nextcloud присутствует в репозитории p11, но по умолчанию не входит в состав продукта Альт Сервер 11.

В некоторых случаях описанные здесь (или в документации дистрибутива) способы установки (это не касается настройки самого Nextcloud) могут привести к трудно разрешимым проблемам при попытке апгрейда версии Nextcloud до актуальной. В этих условиях может иметь смысл использовать способ установки в виде "All-in-one Docker image" (рекомендованный) или "All-in-one VM image" (ограниченно рекомендованный) по ссылке [https://nextcloud.com/install/](https://nextcloud.com/install/).

## Что такое Nextcloud

Nextcloud — веб-приложение для синхронизации данных, общего доступа к файлам и удалённого хранения документов в «облаке». Файлы Nextcloud хранятся в обычных структурах каталогов и могут быть доступны через WebDAV, если это необходимо. Основной сайт проекта: [https://nextcloud.com/](https://nextcloud.com/). Nextcloud можно установить при установке ALT Linux Server 10.1, выбрав для установки пункт Сервер Nextcloud (подробнее описано в главе [Установка системы](https://docs.altlinux.org/ru-RU/alt-server/10.1/html-single/alt-server/index.html#install-distro--install-system--chapter)).

- [Руководство пользователя Альт Сервер 10.1](https://docs.altlinux.org/ru-RU/alt-server/10.1/html-single/alt-server/index.html#nextcloud)
- Сайт: [https://nextcloud.com](https://nextcloud.com/) ([документация](http://docs.nextcloud.com/))
- Лицензия: AGPL-3.0

## Установка Nextcloud

Установить Nextcloud можно из репозитория или с официального сайта, если не устраивает версия из репозитория.

**Примечание:** Начиная с версии php8.0, пакеты модулей именуются следующим образом:
```
php<мажорная>.<минорная версии>-<имя модуля>
```
Из репозитория можно установить и эксплуатировать в одной системе одновременно разные версии php.

  

### Из репозитория

#### Используя Deploy

Развернуть Nextcloud можно используя пакет deploy (см. [Deploy](https://www.altlinux.org/Deploy "Deploy")):

```
# apt-get install deploy
# deploy nextcloud
```

**Примечание:** Будет установлен веб-сервер Apache2 и PHP и развёрнута БД MariaDB. Устанавливаемая версия PHP зависит от используемого репозитория:
- в [p11](https://www.altlinux.org/P11 "P11") — 8.3
- в [p10](https://www.altlinux.org/P10 "P10") — 8.2

  
Nextcloud будет установлен в /var/www/webapps/nextcloud, веб-интерфейс будет доступен по ссылке:

```
http://localhost/nextcloud
```

Пользователь: ncadmin

##### Пароль пользователя ncadmin

При разворачивании nextcloud через deploy без параметров пароль пользователя ncadmin будет сгенерирован автоматически и будет совпадать с паролем пользователя базы данных. Поэтому его можно найти в файле /var/www/webapps/nextcloud/config/config.php в параметре dbpassword.

```
# cd /var/www/webapps/nextcloud/config
# cat config.php|grep 'dbpassword'
```

Также, чтобы узнать пароль пользователя ncadmin сразу после разворачивания, можно посмотреть значение параметра *admin-pass* в журнале:

```
# journalctl -b |grep admin-pass
```

**Внимание!** Рекомендуется сразу после разворачивания nextcloud изменить пароль пользователя ncadmin.

  

###### Смена пароля

Установить пароль пользователю ncadmin можно, выполнив команду (пароль должен быть достаточно сложным и содержать не менее 10 символов):

```
# deploy nextcloud password=5Z4SAq2U28rWyVz
```

#### По шагам (веб-сервер Apache2)

Установить Nextcloud и все необходимые для его работы модули можно, установив пакеты [nextcloud](https://packages.altlinux.org/ru/sisyphus/nextcloud) и [nextcloud-apache2](https://packages.altlinux.org/ru/sisyphus/nextcloud-apache2):

```
# apt-get install nextcloud nextcloud-apache2
```

**Примечание:** Устанавливаемая версия PHP зависит от используемого репозитория:
- в [p11](https://www.altlinux.org/P11 "P11") — 8.3
- в [p10](https://www.altlinux.org/P10 "P10") — 8.2

  
Nextcloud будет установлен в /var/www/webapps/nextcloud, файл конфигурации — /var/www/webapps/nextcloud/config/config.php.

В пакет nextcloud-apache2 входит файл настроек виртуального хоста nextcloud: /etc/httpd2/conf/sites-available/nextcloud.conf. Также при установке этого пакета автоматически этот хост включается в разрешенные и включаются все необходимые для оптимальной работы сервиса модули apache2.

Запустить веб-сервер Apache2 и добавить его в автозагрузку:

```
# systemctl enable --now httpd2
```

Веб-интерфейс будет доступен по ссылке [http://your\_web\_server\_adress/nextcloud](http://your_web_server_adress/nextcloud)

Далее необходимо зайти на веб-интерфейс Nextcloud и [завершить установку](https://www.altlinux.org/#%D0%97%D0%B0%D0%B2%D0%B5%D1%80%D1%88%D0%B5%D0%BD%D0%B8%D0%B5_%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B8).

#### По шагам (веб-сервер nginx)

Для установки Nextcloud с веб-сервером nginx необходимо установить пакеты (с зависимостями):

- в [p11](https://www.altlinux.org/P11 "P11"):
	```
	# apt-get install nextcloud nextcloud-nginx php8.3-{fpm-fcgi,opcache}
	# systemctl enable --now php8.3-fpm
	```

- Не забудьте установить СУБД ([MariaDB](https://www.altlinux.org/EnterpriseApps/MariaDB "EnterpriseApps/MariaDB"), SQLite или PostreSQL) и php-pdo для выбранной СУБД (по зависимостям устанавливаются [php8.3-pdo\_sqlite](https://packages.altlinux.org/ru/sisyphus/php8.3-pdo_sqlite) и [libsqlite3](https://packages.altlinux.org/ru/sisyphus/libsqlite3), но разработчики nextcloud его не рекомендуют): см. [https://www.altlinux.org/Nextcloud#Выбор\_БД](https://www.altlinux.org/Nextcloud#%D0%92%D1%8B%D0%B1%D0%BE%D1%80_%D0%91%D0%94)
- Для нагруженного сервера имеет смысл установить пакет для кэширования ([php8.3-apcu](https://packages.altlinux.org/ru/sisyphus/php8.3-apcu), [php8.3-memcached](https://packages.altlinux.org/ru/sisyphus/php8.3-memcached),[php8.3-redis](https://packages.altlinux.org/ru/sisyphus/php8.3-redis), понадобится дополнительная настройка):
	```
	# apt-get install php8.3-apcu
	```

- в [p10](https://www.altlinux.org/P10 "P10"):
	```
	# apt-get install nextcloud nextcloud-nginx php8.2-{fpm-fcgi,apcu,opcache}
	# systemctl enable --now php8.2-fpm
	```

Пакет [nextcloud-nginx](https://packages.altlinux.org/ru/sisyphus/nextcloud-nginx) включает файл настроек виртуального хоста nextcloud: /etc/nginx/sites-available.d/nextcloud.conf.

В файле /etc/nginx/sites-available.d/nextcloud.conf проверьте версию php и, если она отличается от установленной, измените её:

```
server unix:/var/run/php8.3-fpm/php8.3-fpm.sock;
```

и имя сервера в поле *server\_name*.

Включить виртуальный хост и запустить веб-сервер:

```
# ln -s /etc/nginx/sites-available.d/nextcloud.conf /etc/nginx/sites-enabled.d/
# systemctl enable --now nginx
```

Веб-интерфейс будет доступен по ссылке [http://your\_web\_server\_adress/nextcloud](http://your_web_server_adress/nextcloud)

Далее необходимо зайти на веб-интерфейс Nextcloud и [завершить установку](https://www.altlinux.org/#%D0%97%D0%B0%D0%B2%D0%B5%D1%80%D1%88%D0%B5%D0%BD%D0%B8%D0%B5_%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B8).

Также можно настроить получение сертификатов от Let's Encrypt, например, с помощью пакета [dehydrated](https://packages.altlinux.org/ru/sisyphus/dehydrated).

### С официального сайта Nextcloud с сервером Apache2 (с помощью веб-установщика)

#### Подготовка окружения

Для работы Nextcloud нужен настроенный веб-сервер. Потребуется установить следующие пакеты [^1] [^2]:

```
# apt-get install apache2 apache2-mod_ssl apache2-mod_php8.3 tzdata php8.3
# apt-get install php8.3-{curl,dom,exif,fileinfo,gd2,gmp,imagick,intl,libs,mbstring,memcached,opcache,openssl,pcntl,pdo,xmlreader,zip}
```

**Примечание:** Список устанавливаемых пакетов можно уточнить, ориентируясь на зависимости пакетов из репозитория:[^3]

```
$ apt-cache depends nextcloud nextcloud-apache2
```

  
Разрешим нужные модули Apache2:

```
# for mod in dir env headers mime rewrite ssl; do a2enmod $mod; done
```

Запустим веб-сервер Apache2 и добавим его в автозагрузку:

```
# systemctl enable --now httpd2
```

#### Установка

С сайта [https://nextcloud.com/install/](https://nextcloud.com/install/) (раздел «Download» -> «Web-installer») необходимо скачать в корень веб-сервера /var/www/html файл setup-nextcloud.php, например:

```
# cd /var/www/html/
# wget https://download.nextcloud.com/server/installer/setup-nextcloud.php
```

У веб-сервера должны быть права на запись в каталог с файлом setup-nextcloud.php. Права можно назначить, временно, добавив пользователя apache2 в группу webmaster:

```
# gpasswd -a apache2 webmaster
# systemctl restart httpd2
```

  
Далее переходим по ссылке [http://your\_web\_server\_adress/setup-nextcloud.php](http://your_web_server_adress/setup-nextcloud.php) и следуем инструкциям установщика.

[![](https://www.altlinux.org/Images.www.altlinux.org/5/5f/NextcloudInstallFolder.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:NextcloudInstallFolder.png)

Установка Nextcloud. Проверка зависимостей и выбор каталога

По умолчанию Nextcloud устанавливается в подкаталог nextcloud (например, /var/www/html/nextcloud).

После установки удалим пользователя apache2 из группы webmaster:

```
# gpasswd -d apache2 webmaster
```

Для [завершения установки](https://www.altlinux.org/Nextcloud#%D0%97%D0%B0%D0%B2%D0%B5%D1%80%D1%88%D0%B5%D0%BD%D0%B8%D0%B5_%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B8 "Nextcloud") необходимо создать учетную запись администратора Nextcloud и выбрать тип используемой БД.

**Примечание:** Если при установке системы был установлен пакет installer-feature-apache2-indexhtml-stage3, который в файлах /etc/httpd2/conf/sites-available/default.conf и /etc/httpd2/conf/sites-available/default\_https.conf меняет строку **/var/www/html** на **/usr/share/doc/indexhtml/**, то исправить это можно, выполнив команду:

```
# sed -i "s|/usr/share/doc/indexhtml|/var/www/html|" /etc/httpd2/conf/sites-available/{default,default_https}.conf
```

И затем перезагрузить веб-сервер:

```
# systemctl restart httpd2
```

  

#### Рекомендации по безопасности

Рекомендуется сменить владельца файлов nextcloud на root, оставив Apache2 доступ на запись к каталогам data, config, apps:

```
# chown -R root /var/www/html/nextcloud/
# chown -R apache2 /var/www/html/nextcloud/{apps,config,data}/
```

## Завершение установки

[![](https://www.altlinux.org/Images.www.altlinux.org/2/26/NextcloudInstallSQLite.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:NextcloudInstallSQLite.png)

Установка Nextcloud с базой данных SQLite

Для завершения установки необходимо создать учетную запись администратора Nextcloud и выбрать тип используемой БД.

По умолчанию используется SQLite, но для крупных проектов рекомендуется выбрать другой тип базы данных.

### Выбор БД

**Примечание:** Если вы выполняли установку с помощью deploy, то была автоматически создана база данных MySQL и этот шаг можно пропустить

#### SQLite

Если будет использоваться база данных SQLite, для создания учётной записи администратора Nextcloud достаточно заполнить поля «Имя пользователя» и «Пароль», и нажать кнопку «Завершить установку».

#### MySQL/MariaDB для Nextcloud

[![](https://www.altlinux.org/Images.www.altlinux.org/6/6d/NextcloudInstallMySQL.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:NextcloudInstallMySQL.png)

Установка Nextcloud с базой данных MySQL

Если будет использоваться база данных MySQL/MariaDB:

1. Установить необходимые пакеты для MySQL или для MariDB (php8.2-pdo\_mysql — в [p10](https://www.altlinux.org/P10 "P10"):
	```
	# apt-get install MySQL[mariadb]-server php8.3-pdo_mysql php8.3-mysqlnd
	```
	Версия php должна быть указана та, которая использовалась при установке Nextcloud.
2. Запустить сервер mysqld и добавить его в автозагрузку:
	```
	# systemctl enable --now mysqld (mariadb.service)
	```
3. Создать базу данных для Nextcloud:
	- авторизоваться на сервере базы данных:
		```
		$ mysql -u root
		```
	- или, если пароль пользователя root@localhost в MySQL установлен:
		```
		$ mysql -u root -p
		Enter password:
		```
	- Выполнить команды для создания базы данных nextcloud и пользователя базы данных nextcloud с паролем nextpass:
		```
		MariaDB [(none)]> create user 'nextcloud'@'localhost' identified by 'nextpass';
		MariaDB [(none)]> create database nextcloud default character set utf8 collate utf8_unicode_ci;
		MariaDB [(none)]> grant all privileges on nextcloud.* to nextcloud@localhost;
		MariaDB [(none)]> exit;
		```
4. В веб-интерфейсе Nextcloud заполнить поля «Имя пользователя» и «Пароль», раскрыть список «Хранилище и база данных», выбрать «MySQL/MariaDB», и заполнить поля подключения к базе данных, данными, которые использовались на этапе настройки базы данных. Для завершения установки необходимо нажать кнопку «Завершить установку».

#### PostgreSQL

**Примечание:** В [p11](https://www.altlinux.org/P11 "P11") поддерживается несколько версий PostgreSQL, в данной статье речь о 17 версии.

Для [p10](https://www.altlinux.org/P10 "P10") следует установить следующие пакеты (версия postgresql 14):

```
# apt-get install postgresql14-server php8.2-{pgsql,pdo_pgsql}
```

[![](https://www.altlinux.org/Images.www.altlinux.org/7/7a/NextcloudInstallPostgreSQL.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:NextcloudInstallPostgreSQL.png)

Установка Nextcloud с базой данных PostgreSQL

Если будет использоваться СУБД PostgreSQL:

1. Установить необходимые пакеты:
	```
	# apt-get install postgresql17-server php8.3-pgsql php8.3-pdo_pgsql
	```
	Версия php должна быть указана та, которая использовалась при установке Nextcloud.
2. Подготовить к запуску и настроить службу postgresql:
	- создать системные базы данных:
		```
		# /etc/init.d/postgresql initdb
		```
	- включить по умолчанию и запустить службу postgresql:
		```
		# systemctl enable --now postgresql
		```
3. Создать базу данных Nextcloud:
	- создать пользователя nextcloud (пароль необходимо запомнить) и базу данных nextcloud:
		```
		# su - postgres -s /bin/bash -c 'createuser --no-superuser --no-createdb --no-createrole --encrypted --pwprompt nextcloud'
		Введите пароль для новой роли: 
		Повторите его:
		# su - postgres -s /bin/bash -c 'createdb -O nextcloud nextcloud'
		```
4. В веб-интерфейсе Nextcloud заполнить поля «Имя пользователя» и «Пароль», раскрыть список «Хранилище и база данных», выбрать PostgreSQL, и заполнить поля подключения к базе данных, данными, которые использовались на этапе создания базы данных. Для завершения установки необходимо нажать кнопку «Завершить установку».

### Настройка кэширования

Можно значительно повысить производительность сервера Nextcloud с помощью кэширования, при котором часто запрашиваемые объекты сохраняются в памяти для более быстрого извлечения.

Установить следующие пакеты:

```
# apt-get install php8.3-{apcu,memcached} memcached
```

Версия PHP должна быть указана та, которая использовалась при установке Nextcloud.

Добавить службу memcached в автозагрузку и запустить её:

```
# systemctl enable --now memcached
```

Добавить в config.php (находится в каталоге /var/www/html/nextcloud/config/ или /var/www/webapps/nextcloud/config/  — при установке из репозитория) следующие строки:

```
'memcache.local' => '\OC\Memcache\APCu',
'memcache.distributed' => '\OC\Memcache\Memcached',
'memcache.locking' => '\OC\Memcache\Memcached',
'memcached_servers' => array(
   array('localhost', 11211),
),
```

### Доверенные домены

Все URL-адреса, используемые для доступа к серверу Nextcloud, должны быть внесены в белый список в файле config.php в настройках *trusted\_domains*. Пользователям разрешено входить в Nextcloud только в том случае, если они указывают в своих браузерах URL-адрес, указанный в настройке доверенных\_доменов.

Пример настройки *trusted\_domains* в файле конфигурации:

```
'trusted_domains' =>
array (
0 => 'localhost',
1 => 'nextcloud.test.alt',
2 => '192.168.0.123',
),
```

### Настройка SSL

Для правильной работы nextcloud запросы должны идти по https. Для работы SSL необходимы SSL-сертификаты. Их можно купить или сгенерировать.

#### Создание самоподписных SSL-сертификатов

1. Создать и перейти в каталог ~/ssl:
	```
	$ mkdir ~/ssl && cd ~/ssl
	```
2. Создать закрытый ключ корневого хранилища:
	```
	$ openssl genrsa -des3 -out nextcloud-domain-ca.key 2048
	```
3. Создать и подписать ключом корневого хранилища корневой сертификат, сертификат издателя сертификатов (при запросе «Common Name» необходимо указать IP-адрес или FQDN вашего сервера):
	```
	$ openssl req -new -x509 -days 3650 -key nextcloud-domain-ca.key -out nextcloud-domain-ca.crt
	```
4. Создать закрытый ключ веб-сервера, который вы намерены защитить сертификатом:
	```
	$ openssl genrsa -des3 -out nextcloud.key 1024
	```
5. Создать запрос на подпись сертификата веб-сервера (при запросе «Common Name» необходимо указать IP-адрес или FQDN вашего сервера):
	```
	$ openssl req -new -key nextcloud.key -out nextcloud.csr
	```
6. Создать и подписать сертификат веб-сервера, используя запрос на подпись сертификата, корневой ключ и корневой сертификат:
	```
	$ openssl x509 -req -in nextcloud.csr -out nextcloud.crt -sha1 -CA nextcloud-domain-ca.crt -CAkey nextcloud-domain-ca.key -CAcreateserial -days 3650
	```
7. Apache2 будет требовать при запуске пароль к ключу веб-сервера. Если этого не требуется, можно сделать резервную копию ключа веб-сервера:
	```
	$ cp nextcloud.key nextcloud.key.dist
	```
	и очистить пароль ключа веб-сервера:
	```
	$ openssl rsa -in nextcloud.key.dist -out nextcloud.key
	```
8. Создать цепочку сертификатов CA-bundle:
	```
	$ cat nextcloud.crt nextcloud-domain-ca.crt > nextcloud.ca-bundle
	```
9. В итоге должны получиться следующие файлы:
	```
	nextcloud.crt — сертификат сервера
	nextcloud.csr — запрос на сертификат
	nextcloud.key — ключ сертификата сервера
	nextcloud.ca-bundle — ca-bundle файл сайта
	nextcloud-domain-ca.crt — корневой сертификат
	nextcloud-domain-ca.key — ключ корневого сертификата
	```
10. Скопировать корневой сертификат, сертификат сервера и ca-bundle файл сайта в /var/lib/ssl/certs/, а ключ сертификата сервера в /var/lib/ssl/private/:
	```
	# cp /home/user/ssl/nextcloud.key /var/lib/ssl/private/
	# cp /home/user/ssl/{nextcloud-domain-ca.crt,nextcloud.crt,nextcloud.ca-bundle} /var/lib/ssl/certs/
	```

#### Конфигурационный файл Apache2

Теперь создадим конфигурационный файл нашего сайта и настроим SSL-доступ.

Включить 443 порт:

```
# a2enport https
```

Скопировать стандартный конфигурационный файл и назовём его nextcloud.conf:

```
# cd /etc/httpd2/conf/sites-available/
# cp default_https.conf nextcloud.conf
```

Пример конфигурационного файла /etc/httpd2/conf/sites-available/nextcloud.conf (вместо DNS-имени можно указать IP-адрес):

```
<IfModule ssl_module>
   <VirtualHost *:443>
      DocumentRoot "/var/www/html/nextcloud" (завелось после правки в вид "/var/www/html")
      ServerName nextcloud.test.alt:443
      ServerAdmin webmaster@example.com
      ErrorLog "/var/log/httpd2/error_log"
      TransferLog "/var/log/httpd2/access_log"
      SSLEngine on
      SSLProtocol all -SSLv2
      SSLCipherSuite HIGH:MEDIUM:!aNULL:!MD5
      SSLCertificateFile "/var/lib/ssl/certs/nextcloud.crt"
      SSLCertificateKeyFile "/var/lib/ssl/private/nextcloud.key"
      SSLCertificateChainFile "/var/lib/ssl/certs/nextcloud.ca-bundle"
      SSLCACertificateFile "/var/lib/ssl/certs/nextcloud-domain-ca.crt"
      <IfModule mod_headers.c>
            Header always set Strict-Transport-Security "max-age=15552000; includeSubDomains; preload"
      </IfModule>
      <Directory /var/www/html/nextcloud>
            AllowOverride All
      </Directory>
   </VirtualHost>
</IfModule>
```

Так же можно настроить редирект с http на https добавив в файл конфигурации раздел:

```
<VirtualHost *:80>
   ServerName nextcloud.test.alt
   Redirect permanent / https://nextcloud.test.alt/
</VirtualHost>
```

**Примечание:** Если nextcloud устанавливался из репозитория, /var/www/html/nextcloud в директиве **DocumentRoot** и **Directory** необходимо заменить на /var/www/webapps/nextcloud.

  
Добавить сайт nextcloud в разрешенные и перезапустить веб-сервер:

```
# a2ensite nextcloud
# systemctl restart httpd2
```

Теперь Nextcloud доступен по адресу [https://nextcloud.test.alt/](https://nextcloud.test.alt/) При первом заходе по https браузер будет ругаться на самоподписанный сертификат (ошибка SEC\_ERROR\_UNKNOWN\_ISSUER) необходимо добавить его в исключения.

#### Конфигурационный файл nginx

развернуть Пример конфигурационного файла /etc/nginx/sites-available.d/nextcloud.conf:

## Обновление мажорных версий

По умолчанию непоследовательное обновление мажорных версий запрещено (например, с версии 20 сразу до 22), и при попытке доступа к веб-интерфейсу после обновления пакета будет возникать ошибка "Exception: Updates between multiple major versions and downgrades are unsupported". Для того, чтобы обойти эту ошибку, продолжить обновление и получить доступ к веб-интерфейсу, можно сделать следующее. В файле /var/www/webapps/nextcloud/config/config.php в параметре 'version' изменить старую версию на новую. Затем снова перейти в веб-интерфейс, обновить страницу и обновление должно продолжиться.

## Collabora Online в Nextcloud

### Описание

Collabora Online это мощный онлайн офисный пакет, основанный на LibreOffice, который позволяет работать со всеми основными офисными форматами (документы/таблицы/презентации) прямо в браузере.

Особенности:

- Базовое редактирование
- Поддержка документов:
	- DOC, DOCX, PPT, PPTX, XLS, XLSX + ODF
	- Импорт/Просмотр Visio, Publisher, + более 100
- WYSIWYG редактор
- Анонимное редактирование файлов доступных для общего пользования

### Встраиваемый сервер CODE (Collabora Online Development Edition)

Простой в установке вариант, предназначенный для использования дома или в небольших группах. Производительность несколько ниже, чем в варианте использования отдельного сервера, а также отсутствуют возможности для масштабирования.

Установка:

1. Установить приложение «Collabora Online - Built-in CODE Server» («Значок пользователя» → «Приложения» → «Офис и текст» → «Collabora Online - Built-in CODE Server» -> «Скачать и включить»).
2. Установить приложение «Nextcloud Office» («Значок пользователя» → «Приложения» → «Офис и текст» → «Nextcloud Office» -> «Скачать и включить»).
	[![Установленные приложения в Nextcloud](https://www.altlinux.org/Images.www.altlinux.org/thumb/f/f3/Nextcloud_collabora02.png/800px-Nextcloud_collabora02.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Nextcloud_collabora02.png "Установленные приложения в Nextcloud")
3. Перейти в «Значок пользователя» → «Параметры сервера» → «Офис» и выбрать пункт «Использовать встраиваемый сервер CODE (Collabora Online Development Edition)»:
	[![Настройка встроенного сервера Collabora в Nextcloud](https://www.altlinux.org/Images.www.altlinux.org/thumb/1/17/Nextcloud_collabora01.png/800px-Nextcloud_collabora01.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Nextcloud_collabora01.png "Настройка встроенного сервера Collabora в Nextcloud")

  

**Примечание:** Если используется веб-сервер Nginx, то необходимо внести небольшие изменения в существующую конфигурацию. Чтобы приложение Collabora Online работало, необходимо добавить точку входа richdocumentscode/proxy в качестве разрешенного местоположения в конфигурацию nginx. Т.е. в файле /etc/nginx/sites-available.d/nextcloud.conf заменить строку:

```
location ~ ^/(?:index|remote|public|cron|core/ajax/update|status|ocs/v[12]|updater/.+|oc[ms]-provider/.+)\.php(?:$|/) {
```

на:

```
location ~ ^/(?:index|remote|public|cron|core/ajax/update|status|ocs/v[12]|updater/.+|oc[ms]-provider/.+|.+\/richdocumentscode\/proxy)\.php(?:$|/) {
```

И перезапустить nginx:

```
# systemctl restart nginx
```

  
Перейти к папкам и файлам на облачном сервисе. Попробовать открыть любой документ или создать новый — он должен открыться в Collabora:

[![Редактирование документа в браузере](https://www.altlinux.org/Images.www.altlinux.org/thumb/d/de/Nextcloud_collabora03.png/800px-Nextcloud_collabora03.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Nextcloud_collabora03.png "Редактирование документа в браузере")

### Собственный сервер Collabora Online

В данном разделе приведён пример запуска собственного сервера «Nextcloud Office» на одном сервере с Nextcloud.

#### Установка и запуск сервера Collabora

Для работы собственного сервера Collabora Online необходимо установить и настроить [Podman](https://www.altlinux.org/Podman "Podman").

**Примечание:** Должен быть установлен пакет fuse и fuse-overlayfs. Кроме того, необходимо предоставить права доступа для монтирования файловой системы FUSE для всех пользователей:

```
# control fusermount public
```

  
Далее необходимо скачать образ Collabora Online:

```
$ podman pull collabora/code
```

Запустить образ:

```
$ podman run -t -d -p 127.0.0.1:9980:9980 -e 'aliasgroup=https://nextcloud.test.alt:443' --restart always --cap-add MKNOD --privileged collabora/code
```

где:

- контейнер будет слушать сетевые запросы на порту 9980 (параметр -p);
- в параметре aliasgroup должен быть указан хост, на котором работает Nextcloud.

#### Настройка reverse proxy

Далее надо настроить reverse proxy.

Для пересылки запросов демону Coolwsd на порт 9980 должны быть установлены следующие правила:

- /browser
- /hosting/discovery
- /hosting/capabilities
- /cool/adminws
- /cool
- Подключение к веб-сокету через /cool/(.\*)/ws

##### Веб-сервер Apache2

Загрузить необходимые модули:

```
# for mod in proxy proxy_wstunnel proxy_http proxy_connect; do a2enmod $mod; done
```

После этого необходимо правильно сконфигурировать Apache2, в данном примере мы запустим обратный прокси на порту 4443. Его можно также запустить на поддомене (например, office.test.alt).

Создадим в каталоге /etc/httpd2/conf/sites-available/ файл officenextcloud.conf следующего содержания:

```
<VirtualHost *:4443>
  ServerName nextcloud.test.alt:4443
SSLEngine on
  SSLCertificateFile "/var/lib/ssl/certs/nextcloud.crt"
  SSLCertificateKeyFile "/var/lib/ssl/private/nextcloud.key"
  SSLCertificateChainFile "/var/lib/ssl/certs/nextcloud.ca-bundle"
  SSLCACertificateFile "/var/lib/ssl/certs/nextcloud-domain-ca.crt"
  SSLProtocol             all -SSLv2 -SSLv3
  SSLCipherSuite HIGH:MEDIUM:!aNULL:!MD5
  SSLHonorCipherOrder     on

  ErrorLog "/var/log/httpd2/office_error_log"
  TransferLog "/var/log/httpd2/office_access_log"
  # Encoded slashes need to be allowed
  AllowEncodedSlashes NoDecode

  # Container uses a unique non-signed certificate
  SSLProxyEngine On
  SSLProxyVerify None
  SSLProxyCheckPeerCN Off
  SSLProxyCheckPeerName Off
  # keep the host
  ProxyPreserveHost On
  # static html, js, images, etc. served from coolwsd
  # browser is the client part of Collabora Online
  ProxyPass           /browser https://127.0.0.1:9980/browser retry=0
  ProxyPassReverse    /browser https://127.0.0.1:9980/browser
  # WOPI discovery URL
  ProxyPass           /hosting/discovery https://127.0.0.1:9980/hosting/discovery retry=0
  ProxyPassReverse    /hosting/discovery https://127.0.0.1:9980/hosting/discovery
 
  # Capabilities
  ProxyPass           /hosting/capabilities https://127.0.0.1:9980/hosting/capabilities retry=0
  ProxyPassReverse    /hosting/capabilities https://127.0.0.1:9980/hosting/capabilities

  # Main websocket
  ProxyPassMatch      "/cool/(.*)/ws$"      wss://127.0.0.1:9980/cool/$1/ws nocanon

  # Admin Console websocket
  ProxyPass           /cool/adminws wss://127.0.0.1:9980/cool/adminws

  # Download as, Fullscreen presentation and Image upload operations
  ProxyPass           /cool https://127.0.0.1:9980/cool
  ProxyPassReverse    /cool https://127.0.0.1:9980/cool
  # Compatibility with integrations that use the /lool/convert-to endpoint
  ProxyPass           /lool https://127.0.0.1:9980/cool
  ProxyPassReverse    /lool https://127.0.0.1:9980/cool
</VirtualHost>
  
<IfModule ssl_module>
        Listen 4443
</IfModule>
```

**Примечание:** Так как мы используем поддомен nextcloud.test.alt, то указываем тот же сертификат, что и для nextcloud. В случае, если используется другой домен, следует сгенерировать отдельный сертификат для нового доменного имени (п.3-п.7).

  
Самоподписные сертификаты необходимо добавить в Nextcloud, для покупных сертификатов данное действие не требуется:

```
# cat /var/lib/ssl/certs/nextcloud.ca-bundle >> /var/www/html/nextcloud/resources/config/ca-bundle.crt
```

Затем следует добавить сайт в разрешенные и перезапустить Apache2:

```
# a2ensite officenextcloud
# systemctl restart httpd2
```

**Внимание!** Обязательно необходимо зайти по адресу [https://nextcloud.test.alt:4443/](https://nextcloud.test.alt:4443/) и добавить сертификат в исключения браузера.

  

##### Веб-сервер nginx

Добавить новый блок *server* в конфигурацию nginx для nextcloud.test.alt (файл /etc/nginx/sites-available.d/nextcloud.conf):

```
server {
 listen       4443 ssl;
 server_name  nextcloud.test.alt;

 ssl_certificate /var/lib/ssl/certs/nextcloud.crt;
 ssl_certificate_key /var/lib/ssl/private/nextcloud.key;

 # static files
 location ^~ /browser {
   proxy_pass https://127.0.0.1:9980;
   proxy_set_header Host $http_host;
 }

 # WOPI discovery URL
 location ^~ /hosting/discovery {
   proxy_pass https://127.0.0.1:9980;
   proxy_set_header Host $http_host;
 }

 # Capabilities
 location ^~ /hosting/capabilities {
   proxy_pass https://127.0.0.1:9980;
   proxy_set_header Host $http_host;
 }

 # main websocket
 location ~ ^/cool/(.*)/ws$ {
   proxy_pass https://127.0.0.1:9980;
   proxy_set_header Upgrade $http_upgrade;
   proxy_set_header Connection "Upgrade";
   proxy_set_header Host $http_host;
   proxy_read_timeout 36000s;
 }

 # download, presentation and image upload
 location ~ ^/(c|l)ool {
   proxy_pass https://127.0.0.1:9980;
   proxy_set_header Host $http_host;
 }

 # Admin Console websocket
 location ^~ /cool/adminws {
   proxy_pass https://127.0.0.1:9980;
   proxy_set_header Upgrade $http_upgrade;
   proxy_set_header Connection "Upgrade";
   proxy_set_header Host $http_host;
   proxy_read_timeout 36000s;
 }
}
```

Перезапустить nginx:

```
# systemctl restart nginx
```

#### Проверка конфигурации

Рекомендуется выполнить следующие проверки:

1. Возможность доступа клиента к пользовательскому интерфейсу Nextcloud. Используйте браузер или запустите команду:
	```
	$ сurl -k https://nextcloud.test.alt/status.php
	```
	или:
	```
	$ сurl -k https://nextcloud.test.alt/nextcloud/status.php
	```
2. Возможность доступа клиента к Collabora. Используйте браузер или запустите команду:
	```
	$ сurl -k https://nextcloud.test.alt:4443/hosting/discovery
	```
	результатом должен быть XML-документ, описывающий возможности клиента WOPI (длинный список различных типов файлов, которые можно открыть). Убедитесь, что содержимое документа отражает правильную схема URL-адресов (https://).
3. Возможность доступа из Nextcloud к Collabora:
	```
	$ сurl -k https://nextcloud.test.alt:4443/hosting/discovery
	```
4. Возможность доступа из Collabora к пользовательскому интерфейсу Nextcloud:
	```
	$ сurl -k https://nextcloud.test.alt/status.php
	```

DNS-имена должны разрешаться как на сервере, так и на клиенте. DNS-имена не должны разрешаться в 127.0.0.1.

Если для Nextcloud и Collabora используются разные домены, убедитесь, что оба сервера доверяют назначенному TLS-сертификату другой системы, а клиент доверяет TLS-сертификатам как Nextcloud, так и Collabora.

### Настройка Collabora Online в Nextcloud

1. Установить приложение «Nextcloud Office» («Приложения» → «Офис и текст» → «Nextcloud Office» -> «Скачать и включить»).
2. Перейти в «Параметры сервера» → «Офис»/«Набор офисных приложений для Nextcloud», выбрать пункт «Использовать собственный сервер». В поле «URL-адрес (и порт) сервера документов Collabora Online» указать адрес сервера Collabora с портом ([https://nextcloud.test.alt:4443](https://nextcloud.test.alt:4443/)):
	[![Настройка Collabora Online в Nextcloud](https://www.altlinux.org/Images.www.altlinux.org/1/18/NextcloudCollaboraOnline.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:NextcloudCollaboraOnline.png "Настройка Collabora Online в Nextcloud")
3. Если сертификат самоподписной или если, например, нет полной цепочки, то необходимо установить отметку «Отключить проверку сертификата (небезопасно)».

Перейти к папкам и файлам на облачном сервисе. Попробовать открыть любой документ или создать новый — он должен открыться в Collabora:

[![Редактирование документа в браузере](https://www.altlinux.org/Images.www.altlinux.org/thumb/d/de/Nextcloud_collabora03.png/800px-Nextcloud_collabora03.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Nextcloud_collabora03.png "Редактирование документа в браузере")

**Примечание:** Проверьте записи «Allow list for WOPI requests»: очистите список для тестирования, затем добавьте IP-адреса по мере необходимости.

  

### Обновление Collabora Docker

1. Скачиваем свежий образ:
	```
	$ podman pull collabora/code
	```
2. Выясняем id контейнера:
	```
	$ podman ps
	```
3. Останавливаем и удаляем старый контейнер:
	```
	$ podman stop CONTAINER_ID
	$ podman rm CONTAINER_ID
	```
4. Запускаем новый контейнер:
	```
	$ podman run -t -d -p 127.0.0.1:9980:9980 -e 'aliasgroup=https://nextcloud.test.alt:443' --restart always --cap-add MKNOD --privileged collabora/code
	```

## Интеграция с LDAP

Nextcloud поставляется с приложением LDAP, позволяющим пользователям LDAP (включая Active Directory и FreeIPA) появляться в списках пользователей Nextcloud.

На сервере LDAP должна быть настроена учётная запись с правами чтения (DN user). От данной учётной записи будет выполняться подключение к серверу каталогов.

**Примечание:** На сервере Nextcloud должен быть установлен модуль для PHP LDAP [^4]:

```
# apt-get install php8.2-ldap
# systemctl restart httpd2
```

  
Для настройки интеграции базы пользователей с LDAP необходимо в списке приложений Nextcloud включить приложение **«LDAP user and group backend»**.

Ниже показана настройка интеграции с FreeIPA (ipa.example.test).

Перейти на страницу администрирования Nextcloud: «Параметры сервера» -> «LDAP/AD Интеграция» («LDAP/AD integration»). На этой странице необходимо указать параметры подключения к LDAP.

  
На вкладке «Сервер» нужно указать имя хоста LDAP-сервера, порт и ввести учётные данные пользователя:

- сервер: ipa.example.test;
- порт: 389;
- DN пользователя: uid=nextcloud,cn=users,cn=accounts,dc=example,dc=test
- база поиска (Base DN): dc=example,dc=test

[![Интеграция с LDAP. Вкладка «Сервер»](https://www.altlinux.org/Images.www.altlinux.org/a/a7/Nextcloudldap01.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Nextcloudldap01.png "Интеграция с LDAP. Вкладка «Сервер»")

**Примечание:** В разных реализациях LDAP могут быть разные требования для указания учётной записи пользователя.

  
Для базы поиска пользователей и групп можно нажать кнопку «Определить базу поиска DN» — тогда будет определен корень домена. Или можно ввести самому конкретное подразделение.

Проверить конфигурацию можно, нажав на кнопку «Проверить базу поиска DN». При ответе «Конфигурация в порядке» можно продолжать настройку.

На вкладке «Пользователи» («Users») следует указать, какие пользователи LDAP будут отображаться как пользователи Nextcloud. В поле «Фильтр LDAP» указать: (|(objectclass=inetorgperson)(objectclass=person))

[![Интеграция с LDAP. Вкладка «Пользователи»](https://www.altlinux.org/Images.www.altlinux.org/9/9c/Nextcloudldap02.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Nextcloudldap02.png "Интеграция с LDAP. Вкладка «Пользователи»")

На вкладке «Учетные данные» («Login Attributes») следует указать атрибуты, которые можно будет использовать в качестве логина. Например:

- (&(|(objectclass=person))(|(uid=%uid)(|(mailPrimaryAddress=%uid)(mail=%uid)))) — в качестве логина можно использовать имя пользователя или email;
- (&(|(objectclass=inetorgperson)(objectclass=person))(uid=%uid)) — в качестве логина можно использовать имя пользователя.

[![Интеграция с LDAP. Вкладка «Учетные данные»](https://www.altlinux.org/Images.www.altlinux.org/c/cb/Nextcloudldap03.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Nextcloudldap03.png "Интеграция с LDAP. Вкладка «Учетные данные»")

Проверить данную настройку можно, вписав пользователя FreeIPA в поле «Проверить логин» и нажав на кнопку «Проверить настройки».

На вкладке «Группы» («Groups») необходимо задать фильтры для групп (например, (|(cn=ipausers))):

[![Интеграция с LDAP. Вкладка «Группы»](https://www.altlinux.org/Images.www.altlinux.org/c/c4/Nextcloudldap04.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Nextcloudldap04.png "Интеграция с LDAP. Вкладка «Группы»")

Вкладка «Дополнительно» («Advanced») -> раздел «Настройки каталога» («Directory Settings»):

- «Поле отображаемого имени пользователя» («User Display Name Field»): displayname
- «База дерева пользователей» («Base User Tree»): cn=users,cn=accounts,dc=example,dc=test
- «База дерева групп» («Base Group Tree»): cn=groups,cn=accounts,dc=example,dc=test

[![Интеграция с LDAP. Вкладка «Дополнительно»](https://www.altlinux.org/Images.www.altlinux.org/4/4c/Nextcloudldap05.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Nextcloudldap05.png "Интеграция с LDAP. Вкладка «Дополнительно»")

Вкладка «Эксперт» («Expert»):

- «Атрибут для внутреннего имени» («Internal Username Attribute»): uid
- «UUID-атрибуты для пользователей» («UUID Attribute for Users»): uid

[![Интеграция с LDAP. Вкладка «Эксперт»](https://www.altlinux.org/Images.www.altlinux.org/5/51/Nextcloudldap06.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Nextcloudldap06.png "Интеграция с LDAP. Вкладка «Эксперт»")

Проверить конфигурацию, нажав на кнопку «Проверить конфигурацию».

Просмотреть список пользователей можно в разделе «Пользователи» (должны подгрузиться пользователи из ldap):

[![Пользователи Nextcloud](https://www.altlinux.org/Images.www.altlinux.org/thumb/9/95/NextcloudldapUsers.png/800px-NextcloudldapUsers.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:NextcloudldapUsers.png "Пользователи Nextcloud")

Теперь можно попробовать зайти доменным пользователем используя свой логин и пароль.

## Настройка SSO

  
Для работы прозрачной аутентификации (SSO) необходимо настроить веб-сервер ([Apache](https://www.altlinux.org/Apache2/AD-auth "Apache2/AD-auth"), [Nginx](https://www.altlinux.org/Nginx/AD-auth "Nginx/AD-auth")) и настроить интеграцию c LDAP (см. [Интеграция с LDAP](https://www.altlinux.org/#%D0%98%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B0%D1%86%D0%B8%D1%8F_%D1%81_LDAP)).

Включить приложение **«SSO & SAML authentication»**.

Далее перейти на страницу администрирования Nextcloud: «Параметры сервера» -> «Подтверждение подлинности SSO и SAML» («SSO & SAML authentication»), выбрать пункт «Использовать переменные окружения», указать переменную **REMOTE\_USER**, установить отметку «Разрешайте аутентификацию только в том случае, если учетная запись существует на каком-либо другом бэкэнде (например, LDAP)», чтобы SSO пускал только известных пользователей.

[![Подтверждение подлинности SSO и SAML](https://www.altlinux.org/Images.www.altlinux.org/4/49/NextcloudSSO01.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:NextcloudSSO01.png "Подтверждение подлинности SSO и SAML")

## Примечания

[^1]: Вместо сервера Арache2 может использоваться сервер Nginx.

[^2]: При использовании [nginx](https://packages.altlinux.org/ru/sisyphus/nginx) необходимые для него пакеты покажет команда apt-cache depends nextcloud-nginx

[^3]: Версию php необходимо указать свою