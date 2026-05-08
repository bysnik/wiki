# Multipath

разлогиниться из этой сессии:
```bash
iscsiadm -m node -T <iqn> -p <ip address>:<port> -u
```

Удалить целевые объекты из базы данных обнаружения iSCSI:
```bash
iscsiadm -m discoverydb -t sendtargets -p <IP>:<port> -o delete
```

посмотреть ноды
```bash
iscsiadm -m node
```

Посмотреть сессии
```bash
iscsiadm -m session
```

Чтобы предотвратить повторное установление сеанса:
```bash
iscsiadm -m node -o delete -T <iqn>
```

## Ошибка потери устройства

В выводе multipath -ll присутствуют сообщения:

```
discarding non-existing path
failed to look up ... with type 1
```
что обычно указывает на потерю устройств после рестарта СХД, либо на отсутствие активных iSCSI-сессий.

Рекомендую выполнить следующую проверку.

1. Проверить наличие активных iSCSI-сессий:
```bash
iscsiadm -m session
```
Если сессии отсутствуют — выполнить повторный login:
```bash
iscsiadm -m node --login
```
При необходимости предварительно обновить discovery:
```bash
iscsiadm -m discovery -t sendtargets -p <IP_СХД>
```
2. Проверить состояние multipath:
```bash
multipath -ll
multipathd show paths
multipathd show maps
```
3. Проверить, видит ли ОС блочные устройства:
```bash
lsblk
fdisk -l
```
4. Проверить состояние сервисов:
```bash
systemctl status open-iscsi
systemctl status multipathd
```
При необходимости перезапустить службы:
```bash
systemctl restart open-iscsi
systemctl restart multipathd
```
После восстановления iSCSI-сессий и multipath-путей необходимо повторно проверить состояние storage в интерфейсе PVE.

Предоставьте, пожалуйста, вывод команды:
```bash
journalctl -u iscsid -u multipathd
```
