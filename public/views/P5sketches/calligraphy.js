// // GLOBAL VARIABLES INITIATION

// // DEFAULT CANVAS DIMENSIONS
let width = 600;
let height = width;
let canvas;

// // BACKGROUND AND STROKE
const backgroundClr = `#ffffff`;

// // FRAMERATE
// const frameRateValue = 30;

// // INCREMENTOR
let t = 0;
let SLOW_INCREMENT = 0;

// particle system
const NUMBER_OF_AUTOMATAS = 40;
// const PARTICLE_JOIN_DISTANCE = noise(t + 300) * 50 + 40;
// const PARTICLE_JOIN_DISTANCE = 20 + width / NUMBER_OF_AUTOMATAS;
let DEFAULT_PARTICLE_JOIN_DISTANCE = 40;

// TYPOGRAPHY
let displayText;
const frameCountPerLetter = 40;

const letterLines = {
  A: [
    [0.5, 0.2, 0.2, 0.8],
    [0.5, 0.2, 0.8, 0.8],
    [0.3, 0.6, 0.7, 0.6],
  ],
  B: [
    [0.2, 0.2, 0.2, 0.8],
    [0.2, 0.2, 0.5, 0.2],
    [0.5, 0.2, 0.7, 0.3],
    [0.7, 0.3, 0.7, 0.4],
    [0.7, 0.4, 0.6, 0.5],
    [0.6, 0.5, 0.3, 0.5],
    [0.2, 0.8, 0.7, 0.8],
    [0.7, 0.8, 0.8, 0.7],
    [0.8, 0.7, 0.8, 0.6],
    [0.8, 0.6, 0.6, 0.5],
  ],
  C: [
    [0.8, 0.4, 0.5, 0.2],
    [0.5, 0.2, 0.2, 0.4],
    [0.2, 0.6, 0.2, 0.4],
    [0.2, 0.6, 0.5, 0.8],
    [0.5, 0.8, 0.8, 0.6],
  ],
  D: [
    [0.2, 0.2, 0.2, 0.8],
    [0.2, 0.2, 0.8, 0.5],
    [0.2, 0.8, 0.8, 0.5],
  ],
  E: [
    [0.2, 0.2, 0.8, 0.2],
    [0.3, 0.5, 0.6, 0.5],
    [0.2, 0.8, 0.8, 0.8],
    [0.3, 0.2, 0.3, 0.8],
  ],
  F: [
    [0.2, 0.2, 0.8, 0.2],
    [0.2, 0.5, 0.7, 0.5],
    [0.2, 0.2, 0.2, 0.8],
  ],
  G: [
    [0.8, 0.3, 0.7, 0.2],
    [0.8, 0.2, 0.4, 0.2],
    [0.4, 0.2, 0.2, 0.4],
    [0.2, 0.4, 0.2, 0.7],
    [0.2, 0.7, 0.4, 0.8],
    [0.4, 0.8, 0.8, 0.8],
    [0.8, 0.8, 0.8, 0.6],
    [0.5, 0.6, 0.8, 0.6],
  ],
  H: [
    [0.2, 0.2, 0.2, 0.8],
    [0.2, 0.5, 0.8, 0.5],
    [0.8, 0.2, 0.8, 0.8],
  ],
  I: [
    [0.3, 0.2, 0.7, 0.2],
    [0.5, 0.2, 0.5, 0.8],
    [0.3, 0.8, 0.7, 0.8],
  ],
  J: [
    [0.2, 0.2, 0.8, 0.2],
    [0.5, 0.2, 0.5, 0.7],
    [0.5, 0.7, 0.4, 0.8],
    [0.4, 0.8, 0.2, 0.8],
    [0.2, 0.8, 0.2, 0.7],
  ],
  K: [
    [0.2, 0.2, 0.2, 0.8],
    [0.2, 0.5, 0.8, 0.2],
    [0.25, 0.45, 0.8, 0.8],
  ],
  L: [
    [0.2, 0.2, 0.2, 0.8],
    [0.8, 0.8, 0.2, 0.8],
  ],
  M: [
    [0.2, 0.8, 0.2, 0.2],
    [0.2, 0.2, 0.5, 0.5],
    [0.5, 0.5, 0.8, 0.2],
    [0.8, 0.2, 0.8, 0.8],
  ],
  N: [
    [0.2, 0.2, 0.2, 0.8],
    [0.2, 0.2, 0.8, 0.8],
    [0.8, 0.2, 0.8, 0.8],
  ],
  O: [
    [0.2, 0.5, 0.5, 0.2],
    [0.5, 0.2, 0.8, 0.5],
    [0.8, 0.5, 0.5, 0.8],
    [0.5, 0.8, 0.2, 0.5],
  ],
  P: [
    [0.2, 0.2, 0.2, 0.8],
    [0.2, 0.2, 0.6, 0.2],
    [0.6, 0.2, 0.8, 0.3],
    [0.7, 0.25, 0.7, 0.45],
    [0.8, 0.3, 0.8, 0.4],
    [0.8, 0.4, 0.6, 0.5],
    [0.6, 0.5, 0.3, 0.5],
  ],
  Q: [
    [0.2, 0.5, 0.5, 0.2],
    [0.5, 0.2, 0.8, 0.5],
    [0.8, 0.5, 0.5, 0.8],
    [0.5, 0.8, 0.2, 0.5],
    [0.5, 0.5, 0.8, 0.8],
  ],
  R: [
    [0.2, 0.2, 0.2, 0.8],
    [0.2, 0.2, 0.6, 0.2],
    [0.6, 0.2, 0.8, 0.3],
    [0.7, 0.25, 0.7, 0.45],
    [0.8, 0.3, 0.8, 0.4],
    [0.8, 0.4, 0.6, 0.5],
    [0.6, 0.5, 0.3, 0.5],
    [0.8, 0.8, 0.4, 0.5],
  ],
  S: [
    [0.8, 0.4, 0.5, 0.2],
    [0.5, 0.2, 0.2, 0.3],
    [0.2, 0.3, 0.8, 0.7],
    [0.8, 0.7, 0.5, 0.8],
    [0.5, 0.8, 0.2, 0.6],
  ],
  T: [
    [0.2, 0.2, 0.8, 0.2],
    [0.5, 0.2, 0.5, 0.8],
  ],
  U: [
    [0.2, 0.2, 0.2, 0.8],
    [0.2, 0.8, 0.8, 0.8],
    [0.8, 0.8, 0.8, 0.2],
  ],
  V: [
    [0.2, 0.2, 0.5, 0.8],
    [0.5, 0.8, 0.8, 0.2],
  ],
  W: [
    [0.2, 0.2, 0.4, 0.8],
    [0.4, 0.8, 0.5, 0.5],
    [0.5, 0.5, 0.6, 0.8],
    [0.6, 0.8, 0.8, 0.2],
  ],
  X: [
    [0.2, 0.2, 0.8, 0.8],
    [0.8, 0.2, 0.2, 0.8],
  ],
  Y: [
    [0.2, 0.2, 0.5, 0.5],
    [0.8, 0.2, 0.5, 0.5],
    [0.5, 0.8, 0.5, 0.5],
  ],
  Z: [
    [0.2, 0.2, 0.8, 0.2],
    [0.8, 0.2, 0.2, 0.8],
    [0.2, 0.8, 0.8, 0.8],
  ],
};
const automatas = [];
const letters = [];

