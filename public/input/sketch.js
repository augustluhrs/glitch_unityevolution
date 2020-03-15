//open and connect the input socket
let socket = io("/input");

//listen for the confirmation of connection
socket.on("connect", function() {
  console.log("connected to server");
});

let clickDebounce = 100;
let lastClick = 0;

let xScale, yScale;
let lastX, lastY;
let isFirstClick = true;
let r,g,b;
let backgroundButtCol, complementButtCol;

//new variables
let pointTotal = 0;
let spawnButt, speedButt, speedTotal, spawnCostText;
let canSpawn = false;
let canUpgradeSpeed = false;
let spawnCost = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = random(0, 255);
  g = random(0, 200);
  b = random(0, 255);
  background(r, g, b);
  backgroundButtCol = color(r, g, b, 100);
  complementButtCol = color(255-r, 255-g, 255-b, 100);
  console.log(backgroundButtCol);
  console.log(complementButtCol);

  rectMode(CORNER);
  textSize(width/8);
  textAlign(CENTER);
  // ellipseMode(CENTER);
  // upgradeButt = createButton('     UPGRADE     ')
  //   .position(width/2, 5 * height/6)
  //   .mousePressed(()=>{
  //     socket.emit("upgrade");
  //     upgradeCounter = 0;
  //     upgradeButt.hide();
  //   });
  // xScale = 20/width;
  // yScale = 20/height;
  spawnButt = createButton('SPAWN NEW SPHERE')
    .style('background-color', "#55FF55")
    .position(width/3, 2 * height/4)
    .mousePressed(()=>{
      if(canSpawn){
        DefaultSpawn();
      }
    });
    
}

function draw() {
  background(r,g,b);
  //clicker field
  fill(255-r, 255-g, 255-b);
  rect(0, 2*height/3, width, height/3);
  //point text
  fill(r,g,b);
  textSize(width/8);
  text(pointTotal, width/2, 4* height / 5);

  //spawn updates
  fill(255-r, 255-g, 255-b);
  textSize(width/15);
  noStroke();
  text("Spawn Cost: " + spawnCost, width/2, height/4);
  // console.log(spawnButt);
  console.log(spawnButt.style);

  if(pointTotal >= spawnCost){
    canSpawn=true;
    spawnButt.style('background-color', "33FF33");
    console.log('yes');
  }
  else{
    canSpawn = false;
    spawnButt.style('background-color', "555555");
    console.log('no');

  }
}

function mousePressed(){
  if (millis() - lastClick >= clickDebounce)
  {
    if (mouseY > 2 * height/3)
    {
      pointTotal++;
      lastClick = millis();
    }
  }
}

function DefaultSpawn()
{
  spawnData = {
    x: width/2,
    y: height/2,
    width: width,
    height: height,
    r: r,
    g: g,
    b: b
  }
  socket.emit("spawn", spawnData);
  pointTotal -= spawnCost;
  spawnCost = Math.floor(1.2*spawnCost);
}

/*
function mousePressed(){
  fill(255-r, 255-g, 255-b);
  ellipse(mouseX, mouseY, 20, 20);
  socket.emit("log", {mouseX: mouseX, mouseY: mouseY});
  if (millis() - lastClick >= clickDebounce && !isFirstClick)
  {
    spawnData = {
      // x: map(mouseX * xScale, 0, 20, 10, -10), //flipped because reasons
      // y: map(mouseY * yScale, 0, 20, -10, 10),
      x: mouseX,
      y: mouseY,
      width: width,
      height: height,
      r: r,
      g: g,
      b: b
    }
    socket.emit("spawn", spawnData);
    lastClick = millis();
    isFirstClick = true;
    return;
  }
  isFirstClick = false;
}
*/