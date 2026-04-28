# Tmux

## Настройка мыши

Добавить строку в файл конфига:
```bash
nano ~/.tmux.conf
```
```
set -g mouse on
```

Если уже запущен сеанс:
```bash
tmux source-file ~/.tmux.conf
```

Или перезапустите сессию:
```bash
tmux kill-server && tmux
```