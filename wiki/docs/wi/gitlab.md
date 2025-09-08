# GitLab

![](https://www.cloud4y.ru/upload/medialibrary/e26/wimpb5f0qo1phuokcqzjmzi0yuam2pke/gitlab.png)

GitLab — это единая платформа для DevOps с открытым исходным кодом, которая предоставляет полный набор инструментов для всего жизненного цикла разработки программного обеспечения: от планирования задач и управления исходным кодом (Git-репозитории) до непрерывной интеграции и поставки (CI/CD), мониторинга и безопасности. В отличие от разрозненных решений, GitLab объединяет возможности управления проектами, репозиториями, трекера проблем, CI/CD-пайплайнов, контейнерного реестра и развертывания в одной интегрированной среде, что способствует повышению скорости, эффективности и коллаборации между командами разработки, эксплуатации и безопасности. Платформа доступна в облачной (SaaS) и самостоятельной (self-hosted) версиях, предлагая гибкость выбора для различных бизнес-потребностей.

[Прогресс перевода GitLab на русский язык](https://crowdin.com/project/gitlab-ee/ru)

## Установка GitLab с помощью Docker

Чтобы установить GitLab в контейнер Docker, используйте режим Docker Compose, Docker Engine или Docker Swarm.

Предпосылки:

- У вас должна быть работающая установка Docker, отличная от Docker для Windows. Docker для Windows официально не поддерживается, поскольку образы имеют известные проблемы совместимости с правами доступа к томам и потенциально другие неизвестные проблемы. Если вы пытаетесь запустить Docker для Windows, см. страницу получения помощи . Эта страница содержит ссылки на ресурсы сообщества (например, IRC или форумы), где вы можете обратиться за помощью к другим пользователям.
- Вам потребуется почтовый транспортный агент (MTA), например Postfix или Sendmail. Образы GitLab не содержат MTA. Вы можете установить MTA в отдельном контейнере. MTA можно установить в том же контейнере, что и GitLab, но вам может потребоваться переустанавливать MTA после каждого обновления или перезапуска.
- Не стоит планировать развертывание образа GitLab Docker в Kubernetes, так как это создаст единую точку отказа. Если вы хотите развернуть GitLab в Kubernetes, используйте вместо этого Helm Chart или GitLab Operator .
Для установки Docker необходимо иметь допустимое, внешне доступное имя хоста. Не используйте localhost.

### Установка GitLab с помощью Docker Compose

С помощью Docker Compose вы можете настроить, установить и обновить вашу установку GitLab на основе Docker:

Установить Docker Compose

Создайте docker-compose.yml файл. Например:
```yaml
services:
  gitlab:
    image: gitlab/gitlab-ee:<version>-ee.0
    container_name: gitlab
    restart: always
    hostname: 'gitlab.example.com'
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        # Add any other gitlab.rb configuration here, each on its own line
        external_url 'https://gitlab.example.com'
    ports:
      - '80:80'
      - '443:443'
      - '22:22'
    volumes:
      - '$GITLAB_HOME/config:/etc/gitlab'
      - '$GITLAB_HOME/logs:/var/log/gitlab'
      - '$GITLAB_HOME/data:/var/opt/gitlab'
    shm_size: '256m'
```


Вот ещё один docker-compose.yml пример с GitLab, работающим на настраиваемом порту HTTP и SSH. Обратите внимание, что GITLAB_OMNIBUS_CONFIG переменные соответствуют ports разделу:

```yaml
services:
  gitlab:
    image: gitlab/gitlab-ee:<version>-ee.0
    container_name: gitlab
    restart: always
    hostname: 'gitlab.example.com'
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://gitlab.example.com:8929'
        gitlab_rails['gitlab_shell_ssh_port'] = 2424
    ports:
      - '8929:8929'
      - '443:443'
      - '2424:22'
    volumes:
      - '$GITLAB_HOME/config:/etc/gitlab'
      - '$GITLAB_HOME/logs:/var/log/gitlab'
      - '$GITLAB_HOME/data:/var/opt/gitlab'
    shm_size: '256m'
```    
Эта конфигурация аналогична использованию --publish 8929:8929 --publish 2424:22.

В том же каталоге, что и docker-compose.yml, запустите GitLab:

оболочка
docker compose up -d


Некоторые конфиги gitlab.rb
```yaml
GITLAB_OMNIBUS_CONFIG: |
        external_url '<https://gitlab.DOMAIN>'
        pages_external_url '<http://pages.DOMAIN>'

        # SMTP Mail Configuration
        gitlab_rails['smtp_pool'] = true
        gitlab_rails['smtp_enable'] = true
        gitlab_rails['smtp_address'] = "smtp.gmail.com"
        gitlab_rails['smtp_port'] = 587
        gitlab_rails['smtp_user_name'] = "<EMAIL>"
        gitlab_rails['smtp_password'] = "<PASSWORD>"
        gitlab_rails['smtp_domain'] = "smtp.gmail.com"
        gitlab_rails['smtp_authentication'] = "login"
        gitlab_rails['smtp_enable_starttls_auto'] = true
        gitlab_rails['smtp_tls'] = false
        gitlab_rails['smtp_openssl_verify_mode'] = 'peer'

        # Gmail Incoming Mail Configuration
        gitlab_rails['incoming_email_enabled'] = true
        gitlab_rails['incoming_email_address'] = "income+%{key}@gmail.com"
        gitlab_rails['incoming_email_email'] = "<EMAIL>"
        gitlab_rails['incoming_email_password'] = "<PASSWORD>"
        gitlab_rails['incoming_email_host'] = "imap.gmail.com"
        gitlab_rails['incoming_email_port'] = 993
        gitlab_rails['incoming_email_ssl'] = true
        gitlab_rails['incoming_email_start_tls'] = false
        gitlab_rails['incoming_email_mailbox_name'] = "inbox"
        gitlab_rails['incoming_email_idle_timeout'] = 60
        gitlab_rails['incoming_email_expunge_deleted'] = true

        gitlab_pages['enable'] = true
        letsencrypt['contact_emails'] = ['<CONTACT-EMAIL>']
        alertmanager['admin_email'] = '<ADMIN-EMAIL>'
        gitlab_rails['gitlab_shell_ssh_port'] = <PORT>
        # Add any other gitlab.rb configuration here, each on its own line
```


### Установка GitLab с помощью Docker Engine
Кроме того, вы можете установить GitLab с помощью Docker Engine.

Если вы настроили GITLAB_HOME переменную, настройте каталоги в соответствии с вашими требованиями и запустите образ:

Если вы не используете SELinux, выполните следующую команду:

```bash
sudo docker run --detach \
  --hostname gitlab.example.com \
  --env GITLAB_OMNIBUS_CONFIG="external_url 'http://gitlab.example.com'" \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume $GITLAB_HOME/config:/etc/gitlab \
  --volume $GITLAB_HOME/logs:/var/log/gitlab \
  --volume $GITLAB_HOME/data:/var/opt/gitlab \
  --shm-size 256m \
  gitlab/gitlab-ee:<version>-ee.0
```
Эта команда загружает и запускает контейнер GitLab, а также публикует порты, необходимые для доступа по SSH, HTTP и HTTPS. Все данные GitLab хранятся в подкаталогах $GITLAB_HOME. Контейнер автоматически перезапускается после перезагрузки системы.

Если вы используете интеграцию с Kerberos , необходимо также опубликовать порт Kerberos (например, --publish 8443:8443). В противном случае операции Git с Kerberos будут недоступны. Процесс инициализации может занять много времени. Вы можете отслеживать этот процесс с помощью:

```bash
sudo docker logs -f gitlab
```

После запуска контейнера вы можете перейти по ссылке gitlab.example.com. Прежде чем Docker-контейнер начнёт отвечать на запросы, может пройти некоторое время.

Перейдите по URL-адресу GitLab и войдите в систему, используя имя пользователя root и пароль из следующей команды:

```bash
sudo docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password
```
Файл паролей автоматически удаляется при первом перезапуске контейнера через 24 часа.




















## Установка bare-metal

::: warning Заморозка
Установка из исходников сложна в виду проверки всех зависимостей в Альт линукс, поэтому пока что я не буду его описывать.
:::

Вы можете настроить первоначальную установку, настроив переменные окружения перед установкой.

### Доступные переменные среды

Вы можете настроить установку GitLab, установив следующие необязательные переменные среды. Эти переменные действуют только во время первой установки и не влияют на последующие перенастройки. Для существующих установок используйте пароль из `/etc/gitlab/initial_root_password` или сбросьте пароль `root`.


| Переменная | Цель | Необходимый | Пример |
| :--- | :--- | :--- | :--- |
| **`EXTERNAL_URL`** | Устанавливает внешний URL для вашего экземпляра GitLab. | Рекомендуется | `EXTERNAL_URL="https://gitlab.example.com"` |
| **`GITLAB_ROOT_EMAIL`** | Пользовательский адрес электронной почты для учетной записи администратора `root`. | Необязательный | `GITLAB_ROOT_EMAIL="admin@example.com"` |
| **`GITLAB_ROOT_PASSWORD`** | Пользовательский пароль (минимум 8 символов) для учетной записи администратора `root`. | Необязательный | `GITLAB_ROOT_PASSWORD="strongpassword"` |

Если вы не настроили учетные данные root во время установки:
- GitLab генерирует случайный пароль и адрес электронной почты для учетной записи администратора root.
- Пароль хранится `/etc/gitlab/initial_root_password` в течение 24 часов.
- Через 24 часа этот файл автоматически удаляется из соображений безопасности.

:::tip
Хотя вы также можете установить начальный пароль, `/etc/gitlab/gitlab.rb` установив `gitlab_rails['initial_root_password'] = "password"`, это не рекомендуется. Если вы всё же устанавливаете пароль этим способом, обязательно удалите его из, `/etc/gitlab/gitlab.rb` так как он будет считан только при первой перенастройке после установки пакета.
:::

