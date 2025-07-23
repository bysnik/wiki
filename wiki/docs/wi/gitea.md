---
outline: deep
---

# Gitea

это бесплатный сервис с открытым исходным кодом для хостинга Git-репозиториев, разработанный для совместной работы над проектами. Он предоставляет функциональность для хранения, управления и совместной работы над исходным кодом, включая такие инструменты, как отслеживание ошибок, ревью кода, непрерывная интеграция и многое другое.

## Установка Gitea

Установка Gitea:
```bash
apt-get install gitea
```
## Установка базы данных

Gitea умеет работать с несколькими базами данных: MySQL, PostgreSQL, MS-SQL, Sqlite3 и TiDB.
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

Вход в командую оболочку PostgreSQL:
```bash
psql -U postgres
```

Создание пользователя gitea с паролем 123:
```
CREATE USER gitea WITH PASSWORD '123';
```

Создание базы данных gitea:
```bash
CREATE DATABASE gitea;
```

Предоставление всех привилегий пользователю gitea для управление базой данных gitea:
```bash
GRANT ALL PRIVILEGES ON DATABASE gitea TO gitea;
```

Изменение владельца базой данных gitea на пользователя gitea:
```bash
ALTER DATABASE gitea OWNER TO gitea;
```

Выход из командной оболочки PostgreSQL:
```bash
exti;
```

Перезагрузка сервиса postgresql:
```bash
systemctl restart postgresql
```


### Настройка MySQL

Установка MySQL сервера:
```bash
apt-get install MySQL-server
```

Запуск сервиса mysqld:
```bash
systemctl enable --now mysqld
```

Вход в командую оболочку MySQL:
```bash
mysql
```

Создание пользователя gitea с паролем 123:
```bash
CREATE USER 'gitea'@'localhost' IDENTIFIED BY '123';
```
 
Создание базы данных gitea:
```bash
CREATE DATABASE gitea;
```

Предоставление всех привилегий пользователю gitea для управление базой данных gitea:
```bash
GRANT ALL PRIVILEGES ON * . * TO 'gitea'@'localhost';
```

Выход из командной оболочки MySQL:
```bash
exti;
```

Переключение MySQL в режим сервера, чтобы он отдавал 3306 порт:
```bash
control mysqld server
```

Перезагрузка сервиса mysqld:
```bash
systemctl restart mysqld
```

## Запуск Gitea

Редактируем конфигурационный файл:
```bash
nano /etc/gitea/app.ini
```

Необходимо раскомментировать строку (убрать точку с запятой):
```bash
;PROTOCOL = http 
```

Запуск сервиса gitea:
```bash
systemctl enable --now gitea
```

При первом запуске Gitea по адресу localhost:3000 появится меню начальной конфигурации.

Главные настройки:

Тип базы данных: выбрать базу данных, которая была создана.

Имя пользователя : gitea

Пароль: 123

Схема (если PostgreSQL): Оставить поле пустым.

Настройка учётной записи администратора: Создание учётной записи администратора необязательно. Первый зарегистрированный пользователь автоматически становится администратором.

## Файлы README профиля

Чтобы отобразить файл Markdown на странице профиля пользователя или организации Gitea, создайте репозиторий с именем `.profile`и добавьте в него новый файл с именем `README.md`. Gitea автоматически отобразит содержимое файла в вашем профиле, в новой области «Обзор» над вашими репозиториями.

Если сделать `.profile`репозиторий закрытым, файл README профиля будет скрыт.

## Gitea Actions

### Быстрый старт

#### Получение токена

Вы можете получить токены разных уровней из следующих источников для создания участников соответствующего уровня:

- Уровень экземпляра: страница настроек администратора, например `<your_gitea.com>/-/admin/actions/runners`.
- Уровень организации: страница настроек организации, например `<your_gitea.com>/<org>/settings/actions/runners`.
- Уровень репозитория: страница настроек репозитория, например `<your_gitea.com>/<owner>/<repo>/settings/actions/runners`.

Будем использовать уровень репозитория. Справа в верху: Создать новый раннер. Копируем Токен.

![](/public/img/20250723113505.png)

#### Установка Act Runner с помощью Docker Compose

Необходимо создать файл `docker-compose.yml`:

```yaml
services:
	runner:
		image: docker.io/gitea/act_runner:latest
		environment:
			CONFIG_FILE: /config.yaml
			GITEA_INSTANCE_URL: "${INSTANCE_URL}"
			GITEA_RUNNER_REGISTRATION_TOKEN: "${REGISTRATION_TOKEN}"
			GITEA_RUNNER_NAME: "${RUNNER_NAME}"
			GITEA_RUNNER_LABELS: "${RUNNER_LABELS}"
		volumes:
			- ./config.yaml:/config.yaml
			- ./data:/data
			- /var/run/docker.sock:/var/run/docker.sock
```

хз почему, но если отсутствует файл config.yaml, то докер создает пустую директорию ./config.yaml . Если же файл есть, то всё работает как и должно.

Либо создавайте переменные окружения, что будет правильнее, либо вписывайте значения вместо переменных:
GITEA_INSTANCE_URL - ЮРЛ Вашего Гитеа, например http://192.168.0.1:3000 (лупбэк не работает)
GITEA_RUNNER_REGISTRATION_TOKEN - Токен, который был получен ранее
GITEA_RUNNER_NAME - имя раннера
GITEA_RUNNER_LABELS - необязательный лейбл, можно просто удалить

Запуск Act Runner:
```bash
docker compose up
```

здесь используется образ раннера docker.io/gitea/act_runner:latest, хочу сделать образ раннера на альте. Как я понимаю, суть легче легкого: Нужно всего лишь скинуть бинарник раннера в образ альта, ну и сделать автозапуск с помощью системд.(https://docs.gitea.com/usage/actions/act-runner#start-the-runner-with-systemd) Ну и по мелочи...

#### Создание Задачи

В репозитории создаем файл .gitea/workflows/demo.yaml:
```yaml
name: Gitea Actions Demo
run-name: ${{ gitea.actor }} is testing out Gitea Actions
on: [push]

jobs:
  Explore-Gitea-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "The job was automatically triggered by a ${{ gitea.event_name }} event."
      - run: echo "This job is now running on a ${{ runner.os }} server hosted by Gitea!"
      - run: echo "The name of your branch is ${{ gitea.ref }} and your repository is ${{ gitea.repository }}."
      - name: Check out repository code
        uses: actions/checkout@v4
      - run: echo "The ${{ gitea.repository }} repository has been cloned to the runner."
      - run: echo "The workflow is now ready to test your code on the runner."
      - name: List files in the repository
        run: |
          ls ${{ gitea.workspace }}
      - run: echo "This job's status is ${{ job.status }}."
```

После пуша в репозитории, переходим на страницу Действия, там и Увидим как это действие отработало.
 ![](/public/img/20250723114050.png)

Можно изучить логи, нажав на Нужное действие:
![](/public/img/20250723114145.png)