const testimonials = [
    {
        text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
        name: "Веселин Стоянов",
        image: "images/firstPageImages/image.png"
    },
    {
        text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
        name: "Венцислав Колев",
        image: "images/firstPageImages/men.png"
    },
    {
        text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
        name: "Павел Караганев",
        image: "images/firstPageImages/image.png"
    },
    {
        text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
        name: "Габриела Стефанова",
        image: "images/firstPageImages/image.png"
    },
    {
        text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
        name: "Божидара Симеонова",
        image: "images/firstPageImages/men.png"
    },
    {
        text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
        name: "Гергана Пенева",
        image: "images/firstPageImages/men.png"
    },
    {
        text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
        name: "Гергана Пенева",
        image: "images/firstPageImages/image.png"
    }
];

let currentSlide = 0;
const slidesContainer = document.getElementById('slides');
const dotsContainer = document.getElementById('dots');

// Добавяме променлива за брой на точките
let numberOfDots = 5; // Можеш да промениш броя на точките тук

function createStarRating(rating) {
    return Array(rating).fill().map(() => 
        `<svg class="star" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>`).join('');
}

function createSlide(testimonial) {
    return `
        <div class="slide">
            <div class="testimonial-card">
                <div class="profile-container">
                    <div class="profile-glow"></div>
                    <div class="profile-border">
                        <div class="profile-inner">
                            <img src="${testimonial.image}" alt="" class="profile-image">
                        </div>
                    </div>
                </div>
                <div class="quote-mark">"</div>
                <p class="testimonial-text">${testimonial.text}</p>
                <p class="author-name">${testimonial.name}</p>
            </div>
        </div>
    `;
}

function createDots() {
    return Array(numberOfDots).fill().map((_, index) => {
        return `<div class="dot" data-index="${index}"></div>`;
    }).join('');
}

function updateSlides() {
    slidesContainer.style.transform = `translateX(-${currentSlide * 33.33}%)`;
    updateActiveDot();
}

function updateActiveDot() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    if (currentSlide < testimonials.length - 3) {
        currentSlide++;
    } else {
        currentSlide = testimonials.length - 3;
    }
    updateSlides();
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = 0;
    }
    updateSlides();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlides();
}

// Инициализация на слайдера
slidesContainer.innerHTML = testimonials.map(testimonial => 
    createSlide(testimonial)
).join('');
dotsContainer.innerHTML = createDots();

// Добавяне на event listeners
document.querySelector('.prev-button').addEventListener('click', prevSlide);
document.querySelector('.next-button').addEventListener('click', nextSlide);

document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
        goToSlide(parseInt(e.target.getAttribute('data-index')));
    });
});