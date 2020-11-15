// // GLOBAL VARIABLES INITIATION 

// // CANVAS DIMENSIONS
let width = 1024;
let height = width;
let canvas;

// IMAGE
let img;

function preload() {
    img = loadImage('', img => {
        image(img, 0, 0);
    });
}

function setup() {
    // CANVAS SETUP
    canvas = createCanvas(width, height);
    canvas.parent("canvas-div");
}

function draw() {


}

