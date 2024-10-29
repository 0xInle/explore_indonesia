const swiper = new Swiper('.swiper', {
    loop: true,
    parallax: true,
    speed: 1000,
    keyboard: {
        enabled: true
    },

    pagination: {
        el: '.header__counter-count',
        type: 'fraction'
    },

    navigation: {
        nextEl: '#headerNext',
        prevEl: '#headerPrev',
    },

    scrollbar: {
        el: '.header__scrollbar',
    },
});

// const slides = document.querySelectorAll('.reserv__slide');
// const dots = document.querySelectorAll('.reserv__dot');
// let currentSlide = 0;
// let isDragging = false;
// let startPos = 0;
// let currentTranslate = 0;
// let prevTranslate = 0;
// let animationID = 0;
// const slider = document.querySelector('.reserv__slider');

// function updateSlider(index) {
//     const slideWidth = slides[0].clientWidth;
//     currentTranslate = -index * slideWidth;
//     document.querySelector('.reserv__slides').style.transform = `translateX(${currentTranslate}px)`;

//     dots.forEach(dot => dot.classList.remove('active'));
//     dots[index].classList.add('active');
// }

// dots.forEach((dot, index) => {
//     dot.addEventListener('click', () => {
//         currentSlide = index;
//         updateSlider(index);
//     });
// });

// document.addEventListener('keydown', (event) => {
//     if (event.key === 'ArrowRight') {
//         currentSlide = (currentSlide + 1) % slides.length;
//     } else if (event.key === 'ArrowLeft') {
//         currentSlide = (currentSlide - 1 + slides.length) % slides.length;
//     }
//     updateSlider(currentSlide);
// });

// slider.addEventListener('mousedown', startDrag);
// slider.addEventListener('touchstart', startDrag);

// slider.addEventListener('mouseup', endDrag);
// slider.addEventListener('touchend', endDrag);

// slider.addEventListener('mousemove', drag);
// slider.addEventListener('touchmove', drag);

// function startDrag(event) {
//     isDragging = true;
//     startPos = getPositionX(event);
//     prevTranslate = currentTranslate;
//     animationID = requestAnimationFrame(animation);
// }

// function drag(event) {
//     if (isDragging) {
//         const currentPosition = getPositionX(event);
//         const movement = currentPosition - startPos;
//         currentTranslate = prevTranslate + movement;
//     }
// }

// function endDrag() {
//     isDragging = false;
//     cancelAnimationFrame(animationID);

//     const movedBy = currentTranslate - prevTranslate;

//     if (movedBy < -100 && currentSlide < slides.length - 1) {
//         currentSlide++;
//     } else if (movedBy > 100 && currentSlide > 0) {
//         currentSlide--;
//     }

//     updateSlider(currentSlide);
// }

// function getPositionX(event) {
//     return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
// }

// function animation() {
//     document.querySelector('.reserv__slides').style.transform = `translateX(${currentTranslate}px)`;
//     if (isDragging) requestAnimationFrame(animation);
// }

// updateSlider(currentSlide);

const slidesContainer = document.querySelector('.reserv__slides');
const slides = Array.from(document.querySelectorAll('.reserv__slide'));
const dots = document.querySelectorAll('.reserv__dot');

const slideWidth = 440; // ширина одного слайда включая gap
const visibleSlides = 3; // количество отображаемых слайдов
let currentSlide = visibleSlides; // Начинаем со смещением на клоны
const totalSlides = slides.length;
let isTransitioning = false; // Блокировка перехода

// Создаем клоны первых и последних слайдов
const clonesBefore = slides.slice(-visibleSlides).map(slide => slide.cloneNode(true));
const clonesAfter = slides.slice(0, visibleSlides).map(slide => slide.cloneNode(true));

// Добавляем клоны в начало и конец контейнера
clonesBefore.forEach(clone => slidesContainer.prepend(clone));
clonesAfter.forEach(clone => slidesContainer.append(clone));

// Обновляем общее количество слайдов с учетом клонов
const allSlides = document.querySelectorAll('.reserv__slide');
const totalSlidesWithClones = allSlides.length;

function updateSlider(index, instant = false) {
    const offset = -index * slideWidth;
    slidesContainer.style.transition = instant ? 'none' : 'transform 0.5s ease-in-out';
    slidesContainer.style.transform = `translateX(${offset}px)`;

    // Обновляем индикаторы
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index % totalSlides].classList.add('active');
}

function checkLoop() {
    if (currentSlide >= totalSlides + visibleSlides) {
        currentSlide = visibleSlides;
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    } else if (currentSlide < visibleSlides) {
        currentSlide = totalSlides;
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    }
    setTimeout(() => (isTransitioning = false), 20); // Снимаем блокировку после проверки
}

// Переход к следующему слайду
function moveToNextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide++;
    updateSlider(currentSlide);
    setTimeout(checkLoop, 500); // Добавляем небольшую задержку перед проверкой
}

// Переход к предыдущему слайду
function moveToPrevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide--;
    updateSlider(currentSlide);
    setTimeout(checkLoop, 500); // Добавляем небольшую задержку перед проверкой
}

// Слушатели для клавиш
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') moveToNextSlide();
    if (event.key === 'ArrowLeft') moveToPrevSlide();
});

// Навигация по индикаторам
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlide = index + visibleSlides;
        updateSlider(currentSlide);
        setTimeout(() => (isTransitioning = false), 500); // Снимаем блокировку после анимации
    });
});

// Инициализация слайдера
updateSlider(currentSlide, true); // Переход без анимации на начальные слайды