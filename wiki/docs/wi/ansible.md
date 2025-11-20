# Ansible

![](https://habrastorage.org/getpro/habr/upload_files/81b/5e2/9f1/81b5e29f12b41ba26dff6cdd05848a5b.webp)

использование плагина [nmap](https://docs.ansible.com/ansible/latest/collections/community/general/nmap_inventory.html) в связке с плагином [constructed](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/constructed_inventory.html). При запуске он опрашивает указанные подсети и формирует список хостов для применения плейбуков или ролей, а потом делает свои грязные делишки на отобранные по правилам хосты.