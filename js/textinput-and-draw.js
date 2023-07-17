let texts = [];
let isTyping = false;
let textInput = '';
let textX, textY;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Load persisted text from localStorage if available
  if (localStorage.getItem('textInput')) {
    texts = JSON.parse(localStorage.getItem('textInput'));
  }

  // Detect key press to capture text input
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keypress', handleKeyPress);
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

  // Persist the entered text to localStorage
    localStorage.setItem('textInput', JSON.stringify(texts));
}

function handleKeyDown(event) {
  if (isTyping) {
    if (event.key === 'Backspace') {
      // Prevent further processing of key input
      event.preventDefault();

      // Remove last character from text input
      textInput = textInput.slice(0, -1);
    }
  }
}

function handleKeyPress(event) {
  if (isTyping) {
    if (event.key.length === 1) {
      // Prevent further processing of key input
      event.preventDefault();

      // Append the current character to the text input
      textInput += event.key;
    }
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
