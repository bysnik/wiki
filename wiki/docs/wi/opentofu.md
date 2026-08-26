# OpenTofu

<ImageZoom src="https://www.linuxfoundation.org/hubfs/OpenTofu.png" />

OpenTofu — это инструмент инфраструктуры как код (IaC) с открытым исходным кодом, открытое ответвление (форк) HashiCorp Terraform под лицензией MPL-2.0. Проект был инициирован компаниями, включая Gruntwork, Spacelift, Harness, Env0 и Scalr, в ответ на переход Terraform с открытой лицензии на коммерческую лицензию на исходный код (BSL/BUSL). OpenTofu теперь находится под управлением Фонда Linux, его официальный выпуск и готовность к производственному использованию были объявлены в январе 2024 года.

```bash
# Download the installer script:
curl --proto '=https' --tlsv1.2 -fsSL https://get.opentofu.org/install-opentofu.sh -o install-opentofu.sh
# Alternatively: wget --secure-protocol=TLSv1_2 --https-only https://get.opentofu.org/install-opentofu.sh -O install-opentofu.sh

# Grant execution permissions:
chmod +x install-opentofu.sh

# Please inspect the downloaded script at this point.

# Run the installer:
./install-opentofu.sh --install-method standalone

# Remove the installer:
rm -f install-opentofu.sh
```

::: tip
Автономный установщик проверяет целостность загруженных файлов. Вам необходимо установить cosign, GnuPG или отключить проверку целостности, используя соответствующую --skip-verify опцию.
:::

кхм кхм https://packages.altlinux.org/ru/p11/srpms/opentofu/

https://habr.com/ru/sandbox/251700/

::: danger
Вот жешь, OpenTofu использует провайдеров terraform, а они заблокированы в РФ(

Смотри инфу на странице [Terraform](terraform)
:::