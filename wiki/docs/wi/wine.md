Помогло улучшить ситуацию с неработающим звуком в играх Steam Proton


Добавить в параметры запуска ( работает в Motorslice):
```
SDL_AUDIODRIVER=pulseaudio PULSE_LATENCY_MSEC=60 %command%
```

::: tip не оч
1. nano ~/.asoundrc

```
defaults.pcm.!card 1
defaults.ctl.!card 1
```

2. Добавить в параметры запуска: SDL_AUDIODRIVER=alsa %command%
:::