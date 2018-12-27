/*jshint esversion: 6 */
document.onload = function() {
  const start = document.querySelector('#start-page');
  const play = document.querySelector('#play');
  const restart = document.querySelector('#re-start');
  
  // start.onclick = function (){
  //   play.style = 'display: block';
  //   start.style = 'display: none';
  // };


  restart.onclick = function (){
    document.location.reload();
  };

  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  
  const game = new Game({
    ctx: ctx,
  });

  

  game.start(() => {
    // console.log(points);
    // showBikerPoints();
  });

}();