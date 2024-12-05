//imoported classes
import Mercat from "./mercat";
import Obstacle from "./obstacle";
import Log from "./log";

// our veriables
let state = "start";
let mercat;
let obstaclesRight = [];
let obstaclesLeft = [];
let logsRight = [];
let logsLeft = [];
let logsRight2 = [];
let lives = 3;
let score = 0;

function resetGame() {
  score = 0;
  lives = 3;
  mercat = new Mercat(250, 650, 30, 50);

  let obstaclesRight = [];
  let obstaclesLeft = [];
  let logsRight = [];
  let logsLeft = [];
  let logsRight2 = [];

  for (i = 0; i < 2; i++) {
    obstaclesRight.push(new Obstacle(600 + i * 300, 370, 85, 85, false));
    obstaclesLeft.push(new Obstacle(-100 - i * 300, 550, 85, 85, true));
  }
  for (i = 0; i < 2; i++) {
    logsRight.push(new Log(600 + i * 300, 118, 100, 30));
    logsLeft.push(new Log(-100 - i * 300, 155, 100, 30));
    logsRight2.push(new Log(600 + i * 300, 185, 100, 30));
  }
}
//Got help from student Alen Eminovic with uploading of images
function preload() {
  mercatImg = loadImage("/assets/mercat.png");
  lionImg = loadImage("/assets/lion.png");
  winScreenImg = loadImage("/assets/Winscreen.png");
  startScreenImg = loadImage("/assets/startscreen.png");
  loseScreenImg = loadImage("/assets/Losescreen.png");
  nutImg = loadImage("/assets/nut.png");
}

function setup() {
  createCanvas(600, 800);

  mercat = new Mercat(250, 650, 30, 50);

  for (i = 0; i < 2; i++) {
    obstaclesRight.push(new Obstacle(600 + i * 300, 370, 85, 85, false));
    obstaclesLeft.push(new Obstacle(-100 - i * 300, 550, 85, 85, true));
  }
  for (i = 0; i < 2; i++) {
    logsRight.push(new Log(600 + i * 300, 125, 100, 30));
    logsLeft.push(new Log(-100 - i * 300, 175, 100, 30));
    logsRight2.push(new Log(600 + i * 300, 220, 100, 30));
  }
}
//Meerkat going back to start position when he loses a life or gets a score
function resetMercat() {
  mercat.x = 250;
  mercat.y = 650;
}

function startScreen() {
  image(startScreenImg, 0, 0, 650, 800);
}
function loseScreen() {
  image(loseScreenImg, 0, 0, 650, 1000);
}
function winScreen() {
  image(winScreenImg, 0, 0, 650, 800);
}

//https://www.youtube.com/watch?v=_MyPLZSGS3s,
//Made the collision detection with help from this video
//Accessed: 2024-12-01
function checkCollision(mercat, obstacle) {
  return (
    mercat.x < obstacle.x + obstacle.width &&
    mercat.x + mercat.width > obstacle.x &&
    mercat.y < obstacle.y + obstacle.height &&
    mercat.y + mercat.height > obstacle.y
  );
}

function gameScreen() {
  //grass
  clear();
  noStroke();
  fill(19, 133, 16);
  rect(0, 680, 600, 150);
  rect(0, 0, 600, 120);
  //water
  noStroke();
  fill(62, 159, 214);
  rect(0, 120, 600, 150);
  //savannah
  fill(220, 199, 155);
  rect(0, 270, 600, 420);
  //display of the score
  textSize(20);
  fill(0, 255, 0);
  //see reference in line 226
  text(`Score: ${score}`, 10, 30);
  fill(255, 0, 0);
  text(`Lives: ${lives}`, 10, 60);

  image(nutImg, 300, 59, 25, 20);

  //Erik Sandquist helped us with lives counter
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
        loseScreen();
      } else {
        resetMercat();
      }
    }

    if (element.x > 620) {
      element.x = -70;
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
    }

    if (element.x < -70) {
      element.x = 600;
    }
  }

  for (let i = 0; i < logsLeft.length; i++) {
    const element = logsLeft[i];
    element.draw();
    element.x = element.x + 2;

    //got help from Erik Sandquist
    if (!(mercat.y > 255 || mercat.y < 100)) {
      if (checkCollision(mercat, element)) {
        onLog = true;
      }
    } else {
      onLand = true;
    }
    if (element.x > 600) {
      element.x = -90;
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
    if (element.x < -90) {
      element.x = 600;
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
    if (element.x < -90) {
      element.x = 600;
    }
  }

  if (onLog === false && onLand === false) {
    lives--;
    console.log(lives);
    if (lives <= 0) {
      state = "lost";
      resetGame();
    } else {
      resetMercat();
    }
    //end Erik Sandquist
  }
  //meerkat moving with the logs
  if (onLog === true && mercat.y > 180 && mercat.y < 260) {
    mercat.x = mercat.x - 2;
  } else if (mercat.y > 145 && mercat.y < 180) {
    mercat.x = mercat.x + 2;
  } else if (mercat.y > 80 && mercat.y < 145) {
    mercat.x = mercat.x - 2;
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
  // Chat GPT for score, https://chatgpt.com/share/6751a552-cf18-800d-957b-35b5245ff981
  if (mercat.y <= 60) {
    score++;
    if (score >= 3) {
      state = "win";
    } else {
      resetMercat();
    }
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
    //resetGame();
  }
}

function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "lost") {
    state = "game";
    resetGame();
  } else if (state === "win") {
    state = "game";
    resetGame();
  }
}
