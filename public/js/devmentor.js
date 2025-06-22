document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    // Initialize all features
    initSlideshow();
    initAnimatedCounters();
    initSmoothScrolling();
    initScrollAnimations();
    
    // Enhanced Slideshow
    function initSlideshow() {
        let slideIndex = 0;
        const slides = document.getElementsByClassName("slide");
        if (!slides.length) return;
        const dots = document.getElementsByClassName("dot");
        
        function showSlides() {
            // Hide all slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                slides[i].classList.remove('active');
                if (dots[i]) dots[i].classList.remove('active');
            }
            
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}
            
            // Show current slide
            slides[slideIndex-1].style.display = "flex";
            slides[slideIndex-1].classList.add('active');
            if (dots[slideIndex-1]) dots[slideIndex-1].classList.add('active');
            
            setTimeout(showSlides, 5000); // Change every 5 seconds
        }
        
        showSlides();
    }
    
    // Animated Counter for Statistics
    function initAnimatedCounters() {
        console.log('initAnimatedCounters running');
        const counters = document.querySelectorAll('.stat-number');
        console.log('Counters found:', counters.length);
        counters.forEach(counter => {
            counter.textContent = '0';
            const target = +counter.getAttribute('data-target');
            const duration = 800; // ms
            const frameRate = 30; // ms
            const steps = Math.ceil(duration / frameRate);
            const increment = target / steps;
            let current = 0;
            let step = 0;
            const updateCounter = () => {
                if (step < steps) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    step++;
                    setTimeout(updateCounter, frameRate);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    }
    
    // Smooth Scrolling for Navigation
    function initSmoothScrolling() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"], button[onclick*="scrollToSection"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href') || this.getAttribute('onclick').match(/'([^']+)'/)[1];
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Scroll-triggered Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);
        
        // Observe all elements with data-aos attribute
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Global functions for HTML onclick handlers
    window.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // window.changeSlide = function(direction) {
    //     const slides = document.getElementsByClassName("slide");
    //     const dots = document.getElementsByClassName("dot");
    //     let currentSlide = 0;
        
    //     // Find current active slide
    //     for (let i = 0; i < slides.length; i++) {
    //         if (slides[i].classList.contains('active')) {
    //             currentSlide = i;
    //             break;
    //         }
    //     }
        
    //     // Hide current slide
    //     slides[currentSlide].style.display = "none";
    //     slides[currentSlide].classList.remove('active');
    //     if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
        
    //     // Calculate new slide index
    //     let newSlide = currentSlide + direction;
    //     if (newSlide >= slides.length) newSlide = 0;
    //     if (newSlide < 0) newSlide = slides.length - 1;
        
    //     // Show new slide
    //     slides[newSlide].style.display = "flex";
    //     slides[newSlide].classList.add('active');
    //     if (dots[newSlide]) dots[newSlide].classList.add('active');
    // };
    
    // window.currentSlide = function(n) {
    //     const slides = document.getElementsByClassName("slide");
    //     const dots = document.getElementsByClassName("dot");
        
    //     // Hide all slides
    //     for (let i = 0; i < slides.length; i++) {
    //         slides[i].style.display = "none";
    //         slides[i].classList.remove('active');
    //         if (dots[i]) dots[i].classList.remove('active');
    //     }
        
    //     // Show selected slide
    //     slides[n-1].style.display = "flex";
    //     slides[n-1].classList.add('active');
    //     if (dots[n-1]) dots[n-1].classList.add('active');
    // };
    
    // Add hover effects for interactive elements
    document.querySelectorAll('.goal-card, .audience-card, .benefit-item, .info-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects for buttons
    document.querySelectorAll('.btn-primary, .btn-secondary, .card-btn, .contact-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn-primary, .btn-secondary, .card-btn, .contact-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        const particles = document.querySelector('.particles-container');
        
        if (header && scrolled < header.offsetHeight) {
            const rate = scrolled * -0.5;
            header.style.transform = `translateY(${rate}px)`;
            
            if (particles) {
                particles.style.transform = `translateY(${rate * 0.3}px)`;
            }
        }
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add CSS for loading animation
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadingStyle);
});