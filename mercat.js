export default class Mercat {
  constructor(x, y, width, height) {
    this.img = loadImage("/assets/mercat.png");
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    push();
    noFill();
    rect(this.x, this.y, this.width, this.height);
    image(this.img, this.x, this.y, this.width, this.height);
    pop();
  }
}
