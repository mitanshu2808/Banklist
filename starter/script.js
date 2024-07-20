'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const header=document.querySelector('.header');
const message=document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML='We will use cookies <button class="btn" id="oh">Got it!<button>';
message.style.borderRadius='10px';
header.prepend(message);
// header.after(message);
const oh=document.querySelector("#oh");
oh.addEventListener('click',function(){
  message.remove();
})
header.append(message.cloneNode(true));
console.log(getComputedStyle(header).height);