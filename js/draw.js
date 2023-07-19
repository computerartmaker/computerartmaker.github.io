let lineStartX, lineStartY;
let drawingLine = false;
let drawFreehand = false;
let strokeWidth = 0.1;
let strokeColor = "#000000"; // Initial stroke color is black;
let continuousDrawing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  background("#fce2e1");
}

function draw() {
  stroke(strokeColor);
  strokeWeight(strokeWidth);

  if (continuousDrawing && !drawFreehand) {
    if (drawingLine) {
      if (abs(mouseX - lineStartX) > abs(mouseY - lineStartY)) {
        line(lineStartX, lineStartY, mouseX, lineStartY);
      } else {
        line(lineStartX, lineStartY, lineStartX, mouseY);
      }
    }
  } else if (drawFreehand) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function mouseMoved() {
  if (!drawFreehand) {
    stroke(strokeColor);
    strokeWeight(strokeWidth);
    lineStartX = pmouseX;
    lineStartY = pmouseY;
    drawingLine = true;
  }
}

function mouseDragged() {
  if (!drawFreehand) {
    if (abs(mouseX - lineStartX) > abs(mouseY - lineStartY)) {
      line(lineStartX, lineStartY, mouseX, lineStartY);
    } else {
      line(lineStartX, lineStartY, lineStartX, mouseY);
    }
  }
}

function mouseReleased() {
  drawingLine = false;
}

function keyPressed() {
  if (keyCode === 70) { // "f" key
    drawFreehand = !drawFreehand;
  }
  if (keyCode === 83) { // "s" key
    continuousDrawing = !continuousDrawing;
  }

  if (keyCode === 87) { // "w" key
    if (strokeColor === "#000000") {
      strokeColor = "#fff"; // Change stroke color to white
    } else {
      strokeColor = "#000000"; // Change stroke color to black
    }
  }
  // Change stroke weight using the "+" and "-" keys
  // if (keyCode === 187 || keyCode === 107) { // "+" key
  //     strokeWidth += 1;
  // } else if (keyCode === 189 || keyCode === 109) { // "-" key  
  //     strokeWidth = max(1, strokeWidth - 1);
  // }
  // Change stroke weight using the "+" and "-" keys for both drawing modes
  if (keyCode === 187 || keyCode === 107) { // "+" key
    strokeWidth += 1;
  } else if (keyCode === 189 || keyCode === 109) { // "-" key
    decreaseCount++;
    if (decreaseCount === 1) {
      strokeWidth = max(0.1, strokeWidth - 1);
    } else {
      strokeWidth = max(0.1, strokeWidth - 0.1 * decreaseCount);
    }
  } else {
    decreaseCount = 0.1; // Reset decreaseCount if any other key is pressed
  }
}
