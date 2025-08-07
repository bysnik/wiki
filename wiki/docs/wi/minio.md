---
outline: deep
---

# MinIO

![](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F1kco4frqn1sh3y3umvye.png)

MiniIO — это высокопроизводительное, легковесное объектное хранилище данных с открытым исходным кодом, совместимое с Amazon S3 API, предназначенное для работы в облачных и локальных средах. Оно обеспечивает масштабируемое и отказоустойчивое хранение больших объёмов неструктурированных данных, таких как изображения, видео, логи и резервные копии, поддерживая при этом высокую скорость доступа и минимальные задержки. Благодаря модульной архитектуре и простоте развёртывания MinIO идеально подходит для Kubernetes, edge-устройств и гибридных инфраструктур, предлагая инструменты для репликации, шифрования и управления доступом через IAM-подобную политику. Его эффективность и низкие требования к ресурсам делают его популярным выбором для DevOps, разработчиков и компаний, ищущих S3-совместимое решение без сложностей традиционных облачных хранилищ.

https://packages.altlinux.org/ru/p11/binary/minio/x86_64/

https://www.dmosk.ru/miniinstruktions.php?mini=minio


::: danger Внимание
Инструкции по установке это лишь примеры. Вы можете делать (почти) любую конфигурацию. Главное, чтобы на всех нодах были одинаковые диски и их было одинаковое количество.

А на единственной ноде можете делать сколь угодно ОДИНАКОВЫХ дисков.

Если диски будут разные по объему, то, как и в RAID-массивах, доступный объем будет расчитан по самому маленькому диску.

Для обеспечения лучшей производительности используйте файловую систему XFS. В MinIO не различаются типы дисков и не используются смешанные типы хранилищ, поэтому на всех нодах должен использоваться одинаковый тип дисков (NVMe, SSD или HDD) с одинаковой ёмкостью, например, N ТБ.

В MinIO ограничивается размер используемого диска до самого маленького диска в развёртывании. Например, если в развёртывании есть 15 дисков по 10 ТБ и 1 диск по 1 ТБ, в MinIO ёмкость каждого диска ограничится до 1 ТБ.
:::

## Установка: одна нода, два диска

### Шаг 1. Подготовка дисков

Создайте каталоги для монтирования дисков: 
```bash
mkdir -p /var/lib/minio/data1
mkdir -p /var/lib/minio/data2
```

Подготовьте файловую систему XFS на дисках (например, для дисков `/dev/sdb` и `/dev/sdc`): 
```bash
mkfs.xfs /dev/sdb -L DISK1
mkfs.xfs /dev/sdc -L DISK2
```
    
Добавьте точки монтирования дисков в файле `/etc/fstab`: 

```fstab
LABEL=DISK1 /var/lib/minio/data1 xfs defaults,noatime 0 2
LABEL=DISK2 /var/lib/minio/data2 xfs defaults,noatime 0 2
```

Проверьте монтирование подготовленных дисков: 
```bash
mount -av
```

### Шаг 2. Установка MinIO

Загрузите последний стабильный binary-файл MinIO: 
```bash
wget https://dl.min.io/server/minio/release/linux-amd64/minio
```
Дайте файлу права на выполнение: 
```bash
chmod +x minio
```

Переместите файл в системную директорию: 
```bash
mv minio /usr/local/bin/
```

### Шаг 3. Установка MinIO Client

Загрузите последний стабильный binary-файл MinIO Client: 
```bash
wget https://dl.min.io/client/mc/release/linux-amd64/mc
```

Дайте файлу права на выполнение: 
```bash
chmod +x mc
```

Переместите файл в системную директорию: 
```bash
mv mc /usr/local/bin/
```

::: warning Предупреждение
В Альте есть предустановленный Midnight Commander (команда `mc`), поэтому либо удалите его, если не нужен, либо переименуйте minio-client (файл `mc`), ну либо в дальнейшем обращайтесь к клиенту по полному пути: `/usr/local/bin/mc`
:::

### Шаг 4. Создание пользователя и группы minio-user

Создайте группу и пользователя: 
```bash
groupadd -r minio-user
useradd -M -r -g minio-user minio-user
```

