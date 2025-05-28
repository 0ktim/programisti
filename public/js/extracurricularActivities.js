document.addEventListener('DOMContentLoaded', function() {
  function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
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

  sections.forEach(section => {
      const image = section.querySelector('.activity-image');
      const title = section.querySelector('.activity-title');
      
      section.addEventListener('mousemove', function(e) {
          if (window.innerWidth <= 768) return;
          
          const rect = section.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const offsetX = (mouseX - centerX) / centerX * 5;
          const offsetY = (mouseY - centerY) / centerY * 5;
          
          image.style.transform = `perspective(1000px) rotateY(${-offsetX}deg) rotateX(${offsetY}deg) scale(1.02)`;
          title.style.textShadow = `${offsetX * 0.5}px ${offsetY * 0.5}px 10px rgba(116, 79, 255, 0.5)`;
      });
      
      section.addEventListener('mouseleave', function() {
          if (window.innerWidth <= 768) return;
          
          if (section.matches(':nth-child(even)')) {
              image.style.transform = 'perspective(1000px) rotateY(5deg)';
          } else {
              image.style.transform = 'perspective(1000px) rotateY(-5deg)';
          }
          
          title.style.textShadow = '';
      });
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
   