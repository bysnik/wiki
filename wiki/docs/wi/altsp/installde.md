#  Установка окружения работчего стола MATE на Альт СП Сервер 10.2...

Важно: Все шаги выполняются под пользователем root.

1) Необходимо выключить cdrom из списка доступных репозиториев
```bash
apt-repo rm all cdroms
```

2) Проверьте, что cd-rom отсутствует в списке:
```bash
apt-repo
```


3) Для подключения онлайн репозитория выполните команды:
```bash
apt-repo add 'rpm [cert8] http://update.altsp.su/pub/distributions/ALTLinux c10f2/branch/x86_64 classic gostcrypto'
apt-repo add 'rpm [cert8] http://update.altsp.su/pub/distributions/ALTLinux c10f2/branch/x86_64-i586 classic'
apt-repo add 'rpm [cert8] http://update.altsp.su/pub/distributions/ALTLinux c10f2/branch/noarch classic'
```

4) Проверьте, что данные репозитории отображаются:
```bash
apt-repo
```

5) Обновление системы до актуального состояния:
```bash
apt-get update
apt-get dist-upgrade -y
update-kernel -y
integalert fix
```

6) Перезагрузите систему:
```bash
reboot
```

7) После перезагрузки начинаем процесс установки графической оболочки:
```bash
apt-get install mate-default lightdm-gtk-greeter fonts-ttf-dejavu mate-screensaver-screenkeyboard gvfs theme-mate-windows icon-theme-Papirus -y
sed -i 's/#keyboard=/keyboard=onboard --xid/' /etc/lightdm/lightdm-gtk-greeter.conf
systemctl set-default graphical.target
systemctl enable --now lightdm
```
Если все команды были выполнены успешно, сразу же запустится графическая оболочка.