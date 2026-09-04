# AurexTranslator

<ImageZoom src="/img/626809552-1d6656cf-393b-4e40-bba7-a26f2ea1d0af.jpg" />

Cross-platform real-time translator for Windows and Linux (X11/XWayland) — translates text captured from the screen (OCR), from the clipboard, or hooked directly out of a game or engine via plugins.

https://github.com/Kirizaku/AurexTranslator

## Сборка из исходников

```bash
git clone https://github.com/Kirizaku/AurexTranslator.git
```

```bash
cd AurexTranslator
```

```bash
mkdir build && cd build
```

```bash
apt-get install qt6-base-devel qt6-tools-devel qt6-svg-devel \
    qt6-multimedia-devel tesseract-devel pipewire-libs-devel \
    libwayland-client-devel wayland-devel libX11-devel \
    libXcomposite-devel libXfixes-devel libXrandr-devel \
    libfreetype-devel bzip2-devel
```

```bash
cmake -DOpenCV_DIR=/usr/lib64/cmake/opencv4/ ..
```

```bash
make -j$(nproc)
```