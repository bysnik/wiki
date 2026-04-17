# Протокол NTP

## Решение проблем

1. Проверьте сетевую доступность Вашего NTP-сервера командой:
```bash
chronyd -Q 'server 0.ru.pool.ntp.org iburst'
```
заменив `0.ru.pool.ntp.org` на адрес Вашего сервера.

2. Посмотрите подробную статистику, происходят ли какие-то измерения вообще:
```bash
chronyc sourcestats -v
```
3. Если системное время "ушло" так далеко, что chronyd отказывается синхронизироваться, нужно сделать следующее:
Выключить сервис chrony:
```bash
systemctl stop chronyd
```
Установить время вручную:
```bash
ntpdate -s 0.ru.pool.ntp.org
```
Включить сервис chrony:
```bash
systemctl start chronyd
```
После чего выполнить:
```bash
chronyc makestep
chronyc sources -v
```