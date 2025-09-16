#!/bin/bash

# Функция для отображения справки
show_help() {
    echo "Использование: $0 <команда>"
    echo ""
    echo "Команды:"
    echo "  5.10.241-std-def-alt0.c9f.2  - установка данного ядра. Необходим заранее подготовленный локальный репозиторий c9f2"
    echo "  6.12-6.12.41-alt0.c10f.2  - установка данного ядра. Необходим заранее подготовленный локальный репозиторий c10f2"
    echo "  repo-c9f2                    - создание минимального репозитория c9f2 для установки ядра"
    echo "  repo-c10f2                   - создание минимального репозитория c10f2 для установки ядра"
    echo "  create-iso                   - подготовить iso-образ с репозиторием и данным скриптом"
    echo "  burn-iso-interactive         - нарезать iso-образ в интерактивном режиме"
    echo "  help                         - показать эту справку"
    echo ""
    echo "Пример: $0 5.10.241-std-def-alt0.c9f.2"
}

# Функция для запуска установки данного ядра
5.10.241-std-def-alt0.c9f.2() {
    install-kernel "5.10.241-std-def-alt0.c9f.2" "CF2"
}

# Функция для запуска установки данного ядра
6.12-6.12.41-alt0.c10f.2() {
    install-kernel "kernel-image-6.12-6.12.41-alt0.c10f.2" "c10f2"
}

# Функция скачивания репозитория c9f2
repo-c9f2() {
    download-repo "repo/ALTLinux/CF2/branch" "http://update.altsp.su/pub/distributions/ALTLinux/CF2/branch/" \
    "noarch/RPMS.classic/ x86_64/RPMS.classic/ x86_64-i586/RPMS.classic/" "kernel tripso" "classic"
}

# Функция скачивания репозитория p9 !!!!!!!!!!!!!!!!!Не используется!!!!!!!!!!!!!!!!!!!!!!!!
repo-p9() {
    download-repo "repo/ALTLinux/p9/branch" "https://ftp.altlinux.org/pub/distributions/ALTLinux/p9/branch/" \
    "noarch/RPMS.classic/ x86_64/RPMS.classic/ x86_64-i586/RPMS.classic/" "kernel tripso" "classic"
}

# Функция скачивания репозитория c10f2
repo-c10f2() {
    download-repo "repo/ALTLinux/c10f2/branch" "http://update.altsp.su/pub/distributions/ALTLinux/c10f2/branch/" \
    "noarch/RPMS.classic/ x86_64/RPMS.classic/ x86_64-i586/RPMS.classic/" "kernel tripso" "classic"
}

