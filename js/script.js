// Анимация для главной страницы
document.addEventListener('DOMContentLoaded', function() { // Что делать при клике на кнопку
    // Анимация появления элементов при прокрутке
    const observerOptions = {  // Настройки для наблюдателя
        root: null, // Элементы отслеживаются относительно области видимости окна браузера 
        rootMargin: '0px', // Означает отсутствие дополнительных отступов вокруг корневого элемента
        threshold: 0.1 // Анимация сработает, когда хотя бы 10% элемента (0.1) появится в поле зрения
    };

    const observer = new IntersectionObserver((entries) => { // Создаём нового наблюдателя
        entries.forEach(entry => { // Это список всех элементов, за которыми мы следим. Браузер передает их в функцию всякий раз, когда они «входят» в экран или «выходят» из него
            if (entry.isIntersecting) { // Это логическое условие. Оно равно true, если элемент появился в зоне видимости
                entry.target.style.animationPlayState = 'running'; // Когда элемент становится видимым, код меняет состояние его CSS-анимации на «запущенную»
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами с классом fade-in (HTML-элементы, к которым применена анимация плавного появления)
    document.querySelectorAll('.feature-card, .car-card, .news-card, .review-card').forEach(card => { // Скрипт находит на странице все элементы с классами .feature-card... и выполняет для них действия
        card.style.opacity = '0'; // Карточка становится полностью прозрачной (невидимой)
        card.style.transform = 'translateY(20px)'; // Карточка сдвигается на 20 пикселей вниз от своего нормального положения
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Устанавливается плавность. Теперь любое изменение прозрачности и положения будет занимать 0.6 секунды с мягким эффектом (ease)
        
        setTimeout(() => { // Задержка для финального действия, чтобы браузер прогрузился
            card.style.opacity = '1'; // Прозрачность возвращается к норме (карточка проявляется)
            card.style.transform = 'translateY(0)'; // Карточка возвращается на свое исходное место
        }, 100);
    });

    // Анимация движения автомобиля на главной странице
    const carImage = document.getElementById('animated-car'); // Ищем нашу картинку
    if (carImage) {
        let position = 0; // Текущая координата (начинается с 0)
        let direction = 1; // Направление (1 — вправо, -1 — влево)
        
        function moveCar() { // Функция движения
            position += direction * 0.5; // Сдвиг картинки: К позиции прибавляется 0.5 пикселя
            carImage.style.transform = `translateX(${position}px)`; // Отрисовка картинки
            
            if (position > 50) direction = -1; // Проверка границ: Если машинка уехала дальше 50px вправо, направление меняется на -1. Если дальше -50px влево — на 1. Так получается «пинг-понг» эффект 
            if (position < -50) direction = 1;
            
            requestAnimationFrame(moveCar);  // Заставляет браузер вызывать эту функцию перед каждым обновлением экрана (обычно 60 раз в секунду), создавая плавное движение
        }
        
        moveCar();
    }

    // Анимация при наведении на кнопки
    const buttons = document.querySelectorAll('.more-info-btn'); // Находит на странице все элементы с этим классом и сохраняет их в список buttons
    buttons.forEach(button => { // Код «проходится» по каждой найденной кнопке, чтобы назначить ей обработчики событий
        button.addEventListener('mouseenter', function() { // Само событие 
            this.style.transform = 'scale(1.05)'; // Кнопка слегка увеличивается в размере (на 5%)
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)'; // Появляется мягкая тень, создавая эффект «приподнимания» кнопки над страницей
        });
        
        button.addEventListener('mouseleave', function() { // Уход курсора
            this.style.transform = 'scale(1)'; // Стили возвращаются в исходное состояние: размер становится прежним (scale(1)), а тень исчезает (none)
            this.style.boxShadow = 'none';
        });
    });

    // Анимация при клике на кнопку "Подробнее"
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const carName = this.parentElement.querySelector('h3').textContent; // Когда вы нажимаете на кнопку, код через this.parentElement.querySelector('h3') ищет заголовок в том же блоке, где находится кнопка, и забирает из него название машины (например, "Lada Priora")
            let wikipediaUrl = '';
            
            // Определяем URL для разных марок автомобилей
            if (carName.includes('Lada Priora')) { // Программа сравнивает название машины с заготовленным списком. Если находит точное совпадение (например, "Ford Focus"), она подставляет конкретную, заранее прописанную ссылку на статью
                wikipediaUrl = 'https://ru.wikipedia.org/wiki/LADA_Priora';
            } else if (carName.includes('Lada Granta')) { // Если машины нет в списке, код пытается создать ссылку автоматически. Он берет название, заменяет в нем пробелы на нижнее подчеркивание (_) и подставляет это в стандартный адрес Википедии
                wikipediaUrl = 'https://ru.wikipedia.org/wiki/LADA_Granta';
            } else if (carName.includes('Lada Kalina')) {
                wikipediaUrl = 'https://ru.wikipedia.org/wiki/LADA_Kalina';
            } else if (carName.includes('Ford Focus')) {
                wikipediaUrl = 'https://ru.wikipedia.org/wiki/Ford_Focus';
            } else if (carName.includes('Ford Mondeo')) {
                wikipediaUrl = 'https://ru.wikipedia.org/wiki/Ford_Mondeo';
            } else if (carName.includes('Ford Fusion')) {
                wikipediaUrl = 'https://ru.wikipedia.org/wiki/Ford_Fusion';
            } else if (carName.includes('Toyota Camry')) {
                wikipediaUrl = 'https://ru.wikipedia.org/wiki/Toyota_Camry';
            } else if (carName.includes('Toyota Corolla')) {
                wikipediaUrl = 'https://ru.wikipedia.org/wiki/Toyota_Corolla';
            } else if (carName.includes('Toyota RAV4')) {
                wikipediaUrl = 'https://ru.wikipedia.org/wiki/Toyota_RAV4';
            } else {
                // По умолчанию поиск в Wikipedia
                const searchTerm = carName.replace(' ', '_');
                wikipediaUrl = `https://ru.wikipedia.org/wiki/${searchTerm}`;
            }
            
            // Открываем ссылку в новой вкладке
            window.open(wikipediaUrl, '_blank'); // Открывает итоговую страницу в новой вкладке браузера
        });
    });

    // Анимация для отзывов
    const reviewCards = document.querySelectorAll('.review-card'); // Находит все карточки отзывов на странице
    reviewCards.forEach((card, index) => { 
        setTimeout(() => { // Подготовка анимации
            card.style.opacity = '0'; // Карточка делается невидимой 
            card.style.transform = 'translateX(50px)'; // Она сдвигается на 50 пикселей вправо 
            card.style.transition = 'all 0.5s ease'; // Ей назначается плавность анимации 
            
            setTimeout(() => { // Запуск анимации 
                card.style.opacity = '1'; // Невидимость уходит
                card.style.transform = 'translateX(0)'; // Карточка возвращается в исходную позицию
            }, 100);
        }, index * 200); // Цикл с задержкой: Cоздает «очередь». Первая карточка (index 0) начнет анимацию через 0 мс, вторая (index 1) — через 200 мс, третья — через 400 мс и так далее. Это создает эффект «лесенки»
    });

    // Добавление эффекта параллакса(создание визуальной иллюзии объема) для заголовков
    window.addEventListener('scroll', function() { // Следит за прокруткой страницы: заставляет браузер выполнять функцию каждый раз, когда пользователь крутит колесико мыши или двигает ползунок страницы
        const scrollPosition = window.scrollY; // Определение позиции: считывает, на сколько пикселей страница прокручена вниз от самого верха
        const parallaxElements = document.querySelectorAll('.hero, .selection-header, .news-header');  // Выбор элементов: Код ищет блоки с классами .hero...
        
        parallaxElements.forEach(element => {
            const speed = 0.5; // Значение 0.5 означает, что фон будет смещаться в два раза медленнее, чем крутится колёсико мышки
            const yPos = -(scrollPosition * speed); // Вычисляет координату. Знак «минус» нужен, чтобы фон уходил вверх, создавая правильную перспективу
            element.style.backgroundPosition = `center ${yPos}px`;
        });
    });

    // Анимация для меню при прокручивании
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
// Если текущий скролл больше предыдущего (> lastScrollTop) и вы пролистали больше 100px — значит, вы идете вниз. Код дает команду translateY(-100%), и шапка «улетает» вверх за пределы экрана
// В противном случае (если вы крутнули колесико вверх) — срабатывает translateY(0), и шапка плавно возвращается на место   
        if (scrollTop > lastScrollTop && scrollTop > 100) { 
            // Прокрутка вниз - скрываем меню
            header.style.transform = 'translateY(-100%)';
        } else {
            // Прокрутка вверх - показываем меню
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Анимация для изображений при наведении
    const images = document.querySelectorAll('img'); // Находит каждую картинку на странице
    images.forEach(img => {
        img.addEventListener('mouseenter', function() { // Событие mouseenter (курсор зашел на картинку)
            this.style.filter = 'brightness(1.1)'; // Увеличивает яркость на 10%, создавая эффект легкого свечения
            this.style.transform = 'scale(1.02)'; // Увеличивает картинку на 2% от её размера
        });
        
        img.addEventListener('mouseleave', function() { // Событие mouseenter (курсор ушёл с картинки)
            this.style.filter = 'brightness(1)'; // Возвращает яркость в исходное состояние
            this.style.transform = 'scale(1)'; // Возвращает масштаб к оригиналу
        });
    });

    // Добавление эффекта "пульсации" для логотипа
    const logo = document.querySelector('.logo'); // Ищет элемент с классом logo
    if (logo) {
        setInterval(() => { // Запускает бесконечный цикл каждые 3000 мс (3 секунды)
            logo.style.textShadow = '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #cc0000, 0 0 40px #cc0000'; // Эффект свечения: В момент срабатывания таймера свойство textShadow добавляет многослойную тень
            setTimeout(() => {
                logo.style.textShadow = 'none'; // Выключение: Внутри основного таймера сидит второй, который ровно через 500 мс (полсекунды) убирает тень (none), заставляя логотип «погаснуть»
            }, 500);
        }, 3000);
    }

    console.log("Сайт 'АвтоПодбор' загружен успешно!");
});

// Функция для плавной прокрутки к якорям
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' }); // Делает перемещение плавным
    }
}

// Функция для изменения темы (светлая/темная)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    // Сохраняем выбор темы в localStorage(Хранилище, позволяющее JavaScript сохранять данные  непосредственно в браузере пользователя, )
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Проверяем сохраненную тему при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
});
