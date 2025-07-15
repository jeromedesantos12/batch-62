indexs.forEach((index) => {
  // const key = `projectData-${index}`; // projectData-1, projectData-2 .. dst
  const key = `projectData-${index}`; // projectData-1, projectData-2 .. dst
  const savedProject = localStorage.getItem(key);
  if (!savedProject) return; // jika local storage ga ada, hentikan looping!
  console.log(index);
  // tampilkan semua projects yang valid, lewati yang rusak.
  let projects;
  try {
    projects = JSON.parse(savedProject);
  } catch (err) {
    console.error(`💥 Gagal parsing ${key}:`, err.message);
    return;
  }

  const { nameIN, descIN, imgDataIN, startDateIN, endDateIN, techIN } =
    getData(projects);

  const monthsIN =
    (endDateIN.getFullYear() - startDateIN.getFullYear()) * 12 +
    (endDateIN.getMonth() - startDateIN.getMonth());
  // selisih tahun -> 2025 - 2023 = 2 → 2 * 12 = 24 bulan
  // selisih bulan -> 7 - 3 = 4 bulan
  // tambahin -> 24 + 4 = 28 bulan

  const techSpan = techIN
    .map((tech) => {
      const [name, icon] = dataTech[tech.toLowerCase()] || [tech, ``];
      return icon || `<span>${name}</span>`;
    })
    .join(``);

  // PROSES LOOP!
  // 1. tech = `js` (pasti huruf kecil, karena dari checkbox)
  // 2. tech.toLowerCase() -> `js`
  // 3. dataTech[`js`] -> [JavaScript, (element icon)] -> array
  // 4. [name, icon] -> `JavaScript`, (element icon) -> data string

  // DILUAR LOOP
  // 1. join(``)
  // [</span>(element icon)</span>, ... ]  -> hasil looping (array di join)

  allCardsHTML += `
      <div class="cards" onclick="detailProject(event)" data-index="${index}">
        <img class="cover" src= "${imgDataIN}" alt="${nameIN}"/>
        <h2>${nameIN}</h2>
        <span>durasi ${monthsIN} bulan</span>
        <p class="truncate">${descIN}</p>
        <div class="techs">${techSpan}</div>
        <div class="buttons">
          <button class="edit" onclick="editProject(event)" data-index="${index}">Edit</button>
          <button class="delete" onclick="deleteProject(event)" data-index="${index}">Delete</button>
        </div>
      </div>
    `;
});
wrapper.innerHTML =
  allCardsHTML || `<p class="none">Tidak ada proyek yang tersimpan.</p>`;
