// Two ArrayLists to store the vertices for two shapes
// This example assumes that each shape will have the same
// number of vertices, i.e. the size of each ArrayList will be the same
let circle = [];
let square = [];

// An ArrayList for a third set of vertices, the ones we will be drawing
// in the window
let morph = [];

  //     e.preventDefault();

// This boolean variable will control if we are morphing to a circle or square
let state = false;
let morphingend = false;
var displaymorph = false; 

var pageCase = 0;

var alphaE = 100;
var overlay = document.getElementById("overlay");
var skillwrapper = document.getElementById("overlay_skill");

let flock;


var about = document.getElementById("about_item");
var skill = document.getElementById("skill_item");

about.addEventListener("click",(e)=>{
  pause = true;

  overlay.classList.add('fade');
  if(pageCase!=0){
    skillwrapper.classList.remove('fade');
    pageCase = 0;

  }
  circleMorph(0,0,canvaSize.x-gap,canvaSize.y-gap);
  displaymorph = true;
  // about.style.scale = 0.5;
  
})

skill.addEventListener("click",(e)=>{




  skillwrapper.classList.add('fade');

  if(pageCase!=1){
    overlay.classList.remove('fade');
    pageCase = 0;

  }
  pause = true;
  pageCase = 1;
  circleMorph(0,0,canvaSize.x-gap,canvaSize.y-gap);
  displaymorph = true;
  // about.style.scale = 0.5;
  
})



function circleMorph(cx, cy, l,w ){
    for (let angle = 0, i = 0; angle < 360; angle += 9 , i++) {
        // Note we are not starting from 0 in order to match the
        // path of a circle.
        let v = p5.Vector.fromAngle(radians(angle - 135));

        v.mult(1);
        // v.x +=cx;
        // v.y+=cy;
        circle[i] = v;
        // if( initial == false){
        //   morph[i]= v;
          
        // }
        // Let's fill out morph ArrayList with blank PVectors while we are at it
       // morph.push(createVector());
      }
      //initial = true;



      let i = 0;
      for (let x = -l/2; x < l/2; x += l/10) {
        square[i]=createVector(x, -w/2);
        i++;
      }
      // Right side
      for (let y = -w/2; y < w/2; y += w/10) {
        square[i]=createVector(l/2, y);
        i++;
      }
      // Bottom
      for (let x = l/2; x > -l/2; x -= l/10) {
        square[i]=createVector(x, w/2);
        i++;
      }
      // Left side
      for (let y = w/2; y > -w/2; y -= w/10) {
        square[i]= createVector(-l/2, y);
        i++;
      }



      if(state == false){

        for (let i = 0; i < circle.length; i++) {
          morph[i] = circle[i]; 
          }

      }
     // console.log("xd")

      if(state == true){
        for (let i = 0; i < circle.length; i++) {
          morph[i] = square[i]; 
          }

      }
}

function morphing(st){
  // We will keep how far the vertices are from their target
  let totalDistance = 0;

  if(morphingend == false){

    // Look at each vertex
    for (let i = 0; i < circle.length; i++) {
      let v1;
      // Are we lerping to the circle or square?
      if (st) {
        v1 = circle[i];
      } else {
        v1 = square[i];
      }
      // Get the vertex we will draw
      let v2 = morph[i];
      // Lerp to the target
      v2.lerp(v1, 0.1);
      // Check how far we are from target
      totalDistance += p5.Vector.dist(v1, v2);
    }

    // If all the vertices are close, switch shape
    if (totalDistance < 0.1) {
      
      if(state == false){
        
        if(pageCase == 0){
          overlay.classList.add('fade');
        }

        alphaE = 50;

        morphingend = true;
        // console.log("gay")
        //state = true;
      }
      if(state == true){
        morphingend =false;
        displaymorph = false;
        state= false;
      }
    }
  }else{

    if(state == true){

      for (let i = 0; i < circle.length; i++) {
        let v1;
        // Are we lerping to the circle or square?
        if (st) {
          v1 = circle[i];
        } else {
          v1 = square[i];
        }
        // Get the vertex we will draw
        let v2 = morph[i];
        // Lerp to the target
        v2.lerp(v1, 0.1);
        // Check how far we are from target
        totalDistance += p5.Vector.dist(v1, v2);
        
      }
      if (totalDistance < 0.2) {      
          alphaE = 100;
          // intro.classList.add("fadin");

          morphingend =false;
          displaymorph = false;
          state= false;
      }

    }
    else{
      for (let i = 0; i < circle.length; i++) {
        morph[i] = square[i]; 
        }
    }
  }


  // Draw relative to center
  //translate(width / 2, height / 2);
  strokeWeight(2);
  // Draw a polygon that makes up all the vertices
  beginShape();
  noFill();
  //fill(255,255,255,100);
  stroke(255);

  morph.forEach(v => {vertex(v.x, v.y);});
  endShape(CLOSE);
}
//--------------------------------------------------------// background

