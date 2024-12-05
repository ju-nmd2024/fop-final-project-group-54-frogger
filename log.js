export default class Log {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 40;
  }
  draw() {
    fill(216, 176, 145);
    rect(this.x, this.y, this.width, this.height);
  }
}
