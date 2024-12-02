import Mercat from "./mercat";
import Obstacle from "./obstacle";
import Log from "./log";

let state = "start";
let mercat;
let obstaclesRight = [];
let obstaclesLeft = [];
let logsRight = [];
let logsLeft = [];
let logsRight2 = [];
let lives = 3;

function resetGame() {
  state = "start";
  mercat = new Mercat(250, 650, 30, 50);

  let obstaclesRight = [];
  let obstaclesLeft = [];
  let logsRight = [];
  let logsLeft = [];
  let logsRight2 = [];

  for (i = 0; i < 25; i++) {
    obstaclesRight.push(new Obstacle(600 + i * 300, 370, 85, 85, false));
    obstaclesLeft.push(new Obstacle(-100 - i * 300, 550, 85, 85, true));
  }
  for (i = 0; i < 25; i++) {
    logsRight.push(new Log(600 + i * 300, 118, 100, 30));
    logsLeft.push(new Log(-100 - i * 300, 155, 100, 30));
    logsRight2.push(new Log(600 + i * 300, 185, 100, 30));
  }
}

function preload() {
  mercatImg = loadImage("/assets/mercat.png");
  lionImg = loadImage("/assets/lion.png");
}

function setup() {
  createCanvas(600, 800);

  mercat = new Mercat(250, 650, 30, 50);

  for (i = 0; i < 25; i++) {
    obstaclesRight.push(new Obstacle(600 + i * 300, 370, 85, 85, false));
    obstaclesLeft.push(new Obstacle(-100 - i * 300, 550, 85, 85, true));
  }
  for (i = 0; i < 25; i++) {
    logsRight.push(new Log(600 + i * 300, 125, 100, 30));
    logsLeft.push(new Log(-100 - i * 300, 175, 100, 30));
    logsRight2.push(new Log(600 + i * 300, 220, 100, 30));
  }
}
function resetMercat() {
  mercat.x = 250;
  mercat.y = 650;
}

function startScreen() {
  fill(200, 200, 200);
  textSize(40);
  text("click to play", width / 2, height / 2);
}
function loseScreen() {
  fill(255, 0, 0);
  textSize(32);
  text("Nooo Mercat is dead", width / 2, height / 2);
}
function winScreen() {
  fill(0, 255, 1);
  textSize(30);
  text("Yeyyy i made it", width / 2, height / 2);
}
function checkCollision(mercat, obstacle) {
  return (
    mercat.x < obstacle.x + obstacle.width &&
    mercat.x + mercat.width > obstacle.x &&
    mercat.y < obstacle.y + obstacle.height &&
    mercat.y + mercat.height > obstacle.y
  );
}

function gameScreen() {
  //sand
  clear();
  noStroke();
  fill(220, 199, 155);
  rect(0, 680, 600, 150);
  //water
  noStroke();
  fill(0, 50, 255);
  rect(0, 125, 600, 150);
  //lions moving, Erik Sandquist helped us with following 10 lines
  let onLog = false;
  let onLand = false;
  let logSpeed = 0;
  for (let i = 0; i < obstaclesLeft.length; i++) {
    const element = obstaclesLeft[i];
    element.draw();
    element.x = element.x + 5;

    if (checkCollision(mercat, element)) {
      lives--;
      if (lives <= 0) {
        state = "lost";
        resetGame();
      } else {
        resetMercat();
      }

      //state = "lost";
      //resetGame();
    }
  }

  for (let i = 0; i < obstaclesRight.length; i++) {
    const element = obstaclesRight[i];
    element.draw();
    element.x = element.x - 5;

    if (checkCollision(mercat, element)) {
      lives--;
      if (lives <= 0) {
        state = "lost";
        resetGame();
      } else {
        resetMercat();
      }
      //state = "lost";
      //resetGame();
    }
  }

  for (let i = 0; i < logsLeft.length; i++) {
    const element = logsLeft[i];
    element.draw();
    element.x = element.x + 2;

    if (!(mercat.y > 255 || mercat.y < 100)) {
      if (checkCollision(mercat, element)) {
        onLog = true;
      }
    } else {
      onLand = true;
    }
  }

  for (let i = 0; i < logsRight.length; i++) {
    const element = logsRight[i];
    element.draw();
    element.x = element.x - 2;

    if (!(mercat.y > 255 || mercat.y < 100)) {
      if (checkCollision(mercat, element)) {
        onLog = true;
      }
    } else {
      onLand = true;
    }
  }

  for (let i = 0; i < logsRight2.length; i++) {
    const element = logsRight2[i];
    element.draw();
    element.x = element.x - 2;

    if (!(mercat.y > 255 || mercat.y < 100)) {
      if (checkCollision(mercat, element)) {
        onLog = true;
        logVelocity = element.y;
      }
    } else {
      onLand = true;
    }
  }

  if (onLog === false && onLand === false) {
    state = "lost";
    resetGame();
  } else if (onLog === true) {
    mercat.x = mercat.x + 2;
  }

  if (keyIsDown(37)) {
    mercat.x = mercat.x - 5;
  }
  if (keyIsDown(39)) {
    mercat.x = mercat.x + 5;
  }
  if (keyIsDown(38)) {
    mercat.y = mercat.y - 5;
  }
  if (keyIsDown(40)) {
    mercat.y = mercat.y + 5;
  }

  if (mercat.y <= 110) {
    winScreen();
    state = "win";
  }
  mercat.draw();
}

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "win") {
    winScreen();
  } else if (state === "lost") {
    loseScreen();
  }
}

function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "lost") {
    state = "start";
  } else if (state === "win") {
    state = "start";
  }
}
