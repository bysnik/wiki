# Git и Obsidian

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/48a/fd9/2b8/48afd92b8f85bbe3d9c96cb54ae059e4.png)

<iframe
  src="https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=git-obsidian.drawio#Uhttps%3A%2F%2Fbysnik.github.io%2Fwiki%2Fpublic%2Fstatic%2Fgit-obsidian.drawio"
  width="100%"
  height="600px"
  frameborder="0"
  allowfullscreen
></iframe>

Очевидно, что этот гайд взят с https://habr.com/ru/articles/843288/ Картинку нужно переделать под себя

Это инструкция по настройке git-репозитория, на примере`gitlab.basealt.space`, в качестве удалённого хранилища Obsidian.

1. Переходим и авторизуемся на сайте: gitlab.basealt.space
![](/public/img/Pastedimage20250818101434.png)

2. Слева вверху нажимаем на "Плюс" и выбираем "New project/repository"
![](/public/img/Pastedimage20250818101453.png)

3. Выбираем "Create blank project"
![](/public/img/Pastedimage20250818101505.png)

4. Заполняем имя проекта и ставим чек напротив пункта "Initialize repository with a README", после чего нажимаем "Create project"
![](/public/img/Pastedimage20250818101527.png)

5. Оказываемся в созданном репозитории. Сверху нажимаем на "Плюс" и выбираем "New file"
![](/public/img/Pastedimage20250818101543.png)

6. Название файла `.gitignore`, содержимое: `.obsidian`. Нажимаем "Commin changes"
![](/public/img/Pastedimage20250818101605.png)

7. Вновь нажимаем "Commin changes"
![](/public/img/Pastedimage20250818101631.png)

8. Проверяем созданный файл.
![](/public/img/Pastedimage20250818101653.png)

>Комментарий: файл `.gitignore` нужен, чтобы не синхронизировать папку `.obsidian`, в которой находятся локальные настройки (конфликтуют на разных устройствах при синхронизации). Если этого не сделать — вся схема перестанет работать.

9. Слева вверху нажимаем на значок пользователя и выбираем пункт "Preferences"
![](/public/img/Pastedimage20250818101801.png)

10. Переходим в раздел "Access tokens" и нажимаем на "Add new token"
![](/public/img/Pastedimage20250818101814.png)

11. Указываем название токена, дату истечения срока годности, а также ставим чек напротив пунктов как на скриншотах:
![](/public/img/Pastedimage20250818101925.png)
![](/public/img/Pastedimage20250818102035.png)

12. Нажимаем на "Create token". Копируем его. Это единственный раз, когда он будет доступен.
![](/public/img/Pastedimage20250818102054.png)

13. Переходим в терминал. Создаём директорию, в которой будет располагаться наш Vault, например:
```bash
mkdir vaults && cd vaults
```

14. Далее необходимо произвести клонирование репозитория, используя ранее созданный токен:
```bash
git clone https://oauth2:<access_token>@gitlab.basealt.space/<username>/<repo>.git
```

15. Открываем Obsidian, выбираем пункт "Open folder as vault" и выбираем склонированный репозиторий.
![](/public/img/Pastedimage20250818102725.png)

16. На данный момент, в директории располагается только файл `README.md`. 
![](/public/img/Pastedimage20250818102819.png)

17. Слева внизу нажимаем на шестерёнку и выбираем раздел "Community plugin". Далее нажимаем "Turn on community plugins"
![](/public/img/Pastedimage20250818105633.png)

18. Нажимаем "Browse"
![](/public/img/Pastedimage20250818103145.png)

19. В поиске ищем `git`
![](/public/img/Pastedimage20250818103202.png)

20. Устанавливаем плагин нажатием на "Install"
![](/public/img/Pastedimage20250818103212.png)

21. Активируем плагин нажатием на "Enable"
![](/public/img/Pastedimage20250818103226.png)

22. Далее необходимо настроить плагин. Нажимаем на "Options"
![](/public/img/Pastedimage20250818103303.png)

23. Устанавливаем следующие параметры:
- Auto commit-and-sync interval: 1
- Auto commit-and-sync after stopping file edits: yes
![](/public/img/Pastedimage20250818103439.png)

- Pull on startup: yes
![](/public/img/Pastedimage20250818103508.png)

24. Теперь, если произвести какие-нибудь действия с файлами, то в течение минуты все изменения будут отправлены на gitlab
![](/public/img/Pastedimage20250818103748.png)