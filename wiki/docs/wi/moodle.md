# Moodle

![](https://moodle.org/theme/moodleorg/pix/moodle_logo_TM.svg)

https://gist.github.com/burningTyger/9a8be114731a3cc041d7689247bbdd52 отсюда подсмотрим Nginx, не только апачем едины

https://docs.moodle.org/500/en/PostgreSQL ну и бд нет только мускл, но и постгря

https://moodle.org/plugins/qtype_coderunner - типа реплита

https://moodle.org/plugins/mod_vpl - тоже типа реплита, плюс возможна вёрстка

https://moodle.org/plugins/local_webshell - веб шелл

::: tip создаём "главную страницу" мудла
/var/www/html/index.html - если создать, то он будет главной страницей (независимо от мудла). дополнительно конфиги настраивать не надо
:::

::: details Хахахахах, вот этот код мне qwen с первого раза написал (это для теста)
```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>EduSphere — Онлайн-обучение будущего</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <style>
    /* Общие стили */
    :root {
      --primary: #6366f1;
      --primary-dark: #4f46e5;
      --secondary: #10b981;
      --dark: #1e293b;
      --light: #f8fafc;
      --gray: #94a3b8;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
      color: var(--dark);
      overflow-x: hidden;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Шапка */
    header {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
    }

    .logo {
      font-size: 1.8rem;
      font-weight: 800;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
    }

    .nav-links a {
      font-weight: 600;
      transition: color 0.3s;
    }

    .nav-links a:hover {
      color: var(--primary);
    }

    .btn {
      background: var(--primary);
      color: white;
      padding: 0.5rem 1.2rem;
      border-radius: 50px;
      font-weight: 600;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
    }

    .btn:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    }

    /* Герой */
    .hero {
      padding: 120px 0 80px;
      text-align: center;
    }

    .hero h1 {
      font-size: 3.5rem;
      margin-bottom: 1.2rem;
      line-height: 1.2;
    }

    .hero p {
      font-size: 1.2rem;
      color: var(--gray);
      max-width: 700px;
      margin: 0 auto 2rem;
    }

    .hero-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .btn-outline {
      background: transparent;
      border: 2px solid var(--primary);
      color: var(--primary);
    }

    .btn-outline:hover {
      background: var(--primary);
      color: white;
    }

    /* Курсы */
    .courses {
      padding: 80px 0;
    }

    .section-title {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2.2rem;
      color: var(--dark);
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      transition: transform 0.4s ease, box-shadow 0.4s ease;
    }

    .card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 40px rgba(99, 102, 241, 0.25);
    }

    .card-img {
      height: 180px;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 3rem;
    }

    .card-content {
      padding: 1.5rem;
    }

    .card h3 {
      margin-bottom: 0.5rem;
    }

    .card p {
      color: var(--gray);
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .price {
      font-weight: 700;
      font-size: 1.2rem;
      color: var(--primary);
    }

    /* Футер */
    footer {
      background: var(--dark);
      color: white;
      padding: 3rem 0;
      text-align: center;
    }

    /* Модальное окно */
    .modal {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 2000;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      max-width: 500px;
      width: 90%;
      position: relative;
      animation: fadeIn 0.4s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }

    .close {
      position: absolute;
      top: 1rem; right: 1rem;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--gray);
    }

    .close:hover { color: var(--dark); }

    /* Анимации при прокрутке */
    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate {
      animation: slideInUp 0.8s ease forwards;
    }

    /* Адаптивность */
    @media (max-width: 768px) {
      .hero h1 { font-size: 2.5rem; }
      .nav-links { display: none; }
      .hero-buttons { flex-direction: column; align-items: center; }
    }
  </style>
</head>
<body>

  <!-- Шапка -->
  <header>
    <div class="container navbar">
      <div class="logo">EduSphere</div>
      <nav class="nav-links">
        <a href="#courses">Курсы</a>
        <a href="#">О нас</a>
        <a href="#">Контакты</a>
      </nav>
      <button class="btn" id="loginBtn">Войти</button>
    </div>
  </header>

  <!-- Герой -->
  <section class="hero">
    <div class="container">
      <h1>Освой будущее — учись онлайн</h1>
      <p>Более 10 000 студентов уже изучают программирование, дизайн, маркетинг и другие навыки с нами. Присоединяйся!</p>
      <div class="hero-buttons">
        <a href="#courses" class="btn">Начать обучение</a>
        <button class="btn btn-outline" id="demoBtn">Демо-урок</button>
      </div>
    </div>
  </section>

  <!-- Курсы -->
  <section class="courses" id="courses">
    <div class="container">
      <h2 class="section-title animate">Популярные курсы</h2>
      <div class="cards">
        <div class="card animate" style="animation-delay: 0.1s">
          <div class="card-img">
            <i class="fas fa-code"></i>
          </div>
          <div class="card-content">
            <h3>Веб-разработка</h3>
            <p>HTML, CSS, JavaScript, React — от основ до продвинутого уровня.</p>
            <div class="card-footer">
              <span class="price">от 2 990 ₽</span>
              <a href="#" class="btn">Подробнее</a>
            </div>
          </div>
        </div>

        <div class="card animate" style="animation-delay: 0.2s">
          <div class="card-img">
            <i class="fas fa-paint-brush"></i>
          </div>
          <div class="card-content">
            <h3>UX/UI Дизайн</h3>
            <p>Figma, прототипирование, дизайн-системы и user research.</p>
            <div class="card-footer">
              <span class="price">от 3 490 ₽</span>
              <a href="#" class="btn">Подробнее</a>
            </div>
          </div>
        </div>

        <div class="card animate" style="animation-delay: 0.3s">
          <div class="card-img">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="card-content">
            <h3>Цифровой маркетинг</h3>
            <p>SEO, контекстная реклама, email-маркетинг и аналитика.</p>
            <div class="card-footer">
              <span class="price">от 2 490 ₽</span>
              <a href="#" class="btn">Подробнее</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Футер -->
  <footer>
    <div class="container">
      <p>&copy; 2025 EduSphere. Все права защищены.</p>
      <p>info@edusphere.ru | +7 (495) 123-45-67</p>
    </div>
  </footer>

  <!-- Модальное окно -->
  <div class="modal" id="modal">
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <h2>Запишитесь на демо-урок</h2>
      <p>Оставьте email, и мы вышлем вам бесплатный урок по выбранному направлению!</p>
      <form style="margin-top: 1rem;">
        <input type="email" placeholder="Ваш email" required style="width: 100%; padding: 0.8rem; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 8px;">
        <button type="submit" class="btn" style="width: 100%;">Получить демо</button>
      </form>
    </div>
  </div>

  <!-- Скрипты -->
  <script>
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Модальное окно
    const modal = document.getElementById('modal');
    const loginBtn = document.getElementById('loginBtn');
    const demoBtn = document.getElementById('demoBtn');
    const closeModal = document.getElementById('closeModal');

    [loginBtn, demoBtn].forEach(btn => {
      btn.addEventListener('click', () => {
        modal.style.display = 'flex';
      });
    });

    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });

    // Анимация при прокрутке (упрощённая)
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.card, .section-title').forEach(el => {
      el.classList.remove('animate'); // сброс для повторного срабатывания
      observer.observe(el);
    });
  </script>
</body>
</html>

```
:::

::: details
```html
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Курсы обучения - Магическая академия</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: #000;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow-x: hidden;
            color: white;
            line-height: 1.6;
        }

        .background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: linear-gradient(135deg, #0a0020, #00001a);
            overflow: hidden;
        }

        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .star {
            position: absolute;
            pointer-events: none;
            animation: twinkle 3s infinite ease-in-out;
        }

        .star::before {
            content: "★";
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.7);
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }

        @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.3; transform: scale(0.8); }
        }

        .main-content {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            text-align: center;
            position: relative;
            z-index: 1;
        }

        .hero-image {
            max-width: 90%;
            height: auto;
            margin: 2rem auto;
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }

        .title {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            color: #ffffff;
            text-shadow: 
                0 0 5px rgba(255, 255, 255, 0.3),
                0 0 10px rgba(255, 255, 255, 0.2),
                0 0 15px rgba(255, 255, 255, 0.1);
            font-weight: 300;
            letter-spacing: 2px;
            position: relative;
            display: inline-block;
        }

        .title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background: linear-gradient(to right, #ff6b6b, #4ecdc4);
            border-radius: 15px;
        }

        .subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            color: #ddd;
            max-width: 800px;
            animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .cta-button {
            display: inline-block;
            padding: 15px 30px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            margin: 1rem;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        .cta-button:hover {
            transform: scale(1.1);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        .features {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
            margin-top: 3rem;
            max-width: 1200px;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 15px;
            width: 300px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #4ecdc4;
        }

        .feature-title {
            font-size: 1.3rem;
            margin-bottom: 1rem;
            color: #ff6b6b;
        }

        .floating-elements {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        }

        .floating-petal {
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.3);
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            animation: floatPetal 15s linear infinite;
        }

        @keyframes floatPetal {
            0% { transform: translateX(-100px) translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(calc(100vw + 100px)) translateY(0) rotate(360deg); opacity: 0; }
        }

        .footer {
            margin-top: 4rem;
            padding: 2rem;
            text-align: center;
            font-size: 0.9rem;
            color: #aaa;
        }

        @media (max-width: 768px) {
            .title {
                font-size: 2.5rem;
                letter-spacing: 1px;
            }
            
            .subtitle {
                font-size: 1.2rem;
            }
            
            .hero-image {
                max-width: 95%;
            }
            
            .features {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>
<body>
    <div class="background">
        <div class="particles" id="particles"></div>
        <div class="floating-elements" id="floatingElements"></div>
    </div>

    <div class="main-content">
        <h1 class="title">Магическая Академия</h1>
        <p class="subtitle">Откройте для себя волшебный мир знаний и мастерства. Наши курсы помогут вам раскрыть свой потенциал и достичь новых высот в обучении.</p>
        
        <img src="https://i.imgur.com/1VzRZJL.png" alt="Магический персонаж" class="hero-image" id="heroImage">
        
        <div class="buttons">
            <a href="#courses" class="cta-button">Начать обучение</a>
            <a href="#about" class="cta-button">Узнать больше</a>
        </div>
        
        <div class="features">
            <div class="feature-card">
                <div class="feature-icon">✨</div>
                <h3 class="feature-title">Интерактивные уроки</h3>
                <p>Учиться с удовольствием — это возможно! Наша платформа предлагает интерактивные уроки, которые превращают обучение в захватывающее приключение.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🎓</div>
                <h3 class="feature-title">Экспертные преподаватели</h3>
                <p>Наши преподаватели — настоящие мастера своего дела, готовые поделиться своими знаниями и опытом, чтобы вы достигли своих целей.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🚀</div>
                <h3 class="feature-title">Гибкий график</h3>
                <p>Учитесь в удобное для вас время. Наша платформа доступна 24/7, позволяя вам учиться в своем темпе и согласно вашему расписанию.</p>
            </div>
        </div>
    </div>

    <div class="footer">
        © 2025 Магическая Академия. Все права защищены.
    </div>

    <script>
        // Создаем звезды на фоне
        function createStars() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 80; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                
                // Позиция
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                
                // Случайная задержка анимации
                star.style.animationDelay = Math.random() * 5 + 's';
                
                // Случайный размер
                const size = Math.random() * 0.5 + 0.5;
                star.style.transform = `scale(${size})`;
                
                particlesContainer.appendChild(star);
            }
        }

        // Создаем летящие лепестки
        function createFloatingPetals() {
            const floatingContainer = document.getElementById('floatingElements');
            for (let i = 0; i < 20; i++) {
                const petal = document.createElement('div');
                petal.classList.add('floating-petal');
                
                // Случайная позиция по вертикали
                petal.style.top = Math.random() * 100 + '%';
                
                // Случайная скорость
                const duration = Math.random() * 10 + 10;
                petal.style.animationDuration = duration + 's';
                
                // Случайная задержка
                petal.style.animationDelay = Math.random() * 5 + 's';
                
                // Случайный цвет
                const hue = Math.random() * 60 + 300; // От розового до фиолетового
                petal.style.backgroundColor = `hsla(${hue}, 100%, 80%, 0.3)`;
                
                floatingContainer.appendChild(petal);
            }
        }

        // Анимация главного изображения при наведении
        document.getElementById('heroImage').addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-10px)';
            this.style.transition = 'transform 0.5s ease';
        });

        document.getElementById('heroImage').addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });

        // Инициализация
        window.addEventListener('DOMContentLoaded', () => {
            createStars();
            createFloatingPetals();
            
            // Добавляем плавную анимацию для элементов при прокрутке
            const observerOptions = {
                threshold: 0.1,
                rootMargin: "0px 0px 50px 0px"
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Наблюдаем за карточками
            document.querySelectorAll('.feature-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(card);
            });
        });
    </script>
</body>
</html>
```
```
:::

::: details
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Курсы обучения - Магическая академия</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: #000;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow-x: hidden;
            color: white;
            line-height: 1.6;
        }

        .background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: linear-gradient(135deg, #1a0033, #00001a);
            overflow: hidden;
        }

        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .particle {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
        }

        .main-content {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            text-align: center;
            position: relative;
            z-index: 1;
        }

        .hero-image {
            max-width: 90%;
            height: auto;
            margin: 2rem auto;
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }

        .title {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(to right, #ff6b6b, #4ecdc4, #45b7d1);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
            from { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #e600ff, 0 0 20px #e600ff; }
            to { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e600ff, 0 0 40px #e600ff; }
        }

        .subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            color: #ddd;
            max-width: 800px;
            animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .cta-button {
            display: inline-block;
            padding: 15px 30px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            margin: 1rem;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        .cta-button:hover {
            transform: scale(1.1);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        .features {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
            margin-top: 3rem;
            max-width: 1200px;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 15px;
            width: 300px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #4ecdc4;
        }

        .feature-title {
            font-size: 1.3rem;
            margin-bottom: 1rem;
            color: #ff6b6b;
        }

        .floating-elements {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        }

        .floating-petal {
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.3);
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            animation: floatPetal 15s linear infinite;
        }

        @keyframes floatPetal {
            0% { transform: translateX(-100px) translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(calc(100vw + 100px)) translateY(0) rotate(360deg); opacity: 0; }
        }

        .footer {
            margin-top: 4rem;
            padding: 2rem;
            text-align: center;
            font-size: 0.9rem;
            color: #aaa;
        }

        @media (max-width: 768px) {
            .title {
                font-size: 2.5rem;
            }
            
            .subtitle {
                font-size: 1.2rem;
            }
            
            .hero-image {
                max-width: 95%;
            }
            
            .features {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>
<body>
    <div class="background">
        <div class="particles" id="particles"></div>
        <div class="floating-elements" id="floatingElements"></div>
    </div>

    <div class="main-content">
        <h1 class="title">Магическая Академия</h1>
        <p class="subtitle">Откройте для себя волшебный мир знаний и мастерства. Наши курсы помогут вам раскрыть свой потенциал и достичь новых высот в обучении.</p>
        
        <img src="https://i.imgur.com/1VzRZJL.png" alt="Магический персонаж" class="hero-image" id="heroImage">
        
        <div class="buttons">
            <a href="#courses" class="cta-button">Начать обучение</a>
            <a href="#about" class="cta-button">Узнать больше</a>
        </div>
        
        <div class="features">
            <div class="feature-card">
                <div class="feature-icon">✨</div>
                <h3 class="feature-title">Интерактивные уроки</h3>
                <p>Учиться с удовольствием — это возможно! Наша платформа предлагает интерактивные уроки, которые превращают обучение в захватывающее приключение.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🎓</div>
                <h3 class="feature-title">Экспертные преподаватели</h3>
                <p>Наши преподаватели — настоящие мастера своего дела, готовые поделиться своими знаниями и опытом, чтобы вы достигли своих целей.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🚀</div>
                <h3 class="feature-title">Гибкий график</h3>
                <p>Учитесь в удобное для вас время. Наша платформа доступна 24/7, позволяя вам учиться в своем темпе и согласно вашему расписанию.</p>
            </div>
        </div>
    </div>

    <div class="footer">
        © 2025 Магическая Академия. Все права защищены.
    </div>

    <script>
        // Создаем частицы на фоне
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Размер частицы
                const size = Math.random() * 5 + 1;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                // Позиция
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                
                // Анимация
                particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
                particle.style.animationDelay = Math.random() * 5 + 's';
                particle.style.animationName = 'pulseParticle';
                
                particlesContainer.appendChild(particle);
            }
        }

        // Добавляем анимацию пульсации для частиц
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes pulseParticle {
                0% { opacity: 0.2; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.2); }
                100% { opacity: 0.2; transform: scale(1); }
            }
        `;
        document.head.appendChild(styleSheet);

        // Создаем летящие лепестки
        function createFloatingPetals() {
            const floatingContainer = document.getElementById('floatingElements');
            for (let i = 0; i < 20; i++) {
                const petal = document.createElement('div');
                petal.classList.add('floating-petal');
                
                // Случайная позиция по вертикали
                petal.style.top = Math.random() * 100 + '%';
                
                // Случайная скорость
                const duration = Math.random() * 10 + 10;
                petal.style.animationDuration = duration + 's';
                
                // Случайная задержка
                petal.style.animationDelay = Math.random() * 5 + 's';
                
                // Случайный цвет
                const hue = Math.random() * 60 + 300; // От розового до фиолетового
                petal.style.backgroundColor = `hsla(${hue}, 100%, 80%, 0.3)`;
                
                floatingContainer.appendChild(petal);
            }
        }

        // Анимация главного изображения при наведении
        document.getElementById('heroImage').addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-10px)';
            this.style.transition = 'transform 0.5s ease';
        });

        document.getElementById('heroImage').addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });

        // Инициализация
        window.addEventListener('DOMContentLoaded', () => {
            createParticles();
            createFloatingPetals();
            
            // Добавляем плавную анимацию для элементов при прокрутке
            const observerOptions = {
                threshold: 0.1,
                rootMargin: "0px 0px 50px 0px"
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Наблюдаем за карточками
            document.querySelectorAll('.feature-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(card);
            });
        });
    </script>
</body>
</html>
```
:::

::: tip чтобы сменить адрес/moodle на что -то другое, например адрес/sdo нужно
1. отредактировать конфиг /var/www/webapps/moodle/config.php
строка wwwroot там вместо /moodle написать /sdo

2. аналогично поменять алиас и директиву директории /var/www/webapps/moodle везде на /sdo в файле /etc/httpd2/conf/extra-enabled/moodle.conf

3. mv /var/www/webapps/moodle/ /var/www/webapps/sdo/

4. systemctl restart httpd2
:::


::: tip включение Планировщика 
https://docs.moodle.org/37/en/Cron и https://docs.moodle.org/37/en/Scheduled_tasks
Чтобы работали запланированные задачи (автоматически), нужно включить планировщик
```bash
crontab -u apache2 -e
```
Это откроет окно редактора. Чтобы запускать скрипт cli cron каждую 1 минуту, добавьте строку:
```cron
* * * * * /usr/bin/php/path/to/moodle/admin/cli/cron.php >/dev/null'
```

Ииииии, почему то не работает) Крон отрабатывает, даже 
:::