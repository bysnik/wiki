https://docs.docker.com/desktop/troubleshoot-and-support/faqs/linuxfaqs/

epm play docker-desktop

grep "$USER" /etc/subuid >> /dev/null 2&>1 || (echo "$USER:100000:65536" | sudo tee -a /etc/subuid)

grep "$USER" /etc/subgid >> /dev/null 2&>1 || (echo "$USER:100000:65536" | sudo tee -a /etc/subgid)


apt-get install shadow-submap

control newgidmap public

control newuidmap public

Ну, ошибок больше нет, но Docker Engine тупо не стартует