---
outline: deep
---

# Znuny OTRS версии 6.0.38 

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI9GtlRHpJFeL7O0fru05DIoQO-X3RgmLH_5uOCxGEiuhqkfsk4a-OZWotc_3YH1rRfhk&usqp=CAU)

## Установка

Для работы системы необходима база данных и веб-сервер, в примере используется PostgreSQL и Apache. Все команды необходимо выполнять с правами администратора системы.

Устанавливаем необходимые пакеты:
```bash
apt-get install postgresql17-server perl-DBD-Pg otrs otrs-apache2
```

### Настройка PostgreSQL

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

Не беда, если следующие шаги вы выполнять не будете. Далее все эти моменты можно отследить на страницу "Admin Support Data Collector (Сбор данных для поддержки)" на странице Администрирования.

::: tip 
Вообще, эта заррраза ругается на всякую фигню: ой ой, у тебя не установлен модуль перл для Оракл БД и МС БД, вот жешь ты плохой. У тебя не установлена поддержка китайских символов. Ну ты и хад! Ну и т.д.

Да, плюсом там руготня про оптимизацию.

Так что ниже будут все доп моменты чтобы убрать все ошибки. КРОМЕ ОДНОЙ: Знуни не может определить Линукс - Он не знает про Альт(
:::


::: warning
На текущий момент мне осталось решить проблоемы с:
- Размер подкачки более 200МВ - Ну тут надо при установке ОС делать раздел всего на 200МВ
- Теоретически должен быть пакет Аля perl-DBD-Oracle, но у альта его нет

:::

Устанавливаем дополнительные компоненты:

```bash
apt-get install perl-CSS-Minifier-XS perl-Pg perl-JavaScript-Minifier-XS perl-NTLM perl-DBD-ODBC perl-ldap perl-Crypt-Random-Source perl-Encode-HanExtra
```

Активируем модули apache2:
```bash
a2enmod deflate
a2enmod filter
a2enmod headers
```

Установка prefork MPM
```bash
apt-get install apache2-httpd-prefork
```

Удаление worker MPM
```bash
apt-get remove apache2-httpd-worker
```
::: tip Проверка:
```bash
apachectl -V | grep -i mpm
```
:::

Запускаем демон веб-сервера и устанавливаем его на автозапуск:
```bash
systemctl enable --now httpd2
```

### Первоначальные настройки

Открываем браузер, в адресную строку вводим `http://ip_вашего_сервера/otrs/installer.pl`, следуем инструкциям для инсталляции.


После входа будет видна ошибка, что демон Cron не запущен. Запуск Cron:

```bash
/var/www/webapps/otrs/bin/Cron.sh start otrs
```

## Клиенты

Ссылка для клиентов: `http://ip_вашего_сервера/otrs/customer.pl`