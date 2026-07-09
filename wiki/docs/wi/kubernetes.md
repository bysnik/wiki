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

#### nsenter_u7s rootlessctl add-ports 0.0.0.0:30443:30443/tcp

Пробросы, добавленные командой rootlessctl add-ports, являются динамическими и привязаны к текущему экземпляру rootlesskit. При перезапуске rootlesskit они удаляются. Автоматически восстанавливаются только порты, которые добавляются при запуске u7s в скрипте инициализации rootlesskit.

Для постоянного проброса необходимо добавить требуемый порт в конфигурацию запуска rootlesskit (список автоматически добавляемых портов) либо использовать штатный механизм Kubernetes для публикации сервиса (NodePort/LoadBalancer/hostPort в зависимости от сценария).