
var ymax;
var ymaxs=[15,3.5,1,30,3,25]; //the y-max for each function i have as y1, y2, ...
var ylabels=[15,7,4,10,6,10];  //the number of labels up to y-max for each
var controls=[];  //buttons for type of rieman sum AND function selectors
var changers=[]; //buttons for changing a and b
var a=1;
var b=7;
var n=4;
var functions=[];

var realI1=1; //show left sum initially, then 1,2,3,4 are its possibilities
var realI2=5; //Y1 as an initial curve is shown, then 5,6,7,8,... will be its other possibilities
//x-axis is 60 to 850, 79 pixels each unit
//y-axis is 600 to 60, ymax is a variable meaning 540/ymax pixels each

function preload(){
  //functions.push(loadImage("https://cdn.glitch.global/0cab0543-69b3-4e66-9748-d142ed7de12b/y1.png?v=1703365390043"));
  functions.push(loadImage("https://cdn.glitch.global/0cab0543-69b3-4e66-9748-d142ed7de12b/altY1.png?v=1730130438430"));
  functions.push(loadImage("https://cdn.glitch.global/0cab0543-69b3-4e66-9748-d142ed7de12b/y2.png?v=1703361842863"));
  functions.push(loadImage("https://cdn.glitch.global/0cab0543-69b3-4e66-9748-d142ed7de12b/y3.png?v=1703361847650"));
  functions.push(loadImage("https://cdn.glitch.global/0cab0543-69b3-4e66-9748-d142ed7de12b/y4.png?v=1703361852516"));
  functions.push(loadImage("https://cdn.glitch.global/0cab0543-69b3-4e66-9748-d142ed7de12b/y5.png?v=1729720809901"));
  functions.push(loadImage("https://cdn.glitch.global/0cab0543-69b3-4e66-9748-d142ed7de12b/y6.png?v=1729720951313"));

}


function setup() {          //this function runs once upon startup
  ymax=ymaxs[0];
  createCanvas(1400, 770);
  background(129, 30, 70);
  controls.push(new control(920,10,"LEFT",1));
  controls.push(new control(1035,10,"RIGHT",2));
  controls.push(new control(1150,10,"MIDPOINT",3));
  controls.push(new control(1265,10,"TRAP",4));
  controls.push(new control(5,700,"Y1",5));
  controls.push(new control(210,700,"Y2",6));
  controls.push(new control(415,700,"Y3",7));
  controls.push(new control(620,700,"Y4",8));
  controls.push(new control(825,700,"Y5",9));
  controls.push(new control(1030,700,"Y6",10));
  changers.push(new changer(1170,215,"adown"));
  changers.push(new changer(1270,215,"aup"));
  changers.push(new changer(1170,270,"bdown"));
  changers.push(new changer(1270,270,"bup"));
  changers.push(new changer(1170,93,"ndown"));
  changers.push(new changer(1270,93,"nup"));

  
  drawGraph();
  drawControls();
  specialPoint(60,600);

  
  example1();
  calc();
}

function getAnswer(){
  var answer;
  if(realI2===5){
    //answer=(.25*b**4-(13/3)*b**3+21*b**2)-(.25*a**4-(13/3)*a**3+21*a**2);
    answer=((-1/6)*b**3+2*b**2+3*b)-((-1/6)*a**3+2*a**2+3*a);
  }
  else if(realI2===6){
    answer=((2/3)*b**(3/2))-((2/3)*a**(3/2))
  }
  else if(realI2===7){
    answer=((-6/PI)*cos(b*PI/6)-(-6/PI)*cos(a*PI/6));
  }
  else if(realI2===8){
    answer=2*((Math.exp(b/2))-(Math.exp(a/2)));
  }
  else if(realI2===9){
    answer=((b*Math.log(b)-b)-(a*Math.log(a)-a));
  }
  else if(realI2===10){
    answer=(((1/3)*b**3)-((1/3)*a**3)); 
  }
return answer;
}



function drawControls(){
  noStroke()
  fill(180,220,222);
  rect(910,5,470,690);
  for(var ab=0;ab<controls.length;ab++){
    controls[ab].showit();
  }
  for(var f=0;f<changers.length;f++){
    changers[f].showit();
  }
  textSize(36);
  fill(255);
  textAlign(LEFT);
  text("n = "+n,950,110);
  text("x = "+((b-a)/n).toFixed(4),972,170);
  text("a = "+a,950,230);
  text("b = "+b,950,290);
  text("Exact = "+getAnswer().toFixed(6),950,500);
  showDelta(950,180,20);
}

