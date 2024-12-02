export default class Obstacle {
  constructor(x, y, width, height, mirrored) {
    //got help from student Alen on how to an an image
    this.img = loadImage("/assets/lion.png");
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mirrored = mirrored;
  }

  draw() {
    push();

    //if (this.x < 0) {
    // scale(-1, 1);
    //translate( -this.x - this.width, 0);
    //}

    // Got help from Erik Sandquist
    if (this.mirrored) {
      translate(this.x + this.width, this.y);
      scale(-1, 1);
    } else {
      translate(this.x, this.y);
    }
    // End help from Erik

    image(this.img, 0, 0, 85, 85);
    pop();
  }
}
