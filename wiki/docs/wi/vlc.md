# VLC

## Настройка проигрывания MIDI

Для VLC, в дополнение к Fluidsynth нужен установленный пакет.
```bash	
apt-get install vlc-plugin-fluidsynth vlc-plugin-fluidsynth fluidsynth fluid-soundfont-gm fluid-soundfont-gs fluid-soundfont-common fluid-soundfont-lite-patche
```	
		
Далее зайти в Инструменты Настройки выбрать в левом нижнем углу Показывать настройки: все Ввод/кодеки Аудиокодеки FluidSynth Файл Soundfont указать файл: `/usr/share/sounds/sf2/default.sf2`