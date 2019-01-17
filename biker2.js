/*jshint esversion: 6 */
class Biker2 {
  constructor (){
    this.img = new Image ();
    this.img.src = 'img/RIDE2.png';
    this.width = 216;
    this.height = 254;
    this.imgRows = 6;
    this.imgCols = 5;
    this.rowRight = 1;
    this.rowLeft = 4;
    this.widthFrame = this.width/this.imgCols;
    this.heightFrame = this.height/this.imgRows;
    this.srcX = 43.2;
    this.srcY = 42.3;
    this.currentFrame = 0;
    this.frameCount = 5;
    this.positionX = 25;
    this.positionY = 330;
    this.speed = 0.5;
  }

  moveRight (){
    if (this.positionX + 30 > 1000){
      console.log("You can't continue");
    } else {
      this.positionX +=10;
    }
  }

  moveLeft (){
    if (this.positionX - 6 < 0){
      console.log("You can't continue");
    } else {
      this.positionX -=10;
    }
  }

  moveForward (){
    if (this.positionY - 6 < 295){
      console.log("You can't continue");
    } else {
      this.positionY -=10;
    }
  }

  moveBackward (){
    if (this.positionY + 30 > 500){
      console.log("You can't continue");
    } else {
      this.positionY +=10;
    }
  }

}