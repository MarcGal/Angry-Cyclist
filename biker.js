/*jshint esversion: 6 */
class Biker {

  constructor (){
    this.witdh = 15;
    this.height = 15;
    this.positionX = 25;
    this.positionY = 350;
  }

  moveRight (){
    this.positionY +=7;
  }

  moveLeft (){
    this.positionY -=7;
  }

  moveForward (){
    this.positionX +=7;
  }

  moveBackward (){
    this.positionX -=7;
  }
}