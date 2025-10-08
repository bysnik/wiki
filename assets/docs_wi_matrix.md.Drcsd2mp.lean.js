import{_ as t,c as s,o as n,j as e}from"./chunks/framework.D4Vqf8I7.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/matrix.md","filePath":"docs/wi/matrix.md","lastUpdated":1759935110000}'),o={name:"docs/wi/matrix.md"};function a(p,r,l,i,_,d){return n(),s("div",null,r[0]||(r[0]=[e("p",null,[e("a",{href:"https://www.dmosk.ru/scripts.php?object=compose-matrix-synapse",target:"_blank",rel:"noreferrer"},"https://www.dmosk.ru/scripts.php?object=compose-matrix-synapse")],-1),e("p",null,"Нужно поправить версию постгри на, например, 16",-1),e("p",null,"А также element.conf",-1),e("p",null,"server { listen 80 default_server; listen 443 ssl default_server; listen 8448 ssl default_server; server_name matrix.bystrovnickita.ru;",-1),e("pre",null,[e("code",null,`location ~ /.well-known {
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
`)],-1),e("p",null,"}",-1)]))}const x=t(o,[["render",a]]);export{m as __pageData,x as default};
