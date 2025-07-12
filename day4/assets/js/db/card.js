// event dari onclick -> tombol detail
function detailProject(index) {
  const key = `projectData-${index}`;
  const savedProject = localStorage.getItem(key);

  let project;
  try {
    project = JSON.parse(savedProject);
  } catch (err) {
    console.error(`💥 Gagal parsing ${key}:`, err.message);
  }

  const { nameIN, descIN, imgDataIN, monthsIN, techIN } = getData(project);

  console.log(nameIN, descIN, imgDataIN, monthsIN, techIN);
}

// event dari onclick -> tombol delete
function deleteProject(index) {
  const key = `projectData-${index}`;
  const confirmDelete = confirm(`Yakin mau hapus Project #${index}?`);
  if (!confirmDelete) return;

  localStorage.removeItem(key); // hapus dari localStorage
  load(`dropDown`); // refresh
}
