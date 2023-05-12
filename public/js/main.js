// const container = document.querySelector(".carousel-container");
// const slides = document.querySelectorAll(".person-card");

// let offset = 0;

// let slideID = 0;

// location.lo;

// setInterval(() => {
//   offset = slides[0].offsetWidth;

//   container.style.transition = "left ease-in-out 500ms";
//   container.style.left = -offset + "px";
//   setTimeout(() => {
//     container.style.transition = "none";

//     slides[slideID] = slides.length - 1;

//     container.style.left = 0;
//     slideID++;

//     if (slideID === slides.length) {
//       slideID = 0;
//       slides.forEach((slide) => {
//         slide.style.order = "initial";
//       });
//     }
//   }, 500);
// }, 3000);
const optionsBtn = document.querySelector(".bx-dots-vertical-rounded");
const closeOptionsBtn = document.querySelector(".bx-x");
const personCardOption = document.querySelector(".person-card-option");

optionsBtn.addEventListener("click", openOptions);
function openOptions() {
  personCardOption.classList.toggle("display-none");
}

closeOptionsBtn.addEventListener("click", closeOptions);

// for (let i = 0; i < closeOptionsBtn.length; i++) {
closeOptionsBtn.addEventListener("click", closeOptions);
function closeOptions() {
  personCardOption.classList.toggle("display-none");
}
// }
