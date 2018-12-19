/*jshint esversion: 6 */
class Tourist {
  constructor (){
    this.witdh = 15;
    this.height = 15;
    this.positionX = 820;
    this.positionY = this.initialPositionY();
    this.speed = -6;
  }

  move (){
    this.positionX -= this.speed;
  }

  initialPositionY (){
    let initY = Math.floor(Math.random() * (395 - 250) + 250);
    return initY;
  }
}