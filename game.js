/*jshint esversion: 6 */

class Game {

  constructor (options){
    this.biker = new Biker();
    this.car = new Car();
    this.tourist = new Tourist();
    this.ctx = options.ctx;
    this.points = 0;
    this.lives = 3;
    this.intervalGame = undefined;
    this.Cars = [];
    this.Tourists = [];
    this.startGeneratingCars();
    this.startGeneratingTourists();
  }

  _drawBoard (){ 
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0,0, 800, 400);
  }

  //=============== BIKER FUNCTIONS =========================


  _drawBiker (){
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.biker.positionX, this.biker.positionY, this.biker.witdh, this.biker.height);
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

  //=============== CAR FUNCTIONS =========================

  _drawCars (){
    this.Cars.forEach((car) =>{
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(car.positionX, car.positionY, car.witdh, car.height);
    });
  }

  deleteCars (){
    this.Cars.forEach((car, index, array) =>{
      if (car.positionX < -40){
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
    setInterval(function(){this.generateCars();}.bind(this), 4000);
  }

  generateCars (){
    this.Cars.push(new Car());
  }

// ============ TOURIST FUNCTIONS  =========================

startGeneratingTourists() { 
  setInterval(function(){this.generateTourists();}.bind(this), 3000);
}

generateTourists (){
  this.Tourists.push(new Tourist());
}

_drawTourists (){
  this.Tourists.forEach((tourist) =>{
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(tourist.positionX, tourist.positionY, tourist.witdh, tourist.height);
  });
}

deleteTourists (){
  this.Tourists.forEach((tourist, index, array) =>{
    if (tourist.positionY > 400){
      array.splice(index, 1);
    }
  });
}

crossStreet (){
  this.Tourists.forEach(tourist => {
    if (tourist.crossingPoint !== tourist.positionX){
      tourist.positionX -= tourist.speed;
    } else {
      tourist.positionY += tourist.speed;
    }
  });
}

// ================== COLLISION FUNCTIONS =========================

// CHECK COLLISION BETWEEN BIKER AND TOURISTS
collisionBikerTourist (){
  this.Tourists.forEach((tourist, index, array )=> {
    // 2D COLLISION CHECK ALGORITHN SEE MDN
    if ((this.biker.positionX < tourist.positionX + tourist.witdh &&
        this.biker.positionX + this.biker.witdh > tourist.positionX &&
        this.biker.positionY < tourist.positionY + tourist.height &&
        this.biker.height + this.biker.positionY > tourist.positionY) === true){
        console.log('You just killed a tourist');
        //  DELETE  TOURIST FROM ARRAY UPON COLLISION
        array.splice(index, 1);
    }
  });
}


// CHECK COLLISION BETWEEN BIKER AND TOURISTS
collisionBikerCar (){
  this.Cars.forEach((car)=> {
    // 2D COLLISION CHECK ALGORITHN SEE MDN
    if ((this.biker.positionX < car.positionX + car.witdh &&
        this.biker.positionX + this.biker.witdh > car.positionX &&
        this.biker.positionY < car.positionY + car.height &&
        this.biker.height + this.biker.positionY > car.positionY) === true){
        console.log('You lost one live');
        this.biker.positionX = 25;
        this.lives --;
        console.log(this.lives);
    }
  });
}



// ============ START & UPDATE FUNCTIONS  =========================

  
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
    this._drawTourists();
    this.deleteTourists();
    this.crossStreet();
    this.collisionBikerTourist();
    this.collisionBikerCar ();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }
}