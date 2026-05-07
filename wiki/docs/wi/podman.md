# Podman

![](https://basis.gnulinux.pro/ru/latest/_images/podman.png)

Podman – это инструмент с открытым исходным кодом для поиска, сборки, передачи и запуска приложений. Является утилитой командной строки с аналогичными docker командами, однако не требует дополнительный сервис для работы и может работать без прав доступа root. По умолчанию использует в качестве Container Runtime crun (ранее runc).

Возможность работать с контейнерами без прав root приводит к нескольким особенностям:
- все файлы Podman (образы, контейнеры и др.) пользователей с правами доступа root хранятся в каталоге `/var/lib/containers`, без прав доступа root – в `~/.local/share/containers`
- пользователи без root прав по умолчанию не могут использовать привилегированные порты и полноценно использовать некоторые команды

[Официальная комикс-раскраска про Podman от RedHat](/public/static/ContainerCommandosColoringBook.pdf)


## Установка Podman

```bash
apt-get install podman podman-compose
```

Если Вам нужен Docker-совместимый сокет (например, для Docker CLI или других инструментов), включите службу:
```bash
systemctl enable --now podman.socket
```

Для rootless (пользовательский режим):
```bash
systemctl --user enable --now podman.socket
```

## Rootless режим

Для использования podman непривилегированными пользователями, необходимо произвести ряд дополнительных действий по настройке прав:

Проверить наличие разрешения на создание пользовательских пространств имён:
```bash
sysctl kernel.unprivileged_userns_clone
```
Если отсутствует, то разрешаем (устанавливаем пакет с необходимой конфигурацией)
```bash
apt-get install sysctl-conf-userns
```
Предоставить права на запуск исполняемых файлов `/usr/bin/newuidmap` и `/usr/bin/newgidmap` пользователям, не являющимся владельцами файла и не принадлежащим к группе владельца файла:
```bash
control newgidmap public
```
```bash
control newuidmap public
```
Поскольку эти исполняемые файлы обращаются к системным вызовам `setuid()` и `setgid()`, чтобы лишний раз не выдавать SUID бит, задайте этим файлам соответствующие file capabilities:
```bash
setcap cap_setuid+ep /usr/bin/newuidmap
```
```bash
setcap cap_setgid+ep /usr/bin/newgidmap
```
Если при попытке работы с podman под непривилегированным пользователем (например, `"$ podman images"`) выдаётся ошибка `"Error: kernel does not support overlay fs: 'overlay' is not supported ..."`, то нужно донастроить `Fuse`:

Под пользователем root:
```bash
apt-get install fuse-overlayfs
```
```bash
control fusermount fuseonly
```
```bash
usermod -aG fuse <your_unprivileged_user_here>
```
Далее нужно перезайти под непривилегированным пользователем и проверить, что нет ошибок - вывод должен быть примерно такого вида:
```bash
$ fusermount -V
# fusermount version: 2.9.9
```
```bash
$ fusermount3 -V
# fusermount3 version: 3.16.2
```
Этих действий достаточно для запуска podman непривилегированными пользователями. 

::: tip Примечание:

Чтобы podman могли запускать непривилегированные пользователи, для каждого такого пользователя должна существовать запись конфигурации subuid и subgid. Новые пользователи, созданные после установки podman, имеют эти записи по умолчанию.

Для пользователей, у которых нет записей в `/etc/subuid` и `/etc/subgid`, можно создать запись с помощью команды `usermod`, например:
```bash
usermod --add-subuids 100000-165535 --add-subgids 100000-165535 имя_пользователя
```
Данная команда выделяет заданный диапазон UID и GID пользователю, что позволит пользователю и группе с именем пользователя запускать контейнеры Podman.

В случае попытки добавить доменного пользователя, имя пользователя вносится в `/etc/subuid` и `/etc/subgid` вручную.

Указанный выше диапазон UID и GID уже может быть занят другим пользователем, т.к. это диапазон по умолчанию для первого пользователя. Просмотреть занятые диапазоны можно в файлах `/etc/subuid` и `/etc/subgid`, например:
```bash
cat /etc/subuid 
# user:100000:65536
# user2:165536:65536
```
Многим образам требуется 65536 uid/gid для сопоставления. Рекомендуется выделять как минимум столько uid/gid для каждого пользователя.

Для применения изменений в `subuid` и `subgid` необходимо выполнить команду:
```bash
$ podman system migrate
```
:::

## Запуск образов

Podman предоставляет совместимый с Docker интерфейс CLI, а следовательно допустимо настроить при необходимости `alias docker=podman`:
```bash
echo "alias docker=podman" >> ~/.bashrc
```
Загрузка образа из репозитория:
```bash
podman pull registry.altlinux.org/alt/alt
```
Запуск контейнера из образа:
```bash
podman run -it --name alt registry.altlinux.org/alt/alt
```

## Podman Desktop

![](https://podman-desktop.io/img/features/homepage.webp)

Документация - https://podman-desktop.io/docs/intro

### Шаг 1. Установка необходимых компонентов

```bash
apt-get install flatpak podman podman-compose
```

### Шаг 2. Установка Podman Desktop

Скачайте последнюю версию [Podman Desktop](https://podman-desktop.io/downloads/linux)

Далее нужно установить скаченный файл:
```bash
flatpak install --user $HOME/Downloads/podman-desktop-<version>.flatpak
```
::: tip Альтернативный вариант
Добавляем новый репозиторий FlatHub:
```bash
flatpak remote-add --if-not-exists --user flathub https://flathub.org/repo/flathub.flatpakrepo
```
Устанавливаем через FlatHub:
```bash
flatpak install --user flathub io.podman_desktop.PodmanDesktop
```
:::

### Шаг 3. Инициализация Podman machine

```bash
podman machine init
```

### Шаг 4. Запуск Podman Machine

```bash
podman machine start
```

Если при `podman machine start` есть ошибка:
```bash
Starting machine "podman-machine-default"
Error: could not find "gvproxy" in one of [/usr/local/libexec/podman /usr/local/lib/podman /usr/libexec/podman /usr/lib/podman].  To resolve this error, set the helper_binaries_dir key in the `[engine]` section of containers.conf to the directory containing your helper binaries.
```

Тогда нужно сделать следующее:
```bash
curl -s https://api.github.com/repos/containers/gvisor-tap-vsock/releases/latest | awk 'BEGIN { FS = "\"\\s*:\\s*" } /browser_download_url/ && /linux-amd64/ {print $2}' | xargs wget -O gvproxy-linux-amd64
```
```bash
chmod +x ./gvproxy-linux-amd64
```
```bash
mkdir -p /usr/local/lib/podman/
```
```bash
mv gvproxy-linux-amd64 /usr/local/lib/podman/gvproxy
```

Если появляется ошибка:
```bash
Error: failed to find virtiofsd: exec: "virtiofsd": executable file not found in $PATH
```

Тогда:
```bash
apt-get install virtiofsd
```
```bash
ln -s /usr/libexec/virtiofsd /usr/local/bin/virtiofsd
```

### Шаг 5. Запуск Podman Desktop

Либо через терминал:
```bash
flatpak run io.podman_desktop.PodmanDesktop
```

Либо в меню найти `Podman Desktop`

Далее, необходимо просто следовать указаниям.

### Вкладка Kubernetes (Kind) - создание кластера

Если у Вас при создании кластера появляется ошибка:
```
using podman due to KIND_EXPERIMENTAL_PROVIDER
enabling experimental podman provider

Creating cluster "kind-cluster" ...

 • Ensuring node image (kindest/node:v1.33.1) 🖼  ...

 ✓ Ensuring node image (kindest/node:v1.33.1) 🖼
 • Preparing nodes 📦   ...

 ✗ Preparing nodes 📦 

Deleted nodes: ["kind-cluster-control-plane"]
ERROR: failed to create cluster: command "podman run --name kind-cluster-control-plane --hostname kind-cluster-control-plane --label io.x-k8s.kind.role=control-plane --privileged --tmpfs /tmp --tmpfs /run --volume 159a433f83bcdfb6ee583e25aabfe42b633ae24e418a0cf5e05da0c372f3b603:/var:suid,exec,dev --volume /lib/modules:/lib/modules:ro -e KIND_EXPERIMENTAL_CONTAINERD_SNAPSHOTTER --detach --tty --net kind --label io.x-k8s.kind.cluster=kind-cluster -e container=podman --cgroupns=private --volume /dev/mapper:/dev/mapper --device /dev/fuse --publish=0.0.0.0:9090:80/tcp --publish=0.0.0.0:9443:443/tcp --publish=127.0.0.1:34193:6443/tcp -e KUBECONFIG=/etc/kubernetes/admin.conf docker.io/kindest/node@sha256:050072256b9a903bd914c0b2866828150cb229cea0efe5892e2b644d5dd3b34f" failed with error: exit status 126

Command Output: Error: setting up Pasta: pasta failed with exit code 1:
Failed to open() /dev/net/tun: Permission denied
Failed to set up tap device in namespace
```

В качестве решения данной проблемы, измените права:
```bash
chmod 666 /dev/net/tun
```

## Пример: как загрузить образ из архива в удалённый реестр

Шаг 1. Загрузить образ в локальное хранилище
```bash
podman load -i control-image.tgz
```
```bash
Getting image source signatures
Copying blob 1866432ca14f done   | 
Copying blob e1705604f02a skipped: already exists  
Copying blob d436fe10aa5e done   | 
Copying blob 867a9a61860e done   | 
Copying blob 5f70bf18a086 skipped: already exists  
Copying blob 732a857a6dee done   | 
Copying blob de72fa2c47af done   | 
Copying config ab0874981e done   | 
Writing manifest to image destination
Loaded image: docker-sc.t-rtk-it.ru/repository/image-smart-control/domain/control:2.2.1-202604201121-b2b1c5b
```

Шаг 2. Обновить тэг образа
```bash
podman tag docker-sc.t-rtk-it.ru/repository/image-smart-control/domain/control:2.2.1-202604201121-b2b1c5b 10.9.103.247:80/smartcontrol/control:2.2.1-202604201121-b2b1c5b
```

Шаг 3. Запушить образ
```bash
podman push 10.9.103.247:80/smartcontrol/control:2.2.1-202604201121-b2b1c5b
```
```bash
Getting image source signatures
Copying blob 867a9a61860e done   | 
Copying blob 732a857a6dee done   | 
Copying blob 1866432ca14f done   | 
Copying blob d436fe10aa5e done   | 
Copying blob bd9ddc54bea9 skipped: already exists  
Copying blob de72fa2c47af done   | 
Copying blob 9fcebe27a0bc skipped: already exists  
Copying config ab0874981e done   | 
Writing manifest to image destination
```
