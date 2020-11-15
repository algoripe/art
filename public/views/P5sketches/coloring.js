// // GLOBAL VARIABLES INITIATION 

// // CANVAS DIMENSIONS
let width = 1024;
let height = width;
let canvas;

let boolDraw = false;


// // BACKGROUND AND STROKE
let strokeClr;
let strokeClrVariant;

const strokeWeightMax = 0.5;
let strokeWeightValue = strokeWeightMax;
let strokeIncrease = true;
// let font;

// // FRAMERATE
const frameRateValue = 30;

// // INCREMENTOR
let t = 0;

function setup() {
    // CANVAS SETUP
    canvas = createCanvas(width, height);
    canvas.parent("canvas-div");
    noLoop();
 
    // BACKGROUND COLOR
    const c1 = color(pickColorFromPalette(4));
    const c2 = color(pickColorFromPalette(3));
    setGradient(0, 0, width, height, c1, c2, 'horizontal');
    
    // STROKE
    strokeWeight(strokeWeightValue);

    // NOISE
    // noiseSeed(1999);
    
}

function draw() {
    // POINTS FOR DRAWING
    const x1 = width * noise(t+25);
    const y1 = height * noise(t+3);

    stroke(color(pickColorFromPalette(5)));
    if(boolDraw) {
        // bezier(x1, y1, width/2, height/2, width/2, height/2, mouseX, mouseY);
        line(x1, y1, mouseX, mouseY);
    }


    // INCREMENTS
    t += 0.005;

    boolDraw = true;
}

