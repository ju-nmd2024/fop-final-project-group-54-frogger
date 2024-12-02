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
    rect(this.x, this.y, this.width, this.height);
    image(this.img, this.x, this.y, this.width, this.height);
    pop();
  }
}

// export default class Mercat {
//   constructor(x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.img = null;
//   }
//   loadImage(path) {
//     this.img = loadImage(path);
//   }
//   draw() {
//     if (this.img) {
//       push();
//       image(this.img, this.x, this.y, this.width, this.height);
//       pop();
//     }
//   }
// }
