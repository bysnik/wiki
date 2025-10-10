

Я столкнулся с подставой при создании домена samba с bind. Да, как и описано в документации:
> Если при установке системы в настройках сети было указано полное доменное имя (например, dc1.test.alt), система может автоматически создать зону test.alt, что приведет к конфликту с Samba при запуске bind:
>
>мая 03 14:25:13 dc1 named[3825]: samba_dlz: Failed to configure zone 'test.alt'
>мая 03 14:25:13 dc1 named[3825]: loading configuration: already exists
>мая 03 14:25:13 dc1 named[3825]: exiting (due to fatal error)
>мая 03 14:39:44 dc1 named[4309]: Loading 'AD DNS Zone' using driver dlopen
>
>Для решения проблемы необходимо закомментировать все строки в файле /etc/bind/local.conf или удалить его. 

Блин! Не удаляйте этот файл!!! Просто очистите его.

Суть: начались проблемы с файлом /etc/named.conf. Если нет всех инклюдов, которые прописаны в нём (если что файл /etc/named.conf это символическая ссылка на файл /etc/bind/named.conf), тогда будет ошибка всегда типа `/etc/named.conf не существует` Это первый момент.

Второй момент: Почему то этот файл сгенерировался с ошибкой в последней строке инклюда: было двоеточие, а не точка с запятой. Из-за этого файл считается битым.

```diff
- include "/var/lib/samba/bind-dns/named.conf":
+ include "/var/lib/samba/bind-dns/named.conf";
```

Пасаны, проверяйте этот файл командой:
```bash
named-checkconf -p /etc/named.conf
```