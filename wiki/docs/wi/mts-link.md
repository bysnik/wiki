# MTS Link

![](https://alt-gnome.wiki/mts-link/mts-link-3.png)

## Установка (Через отдельную перепаковку) (устарело)

1. Скачать AppImage по ссылке: https://apps.webinar.ru/desktop/latest/mts-link-desktop.AppImage

2. Перепаковать AppImage в RPM:
```bash
epm repack ./mts-link-desktop.AppImage
```

3. Установить перепакованный пакет:
```bash
apt-get install ./mts-link-desktop-1.2.12.46144-epm1.repacked.2.x86_64.rpm
```

## Установка (автоматически) (устарело)

1. Скачать AppImage по ссылке: https://apps.webinar.ru/desktop/latest/mts-link-desktop.AppImage

2. Установить AppImage:
```bash
epm install ./mts-link-desktop.AppImage
```

## Установка c помощью epm play (Неофициальная сборка) (устарело)

При наличии пакета eepm, можно установить МТС Линк одной командой:
```bash
epm play mts-link
```


## !! Новое приложение

Они обновили полностью приложение, старое в начале 2026 года больше не будет работать

https://mts-link.ru/application-desktop/

Скачать тарболл по хорошему, но проще через deb
```bash
epm install --repack mts-link.deb
```

Через тарбол (Откуда я узнал версию? хахаахах, epm вытащил, когда из deb собирал) А без версии epm не сможет пересобрать пакет):
```bash
mv mts-link.tar.gz mts-link-0.80.1.tar.gz
```
```bash
epm install --repack mts-link-0.80.1.tar.gz
```

Но метод говно, он установил фиг знает как

Нужно будет ручками создать нужный ярлык/пункт в меню:

Путь до бинарника: `/opt/mts-link/mtslink`
Путь до иконки: `/opt/mts-link/resources/src/main/assets/appx/Square44x44Logo.png`

По хорошему, нужно самому пакет собрать, но что-то нет желания пересобирать проприетарный пакет