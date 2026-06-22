# Kubernetes

![](https://platform9.com/media/kubernetes-constructs-concepts-architecture.jpg)

## Альт СП Kubernetes

### Rootless

#### Как посмотреть логи сервисов

Логи kubelet можно посмотреть так:
```bash
journalctl _SYSTEMD_USER_UNIT=kubelet.service _UID=$(id -u u7s-admin) -b --no-pager
```

Для CRI-O отдельного user-unit crio.service в данном режиме нет. CRI-O запускается внутри rootlesskit.service, поэтому его логи нужно смотреть через rootlesskit:
```bash
journalctl _SYSTEMD_USER_UNIT=rootlesskit.service _UID=$(id -u u7s-admin) -b --no-pager
```

Либо общим поиском по журналу пользователя u7s-admin:
```bash
journalctl _UID=$(id -u u7s-admin) -b --no-pager | grep -Ei 'kubelet|crio|cri-o|rootlesskit|nsenter'
```

Логи в rootless-режиме нужно искать по записям journal для пользователя u7s-admin.