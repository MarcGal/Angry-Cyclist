/*jshint esversion: 6 */
class Tourist {
  constructor (){
    this.witdh = 15;
    this.height = 15;
    this.positionX = 810;
    this.positionY = 230;
    this.speed = 0.5;
    this.crossingPoint = this.crossingPoint();
  }

  move (){
      this.positionX -= this.speed;
  }

  crossingPoint () {
    this.crossingPoint = Math.floor(Math.random() * (750 - 40) + 40);
    console.log(`this is my crossing point ${this.crossingPoint}`);
    return this.crossingPoint;
  }

}