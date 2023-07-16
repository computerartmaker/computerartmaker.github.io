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
  // background(252,247,4);
}

function draw() {
  if (drawingLine) {
    line(lineStartX, lineStartY, mouseX, mouseY);
  }

  // stroke(0);
  // strokeWeight(random(1,2))
if (keyIsPressed && keyCode === 65) { // "A" key
    image(img11, mouseX, mouseY, 200,200);
  } 
  else if (keyIsPressed && keyCode === 83) { // "S" key
    image(img10, mouseX, mouseY, 200,200);
  }
  else {
    image(vertical, mouseX, mouseY);
  }
  // fill(0);
  // stroke(random(1,255))
  // strokeWeight(random(1,4))
  // rect(random(mouseX), random(mouseY), 5, 5);
  // fill(255);
  // strokeWeight(random(1,3))
  // rect(random(mouseX), random(mouseY), 10, 10);
  // fill(0,0,255);
  // strokeWeight(random(1))
  // rect(50, 50, 50, 50);
  

  // strokeWeight(random(1))
  // rect(random(mouseX), random(mouseY), 35, 35);


  // imageMode(CENTER);
  // image(img, mouseX, mouseX);
  // image(img2, mouseX, mouseX);
  // image(img3, mouseX, mouseY);
  // image(img4, mouseX, mouseY, 500,500);
  // image(img4, mouseX, mouseY, 500,500);
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

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
