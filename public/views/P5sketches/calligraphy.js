// // GLOBAL VARIABLES INITIATION

// // DEFAULT CANVAS DIMENSIONS
let width = 600;
let height = width;
let canvas;

// // BACKGROUND AND STROKE
const backgroundClr = `#000000`;

// // FRAMERATE
// const frameRateValue = 30;

// // INCREMENTOR
let t = 0;
let SLOW_INCREMENT = 0;

// particle system
const NUMBER_OF_AUTOMATAS = 50;
// const PARTICLE_JOIN_DISTANCE = noise(t + 300) * 50 + 40;
// const PARTICLE_JOIN_DISTANCE = 20 + width / NUMBER_OF_AUTOMATAS;
const DEFAULT_PARTICLE_JOIN_DISTANCE = 25;

const letterLines = {
  A: [
    [0.5, 0.2, 0.2, 0.8],
    [0.5, 0.2, 0.8, 0.8],
    [0.3, 0.6, 0.7, 0.6],
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
    joinDistance
  ) {
    if (size !== null) {
      this.size = size;
    } else {
      this.size = 1;
    }

    if (xPosition !== null) {
      this.xPosition = xPosition;
    } else {
      this.xPosition = width * Math.random();
    }

    if (yPosition !== null) {
      this.yPosition = yPosition;
    } else {
      this.yPosition = height * Math.random();
    }

    if (xDirection !== null) {
      this.xDirection = xDirection;
    } else {
      this.xDirection = random(-3, 3);
    }

    if (yDirection !== null) {
      this.yDirection = yDirection;
    } else {
      this.yDirection = random() > 0.5 ? 1 : -1;
    }

    if (joinDistance !== null) {
      this.joinDistance = joinDistance;
    } else {
      this.joinDistance = DEFAULT_PARTICLE_JOIN_DISTANCE;
    }

    // this.yDirection = random(-3, 3);
    // this.xDirection = random() > 0.5 ? 1 : -1;

    // const randomNum = Math.floor(random(Object.keys(currentPalette).length));
    // this.color = pickColorFromPalette(randomNum);

    // if (random() > 0.5) {
    //   this.color = c1;
    // } else {
    //   this.color = c2;
    // }
    this.color = color(random(250, 255), random(55), random(250, 255));
  }

  move = () => {
    if (this.xDirection === 0 && this.yDirection === 0) {
      this.xPosition =
        this.xPosition +
        cos(SLOW_INCREMENT * TWO_PI + this.color.levels[0]) / 30;
      this.yPosition =
        this.yPosition +
        sin(SLOW_INCREMENT * TWO_PI + this.color.levels[2]) / 2;
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
    // stroke("#fff");
    stroke(this.color);
    // strokeWeight(this.size);
    // point(this.xPosition, this.yPosition);
    fill(color(random(150, 255), random(55), random(150, 255)));
    circle(this.xPosition, this.yPosition, this.size);
  };

  joinParticles = (currentAutomataIndex) => {
    // const r = noise(t) * 255;
    // const g = noise(t + 500) * 255;
    // const b = noise(t + 1000) * 255;

    automatas.forEach((i) => {
      let dis = dist(this.xPosition, this.yPosition, i.xPosition, i.yPosition);
      if (dis < this.joinDistance && dis > 2) {
        noFill();
        strokeWeight(0.6);
        stroke(this.color);
        // stroke(random(50, 255), random(0, 105), random(200, 255));

        const bezX1 =
          (noise(this.color.levels[0] + t) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 2) +
          (this.xPosition + i.xPosition + 3 * randomGaussian()) / 2;

        const bezY1 =
          (noise(this.color.levels[1] + t) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 2) +
          (this.yPosition + i.yPosition + 3 * randomGaussian()) / 2;

        const bezX2 =
          (noise(this.color.levels[2] + t) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 2) +
          (this.xPosition + i.xPosition) / 2;

        const bezY2 =
          (noise(this.color.levels[0] + t + 255) - 0.5) *
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

        stroke(i.color);

        const bez2X1 =
          (noise(this.color.levels[0] + t + 1) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 4) +
          (this.xPosition + i.xPosition + 3 * randomGaussian()) / 2;

        const bez2Y1 =
          (noise(this.color.levels[1] + t + 2) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 4) +
          (this.yPosition + i.yPosition + 3 * randomGaussian()) / 2;

        const bez2X2 =
          (noise(this.color.levels[2] + t + 3) - 0.5) *
            (DEFAULT_PARTICLE_JOIN_DISTANCE / 4) +
          (this.xPosition + i.xPosition) / 2;

        const bez2Y2 =
          (noise(this.color.levels[0] + t + 4) - 0.5) *
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
      const a = new Automata(1, x, y, 0, 0);
      automatas.push(a);
      // a.draw();
    }
  }
}

class LineLetter {
  constructor(lines, width, height, x, y) {
    this.lines = lines;
    console.log(lines);
    for (const i of lines) {
      const x1 = x + i[0] * width;
      const y1 = y + i[1] * height;
      const x2 = x + i[2] * width;
      const y2 = y + i[3] * height;
      // stroke("#fff");
      // strokeWeight(3);
      // console.log(x1, y1, x2, y2);
      automatas.push(new Automata(null, x1, y1, 0, 0, 0));
      automatas.push(new Automata(null, x2, y2, 0, 0, 0));
      this.addAutomataHalfway(x1, y1, x2, y2);
    }
  }

  addAutomataHalfway = (x1, y1, x2, y2) => {
    if (dist(x1, y1, x2, y2) > DEFAULT_PARTICLE_JOIN_DISTANCE) {
      const halfX = (x1 + x2) / 2;
      const halfY = (y1 + y2) / 2;
      automatas.push(
        new Automata(null, halfX, halfY, 0, 0, DEFAULT_PARTICLE_JOIN_DISTANCE)
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
  // background(backgroundClr);

  // NOISE
  // noiseSeed(1999);

  for (let i = 0; i < NUMBER_OF_AUTOMATAS; i++) {
    automatas[i] = new Automata(null, null, null, null, null, null);
    automatas[i].draw();
  }

  // const letterA = new Letter({
  //     a: [0.2, 0.8],
  //     b: [0.25, 0.7],
  //     p2: [0.45, 0.35],
  //     p3: [0.5, 0.2],
  //     p4: [0.8, 0.8],
  //     p5: [0.3, 0.6],
  //     p6: [0.5, 0.6],
  //     // p7: [0.6, 0.6],
  //     p8: [0.7, 0.6],
  //     p9: [0.55, 0.3],
  //   },
  //   width,
  //   height,
  //   0,
  //   0
  // );

  const letterH = new LineLetter(letterLines.H, width / 2, height, 0, 0);

  const letterI = new LineLetter(
    letterLines.I,
    width / 2,
    height,
    width / 2,
    0
  );

  // const letterH = new LineLetter(
  //   letterLines.H,
  //   width / 4,
  //   height / 2,
  //   width / 8,
  //   height / 2
  // );
}

function draw() {
  background(backgroundClr);

  for (let i = 0; i < automatas.length; i++) {
    const automata = automatas[i];

    automata.draw();
    automata.move();
    automata.joinParticles(i);
  }

  // POINTS FOR DRAWING

  // INCREMENTS
  t += 0.15;
  SLOW_INCREMENT += 0.005;

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    automatas[0].xPosition = mouseX;
    automatas[0].yPosition = mouseY;
  }
}
