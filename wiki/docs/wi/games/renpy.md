# RenPy

## Установка

::: tip
Блин, я пытался собрать пакет, но в RenPy есть некоторые файлы и библиотеки, которые не создаются при компиляции. 
`Ren'Py Source Code: renpy-8.4.1-source.tar.bz2 Contains the source code of the Ren'Py distribution without any binary components.`

И если с pygame_sdl2-2.1.0+renpy8.4.1.tar.gz проблем, в принципе, нет, то вот эти самые бинарники...


Вариант второй: упаковать готовый тарболл.... иииии..... тоже нет. Скомпилированные ELF файлы не проходят валидацию.
:::

Скачиваете архив https://www.renpy.org/latest.html формата `tar.bz2`

Распаковываете в любом месте

Запускаете через sh скрипт

Профит

Ну и кароч, вместо пакета я написал скрипт
```bash
#!/bin/bash

set -e

# Параметры
URL="https://github.com/renpy/renpy/releases/download/8.4.1.25072401/renpy-8.4.1-sdk.tar.bz2"
ARCHIVE_NAME="renpy-8.4.1-sdk.tar.bz2"
DEST_DIR="/opt"
DESKTOP_FILE="/usr/local/share/applications/renpy.desktop"

usage() {
    echo "Использование: $0 [--remove]"
    echo "  Без параметров — устанавливает Ren'Py SDK."
    echo "  --remove      — удаляет установленные файлы и пункт меню."
    exit 1
}

remove() {
    echo "Удаление Ren'Py..."
    rm -rf "$DEST_DIR"
    rm -f "$DESKTOP_FILE"

    # Обновляем кэш приложений, если доступен
    if command -v update-desktop-database &> /dev/null; then
        update-desktop-database /usr/local/share/applications 2>/dev/null || true
    fi

    echo "Ren'Py успешно удалён."
    exit 0
}

install() {
    echo "Скачивание архива..."
    cd /tmp
    rm -f "$ARCHIVE_NAME"
    if ! wget --show-progress "$URL" -O "/tmp/$ARCHIVE_NAME"; then
        echo "Ошибка: не удалось скачать архив."
        exit 1
    fi

    # Определяем имя папки внутри архива (берём первую запись верхнего уровня)
    TOP_DIR=$(tar -tjf "$ARCHIVE_NAME" --exclude '*/*' | head -n1 | sed 's:/$::')
    if [ -z "$TOP_DIR" ]; then
        echo "Ошибка: не удалось определить корневую папку в архиве."
        exit 1
    fi

    echo "Распаковка архива в /opt..."
    tar -xjf "$ARCHIVE_NAME" -C /opt

    # Удаляем старую /opt/renpy, если существует
    if [ -e /opt/renpy ]; then
        rm -rf /opt/renpy
    fi

    # Переименовываем распакованную папку в /opt/renpy
    mv "/opt/$TOP_DIR" /opt/renpy

    if [ "$EUID" -eq 0 ] && [ -n "$SUDO_USER" ]; then
        TARGET_USER="$SUDO_USER"
        TARGET_GROUP="$(id -gn "$SUDO_USER")"
    else
        TARGET_USER="$(whoami)"
        TARGET_GROUP="$(id -gn)"
    fi

    chown -R "$TARGET_USER:$TARGET_GROUP" /opt/renpy

    ICON_PATH="$DEST_DIR/renpy-8.4.1-sdk/doc/_static/navbar-logo.png"
    echo "Создание пункта меню приложений..."
    mkdir -p "$(dirname "$DESKTOP_FILE")"

    cat <<EOF | tee "$DESKTOP_FILE" > /dev/null
[Desktop Entry]
Name=Ren'Py
Comment=Ren'Py Visual Novel Engine SDK
Exec=$DEST_DIR/renpy-8.4.1-sdk/renpy.sh
Icon=$ICON_PATH
Terminal=false
Type=Application
Categories=Development;Game;
StartupNotify=true
EOF

    chmod +x "$DESKTOP_FILE"

    if command -v update-desktop-database &> /dev/null; then
        update-desktop-database /usr/local/share/applications 2>/dev/null || true
    fi

    rm -rf /tmp/renpy*

    echo "Установка завершена. Ren'Py доступен в меню приложений."
}

# Основная логика
if [ "$(id -u)" -ne 0 ]; then
    echo "Этот скрипт должен запускаться от имени root (или через sudo)."
    exit 1
fi

case "${1:-}" in
    --remove)
        remove
        ;;
    "")
        install
        ;;
    *)
        echo "Неизвестный параметр: $1"
        usage
        ;;
esac
```

Запускаем под рутом. Если запустиь его без параметров, он установит RenPy 8.4.1 (на 17.10.2025 это текущая стабильная версия), если же с параметром --remove, то скрипт удалит всё, что создал.

