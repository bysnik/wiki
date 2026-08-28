# QEMU-KVM

## Не работал NAT (доступ в интернет) даже у дефолтного vmbr0

1. Проверь настройки ipv4_forward

2. Бэкенд файрвола Libvirt: В некоторых дистрибутивах Libvirt по умолчанию использует nftables, что может вызывать проблемы. Принудительно переключите его на iptables.

Отредактируйте файл `/etc/libvirt/network.conf`.

Добавьте или раскомментируйте строку:
```
firewall_backend = "iptables"
```
Перезапустите службу Libvirt:
```bash
systemctl restart libvirtd
```