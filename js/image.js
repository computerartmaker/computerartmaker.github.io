let cov;
let glitch;
let smudge_pattern_black;
let smudge_pattern_white;
let times;
let trans;
let vertical;

let currentImage = null;
let imageSize = 200; // Size of the images
let drawEnabled = true; // Flag to enable/disable drawing

function preload() {
  cov = loadImage('../img/cov.png')
  glitch  = loadImage('../img/glitch.png')
  smudge_pattern_black  = loadImage('../img/smudge_pattern_black.png')
  smudge_pattern_white  = loadImage('../img/smudge_pattern_white.png')
  times  = loadImage('../img/times.png')
  trans = loadImage('../img/trans.png')
  vertical  = loadImage('../img/vertical.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  background("#fce2e1");
  currentImage = null;
}

function draw() {
  if (drawEnabled && currentImage !== null) {
    if(currentImage === cov){
      image(currentImage, mouseX, mouseY, imageSize, imageSize);
    } else {
      image(currentImage, mouseX, mouseY);
    }
  }
}

function keyPressed() {
  if (keyCode === 65) { // "A" key
    currentImage = vertical;
  } 
  else if (keyCode === 69) { // "E" key
    currentImage = glitch;
  } 
  else if (keyCode === 87) { // "W" key
    currentImage = cov;
  } 
  else if (keyCode === 83) { // "S" key
    currentImage = times;
  } 
  else if (keyCode === 90) { // "Z" key
    currentImage = smudge_pattern_black;
  } 
  else if (keyCode === 88) { // "X" key
    currentImage = smudge_pattern_white;
  } 
  else if (keyCode === 81) { // "Q" key
     drawEnabled = !drawEnabled;
  }
}

// resize on reload
function reloadOnResize() {
  setTimeout(() => {
    location.reload();
  }, 1000);
}

window.addEventListener('resize', reloadOnResize);
