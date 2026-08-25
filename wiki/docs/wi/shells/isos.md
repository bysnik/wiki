# Обновление локального хранилища с дистрами Альт

Ну, он у меня в кроне стоит на @reboot, он чекает репу на наличие новых исошников, если есть - скачивает, если нет, проверяет MD5SUM у локальных исошников.

::: details Сам Скрипт
```bash
#!/bin/bash

set -euo pipefail

BASE_URL="https://download.basealt.ru/pub/distributions/ALTLinux/p11/images"
DOWNLOAD_DIR="$HOME/Загрузки/isos"
LOG_FILE="$HOME/.altlinux-updater.log"

DIRS=(
    "education"
    "kworkstation"
    "server"
    "simply"
    "virtualization"
    "workstation"
)

# ------------------------------------------------------------
log() {
    local level="$1"
    local msg="$2"
    local timestamp
    timestamp=$(date --rfc-3339=seconds)
    echo "$timestamp $HOSTNAME ${0##*/}[$$]: $level: $msg" | tee -a "$LOG_FILE"
}

# ------------------------------------------------------------
get_latest_iso_remote() {
    local dir="$1"
    if [[ "$dir" == "kworkstation" ]]; then
        local url="$BASE_URL/$dir/"
    else
        local url="$BASE_URL/$dir/x86_64/"
    fi
    local tmpfile

    tmpfile=$(mktemp)
    trap 'rm -f "$tmpfile"' RETURN

    log "DEBUG" "Запрос к $url" >&2
    if ! curl -sSL "$url" > "$tmpfile"; then
        log "ERROR" "Не удалось получить список файлов из $url" >&2
        return 1
    fi

    all_isos=$(grep -o 'href="[^"]*\.iso"' "$tmpfile" | sed 's/href="//;s/"//' || true)
    log "DEBUG" "Все найденные ISO: $all_isos" >&2

    filtered_isos=$(echo "$all_isos" | grep -v -- '-live-' || true)
    log "DEBUG" "После исключения live: $filtered_isos" >&2

    latest=$(echo "$filtered_isos" | sort -V | tail -n1 | tr -d '\r')
    if [[ -z "$latest" ]]; then
        log "WARN" "Установочные ISO-файлы не найдены в $url" >&2
        return 1
    fi

    log "INFO" "Найден актуальный ISO: $latest" >&2
    echo "$latest"
}

# ------------------------------------------------------------
check_and_download() {
    local dir="$1"
    local iso_name="$2"
    if [[ "$dir" == "kworkstation" ]]; then
        local url="$BASE_URL/$dir/"
    else
        local url="$BASE_URL/$dir/x86_64/"
    fi
    local local_path="$DOWNLOAD_DIR/$iso_name"
    local sum_file=""
    local sum_type=""

    if [[ ! -f "$local_path" ]]; then
        log "INFO" "Скачиваем $iso_name ..."
        if ! wget -q --show-progress -O "$local_path" "$url/$iso_name"; then
            log "ERROR" "Ошибка скачивания $iso_name"
            return 1
        fi
        log "INFO" "Скачивание завершено"
    else
        log "INFO" "Файл уже существует: $local_path"
    fi

    local sha_file="$DOWNLOAD_DIR/SHA512SUM.$dir.tmp"
    if curl -sSL -o "$sha_file" "$url/SHA512SUM"; then
        log "INFO" "Проверяем SHA512SUM"
        expected_sum=$(grep -F "$iso_name" "$sha_file" | head -n1 | awk '{print $1}')
        if [[ -n "$expected_sum" ]]; then
            sum_file="$sha_file"
            sum_type="SHA512"
        else
            rm -f "$sha_file"
        fi
    fi

    if [[ -z "$sum_file" ]]; then
        local md5_file="$DOWNLOAD_DIR/MD5SUM.$dir.tmp"
        if curl -sSL -o "$md5_file" "$url/MD5SUM"; then
            log "INFO" "Проверяем MD5SUM"
            expected_sum=$(grep -F "$iso_name" "$md5_file" | head -n1 | awk '{print $1}')
            if [[ -n "$expected_sum" ]]; then
                sum_file="$md5_file"
                sum_type="MD5"
            else
                rm -f "$md5_file"
            fi
        fi
    fi

    if [[ -z "$sum_file" ]]; then
        log "ERROR" "Не удалось найти контрольную сумму для $iso_name (ни SHA512, ни MD5)"
        return 1
    fi

    if [[ "$sum_type" == "SHA512" ]]; then
        actual_sum=$(sha512sum "$local_path" | awk '{print $1}')
    else
        actual_sum=$(md5sum "$local_path" | awk '{print $1}')
    fi

    if [[ "$expected_sum" == "$actual_sum" ]]; then
        log "INFO" "Контрольная сумма ($sum_type) совпадает для $iso_name"
        log "INFO" "  Ожидаемая: $expected_sum"
        log "INFO" "  Фактическая: $actual_sum"
        rm -f "$sum_file"
        return 0
    else
        log "ERROR" "Контрольная сумма ($sum_type) НЕ совпадает для $iso_name"
        log "ERROR" "  Ожидаемая: $expected_sum"
        log "ERROR" "  Фактическая: $actual_sum"
        rm -f "$local_path"
        rm -f "$sum_file"
        log "INFO" "Удалён повреждённый файл, повторяем попытку..."
        check_and_download "$dir" "$iso_name"
        return $?
    fi
}

# ------------------------------------------------------------
main() {
    log "INFO" "Ожидание доступности сети..."
    network_ok=0
    for i in {1..30}; do
        if ping -c 1 -W 1 download.basealt.ru &>/dev/null; then
            log "INFO" "Сеть доступна"
            network_ok=1
            break
        fi
        sleep 2
    done
    if [[ $network_ok -eq 0 ]]; then
        log "ERROR" "Сеть недоступна, выход"
        exit 1
    fi

    log "INFO" "========== Запуск обновления ISO =========="

    mkdir -p "$DOWNLOAD_DIR"

    for dir in "${DIRS[@]}"; do
        log "INFO" "Обрабатываем каталог: $dir"

        latest_iso=$(get_latest_iso_remote "$dir") || continue
        log "INFO" "Актуальный ISO: $latest_iso"

        local local_path="$DOWNLOAD_DIR/$latest_iso"
        log "DEBUG" "Проверяем существование файла: $local_path"
        if [[ -f "$local_path" ]]; then
            log "INFO" "Файл уже есть, проверяем контрольную сумму..."
            if check_and_download "$dir" "$latest_iso"; then
                log "INFO" "$dir: всё актуально (повторное скачивание не требуется)"
            else
                log "ERROR" "$dir: проблема с контрольной суммой, файл перекачан"
            fi
        else
            log "INFO" "Удаляем старые установочные ISO для $dir"
            find "$DOWNLOAD_DIR" -maxdepth 1 -type f -name "alt-$dir-*.iso" ! -name "$latest_iso" -delete 2>/dev/null || true

            if check_and_download "$dir" "$latest_iso"; then
                log "INFO" "$dir: успешно обновлён (скачан новый ISO)"
            else
                log "ERROR" "$dir: не удалось получить корректный ISO"
            fi
        fi
    done

    log "INFO" "========== Обновление завершено =========="
}

main "$@"
```
:::