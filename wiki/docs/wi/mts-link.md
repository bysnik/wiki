# MTS Link

![](https://alt-gnome.wiki/mts-link/mts-link-3.png)

## Установка (Через отдельную перепаковку)

1. Скачать AppImage по ссылке: https://apps.webinar.ru/desktop/latest/mts-link-desktop.AppImage

2. Перепаковать AppImage в RPM:
```bash
epm repack ./mts-link-desktop.AppImage
```

3. Установить перепакованный пакет:
```bash
apt-get install ./mts-link-desktop-1.2.12.46144-epm1.repacked.2.x86_64.rpm
```

## Установка (автоматически)

1. Скачать AppImage по ссылке: https://apps.webinar.ru/desktop/latest/mts-link-desktop.AppImage

2. Установить AppImage:
```bash
epm install ./mts-link-desktop.AppImage
```

## Установка c помощью epm play (Неофициальная сборка)

При наличии пакета eepm, можно установить МТС Линк одной командой:
```bash
epm play mts-link
```

