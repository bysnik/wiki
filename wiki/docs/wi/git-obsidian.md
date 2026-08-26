# Git и Obsidian

<ImageZoom src="https://habrastorage.org/r/w1560/getpro/habr/upload_files/48a/fd9/2b8/48afd92b8f85bbe3d9c96cb54ae059e4.png"/>
<!-- <iframe
  src="https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=git-obsidian.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1uLOc04xXk7z97Cc2YDTaqE6XUSPD_-nQ%26export%3Ddownload"
  width="100%"
  height="380px"
  frameborder="0"
></iframe> -->

Очевидно, что этот гайд взят с https://habr.com/ru/articles/843288/

Это инструкция по настройке git-репозитория, на примере`gitlab.basealt.space`, в качестве удалённого хранилища Obsidian.

1. Переходим и авторизуемся на сайте: gitlab.basealt.space
<ImageZoom src="/img/Pastedimage20250818101434.png" />

2. Слева вверху нажимаем на "Плюс" и выбираем "New project/repository"
<ImageZoom src="/img/Pastedimage20250818101453.png" />

3. Выбираем "Create blank project"
<ImageZoom src="/img/Pastedimage20250818101505.png" />

4. Заполняем имя проекта и ставим чек напротив пункта "Initialize repository with a README", после чего нажимаем "Create project"
<ImageZoom src="/img/Pastedimage20250818101527.png" />

5. Оказываемся в созданном репозитории. Сверху нажимаем на "Плюс" и выбираем "New file"
<ImageZoom src="/img/Pastedimage20250818101543.png" />

6. Название файла `.gitignore`, содержимое: `.obsidian`. Нажимаем "Commin changes"
<ImageZoom src="/img/Pastedimage20250818101605.png" />

7. Вновь нажимаем "Commin changes"
<ImageZoom src="/img/Pastedimage20250818101631.png" />

8. Проверяем созданный файл.
<ImageZoom src="/img/Pastedimage20250818101653.png" />

>Комментарий: файл `.gitignore` нужен, чтобы не синхронизировать папку `.obsidian`, в которой находятся локальные настройки (конфликтуют на разных устройствах при синхронизации). Если этого не сделать — вся схема перестанет работать.

9. Слева вверху нажимаем на значок пользователя и выбираем пункт "Preferences"
<ImageZoom src="/img/Pastedimage20250818101801.png" />

10. Переходим в раздел "Access tokens" и нажимаем на "Add new token"
<ImageZoom src="/img/Pastedimage20250818101814.png" />

11. Указываем название токена, дату истечения срока годности, а также ставим чек напротив пунктов как на скриншотах:
<ImageZoom src="/img/Pastedimage20250818101925.png" />
<ImageZoom src="/img/Pastedimage20250818102035.png" />

12. Нажимаем на "Create token". Копируем его. Это единственный раз, когда он будет доступен.
<ImageZoom src="/img/Pastedimage20250818102054.png" />

13. Переходим в терминал. Создаём директорию, в которой будет располагаться наш Vault, например:
```bash
mkdir vaults && cd vaults
```

14. Далее необходимо произвести клонирование репозитория, используя ранее созданный токен:
```bash
git clone https://oauth2:<access_token>@gitlab.basealt.space/<username>/<repo>.git
```

15. Открываем Obsidian, выбираем пункт "Open folder as vault" и выбираем склонированный репозиторий.
<ImageZoom src="/img/Pastedimage20250818102725.png" />

16. На данный момент, в директории располагается только файл `README.md`. 
<ImageZoom src="/img/Pastedimage20250818102819.png" />

17. Слева внизу нажимаем на шестерёнку и выбираем раздел "Community plugin". Далее нажимаем "Turn on community plugins"
<ImageZoom src="/img/Pastedimage20250818105633.png" />

18. Нажимаем "Browse"
<ImageZoom src="/img/Pastedimage20250818103145.png" />

19. В поиске ищем `git`
<ImageZoom src="/img/Pastedimage20250818103202.png" />

20. Устанавливаем плагин нажатием на "Install"
<ImageZoom src="/img/Pastedimage20250818103212.png" />

21. Активируем плагин нажатием на "Enable"
<ImageZoom src="/img/Pastedimage20250818103226.png" />

22. Далее необходимо настроить плагин. Нажимаем на "Options"
<ImageZoom src="/img/Pastedimage20250818103303.png" />

23. Устанавливаем следующие параметры:
- Auto commit-and-sync interval: 1
- Auto commit-and-sync after stopping file edits: yes
<ImageZoom src="/img/Pastedimage20250818103439.png" />

- Pull on startup: yes
<ImageZoom src="/img/Pastedimage20250818103508.png" />

24. Теперь, если произвести какие-нибудь действия с файлами, то в течение минуты все изменения будут отправлены на gitlab
<ImageZoom src="/img/Pastedimage20250818103748.png" />