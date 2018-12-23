/*jshint esversion: 6 */
class Biker {

  constructor (){
    this.witdh = 25;
    this.height = 15;
    this.positionX = 25;
    this.positionY = 350;
  }

  moveRight (){
    this.positionX +=10;
  }

  moveLeft (){
    this.positionX -=10;
  }

  moveForward (){
    this.positionY -=10;
  }

  moveBackward (){
    this.positionY +=10;
  }
}