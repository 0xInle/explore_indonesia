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

const slidesContainer = document.querySelector('.reserv__slides');
const slides = Array.from(document.querySelectorAll('.reserv__slide'));
const dots = document.querySelectorAll('.reserv__dot');

const slideWidth = 440;
const visibleSlides = 3;
let currentSlide = visibleSlides;
const totalSlides = slides.length;
let isTransitioning = false;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

const clonesBefore = slides.slice(-visibleSlides).map(slide => slide.cloneNode(true));
const clonesAfter = slides.slice(0, visibleSlides).map(slide => slide.cloneNode(true));

clonesBefore.forEach(clone => slidesContainer.prepend(clone));
clonesAfter.forEach(clone => slidesContainer.append(clone));

const allSlides = document.querySelectorAll('.reserv__slide');
const totalSlidesWithClones = allSlides.length;

function updateSlider(index, instant = false) {
    const offset = -index * slideWidth;
    slidesContainer.style.transition = instant ? 'none' : 'transform 0.5s ease-in-out';
    slidesContainer.style.transform = `translateX(${offset}px)`;

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
    setTimeout(() => (isTransitioning = false), 20);
}

function moveToNextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide++;
    updateSlider(currentSlide);
    setTimeout(checkLoop, 500);
}

function moveToPrevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide--;
    updateSlider(currentSlide);
    setTimeout(checkLoop, 500);
}

slidesContainer.addEventListener('mousedown', (event) => {
    if (isTransitioning) return;
    isDragging = true;
    startPos = event.pageX;
    prevTranslate = -currentSlide * slideWidth;
    slidesContainer.style.transition = 'none';
});

slidesContainer.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    const currentPos = event.pageX;
    currentTranslate = prevTranslate + (currentPos - startPos);
    slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
});

slidesContainer.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -slideWidth / 4) moveToNextSlide();
    else if (movedBy > slideWidth / 4) moveToPrevSlide();
    else updateSlider(currentSlide);

    slidesContainer.style.transition = 'transform 0.5s ease-in-out';
});

slidesContainer.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        updateSlider(currentSlide);
    }
});

slidesContainer.addEventListener('touchstart', (event) => {
    if (isTransitioning) return;
    isDragging = true;
    startPos = event.touches[0].clientX;
    prevTranslate = -currentSlide * slideWidth;
    slidesContainer.style.transition = 'none';
});

slidesContainer.addEventListener('touchmove', (event) => {
    if (!isDragging) return;
    const currentPos = event.touches[0].clientX;
    currentTranslate = prevTranslate + (currentPos - startPos);
    slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
});

slidesContainer.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -slideWidth / 4) moveToNextSlide();
    else if (movedBy > slideWidth / 4) moveToPrevSlide();
    else updateSlider(currentSlide);

    slidesContainer.style.transition = 'transform 0.5s ease-in-out';
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') moveToNextSlide();
    if (event.key === 'ArrowLeft') moveToPrevSlide();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlide = index + visibleSlides;
        updateSlider(currentSlide);
        setTimeout(() => (isTransitioning = false), 500);
    });
});

updateSlider(currentSlide, true);