let clearBtn;

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
let fontSize = 16;

function preload() {
  // Load text from localStorage if available
  if (localStorage.getItem('textInput')) {
    texts = JSON.parse(localStorage.getItem('textInput'));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  clearBtn = document.getElementById('clearBtn');
  clearBtn.addEventListener('click', handleClear);

  // Detect key press to capture text input
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keypress', handleKeyPress);

  textFont('monospace');
  textSize(fontSize); // Set the initial font size
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

    


    else if ((event.key === "+" || event.code === "NumpadAdd") && !event.shiftKey) {
      // Extended keyboard "+" key (e.g., numeric keypad)
      event.preventDefault();
      fontSize += 2; // Increase the font size by 2 (adjust as desired)
      textSize(fontSize); // Set the updated font size
    } else if (event.key === '-' && event.code !== 'Minus') {
      // Decrease the font size (minimum size is 2)
      event.preventDefault();
      fontSize = max(2, fontSize - 2); // Decrease the font size by 2 (adjust as desired)
      textSize(fontSize); // Set the updated font size
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
    // textSize(16);
    // textAlign(LEFT, textAlignY);
    text(textObj.text, textObj.x, textObj.y);
  }

  if (isTyping) {
    fill(0);
    // textSize(16);
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

// Clear localStorage data/canvas
function handleClear() {
  isTyping = false;  
  const yes = confirm("Are you sure?");
  if(yes){
  texts = []; // Clear the texts array
  textInput = ''; // Clear the text input
  localStorage.removeItem('textInput'); // Delete the localStorage data
  }
}


// resize on reload
function reloadOnResize() {
  setTimeout(() => {
    location.reload();
  }, 1000);
}

window.addEventListener('resize', reloadOnResize);
