/*jshint esversion: 6 */
document.onload = function() {
  const start = document.querySelector('#start-page');
  const play = document.querySelector('#play');
  
  start.onclick = function (){
    play.style = 'display: block';
    console.log(start);
    start.style = 'display: none';
  };

  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  
  const game = new Game({
    ctx: ctx,
  });

  game.start((points) => {
    console.log(points);
  });

}();