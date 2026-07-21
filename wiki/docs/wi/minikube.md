# Minikube

https://kubernetes.io/docs/tutorials/hello-minikube/

## Установка Minikube

Убедитесь, что у вас установлен `kubectl`. В Альте это можно сделать, например, так:

```bash
apt-get install kubernetes1.36-kubeadm
```

### Установка Minikube с помощью прямой ссылки

```bash
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube
```

```bash
install minikube /usr/local/bin/
```

## Подготовка: удаление существующего кластера (если требуется)

Если у вас уже был запущен Minikube и вы хотите начать с чистого состояния или возникла ошибка при запуске, выполните очистку:

```bash
minikube delete
```

> **Примечание:** если вы уже установили Minikube и выполнили `minikube start`, но получили ошибку «machine does not exist», это означает, что локальное состояние повреждено. В этом случае выполните `minikube delete`, чтобы очистить состояние, и затем запустите кластер заново.

## Начало работы

### Проверка установки

Чтобы убедиться в том, что гипервизор и Minikube были установлены корректно, выполните следующую команду, которая запускает локальный кластер Kubernetes:

```bash
minikube start --vm-driver=<driver_name>
```

Доступные драйверы:

- `virtualbox`
- `vmwarefusion`
- `docker` (ЭКСПЕРИМЕНТАЛЬНЫЙ)
- `kvm2` (требуется установка драйвера)
- `hyperkit` (требуется установка драйвера)
- `hyperv` (требуется установка драйвера) – обратите внимание, что указанный IP-адрес на этой странице является динамическим и может изменяться. Его можно получить с помощью `minikube ip`.
- `vmware` (требуется установка драйвера, VMware unified driver)
- `parallels` (требуется установка драйвера)
- `none` – запускает компоненты Kubernetes на хосте, а не на виртуальной машине. Использование этого драйвера требует Linux и установленного Docker.

После того, как команда `minikube start` отработала успешно, выполните команду для проверки состояния кластера:

```bash
minikube status
```

Если ваш кластер запущен, то в выводе команды `minikube status` должно быть что-то вроде этого:

