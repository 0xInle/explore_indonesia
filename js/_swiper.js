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
const slides = document.querySelectorAll('.reserv__slide');
const dots = document.querySelectorAll('.reserv__dot');

let currentSlide = 0;
const slideWidth = 440; // ширина одного слайда включая gap
const totalSlides = slides.length;

function updateSlider(index, instant = false) {
    // Смещение к началу (перевести на первый слайд после последнего)
    if (index === totalSlides) {
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = 'translateX(0px)';
        currentSlide = 0;
        setTimeout(() => updateSlider(currentSlide), 20); // Сначала обновляем без анимации
    } 
    // Смещение к концу (перевести на последний слайд после первого)
    else if (index === -1) {
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(${-slideWidth * (totalSlides - 1)}px)`;
        currentSlide = totalSlides - 1;
        setTimeout(() => updateSlider(currentSlide), 20);
    } 
    // Обычное обновление для центральных слайдов
    else {
        const offset = -index * slideWidth;
        slidesContainer.style.transition = instant ? 'none' : 'transform 0.5s ease-in-out';
        slidesContainer.style.transform = `translateX(${offset}px)`;

        // Обновляем индикаторы
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index % totalSlides].classList.add('active');
    }
}

// Переход к следующему слайду
function moveToNextSlide() {
    currentSlide++;
    updateSlider(currentSlide);
}

// Переход к предыдущему слайду
function moveToPrevSlide() {
    currentSlide--;
    updateSlider(currentSlide);
}

// Слушатели для клавиш
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') moveToNextSlide();
    if (event.key === 'ArrowLeft') moveToPrevSlide();
});

// Навигация по индикаторам
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider(currentSlide);
    });
});

// Инициализация слайдера
updateSlider(currentSlide);