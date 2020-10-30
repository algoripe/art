console.log('Sketch was loaded...');

let width = 12000;
let height = width;

let backgroundClr;
let strokeClr;

let strokeWeightValue = 2;
const strokeWeightMax = 500;

const frameRateValue = 30;

var t;

let font;

function preload() {

}

function setup() {

  canvas = createCanvas(width, height);
  canvas.parent("canvas-div");

  noiseSeed(1998);

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
  
  const x1 = width * (t);
  const y1 = height * 0;
  
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
  
  bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  
  // bezier(x1, y1, x7, y7, x4, y4, x1, y1);
  
  // bezier(x4, y4, x2, y2, x3, y3, x6, y6);
  
  t += 0.005;
  
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