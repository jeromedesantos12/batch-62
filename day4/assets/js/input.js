// ambil input
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
submit.addEventListener(`click`, (e) => {
  e.preventDefault();
  handleSubmit();
});

// fungsi validasi
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
function descriptionValid() {
  switch (true) {
    case desc.value.length === 0:
      descriptionERR.innerText = `*Deskripsi tidak boleh kosong.`;
      break;
    case desc.value.length < 10:
      descriptionERR.innerText = `*Deskripsi harus minimal 10 karakter.`;
      break;
    case desc.value.length > 200:
      descriptionERR.innerText = `*Deskripsi tidak boleh lebih dari 200 karakter.`;
      break;
    default:
      descriptionERR.innerText = ``;
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
      break;
    case checkedTechs.length > 2:
      techERR.innerText = `*Maksimal 2 teknologi boleh dipilih.`;
      break;
    default:
      techERR.innerText = ``;
  }
}
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

function handleSubmit() {
  // Jalankan semua validasi
  nameValid();
  dateValid();
  descriptionValid();
  techValid();
  imageValid();

  switch (true) {
    // Cek apakah ada pesan Error pada setiap input
    case !!projectNameERR.innerText:
    case !!dateERR.innerText:
    case !!descriptionERR.innerText:
    case !!techERR.innerText:
    case !!imageERR.innerText:
      alert(`Form tidak valid, periksa kembali input!`);
      break;

    default:
      // Ambil daftar teknologi yang dicentang oleh pengguna
      const checkedTechs = Array.from(tech)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value);

      // Ambil file gambar dari input
      const file = image.files[0];
      const reader = new FileReader();

      // Setelah gambar dibaca (konversi ke base64)
      reader.onload = function () {
        const imgBase64 = reader.result;

        // Buat objek project dengan semua data
        const projectData = {
          name: name.value.trim(),
          startDate: startDate.value,
          endDate: endDate.value,
          desc: desc.value.trim(),
          tech: checkedTechs,
          imgData: imgBase64, // Gambar dalam bentuk string base64
        };

        // Simpan data project ke localStorage
        localStorage.setItem(`projectData`, JSON.stringify(projectData));
        alert(`✅ Data berhasil disimpan di localStorage:`, projectData);
      };

      // Jalankan proses pembacaan file gambar
      reader.readAsDataURL(file);
  }
}
