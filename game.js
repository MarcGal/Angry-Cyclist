/*jshint esversion: 6 */

class Game {

  constructor (options){
    this.biker = new Biker();
    this.tourist = new Tourist();
    this.ctx = options.ctx;
    this.points = 0;
    this.lives = 3;
    this.intervalGame = undefined;
  }

  _drawBoard (){ 
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0,0, 800, 400);
  }

  _drawBiker (){
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.biker.positionX, this.biker.positionY, this.biker.witdh, this.biker.height);
  }

  _drawTourist (){
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.tourist.positionX, this.tourist.positionY, this.tourist.witdh, this.tourist.height);
  }


  moveTourist (){
    this.tourist.positionX += this.tourist.speed;
  }

  moveBiker (){
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 37: 
        this.biker.moveLeft();  
        break;
        case 38:
        this.biker.moveForward();
        break;
        case 39: 
        this.biker.moveRight(); 
        break;
        case 40:
        this.biker.moveBackward();
        break;
      }
    };
  }
  
  start (updatePoints){
    this.points = updatePoints;
    this._update();
  }

  _update (){
    this.ctx.clearRect(0,0,800,400);
    this._drawBoard();
    this._drawBiker();
    this.moveBiker();
    this._drawTourist();
    this.moveTourist();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }

}