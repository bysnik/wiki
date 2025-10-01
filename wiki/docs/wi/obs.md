# Open Brodcast Software

![](https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1905180/ss_aefa14f73426de7ae6be79876b1a8055b11291bc.1920x1080.jpg?t=1733595297)

OBS (Open Broadcaster Software) — это бесплатное и открытое программное обеспечение для записи видео и стриминга в реальном времени, широко используемое стримерами, геймерами и контент-мейкерами. Оно позволяет захватывать экран, веб-камеру, микрофон и другие источники, настраивать сцены и переходы, накладывать наложения (overlays), а также транслировать напрямую на платформы вроде YouTube, Twitch или Facebook Live. OBS поддерживает высокое качество записи, гибкие настройки кодеков и работает на Windows, macOS и Linux.

## Устнаовка

```bash
apt-get install obs-studio
```

или

```bash
flatpak install flathub com.obsproject.Studio
```

## Для Wayland

Установите пакеты `xdg-desktop-portal`, `xdg-desktop-portal-wlr` и `slurp`, иначе вы не сможете увидеть опцию захвата экрана или же она не будет работать.

## Плагины (если устанавливали через apt-get)

obs-vkcapture

obs-studio-plugin-vaapi

obs-studio-plugin-droidcam

obs-studio-plugin-multi-rtmp

obs-studio-plugin-input-overlay - потыкал его, чёт плохо работает