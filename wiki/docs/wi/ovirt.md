- это чисто метапакет для нашей сборки
- веб интерфейс

То, что уже собрано для Альта




Давайте разберем ваш список и добавим важные детали.

### 🏗️ Компоненты, которые потребуется собрать

Вы правы, эти три компонента являются основой для сборки:

*   **`ovirt-engine`**: Это сердце oVirt — управляющий сервер (менеджер). Это самый сложный и требовательный к зависимостям компонент. https://github.com/oVirt/ovirt-engine
*   **`ovirt-web-ui`**: Это веб-интерфейс для пользователей (VM Portal). Он работает поверх `ovirt-engine` и, скорее всего, потребует сборки. https://github.com/oVirt/ovirt-web-ui 
*   **`ovirt-host`**: Ваше понимание верное — это **метапакет**. Он не содержит кода, а только перечисляет зависимости, необходимые для превращения сервера в хост виртуализации oVirt (например, `vdsm`, `libvirt`, `qemu-kvm`). Собрать его будет несложно, но его главная цель — упростить установку всех нужных пакетов на хост. https://github.com/oVirt/ovirt-host 

### ✅ Компоненты, уже доступные в ALT Linux

Вы совершенно правы, эти пакеты уже есть в репозиториях Sisyphus, и их **не нужно собирать** самостоятельно. Их можно установить через штатный менеджер пакетов:

*   **`ovirt-imageio`**: Служба для передачи дисковых образов. https://packages.altlinux.org/ru/sisyphus/srpms/ovirt-imageio/
*   **`ovirt-vmconsole`**: Прокси для консольного доступа к виртуальным машинам. https://packages.altlinux.org/ru/sisyphus/srpms/ovirt-vmconsole/
*   **`libgovirt`**: Библиотека для работы с REST API oVirt. https://packages.altlinux.org/ru/sisyphus/srpms/libgovirt/
*   **`python3-module-ovirt-engine-sdk`**: Python SDK для взаимодействия с API oVirt Engine. https://packages.altlinux.org/ru/sisyphus/srpms/python3-module-ovirt-engine-sdk/
*   **`ovirt-guest-agent`**: Агент, который устанавливается внутрь гостевых виртуальных машин. https://packages.altlinux.org/ru/sisyphus/srpms/ovirt-guest-agent/

### ⚠️ Важные моменты и отсутствующие компоненты

При планировании работы учтите, что для полноценной установки могут потребоваться и другие компоненты, которые, скорее всего, также придется собирать:

*   **VDSM (Virtual Desktop and Server Manager)**: Это главный агент, который работает на каждом хосте и через который `ovirt-engine` управляет виртуальными машинами. Это критически важный компонент, и его нет в вашем списке. https://github.com/oVirt/vdsm
*   **`ovirt-engine-dwh`**: Компонент Data Warehouse, который собирает историческую информацию о работе платформы для отчетов. https://github.com/oVirt/ovirt-dwh
*   **`ovirt-engine-appliance`**: Готовый образ виртуальной машины для быстрого развертывания self-hosted engine. https://github.com/oVirt/ovirt-appliance
*   **Зависимости `ovirt-engine`**: Это самый сложный момент. У `ovirt-engine` очень много зависимостей (Java-библиотеки, Wildfly и т.д.). Проект oVirt даже поддерживает отдельный репозиторий `ovirt-engine-build-dependencies` для упрощения их сборки. Вам почти наверняка придется собирать и их.



Ниже приведён **полный список всех пакетов**, которые встречаются в `Requires` и `Suggests` (только `postfix`) в представленном spec-файле `ovirt-host`. Я выписал все имена **без учёта условий** (архитектура, версия RHEL) — так вы сможете видеть все возможные зависимости, которые могут потребоваться для сборки или установки на ALT Linux.

> **Важно:** В ALT Linux названия некоторых пакетов могут отличаться (например, `python3-firewall` часто называется `python3-module-firewall`). Сверяйтесь с репозиториями вашего дистрибутива.

---

### Список пакетов (алфавитный порядок)

- `aide`
- `audispd-plugins`
- `ceph-common`
- `clevis-dracut`
- `cockpit`
- `cockpit-ovirt-dashboard`
- `cockpit-system`
- `collectd`
- `collectd-disk`
- `collectd-netlink`
- `collectd-virt`
- `collectd-write_http`
- `collectd-write_syslog`
- `cracklib-dicts`
- `dmidecode`
- `dracut-fips`
- `firewalld`
- `glusterfs`
- `ipa-client`
- `iperf3`
- `kexec-tools`
- `libestr`
- `libfastjson`
- `liblognorm`
- `libvirt`
- `libvirt-admin`
- `mailx`
- `microcode_ctl`
- `net-snmp`
- `net-snmp-utils`
- `NetworkManager-config-server`
- `nvme-cli`
- `opensc`
- `openscap`
- `ovirt-hosted-engine-setup`
- `ovirt-imageio-client`
- `ovirt-provider-ovn-driver`
- `ovirt-vmconsole`
- `ovirt-vmconsole-host`
- `pcsc-lite`
- `postfix` (как **Suggests**)
- `python3-firewall`
- `python3-os-brick`
- `rng-tools`
- `rsyslog`
- `rsyslog-elasticsearch`
- `rsyslog-mmjsonparse`
- `rsyslog-mmnormalize`
- `rsyslog-openssl`
- `s-nail`
- `scap-security-guide`
- `server(smtp)` — виртуальный пакет, зависит от MTA
- `smartmontools`
- `socat`
- `sscg`
- `sysstat`
- `tar`
- `tcpdump`
- `tmux`
- `tuned`
- `util-linux`
- `vdsm` (требуется версия ≥ 4.50.0.11)
- `vdsm-client` (требуется версия ≥ 4.50.0.11)