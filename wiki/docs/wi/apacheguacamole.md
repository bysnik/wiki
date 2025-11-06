# Apache Guacamole

https://www.altlinux.org/Guacamole

Guacamole — бесплатная и свободная программа с открытым исходным кодом, которая после установки на сервер и поднятия RDP-сервера предоставляет вам дистанционный доступ ко всем своим клиентским машинам через веб-интерфейс. То есть на ваш собственный компьютер, с которого вы удалённо администрируете клиентскими машинами, не нужно устанавливать никаких плагинов и стороннего программного обеспечения, всё работает по HTML5.

## Установка

### Установка Guacamole

Необходимо установить пакеты:

- [guacd](https://packages.altlinux.org/ru/sisyphus/guacd) — сервер guacamole;

В зависимости от того, какие протоколы необходимо поддерживать, следует установить один или несколько пакетов libguac-client-\* для обеспечения поддержки этих протоколов:

- [libguac-client-rdp](https://packages.altlinux.org/ru/sisyphus/libguac-client-rdp) — RDP;
- [libguac-client-ssh](https://packages.altlinux.org/ru/sisyphus/libguac-client-ssh) — SSH;
- [libguac-client-vnc](https://packages.altlinux.org/ru/sisyphus/libguac-client-vnc) — VNC;
- [libguac-client-telnet](https://packages.altlinux.org/ru/sisyphus/libguac-client-telnet) — telnet.

Установка пакетов:

```
# apt-get update
# apt-get install guacd libguac-client-rdp libguac-client-ssh libguac-client-vnc libguac-client-telnet tomcat tomcat-webapps tomcat-admin-webapps tomcat-guacamole-webapps
```

### Настройка Guacamole

Добавить в автозагрузку и запустить сервисы:

```
# systemctl enable --now tomcat.service guacd.service
```

После установки сервер будет доступен по адресу: **ip\_адрес:8080/guacamole**

Тонкая настройка Guacamole:

1. Создать зашифрованный пароль (вместо **password** следует указать свой пароль):
	```
	# echo -n password | openssl md5
	(stdin)= 5f4dcc3b5aa765d61d8327deb882cf99
	```
2. Отредактировать файл /etc/guacamole/user-mapping.xml. Указать в нём пользователя и его зашифрованный пароль, а также настройки подключений. Например:
	```
	<user-mapping>
	<!-- Per-user authentication and config information --> 
	<!-- A user using md5 to hash the password
	example below uses the md5 hash of "PASSWORD")--> 
	    <authorize 
	            username="admin"
	            password="5f4dcc3b5aa765d61d8327deb882cf99"
	            encoding="md5">
	        <!-- RDP connection -->
	                <connection name="RDP SL">
	            <protocol>rdp</protocol>
	            <param name="hostname">192.168.0.128</param>
	            <param name="port">3389</param>
	            <param name="username">user</param>
	            <param name="ignore-cert">true</param>
	        </connection>
	        <!-- SSH connection -->
	        <connection name="ssh SL">
	            <protocol>ssh</protocol>
	            <param name="hostname">192.168.0.190</param>
	            <param name="port">22</param>
	           </connection>
	        <!-- VNC authorized connection -->
	        <connection name="VNC WORK">
	            <protocol>vnc</protocol>
	            <param name="hostname">192.168.0.120</param>
	            <param name="port">5900</param>
	            <param name="username">user</param>
	            <param name="password">123</param>
	        </connection>
	   </authorize>
	</user-mapping>
	```
3. После внесения изменений в файл /etc/guacamole/user-mapping.xml, перезапустить сервис:
	```
	# systemctl restart guacd.service
	```

**Примечание:** Т.к. tomcat, также как и [веб-интерфейс ЦУС](https://www.altlinux.org/%D0%A6%D0%A3%D0%A1#%D0%92%D0%B5%D0%B1-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D1%84%D0%B5%D0%B9%D1%81 "ЦУС"), по умолчанию работает на порту 8080, то перед запуском tomcat необходимо, либо остановить службу ahttpd:

```
# systemctl disable --now ahttpd
```

либо изменить порт 8080 в файле /etc/tomcat/server.xml на другой допустимый номер порта, например 8081:

```
<Connector port="8081" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
```

и перезапустить tomcat:

```
# systemctl restart tomcat
```

  

## Подключение

Веб-интерфейс доступен по адресу: **ip\_адрес:8080/guacamole**:

[![Авторизация в веб-интерфейсе Guacamole](https://www.altlinux.org/Images.www.altlinux.org/1/19/Guacamole-01.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Guacamole-01.png "Авторизация в веб-интерфейсе Guacamole")

Доступные подключения:

[![Веб-интерфейс Guacamole](https://www.altlinux.org/Images.www.altlinux.org/4/46/Guacamole-02.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Guacamole-02.png "Веб-интерфейс Guacamole")

Пример подключения по ssh:

[![Пример подключения по ssh](https://www.altlinux.org/Images.www.altlinux.org/0/0b/Guacamole-03.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Guacamole-03.png "Пример подключения по ssh")

Пример подключения по RDP (на удалённой системе, к которой происходит подключение, должен быть настроен [XRDP-сервер](https://www.altlinux.org/Xrdp#%D0%9F%D0%B5%D1%80%D0%B2%D0%BE%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0_%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%B0_XRDP_%D0%BD%D0%B0_%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%B5 "Xrdp")):

[![Пример подключения по RDP](https://www.altlinux.org/Images.www.altlinux.org/8/8b/Guacamole-04.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Guacamole-04.png "Пример подключения по RDP")

Пример подключения по VNC (на удалённой системе, к которой происходит подключение, должен быть настроен [VNC-сервер](https://www.altlinux.org/VNC "VNC")):

[![Пример подключения по VNC](https://www.altlinux.org/Images.www.altlinux.org/d/d1/Guacamole-05.png)](https://www.altlinux.org/%D0%A4%D0%B0%D0%B9%D0%BB:Guacamole-05.png "Пример подключения по VNC")