// // GLOBAL VARIABLES INITIATION

// // DEFAULT CANVAS DIMENSIONS
let width = 600;
let height = width;
let canvas;

// // BACKGROUND AND STROKE
const backgroundClr = `#000000`;
const c1 = pickColorFromPalette(2);
const c2 = pickColorFromPalette(1);
let strokeClr;
let strokeClrVariant;

const strokeWeightMax = 0.5;
let strokeWeightValue = strokeWeightMax;
// let font;

// // FRAMERATE
// const frameRateValue = 30;

// // INCREMENTOR
let t = 0;

// AUTOMATAS
const NUMBER_OF_AUTOMATAS = 123;

class Automata {
  constructor(size, xPosition, yPosition) {
    if (size) {
      this.size = size;
    } else {
      this.size = 1;
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

    this.xDirection = random(-3, 3);
    // this.yDirection = random(-3, 3);
    // this.xDirection = random() > 0.5 ? 1 : -1;
    this.yDirection = random() > 0.5 ? 1 : -1;

    // const randomNum = Math.floor(random(Object.keys(currentPalette).length));
    // this.color = pickColorFromPalette(randomNum);

    // if (random() > 0.5) {
    //   this.color = c1;
    // } else {
    //   this.color = c2;
    // }
    this.color = color(random(255), random(55), random(255));
  }

  move = () => {
    this.xPosition += this.xDirection;
    this.yPosition += this.yDirection;

    if (this.xPosition < 0) {
      this.xPosition = this.xPosition + width - noise(t + 102);
    }
    if (this.xPosition > width) {
      this.xPosition = 1 + (noise(t + 102) - 0.5);
    }
    if (this.yPosition < 0) {
      this.yPosition = this.yPosition + height - noise(t + 102);
    }
    if (this.yPosition > width) {
      this.yPosition = 1 + (noise(t + 102) - 0.5);
    }
  };

  draw = () => {
    stroke("#fff");
    // stroke(this.color);
    // strokeWeight(this.size);
    // point(this.xPosition, this.yPosition);
    fill(color(random(150, 255), random(55), random(150, 255)));
    circle(this.xPosition, this.yPosition, this.size);
  };

  joinParticles = (currentAutomataIndex) => {
    // const r = noise(t) * 255;
    // const g = noise(t + 500) * 255;
    // const b = noise(t + 1000) * 255;
    // const minDistance = noise(t + 300) * 50 + 10;
    const minDistance = 90 + width / NUMBER_OF_AUTOMATAS;

    automatas.forEach((i) => {
      let dis = dist(this.xPosition, this.yPosition, i.xPosition, i.yPosition);
      if (dis < minDistance && dis > 2) {
        strokeWeight(0.6);
        noFill();
        stroke(this.color);
        // stroke(random(50, 255), random(0, 105), random(200, 255));

        const bezX1 =
          (noise(this.xDirection + t) - 0.5) * (minDistance / 5) +
          (this.xPosition + i.xPosition) / 2;

        const bezY1 =
          (noise(this.yDirection + t) - 0.5) * (minDistance / 5) +
          (this.yPosition + i.yPosition) / 2;

        const bezX2 =
          (noise(this.xDirection + t) - 0.5) * (minDistance / 5) +
          (this.xPosition + i.xPosition) / 2;

        const bezY2 =
          (noise(this.xDirection + t) - 0.5) * (minDistance / 5) +
          (this.yPosition + i.yPosition) / 2;

        bezier(
          this.xPosition,
          this.yPosition,
          bezX1,
          bezY1,
          bezX2,
          bezY2,
          i.xPosition,
          i.yPosition
        );

        // stroke(random(50, 255), random(0, 155), random(50, 255));

        const bez2X1 =
          (noise(this.xDirection + t + 200) - 0.5) * (minDistance / 2) +
          (this.xPosition + i.xPosition) / 2;

        const bez2Y1 =
          (noise(this.yDirection + t + 250) - 0.5) * (minDistance / 2) +
          (this.yPosition + i.yPosition) / 2;

        const bez2X2 =
          (noise(this.xDirection + t + 300) - 0.5) * (minDistance / 2) +
          (this.xPosition + i.xPosition) / 2;

        const bez2Y2 =
          (noise(this.xDirection + t + 350) - 0.5) * (minDistance / 2) +
          (this.yPosition + i.yPosition) / 2;

        bezier(
          this.xPosition,
          this.yPosition,
          bez2X1,
          bez2Y1,
          bez2X2,
          bez2Y2,
          i.xPosition,
          i.yPosition
        );

        // line(this.xPosition, this.yPosition, i.xPosition, i.yPosition);
      }
    });
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
  // strokeClr = color(pickColorFromPalette(1));
  // stroke(strokeClr);

  // NOISE
  // noiseSeed(1999);

  // automatas
  for (let i = 0; i < NUMBER_OF_AUTOMATAS; i++) {
    automatas[i] = new Automata();
    automatas[i].draw();
  }
}

function draw() {
  background(backgroundClr);

  for (let i = 0; i < automatas.length; i++) {
    const automata = automatas[i];

    automata.joinParticles(i);
    automata.draw();
    automata.move();
  }

  // POINTS FOR DRAWING

  // INCREMENTS
  t += 0.15;
}
