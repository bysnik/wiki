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

Выходим из базы данных сочетанием клавиш `Ctrl+D`

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

### Получение токена

Вы можете получить токены разных уровней из следующих источников для создания участников соответствующего уровня:

- Уровень экземпляра: страница настроек администратора, например `<your_gitea.com>/-/admin/actions/runners`.
- Уровень организации: страница настроек организации, например `<your_gitea.com>/<org>/settings/actions/runners`.
- Уровень репозитория: страница настроек репозитория, например `<your_gitea.com>/<owner>/<repo>/settings/actions/runners`.

Будем использовать уровень репозитория. Справа в верху: Создать новый раннер. Копируем Токен.

![](/public/img/20250723113505.png)

### Быстрый старт

#### Запуск локально

Скачайте бинарник раннера с сайта Gitea: https://dl.gitea.com/act_runner/

::: info Информация
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

Act-Runner также можно запустить как  службу [systemd](https://en.wikipedia.org/wiki/Systemd). Создайте в системе непривилегированного пользователя `act_runner` и следующий файл: `/etc/systemd/system/act_runner.service`. Пути в `ExecStart`и `WorkingDirectory` возможно потребуется изменить в зависимости от того, где установлен `act_runner` исполняемый файл, его конфигурационный файл и домашний каталог пользователя `act_runner`.

```systemd
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
docker run \
    -e GITEA_INSTANCE_URL=https://your_gitea.com \
    -e GITEA_RUNNER_REGISTRATION_TOKEN=<your_token> \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --name my_runner_name \
    docker.io/gitea/act_runner:latest
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
# Prevent reading the ![](/public/img/giteaalt.png)token from the act_runner process
unset GITEA_RUNNER_REGISTRATION_TOKEN
unset GITEA_RUNNER_REGISTRATION_TOKEN_FILE

exec act_runner daemon ${CONFIG_ARG} ${RUN_ARGS}
```

::: info Информация
Этот файл был взят из оригинально gitea act runner. Редактировать файл не нужно.
:::

Теперь собираем Docker образ:
```bash
docker build -t alt11runner:0.5 .
```

Версия 0.5 потому что образ явно ещё не идеален) Вы можете писать любое название, главное потом его использовать вместо этого.

Теперь можно запустить раннер командой:
```bash
docker run \
    -e GITEA_INSTANCE_URL=https://your_gitea.com \
    -e GITEA_RUNNER_REGISTRATION_TOKEN=<your_token> \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --name my_runner_name \
    alt11runner:0.5
```

Или же используя Docker compose. Почему то, если вы, например, накосячили, или просто решили несколько раз сделать `docker compose up` то докер начинает нести чушь и ругается на пути, поэтому лучше каждый раз работать в новом рабочем каталоге (помогало просто его каждый раз переименовывать). Создаем файл docker-compose.yml:
```yaml
services:
  runner:
    image: alt11runner:0.5
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

И запускаем контейнер командой:
```bash
docker compose up
```

И типа всё здорово)


### Workflow image на Alt:P11

Итак, первая задача - зарегистрировать в раннере образ Альт:П11 с докерхаба. Для этого, добавляем в конфигурационный файл, в блок `label` следующую запись:

```yaml
- "alt-p11:docker://docker.io/library/alt:p11"
```

Сохраняем конфиги. Запускаем раннер.

В Gitea мы должны увидеть наш зарегистрированный раннер:

![](/public/img/giteaalt.png)

Там мы должны увидеть нашу метку.

Тепер создаем репозиторий и прописываем workflow файл. В качестве примера будет аналогичный workflow как в предыдущем примере, но есть несколько отличий. Пример:

.gitea/workflows/demo.yaml:
```yaml
name: AltP11 Actions Demo
run-name: ${{ gitea.actor }} is testing out Gitea Actions
on: [push]

jobs:
  Explore-Gitea-Actions:
    runs-on: alt-p11
    steps:
      - name: Install git and node
        run: |
          apt-get update && apt-get install -y git node
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

Всё остально аналогично, как и обычно.

