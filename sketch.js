let centerX, centerY;
let moveX = 0;
let moveY = 0;
let particles = [];
const gravity = 0.09;
const colors = ['#FFD700', 'purple', '#DDA328', 'lime', 'cyan', 'magenta', '#FF8C00'];
let endColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(148, 177, 169); 

  pixelDensity(1);
  endColor = color(64, 0);

  // Central position
  centerX = width / 2;
  centerY = height / 2;

  // Initial drawing
  drawTree();
}

function draw() {
  // Update the position based on movement variables
  centerX += moveX;
  centerY += moveY;

  // Clear and redraw the scene
  background(165, 42, 42);
  drawTree();
  drawFireworks();
}

//The processing window resizes, resizes the canvas and updates the center position
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
}

//Handles arrow key press and release events, updating the movement speed
function keyPressed() {
  if (key === 'ArrowUp') {
    moveY = -5;
  } else if (key === 'ArrowDown') {
    moveY = 5;
  } else if (key === 'ArrowLeft') {
    moveX = -5;
  } else if (key === 'ArrowRight') {
    moveX = 5;
  }
}

function keyReleased() {
  if (key === 'ArrowUp' || key === 'ArrowDown') {
    moveY = 0;
  } else if (key === 'ArrowLeft' || key === 'ArrowRight') {
    moveX = 0;
  }
}

//Handles mouse click events and creates firework particles
function mousePressed() {
  particles.push(new Firework(mouseX, height));
}

function drawTree() {
  // Colors
  let orange = '#FF8C00';
  let red = '#FFD700';
  let yellow = '#DDA328';

  // Draw the background rectangle with a different color
  drawBackgroundRect(50, 50, width - 100, height - 100, color(0,0,0));

  // List of diameters of circles
  let diameters = [80, 50, 30, 60];

  // Central circle
  drawSplitCircle(centerX, centerY, diameters[0]);

  // Left arm circle
  drawSplitCircle(centerX - 0.82 * diameters[0], centerY, diameters[1]);
  drawSplitCircle(centerX - 0.7 * diameters[0] - diameters[1], centerY, diameters[2]);
  drawSplitCircleLR(centerX - 0.95 * diameters[0] - diameters[1] - diameters[2] / 2, centerY - 2 * diameters[2] / 2, diameters[3]);

  // Right arm circle
  drawSplitCircle(centerX + 0.88 * diameters[0], centerY, diameters[3]);
  drawSplitCircle(centerX + 1.26 * diameters[0] + diameters[2], centerY, diameters[3]);
  drawLine(centerX - 0.95 * diameters[0] - diameters[1] - diameters[2] / 2, centerY, centerX + 1.26 * diameters[0] + diameters[2] + diameters[3] / 2, centerY);
  drawLine(centerX - 0.95 * diameters[0] - diameters[1] - diameters[2] / 2, centerY - 2 * diameters[2] / 2 + diameters[3] / 2, centerX - 0.95 * diameters[0] - diameters[1] - diameters[2] / 2, centerY - 2 * diameters[2] / 2 - diameters[3] / 2);

  // List of diameters of circles
  diameters = [60, 50, 80, 30];

  push();
  // Draw the bottom rectangle here
  drawBottomRectangles(centerX, centerY + 1.11 * diameters[1] + diameters[2] + diameters[3], 300, 50, orange, yellow);

  // Draw a small orange rectangle over the yellow rectangle
  fill(orange); 
  noStroke();
  rect(centerX - 105, centerY + 1.7 * diameters[1] + diameters[2] + diameters[3], 50, 60);
  
  // Draw a small yellow circle on the small orange rectangle
  fill(yellow); 
  noStroke();
  ellipse(centerX - 80, centerY + 2.3 * diameters[1] + diameters[2] + diameters[3], 50);
  
  // Draw a small red rectangle over the yellow rectangle
  fill(red); 
  rect(centerX + 55, centerY + 1.7 * diameters[1] + diameters[2] + diameters[3], 60, 60);
  
  // Draw a small yellow circle over the small red rectangle
  fill(yellow); 
  ellipse(centerX + 85, centerY + 2.2 * diameters[1] + diameters[2] + diameters[3], 60);
  pop();  

  push()
  // Upper median radius
  drawSplitCircleLR(centerX, centerY - 0.92 * diameters[0], diameters[3]);
  drawSplitCircleLR(centerX, centerY - 1.68 * diameters[0], diameters[0]);

  // Lower median radius
  drawSplitCircleLR(centerX, centerY + 1.3 * diameters[1], diameters[1]);
  drawSplitCircleLR(centerX, centerY + diameters[1] + diameters[2], diameters[2]);
  drawSplitCircleLR(centerX, centerY + 1.71 * diameters[1] + diameters[2] + diameters[3], diameters[1]);
  drawLine(centerX, centerY + 1.71 * diameters[1] + diameters[2] + diameters[3] + diameters[1] / 2, centerX, centerY - 1.68 * diameters[0] - diameters[0] / 2);

  // Draw more middle bottom square, using red on top and orange on bottom
  drawSplitCircleTopRed(centerX + 0.8 * diameters[1], centerY + 1.71 * diameters[1] + diameters[2] + diameters[3], diameters[3]);
  drawSplitCircleTopRed(centerX + 1.7 * diameters[1], centerY + 1.71 * diameters[1] + diameters[2] + diameters[3], diameters[0]);
  drawSplitCircleTopRed(centerX - 0.8 * diameters[1], centerY + 1.71 * diameters[1] + diameters[2] + diameters[3], diameters[3]);
  drawSplitCircleTopRed(centerX - 1.6 * diameters[1], centerY + 1.71 * diameters[1] + diameters[2] + diameters[3], diameters[1]);
  drawLine(centerX - 1.6 * diameters[1] - diameters[1] / 2, centerY + 1.71 * diameters[1] + diameters[2] + diameters[3], centerX + 1.7 * diameters[1] + diameters[0] / 2, centerY + 1.71 * diameters[1] + diameters[2] + diameters[3]);

  // List of diameters of circles
  diameters = [30, 50, 80, 60];

  // Right side vertical circle
  drawSplitCircleLR(centerX + 1.26 * diameters[2] + diameters[0] + diameters[3] / 2, centerY - 1.8 * diameters[0] + diameters[2] * 0.1, diameters[1]);
  drawSplitCircleLR(centerX + 1.26 * diameters[2] + diameters[0] + diameters[3] / 2, centerY - 1.48 * diameters[0] - diameters[1] + diameters[2] * 0.1, diameters[0]);
  drawSplitCircleLR(centerX + 1.26 * diameters[2] + diameters[0] + diameters[3] / 2, centerY - 0.65 * diameters[0] - diameters[1] - diameters[2] + diameters[2] * 0.1, diameters[2]);
  drawLine(centerX + 1.26 * diameters[2] + diameters[0] + diameters[3] / 2, centerY, centerX + 1.26 * diameters[2] + diameters[0] + diameters[3] / 2, centerY - 0.65 * diameters[0] - diameters[1] - diameters[2] + diameters[2] * 0.1 - diameters[2] / 2);
  pop()

  // Draw background texture
  for (let i = 0; i < 30000; i++) {
    stroke(200, 200, 250, 50);
    point(random(width), random(height));
  }
}

