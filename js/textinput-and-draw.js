


let texts = [];
let isTyping = false;
let textInput = '';
let textX, textY;
let cursorVisible = false;
let cursorTimer;
let typingTimer;
let lineHeight;
let textAlignY;
let cursorLineWeight = 4;

function preload() {
  // Load text from localStorage if available
  if (localStorage.getItem('textInput')) {
    texts = JSON.parse(localStorage.getItem('textInput'));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Detect key press to capture text input
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keypress', handleKeyPress);

  textFont('monospace');
  lineHeight = 20; // Adjust line height as desired
  textAlignY = TOP; // Adjust vertical text alignment as desired
}

function mousePressed() {
  if (isTyping && textInput.trim() !== '') {
    let textObj = {
      text: textInput,
      x: textX,
      y: textY
    };
    texts.push(textObj);
    textInput = '';
    isTyping = false;

    // Persist the entered text to localStorage
    localStorage.setItem('textInput', JSON.stringify(texts));
  }

  textX = mouseX;
  textY = mouseY;
  isTyping = true;

  // Start the cursor blinking timer
  cursorTimer = setInterval(toggleCursor, 500);

  // Start the typing timeout timer
  clearTimeout(typingTimer);
  typingTimer = setTimeout(finishTyping, 10000);
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

      // Restart the typing timeout timer
      clearTimeout(typingTimer);
      typingTimer = setTimeout(finishTyping, 10000);
    } else if (event.key === 'Enter') {
      // Prevent line break when Enter is pressed
      event.preventDefault();

      // Add a line break to the text input
      textInput += '\n';

      // Restart the typing timeout timer
      clearTimeout(typingTimer);
      typingTimer = setTimeout(finishTyping, 10000);
    }
  }
}

function toggleCursor() {
  cursorVisible = !cursorVisible;
}

function finishTyping() {
  if (isTyping) {
    let textObj = {
      text: textInput,
      x: textX,
      y: textY
    };
    texts.push(textObj);
    textInput = '';
    isTyping = false;

    // Persist the entered text to localStorage
    localStorage.setItem('textInput', JSON.stringify(texts));
  }
  clearInterval(cursorTimer);
  cursorVisible = false;
}

function draw() {
  background("#fce2e1");

  for (let i = 0; i < texts.length; i++) {
    let textObj = texts[i];
    fill(0);
    textSize(16);
    textAlign(LEFT, textAlignY);
    text(textObj.text, textObj.x, textObj.y);
  }

  if (isTyping) {
    fill(0);
    textSize(16);
    textAlign(LEFT, textAlignY);

    let lines = textInput.split('\n');
    let totalHeight = lines.length * lineHeight;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      let cursorLineY = textY + i * lineHeight;

      text(line, textX, cursorLineY);
    }
  }

  // Draw the cursor
  if (isTyping && cursorVisible) {
    let cursorX = textX + textWidth(textInput.split('\n').slice(-1)[0]);
    let cursorY = textY + (lineHeight * Math.max(textInput.split('\n').length - 1, 0));

    stroke(0);
    strokeWeight(cursorLineWeight);
    line(cursorX, cursorY - textDescent(), cursorX, cursorY + lineHeight - textDescent());
  }
}
