// Base reference dimensions from original static design
const BASE_W = 1400;
const BASE_H = 770;

// Relative helper functions
function rx(val) { return (val / BASE_W) * width; }
function ry(val) { return (val / BASE_H) * height; }

var ymax;
var ymaxs = [15, 3.5, 1, 30, 3, 25]; 
var ylabels = [15, 7, 4, 10, 6, 10]; 
var controls = []; 
var changers = []; 
var a = 1;
var b = 7;
var n = 4;
var functions = [];

var realI1 = 1; 
var realI2 = 5; 

function preload() {
  functions.push(loadImage("y1.png"));
  functions.push(loadImage("y2.png"));
  functions.push(loadImage("y3.png"));
  functions.push(loadImage("y4.png"));
  functions.push(loadImage("y5.png"));
  functions.push(loadImage("y6.png"));
}

function setup() {
  ymax = ymaxs[0];
  createCanvas(windowWidth, windowHeight);
  initUI();
  calc();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initUI();
  calc();
}

function initUI() {
  controls = [];
  changers = [];
  
  // Controls (Top Right Riemann Selectors)
  controls.push(new control(920, 10, "LEFT", 1));
  controls.push(new control(1035, 10, "RIGHT", 2));
  controls.push(new control(1150, 10, "MIDPOINT", 3));
  controls.push(new control(1265, 10, "TRAP", 4));
  
  // Controls (Bottom Function Selectors)
  controls.push(new control(5, 700, "Y1", 5));
  controls.push(new control(210, 700, "Y2", 6));
  controls.push(new control(415, 700, "Y3", 7));
  controls.push(new control(620, 700, "Y4", 8));
  controls.push(new control(825, 700, "Y5", 9));
  controls.push(new control(1030, 700, "Y6", 10));
  
  // Changers (Parameter Adjustment Buttons)
  changers.push(new changer(1170, 215, "adown"));
  changers.push(new changer(1270, 215, "aup"));
  changers.push(new changer(1170, 270, "bdown"));
  changers.push(new changer(1270, 270, "bup"));
  changers.push(new changer(1170, 93, "ndown"));
  changers.push(new changer(1270, 93, "nup"));
}

function getAnswer() {
  var answer;
  if (realI2 === 5) {
    answer = ((-1 / 6) * b ** 3 + 2 * b ** 2 + 3 * b) - ((-1 / 6) * a ** 3 + 2 * a ** 2 + 3 * a);
  } else if (realI2 === 6) {
    answer = ((2 / 3) * b ** (3 / 2)) - ((2 / 3) * a ** (3 / 2));
  } else if (realI2 === 7) {
    answer = ((-6 / PI) * cos(b * PI / 6) - (-6 / PI) * cos(a * PI / 6));
  } else if (realI2 === 8) {
    answer = 2 * ((Math.exp(b / 2)) - (Math.exp(a / 2)));
  } else if (realI2 === 9) {
    answer = ((b * Math.log(b) - b) - (a * Math.log(a) - a));
  } else if (realI2 === 10) {
    answer = (((1 / 3) * b ** 3) - ((1 / 3) * a ** 3));
  }
  return answer;
}

function drawControls() {
  noStroke();
  fill(180, 220, 222);
  rect(rx(910), ry(5), rx(470), ry(690));
  
  for (var ab = 0; ab < controls.length; ab++) {
    controls[ab].showit();
  }
  for (var f = 0; f < changers.length; f++) {
    changers[f].showit();
  }
  
  textSize(ry(36));
  fill(255);
  textAlign(LEFT);
  text("n = " + n, rx(950), ry(110));
  text("x = " + ((b - a) / n).toFixed(4), rx(972), ry(170));
  text("a = " + a, rx(950), ry(230));
  text("b = " + b, rx(950), ry(290));
  text("Exact = " + getAnswer().toFixed(6), rx(950), ry(500));
  showDelta(rx(950), ry(180), rx(20));
}

function showDelta(x, y, l) {
  strokeWeight(rx(3));
  stroke(255);
  line(x, y, x + l, y);
  line(x, y, x + l / 2, y - l);
  line(x + l, y, x + l / 2, y - l);
}

function drawGraph() {
  ymax = ymaxs[realI2 - 5];
  background(129, 30, 70);
  drawControls();
  
  stroke(255);
  strokeWeight(rx(1));
  fill(130, 180, 190);
  rect(rx(5), ry(5), rx(900), ry(690));
  
  stroke(190, 240, 230);
  strokeWeight(rx(5));
  line(rx(30), ry(600), rx(850), ry(600));
  line(rx(60), ry(630), rx(60), ry(60));
  
  textAlign(CENTER);
  textSize(ry(23));
  strokeWeight(rx(2));
  
  for (var g = 0; g < 10; g++) {
    var xPos = rx(60 + g * 79);
    stroke(190, 240, 230);
    line(xPos, ry(595), xPos, ry(605));
    fill(240);
    noStroke();
    text(g, xPos, ry(625));
  }
  yAxisLabel();
}

