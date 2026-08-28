import{_ as n,c as a,o as p,aj as l}from"./chunks/framework.BZR1KcQy.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/loongson.md","filePath":"docs/wi/loongson.md","lastUpdated":1787927161000}'),e={name:"docs/wi/loongson.md"};function i(o,s,c,t,r,d){return p(),a("div",null,s[0]||(s[0]=[l(`<h2 id="ну-такое-ховно" tabindex="-1">Ну такое ховно <a class="header-anchor" href="#ну-такое-ховно" aria-label="Permalink to &quot;Ну такое ховно&quot;">​</a></h2><h3 id="_1-установка-заголовков-ядра-и-инструментов-сборки" tabindex="-1">1. Установка заголовков ядра и инструментов сборки <a class="header-anchor" href="#_1-установка-заголовков-ядра-и-инструментов-сборки" aria-label="Permalink to &quot;1. Установка заголовков ядра и инструментов сборки&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dist-upgrade</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rpm-build</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kernel-headers-modules-6.18</span></span></code></pre></div><p><a href="https://repos.loongson.cn/loonggpu/repos/loongnix25/" target="_blank" rel="noreferrer">https://repos.loongson.cn/loonggpu/repos/loongnix25/</a></p><p><a href="https://github.com/suijingfeng/xf86-video-loongson" target="_blank" rel="noreferrer">https://github.com/suijingfeng/xf86-video-loongson</a> - alternative driver</p><h3 id="_2-сборка-модуля-ядра-loonggpu-ko" tabindex="-1">2. Сборка модуля ядра <code>loonggpu.ko</code> <a class="header-anchor" href="#_2-сборка-модуля-ядра-loonggpu-ko" aria-label="Permalink to &quot;2. Сборка модуля ядра \`loonggpu.ko\`&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --branch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> aosc/v1.0.2-lnd25.1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/AOSC-Tracking/loonggpu-kernel-dkms.git</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> loonggpu-kernel-dkms</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> KSRC=/usr/src/linux-6.18.37-6.18-alt1.port.la64/</span></span></code></pre></div><h3 id="_3-установка-модуля" tabindex="-1">3. Установка модуля <a class="header-anchor" href="#_3-установка-модуля" aria-label="Permalink to &quot;3. Установка модуля&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> loonggpu.ko</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /lib/modules/6.18.37-6.18-alt1.port.la64gp/kernel/drivers/gpu/drm/loongson/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">depmod</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">modprobe</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> loonggpu</span></span></code></pre></div><h3 id="_4-установка-пользовательских-пакетов-перепаковка-deb-в-rpm" tabindex="-1">4. Установка пользовательских пакетов (перепаковка .deb в .rpm) <a class="header-anchor" href="#_4-установка-пользовательских-пакетов-перепаковка-deb-в-rpm" aria-label="Permalink to &quot;4. Установка пользовательских пакетов (перепаковка .deb в .rpm)&quot;">​</a></h3><p>Скачайте из репозитория Deepin или AOSC файлы:</p><ul><li><code>libloong-gpucomp_*.deb</code> <a href="https://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/loong-gpucomp/" target="_blank" rel="noreferrer">https://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/loong-gpucomp/</a> - у этой псины проблемы с libedit2, ска такая</li><li><code>loonggl_*.deb</code> <a href="https://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/loonggl/" target="_blank" rel="noreferrer">https://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/loonggl/</a></li><li><code>xserver-xorg-video-loonggpu_*.deb</code> <a href="https://mirror.eu.ossplanet.net/deepin/beige/pool/main/x/xserver-xorg-video-loonggpu/" target="_blank" rel="noreferrer">https://mirror.eu.ossplanet.net/deepin/beige/pool/main/x/xserver-xorg-video-loonggpu/</a></li><li><code>loonggpu-driver_*.deb</code> <a href="https://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/loonggpu-driver/" target="_blank" rel="noreferrer">https://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/loonggpu-driver/</a></li><li><code>loonggpu-settings_*.deb</code> <a href="http://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/loonggpu-settings/" target="_blank" rel="noreferrer">http://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/loonggpu-settings/</a></li><li><code>ldrm_*.deb</code> (содержит <code>libldrm.so.1</code>) <a href="https://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/ldrm/" target="_blank" rel="noreferrer">https://mirror.eu.ossplanet.net/deepin/beige/pool/main/l/ldrm/</a></li><li>firmware-loongson-graphics_1.0.2+lnd25.1-0_loongarch64.deb <a href="https://packages.aosc.io/files/loongarch64/stable/firmware-loongson-graphics/2:1.0.2+lnd25.1" target="_blank" rel="noreferrer">https://packages.aosc.io/files/loongarch64/stable/firmware-loongson-graphics/2:1.0.2+lnd25.1</a></li><li><a href="https://pkg.loongnix.cn/loongnix/25/pool/main/libe/libedit/" target="_blank" rel="noreferrer">https://pkg.loongnix.cn/loongnix/25/pool/main/libe/libedit/</a> - это и есть libedit2</li></ul><p><a href="https://github.com/loongson/Firmware/tree/main" target="_blank" rel="noreferrer">https://github.com/loongson/Firmware/tree/main</a></p><p>Перепакуйте и установите с игнорированием зависимостей:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">epm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> repack</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.deb</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          # создаёт RPM-пакеты</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rpm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Uvh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --nodeps</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.rpm</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   # установка всех RPM без проверки зависимостей</span></span></code></pre></div><h3 id="_5-создание-симлинка-для-libedit-so-2" tabindex="-1">5. Создание симлинка для <code>libedit.so.2</code> <a class="header-anchor" href="#_5-создание-симлинка-для-libedit-so-2" aria-label="Permalink to &quot;5. Создание симлинка для \`libedit.so.2\`&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ln</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -sf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/lib/loongarch64-linux-gnu/libedit.so.2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/lib64/libedit.so.2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ldconfig</span></span></code></pre></div><h3 id="_6-копирование-xorg-драивера-в-системныи-каталог" tabindex="-1">6. Копирование Xorg-драйвера в системный каталог <a class="header-anchor" href="#_6-копирование-xorg-драивера-в-системныи-каталог" aria-label="Permalink to &quot;6. Копирование Xorg-драйвера в системный каталог&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/lib/xorg/modules/drivers/loonggpu_drv.so</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/lib64/X11/modules/drivers/</span></span></code></pre></div><h3 id="_7-копирование-mesa-драивера-в-usr-lib64-dri" tabindex="-1">7. Копирование Mesa-драйвера в <code>/usr/lib64/dri/</code> <a class="header-anchor" href="#_7-копирование-mesa-драивера-в-usr-lib64-dri" aria-label="Permalink to &quot;7. Копирование Mesa-драйвера в \`/usr/lib64/dri/\`&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/lib64/dri</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/lib/loongarch64-linux-gnu/dri/loonggpu_dri.so</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/lib64/dri/</span></span></code></pre></div><h3 id="_8-настроика-xorg-конфиг" tabindex="-1">8. Настройка Xorg (конфиг) <a class="header-anchor" href="#_8-настроика-xorg-конфиг" aria-label="Permalink to &quot;8. Настройка Xorg (конфиг)&quot;">​</a></h3><p>Создайте <code>/etc/X11/xorg.conf.d/99-loonggpu.conf</code>:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/X11/xorg.conf.d/99-loonggpu.conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Section &quot;Device&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    Identifier &quot;LoongGPU&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    Driver &quot;loonggpu&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EndSection</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/environment</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">MESA_LOADER_DRIVER_OVERRIDE=loonggpu</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span></code></pre></div><h3 id="_9-перезагрузка" tabindex="-1">9. Перезагрузка <a class="header-anchor" href="#_9-перезагрузка" aria-label="Permalink to &quot;9. Перезагрузка&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reboot</span></span></code></pre></div><p>[basealt@basealt ~]$ LD_LIBRARY_PATH=/usr/lib/loongarch64-linux-gnu:/usr/lib/loongarch64-linux-gnu/loonggpu LIBGL_DRIVERS_PATH=/usr/lib64/X11/modules/dri:/usr/lib/loongarch64-linux-gnu/dri:/usr/lib64/dri __GLX_VENDOR_LIBRARY_NAME=gsgpu glmark2</p><hr><h2 id="✅-проверка-результата" tabindex="-1">✅ Проверка результата <a class="header-anchor" href="#✅-проверка-результата" aria-label="Permalink to &quot;✅ Проверка результата&quot;">​</a></h2><p>После перезагрузки войдите в X11-сессию и выполните:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -l</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /dev/dri/</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          # должны быть card0 и renderD128</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/log/Xorg.0.log</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> loong</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   # должно быть загружено Module loonggpu</span></span></code></pre></div><p>Если нужно проверить рендерер (покажет <code>llvmpipe</code>, но это ожидаемо при отсутствии полноценного Mesa-драйвера):</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">glxinfo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;OpenGL renderer&quot;</span></span></code></pre></div><details class="details custom-block"><summary>Details</summary><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Это копия чата ChatGPT, которым поделились. Она не будет добавлена в память.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Пожаловаться на обсуждение</span></span>
<span class="line"><span>пн, 3 авг. в 12:49</span></span>
<span class="line"><span>проверь наличие какого то бемарка в репозитории альта архитектура loongson</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Да, в репозитории ALT для архитектуры loongarch64 есть несколько бенчмарков.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Самый простой вариант — STREAM для проверки пропускной способности памяти:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>uname -m</span></span>
<span class="line"><span>apt-get update</span></span>
<span class="line"><span>apt-get install stream-mem</span></span>
<span class="line"><span></span></span>
<span class="line"><span>stream_c</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Пакет stream-mem-5.10-alt3 присутствует в стабильном репозитории p11_loongarch64. В него входят программы /usr/bin/stream_c и /usr/bin/stream_f; результаты выдаются по операциям Copy, Scale, Add и Triad в MB/s. Карточка пакета в ALT</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Также доступны:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Пакет	Назначение	Версия в p11_loongarch64</span></span>
<span class="line"><span>stress-ng	нагрузка CPU, памяти, кеша и подсистем ядра	0.21.04-alt1</span></span>
<span class="line"><span>fio	производительность дисков и файловых систем	3.37-alt1</span></span>
<span class="line"><span>iperf3	пропускная способность сети	3.19.1-alt1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Источники: stress-ng, fio, iperf3.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Короткий тест процессора:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>apt-get install stress-ng</span></span>
<span class="line"><span>stress-ng --cpu &quot;$(nproc)&quot; --timeout 60s --metrics-brief</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Однако разработчики stress-ng прямо указывают, что это прежде всего нагрузочный тест, а не точный сравнительный бенчмарк.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>В Sisyphus_loongarch64 дополнительно есть полноценный комплексный HPC Challenge Benchmark (hpcc), измеряющий CPU, память и сеть, но в стабильной ветке p11_loongarch64 его пока нет. Карточка hpcc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Важно: сначала проверьте uname -m. Эти пакеты относятся к современной архитектуре loongarch64. Если система покажет mips64el, это старое поколение Loongson и другой репозиторий.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@alt-work-loongson ~]# </span></span>
<span class="line"><span>[root@alt-work-loongson ~]# uname -m</span></span>
<span class="line"><span>loongarch64</span></span>
<span class="line"><span>[root@alt-work-loongson ~]# </span></span>
<span class="line"><span>[root@alt-work-loongson ~]# </span></span>
<span class="line"><span>[root@alt-work-loongson ~]# </span></span>
<span class="line"><span>[root@alt-work-loongson ~]# inxi -v7</span></span>
<span class="line"><span>System:</span></span>
<span class="line"><span>  Host: alt-work-loongson Kernel: 6.18.37-6.18-alt1.port.la64 arch: loongarch64 bits: 64</span></span>
<span class="line"><span>    compiler: gcc v: 13.2.1 clocksource: Constant</span></span>
<span class="line"><span>  Console: pty pts/0 DM: GDM v: 48.0 Distro: ALT 11.2 prometheus</span></span>
<span class="line"><span>Machine:</span></span>
<span class="line"><span>  Type: Desktop System: Loongson product: Loongson-3C6000/Sx1-7A2000x1-AC612A0_V1.0 v: N/A</span></span>
<span class="line"><span>    serial: N/A Chassis: type: 3 serial: N/A</span></span>
<span class="line"><span>  Mobo: Loongson model: AC612A0_V1.0 serial: N/A UEFI: Loongson</span></span>
<span class="line"><span>    v: Loongson-FwSdk-V5.0.0343-stable2511 date: 12/29/25 11:24:46</span></span>
<span class="line"><span>Battery:</span></span>
<span class="line"><span>  Message: No system battery data found. Is one present?</span></span>
<span class="line"><span>Memory:</span></span>
<span class="line"><span>  System RAM: total: 64 GiB available: 63.49 GiB used: 4.33 GiB (6.8%)</span></span>
<span class="line"><span>  Report: arrays: 2 capacity: 256 GiB installed: 64 GiB slots: 4 active: 2 type: DDR4</span></span>
<span class="line"><span>    eec: Single-bit ECC</span></span>
<span class="line"><span>  Array-1: capacity: N/A installed: 64 GiB slots: 2 note: check modules: 2 EC: N/A</span></span>
<span class="line"><span>    max-module-size: N/A</span></span>
<span class="line"><span>  Device-1: CPU0_A0 type: DDR4 detail: registered (buffered) size: 32 GiB speed: 3200 MT/s</span></span>
<span class="line"><span>    volts: 1.2 width (bits): data: 64 total: 72 manufacturer: Kingston part-no: 9965754-053.C00G</span></span>
<span class="line"><span>    serial: 6324B674</span></span>
<span class="line"><span>  Device-2: CPU0_A3 type: DDR4 detail: registered (buffered) size: 32 GiB speed: 3200 MT/s</span></span>
<span class="line"><span>    volts: 1.2 width (bits): data: 64 total: 72 manufacturer: Kingston part-no: 9965754-053.C00G</span></span>
<span class="line"><span>    serial: F014B8CE</span></span>
<span class="line"><span>  Array-2: capacity: 256 GiB installed: N/A slots: 2 modules: 0 EC: Single-bit ECC</span></span>
<span class="line"><span>    max-module-size: 128 GiB note: est.</span></span>
<span class="line"><span>CPU:</span></span>
<span class="line"><span>  Info: 16-core model: Loongson-3C6000/S bits: 64 type: MT MCP smt: enabled</span></span>
<span class="line"><span>    arch: Loongson-3/LoongArch rev: 0x10 cache: L1: 2 MiB L2: 4 MiB L3: 32 MiB</span></span>
<span class="line"><span>  Speed (MHz): avg: 2200 min/max: N/A volts: 1.2 V ext-clock: 25 MHz cores: 1: 2200 2: 2200</span></span>
<span class="line"><span>    3: 2200 4: 2200 5: 2200 6: 2200 7: 2200 8: 2200 9: 2200 10: 2200 11: 2200 12: 2200 13: 2200</span></span>
<span class="line"><span>    14: 2200 15: 2200 16: 2200 17: 2200 18: 2200 19: 2200 20: 2200 21: 2200 22: 2200 23: 2200</span></span>
<span class="line"><span>    24: 2200 25: 2200 26: 2200 27: 2200 28: 2200 29: 2200 30: 2200 31: 2200 32: 2200</span></span>
<span class="line"><span>    bogomips: 140800</span></span>
<span class="line"><span>  Flags: complex cpucfg crc32 crypto fpu lam lasx lbt_arm lbt_mips lbt_x86 lspw lsx lvz ual</span></span>
<span class="line"><span>Graphics:</span></span>
<span class="line"><span>  Device-1: Loongson LLC LG100 GPU driver: N/A arch: ? bus-ID: 00:06.0 chip-ID: 0014:7a25</span></span>
<span class="line"><span>    class-ID: 0400</span></span>
<span class="line"><span>  Display: unspecified server: X.org v: 1.21.1.24 with: Xwayland v: 24.1.13</span></span>
<span class="line"><span>    compositor: gnome-shell driver: gpu: loongson tty: 236x57</span></span>
<span class="line"><span>  Monitor-1: HDMI-A-1 model: VGA serial: 0000000000001 res: 1920x1080 dpi: 92</span></span>
<span class="line"><span>    size: 476x268mm (18.74x10.55&quot;) diag: 604mm (23.8&quot;) modes: max: 1920x1080 min: 720x400</span></span>
<span class="line"><span>  API: EGL v: 1.5 platforms: device: 1 drv: swrast gbm: drv: kms_swrast surfaceless: drv: swrast</span></span>
<span class="line"><span>    inactive: wayland,x11,device-0</span></span>
<span class="line"><span>  API: OpenGL v: 4.5 vendor: mesa v: 25.3.6 note: console (EGL sourced) renderer: llvmpipe</span></span>
<span class="line"><span>    (LLVM 20.1.8 128 bits)</span></span>
<span class="line"><span>  API: Vulkan v: 1.4.335 layers: 1 surfaces: N/A device: 0 type: cpu driver: mesa llvmpipe</span></span>
<span class="line"><span>    device-ID: 10005:0000</span></span>
<span class="line"><span>  Info: Tools: api: clinfo, eglinfo, glxinfo, vulkaninfo gpu: nvidia-settings wl: wayland-info</span></span>
<span class="line"><span>    x11: xdpyinfo, xprop, xrandr</span></span>
<span class="line"><span>Audio:</span></span>
<span class="line"><span>  Device-1: Loongson LLC LG100 GPU driver: N/A bus-ID: 00:06.0 chip-ID: 0014:7a25 class-ID: 0400</span></span>
<span class="line"><span>  Device-2: Loongson LLC driver: snd_hda_intel v: kernel bus-ID: 00:06.2 chip-ID: 0014:7a37</span></span>
<span class="line"><span>    class-ID: 0403</span></span>
<span class="line"><span>  Device-3: Loongson LLC HDA driver: snd_hda_intel v: kernel bus-ID: 00:07.0 chip-ID: 0014:7a07</span></span>
<span class="line"><span>    class-ID: 0403</span></span>
<span class="line"><span>  API: ALSA v: k6.18.37-6.18-alt1.port.la64 status: kernel-api</span></span>
<span class="line"><span>  Server-1: PipeWire v: 1.4.7 status: n/a (root, process) with: 1: pipewire-pulse status: active</span></span>
<span class="line"><span>    2: wireplumber status: active</span></span>
<span class="line"><span>Network:</span></span>
<span class="line"><span>  Device-1: Motorcomm Micro. YT6801 Gigabit Ethernet driver: yt6801 v: 1.0.31 pcie:</span></span>
<span class="line"><span>    speed: 2.5 GT/s lanes: 1 port: 4000 bus-ID: 05:00.0 chip-ID: 1f0a:6801 class-ID: 0200</span></span>
<span class="line"><span>  IF: enp5s0 state: up speed: 1000 Mbps duplex: full mac: 00:55:25:13:01:14</span></span>
<span class="line"><span>  IP v4: 10.4.129.139/23 type: dynamic noprefixroute scope: global broadcast: 10.4.129.255</span></span>
<span class="line"><span>  IP v6: 2a0c:88c0:1:813:255:25ff:fe13:114/64 type: dynamic mngtmpaddr proto kernel_ra</span></span>
<span class="line"><span>    scope: global</span></span>
<span class="line"><span>  IP v6: fe80::255:25ff:fe13:114/64 virtual: proto kernel_ll scope: link</span></span>
<span class="line"><span>  Device-2: Motorcomm Micro. YT6801 Gigabit Ethernet driver: yt6801 v: 1.0.31 pcie:</span></span>
<span class="line"><span>    speed: 2.5 GT/s lanes: 1 port: 5000 bus-ID: 06:00.0 chip-ID: 1f0a:6801 class-ID: 0200</span></span>
<span class="line"><span>  IF: enp6s0 state: down mac: 00:55:25:13:01:13</span></span>
<span class="line"><span>  WAN IP: 193.43.10.250</span></span>
<span class="line"><span>Bluetooth:</span></span>
<span class="line"><span>  Message: No bluetooth data found.</span></span>
<span class="line"><span>Logical:</span></span>
<span class="line"><span>  Message: No logical block device data found.</span></span>
<span class="line"><span>RAID:</span></span>
<span class="line"><span>  Message: No RAID data found.</span></span>
<span class="line"><span>Drives:</span></span>
<span class="line"><span>  Local Storage: total: 931.51 GiB used: 9.42 GiB (1.0%)</span></span>
<span class="line"><span>  ID-1: /dev/nvme0n1 vendor: Kingston model: SNV3S1000G size: 931.51 GiB speed: 63.2 Gb/s</span></span>
<span class="line"><span>    lanes: 4 tech: SSD serial: 50026B7687735ECD fw-rev: ETFKIN.7 temp: 44.9 C scheme: GPT</span></span>
<span class="line"><span>  Message: No optical or floppy data found.</span></span>
<span class="line"><span>Partition:</span></span>
<span class="line"><span>  ID-1: / size: 686.97 GiB used: 9.42 GiB (1.4%) fs: ext4 dev: /dev/nvme0n1p4 label: N/A</span></span>
<span class="line"><span>    uuid: d192368f-40ef-4f3d-b874-ad1cdf831a2d</span></span>
<span class="line"><span>  ID-2: /boot/efi size: 510 MiB used: 408 KiB (0.1%) fs: vfat dev: /dev/nvme0n1p1 label: N/A</span></span>
<span class="line"><span>    uuid: EB8C-9991</span></span>
<span class="line"><span>Swap:</span></span>
<span class="line"><span>  ID-1: swap-1 type: partition size: 32 GiB used: 0 KiB (0.0%) priority: -2 dev: /dev/nvme0n1p2</span></span>
<span class="line"><span>    label: N/A uuid: 3183f739-f92d-4ac1-9ef6-44b69dc0874b</span></span>
<span class="line"><span>Unmounted:</span></span>
<span class="line"><span>  ID-1: /dev/nvme0n1p3 size: 200 GiB fs: ext4 label: N/A</span></span>
<span class="line"><span>    uuid: a527d179-a2c4-4aed-b130-1c83b97ef921</span></span>
<span class="line"><span>USB:</span></span>
<span class="line"><span>  Hub-1: 1-0:1 info: full speed or root hub ports: 4 rev: 2.0 speed: 480 Mb/s lanes: 1</span></span>
<span class="line"><span>    chip-ID: 1d6b:0002 class-ID: 0900</span></span>
<span class="line"><span>  Hub-2: 2-0:1 info: full speed or root hub ports: 4 rev: 2.0 speed: 480 Mb/s lanes: 1</span></span>
<span class="line"><span>    chip-ID: 1d6b:0002 class-ID: 0900</span></span>
<span class="line"><span>  Hub-3: 3-0:1 info: full speed or root hub ports: 4 rev: 1.1 speed: 12 Mb/s lanes: 1</span></span>
<span class="line"><span>    chip-ID: 1d6b:0001 class-ID: 0900</span></span>
<span class="line"><span>  Hub-4: 4-0:1 info: full speed or root hub ports: 4 rev: 1.1 speed: 12 Mb/s lanes: 1</span></span>
<span class="line"><span>    chip-ID: 1d6b:0001 class-ID: 0900</span></span>
<span class="line"><span>  Device-1: 4-1:5 info: China Resource Semico Usb Mouse type: mouse driver: hid-generic,usbhid</span></span>
<span class="line"><span>    interfaces: 1 rev: 1.1 speed: 1.5 Mb/s lanes: 1 power: 98mA chip-ID: 1a2c:0042 class-ID: 0301</span></span>
<span class="line"><span>  Device-2: 4-2:4 info: INSTANT USB Keyboard type: keyboard,mouse driver: hid-generic,usbhid</span></span>
<span class="line"><span>    interfaces: 2 rev: 1.1 speed: 1.5 Mb/s lanes: 1 power: 100mA chip-ID: 30fa:2031 class-ID: 0300</span></span>
<span class="line"><span>  Hub-5: 5-0:1 info: hi-speed hub with single TT ports: 4 rev: 2.0 speed: 480 Mb/s lanes: 1</span></span>
<span class="line"><span>    chip-ID: 1d6b:0002 class-ID: 0900</span></span>
<span class="line"><span>  Hub-6: 6-0:1 info: super-speed hub ports: 4 rev: 3.0 speed: 5 Gb/s lanes: 1 chip-ID: 1d6b:0003</span></span>
<span class="line"><span>    class-ID: 0900</span></span>
<span class="line"><span>Use of uninitialized value in substitution (s///) at /usr/bin/inxi line 27674.</span></span>
<span class="line"><span>Use of uninitialized value in concatenation (.) or string at /usr/bin/inxi line 27675.</span></span>
<span class="line"><span>Sensors:</span></span>
<span class="line"><span>  Src: lm-sensors+/sys Message: No sensor data found using /sys/class/hwmon or lm-sensors.</span></span>
<span class="line"><span>Info:</span></span>
<span class="line"><span>  Processes: 420 Power: uptime: 21m states: freeze,mem,disk suspend: deep wakeups: 0</span></span>
<span class="line"><span>    hibernate: platform Init: systemd v: 257 target: graphical (5) default: graphical</span></span>
<span class="line"><span>  Packages: pm: rpm-apt pkgs: 1966 Compilers: N/A Shell: Bash v: 5.2.37</span></span>
<span class="line"><span>    running-in: pty pts/0 (SSH) inxi: 3.3.38</span></span>
<span class="line"><span>[root@alt-work-loongson ~]# </span></span>
<span class="line"><span></span></span>
<span class="line"><span>У вас современная платформа LoongArch64: Loongson 3C6000/S, 16 физических ядер и 32 потока, 64 ГБ DDR4-3200 ECC. Пакеты из p11_loongarch64 подходят.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Начнём с памяти:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>apt-get update</span></span>
<span class="line"><span>apt-get install stream-mem</span></span>
<span class="line"><span></span></span>
<span class="line"><span>OMP_NUM_THREADS=&quot;$(nproc)&quot; OMP_PROC_BIND=true stream_c</span></span>
<span class="line"><span></span></span>
<span class="line"><span>В конце будут показатели Copy, Scale, Add, Triad в MB/s. Пришлите весь вывод — разберу результаты. Пакет stream-mem для loongarch64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Для CPU:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>apt-get install stress-ng</span></span>
<span class="line"><span></span></span>
<span class="line"><span>stress-ng --cpu 1 --cpu-method matrixprod --timeout 60s --metrics-brief</span></span>
<span class="line"><span>stress-ng --cpu &quot;$(nproc)&quot; --cpu-method matrixprod --timeout 60s --metrics-brief</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Первая команда покажет однопоточную производительность, вторая — производительность всех 32 потоков. Сравнивать результаты нужно при одинаковой версии stress-ng и одинаковых параметрах. Пакет stress-ng</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Для NVMe без воздействия на разделы:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>apt-get install fio</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fio --name=seqwrite \\</span></span>
<span class="line"><span>    --filename=/var/tmp/fio-test.bin \\</span></span>
<span class="line"><span>    --size=8G \\</span></span>
<span class="line"><span>    --rw=write \\</span></span>
<span class="line"><span>    --bs=1M \\</span></span>
<span class="line"><span>    --direct=1 \\</span></span>
<span class="line"><span>    --ioengine=libaio \\</span></span>
<span class="line"><span>    --iodepth=32 \\</span></span>
<span class="line"><span>    --group_reporting</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fio --name=seqread \\</span></span>
<span class="line"><span>    --filename=/var/tmp/fio-test.bin \\</span></span>
<span class="line"><span>    --size=8G \\</span></span>
<span class="line"><span>    --rw=read \\</span></span>
<span class="line"><span>    --bs=1M \\</span></span>
<span class="line"><span>    --direct=1 \\</span></span>
<span class="line"><span>    --ioengine=libaio \\</span></span>
<span class="line"><span>    --iodepth=32 \\</span></span>
<span class="line"><span>    --group_reporting</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rm -f /var/tmp/fio-test.bin</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Здесь тестируется файл, а не непосредственно /dev/nvme0n1, поэтому таблица разделов и существующие данные не перезаписываются.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Важный момент: датчики температуры системой не обнаружены, поэтому пока ограничимся короткими тестами. Кроме того, видеоускорение сейчас не работает: используется программный рендерер llvmpipe, поэтому результаты графического бенчмарка будут показывать производительность CPU, а не GPU Loongson LG100. Показатель bogomips: 140800 из inxi также не является реальным бенчмарком.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>а как включить поддержку GPU Loongson LG100.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Сейчас аппаратное 3D-ускорение LG100 включить одной настройкой нельзя: в ALT установлен драйвер контроллера вывода loongson, но отсутствует драйвер непосредственно GPU 0014:7a25. Поэтому монитор работает, а OpenGL/Vulkan используют процессорный llvmpipe.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>В точной версии ALT-пакета для вашего ядра 6.18.37-alt1.port.la64 присутствует loongson.ko, но нет loonggpu.ko или gsgpu.ko. Состав kernel-modules-drm-6.18</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Для начала проверим, не установлены ли драйверы отдельно:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>lspci -nnk -s 00:06.0</span></span>
<span class="line"><span>lspci -nnk -s 00:06.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ls -la /dev/dri</span></span>
<span class="line"><span></span></span>
<span class="line"><span>lsmod | grep -E &#39;loongson|loonggpu|gsgpu&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>modinfo loongson 2&gt;&amp;1 | grep -E &#39;filename|description|alias&#39;</span></span>
<span class="line"><span>modinfo loonggpu 2&gt;&amp;1</span></span>
<span class="line"><span>modinfo gsgpu 2&gt;&amp;1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rpm -qa | grep -Ei &#39;loonggpu|gsgpu|loonggl|gpucomp|ldrm&#39;</span></span>
<span class="line"><span>apt-cache search loonggpu</span></span>
<span class="line"><span>apt-cache search gsgpu</span></span>
<span class="line"><span></span></span>
<span class="line"><span>journalctl -b -k --no-pager |</span></span>
<span class="line"><span>    grep -Ei &#39;loonggpu|gsgpu|loongson|drm|firmware&#39; |</span></span>
<span class="line"><span>    tail -n 150</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Пришлите вывод целиком.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Что потребуется, если пакетов действительно нет:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>прошивка firmware-loongson-graphics;</span></span>
<span class="line"><span>модуль ядра loonggpu/gsgpu;</span></span>
<span class="line"><span>библиотеки ldrm, loong-gpucomp, loonggl;</span></span>
<span class="line"><span>Xorg-драйвер xserver-xorg-video-loonggpu.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Такой комплект уже существует в AOSC OS: их метапакет перечисляет все указанные компоненты, а модуль адаптирован к ядрам до Linux 6.18. Состав LoongGPU Driver, описание версии 1.0.2.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Но пакеты AOSC нельзя просто ставить поверх ALT: у них другой формат пакетов, зависимости и графический стек. Для ALT потребуется отдельная RPM-сборка драйвера. Само ядро ALT уже содержит совместимые поправки для gsgpu/loonggpu, поэтому портирование технически предусмотрено, но пользовательские библиотеки и модуль GPU пока не входят в штатный DRM-пакет ALT. После вывода диагностики станет понятно, нужно ли собирать весь комплект или какой-то его компонент уже присутствует.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Диагностика подтвердила причину: аппаратное 3D-ускорение LG100 в вашей установке ALT отсутствует.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Что видно по выводу:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>00:06.0 [0014:7a25] — сам LG100, строка Kernel driver in use отсутствует.</span></span>
<span class="line"><span>00:06.1 [0014:7a36] — контроллер вывода, использует loongson.</span></span>
<span class="line"><span>loongson.ko поддерживает только PCI ID 7a36 и 7a06, но не 7a25.</span></span>
<span class="line"><span>Модулей loonggpu и gsgpu нет.</span></span>
<span class="line"><span>Пакетов loonggl, ldrm, loong-gpucomp тоже нет.</span></span>
<span class="line"><span>Поэтому OpenGL работает через программный llvmpipe.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Повторно загружать loongson бессмысленно — он уже работает и отвечает только за вывод изображения.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Как действительно включить LG100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Нужен отдельный стек LoongGPU 1.0.2:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>firmware-loongson-graphics;</span></span>
<span class="line"><span>модуль ядра loonggpu/gsgpu;</span></span>
<span class="line"><span>ldrm;</span></span>
<span class="line"><span>loong-gpucomp;</span></span>
<span class="line"><span>loonggl;</span></span>
<span class="line"><span>xserver-xorg-video-loonggpu.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>В официальном p11_loongarch64 этих пакетов сейчас нет. В комплекте DRM вашего ядра присутствует только loongson.ko. Состав пакета ALT</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Исходный код модуля LoongGPU открыт, а AOSC адаптировала его к ядру Linux 6.18. Исходный код модуля, описание версии 1.0.2. Ядро ALT также содержит специальную поправку совместимости для gsgpu/loonggpu, но самого драйвера и пользовательских библиотек в ALT нет.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Итог: штатной командой в текущем ALT ускорение не включить. Реальные варианты:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>собрать полный комплект LoongGPU в RPM специально для ALT;</span></span>
<span class="line"><span>дождаться/запросить официальную сборку у команды ALT;</span></span>
<span class="line"><span>использовать поддерживаемую дискретную AMD-видеокарту;</span></span>
<span class="line"><span>установить систему, где LoongGPU уже интегрирован, например AOSC OS или совместимую версию Loongnix.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Ставить пакеты AOSC/Loongnix напрямую поверх ALT не стоит: они могут заменить libGL, Xorg-компоненты и оставить систему без графического интерфейса. Для сохранения ALT нужен именно отдельный RPM-порт всего комплекта, а не только сборка loonggpu.ko.</span></span>
<span class="line"><span>вчера</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Подготовка выполнена успешно:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>контрольная сумма прошивки совпала;</span></span>
<span class="line"><span>lg100_cp.bin и lg200_cp.bin установлены;</span></span>
<span class="line"><span>modprobe действительно ставит loonggpu.ko перед loongson.ko;</span></span>
<span class="line"><span>повторяющиеся строки зависимостей ttm и i2c-algo-bit в выводе не являются ошибкой.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Теперь пересоберите initramfs:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>make-initrd -k &quot;$(uname -r)&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Если команда завершится без ошибок:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>reboot</span></span>
<span class="line"><span></span></span>
<span class="line"><span>После загрузки проверьте от root:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>lspci -nnk -s 00:06.0</span></span>
<span class="line"><span>lspci -nnk -s 00:06.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ls -la /dev/dri/by-path</span></span>
<span class="line"><span></span></span>
<span class="line"><span>readlink -f /sys/class/drm/card0/device/driver</span></span>
<span class="line"><span>readlink -f /sys/class/drm/renderD128/device/driver</span></span>
<span class="line"><span></span></span>
<span class="line"><span>journalctl -b -k --no-pager |</span></span>
<span class="line"><span>grep -Ei &#39;loonggpu|gsgpu|lg100|firmware|drm&#39; |</span></span>
<span class="line"><span>tail -n 250</span></span>
<span class="line"><span></span></span>
<span class="line"><span>В терминале графического пользователя:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>glxinfo -B</span></span>
<span class="line"><span>inxi -Gxx</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Главный ожидаемый результат:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>00:06.0  Kernel driver in use: loonggpu</span></span>
<span class="line"><span>00:06.1  Kernel driver in use: loonggpu-dc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>А в glxinfo -B:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Accelerated: yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>и renderer уже не llvmpipe.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Если после перезагрузки графика не откроется, но SSH будет доступен, откат:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rm -f /etc/modprobe.d/loonggpu-order.conf</span></span>
<span class="line"><span>make-initrd -k &quot;$(uname -r)&quot;</span></span>
<span class="line"><span>reboot</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@basealt ~]#  </span></span>
<span class="line"><span>[root@basealt ~]# lspci -nnk -s 00:06.0</span></span>
<span class="line"><span>lspci -nnk -s 00:06.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ls -la /dev/dri/by-path</span></span>
<span class="line"><span></span></span>
<span class="line"><span>readlink -f /sys/class/drm/card0/device/driver</span></span>
<span class="line"><span>readlink -f /sys/class/drm/renderD128/device/driver</span></span>
<span class="line"><span></span></span>
<span class="line"><span>journalctl -b -k --no-pager |</span></span>
<span class="line"><span>grep -Ei &#39;loonggpu|gsgpu|lg100|firmware|drm&#39; |</span></span>
<span class="line"><span>tail -n 250</span></span>
<span class="line"><span>00:06.0 Multimedia video controller [0400]: Loongson Technology LLC LG100 GPU [0014:7a25] (rev 01)</span></span>
<span class="line"><span>       Kernel driver in use: loonggpu</span></span>
<span class="line"><span>00:06.1 VGA compatible controller [0300]: Loongson Technology LLC Display Controller [0014:7a36] (rev 02)</span></span>
<span class="line"><span>       Kernel driver in use: loonggpu-dc</span></span>
<span class="line"><span>итого 0</span></span>
<span class="line"><span>drwxr-xr-x 2 root root  80 авг 27 15:49 .</span></span>
<span class="line"><span>drwxr-xr-x 3 root root 100 авг 27 15:49 ..</span></span>
<span class="line"><span>lrwxrwxrwx 1 root root   8 авг 27 15:49 pci-0000:00:06.1-card -&gt; ../card0</span></span>
<span class="line"><span>lrwxrwxrwx 1 root root  13 авг 27 15:49 pci-0000:00:06.1-render -&gt; ../renderD128</span></span>
<span class="line"><span>/sys/bus/pci/drivers/loonggpu-dc</span></span>
<span class="line"><span>/sys/bus/pci/drivers/loonggpu-dc</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: ACPI: bus type drm_connector registered</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: loonggpu: loading out-of-tree module taints kernel.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: loonggpu: module verification failed: signature and/or required key missing - tainting kernel</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] loonggpu kernel modesetting enabled.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] initializing kernel modesetting (LG100 0x0014:0x7A25 0x0000:0x0000 0x01).</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Set 7A2000 device in loonggpu driver</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] register mmio base: 0x39172000</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] register mmio size: 256</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] loonggpu dc register mmio base: 0x39110000</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] loonggpu dc register mmio size: 65536</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] loonggpu dc io base: 0xffff800038d54000</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: kcd kcd: LG100 not supported in kcd</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] GPU Family: LG100 series LG110, Feature:0x00000000</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Firmware Version: 1.0.0</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] aper_base 0xe0020000000 SIZE 0x10000000 bytes  </span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: loonggpu 0000:00:06.0: Video RAM: 256M 0x0001000000000000 - 0x000100000FFFFFFF (256M used)</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GART: 256M 0x0000000000000000 - 0x000000000FFFFFFF</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] loonggpu: 3072M of GTT memory ready.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] GART: num cpu pages 16384, num gpu pages 16384</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] vm size is 1024 GB, 3 levels, block size is 11-bit</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] PCIE GART of 256M enabled (table at 0x000100000FFC0000).</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] ZIP META: num cpu pages 128, num gpu pages 128</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU get vbios from vram Success  </span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU vbios header info:</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] ver:2.1 links:2 max_planes:0 name:Loongson-VBIOS info:</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] oem-vendor:VU oem-product:2022</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU vbios crtc-0 max_frep:340000 width:4096 height:4096</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU vbios crtc-1 max_frep:340000 width:4096 height:4096</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: loonggpu 0000:00:06.0: VRAM: 256M DDR4 32bit 2400Mhz.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: loonggpu 0000:00:06.0: LOONGGPU: shaders_num: 64, shaders_freq: 480, freq_count: 3.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Encoder Parse: #0x01-vga feature:0 type:dac hotplug:polling.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Encoder Parse: config_type:timing edid_method:i2c reset_gpio:0.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Encoder Parse: #0x02-hdmi feature:0 type:tmds hotplug:irq.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Encoder Parse: config_type:timing edid_method:i2c reset_gpio:0.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU Display Core initialized with v1.0!</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU DC construct links:2</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] PCIE ZIP META of 2M enabled (table at 0x000100000FC00000).</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU DC init gpio 0 addr 0x50 finish</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] [Bridge_phy] vga encoder-0 be attach to this bridge.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] [Bridge_phy] vga init finish.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU DC init gpio 1 addr 0x50 finish</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] [Bridge_phy] hdmi encoder-1 be attach to this bridge.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] [Bridge_phy] hdmi init finish.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU DC irq init sources number:13</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU Display Crtcs</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Crtc 0: name:crtc-0</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Crtc 1: name:crtc-1</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU Display Connectors</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Connector 0: name:VGA-1</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Connector 1: name:HDMI-A-1</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] LOONGGPU Display Encoders</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Encoder 0: name:TMDS-41</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Encoder 1: name:TMDS-43</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Config crtc number:2 meta addr 0x100000fa00000</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] loonggpu_dc_scale_init: family_type:1 no bpipe, not support scaling.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] Initialized gsgpu 1.0.0 for 0000:00:06.1 on minor 0</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] fb mappable at 0xE002F000000</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] vram apper at 0xE0020000000</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] size 8306688</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] fb depth is 24</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm]    pitch is 7680</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] screen_base 0xFFFF800034000000</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: [drm] screen_size 0x7EC000</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test kernel: loonggpu-dc 0000:00:06.1: [drm] fb0: gsgpudrmfb frame buffer device</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test systemd[1]: Starting modprobe@drm.service - Load Kernel Module drm...</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test systemd[1]: systemd-hibernate-clear.service - Clear Stale Hibernate Storage Info was skipped because of an unmet condition check (ConditionPathExists=/sys/firmware/efi/efivars/HibernateLocation-8cf264</span></span>
<span class="line"><span>4b-4b0b-428f-9387-6d876050dc67).</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test systemd[1]: modprobe@drm.service: Deactivated successfully.</span></span>
<span class="line"><span>авг 27 15:49:24 basealt.kompas.test systemd[1]: Finished modprobe@drm.service - Load Kernel Module drm.</span></span>
<span class="line"><span>[root@basealt ~]#</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@basealt ~]#  </span></span>
<span class="line"><span>[root@basealt ~]# cat /home/basealt/inxi.txt  </span></span>
<span class="line"><span>[basealt@basealt ~]$ inxi -Gxx</span></span>
<span class="line"><span>Graphics:</span></span>
<span class="line"><span> Device-1: Loongson LLC LG100 GPU driver: loonggpu v: kernel arch: ?</span></span>
<span class="line"><span>   bus-ID: 00:06.0 chip-ID: 0014:7a25</span></span>
<span class="line"><span> Display: x11 server: X.Org v: 1.21.1.24 with: Xwayland v: 24.1.13</span></span>
<span class="line"><span>   compositor: gnome-shell v: 48.5 driver: dri: gsgpu gpu: loonggpu,loonggpu-dc</span></span>
<span class="line"><span>   note: X driver n/a, try sudo/root display-ID: :0 screens: 1</span></span>
<span class="line"><span> Screen-1: 0 s-res: 1920x1080 s-dpi: 93</span></span>
<span class="line"><span> Monitor-1: HDMI-A-1 mapped: HDMI-1 model: Dell P2419HC res: 1920x1080</span></span>
<span class="line"><span>   hz: 60 dpi: 93 diag: 604mm (23.8&quot;)</span></span>
<span class="line"><span> API: EGL v: 1.5 platforms: device: 1 drv: swrast gbm: drv: kms_swrast</span></span>
<span class="line"><span>   surfaceless: drv: swrast x11: drv: swrast inactive: wayland,device-0</span></span>
<span class="line"><span> API: OpenGL v: 4.5 vendor: mesa v: 25.3.6 glx-v: 1.4 direct-render: yes</span></span>
<span class="line"><span>   renderer: llvmpipe (LLVM 20.1.8 128 bits) device-ID: ffffffff:ffffffff</span></span>
<span class="line"><span> API: Vulkan v: 1.4.335 surfaces: N/A device: 0 type: cpu</span></span>
<span class="line"><span>   driver: mesa llvmpipe device-ID: 10005:0000</span></span>
<span class="line"><span> Info: Tools: api: clinfo, eglinfo, glxinfo, vulkaninfo</span></span>
<span class="line"><span>   gpu: nvidia-settings wl: wayland-info x11: xdpyinfo, xprop, xrandr</span></span>
<span class="line"><span>[basealt@basealt ~]$  </span></span>
<span class="line"><span>[root@basealt ~]#  </span></span>
<span class="line"><span>[root@basealt ~]#  </span></span>
<span class="line"><span>[root@basealt ~]# cat /home/basealt/glxinfo-b.txt</span></span>
<span class="line"><span>glx: failed to create dri3 screen</span></span>
<span class="line"><span>failed to load driver: loonggpu</span></span>
<span class="line"><span></span></span>
<span class="line"><span>name of display: :0</span></span>
<span class="line"><span>display: :0  screen: 0</span></span>
<span class="line"><span>direct rendering: Yes</span></span>
<span class="line"><span>Extended renderer info (GLX_MESA_query_renderer):</span></span>
<span class="line"><span>   Vendor: Mesa (0xffffffff)</span></span>
<span class="line"><span>   Device: llvmpipe (LLVM 20.1.8, 128 bits) (0xffffffff)</span></span>
<span class="line"><span>   Version: 25.3.6</span></span>
<span class="line"><span>   Accelerated: no</span></span>
<span class="line"><span>   Video memory: 16134MB</span></span>
<span class="line"><span>   Unified memory: yes</span></span>
<span class="line"><span>   Preferred profile: core (0x1)</span></span>
<span class="line"><span>   Max core profile version: 4.5</span></span>
<span class="line"><span>   Max compat profile version: 4.5</span></span>
<span class="line"><span>   Max GLES1 profile version: 1.1</span></span>
<span class="line"><span>   Max GLES[23] profile version: 3.2</span></span>
<span class="line"><span>Memory info (GL_ATI_meminfo):</span></span>
<span class="line"><span>   VBO free memory - total: 0 MB, largest block: 0 MB</span></span>
<span class="line"><span>   VBO free aux. memory - total: 12252 MB, largest block: 12252 MB</span></span>
<span class="line"><span>   Texture free memory - total: 0 MB, largest block: 0 MB</span></span>
<span class="line"><span>   Texture free aux. memory - total: 12252 MB, largest block: 12252 MB</span></span>
<span class="line"><span>   Renderbuffer free memory - total: 0 MB, largest block: 0 MB</span></span>
<span class="line"><span>   Renderbuffer free aux. memory - total: 12252 MB, largest block: 12252 MB</span></span>
<span class="line"><span>Memory info (GL_NVX_gpu_memory_info):</span></span>
<span class="line"><span>   Dedicated video memory: 0 MB</span></span>
<span class="line"><span>   Total available memory: 16134 MB</span></span>
<span class="line"><span>   Currently available dedicated video memory: 0 MB</span></span>
<span class="line"><span>OpenGL vendor string: Mesa</span></span>
<span class="line"><span>OpenGL renderer string: llvmpipe (LLVM 20.1.8, 128 bits)</span></span>
<span class="line"><span>OpenGL core profile version string: 4.5 (Core Profile) Mesa 25.3.6</span></span>
<span class="line"><span>OpenGL core profile shading language version string: 4.50</span></span>
<span class="line"><span>OpenGL core profile context flags: (none)</span></span>
<span class="line"><span>OpenGL core profile profile mask: core profile</span></span>
<span class="line"><span></span></span>
<span class="line"><span>OpenGL version string: 4.5 (Compatibility Profile) Mesa 25.3.6</span></span>
<span class="line"><span>OpenGL shading language version string: 4.50</span></span>
<span class="line"><span>OpenGL context flags: (none)</span></span>
<span class="line"><span>OpenGL profile mask: compatibility profile</span></span>
<span class="line"><span></span></span>
<span class="line"><span>OpenGL ES profile version string: OpenGL ES 3.2 Mesa 25.3.6</span></span>
<span class="line"><span>OpenGL ES profile shading language version string: OpenGL ES GLSL ES 3.20</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@basealt ~]#</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Ядровой драйвер LG100 теперь работает корректно:</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>графика не  запустилась после перезагрузки</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span></span></span>
<span class="line"><span>По выводу зависает не ядро GPU:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>в журнале ядра нет timeout, reset, fault или GPU hang;</span></span>
<span class="line"><span>kKompas остаётся живым: STAT=Sl+;</span></span>
<span class="line"><span>основной поток ждёт в poll_schedule_timeout;</span></span>
<span class="line"><span>процесс потребляет 27,9% CPU и 31,7% RAM.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Это указывает на зависание внутри пользовательского процесса или графической библиотеки. Точное место пока не определено. Ошибка xdpyinfo возникла только потому, что команда выполнена от root, у которого нет X11-cookie пользователя basealt.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Пока КОМПАС завис, выполните:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pid=&quot;$(pgrep -u basealt -n -x kKompas)&quot;</span></span>
<span class="line"><span>echo &quot;PID=$pid&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== ПОТОКИ ===&#39;</span></span>
<span class="line"><span>ps -L -p &quot;$pid&quot; \\</span></span>
<span class="line"><span>  -o pid,tid,psr,stat,wchan:35,%cpu,%mem,etime,comm \\</span></span>
<span class="line"><span>  --sort=-%cpu |</span></span>
<span class="line"><span>head -n 40</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== ГРАФИЧЕСКИЕ БИБЛИОТЕКИ ===&#39;</span></span>
<span class="line"><span>grep -E \\</span></span>
<span class="line"><span>  &#39;loonggpu|gsgpu|swrast|libGLX|libEGL|libGL\\.so&#39; \\</span></span>
<span class="line"><span>  /proc/&quot;$pid&quot;/maps |</span></span>
<span class="line"><span>sort -u</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== ПАМЯТЬ ===&#39;</span></span>
<span class="line"><span>free -h</span></span>
<span class="line"><span>grep -E &#39;VmPeak|VmSize|VmRSS|VmSwap|Threads&#39; \\</span></span>
<span class="line"><span>  /proc/&quot;$pid&quot;/status</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== СИСТЕМНЫЕ ВЫЗОВЫ ЗА 10 СЕКУНД ===&#39;</span></span>
<span class="line"><span>timeout 10s strace -f -tt -T \\</span></span>
<span class="line"><span>  -p &quot;$pid&quot; \\</span></span>
<span class="line"><span>  -o /var/tmp/kompas-hang.strace</span></span>
<span class="line"><span></span></span>
<span class="line"><span>tail -n 100 /var/tmp/kompas-hang.strace</span></span>
<span class="line"><span></span></span>
<span class="line"><span>После сохранения диагностики завершите зависший процесс штатным сигналом:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>kill -TERM &quot;$pid&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Затем проверим вероятную связь с предупреждением драйвера о неверных GPU timestamps. Запустите ускоренный вариант с отключённым ожиданием вертикальной синхронизации:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd /home/basealt/KOMPAS_LOONG64/KOMPAS</span></span>
<span class="line"><span></span></span>
<span class="line"><span>env \\</span></span>
<span class="line"><span>  LD_LIBRARY_PATH=&quot;/usr/lib/loongarch64-linux-gnu:/usr/lib/loongarch64-linux-gnu/loonggpu&quot; \\</span></span>
<span class="line"><span>  LIBGL_DRIVERS_PATH=/usr/lib/loongarch64-linux-gnu/loonggpu/dri \\</span></span>
<span class="line"><span>  __GLX_VENDOR_LIBRARY_NAME=loonggpu \\</span></span>
<span class="line"><span>  QT_QPA_PLATFORM=xcb \\</span></span>
<span class="line"><span>  QT_XCB_GL_INTEGRATION=xcb_glx \\</span></span>
<span class="line"><span>  vblank_mode=0 \\</span></span>
<span class="line"><span>  ./KOMPAS.sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vblank_mode=0 сейчас является диагностическим тестом, а не подтверждённым исправлением. Если КОМПАС снова зависнет, используйте программный рендерер и не запускайте рабочие документы через LoongGPU до выяснения причины:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd /home/basealt/KOMPAS_LOONG64/KOMPAS</span></span>
<span class="line"><span></span></span>
<span class="line"><span>env -u __GLX_VENDOR_LIBRARY_NAME \\</span></span>
<span class="line"><span>    -u LIBGL_DRIVERS_PATH \\</span></span>
<span class="line"><span>    -u LD_LIBRARY_PATH \\</span></span>
<span class="line"><span>    LIBGL_ALWAYS_SOFTWARE=1 \\</span></span>
<span class="line"><span>    ./KOMPAS.sh</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>в идеале я хотел бы добиться полной поддержки графики loongson гномом</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>[basealt@basealt ~]$ stage=/opt/loonggpu-lnd25.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>timeout 30s env \\</span></span>
<span class="line"><span>  LD_LIBRARY_PATH=&quot;$stage/usr/lib/gsgpu:$stage/usr/lib&quot; \\</span></span>
<span class="line"><span>  LIBGL_DRIVERS_PATH=&quot;$stage/usr/lib/gsgpu/dri:/usr/lib64/X11/modules/dri&quot; \\</span></span>
<span class="line"><span>  GBM_BACKENDS_PATH=&quot;$stage/usr/lib/gbm&quot; \\</span></span>
<span class="line"><span>  GBM_BACKEND=gsgpu \\</span></span>
<span class="line"><span>  __EGL_VENDOR_LIBRARY_FILENAMES=&quot;$stage/usr/share/glvnd/egl_vendor.d/60_gsgpu.json&quot; \\</span></span>
<span class="line"><span>  LIBGL_DEBUG=verbose \\</span></span>
<span class="line"><span>  EGL_LOG_LEVEL=debug \\</span></span>
<span class="line"><span>  eglinfo -B -p x11 \\</span></span>
<span class="line"><span>  &gt; /home/basealt/eglinfo-gsgpu-lnd25.1-x11.txt 2&gt;&amp;1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;Код X11: $?&quot;</span></span>
<span class="line"><span>cat /home/basealt/eglinfo-gsgpu-lnd25.1-x11.txt</span></span>
<span class="line"><span>Ошибка сегментирования</span></span>
<span class="line"><span>Код X11: 139</span></span>
<span class="line"><span>libEGL debug: Native platform type: x11 (build-time configuration)</span></span>
<span class="line"><span>libEGL debug: EGL user error 0x3001 (EGL_NOT_INITIALIZED) in eglQueryString</span></span>
<span class="line"><span></span></span>
<span class="line"><span>libEGL debug: LG100 X11 platform: Arbitration gsgpu successful</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 476, column 8: unknown application attribute: executable_regexp.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 713, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 714, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 751, column 8: unknown application attribute: application_name_match.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 799, column 8: unknown application attribute: application_name_match.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1035, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1036, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1120, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1121, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1124, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1125, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1127, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1128, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1130, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1131, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1139, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1140, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1143, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1144, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1145, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1148, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1149, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1151, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1152, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1252, column 4: unknown device attribute: device.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1339, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1345, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1347, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1354, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1360, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1413, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1419, column 11: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1422, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1429, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1435, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1439, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-mesa-defaults.conf line 1446, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 41, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 42, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 43, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 44, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 45, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 48, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 49, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 50, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 53, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 54, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 57, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 58, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 59, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 60, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 63, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 64, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 65, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 66, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 69, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 70, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 73, column 8: unknown element: engine.</span></span>
<span class="line"><span>libGL: Warning in /usr/share/drirc.d/00-radv-defaults.conf line 74, column 12: &lt;option&gt; should be inside &lt;application&gt;.</span></span>
<span class="line"><span>libGL: Can&#39;t open configuration file /etc/drirc: No such file or directory.</span></span>
<span class="line"><span>libGL: Can&#39;t open configuration file /home/basealt/.drirc: No such file or directory.</span></span>
<span class="line"><span>libEGL debug: failed to open /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/loonggpu_dri.so: /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/loonggpu_dri.so: cannot open shared object file: No such file or directory</span></span>
<span class="line"><span></span></span>
<span class="line"><span>libEGL debug: failed to open /usr/lib64/X11/modules/dri/loonggpu_dri.so: /usr/lib64/X11/modules/dri/loonggpu_dri.so: cannot open shared object file: No such file or directory</span></span>
<span class="line"><span></span></span>
<span class="line"><span>libEGL warning: DRI2: failed to open loonggpu (search paths /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri:/usr/lib64/X11/modules/dri)</span></span>
<span class="line"><span>libEGL debug: failed to open /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/loonggpu_dri.so: /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/loonggpu_dri.so: cannot open shared object file: No such file or directory</span></span>
<span class="line"><span></span></span>
<span class="line"><span>libEGL debug: failed to open /usr/lib64/X11/modules/dri/loonggpu_dri.so: /usr/lib64/X11/modules/dri/loonggpu_dri.so: cannot open shared object file: No such file or directory</span></span>
<span class="line"><span></span></span>
<span class="line"><span>libEGL warning: DRI2: failed to open loonggpu (search paths /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri:/usr/lib64/X11/modules/dri)</span></span>
<span class="line"><span>libEGL debug: failed to open /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/swrast_dri.so: /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/swrast_dri.so: cannot open shared object file: No such file or directory</span></span>
<span class="line"><span></span></span>
<span class="line"><span>libEGL debug: DRI2: dlopen(/usr/lib64/X11/modules/dri/swrast_dri.so)</span></span>
<span class="line"><span>libEGL debug: found extension DRI_Core&#39;</span></span>
<span class="line"><span>libEGL info: found extension DRI_Core version 1</span></span>
<span class="line"><span>libEGL debug: found extension DRI_SWRast&#39;</span></span>
<span class="line"><span>libEGL info: found extension DRI_SWRast version 5</span></span>
<span class="line"><span>libEGL debug: found extension DRI_DRI2&#39;</span></span>
<span class="line"><span>gbm: failed to open any driver (search paths /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri:/usr/lib64/X11/modules/dri)</span></span>
<span class="line"><span>gbm: Last dlopen error: /usr/lib64/X11/modules/dri/loonggpu_dri.so: cannot open shared object file: No such file or directory</span></span>
<span class="line"><span>failed to load driver: loonggpu</span></span>
<span class="line"><span>[basealt@basealt ~]$ </span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Теперь подтверждена не проблема путей, а несовместимость или DRM-аутентификация:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    X11 успешно выбирает gsgpu и загружает нужный loonggpu_dri.so, после чего процесс падает.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    GBM получает -13 (EACCES) при LOONGGPU_INFO_ACCEL_WORKING.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    В исходном драйвере AOSC этот ioctl помечен DRM_AUTH | DRM_RENDER_ALLOW; сам обработчик ACCEL_WORKING не возвращает EACCES. Значит отказ возникает на уровне проверки DRM-клиента — либо открыт card0 без DRM-аутентификации, либо установленный модуль не соответствует стеку lnd25.1. Исходный код AOSC</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Проверка GBM от root</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Это позволит отделить DRM-аутентификацию от несовместимости ABI:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>stage=/opt/loonggpu-lnd25.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>timeout 30s env \\</span></span>
<span class="line"><span>  LD_LIBRARY_PATH=&quot;$stage/usr/lib/gsgpu:$stage/usr/lib/loonggpu:$stage/usr/lib&quot; \\</span></span>
<span class="line"><span>  LIBGL_DRIVERS_PATH=&quot;$stage/usr/lib/loonggpu/dri:$stage/usr/lib/gsgpu/dri:/usr/lib64/X11/modules/dri&quot; \\</span></span>
<span class="line"><span>  GBM_BACKENDS_PATH=&quot;$stage/usr/lib/gbm&quot; \\</span></span>
<span class="line"><span>  GBM_BACKEND=gsgpu \\</span></span>
<span class="line"><span>  __EGL_VENDOR_LIBRARY_FILENAMES=&quot;$stage/usr/share/glvnd/egl_vendor.d/60_gsgpu.json&quot; \\</span></span>
<span class="line"><span>  LIBGL_DEBUG=verbose \\</span></span>
<span class="line"><span>  EGL_LOG_LEVEL=debug \\</span></span>
<span class="line"><span>  eglinfo -B -p gbm \\</span></span>
<span class="line"><span>  &gt; /root/eglinfo-combined-gbm-root.txt 2&gt;&amp;1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rc=$?</span></span>
<span class="line"><span>echo &quot;Код GBM root: $rc&quot;</span></span>
<span class="line"><span>cat /root/eglinfo-combined-gbm-root.txt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Интерпретация:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    если исчезнет failed (-13), проблема связана с DRM-аутентификацией;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    если останется -13 или произойдёт сегментация, вероятна несовместимость модуля и библиотек.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. Узнать, какое устройство открывает GBM</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Выполните как basealt:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>stage=/opt/loonggpu-lnd25.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>timeout 15s strace \\</span></span>
<span class="line"><span>  -f -yy -s 128 \\</span></span>
<span class="line"><span>  -e trace=openat,ioctl \\</span></span>
<span class="line"><span>  -o /home/basealt/eglinfo-combined-gbm.strace \\</span></span>
<span class="line"><span>  env \\</span></span>
<span class="line"><span>    LD_LIBRARY_PATH=&quot;$stage/usr/lib/gsgpu:$stage/usr/lib/loonggpu:$stage/usr/lib&quot; \\</span></span>
<span class="line"><span>    LIBGL_DRIVERS_PATH=&quot;$stage/usr/lib/loonggpu/dri:$stage/usr/lib/gsgpu/dri:/usr/lib64/X11/modules/dri&quot; \\</span></span>
<span class="line"><span>    GBM_BACKENDS_PATH=&quot;$stage/usr/lib/gbm&quot; \\</span></span>
<span class="line"><span>    GBM_BACKEND=gsgpu \\</span></span>
<span class="line"><span>    __EGL_VENDOR_LIBRARY_FILENAMES=&quot;$stage/usr/share/glvnd/egl_vendor.d/60_gsgpu.json&quot; \\</span></span>
<span class="line"><span>    eglinfo -B -p gbm</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;Код strace: $?&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>grep -E \\</span></span>
<span class="line"><span>  &#39;/dev/dri|DRM_IOCTL|EACCES|EPERM&#39; \\</span></span>
<span class="line"><span>  /home/basealt/eglinfo-combined-gbm.strace |</span></span>
<span class="line"><span>tail -n 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Нужно увидеть, где возникает EACCES:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    на /dev/dri/card0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    на /dev/dri/renderD128;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    либо непосредственно на DRM_IOCTL_LOONGGPU_INFO.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. Идентификация модуля ядра</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Текущий loonggpu.ko не принадлежит RPM, поэтому его происхождение и соответствие lnd25.1 пока неизвестны:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>gpu_module=&quot;$(modinfo -n loonggpu)&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;=== МОДУЛЬ ===&quot;</span></span>
<span class="line"><span>ls -lh &quot;$gpu_module&quot;</span></span>
<span class="line"><span>sha256sum &quot;$gpu_module&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>modinfo loonggpu |</span></span>
<span class="line"><span>grep -E &#39;filename|version|srcversion|vermagic|firmware&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;=== СТРОКИ СБОРКИ ===&quot;</span></span>
<span class="line"><span>strings &quot;$gpu_module&quot; |</span></span>
<span class="line"><span>grep -Ei &#39;lnd25|ud25|rc1|loonggpu.*1\\.0\\.2|gcc version|clang version&#39; |</span></span>
<span class="line"><span>head -n 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>AOSC публикует для данного пользовательского стека модуль той же линии 1.0.2+lnd25.1; именно соответствие этой версии сейчас требуется проверить. Пакет модуля AOSC</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Пока не подключайте библиотеки глобально к GNOME: оба теста завершаются SIGSEGV, поэтому глобальное включение снова может повредить запуск всего сеанса. Пришлите вывод трёх проверок.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Drop-in GDM не решил загрузку Xorg: сервер продолжил открывать системный /usr/lib64/X11/modules/dri/gsgpu_dri.so, а libloong-gpucomp.so.1 остался недоступен.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Также старый X-сервер при завершении упал внутри libexa.so. Это ещё один признак проблемной связки loonggpu DDX + EXA + ShadowFB. Ошибок GPU/DRM в приведённом фрагменте нет.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Пустой gnome-shell PID означает, что после перезапуска пользователь basealt ещё не вошёл в GNOME.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Удаляем неэффективный drop-in</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Пока не перезапускайте GDM второй раз:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rm -f \\</span></span>
<span class="line"><span>  /etc/systemd/system/gdm.service.d/50-loonggpu-lnd25.1.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rmdir \\</span></span>
<span class="line"><span>  /etc/systemd/system/gdm.service.d 2&gt;/dev/null || true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span></span></span>
<span class="line"><span>systemctl show gdm.service -p Environment</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Environment= должен стать пустым.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. Сравниваем установленный и новый стек</span></span>
<span class="line"><span>stage=/opt/loonggpu-lnd25.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== DRI ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sha256sum \\</span></span>
<span class="line"><span>  /usr/lib64/dri/gsgpu_dri.so \\</span></span>
<span class="line"><span>  &quot;$stage/usr/lib/gsgpu/dri/gsgpu_dri.so&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== GLAPI ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sha256sum \\</span></span>
<span class="line"><span>  /usr/lib/loongarch64-linux-gnu/gsgpu/libgsgpu_glapi.so.0 \\</span></span>
<span class="line"><span>  &quot;$stage/usr/lib/gsgpu/libgsgpu_glapi.so.0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== GPUCOMP ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sha256sum \\</span></span>
<span class="line"><span>  /usr/lib/loongarch64-linux-gnu/libloong-gpucomp.so.1 \\</span></span>
<span class="line"><span>  &quot;$stage/usr/lib/libloong-gpucomp.so.1&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== LDRM ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sha256sum \\</span></span>
<span class="line"><span>  /lib64/libldrm.so.1 \\</span></span>
<span class="line"><span>  &quot;$stage/usr/lib/libldrm.so.1&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== RUNPATH НОВОГО DRI ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>readelf -d \\</span></span>
<span class="line"><span>  &quot;$stage/usr/lib/gsgpu/dri/gsgpu_dri.so&quot; |</span></span>
<span class="line"><span>grep -E &#39;NEEDED|RPATH|RUNPATH&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== ЗАВИСИМОСТИ НОВОГО DRI С ЕГО СТЕКОМ ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>env \\</span></span>
<span class="line"><span>  LD_LIBRARY_PATH=&quot;$stage/usr/lib/gsgpu:$stage/usr/lib&quot; \\</span></span>
<span class="line"><span>  ldd &quot;$stage/usr/lib/gsgpu/dri/gsgpu_dri.so&quot; |</span></span>
<span class="line"><span>grep -E &#39;gsgpu|gpucomp|ldrm|not found&#39;</span></span>
<span class="line"><span>3. Уточняем падение EXA</span></span>
<span class="line"><span>grep -n -B 30 -A 40 \\</span></span>
<span class="line"><span>  &#39;Caught signal 6&#39; \\</span></span>
<span class="line"><span>  /var/log/Xorg.1.log |</span></span>
<span class="line"><span>tail -n 120</span></span>
<span class="line"><span></span></span>
<span class="line"><span>journalctl -b -k \\</span></span>
<span class="line"><span>  --since &quot;$(cat /root/loonggpu-gdm-test-start)&quot; \\</span></span>
<span class="line"><span>  --no-pager |</span></span>
<span class="line"><span>grep -Ei \\</span></span>
<span class="line"><span>  &#39;loonggpu|gsgpu|timeout|fault|hang|reset|ring|drm&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Дальнейшее действие определяется хешами:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>если файлы старого и lnd25.1 стека одинаковые — достаточно исправить системный поиск libloong-gpucomp.so.1;</span></span>
<span class="line"><span>если хеши различаются — нужно направить Xorg именно на комплект lnd25.1, не смешивая его со старыми библиотеками.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Глобально добавлять весь /opt/loonggpu-lnd25.1 в ld.so.conf до сравнения не следует: при разных версиях это снова создаст смешанный EGL/DRI-стек.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@basealt loonggpu-lnd25.1-debs]#  </span></span>
<span class="line"><span>[root@basealt loonggpu-lnd25.1-debs]# stage=/opt/loonggpu-lnd25.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== DRI ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sha256sum \\</span></span>
<span class="line"><span> /usr/lib64/dri/gsgpu_dri.so \\</span></span>
<span class="line"><span> &quot;$stage/usr/lib/gsgpu/dri/gsgpu_dri.so&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== GLAPI ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sha256sum \\</span></span>
<span class="line"><span> /usr/lib/loongarch64-linux-gnu/gsgpu/libgsgpu_glapi.so.0 \\</span></span>
<span class="line"><span> &quot;$stage/usr/lib/gsgpu/libgsgpu_glapi.so.0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== GPUCOMP ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sha256sum \\</span></span>
<span class="line"><span> /usr/lib/loongarch64-linux-gnu/libloong-gpucomp.so.1 \\</span></span>
<span class="line"><span> &quot;$stage/usr/lib/libloong-gpucomp.so.1&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== LDRM ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sha256sum \\</span></span>
<span class="line"><span> /lib64/libldrm.so.1 \\</span></span>
<span class="line"><span> &quot;$stage/usr/lib/libldrm.so.1&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== RUNPATH НОВОГО DRI ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>readelf -d \\</span></span>
<span class="line"><span> &quot;$stage/usr/lib/gsgpu/dri/gsgpu_dri.so&quot; |</span></span>
<span class="line"><span>grep -E &#39;NEEDED|RPATH|RUNPATH&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== ЗАВИСИМОСТИ НОВОГО DRI С ЕГО СТЕКОМ ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>env \\</span></span>
<span class="line"><span> LD_LIBRARY_PATH=&quot;$stage/usr/lib/gsgpu:$stage/usr/lib&quot; \\</span></span>
<span class="line"><span> ldd &quot;$stage/usr/lib/gsgpu/dri/gsgpu_dri.so&quot; |</span></span>
<span class="line"><span>grep -E &#39;gsgpu|gpucomp|ldrm|not found&#39;</span></span>
<span class="line"><span>=== DRI ===</span></span>
<span class="line"><span>aff7101ab877db0026fa0f8274e03a579f1b4fd2c16fabe2478d08f224d0da0a  /usr/lib64/dri/gsgpu_dri.so</span></span>
<span class="line"><span>aff7101ab877db0026fa0f8274e03a579f1b4fd2c16fabe2478d08f224d0da0a  /opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/gsgpu_dri.so</span></span>
<span class="line"><span>=== GLAPI ===</span></span>
<span class="line"><span>b04f00255f9d04a482342ef0c1394546f1fb8851fbbc8ba315143a78f7894ae7  /usr/lib/loongarch64-linux-gnu/gsgpu/libgsgpu_glapi.so.0</span></span>
<span class="line"><span>b04f00255f9d04a482342ef0c1394546f1fb8851fbbc8ba315143a78f7894ae7  /opt/loonggpu-lnd25.1/usr/lib/gsgpu/libgsgpu_glapi.so.0</span></span>
<span class="line"><span>=== GPUCOMP ===</span></span>
<span class="line"><span>f8651e3eae63ba76fe7684d3f4fdeb73cecfacc8e0baf3ca5fbb8561c6b82d99  /usr/lib/loongarch64-linux-gnu/libloong-gpucomp.so.1</span></span>
<span class="line"><span>f8651e3eae63ba76fe7684d3f4fdeb73cecfacc8e0baf3ca5fbb8561c6b82d99  /opt/loonggpu-lnd25.1/usr/lib/libloong-gpucomp.so.1</span></span>
<span class="line"><span>=== LDRM ===</span></span>
<span class="line"><span>55dfc197cf88575542121f13a7932a18a4a2eb6e51a918deae86efe1049995f6  /lib64/libldrm.so.1</span></span>
<span class="line"><span>55dfc197cf88575542121f13a7932a18a4a2eb6e51a918deae86efe1049995f6  /opt/loonggpu-lnd25.1/usr/lib/libldrm.so.1</span></span>
<span class="line"><span>=== RUNPATH НОВОГО DRI ===</span></span>
<span class="line"><span>0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libgsgpu_glapi.so.0]</span></span>
<span class="line"><span>0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libexpat.so.1]</span></span>
<span class="line"><span>0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libdrm.so.2]</span></span>
<span class="line"><span>0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libldrm.so.1]</span></span>
<span class="line"><span>0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libloong-gpucomp.so.1]</span></span>
<span class="line"><span>0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libz.so.1]</span></span>
<span class="line"><span>0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libsensors.so.5]</span></span>
<span class="line"><span>0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libelf.so.1]</span></span>
<span class="line"><span>0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libstdc++.so.6]</span></span>
<span class="line"><span>0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libm.so.6]</span></span>
<span class="line"><span>0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libgcc_s.so.1]</span></span>
<span class="line"><span>0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [libc.so.6]</span></span>
<span class="line"><span>0x0000000000000001 (NEEDED)             Совм. исп. библиотека: [ld-linux-loongarch-lp64d.so.1]</span></span>
<span class="line"><span>0x000000000000001d (RUNPATH)            Библиотека runpath: [/usr/lib/loongarch64-linux-gnu/gsgpu]</span></span>
<span class="line"><span>=== ЗАВИСИМОСТИ НОВОГО DRI С ЕГО СТЕКОМ ===</span></span>
<span class="line"><span>/opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/gsgpu_dri.so: /lib64/libtinfo.so.6: no version information available (required by /opt/loonggpu-lnd25.1/usr/lib/libloong-gpucomp.so.1)</span></span>
<span class="line"><span>/opt/loonggpu-lnd25.1/usr/lib/gsgpu/dri/gsgpu_dri.so: /lib64/libtinfo.so.6: no version information available (required by /lib64/libedit.so.2)</span></span>
<span class="line"><span>       libgsgpu_glapi.so.0 =&gt; /opt/loonggpu-lnd25.1/usr/lib/gsgpu/libgsgpu_glapi.so.0 (0x00007fff9c160000)</span></span>
<span class="line"><span>       libldrm.so.1 =&gt; /opt/loonggpu-lnd25.1/usr/lib/libldrm.so.1 (0x00007fff9c0c0000)</span></span>
<span class="line"><span>       libloong-gpucomp.so.1 =&gt; /opt/loonggpu-lnd25.1/usr/lib/libloong-gpucomp.so.1 (0x00007fff99c00000)</span></span>
<span class="line"><span>[root@basealt loonggpu-lnd25.1-debs]#  </span></span>
<span class="line"><span>[root@basealt loonggpu-lnd25.1-debs]# grep -n -B 30 -A 40 \\</span></span>
<span class="line"><span> &#39;Caught signal 6&#39; \\</span></span>
<span class="line"><span> /var/log/Xorg.1.log |</span></span>
<span class="line"><span>tail -n 120</span></span>
<span class="line"><span></span></span>
<span class="line"><span>journalctl -b -k \\</span></span>
<span class="line"><span> --since &quot;$(cat /root/loonggpu-gdm-test-start)&quot; \\</span></span>
<span class="line"><span> --no-pager |</span></span>
<span class="line"><span>grep -Ei \\</span></span>
<span class="line"><span> &#39;loonggpu|gsgpu|timeout|fault|hang|reset|ring|drm&#39;</span></span>
<span class="line"><span>авг 28 11:21:25 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to gnome-shell for invalid read access from 00005555ed000100</span></span>
<span class="line"><span>авг 28 11:21:25 basealt.kompas.test kernel: era = 00007fff10f68894 in libEGL_gsgpu.so.0.0.0[18894,7fff10f50000+48000]</span></span>
<span class="line"><span>авг 28 11:21:25 basealt.kompas.test kernel: ra  = 00007fff10f71ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fff10f50000+48000]</span></span>
<span class="line"><span>авг 28 11:21:26 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to gnome-session-c for invalid read access from 00005555c9000100</span></span>
<span class="line"><span>авг 28 11:21:26 basealt.kompas.test kernel: era = 00007fff9ce28894 in libEGL_gsgpu.so.0.0.0[18894,7fff9ce10000+48000]</span></span>
<span class="line"><span>авг 28 11:21:26 basealt.kompas.test kernel: ra  = 00007fff9ce31ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fff9ce10000+48000]</span></span>
<span class="line"><span>авг 28 11:21:26 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to mutter-x11-fram for invalid read access from 00005555b8000100</span></span>
<span class="line"><span>авг 28 11:21:26 basealt.kompas.test kernel: era = 00007fff50c08894 in libEGL_gsgpu.so.0.0.0[18894,7fff50bf0000+48000]</span></span>
<span class="line"><span>авг 28 11:21:26 basealt.kompas.test kernel: ra  = 00007fff50c11ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fff50bf0000+48000]</span></span>
<span class="line"><span>авг 28 11:21:27 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 00005555f3000100</span></span>
<span class="line"><span>авг 28 11:21:27 basealt.kompas.test kernel: era = 00007ffef6c58894 in libEGL_gsgpu.so.0.0.0[18894,7ffef6c40000+48000]</span></span>
<span class="line"><span>авг 28 11:21:27 basealt.kompas.test kernel: ra  = 00007ffef6c61ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7ffef6c40000+48000]</span></span>
<span class="line"><span>авг 28 11:21:27 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 0000555661000100</span></span>
<span class="line"><span>авг 28 11:21:27 basealt.kompas.test kernel: era = 00007fffe46b8894 in libEGL_gsgpu.so.0.0.0[18894,7fffe46a0000+48000]</span></span>
<span class="line"><span>авг 28 11:21:27 basealt.kompas.test kernel: ra  = 00007fffe46c1ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fffe46a0000+48000]</span></span>
<span class="line"><span>авг 28 11:21:27 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 000055559f000100</span></span>
<span class="line"><span>авг 28 11:21:27 basealt.kompas.test kernel: era = 00007fff61038894 in libEGL_gsgpu.so.0.0.0[18894,7fff61020000+48000]</span></span>
<span class="line"><span>авг 28 11:21:27 basealt.kompas.test kernel: ra  = 00007fff61041ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fff61020000+48000]</span></span>
<span class="line"><span>авг 28 11:21:27 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 000055565f000100</span></span>
<span class="line"><span>авг 28 11:21:27 basealt.kompas.test kernel: era = 00007ffef4748894 in libEGL_gsgpu.so.0.0.0[18894,7ffef4730000+48000]</span></span>
<span class="line"><span>авг 28 11:21:27 basealt.kompas.test kernel: ra  = 00007ffef4751ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7ffef4730000+48000]</span></span>
<span class="line"><span>авг 28 11:21:28 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 0000555602000100</span></span>
<span class="line"><span>авг 28 11:21:28 basealt.kompas.test kernel: era = 00007fff3e6d8894 in libEGL_gsgpu.so.0.0.0[18894,7fff3e6c0000+48000]</span></span>
<span class="line"><span>авг 28 11:21:28 basealt.kompas.test kernel: ra  = 00007fff3e6e1ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fff3e6c0000+48000]</span></span>
<span class="line"><span>авг 28 11:21:28 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 00005555eb000100</span></span>
<span class="line"><span>авг 28 11:21:28 basealt.kompas.test kernel: era = 00007fffab1b8894 in libEGL_gsgpu.so.0.0.0[18894,7fffab1a0000+48000]</span></span>
<span class="line"><span>авг 28 11:21:28 basealt.kompas.test kernel: ra  = 00007fffab1c1ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fffab1a0000+48000]</span></span>
<span class="line"><span>авг 28 11:21:28 basealt.kompas.test kernel: do_page_fault(): sending SIGSEGV to xdg-desktop-por for invalid read access from 00005555fe000100</span></span>
<span class="line"><span>авг 28 11:21:28 basealt.kompas.test kernel: era = 00007fff13108894 in libEGL_gsgpu.so.0.0.0[18894,7fff130f0000+48000]</span></span>
<span class="line"><span>авг 28 11:21:28 basealt.kompas.test kernel: ra  = 00007fff13111ff4 in libEGL_gsgpu.so.0.0.0[21ff4,7fff130f0000+48000]</span></span>
<span class="line"><span>[root@basealt loonggpu-lnd25.1-debs]#</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Результат однозначный:</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@basealt loonggpu-lnd25.1-debs]# journalctl -b -k --since &#39;-5 min&#39; --no-pager |</span></span>
<span class="line"><span>grep -Ei \\</span></span>
<span class="line"><span> &#39;loonggpu|gsgpu|fault|hang|timeout|reset|ring|segfault&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>grep -Ei \\</span></span>
<span class="line"><span> &#39;gsgpu|loonggpu|DRI3|renderer|llvmpipe|failed|error|segmentation&#39; \\</span></span>
<span class="line"><span> /home/basealt/kompas-gsgpu.log |</span></span>
<span class="line"><span>tail -n 100</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f0081c000</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f00830000</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f008106c0</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f00858000</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f0086c000</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f00880000</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f00895000</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f008a9000</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f008bd000</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU fault detected: 146  vmid 2 pasid 32771 for process kKompas pid 20013 thread kKom:gsgpu_cs0 pid 20016</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_ADDR   0x4111000f008d1000</span></span>
<span class="line"><span>авг 28 11:54:20 basealt.kompas.test kernel: loonggpu 0000:00:06.0:   VM_CONTEXT1_PROTECTION_FAULT_STATUS 0x4111</span></span>
<span class="line"><span>авг 28 11:54:30 basealt.kompas.test kernel: [drm:loonggpu_job_timedout [loonggpu]] *ERROR* ring gfx timeout, signaled seq=391831, emitted seq=391834</span></span>
<span class="line"><span>авг 28 11:54:30 basealt.kompas.test kernel: loonggpu 0000:00:06.0: GPU reset begin!</span></span>
<span class="line"><span>libGL: OpenDriver: trying /usr/lib64/dri/tls/gsgpu_dri.so</span></span>
<span class="line"><span>libGL: OpenDriver: trying /usr/lib64/dri/gsgpu_dri.so</span></span>
<span class="line"><span>/usr/share/libldrm/loonggpu.ids version: 1.0.0</span></span>
<span class="line"><span>libGL: Using DRI3 for screen 0</span></span>
<span class="line"><span>LLVM failed to compile shader</span></span>
<span class="line"><span>gsgpu: can&#39;t compile a main shader part</span></span>
<span class="line"><span>LLVM failed to compile shader</span></span>
<span class="line"><span>gsgpu: can&#39;t compile a main shader part</span></span>
<span class="line"><span>LLVM failed to compile shader</span></span>
<span class="line"><span>gsgpu: can&#39;t compile a main shader part</span></span>
<span class="line"><span>LLVM failed to compile shader</span></span>
<span class="line"><span>gsgpu: can&#39;t compile a main shader part</span></span>
<span class="line"><span>LLVM failed to compile shader</span></span>
<span class="line"><span>Failed to build shader variant (type=1) 1</span></span>
<span class="line"><span>LLVM failed to compile shader</span></span>
<span class="line"><span>Failed to build shader variant (type=1) 1</span></span>
<span class="line"><span>[root@basealt loonggpu-lnd25.1-debs]#</span></span>
<span class="line"><span></span></span>
<span class="line"><span>КОМПАС в режиме gsgpu использовать нельзя: драйвер действительно завис на сложных шейдерах и выполнил GPU reset.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Последовательность подтверждена журналом:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>КОМПАС загрузил gsgpu_dri.so и libGLX_gsgpu.so.</span></span>
<span class="line"><span>Шейдер потребовал 103 адресуемых скалярных регистра при пределе драйвера 102.</span></span>
<span class="line"><span>Компиляция шейдера завершилась ошибкой.</span></span>
<span class="line"><span>Появились многочисленные VM_CONTEXT1_PROTECTION_FAULT.</span></span>
<span class="line"><span>Через ровно 10 секунд возник ring gfx timeout.</span></span>
<span class="line"><span>Драйвер начал GPU reset.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Код 124 здесь не означает успешное завершение: после timeout процесс kKompas с PID 20013 остался работать.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Остановите оставшийся процесс</span></span>
<span class="line"><span></span></span>
<span class="line"><span>От root:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pid=20013</span></span>
<span class="line"><span>exe=&quot;$(readlink -f &quot;/proc/$pid/exe&quot; 2&gt;/dev/null || true)&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;PID=$pid&quot;</span></span>
<span class="line"><span>echo &quot;EXE=$exe&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>case &quot;$exe&quot; in</span></span>
<span class="line"><span>  */kKompas)</span></span>
<span class="line"><span>    kill -TERM &quot;$pid&quot;</span></span>
<span class="line"><span>    sleep 3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if kill -0 &quot;$pid&quot; 2&gt;/dev/null; then</span></span>
<span class="line"><span>      kill -KILL &quot;$pid&quot;</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>    ;;</span></span>
<span class="line"><span>  *)</span></span>
<span class="line"><span>    echo &quot;PID уже завершён или принадлежит другому процессу — не трогаем&quot;</span></span>
<span class="line"><span>    ;;</span></span>
<span class="line"><span>esac</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Проверьте:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pgrep -a -u basealt -f &#39;KOMPAS.sh|[/]kKompas&#39;</span></span>
<span class="line"><span>2. Проверьте результат сброса GPU</span></span>
<span class="line"><span>journalctl -b -k \\</span></span>
<span class="line"><span>  --since &#39;2026-08-28 11:54:15&#39; \\</span></span>
<span class="line"><span>  --no-pager |</span></span>
<span class="line"><span>grep -Ei \\</span></span>
<span class="line"><span>  &#39;loonggpu|gsgpu|fault|timeout|reset|ring&#39; |</span></span>
<span class="line"><span>tail -n 150</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Если графический интерфейс сейчас искажён, зависает либо журнал заканчивается только на GPU reset begin, сохраните работу и перезагрузите компьютер. Выгружать loonggpu вручную при работающем Xorg не следует.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. Запустите КОМПАС через llvmpipe</span></span>
<span class="line"><span></span></span>
<span class="line"><span>После восстановления системы запускайте из терминала basealt:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>env \\</span></span>
<span class="line"><span>  DISPLAY=:1 \\</span></span>
<span class="line"><span>  LIBGL_ALWAYS_SOFTWARE=1 \\</span></span>
<span class="line"><span>  MESA_LOADER_DRIVER_OVERRIDE=llvmpipe \\</span></span>
<span class="line"><span>  __GLX_VENDOR_LIBRARY_NAME=mesa \\</span></span>
<span class="line"><span>  __EGL_VENDOR_LIBRARY_FILENAMES=/usr/share/glvnd/egl_vendor.d/50_mesa.json \\</span></span>
<span class="line"><span>  QT_QPA_PLATFORM=xcb \\</span></span>
<span class="line"><span>  QT_XCB_GL_INTEGRATION=xcb_glx \\</span></span>
<span class="line"><span>  ./KOMPAS.sh \\</span></span>
<span class="line"><span>  2&gt;&amp;1 |</span></span>
<span class="line"><span>tee /home/basealt/kompas-llvmpipe.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span>В КОМПАСе установите:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Настройка → Параметры →</span></span>
<span class="line"><span>Система → Общие → Управление системой</span></span>
<span class="line"><span>«Качество сглаживания» → «Без сглаживания»;</span></span>
<span class="line"><span>«Вариант отрисовки» → «Базовый».</span></span>
<span class="line"><span></span></span>
<span class="line"><span>После этого полностью перезапустите КОМПАС. Именно такую настройку при проблемах OpenGL рекомендует официальная документация АСКОН. Инструкция КОМПАС-3D v25</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Драйвер gsgpu предоставляет только OpenGL 2.1. Это соответствует минимальному требованию КОМПАС — OpenGL 2.0, но рекомендуемая конфигурация требует OpenGL 4.5 и не менее 4 ГБ видеопамяти. У LG100 обнаружено 256 МиБ — в 16 раз меньше 4 ГиБ. АСКОН также отдельно указывает, что стабильная работа на встроенной графике не гарантируется. Аппаратные требования КОМПАС-3D v25</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Сначала пришлите журнал завершения GPU reset: до его проверки повторять аппаратный запуск КОМПАС не стоит.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Сброс GPU не завершился. Драйвер завис внутри процедуры восстановления:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>loonggpu_device_gpu_recover</span></span>
<span class="line"><span>└─ loonggpu_device_ip_suspend_phase1</span></span>
<span class="line"><span>   └─ dc_suspend</span></span>
<span class="line"><span></span></span>
<span class="line"><span>С GPU reset begin прошло минимум 11 минут 24 секунды, а каждые 123 секунды ядро фиксирует зависшие задачи. Ожидать восстановления дальше бессмысленно.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Строку:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo 0 &gt; /proc/sys/kernel/hung_task_timeout_secs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>не выполняйте — она только скроет предупреждения, но не исправит GPU.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Перезагрузите компьютер</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Сначала закройте доступные приложения и от root:</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Результат проверки:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>все XML синтаксически корректны;</span></span>
<span class="line"><span>контрольные суммы успешно рассчитаны — файлы читаются;</span></span>
<span class="line"><span>сообщения file: Permission denied не отражают общие права доступа, поскольку sha256sum и Python те же файлы прочитали;</span></span>
<span class="line"><span>пустой вывод grep означает только отсутствие указанных слов в открытом виде;</span></span>
<span class="line"><span>корректность XML-синтаксиса не исключает логическую ошибку данных или дефект программы.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Теперь нужен тест без содержимого docTemplates. Выполняйте его в графическом терминале пользователя basealt, не от root:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(</span></span>
<span class="line"><span>  templates=/home/basealt/KOMPAS_LOONG64/KOMPAS/Clang-Release-x64-Linux/Resources/docTemplates</span></span>
<span class="line"><span>  saved=&quot;\${templates}.saved-test&quot;</span></span>
<span class="line"><span>  empty_result=&quot;\${templates}.empty-test-result&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if [ -e &quot;$saved&quot; ] || [ -e &quot;$empty_result&quot; ]; then</span></span>
<span class="line"><span>    echo &quot;Найдены остатки предыдущего теста:&quot;</span></span>
<span class="line"><span>    ls -ld &quot;$saved&quot; &quot;$empty_result&quot; 2&gt;/dev/null</span></span>
<span class="line"><span>    exit 1</span></span>
<span class="line"><span>  fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  restore_templates()</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    [ -d &quot;$templates&quot; ] &amp;&amp; mv &quot;$templates&quot; &quot;$empty_result&quot;</span></span>
<span class="line"><span>    [ -d &quot;$saved&quot; ] &amp;&amp; mv &quot;$saved&quot; &quot;$templates&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  trap restore_templates EXIT</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  mv &quot;$templates&quot; &quot;$saved&quot;</span></span>
<span class="line"><span>  install -d -m 0755 &quot;$templates&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  kompas_ld=&quot;$PWD/Clang-Release-x64-Linux:$PWD/usr/lib/llvm-18/lib:$PWD/lib/loongarch64-linux-gnu&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  timeout 30s env \\</span></span>
<span class="line"><span>    LD_LIBRARY_PATH=&quot;$kompas_ld&quot; \\</span></span>
<span class="line"><span>    LIBGL_ALWAYS_SOFTWARE=true \\</span></span>
<span class="line"><span>    GALLIUM_DRIVER=softpipe \\</span></span>
<span class="line"><span>    __GLX_VENDOR_LIBRARY_NAME=mesa \\</span></span>
<span class="line"><span>    __EGL_VENDOR_LIBRARY_FILENAMES=/usr/share/glvnd/egl_vendor.d/50_mesa.json \\</span></span>
<span class="line"><span>    LIBGL_DRIVERS_PATH=/usr/lib64/X11/modules/dri:/usr/lib64/dri \\</span></span>
<span class="line"><span>    MESA_GL_VERSION_OVERRIDE=2.1 \\</span></span>
<span class="line"><span>    QT_QPA_PLATFORM=xcb \\</span></span>
<span class="line"><span>    QT_XCB_GL_INTEGRATION=xcb_glx \\</span></span>
<span class="line"><span>    ./Clang-Release-x64-Linux/kKompas \\</span></span>
<span class="line"><span>    &gt; /home/basealt/kompas-empty-templates.log 2&gt;&amp;1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  rc=$?</span></span>
<span class="line"><span>  echo &quot;Код теста: $rc&quot;</span></span>
<span class="line"><span>  tail -n 120 /home/basealt/kompas-empty-templates.log</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Результат трактуется так:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>124 — КОМПАС работал все 30 секунд; неисправность связана с одним из файлов docTemplates.</span></span>
<span class="line"><span>134 и std::bad_alloc — ошибка находится в коде обработки системных путей/шаблонов, а не в XML.</span></span>
<span class="line"><span>другой код — понадобится его значение и последние строки журнала.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Оригинальный docTemplates автоматически вернётся на место.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Выложил файл</span></span>
<span class="line"><span>не упал после входа в настройки</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Результат подтверждён: docTemplates необходим для воспроизведения падения. При пустом каталоге настройки открываются и процесс работает до тайм-аута (124).</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Также подтверждено, что отсутствующие UI_AppPaths.config и UI_Shortcuts.config сами по себе не вызывают bad_alloc: предупреждения остались, но программа не упала.</span></span>
<span class="line"><span>Точный триггер найден: spw.xml самостоятельно вызывает std::bad_alloc при открытии параметров. Сам XML синтаксически корректен, поэтому это ошибка обработки его содержимого LoongArch-сборкой КОМПАС.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Сделаем обратимый рабочий вариант — перенесём только spw.xml за пределы docTemplates:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>templates=/home/basealt/KOMPAS_LOONG64/KOMPAS/Clang-Release-x64-Linux/Resources/docTemplates</span></span>
<span class="line"><span>disabled=/home/basealt/KOMPAS_LOONG64/KOMPAS/disabled-docTemplates</span></span>
<span class="line"><span></span></span>
<span class="line"><span>install -d -m 0755 &quot;$disabled&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ -e &quot;$disabled/spw.xml&quot; ]; then</span></span>
<span class="line"><span>  echo &quot;Резервный spw.xml уже существует:&quot;</span></span>
<span class="line"><span>  ls -l &quot;$disabled/spw.xml&quot;</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>  mv &quot;$templates/spw.xml&quot; &quot;$disabled/spw.xml&quot;</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== АКТИВНЫЕ ШАБЛОНЫ ===&#39;</span></span>
<span class="line"><span>ls -l &quot;$templates&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== ОТКЛЮЧЁННЫЙ ШАБЛОН ===&#39;</span></span>
<span class="line"><span>ls -l &quot;$disabled/spw.xml&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Теперь финальная проверка со всеми файлами, кроме spw.xml. Выполните от basealt, откройте параметры и подождите:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>kompas_ld=&quot;$PWD/Clang-Release-x64-Linux:$PWD/usr/lib/llvm-18/lib:$PWD/lib/loongarch64-linux-gnu&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>timeout 60s env \\</span></span>
<span class="line"><span>  LD_LIBRARY_PATH=&quot;$kompas_ld&quot; \\</span></span>
<span class="line"><span>  LIBGL_ALWAYS_SOFTWARE=true \\</span></span>
<span class="line"><span>  GALLIUM_DRIVER=softpipe \\</span></span>
<span class="line"><span>  __GLX_VENDOR_LIBRARY_NAME=mesa \\</span></span>
<span class="line"><span>  __EGL_VENDOR_LIBRARY_FILENAMES=/usr/share/glvnd/egl_vendor.d/50_mesa.json \\</span></span>
<span class="line"><span>  LIBGL_DRIVERS_PATH=/usr/lib64/X11/modules/dri:/usr/lib64/dri \\</span></span>
<span class="line"><span>  MESA_GL_VERSION_OVERRIDE=2.1 \\</span></span>
<span class="line"><span>  QT_QPA_PLATFORM=xcb \\</span></span>
<span class="line"><span>  QT_XCB_GL_INTEGRATION=xcb_glx \\</span></span>
<span class="line"><span>  ./Clang-Release-x64-Linux/kKompas \\</span></span>
<span class="line"><span>  &gt; /home/basealt/kompas-without-spw.log 2&gt;&amp;1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rc=$?</span></span>
<span class="line"><span>echo &quot;Код финального теста: $rc&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>grep -Ei \\</span></span>
<span class="line"><span>  &#39;bad_alloc|Аварий|Aborted|Ошибка сегментирования|failed|Не удалось&#39; \\</span></span>
<span class="line"><span>  /home/basealt/kompas-without-spw.log |</span></span>
<span class="line"><span>tail -n 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Если результат 124, обходное решение подтверждено. Недоступен будет только тип шаблона, описанный spw.xml; остальные восемь XML останутся активны.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Чтобы исследовать, какое поле spw.xml вызывает ошибку, покажите его содержимое:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>nl -ba \\</span></span>
<span class="line"><span>  /home/basealt/KOMPAS_LOONG64/KOMPAS/disabled-docTemplates/spw.xml |</span></span>
<span class="line"><span>sed -n &#39;1,260p&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Вернуть файл можно командой:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mv \\</span></span>
<span class="line"><span>  /home/basealt/KOMPAS_LOONG64/KOMPAS/disabled-docTemplates/spw.xml \\</span></span>
<span class="line"><span>  /home/basealt/KOMPAS_LOONG64/KOMPAS/Clang-Release-x64-Linux/Resources/docTemplates/spw.xml</span></span>
<span class="line"><span>работает. давай поправим параметры и запустим с другой графикой</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Теперь переключаемся с однопоточного softpipe на многопоточный программный llvmpipe. Аппаратный gsgpu для КОМПАС пока не используем из-за уже подтверждённого зависания GPU.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Сохраняем безопасные параметры КОМПАС</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Запустите от basealt через softpipe:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>kompas_ld=&quot;$PWD/Clang-Release-x64-Linux:$PWD/usr/lib/llvm-18/lib:$PWD/lib/loongarch64-linux-gnu&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>env \\</span></span>
<span class="line"><span>  LD_LIBRARY_PATH=&quot;$kompas_ld&quot; \\</span></span>
<span class="line"><span>  LIBGL_ALWAYS_SOFTWARE=true \\</span></span>
<span class="line"><span>  GALLIUM_DRIVER=softpipe \\</span></span>
<span class="line"><span>  __GLX_VENDOR_LIBRARY_NAME=mesa \\</span></span>
<span class="line"><span>  __EGL_VENDOR_LIBRARY_FILENAMES=/usr/share/glvnd/egl_vendor.d/50_mesa.json \\</span></span>
<span class="line"><span>  LIBGL_DRIVERS_PATH=/usr/lib64/X11/modules/dri:/usr/lib64/dri \\</span></span>
<span class="line"><span>  MESA_GL_VERSION_OVERRIDE=2.1 \\</span></span>
<span class="line"><span>  QT_QPA_PLATFORM=xcb \\</span></span>
<span class="line"><span>  QT_XCB_GL_INTEGRATION=xcb_glx \\</span></span>
<span class="line"><span>  ./Clang-Release-x64-Linux/kKompas</span></span>
<span class="line"><span></span></span>
<span class="line"><span>В КОМПАС откройте:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Настройка</span></span>
<span class="line"><span>→ Параметры</span></span>
<span class="line"><span>→ Система</span></span>
<span class="line"><span>→ Общие</span></span>
<span class="line"><span>→ Управление системой</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Установите:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Качество сглаживания: Без сглаживания</span></span>
<span class="line"><span>Вариант отрисовки: Базовый</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Нажмите «ОК» и полностью закройте КОМПАС. Согласно документации АСКОН, эти параметры применяются только после перезапуска. Инструкция КОМПАС-3D v25</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. Проверяем llvmpipe</span></span>
<span class="line"><span>cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>kompas_ld=&quot;$PWD/Clang-Release-x64-Linux:$PWD/usr/lib/llvm-18/lib:$PWD/lib/loongarch64-linux-gnu&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>env \\</span></span>
<span class="line"><span>  LD_LIBRARY_PATH=&quot;$kompas_ld&quot; \\</span></span>
<span class="line"><span>  LIBGL_ALWAYS_SOFTWARE=true \\</span></span>
<span class="line"><span>  GALLIUM_DRIVER=llvmpipe \\</span></span>
<span class="line"><span>  __GLX_VENDOR_LIBRARY_NAME=mesa \\</span></span>
<span class="line"><span>  LIBGL_DRIVERS_PATH=/usr/lib64/X11/modules/dri:/usr/lib64/dri \\</span></span>
<span class="line"><span>  glxinfo -B |</span></span>
<span class="line"><span>grep -E \\</span></span>
<span class="line"><span>  &#39;direct rendering|Vendor:|Device:|Accelerated:|OpenGL vendor|OpenGL renderer|OpenGL version&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Ожидаемый признак:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>OpenGL renderer string: llvmpipe</span></span>
<span class="line"><span>Accelerated: no</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Здесь Accelerated: no означает отсутствие аппаратного GPU, но llvmpipe использует несколько потоков CPU и обычно быстрее softpipe.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. Запускаем КОМПАС через llvmpipe</span></span>
<span class="line"><span>cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>kompas_ld=&quot;$PWD/Clang-Release-x64-Linux:$PWD/usr/lib/llvm-18/lib:$PWD/lib/loongarch64-linux-gnu&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>timeout 90s env \\</span></span>
<span class="line"><span>  LD_LIBRARY_PATH=&quot;$kompas_ld&quot; \\</span></span>
<span class="line"><span>  LIBGL_ALWAYS_SOFTWARE=true \\</span></span>
<span class="line"><span>  GALLIUM_DRIVER=llvmpipe \\</span></span>
<span class="line"><span>  __GLX_VENDOR_LIBRARY_NAME=mesa \\</span></span>
<span class="line"><span>  __EGL_VENDOR_LIBRARY_FILENAMES=/usr/share/glvnd/egl_vendor.d/50_mesa.json \\</span></span>
<span class="line"><span>  LIBGL_DRIVERS_PATH=/usr/lib64/X11/modules/dri:/usr/lib64/dri \\</span></span>
<span class="line"><span>  QT_QPA_PLATFORM=xcb \\</span></span>
<span class="line"><span>  QT_XCB_GL_INTEGRATION=xcb_glx \\</span></span>
<span class="line"><span>  ./Clang-Release-x64-Linux/kKompas \\</span></span>
<span class="line"><span>  2&gt;&amp;1 |</span></span>
<span class="line"><span>tee /home/basealt/kompas-llvmpipe.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rc=\${PIPESTATUS[0]}</span></span>
<span class="line"><span>echo &quot;Код kKompas: $rc&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Во время теста откройте параметры и любой документ:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>124 — КОМПАС проработал все 90 секунд;</span></span>
<span class="line"><span>0 — закрыт нормально;</span></span>
<span class="line"><span>134 — снова возникло необработанное исключение.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>spw.xml пока должен оставаться в disabled-docTemplates. Если llvmpipe пройдёт тест, следующим шагом закрепим этот режим в отдельном постоянном скрипте запуска.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>124 давай попробуем с другой графикой</span></span>
<span class="line"><span></span></span>
<span class="line"><span>llvmpipe стабилен. Следующий безопасный вариант — zink: OpenGL преобразуется в Vulkan, а Vulkan выполняется программным lavapipe. Это другой графический путь, но он не задействует проблемный LG100.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Сначала найдём совместимые компоненты:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd /home/basealt/KOMPAS_LOONG64/KOMPAS || exit 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== ZINK В КОМПЛЕКТЕ КОМПАС ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>find \\</span></span>
<span class="line"><span>  &quot;$PWD/lib/loongarch64-linux-gnu&quot; \\</span></span>
<span class="line"><span>  &quot;$PWD/Clang-Release-x64-Linux&quot; \\</span></span>
<span class="line"><span>  \\( -type f -o -type l \\) \\</span></span>
<span class="line"><span>  -name &#39;zink_dri.so&#39; \\</span></span>
<span class="line"><span>  -print 2&gt;/dev/null</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== СИСТЕМНЫЙ ZINK ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>find \\</span></span>
<span class="line"><span>  /usr/lib64 \\</span></span>
<span class="line"><span>  /usr/lib \\</span></span>
<span class="line"><span>  \\( -type f -o -type l \\) \\</span></span>
<span class="line"><span>  -name &#39;zink_dri.so&#39; \\</span></span>
<span class="line"><span>  -print 2&gt;/dev/null</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== VULKAN LAVAPIPE ICD ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>find \\</span></span>
<span class="line"><span>  /usr/share/vulkan/icd.d \\</span></span>
<span class="line"><span>  /etc/vulkan/icd.d \\</span></span>
<span class="line"><span>  -type f \\</span></span>
<span class="line"><span>  \\( -iname &#39;*lvp*.json&#39; -o -iname &#39;*lavapipe*.json&#39; \\) \\</span></span>
<span class="line"><span>  -print 2&gt;/dev/null</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &#39;=== ВСЕ VULKAN ICD ===&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>find \\</span></span>
<span class="line"><span>  /usr/share/vulkan/icd.d \\</span></span>
<span class="line"><span>  /etc/vulkan/icd.d \\</span></span>
<span class="line"><span>  -type f \\</span></span>
<span class="line"><span>  -name &#39;*.json&#39; \\</span></span>
<span class="line"><span>  -print \\</span></span>
<span class="line"><span>  -exec sed -n &#39;1,80p&#39; {} \\; \\</span></span>
<span class="line"><span>  2&gt;/dev/null</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Mesa документирует MESA_LOADER_DRIVER_OVERRIDE=zink как штатный способ выбора Zink; lavapipe является программным Vulkan-растеризатором на базе LLVMpipe. Переменные Mesa, структура драйверов Mesa</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Пришлите вывод. Важно подобрать zink_dri.so той же версии Mesa, которую загружает КОМПАС. Смешивать его встроенную Mesa 25.0.3 с системным модулем Mesa 25.3.6 без проверки нельзя.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Аппаратный gsgpu следующим не запускаем: ранее КОМПАС уже вызвал через него VM fault, ring gfx timeout и зависший GPU reset.</span></span></code></pre></div></details>`,35)]))}const m=n(e,[["render",i]]);export{u as __pageData,m as default};
