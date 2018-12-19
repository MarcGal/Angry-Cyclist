/*jshint esversion: 6 */
class Biker {

  constructor (){
    this.witdh = 15;
    this.height = 15;
    this.positionX = 25;
    this.positionY = 350;
  }

  moveRight (){
    this.positionY +=4;
  }

  moveLeft (){
    this.positionY -=4;
  }

  moveForward (){
    this.positionX +=4;
  }

  moveBackward (){
    this.positionX -=4;
  }
}