Создайте директории для хранения TLS-сертификатов: 
```bash
mkdir -p /etc/minio/certs/CAs
```
    
Задайте разрешения на доступ к каталогам: 
```bash
chown -R minio-user:minio-user /etc/minio
chown -R minio-user:minio-user /var/lib/minio
chmod u+rxw /var/lib/minio
```

### Шаг 5. Создание файла сервиса для systemd

Загрузите официальный файл сервиса MinIO:  
```bash
curl -O https://raw.githubusercontent.com/minio/minio-service/master/linux-systemd/minio.service
```
    
Проверьте содержимое minio.service и переместите файл: 
```bash
mv minio.service /etc/systemd/system
```

::: danger Бууу, опасссно
На этом шаге не запускайте `minio.service`.
:::

### Шаг 6. Создание файла окружения для MinIO

Создайте файл окружения в `/etc/default/minio`. Пример содержимого:
 
```bash
# Set the hosts and volumes MinIO uses at startup
MINIO_VOLUMES="/var/lib/minio/data1/minio /var/lib/minio/data2/minio"

# Set all MinIO server options
MINIO_OPTS="--certs-dir /etc/minio/certs --console-address :9001"
MINIO_REGION="ru-central-1"

MINIO_ROOT_USER="YOUR_ROOT_USER"
MINIO_ROOT_PASSWORD="YOUR_ROOT_PASSWORD"
```

### Шаг 7. Запуск сервиса MinIO

Выполните команды для запуска службы: 
```bash
systemctl daemon-reload
systemctl enable minio.service
systemctl start minio.service
```

Убедитесь, что сервис запустился без ошибок: 
```bash
systemctl status minio.service
journalctl -f -u minio.service
```

### Шаг 8. Настройка подключения к MinIO

После запуска сервиса вы сможете открыть браузер и перейти на страницу `http://<IP-адрес сервера>:9001` — там откроется панель управления хранилищем S3.

Логин по умолчанию: minioadmin
Пароль по умолчанию: minioadmin


## Установка: две ноды, два диска

### Шаг 1. Подготовка нод (серверов)

Создайте две ноды (сервера) с последовательно пронумерованными именами хостов (Если есть DNS), например:

- minio1.example.com;
- minio2.example.com;

### Шаг 2. Подготовка дисков

На каждой ноде создайте два каталога для монтирования двух дисков:
```bash
mkdir -p /var/lib/minio/data1
mkdir -p /var/lib/minio/data2
```

На каждой ноде подготовьте на дисках файловую систему XFS:
```bash
mkfs.xfs /dev/sdb -L DISK1
mkfs.xfs /dev/sdc -L DISK2
```

На каждой ноде добавьте точки монтирования четырёх дисков в файле `/etc/fstab`:
```fstab
LABEL=DISK1      /var/lib/minio/data1     xfs     defaults,noatime  0       2
LABEL=DISK2      /var/lib/minio/data2     xfs     defaults,noatime  0       2
```

Проверьте монтирование ранее подготовленных дисков:
```bash
mount -av
```

### Шаг 3. Установка MinIO

На каждой ноде загрузите последний стабильный binary-файл MinIO и установите его в систему:
```bash
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio
mv minio /usr/local/bin/
```

### Шаг 4. Установка MinIO Client

На ноде minio1.example.com загрузите последний стабильный binary-файл MinIO Client и установите его в систему:
```bash
wget https://dl.min.io/client/mc/release/linux-amd64/mc
chmod +x mc
mv mc /usr/local/bin/
```
Не забудьте решить проблему с Midnight Commander'ом

### Шаг 5. Создание пользователя и группы minio-user

На каждой ноде создайте пользователя и группу `minio-user`:
```bash
groupadd -r minio-user
useradd -M -r -g minio-user minio-user
```

На каждой ноде cоздайте директории для хранения TLS сертификатов, выполнив команду:
```bash
mkdir -p /etc/minio/certs/CAs
```

На каждой ноде задайте разрешения на доступ к каталогам, предназначенным для использования в MinIO:
```bash
chown -R minio-user:minio-user /etc/minio
chown -R minio-user:minio-user /var/lib/minio
chmod u+rxw /var/lib/minio
```