let stars = [];
let speed;

let looping = true;

var pause = false;
var pauseresume = false;

var acceleration = 0;
var pausevar = {x:0, y:0} ;

var pauseRMax =22;
var pauseR=0;

var gap = 120;

const canvaSize = {
  x: 1000,
  y:1000
}
// Setup function
function setup() {

  canvaSize.x = window.innerWidth;
  canvaSize.y = window.innerHeight;
  canvas = createCanvas(canvaSize.x,canvaSize.y);
  canvas.parent("sketch-holder");
  resetSketch();

  //----------------------------// for morphing
  for (let a = 0; a < 360; a += 9) {

    circle.push(createVector());
    // Let's fill out morph ArrayList with blank PVectors while we are at it
    morph.push(createVector());
    square.push(createVector());
  }

}


// mouse click
function mouseClicked(data){
  

  if(displaymorph == false){
   // state = false;
    if( pause == false){

      pause = true;
    }else{
      pause = false;
    }

    //pausestar = createVector(mouseX-(canvaSize.x/2),mouseY-(canvaSize.y/2));

  }else{
    if( morphingend == true){

      if(mouseX<gap/2 
      ||mouseY<gap/2 || mouseY>(canvaSize.y-gap/2) ){
 
        if(state == false){
          if(pageCase ==0){
            overlay.classList.remove('fade');
          }else if(pageCase == 1){

          }
          state = true;
          circleMorph(pausevar.x,pausevar.y,windowWidth-gap,windowHeight-gap);
        }
      }

      // if(state == false){
      //   overlay.classList.toggle('fade');

      //   state = true;
      //   circleMorph(pausevar.x,pausevar.y,windowWidth-gap,windowHeight-gap);
      // }
    }
    //circleMorph(pausestar.x,pausestar.y,0,0);
    //console.log(pausestar.x);

  }
}

function resetSketch() {
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }
}

// Draws the stars from the stars array
function draw() {
  if( pause == false){
    speed = map(30, -width*1.5, width, 0, 80);
  }
  background(0);
  translate(width/2, height/2);
  for (let star of stars) {
    star.update();
    star.show();
  }

  if(displaymorph == true){
    morphing(state);
  }
   //  run flocking
  
  if(morphingend == true){
    if (pageCase == 1){
    flock.run();
    }
  }
}

//function mousePressed(){
  
  // if( pause == false){
  //   pause = true;
  // }else{
  //   pause = false;
  // }
//}

function windowResized() {
  if(windowWidth > 1080){
    canvaSize.x = window.innerWidth;
  }
  if( windowHeight>720){
    canvaSize.y = window.innerHeight;
  }
  resizeCanvas(canvaSize.x, canvaSize.y);
  circleMorph(pausevar.x,pausevar.y,canvaSize.x-gap,canvaSize.y-gap);
  
}




