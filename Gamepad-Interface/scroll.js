const screen = document.querySelector(".screen");
const wrapper = document.querySelector(".page-wrapper");

screen.addEventListener("wheel", (e) => {
  e.preventDefault(); // block vertical scroll
  wrapper.scrollLeft += e.deltaY; // turn wheel → horizontal scroll
});
