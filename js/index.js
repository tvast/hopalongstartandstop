'use strict';

// messing around trying to figure out the hopalong orbit visualizer
// TODO: cache 3d primatives inside a 'vertex-object' for perf

/* options */
  // var h = Math.floor((Math.random() * 3000) + 100);


var hop = {

  drawWidth: Math.ceil(10 * window.innerWidth / 1000), // ellipse radius (px)
  numPoints: 2000, // attractor iterations
  frameRate: 30,
  fillAlpha: 0.25,
  scale: 10,
  layers: 7,
  layerSeparation: 10,
  layerRandomness: 0.90
};

/**
 * Hopalong coefficient constraints
 * A: offsets y from previous x value, giving the hopalong the attractor quality
 * B: [scales x] allows for sub groups within the hopalong
 * C: [clamps x] keeps sub groups more tightly packed by clamping
 * D (orbit only): measure of even-ness between local groups
 * E (orbit only): measure of x:y ratio
 */

var AMAX = 30,
    AMIN = -30,
    BMAX = 1.8,
    BMIN = 0.2,
    CMAX = 15,
    CMIN = 4,
    DMIN = 0,
    DMAX = 60,
    EMIN = 0,
    EMAX = 90;

/** 
 * Hopalong Strange Attractor 
 * Generate hopalong and returns 
 * an obj with attached x,y arrays and 
 * min/max stats
 */


function hopalong(a, b, c, d, e, N) {
  var x,
      y,
      z,
      xl,
      xmin,
      ymin,
      xmax,
      ymax,
      xx,
      yy,
      xy = {
    sets: [],
    yMin: 0,
    yMax: 0,
    xMin: 0,
    xMax: 0
  };

  // hopalong object split into layers
  for (var sub = 0; sub < hop.layers; sub++) {

    // nudge each layer
    x = sub * random(-1 * hop.layerRandomness, hop.layerRandomness);
    y = sub * random(-1 * hop.layerRandomness, hop.layerRandomness);

    xy.sets.push({
      x: [],
      y: []
    });

    xmin = xmax = ymin = ymax = 0;

    // hopalong logic
    for (var i = 0; i < N; i += 1) {

      // orbit
      z = d + sqrt(abs(b * x - c));

      if (x > 0) xx = y - z;else if (x == 0) xx = y;else xx = y + z;

      y = a - x;
      x = xx + e;

      // // standard
      // xx = y - sign(x) * Math.sqrt(abs(b*x - c));
      // yy = a - x;
      // x = xx;
      // y = yy;

      // save
      xy.sets[sub].x.push(x);
      xy.sets[sub].y.push(y);
    }

    xmin = min(xy.sets[sub].x);
    xmax = max(xy.sets[sub].x);
    ymin = min(xy.sets[sub].y);
    ymax = max(xy.sets[sub].y);

    if (xmin < xy.xMin) xy.xMin = xmin;
    if (xmax > xy.xMax) xy.xMax = xmax;
    if (ymin < xy.yMin) xy.yMin = ymin;
    if (ymax > xy.yMax) xy.yMax = ymax;
  }

  return xy;
}

/* Draw the hopalong contained in the XY obj */
function drawHopalong(XY) {
  var x, y, yc, xc, c, zshift, thisset;
  var sep = hop.layerSeparation,
      scale,
      r = hop.drawWidth;

  // Canvas
  if (height < width) scale = height * 0.75 / (XY.yMax - XY.yMin);else scale = width * 0.75 / (XY.xMax - XY.xMin);
  scale /= 1;
  yc = abs(XY.yMin) * scale + centerY - (XY.yMax - XY.yMin) / 2 * scale;
  xc = abs(XY.xMin) * scale + centerX - (XY.xMax - XY.xMin) / 2 * scale;

  //  WebGL
    scale = hop.scale;

  for (var s = 0; s < XY.sets.length; s++) {

    zshift = sep * s;
    thisset = XY.sets[s];

    for (var i = 0; i < thisset.x.length; i++) {

      c = 'hsla(' + [i % 360, 95 + '%', 70 + '%', Math.pow(0.75, s)].join(',') + ')';

      // Canvas
      x = map(thisset.x[i], XY.xMin, XY.xMax, XY.xMin + zshift, XY.xMax - zshift);
      y = map(thisset.y[i], XY.yMin, XY.yMax, XY.yMin + zshift, XY.yMax - zshift);
      fill(color(c));
      ellipse(x * scale + xc, y * scale + yc, hop.drawWidth * pow(0.5, s));

      // WebGL
      // x = map(thisset.x[i], -1, 1, -1, 1);
      // y = thisset.y[i];
      // push();
      // translate(x*scale, y*scale, -1 * sep * s);
      // specularMaterial(color(c));
      // plane(r,r);
      // pop();
    }
  }
}

