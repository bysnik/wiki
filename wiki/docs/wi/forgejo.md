# Forgejo

![alt text](https://static.wikia.nocookie.net/logopedia/images/2/28/Forgejo.svg)

Forgejo — это свободная и открытая платформа для хостинга Git-репозиториев, созданная как дружелюбный **форк проекта [Gitea](gitea)** в ответ на изменения в его управлении. Она предоставляет все ключевые функции для совместной разработки: управление репозиториями, отслеживание задач (issues), pull requests, встроенный CI/CD, вики, а также инструменты для управления проектами и командами.

https://packages.altlinux.org/ru/sisyphus/srpms/forgejo/

https://docs.altlinux.space/

## Установка Forgejo

```bash
apt-get install forgejo
```

Остальные этапы установки производятся абсолютно также, как и при установке [Gitea](gitea), единственное отличие, это расположение файла `app.ini`: `/etc/forgejo/app.ini`