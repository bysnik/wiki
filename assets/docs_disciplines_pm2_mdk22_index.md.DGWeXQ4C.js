import{_ as t,c as e,o as i,ag as r}from"./chunks/framework.D4Vqf8I7.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/disciplines/pm2/mdk22/index.md","filePath":"docs/disciplines/pm2/mdk22/index.md","lastUpdated":1763383000000}'),a={name:"docs/disciplines/pm2/mdk22/index.md"};function D(B,n,p,o,s,l){return i(),e("div",null,n[0]||(n[0]=[r(`<p>Ну тут девопс gitlab &amp; gitea(github) -&gt; jenkins -&gt; docker -&gt; artifactory ce (nesus oss) -типа унив.</p><p><a href="https://basis.gnulinux.pro/ru/latest/basis/62/62._%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D1%8B_%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%B9%D0%BD%D0%B5%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8.html" target="_blank" rel="noreferrer">Методические материалы по контейнеризации</a></p><p><a href="https://pulpproject.org/pulp-oci-images/docs/admin/tutorials/quickstart/" target="_blank" rel="noreferrer">Pulp</a> - для пакетов</p><p><a href="/wiki/docs/wi/docker.html">docker</a> &amp; kuber -&gt; <a href="/wiki/docs/wi/harbor.html">harbor</a></p><p><a href="/wiki/docs/wi/podman.html">podman</a></p><p>github, <a href="/wiki/docs/wi/gitea.html">gitea</a>, gitlab action(s)</p><p><a href="https://www.altlinux.org/%D0%A1%D0%B0%D0%B3%D0%B0_%D0%BE_%D0%B4%D1%80%D0%B0%D0%B9%D0%B2%D0%B5%D1%80%D0%B0%D1%85" target="_blank" rel="noreferrer">https://www.altlinux.org/Сага_о_драйверах</a></p><p><a href="https://www.altlinux.org/Images.www.altlinux.org/d/d3/%D0%A3%D0%9C%D0%9F_%C2%AB%D0%94%D0%BE%D0%B2%D0%B5%D1%80%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F_%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%BD%D1%8B%D1%85_%D0%BF%D0%B0%D0%BA%D0%B5%D1%82%D0%BE%D0%B2_%D0%B8_%D1%81%D0%B1%D0%BE%D1%80%D0%BA%D0%B0_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BE%D0%B1%D0%B5%D1%81%D0%BF%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%C2%BB.pdf" target="_blank" rel="noreferrer">Параллельно изучаем сборку пакетов для альта</a> и <a href="https://alt-packaging-guide.github.io/alt-packaging-guide.pdf" target="_blank" rel="noreferrer">это</a>) ну и в целом <a href="https://altlinux.space/sin/join-meetings" target="_blank" rel="noreferrer">https://altlinux.space/sin/join-meetings</a></p><p>Знакомство с S3 - <a href="/wiki/docs/wi/minio.html">MinIO</a></p><p>Итак, из материалов у меня на данный момент есть несколько презентаций по работе с Docker. Будьте внимательны - гайды написаны под Alpine Linux: <a href="https://disk.yandex.ru/d/yZRsg5Jy4MuY3g" target="_blank" rel="noreferrer">https://disk.yandex.ru/d/yZRsg5Jy4MuY3g</a></p><p>Десять занятий по git на основе официальной книги от git <a href="https://github.com/progit/progit2-ru/releases/download/2.1.117/progit.pdf" target="_blank" rel="noreferrer">Pro Git</a> - Она бесплатная), но неидеальная, в виду универсальности в плане ОС. <a href="/wiki/docs/wi/git.html">Некоторые разделы этой книги в данной вики дополнены и доработаны под Альт Линукс</a></p><pre><code>1. Введение
    1.1 О системе контроля версий
    1.2 Краткая история Git
    1.3 Что такое Git?
    1.4 Командная строка
    1.5 Установка Git
    1.6 Первоначальная настройка Git
    1.7 Как получить помощь?
    1.8 Заключение
2. Основы Git
    2.1 Создание Git-репозитория
    2.2 Запись изменений в репозиторий
    2.3 Просмотр истории коммитов
    2.4 Операции отмены
    2.5 Работа с удалёнными репозиториями
    2.6 Работа с тегами
    2.7 Псевдонимы в Git
    2.8 Заключение
3. Ветвление в Git
    3.1 О ветвлении в двух словах
    3.2 Основы ветвления и слияния
    3.3 Управление ветками
    3.4 Работа с ветками
    3.5 Удалённые ветки
    3.6 Перебазирование
    3.7 Заключение
4. Git на сервере
    4.1 Протоколы
    4.2 Установка Git на сервер
    4.3 Генерация открытого SSH ключа
    4.4 Настраиваем сервер
    4.5 Git-демон
    4.6 Умный HTTP
    4.7 GitWeb
    4.8 GitLab
    4.9 Git-хостинг
    4.10 Заключение
5. Распределённый Git
    5.1 Распределённый рабочий процесс
    5.2 Участие в проекте
    5.3 Сопровождение проекта
    5.4 Заключение
</code></pre><p>Главу 6 необязательно делать именно про ГитХаб. Если у Вас поднят собственный хостинг, например <a href="/wiki/docs/wi/gitea.html">Gitea</a>, <a href="/wiki/docs/wi/forgejo.html">Forgejo</a> или <a href="/wiki/docs/wi/gitlab.html">GitLab</a>, то можно показать их, разницы особой то и нет</p><pre><code>6. GitHub
    6.1 Настройка и конфигурация учётной записи
    6.2 Внесение собственного вклада в проекты
    6.3 Сопровождение проекта
    6.4 Управление организацией
    6.5 Создание сценариев GitHub
    6.6 Заключение
7. Инструменты Git
    7.1 Выбор ревизии
    7.2 Интерактивное индексирование
    7.3 Припрятывание и очистка
    7.4 Подпись
    7.5 Поиск
    7.6 Перезапись истории
    7.7 Раскрытие тайн reset
    7.8 Продвинутое слияние
    7.9 Rerere
    7.10 Обнаружение ошибок с помощью Git
    7.11 Подмодули
    7.12 Создание пакетов
    7.13 Замена
    7.14 Хранилище учётных данных
    7.15 Заключение
8. Настройка Git
    8.1 Конфигурация Git
    8.2 Атрибуты Git
    8.3 Хуки в Git
    8.4 Пример принудительной политики Git
    8.5 Заключение
9. Git и другие системы контроля версий
    9.1 Git как клиент
    9.2 Переход на Git
    9.3 Заключение
10. Git изнутри
    10.1 Сантехника и Фарфор
    10.2 Объекты Git
    10.3 Ссылки в Git
    10.4 Pack-файлы
    10.5 Спецификации ссылок
    10.6 Протоколы передачи данных
    10.7 Обслуживание репозитория и восстановление данных
    10.8 Переменные окружения
    10.9 Заключение
</code></pre>`,14)]))}const c=t(a,[["render",D]]);export{g as __pageData,c as default};
