---
outline: deep
---

# Forgejo

<br>

<div align="center">
    <img src="https://static.wikia.nocookie.net/logopedia/images/2/28/Forgejo.svg" width="300" alt="Forgejo Logo">
</div>

Forgejo — это свободная и открытая платформа для хостинга Git-репозиториев, созданная как дружелюбный **форк проекта [Gitea](gitea)** в ответ на изменения в его управлении. Она предоставляет все ключевые функции для совместной разработки: управление репозиториями, отслеживание задач (issues), pull requests, встроенный CI/CD, вики, а также инструменты для управления проектами и командами.

https://packages.altlinux.org/ru/sisyphus/srpms/forgejo/

https://docs.altlinux.space/


[Ссылка на раннер](https://code.forgejo.org/forgejo/runner/releases/)

## Установка Forgejo

```bash
apt-get install forgejo
```

Остальные этапы установки производятся абсолютно также, как и при установке [Gitea](gitea), единственное отличие, это расположение файла `app.ini`: `/etc/forgejo/app.ini`

## Фишки из документации, которые не описаны в Gitea

### LXC

Если указывается `lxc` как `label type`, то остальная ее часть интерпретируется как `template[:release[:lxc-helper config]]`где:

`template[:release]` — это шаблон и версия для использования.
`lxc-helper config` — это значение параметра `—config lxc-helper`, используемого при создании контейнера.

Исполнитель выполнит все шаги от имени root в контейнере LXC, созданном на основе этого шаблона и выпуска. Шаблон по умолчанию — debian, а выпуск по умолчанию — bullseye. Установлен `nodejs` версии 20.

Примеры лейблов:

`bookworm:lxc://debian:bookworm:lxc docker`
Определяется bookworm как контейнер LXC, работающий под управлением Debian GNU/Linux Bookworm. Он обладает необходимыми возможностями для запуска вложенного контейнера LXC и движка Docker.

`bookworm:lxc://debian:bookworm`
Определяется bookworm как контейнер LXC, работающий под управлением Debian GNU/Linux Bookworm. Он обладает необходимыми возможностями для запуска вложенного контейнера LXC, виртуальных машин KVM и движка Docker.

### HOST

Если указывается `host` в качестве `label type`, то исполнитель выполнит все шаги в оболочке, ответвленной от исполнителя, непосредственно на хосте.

Внимание: никакой изоляции не существует, и одно задание может навсегда уничтожить хост.

Пример этикетки:

`self-hosted:host` определяет `self-hosted` быть оболочкой.


### Специальные labels

Метки раннера также можно использовать для определения других специальных функций. Например, можно использовать `gpu:docker://node:20-bullseye` для определения бегуна с установленным графическим процессором. Рабочие процессы, которым требуется графический процессор, можно затем указать `runs-on: gpu` для выполнения на этом бегуне.


## Настройки хранилища

Хранилище для каждой подсистемы определяется в файле `app.ini`. Оно может быть на диске (локальное, по умолчанию) или использовать совместимый с S3 сервер (minio)[minio]. В обоих случаях каждая подсистема хранит все файлы (или объекты в терминологии S3) в выделенной директории, как показано в таблице ниже:

| Подсистема          | Директория           | Секции в `app.ini`         |
| :------------------ | :------------------- | :------------------------- |
| Вложения            | `attachments/`       | `[attachment]`             |
| LFS                 | `lfs/`               | `[lfs]`                    |
| Аватары             | `avatars/`           | `[avatar]`                 |
| Аватары репозиториев| `repo-avatars/`      | `[repo-avatar]`            |
| Архивы репозиториев | `repo-archive/`      | `[repo-archive]`           |
| Пакеты              | `packages/`          | `[packages]`               |
| Логи действий       | `actions_log/`       | `[storage.actions_log]`    |
| Артефакты действий  | `actions_artifacts/` | `[actions.artifacts]`      |

Например:

*   Если `STORAGE_TYPE` имеет значение `local`, а `APP_DATA_PATH` — `/appdata`, то директорией по умолчанию для хранения вложений будет `/appdata/attachments`.
*   Если `STORAGE_TYPE` имеет значение `minio`, то директорией по умолчанию для хранения вложений в бакете `MINIO_BUCKET` будет `attachments/`.

### Изменение хранилища для всех подсистем

Секция `[storage]` может использоваться для изменения хранилища всех подсистем. По умолчанию используется локальное хранилище в `APP_DATA_PATH`, что эквивалентно записи следующего в `app.ini`:

```ini
[server]
APP_DATA_PATH = /forgejo/data

[storage]
STORAGE_TYPE = local
PATH = /forgejo/data
```

#### Использование local

Для локального хранилища секция `[storage]` может использоваться только для изменения пути, под которым будут создаваться директории всех подсистем, с помощью настройки `PATH` с указанием абсолютного пути.

Например:

```ini
[storage]
STORAGE_TYPE = local
PATH = /mystorage
```
изменит путь по умолчанию для хранения вложений на `/mystorage/attachments`, для LFS — на `/mystorage/lfs` и т.д.

#### Использование minio

Секция `[storage]` может использоваться для изменения типа хранилища по умолчанию, используемого всеми подсистемами, на `minio`.

Например:

```ini
[storage]
STORAGE_TYPE = minio

MINIO_ENDPOINT = 127.0.0.1:9000
MINIO_ACCESS_KEY_ID = [redacted]
MINIO_SECRET_ACCESS_KEY = [redacted]
MINIO_BUCKET = forgejo
MINIO_LOCATION = us-east-1
```
изменит хранилище по умолчанию для вложений на `attachments/` в бакете `forgejo`, для LFS — на `lfs/` в бакете `forgejo` и т.д.

**ПРИМЕЧАНИЕ:** Параметр `MINIO_BASE_PATH` не должен быть установлен в секции `[storage]`.

Параметр конфигурации `MINIO_USE_SSL` по умолчанию имеет значение `false` для сохранения совместимости с локально размещенными экземплярами MinIO. Если предполагается использование внешнего провайдера S3, этому параметру следует присвоить значение `true`.

Например, предположим, что экземпляр (MinIO)[minio] находится по адресу `https://minio.example.com`:

```ini
[storage]
STORAGE_TYPE = minio

MINIO_USE_SSL = true
MINIO_ENDPOINT = minio.example.com
MINIO_ACCESS_KEY_ID = [redacted]
MINIO_SECRET_ACCESS_KEY = [redacted]
MINIO_BUCKET = bucket
MINIO_LOCATION = us-east-1
```

### Настройки хранилища для отдельной подсистемы

Можно настроить некоторые подсистемы на использование хранилища S3, а другие — на использование локального хранилища, добавив настройки в их соответствующие секции. Например:

```ini
[attachment]
PATH = /otherstorage/attachments

[lfs]
STORAGE_TYPE = minio
MINIO_BASE_PATH = lfs/

MINIO_ENDPOINT = 127.0.0.1:9000
MINIO_ACCESS_KEY_ID = [redacted]
MINIO_SECRET_ACCESS_KEY = [redacted]
MINIO_BUCKET = forgejo
MINIO_LOCATION = us-east-1
```
будет хранить вложения в локальной директории `/otherstorage/attachments`, в то время как файлы LFS будут храниться на S3-сервере в директории `lfs/` бакета `forgejo`.

### Настройки хранилища

Значение `STORAGE_TYPE` может быть `local` (по умолчанию) для директорий файловой системы или `minio` для S3-серверов. Каждый тип хранилища имеет свои собственные настройки, как объясняется ниже.

#### Использование local

Существует всего одна настройка, когда `STORAGE_TYPE` установлен в `local`: `PATH`. Это должен быть абсолютный путь, и он интерпретируется следующим образом.

*   В секции `[storage]` `PATH` — это путь, под которым будут создаваться директории каждой подсистемы вместо `APP_DATA_PATH`. Например, если `APP_DATA_PATH` равен `/appdata`:
    ```ini
    [storage]
    STORAGE_TYPE = local
    PATH = /mystorage
    ```
    создаст вложения в `/mystorage/attachments` вместо `/appdata/attachments`, файлы LFS в `/mystorage/lfs` вместо `/appdata/lfs` и т.д.

*   В секции, посвященной конкретной подсистеме (см. таблицу во введении), `PATH` — это базовый путь, под которым будут храниться все файлы. Например:
    ```ini
    [storage]
    STORAGE_TYPE = local
    PATH = /mystorage

    [attachment]
    STORAGE_TYPE = local
    PATH = /otherstorage/attachments
    ```
    будет хранить вложения в `/otherstorage/attachments`, в то время как файлы LFS будут храниться в `/mystorage/lfs`.

#### Использование minio

Когда `STORAGE_TYPE` установлен в `minio`, настройки используются для подключения к совместимому с S3 серверу:

*   `SERVE_DIRECT`: `false` — Позволяет драйверу хранилища перенаправлять на аутентифицированные URL-адреса для прямой раздачи файлов. Поддерживается только через подписанные URL-адреса.
*   `MINIO_ENDPOINT`: `localhost:9000` — Конечная точка S3 для подключения.
*   `MINIO_ACCESS_KEY_ID` — `accessKeyID` S3 для подключения.
*   `MINIO_SECRET_ACCESS_KEY` — `secretAccessKey` S3 для подключения.
*   `MINIO_BUCKET`: `forgejo` — Бакет S3 для хранения данных.
*   `MINIO_BUCKET_LOOKUP`: `auto` — Тип поиска бакета S3.
    *   `auto` — Автоопределение
    *   `dns` — Стиль виртуального хоста
    *   `path` — Path Style
*   `MINIO_LOCATION`: `us-east-1` — Локация S3 для создания бакета.
*   `MINIO_USE_SSL`: `false` — Использование SSL в S3.
*   `MINIO_INSECURE_SKIP_VERIFY`: `false` — Пропуск проверки SSL в S3.
*   `MINIO_CHECKSUM_ALGORITHM` — Алгоритм контрольной суммы Minio: `default` (для MinIO, garage или AWS S3) или `md5` (для Cloudflare или Backblaze).

При использовании в секции `[storage]` они применяются ко всем подсистемам. При использовании в секции, специфичной для подсистемы (см. таблицу во введении), они используются только для объектов, принадлежащих этой подсистеме. Вот пример:

```ini
[storage]
STORAGE_TYPE = minio

SERVE_DIRECT = false
MINIO_ENDPOINT = garage:9000
MINIO_ACCESS_KEY_ID = [redacted]
MINIO_SECRET_ACCESS_KEY = [redacted]
MINIO_BUCKET = forgejo
MINIO_BUCKET_LOOKUP = auto
MINIO_LOCATION = us-east-1
MINIO_USE_SSL = false
MINIO_INSECURE_SKIP_VERIFY = false
MINIO_CHECKSUM_ALGORITHM = md5

[lfs]
STORAGE_TYPE = minio
MINIO_BASE_PATH = nonstandardlfs/

SERVE_DIRECT = false
MINIO_ENDPOINT = minio:9000
MINIO_ACCESS_KEY_ID = [redacted]
MINIO_SECRET_ACCESS_KEY = [redacted]
MINIO_BUCKET = forgejo
MINIO_BUCKET_LOOKUP = auto
MINIO_LOCATION = us-east-1
MINIO_USE_SSL = false
MINIO_INSECURE_SKIP_VERIFY = false
```

*   `MINIO_BASE_PATH`: Допустимо только в специфичной для подсистемы секции (см. таблицу во введении). Переопределяет директорию по умолчанию, в которой объекты хранятся в бакете `MINIO_BUCKET`.

Для всех подсистем, которые используют тип хранилища `minio`, указанный в секции `[storage]`, директория, в которой хранятся объекты, определяется с помощью таблицы во введении. Например, файлы LFS будут храниться в директории `lfs/` внутри бакета `forgejo`.

Когда хранилище `minio` настроено в секции, специфичной для подсистемы, параметр `MINIO_BASE_PATH` может быть использован для переопределения директории по умолчанию. В примере выше `MINIO_BASE_PATH = nonstandardlfs/` означает, что объекты LFS будут храниться в директории `nonstandardlfs/` бакета `forgejo` вместо директории `lfs/`.

### Устаревшие настройки

Некоторые настройки устарели, но все еще поддерживаются в интересах обратной совместимости. Их следует заменить следующим образом:

*   `[server].LFS_CONTENT_PATH` заменяется на `[lfs].PATH`
*   `[picture].AVATAR_UPLOAD_PATH` заменяется на `[avatar].PATH`
*   `[picture].REPOSITORY_AVATAR_UPLOAD_PATH` заменяется на `[repo-avatar].PATH`

Устаревшие настройки имеют более низкий приоритет и будут переопределены их заменами, если присутствуют обе. Например:

```ini
[picture]
AVATAR_UPLOAD_PATH = /legacy_path

[avatar]
PATH = /avatar_path
```
будет хранить файлы аватаров в `/avatar_path`.



## Реестр пакетов Alt

Публикуйте пакеты Alt для вашего пользователя или организации.

### Требования

Для работы с реестром Alt необходимо использовать менеджер пакетов APT-RPM для использования пакетов.

В следующих примерах используется `apt-rpm`.

### Настройка реестра пакетов

Чтобы зарегистрировать реестр RPM, добавьте URL в список известных источников в файл конфигурации в каталоге `/etc/apt/sources.list.d/`:

```bash
rpm https://forgejo.example.com/api/packages/{owner}/alt/{group}.repo {arch} classic
```

| Заполнитель      | Описание                                 |
|------------------|------------------------------------------|
| `owner`          | Владелец пакета.                         |
| `group`          | Опционально: Например, пусто, `el7`, `rocky/el9`, `test/fc38`. |
| `arch`           | Архитектура.                             |

**Пример:**

```bash
# без группы и архитектуры x86_64
rpm https://forgejo.example.com/api/packages/testuser/alt/alt.repo x86_64 classic

# с группой 'centos/el7' и архитектурой noarch
rpm https://forgejo.example.com/api/packages/testuser/alt/group/example1.repo noarch classic
```

Если реестр приватный, укажите учетные данные в URL. Можно использовать пароль или персональный токен доступа:

```bash
rpm https://{username}:{your_password_or_token}@forgejo.example.com/api/packages/{owner}/alt/{group}.repo {arch} classic
```

Вам также потребуется добавить учетные данные в URL в созданном файле `.repo` в `/etc/apt/sources.list.d/`.

### Публикация пакета

Чтобы опубликовать пакет RPM (`*.rpm`), выполните операцию HTTP `PUT`, поместив содержимое пакета в тело запроса.

```http
PUT https://forgejo.example.com/api/packages/{owner}/alt/{group}/upload
```

| Параметр | Описание                                 |
|----------|------------------------------------------|
| `owner`  | Владелец пакета.                         |
| `group`  | Опционально: Например, пусто, `el7`, `rocky/el9`, `test/fc38`. |

**Пример запроса с использованием HTTP Basic аутентификации:**

```bash
# без группы
curl --user your_username:your_password_or_token \
     --upload-file path/to/file.rpm \
     https://forgejo.example.com/api/packages/testuser/alt/upload

# с группой 'group/example1'
curl --user your_username:your_password_or_token \
     --upload-file path/to/file.rpm \
     https://forgejo.example.com/api/packages/testuser/alt/group/example1/upload
```

Если вы используете 2FA или OAuth, используйте персональный токен доступа вместо пароля. Нельзя опубликовать файл с тем же именем дважды в одном пакете. Сначала необходимо удалить существующую версию пакета.

Сервер отвечает со следующими кодами состояния HTTP:

| Код состояния HTTP | Значение                                                                 |
|--------------------|--------------------------------------------------------------------------|
| `201 Created`      | Пакет опубликован.                                                       |
| `400 Bad Request`  | Пакет невалиден.                                                         |
| `409 Conflict`     | Файл пакета с такой же комбинацией параметров уже существует в пакете.   |

### Удаление пакета

Чтобы удалить пакет RPM, выполните операцию HTTP `DELETE`. Это также удалит версию пакета, если в нем не останется файлов.

```http
DELETE https://forgejo.example.com/api/packages/{owner}/alt/{group}.repo/{architecture}/RPMS.classic/{package_file_name.rpm}
```

| Параметр               | Описание                 |
|------------------------|--------------------------|
| `owner`                | Владелец пакета.         |
| `group`                | Опционально: Группа пакета. |
| `package_file_name.rpm`| Имя файла пакета.        |
| `architecture`         | Архитектура пакета.      |

**Пример запроса с использованием HTTP Basic аутентификации:**

```bash
# без группы
curl --user your_username:your_token_or_password -X DELETE \
     https://forgejo.example.com/api/packages/testuser/alt/alt.repo/x86_64/RPMS.classic/test-package.rpm

# с группой 'group/example1'
curl --user your_username:your_token_or_password -X DELETE \
     https://forgejo.example.com/api/packages/testuser/alt/group/example1.repo/x86_64/RPMS.classic/test-package.rpm
```

Сервер отвечает со следующими кодами состояния HTTP:

| Код состояния HTTP  | Значение                            |
|---------------------|-------------------------------------|
| `204 No Content`    | Успешно.                            |
| `404 Not Found`     | Пакет или файл не найден.           |

### Установка пакета

Чтобы установить пакет из реестра RPM, выполните следующие команды:

```bash
# использовать последнюю версию
apt-get install {package_name}

# использовать конкретную версию
apt-get install {package_name}-{package_version}
```