function yAxisLabel() {
  textAlign(RIGHT, CENTER);
  for (var a = 0; a <= ylabels[realI2 - 5]; a++) {
    var yVal = ry(600 - a * 540 / ylabels[realI2 - 5]);
    stroke(190, 240, 230);
    line(rx(55), yVal, rx(65), yVal);
    noStroke();
    text((0 + a * ymax / ylabels[realI2 - 5]), rx(55), yVal);
  }
}

function specialPoint(x, y) {
  fill(255, 0, 0);
  noStroke();
  ellipse(rx(x), ry(y), rx(9));
}

function gety(x) {
  if (realI2 === 5) {
    return (-1 / 2) * x ** 2 + 4 * x + 3;
  } else if (realI2 === 6) {
    return x ** .5;
  } else if (realI2 === 7) {
    return sin(x * 3.14159 / 6);
  } else if (realI2 === 8) {
    return Math.exp(x / 2);
  } else if (realI2 === 9) {
    return Math.log(x);
  } else if (realI2 === 10) {
    return x ** 2;
  }
}

function getLeftxs() {
  var it = [];
  for (var g = 0; g < n; g++) {
    it.push(a + g * ((b - a) / n));
  }
  return it;
}

function getRightxs() {
  var it = [];
  for (var g = 1; g < n + 1; g++) {
    it.push(a + g * ((b - a) / n));
  }
  return it;
}

function getMidpointxs() {
  var x1 = getLeftxs();
  var x2 = getRightxs();
  var mdpts = [];
  for (var g = 0; g < x2.length; g++) {
    mdpts.push((x1[g] + x2[g]) / 2);
  }
  return mdpts;
}

function example1() {
  var a1, b1, a2, b2, ttt;
  if (realI2 === 9) { ttt = .01; } else { ttt = 0; }
  
  fill(255);
  stroke(255);
  strokeWeight(rx(2));
  
  for (var x = ttt; x < 10; x += .01) {
    a1 = map(x, 0, 10, rx(60), rx(850));
    b1 = map(gety(x), 0, ymax, ry(600), ry(60));
    a2 = map(x + .01, 0, 10, rx(60), rx(850));
    b2 = map(gety(x + .01), 0, ymax, ry(600), ry(60));
    
    line(a1, b1, a2, b2);
  }
}

function calc() {
  ymax = ymaxs[realI2 - 5];
  drawGraph();
  example1();
  strokeWeight(rx(1));
  
  var set, set2, dx;
  var area = 0;
  
  var xOrigin = rx(60);
  var xEnd = rx(850);
  var yOrigin = ry(600);
  var yTop = ry(60);

  if (realI1 === 1) { // Left-Riemann Sums
    set = getLeftxs();
    dx = map(set[1], 0, 10, xOrigin, xEnd) - map(set[0], 0, 10, xOrigin, xEnd);
    for (var g = 0; g < set.length; g++) {
      area += ((b - a) / n) * gety(set[g]);
      if (g % 2 === 0) { fill(200, 100, 30, 50); }
      else { fill(30, 200, 100, 50); }
      var rxPos = map(set[g], 0, 10, xOrigin, xEnd);
      var ryPos = map(gety(set[g]), 0, ymax, yOrigin, yTop);
      rect(rxPos, ryPos, dx, yOrigin - ryPos);
    }
  } else if (realI1 === 2) { // Right-Riemann Sums
    set = getRightxs();
    dx = map(set[1], 0, 10, xOrigin, xEnd) - map(set[0], 0, 10, xOrigin, xEnd);
    for (var g = 0; g < set.length; g++) {
      area += ((b - a) / n) * gety(set[g]);
      if (g % 2 === 0) { fill(200, 100, 30, 50); }
      else { fill(30, 200, 100, 50); }
      var rxPos = map(set[g], 0, 10, xOrigin, xEnd) - dx;
      var ryPos = map(gety(set[g]), 0, ymax, yOrigin, yTop);
      rect(rxPos, ryPos, dx, yOrigin - ryPos);
    }
  } else if (realI1 === 3) { // Midpoint-Riemann Sums
    set = getMidpointxs();
    dx = map(set[1], 0, 10, xOrigin, xEnd) - map(set[0], 0, 10, xOrigin, xEnd);
    for (var g = 0; g < set.length; g++) {
      area += ((b - a) / n) * gety(set[g]);
      if (g % 2 === 0) { fill(200, 100, 30, 50); }
      else { fill(30, 200, 100, 50); }
      var rxPos = map(set[g], 0, 10, xOrigin, xEnd) - dx / 2;
      var ryPos = map(gety(set[g]), 0, ymax, yOrigin, yTop);
      rect(rxPos, ryPos, dx, yOrigin - ryPos);
    }
  } else if (realI1 === 4) { // Trapezoidal-Riemann Sums
    set = getLeftxs();
    set2 = getRightxs();
    dx = map(set[1], 0, 10, xOrigin, xEnd) - map(set[0], 0, 10, xOrigin, xEnd);
    for (var g = 0; g < set.length; g++) {
      area += (.5 * (b - a) / n * (gety(set[g]) + gety(set2[g])));
      if (g % 2 === 0) { fill(200, 100, 30, 50); }
      else { fill(30, 200, 100, 50); }
      quad(
        map(set[g], 0, 10, xOrigin, xEnd), yOrigin,
        map(set[g], 0, 10, xOrigin, xEnd), map(gety(set[g]), 0, ymax, yOrigin, yTop),
        map(set2[g], 0, 10, xOrigin, xEnd), map(gety(set2[g]), 0, ymax, yOrigin, yTop),
        map(set2[g], 0, 10, xOrigin, xEnd), yOrigin
      );
    }
  }

  noStroke();
  fill(255);
  textSize(ry(23));
  text("AREA ~" + area, rx(500), ry(60));
}

