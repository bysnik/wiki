

## Установка Docker

Установить docker можно следующей командой:

`# apt-get install docker-engine docker-compose` 

Для запуска docker от пользователя (не root) следует выполнить несколько шагов:

1. Добавить пользователя в группу `docker`;
    
    `# usermod ИМЯ_ПОЛЬЗОВАТЕЛЯ -aG docker`
    
2. Выполнить повторный вход в систему.

Затем необходимо запустить соответствующую службу:

`# systemctl enable --now docker`


## Установка Gitea

Первым делом надо поставить gitea, если этот этап ещё не выполнен:

apt-get install gitea


## Настройка базы данных

/etc/init.d/postgresql initdb

systemctl enable --now postgresql

Откройте PostgreSQL:

psql -U postgres

Наберите что-нибудь вроде:

```
   CREATE USER "gitea@localhost" WITH PASSWORD '123';
```

чтобы создать пользователя gitea. '123' по желанию можно заменить на Ваш самый сложный пароль.

Далее создайте базу данных:

CREATE DATABASE gitea;

После этого надо дать привилегии этому пользователю работать с базой данных:

GRANT ALL PRIVILEGES ON DATABASE gitea TO "gitea@localhost"

systemctl restart postgresql
## Установка базы данных

Gitea умеет работать с 4мя базами данных: MySQL, PostgreSQL, MS-SQL и Sqlite3.

Автор данного руководства предлагает Вам поставить MySQL:

apt-get install MySQL-server

## Настройка базы данных

Gitea сам этого не сделает, так что запустите MySQL:

systemctl start mysqld
systemctl enable mysqld

Откройте MySQL:

mysql

Наберите что-нибудь вроде:

CREATE USER 'gitea'@'localhost' IDENTIFIED BY '123';

чтобы создать пользователя gitea. '123' по желанию можно заменить на Ваш самый сложный пароль.

Далее создайте базу данных:

CREATE DATABASE gitea;

После этого надо дать привилегии этому пользователю работать с базой данных:

GRANT ALL PRIVILEGES ON * . * TO 'gitea'@'localhost';

В конце концов надо перевести MySQL в режим сервера, чтобы он отдавал 3306 порт:

control mysqld server
systemctl restart mysqld

## Запуск Gitea

Запускается она через сервис-файл

systemctl start gitea
systemctl enable gitea

ИИИИ он у ВАс не запустится)

Редактируем файл /etc/gitea/app.ini
В нем нужно разкомментировать строку: 
;PROTOCOL = http 
(пысы, нужно убрать \;)

После этого можно идти на localhost:3000 и увидеть графический интерфейс.

Имя пользователя базы данных не забудь написать gitea, вместо root

Чтобы зайти, нужно зарегистрироваться (или ВНИМАТЕЛЬНО ПОСМОТРИ на пункт "Настройка учётной записи администратора")