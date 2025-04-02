document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.activity-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.35
      };
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                   entry.target.classList.add('visible');
              } else {
                  entry.target.classList.remove('visible');
              }
          });
      }, observerOptions);
      
      sections.forEach(section => {
          observer.observe(section);
      });
      });

document.addEventListener('DOMContentLoaded', function() {
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }
    
    const sections = document.querySelectorAll('.activity-section');
    
    function checkVisibility() {
        sections.forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('visible');
            }
        });
    }

    function checkVisibility() {
        sections2.forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('visible');
            }
        });
    }

    function checkVisibility() {
        sections3.forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('visible');
            }
        });
    }

    checkVisibility();
    
    window.addEventListener('scroll', checkVisibility);
    
    
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
  document.addEventListener('DOMContentLoaded', function() {
    
    const carouselSections = document.querySelectorAll('.activity-image');
    
    carouselSections.forEach(function(carousel, index) {

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
  });
  
let currentSectionIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    const learnMoreButton = document.querySelector('.hero-button');
    const sections = document.querySelectorAll('.activity-section');
    
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