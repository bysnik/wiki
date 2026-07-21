# Portainer

![](https://cdn.prod.website-files.com/69bc83ff083bf63749b6bdcb/69bc83ff083bf63749b6cb90_95617e26.png)

**Portainer** — это бесплатный веб-интерфейс для управления Docker и Kubernetes, который позволяет в пару кликов разворачивать, мониторить и обслуживать контейнеры, не залезая в командную строку, и подходит как для локальных сред, так и для продакшн-кластеров.

## Запуск Portainer в Minikube с помощью Helm

### 1. Запуск Minikube с драйвером `docker`

Необязательно именно docker, просто мне так удобнее.

```bash
minikube start --driver=docker
```

- После запуска проверена связность внутри кластера (однажды, почему-то, не было пинга):
  ```bash
  minikube ssh
  ping ya.ru    # OK
  exit
  ```

### 2. Установка Portainer через Helm

Использован официальный `helm chart` с корректными параметрами:

```bash
helm upgrade --install --create-namespace -n portainer portainer portainer/portainer \
  --set tls.force=true \
  --set image.repository=portainer/portainer-ce \
  --set image.tag=latest \
  --set image.pullPolicy=IfNotPresent
```

- `image.repository=portainer/portainer-ce` — Community Edition.
- `tls.force=true` — принудительное использование HTTPS.
- `pullPolicy=IfNotPresent` — использовать локальный образ, если есть.

Helm успешно установил релиз.

### 3. Проверка работоспособности

**Статус пода**:

```bash
kubectl get pods -n portainer
```

```
NAME                         READY   STATUS    RESTARTS   AGE
portainer-6c6d4dcf58-j7rmq   0/1     Running   0          58s
```

> `READY 0/1` — это нормально на этапе инициализации, readiness probe ещё не прошла, но контейнер работает.

**Логи** показали, что образ скачан и контейнер запущен:

```bash
kubectl logs -n portainer deployment/portainer --tail=20
```

### 4. Доступ к веб-интерфейсу

Узнал IP с помощью:

```bash
minikube service -n portainer portainer --url
```

Только URL пишет с HTTP, а на деле у Portainer HTTPS.

> Сертификат самоподписанный — браузер покажет предупреждение, его нужно принять.

### 5. Получение токена для инициализации

При первом открытии Portainer запросил **токен**. Токен находится в логах пода:

```bash
kubectl logs -n portainer deployment/portainer | grep -i setup_token=vvv
```

Токен был скопирован и вставлен в веб-форму.