# Функция для запуска установки ядра
install-kernel() {
    local kernelimage="${1}"
    local repo="${2}"
    echo "Запуск процесса установки..."

    # Поиск смонтированного устройства с репозиторием
    REPOISO=$(mount | grep iso | sed 's/.* on \(.*\) type.*/\1/')
    if [ -z "$REPOISO" ]; then
        echo "Путь до смонтированного устройства с репозиторием определить автоматически не удалось!"
        echo ""
        read -p "Укажите абсолютный путь до смонтированного устройства: " REPOISO
    fi

    # Проверяем наличие необходимой поддиректории
    REPO_PATH="$REPOISO/ALTLinux/$repo"
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
    apt-repo add "rpm file:$REPOISO/ALTLinux $repo/branch/x86_64 classic"
    apt-repo add "rpm file:$REPOISO/ALTLinux $repo/branch/x86_64-i586 classic"
    apt-repo add "rpm file:$REPOISO/ALTLinux $repo/branch/noarch classic"

    # Обновление индексов
    apt-get update

    # Установка ядра
    echo "Установка ядра $kernelimage..."
    update-kernel -r $kernelimage -y

    echo "Восстановление настроек к изначальному состоянию..."

    # Восстанавливаем изначальные настройки репозиториев из массива
    apt-repo rm all
    for line in "${lines[@]}"; do
        echo "Подключаем: $line"
        apt-repo add $line
    done

    # Запрос на перезагрузку системы
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

# Функция скачивания репозитория
download-repo() {
    local base_dir="${1}"
    local base_url="${2}"
    local subdirs_input="${3}"
    local packages_input="${4}"
    local repo_name="${5}"

    # Преобразуем строки в массивы
    IFS=' ' read -ra SUBDIRS <<< "$subdirs_input"
    IFS=' ' read -ra PACKAGES <<< "$packages_input"

    # Создаем основную директорию
    mkdir -p "$base_dir"

    # Переходим в основную директорию
    cd "$base_dir" || { echo "Ошибка: не удалось перейти в директорию $base_dir"; return 1; }

    # Функция для скачивания файлов из указанной директории
    download_package_files() {
        local subdir="$1"
        local package="$2"
        local url="${base_url}${subdir}"

        echo "=== Обрабатываю директорию: $subdir для пакета: $package ==="

        # Создаем полную структуру каталогов
        mkdir -p "$subdir"

        # Переходим в созданную директорию
        pushd "$subdir" > /dev/null || return 1

        # Получаем список файлов, начинающихся с указанного пакета используя curl
        echo "Получаю список файлов из: $url"
        files=$(curl -s -f "$url" | grep -o 'href="[^"]*"' | sed 's/href="//;s/"$//' | grep "^$package" | grep -v '/$')

        if [ $? -ne 0 ]; then
            echo "Ошибка при получении данных из $url"
            popd > /dev/null
            return 1
        fi

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

    echo "Завершено скачивание! Все файлы сохранены в структуре каталогов $base_dir"
    echo ""

    # Создаем репозиторий
    echo "=== Создаю репозиторий ==="
    local repo_dir="$(pwd)"

    echo "Локальная копия репозитория находится в: $repo_dir"

    # Находим все уникальные архитектуры из поддиректорий
    declare -A architectures
    for subdir in "${SUBDIRS[@]}"; do
        arch=$(echo "$subdir" | cut -d'/' -f1)
        architectures["$arch"]=1
    done

    for arch in "${!architectures[@]}"; do
        if [ -d "$arch" ]; then
            echo "=== Обрабатываю архитектуру: $arch ==="
            mkdir -p "$repo_dir/$arch/base"
            genbasedir --bloat --progress --topdir=. "$arch" "$repo_name"
        else
            echo "Директория $arch не найдена, пропускаю"
        fi
    done

    echo "Локальная копия репозитория успешно создана в: $repo_dir"
}

# Функция создания iso-образа репозитория + этот скрипт внутри
create-iso() {
    local output_file="${1:-image.iso}"
    local source_dir="${2:-.}"

    # Проверяем существование необходимых файлов
    if [ ! -d "$source_dir/repo/ALTLinux" ]; then
        echo "Ошибка: Директория '$source_dir/ALTLinux' не найдена! Убедитесь, что репозиторий расположен в текущей директории"
        return 1
    fi
    
    if [ ! -f "$source_dir/kernels.sh" ]; then
        echo "Ошибка: Файл '$source_dir/kernels.sh' не найден! Убедитесь, что скрипт расположен в текущей директории"
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
    if mkisofs -o "$output_file" -V "ALT_LINUX_IMAGE" -r -J -allow-lowercase \
    -allow-multidot "$source_dir/repo" "$source_dir/kernels.sh"; then
        echo "ISO образ успешно создан: $output_file"
        echo "Размер файла: $(du -h "$output_file" | cut -f1)"
    else
        echo "Ошибка при создании ISO образа!"
        return 1
    fi

    while true; do

        read -p "Удалить локальную копию репозитория? (Y/n): " answer
        
        # Приводим к нижнему регистру для удобства сравнения
        answer_lower=$(echo "$answer" | tr '[:upper:]' '[:lower:]')
        
        case $answer_lower in
            y|yes|д|да|"" )
                echo "Удаление локальной копии репозитория..."
                rm -rf ./repo/
                echo "Удаление локальной копии репозитория завершено"
                exit 0
                ;;
            n|no|н|нет)
                echo "Удаление локальной копии репозитория отменено"
                exit 0
                ;;
            *)
                echo "Пожалуйста, введите Y (да) или N (нет)"
                ;;
        esac
    done
}    

