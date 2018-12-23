/*jshint esversion: 6 */
class Tourist {
  constructor (){
    this.witdh = 15;
    this.height = 15;
    this.positionX = this.initialPositionX();
    this.positionY = 250;
    this.speed = 0.5;
  }

  move (){
    this.positionY += this.speed;
  }
  

  initialPositionX (){
    let initX = Math.floor(Math.random() * (700 - 40) + 40);
    return initX;
  }
}