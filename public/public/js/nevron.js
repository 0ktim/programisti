document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('network');
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero');
    
    // Настройки
    let particlesArray = [];
    const numberOfParticles = 200;
    let mouseX = undefined;
    let mouseY = undefined;
    let mouseRadius = 200;
    
    // Функция за настройка на размера на канваса
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    // Обработка на движението на мишката
    heroSection.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    heroSection.addEventListener('mouseleave', function() {
        mouseX = undefined;
        mouseY = undefined;
    });
    
    // Обработка на промяната на размера на прозореца
    window.addEventListener('resize', function() {
        resizeCanvas();
        init();
    });
    
    // Клас за частиците
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 6 + 0.5;
            this.speedX = Math.random() * 1.5 - 1;
            this.speedY = Math.random() * 1.5 - 1;
            this.color = 'rgba(255, 255, 255, 0.8)';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
            if (mouseX !== undefined && mouseY !== undefined) {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouseRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouseRadius - distance) / mouseRadius;
                    this.speedX -= Math.cos(angle) * force * 0.7;
                    this.speedY -= Math.sin(angle) * force * 0.7;
                }
            }
            const maxSpeed = 2;
            this.speedX = Math.max(Math.min(this.speedX, maxSpeed), -maxSpeed);
            this.speedY = Math.max(Math.min(this.speedY, maxSpeed), -maxSpeed);
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function connectParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    const opacity = 1 - distance / 200;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    init();
    animate();
  });

