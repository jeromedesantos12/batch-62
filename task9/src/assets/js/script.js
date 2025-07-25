// 1. NAVBAR + SCROLL
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

// 2. VALIDASI
const name = document.querySelector(`#name`);
const startDate = document.querySelector(`#start`);
const endDate = document.querySelector(`#end`);
const desc = document.querySelector(`#desc`);
const tech = document.querySelectorAll(`input[name="tech"]`);
const img = document.querySelector(`#img`);
const submit = document.querySelector(`.submit`);
const projectNameERR = document.querySelector(`.name span`);
const dateERR = document.querySelector(`.date span`);
const descriptionERR = document.querySelector(`.desc span`);
const techERR = document.querySelector(`.tech span`);
const imgERR = document.querySelector(`.img span`);

// event validasi
name.addEventListener(`input`, nameValid);
startDate.addEventListener(`input`, dateValid);
endDate.addEventListener(`input`, dateValid);
desc.addEventListener(`input`, descriptionValid);
tech.forEach((tc) => tc.addEventListener(`click`, techValid));
img.addEventListener(`change`, () => {
  const file = img.files[0]; // isinya nama file, tipe dan ukuran dalam byte.
  if (imgValid(file)) {
    preview.classList.add(`active`);
    imgPreview(file);
  } else {
    img.value = ``;
    preview.src = ``;
    preview.classList.remove(`active`);
  }
});

function nameValid() {
  switch (true) {
    case !name.value:
      projectNameERR.innerText = `*Nama Project tidak boleh kosong!`;
      return false;
    case !/^[a-zA-Z\s]+$/.test(name.value):
      projectNameERR.innerText = `*Nama Project hanya boleh berisi huruf dan spasi!`;
      return false;
    case name.value.trim().length < 2:
      projectNameERR.innerText = `*Nama Project terlalu pendek!`;
      return false;
    case name.value.trim().length > 99:
      projectNameERR.innerText = `*Nama Project terlalu panjang!`;
      return false;
    default:
      projectNameERR.innerText = ``;
      return true;
  }
}

function dateValid() {
  switch (true) {
    case !startDate.value || !endDate.value:
      dateERR.innerText = `*Tanggal mulai dan/atau tanggal akhir belum dipilih.`;
      return false;
    case startDate.value > endDate.value:
      dateERR.innerText = `*Tanggal mulai tidak boleh lebih besar dari tanggal akhir.`;
      return false;
    case startDate.value === endDate.value:
      dateERR.innerText = `*Tanggal mulai dan tanggal akhir tidak boleh sama.`;
      return false;
    default:
      dateERR.innerText = ``;
      return true;
  }
}

function descriptionValid() {
  switch (true) {
    case desc.value.length === 0:
      descriptionERR.innerText = `*Deskripsi tidak boleh kosong.`;
      return false;
    case desc.value.length < 10:
      descriptionERR.innerText = `*Deskripsi harus minimal 10 karakter.`;
      return false;
    case desc.value.length > 2000:
      descriptionERR.innerText = `*Deskripsi tidak boleh lebih dari 2000 karakter.`;
      return false;
    default:
      descriptionERR.innerText = ``;
      return true;
  }
}

function techValid() {
  // buat array baru isinya cuma yang udah di ceklis
  const checkedTechs = Array.from(tech)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  switch (true) {
    case checkedTechs.length === 0:
      techERR.innerText = `*Pilih minimal satu teknologi.`;
      return false;
    case checkedTechs.length > 2:
      techERR.innerText = `*Maksimal 2 teknologi boleh dipilih.`;
      return false;
    default:
      techERR.innerText = ``;
      return true;
  }
}

function imgValid(file) {
  switch (true) {
    case !file:
      if (editForm.checked) {
        return true;
      } else {
        imgERR.innerText = `*Gambar belum dipilih.`;
        return false;
      }
    case ![`image/jpeg`, `image/png`, `image/webp`].includes(file.type):
      imgERR.innerText = `*Format gambar harus JPG, PNG, atau WEBP.`;
      return false;
    case file.size > 2 * 1024 * 1024:
      imgERR.innerText = `*Ukuran gambar tidak boleh lebih dari 2MB.`;
      return false;
    default:
      imgERR.innerText = ``;
      return true;
  }
}

function imgPreview(file) {
  preview.classList.add(`active`);
  const reader = new FileReader(); // membaca file secara lokal di browser

  // event handler yang dijalankan setelah file selesai dibaca
  reader.onload = () => (preview.src = reader.result); // hasil pembacaan berupa Base64 Data URL
  reader.readAsDataURL(file); // fungsi dijalankan
}
