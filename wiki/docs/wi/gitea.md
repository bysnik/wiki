---
outline: deep
---

# Gitea

![](/public/img/20250728123353.png)

это бесплатный сервис с открытым исходным кодом для хостинга Git-репозиториев, разработанный для совместной работы над проектами. Он предоставляет функциональность для хранения, управления и совместной работы над исходным кодом, включая такие инструменты, как отслеживание ошибок, ревью кода, непрерывная интеграция и многое другое.

## Установка Gitea

Установка Gitea:
```bash
apt-get install gitea
```
## Установка СУБД

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

### Настройка SQLite

Установка SQLite:
```bash
apt-get install sqlite3
```

Создаем базу данных НЕ ПОД ПОЛЬЗОВАТЕЛЕМ ROOT:
```bash
sqlite3 gitea.db
```

Ну, вроде всё. Нужно это только проверить)
### Настройка TiDB

В настоящее время TiDB находится в Сизифе: https://packages.altlinux.org/ru/sisyphus/srpms/tidb/ поэтому, я думаю, пока не стоит его трогать.

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

При первом запуске Gitea по адресу localhost:3000 (или тому, который был настроен) появится меню начальной конфигурации.

Главные настройки:

Тип базы данных: выбрать базу данных, которая была создана.

Имя пользователя : gitea

Пароль: 123

Схема (если PostgreSQL): Оставить поле пустым.

Настройка учётной записи администратора: Создание учётной записи администратора необязательно. Первый зарегистрированный пользователь автоматически становится администратором.

## Gitea Actions

В системе, где будет работать раннер, должен быть установлен Docker. [Установка Docker](./docker)
### Быстрый старт

#### Получение токена

Вы можете получить токены разных уровней из следующих источников для создания участников соответствующего уровня:

- Уровень экземпляра: страница настроек администратора, например `<your_gitea.com>/-/admin/actions/runners`.
- Уровень организации: страница настроек организации, например `<your_gitea.com>/<org>/settings/actions/runners`.
- Уровень репозитория: страница настроек репозитория, например `<your_gitea.com>/<owner>/<repo>/settings/actions/runners`.

Будем использовать уровень репозитория. Справа в верху: Создать новый раннер. Копируем Токен.

![](/public/img/20250723113505.png)

#### Запуск локально

Скачайте бинарник раннера с сайта Gitea: https://dl.gitea.com/act_runner/

::: info
Я использовал файл act_runner-0.2.12-linux-amd64
:::

Переименуйте его просто в act_runner.

Конфигурация выполняется с помощью файла конфигурации. Это необязательно, и если файл конфигурации не указан, будет использоваться конфигурация по умолчанию. Вы можете создать файл конфигурации, выполнив следующую команду:

```bash
./act_runner generate-config
```

Конфигурация по умолчанию безопасна и не требует никаких изменений, поэтому вы можете просто использовать ее напрямую.

```bash
./act_runner generate-config > config.yaml
./act_runner --config config.yaml [command]
```

##### Регистрация раннера 

Перед запуском исполнителя актов требуется регистрация, поскольку исполнителю необходимо знать, откуда брать задания. Кроме того, экземпляру Gitea важно идентифицировать исполнителя.

Act Runner можно зарегистрировать, выполнив следующую команду.

```bash
./act_runner register
```

В качестве альтернативы вы можете воспользоваться `--config`возможностью указать файл конфигурации, упомянутый в предыдущем разделе.

```bash
./act_runner --config config.yaml register
```

Вам будет предложено ввести регистрационную информацию поэтапно. Включает:

- URL-адрес экземпляра Gitea, например `https://gitea.com/`или `http://192.168.8.8:3000/`.
- Регистрационный токен.
- Имя исполнителя (необязательно). Если оставить поле пустым, будет использовано имя хоста.
- Метки бегунков (необязательно). Если оставить поле пустым, будут использоваться метки по умолчанию.

Если вы хотите зарегистрировать раннер неинтерактивным способом, вы можете использовать для этого аргументы.

```bash
./act_runner register --no-interactive --instance <instance_url> --token <registration_token> --name <runner_name> --labels <runner_labels>
```

После регистрации участника вы увидите новый файл с именем `.runner`в текущем каталоге. В этом файле хранится регистрационная информация. Пожалуйста, не редактируйте его вручную. Если этот файл отсутствует или повреждён, вы можете просто удалить его и зарегистрировать заново.

Если вы хотите сохранить регистрационную информацию в другом месте, вы можете указать это в файле конфигурации, и не забудьте указать соответствующую `--config`опцию.

##### Запуск в командной строке

После регистрации раннера вы можете запустить его, выполнив следующую команду:

```bash
./act_runner daemon
```

или

```bash
./act_runner daemon --config config.yaml
```

