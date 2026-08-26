# AurexTranslator

<ImageZoom src="https://private-user-images.githubusercontent.com/27612401/626809552-1d6656cf-393b-4e40-bba7-a26f2ea1d0af.jpg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODc3NDI3MzEsIm5iZiI6MTc4Nzc0MjQzMSwicGF0aCI6Ii8yNzYxMjQwMS82MjY4MDk1NTItMWQ2NjU2Y2YtMzkzYi00ZTQwLWJiYTctYTI2ZjJlYTFkMGFmLmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA4MjYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwODI2VDExMDcxMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTIxOTNhNDgxNjlhMjYyNThjZWE0NDQ3ODEwYTEwNmQ5OGJkMjQ0OWFjYzgxZTA3NGJmMmZhYTkxY2JlNjM2YWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT1pbWFnZSUyRmpwZWcifQ.Pcb1Pc1ogOT2j6O9Xc7unh_A4Koksd3ccdCRB-41xEU" />

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