::: warning Предупреждение
В связи с тем, что образ alt:p11 это не специальный образ под Actions, он пустой (просто голая система с минимальным набором пакетов), и требует установки всех необходимых зависимостей в нём, иначе ничего работать не будет.
:::

::: info Пояснение
Данный гайд - это самый простой вариант использования образа альта для workflow. Можно собрать свой образ с необходимым инструментарием, например. Никто этого не запрещает.
:::

### Пример: сборка RPMBUILD
#### Подготовка Docker образа alt:p11 

Для сборки пакетов неообходимо использовать заранее подготовленный образ со всем необходимым.

Первым делом создаем рабочую директорию. Создаем файл Dockerfile с примерно следующим содержимым:

```Dockerfile
FROM alt:p11

RUN groupadd -r runner && useradd -r -m -g runner runner

RUN apt-get update && apt-get install git-core node rpmdevtools rpm-build gcc-c++

USER runner

RUN rpmdev-setuptree

CMD ["/bin/bash"]
```

Собираем образ:

```bash
docker build -t alt-p11-rpmbuild .
```

Создадим тэг, чтобы загрузить образ в локальный репозиторий:

```bash
docker tag alt-p11-rpmbuild localhost:5000/alt-p11-rpmbuild
```

#### Пушим на локальный репозиторий Docker

Раннер понимает docker-образы, расположенные исключительно в репозитории, например [Harbor](harbor) или любом другом. В данном разделе будет развёрнут самый простой репозиторий в docker-контейнере.

Репозиторий будет локальным относительно раннера, то есть быть контейнером на том же хосте, что и сам раннер.

```bash
docker run -d -p 5000:5000 --restart always --name registry registry:3
```

Загружаем ранее подготовленный образ:

```bash
docker push localhost:5000/alt-p11-rpmbuild
```

#### Редактирования конфигурации раннера

Зарегистрируем в раннере ранее созданный образ. Для этого отредактируем файл config.yaml раннера. Необходимо добавить в блок `label` следующую запись:

```yaml
- "alt-p11-rpmbuild:docker://localhost:5000/alt-p11-rpmbuild"
```

Перезагружаем раннер.

Проверяем, что наш образ определился:

![](/public/img/altp11rpmbuild.png)

#### Workflow

Для примера, будем использовать проект https://gitlab.basealt.space/alt/edu/ExampleFirstProject.git

Необходимо создать новый репозиторий, поместить в него файлы из брэнча rpmbuild-v1.

