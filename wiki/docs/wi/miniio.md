---
outline: deep
---

# MiniIO

![](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F1kco4frqn1sh3y3umvye.png)

MiniIO — это высокопроизводительное, легковесное объектное хранилище данных с открытым исходным кодом, совместимое с Amazon S3 API, предназначенное для работы в облачных и локальных средах. Оно обеспечивает масштабируемое и отказоустойчивое хранение больших объёмов неструктурированных данных, таких как изображения, видео, логи и резервные копии, поддерживая при этом высокую скорость доступа и минимальные задержки. Благодаря модульной архитектуре и простоте развёртывания MiniIO идеально подходит для Kubernetes, edge-устройств и гибридных инфраструктур, предлагая инструменты для репликации, шифрования и управления доступом через IAM-подобную политику. Его эффективность и низкие требования к ресурсам делают его популярным выбором для DevOps, разработчиков и компаний, ищущих S3-совместимое решение без сложностей традиционных облачных хранилищ.

https://packages.altlinux.org/ru/p11/binary/minio/x86_64/

https://elma365.com/ru/help/platform/configure-minio.html

https://elma365.com/ru/help/platform/minio-cluster.html

https://www.dmosk.ru/miniinstruktions.php?mini=minio


## Установка

### Шаг 1. Подготовка дисков

Создайте каталоги для монтирования дисков: 
```bash
mkdir -p /var/lib/minio/data1
mkdir -p /var/lib/minio/data2
```

Подготовьте файловую систему XFS на дисках (например, для дисков /dev/sdb и /dev/sdc): 
```bash
mkfs.xfs /dev/sdb -L DISK1
mkfs.xfs /dev/sdc -L DISK2
```
    
Добавьте точки монтирования дисков в файле /etc/fstab: 

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

### Шаг 6. Создание файла окружения для MinIO

Создайте файл окружения в /etc/default/minio. Пример содержимого:
 
```bash
# Set the hosts and volumes MinIO uses at startup
MINIO_VOLUMES="/var/lib/minio/data1/minio /var/lib/minio/data2/minio"

# Set all MinIO server options
MINIO_OPTS="--certs-dir /etc/minio/certs --console-address :9001"
MINIO_REGION="ru-central-1"


MINIO_ACCESS_KEY="YOUR_ACCESS_KEY"
MINIO_SECRET_KEY="YOUR_SECRET_KEY"
MINIO_ROOT_USER="YOUR_ROOT_USER"
MINIO_ROOT_PASSWORD="YOUR_ROOT_PASSWORD"
```

Загрузите эти переменные окружения:
```bash
su minio-user -c 'source /etc/default/minio'
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

После запуска сервиса вы сможете открыть браузер и перейти на страницу http://<IP-адрес сервера>:9001 — там откроется панель управления хранилищем S3.

Логин по умолчанию: minioadmin
Пароль по умолчанию: minioadmin