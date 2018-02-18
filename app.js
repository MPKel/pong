const table = document.getElementById('table');
var context = table.getContext('2d');


window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowDown":
      player1.move(1);
      break;
    case "ArrowUp":
      player1.move(-1);
      break;
   default:
      return;
  }
});

class Ball {
 constructor(xloc, yloc, radius, sAngle, eAngle, cClock) {
   this.xloc = xloc;
   this.yloc = yloc;
   this.radius = radius;
   this.sAngle = sAngle;
   this.eAngle = eAngle;
   this.cClock = cClock;
 }

  render(xLoc, yLoc){
   context.beginPath();
   context.arc(xLoc, yLoc, this.radius, this.sAngle, this.eAngle, this.cClock);
   context.fillStyle = "white";
   context.fill();
   context.lineWidth = 2;
   context.stroke();
 }
};

class Paddle {
 constructor(height, width, xloc, yloc) {
   this.dom = document.getElementById("paddle");
   this.height = height;
   this.width = width;
   this.xloc = xloc;
   this.yloc = yloc;
   this.velocity = 15;
 }
 render(){
   context.drawImage(this.dom, this.xloc, this.yloc, this.height, this.width);
 }

 move(x){
   if(this.yloc <= 10){
     this.yloc += 3;
   }
   else if(this.yloc >= 470){
     this.yloc -= 3;
   }
   else{
   this.yloc += this.velocity * x;
   }
 }
};


function render() {

      //draw the net
      context.beginPath();
      context.moveTo(300, 0);
      context.lineTo(300, 525);
      context.lineWidth = 10;
      context.stroke();

      //draw net holders
      context.rect(290, 0, 20, 20);
      context.fillStyle = 'red';
      context.fill();
      context.lineWidth = 4;
      context.strokeStyle = 'black';
      context.stroke();

      context.rect(290, 505, 20, 20);
      context.fillStyle = 'red';
      context.fill();
      context.lineWidth = 4;
      context.strokeStyle = 'black';
      context.stroke();

      //draw paddles
      player1.render();
      computer.render();
      //draw computer paddle
      gameBall.render(200, 200);

 }



var gameBall = new Ball(200, 200, 10, 0, Math.PI * 2, false);
var player1 = new Paddle(50, 50, 0, 262);
var computer = new Paddle(50, 50, 550, 262);



var animate = window.requestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) };


function step() {
  context.clearRect(0, 0, table.width,  table.height);
  render();

  animate(step);

}


window.onload = function() {
  animate(step);
 };
