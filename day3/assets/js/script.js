const toggleMenu = document.querySelector(`.menu-toggle`);
const miniMenu = document.querySelector(`.menu-mini`);

toggleMenu.addEventListener(`click`, () => {
  miniMenu.classList.toggle(`active`);
});
