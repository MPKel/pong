

function onReady() {

  const table = document.getElementById('table');
  var context = table.getContext('2d');

      // do cool things with the context
      // context.font = '40pt Calibri';
      // context.fillStyle = 'blue';
      // context.fillText('Hello World!', 150, 100);

      //draw the net
      context.beginPath();
      context.moveTo(300, 0);
      context.lineTo(300, 525);
      context.lineWidth = 10;
      // context.strokeStyle = 'rgb(32, 247, 128)'
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

      var paddle1 = document.getElementById("paddle");
      context.drawImage(paddle1, 0, 262, 50, 50);

      var paddle2 = document.getElementById("paddle");
      context.drawImage(paddle2, 550, 262, 50, 50);




 }


window.onload = function() {
   alert("The window has loaded!");
   onReady();
 };
