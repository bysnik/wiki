# Cockpit

![](https://cockpit-project.org/images/279-dark-mode-support.gif)

В дополнение к веб-интерфейсу Alterator-а неплохо поставить админский веб-интерфейс Cockpit. (Веб-интерфейс: мониторинг ресурсов, управление службами, сетью, хранилищами, контейнерами, терминал в браузере)

```bash
apt-get install cockpit
```
Включение и запуск службы:
```bash
systemctl enable cockpit.socket
systemctl start cockpit
```