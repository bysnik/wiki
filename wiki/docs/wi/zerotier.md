# ZeroTier

![](https://www.zerotier.com/wp-content/uploads/2025/01/Default-OG-Image.jpg)

https://habr.com/ru/companies/ruvds/articles/484178/

https://habr.com/ru/companies/ruvds/articles/485914/

https://habr.com/ru/companies/ruvds/articles/488184/


ссылка на последнюю версю пакета для Альт Линукс https://git.altlinux.org/tasks/337183/build/100/x86_64/rpms/zerotier-one-1.12.2-alt1.x86_64.rpm

Сейчас последняя версия это 1.16.0, а для альта - 1.12.2, так как он был удалён из репозитория https://packages.altlinux.org/ru/sisyphus/srpms/zerotier-one/

Думаю, не сильной проблемой будет собрать последнюю версию из исходников, возможно, даже спеку переписывать не придётся: https://git.altlinux.org/gears/z/zerotier-one.git?a=tree;hb=0e3d36293e616990f7386343b4c6777782b71158 и https://github.com/zerotier/ZeroTierOne


Вот графический интерфейс: https://github.com/key-networks/ztncui

Я пытался с ним работать при сборке zerotier-one из исходников и это жопа, но вот с пакетированной версией гуишка заработала сразу как надо

Минус zerotier - отсутствие GUI в Linux для подключения к сети (как в винде). Подключиться можно только через консоль: `sudo zerotier-cli join <Network ID>`

## Мои, вроде как, успешные потуги по сборке последней версии

1. Устновка необходимых пакетов (скорее всего тут перечислены не все)

```bash
apt-get install rpmdevtools rpm-build gcc-c++ git-core gem-ronn-ng gem-ronn ronn libstdc++-devel libminiupnpc-devel rust rust-cargo
```

2. Незнаю почему, но я не использовал GEAR, так что собирал чисто с помощью rpmbuild. Подготавливаем дерево каталогов для сборки:

```bash
rpmdev-setuptree
```

3. Просто куда-нибудь клонируем два репозитория: Один с исходниками и готовой спекой для 1.12 версии, и второй - последняя версия от разработчиков:

```bash
git clone http://git.altlinux.org/gears/z/zerotier-one.git

git clone https://github.com/zerotier/ZeroTierOne.git
```

4. Переходим в директорию с 1.12 версией и начинаем шаманить:

```bash
cd zerotier-one
```

- Редактируем спеку, меняем только версию (можно ещё changelog написать, если охота):

```spec
Version: 1.16.0
```

- Копируем спеку в директорию сборки:

```bash
cp zerotier-one.spec ~/RPM/SPECS/
```

- Создаем директорию:

```bash
mkdir -p zerotier-one-development-1.16.0
```

- Копируем какие-то растовские файлы:

```bash
cp -R zerotier-one/zeroidc zerotier-one-development-1.16.0/
```

- Проваливаемся в скопированные файлы:

```bash
cd zerotier-one-development/zeroidc
```

- Генерируем директорию vendor:

```bash
cargo vendor
```

- Переносим сгенерированную директорию:

```bash
mv ./vendor ../
```

Должна получиться следующая структура:

```bash
zerotier-one-development-1.16.0/
├── vendor
└── zeroidc
```

- Поднимаемся на уровень выше:

```bash
cd ..
```

- Архивируем директорию и сразу переносим её в нашу сборочницу:

```bash
tar cvf ~/RPM/SOURCES/zerotier-one-development-1.16.0.tar zerotier-one-development-1.16.0
```

5. Теперь работаем с исходниками.

```bash
cd ..
```

- После клонирования должна быть директория ZeroTierOne. Переименовываем её:

```bash
mv ZeroTierOne zerotier-one-1.16.0
```

- Архивируем директорию и сразу переносим её в нашу сборочницу:c

```bash
tar cvf ~/RPM/SOURCES/zerotier-one-1.16.0.tar zerotier-one-1.16.0
```

6. Если всё сделано правильно и я нигде не ошибся при описании, то можно проводить сборку пакета:

```bash
rpmbuild -ba rpmbuild -ba ~/RPM/SPECS/zerotier-one.spec
```

7. По завершению сборки должен появиться пакет ~/RPM/RPMS/x86_64/zerotier-one-1.16.0-alt1.x86_64.rpm, который можно попробовать установить:

```bash
apt-get install ~/RPM/RPMS/x86_64/zerotier-one-1.16.0-alt1.x86_64.rpm
```

8. Проверьте его статус после установки и действуйте:

```bash
systemctl status zerotie-one
```

::: warning
Эта инструкция далеко не истина в последней инстанции. Я вообще устанавливал этот пакет поверх уже установленной версии 1.12.2, и вот что плохое у меня случилось:
1. Вроде как, консольные утилиты раньше можно было использовать не под рутом, а теперь они работают только под рутом (по хорошему перепроверить бы).
2. После обновления ztncui, не смотря на то, что увидел контроллер zerotier, выдает ошибку HTTPError: Response code 404 (Not Found), но при этом ZeroTier version 1.16.0 он определяет.

Но при этом у меня продолжила спокойно работать сеть, созданная на сайте zerotier.com, панель управления увидила, что у меня последняя версия.
:::

В принципе, я считаю, что шалость удалась. Вот сама собранная rpm если кому надо: [zerotier-one-1.16.0-alt1.x86_64.rpm](https://raw.githubusercontent.com/bysnik/wiki/main/rpms/zerotier-one-1.16.0-alt1.x86_64.rpm)