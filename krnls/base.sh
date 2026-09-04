#!/bin/bash
# Скрипт для автоматической настройки системы:
#  - добавление репозитория bysnik
#  - обновление и полное обновление системы
#  - обновление ядра
#  - разблокировка NOPASSWD для группы wheel
#  - установка VPN-пакетов
#  - включение сервиса AmneziaVPN
#  - выключение ПК

set -e          # остановка при любой ошибке
set -o pipefail # учитывать ошибки в конвейерах

# Проверка, что скрипт запущен от root
if [[ $EUID -ne 0 ]]; then
    echo "Ошибка: этот скрипт должен выполняться от root (sudo)." >&2
    exit 1
fi

echo "=== 1. Создание файла репозитория /etc/apt/sources.list.d/bysnik.list ==="
cat > /etc/apt/sources.list.d/bysnik.list <<EOF
rpm https://raw.githubusercontent.com/bysnik/wiki/main/repo x86_64 classic
rpm https://raw.githubusercontent.com/bysnik/wiki/main/repo i586 classic
rpm https://raw.githubusercontent.com/bysnik/wiki/main/repo noarch classic
EOF

echo "=== 2. Обновление списка пакетов ==="
apt-get update

echo "=== 3. Полное обновление системы ==="
apt-get dist-upgrade -y

echo "=== 4. Обновление ядра ==="
update-kernel -y

echo "=== 5. Раскомментирование строки WHEEL_USERS в /etc/sudoers ==="
# Создаём резервную копию (делается автоматически через -i.bak)
sed -i.bak 's/^# *WHEEL_USERS ALL=(ALL:ALL) NOPASSWD: ALL/WHEEL_USERS ALL=(ALL:ALL) NOPASSWD: ALL/' /etc/sudoers
# Проверяем синтаксис sudoers (критично!)
visudo -c || { echo "Ошибка в /etc/sudoers, откат изменений."; mv /etc/sudoers.bak /etc/sudoers; exit 1; }

echo "=== 6. Установка VPN-пакетов ==="
apt-get install -y zerotier-one zerotier-desktop-ui amnezia-vpn-client kernel-modules-amneziawg-6.12

echo "=== 7. Включение автозапуска AmneziaVPN ==="
systemctl enable AmneziaVPN

echo "=== 8. Выключение системы ==="
systemctl poweroff