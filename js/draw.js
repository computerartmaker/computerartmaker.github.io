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
  if (continuousDrawing && !drawFreehand) {
    if (drawingLine) {
      strokeWeight(strokeWidth);
      if (abs(mouseX - lineStartX) > abs(mouseY - lineStartY)) {
        line(lineStartX, lineStartY, mouseX, lineStartY);
      } else {
        line(lineStartX, lineStartY, lineStartX, mouseY);
      }
    }
  } else if (drawFreehand) {
    strokeWeight(strokeWidth);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function mouseMoved() {
  if (!drawFreehand) {
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
  if (keyCode === 65) { // "A" key
    drawFreehand = !drawFreehand;
    redraw();
  } else if (keyCode === 87) { // "W" key
    if (strokeColor === "#000000") {
      strokeColor = "#fce2e1"; // Change stroke color to white
    } else {
      strokeColor = "#000000"; // Change stroke color to black
    }
    redraw();
  } else if (keyCode === 81) { // "Q" key
    continuousDrawing = !continuousDrawing;
  }

  // Change stroke weight using the "+" and "-" keys
  if (keyCode === 187 || keyCode === 107) { // "+" key
    if (drawFreehand) {
      strokeWidth += 1;
    }
  } else if (keyCode === 189 || keyCode === 109) { // "-" key
    if (drawFreehand) {
      strokeWidth = max(1, strokeWidth - 1);
    }
  }
}
