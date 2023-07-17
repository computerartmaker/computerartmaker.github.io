let texts = [];
let isTyping = false;
let textInput = '';
let textX, textY;
let textarea;

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadSavedData();

  // Create and position the HTML textarea element
  textarea = document.createElement('textarea');
  textarea.style.position = 'absolute';
  textarea.style.left = '0';
  textarea.style.top = '0';
  textarea.style.display = 'none';
  document.body.appendChild(textarea);
  textarea.addEventListener('input', handleInput);
}

function mousePressed() {
  if (isTyping) {
    let textObj = {
      text: textInput,
      x: textX,
      y: textY
    };
    texts.push(textObj);
    saveData();
    textInput = '';
    isTyping = false;
  } else {
    textX = mouseX;
    textY = mouseY;
    isTyping = true;
    textarea.style.left = textX + 'px';
    textarea.style.top = textY + 'px';
    textarea.style.display = 'block';
    textarea.value = '';
    textarea.focus();
  }
}

function handleInput(event) {
  textInput = event.target.value;
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

function saveData() {
  localStorage.setItem('texts', JSON.stringify(texts));
}

function loadSavedData() {
  const savedData = localStorage.getItem('texts');
  if (savedData) {
    texts = JSON.parse(savedData);
  }
}
