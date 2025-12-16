# Bugzilla

https://github.com/bugzilla/bugzilla

косяк в докер компосе ямл:
```yaml
services:
    bugzilla:
        build: .
        ports:
            - "8080:80"
        volumes:
            - ".:/home/bugzilla/devel/htdocs/docker"

```

Теперь косяк в недоступности репозиториев центос