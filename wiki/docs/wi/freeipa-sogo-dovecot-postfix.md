Example of:
- configuring single UID mail storage
- configuring authentication Dovecot (IMAP) against FreeIPA
- configuring authentication Postfix (SMTP) against FreeIPA
- configuring LMTP

- setup
  - dc
    - ip
      10.88.9.93
    - dns name
      dc.ipa.test
    - installed packages
      freeipa-server-dns 4.12.5-alt3

  - mail server
    - ip
      10.88.10.229
    - dns name
      mail.ipa.test
    - installed packages
      freeipa-client 4.12.5-alt3
      dovecot 2.3.21.1-alt1
      postfix 3.8.6-alt1

- configure IPA DC (dc.ipa.test)
  e.g.
  ```
  ipa-server-install -U -p Secret123 -a Secret123 --setup-dns -r IPA.TEST --auto-forwarders
  ```

- configure IPA client (mail.ipa.test)
  e.g.
  ```
  ipa-client-install -U -p admin -w Secret123
  ```

- install packages (mail.ipa.test)
  ```
  apt-get install -y dovecot postfix postfix-dovecot openldap-clients
  ```

- add test domain user to send mail (mail.ipa.test)
  ```
  kinit admin
  ipa user-add user1 --password --first user1 --last user1
  ```

- create IPA imap and smtp services (mail.ipa.test)
  ```
  kinit admin
  ipa service-add imap/mail.ipa.test
  ipa service-add smtp/mail.ipa.test
  ```

- create services keytab (mail.ipa.test)
  ```
  kinit admin
  ipa-getkeytab -s dc.ipa.test -p imap/mail.ipa.test -k /etc/dovecot/krb5.keytab
  ipa-getkeytab -s dc.ipa.test -p smtp/mail.ipa.test -k /etc/dovecot/krb5.keytab
  ```

- fix permissions for keytab (mail.ipa.test)
  ```
  chown root:dovecot /etc/dovecot/krb5.keytab
  chmod 640 /etc/dovecot/krb5.keytab
  ```

- create system user for mail (mail.ipa.test)
  ```
  useradd -r -d /var/vmail/ -s /sbin/nologin vmail
  mkdir /var/vmail
  chmod 700 /var/vmail
  chown vmail:vmail /var/vmail
  ```

- create ldap system user for ldap queries (mail.ipa.test)
  ```
  ldapmodify -x -D 'cn=Directory Manager' -W
  dn: uid=_dovecot,cn=sysaccounts,cn=etc,dc=ipa,dc=test
  changetype: add
  objectclass: account
  objectclass: simplesecurityobject
  uid: _dovecot
  userPassword: Secret123
  passwordExpirationTime: 20380119031407Z
  nsIdleTimeout: 0
  <blank line>
  ^D
  ```

- configure dovecot (mail.ipa.test)
  - docs
    https://doc.dovecot.org/2.4.2/core/config/auth/mechanisms/gssapi.html
    https://doc.dovecot.org/2.3/configuration_manual/authentication/kerberos/
  - configs
    - /etc/dovecot/dovecot.conf
    replace
    ```
    protocols = imap lmtp
    ```

    - /etc/dovecot/conf.d/10-auth.conf
    replace
    ```
    auth_mechanisms = gssapi
    auth_gssapi_hostname = mail.ipa.test
    auth_krb5_keytab = /etc/dovecot/krb5.keytab
    auth_default_realm = ipa.test
    disable_plaintext_auth = yes
    ```

    add before any of '!include auth-xxx' (e.g. 'Password and user databases'
    section)
    ```
    passdb {
      driver = static
      args = allow_all_users=yes nopassword=y
    }
    
    userdb {
      driver = ldap
      args = /etc/dovecot/dovecot-ldap.conf.ext
    }
    ```

    comment out any of "!include auth-xxx'
    ```
    #!include auth-system.conf.ext
    ```

    - /etc/dovecot/dovecot-ldap.conf.ext
    new
    ```
    hosts = dc.ipa.test

    dn = uid=_dovecot,cn=sysaccounts,cn=etc,dc=ipa,dc=test
    dnpass = Secret123

    ldap_version = 3
    base = cn=users,cn=accounts,dc=ipa,dc=test
    tls = yes
    tls_ca_cert_file = /etc/ipa/ca.crt

    # Validate user exists and has mail
    user_filter = (&(objectClass=posixAccount)(mail=*@ipa.test)(uid=%n))

    user_attrs = \
      =uid=vmail, \
      =gid=vmail, \
      =home=/var/vmail/%d/%n

    scope = subtree
    ```

    - fix permission for created config
    ```
    chmod 640 /etc/dovecot/dovecot-ldap.conf.ext
    chown root:dovecot /etc/dovecot/dovecot-ldap.conf.ext
    ```

    - /etc/dovecot/conf.d/10-mail.conf
    replace
    ```
    mail_location = mbox:/var/vmail/%d/%n:INBOX=/var/vmail/%d/%n/Inbox
    ```

