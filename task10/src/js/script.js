// Hamburger
const hamburger = document.querySelector(`#hamburger`);
const navMenu = document.querySelector(`#nav-menu`);
const home = document.querySelector(`#home`);
const toTop = document.querySelector(`#to-top`);

hamburger.addEventListener(`click`, () => {
  hamburger.classList.toggle(`hamburger-active`);
  navMenu.classList.toggle(`hidden`);
});

window.addEventListener(`click`, (e) => {
  if (e.target !== hamburger && e.target !== navMenu) {
    hamburger.classList.remove(`hamburger-active`);
    navMenu.classList.add(`hidden`);
  }
});

window.onscroll = () => {
  if (window.pageYOffset > home.offsetTop) {
    toTop.classList.remove(`invisible`);
    toTop.classList.remove(`opacity-0`);
  } else {
    toTop.classList.add(`invisible`);
    toTop.classList.add(`opacity-0`);
  }
};
