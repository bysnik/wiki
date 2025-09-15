#!/bin/bash

# Функция для отображения справки
show_help() {
    echo "Использование: $0 <команда>"
    echo ""
    echo "Команды:"
    echo "  5.10.241-std-def-alt0.c9f.2  - установка данного ядра"
    echo "  repo-c9f2                    - создание минимального репозитория c9f2 для установки ядра"
    echo "  create-iso                   - подготовить iso-образ с репозиторием и данным скриптом"
    echo "  help                         - показать эту справку"
    echo ""
    echo "Пример: $0 5.10.241-std-def-alt0.c9f.2"
}

# Функция для запуска установки данного ядра
5.10.241-std-def-alt0.c9f.2() {
    echo "Запуск процесса установки..."

    # Поиск iso с репозиторием
    REPOISO=$(mount | grep iso | sed 's/.* on \(.*\) type.*/\1/')
    if [ -z "$REPOISO" ]; then
        echo "Ошибка: Не найден ISO образ с репозиториями"
        exit 1
    fi

    # Проверяем наличие необходимой поддиректории
    REPO_PATH="$REPOISO/ALTLinux/CF2"
    if [ ! -d "$REPO_PATH" ]; then
        echo "Ошибка: В ISO образе не найдена необходимая структура директорий"
        echo "Ожидаемый путь: $REPO_PATH"
        echo "Найденные директории в $REPOISO:"
        ls -la "$REPOISO" 2>/dev/null || echo "Не удалось прочитать содержимое ISO"
        exit 1
    fi

    echo "Используется репозиторий: $REPO_PATH"

    # Сохраняем изначальные настройки репозиториев в массив
    echo "Сохранение текущих настроек репозиториев..."
    mapfile -t lines < <(apt-repo)

    # Удаляем текущие настройки репозиториев и подключаем собственную репу из iso
    echo "Подключение временного репозитория..."
    apt-repo rm all
    apt-repo add "rpm file:$REPOISO/ALTLinux CF2/branch/x86_64 classic"
    apt-repo add "rpm file:$REPOISO/ALTLinux CF2/branch/x86_64-i586 classic"
    apt-repo add "rpm file:$REPOISO/ALTLinux CF2/branch/noarch classic"

    # Обновление индексов
    apt-get update

    # Установка ядра
    echo "Установка ядра 5.10.241-std-def-alt0.c9f.2..."
    update-kernel -r 5.10.241-std-def-alt0.c9f.2 -y

    echo "Восстановление настроек к изначальному состоянию..."

    # Восстанавливаем изначальные настройки репозиториев из массива
    apt-repo rm all
    for line in "${lines[@]}"; do
        echo "Подключаем: $line"
        apt-repo add $line
    done

    confirm_reboot
}

# Функция подтверждения перезагрузки
confirm_reboot() {
    while true; do

        read -p "Перезагрузить компьютер сейчас? (Y/n): " answer
        
        # Приводим к нижнему регистру для удобства сравнения
        answer_lower=$(echo "$answer" | tr '[:upper:]' '[:lower:]')
        
        case $answer_lower in
            y|yes|д|да|"" )
                echo "Перезагрузка компьютера..."
                reboot
                break
                ;;
            n|no|н|нет)
                echo "Перезагрузка отменена"
                exit 0
                ;;
            *)
                echo "Пожалуйста, введите Y (да) или N (нет)"
                ;;
        esac
    done
}

