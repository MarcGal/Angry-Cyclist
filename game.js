/*jshint esversion: 6 */

class Game {

  constructor (options){
    this.background = new Background();
    this.biker2 = new Biker2();
    this.car = new Car();
    this.tourist = new Tourist();
    this.sound = new Sound ();
    this.blood = new Blood ();
    this.ctx = options.ctx;
    this.points = 0;
    this.updatePointsCB = undefined;
    this.lives = 3;
    this.intervalGame = undefined;
    this.Cars = [];
    this.Bloods = [];
    this.carPoints = 0;
    this.Tourists = [];
    this.carCreateTimer = 3000;
    this.status = 'running';
    this.startGeneratingCars();
    this.startGeneratingTourists();
    this.moveTourists ();
    this.orderToCleanBlood();
    this._updateBikerFrame();
    
  }


// ==================== BOARD FUCNCTIONS =====================================
  _drawBoard (){ 
    this.ctx.fillRect(0,0, 1000, 500);
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

  drawBiker2 (){
    this.ctx.drawImage(this.biker2.img, this.biker2.srcX, this.biker2.srcY, this.biker2.widthFrame, this.biker2.heightFrame, this.biker2.positionX, this.biker2.positionY, this.biker2.widthFrame, this.biker2.heightFrame);
  }

  _updateBikerFrame(){
    this.intervalId = clearInterval(this.intervalId);
    this.intervalId = setInterval(()=>{
      this.biker2.currentFrame = ++this.biker2.currentFrame % this.biker2.frameCount;
      this.biker2.srcX = this.biker2.currentFrame * this.biker2.widthFrame;
      // this._changeFrames();
    },70);
  }

  moveBiker (){
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 37: 
        this.biker2.moveLeft();
        this.biker2.srcY = 169.2;  
        break;
        case 38:
        this.biker2.moveForward();
        break;
        case 39: 
        this.biker2.moveRight();
        this.biker2.srcY = 42.3; 
        break;
        case 40:
        this.biker2.moveBackward();
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
    this.generateCarsInterval = setInterval(function(){this.generateCars();}.bind(this), this.carCreateTimer);
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
      this.carCreateTimer = 2000;
      this.Cars.forEach(car=>{
      car.speed = -2.5;
    });}.bind(this), 25000);
   }


// ============ TOURIST FUNCTIONS  ==========================================================

startGeneratingTourists() { 
 this.touristGeneratorInterval = setInterval(function(){this.generateTourists();}.bind(this), 2000);
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
 this.touristMovingInterval = setInterval(function(){this.updateFrame();}.bind(this), 250);
 return this.touristInterval;
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
    if (tourist.positionY > 500){
      array.splice(index, 1);
    }
  });
}

// ================== COLLISION FUNCTIONS ==========================================================

// CHECK COLLISION BETWEEN BIKER AND TOURISTS
collisionBikerTourist (){
  this.Tourists.forEach((tourist, index, array )=> {
    // 2D COLLISION CHECK ALGORITHN SEE MDN
    if ((this.biker2.positionX < tourist.positionX + 32 &&
        this.biker2.positionX + 43.2 > tourist.positionX &&
        this.biker2.positionY < tourist.positionY + 48 &&
        42.3 + this.biker2.positionY > tourist.positionY) === true){
        console.log('You just killed a tourist');
        // ADDS ONE POINT PER TOURIST
        this.generateBlood (tourist.positionX, tourist.positionY);
        this.sound.play();
        this.blinkBikerPoints();
        this.points ++;
        console.log(this.points);
        //  DELETE  TOURIST FROM ARRAY UPON COLLISION
        array.splice(index, 1);
    }
  });
}

blinkBikerPoints () {
  const bikerPoints = document.querySelector('#biker-points');
  bikerPoints.classList.add("blinkBikerPoints");
  this.removeblinkBikerPoints ();
}

