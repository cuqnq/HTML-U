// Get DOM elements
const leftStickBase = document.getElementById('leftStickBase');
const leftStick = document.getElementById('leftStick');
const rightStickBase = document.getElementById('rightStickBase');
const rightStick = document.getElementById('rightStick');

// Variables to track stick position
let isDraggingLeft = false;
let isDraggingRight = false;
const stickRadius = 30; // Radius of the stick
const baseRadius = 60; // Radius of the analog stick base

// Function to update stick position
function updateStickPosition(stick, base, clientX, clientY) {
  // Get the position of the analog stick base
  const rect = base.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Calculate distance from center
  const deltaX = clientX - centerX;
  const deltaY = clientY - centerY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  // Limit the stick to the base boundary
  const limitedDistance = Math.min(distance, baseRadius);
  
  // Update stick position
  const angle = Math.atan2(deltaY, deltaX);
  const stickX = Math.cos(angle) * limitedDistance;
  const stickY = Math.sin(angle) * limitedDistance;
  
  stick.style.transform = `translate(${stickX}px, ${stickY}px)`;
  
  // Change color based on position
  const intensity = Math.min(1, limitedDistance / baseRadius);
  const red = Math.min(255, 80 + intensity * 100);
  const blue = Math.min(255, 120 + intensity * 100);
  stick.style.background = `radial-gradient(circle at 30% 30%, rgb(${red}, 100, ${blue}), #1e3a5f)`;
}

// Function to reset stick position
function resetStick(stick) {
  stick.style.transition = 'transform 0.3s ease, background 0.3s ease';
  stick.style.transform = 'translate(0, 0)';
  stick.style.background = 'radial-gradient(circle at 30% 30%, #4a6fa5, #1e3a5f)';
  
  // Remove transition after animation completes
  setTimeout(() => {
    stick.style.transition = '';
  }, 300);
}

// Mouse event handlers for left stick
leftStickBase.addEventListener('mousedown', (e) => {
  isDraggingLeft = true;
  updateStickPosition(leftStick, leftStickBase, e.clientX, e.clientY);
});

// Mouse event handlers for right stick
rightStickBase.addEventListener('mousedown', (e) => {
  isDraggingRight = true;
  updateStickPosition(rightStick, rightStickBase, e.clientX, e.clientY);
});

document.addEventListener('mousemove', (e) => {
  if (isDraggingLeft) {
    updateStickPosition(leftStick, leftStickBase, e.clientX, e.clientY);
  }
  if (isDraggingRight) {
    updateStickPosition(rightStick, rightStickBase, e.clientX, e.clientY);
  }
});

document.addEventListener('mouseup', () => {
  if (isDraggingLeft) {
    isDraggingLeft = false;
    resetStick(leftStick);
  }
  if (isDraggingRight) {
    isDraggingRight = false;
    resetStick(rightStick);
  }
});