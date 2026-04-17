# Xerox B205/B215

Xerox B215
![](https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQowLwQJqmaw21fYgZWpDfxx-0-D-s_OKGZVPWySMK8I9-5jF5KCzL-QPTeWBgHDCT0ZIM07JVTTU1eLh3ioOGVst95t7tEnPUCCrPpDH4S6URBI9xT5gdLaA)

Xerox B205
![](https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQSunayScAZU6gxASKgISwn3KI3yFDakYd-FpztOWYzywfSyk02Vl30BuBNaxIPUqLURq42MdQt2NKn2XsI0UlNA12sY36ymyuFc7ixBoaP_J9Ewc6tq7r2Hg)

# Установка драйвера на принтер (CUPS)

Скачать архив: https://download.support.xerox.com/pub/drivers/B215/drivers/linux/ar/Xerox_B215_Linux_PrintDriver_Utilities.tar.gz

Открыть терминал и перейти в контекст суперпользователя следующей командой:
```bash
$ su -
```

Перейти в директорию, где расположен скачанный архив:
```bash
cd /home/<user>/Загрузки/
```

Разархивировать архив:
```bash
tar -xzvf ./Xerox_B215_Linux_PrintDriver_Utilities.tar.gz
```

Перейти в директорию с драйверами:
```bash
cd uld
```

Запустить скрипт установки:
```bash
./install.sh
```

Далее, на все вопросы скрипта отвечаем нажатием на клавишу Enter:
```bash
**** Running install ...
**** Press 'Enter' to continue or 'q' and then 'Enter' to quit. :
**** Are you going to use network devices ? If yes, it is recommended to configure your firewall.
**** If you want to configure firewall automatically, enter 'y' or just press 'Enter'. To skip, enter 'n'. :
**** Registering CUPS backend ...
**** CUPS restart OK.
**** Print driver has been installed successfully.
**** Registering SANE backend ...
**** Restarting udev ...
**** Scan driver has been installed successfully.
**** Install finished.
```

Поздравляем. Установка прошла успешно!

Вообще, данный софт ставит и SANE бэкенд, но у меня пока не было реального опыта запуска сканера

# Установка драйверов на сканер (SANE)

Пока не было реального опыта у меня запуска данного сканера, можно попробовать этот пакет: http://altrepo.ru/local-p11/x86_64/RPMS.local-p11/xerox-uld-standalone-1.00.39_00.08-alt1.x86_64.rpm