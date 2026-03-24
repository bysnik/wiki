# iptables

## Как сохранять правила

1. Настраиваете iptables как надо
2. Сохраняем:
```bash
iptables-save >> /etc/sysconfig/iptables
```
3. Включаем автозапуск при загрузке системы: 
```bash
systemctl enable iptables
```

::: tip
Интересно, что пока файл sysconfig/iptables пустой, сервис iptables будет стартовать с ошибкой
:::

