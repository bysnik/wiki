# K9s

![](https://k9scli.io/assets/screens/pulses.png)

https://k9scli.io/

## Установка

```bash
apt-get install k9s
```

### Предполетная проверка

K9s использует терминальный режим с 256 цветами. В системе `Nix убедитесь, что параметр TERM настроен соответствующим образом.
```bash
export TERM=xterm-256color
```

Чтобы выдавать команды редактирования ресурсов, убедитесь, что переменные окружения EDITOR и/или KUBE_EDITOR установлены.
```bash
# Kubectl edit command will use this env var.
export KUBE_EDITOR=my_fav_editor
```