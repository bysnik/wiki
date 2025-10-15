import{_ as n,c as a,o as p,ag as l}from"./chunks/framework.D4Vqf8I7.js";const b=JSON.parse('{"title":"perl-DBD-Oracle","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/oracle-dbd.md","filePath":"docs/wi/oracle-dbd.md","lastUpdated":1760531635000}'),i={name:"docs/wi/oracle-dbd.md"};function e(c,s,t,r,o,d){return p(),a("div",null,s[0]||(s[0]=[l(`<h1 id="perl-dbd-oracle" tabindex="-1">perl-DBD-Oracle <a class="header-anchor" href="#perl-dbd-oracle" aria-label="Permalink to &quot;perl-DBD-Oracle&quot;">​</a></h1><p>Тут мы кумекаем над данным пакетом</p><p><a href="https://github.com/perl5-dbi/DBD-Oracle" target="_blank" rel="noreferrer">https://github.com/perl5-dbi/DBD-Oracle</a></p><p><a href="https://github.com/perl5-dbi/DBD-Oracle/archive/refs/tags/v1.91_2.tar.gz" target="_blank" rel="noreferrer">https://github.com/perl5-dbi/DBD-Oracle/archive/refs/tags/v1.91_2.tar.gz</a></p><p><a href="https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html?spm=a2ty_o01.29997173.0.0.6f79c921eTugMg" target="_blank" rel="noreferrer">https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html?spm=a2ty_o01.29997173.0.0.6f79c921eTugMg</a></p><hr><ol><li>Подготовка окружения</li></ol><p>1.1 Убедись, что установлены базовые зависимости:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> perl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> perl-devel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> perl-DBI</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gcc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rpm-build</span></span></code></pre></div><p>1.1.1 Сделать сборочное дерево</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rpmdev-setuptree</span></span></code></pre></div><p>1.2 Установи Oracle Instant Client (минимум: Basic + SDK)</p><p>Скачай с <a href="https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html" target="_blank" rel="noreferrer">официального сайта Oracle</a>:</p><ul><li><code>oracle-instantclient-basic-*.rpm</code></li><li><code>oracle-instantclient-devel-*.rpm</code></li></ul><p>Установи их:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rpm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -ivh</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> oracle-instantclient-basic-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.rpm</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rpm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -ivh</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> oracle-instantclient-devel-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.rpm</span></span></code></pre></div><p>1.3 Настрой переменные окружения (временно для сборки):</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ORACLE_HOME</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/usr/lib/oracle/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">версия</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/client64</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LD_LIBRARY_PATH</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ORACLE_HOME/lib:$LD_LIBRARY_PATH</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PATH</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ORACLE_HOME/bin:$PATH</span></span></code></pre></div><p>Замени <code>&lt;версия&gt;</code> на актуальную (например, <code>21.13</code>).</p><p>Проверь, что <code>sqlplus</code> работает:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sqlplus</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /nolog</span></span></code></pre></div><ol start="2"><li>Получение исходников DBD::Oracle</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/perl5-dbi/DBD-Oracle/archive/refs/tags/v1.91_2.tar.gz</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -xzf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> v1.91_2.tar.gz</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> DBD-Oracle-1.91_2</span></span></code></pre></div><ol start="3"><li>Сборка Perl-модуля (локально, для проверки)</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">perl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Makefile.PL</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span></code></pre></div><p>Если сборка прошла успешно — можно переходить к созданию <code>.spec</code>-файла.</p><ol start="4"><li>Создание <code>.spec</code>-файла</li></ol><p>Создай файл <code>perl-DBD-Oracle.spec</code> в <code>~/RPM/SPECS/</code>:</p><div class="language-spec vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">spec</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Name: perl-DBD-Oracle</span></span>
<span class="line"><span>Version: 1.91</span></span>
<span class="line"><span>Release: alt2</span></span>
<span class="line"><span>Summary: Oracle database driver for the Perl DBI</span></span>
<span class="line"><span>License: Artistic 1.0 or GPL</span></span>
<span class="line"><span>Group: Development/Perl</span></span>
<span class="line"><span>Url: https://metacpan.org/release/DBD-Oracle</span></span>
<span class="line"><span>Source0: https://github.com/perl5-dbi/perl-DBD-Oracle/archive/refs/tags/v%{version}_%(echo %{release} | cut -d_ -f2).tar.gz</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BuildRequires: perl perl-devel perl-DBI gcc make</span></span>
<span class="line"><span>Requires: perl-DBI, oracle-instantclient-basic</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description</span></span>
<span class="line"><span>DBD::Oracle is a Perl module which works with the DBI module to provide</span></span>
<span class="line"><span>access to Oracle databases.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%prep</span></span>
<span class="line"><span>%setup -q -n DBD-Oracle-%{version}_%(echo %{release} | cut -d_ -f2).tar.gz</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%build</span></span>
<span class="line"><span>perl Makefile.PL INSTALLDIRS=vendor</span></span>
<span class="line"><span>make %{?_smp_mflags}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%install</span></span>
<span class="line"><span>make pure_install DESTDIR=%{buildroot}</span></span>
<span class="line"><span>find %{buildroot} -type f -name .packlist -exec rm -f {} \\;</span></span>
<span class="line"><span>find %{buildroot} -depth -type d -exec rmdir {} 2&gt;/dev/null \\;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files</span></span>
<span class="line"><span>%doc README* COPYRIGHT Changes</span></span>
<span class="line"><span>%{perl_vendorlib}/DBD/</span></span>
<span class="line"><span>%{perl_vendorarch}/auto/DBD/Oracle/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%changelog</span></span>
<span class="line"><span>* Tue Oct 14 2025 Nikita Bystrov &lt;bystrovno@basealt.ru&gt; 1.91-alt2</span></span>
<span class="line"><span>- Initial build for ALT Linux from v1.91_2</span></span></code></pre></div><ol start="5"><li>Сборка RPM</li></ol><p>Помести <code>.spec</code> в <code>~/RPM/SPECS/</code>, а архив — в <code>~/RPM/SOURCES/</code>.</p><p>Запусти сборку:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rpmbuild</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -ba</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/RPM/SPECS/perl-DBD-Oracle.spec</span></span></code></pre></div><h2 id="сумашедшая-попытка-собрать-шесть-пакетов-oracle-instantclient-за-раз" tabindex="-1">Сумашедшая попытка собрать шесть пакетов oracle-instantclient за раз <a class="header-anchor" href="#сумашедшая-попытка-собрать-шесть-пакетов-oracle-instantclient-за-раз" aria-label="Permalink to &quot;Сумашедшая попытка собрать шесть пакетов oracle-instantclient за раз&quot;">​</a></h2><p>Отлично! Теперь у нас есть полная картина структуры официальных RPM-пакетов Oracle Instant Client 23.26 для RHEL 9, включая:</p><ul><li><code>basic</code></li><li><code>sqlplus</code></li><li><code>devel</code> (SDK)</li><li><code>odbc</code></li><li><code>jdbc</code></li><li><code>tools</code> (exp, imp, expdp, impdp, sqlldr, wrc и др.)</li></ul><hr><h2 id="✅-цель" tabindex="-1">✅ Цель <a class="header-anchor" href="#✅-цель" aria-label="Permalink to &quot;✅ Цель&quot;">​</a></h2><p>Создать <strong>единый <code>.spec</code>-файл для АЛЬТ ЛИНУКС</strong>, который:</p><ul><li>собирает <strong>все подпакеты</strong> из zip-архивов,</li><li>корректно размещает файлы в соответствии с FHS и практиками АЛЬТ,</li><li>обеспечивает зависимости между подпакетами,</li><li><strong>не использует RHEL-специфичные пути</strong> (например, <code>/usr/lib/.build-id</code> — это отладочные символы, не нужны в обычной сборке),</li><li><strong>не включает <code>/bin/sh</code> в Requires</strong> (в АЛЬТ это избыточно),</li><li><strong>не использует <code>AutoProv: no</code> и прочие rpmrebuild-артефакты</strong>.</li></ul><hr><h2 id="📦-обновленныи-единыи-spec-с-поддержкои-tools" tabindex="-1">📦 Обновлённый единый <code>.spec</code> с поддержкой <code>tools</code> <a class="header-anchor" href="#📦-обновленныи-единыи-spec-с-поддержкои-tools" aria-label="Permalink to &quot;📦 Обновлённый единый \`.spec\` с поддержкой \`tools\`&quot;">​</a></h2><p>Вот финальная версия <code>oracle-instantclient.spec</code> для АЛЬТ ЛИНУКС:</p><div class="language-spec vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">spec</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>%define icver 23.26.0.0.0</span></span>
<span class="line"><span>%define icshortver 23</span></span>
<span class="line"><span>%define arch x86_64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Name:           oracle-instantclient</span></span>
<span class="line"><span>Version:        %{icver}</span></span>
<span class="line"><span>Release:        alt1</span></span>
<span class="line"><span>Summary:        Oracle Instant Client libraries and tools</span></span>
<span class="line"><span>License:        Oracle</span></span>
<span class="line"><span>Group:          System/Libraries</span></span>
<span class="line"><span>URL:            https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html</span></span>
<span class="line"><span>Vendor:         Oracle Corporation</span></span>
<span class="line"><span>Packager:       Nikita Bystrov &lt;nikita@example.com&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Sources — все zip-архивы</span></span>
<span class="line"><span>Source0:        instantclient-basic-linux.x64-%{icver}.zip</span></span>
<span class="line"><span>Source1:        instantclient-sqlplus-linux.x64-%{icver}.zip</span></span>
<span class="line"><span>Source2:        instantclient-sdk-linux.x64-%{icver}.zip</span></span>
<span class="line"><span>Source3:        instantclient-odbc-linux.x64-%{icver}.zip</span></span>
<span class="line"><span>Source4:        instantclient-jdbc-linux.x64-%{icver}.zip</span></span>
<span class="line"><span>Source5:        instantclient-tools-linux.x64-%{icver}.zip</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BuildArch:      x86_64</span></span>
<span class="line"><span>BuildRequires:  unzip</span></span>
<span class="line"><span>Requires:       /sbin/ldconfig</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description</span></span>
<span class="line"><span>Oracle Instant Client enables applications to connect to Oracle Database.</span></span>
<span class="line"><span>This metapackage does not contain files; see subpackages.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># === BASIC ===</span></span>
<span class="line"><span>%package basic</span></span>
<span class="line"><span>Summary: Oracle Instant Client basic libraries</span></span>
<span class="line"><span>Group: System/Libraries</span></span>
<span class="line"><span>Provides: oracle-instantclient-basic = %{version}-%{release}</span></span>
<span class="line"><span>Conflicts: oracle-instantclient-basiclite</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description basic</span></span>
<span class="line"><span>Core shared libraries required to run Oracle client applications.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># === SQLPLUS ===</span></span>
<span class="line"><span>%package sqlplus</span></span>
<span class="line"><span>Summary: Oracle Instant Client SQL*Plus tool</span></span>
<span class="line"><span>Group: Applications/Databases</span></span>
<span class="line"><span>Requires: oracle-instantclient-basic = %{version}-%{release}</span></span>
<span class="line"><span>Provides: sqlplus = %{icshortver}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description sqlplus</span></span>
<span class="line"><span>SQL*Plus command-line tool for Oracle Database.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># === SDK (DEVEL) ===</span></span>
<span class="line"><span>%package devel</span></span>
<span class="line"><span>Summary: Development headers for Oracle Instant Client</span></span>
<span class="line"><span>Group: Development/C</span></span>
<span class="line"><span>Requires: oracle-instantclient-basic = %{version}-%{release}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description devel</span></span>
<span class="line"><span>Header files and demo programs for developing Oracle client applications.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># === ODBC ===</span></span>
<span class="line"><span>%package odbc</span></span>
<span class="line"><span>Summary: ODBC driver for Oracle Instant Client</span></span>
<span class="line"><span>Group: System/Libraries</span></span>
<span class="line"><span>Requires: oracle-instantclient-basic = %{version}-%{release}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description odbc</span></span>
<span class="line"><span>ODBC driver for connecting to Oracle Database.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># === JDBC ===</span></span>
<span class="line"><span>%package jdbc</span></span>
<span class="line"><span>Summary: JDBC driver for Oracle Instant Client</span></span>
<span class="line"><span>Group: Development/Java</span></span>
<span class="line"><span>Requires: oracle-instantclient-basic = %{version}-%{release}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description jdbc</span></span>
<span class="line"><span>JDBC driver for Java applications.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># === TOOLS ===</span></span>
<span class="line"><span>%package tools</span></span>
<span class="line"><span>Summary: Oracle Instant Client data and replay tools</span></span>
<span class="line"><span>Group: Applications/Databases</span></span>
<span class="line"><span>Requires: oracle-instantclient-basic = %{version}-%{release}</span></span>
<span class="line"><span>Provides: sqlldr = %{icshortver}</span></span>
<span class="line"><span>Provides: exp = %{icshortver}</span></span>
<span class="line"><span>Provides: imp = %{icshortver}</span></span>
<span class="line"><span>Provides: expdp = %{icshortver}</span></span>
<span class="line"><span>Provides: impdp = %{icshortver}</span></span>
<span class="line"><span>Provides: wrc = %{icshortver}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%description tools</span></span>
<span class="line"><span>Tools: exp, imp, expdp, impdp, sqlldr, wrc — for data pump, loading, and replay.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># === PREP ===</span></span>
<span class="line"><span>%prep</span></span>
<span class="line"><span>install -d ic-all</span></span>
<span class="line"><span>for src in %{S:0} %{S:1} %{S:2} %{S:3} %{S:4} %{S:5}; do</span></span>
<span class="line"><span>    unzip -q -d ic-all &quot;$src&quot;</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%build</span></span>
<span class="line"><span># nothing to compile</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%install</span></span>
<span class="line"><span>rm -rf %{buildroot}</span></span>
<span class="line"><span>ic_root=%{buildroot}/usr/lib/oracle/%{icshortver}/client64</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Install all files</span></span>
<span class="line"><span>cp -r ic-all/* $ic_root/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Symlinks for libraries</span></span>
<span class="line"><span>mkdir -p %{buildroot}/usr/lib64</span></span>
<span class="line"><span>for lib in libclntsh.so* libnnz*.so libocci.so* libsqlplus.so* libsqlplusic.so* \\</span></span>
<span class="line"><span>           libsqora.so* libheteroxa*.so libnfsodm.so libopcodm.so; do</span></span>
<span class="line"><span>    if [ -f $ic_root/$lib ]; then</span></span>
<span class="line"><span>        ln -sf /usr/lib/oracle/%{icshortver}/client64/$lib %{buildroot}/usr/lib64/</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Binaries in /usr/bin</span></span>
<span class="line"><span>mkdir -p %{buildroot}/usr/bin</span></span>
<span class="line"><span>for bin in sqlplus exp imp expdp impdp sqlldr wrc adrci genezi; do</span></span>
<span class="line"><span>    if [ -f $ic_root/$bin ]; then</span></span>
<span class="line"><span>        ln -sf /usr/lib/oracle/%{icshortver}/client64/$bin %{buildroot}/usr/bin/$bin</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Headers</span></span>
<span class="line"><span>if [ -d $ic_root/sdk/include ]; then</span></span>
<span class="line"><span>    mkdir -p %{buildroot}/usr/include/oracle/%{icshortver}/client64</span></span>
<span class="line"><span>    cp -r $ic_root/sdk/include/* %{buildroot}/usr/include/oracle/%{icshortver}/client64/</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Docs</span></span>
<span class="line"><span>mkdir -p %{buildroot}/usr/share/doc/oracle-instantclient-%{icshortver}</span></span>
<span class="line"><span>cp -f $ic_root/*.txt $ic_root/*.md $ic_root/*.html \\</span></span>
<span class="line"><span>      $ic_root/doc/*.txt $ic_root/doc/*.md 2&gt;/dev/null || :</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files basic</span></span>
<span class="line"><span>%dir /usr/lib/oracle/</span></span>
<span class="line"><span>%dir /usr/lib/oracle/%{icshortver}/</span></span>
<span class="line"><span>%dir /usr/lib/oracle/%{icshortver}/client64/</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libclntsh.so*</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libnnz*.so</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libocci.so*</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libociicus.so</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libocijdbc*.so</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libipc1.so</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libmql1.so</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libtux.so</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/adrci</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/genezi</span></span>
<span class="line"><span>/usr/lib64/libclntsh.so*</span></span>
<span class="line"><span>/usr/lib64/libnnz*.so</span></span>
<span class="line"><span>/usr/lib64/libocci.so*</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files sqlplus</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/sqlplus</span></span>
<span class="line"><span>/usr/bin/sqlplus</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libsqlplus.so</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libsqlplusic.so</span></span>
<span class="line"><span>%config(noreplace) /usr/lib/oracle/%{icshortver}/client64/glogin.sql</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files devel</span></span>
<span class="line"><span>%dir /usr/include/oracle/</span></span>
<span class="line"><span>%dir /usr/include/oracle/%{icshortver}/</span></span>
<span class="line"><span>%dir /usr/include/oracle/%{icshortver}/client64/</span></span>
<span class="line"><span>/usr/include/oracle/%{icshortver}/client64/*.h</span></span>
<span class="line"><span>%doc /usr/lib/oracle/%{icshortver}/client64/sdk</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files odbc</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libsqora.so*</span></span>
<span class="line"><span>%config(noreplace) /usr/lib/oracle/%{icshortver}/client64/odbc.ini</span></span>
<span class="line"><span>%config(noreplace) /usr/lib/oracle/%{icshortver}/client64/odbcinst.ini</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files jdbc</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/ojdbc*.jar</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/xstreams.jar</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/orai18n*.jar</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libheteroxa*.so</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%files tools</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/exp</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/imp</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/expdp</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/impdp</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/sqlldr</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/wrc</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libnfsodm.so</span></span>
<span class="line"><span>/usr/lib/oracle/%{icshortver}/client64/libopcodm.so</span></span>
<span class="line"><span>/usr/bin/exp</span></span>
<span class="line"><span>/usr/bin/imp</span></span>
<span class="line"><span>/usr/bin/expdp</span></span>
<span class="line"><span>/usr/bin/impdp</span></span>
<span class="line"><span>/usr/bin/sqlldr</span></span>
<span class="line"><span>/usr/bin/wrc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%post basic -p /sbin/ldconfig</span></span>
<span class="line"><span>%postun basic -p /sbin/ldconfig</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%post odbc -p /sbin/ldconfig</span></span>
<span class="line"><span>%postun odbc -p /sbin/ldconfig</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%post jdbc -p /sbin/ldconfig</span></span>
<span class="line"><span>%postun jdbc -p /sbin/ldconfig</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%post tools -p /sbin/ldconfig</span></span>
<span class="line"><span>%postun tools -p /sbin/ldconfig</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%changelog</span></span>
<span class="line"><span>* Wed Oct 15 2025 Nikita Bystrov &lt;nikita@example.com&gt; %{icver}-alt1</span></span>
<span class="line"><span>- Initial build for ALT Linux from Oracle Instant Client %{icver}</span></span>
<span class="line"><span>- Includes: basic, sqlplus, devel, odbc, jdbc, tools</span></span></code></pre></div><hr><h2 id="📥-что-нужно-сделать-перед-сборкои" tabindex="-1">📥 Что нужно сделать перед сборкой <a class="header-anchor" href="#📥-что-нужно-сделать-перед-сборкои" aria-label="Permalink to &quot;📥 Что нужно сделать перед сборкой&quot;">​</a></h2><ol><li><p><strong>Скачай все 6 zip-файлов</strong> в <code>~/rpmbuild/SOURCES/</code>:</p><ul><li><code>instantclient-basic-linux.x64-23.26.0.0.0.zip</code></li><li><code>instantclient-sqlplus-linux.x64-23.26.0.0.0.zip</code></li><li><code>instantclient-sdk-linux.x64-23.26.0.0.0.zip</code></li><li><code>instantclient-odbc-linux.x64-23.26.0.0.0.zip</code></li><li><code>instantclient-jdbc-linux.x64-23.26.0.0.0.zip</code></li><li><code>instantclient-tools-linux.x64-23.26.0.0.0.zip</code></li></ul></li><li><p>Убедись, что у тебя есть <code>unzip</code>:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> unzip</span></span></code></pre></div></li><li><p>Помести <code>.spec</code> в <code>~/rpmbuild/SPECS/oracle-instantclient.spec</code></p></li><li><p>Собери:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rpmbuild</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -ba</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/rpmbuild/SPECS/oracle-instantclient.spec</span></span></code></pre></div></li></ol><hr><h2 id="✅-результат" tabindex="-1">✅ Результат <a class="header-anchor" href="#✅-результат" aria-label="Permalink to &quot;✅ Результат&quot;">​</a></h2><p>Будут созданы <strong>6 RPM-пакетов</strong>, полностью совместимых с АЛЬТ ЛИНУКС:</p><ul><li><code>oracle-instantclient-basic-23.26.0.0.0-alt1.x86_64.rpm</code></li><li><code>oracle-instantclient-sqlplus-...</code></li><li><code>oracle-instantclient-devel-...</code></li><li><code>oracle-instantclient-odbc-...</code></li><li><code>oracle-instantclient-jdbc-...</code></li><li><code>oracle-instantclient-tools-...</code></li></ul><p>После установки <code>basic</code> + <code>devel</code> ты сможешь собрать <code>perl-DBD-Oracle</code> без проблем.</p><hr><p>Готов двигаться дальше:</p><ul><li>протестировать установку,</li><li>собрать <code>perl-DBD-Oracle</code>,</li><li>или оформить репозиторий.</li></ul><p>Скажи, что делать.</p>`,56)]))}const u=n(i,[["render",e]]);export{b as __pageData,u as default};
