/*jshint esversion: 6 */

class Game {

  constructor (options){
    this.biker = new Biker();
    this.car = new Car();
    this.ctx = options.ctx;
    this.points = 0;
    this.lives = 3;
    this.intervalGame = undefined;
    this.Cars = [];
    this.startGeneratingCars();
  }

  _drawBoard (){ 
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0,0, 800, 400);
  }

  _drawBiker (){
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.biker.positionX, this.biker.positionY, this.biker.witdh, this.biker.height);
  }

  _drawCars (){
    this.Cars.forEach((car) =>{
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(car.positionX, car.positionY, car.witdh, car.height);
    });
  }

  deleteCars (){
    this.Cars.forEach((car, index, array) =>{
      if (car.positionX < 0){
        array.splice(index, 1);
      }
    });
  }

  moveCar (){
    this.Cars.forEach(car=>{
      car.positionX += car.speed;
    });
  }

  startGeneratingCars() { 
    setInterval(function(){this.generateCars();}.bind(this), 2000);
  }

  generateCars (){
    this.Cars.push(new Car());
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
    this._drawCars();
    this.deleteCars();
    this.moveCar();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }

}