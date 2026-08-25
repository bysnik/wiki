Все мои самосборные пакеты можно устанавливать, не скачивая, например:
```bash
apt-get install https://raw.githubusercontent.com/bysnik/wiki/main/repo/x86_64/RPMS.classic/obs-studio-plugin-rtspserver-3.1.0-alt1.x86_64.rpm
```

Это не полноценный репозиторий, просто `apt` умеет рабоать с пакетами, доступными по сети.

Ну чтож, я на гитхабе сделал теперь свою репу со своими пакетами)

Чтобы его подключить, Вам необходимо создать файл `/etc/apt/sources.list.d/bysnik.list` (вместо bysnik можно написать любое название) и поместить в него следующее:
```
rpm https://raw.githubusercontent.com/bysnik/wiki/main/repo x86_64 classic
rpm https://raw.githubusercontent.com/bysnik/wiki/main/repo i586 classic
rpm https://raw.githubusercontent.com/bysnik/wiki/main/repo noarch classic
```

Эмм, только подключайте эту репу на свой страх и риск. Я, конечно, не пересобираю пакеты которые уже есть в сизифе и его бранчах, но тем ни менее.