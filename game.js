let state = "start";

function setup() {
  createCanvas(800, 800);
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
      image(this.img, this.x, this.y, this.width, this.height);  // Now it will use the width and height
      pop();
  }
}


const mercat = new Mercat(200, 300, 70, 100);  

function setup() {
  createCanvas(400, 400);  
}

function draw() {
  clear(); 
  mercat.draw();  
}
