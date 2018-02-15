const table = document.getElementById('table');
var context = table.getContext('2d');

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

      //draw Player paddle
      var player1 = new Paddle(50, 50, 0, 262);
      player1.render();

      //draw computer paddle
      var computer = new Paddle(50, 50, 550, 262);
      computer.render();


      //draw the ball
      var gameBall = new Ball(200, 200, 10, 0, Math.PI * 2, false);
      gameBall.render();

 }

 class Ball {
  constructor(xloc, yloc, radius, sAngle, eAngle, cClock) {
    this.xloc = xloc;
    this.yloc = yloc;
    this.radius = radius;
    this.sAngle = sAngle;
    this.eAngle = eAngle;
    this.cClock = cClock;
  }

   render(){
    context.beginPath();
    context.arc(this.xloc, this.yloc, this.radius, this.sAngle, this.eAngle, this.cClock);
    context.fillStyle = "white";
    context.fill();
    context.lineWidth = 2;
    context.stroke();
  }
}



 class Paddle {
  constructor(height, width, xloc, yloc) {
    this.dom = document.getElementById("paddle");
    this.height = height;
    this.width = width;
    this.xloc = xloc;
    this.yloc = yloc;
  }

  render(){
    context.drawImage(this.dom, this.xloc, this.yloc, this.height, this.width);
  }
}



window.onload = function() {

   render();
 };
