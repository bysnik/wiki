# caretta

![](https://github.com/groundcover-com/caretta/raw/main/images/caretta.gif)

https://github.com/groundcover-com/caretta 

## Что такое Caretta?

**Caretta** — это легковесное автономное средство, которое мгновенно создаёт визуальную сетевую карту сервисов, работающих в вашем кластере.

Caretta использует eBPF для эффективного картирования всех сетевых взаимодействий сервисов в кластере Kubernetes, а Grafana — для запросов и визуализации собранных данных.

Caretta создана с расчётом на эффективность, имеет минимальное воздействие на систему и не требует каких-либо изменений в кластере.

Caretta демонстрирует возможности использования eBPF для решений в области наблюдаемости — это наше видение в <a href="https://groundcover.com">groundcover</a>. Если вам интересно узнать, как устроена Caretta, загляните в наш <a href="https://www.groundcover.com/blog/caretta">блог о Caretta!</a>

## Установка Caretta :zap:
Всё просто — установка через Helm-чарт. Рекомендуется устанавливать Caretta в отдельное уникальное пространство имён.
```bash
helm repo add groundcover https://helm.groundcover.com/
```
```bash
helm repo update
```
```bash
helm install caretta --namespace caretta --create-namespace groundcover/caretta
```

### Настройка
Вы можете настроить Caretta с помощью параметров Helm.
Полезные параметры:
* **tolerations** — можно задать, чтобы гарантировать, что eBPF-агент Caretta будет запускаться на всех узлах кластера. *Значение по умолчанию допускает стандартные аннотации узлов управления (control-plane).*
* **victoria-metrics-single.server.persistentVolume.enabled** — можно установить в *true*, если вы хотите сохранять метрики Caretta в постоянное хранилище. *По умолчанию: false*
* **pollIntervalSeconds** — можно изменить, чтобы задать интервал опроса и публикации новых метрик из ядра. *По умолчанию: 5*
* Встроенные экземпляры Victoria Metrics и Grafana можно отключить, установив значения **victoria-metrics-single.enabled** или **grafana.enabled** в false соответственно. *По умолчанию: true*
* По умолчанию Caretta разрешает сущности Kubernetes в их владельцев. Например, два пода «pod1» и «pod2», принадлежащие одному Deployment «deployment1», будут разрешены в «deployment1». Это можно отключить, установив **traverseUpHierarchy** в false. *По умолчанию: true*

Пример YAML-файла для переопределения этих значений:
```yaml
pollIntervalSeconds: 15  # задать интервал опроса метрик
traverseUpHierarchy: false  # отключить разрешение сущностей Kubernetes в их владельцев

tolerations:             # задать любые желаемые tolerations
  - key: node-role.kubernetes.io/control-plane
    operator: Exists
    effect: NoSchedule

 victoria-metrics-single:
  server:
    persistentVolume:
       enabled: true   # установить true для использования постоянного хранилища
```
Это также можно сделать с помощью флага `--set` в команде `helm install`.

### Удаление
Чтобы удалить Caretta, удалите Helm-релиз:
```bash
helm delete caretta --namespace caretta
```
Обратите внимание: если при установке было включено постоянное хранилище, оно может не быть удалено автоматически этой командой.

## Требования
* Версия ядра Linux >= 4.16
* Поддержка <a href="https://nakryiko.com/posts/bpf-portability-and-co-re/">CO-RE</a>. Поддерживаемые дистрибутивы Linux можно найти <a href="https://github.com/libbpf/libbpf#bpf-co-re-compile-once--run-everywhere">здесь</a>. В частности, Docker для Mac использует дистрибутив, который в настоящее время не поддерживается.

## Работа с Caretta :turtle:
Helm-чарт Caretta поставляется с экземпляром Grafana, в котором предустановлена панель мониторинга, использующая данные, публикуемые Caretta. Эта панель содержит несколько примеров, демонстрирующих использование метрик Caretta.

### Использование предоставленного экземпляра Grafana
Чтобы получить доступ к Grafana, выполните проброс порта `3000` из пода Grafana в пространстве имён Caretta.

С помощью *kubectl* это должно выглядеть примерно так:

```bash
kubectl port-forward --namespace caretta <имя-пода-grafana> 3000:3000
```

> **_ПРИМЕЧАНИЕ:_**  Включен анонимный режим, поэтому панель по умолчанию доступна без входа в систему.
>              Чтобы редактировать панель по умолчанию или создать свою собственную, используйте учётные данные администратора по умолчанию: пользователь:`admin` ; пароль:`caretta`.

### Сбор метрик Caretta

Caretta использует [Victoria Metrics](https://victoriametrics.com/) для сбора и публикации своих метрик, и результаты могут быть использованы **любой совместимой с Prometheus панелью мониторинга**.

Основная метрика Caretta — `caretta_links_observed` (Gauge). Она использует следующие метки для представления конкретного соединения (сетевого сокета), проходящего через кластер:
* `client_name` — либо имя сущности Kubernetes (если разрешено), либо внешний домен (если разрешён), либо IP-адрес.
* `client_namespace` — либо пространство имён сущности Kubernetes, либо «node», либо «external».
* `client_kind` — либо вид сущности Kubernetes, либо «node», либо «external».
* `server_name` — либо имя сущности Kubernetes (если разрешено), либо внешний домен (если разрешён), либо IP-адрес.
* `server_namespace` — либо пространство имён сущности Kubernetes, либо «node», либо «external».
* `server_kind` — либо вид сущности Kubernetes, либо «node», либо «external».
* `server_port` — порт, используемый сервером.
* `role` — либо 1 (клиент), либо 2 (сервер).

Наряду с этими метками Caretta использует другие метки для панели Node Graph в Grafana.

#### Пример данных метрики
В этом примере показано соединение между клиентом с именем `checkoutservice`, управляемым Deployment, и сервисом с именем `productcatalogservice` на порту 3550 с точки зрения клиента. Общее количество байт, отправленных клиентом в этом соединении, составляет 2537 байт.
```bash
caretta_links_observed{client_id="1074587981",client_kind="Deployment",client_name="checkoutservice",client_namespace="demo-ng",link_id="198768460",role="1",server_id="1112713827",server_kind="Service",server_name="productcatalogservice",server_namespace="demo-ng",server_port="3550"} 2537
```

#### Примеры запросов :star:
```bash
increase ((sum (server_port) (caretta_links_observed{client_name="some-client", server_name="some-server}))[15m])
```
выдаст пропускную способность, наблюдаемую между some-client и some-server за последние 15 минут, агрегированную по портам.

```bash
sum by (server_name) (rate(caretta_links_observed{client_name="some-client"}))
```
выдаст скорость трафика от some-client к серверам, с которыми он взаимодействует, агрегированную по имени сервера.

```bash
sort_desc(increase((sum by (client_name)(caretta_links_observed{server_namespace="external"}))[5m]))
```
выдаст трафик к внешним серверам по имени клиента, отсортированный по убыванию.