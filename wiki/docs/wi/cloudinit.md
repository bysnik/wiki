
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