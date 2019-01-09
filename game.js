/*jshint esversion: 6 */

class Game {

  constructor (options){
    this.background = new Background();
    this.biker = new Biker();
    this.car = new Car();
    this.tourist = new Tourist();
    this.ctx = options.ctx;
    this.points = 0;
    this.updatePointsCB = undefined;
    this.lives = 3;
    this.intervalGame = undefined;
    this.Cars = [];
    this.carPoints = 0;
    this.Tourists = [];
    this.status = 'running';
    this.startGeneratingCars();
    this.startGeneratingTourists();
    this.moveTourists ();
  }


// ==================== BOARD FUCNCTIONS =====================================
  _drawBoard (){ 
    this.ctx.fillRect(0,0, 800, 400);
  }

  drawBackground (){
    this.ctx.drawImage(this.background.img, this.background.x, 0);
    if (this.background.speed < 0) {
      this.ctx.drawImage(this.background.img, this.background.x + this.background.width, 0);
    } else {
      this.ctx.drawImage(this.background.img, this.background.x - this.background.width, 0);
    }
  }

  moveBackground(){
    // Infinite backgroun loop
    this.background.x += this.background.speed; 
    this.background.x %= this.background.width;
  }

  //=============== BIKER FUNCTIONS ================================================


  _drawBiker (){
    this.ctx.drawImage(this.biker.img, this.biker.positionX, this.biker.positionY);
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


  showBikerPoints (){
    let bikerPoints = document.querySelector('#biker-points>h2>span');
    bikerPoints.innerText = this.points;
    return bikerPoints;
  }

  loseLive (){
    let bikerLive = document.querySelector('#lives>h2>span');
    bikerLive.innerText = this.lives;
    return bikerLive;
  }

  //=============== CAR FUNCTIONS ==========================================================

  startGeneratingCars() { 
    setInterval(function(){this.generateCars();}.bind(this), 2500);
  }


  generateCars (){
    this.Cars.push(new Car());
  }


  _drawCars (){
    this.Cars.forEach((car) =>{
      this.ctx.drawImage(car.img, car.positionX, car.positionY);
    });
  }

  moveCar (){
    this.Cars.forEach(car=>{
      car.positionX += car.speed;
    });
  }

  deleteCars (){
    this.Cars.forEach((car, index, array) =>{
      if (car.positionX < -40){
        array.splice(index, 1);
      }
    });
  }

  showCarPoints (){
    let carPoints = document.querySelector('#car-points>h2>span');
    carPoints.innerText = this.carPoints;
    return carPoints;
  }

// Increase the speed of cars after 30 seconds
  speedUpCars (){
    setTimeout(function (){
      this.Cars.forEach(car=>{
      car.speed = -2.5;
    });}.bind(this), 25000);
   }



// ============ TOURIST FUNCTIONS  ==========================================================

startGeneratingTourists() { 
  setInterval(function(){this.generateTourists();}.bind(this), 2000);
}

generateTourists (){
  this.Tourists.push(new Tourist());
}

_drawTourists (){
  this.Tourists.forEach((tourist) =>{
    this.ctx.drawImage(tourist.img, tourist.srcX, tourist.srcY, tourist.widthFrame, tourist.heightFrame, tourist.positionX, tourist.positionY, tourist.widthFrame, tourist.heightFrame);
  });
}

moveTourists () {
  setInterval(function(){this.updateFrame();}.bind(this), 250);
}

updateFrame () {
  this.Tourists.forEach((tourist) =>{
    tourist.currentFrame = ++tourist.currentFrame % tourist.frameCount;
    tourist.srcX = tourist.currentFrame * tourist.widthFrame;
  });
}

crossStreet (){
  this.Tourists.forEach(tourist => {
    if (tourist.crossingPoint !== tourist.positionX){
      tourist.positionX -= tourist.speed;
    } else {
      tourist.positionY += tourist.speed;
      tourist.srcY = 0; // change sprite frame to front walk
    }
  });
}

deleteTourists (){
  this.Tourists.forEach((tourist, index, array) =>{
    if (tourist.positionY > 400){
      array.splice(index, 1);
    }
  });
}


// Increase the speed of tourists after 25 seconds
// speedUpTourists (){
//   setTimeout(function (){
//     this.Tourists.forEach(tourist=>{
//     tourist.speed = 0.8;
//   });}.bind(this), 25000);
//  }

// ================== COLLISION FUNCTIONS ==========================================================

// CHECK COLLISION BETWEEN BIKER AND TOURISTS
collisionBikerTourist (){
  this.Tourists.forEach((tourist, index, array )=> {
    // 2D COLLISION CHECK ALGORITHN SEE MDN
    if ((this.biker.positionX < tourist.positionX + 32 &&
        this.biker.positionX + this.biker.witdh > tourist.positionX &&
        this.biker.positionY < tourist.positionY + 48 &&
        this.biker.height + this.biker.positionY > tourist.positionY) === true){
        console.log('You just killed a tourist');
        // ADDS ONE POINT PER TOURIST
        this.points ++;
        console.log(this.points);
        //  DELETE  TOURIST FROM ARRAY UPON COLLISION
        array.splice(index, 1);
    }
  });
}


// CHECK COLLISION BETWEEN BIKER AND CARS
collisionBikerCar (){
  this.Cars.forEach((car)=> {
    // 2D COLLISION CHECK ALGORITHN SEE MDN
    if ((this.biker.positionX < car.positionX + car.witdh &&
        this.biker.positionX + this.biker.witdh > car.positionX &&
        this.biker.positionY < car.positionY + car.height &&
        this.biker.height + this.biker.positionY > car.positionY) === true){
        console.log('You lost one live');
        // RESET TO STARTING POSITION WHEN HIT BY CAR
        this.biker.positionX = 25;
        this.lives --;
        console.log(this.lives);
    }
  });
}

// CHECK COLLISION BETWEEN TOURISTS AND CARS
collisionTouristCar (){
  this.Cars.forEach((car)=> {
    this.Tourists.forEach((tourist, index, array) => {
      // 2D COLLISION CHECK ALGORITHN SEE MDN
    if ((tourist.positionX < car.positionX + car.witdh &&
      tourist.positionX + 32 > car.positionX &&
      tourist.positionY < car.positionY + car.height &&
      48 + tourist.positionY > car.positionY) === true){
      console.log('Car gains one point');
      this.carPoints ++;
      // tourist.img.src = tourist.blood.src;  TEST NOT WORKING
      //  DELETE  TOURIST FROM ARRAY UPON COLLISION
      array.splice(index, 1);
      }
    });
  });
}


// ============ START && UPDATE && PAUSE FUNCTIONS  ==========================================================

  
  start (){
      this._update();
  }


  pause (){
    window.onkeydown = (e) => {
      if (e.keyCode === 32) {
        // Pause on first click
        if (this.status === 'running'){
          window.cancelAnimationFrame(this.intervalGame);
          this.status = 'paused';
        // Resume on second click
        } else if (this.status === 'paused'){
          this._update();
          this.status = 'running';
        }
      }
    };
  }    
  

  _update (){
    this.ctx.clearRect(0,0,800,400);
    this._drawBoard();
    this.drawBackground();
    // this.moveBackground();
    this._drawBiker();
    this.moveBiker();
    this._drawCars();
    this.deleteCars();
    this.moveCar();
    this._drawTourists();
    this.deleteTourists();
    this.crossStreet();
    this.collisionBikerTourist();
    this.showBikerPoints();
    this.collisionTouristCar();
    this.showCarPoints();
    this.collisionBikerCar();
    this.loseLive();
    this.speedUpCars();
    this.pause();
    // this.resume();   NOT WORKING
    this.gameOver();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }

// ======================= GAME OVER FUNCTION ================================================================

  gameOver (){
    const over = document.querySelector('#game-over');
    const statistics = document.querySelector('#statistics');
    if (this.lives <= 0){
      over.style = 'display: flex';
      play.style = 'display: none';
      statistics.style = 'display: none';
      body.style = 'background-color: black';
    }
  }
}

