document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.activity-section');
    
    
    function checkElementsVisibility() {
        sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            const isVisible = (rect.top <= windowHeight * 0.90) && (rect.bottom >= windowHeight * 0.20);
            
            if (isVisible) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }
    
    checkElementsVisibility();
    
    let scrollTimer;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(checkElementsVisibility, 10);
    });
    
    const carouselSections = document.querySelectorAll('.activity-image');
    
    carouselSections.forEach(function(carousel) {
        const images = carousel.querySelectorAll('img');
        if (images.length <= 1) return; 
        
        let currentSlide = 0;
        
        images.forEach((img, i) => {
            img.style.display = i === 0 ? 'block' : 'none';
            img.classList.add('carousel-image');
        });
        
        function nextSlide() {
            images[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % images.length;
            images[currentSlide].style.display = 'block';
            images[currentSlide].classList.add('fade');

            setTimeout(() => {
                images[currentSlide].classList.remove('fade');
            }, 1500);
        }
        setInterval(nextSlide, 3000);
    });
    
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    let currentSectionIndex = 0;
    const learnMoreButton = document.querySelector('.hero-button');
    
    if (learnMoreButton && sections.length > 0) {
        learnMoreButton.addEventListener('click', function() {
            const targetSection = sections[currentSectionIndex];
            
            const offset = 100;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            currentSectionIndex = (currentSectionIndex + 1) % sections.length;
        });
    }
});

// FAQ функционалност
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Затваряме всички останали елементи
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Отваряме/затваряме текущия елемент
            item.classList.toggle('active');
            
            // Добавяме анимация при отваряне
            if (item.classList.contains('active')) {
                const answer = item.querySelector('.faq-answer');
                answer.style.opacity = '0';
                setTimeout(() => {
                    answer.style.opacity = '1';
                }, 10);
            }
        });
    });
    
    // Анимация за поява на FAQ елементите при скролване
    const faqSection = document.querySelector('.faq-section');
    const faqContainer = document.querySelector('.faq-container');
    
    const options = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let delay = 0;
                const items = faqContainer.querySelectorAll('.faq-item');
                items.forEach(item => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }, delay);
                    delay += 150;
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    if (faqSection) {
        observer.observe(faqSection);
    }
});