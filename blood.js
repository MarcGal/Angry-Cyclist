/*jshint esversion: 6 */

class Blood {
  
  constructor (positionX, positionY) {
    this.img = new Image ();
    this.img.src = 'img/Blood_trans.png';
    this.width = 30;
    this.height = 20;
    this.positionX = positionX;
    this.positionY = positionY;
  }
  
}