/*jshint esversion: 6 */
class Sound {
  constructor (){
    // this.sound = new Audio ('scream.wav');
    this.sound = document.createElement("audio");
    this.sound.src = 'scream.wav';
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none"; 
    document.body.appendChild(this.sound);
  }

  play (){
    this.sound.play();
  }
  
  stop (){
    this.sound.pause();
  }
} 