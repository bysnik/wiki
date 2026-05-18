# The UNIX Pipe Card Game: Process Substitution

https://punkx.org/unix-pipe-game/ext-0.1/

Это дополнение к [The Unix Pipe Game](../index.html) с гораздо более сложными задачами, добавляющее команды `paste`, `tr`, `cut`, `bc`.

Дополнение предполагает, что родитель знаком с базовыми unix-командами: `cat, grep, tail, head, wc, sort, uniq, **paste, tr, cut, bc**`. Родитель также должен показать эти команды в действии на компьютере. Если у вас нет UNIX-системы, вы можете использовать [jslinux](https://bellard.org/jslinux/vm.html?url=alpine-x86.cfg&mem=192) в вашем браузере.

[![Deck](https://punkx.org/unix-pipe-game/ext-0.1/photos/deck.jpg)](https://punkx.org/unix-pipe-game/ext-0.1/photos/deck.jpg)

- распечатайте сами: [unix-pipe-cards-v01.pdf](unix-pipe-cards-ext-v01.pdf), [unix-pipe-ext-v01-box.pdf](unix-pipe-ext-v01-box.pdf)
- код: [unix-pipe-game/ext-0.1](https://github.com/jackdoe/programming-for-kids/tree/master/projects/unix-pipe-game/ext-0.1)
- автор: [github.com/jackdoe](https://github.com/jackdoe)
- соавтор: [Jackie](https://punkjazz.org/jackie)
- контакт: [b0000@fastmail.com](mailto:b0000@fastmail.com)
- лицензия: CC BY 4.0

> **NB:** <mark>Вы не можете играть в это дополнение без базовой игры</mark>. Причина в том, что задачи требуют значительно больше карт, и в одной колоде просто нет места. <mark>Мне жаль</mark>, я действительно пытался сделать колоду самодостаточной, но в итоге решил использовать две колоды, чтобы игра стала интереснее.

Концепция подстановки процессов кратко объясняется в колоде, новые команды также кратко описаны, но я могу объяснить лишь столько в ~1000 символах — этого точно не хватит, чтобы объяснить всё вашим детям, поэтому лучше дать им немного поиграть в командной строке, чтобы почувствовать, как работают `paste`, `tr`, `cut`, `bc`.

---

## Пример игрового раунда

**Задача:** **вычислить средний рейтинг: <span style="color:red">sum(rating)</span> / <span style="color:blue">(количество фильмов)</span>**

Сначала создаём один процесс для `cat` файла, берём колонку с рейтингами, пропускаем заголовок, соединяем строки через `+` и передаём в калькулятор. Также нужно посчитать количество фильмов в файле, затем используем `paste`, чтобы объединить эти выводы через `/`, и снова передаём в калькулятор:

```bash
paste -d/- <(<span style="color:red">cat 03.txt | cut -f 4 -d, | grep -v Rating | paste -sd+ | bc</span>) <(<span style="color:blue">cat 03.txt | grep -v Rating | wc -l</span>) | bc
```

[![Example](https://punkx.org/unix-pipe-game/ext-0.1/photos/example.jpg)](https://punkx.org/unix-pipe-game/ext-0.1/photos/example.jpg)

---

## Правила

```
Эта игра требует The UNIX Pipes Game
версии 0, которую можно получить здесь:

    https://punkx.org/unix-pipe-game/

Она содержит sort, cat и другие команды,
необходимые для решения задач в этом
дополнении.

Правила те же:

> 1. Самый молодой игрок выбирает задачу
    из карты задач. Нельзя выбирать одну
    и ту же задачу дважды.

> 2. Перемешайте карты из обеих колод.

> 3. Положите карты рубашкой вверх на стол.

> 4. По часовой стрелке каждый игрок берёт
    верхнюю карту из колоды и пытается
    выполнить задачу.

> 5. Первый игрок, выполнивший задачу,
    получает очко.

> 6. ЕСЛИ задач больше нет, ПЕРЕЙТИ к шагу 8

> 7. ПЕРЕЙТИ к шагу 1.

> 8. ИГРА ОКОНЧЕНА. ВСТАВЬТЕ МОНЕТУ. ПЕРЕЙТИ к шагу 8
```

## ЗАДАЧИ

- <span style="color:red">*</span> поменять местами колонки рейтинга и названия
- <span style="color:green">*</span> напечатать количество голосов последней строки
- <span style="color:red">*</span> удалить колонки Rank и Votes
- <span style="color:green">*</span> напечатать только колонку с названиями в верхнем регистре
- <span style="color:orange">*</span> напечатать первый и последний фильм
- <span style="color:red">*</span> напечатать разницу в голосах между самым и наименее популярным фильмом
- <span style="color:orange">*</span> просуммировать голоса
- <span style="color:red">*</span> просуммировать голоса фильмов 2016 года
- <span style="color:red">*</span> показать название лучшего по рейтингу фильма, только название, без других колонок
- <span style="color:green">*</span> заменить запятые на табуляцию, удалить пробелы
- <span style="color:green">*</span> напечатать названия как одну гигантскую строку: Sing Interstellar ...
- <span style="color:red">*</span> вычислить средний рейтинг: sum(rating) / (количество фильмов)
