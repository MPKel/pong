const table = document.getElementById('table');
var context = table.getContext('2d');
var playerScore = 0;
var showPlayerScore = document.getElementById('player-score');
var computerScore = 0;
var showComputerScore = document.getElementById('computer-score');

var winnerMessage = document.getElementById('game-message');
var winnerDiv = document.getElementById('game-over');
var resetBtn = document.getElementById('reset');


window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowDown":
      player1.move(8);
      break;
    case "ArrowUp":
      player1.move(-8);
      break;
   default:
      return;
  }
});


window.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowDown":
      player1.move(0);
      break;
    case "ArrowUp":
      player1.move(0);
      break;
   default:
      return;
  }
});


window.setInterval(function slideMove() {
 player1.yloc += player1.velocity;
  if (player1.yloc <= -3) {
   player1.yloc = -3;
  }
  if (player1.yloc >= 510) {
   player1.yloc = 510;
  }
}, 1000/60);






class Ball {
 constructor(xloc, yloc, radius, sAngle, eAngle, cClock) {
   this.xloc = xloc;
   this.yloc = yloc;
   this.radius = radius;
   this.sAngle = sAngle;
   this.eAngle = eAngle;
   this.cClock = cClock;
   this.xvel = Math.floor((Math.random() * 3) + 2);
   this.yvel = Math.floor((Math.random() * 2) + 1);
   this.dir = Math.floor((Math.random() * 4) + 1);

  }

  render(pLoc, cLoc){
   context.beginPath();
   context.arc(this.xloc, this.yloc, this.radius, this.sAngle, this.eAngle, this.cClock);
   context.fillStyle = "white";
   context.fill();
   context.lineWidth = 2;
   context.stroke();
   this.move(pLoc, cLoc);
 }

 move(pLoc, cLoc){
   if(this.xloc <= -30){
     this.xloc = 400;
     this.yloc = 300;
     this.dir = Math.floor((Math.random() * 4) + 1);
     this.xvel = Math.floor((Math.random() * 3) + 2);
     this.yvel = Math.floor((Math.random() * 2) + 1);
     computerScore += 1;
     return;
   }
   else if(this.xloc >= 830){
     this.xloc = 400;
     this.yloc = 300;
     this.dir = Math.floor((Math.random() * 4) + 1);
     this.xvel = Math.floor((Math.random() * 3) + 2);
     this.yvel = Math.floor((Math.random() * 2) + 2);
     playerScore += 1;
     return;
   }
   else {
     switch (this.dir) {
       case 1:
          if(this.check_hit(pLoc, cLoc)){
            this.xloc -= 3;
            this.dir = 4;
            break;
          }
          else if(this.yloc >= 515) {
            this.dir = 3;
            break;
           }
          else {
            this.xloc += this.xvel;
            this.yloc += this.yvel;
            break;
          }
       case 2:
           if(this.check_hit(pLoc, cLoc)){
             this.xloc += 3;
             this.dir = 3;
             break;
           }
           else if(this.yloc <= 5) {
            this.dir = 4;
            break;
          }
          else {
            this.xloc -= this.xvel;
            this.yloc -= this.yvel;
            break;
          }
      case 3:
          if(this.check_hit(pLoc, cLoc)){
            this.xloc -= 3;
            this.dir = 2;
            break;
          }
         else if(this.yloc <= 5) {
           this.dir = 1;
           break;
         }
         else {
           this.xloc += this.xvel;
           this.yloc -= this.yvel;
           break;
         }
      case 4:
        if(this.check_hit(pLoc, cLoc)){
          this.xloc += 3;
          this.dir = 1;
          break;
        }
        else if(this.yloc >= 515) {
          this.dir = 2;
          break;
        }
        else {
          this.xloc -= this.xvel;
          this.yloc += this.yvel;
          break;
        }
      default:
         return;
     }
   }
 }

 check_hit(pLoc, cLoc){
   if((this.xloc <= 50 && this.xloc >= 48 && this.yloc >= (pLoc - 10) && this.yloc <= (pLoc + 60)) || (this.xloc >= 750 && this.xloc <= 752 && this.yloc >= (cLoc - 10) && this.yloc <= (cLoc + 60) )){
     return true;
   }
 }
};

class Paddle {
 constructor(height, width, xloc, yloc, id) {
   this.dom = document.getElementById(id);
   this.height = height;
   this.width = width;
   this.xloc = xloc;
   this.yloc = yloc;
   this.velocity = 0;
 }
 render(){
   context.drawImage(this.dom, this.xloc, this.yloc, this.height, this.width);
 }

 move(x){
   this.velocity = x;
 }

 moveBot(x) {
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

 updateP(ballY, ballX) {
    if(ballY >= (this.yloc + 50) && ballX >= 548) {
      this.moveBot(1);
    }
    else if(ballY <= this.yloc && ballX >= 548){
      this.moveBot(-1);
    }

 }

};


function render() {


      //draw the net
      context.beginPath();
      context.moveTo(400, 0);
      context.lineTo(400, 525);
      context.lineWidth = 10;
      context.stroke();

      //draw net holders
      context.rect(390, 0, 20, 20);
      context.fillStyle = 'red';
      context.fill();
      context.lineWidth = 4;
      context.strokeStyle = 'black';
      context.stroke();

      context.rect(390, 505, 20, 20);
      context.fillStyle = 'red';
      context.fill();
      context.lineWidth = 4;
      context.strokeStyle = 'black';
      context.stroke();

      //draw paddles
      player1.render();

      computer.render();
      computer.updateP(gameBall.yloc, gameBall.xloc);
      gameBall.render(player1.yloc, computer.yloc);
      showPlayerScore.innerHTML = "Player: <span class='numScore'>" + playerScore + '</span>';
      showComputerScore.innerHTML = "Evil AI: <span class='numScore'> " + computerScore + '</span>';



 }



var gameBall = new Ball(400, 300, 10, 0, Math.PI * 2, false);
var player1 = new Paddle(50, 50, 0, 262, "paddle1");
var computer = new Paddle(50, 50, 750, 262, "paddle");
computer.velocity = 3;

function resetGame(){
    playerScore = 0;
    computerScore = 0;
    winnerDiv.style.visibility = 'hidden';
    gameBall.xloc = 400;
    gameBall.yloc = 300;
    gameBall.xvel = Math.floor((Math.random() * 3) + 2);
    gameBall.yvel = Math.floor((Math.random() * 2) + 1);
    gameBall.dir = Math.floor((Math.random() * 4) + 1);
    animate(step);
}

var animate = window.requestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) };


function step() {
  context.clearRect(0, 0, table.width,  table.height);
  render();

  if(playerScore >= 2 || computerScore >= 2) {
    if(playerScore > computerScore) {
      winnerMessage.innerHTML = "You Win!!!";
    }
    else{
      winnerMessage.innerHTML = "You Lose!";
    }
    winnerDiv.style.visibility = 'visible';
    resetBtn.onclick = function(){resetGame()};
  }
  else {

   animate(step);
 }
}


window.onload = function() {
  animate(step);
 };
