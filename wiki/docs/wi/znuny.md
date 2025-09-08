# Znuny OTRS версии 6.0.38 

## Установка

Для работы системы необходима база данных и веб-сервер, в примере используется PostgreSQL и Apache. Все команды необходимо выполнять с правами администратора системы.

Устанавливаем необходимые пакеты (PostgreSQL, Apache2, OTRS, и конфигурационный файл для apache содержащийся в пакете otrs-apache2):
```bash
apt-get install postgresql17-server perl-DBD-Pg otrs otrs-apache2
```

### Настройка PostgreSQL

Установка PostgreSQL сервера:
```bash
apt-get install postgresql17-server
```

Создание конфигурационных файлов PostgreSQL и создание пароля администратора:
```bash
/etc/init.d/postgresql initdb
```

Запуск сервиса postgresql:
```bash
systemctl enable --now postgresql
```

### Настройка Apache2

Включаем использование каталога с расширениями для apache2:
```bash
a2enextra httpd-addon.d
```

Кроме того, в пакете apache2 присутствует `010-httpd-addon.d.conf`, содержащий `httpd-addon.d=no`, что приводит к отключению httpd-addon.d при запуске `a2chkconfig`. Следует переопределить это значение, например, так:
```bash
echo httpd-addon.d=yes > /etc/httpd2/conf/extra-start.d/999-otrs.conf
```

Запускаем демонов веб-сервера и устанавливаем автозапуск:
```bash
systemctl enable --now httpd2
```

### Первоначальные настройки

Открываем браузер, в адресную строку вводим `http://ip_вашего_сервера/otrs/installer.pl`, следуем инструкциям для инсталляции.


После входа будет видна ошибка, что демон Cron не запущен. Запуск Cron:

```bash
/var/www/webapps/otrs/bin/Cron.sh start otrs
```