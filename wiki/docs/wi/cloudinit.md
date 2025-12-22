
# Cloud-init

![alt text](https://habrastorage.org/getpro/habr/upload_files/901/939/bf5/901939bf5394112ee22a760f230c8ab0.png)

cloud-init это программа для инициализации виртуальных машин, обычно применяющаяся в облачных платформах. Но использовать cloud-init можно и локально. Примеры конфигурационных файлов - https://cloudinit.readthedocs.io/en/latest/topics/examples.html.
Использование с qemu

Для начала создадим каталог, в котором будем работать, и зайдем в него.
```bash
$ mkdir cloud-init-example
$ cd cloud-init-example
```
Затем потребуется образ виртуальной машины с поддержкой cloud-init. Например, можно взять cloud образ ALT.
```bash
$ wget http://ftp.altlinux.org/pub/distributions/ALTLinux/images/Sisyphus/cloud/x86_64/alt-sisyphus-cloud-x86_64.qcow2
```
Данные для cloud-init описываются в конфигурационном файле в формате yaml. Пример минимальной конфигурации, задающей только ключ для пользователя root. Вместо <YOUR_PUBLIC_KEY> нужно подставить ваш публичный ключ.
```bash
$ cat user-data.yaml 
#cloud-config
users:
  - name: root
    ssh_authorized_keys:
      - <YOUR_PUBLIC_KEY>
```
Для преобразования конфигурационного файла в метаданные потребуется программа cloud-localds из пакета cloud-utils.
```bash
apt-get install cloud-utils
$ cloud-localds my-seed.img user-data.yaml
```
Для использования kvm пользователь должен быть в группе vmusers.

Осталось только запустить виртуальную машину.
```bash
$ qemu -machine accel=kvm -m 2G -cpu host -smp 2 -drive file=alt-sisyphus-cloud-x86_64.qcow2,if=virtio -drive file=my-seed.img,if=virtio,format=raw,force-share=on,read-only=on -daemonize -display none -nic user,hostfwd=tcp::22222-:22
```
И зайти по ssh. Может потребоваться подождать некоторое время, пока машина будет загружена и инициализирована.
```bash
$ ssh root@localhost -p 22222
```


::: tip Примечание
Начиная с версии 24.4.1 необходимо учесть новую логику запуска служб `cloud-init` в случае самостоятельной инсталяции пакета (При обновлении пакета `cloud-init` функционал настраивается автоматически). Сначала должна отработать служба `cloud-init-main.service` , далее - остальные.
```bash
systemctl enable --now cloud-init-main.service
systemctl enable --now cloud-init-local.service cloud-init-network.service cloud-config.service cloud-final.service
```
Добавлена новая служба `cloud-init-main.service`, которая отвечает за настройку сокетов для работы остальных `cloud-init` служб. В более ранних версиях запускалась служба `cloud-init.service`, которая теперь переименована в службу `cloud-init-network.service`.

В случае наличия некорректного запуска служб по старому принципу из новой версии пакета простой способ все починить (не забывая добавить недостающие службы в автозапуск при перезагрузке):
```bash
systemctl stop cloud-init-local.service cloud-init-network.service cloud-config.service cloud-final.service cloud-init-main.service
systemctl start cloud-init-main.service
```
секунду подождать
```bash
systemctl start cloud-init-local.service cloud-init-network.service cloud-config.service cloud-final.service
cloud-init clean --logs --reboot
```
Cистема перезагрузится и можно проверить результат:
```bash
systemctl status cloud-init-local.service cloud-init-network.service cloud-config.service cloud-final.service cloud-init-main.service
cloud-init status --long
```
:::