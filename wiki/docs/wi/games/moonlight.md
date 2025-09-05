# Moonlight

![](https://habrastorage.org/getpro/habr/upload_files/7e5/a61/b4d/7e5a61b4d6fcad302a834f24e2f212cf.png)

Moonlight (ранее Limelight) — это реализация протокола GameStream от NVIDIA с открытым исходным кодом. Участники проекта внедрили протокол, используемый NVIDIA Shield, и написали набор сторонних клиентов.

Вы можете транслировать свою коллекцию компьютерных игр со своего ПК, совместимого с GameStream, на любое поддерживаемое устройство и воспроизводить их удалённо. Moonlight идеально подходит для игр на ходу без ущерба для графики и выбора игр, доступных на ПК.

## Установка 

```bash
flatpak install flathub com.moonlight_stream.Moonlight
```

## Настройка в связке с Sunshine

![](https://flathub.org/api/appOgImage/dev.lizardbyte.app.Sunshine?locale=ta)

Sunshine — это хостинг-платформа для трансляции игр Moonlight. Предлагает возможности облачного игрового сервера с низкой задержкой и поддержкой видеокарт AMD, Intel и Nvidia для аппаратного кодирования. Также доступно программное кодирование. Вы можете подключиться к Sunshine с любого клиента Moonlight на различных устройствах. Веб-интерфейс позволяет настраивать параметры и подключать клиентов через ваш любимый веб-браузер. Подключение осуществляется с локального сервера или любого мобильного устройства.

### Установка Sunshine

```bash
flatpak install --system flathub dev.lizardbyte.app.Sunshine
```

```bash
flatpak run --command=additional-install.sh dev.lizardbyte.app.Sunshine
```

```bash
sudo -i PULSE_SERVER=unix:/run/user/$(id -u $whoami)/pulse/native flatpak run dev.lizardbyte.app.Sunshine
```

### Запуск

### Запуск с захватом NVFBC (только X11)
```bash
flatpak run dev.lizardbyte.app.Sunshine
```

### Запуск с захватом KMS (Wayland и X11)
```bash
sudo -i PULSE_SERVER=unix:/run/user/$(id -u $whoami)/pulse/native flatpak run dev.lizardbyte.app.Sunshine
```

::: tip Проблема
Пока в своём тестировании на Альт Линукс Рабочая Станция К 11 (Wayland) я остановился на проблеме первого запуска:
После ввода логина и пароля в консоли бесконечно запись `[2025-08-28 12:05:16.828]: Info: Web UI: [127.0.0.1] -- not authorized
`. Если выключить Sunshine заново - аналогично. Вот логи, которые идут перед этим:
```log
sudo -i PULSE_SERVER=unix:/run/user/$(id -u $whoami)/pulse/native flatpak run dev.lizardbyte.app.Sunshine

[2025-08-28 12:07:07.622]: Info: Sunshine version: v2025.628.4510
[2025-08-28 12:07:07.622]: Info: Package Publisher: LizardByte
[2025-08-28 12:07:07.622]: Info: Publisher Website: https://app.lizardbyte.dev
[2025-08-28 12:07:07.622]: Info: Get support: https://app.lizardbyte.dev/support
Cannot load libcuda.so.1
[2025-08-28 12:07:07.623]: Error: Couldn't load cuda: -1
[2025-08-28 12:07:07.623]: Error: Couldn't open: /dev/dri/card1: Отказано в доступе
[2025-08-28 12:07:07.623]: Error: Environment variable WAYLAND_DISPLAY has not been defined
[2025-08-28 12:07:07.623]: Info: Detecting displays
[2025-08-28 12:07:07.623]: Info: Detected display: eDP-1 (id: 0)eDP-1 connected: true
[2025-08-28 12:07:07.623]: Info: Detected display: HDMI-A-1 (id: 1)HDMI-A-1 connected: true

(sunshine:2): libayatana-appindicator-WARNING **: 12:07:07.627: libayatana-appindicator is deprecated. Please use libayatana-appindicator-glib in newly written code.
[2025-08-28 12:07:07.658]: Info: System tray created

(sunshine:2): libayatana-appindicator-WARNING **: 12:07:07.658: Unable to get the session bus: Не удалось выполнить дочерний процесс "dbus-launch" (Нет такого файла или каталога)

(sunshine:2): LIBDBUSMENU-GLIB-WARNING **: 12:07:07.658: Unable to get session bus: Не удалось выполнить дочерний процесс "dbus-launch" (Нет такого файла или каталога)
[2025-08-28 12:07:07.661]: Info: // Testing for available encoders, this may generate errors. You can safely ignore those errors. //
[2025-08-28 12:07:07.661]: Info: Trying encoder [nvenc]
[2025-08-28 12:07:07.661]: Info: Screencasting with X11
[2025-08-28 12:07:07.663]: Info: Creating encoder [h264_nvenc]
[2025-08-28 12:07:07.663]: Info: Color coding: SDR (Rec. 601)
Cannot load libcuda.so.1
[2025-08-28 12:07:07.663]: Info: Color depth: 8-bit
[2025-08-28 12:07:07.663]: Info: Color range: JPEG
[2025-08-28 12:07:07.663]: Error: Couldn't load cuda: -1
Cannot load libcuda.so.1
[2025-08-28 12:07:07.663]: Info: Creating encoder [h264_nvenc]
[2025-08-28 12:07:07.663]: Info: Color coding: SDR (Rec. 601)
[2025-08-28 12:07:07.663]: Info: Color depth: 8-bit
[2025-08-28 12:07:07.663]: Info: Color range: JPEG
[2025-08-28 12:07:07.663]: Error: Couldn't load cuda: -1
[2025-08-28 12:07:07.663]: Info: Encoder [nvenc] failed
[2025-08-28 12:07:07.663]: Info: Trying encoder [vaapi]
[2025-08-28 12:07:07.663]: Info: Screencasting with X11
[2025-08-28 12:07:07.664]: Info: Creating encoder [h264_vaapi]
[2025-08-28 12:07:07.664]: Info: Color coding: SDR (Rec. 601)
[2025-08-28 12:07:07.664]: Info: Color depth: 8-bit
[2025-08-28 12:07:07.664]: Info: Color range: JPEG
libva info: VA-API version 1.19.0
libva info: Trying to open /usr/lib/x86_64-linux-gnu/dri/iHD_drv_video.so
libva info: Trying to open /usr/lib/x86_64-linux-gnu/dri/intel-vaapi-driver/iHD_drv_video.so
libva info: Found init function __vaDriverInit_1_19
libva info: va_openDriver() returns 0
[2025-08-28 12:07:07.678]: Info: vaapi vendor: Intel iHD driver for Intel(R) Gen Graphics - 23.4.4 ()
[2025-08-28 12:07:07.678]: Info: Streaming bitrate is 1000000
[2025-08-28 12:07:07.678]: Info: Using normal encoding mode
[2025-08-28 12:07:07.678]: Info: Using VBR with single frame VBV size
[2025-08-28 12:07:07.708]: Info: Creating encoder [hevc_vaapi]
[2025-08-28 12:07:07.708]: Info: Color coding: SDR (Rec. 601)
[2025-08-28 12:07:07.708]: Info: Color depth: 8-bit
[2025-08-28 12:07:07.708]: Info: Color range: JPEG
libva info: VA-API version 1.19.0
libva info: Trying to open /usr/lib/x86_64-linux-gnu/dri/iHD_drv_video.so
libva info: Trying to open /usr/lib/x86_64-linux-gnu/dri/intel-vaapi-driver/iHD_drv_video.so
libva info: Found init function __vaDriverInit_1_19
libva info: va_openDriver() returns 0
[2025-08-28 12:07:07.718]: Info: vaapi vendor: Intel iHD driver for Intel(R) Gen Graphics - 23.4.4 ()
[2025-08-28 12:07:07.718]: Info: Streaming bitrate is 1000000
[2025-08-28 12:07:07.719]: Info: Using normal encoding mode
[2025-08-28 12:07:07.719]: Info: Using VBR with single frame VBV size
[2025-08-28 12:07:07.759]: Info: Creating encoder [av1_vaapi]
[2025-08-28 12:07:07.759]: Info: Color coding: SDR (Rec. 601)
[2025-08-28 12:07:07.759]: Info: Color depth: 8-bit
[2025-08-28 12:07:07.759]: Info: Color range: JPEG
libva info: VA-API version 1.19.0
libva info: Trying to open /usr/lib/x86_64-linux-gnu/dri/iHD_drv_video.so
libva info: Trying to open /usr/lib/x86_64-linux-gnu/dri/intel-vaapi-driver/iHD_drv_video.so
libva info: Found init function __vaDriverInit_1_19
libva info: va_openDriver() returns 0
[2025-08-28 12:07:07.773]: Info: vaapi vendor: Intel iHD driver for Intel(R) Gen Graphics - 23.4.4 ()
[2025-08-28 12:07:07.773]: Info: Streaming bitrate is 1000000
[2025-08-28 12:07:07.773]: Info: Using normal encoding mode
[2025-08-28 12:07:07.773]: Info: Using VBR with single frame VBV size
[2025-08-28 12:07:07.773]: Warning: [av1_vaapi @ 0x55c5fd3757c0] Multiple slices were requested but this codec does not support controlling slices.
[2025-08-28 12:07:07.823]: Info: Screencasting with X11
[2025-08-28 12:07:07.823]: Info: Creating encoder [hevc_vaapi]
[2025-08-28 12:07:07.823]: Info: Color coding: SDR (Rec. 709)
[2025-08-28 12:07:07.823]: Info: Color depth: 10-bit
[2025-08-28 12:07:07.823]: Info: Color range: JPEG
libva info: VA-API version 1.19.0
libva info: Trying to open /usr/lib/x86_64-linux-gnu/dri/iHD_drv_video.so
libva info: Trying to open /usr/lib/x86_64-linux-gnu/dri/intel-vaapi-driver/iHD_drv_video.so
libva info: Found init function __vaDriverInit_1_19
libva info: va_openDriver() returns 0
[2025-08-28 12:07:07.833]: Info: vaapi vendor: Intel iHD driver for Intel(R) Gen Graphics - 23.4.4 ()
[2025-08-28 12:07:07.833]: Info: Streaming bitrate is 1000000
[2025-08-28 12:07:07.833]: Info: Using normal encoding mode
[2025-08-28 12:07:07.833]: Info: Using VBR with single frame VBV size
[2025-08-28 12:07:07.870]: Info: Creating encoder [av1_vaapi]
[2025-08-28 12:07:07.870]: Info: Color coding: SDR (Rec. 709)
[2025-08-28 12:07:07.870]: Info: Color depth: 10-bit
[2025-08-28 12:07:07.870]: Info: Color range: JPEG
libva info: VA-API version 1.19.0
libva info: Trying to open /usr/lib/x86_64-linux-gnu/dri/iHD_drv_video.so
libva info: Trying to open /usr/lib/x86_64-linux-gnu/dri/intel-vaapi-driver/iHD_drv_video.so
libva info: Found init function __vaDriverInit_1_19
libva info: va_openDriver() returns 0
[2025-08-28 12:07:07.879]: Info: vaapi vendor: Intel iHD driver for Intel(R) Gen Graphics - 23.4.4 ()
[2025-08-28 12:07:07.879]: Info: Streaming bitrate is 1000000
[2025-08-28 12:07:07.879]: Info: Using normal encoding mode
[2025-08-28 12:07:07.879]: Info: Using VBR with single frame VBV size
[2025-08-28 12:07:07.879]: Warning: [av1_vaapi @ 0x55c5fd3757c0] Multiple slices were requested but this codec does not support controlling slices.
[2025-08-28 12:07:07.919]: Info: 
[2025-08-28 12:07:07.920]: Info: // Ignore any errors mentioned above, they are not relevant. //
[2025-08-28 12:07:07.920]: Info: 
[2025-08-28 12:07:07.920]: Info: Found H.264 encoder: h264_vaapi [vaapi]
[2025-08-28 12:07:07.920]: Info: Found HEVC encoder: hevc_vaapi [vaapi]
[2025-08-28 12:07:07.920]: Info: Found AV1 encoder: av1_vaapi [vaapi]
[2025-08-28 12:07:07.922]: Info: Configuration UI available at [https://localhost:47990]
[2025-08-28 12:07:07.922]: Info: Adding avahi service bystrovno-nb
[2025-08-28 12:07:08.755]: Info: Avahi service bystrovno-nb successfully established.
```

Видно, что есть ошибки, нужно с ними разбираться.
:::


## Настройка в связке с GeForce Experience

Использование Установите программу GeForce Experience от NVIDIA на свой игровой ПК. После установки может потребоваться перезагрузка компьютера для завершения настройки.

Если на вашем компьютере установлен графический процессор Quadro, установите программное обеспечение Quadro Experience.

Чтобы обойти ошибку драйвера графического процессора, влияющую на хосты NVIDIA GameStream под управлением Windows 11, необходимо отключить аппаратное ускорение планирования графического процессора на вашем компьютере. Откройте «Параметры графики» в меню «Пуск», затем нажмите «Изменить параметры графики по умолчанию» и установите для параметра «Аппаратное ускорение планирования графического процессора» значение «Выкл.».

Запустите GeForce/Quadro Experience и нажмите кнопку с изображением шестерёнки в разделе настроек. Затем выберите опцию SHIELD. 
Убедитесь, что переключатель GameStream находится в положении «Вкл» (зелёный). Если вкладка SHIELD отсутствует, см. инструкции по устранению неполадок здесь.

Запустите Moonlight и убедитесь, что ваш клиент подключен к той же сети, что и ваш ПК. В большинстве случаев ваш игровой ПК автоматически появится в списке ПК через несколько секунд. Щёлкните по нему, чтобы начать сопряжение.

На компьютере введите PIN-код, отображаемый в Moonlight, и примите приглашение на подключение. Если диалоговое окно не отображается, попробуйте выполнить действия по устранению неполадок, описанные здесь.

Попробуйте запустить стриминг игры или приложения, чтобы убедиться, что всё работает. Если возникнут проблемы, попробуйте выполнить действия по устранению неполадок, описанные здесь.

Если вы не видите игру, которую хотите транслировать, в Moonlight, вы можете добавить её вручную. Вы также можете транслировать свой рабочий стол и запускать всё, что угодно.