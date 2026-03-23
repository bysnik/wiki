# TubeSync

![](https://mariushosting.com/wp-content/uploads/2022/01/TubeSync-Synology-NAS-Set-up-6-new.png)

https://github.com/meeb/tubesync

## Конфиг пользовательского приложения для TrueNAS SCALE

```yaml
configs:
  permissions_actions_data:
    content: >-
      [{"read_only": false, "mount_path": "/mnt/permission/tubesync_downloads", "is_temporary": false, "identifier": "tubesync_downloads", "recursive": true, "mode": "check", "uid": 1000, "gid": 1000, "chmod": null}]

networks:
  ix-internal-tubesync-net:
    enable_ipv6: False
    external: False
    labels:
      tn.network.internal: 'true'

services:
  tubesync:
    cap_add:
      - CHOWN
      - SETGID
      - SETUID
      - NET_BIND_SERVICE
    cap_drop:
      - ALL
    depends_on:
      permissions:
        condition: service_completed_successfully
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2048M
    environment:
      GID: '1000'
      GROUP_ID: '1000'
      NVIDIA_VISIBLE_DEVICES: void
      PGID: '1000'
      PUID: '1000'
      TZ: Europe/London
      UID: '1000'
      UMASK: '002'
      UMASK_SET: '002'
      USER_ID: '1000'
    group_add:
      - 1000
    healthcheck:
      test:
        - CMD
        - curl
        - -f
        - http://127.0.0.1:4848/
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 60s
    image: ghcr.io/meeb/tubesync:latest
    networks:
      ix-internal-tubesync-net: {}
    platform: linux/amd64
    ports:
      - mode: ingress
        protocol: tcp
        published: 4848
        target: 4848
    privileged: False
    restart: unless-stopped
    security_opt:
      - no-new-privileges=true
    stdin_open: False
    stop_grace_period: 1800s
    tty: False
    volumes:
      - bind:
          create_host_path: False
          propagation: rprivate
        read_only: False
        source: /mnt/first/4r3ewfer/tubesync/config
        target: /config
        type: bind
      - bind:
          create_host_path: False
          propagation: rprivate
        read_only: False
        source: /mnt/first/4r3ewfer/tubesync/downloads
        target: /downloads
        type: bind

  permissions:
    cap_add:
      - CHOWN
      - DAC_OVERRIDE
      - FOWNER
    cap_drop:
      - ALL
    configs:
      - mode: 320
        source: permissions_actions_data
        target: /script/actions.json
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
    entrypoint:
      - python3
      - /script/permissions.py
    environment:
      GID: '1000'
      GROUP_ID: '1000'
      NVIDIA_VISIBLE_DEVICES: void
      PGID: '1000'
      PUID: '1000'
      TZ: Europe/London
      UID: '1000'
      UMASK: '002'
      UMASK_SET: '002'
      USER_ID: '1000'
    group_add:
      - 1000
    healthcheck:
      disable: True
    image: ixsystems/container-utils:1.0.2
    network_mode: none
    platform: linux/amd64
    privileged: False
    restart: on-failure:1
    security_opt:
      - no-new-privileges=true
    stdin_open: False
    tty: False
    user: '0:0'
    volumes:
      - bind:
          create_host_path: False
          propagation: rprivate
        read_only: False
        source: /mnt/first/4r3ewfer/tubesync/downloads
        target: /mnt/permission/tubesync_downloads
        type: bind
      - bind:
          create_host_path: False
          propagation: rprivate
        read_only: False
        source: /mnt/first/4r3ewfer/tubesync/config
        target: /mnt/permission/tubesync_config
        type: bind

volumes: {}

x-notes: >
  # Tubesync

  ## Security

  **Read the following security precautions to ensure that you wish to continue using this application.**

  ---

  ### Container: [tubesync]

  #### Joined networks
  - ix-internal-tubesync-net

  #### Running user/group(s)
  - User: root
  - Group: root
  - Supplementary Groups: apps

  ---

  ### Container: [permissions]

  **This container is short-lived.**

  #### Running user/group(s)
  - User: root
  - Group: root
  - Supplementary Groups: apps

  ---

  For information on how to use Tubesync, please visit the [official documentation](https://github.com/meeb/tubesync/wiki).

  ## Bug Reports and Feature Requests

  If you find a bug in this app or have an idea for a new feature, please file an issue at https://github.com/truenas/apps

x-portals:
  - host: 0.0.0.0
    name: Web UI
    path: /
    port: 4848
    scheme: http
```

Вместо `/mnt/first/4r3ewfer/tubesync/downloads` и `/mnt/first/4r3ewfer/tubesync/config` используйте собственные пулы.