- start dovecot (mail.ipa.test)
  ```
  systemctl enable --now dovecot
  systemctl restart dovecot
  ```

- test https://doc.dovecot.org/2.3/configuration_manual/authentication/kerberos/#test-that-the-server-can-access-the-keytab
  (mail.ipa.test)
  ```
  openssl s_client -connect localhost:993

  * OK [CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE LITERAL+ LOGINDISABLED AUTH=GSSAPI] Dovecot ready.

  # input
  a capability

  # should contain AUTH=GSSAPI
  * CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE LITERAL+ LOGINDISABLED AUTH=GSSAPI


  # input
  a authenticate GSSAPI

  # should be '+'
  +
  ```

- configure postfix (mail.ipa.test)
  - docs
    https://doc.dovecot.org/2.3/configuration_manual/howto/postfix_and_dovecot_sasl/
    https://doc.dovecot.org/main/core/config/delivery/lmtp.html
  - configs
    edit
    - /etc/dovecot/conf.d/10-master.conf
    ```

    ...

    service lmtp {
      # unix_listener lmtp {
      #   #mode = 0666
      # }
      unix_listener /var/spool/postfix/private/dovecot-lmtp {
        mode = 0600
        user = postfix
        group = postfix
      }
      user = vmail
      ...
    }

    ...

    service auth {
    ...
      unix_listener /var/spool/postfix/private/auth {
        mode = 0600
        user = postfix
        group = postfix
      }
      ...
    }
    ```

    - /etc/postfix/main.cf
    add
    ```
    smtpd_sasl_type = dovecot
    smtpd_sasl_path = private/auth
    smtpd_sasl_auth_enable = yes
    smtpd_sasl_local_domain = ipa.test
    smtpd_recipient_restrictions = permit_mynetworks, reject_unauth_destination, permit_sasl_authenticated, reject
    line_length_limit = 3072
    virtual_mailbox_domains = ipa.test
    virtual_transport = lmtp:unix:private/dovecot-lmtp
    ```
  
  - disable localhostness
    ```
    control postfix server
    ```

  - add MX record (mail.ipa.test)
    ```
    kinit admin
    ipa dnsrecord-add ipa.test @ --mx-preference=0 --mx-exchanger=mail.ipa.test.
    ```

  - note: configure smtps for security

- restart dovecot and postfix (mail.ipa.test)
  ```
  systemctl enable --now postfix
  systemctl restart dovecot postfix
  ```

- test with mutt
  - install mutt (mail.ipa.test)
  ```
  apt-get install -y mutt-Maxi
  ```

  - docs
    https://mutt.sourceforge.net/imap/
    http://mutt.org/doc/manual/#smtp

  - configure mutt to receive mails for test user (mail.ipa.test)
    ```
    su - user1
    ```

    ~/.muttrc
    ```
    set imap_authenticators="gssapi"
    set spoolfile=imaps://mail.ipa.test/INBOX
    set folder=imaps://mail.ipa.test/
    set imap_user=user1
    ```

  - configure mutt to send mails (mail.ipa.test)
    ~/.muttrc
    ```
    set smtp_authenticators="gssapi"
    set smtp_url="smtp://$imap_user@mail.ipa.test"
    # ssl is not configured for this example
    set ssl_starttls=no
    set ssl_force_tls=no
    ```

  - obtain IPA user TGT (mail.ipa.test)
  without TGT SASL auth doesn't work as expected
  ```
  su - user1
  kdestroy -A
  kinit user1
  ```

  - run mutt (receive and send)
  ```
  mutt
  ```

- debugging auth errors
  - /etc/dovecot/conf.d/10-logging.conf
  ```
  auth_debug = yes
  auth_debug_passwords = yes
  mail_debug = yes
  ```
