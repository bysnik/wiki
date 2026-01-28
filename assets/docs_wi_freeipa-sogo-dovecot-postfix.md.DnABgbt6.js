import{_ as a,c as n,o as p,ag as e}from"./chunks/framework.D4Vqf8I7.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/freeipa-sogo-dovecot-postfix.md","filePath":"docs/wi/freeipa-sogo-dovecot-postfix.md","lastUpdated":1769602738000}'),t={name:"docs/wi/freeipa-sogo-dovecot-postfix.md"};function i(l,s,c,o,d,r){return p(),n("div",null,s[0]||(s[0]=[e(`<p>Example of:</p><ul><li><p>configuring single UID mail storage</p></li><li><p>configuring authentication Dovecot (IMAP) against FreeIPA</p></li><li><p>configuring authentication Postfix (SMTP) against FreeIPA</p></li><li><p>configuring LMTP</p></li><li><p>setup</p><ul><li><p>dc</p><ul><li>ip 10.88.9.93</li><li>dns name dc.ipa.test</li><li>installed packages freeipa-server-dns 4.12.5-alt3</li></ul></li><li><p>mail server</p><ul><li>ip 10.88.10.229</li><li>dns name mail.ipa.test</li><li>installed packages freeipa-client 4.12.5-alt3 dovecot 2.3.21.1-alt1 postfix 3.8.6-alt1</li></ul></li></ul></li><li><p>configure IPA DC (dc.ipa.test) e.g.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ipa-server-install -U -p Secret123 -a Secret123 --setup-dns -r IPA.TEST --auto-forwarders</span></span></code></pre></div></li><li><p>configure IPA client (mail.ipa.test) e.g.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ipa-client-install -U -p admin -w Secret123</span></span></code></pre></div></li><li><p>install packages (mail.ipa.test)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-get install -y dovecot postfix postfix-dovecot openldap-clients</span></span></code></pre></div></li><li><p>add test domain user to send mail (mail.ipa.test)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kinit admin</span></span>
<span class="line"><span>ipa user-add user1 --password --first user1 --last user1</span></span></code></pre></div></li><li><p>create IPA imap and smtp services (mail.ipa.test)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kinit admin</span></span>
<span class="line"><span>ipa service-add imap/mail.ipa.test</span></span>
<span class="line"><span>ipa service-add smtp/mail.ipa.test</span></span></code></pre></div></li><li><p>create services keytab (mail.ipa.test)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kinit admin</span></span>
<span class="line"><span>ipa-getkeytab -s dc.ipa.test -p imap/mail.ipa.test -k /etc/dovecot/krb5.keytab</span></span>
<span class="line"><span>ipa-getkeytab -s dc.ipa.test -p smtp/mail.ipa.test -k /etc/dovecot/krb5.keytab</span></span></code></pre></div></li><li><p>fix permissions for keytab (mail.ipa.test)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>chown root:dovecot /etc/dovecot/krb5.keytab</span></span>
<span class="line"><span>chmod 640 /etc/dovecot/krb5.keytab</span></span></code></pre></div></li><li><p>create system user for mail (mail.ipa.test)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>useradd -r -d /var/vmail/ -s /sbin/nologin vmail</span></span>
<span class="line"><span>mkdir /var/vmail</span></span>
<span class="line"><span>chmod 700 /var/vmail</span></span>
<span class="line"><span>chown vmail:vmail /var/vmail</span></span></code></pre></div></li><li><p>create ldap system user for ldap queries (mail.ipa.test)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ldapmodify -x -D &#39;cn=Directory Manager&#39; -W</span></span>
<span class="line"><span>dn: uid=_dovecot,cn=sysaccounts,cn=etc,dc=ipa,dc=test</span></span>
<span class="line"><span>changetype: add</span></span>
<span class="line"><span>objectclass: account</span></span>
<span class="line"><span>objectclass: simplesecurityobject</span></span>
<span class="line"><span>uid: _dovecot</span></span>
<span class="line"><span>userPassword: Secret123</span></span>
<span class="line"><span>passwordExpirationTime: 20380119031407Z</span></span>
<span class="line"><span>nsIdleTimeout: 0</span></span>
<span class="line"><span>&lt;blank line&gt;</span></span>
<span class="line"><span>^D</span></span></code></pre></div></li><li><p>configure dovecot (mail.ipa.test)</p><ul><li><p>docs <a href="https://doc.dovecot.org/2.4.2/core/config/auth/mechanisms/gssapi.html" target="_blank" rel="noreferrer">https://doc.dovecot.org/2.4.2/core/config/auth/mechanisms/gssapi.html</a><a href="https://doc.dovecot.org/2.3/configuration_manual/authentication/kerberos/" target="_blank" rel="noreferrer">https://doc.dovecot.org/2.3/configuration_manual/authentication/kerberos/</a></p></li><li><p>configs</p><ul><li>/etc/dovecot/dovecot.conf replace</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>protocols = imap lmtp</span></span></code></pre></div><ul><li>/etc/dovecot/conf.d/10-auth.conf replace</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>auth_mechanisms = gssapi</span></span>
<span class="line"><span>auth_gssapi_hostname = mail.ipa.test</span></span>
<span class="line"><span>auth_krb5_keytab = /etc/dovecot/krb5.keytab</span></span>
<span class="line"><span>auth_default_realm = ipa.test</span></span>
<span class="line"><span>disable_plaintext_auth = yes</span></span></code></pre></div><p>add before any of &#39;!include auth-xxx&#39; (e.g. &#39;Password and user databases&#39; section)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>passdb {</span></span>
<span class="line"><span>  driver = static</span></span>
<span class="line"><span>  args = allow_all_users=yes nopassword=y</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>userdb {</span></span>
<span class="line"><span>  driver = ldap</span></span>
<span class="line"><span>  args = /etc/dovecot/dovecot-ldap.conf.ext</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>comment out any of &quot;!include auth-xxx&#39;</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!include auth-system.conf.ext</span></span></code></pre></div><ul><li>/etc/dovecot/dovecot-ldap.conf.ext new</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>hosts = dc.ipa.test</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dn = uid=_dovecot,cn=sysaccounts,cn=etc,dc=ipa,dc=test</span></span>
<span class="line"><span>dnpass = Secret123</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ldap_version = 3</span></span>
<span class="line"><span>base = cn=users,cn=accounts,dc=ipa,dc=test</span></span>
<span class="line"><span>tls = yes</span></span>
<span class="line"><span>tls_ca_cert_file = /etc/ipa/ca.crt</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Validate user exists and has mail</span></span>
<span class="line"><span>user_filter = (&amp;(objectClass=posixAccount)(mail=*@ipa.test)(uid=%n))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>user_attrs = \\</span></span>
<span class="line"><span>  =uid=vmail, \\</span></span>
<span class="line"><span>  =gid=vmail, \\</span></span>
<span class="line"><span>  =home=/var/vmail/%d/%n</span></span>
<span class="line"><span></span></span>
<span class="line"><span>scope = subtree</span></span></code></pre></div><ul><li>fix permission for created config</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>chmod 640 /etc/dovecot/dovecot-ldap.conf.ext</span></span>
<span class="line"><span>chown root:dovecot /etc/dovecot/dovecot-ldap.conf.ext</span></span></code></pre></div><ul><li>/etc/dovecot/conf.d/10-mail.conf replace</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mail_location = mbox:/var/vmail/%d/%n:INBOX=/var/vmail/%d/%n/Inbox</span></span></code></pre></div></li></ul></li><li><p>start dovecot (mail.ipa.test)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>systemctl enable --now dovecot</span></span>
<span class="line"><span>systemctl restart dovecot</span></span></code></pre></div></li><li><p>test <a href="https://doc.dovecot.org/2.3/configuration_manual/authentication/kerberos/#test-that-the-server-can-access-the-keytab" target="_blank" rel="noreferrer">https://doc.dovecot.org/2.3/configuration_manual/authentication/kerberos/#test-that-the-server-can-access-the-keytab</a> (mail.ipa.test)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>openssl s_client -connect localhost:993</span></span>
<span class="line"><span></span></span>
<span class="line"><span>* OK [CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE LITERAL+ LOGINDISABLED AUTH=GSSAPI] Dovecot ready.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># input</span></span>
<span class="line"><span>a capability</span></span>
<span class="line"><span></span></span>
<span class="line"><span># should contain AUTH=GSSAPI</span></span>
<span class="line"><span>* CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE LITERAL+ LOGINDISABLED AUTH=GSSAPI</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># input</span></span>
<span class="line"><span>a authenticate GSSAPI</span></span>
<span class="line"><span></span></span>
<span class="line"><span># should be &#39;+&#39;</span></span>
<span class="line"><span>+</span></span></code></pre></div></li><li><p>configure postfix (mail.ipa.test)</p><ul><li><p>docs <a href="https://doc.dovecot.org/2.3/configuration_manual/howto/postfix_and_dovecot_sasl/" target="_blank" rel="noreferrer">https://doc.dovecot.org/2.3/configuration_manual/howto/postfix_and_dovecot_sasl/</a><a href="https://doc.dovecot.org/main/core/config/delivery/lmtp.html" target="_blank" rel="noreferrer">https://doc.dovecot.org/main/core/config/delivery/lmtp.html</a></p></li><li><p>configs edit</p><ul><li>/etc/dovecot/conf.d/10-master.conf</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>service lmtp {</span></span>
<span class="line"><span>  # unix_listener lmtp {</span></span>
<span class="line"><span>  #   #mode = 0666</span></span>
<span class="line"><span>  # }</span></span>
<span class="line"><span>  unix_listener /var/spool/postfix/private/dovecot-lmtp {</span></span>
<span class="line"><span>    mode = 0600</span></span>
<span class="line"><span>    user = postfix</span></span>
<span class="line"><span>    group = postfix</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  user = vmail</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>service auth {</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>  unix_listener /var/spool/postfix/private/auth {</span></span>
<span class="line"><span>    mode = 0600</span></span>
<span class="line"><span>    user = postfix</span></span>
<span class="line"><span>    group = postfix</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>/etc/postfix/main.cf add</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>smtpd_sasl_type = dovecot</span></span>
<span class="line"><span>smtpd_sasl_path = private/auth</span></span>
<span class="line"><span>smtpd_sasl_auth_enable = yes</span></span>
<span class="line"><span>smtpd_sasl_local_domain = ipa.test</span></span>
<span class="line"><span>smtpd_recipient_restrictions = permit_mynetworks, reject_unauth_destination, permit_sasl_authenticated, reject</span></span>
<span class="line"><span>line_length_limit = 3072</span></span>
<span class="line"><span>virtual_mailbox_domains = ipa.test</span></span>
<span class="line"><span>virtual_transport = lmtp:unix:private/dovecot-lmtp</span></span></code></pre></div></li><li><p>disable localhostness</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>control postfix server</span></span></code></pre></div></li><li><p>add MX record (mail.ipa.test)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kinit admin</span></span>
<span class="line"><span>ipa dnsrecord-add ipa.test @ --mx-preference=0 --mx-exchanger=mail.ipa.test.</span></span></code></pre></div></li><li><p>note: configure smtps for security</p></li></ul></li><li><p>restart dovecot and postfix (mail.ipa.test)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>systemctl enable --now postfix</span></span>
<span class="line"><span>systemctl restart dovecot postfix</span></span></code></pre></div></li><li><p>test with mutt</p><ul><li>install mutt (mail.ipa.test)</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-get install -y mutt-Maxi</span></span></code></pre></div><ul><li><p>docs <a href="https://mutt.sourceforge.net/imap/" target="_blank" rel="noreferrer">https://mutt.sourceforge.net/imap/</a><a href="http://mutt.org/doc/manual/#smtp" target="_blank" rel="noreferrer">http://mutt.org/doc/manual/#smtp</a></p></li><li><p>configure mutt to receive mails for test user (mail.ipa.test)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>su - user1</span></span></code></pre></div><p>~/.muttrc</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>set imap_authenticators=&quot;gssapi&quot;</span></span>
<span class="line"><span>set spoolfile=imaps://mail.ipa.test/INBOX</span></span>
<span class="line"><span>set folder=imaps://mail.ipa.test/</span></span>
<span class="line"><span>set imap_user=user1</span></span></code></pre></div></li><li><p>configure mutt to send mails (mail.ipa.test) ~/.muttrc</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>set smtp_authenticators=&quot;gssapi&quot;</span></span>
<span class="line"><span>set smtp_url=&quot;smtp://$imap_user@mail.ipa.test&quot;</span></span>
<span class="line"><span># ssl is not configured for this example</span></span>
<span class="line"><span>set ssl_starttls=no</span></span>
<span class="line"><span>set ssl_force_tls=no</span></span></code></pre></div></li><li><p>obtain IPA user TGT (mail.ipa.test) without TGT SASL auth doesn&#39;t work as expected</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>su - user1</span></span>
<span class="line"><span>kdestroy -A</span></span>
<span class="line"><span>kinit user1</span></span></code></pre></div><ul><li>run mutt (receive and send)</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mutt</span></span></code></pre></div></li><li><p>debugging auth errors</p><ul><li>/etc/dovecot/conf.d/10-logging.conf</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>auth_debug = yes</span></span>
<span class="line"><span>auth_debug_passwords = yes</span></span>
<span class="line"><span>mail_debug = yes</span></span></code></pre></div></li></ul>`,2)]))}const g=a(t,[["render",i]]);export{h as __pageData,g as default};
