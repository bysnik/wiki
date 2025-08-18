---
outline: deep
---

# GIT

![](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1024px-Git-logo.svg.png)

Git - это распределенная система управления версиями, которая позволяет отслеживать изменения в файлах, координировать работу нескольких разработчиков и эффективно управлять различными версиями проекта. В отличие от централизованных систем, где все изменения хранятся на одном сервере, Git позволяет каждому разработчику иметь локальную копию всего репозитория, включая историю изменений. Это делает Git гибким и удобным инструментом для командной работы, а также для работы в автономном режиме.

https://git-scm.com - Читаем документацию

## Установка Git

```bash
apt-get install git
```

## Быстрый старт

### Создание репозитория 

Далее необходимо зарегистрировать аккаунт на публичном или локальном хостинге репозиториев (GitHub, GitLab, Gitea, BitBucket, GitFlic...)

В графическом интерфейсе найдите и нажмите "Создать новый репозиторий" или аналог.

Введите название и описание вашего репозитория.

Измените настройки на:  
- Public (пользователи в интернете могут видеть этот репозиторий);  
- Initialize this repository with (Поставьте галочку (указывается полное описание проекта); )
- Add README (создать файл Readme.md)  
- Add .gitignore (None (или выберите, какие файлы не будут отслеживаться из листа шаблонов);  )
- Choose a license (None (Или любая лицензия по вашей необходимости). )    

*Некоторые пункты могут отличаться, но суть остаётся тоё же

Нажимаем Create Repository

На данный момент должен быть минимальный репозиторий с файлом Readme.md.

### Настройка SSH

В терминале, будучи в сессии пользователя, которым Вы будете пользоваться при работе с git, введите следующую команду для генерации SSH ключа:
```bash
ssh-keygen –t ed25519 –C “your@email”
```

После выполнения команды Вам будут выведены пути к открытому и закрытому ключу.

Откройте файл .ssh/id_ed25519.pub и скопируйте его содержимое целиком.

Теперь зайдите на хостинг, настройки пользователя, SSH and GPG keys. New SSH key.

Придумайте название для ключа и введите его в поле.

Запись должна быть следующей:

ssh-ed25519 [ключ] [ваш email]

### Настройка глобального пользователя

В терминале, настройте имя пользователя Git для каждого репозитория командой:
```bash
git config --global user.name “[username]”
```
Также, необходимо задатьemail для пользователя Git:
```bash
git config --global user.email “[email]”
```
Чтобы проверить конфигурацию файла Git введите команду:
```bash
git config --list
```

### Клонирование удаленного репозитория в рабочую директорию

Необходимо клонировать ранее созданный удаленный репозиторий на локальный компьютор. 

В хостинге, на главной странице репозитория, найдите клавишу `<> Code` и скопируйте ссылку SSH формата:
```bash
git@<URL_или_IP_удалённого_репозитория>:<имя_пользователя_на_удалённом_репозитории>/<название_репозитория>.git
```

Затем, в терминале введите команду:
```bash
git clone git@<URL_или_IP_удалённого_репозитория>:<имя_пользователя_на_удалённом_репозитории>/<название_репозитория>.git
```
Перейдите в скопированный репозиторий
```bash
cd [название_репозитория]/ 
```

### Работа с файлами в рабочей директории

Для примера, создадим файл helloworld.py со следующим содержимым:

```python
def helloWorld():
    return "Hello World"
    
if __name__ == "__main__":
    print(helloWorld())
```

### Отправка изменений на удаленный репозиторий