function touchStarted() {
  for (var b = 0; b < controls.length; b++) {
    controls[b].selectit();
  }
  for (var g = 0; g < changers.length; g++) {
    changers[g].tapit();
  }
}

function touchEnded() {
  drawControls();
}

function keyTyped() {
  if (key === 'o') {
    n *= 2;
    calc();
  } else if (key === 'p') {
    n /= 2;
    calc();
  } else if (key === 'a') {
    a += .25;
    calc();
  }
}

class control {
  constructor(x, y, name, i) {
    this.i = i;
    this.origX = x;
    this.origY = y;
    this.name = name;
    
    if (i < 5) {
      this.origW = 96;
      this.origH = 60;
    } else {
      this.origW = 200;
      this.origH = 60;
    }
  }

  get x() { return rx(this.origX); }
  get y() { return ry(this.origY); }
  get w() { return rx(this.origW); }
  get h() { return ry(this.origH); }

  showit() {
    if (this.i === realI1 || this.i === realI2) { fill(220, 50, 110); }
    else { fill(100, 200, 180); }
    
    stroke(255);
    strokeWeight(rx(2));
    rect(this.x, this.y, this.w, this.h, rx(2));
    
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255);
    
    if (this.name === "MIDPOINT") { textSize(ry(16)); }
    else { textSize(ry(20)); }
    
    if (this.i < 5) {
      text(this.name, this.x + this.w / 2, this.y + this.h / 2);
    } else if (this.i < 11) {
      image(functions[this.i - 5], this.x + rx(5), this.y + ry(5), this.w - rx(10), this.h - ry(10));
    }
  }

  selectit() {
    if (mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h) {
      if (this.i < 5) { realI1 = this.i; }
      else { realI2 = this.i; }
      calc();
    }
  }
}

class changer {
  constructor(x, y, n) {
    this.origX = x;
    this.origY = y;
    this.n = n;
    this.origW = 80;
    this.origH = 40;
  }

  get x() { return rx(this.origX); }
  get y() { return ry(this.origY); }
  get w() { return rx(this.origW); }
  get h() { return ry(this.origH); }

  showit() {
    strokeWeight(rx(2));
    stroke(255);
    fill(180, 220, 222);
    rect(this.x, this.y, this.w, this.h, rx(3));
    
    if (this.n == "aup" || this.n == "bup" || this.n == "nup") {
      line(this.x + rx(20), this.y + this.h - ry(8), this.x + this.w / 2, this.y + ry(8));
      line(this.x + this.w / 2, this.y + ry(8), this.x + this.w - rx(20), this.y + this.h - ry(8));
    } else {
      line(this.x + rx(20), this.y + ry(8), this.x + this.w / 2, this.y + this.h - ry(8));
      line(this.x + this.w / 2, this.y + this.h - ry(8), this.x + this.w - rx(20), this.y + ry(8));
    }
  }

  tapit() {
    if (mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h) {
      if (this.n === "aup") { a += .25; }
      else if (this.n === "adown") { a -= .25; }
      else if (this.n === "bup") { b += .25; }
      else if (this.n === "bdown") { b -= .25; }
      else if (this.n === "nup") { n++; }
      else if (this.n === "ndown") { n--; }
      calc();
    }
  }
}