function showDelta(x,y,l){
  strokeWeight(3);
  stroke(255);
  line(x,y,x+l,y);
  line(x,y,x+l/2,y-l);
  line(x+l,y,x+l/2,y-l);
}


function drawGraph(){
  ymax=ymaxs[realI2-5];
  background(129, 30, 70);
  drawControls();
  stroke(255);
  strokeWeight(1);
  fill(130, 180, 190);
  rect(5,5,900,690);
  stroke(190,240,230);
  strokeWeight(5);
  line(30,600,850,600);
  line(60,630,60,60);
  textAlign(CENTER);
  textSize(23);
  strokeWeight(2);
  for(var g=0;g<10;g++){
    stroke(190,240,230);
    line(60+g*79,595,60+g*79,605);
    fill(240);
    noStroke();
    text(g,60+g*79,625);
  }
  yAxisLabel();
}

function yAxisLabel(){
    textAlign(RIGHT,CENTER);

    for(var a=0;a<=ylabels[realI2-5];a++){
      stroke(190,240,230);
      line(55,600-a*540/ylabels[realI2-5],65,600-a*540/ylabels[realI2-5]);
      noStroke();
      text((0+a*ymax/ylabels[realI2-5]),55,600-a*540/ylabels[realI2-5]);
    }
  

}

function specialPoint(x,y){
  fill(255,0,0);
  noStroke();
  ellipse(x,y,9);
}

function gety(x){
  if(realI2===5){
    //return x*(x-6)*(x-7);
    return (-1/2)*x**2+4*x+3;
  }
  else if(realI2===6){return x**.5;}
  else if(realI2===7){return sin(x*3.14159/6);}
  else if(realI2===8){return Math.exp(x/2);}
  else if(realI2===9){return Math.log(x);}
  else if(realI2===10){return x**2;}
}

function getLeftxs(){
  var it=[];
  for(var g=0;g<n;g++){
    it.push(a+g*((b-a)/n));
  }
  return it;
}

function getRightxs(){
  var it=[];
  for(var g=1;g<n+1;g++){
    it.push(a+g*((b-a)/n));
  }
  return it;
}

function getMidpointxs(){
  var x1=getLeftxs();
  var x2=getRightxs();
  var mdpts=[];
  for(var g=0;g<x2.length;g++){
    mdpts.push((x1[g]+x2[g])/2);
  }
  return mdpts;
}

function example1(){
  //(60,600) is the origin
  var y;
  var a1;
  var b1;
  var a2;
  var b2;
  var ttt;
  if(realI2===9){ttt=.01;}
  else{ttt=0;}
  fill(255);
  stroke(255);
  strokeWeight(2);
  for(var x=ttt;x<10;x+=.01){
      a1=map(x,0,10,60,850);
      b1=map(gety(x),0,ymax,600,60);
      a2=map(x+.01,0,10,60,850);
      b2=map(gety(x+.01),0,ymax,600,60);
     
    line(a1,b1,a2,b2);
  }
}

