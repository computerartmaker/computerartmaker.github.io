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

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  background("#fce2e1");
}

function draw() {
  if (drawingLine) {
    if (drawFreehand) {
      strokeWeight(strokeWidth);
      line(pmouseX, pmouseY, mouseX, mouseY);
    } else {
      strokeWeight(strokeWidth);
      if (abs(mouseX - lineStartX) > abs(mouseY - lineStartY)) {
        line(lineStartX, lineStartY, mouseX, lineStartY);
      } else {
        line(lineStartX, lineStartY, lineStartX, mouseY);
      }
    }
  }
}

function mousePressed() {
  lineStartX = mouseX;
  lineStartY = mouseY;
  drawingLine = true;
}

function mouseReleased() {
  drawingLine = false;
}

function keyPressed() {
  if (keyCode === 65) { // "A" key
    drawFreehand = !drawFreehand;
    redraw();
  }

   // Change stroke width using the "+" and "-" keys
  if (keyCode === 187 || keyCode === 107) { // "+" key
    strokeWidth += 1;
  } else if (keyCode === 189 || keyCode === 109) { // "-" key
    strokeWidth = max(1, strokeWidth - 1);
  }
}
