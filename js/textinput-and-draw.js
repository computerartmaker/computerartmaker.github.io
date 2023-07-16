// function setup() {
  // createCanvas(windowWidth, windowHeight);
//   imageMode(CENTER);
  // background("#fce2e1");
// }

let texts = [];
let isTyping = false;
let textInput = '';
let textX, textY;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Detect key press to capture text input
  document.addEventListener('keydown', keyTyped);
}

function mousePressed() {
  if (isTyping) {
    let textObj = {
      text: textInput,
      x: textX,
      y: textY
    };
    texts.push(textObj);
    textInput = '';
    isTyping = false;
  }

  textX = mouseX;
  textY = mouseY;
  isTyping = true;
}

function keyTyped(event) {
  if (isTyping) {
    if (event.key === 'Backspace') {
      textInput = textInput.slice(0, -1);
    } else if (event.key.length === 1) {
      // Append the current character to the text input
      textInput += event.key;
    }
    // Prevent further processing of key input
    event.preventDefault();
  }
}

function draw() {
  background("#fce2e1");

  for (let i = 0; i < texts.length; i++) {
    let textObj = texts[i];
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text(textObj.text, textObj.x, textObj.y);
  }

  if (isTyping) {
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text(textInput, textX, textY);
  }
}