function calc(){
  ymax=ymaxs[realI2-5];
  drawGraph();
  example1();
  strokeWeight(1);
  var set;
  var set2;
  var dx;
  var area=0;
  if(realI1===1){  //Left-Riemann Sums
    set=getLeftxs();
    dx=map(set[1],0,10,60,850)-map(set[0],0,10,60,850);
    for(var g=0;g<set.length;g++){
      area+=((b-a)/n)*gety(set[g]);
      if(g%2===0){fill(200,100,30,50);}
      else{fill(30,200,100,50);}
      rect(map(set[g],0,10,60,850),map(gety(set[g]),0,ymax,600,60),dx,600-map(gety(set[g]),0,ymax,600,60));
    }
  }
  
  else if(realI1===2){ //Right-Riemann Sums
    set=getRightxs();
    dx=map(set[1],0,10,60,850)-map(set[0],0,10,60,850);
    for(var g=0;g<set.length;g++){
      area+=((b-a)/n)*gety(set[g]);
      if(g%2===0){fill(200,100,30,50);}
      else{fill(30,200,100,50);}
      rect(map(set[g],0,10,60,850)-dx,map(gety(set[g]),0,ymax,600,60),dx,600-map(gety(set[g]),0,ymax,600,60));
    }
  }
  
  else if(realI1===3){ //Midpoint-Riemann Sums
    set=getMidpointxs();
    dx=map(set[1],0,10,60,850)-map(set[0],0,10,60,850);
    for(var g=0;g<set.length;g++){
      area+=((b-a)/n)*gety(set[g]);
      if(g%2===0){fill(200,100,30,50);}
      else{fill(30,200,100,50);}
      rect(map(set[g],0,10,60,850)-dx/2,map(gety(set[g]),0,ymax,600,60),dx,600-map(gety(set[g]),0,ymax,600,60));
    }
  }
  else if(realI1===4){ //Trapezoidal-Riemann Sums
    set=getLeftxs();
    set2=getRightxs();
    dx=map(set[1],0,10,60,850)-map(set[0],0,10,60,850);
    for(var g=0;g<set.length;g++){
      area+=(.5*(b-a)/n*(gety(set[g])+gety(set2[g])));
      if(g%2===0){fill(200,100,30,50);}
      else{fill(30,200,100,50);}
      quad(map(set[g],0,10,60,850),600,map(set[g],0,10,60,850),map(gety(set[g]),0,ymax,600,60),map(set2[g],0,10,60,850),map(gety(set2[g]),0,ymax,600,60),map(set2[g],0,10,60,850),600);
    }
  }

  noStroke();
  fill(255);
  text("AREA ~"+area,500,60);
}

function touchStarted() {
  for(var b=0;b<controls.length;b++){
    controls[b].selectit();
  }
  for(var g=0;g<changers.length;g++){
    changers[g].tapit();
  }
}

function touchEnded() {
  drawControls();
}

function keyTyped() {     //this function will run anytime the user types any key
  if (key === 'o'){
    n*=2;
    calc();
  }
  else if (key === 'p'){
    n/=2;
    calc();
  }
  else if(key === 'a'){
    a+=.25;
    calc();
  }
  
}

class control{
  constructor(x,y,name,i){
    this.i=i;
    this.x=x;this.y=y;this.name=name;
    if(i<5){
      this.w=96;this.h=60;
    }
    else{this.w=200;this.h=60;}
    this.fill=[100,200,180];
  
  }
  
  showit(){
    if(this.i===realI1||this.i===realI2){fill(220,50,110);}
    else{fill(100,200,180);}
    stroke(255);
    strokeWeight(2);
    rect(this.x,this.y,this.w,this.h,2);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(255);
    if(this.name==="MIDPOINT"){textSize(16);}
    else{textSize(20);}
    if(this.i<5){
      text(this.name,this.x+48,this.y+30);
    }
    else if(this.i<11){
      image(functions[this.i-5],this.x+5,this.y+5,this.w-10,this.h-10);
    }
  }
  
  selectit(){
    if(mouseX>=this.x&&mouseX<=this.x+this.w&&mouseY>=this.y&&mouseY<=this.y+this.h){
      this.select=true;
      if(this.i<5){realI1=this.i;}
      else{realI2=this.i;}
      calc();
    }
  }
}

class changer{
  constructor(x,y,n){
    this.x=x;this.y=y;this.n=n;
    this.w=80;
    this.h=40;
  }
  
  showit(){
    strokeWeight(2);
    stroke(255);
    fill(180,220,222);
    rect(this.x,this.y,this.w,this.h,3);
    if(this.n=="aup"||this.n=="bup"||this.n=="nup"){
        line(this.x+20,this.y+this.h-8,this.x+this.w/2,this.y+8);
        line(this.x+this.w/2,this.y+8,this.x+this.w-20,this.y+this.h-8);
    }
    else{
        line(this.x+20,this.y+8,this.x+this.w/2,this.y+this.h-8);
        line(this.x+this.w/2,this.y+this.h-8,this.x+this.w-20,this.y+8);
    }

  }
  
  tapit(){
    if(mouseX>=this.x&&mouseX<=this.x+this.w&&mouseY>=this.y&&mouseY<=this.y+this.h){
      if(this.n==="aup"){
         a+=.25;
        calc();
       }       
      else if(this.n==="adown"){
         a-=.25;
        calc();
       }
      else if(this.n==="bup"){
         b+=.25;
        calc();
       }       
      else if(this.n==="bdown"){
         b-=.25;
        calc();
       }      
      else if(this.n==="nup"){
         n++;
        calc();
       }
      else if(this.n==="ndown"){
        n--;
        calc();
      }
    }
  }
}






