Помогло улучшить ситуацию с неработающим звуком в играх Steam Proton

1. nano ~/.asoundrc

```
defaults.pcm.!card 1
defaults.ctl.!card 1
```

или

```
defaults.pcm.card 1
defaults.ctl.card 1
```

2. Добавить в параметры запуска: SDL_AUDIODRIVER=alsa %command%