![](https://habrastorage.org/getpro/habr/post_images/a91/fe3/bda/a91fe3bda5ec9f80d35d3c2b6b6f1ddd.png)

Работа с репозиториями происходит по данной схеме. После изменения содержимого рабочей директории нам нужно добавить эти изменения в локальный репозиторий.

Выделяем все файлы для отправки в локальный репозиторий:
```bash
git add .
```
Создаем коммит изменений. Без него ничего работать не будет!
```bash
git commit –m “First commit” 
```
Отправляем изменения из локального репозитория в удалённый. По умолчанию, в ветку main.
```bash
git push origin main
```


## Ошибка: WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! 

Если при выполнении клонирования у вас происходит это:
```bash
[basealt@bystrovno-nb gitea]$ git clone gitea@192.168.56.10:admin/t342ewg4y4.git
Cloning into 't342ewg4y4'...
ssh: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
ssh: @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
ssh: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
ssh: IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
ssh: Someone could be eavesdropping on you right now (man-in-the-middle attack)!
ssh: It is also possible that a host key has just been changed.
ssh: The fingerprint for the ED25519 key sent by the remote host is
SHA256:tWrhG8sQgkPJb6ZFZe/wSdZlM6ZkftFX6sTwxY7ereg.
ssh: Please contact your system administrator.
ssh: Add correct host key in /home/basealt/.ssh/known_hosts to get rid of this message.
ssh: Offending ECDSA key in /home/basealt/.ssh/known_hosts:10
ssh: Host key for 192.168.56.10 has changed and you have requested strict checking.
ssh: Host key verification failed.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```
Как вариант, попробуйте удалить старый ключ и сделать повторное клонирование:
```bash
ssh-keygen -R 192.168.56.10
```
У меня это произошло потому что я при клонировании не тот URL написал, вместо IP у меня localhost был, но я этого не заметил и сделал
```bash
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```
Ну и почему то он потом начал выдавать ошибку при клонировании

## Как клонировать определённый брэнч

```bash
git clone -b <имя_ветки> --single-branch <URL_репозитория>
```

1. `git clone <URL_репозитория>`:
Эта часть команды клонирует репозиторий. Обычно это скачивает все ветки, но с помощью дополнительных параметров можно ограничить клонирование. 

2. `-b <имя_ветки>`:
Этот параметр указывает Git, какую ветку нужно клонировать. Замените <имя_ветки> на имя нужной вам ветки. 

3. `--single-branch`:
Этот параметр гарантирует, что будет клонирована только указанная ветка, а не весь репозиторий со всеми его ветками. Это полезно для экономии места и времени, особенно если репозиторий большой. 





## Свой Git-хостинг и GitWeb

### Минимальная конфигурация сервера
Для примера, директория сервера, где будут храниться все проекты, будет `/srv/git`

Предположим, создадим новый репозиторий `my_project`:
```bash
mkdir ~/my_project

cd ~/my_project

git init

echo "Это тестовый репозиторий" > ~/my_project/README.md

git add .

git commit -m "Initial commit"
```

Теперь необходимо экспортировать существующий репозиторий в новый голый репозиторий — репозиторий без рабочего каталога.
```bash
git clone --bare ~/my_project /srv/git/my_project
```
В дальнейшем, этот репозиторий будет доступен для других пользователей.

### GitWeb

Уже сейчас можно посмотреть как будет выглядеть GitWeb. Запустим его в тестовом режиме.

Необходимо установить пакет `lighttpd`:
```bash
apt-get install lighttpd
```

Это, конечно, криво, но чтобы запустить веб-интерфейс в тестовом режиме, нужно дать максимальные права репозиторию:
```bash
chmod -R 777 /srv/git/my_project
```
Запуск производится строго не под рутом:
```bash
cd /srv/git/my_project && git instaweb
```

Если всё сделано правильно, то откроется браузер:
![alt text](/public/img/gitwebtest.png)


Запустим теперь уже на веб-сервере `apache2`.

В репозитории Альта есть пакет [gitweb](https://packages.altlinux.org/ru/p11/binary/gitweb/noarch/), но я не понял как с ним работать), да и информации в интернете практически нет, так что будем работать по гайду с https://git-scm.com.

Сейчас работаем не под рутом:
1. Клонируем репозиторий git:
```bash
$ git clone git://git.kernel.org/pub/scm/git/git.git
```
2. Переходим в склонированный проект:
```bash
$ cd git/
```
3. Собираем gitweb из исходников:
```bash
$ make GITWEB_PROJECTROOT="/srv/git" prefix=/usr gitweb
```

Вот теперь под рутом:  

4. Копируем собранные файлы:
```bash
cp -Rf gitweb /var/www/
```

5. Создаём файл `/etc/httpd2/conf/sites-available/gitweb.conf`:
```apache
<VirtualHost *:80>
    ServerName gitserver
    DocumentRoot /var/www/gitweb
    <Directory /var/www/gitweb>
        Options +ExecCGI +FollowSymLinks +SymLinksIfOwnerMatch
        AllowOverride All
        order allow,deny
        Allow from all
        AddHandler cgi-script cgi
        DirectoryIndex gitweb.cgi
    </Directory>
</VirtualHost>
```

6. Отключаем стандартный хост:
```bash
a2dissite 000-default
```
7. Включаем наш конфиг:
```bash
a2ensite gitweb
```
8. Перезагружаем веб-сервер
```bash
systemctl restart httpd2
```

### Настройка доступа по SSH

Будем предполагать, что у Вас на клиенте под учётной записью пользователя уже создан открытый ключ `~/.ssh/id_rsa.pub`, который клиент будет использовать для доступа к Вашему Git-репозиторию.

На сервере необходимо создать пользователя `git`:
```bash
adduser git
```

Проверьте наличие файла `authorized_keys`:
```bash
cat /home/git/.ssh/authorized_keys
```

Если его нет, тогда нужно создать. Перейдите в сессию пользователя `git`:
```bash
su git
```

```bash
cd ~
```

```bash
mkdir .ssh
```

```bash
touch .ssh/authorized_keys
```

```bash
chmod 600 .ssh/authorized_keys
```

Теперь любым способом просто добавляете содержимое файла `~/.ssh/id_rsa.pub` клиента в файл `/home/git/.ssh/authorized_keys` На сервере.

::: tip Примечание
Есть гораздо более простой способ. Необходимо использовать на стороне клиента команду `ssh-copy-id`:
```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub git@<git_server_ip_address>
```

Главное, чтобы на сервере работал стандартный доступ по паролю.

P.S. В гайде выше пароль у пользователя `git` создан не был.
:::

Отредактируем права для директории `/srv/git/` и всех вложенных файлов на сервере:
```bash
chmod -R 755 /srv/git
```

После этого, можно проверить работоспособность. Попробуем клонировать репозиторий. На стороне клиента, под пользователем, чей ключ был скопирован, вводим команду:
```bash
git clone git@<git_server_ip_address>:/srv/git/my_project.git
```

Если клонирование прошло успешно, значит доступ по SSH настроен корректно!

Теперь каждый раз, когда нужно будет создать новый проект/репозиторий, необходимо будет выполнять следующие шаги на сервере:

1. Создать пустой репозиторий, запустив `git init` с параметром `--bare`, что инициализирует репозиторий без рабочего каталога:
```bash
cd /srv/git
mkdir new_project.git
cd new_project.git
git init --bare
#Initialized empty Git repository in /srv/git/new_project.git/
```

2. После этого один из пользователей может отправить первую версию их проекта в этот репозиторий, добавив его как удалённый и отправив соответствующую ветку. Заметьте, что кто-то должен заходить на сервер и создавать голый репозиторий каждый раз, когда вы хотите добавить проект.
```bash
#На компьютере пользователя
cd new_project
git init
git add .
git commit -m 'Initial commit'
git remote add origin git@<git_server_ip_address>:/srv/git/new_project.git
git push origin master
```

3. Теперь все остальные могут клонировать его и отправлять в него изменения:
```bash
git clone git@<git_server_ip_address>:/srv/git/new_project.git
cd new_project
vim README
git commit -am 'Fix for README file'
git push origin master
```

Этим способом вы можете быстро получить Git-сервер с доступом на чтение/запись для небольшой группы разработчиков.

#### Немного о бозопасности  

Заметьте, что теперь все эти пользователи могут заходить на сервер как пользователь `git`. Чтобы это предотвратить, нужно изменить ему оболочку на что-то другое в файле `/etc/passwd`.

Вы можете легко ограничить пользователя `git` только действиями, связанными с Git, с помощью ограниченной оболочки `git-shell`, поставляемой вместе с Git. Если указать её в качестве командного интерпретатора для пользователя `git`, то он не сможет получить доступ к обычной командной оболочке на вашем сервере. Для её использования, укажите `git-shell` вместо `bash` или `csh` для пользователя `git`:
Проверим, что `git-shell` установлена.
```bash
which git-shell
```

Теперь можно изменить оболочку для пользователя используя `chsh <username> -s <shell>`:
```bash
chsh git -s $(which git-shell)
```
Теперь пользователь `git` может использовать SSH соединение только для работы с репозиториями Git и не может зайти на машину. Если вы попробуете войти в систему, то вход будет отклонён:
```bash
ssh git@<git_server_ip_address>
#fatal: Interactive git shell is not enabled.
#hint: ~/git-shell-commands should exist and have read and execute access.
#Connection to <git_server_ip_address> closed.
```

### Git-демон

::: danger ПРОБЛЕМА ВЕКА!
`git daemon is not a git command`. Доустановите `git-full`
:::

Далее мы установим демон, обслуживающий репозитории по протоколу «Git». Это широко распространённый вариант для быстрого доступа без аутентификации. Помните, что раз сервис — без аутентификации, всё, что обслуживается по этому протоколу — публично доступно в сети.

Если вы запускаете демон на сервере не за сетевым экраном, он должен использоваться только для проектов, которые публично видны внешнему миру. Если сервер находится за вашим сетевым экраном, вы можете использовать его для проектов, к которым большое число людей или компьютеров (серверов непрерывной интеграции или сборки) должно иметь доступ только на чтение, и если вы не хотите для каждого из них заводить SSH-ключ.

В любом случае, протокол Git относительно просто настроить. Упрощённо, вам нужно запустить следующую команду в демонизированной форме:
```bash
git daemon --reuseaddr --base-path=/srv/git/ /srv/git/
```
Опция `--reuseaddr` позволит серверу перезапуститься без ожидания таймаута существующих подключений, `--base-path` позволит людям не указывать полный путь, чтобы клонировать проект, а путь в конце указывает демону Git где искать экспортируемые репозитории. Если у вас запущен сетевой экран, вы должны проколоть в нём дырочку, открыв порт 9418 на машине, где всё это запущено.

Демонизируем данную команду. Просто создайте файл `/etc/systemd/system/git-daemon.service` со следующим содержанием:
```systemd
[Unit]
Description=Start Git Daemon

[Service]
ExecStart=/usr/bin/git daemon --reuseaddr --base-path=/srv/git/ /srv/git/

Restart=always
RestartSec=500ms

StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=git-daemon

User=git
Group=git

[Install]
WantedBy=multi-user.target
```

Как вы могли здесь заметить, Git демон запускается от имени `git`, как пользователя, так и группы. При необходимости укажите другие значения и убедитесь, что указанный пользователь существует в системе. Так же убедитесь, что исполняемый файл Git имеет путь `/usr/bin/git` или укажите соответствующий путь к нему.

Наконец, выполните команду `systemctl enable git-daemon` для запуска сервиса при старте системы; для ручного запуска и остановки сервиса используйте команды `systemctl start git-daemon` и `systemctl stop git-daemon` соответственно.

Затем нужно указать Git серверу к каким репозиториям предоставлять доступ без аутентификации. Вы можете сделать это для каждого репозитория, создав файл с именем `git-daemon-export-ok`.
```bash
cd /path/to/project.git
touch git-daemon-export-ok
```
Наличие этого файла указывает Git, что можно обслуживать этот проект без аутентификации.

::: tip ПЫСЫ
По данному протоколу нужно клонировать без `/srv/git`:
```bash
git clone git://<git_server_ip_address>/my_project.git
```
:::


### Умный HTTP

Теперь у нас есть доступ с аутентификацией через SSH и неаутентифицированный доступ через `git://`, но есть ещё протокол, который может делать и то и другое. Настройка умного HTTP — это просто установка на сервер CGI-скрипта `git-http-backend`, поставляемого вместе с Git. Этот CGI-скрипт будет читать путь и заголовки, посылаемые `git fetch` или `git push` в URL и определять, может ли клиент работать через HTTP (это верно для любого клиента, начиная с версии 1.6.6). Если CGI-скрипт видит, что клиент умный, то и общаться с ним будет по-умному, иначе откатится на простое поведение (что делает операции чтения обратно совместимыми со старыми клиентами).


Давайте пройдёмся по самой базовой установке. Мы настроим Apache как сервер CGI.

Включаем необходимые модули:
```bash
a2enmod cgi 
a2enmod alias 
a2enmod env
a2enmod auth_basic
a2enmod authn_core  
a2enmod authz_core
a2enmod authn_file
a2enmod authz_user
```

Так же необходимо установить пользователя и группу для каталога `/srv/git` в значение `apache2`, чтобы позволить веб-серверу читать из и писать в репозитории, потому что процесс Apache, запускающий CGI скрипт, работает от имени этого пользователя:
```bash
chmod -R apache2:apache2 /srv/git
```

Затем добавим некоторые настройки в конфигурационный файл `/etc/httpd2/conf/sites-available/gitweb.conf` ниже блока `<Directory>...</Directory>`, чтобы запускать `git-http-backend` как обработчик для всех запросов, содержащих `/git`.
```apache
SetEnv GIT_PROJECT_ROOT /srv/git
SetEnv GIT_HTTP_EXPORT_ALL
ScriptAlias /git/ /usr/libexec/git-core/git-http-backend/
```
Если пропустить переменную окружения `GIT_HTTP_EXPORT_ALL`, тогда Git будет отдавать только неаутентифицированным клиентам репозитории с файлом `git-daemon-export-ok` внутри, также как это делает Git-демон.

Наконец, нужно разрешить Apache обрабатывать запросы к `git-http-backend`, при этом запросы на запись должны быть авторизованы, для этого можно использовать вот такой блок конфигурации:
```apache
<Files "git-http-backend">
    AuthType Basic
    AuthName "Git Access"
    AuthUserFile /srv/git/.htpasswd
    Require expr !(%{QUERY_STRING} -strmatch '*service=git-receive-pack*' || %{REQUEST_URI} =~ m#/git-receive-pack$#)
    Require valid-user
</Files>
```
Это потребует создания файла `.htpasswd`, содержащего пароли всех пользователей. Например, добавление пользователя «schacon» в этот файл делается так:
```bash
htpasswd -c /srv/git/.htpasswd schacon
```

::: tip ПЫСЫ
При клонировании по http, вместо `/srv/git/` пишем просто `/git/`:
```bash
git clone http://<git_server_ip_address>/git/my_project.git
```

При пуше попросит логин/пароль.
:::


