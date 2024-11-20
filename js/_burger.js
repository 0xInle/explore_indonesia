const burgerButton = document.querySelector('.header__burger');
const burgerBox = document.querySelector('.header__burger-box');
const closeButton = document.querySelector('.header__burger-btn');

function showBurger() {
  burgerBox.classList.add('active');
  
  setTimeout(() => closeButton.focus(), 300);
}

function hideBurger() {
  burgerBox.classList.remove('active');
  burgerButton.focus();
}

burgerButton.addEventListener('click', showBurger);
closeButton.addEventListener('click', hideBurger);