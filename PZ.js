// Плавная прокрутка к разделам при клике на меню
document.querySelectorAll('.menu-item a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Подсветка активного пункта меню при прокрутке
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menu-item a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Добавляем стиль для активного пункта меню
const style = document.createElement('style');
style.textContent = `
    .menu-item a.active {
        background-color: #2575fc !important;
        color: white !important;
    }
`;
document.head.appendChild(style);

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Наблюдаем за всеми блоками с контентом
document.querySelectorAll('.content-block').forEach(block => {
    observer.observe(block);
});

// Добавляем CSS для анимации
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .content-block {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s, transform 0.5s;
    }
    
    .content-block.animate {
        opacity: 1;
       