# Kavita

![](https://private-user-images.githubusercontent.com/735851/367529276-f016b34f-3c4c-4f07-8e72-12cd6f4e71ea.gif?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzIxOTEwMDUsIm5iZiI6MTc3MjE5MDcwNSwicGF0aCI6Ii83MzU4NTEvMzY3NTI5Mjc2LWYwMTZiMzRmLTNjNGMtNGYwNy04ZTcyLTEyY2Q2ZjRlNzFlYS5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMjI3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDIyN1QxMTExNDVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1jZjUwZjIwMWFkNDgwMWI3YWNjZTRjNTdhNzFiMzQyYTVmNGQ0YTM1NDM2MTU4YzQ1N2YyZGE1YzA4NzIxZWI4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.QIkAh2Enu7Y5CAMrxl1CBtNvNVkWhd8uvGNjRT3xU6Q)

Kavita is a fast, feature rich, cross-platform reading server. Built with a focus for being a full solution for all your reading needs. Set up your own server and share your reading collection with your friends and family!

https://github.com/Kareadita/Kavita

## Метод нативной установки

Готовые бинарные файлы будут доступны на [GitHub](https://github.com/Kareadita/Kavita/releases). Поддерживаемые платформы: Linux, macOS и Windows.

Релизы Kavita предназначены для использования «из коробки». Это означает, что нет необходимости устанавливать дополнительное программное обеспечение или зависимости.

### Шаг 1

Перейдите по ссылке [https://github.com/Kareadita/Kavita/releases/latest](https://github.com/Kareadita/Kavita/releases/latest) и прокрутите страницу вниз, пока не увидите раздел «assets», где представлен список файлов для скачивания.

Из терминала вы можете использовать `wget` для загрузки релиза, например:

```bash
wget https://github.com/Kareadita/Kavita/releases/download/{version}/kavita-linux-{arch}.tar.gz
```

### Шаг 2

Распакуйте Kavita в любую доступную для записи папку по вашему выбору.

```bash
tar -xzf kavita-linux-{arch}.tar.gz
```

### Шаг 3

Сделайте файл Kavita исполняемым.

```bash
sudo chmod +x ~/Kavita/Kavita
```

### Шаг 4

Запустите исполняемый файл Kavita: `./Kavita`

Откройте окно браузера и перейдите по адресу: `http://localhost:5000/`

### Настройка Kavita в качестве службы (опционально)

Чтобы Kavita запускалась в фоновом режиме при загрузке системы, вы можете установить её как службу systemd. Сохраните следующий текст в файл с именем `kavita.service` в директории `/etc/systemd/system`

```systemd
[Unit]
Description=Kavita Server
After=network.target
 
[Service]
User=kavita
Group=kavita
Type=simple
WorkingDirectory=/opt/Kavita
ExecStart=/opt/Kavita/Kavita
TimeoutStopSec=20
KillMode=process
Restart=on-failure
 
[Install]
WantedBy=multi-user.target
```

Чтобы создать пользователя, соответствующего следующему конфигурационному файлу, необходимо добавить пользователя и группу с именем `kavita`.

```bash
sudo adduser kavita
```

Это создаст и пользователя, и группу с именем `kavita`, а также добавит пользователя в эту группу.

Теперь необходимо изменить владельца директории, в которую вы установили Kavita:

```bash
sudo chown -R kavita:kavita /opt/Kavita
```

После сохранения файла конфигурации службы вы можете выполнить команду `systemctl start kavita.service`, чтобы проверить, запускается ли служба корректно. Если всё в порядке, выполните `systemctl enable kavita.service`, и служба будет запускаться автоматически при загрузке системы. Чтобы проверить статус службы, можно выполнить команду `systemctl status kavita.service`. Если служба не запускается, вы можете использовать `journalctl` для получения более подробной информации о возможных ошибках.

## Dockerhub

Официальный образ Docker публикуется на Dockerhub при каждом новом релизе. Вы можете найти его [здесь](https://hub.docker.com/r/jvmilazz0/kavita)

Этот образ поддерживает архитектуру armv7.

### Docker Compose

::: warning ⚠️ 
Это всего лишь шаблон для настройки вашего файла docker compose. Обязательно измените пути к папкам, чтобы они указывали на ваши собственные медиафайлы.
:::

```systemd
services:
    kavita:
        image: jvmilazz0/kavita:latest    # Использование стабильной ветки из официального репозитория dockerhub.
        container_name: kavita
        volumes:
            - /your/path/to/manga:/manga
            - /your/path/to/comics:/comics
            - /your/path/to/books:/books
            - /your/path/to/saved/config:/kavita/config     # /kavita/config изменять нельзя
        environment:
            - TZ=Your/Timezone
        ports:
            - "5000:5000"
        restart: unless-stopped
```

### Docker Run

```bash
docker run --name kavita -p 5000:5000 \
-v /your/manga/directory:/manga \
-v /your/storage/directory/kavita:/kavita/config \
--restart unless-stopped \
-e TZ=Your/Timezone \
-d jvmilazz0/kavita:latest
```

### Ветка Nightly

Ветка nightly — это место, где тестируются новейшие функции и исправления ошибок перед слиянием в стабильную ветку. Обратите внимание: вы не сможете переключиться с ветки nightly на стабильную ветку, пока следующий стабильный релиз не синхронизируется с ней.

Если вы планируете запускать ветку nightly и хотите помочь в процессе тестирования, пожалуйста, присоединяйтесь к Discord и получите роль «Kavita Nightly Testing».

Мы не рекомендуем запускать nightly в качестве основного экземпляра. В любой момент могут появиться критические ошибки или неэффективности.

Рекомендуется запускать ветку nightly в отдельном экземпляре или контейнере, отличном от вашего основного экземпляра.

#### Compose

```yaml
services:
    kavita:
        image: jvmilazz0/kavita:nightly    # Использование ветки nightly из официального репозитория dockerhub.
        container_name: kavita
        volumes:
            - /your/path/to/manga:/manga
            - /your/path/to/comics:/comics
            - /your/path/to/books:/books
            - /different/path/to/config/:/kavita/config     # /kavita/config изменять нельзя
        environment:
            - TZ=Your/Timezone
        ports:
            - "5005:5000"
        restart: unless-stopped
```

## Github Container Registry

Github также предоставляет последние и nightly-релизы, если вы не хотите использовать Dockerhub. Вы можете найти их [здесь](https://github.com/Kareadita/Kavita/pkgs/container/kavita  )

Это тот же образ, что загружается на Dockerhub, просто размещённый в другом реестре контейнеров.

### Docker Compose

::: warning ⚠️ 
Это всего лишь шаблон для настройки вашего файла docker compose. Обязательно измените пути к папкам, чтобы они указывали на ваши собственные медиафайлы.
:::

```yaml
services:
    kavita:
        image: ghcr.io/kareadita/kavita:latest    # Использование стабильной ветки из ghcr.io
        container_name: kavita
        volumes:
            - /your/path/to/manga:/manga
            - /your/path/to/comics:/comics
            - /your/path/to/books:/books
            - /your/path/to/saved/config:/kavita/config     # /kavita/config изменять нельзя
        environment:
            - TZ=Your/Timezone
        ports:
            - "5000:5000"
        restart: unless-stopped
```

### Docker Run

```bash
docker run --name kavita -p 5000:5000 \
-v /your/manga/directory:/manga \
-v /your/storage/directory/kavita:/kavita/config \
--restart unless-stopped \
-e TZ=Your/Timezone \
-d ghcr.io/kareadita/kavita:latest
```

### Ветка Nightly

Ветка nightly — это место, где тестируются новейшие функции и исправления ошибок перед слиянием в стабильную ветку. Обратите внимание: вы не сможете переключиться с ветки nightly на стабильную ветку, пока следующий стабильный релиз не синхронизируется с ней.

::: tip
Мы не рекомендуем запускать nightly в качестве основного экземпляра. В любой момент могут появиться критические ошибки или неэффективности.

Рекомендуется запускать ветку nightly в отдельном экземпляре или контейнере, отличном от вашего основного экземпляра.
:::

#### Compose

```yaml
services:
    kavita:
        image: ghcr.io/kareadita/kavita:nightly    # Использование ветки nightly из ghcr.io
        container_name: kavita
        volumes:
            - /your/path/to/manga:/manga
            - /your/path/to/comics:/comics
            - /your/path/to/books:/books
            - /different/path/to/config/:/kavita/config     # /kavita/config изменять нельзя
        environment:
            - TZ=Your/Timezone
        ports:
            - "5005:5000"
        restart: unless-stopped
```

## Сканирование библиотеки
### Введение
Сканирование библиотеки заставляет Kavita проверять её папки и подпапки на наличие новых или удалённых элементов (книг, архивных файлов и т.д.). Если обнаруживаются новые медиафайлы, они добавляются в библиотеку.
Можно рассматривать сканирование как «поиск нового или изменённого контента». Важно соблюдать требования к структуре файлов, чтобы Kavita могла корректно обработать ваши файлы.
Первые сканирования часто проходят медленно, особенно на сетевых хранилищах и ещё медленнее на удалённых хранилищах (rclone). Будьте терпеливы: главная страница Kavita и информация о библиотеке будут обновляться в процессе сканирования.
### Структура файлов
Kavita ожидает, что все серии будут вложены в папку, и одна и та же серия **не должна** располагаться параллельно от корня библиотеки. (Под корнем библиотеки подразумевается папка, которую вы выбираете для библиотеки в Kavita)
Идеальная структура:
- - - Series Name A - v01.cbz
- Series Name A - v02.cbz
- Series Name A - v03.cbz
- - Artbook 1.cbz
- - Series Name B - v01.cbz
- Series Name B - v02.cbz
- Series Name B - v03.cbz
- - Artbook 1.cbz
Это означает, что также допустима такая структура:
- - - - Series Name A - v01.cbz
- Series Name A - v02.cbz
- Series Name A - v03.cbz
- - Oneshot.cbz
- - - Series Name C - v01.cbz
- Series Name C - v02.cbz
- Series Name C - v03.cbz
- - Artbook 1.cbz
Если эти правила соблюдаются, у вас не должно возникнуть проблем.
#### Чего делать не следует
🚫 Файлы не могут находиться на корневом уровне!
🚫 Серия не может быть разбита между двумя смежными папками!
### Что происходит во время сканирования?
Kavita создаст представление вашей библиотеки на основе файлов на диске. Библиотека Kavita *не* отражает в точности вашу структуру папок. Kavita использует имена файлов, внутренние метаданные и некоторые ограниченные имена папок для извлечения информации о серии, томе, главе и т.д. из файла и их группировки.
Сканер анализирует имена файлов, считывает информацию о комиксе (если применимо), обновляет базу данных этой информацией и обновляет пользовательский интерфейс. Если файл не был изменён с момента последнего сканирования Kavita, дополнительная обработка этого файла выполняться не будет. Если ваши архивы содержат метаданные, они переопределят любую информацию, извлечённую из имени файла.
#### Обновление обложек
Во время задачи обновления обложек применяется аналогичная логика. Это ресурсоёмкая задача из-за большого объёма операций ввода-вывода, которые должна выполнить Kavita, и из-за объёма памяти, необходимого для извлечения изображений из архива и сохранения их на диск. В этой задаче Kavita не открывает архивы, если они не были изменены, если только вы не запустите обновление обложек вручную из пользовательского интерфейса. Даже если архив был изменён, но вы заблокировали изображение обложки, загрузив собственную обложку через интерфейс, архив открываться не будет.
#### Анализ файлов
Во время задачи анализа файлов Kavita открывает файлы epub и подсчитывает количество слов для каждого элемента. Это требует значительных ресурсов ввода-вывода и памяти. Как и в других задачах, Kavita использует проверки по времени последнего изменения (Last Modified), чтобы по возможности избежать повторных вычислений. При ручном запуске этой задачи из пользовательского интерфейса будет выполнено принудительное пересчитывание, поэтому будьте очень осторожны, если используете удалённое хранилище или медленный сервер.
### Цикл сканирования
Подробный обзор работы цикла сканирования
#### Шаг 1: Проверка необходимости сканирования для Kavita
- При всех сканированиях Kavita проверяет, что все папки библиотек не пусты и доступны. Если это не так, сканирование прерывается. Для серии Kavita также проверяет, существует ли путь к папке серии на диске; если нет, сканирование прерывается.
#### Шаг 2: Сканирование директорий
- Сканер достаточно умён и по умолчанию избегает лишней работы.
- Для каждой папки (в библиотеке или для данной серии) Kavita сначала проверяет, изменилась ли папка с момента последнего сканирования. Проверка выполняется с точностью до минуты, секунды игнорируются. Это проверяется по времени последней записи (Last Write Time) в папку. (Примечание: для точного определения времени последнего изменения папки требуется сканирование всех вложенных папок)
- Kavita проверяет наличие шаблона глобирования (glob pattern) для библиотек и обрабатывает его, если он существует. Это позволяет применять шаблоны Glob к сканеру для игнорирования определённых файлов или папок. Это применяется рекурсивно.
- Файлы, исключённые в [настройках исключения](https://wiki.kavitareader.com/guides/admin-settings/libraries/#exclude-patterns) библиотек, не будут отображаться при сканировании.
#### Шаг 3: Обработка файлов
- Библиотека определяет правила для парсера, и для разных типов файлов существуют разные парсеры.
- Парсер извлекает информацию из файлов; эти файлы представляют собой список файлов, собранных при сканировании папки на предыдущем шаге, и предполагается, что они относятся к одной серии.
- После парсинга Kavita проверяет, нужно ли объединить какие-либо серии. Объединение может произойти, если в ComicInfo присутствует тег `LocalizedSeries`, который позволяет автоматически объединять два разных названия. Примечание: если в одной папке находятся несколько серий с тегом localizedSeries, они будут сгруппированы некорректно. Kavita зафиксирует это в логе, но не остановит сканирование. Это недопустимая конфигурация.
- Для каждой найденной серии в папке (должна быть одна) Kavita запускает задачу обработки серии.
#### Шаг 4: Обработка серии
- Эта задача отвечает за обновление базы данных на основе обработанных данных. Она выполняется параллельно с другими задачами обработки серий. Это может затруднить понимание логов.
- Первым делом необходимо найти серию в базе данных. Это делается путём проверки по названию серии и локализованному названию. Если ни одно из них не существует, создаётся новая серия.
- Здесь Kavita выполняет всю необходимую работу с базой данных и обновляет поля и т.д.
- В завершение Kavita ставит в очередь задачи для генерации обложек и анализа файлов. Они также будут выполняться параллельно и планируются в той же очереди, что и другие задачи сканирования.
ℹ️ Если в папках нет изменений, Kavita не будет их сканировать или обрабатывать.
##### Примечания
- Наличие нескольких серий в одной папке не поддерживается, но может работать. Есть некоторые ограничения. Если в этой папке существует серия, использующая тег ComicInfo LocalizedSeries, то серии могут сгруппироваться неожиданным образом. Пользователь будет уведомлён об этом через файл лога, например: «. Кроме того, отслеживание папок (Folder Watching) не будет корректно фиксировать изменения серий из-за использования одной и той же папки.
- При сканировании серии, если папка серии больше не существует на диске, сканирование будет прервано. Следует запустить сканирование библиотеки, которое удалит серию.
- Не каждое действие, которое вы можете выполнить с папкой, изменит время её модификации, включая переименование и перемещение. Имейте это в виду, если сканирование библиотеки работает не так, как ожидается. Иногда создания пустого файла blank.txt в папке достаточно, чтобы ОС изменила время обновления.
### Соглашения об именах / Структура файлов
Важно понимать, как Kavita извлекает информацию из файлов, чтобы вы могли видеть то, что хотите, так, как хотите.
Kavita использует парсинг (а не структуру папок) для определения того, что является серией и что к ней относится. Kavita требует, чтобы каждая серия находилась в своей папке и чтобы на корневом уровне библиотеки не было файлов.
Ознакомьтесь с [принципами работы сканера](https://wiki.kavitareader.com/guides/scanner/) перед продолжением изучения этой статьи.
Если вы хотите разделить серии с помощью `Series Name (2019)`, рекомендуется изменить круглые скобки на фигурные `{` `}` и изменить название серии в пользовательском интерфейсе.
Для всех типов библиотек в Kavita существует возможность принудительной обработки файлов как «Специальных» (Specials).
### Специальные выпуски (Specials)
Kavita обрабатывает несколько типов файлов как «Specials» и группирует их на отдельной вкладке в деталях серии. Маркер специального выпуска (SP) будет удалён из заголовка в интерфейсе, однако он используется при сортировке и обязателен, если не используются внутренние метаданные.
Элемент считается специальным, когда из него можно извлечь название серии, но не найдена информация о томе или главе:
```
Корень библиотеки
┖── Series Name
┖── Series Name.cbz
```
Чтобы принудительно установить статус Special, имя файла может включать SP01, SP02 и т.д. Это заставит файл обрабатываться как специальный:
```
Корень библиотеки
┖── Series Name
┖── Series Name SP01 Special Name.cbz
```
Чтобы идентифицировать файл как специальный, а не как серию из имени файла, Kavita будет подниматься к корню библиотеки и пытаться извлечь название серии из имён папок.
Например:
```
Корень библиотеки
┖── Again!!
┖── Specials
┖── Again The After Story SP01.cbz
```
Будет извлечено `"Again!!"` как название серии, а файл `"Again The After Story SP01.cbz"` будет сгруппирован как специальный выпуск под серией `"Again!!"`
Специальные выпуски будут использовать имя папки в качестве названия серии в качестве резервного варианта. Если у вас другое название, отличное от файлов серии, ваш специальный выпуск может не сгруппироваться корректно.
### Тома
Чтобы что-то было распознано как имеющее том, номер тома должен присутствовать в имени файла.
Том означает:
- v1
- vol 1
- vol. 1
- volume 01
- Vol 7.5
- Volume.2000
- 卷2
- 册2
- 2巻
- t. 2
- tome 2
#### Структура комиксов
Структура «Comics (Legacy)» — это устаревший вариант парсинга, который использовался до масштабного обновления комиксов и появления типа библиотеки [Comic Vine](https://wiki.kavitareader.com/guides/scanner/comicvine/). Если в ваших файлах есть метаданные и вы сталкиваетесь с проблемами объединения серий, когда этого не нужно, рассмотрите возможность переключения на тип библиотеки Comic Vine.
Kavita парсит комиксы так же, как и мангу, но использует дополнительные ключевые слова-идентификаторы. Если у вас возникают трудности, вы можете посмотреть различные случаи, которые у нас есть в [нашем коде](https://github.com/Kareadita/Kavita/blob/develop/API.Tests/Parser/ComicParserTests.cs) и что поддерживается. Следующее даст вам представление.
Те же соглашения об именах работают и с комиксами.
```
┖── Series Name
┠── Series Name v01.cbz
┠── Series Name v02.cbz
┖── Series Name v03 c01.cbz
```
Следующее будет распознано как «Главы», которые могут естественным образом сгруппироваться в элемент «Том», если том указан в самом файле.
| Имя файла | Распознанное название серии | Том | Глава |
| --- | --- | --- | --- |
| `Invincible 070.5 - Invincible Returns 1 (2010) (digital) (Minutemen-InnerDemons).cbr` |  |  | 70.5 |
| `Batman & Wildcat (1 of 3)` |  |  | 1 |
| `Amazing Man Comics chapter 25` |  |  | 25 |
| `Superman v1 024 (09-10 1943)` |  | 1 | 24 |
| `Y - The Last Man ` |  |  | 1 |
| `Batgirl Vol.2000 #57 (December, 2004)` |  |  | 57 |
| `Babe 01` |  |  | 1 |
| `Babe T1 01` |  | 1 | 1 |
Если у вас есть несколько комиксов разных лет, вы можете назвать их как «Fables 2004» и «Fables 1989» или, что ещё лучше, использовать тип библиотеки [Comic Vine](https://wiki.kavitareader.com/guides/scanner/comicvine/). Всё, что находится внутри (), будет удалено при парсинге, так как там обычно содержится лишняя информация. Используйте или встроенные метаданные.
У комиксов также есть список специальных ключевых слов в имени файла, которые помечают их как специальные выпуски. Некоторые из них:
- Specials
- Annual
- Extra Chapter
- Book
- Compendium
- OneShot
- Extra
- FCBD
- TPB
- Side Stories
- Art Collection
- Absolute
- Preview
- Omnibus
- Bonus
- Hors Série
- HS
- THS
### Тип библиотеки «Комиксы»
Тип библиотеки «Комиксы» предназначен для пользователей, у которых в файлы встроены полные метаданные. Обычно это пользователи Mylar, но может быть любой, кто записывает `Comicinfo.xml` в свои файлы. Этот тип библиотеки гораздо строже соответствует структуре, которую ожидает [проект CBL](https://github.com/DieselTech/CBL-ReadingLists).
```
Корень библиотеки
┖── Series Name (Starting Volume Year)
┠── Series Name (Vol Year) #01.cbz
┠── Series Name (Vol Year) #02.cbz
┠── Series Name (Vol Year) #03.cbz
┖── Series Name 2 (Starting Volume Year)
┠── Series Name 2 #01.cbz
┠── Series Name 2 #02.cbz
⋮
┖── Series Name 2 #06.cbz
```
Правила:
- Kavita сначала извлечёт том и серию из имени папки. Ожидаемый формат: `Series (Volume Year)`
- Если присутствует ComicInfo, Kavita переопределит его с помощью `Series (Volume)`. Ожидается, что том — это год, а не отдельное число (однако это тоже будет работать)
- Если информация из обоих источников неверна, Kavita попытается извлечь информацию для каждого каталога от файла к корню библиотеки.
- Kavita по-прежнему будет пытаться классифицировать специальные выпуски по маркеру SP в имени файла и формату.
#### Структура EPUB
EPUB в первую очередь парсятся по метаданным внутри файла epub (opf). Имена файлов используются только для тома и серии, но метаданные переопределяют всё. Электронные книги не используют папки в качестве резервного варианта для парсинга.
Kavita сканирует epub в два этапа. На первом этапе извлекаются внутренние метаданные. Если серия отсутствует, epub будет использовать заголовок, а если заголовок отсутствует, то будет использован резервный парсер имён файлов. На втором этапе имя файла будет использовано для заполнения недостающей информации, которая будет включена в Kavita. Если можно извлечь **том** и название **серии**, то книга будет обрабатываться как манга или комикс, и в деталях серии для отдельных книг будет отображаться «Том X». В метаданных для группировки книг в серию используются определённые теги, например «Expanse».
Программное обеспечение для управления электронными книгами [Calibre](https://wiki.kavitareader.com/guides/external-tools/calibre/) можно использовать для редактирования метаданных epub, чтобы включить серию, том и заголовок, чтобы серии с несколькими книгами корректно парсились в одну серию.
#### Структура изображений
Изображения не поддерживают метаданные и имеют очень простой механизм парсинга:
- Серия устанавливается как имя директории и очищается
- Том и главы пытаются извлекаться из папок вплоть до корня библиотеки
- Если ничего не найдено, каждое изображение будет обработано как специальный выпуск
Этот тип библиотеки предназначен для использования с мангой и использует соответствующие шаблоны парсинга для извлечения тома/главы.
#### Пример
```
┖── Series Name
┠── Volume 1
┠── Chapter 1
┠── 01.png
┠── Chapter 2
┖── 01.png
```
#### Структура манги
Хорошая структура будет такой:
```
Корень библиотеки
┖── Series Name
┠── Series Name v01.cbz
┠── Series Name v02.cbz
┠── Series Name v03.cbz
┖── Specials
┖── Series Name Omakes SP01.cbz
┖── Series Name 2
┠── Series Name 2 Vol.01 Ch.1.cbz
┠── Series Name 2 Vol.01 Ch.2.cbz
⋮
┖── Series Name 2 Vol.02 Ch.6.cbz
```
#### Примеры соглашений об именах, поддерживаемых «из коробки»
| Имя файла | Распознанное название серии | Том | Глава |
| --- | --- | --- | --- |
| `Noblesse - Episode 406 (52 Pages).7z` | Noblesse | 406 |  |
| `[Hidoi]_Amaenaideyo_MS_vol01_chp02.rar` | Amaenaideyo MS | 1 | 2 |
| `Transferred to another world magical swordsman v1.2` | Transferred to another world magical swordsman | 1 | 2 |
| `Okusama wa Shougakusei c003 (v01) [bokuwaNEET]` | Okusama wa Shougakusei | 1 | 3 |
| `Goblin Slayer Side Story - Year One 025.5` | Goblin Slayer Side Story - Year One |  | 25.5 |
| `Itoshi no Karin - c001-006x1 (v01) [Renzokusei Scans]` | Itoshi no Karin |  | 1-6 |
| `Beelzebub_53[KSH].zip` | Beelzebub |  | 53 |
| `Killing Bites Vol. 0001 Ch. 0001 - Galactica Scanlations (gb)` | Killing Bites | 1 | 1 |
|  |  |  |  |
|  |  |  |  |
| И [многое другое](https://github.com/Kareadita/Kavita/blob/develop/API.Tests/Parsing/MangaParsingTests.cs) … |  |  |  |
#### PDF
PDF в первую очередь парсятся на основе [спецификации метаданных calibre](https://wiki.kavitareader.com/guides/metadata/pdfs/). Парсинг имён файлов будет использоваться только как резервный вариант для получения информации о серии/томе.
Kavita сканирует PDF в два этапа. На первом этапе извлекаются внутренние метаданные. Если серия отсутствует, Kavita будет использовать заголовок, а если заголовок отсутствует, то будет использован резервный парсер имён файлов. На втором этапе имя файла будет использовано для заполнения недостающей информации, которая будет включена в Kavita.
Для управления метаданными на PDF следует использовать [Calibre](https://wiki.kavitareader.com/guides/external-tools/calibre/). Использование тегов Series и Title гарантирует, что элементы будут правильно сгруппированы в Kavita.
## Пользовательские темы
![Theme Manager](https://wiki.kavitareader.com/_next/static/media/theme-manager.97ba1d86.png)
Kavita поддерживает настройку большинства цветов через темы. Вы можете создать свою собственную тему или поделиться ею через наш [репозиторий тем](https://github.com/Kareadita/Themes) и загружать/обновлять её с помощью встроенного клиента.
Есть несколько вещей, которые следует учитывать:
- Вам нужно добавить только те переменные, которые вы хотите переопределить, или любой пользовательский CSS
- Файл должен иметь расширение .css
- Имя файла должно содержать только буквы, цифры и `-`
- Имя файла должно соответствовать CSS-свойству верхнего уровня
- Файл .css должен быть помещён в `/config/themes`
- После размещения файла в директории необходимо просканировать его с помощью кнопки «Scan» на странице «Настройки пользователя» > «Темы», прежде чем вы сможете его применить.
- При желании вы можете установить тему как «По умолчанию», и все новые учётные записи будут автоматически использовать эту тему (пользователи могут изменить её по своему усмотрению)
- Это ограничено свойствами, которые мы предоставили. (*Смотрите доступные CSS-переменные ниже*)
- Технически, любой CSS может быть внедрён для настройки макета.
Например, если мы создали `/config/themes/test-theme-123.css`, то CSS внутри файла должен быть структурирован следующим образом:
```
:root .bg-test-theme-123 {
/* CSS Variables here */
}
```
## Доступные CSS-переменные
Вы можете использовать `color: var(--css-variable-name)` для ссылки на определённую CSS-переменную.
### Color-scheme
*Это относится к цвету полосы прокрутки, а также к тому, какой цвет использовать для изображений-заполнителей.*
```
--color-scheme: dark/light;
```
*Это относится к цвету вкладки в браузере. Изменяет meta-тег. (v0.6.1.27+)*
```
--theme-color: hex/rgb;
```
*Это относится к цвету плитки для представления Windows в виде плиток. Изменяет meta-тег. (v0.6.1.28+)*
```
--tile-color: hex/rgb;
```
#### Основные цвета
*Это базовые цвета, которые вы можете переопределить; вы можете добавить больше и использовать их как дополнительные цвета для эффектов при наведении.*
```
--primary-color: hex/rgb(a);
--primary-color-dark-shade: hex/rgb(a);
--primary-color-darker-shade: hex/rgb(a);
--primary-color-darkest-shade: hex/rgb(a);
--error-color: hex/rgb(a);
--bs-body-bg: hex/rgb(a);  // Цвет фона для страниц
--body-text-color: hex/rgb(a);
--btn-icon-filter: invert(1) grayscale(%) brightness(%));  // Любая цепочка фильтров. Полезно в основном для тёмных тем
--dropdown-icon-white: url;
--dropdown-icon-black: url;
```
### Система возвышений (Elevation)
Вы можете найти дополнительную информацию о системе возвышений [здесь](https://m2.material.io/design/color/dark-theme.html#properties).
```
--elevation-layer0: rgba;
--elevation-layer1: rgba;
--elevation-layer2: rgba;
--elevation-layer3: rgba;
--elevation-layer4: rgba;
--elevation-layer5: rgba;
--elevation-layer6: rgba;
--elevation-layer7: rgba;
--elevation-layer8: rgba;
--elevation-layer9: rgba;
--elevation-layer10: rgba;
--elevation-layer0-dark: rgba;
--elevation-layer1-dark: rgba;
--elevation-layer2-dark: rgba;
--elevation-layer3-dark: rgba;
--elevation-layer4-dark: rgba;
--elevation-layer5-dark: rgba;
--elevation-layer6-dark: rgba;
--elevation-layer7-dark: rgba;
--elevation-layer8-dark: rgba;
--elevation-layer9-dark: rgba;
--elevation-layer10-dark: rgba;
--elevation-layer11-dark: rgba;
--elevation-layer0-dark-solid: hex/rgb;
--elevation-layer1-dark-solid: hex/rgb;
--elevation-layer2-dark-solid: hex/rgb;
--elevation-layer3-dark-solid: hex/rgb;
--elevation-layer4-dark-solid: hex/rgb;
--elevation-layer5-dark-solid: hex/rgb;
--elevation-layer6-dark-solid: hex/rgb;
--elevation-layer7-dark-solid: hex/rgb;
--elevation-layer8-dark-solid: hex/rgb;
--elevation-layer9-dark-solid: hex/rgb;
```
#### Цветовая палитра (Colorscape)
Цвета темы, создающие градиент для фона. Можно отключить, иначе применяется автоматически на основе цветов обложки.`--colorscape-primary-color` и альфа-варианты будут обновляться в реальном времени. Вариант по умолчанию фиксирован и представляет собой состояние по умолчанию и должен соответствовать не-альфа/не-по-умолчанию при запуске.
```
--colorscape-enabled: true/false; // Это будет переопределено настройкой пользователя
/* Это цвета фона по умолчанию для приложения. Они будут обновляться на разных страницах сгенерированными цветами. Должны быть в формате RGB */
--colorscape-primary-color: rgb;
--colorscape-lighter-color: rgb;
--colorscape-darker-color: rgb;
--colorscape-complementary-color: rgb;
/* Это должны быть варианты с альфа-каналом 0. */
--colorscape-primary-color: rgba;
--colorscape-lighter-color: rgba;
--colorscape-darker-color: rgba;
--colorscape-complementary-color: rgba;
/* Это цвета фона по умолчанию. Они должны совпадать и не могут быть ссылкой на переменную. Они не будут обновляться. */
--colorscape-primary-default-color: rgb;
--colorscape-lighter-default-color: rgb;
--colorscape-darker-default-color: rgb;
--colorscape-complementary-default-color: rgb;
```
#### Глобальные
```
--hr-color: hex/rgb(a);
--accent-bg-color: hex/rgb(a);
--accent-text-color: hex/rgb(a);
--grid-breakpoints-xs: px;
--grid-breakpoints-sm: px;
--grid-breakpoints-md: px;
--grid-breakpoints-lg: px;
--grid-breakpoints-xl: px;
--body-font-family: "Font-Family", sans-serif;
--brand-font-family: "Font-Family", sans-serif;
--primary-color-scrollbar: hex/rgb(a);
--default-state-scrollbar: hex/rgb(a);
--text-muted-color: hex/rgb(a);
--mobile-series-img-background: true/false; // Следует ли отображать обложку серии как фон на мобильных устройствах
```
#### Элемент настроек
```
--setting-header-text-color: hex/rgb(a);
--setting-break-color: hex/rgb(a);
--setting-header-font-size: px/rem;
--setting-header-font-weight: bold/bolder;
```
#### Таблица
```
--table-header-bg-color: hex/rgb(a);
--table-header-text-color: hex/rgb(a);
--table-body-bg-color: hex/rgb(a);
--table-body-text-color: hex/rgb(a);
--table-body-striped-bg-color: hex/rgb(a);
--table-body-border: hex/rgb(a);
--table-body-striped-bg-color: hex/rgb(a);
```
#### Панель навигации (Navbar)
```
--navbar-bg-color: hex/rgb(a);
--navbar-text-color: hex/rgb(a);
--navbar-fa-icon-color: hex/rgb(a);
--navbar-btn-hover-outline-color: hex/rgb(a);
--navbar-header-margin: hex/rgb(a);
--navbar-header-border-radius: hex/rgb(a);
--navbar-header-mobile-x-margin: hex/rgb(a);
--navbar-header-mobile-y-margin: hex/rgb(a);
--nav-mobile-offset: px;
--nav-offset: px;
```
#### Поля ввода
```
--input-bg-color: hex/rgb(a);
--input-bg-readonly-color: hex/rgb(a);
--input-focused-border-color: hex/rgb(a);
--input-text-color: hex/rgb(a);
--input-placeholder-color: hex/rgb(a);
--input-border-color: hex/rgb(a);
--input-focus-boxshadow-color: hex/rgb(a);
--input-hint-border-color: hex/rgb(a);
--input-hint-text-color: hex/rgb(a);
```
#### Кнопки
```
--btn-primary-text-color: hex/rgb(a);
--btn-primary-bg-color: hex/rgb(a);
--btn-primary-border-color: hex/rgb(a);
--btn-primary-hover-text-color: hex/rgb(a);
--btn-primary-hover-bg-color: hex/rgb(a);
--btn-primary-hover-border-color: hex/rgb(a);
--btn-primary-outline-text-color: hex/rgb(a);
--btn-primary-outline-bg-color: hex/rgb(a);
--btn-primary-outline-border-color: hex/rgb(a);
--btn-primary-outline-hover-text-color: hex/rgb(a);
--btn-primary-outline-hover-bg-color: hex/rgb(a);
--btn-primary-outline-hover-border-color: hex/rgb(a);
--btn-secondary-text-color: hex/rgb(a);
--btn-secondary-bg-color: hex/rgb(a);
--btn-secondary-border-color: hex/rgb(a);
--btn-secondary-hover-bg-color: hex/rgb(a);
--btn-secondary-hover-border-color: hex/rgb(a);
--btn-secondary-font-weight: bold/bolder;
--btn-secondary-outline-text-color: hex/rgb(a);
--btn-secondary-outline-bg-color: hex/rgb(a);
--btn-secondary-outline-border-color: hex/rgb(a);
--btn-secondary-outline-hover-bg-color: hex/rgb(a);
--btn-secondary-outline-hover-border-color: hex/rgb(a);
--btn-secondary-outline-font-weight: bold/bolder;
--btn-primary-text-text-color: hex/rgb(a);
--btn-secondary-text-text-color: hex/rgb(a);
--btn-danger-text-text-color: hex/rgb(a);
--btn-alt-bg-color: hex/rgb(a);
--btn-alt-border-color: hex/rgb(a);
--btn-alt-hover-bg-color: hex/rgb(a);
--btn-alt-focus-bg-color: hex/rgb(a);
--btn-alt-focus-boxshadow-color: hex/rgb(a);
--btn-fa-icon-color: hex/rgb(a);
--btn-disabled-bg-color: hex/rgb(a);
--btn-disabled-text-color: hex/rgb(a);
--btn-disabled-border-color: hex/rgb(a);
--btn-focus-boxshadow-color: hex/rgb(a);
```
#### Модальное окно
```
--modal-bg-color: hex/rgb(a);
```
#### Оповещения
```
--alert-text-color: hex/rgb(a);
--alert-bg-color: hex/rgb(a);
```
#### Уведомления (Toasts)
```
--toast-success-bg-color: hex/rgb(a);
--toast-error-bg-color: hex/rgb(a);
--toast-info-bg-color: hex/rgb(a);
--toast-warning-bg-color: hex/rgb(a);
```
#### Чекбоксы/Переключатели
```
--checkbox-checked-bg-color: hex/rgb(a);
--checkbox-border-color: hex/rgb(a);
--checkbox-focus-border-color: hex/rgb(a);
--checkbox-focus-boxshadow-color: hex/rgb(a);
```
#### Бейджи тегов
```
--tagbadge-border-color: hex/rgb(a);
--tagbadge-text-color: hex/rgb(a);
--tagbadge-bg-color: vhex/rgb(a);
--tagbadge-filled-border-color: hex/rgb(a);
--tagbadge-filled-text-color: hex/rgb(a);
--tagbadge-filled-bg-color: hex/rgb(a);
```
#### Боковая навигация
#### Элементы списка
```
--list-group-item-text-color: hex/rgb(a);
--list-group-item-bg-color: hex/rgb(a);
--list-group-item-border-color: hex/rgb(a);
--list-group-hover-text-color: hex/rgb(a);
--list-group-hover-bg-color: hex/rgb(a);
--list-group-active-border-color: hex/rgb(a);
--list-group-item-text-color: hex/rgb(a);
--list-group-item-bg-color: hex/rgb(a);
--search-list-group-item-bg-color: hex/rgb(a);
--list-group-hover-text-color: hex/rgb(a);
--list-group-hover-bg-color: hex/rgb(a);
--list-group-active-border-color: hex/rgb(a)/none;
--list-group-item-border-top-left-radius: px;
--list-group-item-border-top-right-radius: px;
--list-group-item-border-bottom-left-radius: px;
--list-group-item-border-bottom-right-radius: px;
--list-group-item-border-width: px;
--list-group-item-border-color: rgba;
--list-group-item-border-style: solid;
--list-group-item-first-border-width: px;
--list-group-item-last-border-width: px;
```
#### Всплывающее окно (Popover)
```
--popover-body-bg-color: hex/rgb(a);
--popover-body-text-color: hex/rgb(a);
--popover-outerarrow-color: hex/rgb(a);
--popover-arrow-color: hex/rgb(a);
--popover-bg-color: hex/rgb(a);
--popover-border-color: hex/rgb(a);
```
#### Пагинация
```
--pagination-active-link-border-color: hex/rgb(a);
--pagination-active-link-bg-color: hex/rgb(a);
--pagination-active-link-text-color: hex/rgb(a);
--pagination-link-border-color: hex/rgb(a);
--pagination-link-text-color: hex/rgb(a);
--pagination-link-bg-color: hex/rgb(a);
--pagination-focus-border-color: hex/rgb(a);
--pagination-link-hover-color: hex/rgb(a);
```
#### Индикатор прогресса
```
--progress-striped-animated-color: linear-gradient(deg, rgba %, deg, rgba %, ..., deg, rgba %));
--progress-bg-color: hex/rgb(a);
--progress-bar-color: hex/rgb(a);
```
```
--dropdown-item-hover-text-color: hex/rgb(a);
--dropdown-item-hover-bg-color: hex/rgb(a);
--dropdown-item-text-color: hex/rgb(a);
--dropdown-item-bg-color: hex/rgb(a);
--dropdown-overlay-color: hex/rgb(a);
```
#### Аккордеон
```
--breadcrumb-bg-color: hex/rgb(a);
--breadcrumb-item-text-color: hex/rgb(a);
```
#### Звёзды рейтинга
```
--ratingstar-color: hex/rgb(a);
--rating-star-color: hex/rgb(a);
--ratingstar-star-empty: hex/rgb(a);
--ratingstar-star-filled: hex/rgb(a);
```
#### Карточка
```
--card-bg-color: hex/rgb(a);
--card-text-color: hex/rgb(a);
--card-title-text-color: hex/rgb(a);
--card-body-bg-color: hex/rgb(a);
--card-border-width: hex/rgb(a);
--card-border-style: hex/rgb(a);
--card-border-color: hex/rgb(a);
--card-progress-bar-color: hex/rgb(a);
--card-overlay-bg-color: hex/rgb(a);
--card-overlay-text-color: hex/rgb(a);
--card-overlay-hover-bg-color: hex/rgb(a);
--card-progress-triangle-size: hex/rgb(a);
```
#### Слайдер
```
--slider-text-color: hex/rgb(a);
--input-range-color: hex/rgb(a);
--input-range-active-color: hex/rgb(a);
```
#### Читалка манги
```
--manga-reader-overlay-filter: Filter(px);
--manga-reader-overlay-bg-color: hex/rgb(a);
--manga-reader-overlay-text-color: hex/rgb(a);
--manga-reader-next-highlight-bg-color: hex/rgb(a);
--manga-reader-prev-highlight-bg-color: hex/rgb(a);
```
#### Радиокнопки
```
--radio-accent-color: hex/rgb(a);
--radio-hover-accent-color: hex/rgb(a);
--radio-focus-boxshadow-color: hex/rgb(a);
```
#### Карусель
```
--carousel-header-text-color: hex/rgb(a);
--carousel-header-text-decoration: hex/rgb(a);
--carousel-hover-header-text-decoration: hex/rgb(a);
--carousel-btn-color: hex/rgb(a);
```
#### Просмотр серии
```
--detail-title-color: hex/rgb(a);
--detail-subtitle-color: hex/rgb(a);
```
#### Выдвижная панель (Drawer)
```
--drawer-bg-color: hex/rgb(a);
--drawer-text-color: hex/rgb(a);
```
#### Виджет событий
```
--event-widget-bg-color: hex/rgb(a);
--event-widget-item-bg-color: hex/rgb(a);
--event-widget-text-color: hex/rgb(a);
--event-widget-item-border-color: hex/rgb(a);
--event-widget-border-color: hex/rgb(a);
--event-widget-info-bg-color: hex/rgb(a);
--event-widget-activity-bg-color: hex/rgb(a);
--event-widget-update-bg-color: hex/rgb(a);
--event-widget-error-bg-color: hex/rgb(a);
```
#### Результаты поиска
```
--search-result-text-lite-color: hex/rgb(a);
```
#### Массовый выбор
```
--bulk-selection-highlight-text-color: hex/rgb(a);
--bulk-selection-text-color: hex/rgb(a);
--bulk-selection-bg-color: hex/rgb(a);
```
#### Элемент списка карточек
```
--card-list-item-bg-color: hex/rgb(a);
```
#### Карточка отзыва
```
--review-card-star-color: hex/rgb(a);
--review-spoiler-bg-color: hex/rgb(a);
--review-spoiler-text-color: hex/rgb(a);
```
#### Звезда рейтинга
```
--rating-star-color: hex/rgb(a);
```
#### Бейдж
```
--badge-text-color: hex/rgb(a);
```
#### Контрольные точки (Breakpoints)
```
--setting-mobile-breakpoint: number;
--setting-tablet-breakpoint: number;
--setting-desktop-breakpoint: number;
```
#### Диаграммы
```
--charts-palette1: hex/rgb(a);
--charts-palette2: hex/rgb(a);
--charts-palette3: hex/rgb(a);
--charts-palette4: hex/rgb(a);
--charts-palette5: hex/rgb(a);
--charts-palette6: hex/rgb(a);
--charts-palette7: hex/rgb(a);
```
#### Подсказки
```
--tooltip-bg-color: hex/rgb(a);
--tooltip-outline-color: hex/rgb(a);
--tooltip-caret-color: hex/rgb(a);
```
#### Разное
```
--offwhite-text-color: hex/rgb(a);
```
#### Карточка активности
```
--activity-card-client-platform-badge-bg-color: hex/rgb(a);
--activity-card-client-device-badge-bg-color: hex/rgb(a);
```
## Общая информация о метаданных
Kavita использует метаданные для извлечения названия серии, томов, глав, статуса специального выпуска и т.д.
Kavita считывает метаданные из ваших архивов .cb* (cbz, cbr, cb7, cbt) и epub. Если ваши архивы содержат comicinfo.xml в корне или если ваш epub содержит встроенный файл .opf, это переопределит любую информацию, извлечённую из имени файла.
Вы можете найти множество инструментов для добавления метаданных в разделе [Внешние инструменты](https://wiki.kavitareader.com/guides/external-tools/mangamanager/).
### Преобразование тегов метаданных
Ниже приведён пример того, как общие теги используются в Kavita. Более полную документацию можно найти на соответствующих страницах.
| Тег EPUB | Это | В ComicInfo | Это | Эквивалент в Kavita |
| --- | --- | --- | --- | --- |
| `Description` | → | `Summary` | → | Аннотация |
| `Creators` | → | `Writer` | → | Авторы |
| `Publishers` | → | `Publisher` | → | Издатель |
| `Publication Date` | → | `Month`, `Day`, `Year` | → | Дата выпуска (Год выпуска для серии) |
| `Title` | → | `Title` | → | Название главы |
| `Subjects` | → | `Genre` | → | Жанры |
|  |  | `Tags` | → | Теги |
|  |  | `AgeRating` | → | Возрастной рейтинг |
## ComicInfo
### Таблица преобразования
| В ComicInfo | Это | Эквивалент в Kavita |
| --- | --- | --- |
| `Title` | → | Название главы |
| [`LocalizedSeries`](https://wiki.kavitareader.com/guides/metadata/comics/#non-standard-tags) | → | Локализованное название |
| `Series` или [`SeriesSort`](https://wiki.kavitareader.com/guides/metadata/comics/#non-standard-tags) | → | Название |
| `Number` | → | Номер выпуска/главы |
| [`Count`](https://wiki.kavitareader.com/guides/metadata/comics/#count) | → | Статус публикации |
| `Volume` | → | Том |
| `Summary` | → | Аннотация |
| `Publisher`, `Imprint` | → | Издатель, Импринт |
| `Year`, `Month`, `Day` | → | Дата выпуска ([Год выпуска](https://wiki.kavitareader.com/guides/metadata/comics/#release-year) для серии) |
| `Summary` | → | Аннотация серии из первого выпуска/главы; Аннотация выпуска/главы |
| `Writer`, `Penciller`, `Inker`, `Colorist`, `Letterer`, `Cover Artist`, `Editor`, `Translator` | → | Автор, Художник-постановщик, Контуровщик, Колорист, Леттерер, Художник обложки, Редактор, Переводчик |
| `Genre` | → | Жанры |
| `Tags` | → | Теги |
| `Web` | → | Веб-ссылки (Также используется для сопоставления в CBL) |
| `PageCount` | → | Объём (Это агрегируется на уровне серии) |
| `LanguageISO` | → | Язык |
| [`Format`](https://wiki.kavitareader.com/guides/metadata/comics/#format) | → | Специальный выпуск |
| [`SeriesGroup`](https://wiki.kavitareader.com/guides/metadata/comics/#seriesgroup) | → | Коллекции |
| [`StoryArc/StoryArcNumber`](https://wiki.kavitareader.com/guides/admin-settings/libraries/#manage-readinglists) | → | Списки для чтения |
| [`AlternativeSeries/AlternativeCount`](https://wiki.kavitareader.com/guides/admin-settings/libraries/#manage-readinglists) | → | Списки для чтения |
| [`AgeRating`](https://wiki.kavitareader.com/guides/metadata/comics/#age-rating) | → | Возрастной рейтинг |
| `GTIN` | → | ISBN |
### Нестандартные теги
- `<LocalizedSeries>`: Содержит необязательное локализованное название серии, которое будет отображаться в Kavita. Позволит выполнять поиск по любому из названий серии. Позволит группировать файлы, имеющие локализованное название и название серии, как одну серию.
- `<SeriesSort>`: Заголовок для сортировки серии. Kavita будет предпочитать его тегу `<Series>`
### Count
Kavita установит для вас статус публикации серии на основе этого тега:
- Если у вас определён хотя бы один «Count» в любом ComicInfo из серии, и он не равен 0, то Kavita предположит, что серия завершена. В противном случае она будет считаться продолжающейся.
- Если Count совпадает с количеством томов или глав, то Kavita предположит, что серия завершена (у вас есть все элементы серии)
- В идеале значение этого поля должно быть общим количеством томов (для манги) или выпусков (для комиксов)
В любой момент вы можете навести курсор на бейдж тега в деталях серии, чтобы увидеть, сколько выпусков или томов вам не хватает.
### Год выпуска
Так же, как и с возрастным рейтингом, год выпуска — это сумма минимального года, определённого в серии, который состоит как минимум из 4 символов (> 1000).
### Format
Если указан формат, этот выпуск или том может быть принудительно обработан как специальный выпуск.
Следующие значения вызовут это:
- Special
- Reference
- Director's Cut
- Box Set
- Box-Set
- Annual
- Anthology
- Epilogue
- One Shot
- One-Shot
- Prologue
- TPB
- Trade Paper Back
- Omnibus
- Compendium
- Absolute
- Graphic Novel
- GN
- FCBD
### Trade Paperbacks и тип библиотеки «Комиксы»
Основной тип библиотеки `Comic` предполагает организацию, аналогичную той, что используется в Comic Vine, Grand Comics Database и Metron. Они обычно перечисляют сборники как отдельные тома, что при использовании `Series` из ComicInfo, дополненного `volume` (предположительно с тегом года), как это делает основной тип библиотеки комиксов, превращается в отдельную серию.
Если вы используете автотегирование или Mylar3 для управления своими архивами, Kavita будет распознавать ваши trade paperbacks как отдельные серии.
Чтобы включить их в основную серию, наши пользователи нашли два разных подхода.
Метод 1:
Первый способ — пометить `Series` и `Volume` для вашего сборника так же, как вы это делаете для отдельных выпусков, поместив в значение `Number` диапазон охваченных выпусков. В приведённом ниже примере это будет означать, что выпуски 1-5 собраны в этом одном файле. Это обеспечит сортировку так, чтобы эти сборники находились в правильном порядке чтения при чтении со страницы серии.
`Number: 1-5`
Метод 2:
Второй метод, для тех, кто собирает как сборники, так и отдельные выпуски и хочет, чтобы всё это было в одной серии в Kavita, — снова пометить `Series` и `Volume` в соответствии с остальными файлами, а для `Number` использовать значение вроде `TPB` или `TPB#` для серий с несколькими TPB. Это не будет смешивать сборники в порядок чтения, оставляя их отделёнными от отдельных выпусков, но при этом доступными со страницы серии или загружаемыми следующими после окончания выпусков.
`Number: TPB1` `Number: TPB2`
### SeriesGroup
Тег SeriesGroup может содержать строки, разделённые запятыми, которые создадут или обновят существующие коллекции в Kavita, если в библиотеке включено «Управление коллекциями» (по умолчанию выключено).
### Возрастной рейтинг
Возрастной рейтинг может различаться для разных файлов в рамках одной серии. Серия возьмёт наивысший возрастной рейтинг (т.е. самый «взрослый») из содержащихся в ней файлов и будет использовать его. Например, допустим, у вас есть:
Текущие теги от менее ограничительного к более ограничительному:
- Выпуск 1 - PG
- Выпуск 2 - PG
- Выпуск 3 - M
Серия будет иметь рейтинг M, так как это самый «взрослый» рейтинг среди всех выпусков.
Возрастной рейтинг от наименее зрелого к наиболее зрелому. Порядок фиксирован в соответствии со стандартом ComicInfo.xml.
- Unknown
- Rating Pending
- Early Childhood
- Everyone
- G
- Everyone 10+
- PG
- Kids to Adults
- Teen
- MA15+
- Mature 17+
- M
- R18+
- Adults Only 18+
- X18+
## OPF
### Таблица преобразования
| В OPF | Это | Эквивалент в Kavita |
| --- | --- | --- |
| `dc:title` (может быть переопределён `calibre:series` или `belongs-to-collection` meta) | → | Название главы |
| `calibre:series` | → | Название |
| `calibre:series_index` | → | Том |
| `dc:description` | → | Аннотация |
| `dc:publisher` | → | Издатель |
| `Year`, `Month`, `Day` | → | Дата выпуска ([Год выпуска](https://wiki.kavitareader.com/guides/metadata/comics/#release-year) для серии) |
| `Summary` | → | Аннотация серии из первого выпуска/главы; Аннотация выпуска/главы |
| `dc:creator` | → | Автор |
| `dc:subject` | → | Жанры |
| `dc:language` | → | Язык (Kavita возьмёт только первый) |
| `dc:identifier opf:scheme="isbn` | → | ISBN |
В epub вы можете расширить информацию о людях не только сопоставлением автора и издателя, но и поддержкой следующих ролей:
- art/artist
- aut/author
- pbl/publisher
- trl/translator
- edt/editor
- ill/illustrator
- clr/colorist
Для этого необходимо уточнить существующий тег `dc:creator` с помощью тега `meta`. Оба должны существовать, иначе создатель будет обработан просто как автор. См. ниже: мы определим, что есть редактор:
```
<dc:creator id="id-1">Miya Kazuki</dc:creator>
<meta refines="#id-1" property="role" scheme="marc:relators">editor</meta>
```
Для библиотек, которым разрешено управлять коллекциями и списками для чтения (и Kavita v0.7.3+), Kavita может использовать для этого поля метаданных epub.
В следующем примере у нас есть только один заголовок и meta-тег для уточнения этого заголовка и указания, что он используется для коллекции. Только с этим Kavita сгенерирует тег `Collection`.
```
<dc:title id="t1">A Dictionary of Modern English Usage</dc:title>
<meta refines="#t1" property="title-type">collection</meta>
```
Если вы добавите дополнительный тег `display-seq`, то Kavita будет обрабатывать коллекцию как список для чтения и сгенерирует список для чтения в следующем порядке. Обратите внимание: если у вас есть конфликты, Kavita автоматически переупорядочит элементы, поэтому порядок может быть искажён.
```
<meta refined="#t1" property="display-seq">1</meta>
```
### Группировка серий
Некоторые книги принадлежат к одной серии, как в примере с Гарри Поттером. Конечно, мы можем сделать каждую книгу отдельной серией, но иногда лучше сгруппировать их под одной серией. Идеальный способ выполнить такую группировку — использовать `calibre:series` и `calibre:series_index` или `belongs-to-collection` и `group-position` для файлов Epub 3.2. В следующем примере мы можем сгруппировать наши 2 книги о Гарри Поттере как одну серию «Гарри Поттер» (я использую Epub 2 для первой и Epub 3+ для второй):
```
<dc:title id="id">Harry Potter and the Philosopher's Stone</dc:title>
<meta name="calibre:series">Harry Potter</meta>
<meta name="calibre:series_index">1</meta>
```
```
<dc:title id="id">Harry Potter and the Chamber of Secrets</dc:title>
<meta property="belongs-to-collection" id="id-5">Harry Potter</meta>
<meta refines="#id-5" property="group-position">2</meta>
```
### Специальные выпуски
Чтобы Kavita отображала вкладку «Специальные выпуски» для серии, должны быть соблюдены следующие условия:
1. Имя файла ДОЛЖНО содержать маркеры SP (SP01, SP02 и т.д.)
2. Внутренние метаданные должны иметь установленный тег `calibre:series` на серию, в которую он должен быть включён, и `calibre:series_index` со значением `100000`
3. Тег title должен быть установлен с названием специального выпуска
```
<meta name="calibre:series">Harry Potter</meta>
<meta name="calibre:series_index">100000</meta>
<dc:title>Harry Potter: A day in the life</dc:title>
```
Аналогично, вы можете использовать теги Epub3:
```
<dc:title id="id">Special Title Here</dc:title>
<meta property="belongs-to-collection" id="id-5">Harry Potter</meta>
<meta refines="#id-5" property="group-position">100000</meta>
```
## PDF
### Таблица преобразования
| В PDF | Флаг `ebook-meta` | Эквивалент в Kavita |
| --- | --- | --- |
| `dc:title` (может быть переопределён `calibre:series`) | `--title` или `-t` | Название главы |
| `calibre:series` | `--series` или `-s` | Название |
| `calibreSI:series_index` | `--index` или `-i` | Том |
| `calibre:rating` | `--rating` или `-r` | Пользовательский рейтинг |
| `dc:description` | `--comments` или `-c` | Аннотация |
| `dc:publisher` | `--publisher` или `-p` | Издатель |
| `Year`, `Month`, `Day` | `--date` или `-d` | Дата выпуска ([Год выпуска](https://wiki.kavitareader.com/guides/metadata/comics/#release-year) для серии) |
| `dc:creator` | `--author` или `-a` | Автор |
| `dc:subject` | `--tags` | Жанры |
| `dc:language` | `--language` или `-l` | Язык (Kavita возьмёт только первый) |
| `pdfx:isbn` или `prism:isbn` | `--isbn` | ISBN |
Вы можете изменять только один файл за раз, но можете устанавливать несколько флагов одновременно.
**Пример команды `ebook-meta`**
```
ebook-meta -t "My Title" -a "Jane Doe" -s "Great Literature" -i 2.00 "filename with spaces.pdf"
```
Некоторые флаги (например, `--author` и `--tags`) могут принимать несколько аргументов. Чтобы установить несколько аргументов в каждом теге, вы можете разделить их запятыми. Обязательно заключите их в кавычки.

