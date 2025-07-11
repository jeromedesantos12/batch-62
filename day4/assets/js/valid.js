// ambil input
const form = document.querySelector(`.container form`);
const name = document.querySelector(`#name`);
const startDate = document.querySelector(`#startDate`);
const endDate = document.querySelector(`#endDate`);
const desc = document.querySelector(`#desc`);
const tech = document.querySelectorAll(`input[name="tech"]`);
const image = document.querySelector(`#image`);
const submit = document.querySelector(`.submit`);

// ambil span
const projectNameERR = document.querySelector(`.name span`);
const dateERR = document.querySelector(`.date span`);
const descriptionERR = document.querySelector(`.desc span`);
const techERR = document.querySelector(`.tech span`);
const imageERR = document.querySelector(`.image span`);

// event validasi
name.addEventListener(`input`, nameValid);
startDate.addEventListener(`input`, dateValid);
endDate.addEventListener(`input`, dateValid);
desc.addEventListener(`input`, descriptionValid);
tech.forEach((tc) => tc.addEventListener(`click`, techValid));
image.addEventListener(`change`, imageValid);

// validasi nama
function nameValid() {
  switch (true) {
    case !name.value:
      projectNameERR.innerText = `*Nama Project tidak boleh kosong!`;
      break;
    case !/^[a-zA-Z\s]+$/.test(name.value):
      projectNameERR.innerText = `*Nama Project hanya boleh berisi huruf dan spasi!`;
      break;
    case name.value.trim().length < 2:
      projectNameERR.innerText = `*Nama Project terlalu pendek!`;
      break;
    default:
      projectNameERR.innerText = ``;
  }
}

// validasi tanggal
function dateValid() {
  switch (true) {
    case !startDate.value || !endDate.value:
      dateERR.innerText = `*Tanggal mulai dan/atau tanggal akhir belum dipilih.`;
      break;
    case startDate.value > endDate.value:
      dateERR.innerText = `*Tanggal mulai tidak boleh lebih besar dari tanggal akhir.`;
      break;
    case startDate.value === endDate.value:
      dateERR.innerText = `*Tanggal mulai dan tanggal akhir tidak boleh sama.`;
      break;
    default:
      dateERR.innerText = ``;
  }
}

// validasi textarea
function descriptionValid() {
  switch (true) {
    case desc.value.length === 0:
      descriptionERR.innerText = `*Deskripsi tidak boleh kosong.`;
      break;
    case desc.value.length < 10:
      descriptionERR.innerText = `*Deskripsi harus minimal 10 karakter.`;
      break;
    case desc.value.length > 2000:
      descriptionERR.innerText = `*Deskripsi tidak boleh lebih dari 2000 karakter.`;
      break;
    default:
      descriptionERR.innerText = ``;
  }
}

// validasi checkbox
function techValid() {
  // buat array baru isinya cuma yang udah di ceklis
  const checkedTechs = Array.from(tech)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  switch (true) {
    case checkedTechs.length === 0:
      techERR.innerText = `*Pilih minimal satu teknologi.`;
      break;
    case checkedTechs.length > 2:
      techERR.innerText = `*Maksimal 2 teknologi boleh dipilih.`;
      break;
    default:
      techERR.innerText = ``;
  }
}

// validasi gambar
function imageValid() {
  const file = image.files[0];
  switch (true) {
    case !file:
      imageERR.innerText = `*Gambar belum dipilih.`;
      break;
    case ![`image/jpeg`, `image/png`, `image/webp`].includes(file.type):
      imageERR.innerText = `*Format gambar harus JPG, PNG, atau WEBP.`;
      break;
    case file.size > 2 * 1024 * 1024:
      imageERR.innerText = `*Ukuran gambar tidak boleh lebih dari 2MB.`;
      break;
    default:
      imageERR.innerText = ``;
  }
}
