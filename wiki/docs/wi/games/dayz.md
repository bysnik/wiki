# Dayz

![](https://i.imgur.com/BvVmvC5.png)

## Установка DayZ сервера

### Загрузить SteamCMD

**ALT Linux:**
```bash
apt-get install gcc gdb i586-glibc i585-glibc-pthread
```

После установки этих пакетов выполните следующие действия:

```bash
mkdir -p ~/servers/steamcmd && cd ~/servers/steamcmd
curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -
```

### Скачать сервер DayZ

> **ℹ Примечание:** Вместо `your_login` необходимо указать ваш логин Steam.
> 
> Обновление сервера выполняется с помощью тех же команд, что и установка.

#### Без модов

**Стабильная ветка:**
```bash
~/servers/steamcmd/steamcmd.sh +force_install_dir ~/servers/dayz-server/ +login your_login +app_update 223350 +quit
```

**Экспериментальная ветвь:**
```bash
~/servers/steamcmd/steamcmd.sh +force_install_dir ~/servers/dayz-server/ +login your_login +app_update 1042420 +quit
```

#### С модами

Давайте установим два мода на стабильную ветку: Community Framework и Community Online Tools:

```bash
~/servers/steamcmd/steamcmd.sh +force_install_dir ~/servers/dayz-server/ +login your_login +app_update 223350 +workshop_download_item 221100 1559212036 +workshop_download_item 221100 1564026768 +quit
```

### Запустить сервер DayZ

> **⚠ Важно:** Не забудьте настроить сервер перед запуском.

#### Без модов

```bash
cd ~/servers/dayz-server/
./DayZServer -config=serverDZ.cfg -port=2301 -BEpath=battleye -profiles=profiles -dologs -adminlog -netlog -freezecheck
```

#### С модами

В этом примере по-прежнему будут два мода: Community Framework и Community Online Tools.

```bash
cd ~/servers/dayz-server/
ln -s ~/servers/dayz-server/steamapps/workshop/content/221100/1559212036 ~/servers/dayz-server/1559212036
ln -s ~/servers/dayz-server/steamapps/workshop/content/221100/1564026768 ~/servers/dayz-server/1564026768
ln -s ~/servers/dayz-server/steamapps/workshop/content/221100/1559212036/keys/* ~/servers/dayz-server/keys/
./DayZServer -config=serverDZ.cfg -port=2301 "-mod=1559212036;1564026768;" -BEpath=battleye -profiles=profiles -dologs -adminlog -netlog -freezecheck
```

`Ctrl+C` - Закрыть сервер.

### Как демон с перезапуском и автоматическим обновлением

> **ℹ Примечание:** 
> - Вместо `your_login` необходимо указать ваш логин Steam.
> - Вместо `your_username` должно быть ваше имя пользователя в ОС.

#### Создайте начальные сценарии

**В зависимости от модов:**

**Без модов:** `nano ~/servers/dayz-server/update.sh`
```bash
/home/your_username/servers/steamcmd/steamcmd.sh +force_install_dir /home/your_username/servers/dayz-server/ +login your_login +app_update 223350 +quit
```

**С модами:** `nano ~/servers/dayz-server/update.sh`
```bash
/home/your_username/servers/steamcmd/steamcmd.sh +force_install_dir /home/your_username/servers/dayz-server/ +login your_login +app_update 223350 +workshop_download_item 221100 1559212036 +workshop_download_item 221100 1564026768 +quit
rm /home/your_username/servers/dayz-server/1559212036 /home/your_username/servers/dayz-server/1564026768 /home/your_username/servers/dayz-server/keys/Jacob_Mango_V3.bikey
ln -s /home/your_username/servers/dayz-server/steamapps/workshop/content/221100/1559212036 /home/your_username/servers/dayz-server/1559212036
ln -s /home/your_username/servers/dayz-server/steamapps/workshop/content/221100/1564026768 /home/your_username/servers/dayz-server/1564026768
ln -s /home/your_username/servers/dayz-server/steamapps/workshop/content/221100/1559212036/keys/* /home/your_username/servers/dayz-server/keys/
```

`Ctrl+O` → `Enter` → `Ctrl+X`

```bash
sudo chmod +x ~/servers/dayz-server/update.sh
```

#### Создаем сервис

```bash
sudo nano /etc/systemd/system/dayz-server.service
```

```ini
[Unit]
Description=Выделенный сервер DayZ
Wants=network-online.target
After=syslog.target network.target nss-lookup.target network-online.target

[Service]
ExecStartPre=/home/your_username/servers/dayz-server/update.sh
ExecStart=/home/your_username/servers/dayz-server/DayZServer -config=serverDZ.cfg -port=2301 "-mod=1559212036;1564026768;" -BEpath=battleye -profiles=profiles -dologs -adminlog -netlog -freezecheck
WorkingDirectory=/home/your_username/servers/dayz-server/
LimitNOFILE=100000
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s INT $MAINPID
User=your_username
Group=users
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
```

#### Команды управления демоном

- `sudo systemctl enable dayz-server` — включает автозапуск сервера при запуске ОС.
- `sudo systemctl disable dayz-server` - Отключает автозапуск сервера при запуске ОС.
- `sudo systemctl start dayz-server` - Запуск сервера.
- `sudo systemctl restart dayz-server` - Перезапуск сервера.
- `sudo systemctl stop dayz-server` - Остановка сервера.
- `sudo systemctl status dayz-server` - Проверка состояния сервера.


## Конфигурирование сервера

> **⚠ Важно:** Настоятельно рекомендуется использовать метод корректного завершения работы, чтобы избежать негативных последствий для персонажей игроков и экономии места на сервере.

### Основные сведения

Имя `serverDZ.cfg` ничего не значит, и этот файл может называться как угодно. Настоящее имя определяется опцией командной строки `-config` при запуске выделенного сервера. Имя по умолчанию отсутствует; если не указано иное, сервер не запустится из-за обязательных настроек.

### Конфигурация

#### Основные параметры

```cpp
hostname = "EXAMPLE NAME"; // Имя сервера
description = "Some description"; // Описание сервера. Отображается пользователям в браузере клиента-сервера, максимальная длина — 255 символов.
password = ""; // Пароль для подключения к серверу
passwordAdmin = ""; // Пароль для доступа к администратору сервера

enableWhitelist = 0; // Включить/отключить белый список (значение 0-1)
disableBanlist = false; // Отключает использование ban.txt (по умолчанию: false)
disablePrioritylist = false; // Отключает использование priority.txt (по умолчанию: false)

maxPlayers = 60; // Максимальное количество игроков
verifySignatures = 2; // Проверяет .pbos на соответствие файлам .bisign. (поддерживается только 2)

forceSameBuild = 1; // Если этот параметр включен, сервер разрешит подключение только клиентам с той же версией .exe, что и у сервера (значение 0-1)

disableVoN = 0; // Включить/отключить передачу голоса по сети (значение 0-1)
vonCodecQuality = 20; // Качество кодека передачи голоса по сети, чем выше, тем лучше (значения 0-20)

disable3rdPerson = 0; // Включает вид от третьего лица для игроков (значение 0-1)
disableCrosshair = 0; // Включает/выключает перекрестие (значение 0-1)

serverTime = "SystemTime"; // Начальное игровое время сервера. "SystemTime" означает локальное время машины.
// Другая возможность — установить время в формате "ГГГГ/ММ/ДД/ЧЧ/ММ", например, "2015/4/8/17/23".

serverTimeAcceleration = 1; // Ускоренное время — числовое значение, являющееся множителем (0,1-64).
// Таким образом, если установить его равным 24, время будет идти в 24 раза быстрее обычного. Целый день пройдёт за один час.

serverNightTimeAcceleration = 1; // Ускоренное ночное время — числовое значение является множителем (0,1-64) и также умножается на значение serverTimeAcceleration.
// Таким образом, если задано значение 4, а serverTimeAcceleration — значение 2, ночное время будет наступать в 8 раз быстрее обычного.
// Вся ночь пройдет за 3 часа.

serverTimePersistent = 0; // Постоянное время (значение 0-1) — фактическое время сервера сохраняется в хранилище, поэтому, если активно, при следующем запуске сервера будет использоваться сохраненное значение времени.

GuaranteedUpdates = 1; // Протокол связи, используемый с игровым сервером (используйте только цифру 1)

loginQueueConcurrentPlayers = 5; // Количество игроков, одновременно обрабатываемых во время процесса входа в систему.
// Должно предотвратить значительное падение производительности во время подключения, когда много людей подключаются одновременно.

loginQueueMaxPlayers = 500; // Максимальное количество игроков, которые могут ожидать в очереди на вход

instanceId = 1; // Идентификатор экземпляра сервера DayZ для определения количества экземпляров на сервере и их папок хранения с файлами сохранения

storageAutoFix = 1; // Проверяет, повреждены ли файлы сохранения, и заменяет поврежденные файлы пустыми (значение 0-1)
```

#### Классовые миссии

```cpp
class Missions 
{
    class DayZ 
    {
        template = "dayzOffline.chernarusplus"; // Миссия для загрузки при запуске сервера. <MissionName>.<TerrainName>
    };
};
```

#### Дополнительные параметры

```cpp
respawnTime = 5; // Устанавливает задержку возрождения (в секундах), прежде чем игрок сможет получить нового персонажа на сервере, если предыдущий мертв

motd[] = {"line1", "line2"}; // Сообщение дня, отображаемое в игровом чате
motdInterval = 1; // Временной интервал (в секундах) между каждым сообщением

timeStampFormat = "Short"; // Формат временных меток в файле .rpt (значение Full/Short)
logAverageFps = 1; // Регистрирует средний FPS сервера (значение в секундах), необходимо иметь активный параметр запуска ''-doLogs''
logMemory = 1; // Регистрирует использование памяти сервера (значение в секундах), необходимо иметь активный параметр запуска ''-doLogs''
logPlayers = 1; // Регистрирует количество текущих подключенных игроков (значение в секундах), необходимо иметь активный параметр запуска ''-doLogs''
logFile = "server_console.log"; // Сохраняет журнал консоли сервера в файл в папке с другими журналами сервера

adminLogPlayerHitsOnly = 0; // 1 - регистрировать только попадания игрока / 0 - регистрировать все попадания (животные/зараженные)
adminLogPlacement = 0; // 1 - регистрировать действия по размещению (ловушки, палатки)
adminLogBuildActions = 0; // 1 - регистрировать действия по строительству базы (строительство, демонтаж, уничтожение)
adminLogPlayerList = 0; // 1 - регистрировать периодический список игроков с позицией каждые 5 минут

disableMultiAccountMitigation = false; // отключает смягчение атак с несколькими учетными записями на консолях, если true (по умолчанию: false)

enableDebugMonitor = 1; // показывает информацию о персонаже с помощью окна отладки в углу экрана (значение 0-1)

steamQueryPort = 2305; // определяет порт запроса Steam, должно исправить проблему с отображением сервера в браузере клиент-сервера

allowFilePatching = 1; // если установлено значение 1, то будет разрешено подключение клиентов с включенным параметром запуска "-filePatching"

simulationdPlayersBatch = 20; // Установить ограничение на количество игроков, которые можно симулировать за кадр (для повышения производительности сервера)

multithreadedReplication = 1; // включает многопоточную обработку системы репликации сервера
// количество рабочих потоков определяется настройками jobsystem в dayzSettings.xml параметрами "maxcores" и "reservedcores" (значения 0-1)
speedhackDetection = 1; // включает обнаружение спидхака, значения 1-10 (1 строгое, 10 благоприятное, может быть плавающим)

networkRangeClose = 20; // сетевое расстояние пузыря для появления близких объектов с предметами в них (например, рюкзаки), задается в метрах, значение по умолчанию, если не установлено, равно 20
networkRangeNear = 150; // сетевое расстояние пузыря для появления (удаления +10%) близких объектов предметов инвентаря, задается в метрах, значение по умолчанию, если не установлено, равно 150
networkRangeFar = 1000; // сетевое расстояние пузыря для появления (удаления +10%) далеких объектов (кроме предметов инвентаря), задается в метрах, значение по умолчанию, если не установлено, равно 1000
networkRangeDistantEffect = 4000; // сетевое расстояние пузыря для появления эффектов (в настоящее время только звуковые эффекты), задается в метрах, значение по умолчанию, если не установлено, равно 4000
networkObjectBatchLogSlow = 5; // Максимальное время итерации пузырька в секундах, прежде чем он будет выведен на консоль
networkObjectBatchEnforceBandwidthLimits = 1; // Включает ограничитель для создания объектов на основе статистики пропускной способности
networkObjectBatchUseEstimatedBandwidth = 0; // Переключение между методами определения использования пропускной способности соединения. Если установлено значение 0, будет использоваться общий объем фактических данных, отправленных с момента последнего серверного кадра, а если установлено значение 1, будет использоваться грубая оценка
networkObjectBatchUseDynamicMaximumBandwidth = 1; // Определяет, должно ли ограничение пропускной способности быть множителем максимальной пропускной способности, которая может быть отправлена, или жестким ограничением. Максимальная пропускная способность, которая может быть отправлена, колеблется в зависимости от спроса в системе.
networkObjectBatchBandwidthLimit = 0.8; // Фактический предел может быть значением [0,1] или [1,inf] в зависимости от networkObjectBatchUseDynamicMaximumBandwidth. См. выше
networkObjectBatchCompute = 1000; // Количество объектов в списках создания/удаления, проверяемых в одном фрейме сервера
networkObjectBatchSendCreate = 10; // Максимальное количество объектов, которые можно отправить на создание
networkObjectBatchSendDelete = 10; // Максимальное количество объектов, которые можно отправить на удаление

defaultVisibility = 1375; // максимальная дальность прорисовки ландшафта на сервере (если выше, чем "viewDistance=" в профиле клиента DayZ, применяется клиентский параметр)
defaultObjectViewDistance = 1375; // максимальная дальность прорисовки объекта на сервере (если выше, чем "preferredObjectViewDistance=" в профиле клиента DayZ, применяется клиентский параметр)

lightingConfig = 0; // 0 для более яркой ночи, 1 для более темной ночи, 2 для освещения, специфичного для Сахалина - если включен enableCfgGameplayFile, этот параметр будет переопределен значением WorldsData::lightingConfig
disablePersonalLight = 1; // отключает персональное освещение для всех клиентов, подключенных к серверу

disableBaseDamage = 0; // установите значение 1, чтобы отключить повреждение/разрушение забора и сторожевой башни
disableContainerDamage = 0; // установите значение 1, чтобы отключить повреждение/разрушение палаток, бочек, деревянных ящиков и сундуков
disableRespawnDialog = 0; // установите значение 1, чтобы отключить диалог возрождения (новые персонажи будут появляться случайным образом)

pingWarning = 200; // устанавливает значение пинга, при котором срабатывает начальное предупреждение о желтом пинге (значение в миллисекундах)
pingCritical = 250; // устанавливает значение пинга, при котором срабатывает предупреждение о красном пинге (значение в миллисекундах)
MaxPing = 300; // устанавливает значение пинга, при котором игрок выкидывается с сервера (значение в миллисекундах)
serverFpsWarning = 15; // устанавливает значение fps сервера, при котором срабатывает начальное предупреждение о fps сервера (минимальное значение — 11)

shotValidation = 1; // 1 включает проверку, 0 отключает
clientPort = 2304; // значение int, принудительно указывает порт, к которому подключаются клиенты
```

### XML-конфигурация

#### dayzsettings.xml

```xml
<jobsystem globalqueue="4096" threadqueue="1024">
    <pc maxcores="4" reservedcores="1" />
    <!-- 
        maxcores - максимальное количество ядер ЦП, которые будут использоваться для jobsystem 
        reservedcores - количество ядер ЦП, которые будут использоваться для других потоков

        Число рабочих потоков тогда равно «maxcores - reservedcores», но по крайней мере один рабочий поток все равно будет выделен 
    -->
</jobsystem>
```

### Конфигурация BattlEye

Файл конфигурации `BEServer_x64.cfg` должен находиться в той же папке, что и `BEServer_x64.dll`. Расположение этой папки можно настроить с помощью параметров запуска `-bePath` и `-profiles`.

**Поддерживаемые параметры:**

- `RConPassword MyPassword` — устанавливает пароль для подключения инструмента RCon (инструмент удаленного администрирования подключений, такой как BEC/Dart)
- `RestrictRCon 1` — включает/отключает функции RCon (удаление/бан/ограничения подключения)

## Параметры запуска

- `-config=serverDZ.cfg` — выбирает файл конфигурации сервера
- `-port=2302` — порт, который будет прослушиваться выделенным сервером
- `-profiles=%userProfile%\Documents\DayZServer` — Путь к папке с профилем сервера. По умолчанию логи сервера записываются в каталог профиля сервера. Там же будут создаваться логи, дампы и т.д., а также файлы, связанные с BattlEye/BEC/Rcon.
- `-mission=` — определяет миссию, используемую сервером.
- `-doLogs` — включает все сообщения журнала в RPT-файле сервера.
- `-adminLog` — включает журнал администратора
- `-netLog` — включает ведение журнала сетевого трафика.
- `-freezeCheck` — останавливает сервер, если он завис более чем на 5 минут, и создает файл дампа.
- `-filePatching` — обеспечивает загрузку только PBO-объектов, а не распакованных данных.
- `-BEpath=` — задаёт пользовательский путь к файлам BattlEye.
- `-cpuCount=` — задаёт количество логических ядер ЦП, используемых для параллельной обработки задач. Оно должно быть меньше или равно количеству доступных ядер.
- `-limitFPS=` — ограничивает FPS сервера указанным значением (текущий максимум — 200), чтобы снизить загрузку ЦП на серверах с низкой численностью пользователей.
- `-mod=<string>` — Загружает указанные подпапки для разных модов. Разделяются точкой с запятой. Возможны абсолютный путь и несколько папок, расположенных друг над другом.
- `-serverMod=<string>` — загружает указанные подпапки для различных серверных модов (не транслируемых клиентам). Разделяются точкой с запятой. Возможны абсолютные пути и несколько папок, расположенных друг над другом.
- `-storage=` — определяет пользовательскую корневую папку для хранения.

> **ℹ Примечание:** Можно определить пакетную переменную в файле .bat и использовать ее в аргументах конфигурации запуска exe-файла сервера, например:
> ```batch
> set missionLocation=%userProfile%\Documents\DayZ\Stable\mpmissions\dayzOffline.enoch
> ...
> DayZServer_x64.exe -mission=%missionLocation%
> ```

### Приоритетная очередь

Указанным пользователям можно назначить приоритет в очереди входа, они окажутся на первой позиции, перед неприоритетными пользователями.

Отмеченных пользователей просто нужно добавить в файл `priority.txt`, расположенный в корневом каталоге установки сервера.

**Формат:**
```
SteamId ; SteamId ; 01234567 890123456 ; 01234567 890123456
```

