# draw.io

![](https://www.drawio.com/assets/img/blog/simple-mode.png)

## Введение

[draw.io](https://github.com/jgraph/drawio) — это приложение для совместной работы и создания диаграмм. 

## Локальное приложение

Вариант "десктопного приложения"

По ссылке https://github.com/jgraph/drawio-desktop/releases скачайте последнюю версию, пакет rpm.

Установите его:
```bash
epm install --repack drawio-x86_64-29.3.6.rpm
```

## Docker

Этот проект содержит различные реализации draw.io в Docker и связанные с ним инструменты:

* Docker-образ draw.io, который всегда обновляется в соответствии с релизами draw.io
* Образ сервера экспорта draw.io, позволяющий экспортировать диаграммы в pdf и изображения
* docker-compose для запуска draw.io вместе с сервером экспорта
* docker-compose для запуска draw.io, интегрированного в nextcloud
* docker-compose для запуска автономной версии draw.io без каких-либо зависимостей от веб-сайта diagrams.net (с сервером экспорта, поддержкой Google Drive, поддержкой OneDrive и поддержкой преобразования EMF для экспорта VSDX)

### Описание

Dockerfile собирается на основе `tomcat:9-jre11` (см. <https://hub.docker.com/_/tomcat/>)

**Примечание: Начиная с версии 16.5.3, образы на основе alpine и debian больше не поддерживаются. Мы перешли на единый образ, использующий образ tomcat с наименьшим количеством уязвимостей безопасности.**

Ответвлен от [fjudith/draw.io](https://github.com/fjudith/docker-draw.io)

### Возможности

* Основан на Tomcat, поэтому может использоваться напрямую или за обратным прокси-сервером
* Автогенерация самоподписанного сертификата
* Автогенерация сертификата Let's encrypt
* Поддержка монтирования SSL Keystore в `/user/local/tomcat/.keystore`

### Быстрый старт

Запустите контейнер.

```bash
docker run -it --rm --name="draw" -p 8080:8080 -p 8443:8443 jgraph/drawio
```

> `?offline=1` — это функция безопасности, которая отключает поддержку облачных хранилищ.

### Переменные окружения

* **LETS_ENCRYPT_ENABLED**: Включает сертификат Let's Encrypt вместо самоподписанного; по умолчанию `false`
* **PUBLIC_DNS**: Доменное имя DNS, используемое в качестве записи "CN" сертификата; по умолчанию `draw.example.com`
* **ORGANISATION_UNIT**: Организационное подразделение, используемое в качестве записи "OU" сертификата; по умолчанию `Cloud Native Application`
* **ORGANISATION**: Название организации, используемое в качестве записи "O" сертификата; по умолчанию `example inc`
* **CITY**: Название города, используемое в качестве записи "L" сертификата; по умолчанию `Paris`
* **STATE**: Название штата/провинции, используемое в качестве записи "ST" сертификата; по умолчанию `Paris`
* **COUNTRY_CODE**: Код страны, используемый в качестве записи "C" сертификата; по умолчанию `FR`
* **KEYSTORE_PASS**: Пароль хранилища ".keystore"/.jks"; по умолчанию `V3ry1nS3cur3P4ssw0rd`
* **KEY_PASS**: Пароль закрытого ключа; по умолчанию `<ref:KEYSTORE_PASS>`

### HTTPS SSL сертификат через Let's Encrypt

#### Предварительные требования:

1. Linux-машина, подключенная к Интернету, с открытыми портами 443 и 80
2. Доменное имя/поддомен, указывающий на IP-адрес этой машины. (например, drawio.example.com)

#### Метод:

1. Создайте каталог для хранения данных letsencrypt. (например, /opt/docker/drawiodata/letsencrypt-log, /opt/docker/drawiodata/letsencrypt-etc, /opt/docker/drawiodata/letsencrypt-lib)
2. Используя образ Docker jgraph/drawio, выполните следующую команду
```bash
docker run -it -m1g \
-v "/opt/docker/drawiodata/letsencrypt-log:/var/log/letsencrypt/" \
-v "/opt/docker/drawiodata/letsencrypt-etc:/etc/letsencrypt/" \
-v "/opt/docker/drawiodata/letsencrypt-lib:/var/lib/letsencrypt" \
-e LETS_ENCRYPT_ENABLED=true \
-e PUBLIC_DNS=drawio.example.com \
--rm --name="draw" -p 80:80 -p 443:8443 jgraph/drawio
```
Обратите внимание, что проброс порта 80 на порт 80 контейнера позволяет certbot работать в автономном режиме. Проброс порта 443 на порт 8443 контейнера позволяет tomcat напрямую обслуживать https-запросы.

### Изменение конфигурации draw.io

Конфигурация управляется переменными окружения `DRAWIO_*`. Для получения списка этих переменных проверьте файл `docker-entrypoint.sh` в директории `main`. Например, эти переменные позволяют включить интеграцию с Google Drive, OneDrive, ...

### Ссылки

* <https://github.com/jgraph/drawio>
