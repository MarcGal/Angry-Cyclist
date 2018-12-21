/*jshint esversion: 6 */
class Biker {

  constructor (){
    this.witdh = 15;
    this.height = 15;
    this.positionX = 25;
    this.positionY = 350;
  }

  moveRight (){
    this.positionX +=7;
  }

  moveLeft (){
    this.positionX -=7;
  }

  moveForward (){
    this.positionY -=7;
  }

  moveBackward (){
    this.positionY +=7;
  }
}