import{_ as r,C as t,o,c as l,j as s,a as e,G as p,aj as i}from"./chunks/framework.BZR1KcQy.js";const P=JSON.parse('{"title":"The C Pointer Game - Pointers, Arrays and Strings for Kids","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/games/board/c_pointer.md","filePath":"docs/wi/games/board/c_pointer.md","lastUpdated":1788534566000}'),c={name:"docs/wi/games/board/c_pointer.md"},d={href:"https://punkx.org/c-pointer-game/photos/deck.jpg",target:"_blank",rel:"noreferrer"},g={href:"https://punkx.org/c-pointer-game/photos/deck1.jpg",target:"_blank",rel:"noreferrer"},h={href:"https://punkx.org/c-pointer-game/photos/deck2.jpg",target:"_blank",rel:"noreferrer"},m={href:"https://punkx.org/c-pointer-game/photos/deck3.jpg",target:"_blank",rel:"noreferrer"},k={href:"https://punkx.org/c-pointer-game/photos/example1.jpg",target:"_blank",rel:"noreferrer"},u={href:"https://punkx.org/c-pointer-game/photos/example2.jpg",target:"_blank",rel:"noreferrer"};function f(b,a,_,x,j,C){const n=t("ImageZoom");return o(),l("div",null,[a[0]||(a[0]=s("h1",{id:"the-c-pointer-game-pointers-arrays-and-strings-for-kids",tabindex:"-1"},[e("The C Pointer Game - Pointers, Arrays and Strings for Kids "),s("a",{class:"header-anchor",href:"#the-c-pointer-game-pointers-arrays-and-strings-for-kids","aria-label":'Permalink to "The C Pointer Game - Pointers, Arrays and Strings for Kids"'},"​")],-1)),a[1]||(a[1]=s("p",null,[s("a",{href:"https://punkx.org/c-pointer-game/",target:"_blank",rel:"noreferrer"},"https://punkx.org/c-pointer-game/")],-1)),a[2]||(a[2]=s("p",null,[e("Одна из самых сложных для понимания концепций в современном программировании — это разница между "),s("strong",null,"значением"),e(" и "),s("strong",null,"ссылкой"),e(". Эта игра призвана помочь с этим. Родителю нужно немного знать язык C, чтобы играть.")],-1)),s("p",null,[s("a",d,[p(n,{src:"https://punkx.org/c-pointer-game/photos/deck.jpg"})]),s("a",g,[p(n,{src:"https://punkx.org/c-pointer-game/photos/deck1.jpg"})]),s("a",h,[p(n,{src:"https://punkx.org/c-pointer-game/photos/deck2.jpg"})]),s("a",m,[p(n,{src:"https://punkx.org/c-pointer-game/photos/deck3.jpg"})])]),a[3]||(a[3]=i(`<p><s><strong>Купить сейчас: €5,00 EUR</strong></s> [ распродано ]</p><ul><li>распечатайте сами: <a href="c-cards.pdf">c-cards.pdf</a>, <a href="c-box.pdf">c-box.pdf</a></li><li>код: <a href="https://github.com/jackdoe/programming-for-kids/tree/master/projects/c-pointers" target="_blank" rel="noreferrer">c-pointers</a></li><li>автор: <a href="https://github.com/jackdoe" target="_blank" rel="noreferrer">github.com/jackdoe</a></li><li>соавтор: <a href="https://punkjazz.org/jackie" target="_blank" rel="noreferrer">Jackie</a> (помогала с тестированием и идеями)</li><li>контакт: <a href="mailto:b0000@fastmail.com" target="_blank" rel="noreferrer">b0000@fastmail.com</a></li><li>лицензия: CC BY 4.0</li></ul><hr><p>Родителю нужно немного знать язык C, чтобы играть. В игре есть 6 карт, объясняющих концепции символов, массивов, указателей и строк, но этого может быть недостаточно — особенно из-за перегруженного и запутанного использования <code>&amp;</code>, <code>*</code>, <code>()</code>, <code>[]</code> в языке. Поэтому вам придётся немного помогать с чтением кода. Некоторые карты сложнее других, а одна — просто странная. Весь код на картах был скомпилирован, и вывод использовался для создания строкового значения в памяти и указателей на него.</p><p>Большинство языков, которые мы используем сегодня, были <strong>изобретены</strong>, а не <strong>открыты</strong> (как LISP), и по сути они представляют собой «приукрашенные» ассемблеры. Почти все они «протекают» абстракцией указателей и делают вид, что нормально не знать, как устроена память программы, что, на мой взгляд, приводит к значительной путанице — особенно вокруг знака <strong><code>=</code></strong>. Многие люди с трудом понимают, что означает в коде следующее:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>x = 5</span></span>
<span class="line"><span>y = x</span></span>
<span class="line"><span>x = 6</span></span>
<span class="line"><span>print(y)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>и</span></span>
<span class="line"><span></span></span>
<span class="line"><span>a = []</span></span>
<span class="line"><span>b = a</span></span>
<span class="line"><span>a.push(1)</span></span>
<span class="line"><span>print(b)</span></span></code></pre></div><p>Я считаю, что глубокое понимание указателей поможет детям увидеть суть за «синтаксическим сахаром» и в будущем создать что-то крутое.</p><hr><h2 id="правила" tabindex="-1">ПРАВИЛА: <a class="header-anchor" href="#правила" aria-label="Permalink to &quot;ПРАВИЛА:&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. Перемешайте карты. Разделите карты с кодом</span></span>
<span class="line"><span>   между игроками, а карты памяти положите </span></span>
<span class="line"><span>   рубашкой вверх в центре.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. Возьмите верхнюю карту памяти и положите её </span></span>
<span class="line"><span>   рубашкой вверх в центре стола.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. Найдите карту с кодом, соответствующую памяти.</span></span>
<span class="line"><span>   Все переменные должны иметь правильные значения </span></span>
<span class="line"><span>   на карте памяти.</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   ПРИМЕР:</span></span>
<span class="line"><span>     char *foo = &quot;bar&quot;;</span></span>
<span class="line"><span>     char *pa = foo + 1;</span></span>
<span class="line"><span>     char v = foo[1]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   Вам нужно найти в памяти:</span></span>
<span class="line"><span>   + 98 97 114 0 (например, адрес 172)</span></span>
<span class="line"><span>   + 172 (foo указывает на &quot;bar&quot;)</span></span>
<span class="line"><span>   + 173 (pa = foo + 1)</span></span>
<span class="line"><span>   + 97 (v = foo[1])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. Первый игрок, нашедший совпадение,</span></span>
<span class="line"><span>   выигрывает и откладывает выигравшую карту.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5. ЕСЛИ у игрока закончились карты, ПЕРЕЙТИ к шагу 7.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>6. ПЕРЕЙТИ к шагу 2.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>7. Идите и поиграйте на улице, может быть, </span></span>
<span class="line"><span>   возьмите ролики и немного покатайтесь?</span></span></code></pre></div><hr><h2 id="пример-раунда" tabindex="-1">Пример раунда: <a class="header-anchor" href="#пример-раунда" aria-label="Permalink to &quot;Пример раунда:&quot;">​</a></h2>`,12)),s("p",null,[s("a",k,[p(n,{src:"https://punkx.org/c-pointer-game/photos/example1.jpg"})]),s("a",u,[p(n,{src:"https://punkx.org/c-pointer-game/photos/example2.jpg"})])]),a[4]||(a[4]=s("blockquote",null,[s("p",null,[s("strong",null,"P.S.:"),e(" Я пытался подобрать синий цвет коробки под синий цвет книги Кернигана и Ритчи (K&R), но, к сожалению, он немного отличается — я всё ещё привыкаю к цветам CMYK.")])],-1))])}const y=r(c,[["render",f]]);export{P as __pageData,y as default};
