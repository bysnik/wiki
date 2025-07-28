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
```sql
CREATE USER gitea WITH PASSWORD '123';
```

Создание базы данных gitea:
```sql
CREATE DATABASE gitea;
```

Предоставление всех привилегий пользователю gitea для управление базой данных gitea:
```sql
GRANT ALL PRIVILEGES ON DATABASE gitea TO gitea;
```

Изменение владельца базой данных gitea на пользователя gitea:
```sql
ALTER DATABASE gitea OWNER TO gitea;
```

Выход из командной оболочки PostgreSQL:
```sql
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
```sql
CREATE USER 'gitea'@'localhost' IDENTIFIED BY '123';
```
 
Создание базы данных gitea:
```sql
CREATE DATABASE gitea;
```

Предоставление всех привилегий пользователю gitea для управление базой данных gitea:
```sql
GRANT ALL PRIVILEGES ON * . * TO 'gitea'@'localhost';
```

Выход из командной оболочки MySQL:
```sql
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
- GITEA_INSTANCE_URL - ЮРЛ Вашего Гитеа, например http://192.168.0.1:3000 (лупбэк не работает)
- GITEA_RUNNER_REGISTRATION_TOKEN - Токен, который был получен ранее
- GITEA_RUNNER_NAME - имя раннера
- GITEA_RUNNER_LABELS - необязательный лейбл, можно просто удалить

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

### Раннер на Альт Р11

Необходимо собрать Docker образ раннера на базе Альт Р11. 

Скачайте бинарник раннера с сайта Gitea: https://dl.gitea.com/act_runner/
	Я использовал файл act_runner-0.2.12-linux-amd64. Переименуйте его просто в act_runner.

Далее необходимо создать рабочий каталог, поместить в него файл раннера. Далее в этом же каталоге создаем файл Dockerfile:
```Dockerfile
FROM alt:p11

CMD ["/bin/sh"]

RUN /bin/sh -c 'apt-get update && apt-get install git'

COPY ./act_runner /usr/local/bin/act_runner

COPY ./run.sh /usr/local/bin/run.sh

VOLUME [/var/run/docker.sock]

VOLUME [/data]

ENTRYPOINT ["run.sh"]
```

Далее, в этой же директории создаем файл run.sh:
```bash
#!/usr/bin/env bash

if [[ ! -d /data ]]; then
  mkdir -p /data
fi

cd /data

RUNNER_STATE_FILE=${RUNNER_STATE_FILE:-'.runner'}

CONFIG_ARG=""
if [[ ! -z "${CONFIG_FILE}" ]]; then
  CONFIG_ARG="--config ${CONFIG_FILE}"
fi
EXTRA_ARGS=""
if [[ ! -z "${GITEA_RUNNER_LABELS}" ]]; then
  EXTRA_ARGS="${EXTRA_ARGS} --labels ${GITEA_RUNNER_LABELS}"
fi
if [[ ! -z "${GITEA_RUNNER_EPHEMERAL}" ]]; then
  EXTRA_ARGS="${EXTRA_ARGS} --ephemeral"
fi
RUN_ARGS=""
if [[ ! -z "${GITEA_RUNNER_ONCE}" ]]; then
  RUN_ARGS="${RUN_ARGS} --once"
fi

# In case no token is set, it's possible to read the token from a file, i.e. a Docker Secret
if [[ -z "${GITEA_RUNNER_REGISTRATION_TOKEN}" ]] && [[ -f "${GITEA_RUNNER_REGISTRATION_TOKEN_FILE}" ]]; then
  GITEA_RUNNER_REGISTRATION_TOKEN=$(cat "${GITEA_RUNNER_REGISTRATION_TOKEN_FILE}")
fi

# Use the same ENV variable names as https://github.com/vegardit/docker-gitea-act-runner
test -f "$RUNNER_STATE_FILE" || echo "$RUNNER_STATE_FILE is missing or not a regular file"

if [[ ! -s "$RUNNER_STATE_FILE" ]]; then
  try=$((try + 1))
  success=0

  # The point of this loop is to make it simple, when running both act_runner and gitea in docker,
  # for the act_runner to wait a moment for gitea to become available before erroring out.  Within
  # the context of a single docker-compose, something similar could be done via healthchecks, but
  # this is more flexible.
  while [[ $success -eq 0 ]] && [[ $try -lt ${GITEA_MAX_REG_ATTEMPTS:-10} ]]; do
    act_runner register \
      --instance "${GITEA_INSTANCE_URL}" \
      --token    "${GITEA_RUNNER_REGISTRATION_TOKEN}" \
      --name     "${GITEA_RUNNER_NAME:-`hostname`}" \
      ${CONFIG_ARG} ${EXTRA_ARGS} --no-interactive 2>&1 | tee /tmp/reg.log

    cat /tmp/reg.log | grep 'Runner registered successfully' > /dev/null
    if [[ $? -eq 0 ]]; then
      echo "SUCCESS"
      success=1
    else
      echo "Waiting to retry ..."
      sleep 5
    fi
  done
fi
# Prevent reading the token from the act_runner process
unset GITEA_RUNNER_REGISTRATION_TOKEN
unset GITEA_RUNNER_REGISTRATION_TOKEN_FILE

exec act_runner daemon ${CONFIG_ARG} ${RUN_ARGS}
```

Теперь собираем Docker образ:
```bash
docker build -t alt11runner:0.5 .
```

Теперь можно запустить раннер командой:
```bash
docker run -e GITEA_INSTANCE_URL=https://your_gitea.com -e GITEA_RUNNER_REGISTRATION_TOKEN=<your_token> -v /var/run/docker.sock:/var/run/docker.sock --name my_runner alt11runner:0.5
```

Или же используя Docker compose. Для этого создаем файл docker-compose.yml:
```yaml
services:
  runner:
    image: alt11runner:0.5
    environment:
      CONFIG_FILES: /config.yaml
      GITEA_INSTANCE_URL: https://your_gitea.com
      GITEA_RUNNER_REGISTRATION_TOKEN: <your_token>
      GITEA_RUNNER_NAME: <your_runner_name>
    volumes:
      - ./config.yaml:/config.yaml
      - ./data:/data
      - /var/run/docker.sock:/var/run/docker.sock
```

И запускаем контейнер командой:
```bash
docker compose up
```

И типа всё здорово должно быть

Кстати прикол, запуская контейнер используя Docker Compose, он не воспринимает файл config.yaml. То есть не считывает с него конифги. С директорией data всё нормально, он туда пишет параметры раннера.