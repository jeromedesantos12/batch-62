const savedProject = localStorage.getItem("projectData");

// -> tinggal masukin datanya balik ke html
// -> lalu looping

if (savedProject) {
  const project = JSON.parse(savedProject);

  // Kamu bisa akses datanya seperti ini:
  const nameIN = project.name;
  const descIN = project.desc;
  const techIN = project.tech;
  const imgDataIN = project.imgData;
  const startDateIN = new Date(project.startDate);
  const endDateIN = new Date(project.endDate);
  const months =
    (endDateIN.getFullYear() - startDateIN.getFullYear()) * 12 +
    (endDateIN.getMonth() - startDateIN.getMonth());
}
