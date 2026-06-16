---
outline: deep
---

# Secure Shell

## Использование Рутокен при установлении SSH-соединения

Рутокен в данном сценарии используется не как средство передачи файлов, а как средство аутентификации при установлении SSH-соединения. Передача файлов выполняется стандартными инструментами, работающими поверх SSH/SFTP: sftp, scp, rsync, sshfs и т.д.

Если подключение уже работает через `ssh -I /usr/lib64/librtpkcs11ecp.so user@srv1`, то для удобства рекомендуем вынести параметры PKCS#11 в пользовательский SSH-конфиг. На клиентской машине:
```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
mcedit ~/.ssh/config
```
Пример содержимого:
```
Host srv1-rutoken
    HostName srv1
    User user
    PKCS11Provider /usr/lib64/librtpkcs11ecp.so
    IdentitiesOnly yes
```
```bash
chmod 600 ~/.ssh/config
```
После этого можно использовать короткое имя для подключения:
```bash
ssh srv1-rutoken
sftp srv1-rutoken
scp file.txt srv1-rutoken:/home/user/
rsync -avh --progress ./dir/ srv1-rutoken:/home/user/dir/
```
Для большого количества файлов обычно удобнее использовать rsync, например:
```bash
rsync -avh --progress ./local_dir/ srv1-rutoken:/home/user/remote_dir/.
```
Если нужен интерфейс файлового менеджера, можно использовать sshfs, он монтирует удалённый каталог по SSH/SFTP в локальную директорию:
```bash
mkdir -p ~/mnt/srv1
sshfs srv1-rutoken:/home/user ~/mnt/srv1
```

После этого с файлами можно работать как с локальными через обычный файловый менеджер.
Размонтирование: 
```bash
fusermount -u ~/mnt/srv1
```

Относительно аналога Pageant/WinSCP в Linux: ближайший вариант - использование ssh-agent с добавлением PKCS#11-провайдера. В таком режиме ключ с токена добавляется в агент, а приложения, которые используют OpenSSH/SSH-agent, могут обращаться к нему через переменную окружения `SSH_AUTH_SOCK`.
Можно проверить следующий вариант:
```bash
eval "$(ssh-agent -s)" 
ssh-add -s /usr/lib64/librtpkcs11ecp.so
ssh-add -L
```

После добавления ключа проверить подключение:
```bash
ssh srv1-rutoken
```

Если подключение проходит с использованием ключа с Рутокен, дальше можно проверять файловые менеджеры/клиенты, которые умеют работать через SSH-agent.

Из практичных вариантов для Linux:

`sshfs` + `mc` - рабочий и наиболее предсказуемый вариант, так как монтирование выполняется поверх SSH, а дальше файлы видны как локальные.
`far2l` - можно проверить как более удобный двухпанельный файловый менеджер. Его плагин NetRocks поддерживает SFTP/SCP и умеет использовать OpenSSH-конфиги, в том числе `~/.ssh/config`, поэтому этот вариант выглядит перспективнее для такого сценария.
`Double Commander` - также можно проверить, но его работа с Рутокен/PKCS#11 зависит от реализации используемого SFTP/SSH-плагина. Если плагин не использует системный OpenSSH или SSH-agent, токен может не подхватиться.

При этом гарантированно универсального аналога связки Pageant + WinSCP для Linux в составе стандартных средств ОС нет.

## Ошибки

### administratively prohibited

```bash
channel 32: open failed: administratively prohibited: open failed
```

**Диагноз:**

Сервер запрещает проброс TCP-портов через SSH!

Сообщение `administratively prohibited` означает, что SSH-сервер на целевой машине активно отклоняет попытки создать туннели для проброса портов. Это политика безопасности на стороне сервера.

**Причина:**

Сервер по умолчанию имеет ограниченную конфигурацию SSH, которая запрещает `TCP forwarding` из соображений безопасности.

**Решение:**

Отредактируйте конфигурацию SSH
```bash
nano /etc/ssh/sshd_config
```
Найдите или добавьте строку:
```bash

AllowTcpForwarding yes
```
Перезапустите SSH
```bash
systemctl restart sshd
```

### WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! 

```bash
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

**Диагноз:**

Некорректная связка адреса и хост ключа в `.ssh/known_hosts`.

**Причина:**

Обновился ключ хоста, переустановили ОС и т.д.

**Решение:**

Удалить информацию из `.ssh/known_hosts`
```bash
ssh-keygen -R 192.168.56.10
```