```
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

Теперь, когда вы убедились, что Minikube работает с выбранным вами гипервизором, вы можете продолжить использовать Minikube или остановить кластер. Чтобы остановить кластер, выполните команду:

```bash
minikube stop
```

## Запуск панели (dashboard)

```bash
# Запустите в новом терминале и не закрывайте его.
minikube dashboard
```

## Создание деплоймента

Под Kubernetes — это группа из одного или более контейнеров, связанных друг с другом для удобного администрирования и организации сети. В данном руководстве под включает в себя один контейнер. Деплоймент (Deployment) в Kubernetes проверяет здоровье пода и перезагружает контейнер пода в случае, если он прекратил работу. Деплойменты — рекомендуемый способ создания и масштабирования подов.

1. Используйте команду `kubectl create` для создания деплоймента, который будет управлять подом. Под запустит контейнер с указанным Docker-образом.

   ```bash
   kubectl create deployment hello-node --image=registry.k8s.io/e2e-test-images/agnhost:2.53 -- /agnhost netexec --http-port=8080
   ```

2. Посмотреть информацию о Deployment:

   ```bash
   kubectl get deployments
   ```

   Вывод будет примерно следующим:

   ```
   NAME         DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
   hello-node   1         1         1            1           1m
   ```

3. Посмотреть информацию о поде:

   ```bash
   kubectl get pods
   ```

   Вывод будет примерно следующим:

   ```
   NAME                          READY     STATUS    RESTARTS   AGE
   hello-node-5f76cf6ccf-br9b5   1/1       Running   0          1m
   ```

4. Посмотреть события кластера:

   ```bash
   kubectl get events
   ```

5. Посмотреть конфигурацию kubectl:

   ```bash
   kubectl config view
   ```

### Создание сервиса

По умолчанию под доступен только при обращении по его внутреннему IP-адресу внутри кластера Kubernetes. Чтобы сделать контейнер `hello-node` доступным вне виртуальной сети Kubernetes, необходимо представить под как сервис (Service) Kubernetes.

1. Сделать под доступным для публичного интернета можно с помощью команды `kubectl expose`:

   ```bash
   kubectl expose deployment hello-node --type=LoadBalancer --port=8080
   ```

   Флаг `--type=LoadBalancer` показывает, что сервис должен быть виден вне кластера.

   > **Примечание:** код приложения в тестовом образе прослушивает только TCP-порт 8080. Если вы сделали приложение доступным по другому порту командой `kubectl expose`, клиенты не смогут подключиться к этому порту.

2. Посмотреть только что созданный сервис:

   ```bash
   kubectl get services
   ```

   Вывод будет примерно следующим:

   ```
   NAME         TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
   hello-node   LoadBalancer   10.108.144.78   <pending>     8080:30369/TCP   21s
   kubernetes   ClusterIP      10.96.0.1       <none>        443/TCP          23m
   ```

   Для облачных провайдеров, поддерживающих балансировщики нагрузки, для доступа к сервису будет предоставлен внешний IP-адрес. В Minikube тип `LoadBalancer` делает сервис доступным при обращении с помощью команды `minikube service`.

3. Выполните следующую команду:

   ```bash
   minikube service hello-node
   ```

   Откроется окно браузера, в котором запущено ваше приложение и выводится его ответ.

4. Узнайте URL-адрес открытого (exposed) сервиса, чтобы просмотреть подробные сведения о сервисе:

   ```bash
   minikube service hello-minikube --url
   ```

   Чтобы ознакомиться с подробной информацией о локальном кластере, скопируйте и откройте полученный из вывода команды на предыдущем шаге URL-адрес в браузере.

   Вывод будет примерно следующим:

   ```
   Hostname: hello-minikube-7c77b68cff-8wdzq

   Pod Information:
       -no pod information available-

   Server values:
       server_version=nginx: 1.13.3 - lua: 10008

   Request Information:
       client_address=172.17.0.1
       method=GET
       real path=/
       query=
       request_version=1.1
       request_scheme=http
       request_uri=http://192.168.99.100:8080/

   Request Headers:
       accept=*/*
       host=192.168.99.100:30674
       user-agent=curl/7.47.0

   Request Body:
       -no body in request-
   ```

## Активация дополнений

В Minikube есть набор встроенных дополнений (addons), которые могут быть включены, выключены и открыты в локальном окружении Kubernetes.

1. Отобразить текущие поддерживаемые дополнения:

   ```bash
   minikube addons list
   ```

   Вывод будет примерно следующим:

   ```
   addon-manager: enabled
   dashboard: enabled
   default-storageclass: enabled
   efk: disabled
   freshpod: disabled
   gvisor: disabled
   heapster: disabled
   helm-tiller: disabled
   ingress: disabled
   ingress-dns: disabled
   logviewer: disabled
   metrics-server: disabled
   nvidia-driver-installer: disabled
   nvidia-gpu-device-plugin: disabled
   registry: disabled
   registry-creds: disabled
   storage-provisioner: enabled
   storage-provisioner-gluster: disabled
   ```

2. Включить дополнение, например, `metrics-server`:

   ```bash
   minikube addons enable metrics-server
   ```

   Вывод:

   ```
   metrics-server was successfully enabled
   ```

3. Посмотреть Pod и Service, которые вы только что создали:

   ```bash
   kubectl get pod,svc -n kube-system
   ```

   Вывод будет примерно следующим:

   ```
   NAME                                        READY     STATUS    RESTARTS   AGE
   pod/coredns-5644d7b6d9-mh9ll                1/1       Running   0          34m
   pod/coredns-5644d7b6d9-pqd2t                1/1       Running   0          34m
   pod/metrics-server-67fb648c5                1/1       Running   0          26s
   pod/etcd-minikube                           1/1       Running   0          34m
   pod/influxdb-grafana-b29w8                  2/2       Running   0          26s
   pod/kube-addon-manager-minikube             1/1       Running   0          34m
   pod/kube-apiserver-minikube                 1/1       Running   0          34m
   pod/kube-controller-manager-minikube        1/1       Running   0          34m
   pod/kube-proxy-rnlps                        1/1       Running   0          34m
   pod/kube-scheduler-minikube                 1/1       Running   0          34m
   pod/storage-provisioner                     1/1       Running   0          34m

   NAME                           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)             AGE
   service/metrics-server         ClusterIP   10.96.241.45    <none>        80/TCP              26s
   service/kube-dns               ClusterIP   10.96.0.10      <none>        53/UDP,53/TCP       34m
   service/monitoring-grafana     NodePort    10.99.24.54     <none>        80:30002/TCP        26s
   service/monitoring-influxdb    ClusterIP   10.111.169.94   <none>        8083/TCP,8086/TCP   26s
   ```

4. Отключить `metrics-server`:

   ```bash
   minikube addons disable metrics-server
   ```

   Вывод будет примерно следующим:

   ```
   metrics-server was successfully disabled
   ```

## Очистка

Теперь вы можете освободить ресурсы, созданные в кластере:

```bash
kubectl delete service hello-node
kubectl delete deployment hello-node
```

Остановите кластер minikube:

```bash
minikube stop
```

Удалите виртуальную машину minikube (опционально):

```bash
minikube delete
```

## Дополнительно

### Указание версии Kubernetes

Вы можете указать используемую версию Kubernetes в Minikube, добавив параметр `--kubernetes-version` в команду `minikube start`. Например, чтобы запустить Minikube с версией 1.36.0, выполните:

```bash
minikube start --kubernetes-version 1.36.0
```