const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const brushSize = document.getElementById("brushSize");
const eraser = document.getElementById("eraser");
const save = document.getElementById("save");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADASS";
ctx.lineJoin = "round";
ctx.lineCap = "round";
// ctx.lineWidth = 100;

let isDrawing = false;
let isEraser = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
// let direction = true;

function draw(e) {
  if (!isDrawing) return;

  // console.log(e);
  ctx.lineWidth = brushSize.value;
  ctx.strokeStyle = isEraser ? "#ffffff" : `hsl(${hue},100%,50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];

  // if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) direction = !direction;

  // ctx.lineWidth = direction ? ctx.lineWidth + 1 : ctx.lineWidth - 1;

  hue = hue >= 360 ? 0 : hue + 1;
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

// Event Listener for Eraser
eraser.addEventListener("click", () => {
  isEraser = !isEraser;
  console.warn(`Is Eraser active :${isEraser}`);
});

// Event Listener for Saving the drawing
save.addEventListener("click", () => {
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "drawing.png";
  link.click();
});