class Automata {
  constructor(
    size,
    xPosition,
    yPosition,
    xDirection,
    yDirection,
    joinDistance,
    automataColor,
    type
  ) {
    if (size !== null) {
      this.size = size;
    } else {
      this.size = random(1, 7);
    }

    if (xPosition !== null) {
      this.xPosition = xPosition;
    } else {
      this.xPosition = 15 + (width - 20) * Math.random();
    }

    if (yPosition !== null) {
      this.yPosition = yPosition;
    } else {
      this.yPosition = 15 + (height - 20) * Math.random();
    }

    if (xDirection !== null) {
      this.xDirection = xDirection;
    } else {
      this.xDirection = random(-1, 1);
    }

    if (yDirection !== null) {
      this.yDirection = yDirection;
    } else {
      this.yDirection = random(-1, -20);
    }

    if (joinDistance !== null) {
      this.joinDistance = joinDistance;
    } else {
      this.joinDistance = DEFAULT_PARTICLE_JOIN_DISTANCE;
    }

    if (automataColor !== null && automataColor !== undefined) {
      const r = automataColor[0];
      const g = automataColor[1];
      const b = automataColor[2];
      this.color = color(r, g, b);
    } else {
      this.color = color(random(0, 100), random(5), random(0, 100));
    }

    if (type !== null && type !== undefined) {
      this.type = type;
    } else {
      this.type = "DEFAULT";
    }

    if (this.type === "DEFAULT") {
      this.strokeW = 0.2;
    } else {
      this.strokeW = 0.9;
    }

    this.uniqueNumber = random() * 10000;

    // this.yDirection = random(-3, 3);
    // this.xDirection = random() > 0.5 ? 1 : -1;

    // const randomNum = Math.floor(random(Object.keys(currentPalette).length));
    // this.color = pickColorFromPalette(randomNum);

    // if (random() > 0.5) {
    //   this.color = c1;
    // } else {
    //   this.color = c2;
    // }
  }

