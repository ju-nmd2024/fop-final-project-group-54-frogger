let state = "start";

function setup() {
  createCanvas(700, 700);
}

function draw() {}

function startScreen() {
  //button
  //background of savannah with lion from illustartor
  //meerkat
}

function gameScreen() {}

function winScreen() {
  //meerkat holding nut
}

function loseScreen() {
  //sad meerkat
}

function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "lost") {
    state = "start";
    //velocity = 0; characterY = -400; from alien game
  } else if (state === "win") {
    state = "start";
    //velocity = 0; characterY = -400; from alien game

    // we have to fix so it is adapted to this game, if meerkat touches lion he loses
  }
}
