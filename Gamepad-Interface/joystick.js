const area = document.getElementById("joystick-area");
const knob = document.getElementById("joystick-knob");

let dragging = false;
let center = { x: 0, y: 0 };

area.addEventListener("mousedown", start);
area.addEventListener("touchstart", start, { passive: false });

document.addEventListener("mousemove", move);
document.addEventListener("touchmove", move, { passive: false });

document.addEventListener("mouseup", end);
document.addEventListener("touchend", end);

function start(e) {
  dragging = true;
  const rect = area.getBoundingClientRect();
  center = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

function move(e) {
  if (!dragging) return;

  const pointer = e.touches ? e.touches[0] : e;
  const dx = pointer.clientX - center.x;
  const dy = pointer.clientY - center.y;

  const radius = 60;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const limit = distance < radius ? distance : radius;

  knob.style.left = (dx / distance) * limit + 35 + "px";
  knob.style.top = (dy / distance) * limit + 35 + "px";

  const output = {
    x: +(dx / radius).toFixed(2),
    y: +(-dy / radius).toFixed(2)
  };

  console.log("Joystick:", output);
}

function end() {
  dragging = false;
  knob.style.left = "35px";
  knob.style.top = "35px";
}
