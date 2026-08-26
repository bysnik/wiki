# Persona 4

<ImageZoom src="https://downloads.sega.com/cs/PersonaFAQ/Golden/P4G_WideBanner.jpg" />

Тут речь пойдёт о версии Persona 4 Golden (Steam)

Дополнительно был установлен руссификатор: https://steamcommunity.com/sharedfiles/filedetails/?id=3110295702

Она у меня не запускалась, помогло следующее:

1. В Steam заходим в настройки игры и в пункте General вводим в поле опций запуска:

```
PROTON_USE_WINED3D=1 WINEDLLOVERRIDES="winmm.dll=n,b" %command%
```

<ImageZoom src="/img/persona42.png" />

2. В Совместимости выбрал `Proton Experemental`

<ImageZoom src="/img/persona41.png" />

