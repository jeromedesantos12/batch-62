const toggleMenu = document.querySelector(`.menu-toggle`);
const miniMenu = document.querySelector(`.menu-mini`);

toggleMenu.addEventListener(`click`, () => {
  console.log(`Jalan`);
  miniMenu.classList.toggle(`active`);
});
