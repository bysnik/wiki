import{_ as a,c as n,o as e,ag as p}from"./chunks/framework.D4Vqf8I7.js";const k=JSON.parse('{"title":"Terraform","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/terraform.md","filePath":"docs/wi/terraform.md","lastUpdated":1773230231000}'),i={name:"docs/wi/terraform.md"};function l(r,s,t,o,c,h){return e(),n("div",null,s[0]||(s[0]=[p(`<h1 id="terraform" tabindex="-1">Terraform <a class="header-anchor" href="#terraform" aria-label="Permalink to &quot;Terraform&quot;">​</a></h1><p><img src="https://pan.dev/img/product-landing/terraform/terraform-article.jpeg" alt=""></p><p><a href="https://habr.com/ru/articles/743334/" target="_blank" rel="noreferrer">https://habr.com/ru/articles/743334/</a></p><p><a href="https://habr.com/ru/articles/759486/" target="_blank" rel="noreferrer">https://habr.com/ru/articles/759486/</a></p><h2 id="как-работает-terraform-принципы-и-преимущества" tabindex="-1"><strong>Как работает Terraform: Принципы и преимущества</strong> <a class="header-anchor" href="#как-работает-terraform-принципы-и-преимущества" aria-label="Permalink to &quot;**Как работает Terraform: Принципы и преимущества**&quot;">​</a></h2><p>Terraform — это инструмент для безопасного и эффективного построения, изменения и управления инфраструктурой через парадигму <strong>«Инфраструктура как код» (IaC)</strong>. Его основная суть заключается в декларативном подходе: вы описываете <em>желаемое конечное состояние</em> вашей инфраструктуры, а Terraform самостоятельно разрабатывает и выполняет план по достижению этого состояния.</p><hr><h3 id="принцип-работы-от-кода-к-инфраструктуре" tabindex="-1"><strong>Принцип работы: от кода к инфраструктуре</strong> <a class="header-anchor" href="#принцип-работы-от-кода-к-инфраструктуре" aria-label="Permalink to &quot;**Принцип работы: от кода к инфраструктуре**&quot;">​</a></h3><p>Процесс работы Terraform можно разделить на несколько ключевых этапов:</p><ol><li><p><strong>Определение состояния (Кодирование)</strong> Вы описываете желаемую инфраструктуру (серверы, сети, базы данных и т.д.) в виде конфигурационных файлов. Эти файлы, написанные на языке <strong>HashiCorp Configuration Language (HCL)</strong> (который легко читается как человеком, так и машиной), называются Terraform-кодом. В них вы декларируете, <em>какие</em> ресурсы нужны, их параметры и взаимосвязи.</p></li><li><p><strong>Планирование изменений (<code>terraform plan</code>)</strong> При запуске команды <code>terraform plan</code> Terraform выполняет критически важную работу:</p><ul><li><strong>Анализирует</strong> ваш конфигурационный файл.</li><li><strong>Считывает</strong> актуальное состояние инфраструктуры из специального файла состояния (<code>terraform.tfstate</code>).</li><li><strong>Сравнивает</strong> желаемое состояние с текущим.</li><li><strong>Формирует план исполнения</strong> — детальный отчет о том, какие ресурсы будут созданы, изменены или уничтожены для приведения инфраструктуры в соответствие с кодом. Этот план позволяет проверить изменения перед их применением.</li></ul></li><li><p><strong>Применение изменений (<code>terraform apply</code>)</strong> После подтверждения плана команда <code>terraform apply</code> приводит его в действие. Terraform через <strong>провайдеров</strong> (специальные плагины для AWS, Azure, GCP, Yandex Cloud и сотен других сервисов) взаимодействует с API платформ и выполняет все необходимые операции в правильном порядке, учитывая зависимости между ресурсами.</p></li><li><p><strong>Сохранение состояния</strong> После применения изменений Terraform обновляет файл состояния (<code>terraform.tfstate</code>). Этот файл является единственным источником правды о развернутой инфраструктуре и используется для последующих операций, позволяя Terraform понимать, чем она управляет.</p></li></ol><p>При необходимости изменения инфраструктуры вы просто правите конфигурационный файл и снова запускаете <code>plan</code> и <code>apply</code>. Terraform определит разницу и внесет точечные изменения.</p><hr><h3 id="ключевые-преимущества-terraform" tabindex="-1"><strong>Ключевые преимущества Terraform</strong> <a class="header-anchor" href="#ключевые-преимущества-terraform" aria-label="Permalink to &quot;**Ключевые преимущества Terraform**&quot;">​</a></h3><ul><li><p><strong>👨‍💻 Инфраструктура как код (IaC)</strong> Конфигурации хранятся в файлах, что позволяет применять к инфраструктуре практики разработки ПО: контроль версий (Git), код-ревью, тестирование и повторное использование.</p></li><li><p><strong>☁️ Мультиплатформенность и универсальность</strong> Единый инструмент для управления инфраструктурой across различных облачных провайдеров (AWS, Azure, GCP, Yandex Cloud), SaaS-сервисов (GitHub, Datadog) и даже локальных платформ (vSphere, Kubernetes). Это избавляет от необходимости изучать отдельные инструменты для каждой платформы.</p></li><li><p><strong>📈 Масштабируемость и согласованность</strong> Позволяет одинаково эффективно управлять как несколькими серверами, так и тысячами ресурсов в крупных распределенных системах. Гарантирует, что каждое развертывание идентично предыдущему, устраняя дрейф конфигураций и ошибки ручного вмешательства.</p></li><li><p><strong>🔄 Идемпотентность и предсказуемость</strong> Terraform всегда приводит инфраструктуру к одному и тому же состоянию, описанному в коде, независимо от ее исходного состояния. Команда <code>plan</code> показывает <em>что именно</em> будет изменено <em>до</em> внесения изменений, что предотвращает неожиданности.</p></li><li><p><strong>🧩 Управление зависимостями</strong> Terraform автоматически определяет и соблюдает порядок создания и удаления ресурсов на основе их явных и неявных зависимостей. Нельзя создать подсеть до создания сети, а инстанс — до подсети.</p></li><li><p><strong>👥 Коллаборация и открытость</strong> Конфигурации можно хранить в Git, что позволяет командам работать над инфраструктурой совместно. Terraform имеет открытый исходный код и активно развивается сообществом, которое также создает множество модулей для быстрого развертывания готовых решений.</p></li><li><p><strong>🚀 Высокая скорость развертывания</strong> Автоматизация процесса позволяет развертывать сложную инфраструктуру за минуты, а не дни, что значительно ускоряет циклы разработки и вывод продукта на рынок.</p></li><li><p><strong>💾 Воспроизводимость</strong> Сохраненный код инфраструктуры позволяет в любой момент легко воссоздать полную копию среды для разработки, тестирования или восстановления после сбоя.</p></li><li><p><strong>🔗 Интеграция с другими инструментами</strong> Terraform может интегрироваться с другими инструментами автоматизации и управления инфраструктурой, такими как Ansible, Chef и Puppet.</p><p><a href="https://mirror.selectel.ru/3rd-party/hashicorp-releases/terraform/1.13.1/terraform_1.13.1_linux_amd64.zip" target="_blank" rel="noreferrer">https://mirror.selectel.ru/3rd-party/hashicorp-releases/terraform/1.13.1/terraform_1.13.1_linux_amd64.zip</a></p></li></ul><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>Классно классно, но терраформ ушел из России и всё заблочил <a href="https://habr.com/ru/articles/807563/" target="_blank" rel="noreferrer">https://habr.com/ru/articles/807563/</a></p><p>Как по мне, нужно поднимать своё зеркало, чтобы быть независимым от других: <a href="https://developer.hashicorp.com/terraform/internals/provider-network-mirror-protocol" target="_blank" rel="noreferrer">https://developer.hashicorp.com/terraform/internals/provider-network-mirror-protocol</a></p><p><a href="https://github.com/hashicorp" target="_blank" rel="noreferrer">https://github.com/hashicorp</a></p><p>Ниже я выписал инфу по сборке двух провайдеров: Официальный Docker и хз чей Proxmox. Там типа ничего сложного нет</p></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>## Docker</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Создайте каталог с именем learn-terraform-docker-container.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ mkdir learn-terraform-docker-container</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Перейдите в каталог.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ cd learn-terraform-docker-container</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Создайте файл для определения вашей инфраструктуры.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ touch main.tf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Откройте main.tfфайл в текстовом редакторе, вставьте указанную ниже конфигурацию и сохраните его.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Mac или Linux</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Окна</span></span>
<span class="line"><span>terraform {</span></span>
<span class="line"><span>  required_providers {</span></span>
<span class="line"><span>    docker = {</span></span>
<span class="line"><span>      source = &quot;kreuzwerker/docker&quot;</span></span>
<span class="line"><span>      version = &quot;~&gt; 3.0.1&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>provider &quot;docker&quot; {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>resource &quot;docker_image&quot; &quot;nginx&quot; {</span></span>
<span class="line"><span>  name         = &quot;nginx:latest&quot;</span></span>
<span class="line"><span>  keep_locally = false</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>resource &quot;docker_container&quot; &quot;nginx&quot; {</span></span>
<span class="line"><span>  image = docker_image.nginx.image_id</span></span>
<span class="line"><span>  name  = &quot;tutorial&quot;</span></span>
<span class="line"><span>  ports {</span></span>
<span class="line"><span>    internal = 80</span></span>
<span class="line"><span>    external = 8000</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Проверьте конфигурацию</span></span>
<span class="line"><span>Набор файлов, используемых для описания инфраструктуры в Terraform, называется конфигурацией Terraform .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Каждая конфигурация Terraform должна находиться в отдельном рабочем каталоге. Вы создали рабочий каталог ранее в learn-terraform-docker-container. Проверьте main.tfфайл.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Это полная конфигурация, которую можно развернуть с помощью Terraform. В этом руководстве вы более подробно изучите каждый блок этого файла, который вы развернули ранее.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Терраформирующий блок</span></span>
<span class="line"><span>Этот terraform {}блок содержит настройки Terraform, включая необходимых поставщиков, которых Terraform будет использовать для подготовки вашей инфраструктуры. Для каждого поставщика sourceатрибут определяет необязательное имя хоста, пространство имён и тип поставщика. Terraform по умолчанию устанавливает поставщиков из реестра Terraform . В этом примере конфигурации dockerисточник поставщика определён как kreuzwerker/docker, что является сокращением от registry.terraform.io/kreuzwerker/docker.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Вы также можете задать ограничение по версии для каждого поставщика, определённого в required_providersблоке. Этот versionатрибут необязателен, но мы рекомендуем использовать его для ограничения версии поставщика, чтобы Terraform не устанавливал версию, несовместимую с вашей конфигурацией. Если версия поставщика не указана, Terraform автоматически загрузит последнюю версию во время инициализации.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Более подробную информацию можно найти в документации поставщика .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Поставщики</span></span>
<span class="line"><span>Блок providerнастраивает указанного провайдера, в данном случае docker. Провайдер — это плагин, который Terraform использует для создания и управления вашими ресурсами.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Вы можете использовать несколько блоков провайдеров в конфигурации Terraform для управления ресурсами разных провайдеров. Вы даже можете использовать разных провайдеров одновременно. Например, можно передать идентификатор образа Docker в службу Kubernetes.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Ресурсы</span></span>
<span class="line"><span>Используйте resourceблоки для определения компонентов вашей инфраструктуры. Ресурс может быть физическим или виртуальным компонентом, например, Docker-контейнером, или логическим ресурсом, например, приложением Heroku.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Блоки ресурсов содержат две строки перед блоком: тип ресурса и имя ресурса. В этом примере первый тип ресурса — docker_image, а имя — nginx. Префикс типа соответствует имени поставщика. В этом примере конфигурации Terraform управляет ресурсом docker_imageс помощью dockerпоставщика. Вместе тип ресурса и имя ресурса образуют уникальный идентификатор ресурса. Например, идентификатор вашего образа Docker — docker_image.nginx.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Блоки ресурсов содержат аргументы, которые вы используете для настройки ресурса. Аргументы могут включать в себя такие данные, как размеры машины, имена образов дисков или идентификаторы VPC. Наши поставщики предоставляют справочную документацию с обязательными и необязательными аргументами для каждого ресурса. В примере конфигурации для вашего контейнера образ Docker устанавливается в качестве источника образа для вашего docker_containerресурса.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Инициализировать каталог</span></span>
<span class="line"><span>При создании новой конфигурации или извлечении существующей конфигурации из системы управления версиями необходимо инициализировать каталог с помощью terraform init.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Инициализация каталога конфигурации загружает и устанавливает поставщиков, определенных в конфигурации, в данном случае это dockerпоставщик.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Если вы не выполнили шаги быстрого старта в предыдущем руководстве, инициализируйте каталог сейчас.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ terraform init</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Initializing the backend...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Initializing provider plugins...</span></span>
<span class="line"><span>- Finding kreuzwerker/docker versions matching &quot;~&gt; 3.0.1&quot;...</span></span>
<span class="line"><span>- Installing kreuzwerker/docker v3.0.1...</span></span>
<span class="line"><span>- Installed kreuzwerker/docker v3.0.1 (self-signed, key ID BD080C4571C6104C)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Partner and community providers are signed by their developers.</span></span>
<span class="line"><span>If you&#39;d like to know more about provider signing, you can read about it here:</span></span>
<span class="line"><span>https://www.terraform.io/docs/cli/plugins/signing.html</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Terraform has created a lock file .terraform.lock.hcl to record the provider</span></span>
<span class="line"><span>selections it made above. Include this file in your version control repository</span></span>
<span class="line"><span>so that Terraform can guarantee to make the same selections by default when</span></span>
<span class="line"><span>you run &quot;terraform init&quot; in the future.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Terraform has been successfully initialized!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>You may now begin working with Terraform. Try running &quot;terraform plan&quot; to see</span></span>
<span class="line"><span>any changes that are required for your infrastructure. All Terraform commands</span></span>
<span class="line"><span>should now work.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>If you ever set or change modules or backend configuration for Terraform,</span></span>
<span class="line"><span>rerun this command to reinitialize your working directory. If you forget, other</span></span>
<span class="line"><span>commands will detect it and remind you to do so if necessary.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Terraform загружает dockerпровайдер и устанавливает его в скрытый подкаталог текущего рабочего каталога с именем .terraform. terraform initКоманда выводит информацию о установленной версии провайдера. Terraform также создаёт файл блокировки с именем , в .terraform.lock.hclкотором указаны точные версии используемых провайдеров, чтобы вы могли контролировать время обновления провайдеров, используемых в вашем проекте.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Отформатируйте и проверьте конфигурацию</span></span>
<span class="line"><span>Мы рекомендуем использовать единообразное форматирование во всех ваших файлах конфигурации. Эта terraform fmtкоманда автоматически обновляет конфигурации в текущем каталоге для удобства чтения и согласованности.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Отформатируйте конфигурацию. Terraform выведет имена изменённых файлов, если таковые имеются. В данном случае ваш файл конфигурации уже был правильно отформатирован, поэтому Terraform не вернёт имён файлов.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ terraform fmt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Вы также можете убедиться, что ваша конфигурация синтаксически правильна и внутренне непротиворечива, используя terraform validateкоманду.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Проверьте конфигурацию. Приведённый выше пример конфигурации корректен, поэтому Terraform вернёт сообщение об успешном завершении.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ terraform validate</span></span>
<span class="line"><span>Success! The configuration is valid.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Создать инфраструктуру</span></span>
<span class="line"><span>Примените конфигурацию сейчас с помощью terraform applyкоманды. Terraform выведет вывод, аналогичный показанному ниже. Мы обрезали часть вывода для экономии места.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ terraform apply</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Terraform used the selected providers to generate the following execution plan.</span></span>
<span class="line"><span>Resource actions are indicated with the following symbols:</span></span>
<span class="line"><span>  + create</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Terraform will perform the following actions:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # docker_container.nginx will be created</span></span>
<span class="line"><span>  + resource &quot;docker_container&quot; &quot;nginx&quot; {</span></span>
<span class="line"><span>##...</span></span>
<span class="line"><span>      + ports {</span></span>
<span class="line"><span>          + external = 8000</span></span>
<span class="line"><span>          + internal = 80</span></span>
<span class="line"><span>          + ip       = &quot;0.0.0.0&quot;</span></span>
<span class="line"><span>          + protocol = &quot;tcp&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # docker_image.nginx will be created</span></span>
<span class="line"><span>  + resource &quot;docker_image&quot; &quot;nginx&quot; {</span></span>
<span class="line"><span>      + id           = (known after apply)</span></span>
<span class="line"><span>      + keep_locally = false</span></span>
<span class="line"><span>      + latest       = (known after apply)</span></span>
<span class="line"><span>      + name         = &quot;nginx:latest&quot;</span></span>
<span class="line"><span>      + output       = (known after apply)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Plan: 2 to add, 0 to change, 0 to destroy.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Прежде чем применить какие-либо изменения, Terraform распечатывает план выполнения , в котором описываются действия, которые Terraform предпримет для изменения вашей инфраструктуры в соответствии с конфигурацией.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Формат выходных данных похож на формат diff, создаваемый такими инструментами, как Git. Рядом с выходными данными есть +, docker_container.nginxчто означает, что Terraform создаст этот ресурс. Под ним отображаются атрибуты, которые будут установлены. Если отображается значение (known after apply), это означает, что значение не будет известно до создания ресурса. Например, Docker присваивает образам случайный идентификатор при их создании, поэтому Terraform не может узнать значение атрибута, idпока вы не примените изменения и поставщик Docker не вернет это значение.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Terraform приостановит работу и дождётся вашего одобрения, прежде чем продолжить. Если что-то в плане покажется вам неверным или опасным, вы можете безопасно прервать его, не внося никаких изменений в вашу инфраструктуру.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>В этом случае план приемлем, поэтому введите текст yesв поле подтверждения, чтобы продолжить.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Enter a value: yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker_image.nginx: Creating...</span></span>
<span class="line"><span>docker_image.nginx: Still creating... [10s elapsed]</span></span>
<span class="line"><span>docker_image.nginx: Creation complete after 13s [id=sha256:d1a364dc548d5357f0da3268c888e1971bbdb957ee3f028fe7194f1d61c6fdeenginx:latest]</span></span>
<span class="line"><span>docker_container.nginx: Creating...</span></span>
<span class="line"><span>docker_container.nginx: Creation complete after 2s [id=2834ad6283372ceb61121739ce71d31cb0237ad50f4dc234e3445c9445439181]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Apply complete! Resources: 2 added, 0 changed, 0 destroyed.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Вы создали инфраструктуру с помощью Terraform! Зайдите localhost:8000в веб-браузер, чтобы убедиться, что контейнер запущен.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Проверить состояние</span></span>
<span class="line"><span>Когда вы применили свою конфигурацию, Terraform записал данные в файл с именем terraform.tfstate. В этом файле Terraform сохраняет идентификаторы и свойства ресурсов, которыми управляет, чтобы в дальнейшем иметь возможность обновлять или удалять эти ресурсы.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Файл состояния Terraform — единственный способ для Terraform отслеживать, какими ресурсами он управляет. Он часто содержит конфиденциальную информацию, поэтому необходимо хранить его в безопасности и предоставлять доступ к нему только доверенным членам команды, которым необходимо управлять вашей инфраструктурой. В рабочей среде мы рекомендуем хранить состояние удалённо с помощью HCP Terraform или Terraform Enterprise. Terraform также поддерживает несколько других удалённых бэкендов , которые можно использовать для хранения и управления состоянием.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Проверьте текущее состояние с помощью terraform show.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ terraform show</span></span>
<span class="line"><span># docker_container.nginx:</span></span>
<span class="line"><span>resource &quot;docker_container&quot; &quot;nginx&quot; {</span></span>
<span class="line"><span>    attach            = false</span></span>
<span class="line"><span>    command           = [</span></span>
<span class="line"><span>        &quot;nginx&quot;,</span></span>
<span class="line"><span>        &quot;-g&quot;,</span></span>
<span class="line"><span>        &quot;daemon off;&quot;,</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>    cpu_shares        = 0</span></span>
<span class="line"><span>    entrypoint        = [</span></span>
<span class="line"><span>        &quot;/docker-entrypoint.sh&quot;,</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>    env               = []</span></span>
<span class="line"><span>    gateway           = &quot;172.17.0.1&quot;</span></span>
<span class="line"><span>    hostname          = &quot;2834ad628337&quot;</span></span>
<span class="line"><span>    id                = &quot;2834ad6283372ceb61121739ce71d31cb0237ad50f4dc234e3445c9445439181&quot;</span></span>
<span class="line"><span>    image             = &quot;sha256:d1a364dc548d5357f0da3268c888e1971bbdb957ee3f028fe7194f1d61c6fdee&quot;</span></span>
<span class="line"><span>    init              = false</span></span>
<span class="line"><span>    ip_address        = &quot;172.17.0.2&quot;</span></span>
<span class="line"><span>    ip_prefix_length  = 16</span></span>
<span class="line"><span>    ipc_mode          = &quot;private&quot;</span></span>
<span class="line"><span>    log_driver        = &quot;json-file&quot;</span></span>
<span class="line"><span>    logs              = false</span></span>
<span class="line"><span>    max_retry_count   = 0</span></span>
<span class="line"><span>    memory            = 0</span></span>
<span class="line"><span>    memory_swap       = 0</span></span>
<span class="line"><span>    must_run          = true</span></span>
<span class="line"><span>    name              = &quot;tutorial&quot;</span></span>
<span class="line"><span>    network_data      = [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            gateway                   = &quot;172.17.0.1&quot;</span></span>
<span class="line"><span>            global_ipv6_address       = &quot;&quot;</span></span>
<span class="line"><span>            global_ipv6_prefix_length = 0</span></span>
<span class="line"><span>            ip_address                = &quot;172.17.0.2&quot;</span></span>
<span class="line"><span>            ip_prefix_length          = 16</span></span>
<span class="line"><span>            ipv6_gateway              = &quot;&quot;</span></span>
<span class="line"><span>            network_name              = &quot;bridge&quot;</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>    network_mode      = &quot;default&quot;</span></span>
<span class="line"><span>    privileged        = false</span></span>
<span class="line"><span>    publish_all_ports = false</span></span>
<span class="line"><span>    read_only         = false</span></span>
<span class="line"><span>    remove_volumes    = true</span></span>
<span class="line"><span>    restart           = &quot;no&quot;</span></span>
<span class="line"><span>    rm                = false</span></span>
<span class="line"><span>    security_opts     = []</span></span>
<span class="line"><span>    shm_size          = 64</span></span>
<span class="line"><span>    start             = true</span></span>
<span class="line"><span>    stdin_open        = false</span></span>
<span class="line"><span>    tty               = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ports {</span></span>
<span class="line"><span>        external = 8000</span></span>
<span class="line"><span>        internal = 80</span></span>
<span class="line"><span>        ip       = &quot;0.0.0.0&quot;</span></span>
<span class="line"><span>        protocol = &quot;tcp&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># docker_image.nginx:</span></span>
<span class="line"><span>resource &quot;docker_image&quot; &quot;nginx&quot; {</span></span>
<span class="line"><span>    id           = &quot;sha256:d1a364dc548d5357f0da3268c888e1971bbdb957ee3f028fe7194f1d61c6fdeenginx:latest&quot;</span></span>
<span class="line"><span>    keep_locally = false</span></span>
<span class="line"><span>    latest       = &quot;sha256:d1a364dc548d5357f0da3268c888e1971bbdb957ee3f028fe7194f1d61c6fdee&quot;</span></span>
<span class="line"><span>    name         = &quot;nginx:latest&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>При создании этого контейнера Terraform также получил метаданные ресурса от поставщика Docker и записал их в файл состояния. Позже вы измените конфигурацию, чтобы использовать эти значения для настройки других ресурсов и выходных значений.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Ручное управление состоянием</span></span>
<span class="line"><span>В Terraform есть встроенная команда terraform stateдля расширенного управления состоянием. Используйте эту listподкоманду для вывода списка ресурсов в состоянии вашего проекта.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ terraform state list</span></span>
<span class="line"><span>docker_container.nginx</span></span>
<span class="line"><span>docker_image.nginx</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># Installation</span></span>
<span class="line"><span></span></span>
<span class="line"><span>This document describes how to install the Terraform provider.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Automatic Registry Installation</span></span>
<span class="line"><span></span></span>
<span class="line"><span>To install this provider, copy and paste this code into your Terraform configuration (include a version tag).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`hcl</span></span>
<span class="line"><span>terraform {</span></span>
<span class="line"><span>  required_providers {</span></span>
<span class="line"><span>    proxmox = {</span></span>
<span class="line"><span>      source  = &quot;telmate/proxmox&quot;</span></span>
<span class="line"><span>      version = &quot;&lt;version tag&gt;&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>provider &quot;proxmox&quot; {</span></span>
<span class="line"><span>  # Configuration options</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Then, run</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">terraform</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span></span></code></pre></div><h2 id="manual-build-install" tabindex="-1">Manual Build &amp; Install <a class="header-anchor" href="#manual-build-install" aria-label="Permalink to &quot;Manual Build &amp; Install&quot;">​</a></h2><h3 id="how-to-get-terraform-to-recognize-third-party-provider" tabindex="-1">How to get terraform to recognize third party provider <a class="header-anchor" href="#how-to-get-terraform-to-recognize-third-party-provider" aria-label="Permalink to &quot;How to get terraform to recognize third party provider&quot;">​</a></h3><p>Third-party plugins can be manually installed into the user plugins directory, located at <code>%APPDATA%\\terraform.d\\plugins</code> on Windows and <code>~/.terraform.d/plugins</code> on other systems. Plugins come with executables that have to be placed in the plugin directory.</p><h3 id="compile-the-executables-with-go" tabindex="-1">Compile the executables with Go <a class="header-anchor" href="#compile-the-executables-with-go" aria-label="Permalink to &quot;Compile the executables with Go&quot;">​</a></h3><p>First, clone this repo and cd into the repo&#39;s root.</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/Telmate/terraform-provider-proxmox</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> terraform-provider-proxmox</span></span></code></pre></div><p>In order to build the required executables, <a href="https://golang.org/doc/install" target="_blank" rel="noreferrer">install Go</a> first. If you want an automated way to do it, look at go.yml in the root of this repo.</p><p>Then to compile the provider:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span></span></code></pre></div><p>The executable will be in the <code>./bin</code> directory.</p><h3 id="copy-executables-to-plugin-directory-terraform-0-13" tabindex="-1">Copy executables to plugin directory (Terraform &gt;=0.13) <a class="header-anchor" href="#copy-executables-to-plugin-directory-terraform-0-13" aria-label="Permalink to &quot;Copy executables to plugin directory (Terraform &gt;=0.13)&quot;">​</a></h3><p>As of Terraform v0.13, locally-installed, third-party plugins must <a href="https://github.com/hashicorp/terraform/blob/guide-v0.13-beta/draft-upgrade-guide.md#new-filesystem-layout-for-local-copies-of-providers" target="_blank" rel="noreferrer">conform to a new filesystem layout</a>.</p><blockquote><p>Terraform assumes that a provider without an explicit source address belongs to the &quot;hashicorp&quot; namespace on registry.terraform.io, which is not true for your in-house provider. Instead, you can use any domain name under your control to establish a virtual source registry to serve as a separate namespace for your local use.</p></blockquote><p>Use the format: [host.domain]/telmate/proxmox/[version]/[arch].</p><p>In our case, we will use <code>registry.example.com</code> as our virtual source registry in the following examples.</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Uncomment for macOS</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># PLUGIN_ARCH=darwin_amd64</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PLUGIN_ARCH</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">linux_amd64</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Create the directory holding the newly built Terraform plugins</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.terraform.d/plugins/registry.example.com/telmate/proxmox/1.0.0/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\${PLUGIN_ARCH}</span></span></code></pre></div><p>Then, copy the executables to the directory you just created. You could also use the <code>make local-dev-install</code> target. It&#39;s important to note that you aren&#39;t required to use a semver, and if you don&#39;t, then the path must be altered accordingly.</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bin/terraform-provider-proxmox</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.terraform.d/plugins/registry.example.com/telmate/proxmox/1.0.0/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\${PLUGIN_ARCH}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -al</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.terraform.d/plugins/registry.example.com/telmate/proxmox/1.0.0/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\${PLUGIN_ARCH}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-rwxrwxr-x</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 20352759</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Feb</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 22</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 21:51</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> terraform-provider-proxmox_v1.0.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span></span></code></pre></div><p>Add the source to your project&#39;s <code>main.tf</code> like so:</p><div class="language-hcl vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">hcl</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">terraform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  required_providers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    proxmox</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      source  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;telmate/proxmox&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      version </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&gt;=1.0.0&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  required_version</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&gt;= 0.14&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># omitted for brevity</span></span></code></pre></div><h2 id="initialize-terraform" tabindex="-1">Initialize Terraform <a class="header-anchor" href="#initialize-terraform" aria-label="Permalink to &quot;Initialize Terraform&quot;">​</a></h2><p>Initialize Terraform so that it installs the new plugins:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">terraform</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span></span></code></pre></div><p>You should see the following marking the successful plugin installation:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[...]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Initializing</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> provider</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> plugins...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Finding</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> registry.example.com/telmate/proxmox</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> versions</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> matching</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&gt;= 1.0.0&quot;...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Installing</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> registry.example.com/telmate/proxmox</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> v1.0.0...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Installed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> registry.example.com/telmate/proxmox</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> v1.0.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (unauthenticated)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Terraform</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> has</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> been</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> successfully</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> initialized!</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[...]</span></span></code></pre></div><p>Now that the plugin is installed, you can simply create a new terraform directory and do usual terraforming.</p><h1 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-label="Permalink to &quot;Docker&quot;">​</a></h1><h2 id="building-the-provider" tabindex="-1">Building The Provider <a class="header-anchor" href="#building-the-provider" aria-label="Permalink to &quot;Building The Provider&quot;">​</a></h2><p>Clone repository to: <code>$GOPATH/src/github.com/terraform-providers/terraform-provider-docker</code></p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $GOPATH</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/src/github.com/terraform-providers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $GOPATH</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/src/github.com/terraform-providers</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git@github.com:terraform-providers/terraform-provider-docker</span></span></code></pre></div><p>Enter the provider directory and build the provider</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $GOPATH</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/src/github.com/terraform-providers/terraform-provider-docker</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span></code></pre></div><h2 id="using-the-provider" tabindex="-1">Using the provider <a class="header-anchor" href="#using-the-provider" aria-label="Permalink to &quot;Using the provider&quot;">​</a></h2><h2 id="fill-in-for-each-provider" tabindex="-1">Fill in for each provider <a class="header-anchor" href="#fill-in-for-each-provider" aria-label="Permalink to &quot;Fill in for each provider&quot;">​</a></h2><h2 id="developing-the-provider" tabindex="-1">Developing the Provider <a class="header-anchor" href="#developing-the-provider" aria-label="Permalink to &quot;Developing the Provider&quot;">​</a></h2><p>If you wish to work on the provider, you&#39;ll first need the latest version of <a href="http://www.golang.org" target="_blank" rel="noreferrer">Go</a> installed on your machine (currently 1.15). You&#39;ll also need to correctly setup a <a href="http://golang.org/doc/code.html#GOPATH" target="_blank" rel="noreferrer">GOPATH</a>, as well as adding <code>$GOPATH/bin</code> to your <code>$PATH</code> (note that we typically test older versions of golang as long as they are supported upstream, though we recommend new development to happen on the latest release).</p><p>To compile the provider, run <code>make build</code>. This will build the provider and put the provider binary in the <code>$GOPATH/bin</code> directory.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $GOPATH</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/bin/terraform-provider-docker</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">...</span></span></code></pre></div><p>In order to test the provider, you can simply run <code>make test</code>.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span></code></pre></div><p>In order to run the full suite of Acceptance tests, run <code>make testacc</code>.</p><p><em>Note:</em> Acceptance tests create a local registry which will be deleted afterwards.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> testacc</span></span></code></pre></div><p>In order to run only single Acceptance tests, execute the following steps:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># setup the testing environment</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> testacc_setup</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># run single tests</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">TF_LOG</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">INFO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TF_ACC</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">1</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./docker</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ^TestAccDockerImage_data_private_config_file</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-timeout</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 360s</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># cleanup the local testing resources</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> testacc_cleanup</span></span></code></pre></div><p>In order to extend the provider and test it with <code>terraform</code>, build the provider as mentioned above with</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># or a specific version</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> terraform-provider-docker_v1.2.0_x4</span></span></code></pre></div><p>Remove an explicit version of the provider you develop, because <code>terraform</code> will fetch the locally built one in <code>$GOPATH/bin</code></p><div class="language-hcl vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">hcl</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">provider</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> &quot;docker&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # version = &quot;~&gt; 0.1.2&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>Don&#39;t forget to run <code>terraform init</code> each time you rebuild the provider. Check <a href="https://www.youtube.com/watch?v=TMmovxyo5sY&amp;t=30m14s" target="_blank" rel="noreferrer">here</a> for a more detailed explanation.</p><p>You can check the latest released version of a provider at <a href="https://releases.hashicorp.com/terraform-provider-docker/" target="_blank" rel="noreferrer">https://releases.hashicorp.com/terraform-provider-docker/</a>.</p><h2 id="developing-on-windows" tabindex="-1">Developing on Windows <a class="header-anchor" href="#developing-on-windows" aria-label="Permalink to &quot;Developing on Windows&quot;">​</a></h2><p>You can build and test on Widows without <code>make</code>. Run <code>go install</code> to build and <code>Scripts\\runAccTests.bat</code> to run the test suite.</p><p>Continuous integration for Windows is not available at the moment due to lack of a CI provider that is free for open source projects <em>and</em> supports running Linux containers in Docker for Windows. For example, AppVeyor is free for open source projects and provides Docker on its Windows builds, but only offers Linux containers on Windows as a paid upgrade.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span></code></pre></div>`,73)]))}const g=a(i,[["render",l]]);export{k as __pageData,g as default};
