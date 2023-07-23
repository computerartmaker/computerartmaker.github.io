let lineStartX, lineStartY;
let drawLine = false;

let drawFreehand = false;
let drawHourGlass = false;
let drawDotty = false;
let drawFan = false;
let drawShading = false;

let strokeWidth = 1;
let strokeColor = "blue"; // Initial stroke color


let toolTip = document.getElementById('tooltip') 
toolTip.innerText = "Straight Line Tool (Mouse Press)";
toolTip.style.backgroundColor = "blue";
toolTip.style.color = "white";

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  background("#fce2e1");
}

// TOOL DESIGN
function draw() {
  stroke(strokeColor);
  strokeWeight(strokeWidth);

  if (drawShading && !drawFreehand) {
    if (drawLine) {
      if (abs(mouseX - lineStartX) > abs(mouseY - lineStartY)) {
        // 's' horizontal
        line(lineStartX, lineStartY, mouseX, lineStartY);
      } else {
        // 's' vertical
        line(lineStartX, lineStartY, lineStartX, mouseY);
      }
    }
  } else if (drawFreehand) {
    // 'f' horizontal and vertical
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  else if(drawHourGlass){
    // 'h' horizontal and vertical
    line(mouseX, mouseY, mouseY, pmouseY);
  }
  else if(drawDotty){
    // 'd' horizontal and vertical
    strokeWeight(strokeWidth + 2);
    line(pmouseX, pmouseY, pmouseX, pmouseY);
  }
  else if(drawFan){
    // 'a' horizontal and vertical
    if (mouseIsPressed)
    {
      drawLine = false;
      noFill();
      line(lineStartX, lineStartY, mouseX, mouseY);
    }
  }
}

function mouseMoved() {
  if (!drawFreehand) {
    stroke(strokeColor);
    strokeWeight(strokeWidth);
    lineStartX = pmouseX;
    lineStartY =  pmouseY;
    drawLine = true;
  }
}

function mouseDragged() {
  if (!drawFreehand && drawLine) {
    if (abs(mouseX - lineStartX) > abs(mouseY - lineStartY)) {
      line(lineStartX, lineStartY, mouseX, lineStartY);
    } else {
      line(lineStartX, lineStartY, lineStartX, mouseY);
    }
  }
}

function mouseReleased() {
  drawLine = false;
}

// TOOL KEYCODE
function keyPressed() {
  if (keyCode === 70) { // "f" key
    if(drawFreehand = !drawFreehand){
      toolTip.innerText = "Freehand Tool (Mouse Hover)";
    }
    else {
      toolTip.innerText = "Straight Line Tool (Mouse Press)";
    }
  }
  if (keyCode === 83) { // "s" key
    if(drawShading = !drawShading) {
      toolTip.innerText = "Shading Tool (Mouse Hover)";
    }
    else {
      toolTip.innerText = "Straight Line Tool (Mouse Press)";
    }
  }
  if (keyCode === 72) { // "h" key
    if(drawHourGlass = !drawHourGlass){
      toolTip.innerText = "Hour Glass Tool (Mouse Hover)";
    }
    else {
      toolTip.innerText = "Straight Line Tool (Mouse Press)";
    }
  }
  if (keyCode === 68) { // "d" key
    if(drawDotty = !drawDotty){
      toolTip.innerText = "Dot Tool (Mouse Hover)";
    }
    else {
      toolTip.innerText = "Straight Line Tool (Mouse Press)";
    }
  }
  if (keyCode === 65) { // "a" key
    if(drawFan = !drawFan){
      toolTip.innerText = "Fan Tool (Mouse Press)";
    } 
    else {
      toolTip.innerText = "Straight Line Tool (Mouse Press)";
    }
  }

// COLOUR KEYCOE
  if (keyCode === 87) { // "w" key
    if (strokeColor === "blue" || strokeColor === "black" || strokeColor === "red") 
    {
      strokeColor = "white"; // Change stroke color to white
      toolTip.style.backgroundColor = "white";
      toolTip.style.color = "black";
    } 
    else {
      strokeColor = "blue"; // Change stroke color to black
      toolTip.style.backgroundColor = "blue";
      toolTip.style.color = "white";
    }
  }
  
  if (keyCode === 82) { // "r" key
    if (strokeColor === "blue" || strokeColor === "black" || strokeColor === "white") 
    {
      strokeColor = "red"; // Change stroke color to white
      toolTip.style.backgroundColor = "red";
      toolTip.style.color = "white";
    }  
    else {
      strokeColor = "blue"; // Change stroke color to black
      toolTip.style.backgroundColor = "blue";
      toolTip.style.color = "white";
    }
  }
  
  if (keyCode === 66) { // "b" key
    if (strokeColor === "blue" || strokeColor === "red" || strokeColor === "white") 
    {
      strokeColor = "black"; // Change stroke color to white
      toolTip.style.backgroundColor = "black";
      toolTip.style.color = "white";
    }  
    else {
      strokeColor = "blue"; // Change stroke color to black
      toolTip.style.backgroundColor = "blue";
      toolTip.style.color = "white";
    }
  }

// SIZE KEYCODE
  // Change stroke weight using the "+" and "-" keys for both drawing modes
  if (keyCode === 187 || keyCode === 107) { // "+" key
    strokeWidth += 1;
  } else if (keyCode === 189 || keyCode === 109) { // "-" key
    decreaseCount++;
    if (decreaseCount === 1) {
      strokeWidth = max(0.1, strokeWidth - 1);
    } else {
      strokeWidth = max(0.1, strokeWidth - 0.1 * decreaseCount);
    }
  } else {
    decreaseCount = 0.1; // Reset decreaseCount if any other key is pressed
  }
}