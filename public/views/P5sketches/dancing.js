console.log('Sketch was loaded...');

// // GLOBAL VARIABLES INITIATION 

// // CANVAS DIMENSIONS
let width = 660;
let height = width;
let canvas;

// // BACKGROUND AND STROKE
let backgroundClr;
let initialStrokeClr;
let strokeClr;
let strokeClrVariant;
const strokeWeightMax = 0.7;
let strokeWeightValue = strokeWeightMax;
let strokeIncrease = true;
// let font;

// // FRAMERATE
const frameRateValue = 30;

// // INCREMENTOR
let t;

// // GLOBAL POINTS
let x5 = 0;
let y5 = 0;
let ax1 = 0;
let ay1 = 0;
let ax2 = 0;
let ay2 = 0;


let pX = 1;
let pY = 1;

// // PRELOAD FUNCTION
function preload() {}

// // SETUP FUNCTION
function setup() {

  // // NOISE
  // noiseSeed(104);

  // // CANVAS
  canvas = createCanvas(width, height);
  canvas.parent("canvas-div");
  frameRate(frameRateValue);
  noLoop();

  // // COLORS
  backgroundClr = '#000000';
  background(backgroundClr);

  // // STROKE
  strokeWeight(strokeWeightValue);
  
  // // MISC
  noFill();
  t = 0;

  // to fix (add to algoripe.js)
}

function draw() {

  if(frameCount == 50 || frameCount == 100 || frameCount == 150 || frameCount == 200) {
    noLoop();
  }

  // COLORS
  // background(backgroundClr);

  // // POINTS FOR DRAWING
  const x1 = width * 0.5;
  const y1 = height * 0.5;

  const x2 = width * noise(t+20);
  const y2 = height+ height/2 * noise(t + 21);

  const x3 = width * noise(t+45);
  const y3 = height * noise(t + 175);
  
  const x4 = width * noise(t + 210);
  const y4 = height * noise(t+200);
  
  const x6 = width * 0.5;
  const y6 = height * 0.8;

  let x7 = width;

  const x8 = x5 + 200 * noise(t);
  
  const circleWidthPoint = width/4 + width/2 * ((cos(TWO_PI * t) + 1)/2);
  const circleHeightPoint = height/4 + height/2 * ((sin(TWO_PI * t) + 1)/2);

  // // DRAWING
  // ellipse(x8, y5, noise(t+20)*200, noise(t + 100) * 100 +2);
  // bezier(x8 - (noise(t+20)*200)/2, y5 + (noise(t + 100) * 100 +2)/2, x2, y2, x3, y3, -500, height +500);

  if(frameCount < 51) {
    stroke(pickColorFromPalette(4));
    pX = 0.98;
    pY = 0.9;
    ax1 = circleWidthPoint + 100;
    ay1 = circleHeightPoint + 100;
    ax2 = ax1;
    ay2 = ay2;
  } else if(frameCount < 101 && frameCount >= 51) {
    stroke(pickColorFromPalette(1));
    pX = 0.02;
    pY = 0.9;
    ax1 = circleWidthPoint - 100;
    ay1 = circleHeightPoint + 100;
    ax2 = ax1;
    ay2 = ay2;
  } else if(frameCount < 151 && frameCount >= 101) {
    stroke(pickColorFromPalette(2));
    pX = 0.05;
    pY = 0.2;
    ax1 = circleWidthPoint - 100;
    ay1 = circleHeightPoint - 100;
    ax2 = ax1;
    ay2 = ay2;
  } else if(frameCount < 203 && frameCount >= 151) {
    stroke(pickColorFromPalette(3));
    pX = 0.95;
    pY = 0.2;
    ax1 = circleWidthPoint + 100;
    ay1 = circleHeightPoint - 100;
    ax2 = ax1;
    ay2 = ay2;
  } else {
  }

  // if(frameCount % 2 == 0) {
  //   ax1 = 0;
  //   ay1 = 0;
  //   ax2 = 0.5;
  //   ay2 = 0;
  // } else {
  //   ax1 = 0.5;
  //   ay1 = 1;
  //   ax2 = 0.5;
  //   ay2 = 1;

  // }

  if(frameCount < 203 && frameCount > 1) {
    bezier(mouseX, mouseY, width/2, height/2 , width/2, height/2 ,circleWidthPoint, circleHeightPoint);
    // bezier(pX * width, pY * height, ax1, ay1, ax2, ay2, circleWidthPoint, circleHeightPoint);
  }

  // push();
  // strokeWeight(0.1);
  // stroke(pickColorFromPalette(0))
  // quad(width/2, height/1.5, width/2 - randomGaussian() * 20, height/2 - 160 - randomGaussian() * 20, width/2, height/2 - randomGaussian() * 20, width/2 - width/105 * randomGaussian(), height/1.5 - y5 - 160)
  // pop();


  // bezier(width * pX, height * pY, width/2, height/2, width/2, height/2, circleWidthPoint, circleHeightPoint);

  // bezier(mouseX, mouseY, width/2, height/2, width/2, height/2, circleWidthPoint, circleHeightPoint);
  
  // quad(mouseX, mouseY, x3, y3, width-x3, height-y3, circleWidthPoint, circleHeightPoint);

  // triangle(circleWidthPoint, circleHeightPoint, mouseX, mouseY, width - circleWidthPoint/2, height - circleHeightPoint/2);
  // bezier(mouseX, mouseY, x4, y3, x2, y4, circleWidthPoint, circleHeightPoint);

  // bezier(width - circleWidthPoint, height - circleHeightPoint, width/2, height/2, width/2, height/2, circleWidthPoint, circleHeightPoint);

  // bezier(width-x5, height, x5, y4, x1, y1, mouseX, mouseY);

  // quad(x1, y1, x2, y2, x6, y6, x4, y4);

  // triangle(x5, y5 +  noise(t+200) * 250 ,x5,height+20,width+20,height);

  // triangle(x6,y6,x4,y4,x7,y5); 
  // fill(strokeClr);
  // circle(noise(t+10) * width/2,height/2,(1-t)*1500 +t);
  // circle(mouseX,mouseY,(1-t)*2000 +t);

  // //  INCREMENTOR CHANGES
  t += 0.005;
  if(x5 < width + 50) {
      x5 += 2;
      y5 += 2;
      x7 -= 2;
  } else {
      // noLoop();
  }

  adjustStrokeWeight();
  strokeWeight(strokeWeightValue);
  // adjustStrokeColor();
  // stroke(strokeClr);
}

function adjustStrokeColor() {
  if(frameCount % 2 == 0) {
    strokeClr = pickColorFromPalette(2);
  } else {
    strokeClr = pickColorFromPalette(2);
  }
}