//Helper functions for drawing various graphical elements
function drawBackgroundRect(x, y, width, height, color) {
  fill(color);
  rect(x, y, width, height);
}

function drawBottomRectangles(centerX, y, rectWidth, rectHeight, orange, yellow) {
  let totalWidth = rectWidth * 3;
  let startX = centerX - totalWidth / 2;
  
  fill(orange);
  noStroke();
  rect(startX + 50, y + 40, (rectWidth * 3) - 100, rectHeight + 10);
  
  fill(yellow);
  rect(startX + rectWidth, y + 30, rectWidth, rectHeight + 10);
}

function drawLine(x, y, x1, y1) {
  push();
  stroke(235, 187, 138);
  strokeWeight(3);
  line(x, y, x1, y1);
  pop();
}

function drawSplitCircle(x, y, diameter) {
  let orange = '#FF8C00';
  let red = '#FFD700';
  fill(orange);
  arc(x, y, diameter, diameter, PI, 0);
  fill(red);
  arc(x, y, diameter, diameter, 0, PI);
  noFill();
  ellipse(x, y, diameter, diameter);
}

function drawSplitCircleLR(x, y, diameter) {
  let orange = '#FF8C00';
  let red = '#FFD700';
  fill(orange);
  arc(x, y, diameter, diameter, HALF_PI, HALF_PI + PI);
  fill(red);
  arc(x, y, diameter, diameter, HALF_PI + PI, HALF_PI);
  noFill();
  ellipse(x, y, diameter, diameter);
}

function drawSplitCircleTopRed(x, y, diameter) {
  let orange = '#FF8C00';
  let red = '#FFD700';
  fill(red);
  arc(x, y, diameter, diameter, PI, 0);
  fill(orange);
  arc(x, y, diameter, diameter, 0, PI);
  noFill();
  ellipse(x, y, diameter, diameter);
}

//Updates and paints firework particle effects
function drawFireworks() {
  particles.forEach((p) => {
    p.step();
    p.draw();
  });
  particles = particles.filter((p) => p.isAlive);
}

//Define classes for particles and fireworks that are used to implement particle movement and drawing logic
class Particle {
  constructor(x, y, xSpeed, ySpeed, pColor, size) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.color = pColor;
    this.size = size;
    this.isAlive = true;
    this.trail = [];
    this.trailIndex = 0;
  }

  step() {
    this.trail[this.trailIndex] = createVector(this.x, this.y);
    this.trailIndex++;
    if (this.trailIndex > 5) {
      this.trailIndex = 0;
    }
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.ySpeed += gravity;

    if (this.y > height) {
      this.isAlive = false;
    }
  }

  draw() {
    this.drawTrail();
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size); 
  }

  drawTrail() {
    let index = 0;

    for (let i = this.trailIndex - 1; i >= 0; i--) {
      const tColor = lerpColor(color(this.color), endColor, index / this.trail.length);
      fill(tColor);
      noStroke();
      ellipse(this.trail[i].x, this.trail[i].y, this.size, this.size);
      index++;
    }

    for (let i = this.trail.length - 1; i >= this.trailIndex; i--) {
      const tColor = lerpColor(color(this.color), endColor, index / this.trail.length);
      fill(tColor);
      noStroke();
      ellipse(this.trail[i].x, this.trail[i].y, this.size, this.size);
      index++;
    }
  }
}

class Firework extends Particle {
  constructor(x, y) {
    super(x, y, random(-2, 2), random(-10, -15), random(colors), 10);
    this.countdown = random(35, 66);
  }

  step() {
    super.step();

    this.countdown--;
    if (this.countdown <= 0) {
      const explosionSize = random(20, 55);
      for (let i = 0; i < explosionSize; i++) {
        const speed = random(8, 15);
        const angle = random(TWO_PI);
        const xSpeed = cos(angle) * speed;
        const ySpeed = sin(angle) * speed;

        particles.push(new Particle(this.x, this.y, xSpeed, ySpeed, random(colors), 12));
      }
      this.isAlive = false;
    }
  }
}



