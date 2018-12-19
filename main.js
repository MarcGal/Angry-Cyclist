/*jshint esversion: 6 */
document.onload = function() {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  
  const game = new Game({
    ctx: ctx,
  });

  game.start((points) => {
    console.log(points);
  });

}();