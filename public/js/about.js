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

    checkVisibility();
    
    window.addEventListener('scroll', checkVisibility);
    
    sections.forEach((section, index) => {
        section.setAttribute('data-section', (index + 1).toString());
    });
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
    // Get all carousel sections
    const carouselSections = document.querySelectorAll('.activity-image');
    
    // Initialize each carousel
    carouselSections.forEach(function(carousel, index) {
      // Get all images in this carousel
      const images = carousel.querySelectorAll('img');
      if (images.length <= 1) return; // Skip if only one or no images
      
      // Set up the initial state
      let currentSlide = 0;
      
      // Hide all images except the first one
      images.forEach((img, i) => {
        img.style.display = i === 0 ? 'block' : 'none';
        img.classList.add('carousel-image'); // Ensure consistent class
      });
      
      // Function to show the next slide
      function nextSlide() {
        images[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + 1) % images.length;
        images[currentSlide].style.display = 'block';
        images[currentSlide].classList.add('fade');
        
        // Remove the fade class after animation completes
        setTimeout(() => {
          images[currentSlide].classList.remove('fade');
        }, 1500);
      }
      
      // Start the slideshow
      setInterval(nextSlide, 3000);
    });
  });
