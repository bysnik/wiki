https://www.dmosk.ru/scripts.php?object=compose-matrix-synapse

Нужно поправить версию постгри на, например, 16

А также 
element.conf

server {
    listen       80 default_server;
    listen       443 ssl default_server;
    listen       8448 ssl default_server;
    server_name  matrix.bystrovnickita.ru;

    location ~ /.well-known {
        root /usr/share/nginx/html;
        allow all;
    }

    ssl_certificate     /etc/letsencrypt/live/matrix.bystrovnickita.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/matrix.bystrovnickita.ru/privkey.pem;

    if ($scheme = 'http') {
        return 301 https://$host$request_uri;
    }

    location / {
        proxy_pass         http://element;
        proxy_redirect     off;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    }

    location ~ ^(/_matrix|/_synapse/) {
        proxy_pass http://synapse-app:8008;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $host;
        client_max_body_size 100M;
        proxy_http_version 1.1;
    }
}