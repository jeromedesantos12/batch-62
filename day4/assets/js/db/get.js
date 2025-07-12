// dictionary icon teknologi
const dataTech = {
  js: [`JavaScript`, `<i class="fa-brands fa-square-js"></i>`],
  reactjs: [`ReactJS`, `<i class="fa-brands fa-react"></i>`],
  php: [`PHP`, `<i class="fa-brands fa-php"></i>`],
  laravel: [`Laravel`, `<i class="fa-brands fa-laravel"></i>`],
};

// ambil data dari local storage
function getData(storage) {
  // simpan masing-masing value ke variable
  const nameIN = storage.name;
  const descIN = storage.desc;
  const techIN = storage.tech;
  const imgDataIN = storage.imgData;
  const startDateIN = new Date(storage.startDate);
  const endDateIN = new Date(storage.endDate);
  const monthsIN =
    (endDateIN.getFullYear() - startDateIN.getFullYear()) * 12 +
    (endDateIN.getMonth() - startDateIN.getMonth());
  // selisih tahun -> 2025 - 2023 = 2 → 2 * 12 = 24 bulan
  // selisih bulan -> 7 - 3 = 4 bulan
  // tambahin -> 24 + 4 = 28 bulan

  return { nameIN, descIN, imgDataIN, monthsIN, techIN };
}
