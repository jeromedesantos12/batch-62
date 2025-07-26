const toggleMenu = document.querySelector(`.menu-toggle`);
const toggleAnimate = document.querySelectorAll(`.menu-toggle span`);
const miniMenu = document.querySelector(`.menu-mini`);
const upElement = document.querySelector(`.add`);
const header = document.querySelector(`#header`);
const dropDown = document.querySelector(`#dropDown`);
const editButton = document.querySelectorAll(`.edit`);

// event
toggleMenu.addEventListener(`click`, toggle);
upElement.addEventListener(`click`, up);
if (editButton)
  editButton.forEach((btn) => btn.addEventListener(`click`, editMethod));

function editMethod(e) {
  const no = e.target.dataset.index;
  window.location.href = `/edit/${no}`;
}

function toggle() {
  miniMenu.classList.toggle(`active`);
  toggleAnimate.forEach((toggle) => toggle.classList.toggle(`active`));
}

function up() {
  header.scrollIntoView({ behavior: "smooth" });
  history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );
}

const observer = new IntersectionObserver((entries) =>
  // buat scroll button -> cari isIntersecting (kondisinya true-false) dari array entries
  entries.forEach((entry) =>
    !entry.isIntersecting
      ? upElement.classList.add(`active`)
      : upElement.classList.remove(`active`)
  )
);
observer.observe(header); // focus ke header
