# BSS Crypto Plugin

Ссылка на плагин в формате для Астра Линукс: https://online.abr.ru/ru/help/download/bssCryptoPlugin_3036.deb.run


## Установка в Альт Линукс

::: warning
Предупреждаю, у этого пакета плохая структура (он библиотеки хранит в `/usr/share/`. Правильнее будет не как я, просто перепаковывать, а ещё и нормально пересобрать пакет)

Моя коллега пересобрала пакет: [bssCryptoPlugin-3.20.2.3036-alt1.x86_64.rpm](https://raw.githubusercontent.com/bysnik/wiki/main/rpms/bssCryptoPlugin-3.20.2.3036-alt1.x86_64.rpm)
:::

1. Выдаем права на исполнение файлу:
```bash
chmod +x ./bssCryptoPlugin_3036.deb.run
```

2. Распаковываем файл без запуска:
```bash
./bssCryptoPlugin_3036.deb.run --noexec --target ./extracted
```

3. Перупаковываем deb-пакет:
```bash
epm repack ./extracted/bssCryptoPlugin.deb
```

4. Устанавливаем собранный RPM-пакет:
```bash
epm install ./extracted/bssCryptoPlugin-3.20.2.3036-epm1.repacked.2.x86_64.rpm
```

5. Необходимо сделать символические ссылки:
```bash
ln -s /usr/lib64/libssl.so.3 /usr/lib64/libssl.so.1.1
```
```bash
ln -s /usr/lib64/libcrypto.so.3 /usr/lib64/libcrypto.so.1.1
```