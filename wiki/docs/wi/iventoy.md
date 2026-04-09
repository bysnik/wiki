# iVentoy

![](https://www.bachmann-lan.de/wp-content/uploads/2023/07/iventoy-webui-boot-information.png)

https://www.iventoy.com/en/index.html

https://github.com/ventoy/PXE

iVentoy is an enhanced version of the PXE server.
With iVentoy you can boot and install OS on multiple machines at the same time through the network.
iVentoy is extremely easy to use, without complicated configuration, just put the ISO file in the specified location and select PXE boot in the client machine.
iVentoy supports x86 Legacy BIOS, IA32 UEFI, x86_64 UEFI and ARM64 UEFI mode at the same time.
iVentoy support 110+ common types of OS (Windows/WinPE/Linux/VMware) (list)。 

```bash
wget https://github.com/ventoy/PXE/releases/download/v1.0.25/iventoy-1.0.25-linux-free.tar.gz
```

```bash
tar -xzf iventoy-1.0.25-linux-free.tar.gz
```

```bash
cd iventoy-1.0.25
```

Запуск:
```bash
bash iventoy.sh start
```

Please open your browser and visit http://127.0.0.1:26000 or http://x.x.x.x:26000 (x.x.x.x is any valid IP address)

Просмотр статуса:
```bash
bash iventoy.sh status
```

Остановка:
```bash
bash iventoy.sh stop
```