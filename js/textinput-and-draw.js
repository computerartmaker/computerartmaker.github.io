let texts = [];
let isTyping = false;
let textInput = '';
let textX, textY;
let cursorVisible = false;
let cursorTimer;
let typingTimer;

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
    textSize(20);
    textAlign(LEFT, TOP);
    text(textObj.text, textObj.x, textObj.y);
  }

  if (isTyping) {
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text(textInput, textX, textY);

    // Draw the cursor
    if (cursorVisible) {
      let cursorX = textX + textWidth(textInput);
      let cursorY = textY;
      stroke(0);
      strokeWeight(2);
      line(cursorX, cursorY, cursorX, cursorY + 20);
    }
  }
}
