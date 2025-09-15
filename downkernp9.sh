#!/bin/bash

# Базовый URL
BASE_URL="https://ftp.altlinux.org/pub/distributions/ALTLinux/p9/branch/"

# Массив поддиректорий для поиска
SUBDIRS=("noarch/RPMS.classic/" "x86_64/RPMS.classic/" "x86_64-i586/RPMS.classic/")

# Создаем основную директорию
mkdir -p "ALTLinux/p9/branch"

# Переходим в директорию branch
cd "ALTLinux/p9/branch" || exit 1

# Функция для скачивания файлов из указанной директории
download_kernel_files() {
    local subdir="$1"
    local url="${BASE_URL}${subdir}"

    echo "=== Обрабатываю директорию: $subdir ==="

    # Создаем полную структуру каталогов (включая RPMS.classic)
    mkdir -p "$subdir"

    # Переходим в созданную директорию
    pushd "$subdir" > /dev/null || exit 1

    # Получаем список файлов, начинающихся с 'kernel' используя curl
    echo "Получаю список файлов из: $url"
    files=$(curl -s "$url" | grep -o 'href="[^"]*"' | sed 's/href="//;s/"$//' | grep '^kernel' | grep -v '/$')

    if [ -n "$files" ]; then
        echo "Найдены файлы:"
        echo "$files"
        echo "------------------------"

        # Скачиваем каждый файл
        for file in $files; do
            echo "Скачиваю: $file"
            wget -q --show-progress -c "${url}${file}"
        done
    else
        echo "Файлы, начинающиеся с 'kernel', не найдены"
    fi

    echo "------------------------"

    # Возвращаемся обратно
    popd > /dev/null
}

# Обрабатываем каждую поддиректорию
for subdir in "${SUBDIRS[@]}"; do
    download_kernel_files "$subdir"
done

echo "Завершено скачивание! Все файлы сохранены в структуре каталогов branch/"
echo ""

# Создаем репозиторий
echo "=== Создаю репозиторий ==="
REPO_DIR="$(pwd)"
REPO_NAME="classic"

echo $REPO_DIR

for arch in x86_64-i586 x86_64 noarch; do
    if [ -d "$arch" ]; then
        echo "=== Обрабатываю архитектуру: $arch ==="
        mkdir -p "$REPO_DIR/$arch/base"
        genbasedir --bloat --progress --topdir=. "$arch" "$REPO_NAME"
    else
        echo "Директория $arch не найдена, пропускаю"
    fi
done

echo "Репозиторий успешно создан!"
