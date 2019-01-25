/*jshint esversion: 6 */
document.onload = function() {
  const start = document.querySelector('#start-button');
  const play = document.querySelector('#play');
  const restart = document.querySelector('#re-start');
  const portada = document.querySelector('#portada');
  const body = document.querySelector('body');
  
  start.onclick = function (){
    start.style = 'display: none';
    play.style = 'display: flex';
    statistics.style = 'display: flex';
    portada.style = 'display: none';
    body.style = 'background-color: black';
    
    const ctx = canvas.getContext('2d');
    const game = new Game({
      ctx: ctx,
    });

    game.start(() => {
    });
  };


  restart.onclick = function (){
    document.location.reload();
  };

  const canvas = document.getElementById('game');

}();