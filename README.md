# Javascript-Canvas-Animation---Dog-running-
A small animation made in JavaScript Canvas to demonstrate - Character movement, Particle Movement and Color gradients

# The animation looks like below -  
![alt text](https://github.com/TheRungtaLibrary/Javascript-Canvas-Animation---Dog-running-/blob/master/Pug-Animation.gif "Dog motion and particle animation")

# How does it work?

The animation has two individual animations running in parallel to create a environment like scenario - 
- Particle random movement
- The Dog running movement


# The particles have random movement at 60fps

 * particle constructor defines the initial position(s) of each particle -
 * pointX - X-position of particle 
 * pointY - Y-position of particle
 * horDrctn - Horizontal direction of particle
 * drawParticle - Method to draw particle on canvas

```
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
```

 * particleArray is used to hold a 100 particles of random movement
 *  to create a floating cluster effect.
 
```
var particleArray = [];

for (var i = 0; i < 100; i++) {
  particleArray[i] = new particle();
}
```

 * randomPoint and randomIntFromInterval methods generate random X and Y points
 * for particles
 
```
function randomPoint() {
  return arrPoints[Math.floor(Math.random() * arrPoints.length)];
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
```

# The Dog is running at 10fps

 * The Dog object defines the following -
 * imgDog - Image object to draw the Dog sprite on Canvas
 * frameHeight - Height of a frame in sprite
 * xDog - X-Position of frame on Canvas
 * yDog - Y-Position of frame on Canvas
 * animateDog - Method to animate dog movement
 
```
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
	
