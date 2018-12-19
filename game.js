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

  _drawBoard () { 
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0,0, 800, 400);
  }

  _drawBiker (){
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.biker.positionX, this.biker.positionY, this.biker.witdh, this.biker.height);
  }

  
  start (updatePoints){
    this.points = updatePoints;
    this._update();
  }

  _update (){
    this._drawBoard();
    this._drawBiker();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }

}