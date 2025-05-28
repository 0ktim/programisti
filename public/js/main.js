// Основен JavaScript файл

// Функция за отваряне/затваряне на мобилно меню
function toggleMenu() {
    const navMenu = document.querySelector('nav ul');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Добавяме "уау" ефект - анимация на меню елементите
    const menuItems = document.querySelectorAll('nav ul li');
    menuItems.forEach((item, index) => {
        if (navMenu.classList.contains('active')) {
            // Задаваме забавяне на анимацията за всеки елемент
            item.style.animation = `fadeInDown 0.4s ease forwards ${index * 0.1}s`;
            item.style.opacity = '1';
        } else {
            item.style.animation = '';
            setTimeout(() => {
                item.style.opacity = '0';
            }, 300);
        }
    });
}

// Инициализация на активния клас за навигацията
function initActiveNavLinks() {
    // Вземаме текущия URL
    const currentUrl = window.location.pathname;
    
    // Намираме всички линкове в навигацията
    const navLinks = document.querySelectorAll('nav a');
    
    // Проверяваме всеки линк
    navLinks.forEach(link => {
        // Вземаме href атрибута
        const linkPath = link.getAttribute('href');
        
        // Ако пътят на линка съвпада с текущия URL, добавяме активен клас
        if (currentUrl.endsWith(linkPath)) {
            link.classList.add('active');
            
            // Ако линкът е в dropdown меню, активираме и родителския линк
            const parentLi = link.closest('li').parentElement;
            if (parentLi && parentLi.tagName === 'UL') {
                const parentLink = parentLi.previousElementSibling;
                if (parentLink && parentLink.tagName === 'A') {
                    parentLink.classList.add('active');
                }
            }
        }
    });
}

// Инициализиране на всички функции при зареждане на страницата
document.addEventListener('DOMContentLoaded', function() {
    // Активиране на навигацията след зареждане на страницата
    // Ако страницата използва компоненти, навигацията ще се инициализира от common.js
    if (!document.getElementById('header-container')) {
        initActiveNavLinks();
        
        // Добавяме обработчик на събитие за бутона за мобилно меню
        const navToggle = document.querySelector('.nav-toggle');
        if (navToggle) {
            navToggle.addEventListener('click', function(e) {
                e.preventDefault();
                toggleMenu();
            });
        }
        
        // Функционалност за dropdown меню в главната страница
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle, nav ul li a[href="#program"]');
        dropdownToggles.forEach(dropdownToggle => {
            const parentLi = dropdownToggle.parentElement;
            
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                parentLi.classList.toggle('open');
                
                // Важно! Предотвратяваме затварянето на цялото мобилно меню при клик върху dropdown
                e.stopImmediatePropagation();
            });
        });
        
        // Автоматично затваряне на менюто при избор на линк извън dropdown
        document.querySelectorAll('nav ul li a').forEach(link => {
            if (!link.classList.contains('dropdown-toggle') && !link.closest('.dropdown-menu')) {
                link.addEventListener('click', function() {
                    const navMenu = document.querySelector('nav ul');
                    const toggleButton = document.querySelector('.nav-toggle');
                    navMenu.classList.remove('active');
                    toggleButton.classList.remove('active');
                });
            }
        });
    }
});