### Шаг 6. Создание файла сервиса для systemd

На каждой ноде загрузите официальный файл сервиса MinIO:
```bash
curl -O https://raw.githubusercontent.com/minio/minio-service/master/linux-systemd/minio.service
```

Проверьте содержимое minio.service перед его использованием и переместите этот файл в каталог конфигурации systemd:
```bash
mv minio.service /etc/systemd/system
```
::: danger Бууу, опассноссс
На этом шаге не запускайте `minio.service`.
:::

### Шаг 7. Создание файла окружения для MinIO

На каждой ноде создайте файл окружения в `/etc/default/minio`. Служба MinIO использует этот файл в качестве источника всех переменных окружения, используемых MinIO и файлом `minio.service`.

Пример файла окружения в `/etc/default/minio`:
```bash
MINIO_VOLUMES="http://minio{1...2}.example.com:9000/var/lib/minio/data{1...2}/minio"

MINIO_OPTS="--certs-dir /etc/minio/certs --console-address :9001"

MINIO_REGION="ru-central-1"
```

### Шаг 8. Запуск сервиса MinIO

Выполните следующие команды на каждой ноде, чтобы запустить службу MinIO:
```bash
systemctl daemon-reload
systemctl enable minio.service
systemctl start minio.service
```

Убедитесь в том, что сервис `minio.service` запустился и работает без ошибок:
```bash
systemctl status minio.service
journalctl -f -u minio.service
```

### Шаг 9. Просмотр статуса MinIO

Создайте `alias` для minio на ноде `minio1.example.com`:
```bash
mc alias set myminio http://minio1.example.com:9000 <MINIO_ROOT_USER> <MINIO_ROOT_PASSWORD>
```
Просмотр статуса:
```bash
mc admin info myminio
```
![minio-cluster-status](/public/img/minio-cluster-status.png)


### Шаг 10. Создание бакета

Чтобы создать  бакет c наименованием `testbucket`, используйте команду на ноде `minio1.example.com`:
```bash
mc mb -p myminio/testbucket --region=ru-central-1
```


## Настройка включения TLS/SSL в MinIO

Для включения поддержки TLS/SSL в MinIO нужно на каждой ноде:
1. В файле окружения `/etc/default/minio` изменить протокол с HTTP на HTTPS в параметре `MINIO_VOLUMES`.
2. Положить файл сертификата и файл закрытого ключа в каталог `/etc/minio/certs`.     
3. Все ноды имеют уникальные доменные имена. Сертификаты должны быть выпущены для каждой ноды индивидуально.
4. Переименовать файл сертификата сервера в `public.crt`.
5. Переименовать файл закрытого ключа в `private.key`.

При использовании самоподписанных сертификатов положить файл корневого CA в каталог `/etc/minio/certs/CAs`.


## Проблема: отсутствие панели администратора в веб-интерфейсе

![minio-console](/public/img/minio.png)

::: tip Цитата со страницы [документации](https://docs.min.io/community/minio-object-store/administration/minio-console.html)
Изменено в версии `RELEASE.2025-05-24T17-08-30Z`: Консоль теперь предоставляет только возможности обозревателя объектов, аналогичные доступным в `mc` инструменте. Для административных действий, таких как управление пользователями, используйте команду `mc admin`
:::

Вот и вся проблема. Они тупо вырезали весь административный интерфейс из веб-консоли. Ну огонь вообще.

Теперь в графике можно создавать и удалять бакеты, и загружать/удалять из них файлы, ну и по мелочи ещё.

## Моментики

::: tip Гайды устарели!
```bash
MINIO_ACCESS_KEY="YOUR_ACCESS_KEY"
MINIO_SECRET_KEY="YOUR_SECRET_KEY"
```
Эти переменные являются устаревшими, с ними MinIO не запустится. Вместо них используются логин/пароль от любого пользователя. Главное не забыть выдать этому пользователю необходимые права доступа.
:::

::: tip Ох уж этот S3
По опыту работы с MinIO в связке с Harbor была получена информация, что работают ТОЛЬКО [стандартные ASW регионы](https://github.com/aws/aws-sdk-go/blob/v1.44.130/aws/endpoints/defaults.go#L141). Так что будьте внимательны!
:::