removeblinkBikerPoints () {
  const bikerPoints = document.querySelector('#biker-points');
  setTimeout(function (){bikerPoints.classList.remove("blinkBikerPoints");}, 1000);
}

// CHECK COLLISION BETWEEN BIKER AND CARS
collisionBikerCar (){
  this.Cars.forEach((car)=> {
    // 2D COLLISION CHECK ALGORITHN SEE MDN
    if ((this.biker2.positionX < car.positionX + car.witdh &&
        this.biker2.positionX + 43.2 > car.positionX &&
        this.biker2.positionY < car.positionY + car.height &&
        42.3 + this.biker2.positionY > car.positionY) === true){
        console.log('You lost one live');
        // RESET TO STARTING POSITION WHEN HIT BY CAR
        this.biker2.positionX = 25;
        this.blinkLives ();
        this.lives --;
        console.log(this.lives);
    }
  });
}

blinkLives () {
  const lives = document.querySelector('#lives');
  lives.classList.add("blinkLives");
  this.removeBlinkLives ();
}

removeBlinkLives () {
  const lives = document.querySelector('#lives');
  setTimeout(function (){lives.classList.remove("blinkLives");}, 2000);
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
      this.generateBlood (tourist.positionX, tourist.positionY);
      this.sound.play();
      console.log('Car gains one point');
      // this.blinkCarPoints();
      this.carPoints ++;
      //  DELETE  TOURIST FROM ARRAY UPON COLLISION
      array.splice(index, 1);
      }
    });
  });
}

// blinkCarPoints () {
//   const carPoints = document.querySelector('#car-points');
//   carPoints.classList.add("blinkCarPoints");
//   this.removeBlinkCarPoints ();
// }

// removeBlinkCarPoints () {
//   const carPoints = document.querySelector('car-points');
//   setTimeout(function (){carPoints.classList.remove("blinkCarPoints");}, 1000);
// }


// ====================== Blood =======================================


generateBlood (positionX, positionY){
  this.Bloods.push(new Blood(positionX, positionY));
}

drawBlood (){
  this.Bloods.forEach((blood)=> {
  this.ctx.drawImage(blood.img, blood.positionX, blood.positionY + 10, blood.width, blood.height);
  });
}

orderToCleanBlood (){
  this.cleanBloodInterval = setInterval(function(){this.cleanBlood();}.bind(this), 2000);
}

cleanBlood (){
  this.Bloods.shift();
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
          clearInterval (this.touristMovingInterval);
          clearInterval (this.touristGeneratorInterval);
          clearInterval (this.generateCarsInterval);
          window.cancelAnimationFrame(this.intervalGame);
          this.status = 'paused';
        // Resume on second click
        } else if (this.status === 'paused'){
          this.startGeneratingTourists();
          this.moveTourists ();
          this.startGeneratingCars();
          this._update();
          this.status = 'running';
        }
      }
    };
  }    
  

  _update (){
    this.ctx.clearRect(0,0,1000,500);
    this._drawBoard();
    this.drawBackground();
    // this.moveBackground();
    this.drawBiker2 ();
    this.moveBiker();
    this._drawCars();
    this.deleteCars();
    this.moveCar();
    this._drawTourists();
    this.deleteTourists();
    this.crossStreet();
    this.collisionBikerTourist();
    this.drawBlood();
    this.showBikerPoints();
    this.collisionTouristCar();
    this.showCarPoints();
    this.collisionBikerCar();
    this.loseLive();
    this.speedUpCars();
    this.pause();
    this.gameOver();
    this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
  }

// ======================= GAME OVER FUNCTION ================================================================

  gameOver (){
    const over = document.querySelector('#game-over');
    const statistics = document.querySelector('#statistics');
    const body = document.querySelector('body');
    if (this.lives <= 0){
      over.style = 'display: flex';
      play.style = 'display: none';
      statistics.style = 'display: none';
      body.style = 'background-color: 000000';
    }
  }
}


