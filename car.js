/*jshint esversion: 6 */
class Car {
  constructor (){
    this.img = new Image();
    this.img.src = 'img/Car.png';
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