repo-c9f2() {
    # Базовый URL
    BASE_URL="http://update.altsp.su/pub/distributions/ALTLinux/CF2/branch/"

    # Массив поддиректорий для поиска
    SUBDIRS=("noarch/RPMS.classic/" "x86_64/RPMS.classic/" "x86_64-i586/RPMS.classic/")

    # Пакеты для скачивания (kernel и tripso)
    PACKAGES=("kernel" "tripso")

    # Создаем основную директорию
    mkdir -p "ALTLinux/CF2/branch"

    # Переходим в директорию branch
    cd "ALTLinux/CF2/branch" || exit 1

    # Функция для скачивания файлов из указанной директории
    download_package_files() {
        local subdir="$1"
        local package="$2"
        local url="${BASE_URL}${subdir}"

        echo "=== Обрабатываю директорию: $subdir для пакета: $package ==="

        # Создаем полную структуру каталогов (включая RPMS.classic)
        mkdir -p "$subdir"

        # Переходим в созданную директорию
        pushd "$subdir" > /dev/null || exit 1

        # Получаем список файлов, начинающихся с указанного пакета используя curl
        echo "Получаю список файлов из: $url"
        files=$(curl -s "$url" | grep -o 'href="[^"]*"' | sed 's/href="//;s/"$//' | grep "^$package" | grep -v '/$')

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
            echo "Файлы, начинающиеся с '$package', не найдены"
        fi

        echo "------------------------"

        # Возвращаемся обратно
        popd > /dev/null
    }

    # Обрабатываем каждую поддиректорию для каждого пакета
    for subdir in "${SUBDIRS[@]}"; do
        for package in "${PACKAGES[@]}"; do
            download_package_files "$subdir" "$package"
        done
    done

    echo "Завершено скачивание! Все файлы сохранены в структуре каталогов branch/"
    echo ""

    # Создаем репозиторий
    echo "=== Создаю репозиторий ==="
    REPO_DIR="$(pwd)"
    REPO_NAME="classic"

    echo "Репозиторий находится в: $REPO_DIR"

    for arch in x86_64-i586 x86_64 noarch; do
        if [ -d "$arch" ]; then
            echo "=== Обрабатываю архитектуру: $arch ==="
            mkdir -p "$REPO_DIR/$arch/base"
            genbasedir --bloat --progress --topdir=. "$arch" "$REPO_NAME"
        else
            echo "Директория $arch не найдена, пропускаю"
        fi
    done

    echo "Репозиторий успешно создан в текущей директории!"
}

create-iso() {
    local output_file="${1:-image.iso}"
    local source_dir="${2:-.}"

    # Проверяем существование необходимых файлов
    if [ ! -d "$source_dir/ALTLinux" ]; then
        echo "Ошибка: Директория '$source_dir/ALTLinux' не найдена!"
        return 1
    fi
    
    if [ ! -f "$source_dir/kernels.sh" ]; then
        echo "Ошибка: Файл '$source_dir/kernels.sh' не найден!"
        return 1
    fi
    
    # Проверяем наличие утилиты mkisofs
    if ! command -v mkisofs &> /dev/null; then
        echo "Ошибка: Утилита 'mkisofs' не установлена!"
        echo "Установите пакет genisoimage"
        return 1
    fi
    
    echo "Создание ISO образа..."
    echo "Выходной файл: $output_file"
    echo "Исходная директория: $source_dir"
    
    # Создаем ISO образ
    if mkisofs -o "$output_file" -V "ALT_LINUX_IMAGE" "$source_dir/ALTLinux" "$source_dir/kernels.sh"; then
        echo "ISO образ успешно создан: $output_file"
        echo "Размер файла: $(du -h "$output_file" | cut -f1)"
        return 0
    else
        echo "Ошибка при создании ISO образа!"
        return 1
    fi
}    


if [ $# -eq 0 ]; then
    echo "Ошибка: Не указан параметр!"
    show_help
    exit 1
elif [ $# -eq 1 ]; then
    echo "Указан параметр: $1"
elif [ $# -gt 1 ]; then
    echo "Ошибка: Указано слишком много параметров. Необходимо указать только один параметр"
    show_help
    exit 1
fi

# Обработка аргументов
case "$1" in
    5.10.241-std-def-alt0.c9f.2)
        5.10.241-std-def-alt0.c9f.2
        ;;
    repo-c9f2)
        repo-c9f2
        ;;
    create-iso)
        create-iso
        ;;
    help)
        show_help
        ;;
    *)
        echo "Ошибка: Неизвестная команда '$1'"
        show_help
        exit 1
        ;;
esac

exit 0