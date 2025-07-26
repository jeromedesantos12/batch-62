const toggleMenu = document.querySelector(`.menu-toggle`);
const toggleAnimate = document.querySelectorAll(`.menu-toggle span`);
const miniMenu = document.querySelector(`.menu-mini`);
const upElement = document.querySelector(`.add`);
const header = document.querySelector(`#header`);
const dropDown = document.querySelector(`#dropDown`);
const cards = document.querySelectorAll(`.cards`);
const editButton = document.querySelectorAll(`.edit`);
const deleteButton = document.querySelectorAll(`.delete`);

// event
toggleMenu.addEventListener(`click`, toggle);
upElement.addEventListener(`click`, up);
if (cards) {
  cards.forEach((btn) => btn.addEventListener(`click`, detailProject));
  editButton.forEach((btn) => btn.addEventListener(`click`, editProject));
  deleteButton.forEach((btn) => btn.addEventListener(`click`, deleteProject));
}

function detailProject(e) {
  const no = e.currentTarget.dataset.index;
  console.log("no", no);
  window.location.href = `/detail/${no}`;
}

function editProject(e) {
  e.stopPropagation();
  const no = e.currentTarget.dataset.index;
  window.location.href = `/edit/${no}`;
}

function deleteProject(e) {
  e.stopPropagation();
  const confirmDelete = confirm(`Yakin mau hapus Project?`);
  if (!confirmDelete) e.preventDefault();
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
