/*jshint esversion: 6 */
class Tourist {
  constructor (){
    this.witdh = 15;
    this.height = 15;
    this.positionX = 820;
    this.positionY = 350;
    this.speed = -6;
  }

  move (){
    this.positionX -= this.speed;
  }
}