  move = () => {
    if (this.xDirection === 0 && this.yDirection === 0) {
      this.xPosition =
        this.xPosition + cos(SLOW_INCREMENT * TWO_PI + this.uniqueNumber) / 1;
      this.yPosition =
        this.yPosition + sin(SLOW_INCREMENT * TWO_PI + this.uniqueNumber) / 2;
    } else {
      this.xPosition += this.xDirection;
      this.yPosition += this.yDirection;
    }

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
    stroke("#000");
    strokeWeight(1.2);
    // point(this.xPosition, this.yPosition);
    // stroke(this.color);

    fill(color(noise(t + this.xPosition) * 255, 0, noise(t) * 255));
    circle(this.xPosition, this.yPosition, this.size);
    noFill();
  };

  joinParticles = (currentAutomataIndex) => {
    // const r = noise(t) * 255;
    // const g = noise(t + 500) * 255;
    // const b = noise(t + 1000) * 255;

    automatas.forEach((i) => {
      let dis = dist(this.xPosition, this.yPosition, i.xPosition, i.yPosition);
      if (dis < this.joinDistance && dis > 2) {
        strokeWeight(this.strokeW);
        stroke(i.color);
        // stroke(random(50, 255), random(0, 105), random(200, 255));

        const bezX1 =
          (noise(this.uniqueNumber + t) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 2) +
          (this.xPosition + i.xPosition + 3 * randomGaussian()) / 2;

        const bezY1 =
          (noise(this.uniqueNumber + t) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 2) +
          (this.yPosition + i.yPosition + 3 * randomGaussian()) / 2;

        const bezX2 =
          (noise(this.uniqueNumber + t) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 2) +
          (this.xPosition + i.xPosition) / 2;

        const bezY2 =
          (noise(this.uniqueNumber + t + 255) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 2) +
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

        stroke(this.color);

        const bez2X1 =
          (noise(this.uniqueNumber + t + 1) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 4) +
          (this.xPosition + i.xPosition + 3 * randomGaussian()) / 2;

        const bez2Y1 =
          (noise(this.uniqueNumber + t + 2) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 4) +
          (this.yPosition + i.yPosition + 3 * randomGaussian()) / 2;

        const bez2X2 =
          (noise(this.uniqueNumber + t + 3) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 4) +
          (this.xPosition + i.xPosition) / 2;

        const bez2Y2 =
          (noise(this.uniqueNumber + t + 4) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 4) +
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
      }
    });
  };
}

class PointLetter {
  constructor(points, letterWidth, LetterHeight, xPos, yPos) {
    if (letterWidth !== null) {
      this.letterWidth = letterWidth;
    } else {
      this.letterWidth = width;
    }
    if (LetterHeight !== null) {
      this.LetterHeight = LetterHeight;
    } else {
      this.LetterHeight = height;
    }

    if (xPos !== null) {
      this.xPos = xPos;
    } else {
      this.xPos = width * Math.random();
    }

    if (yPos !== null) {
      this.yPos = yPos;
    } else {
      this.yPos = height * Math.random();
    }

    this.points = points;
    console.log(points);

    let x;
    let y;
    for (const key in points) {
      const arr = points[key];
      // console.log();
      x = arr[0] * this.letterWidth;
      y = arr[1] * this.LetterHeight;
      // console.log(key);
      // console.log(x, y);
      const a = new Automata(1, x, y, 0, 0, null, LETTER_POINT);
      automatas.push(a);
      // a.draw();
    }
  }
}

class LineLetter {
  constructor(lines, width, height, x, y) {
    this.letterId = random(10000);
    this.lines = lines;
    // console.log(lines);
    for (const i of lines) {
      const x1 = x + i[0] * width;
      const y1 = y + i[1] * height;
      const x2 = x + i[2] * width;
      const y2 = y + i[3] * height;
      // stroke("#fff");
      // strokeWeight(3);
      // console.log(x1, y1, x2, y2);
      automatas.push(
        new Automata(null, x1, y1, 0, 0, 0, [0, 0, 0], this.letterId)
      );
      automatas.push(
        new Automata(null, x2, y2, 0, 0, 0, [0, 0, 0], this.letterId)
      );
      this.addAutomataHalfway(x1, y1, x2, y2);
    }
  }

  addAutomataHalfway = (x1, y1, x2, y2) => {
    if (dist(x1, y1, x2, y2) > 40) {
      const halfX = (x1 + x2) / 2;
      const halfY = (y1 + y2) / 2;
      automatas.push(
        new Automata(
          null,
          halfX,
          halfY,
          0,
          0,
          DEFAULT_PARTICLE_JOIN_DISTANCE,
          [random(0, 50), 0, random(0, 50)],
          this.letterId
        )
      );
      this.addAutomataHalfway(x1, y1, halfX, halfY);
      this.addAutomataHalfway(halfX, halfY, x2, y2);
    } else {
      return;
    }
  };
}