Исполнитель будет извлекать задания из экземпляра Gitea и запускать их автоматически.

##### Запуск с помощью systemd

Act-Runner также можно запустить как 
службу [systemd](https://en.wikipedia.org/wiki/Systemd). Создайте в системе непривилегированного пользователя `act_runner` и следующий файл: `/etc/systemd/system/act_runner.service`. Пути в `ExecStart`и `WorkingDirectory` возможно потребуется изменить в зависимости от того, где установлен `act_runner`исполняемый файл, его конфигурационный файл и домашний каталог пользователя `act_runner`.

```bash
[Unit]
Description=Gitea Actions runner
Documentation=https://gitea.com/gitea/act_runner
After=docker.service

[Service]
ExecStart=/usr/local/bin/act_runner daemon --config /etc/act_runner/config.yaml
ExecReload=/bin/kill -s HUP $MAINPID
WorkingDirectory=/var/lib/act_runner
TimeoutSec=0
RestartSec=10
Restart=always
User=act_runner

[Install]
WantedBy=multi-user.target
```

Затем:

```bash
# load the new systemd unit filesudo 
systemctl daemon-reload
# start the service and enable it at bootsudo 
systemctl enable act_runner --now
```

При использовании Docker `act_runner`необходимо добавить пользователя в `docker`группу перед запуском сервиса. Имейте в виду, что это фактически даёт `act_runner`root-доступ к системе [[1]](https://docs.docker.com/engine/security/#docker-daemon-attack-surface).

#### Запуск в Docker контейнере

##### Одной командой

```bash
docker run -e GITEA_INSTANCE_URL=https://your_gitea.com -e GITEA_RUNNER_REGISTRATION_TOKEN=<your_token> -v /var/run/docker.sock:/var/run/docker.sock --name my_runner_name docker.io/gitea/act_runner:latest
```
##### С помощью Docker Compose
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

Либо создавайте переменные окружения, что будет правильнее, либо вписывайте значения вместо переменных:
- GITEA_INSTANCE_URL - ЮРЛ Вашего Гитеа, например http://192.168.0.1:3000 (лупбэк не работает)
- GITEA_RUNNER_REGISTRATION_TOKEN - Токен, который был получен ранее
- GITEA_RUNNER_NAME - придумать имя раннера
- GITEA_RUNNER_LABELS - необязательный лейбл, можно просто удалить

Запуск Act Runner:
```bash
docker compose up
```

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

Собираем Docker образ раннера на базе образа Альт Р11. 

Создайте директорию в которой будете работать. Dockerfile, act_runner и run.sh Будут располагаться в этой директории.

Скачайте бинарник раннера с сайта Gitea: https://dl.gitea.com/act_runner/

::: info
Я использовал файл act_runner-0.2.12-linux-amd64
:::

Переименуйте его просто в act_runner.

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

::: info
Этот файл был взят из оригинально gitea act runner. Редактировать файл не нужно.
:::

Теперь собираем Docker образ:
```bash
docker build -t alt11runner:0.5 .
```

Версия 0.5 потому что образ явно ещё не идеален) Вы можете писать любое название, главное потом его использовать вместо этого.

Теперь можно запустить раннер командой:
```bash
docker run -e GITEA_INSTANCE_URL=https://your_gitea.com -e GITEA_RUNNER_REGISTRATION_TOKEN=<your_token> -v /var/run/docker.sock:/var/run/docker.sock --name my_runner_name alt11runner:0.5
```

Или же используя Docker compose. Почему то, если делать этот файл в той же директории, что и Dockerfile, то начнутся странные ошибки, поэтому лучше писать compose файл и запускать его в другой директории. Создаем файл docker-compose.yml:
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

Кстати прикол, запуская контейнер используя Docker Compose, не работают volumes. Что с альтовым образом, что с оригинальным


## Файл config.yaml

```yaml
# Пример файла конфигурации, можно безопасно использовать этот файл как стандартную конфигурацию без изменений.

# Не обязательно копировать этот файл в свою систему,
# можно просто выполнить `./act_runner generate-config > config.yaml` для генерации файла конфигурации.

log:
  # Уровень логирования, возможные значения: trace, debug, info, warn, error, fatal
  level: info

runner:
  # Где сохранять результат регистрации.
  file: .runner
  # Сколько задач выполнять одновременно.
  capacity: 1
  # Дополнительные переменные окружения для выполнения задач.
  envs:
    A_TEST_ENV_NAME_1: a_test_env_value_1
    A_TEST_ENV_NAME_2: a_test_env_value_2
  # Дополнительные переменные окружения из файла для выполнения задач.
  # Будет проигнорировано, если файл пуст или не существует.
  env_file: .env
  # Таймаут завершения задачи.
  # Обратите внимание, что экземпляр Gitea также имеет таймаут (по умолчанию 3ч) для задачи.
  # Поэтому задача может быть остановлена экземпляром Gitea, если его таймаут короче этого.
  timeout: 3h
  # Таймаут ожидания завершения выполняющихся задач при остановке runner'а.
  # Все выполняющиеся задачи, не завершившиеся за это время, будут отменены.
  shutdown_timeout: 0s
  # Пропускать проверку TLS-сертификата экземпляра Gitea.
  insecure: false
  # Таймаут получения задачи от экземпляра Gitea.
  fetch_timeout: 5s
  # Интервал опроса экземпляра Gitea для получения задач.
  fetch_interval: 2s
  # Метки runner'а определяют, какие задачи он может выполнять и как их выполнять.
  # Например: "macos-arm64:host" или "ubuntu-latest:docker://docker.gitea.com/runner-images:ubuntu-latest"
  # Больше образов от Gitea можно найти на https://gitea.com/docker.gitea.com/runner-images .
  # Если оставить пустым при регистрации, будет запрошен ввод меток.
  # Если оставить пустым при выполнении `daemon`, будут использованы метки из файла `.runner`.
  labels:
    - "ubuntu-latest:docker://docker.gitea.com/runner-images:ubuntu-latest"
    - "ubuntu-22.04:docker://docker.gitea.com/runner-images:ubuntu-22.04"
    - "ubuntu-20.04:docker://docker.gitea.com/runner-images:ubuntu-20.04"

cache:
  # Включить сервер кеширования для использования actions/cache.
  enabled: true
  # Директория для хранения кешированных данных.
  # Если оставить пустым, данные будут храниться в $HOME/.cache/actcache.
  dir: ""
  # Хост сервера кеширования.
  # Это не адрес для прослушивания, а адрес для подключения из контейнеров задач.
  # Поэтому 0.0.0.0 - плохой выбор, оставьте пустым для автоматического определения.
  host: ""
  # Порт сервера кеширования.
  # 0 означает использование случайного доступного порта.
  port: 0
  # URL внешнего сервера кеширования. Действует только при enabled: true.
  # Если указан, act_runner будет использовать этот URL как ACTIONS_CACHE_URL вместо запуска собственного сервера.
  # URL обычно должен оканчиваться на "/".
  external_server: ""

container:
  # Указывает сеть, к которой будет подключен контейнер.
  # Может быть host, bridge или имя пользовательской сети.
  # Если оставить пустым, act_runner создаст сеть автоматически.
  network: ""
  # Использовать ли привилегированный режим при запуске контейнеров задач (требуется для Docker-in-Docker).
  privileged: false
  # Дополнительные опции при запуске контейнера (например, --add-host=my.gitea.url:host-gateway).
  options:
  # Родительская директория рабочей директории задачи.
  # ПРИМЕЧАНИЕ: Не нужно добавлять первый '/' в пути, так как act_runner добавит его автоматически.
  # Если путь начинается с '/', этот '/' будет удален.
  # Например, если родительская директория /path/to/my/dir, workdir_parent должен быть path/to/my/dir
  # Если оставить пустым, будет использоваться /workspace.
  workdir_parent:
  # Тома (включая bind mounts) могут быть подключены к контейнерам. Поддерживается glob-синтаксис, см. https://github.com/gobwas/glob
  # Можно указать несколько томов. Если последовательность пуста, тома не могут быть подключены.
  # Например, если разрешить контейнерам монтировать только том `data` и все json-файлы в `/src`, конфигурация должна быть:
  # valid_volumes:
  #   - data
  #   - /src/*.json
  # Если нужно разрешить любые тома, используйте следующую конфигурацию:
  # valid_volumes:
  #   - '**'
  valid_volumes: []
  # Переопределяет хост docker client указанным.
  # Если оставить пустым, act_runner найдет доступный docker host автоматически.
  # Если указано "-", act_runner найдет доступный docker host автоматически, но он не будет подключен к контейнерам задач и сервисным контейнерам.
  # Если не пусто и не "-", будет использован указанный docker host. Если он не работает, будет возвращена ошибка.
  docker_host: ""
  # Принудительно загружать образ(ы) Docker, даже если они уже есть
  force_pull: true
  # Пересобирать образ(ы) Docker, даже если они уже есть
  force_rebuild: false

host:
  # Родительская директория рабочей директории задачи.
  # Если оставить пустым, будет использоваться $HOME/.cache/act/.
  workdir_parent:
```

## Файлы README профиля

Чтобы отобразить файл Markdown на странице профиля пользователя или организации Gitea, создайте репозиторий с именем `.profile`и добавьте в него новый файл с именем `README.md`. Gitea автоматически отобразит содержимое файла в вашем профиле, в новой области «Обзор» над вашими репозиториями.

Если сделать `.profile`репозиторий закрытым, файл README профиля будет скрыт.
