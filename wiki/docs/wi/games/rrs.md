---
outline: deep
---

# Russian Railway Simulator (RRS)

![](https://camo.githubusercontent.com/a8e747109f7f569abe3a10307bf80483f66b08113c7ce978511e7884bd19c2fc/68747470733a2f2f686162726173746f726167652e6f72672f776562742f6e6a2f7a712f67732f6e6a7a71677334626469386937337235656d686a6d37622d6f636b2e6a706567)

https://github.com/maisvendoo/RRS

This project is a free, open-source railway simulator of Russian mainline locomotives and trains. The game features an original train physics engine that accounts for longitudinal dynamics, wheel–rail interaction, and the operation of pneumatic and electrical systems on both locomotives and railcars. Players can take on roles such as locomotive engineer, assistant engineer, dispatcher, or rolling stock maintenance personnel.

## Запускаем под Альтом (пока что проблема с запусом viewer)

### Устанавливаем зависимости:
```bash
apt-get install gcc gcc-c++ make cmake liblua5.4 liblua5.4-devel qt6-serialbus-devel libvulkan-devel vulkan-tools libX11-devel libXcursor-devel libXrandr-devel libXi-devel wayland-devel libxkbcommon-devel libjpeg-devel libpng-devel libtiff-devel assimp-devel libminizip-devel libminizip-ng-devel libpoly2tri-devel qt6-tools-devel glslang-devel libspirv-tools-devel libudev-devel libvorbis-devel libogg-devel libflac-devel #libSFML-devel
```

### Установка библиотеки `SOL2`
```bash
cd /tmp
git clone --depth 1 -b v3.3.0 https://github.com/ThePhD/sol2.git
cd sol2

mkdir build && cd build

cmake .. \
    -DSOL2_INSTALL=ON \
    -DCMAKE_INSTALL_PREFIX=/usr \
    -DCMAKE_INSTALL_LIBDIR=lib64 \
    -DCMAKE_BUILD_TYPE=Release

# Установка в систему (нужен root)
cmake --install .
```

### Установка библиотеки `openal-soft`
```bash
cd /tmp
git clone --depth 1 https://github.com/kcat/openal-soft.git
cd openal-soft

mkdir build && cd build

cmake .. \
    -DCMAKE_INSTALL_PREFIX=/usr \
    -DCMAKE_INSTALL_LIBDIR=lib64 \
    -DALSOFT_BACKEND_PULSEAUDIO=ON \
    -DALSOFT_BACKEND_ALSA=ON \
    -DALSOFT_BACKEND_PIPEWIRE=ON \
    -DCMAKE_BUILD_TYPE=Release

# Сборка и установка
cmake --build . -j$(nproc)
cmake --install .
```

### Установка библиотеки `VulkanSceneGraph (vsg)`
```bash
cd /tmp
git clone --depth 1 https://github.com/vsg-dev/VulkanSceneGraph.git
cd VulkanSceneGraph

mkdir build && cd build\

make .. \
    -DCMAKE_INSTALL_PREFIX=/usr \
    -DCMAKE_INSTALL_LIBDIR=lib64 \
    -DCMAKE_BUILD_TYPE=Release \
    -DVSG_BUILD_EXAMPLES=OFF \
    -DVSG_BUILD_TESTS=OFF \
    -DCMAKE_PREFIX_PATH="/usr/share/cmake/SPIRV-Tools;/usr/share/cmake/SPIRV-Tools-opt;/usr/lib64/cmake/glslang" \
    -Dglslang_DIR=/usr/lib64/cmake/glslang \
    -DSPIRV-Tools_DIR=/usr/share/cmake/SPIRV-Tools \
    -DSPIRV-Tools-opt_DIR=/usr/share/cmake/SPIRV-Tools-opt

cmake --build . -j$(nproc)
cmake --install .
```

### Установка библиотеки `vsgXchange`
```bash
cd /tmp
git clone --depth 1 https://github.com/vsg-dev/vsgXchange.git
cd vsgXchange

mkdir build && cd build

cmake .. \
    -DCMAKE_INSTALL_PREFIX=/usr \
    -DCMAKE_INSTALL_LIBDIR=lib64 \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_PREFIX_PATH="/usr/share/cmake/SPIRV-Tools;/usr/share/cmake/SPIRV-Tools-opt;/usr/lib64/cmake/glslang" \
    -DVSG_DIR=/usr/lib64/cmake/vsg \
    -Dglslang_DIR=/usr/lib64/cmake/glslang \
    -DSPIRV-Tools_DIR=/usr/share/cmake/SPIRV-Tools \
    -DSPIRV-Tools-opt_DIR=/usr/share/cmake/SPIRV-Tools-opt

# Сборка и установка
cmake --build . -j$(nproc)
cmake --install .
```

### Установка библиотеки `vsgImGui`
```bash
cd /tmp
git clone --depth 1 https://github.com/vsg-dev/vsgImGui.git
cd vsgImGui
mkdir build && cd build

cmake .. \
    -DCMAKE_INSTALL_PREFIX=/usr \
    -DCMAKE_INSTALL_LIBDIR=lib64 \
    -DCMAKE_BUILD_TYPE=Release \
    -DBUILD_APPLICATIONS=OFF

cmake --build . -j$(nproc)
cmake --install .
```





### Переустановка SFML из исходников
```bash
cd /tmp
git clone --depth 1 --branch 2.6.x https://github.com/SFML/SFML.git
cd SFML
mkdir build && cd build

cmake .. \
    -DCMAKE_INSTALL_PREFIX=/usr \
    -DCMAKE_INSTALL_LIBDIR=lib64 \
    -DCMAKE_BUILD_TYPE=Release \
    -DSFML_BUILD_WINDOW=ON \
    -DSFML_BUILD_GRAPHICS=ON \
    -DSFML_BUILD_AUDIO=ON \
    -DSFML_BUILD_NETWORK=ON

cmake --build . -j$(nproc)
sudo cmake --install .
```







### Клонируем репозиторий:
```bash
git clone https://github.com/maisvendoo/RRS.git
```

### Переходим в папку с исходниками и создаем папку для сборки:
```bash
cd RRS
```

```bash
mkdir -p modules
cd modules
ln -sfn ../lua lua
```

```bash
cd ..
```

```bash
mkdir build && cd build
```

### Запускаем конфигурирование:
```bash
cmake .. \
    -DCMAKE_INSTALL_PREFIX=/usr \
    -DCMAKE_INSTALL_LIBDIR=lib64 \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_PREFIX_PATH="/usr/share/cmake/SPIRV-Tools;/usr/share/cmake/SPIRV-Tools-opt;/usr/lib64/cmake/glslang" \
    -DVSG_DIR=/usr/lib64/cmake/vsg \
    -DvsgXchange_DIR=/usr/lib64/cmake/vsgXchange \
    -DvsgImGui_DIR=/usr/lib64/cmake/vsgImGui \
    -Dglslang_DIR=/usr/lib64/cmake/glslang \
    -DSPIRV-Tools_DIR=/usr/share/cmake/SPIRV-Tools \
    -DSPIRV-Tools-opt_DIR=/usr/share/cmake/SPIRV-Tools-opt
```

### Запускаем компиляцию игры:
```bash
cmake --build . -j$(nproc)
```