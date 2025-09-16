#!/bin/bash

# Подготовка к извлечению spec
TEMP_EDITOR=$EDITOR

cat > /tmp/copy_editor.sh << 'EOF'
#!/bin/bash
# $1 - временный файл от rpmrebuild
cp -f "$1" ./kernel.spec
# Возвращаем успешный статус
exit 0
EOF

chmod +x /tmp/copy_editor.sh

EDITOR=/tmp/copy_editor.sh

# Создаем папки для каждого файла и перемещаем файлы
for file in *; do
    # Пропускаем директории и сам скрипт, если он находится в этой папке
    if [[ -f "$file" ]]; then
        # Создаем директорию с именем файла (без расширения .rpm)
        dir_name="${file%.*}"
        mkdir -p "$dir_name"
        
        # Перемещаем файл в соответствующую директорию
        mv "$file" "$dir_name/"
        
        echo "Перемещен пакет $file в директорию $dir_name/"

        echo "Начинаем извлекать содержимое пакета"
        rpm2cpio "$dir_name/$file" | cpio -idmv -D "$dir_name/"

        echo "Начинаем извлекать spec пакета"
        echo "n" | rpmrebuild -e -p "$dir_name/$file"
        mv kernel.spec "$dir_name/$file.spec"
    fi
done

echo "Все файлы успешно распределены по папкам и распакованы!"

rm -rf /tmp/copy_editor.sh

EDITOR=$TEMP_EDITOR

#Зависимости которые нужно решать (это из основного пакета):
#    /usr/sbin/new-kernel-pkg (требуется дважды) !
#    dracut >= 033-283 ТИПА ЕСТЬ
#    fileutils ТИПА ЕСТЬ
#    grubby >= 8.28-2 !
#    initscripts >= 8.11.1-1 !
#    linux-firmware >= 20160615-46 !
#    module-init-tools >= 3.16-2 ТИПА ЕСТЬ
#    system-release !