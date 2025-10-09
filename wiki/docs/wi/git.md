---
outline: deep
---

# GIT

![](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1024px-Git-logo.svg.png)

Git - это распределенная система управления версиями, которая позволяет отслеживать изменения в файлах, координировать работу нескольких разработчиков и эффективно управлять различными версиями проекта. В отличие от централизованных систем, где все изменения хранятся на одном сервере, Git позволяет каждому разработчику иметь локальную копию всего репозитория, включая историю изменений. Это делает Git гибким и удобным инструментом для командной работы, а также для работы в автономном режиме.

https://git-scm.com - Вся документация по Git

https://githowto.com/ru - Неплохой ресурс-самоучитель по Git

## Установка Git

```bash
apt-get install git
```

## Быстрый старт

### Создание репозитория 

Необходимо зарегистрировать аккаунт на публичном или локальном хостинге репозиториев (GitHub, GitLab, Gitea, BitBucket, GitFlic...)

В графическом интерфейсе найдите и нажмите "Создать новый репозиторий" или аналог.

Введите название и описание вашего репозитория.

Измените настройки на:  
- Public (пользователи в интернете могут видеть этот репозиторий);  
- Initialize this repository with (какие файл необходимо добавить в репозиторий);
- Add README (создать файл Readme.md)  
- Add .gitignore (None (или выберите, какие файлы не будут отслеживаться из листа шаблонов); 
- Choose a license (None (Или любая лицензия по вашей необходимости).     

*Некоторые пункты могут отличаться.

Нажимаем Create Repository.

На данный момент должен быть минимальный репозиторий с файлом `Readme.md` (иначе часть шагов будет отличаться).

### Настройка SSH

В терминале, будучи в сессии пользователя, которым Вы будете пользоваться при работе с git, введите следующую команду для генерации SSH ключа:
```bash
ssh-keygen –t ed25519 –C “your@email”
```

После выполнения команды Вам будут выведены пути к открытому и закрытому ключу.

Откройте файл `.ssh/id_ed25519.pub` и скопируйте его содержимое целиком.

Теперь зайдите на хостинг, настройки пользователя, SSH and GPG keys. New SSH key.

Придумайте название для ключа и введите его в поле.

Запись должна быть следующей:
```bash
ssh-ed25519 [ключ] [ваш email]
```

### Настройка глобального пользователя

В терминале, настройте имя пользователя Git для каждого репозитория командой:
```bash
git config --global user.name “[username]”
```
Также, необходимо задать email для пользователя Git:
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

## Подпись

Благодаря шифрованию система Git является безопасной, но полностью она не защищена. На случай, если вы берёте у кого-то в интернете результаты его работы и хотите проверить, что коммиты действительно получены из доверенного источника, в Git есть несколько способов подписать и проверить исходники, используя GPG.

### Введение в GPG

Во-первых, если вы хотите что-либо подписать, вам необходим настроенный GPG и персональный ключ.
```bash
$ gpg --list-keys
/Users/schacon/.gnupg/pubring.gpg
---------------------------------
pub   2048R/0A46826A 2014-06-04
uid                  Scott Chacon (Git signing key) <schacon@gmail.com>
sub   2048R/874529A9 2014-06-04
```
Если у вас нет ключа, то можете сгенерировать его командой `gpg --gen-key`.
```bash
$ gpg --gen-key
```

Получение публичного ключа:
```bash
gpg --export --armor <имя_или_ID_ключа>
```

::: tip Будьте внимательны
Для того, чтобы можно было использовать данный GPG-ключ на хостингах, требуется, чтобы электронная почта аккаунта на хостинге, почта указанная в `git config --global user.email` и электронная почта ключа GPG были одинаковыми!
:::


Если у вас есть приватный ключ для подписи, вы можете настроить Git так, чтобы этот ключ использовался для подписи, установив значение параметра `user.signingkey`.
```bash
$ git config --global user.signingkey 0A46826A
```

Теперь, если вы захотите, Git будет по умолчанию использовать этот ключ для подписи тегов и коммитов.

### Подпись тегов

Если вы настроили приватный ключ GPG, то можете использовать его для подписи новых тегов. Для этого вы должны использовать опцию `-s` вместо `-a`:
```bash
$ git tag -s v1.5 -m 'my signed 1.5 tag'

You need a passphrase to unlock the secret key for
user: "Ben Straub <ben@straub.cc>"
2048-bit RSA key, ID 800430EB, created 2014-05-04
```

Если теперь для этого тега вы выполните `git show`, то увидите прикреплённую к нему свою GPG подпись:
```bash
$ git show v1.5
tag v1.5
Tagger: Ben Straub <ben@straub.cc>
Date:   Sat May 3 20:29:41 2014 -0700

my signed 1.5 tag
-----BEGIN PGP SIGNATURE-----
Version: GnuPG v1

iQEcBAABAgAGBQJTZbQlAAoJEF0+sviABDDrZbQH/09PfE51KPVPlanr6q1v4/Ut
LQxfojUWiLQdg2ESJItkcuweYg+kc3HCyFejeDIBw9dpXt00rY26p05qrpnG+85b
hM1/PswpPLuBSr+oCIDj5GMC2r2iEKsfv2fJbNW8iWAXVLoWZRF8B0MfqX/YTMbm
ecorc4iXzQu7tupRihslbNkfvfciMnSDeSvzCpWAHl7h8Wj6hhqePmLm9lAYqnKp
8S5B/1SSQuEAjRZgI4IexpZoeKGVDptPHxLLS38fozsyi0QyDyzEgJxcJQVMXxVi
RUysgqjcpT8+iQM1PblGfHR4XAhuOqN5Fx06PSaFZhqvWFezJ28/CLyX5q+oIVk=
=EFTF
-----END PGP SIGNATURE-----

commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date:   Mon Mar 17 21:52:11 2008 -0700

    Change version number

Проверка тегов
```

Для проверки подписанного тега вы можете воспользоваться командой `git tag -v [tag-name]`. Она использует GPG для проверки подписи. Чтобы всё это правильно работало нужно, чтобы публичный ключ автора присутствовал в вашем хранилище ключей:
```bash
$ git tag -v v1.4.2.1
object 883653babd8ee7ea23e6a5c392bb739348b1eb61
type commit
tag v1.4.2.1
tagger Junio C Hamano <junkio@cox.net> 1158138501 -0700

GIT 1.4.2.1

Minor fixes since 1.4.2, including git-mv and git-http with alternates.
gpg: Signature made Wed Sep 13 02:08:25 2006 PDT using DSA key ID F3119B9A
gpg: Good signature from "Junio C Hamano <junkio@cox.net>"
gpg:                 aka "[jpeg image of size 1513]"
Primary key fingerprint: 3565 2A26 2040 E066 C9A7  4A7D C0C6 D9A4 F311 9B9A
```

Если у вас отсутствует публичный ключ автора, вы увидите что-то подобное:
```bash
gpg: Signature made Wed Sep 13 02:08:25 2006 PDT using DSA key ID F3119B9A
gpg: Can't check signature: public key not found
error: could not verify the tag 'v1.4.2.1'
```

### Подпись коммитов

В новых версиях Git (начиная с v1.7.9), вы также можете подписывать отдельные коммиты. Если вам нужно подписывать непосредственно сами коммиты, а не теги, вы можете передать команде `git commit` опцию `-S`.
```bash
$ git commit -a -S -m 'Signed commit'

You need a passphrase to unlock the secret key for
user: "Scott Chacon (Git signing key) <schacon@gmail.com>"
2048-bit RSA key, ID 0A46826A, created 2014-06-04

[master 5c3386c] Signed commit
 4 files changed, 4 insertions(+), 24 deletions(-)
 rewrite Rakefile (100%)
 create mode 100644 lib/git.rb
```

Для просмотра и проверки таких подписей у команды `git log` есть параметр `--show-signature`.
```bash
$ git log --show-signature -1
commit 5c3386cf54bba0a33a32da706aa52bc0155503c2
gpg: Signature made Wed Jun  4 19:49:17 2014 PDT using RSA key ID 0A46826A
gpg: Good signature from "Scott Chacon (Git signing key) <schacon@gmail.com>"
Author: Scott Chacon <schacon@gmail.com>
Date:   Wed Jun 4 19:49:17 2014 -0700

    Signed commit
```

Также вы можете, используя формат с `%G?`, настроить `git log` так, чтобы он проверял и отображал любую обнаруженную подпись.
```bash
$ git log --pretty="format:%h %G? %aN  %s"

5c3386c G Scott Chacon  Signed commit
ca82a6d N Scott Chacon  Change the version number
085bb3b N Scott Chacon  Remove unnecessary test code
a11bef0 N Scott Chacon  Initial commit
```

В данном примере видно, что только последний коммит корректно подписан, а все предыдущие нет.

В Git, начиная с версии 1.8.3, команды `git merge` и `git pull` с помощью опции `--verify-signatures` можно заставить проверять и отклонять слияния, если коммит не содержит доверенной GPG подписи.

Если вы воспользуетесь этой опцией при слиянии с веткой, которая содержит неподписанные или некорректно подписанные коммиты, то слияние завершится ошибкой.
```bash
$ git merge --verify-signatures non-verify
fatal: Commit ab06180 does not have a GPG signature.
```

Если сливаемая ветка содержит только корректно подписанные коммиты, команда слияние сначала покажет все проверенные ей подписи, а затем выполнит само слияние.
```bash
$ git merge --verify-signatures signed-branch
Commit 13ad65e has a good GPG signature by Scott Chacon (Git signing key) <schacon@gmail.com>
Updating 5c3386c..13ad65e
Fast-forward
 README | 2 ++
 1 file changed, 2 insertions(+)
```
Также с командой `git merge` вы можете использовать опцию `-S`, в этом случае полученный в результате слияния коммит будет подписан. В следующем примере выполняется и проверка каждого коммита сливаемой ветки, и подпись полученного в результате слияния коммита.
```bash
$ git merge --verify-signatures -S  signed-branch
Commit 13ad65e has a good GPG signature by Scott Chacon (Git signing key) <schacon@gmail.com>

You need a passphrase to unlock the secret key for
user: "Scott Chacon (Git signing key) <schacon@gmail.com>"
2048-bit RSA key, ID 0A46826A, created 2014-06-04

Merge made by the 'recursive' strategy.
 README | 2 ++
 1 file changed, 2 insertions(+)
```

### Каждый должен подписываться

Конечно, подписывать теги и коммиты это хорошая идея, но если вы решите воспользоваться ей в вашем обычном рабочем процессе, то должны удостовериться, что все в вашей команде понимают, как выполнять подпись. Если этого не сделать, то в итоге вам придётся потратить много времени, объясняя коллегами, как перезаписать их коммиты подписанными версиями. Удостоверьтесь, что вы разбираетесь в GPG и преимуществах, которые несут подписи, перед тем как использовать их как часть вашего рабочего процесса.

::: tip Переподписание коммитов
Чтобы перезаписать коммиты их **подписанными (signed) версиями** в Git, нужно выполнить **интерактивный rebase** с последующим **повторным коммитом с подписью**.

- Убедитесь, что у вас настроен GPG-ключ для подписи коммитов.
- Проверьте, что Git знает ваш ключ:
```bash
git config --global user.signingkey <ваш-GPG-ключ-ID>
```
- Убедитесь, что `gpg` установлен и работает.

1. Начните интерактивный rebase

Допустим, вы хотите переписать последние **N** коммитов:

```bash
git rebase -i HEAD~N
```

Например, для последних 3 коммитов:
```bash
git rebase -i HEAD~3
```

2. В открывшемся редакторе замените `pick` на `edit` (или `e`) для каждого коммита, который хотите переподписать:

```
edit abc1234 Commit message 1
edit def5678 Commit message 2
edit ghi9012 Commit message 3
```

Сохраните и закройте редактор.

3. Для каждого коммита сделайте **аменд (amend)** с подписью:

Git остановится на первом коммите. Выполните:

```bash
git commit --amend --no-edit -S
```

Флаги:
- `--amend` — изменяет последний коммит.
- `--no-edit` — сохраняет оригинальное сообщение коммита.
- `-S` — подписывает коммит GPG-ключом.

Повторите это для каждого коммита, на котором останавливается rebase.

4. Продолжайте rebase:

После аменда каждого коммита выполняйте:

```bash
git rebase --continue
```

Повторяйте шаги 3–4, пока rebase не завершится.

**Альтернатива: автоматизировать с помощью `--exec`**

Если вы хотите переподписать **все** коммиты в диапазоне без ручного редактирования каждого:

```bash
git rebase -i HEAD~N --exec 'git commit --amend --no-edit -S'
```

В открывшемся редакторе просто оставьте все строки как `pick`, и Git автоматически выполнит `--exec` после каждого коммита.

5. Проверка подписи

После завершения проверьте, что коммиты подписаны:

```bash
git log --show-signature -n N
```

Вы должны увидеть `Good signature` для каждого коммита.

6. Послен подписания коммитов история вашего локального бренча изменилась — и теперь она **расходится** с удалённой веткой.

Чтобы отправить **подписанные коммиты** в удалённый репозиторий, вам нужно **принудительно отправить** (`force push`) вашу локальную ветку на удалённый репозиторий, например:

```bash
git push --force-with-lease origin main
```
:::


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

## Ошибка при пуше в master при init

Текст ошибки:
```bash
error: src refspec master does not match any
error: failed to push some refs to 'github.com:xxxxxx/xxxxx.git'
```

Решение: удалить (переименовать) ремоут:
```bash
git remote rename origin old-origin
```

Или замена `master` на `main`
```bash
git push -u origin main
```

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

Данные действия выполняются не под пользователем root:

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

Далее всё выполняется под пользователем root:  

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

Переходим в домашнюю директорию пользователя `git`:
```bash
cd ~
```

Создаем директорию `/home/git/.git/`:
```bash
mkdir .ssh
```

Создаем файл `authorized_keys`:
```bash
touch .ssh/authorized_keys
```

Устанавливаем права:
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

::: danger Внимание
Перед этим необходимо установить пакет `git-full`:
```bash
apt-get install git-full
```
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


