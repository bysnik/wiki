---
outline: deep
---

# Harbor

![](https://habrastorage.org/r/w1560/webt/to/ed/6i/toed6ijlvl_n0r90t6rgvmzbixa.png)

Harbor — это бесплатный реестр для хранения Docker и Podman образов c открытым исходным кодом, который предоставляет доступ к образам с помощью политик, а также умеет сканировать образы на наличие уязвимостей.


Он состоит из набора взаимосвязанных контейнеров.

[Жёстко читаем документацию](https://goharbor.io/docs/1.10/administration/) - там информации кот наплакал.

## Установка

### Шаг 1. Установка docker и docker-compose

[Установите Docker и Docker Compose.](docker)

### Шаг 2. Скачивание архива офлайн установщика

На сервере перейдите на страницу релизов Harbor и скачайте архив `harbor-offline-installer-vX.Y.Z.tgz`, или в терминале выполните следующую команду:
```bash
wget https://github.com/goharbor/harbor/releases/download/vX.Y.Z/harbor-offline-installer-vX.Y.Z.tgz
```
В место vX.Y.Z необходимо подставить версию, например v2.13.2.

Распакуйте архив на сервере, где будет производиться установка и скопируйте конфигурационный файл по умолчанию `harbor.yml.tmpl` в `harbor.yml`. Для этого выполните команду:
```bash
tar xzvf harbor-offline-installer-vX.Y.Z.tgz
cd harbor
cp harbor.yml.tmpl harbor.yml
```
### Шаг 3. Заполнение конфигурационного файла harbor.yml

Заполните переменные в файле `harbor.yml`.

Для этого зададим в параметре hostname домен FQDN или ip адрес, по которому будет доступен реестр, например, зададим доменное имя `registry.example.com`.

Определите протоколы, по которым будет доступен репозиторий.

Если реестр должен быть доступен только по протоколу `http`, закомментируйте параметры секции `https` и в параметре `trivy.insecure` выставьте значение `true`.

Номера портов для параметров `http.port` и `https.port`:
- 80 для HTTP;
- 443 для HTTPS. 

Укажите путь до файла открытого сертификата в параметре `https.certificate`  и в `https.private_key` укажите путь до файла закрытого ключа.

Задайте пароль для пользователя `admin` в параметре `harbor_admin_password`. При необходимости в параметре `data_volume` измените путь до каталога, где будут храниться образы.

Настройте остальные параметры согласно вашей политике безопасности и предполагаемой нагрузке.

#### S3 Хранилище

Если вы планируете использовать хранилище S3, в данном случае, [MinIO](minio), добавьте следующие строки в файл `harbor.yml`:

```yaml
storage_service:
  s3:
    region: us-east-1
    bucket: testbucket
    accesskey: MINIO_ROOT_USER
    secretkey: MINIO_ROOT_PASSWORD
    secure: false
    regionendpoint: http://minio1.example.com:9000
    v4auth: true
    chunksize: 5242880
    rootdirectory: /
    encrypt: false
```

1. Регион `ru-central-1` работать не будет. Как я понял, отрабатывают ТОЛЬКО [стандартные AWS регионы](https://github.com/aws/aws-sdk-go/blob/v1.44.130/aws/endpoints/defaults.go#L141). Иначе вот такая ошибка:
![alt text](/public/img/harbor-minio-region-panic.png)

2. Вот эта ошибка происходит если использовать `endpoint`, а не `regionendpoint` (можно указывать и IP в качестве URL, главное протокол и порт не забудьте):
![alt text](/public/img/harbor-minio-hell.png)

3. Если у Вас кластер - он должен быть за балансировщиком, или, если по простому, указать только одну ноду, иначе не работает - синтаксис не позволяет указать несколько нод.

4. Кажется, эта ошибка вознокает, если аналогичный Image уже лежит в проекте (в смысле, один образ с разными тегами):
![alt text](/public/img/harbor-minio-encrypt.png)

P.S. Чисто чтобы понимали - это единственная [более-менее официальная документация по настройки связки Harbor-MinIO](https://blog.min.io/how-to-use-vmware-harbor-with-minio/)

### Шаг 4. Установка Harbor

Установите Harbor, выполнив следующую команду:
```bash
./install.sh
```

Если вы хотите подключить сканер уязвимостей [Trivy](altsp/15.trivy), добавьте параметр при запуске install.sh:
```bash
./install.sh --with-trivy
```

Чтобы установить Harbor со службой [Notary](https://github.com/canonical/notary), добавьте параметр при запуске install.sh:
```bash
./install.sh --with-notary
```
::: tip  
Для установки со службой [Notary](https://github.com/canonical/notary) необходимо настроить Harbor на использование HTTPS.
:::

Чтобы установить Harbor со службой репозитория [ChartMuseum](https://chartmuseum.com/), добавьте параметр при запуске install.sh:
```bash
./install.sh --with-chartmuseum
```
::: info
Чтобы использовать несколько служб, просто используйте одновременно несколько параметров.
:::

Дождитесь окончания работы скрипта установки.

Запустите браузер и откройте страницу входа в Harbor по адресу http://hostname или https://hostname. Параметр `hostname` указывали при заполнении в файле конфигурации `harbor.ym` на шаге заполнение конфигурационного файла.

В данном примере адрес страницы входа в Harbor — https://registry.example.com.

Войдите в систему с именем пользователя `admin` и паролем, установленным в файле `harbor.yml` в параметре `harbor_admin_password`.

Откроется окно проектов в Harbor.

Установка приватного реестра Harbor закончена.

## Пушим Docker образ в Harbor

Прежде чем вы сможете пушить образ в Harbor, вы должны создать соответствующий проект в интерфейсе Harbor. По умолчанию уже существует проект `library`

Необходимо залогиниться в Harbor:
```bash
docker login <harbor_address>
```
Затем введите свое имя пользователя и пароль, когда вас попросят.


Если видите ошибку: `Error response from daemon: Get https://myregistrydomain.com/v1/users/: dial tcp myregistrydomain.com:443 getsockopt: connection refused.`, тогда обратитесь к [гайду](docker#настроика-подключения-клиента-docker-к-репозиторию-по-http).


Создаем тэг.
```bash
docker tag <image_name>:<tag> <harbor_address>/<project_name>/<image_name>:<tag>
```

Пушим образ.
```bash
docker push <harbor_address>/<project_name>/<image_name>:<tag>
```

## Пушим Podman образ в Harbor

Прежде чем вы сможете пушить образ в Harbor, вы должны создать соответствующий проект в интерфейсе Harbor. По умолчанию уже существует проект `library`

Используйте команду `podman login` с URL Harbor и именем_пользователя/паролем. Например:
```bash
podman login your-harbor-domain.com
```
Затем введите свое имя пользователя и пароль, когда вас попросят.


Используйте команду `podman push` с полным именем образа, которое включает URL Harbor, имя проекта и имя образа. Например:
```bash
podman push my-image:latest your-harbor-domain.com/my-project/my-image:latest
```

В этом примере:
- my-image:latest - это локальный образ, который вы хотите отправить.
- your-harbor-domain.com - это URL вашего Harbor.
- my-project - это имя проекта в Harbor.
- my-image:latest - это имя образа в Harbor, которое может отличаться от локального.