# Функция для безопасной нарезки устройства
burn-iso-interactive() {

    local iso_file="image.iso"

    if [ ! -f "$iso_file" ]; then
        echo "Ошибка: ISO файл '$iso_file' не существует"
        read -p "Выберите iso-файл (например: image.iso): " iso_file
    fi

    echo "Доступные устройства для записи:"
    echo ""
    
    # Показываем список устройств (исключаем системные диски)
    local devices=()
    while IFS= read -r line; do
        if [[ "$line" =~ ^(sd|hd)[a-z][^0-9] ]]; then
            echo "$line"
            devices+=("$(echo "$line" | awk '{print $1}')")
        fi
    done < <(lsblk -o NAME,SIZE,MODEL,VENDOR,MOUNTPOINT | grep -E '^(sd|hd)' | grep -v '├' | grep -v '└' | grep -v "$(mount | grep ' / ' | cut -d' ' -f1 | sed 's/[0-9]//g')")

    if [ ${#devices[@]} -eq 0 ]; then
        echo "Не найдено подходящих устройств для записи"
        echo "Подключите USB флешку или DVD устройство"
        return 1
    fi

    echo ""
    read -p "Выберите устройство (например: sda): " device_choice
    
    if [ -z "$device_choice" ]; then
        echo "Отмена операции"
        return 0
    fi

    # Проверяем выбор
    if [[ ! " ${devices[@]} " =~ " ${device_choice} " ]]; then
        echo "Ошибка: Устройство $device_choice не найдено в списке"
        return 1
    fi

    # Запускаем запись
    local target_device="/dev/$device_choice"
    local block_size="4M"
    local confirm="no"

    # Проверка наличия необходимых утилит
    if ! command -v dd &> /dev/null; then
        echo "Ошибка: dd не установлен"
        return 1
    fi

    if ! command -v lsblk &> /dev/null; then
        echo "Ошибка: lsblk не установлен"
        return 1
    fi

    # Получаем информацию об устройстве
    local device_info=$(lsblk -o NAME,SIZE,MODEL,VENDOR,MOUNTPOINT -r "$target_device" 2>/dev/null)
    if [ -z "$device_info" ]; then
        echo "Ошибка: Не удалось получить информацию об устройстве $target_device"
        return 1
    fi
    # Получаем точку монтирования
    local mount_points=$(lsblk -n -o MOUNTPOINT "$target_device" | grep -v '^$' | head -1)

    # Если устройство смотрировано:
    if [ -n "$mount_points" ]; then
        echo "Предупреждение: Устройство $target_device имеет точки монтирования:"
        echo "$mount_points"
        echo ""
        echo "Выберите действие:"
        echo "r) Размонтировать и продолжить"
        echo "c) Отменить операцию"
        echo "f) Принудительно продолжить (рискованно)"
        echo ""
        
        read -p "Ваш выбор (r/c/f): " choice
        
        case $choice in
            r|R)
                echo "Размонтирование..."
                for mount in $mount_points; do
                    if ! sudo umount "$mount"; then
                        echo "Ошибка при размонтировании $mount. Отмена."
                        return 1
                    fi
                done
                echo "Размонтирование завершено успешно."
                ;;
            c|C)
                echo "Операция отменена."
                return 1
                ;;
            f|F)
                echo "Продолжаем без размонтирования (рискованно)..."
                ;;
            *)
                echo "Неверный выбор. Отмена операции."
                return 1
                ;;
        esac
    fi

    # Размер ISO и устройства
    local iso_size=$(du -h "$iso_file" | cut -f1)
    local device_size=$(lsblk -b -o SIZE -r "$target_device" | head -1)
    local iso_size_bytes=$(stat -c%s "$iso_file")

    # Проверка что устройство достаточно большое
    if [ "$iso_size_bytes" -gt "$device_size" ]; then
        echo "Ошибка: Размер ISO ($iso_size) больше размера устройства ($(echo "$device_size/1024/1024" | bc)M)"
        return 1
    fi

    # Подтверждение действия
    echo "=== ПОДТВЕРЖДЕНИЕ ЗАПИСИ ==="
    echo "ISO файл:    $iso_file ($iso_size)"
    echo "Устройство:  $target_device"
    echo "Размер блока: $block_size"
    echo "Информация об устройстве:"
    lsblk -o NAME,SIZE,MODEL,VENDOR,MOUNTPOINT -r "$target_device"
    echo ""
    echo "ВНИМАНИЕ: Все данные на устройстве будут уничтожены!"
    echo ""

    if [ "$confirm" != "confirm" ]; then
        read -p "Вы уверены что хотите продолжить? (y/N): " answer
        if [[ ! "$answer" =~ ^[Yy]$ ]]; then
            echo "Отмена операции"
            return 0
        fi
    fi

    # Запись ISO на устройство
    echo "Начинаю запись ISO на устройство..."

    # Выполняем запись
    if dd if="$iso_file" of="$target_device" bs="$block_size" status=progress oflag=sync; then
        echo ""
        echo "Запись успешно завершена!"
        echo "Синхронизация данных..."
        # Синхронизируем данные
        sync
        
        echo "Устройство готово к использованию"
        return 0
    else
        echo ""
        echo "Ошибка записи!"
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
    6.12-6.12.41-alt0.c10f.2)
        6.12-6.12.41-alt0.c10f.2
        ;;
    repo-c9f2)
        repo-c9f2
        ;;
    repo-c10f2)
        repo-c10f2
        ;;
    create-iso)
        create-iso
        ;;
    burn-iso-interactive)
        burn-iso-interactive
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