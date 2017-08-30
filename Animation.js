/*
 * We have TWO animations running in parallel on different frame rates -
 * The Dog object contains the variables and functions critical for the dog movement
 * The Particle constructor contains the variables and functions critical for the particle movement 
 */

/*
 * Variable declarations and assigments - 
 * canvas and context - To hold reference of canvas and its 2D context
 * count - To keep track of current frame number for Dog sprite. 
 * 	This is to identify the end of sprite so as to start again
 * arrPoints - To generate random Y-axis values in order to simulate random
 *   movement for particles
 * frameCount - Total number of frames in one cycle
 * frameRate - Rate of frames per second  
 * 
 */
var canvas = document.getElementById("mCanvas");
var context = canvas.getContext("2d");
var count = 0;
var arrPoints = [-1, -0.5, 0.5, 1];
var frameCount = 10;
var frameRate = 20;

//To get the reference of RequestAnimationFrame
window.reqAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame || window.msRequestAnimationFrame;
})();

//Assigning Width and Height of Canvas
canvas.width = 500;
canvas.height = 300;

/*
 * The Dog object defines the following -
 * imgDog - Image object to draw the Dog sprite on Canvas
 * frameHeight - Height of a frame in sprite
 * xDog - X-Position of frame on Canvas
 * yDog - Y-Position of frame on Canvas
 * animateDog - Method to animate dog movement
 */
var Dog = {
		imgDog: new Image(),
		frameHeight: 0,
		frameIndex: 0,
		xDog: 2 * canvas.width / 5,
		yDog:165,
		animateDog: function() {
			  var currFrameX;
			  if (this.frameIndex > 0 && this.frameIndex % 5 === 0) {
				  this.frameIndex = 0;
				  this.frameHeight += 61;
			  }
			  if (count === 9) {
				  this.frameIndex = 0;
				  this.frameHeight = 0;
				  count = 0;
			  }
			  currFrameX = 82 * (this.frameIndex % frameCount);
			  this.imgDog.src = 'pug-running_transparent.png';
			  context.drawImage(this.imgDog, currFrameX, this.frameHeight, 82, 61, this.xDog, this.yDog, 82, 61);
			} 
}

/*
 * particle constructor defines the initial position(s) of each particle -
 * pointX - X-position of particle 
 * pointY - Y-position of particle
 * horDrctn - Horizontal direction of particle
 * drawParticle - Method to draw particle on canvas
 */
function particle() {
  this.pointX = randomIntFromInterval(canvas.width / 4, 3 * canvas.width / 4);
  this.pointY = randomIntFromInterval(canvas.height / 4, 200);
  this.horDrctn = this.pointX < canvas.height / 2 ? "left" : "right";
  this.alpha = 1;
  this.drawParticle = function(pointX, pointY, context) {
    context.beginPath();
    context.fillStyle = "#D95D50";
    context.arc(pointX, pointY, 2, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
  }
}

/*
 * particleArray is used to hold a 100 particles of random movement
 *  to create a floating cluster effect.
 */
var particleArray = [];

for (var i = 0; i < 100; i++) {
  particleArray[i] = new particle();
}

/*
 * randomPoint and randomIntFromInterval methods generate random X and Y points
 * for particles
 */
function randomPoint() {
  return arrPoints[Math.floor(Math.random() * arrPoints.length)];
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
 * drawRect - To create Window size background and surface rectangle.
 * It creates two separate paths on the canvas
*/
function drawRect() {

  var grd = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  grd.addColorStop(0.4, "#FFEAD5");
  grd.addColorStop(0.8, "#D9A49C");
  context.fillStyle = grd;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.strokeStyle = "white";
  context.moveTo(canvas.width / 4, 3 * canvas.height / 4);
  context.lineTo(3 * canvas.width / 4, 3 * canvas.height / 4);
  context.stroke();
  context.closePath();

}

/*
 * drawParticles - To draw a particle on given X and Y points on canvas
*/
function drawParticles(pointX, pointY, context) {
  context.beginPath();
  context.fillStyle = "yellow";
  context.arc(pointX, pointY, 2, 0, Math.PI * 2, false);
  context.fill();
  context.closePath();
}

/*
 * changeDirection - To change horizontal direction of particles. The direction changes 
 * after every 3000ms
*/
function changeDirection(particle) {
  var newDirctn;
  setInterval(function() {
    newDirctn = particle.directn === "left" ? "right" : "left";
    particle.directn = newDirctn;
  }, 3000);
}

/*
 * animate - To animate particles by changing the X and Y points on each frame change.
 * This results in smooth random movement. the dog animation function is also called.
*/
function animate() {

  for (var j = 0; j < particleArray.length; j++) {

    if (particleArray[j].horDrctn === "left") {
      particleArray[j].pointX += Math.random();
    } else if (particleArray[j].horDrctn === "right") {
      particleArray[j].pointX -= Math.random();
    }

    particleArray[j].pointY += randomPoint();
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawRect();

  for (var k = 0; k < particleArray.length; k++) {
    particleArray[k].drawParticle(particleArray[k].pointX, particleArray[k].pointY, context);

  }
  
  Dog.animateDog();

  reqAnimFrame(function(t) {
    animate();
  });
}

animate();

/*
 * The setInterval controls the horizontal and vertical directions of the particles.
 * Horizontal movement is restricted between canvas.width and (3 * canvas.width) / 4
 * Vertical movement is also restricted
*/
setInterval(function() {
  for (var j = 0; j < particleArray.length; j++) {
    if (particleArray[j].horDrctn === "left" && particleArray[j].pointX >= (3 * canvas.width) / 4) {
      particleArray[j].horDrctn = "right";
    } else if (particleArray[j].horDrctn === "right" && particleArray[j].pointX <= canvas.width / 4) {
      particleArray[j].horDrctn = "left";
    }

    if (particleArray[j].pointY >= 210) {
      particleArray[j].alpha = 0;
      particleArray[j].pointX = randomIntFromInterval(canvas.width / 4, 3 * canvas.width / 4);
      particleArray[j].pointY = randomIntFromInterval(canvas.height / 4, 200);
      particleArray[j].alpha = 1;
    }
  }
}, 1000);

/*
 * The setInterval runs the Dog animation on a frame rate of 10fps
*/
setInterval(function() {
  ++Dog.frameIndex;
  count++;
  Dog.animateDog();
}, 1000 / frameRate);
