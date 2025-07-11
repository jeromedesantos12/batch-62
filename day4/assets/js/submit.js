// event submit
submit.addEventListener(`click`, (e) => {
  e.preventDefault();
  handleSubmit();
});

// fungsi submit
function handleSubmit() {
  // jalankan semua validasi
  nameValid();
  dateValid();
  descriptionValid();
  techValid();
  imageValid();

  // ambil data
  if (
    projectNameERR.innerText ||
    dateERR.innerText ||
    descriptionERR.innerText ||
    techERR.innerText ||
    imageERR.innerText
  ) {
    alert(`Form tidak valid, periksa kembali input!`);
  } else {
    // ambil daftar teknologi yang dicentang oleh pengguna
    const checkedTechs = Array.from(tech)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    // ambil file gambar dari input
    const file = image.files[0]; // isinya nama file, tipe dan ukuran dalam byte.
    const reader = new FileReader(); // membaca file secara lokal di browser

    // event handler yang dijalankan setelah file selesai dibaca
    reader.onload = function () {
      const imgBase64 = reader.result; // hasil pembacaan berupa Base64 Data URL

      let nextIndex = 1;
      while (localStorage.getItem(`projectData-${nextIndex}`)) nextIndex++;
      // Menarik semua item yang ada di localStorage (selama true dia looping terus)
      // Misal:
      // - projectData-1 → ✅ ada
      // - projectData-2 → ❌ kosong
      // - projectData-3 → ✅ ada

      // - data baru isi di projectData-2 (yang kosong di key)
      // - lalu data berikutnya longkap ke projectData-4

      const projectData = {
        name: name.value.trim(),
        startDate: startDate.value,
        endDate: endDate.value,
        desc: desc.value.trim(),
        tech: checkedTechs,
        imgData: imgBase64,
      };

      // simpan + parsing ke json
      localStorage.setItem(
        `projectData-${nextIndex}`,
        JSON.stringify(projectData)
      );
      alert(`✅ Data berhasil disimpan di localStorage:`, projectData);

      load(); // load ulang
    };

    reader.readAsDataURL(file);
    // - Ini memicu proses konversi.
    // - File diubah menjadi string yang dapat langsung digunakan
  }
}