function setup() {
  // CANVAS SETUP
  canvas = createCanvas(width, height);
  canvas.parent("canvas-div");
  noLoop();
  noFill();

  // BACKGROUND COLOR
  background(backgroundClr);

  // NOISE
  // noiseSeed(1999);

  for (let i = 0; i < NUMBER_OF_AUTOMATAS; i++) {
    automatas.push(new Automata(null, null, null, null, null, null));
    automatas[i].draw();
  }

  displayText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
}

function draw() {
  background(backgroundClr);

  for (let i = 0; i < automatas.length; i++) {
    const automata = automatas[i];

    automata.move();
    automata.joinParticles(i);
    automata.draw();
    // automata.draw();
  }

  // POINTS FOR DRAWING
  // const letterA = new LineLetter(letterLines.A, width / 4, height / 2, 0, 0);

  // INCREMENTS
  t += 0.15;
  SLOW_INCREMENT += 0.005;

  if (
    frameCount === 1 ||
    frameCount === frameCountPerLetter * displayText.length + 20
  ) {
    removeLetterPoints();
    const ltr1 = new LineLetter(letterLines.A, width / 4, height / 2, 0, 0);
    const ltr2 = new LineLetter(
      letterLines.L,
      width / 4,
      height / 2,
      width / 4,
      0
    );
    const ltr3 = new LineLetter(
      letterLines.G,
      width / 4,
      height / 2,
      width / 2,
      0
    );
    const ltr4 = new LineLetter(
      letterLines.O,
      width / 4,
      height / 2,
      (3 * width) / 4,
      0
    );
    const ltr5 = new LineLetter(
      letterLines.F,
      width / 4,
      height / 2,
      0,
      height / 2
    );
    const ltr6 = new LineLetter(
      letterLines.O,
      width / 4,
      height / 2,
      width / 4,
      height / 2
    );
    const ltr7 = new LineLetter(
      letterLines.N,
      width / 4,
      height / 2,
      width / 2,
      height / 2
    );
    const ltr8 = new LineLetter(
      letterLines.T,
      width / 4,
      height / 2,
      (3 * width) / 4,
      height / 2
    );
    automatas.splice(0, 1);
  } else if (
    frameCount > 20 &&
    frameCount < frameCountPerLetter * displayText.length + 20
  ) {
    oneByOneLetters(displayText.split(""), frameCountPerLetter, 21);
    attractToMouse();
  }
}

// FUNCTIONS

const stringToLetters = (string) => {
  const inputString = `${string}`;
  const inputStringArray = inputString.split("");
  // console.log(inputStringArray);
  const outputStringArray = [];
  for (let i = 0; i < inputStringArray.length; i++) {
    if (letterLines.hasOwnProperty(`${inputStringArray[i]}`)) {
      outputStringArray.push(inputStringArray[i]);
      // console.log(outputStringArray);
    } else {
      console.log("couldn't get the right letterlines");
    }
  }

  // const maxChar = 4; // maximum nb of characters per row
  // const maxRows = 2; // maximum nb of rows
  // let rows;

  for (let j = 0; j < outputStringArray.length; j++) {
    const lines = letterLines[outputStringArray[j]];
    const letterWidth =
      outputStringArray.length === 1
        ? width / 2
        : width / outputStringArray.length;
    const letterHeight = height;
    const posX = outputStringArray.length === 1 ? width / 4 : letterWidth * j;
    const posY = 0;
    letters.push(new LineLetter(lines, letterWidth, letterHeight, posX, posY));
  }
};

const removeLetterPoints = () => {
  for (let i = 0; i < automatas.length; i++) {
    if (automatas[i].type !== "DEFAULT") {
      automatas.splice(i);
      letters.splice(0, letters.length);
    }
  }
};

const oneByOneLetters = (lettersArray, framesPerLetter, frameToStartOn) => {
  if (frameToStartOn < 1) {
    console.log(
      `variable FrameToStartOn should be greater than or equal to 1. Current value: ${frameToStartOn}`
    );
    return;
  }
  for (let i = 0; i < lettersArray.length; i++) {
    if (frameCount === frameToStartOn + framesPerLetter * i) {
      removeLetterPoints();
      stringToLetters(lettersArray[i]);
      console.log(i, framesPerLetter * i + 1, lettersArray[i]);
    }
  }
};

const attractToMouse = () => {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    automatas[0].size = 0;
    automatas[0].joinDistance = 150;
    automatas[0].xPosition = mouseX;
    automatas[0].yPosition = mouseY;
  }
};
