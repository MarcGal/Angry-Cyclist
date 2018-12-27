/*jshint esversion: 6 */
class Biker {

  constructor (){
    this.witdh = 25;
    this.height = 15;
    this.positionX = 25;
    this.positionY = 350;
  }

  moveRight (){
    if (this.positionX + 30 > 800){
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
    if (this.positionY - 6 < 250){
      console.log("You can't continue");
    } else {
      this.positionY -=10;
    }
  }

  moveBackward (){
    if (this.positionY + 30 > 400){
      console.log("You can't continue");
    } else {
      this.positionY +=10;
    }
  }

}

