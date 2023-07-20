let lineStartX, lineStartY;
let drawLine = false;
let drawFreehand = false;
let drawHourGlass = false;
let drawDotty = false;
let drawFan = false;
let continuousDrawing = false;
let strokeWidth = 0.1;
let strokeColor = "#000"; // Initial stroke color is black;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  background("#fce2e1");
}

// TOOL DESIGN
function draw() {
  // noFill();
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
    line(mouseX, mouseY, mouseY, pmouseY);
  }
  else if(drawDotty){
    // 'd' horizontal and vertical
    strokeWeight(strokeWidth + 2);
    line(pmouseX, pmouseY, pmouseX, pmouseY);
  }
  else if(drawFan){
    // 'a' horizontal and vertical
    if (mouseIsPressed)
    {
      drawLine = false;
      line(lineStartX, lineStartY, mouseX, mouseY);
    }
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

// TOOL KEYCODE
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
  if (keyCode === 65) { // "a" key
    drawFan = !drawFan;
  }

// COLOUR KEYCOE
  if (keyCode === 87) { // "w" key
    if (strokeColor === "#000" || strokeColor === "#f33") 
    {
      strokeColor = "#fff"; // Change stroke color to white
    } 
    else {
      strokeColor = "#000"; // Change stroke color to black
    }
  }
  
  if (keyCode === 82) { // "r" key
    if (strokeColor === "#000" || strokeColor === "#fff") 
    {
      strokeColor = "#f33"; // Change stroke color to white
    } 
    else {
      strokeColor = "#000"; // Change stroke color to black
    }
  }

// SIZE KEYCODE
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