// project is a mess due to legacy structure/code
// needs clean up

var img;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;
var img10;
var img11;
var img12;
var vertical;

function preload() {
  img = loadImage('../img/smudge-pattern.png')
  img2 = loadImage('../img/smudge-pattern2.png')
  img3 = loadImage('../img/smudge-pattern3.png')
  img4 = loadImage('../img/smudge-pattern4.png')
  img5 = loadImage('../img/paw.png')
  img6 = loadImage('../img/covidai.png')
  img7 = loadImage('../img/given.png')
  img8 = loadImage('../img/inks.png')
  img9 = loadImage('../img/monitor.png')
  img10  = loadImage('../img/pp.png')
  img11  = loadImage('../img/pp2.png')
  img12  = loadImage('../img/times.png')
  vertical  = loadImage('../img/vertical.png')
}

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