Как это сделать, можно узнать [вот тут](git#как-клонировать-определенныи-брэнч)

Далее, создаем файл с примерно следующим содержанием:

.gitea/workflows/demo.yaml:
```yaml
name: AltP11 RPM Demo
run-name: ${{ gitea.actor }} is testing out Gitea Actions RPM Build
on:
  push:
    tags:
        - 'v*'

jobs:
  Build-RPM:
    runs-on: alt-p11-rpmbuild
    steps:
      - uses: actions/checkout@v4
      - run: echo "%_topdir    %homedir/RPM" > ~/.rpmmacros && echo "%packager   Nikita Bystrov bystrovno@basealt.ru" >> ~/.rpmmacros
      - run: tar cvf HelloUniverse-1.0.tar HelloUniverse
      - run: cp HelloUniverse-1.0.tar ~/RPM/SOURCES/
      - run: cp HelloUniverse.spec ~/RPM/SPECS/
      - run: rpmbuild -ba ~/RPM/SPECS/HelloUniverse.spec
      - name: Release
        uses: softprops/action-gh-release@v2
        if: github.ref_type == 'tag'
        with:
          files: |
            /home/runner/RPM/RPMS/x86_64/HelloUniverse-1.0-alt1.x86_64.rpm
            /home/runner/RPM/RPMS/x86_64/HelloUniverse-debuginfo-1.0-alt1.x86_64.rpm
            /home/runner/RPM/SRPMS/HelloUniverse-1.0-alt1.src.rpm
```

В итоге должно получиться примерно следующее:

![alt text](/public/img/image.png)

(Если нет файла Readme, это не проблема)

#### Сборка и релиз

Итак, в файле `.gitea/workflows/demo.yaml` было указано, что этот workflow будет запускаться только тогда, когда он пушится в тэг. Поэтому теперь задача этот тэг создать. Сделано это затем, чтобы сборка происходила только при создании релиза.

Заходим в раздел Релизы:

![alt text](/public/img/image-0.png)

Справа вверху кнопка Новый релиз. Нажимаем её и переходим в создание релиза.

Минимально достаточно лишь придумать номер тэга. В нашем случае, в workflow файле было указано правило, что сборка будет произведена только тогда, когда номер тэга будет в виде например: v0.0.1

![alt text](/public/img/image-2.png)

Указываем номер тэга и нажимаем внизу Создать только тэг.

Сразу же запустится Действие. 

![alt text](/public/img/image-222.png)

После его завершения, если зайти в раздел Релизы, то можно будет увидеть созданный релиз, в котором будут содержаться как исходные коды, так и собранные пакеты:

![alt text](/public/img/image-3.png)

### Пример: сборка HASHER

Требует изменение образа alt-p11-rpmbuild, создадим отдельный образ

### Пример: сборка GEAR

Требует изменение образа alt-p11-rpmbuild, создадим отдельный образ

Есть два варианта работы Gear, в связке с:
- rpmbuild
- hasher


### Запуск раннера с помощью Podman

#### Одной командой
```bash
podman run \
    -e GITEA_INSTANCE_URL=http://gitea:3000 \
    -e GITEA_RUNNER_REGISTRATION_TOKEN=<token goes here> \
    -e GITEA_RUNNER_NAME=gitea_runner \
    -e DOCKER_HOST=unix:///run/podman/podman.sock \
    -v /run/podman/podman.sock:/run/podman/podman.sock \
    --name gitea_podman_runner \
    docker.io/gitea/act_runner:latest
```

#### Podman Compose


## Файл config.yaml

<details>
  <summary>Показать код</summary>

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

</details>

## Настройка Fail2ban

Помните, что fail2ban — мощный инструмент, и при неправильном использовании он может вызвать множество проблем, поэтому обязательно протестируйте его, прежде чем полагаться на него, чтобы не оказаться в затруднительном положении.

Gitea возвращает HTTP 200 для неудачных попыток входа в веб-журналы, но если у вас есть параметры ведения журнала в `app.ini`, то вы должны иметь возможность выйти из `log/gitea.log`.

Добавьте наш фильтр в `/etc/fail2ban/filter.d/gitea.local`:
```ini
# gitea.local
[Definition]
failregex =  .*(Failed authentication attempt|invalid credentials|Attempted access of unknown user).* from <HOST>
ignoreregex =
```

Добавьте нашу тюрьму в `/etc/fail2ban/jail.d/gitea.local`:

```ini
[gitea]
enabled = true
filter = gitea
logpath = /var/lib/gitea/log/gitea.log
maxretry = 10
findtime = 3600
bantime = 900
action = iptables-allports
```

Если вы используете Docker, вам также потребуется добавить дополнительную джейл для обработки цепочки FORWARD в iptables . Настройте её в `/etc/fail2ban/jail.d/gitea-docker.local`:

```ini
[gitea-docker]
enabled = true
filter = gitea
logpath = /var/lib/gitea/log/gitea.log
maxretry = 10
findtime = 3600
bantime = 900
action = iptables-allports[chain="FORWARD"]
```

Затем просто запустите `systemctl restart fail2ban`, чтобы применить изменения. Вы можете проверить, принял ли fail2ban вашу конфигурацию, с помощью `systemctl status fail2ban`.

Обязательно изучите fail2ban и настройте его под свои нужды. Он банит кого-то на 15 минут (на всех портах), если он не пройдет аутентификацию 10 раз в час.

Если вы запускаете Gitea через обратный прокси-сервер с Nginx (например, с Docker), вам необходимо добавить это в конфигурацию Nginx, чтобы IP-адреса не отображались как `127.0.0.1`:
```nginx
proxy_set_header X-Real-IP $remote_addr;
```

Необходимо настроить параметры безопасности `app.ini`, чтобы обеспечить интерпретацию заголовков, а также списка IP-адресов и сетей, описывающих доверенные прокси-серверы.
```ini
REVERSE_PROXY_LIMIT = 1
REVERSE_PROXY_TRUSTED_PROXIES = 127.0.0.1/8 ; 172.17.0.0/16 for the docker default network
```

## Добавление юридической страницы (Политика конфиденциальности)

Создаем директорию откуда Gitea будет брать файл политики:
```bash
mkdir -p /var/lib/gitea/custom/public/assets/
```

Скачиваем шаблон политики:
```bash
wget -O /var/lib/gitea/custom/public/assets/privacy.html https://raw.githubusercontent.com/go-gitea/gitea/main/contrib/legal/privacy.html.sample
```

Далее этот шаблон необходимо отредактировать под свои нужды.

Создаем директорию для расширения HTML:
```bash
mkdir -p /var/lib/gitea/custom/templates/custom/
```

Создаем файл расширения HTML для внедрения ссылки на политику в футер Gitea:
```bash
echo "<a class="item" href="{{AppSubUrl}}/assets/privacy.html">Политика конфиденциальности</a>" > /var/lib/gitea/custom/templates/custom/extra_links_footer.tmpl
```

Перезагружаем сервис Gitea
```bash
systemctl restart gitea
```



## Файлы README профиля

Чтобы отобразить файл Markdown на странице профиля пользователя или организации Gitea, создайте репозиторий с именем `.profile`и добавьте в него новый файл с именем `README.md`. Gitea автоматически отобразит содержимое файла в вашем профиле, в новой области «Обзор» над вашими репозиториями.

Если сделать `.profile`репозиторий закрытым, файл README профиля будет скрыт.

___

## Далее лишь бункер неотработанного материала.

### Cron (`cron`)

- `ENABLED`: **false**: Включить периодическое выполнение всех cron-задач с настройками по умолчанию.
- `RUN_AT_START`: **false**: Запускать cron-задачи при старте приложения.
- `NOTICE_ON_SUCCESS`: **false**: Установите `true`, чтобы включить уведомления об успешном выполнении.
- `SCHEDULE` поддерживает форматы:
    - Полные crontab-спецификации, например, `* * * * * ?`
    - Дескрипторы, например, `@midnight`, `@every 1h30m` ...
    - Подробнее: [документация cron](https://pkg.go.dev/github.com/gogs/cron@v0.0.0-20171120032916-9f6c956d3e14)

### Базовые cron-задачи — включены по умолчанию  

Cron - Очистка старых архивов репозиториев (`cron.archive_cleanup`)

- `ENABLED`: **true**: Включить сервис.
- `RUN_AT_START`: **true**: Запускать задачи при старте (если `ENABLED`).
- `NOTICE_ON_SUCCESS`: **false**: Выводить ли уведомление при успешном выполнении.
- `SCHEDULE`: **@midnight**: Cron-синтаксис для очистки архивов репозиториев, например, `@every 1h`.
- `OLDER_THAN`: **24h**: Архивы, созданные более `OLDER_THAN` назад, будут удалены, например, `12h`.
- Удаляет временные архивы (.zip, .tar.gz), созданные при скачивании репозиториев.
- Без этой задачи дисковое пространство может постепенно заполняться ненужными файлами.

Cron - Обновление зеркал (`cron.update_mirrors`)

- `ENABLED`: **true**: Включить периодическое выполнение задачи обновления зеркал.
- `SCHEDULE`: **@every 10m**: Cron-синтаксис для обновления зеркал, например, `@every 3h`.
- `RUN_AT_START`: **false**: Запускать задачу при старте Gitea.
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять только при ошибках.
- `PULL_LIMIT`: **50**: Ограничить количество зеркал, добавляемых в очередь (отрицательные значения — без ограничений, `0` отключает обновление pull-зеркал).
- `PUSH_LIMIT`: **50**: Ограничить количество push-зеркал, добавляемых в очередь (отрицательные значения — без ограничений, `0` отключает обновление push-зеркал).
- Проверяет обновления в зеркалах (mirror repositories) и синхронизирует их.
- Если у тебя есть зеркала репозиториев, теперь они не будут автоматически обновляться.(походу этот параметр перебивает базовое зеркалирование.)

Cron - Проверка здоровья репозиториев (`cron.repo_health_check`)

- `ENABLED`: **true**: Включить периодическую проверку здоровья репозиториев.
- `SCHEDULE`: **@midnight**: Cron-синтаксис для проверки здоровья репозиториев.
- `RUN_AT_START`: **false**: Запускать задачу при старте Gitea.
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять только при ошибках.
- `TIMEOUT`: **60s**: Максимальное время выполнения проверки.
- `ARGS`: **_empty_**: Аргументы для команды `git fsck`, например, `--unreachable --tags`. Подробнее: [http://git-scm.com/docs/git-fsck](http://git-scm.com/docs/git-fsck)
- Проверяет репозитории на повреждения (например, отсутствующие файлы или некорректные коммиты).
- Если репозитории работают стабильно, проблем не будет, но в долгосрочной перспективе могут появиться “битые” репозитории, если что-то сломается.

Cron - Проверка статистики репозиториев (`cron.check_repo_stats`)

- `SCHEDULE`: **@midnight**: Cron-синтаксис для проверки статистики репозиториев.
- `ENABLED`: **true**: Включить периодическую проверку.
- `RUN_AT_START`: **true**: Запускать задачу при старте Gitea.
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять только при ошибках.
- Пересчитывает количество коммитов, изменений, контрибьюторов.

Cron - Очистка таблицы `hook_task` (`cron.cleanup_hook_task_table`)

- `ENABLED`: **true**: Включить очистку таблицы `hook_task`.
- `RUN_AT_START`: **false**: Запускать очистку при старте (если `ENABLED`).
- `SCHEDULE`: **@midnight**: Cron-синтаксис для очистки таблицы.
- `CLEANUP_TYPE` **OlderThan**: Метод очистки: по возрасту (`OlderThan`) или количеству записей на вебхук (`PerWebhook`).
- `OLDER_THAN`: **168h**: Если `CLEANUP_TYPE = OlderThan`, записи старше этого значения будут удалены.
- `NUMBER_TO_KEEP`: **10**: Если `CLEANUP_TYPE = PerWebhook`, сохранять последние `N` записей для каждого вебхука.
- Удаляет старые уведомления о системных событиях.
- Если у тебя много пользователей, база данных может расти из-за ненужных логов.

Cron - Очистка просроченных пакетов (`cron.cleanup_packages`)

- `ENABLED`: **true**: Включить очистку просроченных пакетов.
- `RUN_AT_START`: **true**: Запускать задачу при старте (если `ENABLED`).
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять при каждом выполнении.
- `SCHEDULE`: **@midnight**: Cron-синтаксис для задачи.
- `OLDER_THAN`: **24h**: Данные пакетов, не имеющие ссылок и созданные более `OLDER_THAN` назад, будут удалены.
- Очищает устаревшие пакеты из Gitea Package Registry.
- Если ты используешь Gitea для хранения артефактов (например, Docker-образов, Maven-пакетов), они могут оставаться в системе навсегда.

Cron - Обновление `poster_id` в мигрированных репозиториях (`cron.update_migration_poster_id`)

Обновляет `poster_id` в issues и комментариях мигрированных репозиториев. Всегда выполняется при старте сервера.

- `ENABLED`: **true**: Включить задачу.
- `RUN_AT_START`: **true**: Обновлять `poster_id` при старте сервера.
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять только при ошибках.
- `SCHEDULE`: **@midnight**: Интервал между синхронизациями (всегда выполняется при старте).

Cron - Синхронизация внешних пользователей (`cron.sync_external_users`)

Синхронизация данных внешних пользователей (поддерживается только LDAP).

- `ENABLED`: **true**: Включить синхронизацию.
- `RUN_AT_START`: **false**: Синхронизировать при старте сервера.
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять только при ошибках.
- `SCHEDULE`: **@midnight**: Интервал между синхронизациями (всегда выполняется при старте).
- `UPDATE_EXISTING`: **true**: Создавать новых пользователей, обновлять существующих и отключать отсутствующих во внешнем источнике. Если `false` — только создавать новых.

Cron - Очистка просроченных ассетов Actions (`cron.cleanup_actions`)

- `ENABLED`: **true**: Включить очистку.
- `RUN_AT_START`: **true**: Запускать задачу при старте (если `ENABLED`).
- `SCHEDULE`: **@midnight**: Cron-синтаксис для задачи.

Cron - Очистка удалённых веток (`cron.deleted_branches_cleanup`)

- `ENABLED`: **true**: Включить очистку.
- `RUN_AT_START`: **true**: Запускать задачу при старте (если `ENABLED`).
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять при успешном выполнении.
- `SCHEDULE`: **@midnight**: Cron-синтаксис для очистки.
- `OLDER_THAN`: **24h**: Ветки, удалённые более `OLDER_THAN` назад, будут очищены.
- Удаляет метаданные о ветках, которые были удалены.
- Без этой задачи дисковое пространство может постепенно заполняться ненужными файлами.

### Расширенные cron-задачи

Cron - Удаление всех архивов репозиториев (`cron.delete_repo_archives`)

- `ENABLED`: **false**: Включить сервис.
- `RUN_AT_START`: **false**: Запускать задачу при старте (если `ENABLED`).
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять при успешном выполнении.
- `SCHEDULE`: **@annually**: Cron-расписание для удаления архивов, например, `@annually`.

Cron - Git GC для всех репозиториев (`cron.git_gc_repos`)

- `ENABLED`: **false**: Включить сервис.
- `RUN_AT_START`: **false**: Запускать задачу при старте (если `ENABLED`).
- `SCHEDULE`: **@every 72h**: Cron-синтаксис для задачи, например, `@every 1h`.
- `TIMEOUT`: **60s**: Максимальное время выполнения `git gc`.
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять при успешном выполнении.
- `ARGS`: **_empty_**: Аргументы для `git gc`, например, `--aggressive --auto`. По умолчанию совпадает с `[git] -> GC_ARGS`.
- Запускает git gc (сборщик мусора) для репозиториев, чтобы оптимизировать их размер.
- Если ты часто пушишь большие файлы, размер репозиториев может расти быстрее, чем обычно.

Cron - Обновление `authorized_keys` SSH-ключами Gitea (`cron.resync_all_sshkeys`)

- `ENABLED`: **false**: Включить сервис.
- `RUN_AT_START`: **false**: Запускать задачу при старте (если `ENABLED`).
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять при успешном выполнении.
- `SCHEDULE`: **@every 72h**: Cron-синтаксис для задачи, например, `@every 1h`.

Cron - Ресинхронизация хуков всех репозиториев (`cron.resync_all_hooks`)

- `ENABLED`: **false**: Включить сервис.
- `RUN_AT_START`: **false**: Запускать задачу при старте (если `ENABLED`).
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять при успешном выполнении.
- `SCHEDULE`: **@every 72h**: Cron-синтаксис для задачи, например, `@every 1h`.

Cron - Повторная инициализация отсутствующих Git-репозиториев (`cron.reinit_missing_repos`)

- `ENABLED`: **false**: Включить сервис.
- `RUN_AT_START`: **false**: Запускать задачу при старте (если `ENABLED`).
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять при успешном выполнении.
- `SCHEDULE`: **@every 72h**: Cron-синтаксис для задачи, например, `@every 1h`.

Cron - Удаление репозиториев без Git-файлов (`cron.delete_missing_repos`)

- `ENABLED`: **false**: Включить сервис.
- `RUN_AT_START`: **false**: Запускать задачу при старте (если `ENABLED`).
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять при успешном выполнении.
- `SCHEDULE`: **@every 72h**: Cron-синтаксис для задачи, например, `@every 1h`.

Cron - Удаление сгенерированных аватаров репозиториев (`cron.delete_generated_repository_avatars`)

- `ENABLED`: **false**: Включить сервис.
- `RUN_AT_START`: **false**: Запускать задачу при старте (если `ENABLED`).
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять при успешном выполнении.
- `SCHEDULE`: **@every 72h**: Cron-синтаксис для задачи, например, `@every 1h`.

Cron - Удаление старых Actions из БД (`cron.delete_old_actions`)

- `ENABLED`: **false**: Включить сервис.
- `RUN_AT_START`: **false**: Запускать задачу при старте (если `ENABLED`).
- `NOTICE_ON_SUCCESS`: **false**: Уведомлять при успешном выполнении.
- `SCHEDULE`: **@every 168h**: Интервал проверки.
- `OLDER_THAN`: **8760h**: Удалять Actions старше этого значения (рекомендуется `8760h` — 1 год, так как это максимум для heatmap).

Cron - Проверка новых версий Gitea (`cron.update_checker`)

- `ENABLED`: **true**: Включить сервис.
- `RUN_AT_START`: **false**: Запускать задачу при старте (если `ENABLED`).
- `ENABLE_SUCCESS_NOTICE`: **true**: Отключить уведомления об успехе, если `false`.
- `SCHEDULE`: **@every 168h**: Cron-синтаксис для задачи, например, `@every 168h`.
- `HTTP_ENDPOINT`: **[https://dl.gitea.com/gitea/version.json](https://dl.gitea.com/gitea/version.json)**: Эндпоинт для проверки новых версий.

Cron - Удаление старых системных уведомлений (`cron.delete_old_system_notices`)

- `ENABLED`: **false**: Включить сервис.
- `RUN_AT_START`: **false**: Запускать задачу при старте (если `ENABLED`).
- `NO_SUCCESS_NOTICE`: **false**: Отключить уведомления об успехе, если `true`.
- `SCHEDULE`: **@every 168h**: Интервал проверки.
- `OLDER_THAN`: **8760h**: Удалять уведомления старше этого значения.

Cron - Git LFS GC в репозиториях (`cron.gc_lfs`)

- `ENABLED`: **false**: Включить сервис.
- `RUN_AT_START`: **false**: Запускать задачу при старте (если `ENABLED`).
- `SCHEDULE`: **@every 24h**: Интервал проверки.
- `OLDER_THAN`: **168h**: Удалять LFS-объекты старше 7 дней.
- `LAST_UPDATED_MORE_THAN_AGO`: **72h**: Проверять только объекты, не обновлявшиеся более 3 дней.
- `NUMBER_TO_CHECK_PER_REPO`: **100**: Минимальное количество проверяемых объектов на репозиторий (`0` — проверять все).
- `PROPORTION_TO_CHECK_PER_REPO`: **0.6**: Проверять как минимум эту долю объектов на репозиторий (может привести к полной проверке).
- Удаляет устаревшие файлы из Git LFS (если используется).
- Если у тебя включен Git LFS, репозитории могут занимать больше места, чем нужно.

**Эти задачи отсутствуют в официальной документации, но есть на просторах интернета**

Задача `start_schedule_tasks`

- Задача `start_schedule_tasks` в Gitea отвечает за **запуск всех запланированных фоновых задач**, которые должны выполняться через определенные интервалы времени. Она запускается **каждую минуту**.

Задачи `stop_zombie_tasks` и `stop_endless_tasks`

- Останавливает фоновые задачи, которые зависли или выполняются бесконечно.
- Если в Gitea зависнет процесс (например, Git-команда или индексация), он может остаться активным навсегда и жрать ресурсы.


## Использование API
Включение/настройка 
По умолчанию `ENABLE_SWAGGER` установлено значение `true` и `MAX_RESPONSE_ITEMS` равное `50`.

### Аутентификация

Gitea поддерживает следующие методы аутентификации API:

Базовая HTTP-аутентификация  
`token=...` параметр в строке запроса URL  
`access_token=...` параметр в строке запроса URL  
`Authorization: token ...` заголовок в заголовках HTTP  

Все эти методы принимают один и тот же тип токена API-ключа.

### Генерация токена

Вы  можете создать токен API через веб-интерфейс вашей установки Gitea: Настройки - Приложения - Создать новый токен.

![alt text](/public/img/generate-api-token.png)
