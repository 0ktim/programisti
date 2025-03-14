const testimonials = [
    {
       text: "Избрах паралелката „Приложен програмист“, защото ми дава отлична основа за развитие след 12. клас. Най-много ми харесват предметите, свързани с писането на код и логиката на програмите. Научих основите на C#, работа с Git и развих логическо мислене, комуникация и постоянство. Ако имаш интерес към програмирането, не се страхувай от предизвикателствата – те ще те направят по-уверен и подготвен за бъдещето!",
        name: "Веселин Стоянов",
        class: "10. клас",
        image: "images/vesko.jpg"
    },
    {
        text: "Винаги съм се интересувала от програмиране и исках да уча нещо практично за бъдещето. Тук работим по реални проекти, а учителите са много мотивиращи и винаги готови да помогнат. Усвоих HTML, CSS и вече успешно пиша програми на C#. Тези умения ще ми помогнат много за бъдеща кариера в IT сферата. Ако обичате технологиите и искате да развиете реални умения – това е правилното място! ",
        name: "Десислава Христова",
        class: "9. клас",
        image: "images/desislava.jpg"
    },
    {
        text: "СУ „Йордан Йовков“ в Сливен е точното място за мен! Тук не само уча интересни неща, но и се включвам в клубове, състезания и всякакви яки събития! Атмосферата е страхотна, приятелска и има много възможности да се развивам. Обичам това училище, защото ми дава шанс да уча, да се забавлявам и да бъда част от нещо специално!",
        name: "Елизабет Димитрова",
        class: "8. клас",
        image: "images/elizabet.jpg"
    },
    {
        text: "Избрах тази паралелка, защото искам да се занимавам с програмиране в бъдеще. Най-много ми харесват специализираните предмети и преподаването на учителите, които ни подготвят за реалната среда. Досега съм се научил как да създавам сайтове, конзолни програми и приложения, което ми дава стабилна основа за кариера в IT сферата. Ако имате интерес към програмирането, кандидатствайте без колебание!",
        name: "Венцислав Колев",
        class: "10. клас",
        image: "images/venci.jpg"
    },
    {
        text: "Продължих обучението си тук, защото исках да се занимавам с нещо различно. В началото не бях сигурна, че компютрите ще ме привлекат, но с времето и благодарение на учителите, съучениците и различни занимания, осъзнах, че това е моето бъдеще. Сега знам, че искам да се развивам в тази сфера. Ако и ти имаш интерес към технологиите и искаш да учиш в среда, която ти дава нови възможности, тази паралелка е точно за теб!",
        name: "Габриела Стефанова",
        class: "10. клас",
        image: "images/gabriela.jpg"
    },
    {
        text: "От малък се интересувам от компютри, а програмирането ми дава възможност да създавам иновативни решения. Избрах паралелката „Приложен програмист“, за да се развивам в IT сферата и да получа добри основи за кариерата си. Най-много ми харесват предметите по програмиране, защото са практически ориентирани. За бъдещите ученици – ако имате интерес към програмирането, тази паралелка е отличен избор!",
        name: "Станимир Пенков",
        class: "9. клас",
        image: "images/stanimir.jpg"
    },
    {
        text: "Избрах паралелката „Приложен програмист“, защото обичам компютрите и исках да се науча да програмирам. Харесва ми да създавам неща и да виждам как работят. Научих се да пиша код, да решавам проблеми и да работя в екип – умения, които ще ми помогнат в бъдещата ми IT кариера. Ако имаш интерес към технологиите, тук ще научиш много и ще се забавляваш!",
        name: "Никола Георгиев",
        class: "10. клас",
        image: "images/nikola.jpg"
    },
    {
        name: "Даниел Константинов",
        class: "8. клас",
        text: "Паралелката „Приложен програмист“ е страхотен избор! Тук уча програмиране чрез практика и с помощта на страхотни учители. Усвоих основите на HTML, стилове и мобилни приложения – а съм само в 8. клас! На всички, които обмислят да кандидатстват, бих казал – не се страхувайте, дори да сте начинаещи! Тук ще учите, ще практикувате и ще бъдете сред хора със същите интереси.",
        image: "images/daniel.jpg"
    }
];

let currentSlide = 0;
const slidesContainer = document.getElementById('slides');
const dotsContainer = document.getElementById('dots');

// Добавяме променлива за брой на точките
let numberOfDots = 6; 

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
                <div class="testimonial-content">
                    <p class="author-name">${testimonial.name}</p>
                    <p class="author-class">${testimonial.class || ""}</p>
                    <p class="testimonial-text">${testimonial.text}</p>
                </div>
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
        currentSlide = 0; // Променено за да се върти в кръг
    }
    updateSlides();
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = testimonials.length - 3; // Променено за да се върти в кръг
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

