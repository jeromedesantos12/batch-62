// ambil element wrapper
const wrapper = document.querySelector(".wrapper");

// tampilkan cards
function loadProjects() {
  let index = 1;
  let allCardsHTML = ``;

  // proses looping
  while (true) {
    const key = `projectData-${index}`; // projectData-1, projectData-2 .. dst
    const savedProject = localStorage.getItem(key);
    if (!savedProject) break; // jika local storage ga ada, hentikan looping!

    // tampilkan semua projects yang valid, lewati yang rusak.
    let projects;
    try {
      projects = JSON.parse(savedProject);
    } catch (err) {
      console.error(`💥 Gagal parsing ${key}:`, err.message);
      index++; // akumulator gagal (skip ke data selanjutnya)
      continue;
    }
    // 💡 Bisa dianalogikan kayak lagi nyortir berkas!
    // - Kalau map-nya kosong, kamu stop nyari.
    // - Tapi kalau isinya rusak, kamu lewatin dan lanjut ke map selanjutnya.

    const { nameIN, descIN, imgDataIN, monthsIN, techIN } = getData(projects);
    const techSpan = techIN
      .map((tech) => {
        const [name, icon] = dataTech[tech.toLowerCase()] || [tech, ""];
        return `<span>${icon || name}</span>`;
      })
      .join("");

    // PROSES LOOP!
    // 1. tech = `js` (pasti huruf kecil, karena dari checkbox)
    // 2. tech.toLowerCase() -> `js`
    // 3. dataTech[`js`] -> [JavaScript, (element icon)] -> array
    // 4. [name, icon] -> `JavaScript`, (element icon) -> data string
    // 5. join(``) -> </span>(element icon)</span>

    allCardsHTML += `
      <div class="cards">
        <div class="cover" style="background-image: url(${imgDataIN});"></div>
        <h2>${nameIN}</h2>
        <span>durasi ${monthsIN} bulan</span>
        <p class="truncate">${descIN}</p>
        <div class="techs">${techSpan}</div>
        <div class="buttons">
          <button onclick="detailProject(${index})">Detail</button>
          <button onclick="deleteProject(${index})">Delete</button>
        </div>
      </div>
    `;
    index++; // akumulator sukses
  }

  wrapper.innerHTML =
    allCardsHTML || `<p class="none">Tidak ada proyek yang tersimpan.</p>`;
}

// fungsi sorting ulang
function reindexProjects() {
  // ambil semua key yang hanya diawali `projectData-`
  // -> theme, userToken, imageCache dll ❌ BUANG
  const allKeys = Object.keys(localStorage)
    .filter((key) => key.startsWith(`projectData-`)) // ..projectData-1
    .sort((a, b) => {
      const numA = parseInt(a.split(`-`)[1]); // pecah ["projectData", "3"][1] → 3 (int)
      const numB = parseInt(b.split(`-`)[1]);
      return numA - numB;
      // - Jika negatif, a ditempatkan sebelum b
      // - Jika positif, b ditempatkan sebelum a
      // - Kalau 0, urutannya tetap
    });

  // ambil valuenya disini berdasarkan key urut
  const allProjects = allKeys.map((key) => {
    return JSON.parse(localStorage.getItem(key));
  }); // key urut -> value yang di parse dulu

  // hapus semua projectData dari localStorage
  allKeys.forEach((key) => localStorage.removeItem(key));

  // simpan ulang dengan index yang baru
  allProjects.forEach((projects, i) => {
    localStorage.setItem(`projectData-${i + 1}`, JSON.stringify(projects));
  });
}

// panggil saat halaman dimuat
function load() {
  form.reset();
  reindexProjects();
  loadProjects();
}

load();
