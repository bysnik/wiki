---
outline: deep
---

# Dayz

![](https://i.imgur.com/BvVmvC5.png)

## Установка сервера DayZ

### Шаг 1: Установка SteamCMD

SteamCMD — это инструмент командной строки от Valve для загрузки и обновления игровых серверов.

**Для ALT Linux (установка необходимых пакетов):**
Обновляем список пакетов и устанавливаем зависимости, необходимые для работы SteamCMD
```bash
apt-get install gcc gdb i586-glibc-*
```
**Для Debian (установка необходимых пакетов):**
```bash
sudo apt-get install lib32gcc-s1
```
**Для RHEL (установка необходимых пакетов):**
```bash
sudo yum install glibc.i686 libstdc++.i686
```
**Для Arch Linux (установка необходимых пакетов):**
```bash
sudo pacman -Syy glibc lib32-glibc nano
```

**Далее выполняем следующие действия для всех дистрибутивов Linux:**
Создаем директорию для SteamCMD и переходим в нее
```bash
mkdir -p ~/servers/steamcmd && cd ~/servers/steamcmd
```
Загружаем архив SteamCMD напрямую с серверов Steam и сразу же распаковываем его
```bash
curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -
```

---

### Шаг 2: Загрузка сервера DayZ

> **ℹ Важное примечание:** Замените `your_login` в командах на ваш настоящий логин от Steam. Если у Steam Guard включена двухфакторная аутентификация, вам потребуется ввести код.
>
> **Важно:** Процесс обновления сервера идентичен процессу установки — просто выполните ту же команду заново.

#### Вариант 2.1: Установка без модов

**Для стабильной версии игры (рекомендуется для production-сервера):**
- +force_install_dir - указывает путь установки
- +login - выполняет вход в Steam
- +app_update 223350 - загружает/обновляет приложение с ID 223350 (стабильный сервер DayZ)
- +quit - закрывает SteamCMD после завершения
```bash
~/servers/steamcmd/steamcmd.sh +force_install_dir ~/servers/dayz-server/ +login your_login +app_update 223350 +quit
```

**Для экспериментальной версии (для тестирования новых обновлений):**
Используется app_update 1042420 (экспериментальный сервер DayZ)
```bash
~/servers/steamcmd/steamcmd.sh +force_install_dir ~/servers/dayz-server/ +login your_login +app_update 1042420 +quit
```

#### Вариант 2.2: Установка с модами

В этом примере мы установим два популярных мода: `Community Framework` и `Community Online Tools`.
Команда дополнена параметрами:
- +workshop_download_item 221100 <ID_мода> - загружает мод с указанным ID из мастерской (221100 — это ID игры DayZ в Steam)
```bash
~/servers/steamcmd/steamcmd.sh +force_install_dir ~/servers/dayz-server/ +login your_login +app_update 223350 +workshop_download_item 221100 1559212036 +workshop_download_item 221100 1564026768 +quit
```

---

### Шаг 3: Запуск сервера DayZ

> **⚠ ВАЖНО:** Перед первым запуском обязательно настройте файлы конфигурации (файл `serverDZ.cfg`), указав название сервера, пароль, количество слотов и другие параметры.

#### Вариант 3.1: Запуск без модов
Переходим в директорию с сервером
```bash
cd ~/servers/dayz-server/
```
Запускаем исполняемый файл сервера с параметрами:
- -config=serverDZ.cfg - указывает основной файл конфигурации
- -port=2302 - задает игровой порт (UDP)
- -BEpath=battleye - путь к файлам BattlEye (античит)
- -profiles=profiles - папка с профилями сервера (логи, конфиги)
- -dologs -adminlog -netlog - включает ведение различных логов
- -freezecheck - включает проверку "зависаний"
```bash
./DayZServer -config=serverDZ.cfg -port=2302 -BEpath=battleye -profiles=profiles -dologs -adminlog -netlog -freezecheck
```

#### Вариант 3.2: Запуск с модами

Перед запуском необходимо создать символические ссылки на моды в корневой папке сервера, чтобы игровой клиент и сервер могли их правильно загрузить.
Переходим в директорию с сервером
```bash
cd ~/servers/dayz-server/
```
Создаем символическую ссылку на папку с модом "Community Framework" (ID 1559212036)
```bash
ln -s ~/servers/dayz-server/steamapps/workshop/content/221100/1559212036 ~/servers/dayz-server/1559212036
```
Создаем символическую ссылку на папку с модом "Community Online Tools" (ID 1564026768)
```bash
ln -s ~/servers/dayz-server/steamapps/workshop/content/221100/1564026768 ~/servers/dayz-server/1564026768
```
Создаем символические ссылки на файлы ключей (.bikey) из папки мода в папку /keys/ сервера.
Это необходимо для того, чтобы сервер знал о доверенных модах.
```bash
ln -s ~/servers/dayz-server/steamapps/workshop/content/221100/1559212036/keys/* ~/servers/dayz-server/keys/
```
Запускаем сервер с дополнительным параметром:
- "-mod=1559212036;1564026768;" - список ID модов для загрузки, разделенных точкой с запятой
```bash
./DayZServer -config=serverDZ.cfg -port=2301 "-mod=1559212036;1564026768;" -BEpath=battleye -profiles=profiles -dologs -adminlog -netlog -freezecheck
```

**Для остановки сервера** нажмите комбинацию клавиш `Ctrl+C`.

---

### Шаг 4: Настройка сервера в качестве службы (демона) с автообновлением

Этот метод позволяет серверу автоматически запускаться при загрузке системы, перезапускаться в случае сбоев и обновляться перед каждым запуском.

> **ℹ Примечание:**
> - Замените `your_login` на ваш логин Steam.
> - Замените `your_username` на ваше имя пользователя в операционной системе.

#### Шаг 4.1: Создание скрипта для обновления

Создадим скрипт, который будет отвечать за обновление игрового сервера и модов.
Создаем и открываем файл скрипта в редакторе nano
**Для сервера без модов:**
```bash
nano ~/servers/dayz-server/update.sh
```
Вставьте в файл следующее содержимое:
```bash
#!/bin/bash
# Скрипт обновления сервера DayZ
/home/your_username/servers/steamcmd/steamcmd.sh +force_install_dir /home/your_username/servers/dayz-server/ +login your_login +app_update 223350 +quit
```

**Для сервера с модами:**
```bash
nano ~/servers/dayz-server/update.sh
```
Вставьте в файл следующее содержимое:
```bash
#!/bin/bash
# Скрипт обновления сервера DayZ и модов

# Обновляем сервер и загружаем моды через SteamCMD
/home/your_username/servers/steamcmd/steamcmd.sh +force_install_dir /home/your_username/servers/dayz-server/ +login your_login +app_update 223350 +workshop_download_item 221100 1559212036 +workshop_download_item 221100 1564026768 +quit

# Удаляем старые символические ссылки на моды и ключи (если они существуют)
rm -f /home/your_username/servers/dayz-server/1559212036 /home/your_username/servers/dayz-server/1564026768 /home/your_username/servers/dayz-server/keys/Jacob_Mango_*

# Создаем новые символические ссылки на моды
ln -sf /home/your_username/servers/dayz-server/steamapps/workshop/content/221100/1559212036 /home/your_username/servers/dayz-server/1559212036
ln -sf /home/your_username/servers/dayz-server/steamapps/workshop/content/221100/1564026768 /home/your_username/servers/dayz-server/1564026768

# Создаем символические ссылки на файлы ключей
ln -sf /home/your_username/servers/dayz-server/steamapps/workshop/content/221100/1559212036/keys/* /home/your_username/servers/dayz-server/keys/
```

**Чтобы сохранить файл в редакторе nano:** Нажмите `Ctrl+O`, затем `Enter` для подтверждения имени файла. Для выхода нажмите `Ctrl+X`.
Делаем скрипт исполняемым
```bash
sudo chmod +x ~/servers/dayz-server/update.sh
```

#### Шаг 4.2: Создание и настройка службы systemd

Создадим файл службы, который будет управлять жизненным циклом нашего сервера.

Создаем и открываем конфигурационный файл службы
```bash
sudo nano /etc/systemd/system/dayz-server.service
```

Скопируйте и вставьте следующую конфигурацию в файл, не забыв заменить `your_username` и, при необходимости, параметры запуска (например, список модов `-mod`).

```ini
[Unit]
Description=Выделенный сервер DayZ
Wants=network-online.target
After=syslog.target network.target nss-lookup.target network-online.target

[Service]
# Выполняем скрипт обновления ПЕРЕД каждым запуском сервера
ExecStartPre=/home/your_username/servers/dayz-server/update.sh
# Основная команда для запуска серверного процесса
ExecStart=/home/your_username/servers/dayz-server/DayZServer -config=serverDZ.cfg -port=2301 "-mod=1559212036;1564026768;" -BEpath=battleye -profiles=profiles -dologs -adminlog -netlog -freezecheck
# Рабочая директория службы
WorkingDirectory=/home/your_username/servers/dayz-server/
# Увеличиваем лимит на количество открытых файлов (может быть необходимо для сервера)
LimitNOFILE=100000
# Команды для перезагрузки и остановки службы
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s INT $MAINPID
# Пользователь и группа, от имени которых запускается служба (НЕ запускайте от root!)
User=your_username
Group=users
# Политика перезапуска: перезапускать в случае падения
Restart=on-failure
# Ждать 5 секунд перед перезапуском
RestartSec=5s

[Install]
# Указываем, что служба должна запускаться при загрузке системы в многопользовательском режиме
WantedBy=multi-user.target
```

Перечитываем конфигурацию systemd, чтобы она узнала о новой службе

```bash
sudo systemctl daemon-reload
```

#### Шаг 4.3: Управление службой сервера

Теперь вы можете управлять сервером с помощью следующих команд:

- `sudo systemctl enable dayz-server` — **включает автозапуск** сервера при загрузке ОС.
- `sudo systemctl disable dayz-server` — **отключает автозапуск** сервера при загрузке ОС.
- `sudo systemctl start dayz-server` — **запускает** сервер вручную.
- `sudo systemctl restart dayz-server` — **перезапускает** сервер.
- `sudo systemctl stop dayz-server` — **останавливает** сервер.
- `sudo systemctl status dayz-server` — **показывает статус** работы сервера и последние записи в журнале.


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

### Приоритетная очередь

Указанным пользователям можно назначить приоритет в очереди входа, они окажутся на первой позиции, перед неприоритетными пользователями.

Отмеченных пользователей просто нужно добавить в файл `priority.txt`, расположенный в корневом каталоге установки сервера.

**Формат:**
```
SteamId ; SteamId ; 01234567 890123456 ; 01234567 890123456
```


## Скрипты для автонастройки сервера

Чтобы установить и настроить сервер, используя данные скрипты, достаточно всего лишь:
1. Обновить систему до актуального состояния:
2. Сохранить данный скрипт в файл, например, ~/install
3. Выдать права на исполнение:
```bash
chmod +x ~/install
```
4. Запустить скрипт с правами root (либо под пользователем root, либо через sudo)


### Скрипт без модов 

```bash
#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Скрипт установки сервера DayZ без модов ===${NC}"

# Проверка прав root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}Этот скрипт должен быть запущен от root (или с sudo).${NC}" 
   exit 1
fi

# Определение дистрибутива
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
    VERSION=$VERSION_ID
elif [ -f /etc/debian_version ]; then
    OS=debian
elif [ -f /etc/redhat-release ]; then
    OS=$(cat /etc/redhat-release | awk '{print tolower($1)}')
else
    echo -e "${RED}Не удалось определить дистрибутив.${NC}"
    exit 1
fi

echo -e "${YELLOW}Обнаружен дистрибутив: $OS $VERSION${NC}"

# Запрос логина Steam
read -p "Введите ваш Steam логин (обязательно): " STEAM_LOGIN
if [ -z "$STEAM_LOGIN" ]; then
    echo -e "${RED}Логин не может быть пустым.${NC}"
    exit 1
fi

# Определение текущего пользователя (не root!)
echo -e "${YELLOW}Сервер будет работать от имени обычного пользователя. Укажите его имя:${NC}"
read -p "Имя пользователя (например, dayz): " USERNAME
if [ -z "$USERNAME" ]; then
    echo -e "${RED}Имя пользователя не может быть пустым.${NC}"
    exit 1
fi

if ! id "$USERNAME" &>/dev/null; then
    echo -e "${RED}Пользователь '$USERNAME' не существует. Создайте его или укажите существующего.${NC}"
    exit 1
fi

HOME_DIR=$(eval echo ~$USERNAME)
SERVER_DIR="$HOME_DIR/servers/dayz-server"
STEAMCMD_DIR="$HOME_DIR/servers/steamcmd"

echo -e "${GREEN}Установка будет произведена в: $SERVER_DIR${NC}"

# Установка зависимостей в зависимости от ОС
install_dependencies() {
    echo -e "${YELLOW}Установка зависимостей...${NC}"
    case $OS in
        debian|ubuntu)
            apt-get update
            apt-get install -y lib32gcc-s1 curl nano
            ;;
        rhel|centos|fedora|rocky|almalinux)
            if command -v dnf &> /dev/null; then
                dnf install -y glibc.i686 libstdc++.i686 curl nano
            else
                yum install -y glibc.i686 libstdc++.i686 curl nano
            fi
            ;;
        altlinux)
            apt-get update
            apt-get install -y gcc gdb i586-glibc-*
            ;;
        arch|manjaro)
            pacman -Sy --noconfirm glibc lib32-glibc curl nano
            ;;
        *)
            echo -e "${RED}Неподдерживаемый дистрибутив: $OS${NC}"
            exit 1
            ;;
    esac
}

# Установка SteamCMD
install_steamcmd() {
    echo -e "${YELLOW}Установка SteamCMD...${NC}"
    sudo -u $USERNAME mkdir -p $STEAMCMD_DIR
    cd $STEAMCMD_DIR || { echo "Не удалось перейти в $STEAMCMD_DIR"; exit 1; }
    sudo -u $USERNAME curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | sudo -u $USERNAME tar zxvf - > /dev/null
    if [ ! -f "steamcmd.sh" ]; then
        echo -e "${RED}Ошибка: steamcmd.sh не найден после распаковки.${NC}"
        exit 1
    fi
    echo -e "${GREEN}SteamCMD успешно установлен.${NC}"
}

# Установка сервера DayZ
install_dayz_server() {
    echo -e "${YELLOW}Установка сервера DayZ (стабильная версия, app 223350)...${NC}"
    sudo -u $USERNAME mkdir -p $SERVER_DIR
    cd $STEAMCMD_DIR || exit 1
    sudo -u $USERNAME ./steamcmd.sh +force_install_dir $SERVER_DIR +login $STEAM_LOGIN +app_update 223350 validate +quit
    if [ ! -f "$SERVER_DIR/DayZServer" ]; then
        echo -e "${RED}Ошибка: DayZServer не найден. Убедитесь, что установка прошла успешно.${NC}"
        exit 1
    fi
    echo -e "${GREEN}Сервер DayZ успешно установлен.${NC}"
}

# Создание базового serverDZ.cfg
create_config() {
    echo -e "${YELLOW}Создание базового конфигурационного файла serverDZ.cfg...${NC}"
    CONFIG_FILE="$SERVER_DIR/serverDZ.cfg"
    sudo -u $USERNAME mkdir -p "$SERVER_DIR/keys" "$SERVER_DIR/battleye" "$SERVER_DIR/profiles"

    cat << 'EOF' | sudo -u $USERNAME tee $CONFIG_FILE > /dev/null
hostname = "Мой DayZ Сервер";
description = "Официальный сервер без модов";
password = "";
passwordAdmin = "admin123";
maxPlayers = 40;
verifySignatures = 2;
forceSameBuild = 1;
disableVoN = 0;
vonCodecQuality = 20;
disable3rdPerson = 0;
disableCrosshair = 0;
serverTime = "SystemTime";
serverTimeAcceleration = 1;
serverNightTimeAcceleration = 1;
serverTimePersistent = 1;
GuaranteedUpdates = 1;
loginQueueConcurrentPlayers = 5;
loginQueueMaxPlayers = 500;
instanceId = 1;
storageAutoFix = 1;

class Missions {
    class DayZ {
        template = "dayzOffline.chernarusplus";
    };
};

respawnTime = 5;
motd[] = {"Добро пожаловать на сервер!", "Уважайте других игроков."};
motdInterval = 60;
timeStampFormat = "Short";
logAverageFps = 30;
logMemory = 30;
logPlayers = 30;
logFile = "server_console.log";
adminLogPlayerHitsOnly = 0;
adminLogPlacement = 1;
adminLogBuildActions = 1;
adminLogPlayerList = 1;
allowFilePatching = 0;
multithreadedReplication = 1;
pingWarning = 200;
pingCritical = 250;
MaxPing = 300;
serverFpsWarning = 15;
shotValidation = 1;
EOF

    echo -e "${GREEN}Файл конфигурации создан: $CONFIG_FILE${NC}"
}

# Создание скрипта обновления
create_update_script() {
    echo -e "${YELLOW}Создание скрипта обновления update.sh...${NC}"
    UPDATE_SCRIPT="$SERVER_DIR/update.sh"
    cat << EOF | sudo -u $USERNAME tee $UPDATE_SCRIPT > /dev/null
#!/bin/bash
echo "[\$(date)] Обновление сервера DayZ..." >> /tmp/dayz_update.log
$STEAMCMD_DIR/steamcmd.sh +force_install_dir $SERVER_DIR +login $STEAM_LOGIN +app_update 223350 validate +quit
echo "[\$(date)] Обновление завершено." >> /tmp/dayz_update.log
EOF

    chmod +x $UPDATE_SCRIPT
    chown $USERNAME:$USERNAME $UPDATE_SCRIPT
    echo -e "${GREEN}Скрипт обновления создан: $UPDATE_SCRIPT${NC}"
}

# Создание systemd службы
create_systemd_service() {
    echo -e "${YELLOW}Создание службы systemd dayz-server.service...${NC}"
    SERVICE_FILE="/etc/systemd/system/dayz-server.service"
    cat << EOF | sudo tee $SERVICE_FILE > /dev/null
[Unit]
Description=Выделенный сервер DayZ
Wants=network-online.target
After=syslog.target network.target nss-lookup.target network-online.target

[Service]
ExecStartPre=$SERVER_DIR/update.sh
ExecStart=$SERVER_DIR/DayZServer -config=serverDZ.cfg -port=2302 -BEpath=battleye -profiles=profiles -dologs -adminlog -netlog -freezecheck
WorkingDirectory=$SERVER_DIR
LimitNOFILE=100000
ExecReload=/bin/kill -s HUP \$MAINPID
ExecStop=/bin/kill -s INT \$MAINPID
User=$USERNAME
Group=$(id -gn $USERNAME)
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF

    systemctl daemon-reload
    systemctl enable dayz-server
    echo -e "${GREEN}Служба dayz-server создана и включена для автозапуска.${NC}"
}

# Запуск сервера
start_server() {
    echo -e "${YELLOW}Запуск сервера DayZ...${NC}"
    systemctl start dayz-server
    systemctl status dayz-server --no-pager
}

# Основная последовательность
main() {
    install_dependencies
    install_steamcmd
    install_dayz_server
    create_config
    create_update_script
    create_systemd_service
    start_server

    echo -e "${GREEN}========================================================${NC}"
    echo -e "${GREEN}✅ Установка сервера DayZ завершена!${NC}"
    echo -e "${GREEN}Команды управления:${NC}"
    echo -e "  systemctl start dayz-server     — запустить"
    echo -e "  systemctl stop dayz-server      — остановить"
    echo -e "  systemctl restart dayz-server   — перезапустить"
    echo -e "  systemctl status dayz-server    — статус сервера"
    echo -e "  journalctl -u dayz-server -f    — логи в реальном времени"
    echo -e "${GREEN}Конфиг: $SERVER_DIR/serverDZ.cfg${NC}"
    echo -e "${GREEN}Логи: $SERVER_DIR/profiles/server_console.log${NC}"
    echo -e "${GREEN}========================================================${NC}"
}

# Запуск
main

```

###  Скрипт с Намальском
```bash
#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Скрипт установки сервера DayZ с модом Namalsk ===${NC}"

# Проверка прав root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}Этот скрипт должен быть запущен от root (или с sudo).${NC}"
   exit 1
fi

# Определение дистрибутива
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
    VERSION=$VERSION_ID
elif [ -f /etc/debian_version ]; then
    OS=debian
elif [ -f /etc/redhat-release ]; then
    OS=$(cat /etc/redhat-release | awk '{print tolower($1)}')
else
    echo -e "${RED}Не удалось определить дистрибутив.${NC}"
    exit 1
fi

echo -e "${YELLOW}Обнаружен дистрибутив: $OS $VERSION${NC}"

# Запрос логина Steam
read -p "Введите ваш Steam логин (обязательно): " STEAM_LOGIN
if [ -z "$STEAM_LOGIN" ]; then
    echo -e "${RED}Логин не может быть пустым.${NC}"
    exit 1
fi

# Запрос Пароля Steam
read -p "Введите ваш Steam пароль (обязательно): " STEAM_PASSWORD
if [ -z "$STEAM_PASSWORD" ]; then
    echo -e "${RED}Пароль не может быть пустым.${NC}"
    exit 1
fi

# Запрос имени пользователя
read -p "Имя пользователя (например, dayz): " USERNAME
if [ -z "$USERNAME" ]; then
    echo -e "${RED}Имя пользователя не может быть пустым.${NC}"
    exit 1
fi

if ! id "$USERNAME" &>/dev/null; then
    echo -e "${RED}Пользователь '$USERNAME' не существует. Создайте его или укажите существующего.${NC}"
    exit 1
fi

HOME_DIR=$(eval echo ~$USERNAME)
SERVER_DIR="$HOME_DIR/servers/dayz-server"
STEAMCMD_DIR="$HOME_DIR/servers/steamcmd"

echo -e "${GREEN}Установка будет произведена в: $SERVER_DIR${NC}"

# Установка зависимостей
install_dependencies() {
    case $OS in
        debian|ubuntu)
            apt-get update && apt-get install -y lib32gcc-s1 curl nano wget
            ;;
        rhel|centos|fedora|rocky|almalinux)
            if command -v dnf &> /dev/null; then
                dnf install -y glibc.i686 libstdc++.i686 curl nano wget
            else
                yum install -y glibc.i686 libstdc++.i686 curl nano wget
            fi
            ;;
        altlinux)
            apt-get update && apt-get install -y gcc gdb i586-glibc-* curl nano wget
            ;;
        arch|manjaro)
            pacman -Sy --noconfirm glibc lib32-glibc curl nano wget
            ;;
        *)
            echo -e "${RED}Неподдерживаемый дистрибутив: $OS${NC}"
            exit 1
            ;;
    esac
}

# Установка SteamCMD
install_steamcmd() {
    sudo -u $USERNAME mkdir -p $STEAMCMD_DIR
    cd $STEAMCMD_DIR || exit 1
    sudo -u $USERNAME curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | sudo -u $USERNAME tar zxvf - > /dev/null
    if [ ! -f "steamcmd.sh" ]; then
        echo -e "${RED}Ошибка: steamcmd.sh не найден.${NC}"
        exit 1
    fi
    echo -e "${GREEN}SteamCMD установлен.${NC}"
}

# Установка сервера DayZ
install_dayz_server() {
    echo -e "${YELLOW}Установка сервера DayZ...${NC}"
    sudo -u $USERNAME mkdir -p $SERVER_DIR
    cd $STEAMCMD_DIR || exit 1
    sudo -u $USERNAME ./steamcmd.sh +force_install_dir $SERVER_DIR +login $STEAM_LOGIN $STEAM_PASSWORD +app_update 223350 validate +quit
    if [ ! -f "$SERVER_DIR/DayZServer" ]; then
        echo -e "${RED}Ошибка: DayZServer не найден.${NC}"
        exit 1
    fi
    echo -e "${GREEN}Сервер DayZ установлен.${NC}"
}

# Установка модов Namalsk
install_namalsk_mods() {
    echo -e "${YELLOW}Установка модов Namalsk...${NC}"
    cd $STEAMCMD_DIR || exit 1
    sudo -u $USERNAME ./steamcmd.sh +force_install_dir $SERVER_DIR +login $STEAM_LOGIN $STEAM_PASSWORD\
        +app_update 223350 \
        +workshop_download_item 221100 2289456201 \
        +workshop_download_item 221100 2289461232 \
        +quit

    if [ ! -d "$SERVER_DIR/steamapps/workshop/content/221100/2289456201" ] || [ ! -d "$SERVER_DIR/steamapps/workshop/content/221100/2289461232" ]; then
        echo -e "${RED}Ошибка: Не удалось загрузить моды Namalsk.${NC}"
        exit 1
    fi

    # Исправляем владельца всей директории сервера
    sudo chown -R $USERNAME:$USERNAME "$SERVER_DIR"

    echo -e "${GREEN}Моды Namalsk успешно установлены.${NC}"
}

# Выбор режима
select_mode() {
    echo -e "${YELLOW}Выберите режим сервера:${NC}"
    echo -e "1) Regular"
    echo -e "2) Hardcore"
    read -p "Введите 1 или 2: " MODE_CHOICE

    case $MODE_CHOICE in
        1)
            MISSION="regular.namalsk"
            CONFIG_URL="https://raw.githubusercontent.com/SumrakDZN/Namalsk-Server/main/Server%20Config/Regular/serverDZ.cfg"
            ;;
        2)
            MISSION="hardcore.namalsk"
            CONFIG_URL="https://raw.githubusercontent.com/SumrakDZN/Namalsk-Server/main/Server%20Config/Hardcore/serverDZ.cfg"
            ;;
        *)
            echo -e "${RED}Неверный выбор.${NC}"
            exit 1
            ;;
    esac

    echo -e "${GREEN}Выбран режим: $MISSION${NC}"
}

# Создание символьных ссылок и копирование bikey + скачивание миссии
# Создание символьных ссылок и копирование bikey + скачивание миссии
setup_namalsk() {
    echo -e "${YELLOW}Настройка мода Namalsk...${NC}"

    # Убедимся, что вся директория принадлежит пользователю
    sudo chown -R $USERNAME:$USERNAME "$SERVER_DIR"

    # Создаем необходимые директории от имени пользователя
    sudo -u $USERNAME mkdir -p "$SERVER_DIR/keys" "$SERVER_DIR/battleye" "$SERVER_DIR/profiles"

    # Проверим, что директории созданы
    if [ ! -d "$SERVER_DIR/keys" ] || [ ! -d "$SERVER_DIR/profiles" ]; then
        echo -e "${RED}Ошибка: Не удалось создать директории. Проверьте права доступа к $SERVER_DIR.${NC}"
        exit 1
    fi

    # Создаем ссылки на моды
    sudo -u $USERNAME ln -sf "$SERVER_DIR/steamapps/workshop/content/221100/2289456201" "$SERVER_DIR/2289456201"
    sudo -u $USERNAME ln -sf "$SERVER_DIR/steamapps/workshop/content/221100/2289461232" "$SERVER_DIR/2289461232"

    # Копируем sumrak.bikey в keys
    KEY_SOURCE="$SERVER_DIR/steamapps/workshop/content/221100/2289456201/Keys/sumrak.bikey"
    KEY_DEST="$SERVER_DIR/keys/sumrak.bikey"

    if [ -f "$KEY_SOURCE" ]; then
        sudo -u $USERNAME cp "$KEY_SOURCE" "$KEY_DEST"
        echo -e "${GREEN}Ключ sumrak.bikey скопирован.${NC}"
    else
        echo -e "${RED}Ошибка: sumrak.bikey не найден по пути: $KEY_SOURCE${NC}"
        exit 1
    fi

    # === Скачиваем миссию с GitHub ===
    MISSION_FOLDER="$SERVER_DIR/mpmissions/$MISSION"
    MISSION_URL="https://github.com/SumrakDZN/Namalsk-Server/archive/refs/heads/main.zip"
    TEMP_DIR="$HOME_DIR/tmp_namalsk_$(date +%s)"
    sudo -u $USERNAME mkdir -p "$TEMP_DIR"

    echo -e "${YELLOW}Скачивание миссии $MISSION из GitHub...${NC}"

    # Скачиваем архив от имени пользователя в его домашнюю директорию
    if command -v curl &> /dev/null; then
        sudo -u $USERNAME curl -sL "$MISSION_URL" -o "$TEMP_DIR/namalsk.zip"
    elif command -v wget &> /dev/null; then
        sudo -u $USERNAME wget -qO "$TEMP_DIR/namalsk.zip" "$MISSION_URL"
    else
        echo -e "${RED}Ошибка: ни curl, ни wget не установлены.${NC}"
        exit 1
    fi

    # Проверяем, что файл скачался
    if [ ! -f "$TEMP_DIR/namalsk.zip" ] || [ ! -s "$TEMP_DIR/namalsk.zip" ]; then
        echo -e "${RED}Ошибка: Не удалось скачать архив с GitHub.${NC}"
        rm -rf "$TEMP_DIR"
        exit 1
    fi

    # Распаковываем и копируем нужную папку
    sudo -u $USERNAME unzip -q "$TEMP_DIR/namalsk.zip" -d "$TEMP_DIR"

    # Проверяем структуру — в архиве папка называется "Namalsk-Server-main"
    if [ -d "$TEMP_DIR/Namalsk-Server-main/Mission Files/$MISSION" ]; then
        sudo -u $USERNAME mkdir -p "$MISSION_FOLDER"
        sudo -u $USERNAME cp -r "$TEMP_DIR/Namalsk-Server-main/Mission Files/$MISSION"/* "$MISSION_FOLDER/"
        echo -e "${GREEN}Миссия $MISSION успешно скопирована.${NC}"
    else
        echo -e "${RED}Ошибка: Не найдена папка Mission Files/$MISSION в архиве.${NC}"
        echo -e "${YELLOW}Содержимое архива:${NC}"
        sudo -u $USERNAME ls -la "$TEMP_DIR/"
        if [ -d "$TEMP_DIR/Namalsk-Server-main" ]; then
            echo -e "${YELLOW}Содержимое Namalsk-Server-main/Mission Files:${NC}"
            sudo -u $USERNAME ls -la "$TEMP_DIR/Namalsk-Server-main/Mission Files/" 2>/dev/null || echo "Папка Mission Files не существует"
        fi
        rm -rf "$TEMP_DIR"
        exit 1
    fi

    # Очищаем временные файлы
    rm -rf "$TEMP_DIR"

    echo -e "${GREEN}Символические ссылки, bikey и миссия $MISSION успешно настроены.${NC}"
}

# Создание конфига — скачиваем с GitHub
create_config() {
    echo -e "${YELLOW}Скачивание конфигурации serverDZ.cfg с GitHub...${NC}"
    CONFIG_PATH="$SERVER_DIR/serverDZ.cfg"

    # Скачиваем файл
    if command -v curl &> /dev/null; then
        sudo -u $USERNAME curl -sL "$CONFIG_URL" -o "$CONFIG_PATH"
    elif command -v wget &> /dev/null; then
        sudo -u $USERNAME wget -qO "$CONFIG_PATH" "$CONFIG_URL"
    else
        echo -e "${RED}Ошибка: ни curl, ни wget не установлены.${NC}"
        exit 1
    fi

    # Проверяем, скачался ли файл
    if [ ! -s "$CONFIG_PATH" ]; then
        echo -e "${RED}Ошибка: Не удалось скачать конфигурационный файл с $CONFIG_URL${NC}"
        exit 1
    fi

    # Подменяем template на выбранный (на всякий случай)
    if grep -q "template=" "$CONFIG_PATH"; then
        sudo -u $USERNAME sed -i "s/template=\"[^\"]*\"/template=\"$MISSION\"/" "$CONFIG_PATH"
    else
        echo -e "${YELLOW}Предупреждение: template не найден. Добавляем вручную.${NC}"
        sudo -u $USERNAME sed -i '/class Missions {/a \    class DayZ {\n        template="'"$MISSION"'";\n    };' "$CONFIG_PATH"
    fi

    echo -e "${GREEN}Конфигурация сохранена: $CONFIG_PATH${NC}"
}

# Создание скрипта обновления
create_update_script() {
    UPDATE_SCRIPT="$SERVER_DIR/update.sh"
    cat << EOF | sudo -u $USERNAME tee $UPDATE_SCRIPT > /dev/null
#!/bin/bash
echo "[\$(date)] Обновление сервера DayZ и Namalsk..." >> /tmp/dayz_update.log
$STEAMCMD_DIR/steamcmd.sh +force_install_dir $SERVER_DIR +login $STEAM_LOGIN +app_update 223350 +workshop_download_item 221100 2289456201 +workshop_download_item 221100 2289461232 +quit
echo "[\$(date)] Обновление завершено." >> /tmp/dayz_update.log
EOF

    chmod +x $UPDATE_SCRIPT
    chown $USERNAME:$USERNAME $UPDATE_SCRIPT
    echo -e "${GREEN}Скрипт обновления создан: $UPDATE_SCRIPT${NC}"
}

# Создание systemd службы
create_systemd_service() {
    SERVICE_FILE="/etc/systemd/system/dayz-server.service"
    cat << EOF | sudo tee $SERVICE_FILE > /dev/null
[Unit]
Description=Выделенный сервер DayZ с Namalsk
Wants=network-online.target
After=syslog.target network.target nss-lookup.target network-online.target

[Service]
ExecStartPre=$SERVER_DIR/update.sh
ExecStart=$SERVER_DIR/DayZServer -config=serverDZ.cfg -port=2302 -BEpath=battleye -profiles=profiles -dologs -adminlog -netlog -freezecheck "-mod=2289456201;2289461232;"
WorkingDirectory=$SERVER_DIR
LimitNOFILE=100000
ExecReload=/bin/kill -s HUP \$MAINPID
ExecStop=/bin/kill -s INT \$MAINPID
User=$USERNAME
Group=$(id -gn $USERNAME)
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF

    systemctl daemon-reload
    systemctl enable dayz-server
    echo -e "${GREEN}Служба dayz-server создана и включена для автозапуска.${NC}"
}

# Запуск сервера
start_server() {
    echo -e "${YELLOW}Запуск сервера DayZ...${NC}"
    systemctl start dayz-server
    sleep 3
    systemctl status dayz-server --no-pager
}

# Основная последовательность
main() {
    install_dependencies
    install_steamcmd
    install_dayz_server
    install_namalsk_mods
    select_mode
    setup_namalsk
    create_config
    create_update_script
    create_systemd_service
    start_server

    echo -e "${GREEN}========================================================${NC}"
    echo -e "${GREEN}✅ Установка сервера DayZ с модом Namalsk завершена!${NC}"
    echo -e "${GREEN}Команды управления:${NC}"
    echo -e "  systemctl start dayz-server     — запустить"
    echo -e "  systemctl stop dayz-server      — остановить"
    echo -e "  systemctl restart dayz-server   — перезапустить"
    echo -e "  systemctl status dayz-server    — статус сервера"
    echo -e "  journalctl -u dayz-server -f    — логи в реальном времени"
    echo -e "${GREEN}Конфиг: $SERVER_DIR/serverDZ.cfg${NC}"
    echo -e "${GREEN}Логи: $SERVER_DIR/profiles/server_console.log${NC}"
    echo -e "${GREEN}========================================================${NC}"
}

# Запуск
main

```

## НейроПоля

Вот универсальный bash-скрипт, который создаёт DayZ-сервер с модами, ID которых передаются в виде аргументов командной строки:

```bash
#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_NAME=$(basename "$0")
USAGE="Использование: sudo ./$SCRIPT_NAME <steam_login> <username> <mod_id_1> [mod_id_2] ... [mod_id_n]"

# Проверка прав root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}Этот скрипт должен быть запущен от root (или с sudo).${NC}"
   echo "$USAGE"
   exit 1
fi

# Проверка аргументов
if [ $# -lt 3 ]; then
    echo -e "${RED}Недостаточно аргументов.${NC}"
    echo "$USAGE"
    exit 1
fi

STEAM_LOGIN="$1"
USERNAME="$2"
shift 2
MOD_IDS=("$@")

echo -e "${GREEN}=== Установка сервера DayZ с модами ===${NC}"
echo -e "${YELLOW}Steam логин: $STEAM_LOGIN${NC}"
echo -e "${YELLOW}Пользователь ОС: $USERNAME${NC}"
echo -e "${YELLOW}Моды: ${MOD_IDS[*]}${NC}"

# Проверка существования пользователя
if ! id "$USERNAME" &>/dev/null; then
    echo -e "${RED}Пользователь '$USERNAME' не существует. Создайте его или укажите существующего.${NC}"
    exit 1
fi

HOME_DIR=$(eval echo ~$USERNAME)
SERVER_DIR="$HOME_DIR/servers/dayz-server"
STEAMCMD_DIR="$HOME_DIR/servers/steamcmd"

# Определение дистрибутива
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
elif [ -f /etc/debian_version ]; then
    OS=debian
elif [ -f /etc/redhat-release ]; then
    OS=$(cat /etc/redhat-release | awk '{print tolower($1)}')
else
    echo -e "${RED}Не удалось определить дистрибутив.${NC}"
    exit 1
fi

# Установка зависимостей
install_dependencies() {
    echo -e "${YELLOW}Установка зависимостей...${NC}"
    case $OS in
        debian|ubuntu)
            apt-get update && apt-get install -y lib32gcc-s1 curl nano
            ;;
        rhel|centos|fedora|rocky|almalinux)
            if command -v dnf &> /dev/null; then
                dnf install -y glibc.i686 libstdc++.i686 curl nano
            else
                yum install -y glibc.i686 libstdc++.i686 curl nano
            fi
            ;;
        altlinux)
            apt-get update && apt-get install -y gcc gdb i586-glibc-* curl nano
            ;;
        arch|manjaro)
            pacman -Sy --noconfirm glibc lib32-glibc curl nano
            ;;
        *)
            echo -e "${RED}Неподдерживаемый дистрибутив: $OS${NC}"
            exit 1
            ;;
    esac
}

# Установка SteamCMD
install_steamcmd() {
    echo -e "${YELLOW}Установка SteamCMD...${NC}"
    sudo -u "$USERNAME" mkdir -p "$STEAMCMD_DIR"
    cd "$STEAMCMD_DIR" || { echo "Не удалось перейти в $STEAMCMD_DIR"; exit 1; }
    sudo -u "$USERNAME" curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | sudo -u "$USERNAME" tar zxvf - > /dev/null
    if [ ! -f "steamcmd.sh" ]; then
        echo -e "${RED}Ошибка: steamcmd.sh не найден после распаковки.${NC}"
        exit 1
    fi
    echo -e "${GREEN}SteamCMD успешно установлен.${NC}"
}

# Формирование команды загрузки модов
build_workshop_args() {
    local args=""
    for mod_id in "${MOD_IDS[@]}"; do
        args="$args +workshop_download_item 221100 $mod_id"
    done
    echo "$args"
}

# Установка сервера и модов
install_dayz_with_mods() {
    echo -e "${YELLOW}Установка сервера DayZ и модов...${NC}"
    sudo -u "$USERNAME" mkdir -p "$SERVER_DIR"
    cd "$STEAMCMD_DIR" || exit 1

    WORKSHOP_ARGS=$(build_workshop_args)
    sudo -u "$USERNAME" ./steamcmd.sh +force_install_dir "$SERVER_DIR" +login "$STEAM_LOGIN" +app_update 223350 $WORKSHOP_ARGS validate +quit

    if [ ! -f "$SERVER_DIR/DayZServer" ]; then
        echo -e "${RED}Ошибка: DayZServer не найден. Убедитесь, что установка прошла успешно.${NC}"
        exit 1
    fi
    echo -e "${GREEN}Сервер и моды успешно установлены.${NC}"
}

# Настройка символических ссылок и ключей
setup_mod_links() {
    echo -e "${YELLOW}Настройка символических ссылок и ключей модов...${NC}"
    sudo -u "$USERNAME" mkdir -p "$SERVER_DIR/keys" "$SERVER_DIR/battleye" "$SERVER_DIR/profiles"

    for mod_id in "${MOD_IDS[@]}"; do
        MOD_PATH="$SERVER_DIR/steamapps/workshop/content/221100/$mod_id"
        if [ ! -d "$MOD_PATH" ]; then
            echo -e "${RED}Мод с ID $mod_id не найден по пути: $MOD_PATH${NC}"
            exit 1
        fi
        # Символическая ссылка на папку мода
        sudo -u "$USERNAME" ln -sf "$MOD_PATH" "$SERVER_DIR/$mod_id"
        # Символические ссылки на ключи
        if [ -d "$MOD_PATH/keys" ]; then
            sudo -u "$USERNAME" ln -sf "$MOD_PATH"/keys/* "$SERVER_DIR/keys/" 2>/dev/null || true
        fi
    done
    echo -e "${GREEN}Символические ссылки и ключи настроены.${NC}"
}

# Генерация строки модов для параметра -mod
build_mod_param() {
    local mod_list=""
    local first=1
    for mod_id in "${MOD_IDS[@]}"; do
        if [ $first -eq 1 ]; then
            mod_list="$mod_id"
            first=0
        else
            mod_list="$mod_list;$mod_id"
        fi
    done
    echo "$mod_list;"
}

# Создание базового конфига
create_config() {
    echo -e "${YELLOW}Создание базового serverDZ.cfg...${NC}"
    CONFIG_FILE="$SERVER_DIR/serverDZ.cfg"
    cat << EOF | sudo -u "$USERNAME" tee "$CONFIG_FILE" > /dev/null
hostname = "Мой DayZ Сервер с модами";
description = "Сервер с кастомными модами";
password = "";
passwordAdmin = "admin123";
maxPlayers = 40;
verifySignatures = 2;
forceSameBuild = 1;
disableVoN = 0;
vonCodecQuality = 20;
disable3rdPerson = 0;
disableCrosshair = 0;
serverTime = "SystemTime";
serverTimeAcceleration = 1;
serverNightTimeAcceleration = 1;
serverTimePersistent = 1;
GuaranteedUpdates = 1;
loginQueueConcurrentPlayers = 5;
loginQueueMaxPlayers = 500;
instanceId = 1;
storageAutoFix = 1;
class Missions {
    class DayZ {
        template = "dayzOffline.chernarusplus";
    };
};
respawnTime = 5;
motd[] = {"Добро пожаловать!", "Уважайте других игроков."};
motdInterval = 60;
timeStampFormat = "Short";
logAverageFps = 30;
logMemory = 30;
logPlayers = 30;
logFile = "server_console.log";
adminLogPlayerHitsOnly = 0;
adminLogPlacement = 1;
adminLogBuildActions = 1;
adminLogPlayerList = 1;
allowFilePatching = 0;
multithreadedReplication = 1;
pingWarning = 200;
pingCritical = 250;
MaxPing = 300;
serverFpsWarning = 15;
shotValidation = 1;
EOF
    echo -e "${GREEN}Файл конфигурации создан: $CONFIG_FILE${NC}"
}

# Создание скрипта обновления
create_update_script() {
    echo -e "${YELLOW}Создание скрипта обновления update.sh...${NC}"
    UPDATE_SCRIPT="$SERVER_DIR/update.sh"
    WORKSHOP_ARGS=$(build_workshop_args)

    cat << EOF | sudo -u "$USERNAME" tee "$UPDATE_SCRIPT" > /dev/null
#!/bin/bash
echo "[\$(date)] Обновление сервера DayZ и модов..." >> /tmp/dayz_update.log
"$STEAMCMD_DIR/steamcmd.sh" +force_install_dir "$SERVER_DIR" +login "$STEAM_LOGIN" +app_update 223350 $WORKSHOP_ARGS validate +quit
# Обновление ссылок на моды
rm -f "$SERVER_DIR"/${MOD_IDS[@]/#/$SERVER_DIR/}
rm -f "$SERVER_DIR/keys"/*
$(for mod_id in "${MOD_IDS[@]}"; do
    echo "ln -sf \"$SERVER_DIR/steamapps/workshop/content/221100/$mod_id\" \"$SERVER_DIR/$mod_id\""
    echo "ln -sf \"$SERVER_DIR/steamapps/workshop/content/221100/$mod_id\"/keys/* \"$SERVER_DIR/keys/\" 2>/dev/null || true"
done)
echo "[\$(date)] Обновление завершено." >> /tmp/dayz_update.log
EOF

    chmod +x "$UPDATE_SCRIPT"
    chown "$USERNAME":"$(id -gn "$USERNAME")" "$UPDATE_SCRIPT"
    echo -e "${GREEN}Скрипт обновления создан: $UPDATE_SCRIPT${NC}"
}

# Создание systemd-службы
create_systemd_service() {
    echo -e "${YELLOW}Создание службы systemd dayz-server.service...${NC}"
    MOD_PARAM=$(build_mod_param)
    SERVICE_FILE="/etc/systemd/system/dayz-server.service"

    cat << EOF | sudo tee "$SERVICE_FILE" > /dev/null
[Unit]
Description=Выделенный сервер DayZ с модами
Wants=network-online.target
After=syslog.target network.target nss-lookup.target network-online.target

[Service]
ExecStartPre=$SERVER_DIR/update.sh
ExecStart=$SERVER_DIR/DayZServer -config=serverDZ.cfg -port=2302 "-mod=$MOD_PARAM" -BEpath=battleye -profiles=profiles -dologs -adminlog -netlog -freezecheck
WorkingDirectory=$SERVER_DIR
LimitNOFILE=100000
ExecReload=/bin/kill -s HUP \$MAINPID
ExecStop=/bin/kill -s INT \$MAINPID
User=$USERNAME
Group=$(id -gn "$USERNAME")
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF

    systemctl daemon-reload
    systemctl enable dayz-server
    echo -e "${GREEN}Служба dayz-server создана и включена для автозапуска.${NC}"
}

# Запуск сервера
start_server() {
    echo -e "${YELLOW}Запуск сервера DayZ...${NC}"
    systemctl start dayz-server
    sleep 2
    systemctl status dayz-server --no-pager
}

# Основная последовательность
main() {
    install_dependencies
    install_steamcmd
    install_dayz_with_mods
    setup_mod_links
    create_config
    create_update_script
    create_systemd_service
    start_server

    echo -e "${GREEN}========================================================${NC}"
    echo -e "${GREEN}✅ Установка сервера DayZ с модами завершена!${NC}"
    echo -e "${GREEN}Команды управления:${NC}"
    echo -e "  systemctl start dayz-server     — запустить"
    echo -e "  systemctl stop dayz-server      — остановить"
    echo -e "  systemctl restart dayz-server   — перезапустить"
    echo -e "  systemctl status dayz-server    — статус сервера"
    echo -e "  journalctl -u dayz-server -f    — логи в реальном времени"
    echo -e "${GREEN}Конфиг: $SERVER_DIR/serverDZ.cfg${NC}"
    echo -e "${GREEN}Логи: $SERVER_DIR/profiles/server_console.log${NC}"
    echo -e "${GREEN}========================================================${NC}"
}

main
```

---

### 📌 Как использовать:

1. Сохраните скрипт, например, как `install_dayz_modded.sh`
2. Сделайте его исполняемым:
   ```bash
   chmod +x install_dayz_modded.sh
   ```
3. Запустите от root или через `sudo`, передав:
   - Steam-логин
   - Имя локального пользователя ОС (от которого будет работать сервер)
   - Список ID модов

**Пример:**
```bash
sudo ./install_dayz_modded.sh my_steam_login dayzuser 1559212036 1564026768 2289456201
```

> ⚠️ **Важно**: если у вас включена двухфакторная аутентификация Steam Guard, вам потребуется использовать **Steam-пароль приложения** вместо обычного пароля, либо интерактивно вводить код при первом запуске SteamCMD.

Скрипт полностью автоматизирует установку, настройку ссылок на моды, генерацию конфигурации и создание systemd-службы с автообновлением.