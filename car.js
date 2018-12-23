/*jshint esversion: 6 */
class Car {
  constructor (){
    this.witdh = 40;
    this.height = 25;
    this.positionX = 820;
    this.positionY = this.initialPositionY();
    this.speed = -1;
  }

  move (){
    this.positionX -= this.speed;
  }

  initialPositionY (){
    let initY = Math.floor(Math.random() * (395 - 250) + 250);
    return initY;
  }
}