// Class star that has update and show functions
class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width*(2/4), width);

    this.l = 0;

    this.arrayR = []
    this.arrayG = []
    this.arrayB = []
    this.pz = this.z;
  }

  // Updates position by changing z value
  update() {
    
    // if(displaymorph == true){
    //   speed = 0;
    // }
     if(pause == true){
      speed = 1;
    }else{
      speed = map(30, -width*1.5, width, 0, 80);
    }

    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = random(width*(2/4), width);
      
      this.x = random(-200,200)
      this.y = random(-200,200)


      // for (let i = 0; i < 10; i++) {
      //   this.arrayR[i] = random(122,255)
      //   this.arrayG[i] = random(122,255)
      //   this.arrayB[i] = random(122,255)
      // }
         this.arrayR[0] = random(122,255)
         this.arrayG[0] = random(122,255)
         this.arrayB[0] = random(122,255)

      this.pz = this.z;
    }


  }




  // Draws the star with a line to its previous position
  show() {
    fill(255);
    strokeWeight(0.5);
    stroke(0);
    //noStroke();
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    
    
    let r = map(this.z, 0, width, 32, 0);


    let px = map(this.x / this.pz, 0, 1, 0, width);
    let py = map(this.y / this.pz, 0, 1, 0, height);


    let zdiff = (this.z -this.pz);


    this.pz = this.z;
    // stroke(255);
    // line(px, py, sx, sy);

    
    let dis = dist(px,py,mouseX-(canvaSize.x/2),mouseY-(canvaSize.y/2));
    
    

    if(pause == true && displaymorph == false){


      if( dis< r){

        if (mouseIsPressed === true) {
          if (mouseButton === LEFT) {
            
            pausevar.x = px;
            pausevar.y = py;
            circleMorph(px,py,canvaSize.x-gap,canvaSize.y-gap);

            displaymorph = true;
            //pausestar = this;
          }
        }
        if(this.l <1){
          this.l+=0.1;
        }
        r+= lerp(pauseR,pauseRMax,this.l);
        // if(pauseR < pauseRMax){
        //   pauseR += 2;
          
        // }
        // r+=pauseR;
      }else{
        this.l = 0;
      }
    }
    let tr = 3;

    for (let i = tr; i >0; i--) {

      let value = this.z/width;

      let zaccumulate = value*-40 *i;
      
      
      //fill(this.arrayR[i],this.arrayG[i],this.arrayB[i],100)
      fill(this.arrayR[0],this.arrayG[0],this.arrayB[0],alphaE)

      //let dr = map(raccumlate+10, -10*tr, 30, r, 0);
      let dr =map(this.z, 0, width, 32, 0);
      let dx = map(this.x / (this.z-zaccumulate), 0, 1, 0, width);
      let dy = map(this.y / (this.z-zaccumulate), 0, 1, 0, height);
      
      ellipse(dx, dy, dr, dr);
    }
    // fill(255,255,255,100)
    
    ellipse(sx, sy, r, r);

   // let fps = getTargetFrameRate();
   // text(fps, 43, 54);

  }
}

let img;

function preload(){
  flock = new Flock();
  setupBoid();
  img = loadImage('image/download.jpg');

}
// Add a new boid into the System
function mouseDragged() {
 // flock.addBoid(new Boid(mouseX-(canvaSize.x/2), mouseY-(canvaSize.y/2)));
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids


function setupBoid(){
  for (let i = 0; i < 4; i++) {
    flock.addBoid(new Boid(0,0));
  }
}
function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

// Boid class
// Methods for Separation, Cohesion, Alignment added



// function boidsetup(){

// }


function Boid(x, y) {
  this.img;
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 42.0;
  this.rmin = 42;
  this.rmax = 50;
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force

  // this.img = loadImage('image/download.jpg');
}

Boid.prototype.run = function(boids) {

  let dis = dist(this.position.x,this.position.y,mouseX-(canvaSize.x/2),mouseY-(canvaSize.y/2));
    
  if( dis< this.r){

    this.r=this.rmax;
  } else{
    this.r=this.rmin;
  }



 
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  if(force.mag()>0)
{
  this.acceleration.add(force);
}
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  let sep = this.separate(boids);   // Separation
  // let ali = this.align(boids);      // Alignment
  let coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  // ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  //this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  let theta = this.velocity.heading() + radians(90);
  fill(127);
  stroke(200);
  push();
  //translate(this.position.x, this.position.y);
  ellipse(this.position.x, this.position.y, this.r, this.r);




  // rotate(theta);
  // beginShape();
  // vertex(0, -this.r * 2);
  // vertex(-this.r, this.r * 2);
  // vertex(this.r, this.r * 2);
  // endShape(CLOSE);

    // tint(255,255,255,112);
    // image(img,this.position.x,this.position.y);

  pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r-(canvaSize.x/2))  this.position.x = width -(canvaSize.x/2)+ this.r;
  if (this.position.y < -this.r-(canvaSize.y/2))  this.position.y = height-(canvaSize.y/2) + this.r;
  if (this.position.x > width + this.r-(canvaSize.x/2)) this.position.x = -this.r-(canvaSize.x/2);
  if (this.position.y > height + this.r-(canvaSize.y/2)) this.position.y = -this.r-(canvaSize.y/2);
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  let desiredseparation = this.r + 50.0;
  let steer = createVector(0, 0);
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}

//////////////////////////////////////////////////////////////////////////////////////// FLOCKING



