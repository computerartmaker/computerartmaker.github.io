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

// Straight Lines
let lineStartX, lineStartY;
let drawingLine = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#fce2e1");
  imageMode(CENTER);
}

function draw() {


  if (drawingLine) {
    const dx = mouseX - lineStartX;
    const dy = mouseY - lineStartY;
    const angle = atan2(dy, dx);
    const distance = dist(lineStartX, lineStartY, mouseX, mouseY);

    push();
    translate(lineStartX, lineStartY);
    rotate(angle);
    image(vertical, 0, 0, distance);
    pop();
  }

  if (keyIsPressed && keyCode === 65) { // "A" key
    image(img11, mouseX, mouseY, 200, 200);
  } 
  else if (keyIsPressed && keyCode === 83) { // "S" key
    image(img10, mouseX, mouseY, 200, 200);
  }
}

function keyPressed() {
  if (keyCode === 81) { // "Q" key
    lineStartX = mouseX;
    lineStartY = mouseY;
    drawingLine = true;
  }
}

function keyReleased() {
  if (keyCode === 81) { // "Q" key
    drawingLine = false;
  }
}