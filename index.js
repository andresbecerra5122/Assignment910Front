document.addEventListener("DOMContentLoaded", function () {
  const drawingCanvas = document.getElementById("main");
  const drawingContext = drawingCanvas.getContext("2d");

  let isDrawing = false;
  let isErasing = false;
  let selectedColor = "#000000"; // Default brush color is black
  let selectedSize = 5; // Default brush size

  // Function to start drawing or erasing
  function startDrawing(e) {
    isDrawing = true;
    draw(e);
  }

  // Function to stop drawing or erasing
  function stopDrawing() {
    isDrawing = false;
    drawingContext.beginPath();
  }

  // Function to draw on the canvas
  function draw(e) {
    if (!isDrawing) return;

    drawingContext.lineWidth = selectedSize;
    drawingContext.lineCap = "round";

    if (isErasing) {
      drawingContext.strokeStyle = "#ffffff"; // Set color to white for eraser
    } else {
      drawingContext.strokeStyle = selectedColor;
    }

    drawingContext.lineTo(e.clientX - drawingCanvas.offsetLeft, e.clientY - drawingCanvas.offsetTop);
    drawingContext.stroke();
    drawingContext.beginPath();
    drawingContext.moveTo(e.clientX - drawingCanvas.offsetLeft, e.clientY - drawingCanvas.offsetTop);
  }

  // Event listeners for mouse actions
  drawingCanvas.addEventListener("mousedown", startDrawing);
  drawingCanvas.addEventListener("mouseup", stopDrawing);
  drawingCanvas.addEventListener("mousemove", draw);

  // Event listener for brush color buttons
  document.getElementById("black").addEventListener("click", function () {
    selectedColor = "#000000";
    isErasing = false;
  });

  document.getElementById("pink").addEventListener("click", function () {
    selectedColor = "#F50057";
    isErasing = false;
  });

  document.getElementById("blue").addEventListener("click", function () {
    selectedColor = "#2979FF";
    isErasing = false;
  });

  document.getElementById("yellow").addEventListener("click", function () {
    selectedColor = "#FFD600";
    isErasing = false;
  });

  // Event listener for eraser button
  document.getElementById("erase").addEventListener("click", function () {
    isErasing = true;
    selectedColor = "#ffffff"; // Set color to white for eraser
  });

  // Event listener for new button (clear canvas)
  document.getElementById("new").addEventListener("click", function () {
    drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
  });

  // Event listener for slider input (change brush size)
  document.getElementById("slider").addEventListener("input", function () {
    selectedSize = this.value;
    document.getElementById("brushSize").innerText = selectedSize;
  });

  // Initialize brush size display
  document.getElementById("brushSize").innerText = selectedSize;
});
