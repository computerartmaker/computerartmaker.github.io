let lineStartX, lineStartY;
let drawLine = false;
let drawFreehand = false;
let drawHourGlass = false;
let drawDotty = false;
let drawSpiral = false;
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
    if (drawLine) {
      if (abs(mouseX - lineStartX) > abs(mouseY - lineStartY)) {
        // 's' horizontal
        line(lineStartX, lineStartY, mouseX, lineStartY);
      } else {
        // 's' vertical
        line(lineStartX, lineStartY, lineStartX, mouseY);
      }
    }
  } else if (drawFreehand) {
    // 'f' horizontal and vertical
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  else if(drawHourGlass){
    // 'h' horizontal and vertical
    // noFill();
    line(mouseX, mouseY, mouseY, pmouseY);
  }
  else if(drawDotty){
    // 'd' horizontal and vertical
    // noFill();
    line(pmouseX, pmouseY, pmouseX, pmouseY);
  }
  else if(drawSpiral){
    // 'q' horizontal and vertical
    // noFill();
    line(mouseX, pmouseY, mouseX, mouseY);
  }
}

function mouseMoved() {
  if (!drawFreehand) {
    stroke(strokeColor);
    strokeWeight(strokeWidth);
    lineStartX = pmouseX;
    lineStartY =  pmouseY;
    drawLine = true;
  }
}

function mouseDragged() {
  if (!drawFreehand && drawLine) {
    if (abs(mouseX - lineStartX) > abs(mouseY - lineStartY)) {
      line(lineStartX, lineStartY, mouseX, lineStartY);
    } else {
      line(lineStartX, lineStartY, lineStartX, mouseY);
    }
  }
}

function mouseReleased() {
  drawLine = false;
}

function keyPressed() {
  if (keyCode === 70) { // "f" key
    drawFreehand = !drawFreehand;
  }
  if (keyCode === 83) { // "s" key
    continuousDrawing = !continuousDrawing;
  }
  if (keyCode === 72) { // "h" key
    drawHourGlass = !drawHourGlass;
  }
  if (keyCode === 68) { // "d" key
    drawDotty = !drawDotty;
  }
  if (keyCode === 81) { // "q" key
    drawSpiral = !drawSpiral;
  }

  if (keyCode === 87) { // "w" key
    if (strokeColor === "#000000") {
      strokeColor = "#fff"; // Change stroke color to white
    } else {
      strokeColor = "#000000"; // Change stroke color to black
    }
  }

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