/**
 * P5.js
 */
var img,
    centerX,
    centerY,
    sign = Math.sign,
    hopa;
      var devant = 0;
var derriere = 0;
var hauteur = 0;

var cameraz = 0;
    camerax = 0,
    cameray = 0,
    tick = 80;

function camera () {

    // setInterval(function(){ 
          for (i = 0; i < 0; i++) { 
      var devant = Math.floor((Math.random() * 80) + 1);
var derriere = Math.floor((Math.random() * 80) + 1);
var hauteur = Math.floor((Math.random() * 80) + 1);

var cameraz = devant,
    camerax = derriere,
    cameray = hauteur,
    tick = 80;    
}
    // }, 20);



}

var devant = Math.floor((Math.random() * 80) + 1);
var derriere = Math.floor((Math.random() * 80) + 1);
var hauteur = Math.floor((Math.random() * 80) + 1);

var cameraz = devant,
    camerax = derriere,
    cameray = hauteur,
    tick = 80;

/* */
function setup() {
  createCanvas(windowWidth, windowHeight);
  // perspective(55 / 180 * PI, width/height, 0.1, 500);
  // background(1);

  // set p5 draw options
  var h = Math.floor((Math.random() * 360) + 1);
  var s = Math.floor((Math.random() * 100) + 1);
  var l = Math.floor((Math.random() * 100) + 1);
  colorMode(HSL, h, s, l, 1);
  ellipseMode(CENTER);
  frameRate(hop.frameRate);
  noStroke();

  centerX = width / 2;
  centerY = height / 2;

  hopa = hopalong(random(AMIN, AMAX), random(BMIN, BMAX), random(CMIN, CMAX), random(DMIN, DMAX), random(EMIN, EMAX), hop.numPoints);
}

/* Draw call */
function draw() {
  // background(0);

  cameraz = 20*tick--;
  camera(camerax, cameray, cameraz);
  drawHopalong(hopa);
  // ambientLight(60);

  // reset camera
    if (cameraz < -1 * hop.layerSeparation * (hop.layers + 1)) {
      hopa = hopalong(random(AMIN, AMAX),
                    random(BMIN, BMAX),
                    random(CMIN, CMAX),
                    random(DMIN, DMAX),
                    random(EMIN, EMAX),
                    hop.numPoints);
      tick = 80;
    }
}







/**
* Handlers 
*/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // background(0);
  centerX = width / 2;
  centerY = height / 2;
}

// function mouseMoved() {
//   camerax = mouseX - width/2;
//   cameray = mouseY - height/2;
// }

// function mouseClicked() {
//   hopa = hopalong(random(AMIN, AMAX), 
//     random(BMIN, BMAX), 
//     random(CMIN, CMAX), 
//     random(DMIN, DMAX), 
//     random(EMIN, EMAX), hop.numPoints);
// }
var songSpeed = document.getElementById("player").defaultPlaybackRate
var intervale = 3000
var time

var myVar = setInterval(function(){ myFunction() }, 1000);

function myFunction() {

  console.log('coucou');
  var myAudio = document.getElementById("player");
  var rate = myAudio.defaultPlaybackRate;
  console.log(rate)
  var time = 1/rate;
  var long = myAudio.duration;
  console.log(time); // => duration, in seconds
  var i=0;
  for (i = 0; i < long ; i++) { 
     // var myVar setInterval(function(){ 
   hopa = hopalong(random(AMIN, AMAX), 
    random(BMIN, BMAX), 
    random(CMIN, CMAX), 
    random(DMIN, DMAX), 
    random(EMIN, EMAX), hop.numPoints);




   // var intervale = Math.floor((Math.random() * 80) + 1);
   // location.reload();


// }, 1000);




}



}

function redraw(){
  var context= document.getElementsByTagName('canvas')[0].getContext("2d");
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
}
  // Clears the canvas

function myStopFunction() {
    clearInterval(myVar);
   var context= document.getElementsByTagName('canvas')[0].getContext("2d");
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);  
  console.log('ca marche')
}



      


    




