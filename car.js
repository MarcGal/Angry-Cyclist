/*jshint esversion: 6 */
class Car {
  constructor (){
    this.img = new Image();
    this.img.src = 'img/Car_3Small.png';
    this.witdh = 80;
    this.height = 40;
    this.positionX = 1020;
    this.positionY = this.initialPositionY();
    this.speed = -1;
  }

  move (){
    this.positionX -= this.speed;
  }

  initialPositionY (){
    let initY = Math.floor(Math.random() * (470 - 305) + 305);
    return initY;
  }
} 