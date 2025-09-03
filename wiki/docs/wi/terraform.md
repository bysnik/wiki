# Terraform

![](https://pan.dev/img/product-landing/terraform/terraform-article.jpeg)

https://habr.com/ru/articles/743334/

https://habr.com/ru/articles/759486/


## **Как работает Terraform: Принципы и преимущества**

Terraform — это инструмент для безопасного и эффективного построения, изменения и управления инфраструктурой через парадигму **«Инфраструктура как код» (IaC)**. Его основная суть заключается в декларативном подходе: вы описываете *желаемое конечное состояние* вашей инфраструктуры, а Terraform самостоятельно разрабатывает и выполняет план по достижению этого состояния.

---

### **Принцип работы: от кода к инфраструктуре**

Процесс работы Terraform можно разделить на несколько ключевых этапов:

1.  **Определение состояния (Кодирование)**
    Вы описываете желаемую инфраструктуру (серверы, сети, базы данных и т.д.) в виде конфигурационных файлов. Эти файлы, написанные на языке **HashiCorp Configuration Language (HCL)** (который легко читается как человеком, так и машиной), называются Terraform-кодом. В них вы декларируете, *какие* ресурсы нужны, их параметры и взаимосвязи.

2.  **Планирование изменений (`terraform plan`)**
    При запуске команды `terraform plan` Terraform выполняет критически важную работу:
    *   **Анализирует** ваш конфигурационный файл.
    *   **Считывает** актуальное состояние инфраструктуры из специального файла состояния (`terraform.tfstate`).
    *   **Сравнивает** желаемое состояние с текущим.
    *   **Формирует план исполнения** — детальный отчет о том, какие ресурсы будут созданы, изменены или уничтожены для приведения инфраструктуры в соответствие с кодом. Этот план позволяет проверить изменения перед их применением.

3.  **Применение изменений (`terraform apply`)**
    После подтверждения плана команда `terraform apply` приводит его в действие. Terraform через **провайдеров** (специальные плагины для AWS, Azure, GCP, Yandex Cloud и сотен других сервисов) взаимодействует с API платформ и выполняет все необходимые операции в правильном порядке, учитывая зависимости между ресурсами.

4.  **Сохранение состояния**
    После применения изменений Terraform обновляет файл состояния (`terraform.tfstate`). Этот файл является единственным источником правды о развернутой инфраструктуре и используется для последующих операций, позволяя Terraform понимать, чем она управляет.

При необходимости изменения инфраструктуры вы просто правите конфигурационный файл и снова запускаете `plan` и `apply`. Terraform определит разницу и внесет точечные изменения.

---

### **Ключевые преимущества Terraform**

*   **👨‍💻 Инфраструктура как код (IaC)**
    Конфигурации хранятся в файлах, что позволяет применять к инфраструктуре практики разработки ПО: контроль версий (Git), код-ревью, тестирование и повторное использование.

*   **☁️ Мультиплатформенность и универсальность**
    Единый инструмент для управления инфраструктурой across различных облачных провайдеров (AWS, Azure, GCP, Yandex Cloud), SaaS-сервисов (GitHub, Datadog) и даже локальных платформ (vSphere, Kubernetes). Это избавляет от необходимости изучать отдельные инструменты для каждой платформы.

*   **📈 Масштабируемость и согласованность**
    Позволяет одинаково эффективно управлять как несколькими серверами, так и тысячами ресурсов в крупных распределенных системах. Гарантирует, что каждое развертывание идентично предыдущему, устраняя дрейф конфигураций и ошибки ручного вмешательства.

*   **🔄 Идемпотентность и предсказуемость**
    Terraform всегда приводит инфраструктуру к одному и тому же состоянию, описанному в коде, независимо от ее исходного состояния. Команда `plan` показывает *что именно* будет изменено *до* внесения изменений, что предотвращает неожиданности.

*   **🧩 Управление зависимостями**
    Terraform автоматически определяет и соблюдает порядок создания и удаления ресурсов на основе их явных и неявных зависимостей. Нельзя создать подсеть до создания сети, а инстанс — до подсети.

*   **👥 Коллаборация и открытость**
    Конфигурации можно хранить в Git, что позволяет командам работать над инфраструктурой совместно. Terraform имеет открытый исходный код и активно развивается сообществом, которое также создает множество модулей для быстрого развертывания готовых решений.

*   **🚀 Высокая скорость развертывания**
    Автоматизация процесса позволяет развертывать сложную инфраструктуру за минуты, а не дни, что значительно ускоряет циклы разработки и вывод продукта на рынок.

*   **💾 Воспроизводимость**
    Сохраненный код инфраструктуры позволяет в любой момент легко воссоздать полную копию среды для разработки, тестирования или восстановления после сбоя.

*   **🔗 Интеграция с другими инструментами**
    Terraform может интегрироваться с другими инструментами автоматизации и управления инфраструктурой, такими как Ansible, Chef и Puppet.

    https://mirror.selectel.ru/3rd-party/hashicorp-releases/terraform/1.13.1/terraform_1.13.1_linux_amd64.zip

::: danger
Классно классно, но терраформ ушел из россии и всё заблочил https://habr.com/ru/articles/807563/ 

Как по мне, нужно поднимать своё зеркало, чтобы быть независимым от других: https://developer.hashicorp.com/terraform/internals/provider-network-mirror-protocol


https://github.com/hashicorp

Ниже я выписал инфу по сборке двух провайдеров: Официальный Docker и хз чей Proxmox. Там типа ничего сложного нет
::: 


```
## Docker

Создайте каталог с именем learn-terraform-docker-container.

$ mkdir learn-terraform-docker-container

Перейдите в каталог.

$ cd learn-terraform-docker-container

Создайте файл для определения вашей инфраструктуры.

$ touch main.tf

Откройте main.tfфайл в текстовом редакторе, вставьте указанную ниже конфигурацию и сохраните его.


Mac или Linux

Окна
terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

resource "docker_image" "nginx" {
  name         = "nginx:latest"
  keep_locally = false
}

resource "docker_container" "nginx" {
  image = docker_image.nginx.image_id
  name  = "tutorial"
  ports {
    internal = 80
    external = 8000
  }
}

Проверьте конфигурацию
Набор файлов, используемых для описания инфраструктуры в Terraform, называется конфигурацией Terraform .

Каждая конфигурация Terraform должна находиться в отдельном рабочем каталоге. Вы создали рабочий каталог ранее в learn-terraform-docker-container. Проверьте main.tfфайл.

Это полная конфигурация, которую можно развернуть с помощью Terraform. В этом руководстве вы более подробно изучите каждый блок этого файла, который вы развернули ранее.

Терраформирующий блок
Этот terraform {}блок содержит настройки Terraform, включая необходимых поставщиков, которых Terraform будет использовать для подготовки вашей инфраструктуры. Для каждого поставщика sourceатрибут определяет необязательное имя хоста, пространство имён и тип поставщика. Terraform по умолчанию устанавливает поставщиков из реестра Terraform . В этом примере конфигурации dockerисточник поставщика определён как kreuzwerker/docker, что является сокращением от registry.terraform.io/kreuzwerker/docker.

Вы также можете задать ограничение по версии для каждого поставщика, определённого в required_providersблоке. Этот versionатрибут необязателен, но мы рекомендуем использовать его для ограничения версии поставщика, чтобы Terraform не устанавливал версию, несовместимую с вашей конфигурацией. Если версия поставщика не указана, Terraform автоматически загрузит последнюю версию во время инициализации.

Более подробную информацию можно найти в документации поставщика .

Поставщики
Блок providerнастраивает указанного провайдера, в данном случае docker. Провайдер — это плагин, который Terraform использует для создания и управления вашими ресурсами.

Вы можете использовать несколько блоков провайдеров в конфигурации Terraform для управления ресурсами разных провайдеров. Вы даже можете использовать разных провайдеров одновременно. Например, можно передать идентификатор образа Docker в службу Kubernetes.

Ресурсы
Используйте resourceблоки для определения компонентов вашей инфраструктуры. Ресурс может быть физическим или виртуальным компонентом, например, Docker-контейнером, или логическим ресурсом, например, приложением Heroku.

Блоки ресурсов содержат две строки перед блоком: тип ресурса и имя ресурса. В этом примере первый тип ресурса — docker_image, а имя — nginx. Префикс типа соответствует имени поставщика. В этом примере конфигурации Terraform управляет ресурсом docker_imageс помощью dockerпоставщика. Вместе тип ресурса и имя ресурса образуют уникальный идентификатор ресурса. Например, идентификатор вашего образа Docker — docker_image.nginx.

Блоки ресурсов содержат аргументы, которые вы используете для настройки ресурса. Аргументы могут включать в себя такие данные, как размеры машины, имена образов дисков или идентификаторы VPC. Наши поставщики предоставляют справочную документацию с обязательными и необязательными аргументами для каждого ресурса. В примере конфигурации для вашего контейнера образ Docker устанавливается в качестве источника образа для вашего docker_containerресурса.

Инициализировать каталог
При создании новой конфигурации или извлечении существующей конфигурации из системы управления версиями необходимо инициализировать каталог с помощью terraform init.

Инициализация каталога конфигурации загружает и устанавливает поставщиков, определенных в конфигурации, в данном случае это dockerпоставщик.

Если вы не выполнили шаги быстрого старта в предыдущем руководстве, инициализируйте каталог сейчас.

$ terraform init

Initializing the backend...

Initializing provider plugins...
- Finding kreuzwerker/docker versions matching "~> 3.0.1"...
- Installing kreuzwerker/docker v3.0.1...
- Installed kreuzwerker/docker v3.0.1 (self-signed, key ID BD080C4571C6104C)

Partner and community providers are signed by their developers.
If you'd like to know more about provider signing, you can read about it here:
https://www.terraform.io/docs/cli/plugins/signing.html

Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
so that Terraform can guarantee to make the same selections by default when
you run "terraform init" in the future.

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.

Terraform загружает dockerпровайдер и устанавливает его в скрытый подкаталог текущего рабочего каталога с именем .terraform. terraform initКоманда выводит информацию о установленной версии провайдера. Terraform также создаёт файл блокировки с именем , в .terraform.lock.hclкотором указаны точные версии используемых провайдеров, чтобы вы могли контролировать время обновления провайдеров, используемых в вашем проекте.

Отформатируйте и проверьте конфигурацию
Мы рекомендуем использовать единообразное форматирование во всех ваших файлах конфигурации. Эта terraform fmtкоманда автоматически обновляет конфигурации в текущем каталоге для удобства чтения и согласованности.

Отформатируйте конфигурацию. Terraform выведет имена изменённых файлов, если таковые имеются. В данном случае ваш файл конфигурации уже был правильно отформатирован, поэтому Terraform не вернёт имён файлов.

$ terraform fmt

Вы также можете убедиться, что ваша конфигурация синтаксически правильна и внутренне непротиворечива, используя terraform validateкоманду.

Проверьте конфигурацию. Приведённый выше пример конфигурации корректен, поэтому Terraform вернёт сообщение об успешном завершении.

$ terraform validate
Success! The configuration is valid.

Создать инфраструктуру
Примените конфигурацию сейчас с помощью terraform applyкоманды. Terraform выведет вывод, аналогичный показанному ниже. Мы обрезали часть вывода для экономии места.

$ terraform apply

Terraform used the selected providers to generate the following execution plan.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # docker_container.nginx will be created
  + resource "docker_container" "nginx" {
##...
      + ports {
          + external = 8000
          + internal = 80
          + ip       = "0.0.0.0"
          + protocol = "tcp"
        }
    }

  # docker_image.nginx will be created
  + resource "docker_image" "nginx" {
      + id           = (known after apply)
      + keep_locally = false
      + latest       = (known after apply)
      + name         = "nginx:latest"
      + output       = (known after apply)
    }

Plan: 2 to add, 0 to change, 0 to destroy.

Прежде чем применить какие-либо изменения, Terraform распечатывает план выполнения , в котором описываются действия, которые Terraform предпримет для изменения вашей инфраструктуры в соответствии с конфигурацией.

Формат выходных данных похож на формат diff, создаваемый такими инструментами, как Git. Рядом с выходными данными есть +, docker_container.nginxчто означает, что Terraform создаст этот ресурс. Под ним отображаются атрибуты, которые будут установлены. Если отображается значение (known after apply), это означает, что значение не будет известно до создания ресурса. Например, Docker присваивает образам случайный идентификатор при их создании, поэтому Terraform не может узнать значение атрибута, idпока вы не примените изменения и поставщик Docker не вернет это значение.

Terraform приостановит работу и дождётся вашего одобрения, прежде чем продолжить. Если что-то в плане покажется вам неверным или опасным, вы можете безопасно прервать его, не внося никаких изменений в вашу инфраструктуру.

В этом случае план приемлем, поэтому введите текст yesв поле подтверждения, чтобы продолжить.

  Enter a value: yes

docker_image.nginx: Creating...
docker_image.nginx: Still creating... [10s elapsed]
docker_image.nginx: Creation complete after 13s [id=sha256:d1a364dc548d5357f0da3268c888e1971bbdb957ee3f028fe7194f1d61c6fdeenginx:latest]
docker_container.nginx: Creating...
docker_container.nginx: Creation complete after 2s [id=2834ad6283372ceb61121739ce71d31cb0237ad50f4dc234e3445c9445439181]

Apply complete! Resources: 2 added, 0 changed, 0 destroyed.

Вы создали инфраструктуру с помощью Terraform! Зайдите localhost:8000в веб-браузер, чтобы убедиться, что контейнер запущен.

Проверить состояние
Когда вы применили свою конфигурацию, Terraform записал данные в файл с именем terraform.tfstate. В этом файле Terraform сохраняет идентификаторы и свойства ресурсов, которыми управляет, чтобы в дальнейшем иметь возможность обновлять или удалять эти ресурсы.

Файл состояния Terraform — единственный способ для Terraform отслеживать, какими ресурсами он управляет. Он часто содержит конфиденциальную информацию, поэтому необходимо хранить его в безопасности и предоставлять доступ к нему только доверенным членам команды, которым необходимо управлять вашей инфраструктурой. В рабочей среде мы рекомендуем хранить состояние удалённо с помощью HCP Terraform или Terraform Enterprise. Terraform также поддерживает несколько других удалённых бэкендов , которые можно использовать для хранения и управления состоянием.

Проверьте текущее состояние с помощью terraform show.

$ terraform show
# docker_container.nginx:
resource "docker_container" "nginx" {
    attach            = false
    command           = [
        "nginx",
        "-g",
        "daemon off;",
    ]
    cpu_shares        = 0
    entrypoint        = [
        "/docker-entrypoint.sh",
    ]
    env               = []
    gateway           = "172.17.0.1"
    hostname          = "2834ad628337"
    id                = "2834ad6283372ceb61121739ce71d31cb0237ad50f4dc234e3445c9445439181"
    image             = "sha256:d1a364dc548d5357f0da3268c888e1971bbdb957ee3f028fe7194f1d61c6fdee"
    init              = false
    ip_address        = "172.17.0.2"
    ip_prefix_length  = 16
    ipc_mode          = "private"
    log_driver        = "json-file"
    logs              = false
    max_retry_count   = 0
    memory            = 0
    memory_swap       = 0
    must_run          = true
    name              = "tutorial"
    network_data      = [
        {
            gateway                   = "172.17.0.1"
            global_ipv6_address       = ""
            global_ipv6_prefix_length = 0
            ip_address                = "172.17.0.2"
            ip_prefix_length          = 16
            ipv6_gateway              = ""
            network_name              = "bridge"
        },
    ]
    network_mode      = "default"
    privileged        = false
    publish_all_ports = false
    read_only         = false
    remove_volumes    = true
    restart           = "no"
    rm                = false
    security_opts     = []
    shm_size          = 64
    start             = true
    stdin_open        = false
    tty               = false

    ports {
        external = 8000
        internal = 80
        ip       = "0.0.0.0"
        protocol = "tcp"
    }
}

# docker_image.nginx:
resource "docker_image" "nginx" {
    id           = "sha256:d1a364dc548d5357f0da3268c888e1971bbdb957ee3f028fe7194f1d61c6fdeenginx:latest"
    keep_locally = false
    latest       = "sha256:d1a364dc548d5357f0da3268c888e1971bbdb957ee3f028fe7194f1d61c6fdee"
    name         = "nginx:latest"
}

При создании этого контейнера Terraform также получил метаданные ресурса от поставщика Docker и записал их в файл состояния. Позже вы измените конфигурацию, чтобы использовать эти значения для настройки других ресурсов и выходных значений.

Ручное управление состоянием
В Terraform есть встроенная команда terraform stateдля расширенного управления состоянием. Используйте эту listподкоманду для вывода списка ресурсов в состоянии вашего проекта.

$ terraform state list
docker_container.nginx
docker_image.nginx


# Installation

This document describes how to install the Terraform provider.

## Automatic Registry Installation

To install this provider, copy and paste this code into your Terraform configuration (include a version tag).

```hcl
terraform {
  required_providers {
    proxmox = {
      source  = "telmate/proxmox"
      version = "<version tag>"
    }
  }
}

provider "proxmox" {
  # Configuration options
}
```

Then, run

```bash
terraform init
```

## Manual Build & Install


### How to get terraform to recognize third party provider

Third-party plugins can be manually installed into the user plugins directory, located
at `%APPDATA%\terraform.d\plugins` on Windows and `~/.terraform.d/plugins` on other systems. Plugins come with
executables that have to be placed in the plugin directory.

### Compile the executables with Go

First, clone this repo and cd into the repo's root.

```shell
git clone https://github.com/Telmate/terraform-provider-proxmox
cd terraform-provider-proxmox
```

In order to build the required executables, [install Go](https://golang.org/doc/install) first. If
you want an automated way to do it, look at go.yml in the root of this repo.

Then to compile the provider:

```bash
make
```

The executable will be in the `./bin` directory.

### Copy executables to plugin directory (Terraform >=0.13)

As of Terraform v0.13, locally-installed, third-party plugins
must [conform to a new filesystem layout](https://github.com/hashicorp/terraform/blob/guide-v0.13-beta/draft-upgrade-guide.md#new-filesystem-layout-for-local-copies-of-providers).

> Terraform assumes that a provider without an explicit source address belongs to the "hashicorp" namespace on registry.terraform.io, which is not true for your in-house provider. Instead, you can use any domain name under your control to establish a virtual source registry to serve as a separate namespace for your local use.

Use the format: [host.domain]/telmate/proxmox/[version]/[arch].

In our case, we will use `registry.example.com` as our virtual source registry in the following examples.

```bash
# Uncomment for macOS
# PLUGIN_ARCH=darwin_amd64

PLUGIN_ARCH=linux_amd64

# Create the directory holding the newly built Terraform plugins
mkdir -p ~/.terraform.d/plugins/registry.example.com/telmate/proxmox/1.0.0/${PLUGIN_ARCH}
```

Then, copy the executables to the directory you just created. You could also use the `make local-dev-install` target.
It's important to note that you aren't required to use a semver, and if you don't, then the path must be altered accordingly.

```bash
cp bin/terraform-provider-proxmox ~/.terraform.d/plugins/registry.example.com/telmate/proxmox/1.0.0/${PLUGIN_ARCH}/
ls -al ~/.terraform.d/plugins/registry.example.com/telmate/proxmox/1.0.0/${PLUGIN_ARCH}/
-rwxrwxr-x 1 user user 20352759 Feb 22 21:51 terraform-provider-proxmox_v1.0.0*
```

Add the source to your project's `main.tf` like so:

```hcl
terraform {
  required_providers {
    proxmox = {
      source  = "telmate/proxmox"
      version = ">=1.0.0"
    }
  }
  required_version = ">= 0.14"
}
# omitted for brevity
```



## Initialize Terraform

Initialize Terraform so that it installs the new plugins:

```bash
terraform init
```

You should see the following marking the successful plugin installation:

```shell
[...]
Initializing provider plugins...
- Finding registry.example.com/telmate/proxmox versions matching ">= 1.0.0"...
- Installing registry.example.com/telmate/proxmox v1.0.0...
- Installed registry.example.com/telmate/proxmox v1.0.0 (unauthenticated)

Terraform has been successfully initialized!
[...]
```

Now that the plugin is installed, you can simply create a new terraform directory and do usual terraforming.


# Docker

Building The Provider
---------------------

Clone repository to: `$GOPATH/src/github.com/terraform-providers/terraform-provider-docker`

```sh
$ mkdir -p $GOPATH/src/github.com/terraform-providers; cd $GOPATH/src/github.com/terraform-providers
$ git clone git@github.com:terraform-providers/terraform-provider-docker
```

Enter the provider directory and build the provider

```sh
$ cd $GOPATH/src/github.com/terraform-providers/terraform-provider-docker
$ make build
```

Using the provider
----------------------
## Fill in for each provider

Developing the Provider
---------------------------

If you wish to work on the provider, you'll first need the latest version of [Go](http://www.golang.org) installed on your machine (currently 1.15). You'll also need to correctly setup a [GOPATH](http://golang.org/doc/code.html#GOPATH), as well as adding `$GOPATH/bin` to your `$PATH` (note that we typically test older versions of golang as long as they are supported upstream, though we recommend new development to happen on the latest release).

To compile the provider, run `make build`. This will build the provider and put the provider binary in the `$GOPATH/bin` directory.

```sh
$ make build
...
$ $GOPATH/bin/terraform-provider-docker
...
```

In order to test the provider, you can simply run `make test`.

```sh
$ make test
```

In order to run the full suite of Acceptance tests, run `make testacc`.

*Note:* Acceptance tests create a local registry which will be deleted afterwards.

```sh
$ make testacc
```

In order to run only single Acceptance tests, execute the following steps:

```sh
# setup the testing environment
$ make testacc_setup

# run single tests
TF_LOG=INFO TF_ACC=1 go test -v ./docker -run ^TestAccDockerImage_data_private_config_file$ -timeout 360s

# cleanup the local testing resources
$ make testacc_cleanup
```

In order to extend the provider and test it with `terraform`, build the provider as mentioned above with
```sh
$ make build
# or a specific version
$ go build -o terraform-provider-docker_v1.2.0_x4
```

Remove an explicit version of the provider you develop, because `terraform` will fetch
the locally built one in `$GOPATH/bin`
```hcl
provider "docker" {
  # version = "~> 0.1.2"
  ...
}
```


Don't forget to run `terraform init` each time you rebuild the provider. Check [here](https://www.youtube.com/watch?v=TMmovxyo5sY&t=30m14s) for a more detailed explanation.

You can check the latest released version of a provider at https://releases.hashicorp.com/terraform-provider-docker/.

Developing on Windows
---------------------

You can build and test on Widows without `make`.  Run `go install` to
build and `Scripts\runAccTests.bat` to run the test suite.

Continuous integration for Windows is not available at the moment due
to lack of a CI provider that is free for open source projects *and*
supports running Linux containers in Docker for Windows.  For example,
AppVeyor is free for open source projects and provides Docker on its
Windows builds, but only offers Linux containers on Windows as a paid
upgrade.
```