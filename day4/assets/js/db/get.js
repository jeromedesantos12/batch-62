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

  return { nameIN, descIN, imgDataIN, startDateIN, endDateIN, techIN };
}
