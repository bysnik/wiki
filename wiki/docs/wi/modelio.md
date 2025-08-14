# Modelio

1. Скачать самый свежий rpm-пакет с сайта https://www.modelio.org/index.htm

2. Пересобрать этот пакет:
```bash
epm repack modelio-open-source<версия>.rpm
```

3. Установить перепакованный пакет через apt:
```bash
apt-get install modelio-open-source<версия>-epm1.repacked.<дата>.x86_64.rpm
```

4. Бинарник находится по пути `/usr/lib64/modelio-open-source5.4/modelio`, а не `/usr/bin/modelio-open-source<версия>`, но ярлык будет битый. Либо правьте ярлык, либо сделайте ссылку.

У меня на KDE6 Wayland проблема. При запуске приложения под рутом оно отображается корректно:
![alt text](/public/img/modelio.png)

Но под обычным пользователем его плющит не по детски:
![alt text](/public/img/modelio-1.png)