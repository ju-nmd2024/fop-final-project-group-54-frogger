let state = "start";

let x = 200;
let y = 200;
let speed = 1;
function setup() {
  createCanvas(600, 800);
}

// function draw() {}

// function startScreen() {
//   //button
//   //background of savannah with lion from illustartor
//   //meerkat
// }

// function gameScreen() {}
// function winScreen() {
//   //meerkat holding nut
// }

// function loseScreen() {
//   //sad meerkat
// }

// function mouseClicked() {
//   if (state === "start") {
//     state = "game";
//   } else if (state === "lost") {
//     state = "start";
//     //velocity = 0; characterY = -400; from alien game
//   } else if (state === "win") {
//     state = "start";
//     //velocity = 0; characterY = -400; from alien game

//     // we have to fix so it is adapted to this game, if meerkat touches lion he loses
//   }
// }

class Mercat {
  constructor(x, y, width, height) {
    this.img = loadImage("/assets/mercat.png");
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    push();
    image(this.img, this.x, this.y, this.width, this.height);
    pop();
  }
}

class Obstacle {
  constructor(x, y, width, height) {
    //got help from student Alen on how to an an image
    this.img = loadImage("/assets/lion.png");
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    push();
    image(this.img, this.x, this.y, this.width, this.height);
    pop();
  }
}

const mercat = new Mercat(250, 650, 70, 100);
const obstacle = new Obstacle(600, 200, 100, 100);

function draw() {
  clear();
  noStroke();
  fill(220, 199, 155);
  rect(0, 650, 600, 150);
  obstacle.x = obstacle.x + speed;
  mercat.y = mercat.y + speed;
  obstacle.x = obstacle.x - 1;
  mercat.draw();
  obstacle.draw();
  if (keyIsDown(37)) {
    mercat.x = mercat.x - 5;
  }
  if (keyIsDown(39)) {
    mercat.x = mercat.x + 5;
  }
  if (keyIsDown(38)) {
    mercat.y = mercat.y - 5;
  } else if (keyIsDown(40)) {
    mercat.y = mercat.y + 5;
  } else {
    speed = 0;
  }
}
