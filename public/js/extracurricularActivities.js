
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
   