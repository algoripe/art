console.log('Sketch was loaded...');

let width = 600;
let height = width;

let backgroundClr;
let strokeClr;

let strokeWeightValue = 0.7;
const strokeWeightMax = 500;

const frameRateValue = 30;

let x =0;
let y =0;
var t;

let font;

function preload() {
}

function setup() {

  canvas = createCanvas(width, height);
  canvas.parent("canvas-div");

  noiseSeed(101);

  // COLORS
  backgroundClr = pickColorFromPalette(0);
  background(backgroundClr);

  strokeClr = pickColorFromPalette(6);
  stroke(strokeClr);
  
  strokeWeight(strokeWeightValue);
  
  noFill();

  t = 0;
  frameRate(frameRateValue);
  
  noFill();
  // fill(strokeClr);
  stroke(strokeClr);


  noLoop();
}

function draw() {
  
  const x1 = x;
  const y1 = y;
  
  const x2 = width * noise(t + 235);
  const y2 = height * noise(t + 165);
  
  const y3 = height * noise(t + 175);
  const x3 = width * noise(t + 265);
  
  const y4 = height * noise(t + 185);
  const x4 = width * noise(t + 295);
  
  // const x5 = width * 0.38;
  // const y5 = height * 0.48;
  
  // const x6 = width * 0.7;
  // const y6 = height * 0.25;
  
  const x7 = width * noise(0.57*t);
  const y7 = random() * height * 0.2;
  
  bezier(x1, y1, x2, y2, x3, y3, mouseX, mouseY);
  
  t += 0.005;
  x++;
  y++;

  // adjustStrokeWeight();
  strokeWeight(strokeWeightValue);
  
  stroke(strokeClr);
  adjustStrokeColor();
    
}

function adjustStrokeWeight() {
  if(frameCount % 100 < 50 ) {
    strokeWeightValue += 0.1;
  } else {
    strokeWeightValue -= 0.1;
  }
}

function adjustStrokeColor() {
  if(frameCount % 2 == 0) {
    strokeClr = pickColorFromPalette(6);
  } else {
    strokeClr = pickColorFromPalette(6);
  }
}