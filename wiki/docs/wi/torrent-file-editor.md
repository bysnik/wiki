# Torrent File Editor

![](/img/torrent-file-editor.png)

https://github.com/torrent-file-editor/torrent-file-editor

Графическое приложение на базе Qt, предназначенное для создания и редактирования .torrent-файлов.

## Сборка из исходников QT6

Установим необходимые зависимости:
```bash
apt-get install qt6-base-devel qt6-tools-devel qt6-svg-devel qt6-5compat-devel
```

Сборка программы:
```bash
git clone --depth 1 --branch v1.0.2 https://github.com/torrent-file-editor/torrent-file-editor.git
```
```bash
cd torrent-file-editor
```
```bash
mkdir build && cd build
```
```bash
cmake -DCMAKE_BUILD_TYPE=Release -DQT6_BUILD=ON ..
```
```bash
make -j$(nproc)
```

Запуск программы:
```bash
./torrent-file-editor
```



