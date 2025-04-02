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