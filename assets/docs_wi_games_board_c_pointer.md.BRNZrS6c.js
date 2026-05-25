import{_ as s,c as n,o as p,ag as e}from"./chunks/framework.D4Vqf8I7.js";const d=JSON.parse('{"title":"The C Pointer Game - Pointers, Arrays and Strings for Kids","description":"","frontmatter":{},"headers":[],"relativePath":"docs/wi/games/board/c_pointer.md","filePath":"docs/wi/games/board/c_pointer.md","lastUpdated":1779712898000}'),r={name:"docs/wi/games/board/c_pointer.md"};function t(o,a,l,i,c,g){return p(),n("div",null,a[0]||(a[0]=[e(`<h1 id="the-c-pointer-game-pointers-arrays-and-strings-for-kids" tabindex="-1">The C Pointer Game - Pointers, Arrays and Strings for Kids <a class="header-anchor" href="#the-c-pointer-game-pointers-arrays-and-strings-for-kids" aria-label="Permalink to &quot;The C Pointer Game - Pointers, Arrays and Strings for Kids&quot;">​</a></h1><p><a href="https://punkx.org/c-pointer-game/" target="_blank" rel="noreferrer">https://punkx.org/c-pointer-game/</a></p><p>Одна из самых сложных для понимания концепций в современном программировании — это разница между <strong>значением</strong> и <strong>ссылкой</strong>. Эта игра призвана помочь с этим. Родителю нужно немного знать язык C, чтобы играть.</p><p><a href="https://punkx.org/c-pointer-game/photos/deck.jpg" target="_blank" rel="noreferrer"><img src="https://punkx.org/c-pointer-game/photos/deck.jpg" alt="Deck"></a><a href="https://punkx.org/c-pointer-game/photos/deck1.jpg" target="_blank" rel="noreferrer"><img src="https://punkx.org/c-pointer-game/photos/deck1.jpg" alt="Deck 1"></a><a href="https://punkx.org/c-pointer-game/photos/deck2.jpg" target="_blank" rel="noreferrer"><img src="https://punkx.org/c-pointer-game/photos/deck2.jpg" alt="Deck 2"></a><a href="https://punkx.org/c-pointer-game/photos/deck3.jpg" target="_blank" rel="noreferrer"><img src="https://punkx.org/c-pointer-game/photos/deck3.jpg" alt="Deck 3"></a></p><p><s><strong>Купить сейчас: €5,00 EUR</strong></s> [ распродано ]</p><ul><li>распечатайте сами: <a href="c-cards.pdf">c-cards.pdf</a>, <a href="c-box.pdf">c-box.pdf</a></li><li>код: <a href="https://github.com/jackdoe/programming-for-kids/tree/master/projects/c-pointers" target="_blank" rel="noreferrer">c-pointers</a></li><li>автор: <a href="https://github.com/jackdoe" target="_blank" rel="noreferrer">github.com/jackdoe</a></li><li>соавтор: <a href="https://punkjazz.org/jackie" target="_blank" rel="noreferrer">Jackie</a> (помогала с тестированием и идеями)</li><li>контакт: <a href="mailto:b0000@fastmail.com" target="_blank" rel="noreferrer">b0000@fastmail.com</a></li><li>лицензия: CC BY 4.0</li></ul><hr><p>Родителю нужно немного знать язык C, чтобы играть. В игре есть 6 карт, объясняющих концепции символов, массивов, указателей и строк, но этого может быть недостаточно — особенно из-за перегруженного и запутанного использования <code>&amp;</code>, <code>*</code>, <code>()</code>, <code>[]</code> в языке. Поэтому вам придётся немного помогать с чтением кода. Некоторые карты сложнее других, а одна — просто странная. Весь код на картах был скомпилирован, и вывод использовался для создания строкового значения в памяти и указателей на него.</p><p>Большинство языков, которые мы используем сегодня, были <strong>изобретены</strong>, а не <strong>открыты</strong> (как LISP), и по сути они представляют собой «приукрашенные» ассемблеры. Почти все они «протекают» абстракцией указателей и делают вид, что нормально не знать, как устроена память программы, что, на мой взгляд, приводит к значительной путанице — особенно вокруг знака <strong><code>=</code></strong>. Многие люди с трудом понимают, что означает в коде следующее:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>x = 5</span></span>
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
<span class="line"><span>   возьмите ролики и немного покатайтесь?</span></span></code></pre></div><hr><h2 id="пример-раунда" tabindex="-1">Пример раунда: <a class="header-anchor" href="#пример-раунда" aria-label="Permalink to &quot;Пример раунда:&quot;">​</a></h2><p><a href="https://punkx.org/c-pointer-game/photos/example1.jpg" target="_blank" rel="noreferrer"><img src="https://punkx.org/c-pointer-game/photos/example1.jpg" alt="Example 1"></a><a href="https://punkx.org/c-pointer-game/photos/example2.jpg" target="_blank" rel="noreferrer"><img src="https://punkx.org/c-pointer-game/photos/example2.jpg" alt="Example 2"></a></p><blockquote><p><strong>P.S.:</strong> Я пытался подобрать синий цвет коробки под синий цвет книги Кернигана и Ритчи (K&amp;R), но, к сожалению, он немного отличается — я всё ещё привыкаю к цветам CMYK.</p></blockquote>`,18)]))}const m=s(r,[["render",t]]);export{d as __pageData,m as default};
