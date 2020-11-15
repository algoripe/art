// // GLOBAL VARIABLES INITIATION

// // CANVAS DIMENSIONS
let width = 720;
let height = width;
let canvas;

// // BACKGROUND AND STROKE
const backgroundClr = pickColorFromPalette(1);
const c1 = pickColorFromPalette(2);
const c2 = pickColorFromPalette(3);
let strokeClr;
let strokeClrVariant;

const strokeWeightMax = 0.5;
let strokeWeightValue = strokeWeightMax;
let strokeIncrease = true;
// let font;

// // FRAMERATE
// const frameRateValue = 30;

// // INCREMENTOR
let t = 0;

// AUTOMATAS
const NUMBER_OF_AUTOMATAS = 120;

class Automata {
  constructor(size, xPosition, yPosition) {
    if (size) {
      this.size = size;
    } else {
      this.size = random(2);
    }

    if (xPosition) {
      this.xPosition = xPosition;
    } else {
      this.xPosition = width * Math.random();
    }

    if (yPosition) {
      this.yPosition = yPosition;
    } else {
      this.yPosition = height * Math.random();
    }

    this.xDirection = random(-2, 2);
    this.yDirection = random(-4, 4);
    this.color = color(random(255), random(155), random(255));
  }

  move = () => {
    // first, check for border collision
    if (this.xPosition <= 0 || this.xPosition >= width) {
      this.xDirection = this.xDirection * -1;
    }
    if (this.yPosition <= 0 || this.yPosition >= width) {
      this.yDirection = this.yDirection * -1;
    }
    this.xPosition += this.xDirection;
    this.yPosition += this.yDirection;
  };

  draw = () => {
    stroke(this.color);
    // strokeWeight(this.size);
    point(this.xPosition, this.yPosition);
  };

  joinParticles = () => {
    // const r = noise(t) * 255;
    // const g = noise(t + 500) * 255;
    // const b = noise(t + 1000) * 255;
    const minDistance = width / 4;

    automatas.forEach((i) => {
      let dis = dist(this.xPosition, this.yPosition, i.xPosition, i.yPosition);
      if (dis < minDistance) {
        // const colorP = color(random(255), random(255), random(255));
        // const colorP = color(r, g, b);
        // stroke(colorP);
        // strokeWeight(0.3 + dis / (dis * dis));
        // strokeWeight(0.5 + minDistance / (dis * dis));
        strokeWeight(0.4);
        // bezier(
        //   this.xPosition,
        //   this.yPosition,
        //   width * noise(t + 20),
        //   height * noise(t),
        //   width * noise(t + 200),
        //   height * noise(t + 300),
        //   i.xPosition,
        //   i.yPosition
        // );

        const bezX1 =
          ((noise(t + 123) - 0.5) * minDistance) / 2 +
          (this.xPosition + i.xPosition) / 2;

        const bezY1 =
          ((noise(t + 321) - 0.5) * minDistance) / 2 +
          (this.yPosition + i.yPosition) / 2;

        const bezX2 =
          ((noise(t + 100) - 0.5) * minDistance) / 2 +
          (this.xPosition + i.xPosition) / 2;

        const bezY2 =
          ((noise(t + 460) - 0.5) * minDistance) / 2 +
          (this.yPosition + i.yPosition) / 2;

        // bezier(
        //   this.xPosition,
        //   this.yPosition,
        //   bezX1,
        //   bezY1,
        //   bezX2,
        //   bezY2,
        //   i.xPosition,
        //   i.yPosition
        // );
        line(this.xPosition, this.yPosition, i.xPosition, i.yPosition);
      }
    });
  };

  boxBounce = () => {
    if (this.xPosition <= 0 || this.xPosition >= width) {
      this.xDirection = this.xDirection * -1;
    }
    if (this.yPosition <= 0 || this.yPosition >= width) {
      this.yDirection = this.yDirection * -1;
    }
  };
}
const automatas = [];

function setup() {
  // CANVAS SETUP
  canvas = createCanvas(width, height);
  canvas.parent("canvas-div");
  noLoop();
  noFill();

  // BACKGROUND COLOR
  background(backgroundClr);
  // setGradient(0, 0, width, height, color(c1), color(c2), "horizontal");

  // STROKE
  strokeWeight(strokeWeightValue);
  strokeClr = color(pickColorFromPalette(1));
  stroke(strokeClr);

  // NOISE
  // noiseSeed(1999);

  // automatas
  for (let i = 0; i < NUMBER_OF_AUTOMATAS; i++) {
    automatas[i] = new Automata();
    automatas[i].draw();
  }
}

function draw() {
  // setGradient(0, 0, width, height, c1, c2, "horizontal");
  background(backgroundClr);

  for (let i = 0; i < automatas.length; i++) {
    const automata = automatas[i];

    automata.move();
    automata.joinParticles();
    automata.draw();
  }

  // POINTS FOR DRAWING

  // INCREMENTS
  t += 0.05;
}
