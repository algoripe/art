let canvas;

let width = 3084;
let height = 1276;

const STRIPES_AMOUNT = 40;

let backgroundClr;
let strokeClr;
let strokeWeightValue = 21;

let inc = 0;
let h = height;
let b = 0;
let t = 0;

function setup() {
    canvas = createCanvas(width, height);
    canvas.parent("canvas-div");
    // COLORS
    backgroundClr = pickColorFromPalette(0);
    background(backgroundClr);

    strokeClr = pickColorFromPalette(6);
    stroke(strokeClr);
    strokeWeight(strokeWeightValue);

    
}

function draw() {

    let amplitude = 50;

    if(b>height/3 && b<(height/3)*2) {
        inc++;
        amplitude = 50+inc;
    } else {
        amplitude = 50;;
    }
    
    for(a=0;a<STRIPES_AMOUNT+40;a++) {
        const x = width/STRIPES_AMOUNT*a - 800;
        point(x+400*((noise(t)*2)),b);
    }
    b++;
    t += 0.005;
}