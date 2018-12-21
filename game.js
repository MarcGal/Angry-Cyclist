/*jshint esversion: 6 */

class Game {

  constructor (options){
    this.biker = new Biker();
    this.tourist = new Tourist();
    this.ctx = options.ctx;
    this.points = 0;
    this.lives = 3;
    this.intervalGame = undefined;
    this.tourists = [];
    this.startGeneratingTourist();
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
    this.tourists.forEach((tourist) =>{
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(tourist.positionX, tourist.positionY, tourist.witdh, tourist.height);
    });
  }

  deleteTourists (){
    this.tourists.forEach((tourist, index, array) =>{
      if (tourist.positionX < 0){
        array.splice(index, 1);
      }
    });
  }

  moveTourist (){
    this.tourists.forEach(tourist=>{
      tourist.positionX += tourist.speed;
    });
  }

  startGeneratingTourist() { 
    setInterval(function(){this.generateTourists();}.bind(this), 1000);
  }

  generateTourists (){
    this.tourists.push(new Tourist());
    console.log(this.tourists);
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
    // this.startGeneratingTourist();
    this.deleteTourists();
    this.moveTourist();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }

}