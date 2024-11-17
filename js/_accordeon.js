document.querySelector('.getting__btn').addEventListener('click', function() {
  const hiddenItem = document.querySelector('.getting__item--4');
  const thirdItem = document.querySelector('.getting__item--3');

  hiddenItem.classList.remove('getting__item-hidden');
  hiddenItem.classList.add('show');
  thirdItem.classList.add('show-line');
  this.style.display = 'none';
});