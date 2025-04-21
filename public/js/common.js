// Общи компоненти за всички страници (header и footer)

// Глобална дефиниция на toggleMenu функцията - за да е достъпна на всички страници
window.toggleMenu = function() {
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
};

document.addEventListener('DOMContentLoaded', function() {
    // Определяме пътя до компонентите в зависимост от текущата директория
    const isInSubfolder = window.location.pathname.includes('/html/');
    const componentsPath = isInSubfolder ? '../components/' : 'components/';
    
    // Зареждане на общи компоненти
    loadComponent('header-container', componentsPath + 'header.html')
        .then(() => {
            // След зареждане на хедъра можем да инициализираме навигацията
            if (typeof initActiveNavLinks === 'function') {
                initActiveNavLinks();
            }

            // Обработка на бутона за мобилно меню на всички страници
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle) {
                // Премахваме inline onclick събитието, ако съществува
                navToggle.removeAttribute('onclick');
                
                // Добавяме нов слушател за събитие
                navToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.toggleMenu();
                });
            }

            // Възстановяваме функционалността на dropdown менюто
            const dropdownToggles = document.querySelectorAll('.dropdown-toggle, nav ul li a[href="#program"]');
            dropdownToggles.forEach(dropdownToggle => {
                const parentLi = dropdownToggle.parentElement;
                const dropdownMenu = parentLi.querySelector('ul');
                
                if (dropdownToggle && dropdownMenu) {
                    // Премахваме всички съществуващи слушатели
                    const newToggle = dropdownToggle.cloneNode(true);
                    dropdownToggle.parentNode.replaceChild(newToggle, dropdownToggle);
                    
                    // Добавяме нов слушател
                    newToggle.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Това е ключова промяна - в мобилен изглед не затваряме цялото меню
                        // а само показваме/скриваме подменюто
                        parentLi.classList.toggle('open');
                        
                        // Спираме разпространението на събитието нагоре
                        // за да не се затвори мобилното меню
                        e.stopImmediatePropagation();
                    });
                }
            });
            
            // Автоматично затваряме менюто само когато се кликне на линк извън dropdown
            document.querySelectorAll('nav ul li a').forEach(link => {
                if (!link.classList.contains('dropdown-toggle') && !link.closest('.dropdown-menu')) {
                    link.addEventListener('click', function() {
                        const navMenu = document.querySelector('nav ul');
                        const toggleButton = document.querySelector('.nav-toggle');
                        if (navMenu && toggleButton) {
                            navMenu.classList.remove('active');
                            toggleButton.classList.remove('active');
                        }
                    });
                }
            });
            
            // Отделно обработваме линковете ВЪТРЕ в dropdown менюто
            document.querySelectorAll('.dropdown-menu a').forEach(subLink => {
                subLink.addEventListener('click', function() {
                    // При клик върху линк в подменюто затваряме цялото мобилно меню
                    const navMenu = document.querySelector('nav ul');
                    const toggleButton = document.querySelector('.nav-toggle');
                    if (navMenu && toggleButton) {
                        navMenu.classList.remove('active');
                        toggleButton.classList.remove('active');
                    }
                });
            });
        });
    
    loadComponent('footer-container', componentsPath + 'footer.html');
});

// Функция за асинхронно зареждане на HTML компоненти
async function loadComponent(containerId, componentPath) {
    const container = document.getElementById(containerId);
    if (!container) return Promise.resolve();
    
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Неуспешно зареждане: ${response.status} ${response.statusText}`);
        }
        
        const html = await response.text();
        container.innerHTML = html;
        
        // Изпълнява скриптове вътре в заредения компонент (ако има такива)
        container.querySelectorAll('script').forEach(oldScript => {
            const newScript = document.createElement('script');
            
            // Проверяваме дали oldScript има атрибути преди да ги обхождаме
            if (oldScript.attributes && oldScript.attributes.length > 0) {
                Array.from(oldScript.attributes).forEach(attr => {
                    // Проверяваме дали атрибутът е валиден
                    if (attr && attr.name) {
                        newScript.setAttribute(attr.name, attr.value || '');
                    }
                });
            }
            
            // Копираме съдържанието на скрипта, ако има такова
            if (oldScript.textContent) {
                newScript.textContent = oldScript.textContent;
            }
            
            // Заменяме стария скрипт с новия само ако родителският възел съществува
            if (oldScript.parentNode) {
                oldScript.parentNode.replaceChild(newScript, oldScript);
            }
        });
        
        return Promise.resolve();
    } catch (error) {
        console.error(`Грешка при зареждане на компонента ${componentPath}:`, error);
        return Promise.reject(error);
    }
} 